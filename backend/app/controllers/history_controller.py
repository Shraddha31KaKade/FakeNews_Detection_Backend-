from sqlalchemy.orm import Session
from app.models.history_model import History

from app.models.user_model import User

def save_prediction(db: Session, user_id: int, text: str, prediction: str, confidence: float):
    """
    Persists a prediction result. If user_id is None, saves it under a 'Guest' account.
    """
    print(f"--- [DEBUG] Saving history for user_id: {user_id} ---")
    final_user_id = user_id
    
    if final_user_id is None:
        guest_user = db.query(User).filter(User.email == "guest@system.local").first()
        if not guest_user:
            print("--- [DEBUG] Creating new System Guest Account ---")
            guest_user = User(name="Guest", email="guest@system.local", password="system_guest_no_login")
            db.add(guest_user)
            db.commit()
            db.refresh(guest_user)
        final_user_id = guest_user.id
        print(f"--- [DEBUG] Assigned to Guest Account ID: {final_user_id} ---")

    db_history = History(
        user_id=final_user_id,
        text=text,
        prediction=prediction,
        confidence=confidence
    )
    db.add(db_history)
    db.commit()
    db.refresh(db_history)
    print("--- [DEBUG] History Saved Successfully ---")
    return db_history

def get_user_history(db: Session, user_id: int):
    """
    Retrieves all past predictions for a specific user, sorted by newest first.
    """
    return db.query(History).filter(History.user_id == user_id).order_by(History.created_at.desc()).all()
