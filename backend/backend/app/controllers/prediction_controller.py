from app.services.ml_service import ml_service
from app.services.explainability_service import explainability_service
from app.controllers import history_controller
from sqlalchemy.orm import Session

def process_prediction(text: str, db: Session = None, user_id: int = None):
    """
    Orchestrates the prediction process and saves result to history if user_id is provided.
    """
    prediction, confidence = ml_service.predict(text)
    
    # Generate real LIME explanation for the text
    important_words = explainability_service.explain_prediction(text)
    
    # STEP 8: Auto-save to history if user is logged in
    if db and user_id:
        history_controller.save_prediction(db, user_id, text, prediction, confidence)
    
    return {
        "prediction": prediction,
        "confidence": confidence,
        "important_words": important_words
    }
