from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List
from app.services.premade_workout_service import PremadeWorkoutService
from app.services.workout_service import WorkoutService
from app.services.user_service import UserService
from app.services.exercise_service import ExerciseService
from app.services.plan_service import PlanService
from app.models.workout import BaseWorkout

router = APIRouter(
    prefix="/workouts",
    tags=["Workouts"]
)

premadeService = PremadeWorkoutService()
service = WorkoutService()
userService = UserService()
exerciseService = ExerciseService()
planService = PlanService()

class WorkoutRequest(BaseModel):
    workouts: List[str]

class WorkoutMuscleSearchRequest(BaseModel):
    muscles: List[str]

#region Retrieval Endpoints
@router.get("/premade", response_model=dict)
def get_premade_workouts():
    return premadeService.get_all_premade_workouts()

@router.post("/", response_model=dict)
def get_workouts(request: WorkoutRequest):
    return service.get_workouts_by_ids(request.workouts)

@router.get("/{workout_id}", response_model=dict)
def get_workout(workout_id: str):
    workout = service.get_workout_by_id(workout_id)
    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")
    return workout
#endregion

#region Creation Endpoints
@router.post("/create", response_model=dict)
def create_workout(baseWorkout: BaseWorkout):
    user = userService.get_user_by_email(baseWorkout.user_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.workouts.__len__() >= 20:
        raise HTTPException(status_code=400, detail="Workout limit reached (20)")
    
    workout = service.create_workout(baseWorkout)

    userService.add_workout_to_user(user, workout.id)

    return workout
#endregion

#region Update Endpoints
@router.patch("/update/{workout_id}", response_model=dict)
def update_workout(workout_id: str, updates: dict):
    workout = service.get_workout_by_id(workout_id)
    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")
    
    updated_workout = service.update_workout(workout, updates)
    return updated_workout
#endregion

#region Deletion Endpoints
@router.delete("/delete/{workout_id}", response_model=dict)
def delete_workout(workout_id: str, user_email: str):
    user = userService.get_user_by_email(user_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if workout_id not in user.workouts:
        raise HTTPException(status_code=404, detail="Workout not found for user")
    
    service.delete_workout(workout_id)
    userService.remove_workout_from_user(user, workout_id)
    planService.remove_workout_from_plans(workout_id, user_email)
    return {"detail": "Workout deleted successfully"}
#endregion