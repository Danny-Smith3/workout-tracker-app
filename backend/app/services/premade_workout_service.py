from app.models.workout import PremadeWorkout, BasePremadeWorkout
from app.db.supabase_client import supabase

class PremadeWorkoutService:
    def __init__(self):
        pass

    def get_all_premade_workouts(self) -> list[BasePremadeWorkout]:
        response = supabase.table("Premade_Workouts").select("*").execute()
        workouts_data = response.data
        premade_workouts = [BasePremadeWorkout(**workout) for workout in workouts_data]
        return premade_workouts