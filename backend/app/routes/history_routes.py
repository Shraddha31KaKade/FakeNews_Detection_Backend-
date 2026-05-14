from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.schemas.history_schema import HistoryCreate, HistoryResponse
from app.controllers import history_controller, auth_controller
from app.models.user_model import User

router = APIRouter(prefix="/history", tags=["History"])

@router.post("/", response_model=HistoryResponse)
def add_to_history(
    history_data: HistoryCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(auth_controller.get_current_user)
):
    """
    Saves a prediction result to the logged-in user's history.
    """
    return history_controller.save_prediction(
        db, 
        current_user.id, 
        history_data.text, 
        history_data.prediction, 
        history_data.confidence
    )

@router.get("/", response_model=List[HistoryResponse])
def get_history(
    db: Session = Depends(get_db), 
    current_user: User = Depends(auth_controller.get_current_user)
):
    """
    Fetches the full prediction history for the logged-in user.
    """
    return history_controller.get_user_history(db, current_user.id)
