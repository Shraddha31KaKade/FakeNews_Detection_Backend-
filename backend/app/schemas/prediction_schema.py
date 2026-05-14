from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class PredictionRequest(BaseModel):
    text: str

class ImportantWord(BaseModel):
    word: str
    score: float

class VerificationSource(BaseModel):
    title: str
    description: Optional[str] = None
    url: str
    source: str
    domain: str
    credibility: str

class VerificationData(BaseModel):
    matched: bool
    sources: List[VerificationSource]

class PredictionData(BaseModel):
    prediction: str
    confidence: float
    model_used: str
    important_words: List[ImportantWord]
    verification: VerificationData
    final_decision: str
    proof_explanation: Optional[str] = None

class PredictionResponse(BaseModel):
    status: str
    message: Optional[str] = None
    data: Optional[PredictionData] = None
