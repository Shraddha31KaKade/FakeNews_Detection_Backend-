from lime.lime_text import LimeTextExplainer
from app.services.ml_service import ml_service
import numpy as np

class ExplainabilityService:
    def __init__(self):
        self.explainer = LimeTextExplainer(class_names=["REAL", "FAKE"])

    def explain_prediction(self, text: str):
        """
        Generates LIME (Local Interpretable Model-agnostic Explanations) for the prediction.
        Identifies which words contributed most to the 'FAKE' or 'REAL' classification.
        """
        if ml_service.is_mock:
            # Mock explanation for prototype mode
            words = text.lower().split()
            # Highlight some typical "fake news" trigger words if they exist
            triggers = ["breaking", "shocking", "urgent", "secret", "exposed", "conspiracy", "scam"]
            found_triggers = [w for w in words if w in triggers]
            
            important_words = []
            for word in set(found_triggers):
                important_words.append({
                    "word": word,
                    "score": round(0.3 + (np.random.random() * 0.4), 2)
                })
            
            # Fill in with some random words if no triggers found
            if not important_words:
                for word in list(set(words))[:3]:
                    important_words.append({
                        "word": word,
                        "score": round(0.1 + (np.random.random() * 0.2), 2)
                    })
            
            return important_words

        # Production LIME logic
        def predictor(texts):
            features = ml_service.vectorizer.transform(texts)
            return ml_service.model.predict_proba(features)

        # Generate explanation for the specific instance
        exp = self.explainer.explain_instance(
            text, 
            predictor, 
            num_features=10
        )
        
        # Extract word weights from LIME output
        explanation_list = exp.as_list()
        # We return the absolute weight as the 'impact score' for the frontend
        important_words = [
            {"word": word, "score": round(abs(weight), 3)} 
            for word, weight in explanation_list
        ]
        
        return important_words

# Singleton instance
explainability_service = ExplainabilityService()
