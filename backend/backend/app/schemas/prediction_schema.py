from pydantic import BaseModel
from typing import List

class PredictionRequest(BaseModel):
    text: str

class ImportantWord(BaseModel):
    word: str
    score: float

class PredictionResponse(BaseModel):
    prediction: str
    confidence: float
    important_words: List[ImportantWord]
