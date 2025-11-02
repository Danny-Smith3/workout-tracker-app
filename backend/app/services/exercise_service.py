from app.models.exercise import Exercise, BaseExercise
from app.db.supabase_client import supabase

class ExerciseService:
    def __init__(self):
        pass

    def get_exercise_by_id(self, exercise_id: str) -> Exercise | None:
        response = supabase.table("Exercises").select("*").eq("id", exercise_id).single().execute()
        data = response.data
        if data:
            return Exercise(**data)
        return None
    
    def get_exercises_by_ids(self, exercise_ids: list[str]) -> dict:
        response = supabase.table("Exercises").select("*").in_("id", exercise_ids).execute()
        data = response.data
        exercises = [Exercise(**item) for item in data]
        return {"exercises": exercises}
    
    def create_exercise(self, base_exercise: BaseExercise) -> Exercise:
        exercise_data = base_exercise.model_dump()
        response = supabase.table("Exercises").insert(exercise_data).select("*").single().execute()
        data = response.data
        return Exercise(**data)
    
    def update_exercise(self, exercise: Exercise, updates: dict) -> Exercise:
        updated_data = exercise.model_dump()
        updated_data.update(updates)
        response = supabase.table("Exercises").update(updated_data).eq("id", exercise.id).select("*").single().execute()
        data = response.data
        return Exercise(**data)
    
    def delete_exercise(self, exercise_id: str) -> bool:
        response = supabase.table("Exercises").delete().eq("id", exercise_id).execute()
        return response.status_code == 200
    
    def delete_exercises_by_user(self, user_email: str) -> None:
        response = supabase.table("Exercises").delete().eq("user_email", user_email).execute()
        if response.error:
            raise Exception(f"Error deleting exercises for user {user_email}: {response.error}")