from app.models.exercise import PremadeExercise, BasePremadeExercise
from app.db.supabase_client import supabase

class PremadeExerciseService:
    def __init__(self):
        pass

    def get_all_premade_exercises(self) -> list[PremadeExercise]:
        response = supabase.table("Premade_Exercises").select("*").execute()
        data = response.data
        premade_exercises = [PremadeExercise(**item) for item in data]
        return premade_exercises