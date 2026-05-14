from pydantic import BaseModel
from datetime import datetime
from typing import List

class HistoryCreate(BaseModel):
    text: str
    prediction: str
    confidence: float

class HistoryResponse(BaseModel):
    id: int
    text: str
    prediction: str
    confidence: float
    created_at: datetime

    class Config:
        from_attributes = True
