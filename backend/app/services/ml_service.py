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
        Falls back to Mock mode if files are missing.
        """
        self.is_mock = False
        if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
            try:
                with open(MODEL_PATH, "rb") as f:
                    self.model = pickle.load(f)
                with open(VECTORIZER_PATH, "rb") as f:
                    self.vectorizer = pickle.load(f)
                print("--- [SUCCESS] ML Service: Production Models Loaded ---")
            except Exception as e:
                print(f"--- [WARNING] ML Service: Failed to load models. Using Mock. Error: {e}")
                self.is_mock = True
        else:
            print("--- [INFO] Model files not found. Entering Mock Mode. ---")
            self.is_mock = True

    def predict(self, text: str):
        """
        Returns prediction ("FAKE" or "REAL") and confidence score.
        """
        print(f"\n--- [DEBUG] Prediction Request ---")
        
        cleaned = clean_text(text)
        
        if not cleaned or len(cleaned.split()) < 3:
            raise ValueError("Input text is too short for reliable analysis.")

        if self.is_mock:
            # Mock logic based on keywords for a 'working' feel
            fake_words = ["shocking", "urgent", "exposed", "scam", "lottery", "win"]
            score = sum(1 for word in cleaned.split() if word in fake_words)
            prediction = "FAKE" if score > 0 else "REAL"
            confidence = 0.75 + (np.random.random() * 0.2)
            return prediction, round(confidence, 2), "Heuristic Mock Engine"

        # Production logic
        features = self.vectorizer.transform([cleaned])
        prob = self.model.predict_proba(features)[0]
        prediction_idx = np.argmax(prob)
        
        prediction = "FAKE" if prediction_idx == 1 else "REAL"
        confidence = round(float(prob[prediction_idx]), 2)
        
        return prediction, confidence, "TF-IDF + Logistic Regression"
        
        # Production logic
        features = self.vectorizer.transform([cleaned])
        processed_shape = features.shape
        print(f"Processed shape: {processed_shape}")
        
        prob = self.model.predict_proba(features)[0]
        prediction_idx = np.argmax(prob)
        
        prediction = "FAKE" if prediction_idx == 1 else "REAL"
        confidence = round(float(prob[prediction_idx]), 2)
        
        print(f"Prediction: {prediction}, Confidence: {confidence}")
        print(f"Probabilities: {prob}")
        
        return prediction, confidence, "TF-IDF + Logistic Regression"

# Singleton instance
ml_service = MLService()
