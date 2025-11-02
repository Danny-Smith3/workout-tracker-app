from app.models.workout import Workout, BaseWorkout
from app.db.supabase_client import supabase

class WorkoutService:
    def __init__(self):
        pass

    def get_workouts_by_ids(self, workout_ids: list[str]) -> dict:
        response = supabase.table("Workouts").select("*").in_("id", workout_ids).execute()
        workouts = response.data
        return {Workout(**workout) for workout in workouts}
    
    def get_workout_by_id(self, workout_id: str) -> Workout | None:
        response = supabase.table("Workouts").select("*").eq("id", workout_id).execute()
        data = response.data
        if data:
            return Workout(**data[0])
        return None
    
    def create_workout(self, base_workout: BaseWorkout) -> Workout:
        workout_data = base_workout.model_dump()
        response = supabase.table("Workouts").insert(workout_data).select("*").single().execute()
        data = response.data
        return Workout(**data)
    
    def update_workout(self, workout: Workout, updates: dict) -> Workout:
        updated_data = workout.model_dump()
        updated_data.update(updates)
        response = supabase.table("Workouts").update(updated_data).eq("id", workout.id).select("*").single().execute()
        data = response.data
        return Workout(**data)
    
    def delete_workout(self, workout_id: str) -> bool:
        response = supabase.table("Workouts").delete().eq("id", workout_id).execute()
        return response.status_code == 200
    
    def delete_workouts_by_user(self, user_email: str) -> None:
        response = supabase.table("Workouts").delete().eq("user_email", user_email).execute()
        if response.error:
            raise Exception(f"Error deleting workouts for user {user_email}: {response.error}")
    
    def remove_exercise_from_workouts(self, exercise_id: str, user_email: str) -> None:
        # Get all workouts for this user that contain the exercise
        response = (
            supabase.table("Workouts")
            .select("*")
            .eq("user_email", user_email)
            .contains("exercises", [exercise_id])
            .execute()
        )

        if response.error:
            raise Exception(f"Error fetching workouts: {response.error}")

        workouts_data = response.data

        for workout_data in workouts_data:
            workout = Workout(**workout_data)
            # remove the exercise from the list
            workout.exercises.remove(exercise_id)
            # update the workout in Supabase
            supabase.table("Workouts").update({"exercises": workout.exercises}).eq("id", workout.id).execute()