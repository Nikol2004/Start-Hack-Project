from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from typing import List
from sqlalchemy.orm import Session
from passlib.context import CryptContext
import models, database
from database import SessionLocal, engine
import jwt
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

# ✅ Initialize FastAPI app
app = FastAPI()

# ✅ Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load environment variables
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")  # Load secret key for JWT
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Token expiry time

# ✅ Create database tables
models.Base.metadata.create_all(bind=engine)

# ✅ Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ✅ Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Mock recommendations data (To be replaced with real data)
mock_recommendations = {
    "New York": "Reduce water usage and plant native trees.",
    "California": "Join a coastal cleanup program and minimize plastic use.",
    "Texas": "Implement drought-resistant landscaping.",
    "Albania": "Support local reforestation efforts and minimize waste."
}

# ✅ Fake degradation predictions (Replace with ML model later)
degradation_data = [
    {"district": "Barkeiwel", "probability": 0.95},
    {"district": "Bou Lahrath", "probability": 0.91},
    {"district": "Boumeid", "probability": 0.87},
    {"district": "El Ghaira", "probability": 0.85},
    {"district": "Guerou", "probability": 0.82},
    {"district": "Hseiy Tin", "probability": 0.78},
    {"district": "Kamour", "probability": 0.70},
    {"district": "Lavtah", "probability": 0.65},
    {"district": "R’Dheidhie", "probability": 0.60},
]

# ✅ Pydantic models for request/response validation
class UserCreate(BaseModel):
    name: str
    surname: str
    username: str
    email: str
    password: str
    location: str

class UserResponse(BaseModel):
    id: int
    name: str
    surname: str
    username: str
    email: str
    location: str

    model_config = ConfigDict(from_attributes=True)  # Fix for Pydantic v2

class LoginRequest(BaseModel):
    username: str
    password: str

# ✅ JWT Token Creation
def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ✅ Home endpoint (API Status Check)
@app.get("/")
def home():
    return {"message": "Backend is working!"}

# ✅ User Signup (Stores hashed password)
@app.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_password = pwd_context.hash(user.password)
    new_user = models.User(
        name=user.name,
        surname=user.surname,
        username=user.username,
        email=user.email,
        password=hashed_password,  # Store hashed password
        location=user.location
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# ✅ User Login with JWT Token
@app.post("/login")
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == login_data.username).first()
    if not user or not pwd_context.verify(login_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token({"sub": user.username}, expires_delta=access_token_expires)

    return {"message": "Login successful", "token": access_token, "user": user}

# ✅ Get Recommendation for a Location
@app.get("/recommendation/{location}")
def get_recommendation(location: str):
    recommendation = mock_recommendations.get(location, "No specific recommendation available yet.")
    return {"location": location, "recommendation": recommendation}

# ✅ Get All Users (For Testing)
@app.get("/users", response_model=List[UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()


@app.get("/degradation/predict")
def predict_degradation():
    return degradation_data  # Mock response, replace with ML model
