from sqlalchemy.orm import Session
from app.models.history_model import History

def save_prediction(db: Session, user_id: int, text: str, prediction: str, confidence: float):
    """
    Persists a prediction result to the database for a specific user.
    """
    db_history = History(
        user_id=user_id,
        text=text,
        prediction=prediction,
        confidence=confidence
    )
    db.add(db_history)
    db.commit()
    db.refresh(db_history)
    return db_history

def get_user_history(db: Session, user_id: int):
    """
    Retrieves all past predictions for a specific user, sorted by newest first.
    """
    return db.query(History).filter(History.user_id == user_id).order_by(History.created_at.desc()).all()
