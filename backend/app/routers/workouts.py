from fastapi import APIRouter

router = APIRouter(
    prefix="/workouts",
    tags=["Workouts"]
)