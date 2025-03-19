from fastapi import FastAPI
from routes.api import router as api_router

app = FastAPI(title="My Web App")

app.include_router(api_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to my web app"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
