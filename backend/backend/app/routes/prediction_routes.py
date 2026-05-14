from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Optional
from app.schemas.prediction_schema import PredictionRequest, PredictionResponse
from app.controllers import prediction_controller, auth_controller
from app.db.database import get_db
from app.models.user_model import User

router = APIRouter(tags=["Prediction"])

@router.post("/predict", response_model=PredictionResponse)
def predict(
    request: PredictionRequest, 
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(auth_controller.get_current_user)
):
    """
    Analyze news text. If logged in, the result is automatically saved to your history.
    """
    user_id = current_user.id if current_user else None
    return prediction_controller.process_prediction(request.text, db, user_id)
