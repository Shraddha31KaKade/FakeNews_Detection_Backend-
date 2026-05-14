from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.user_schema import UserCreate, UserLogin, UserResponse, Token
from app.controllers import auth_controller
from app.models.user_model import User

from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return auth_controller.register_user(db, user)

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    Standard OAuth2 compatible token login.
    Note: Swagger uses 'username' field for the email.
    """
    authenticated_user = auth_controller.authenticate_user(db, form_data.username, form_data.password)
    if not authenticated_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = auth_controller.create_access_token(data={"sub": authenticated_user.email})
    return {"access_token": access_token, "token_type": "bearer"}
