from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import engine, Base
from app.models import user_model, history_model
from app.routes import auth_routes, prediction_routes, history_routes

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Fake News Detection API",
    description="Production-grade Fake News Detection System with Explainable AI",
    version="1.0.0"
)

# Include Routes
app.include_router(auth_routes.router)
app.include_router(prediction_routes.router)
app.include_router(history_routes.router)

# Configure CORS for React frontend (Development: Allow All)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow any origin for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the Fake News Detection System API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
