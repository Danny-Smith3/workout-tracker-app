from fastapi import FastAPI
from app.routers import users, exercises, workouts, plans

app = FastAPI(title="Workout Tracker API")

app.include_router(users.router)
app.include_router(exercises.router)
app.include_router(workouts.router)
app.include_router(plans.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Workout Tracker API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}