from app.models.user import BaseUser, User
from app.db.supabase_client import supabase

class UserService:
    def __init__(self):
        pass

    def get_user_by_email(self, email: str) -> User | None:
        response = supabase.table("Users").select("*").eq("email", email).execute()
        users = response.data
        if users:
            return User(**users[0])
        return None
    
    def create_user(self, base_user: BaseUser) -> User:
        user_data = base_user.model_dump()
        response = supabase.table("Users").insert(user_data).select("*").single().execute()
        data = response.data
        return User(**data)
    
    def add_workout_to_user(self, user: User, workout_id: str) -> None:
        user.workouts.append(workout_id)
        self.update_user(user, {"workouts": user.workouts})

    def add_plan_to_user(self, user: User, plan_id: str) -> None:
        user.plans.append(plan_id)
        self.update_user(user, {"plans": user.plans})

    def add_exercise_to_user(self, user: User, exercise_id: str) -> None:
        user.exercises.append(exercise_id)
        self.update_user(user, {"exercises": user.exercises})
    
    def update_user(self, user: User, updates: dict) -> User:
        updated_data = user.model_dump()
        updated_data.update(updates)
        response = supabase.table("Users").update(updated_data).eq("email", user.email).select("*").single().execute()
        data = response.data
        return User(**data)
    
    def delete_user(self, email: str) -> bool:
        response = supabase.table("Users").delete().eq("email", email).execute()
        return response.status_code == 200
    
    def remove_exercise_from_user(self, user: User, exercise_id: str) -> None:
        if exercise_id in user.exercises:
            user.exercises.remove(exercise_id)
            self.update_user(user, {"exercises": user.exercises})
    
    def remove_workout_from_user(self, user: User, workout_id: str) -> None:
        if workout_id in user.workouts:
            user.workouts.remove(workout_id)
            self.update_user(user, {"workouts": user.workouts})

    def remove_plan_from_user(self, user: User, plan_id: str) -> None:
        if plan_id in user.plans:
            user.plans.remove(plan_id)
            self.update_user(user, {"plans": user.plans})

