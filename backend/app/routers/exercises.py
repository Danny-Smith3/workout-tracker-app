from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List
from app.services.premade_exercise_service import PremadeExerciseService
from app.services.exercise_service import ExerciseService
from app.services.user_service import UserService
from app.services.workout_service import WorkoutService
from app.services.plan_service import PlanService
from app.models.exercise import BaseExercise

router = APIRouter(
    prefix="/exercises",
    tags=["Exercises"]
)

premadeService = PremadeExerciseService()
service = ExerciseService()
userService = UserService()
workoutService = WorkoutService()
planService = PlanService()

class ExerciseRequest(BaseModel):
    exercises: List[str]

#region Retrieval Endpoints
@router.get("/premade", response_model=dict)
def get_premade_exercises():
    return premadeService.get_all_premade_exercises()

@router.post("/", response_model=dict)
def get_exercises(request: ExerciseRequest):
    return service.get_exercises_by_ids(request.exercises)

@router.get("/{exercise_id}", response_model=dict)
def get_exercise(exercise_id: str):
    exercise = service.get_exercise_by_id(exercise_id)
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return exercise
#endregion

#region Creation Endpoints
@router.post("/create", response_model=dict)
def create_exercise(baseExercise: BaseExercise):
    user = userService.get_user_by_email(baseExercise.user_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.exercises.__len__() >= 50:
        raise HTTPException(status_code=400, detail="Exercise limit reached (50)")
    
    exercise = service.create_exercise(baseExercise)

    userService.add_exercise_to_user(user, exercise.id)

    return exercise
#endregion

#region Update Endpoints
@router.patch("/{exercise_id}", response_model=dict)
def update_exercise(exercise_id: str, updates: dict):
    exercise = service.get_exercise_by_id(exercise_id)
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")
    
    updated_exercise = service.update_exercise(exercise, updates)
    return updated_exercise
#endregion

#region Deletion Endpoints
@router.delete("/{exercise_id}", response_model=dict)
def delete_exercise(exercise_id: str, user_email: str):
    user = userService.get_user_by_email(user_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if exercise_id not in user.exercises:
        raise HTTPException(status_code=403, detail="Exercise does not belong to user")
    
    delete_responnse = service.delete_exercise(exercise_id)
    if not delete_responnse:
        raise HTTPException(status_code=500, detail="Failed to delete exercise")

    userService.remove_exercise_from_user(user, exercise_id)
    workoutService.remove_exercise_from_workouts(exercise_id, user_email)

    return {"detail": "Exercise deleted successfully"}
#endregion