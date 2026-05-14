import pickle
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import numpy as np

# Create saved_models directory if it doesn't exist
os.makedirs("saved_models", exist_ok=True)

# Sample data to "train" a basic model
# 0 = REAL, 1 = FAKE
X = [
    # REAL NEWS SAMPLES (Indian Context)
    "Pune Heatwave Alert: The India Meteorological Department (IMD) has issued a heatwave warning for Maharashtra.",
    "IMD issues yellow alert for Mumbai as temperatures are expected to rise above 38 degrees Celsius this week.",
    "The Government of India announced a significant push for semiconductor manufacturing in the country today.",
    "The Indian Space Research Organisation (ISRO) successfully launched its latest satellite from Sriharikota.",
    "Prime Minister Narendra Modi met with industry leaders in Delhi to discuss economic growth and job creation.",
    "The Reserve Bank of India (RBI) maintained its current repo rate to stabilize inflation and support the economy.",
    "Traffic advisory issued for Bengaluru commuters due to the upcoming marathon event on Sunday.",
    "Mumbai local train services were briefly delayed due to technical maintenance work on the Western Line.",
    "Delhi government announces new pollution control measures to improve air quality during the winter months.",
    "Heatwave conditions to prevail in North India for the next 48 hours, according to the latest weather bulletin.",
    
    # FAKE NEWS SAMPLES
    "SHOCKING SECRETS EXPOSED: This common vegetable is actually a deadly poison! You won't believe the truth!",
    "URGENT: Click this link now to claim your 1 crore prize money from the Prime Minister's special fund!",
    "Conspiracy theory revealed: The moon is actually a hollow base built by ancient civilizations.",
    "Breaking news: Secret footage shows aliens walking on the streets of Delhi. Watch before it's deleted!",
    "Doctors are stunned! This 10-rupee medicine can cure all diseases in just 2 hours. Share now!",
    "Warning: NASA confirms that the Earth will go completely dark for 72 hours starting this Friday.",
    "Leaked documents show that a secret organization is controlling the global weather to create floods.",
    "Amazing discovery: Scientists found a fountain of youth in the Himalayas that can make you live for 200 years.",
    "ALERT: Your bank account will be frozen by tomorrow if you don't share this message with 10 people.",
    "Exposed: Celebrities are using this secret ritual to stay young forever. The truth is finally out!"
]
y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

# Vectorize
vectorizer = TfidfVectorizer()
X_tfidf = vectorizer.fit_transform(X)

# Train a simple model
model = LogisticRegression()
model.fit(X_tfidf, y)

# Save the models
with open("saved_models/model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("saved_models/tfidf_vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

print("--- Dummy Production Models Generated Successfully ---")
print("These models will now be used by the ML Service for real analysis.")
