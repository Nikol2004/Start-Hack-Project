from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_home():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Backend is working!"}

def test_signup():
    user_data = {
        "name": "Test",
        "surname": "User",
        "username": "testuser",
        "email": "test@example.com",
        "password": "testpassword",
        "location": "TestCity"
    }
    response = client.post("/signup", json=user_data)
    assert response.status_code == 200
    assert "message" in response.json()
