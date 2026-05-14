import pickle
import os
import numpy as np
from app.utils.preprocess import clean_text

MODEL_PATH = "saved_models/model.pkl"
VECTORIZER_PATH = "saved_models/tfidf_vectorizer.pkl"

class MLService:
    def __init__(self):
        self.model = None
        self.vectorizer = None
        self.is_mock = False
        self._load_models()

    def _load_models(self):
        """
        Loads the saved TF-IDF vectorizer and Model.
        Falls back to Mock mode if files don't exist.
        """
        if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
            try:
                with open(MODEL_PATH, "rb") as f:
                    self.model = pickle.load(f)
                with open(VECTORIZER_PATH, "rb") as f:
                    self.vectorizer = pickle.load(f)
                print("--- ML Service: Production Models Loaded ---")
            except Exception as e:
                print(f"--- ML Service Error: {e}. Switching to Mock Mode ---")
                self.is_mock = True
        else:
            print("--- ML Service: model.pkl not found. Using Mock Prediction Mode ---")
            self.is_mock = True

    def predict(self, text: str):
        """
        Returns prediction ("FAKE" or "REAL") and confidence score.
        """
        cleaned = clean_text(text)
        
        if self.is_mock:
            # Mock logic for demonstration purposes
            # Simple keyword-based 'fake' detection for the prototype
            is_fake_signal = any(word in cleaned for word in ["breaking", "shocking", "urgent", "secret", "exposed"])
            prediction = "FAKE" if is_fake_signal else "REAL"
            confidence = round(0.85 + (np.random.random() * 0.1), 2)
            return prediction, confidence
        
        # Production logic with real models
        features = self.vectorizer.transform([cleaned])
        prob = self.model.predict_proba(features)[0]
        prediction_idx = np.argmax(prob)
        
        # Assuming label 0 = REAL, 1 = FAKE (Adjust based on your training)
        prediction = "FAKE" if prediction_idx == 1 else "REAL"
        confidence = round(float(prob[prediction_idx]), 2)
        
        return prediction, confidence

# Singleton instance
ml_service = MLService()
