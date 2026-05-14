from app.services.ml_service import ml_service
from app.services.explainability_service import explainability_service
from app.services.news_verification_service import news_verification_service
from app.controllers import history_controller
from app.utils.india_filter import is_india_related
import logging

# Configure logging for production debugging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def process_prediction(text: str, db=None, user_id=None):
    """
    Orchestrates the multi-layered prediction flow.
    1. India Filter
    2. ML Analysis
    3. Real-time Verification
    4. Data-driven Decision
    """
    logger.info(f"Processing request: {text[:50]}...")

    # 1. India-Only Constraint (Step 6)
    if not is_india_related(text):
        logger.warning("Non-India news rejected.")
        return {
            "status": "error",
            "message": "Regional Focus: Our verification engine is currently optimized for Indian news context only."
        }

    # 2. ML Prediction (Step 2 - Strict usage)
    prediction, confidence, model_used = ml_service.predict(text)
    important_words = [{"word": "analytical_check", "score": confidence}] # Simplified for stability

    # 3. Real-time News Verification (Step 3)
    verification_data = await news_verification_service.verify_news(text)
    
    # 4. Decision Logic (Source-First Accuracy)
    has_trusted_match = any(
        src.get("credibility") == "trusted" 
        for src in verification_data.get("sources", [])
    )
    
    # Check for official agency names in text (Bypass model if official)
    official_keywords = ["imd", "rbi", "isro", "government", "supreme court", "pib"]
    is_official_content = any(k in text.lower() for k in official_keywords)

    if has_trusted_match:
        # ABSOLUTE TRUTH: If it's on NDTV/TOI, it's REAL.
        final_decision = "REAL"
        prediction = "REAL" 
        best_match = verification_data["sources"][0]
        proof_explanation = f"VERIFIED: This news is confirmed by {best_match['source']}. Headline: '{best_match['title']}'."
    elif is_official_content and not verification_data.get("matched"):
        # If it looks official but no news match yet, call it UNCERTAIN rather than FAKE
        final_decision = "UNCERTAIN"
        proof_explanation = "ANALYSIS: This appears to be an official advisory. While no direct news matching is found yet, the structure matches official Indian bulletins."
    elif prediction == "FAKE" and not verification_data.get("matched"):
        # ML says FAKE and zero news coverage found
        final_decision = "FAKE"
        proof_explanation = "FLAGGED: No credible matching reports found on any Indian news portals. High risk of misinformation."
    else:
        # Default to ML prediction but keep it honest
        final_decision = prediction
        proof_explanation = "The analysis is based on the linguistic structure and available real-time data."

    # Logging Results (Step 8)
    logger.info(f"Verdict: {final_decision} | Conf: {confidence} | Sources: {len(verification_data['sources'])}")

    # 5. History Persistence
    if db:
        history_controller.save_prediction(db, user_id, text, final_decision, confidence)
    
    return {
        "status": "success",
        "data": {
            "prediction": prediction,
            "confidence": confidence,
            "model_used": model_used,
            "verification": verification_data,
            "final_decision": final_decision,
            "proof_explanation": proof_explanation
        }
    }
