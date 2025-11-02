from app.models.plan import Plan, BasePlan
from app.db.supabase_client import supabase

class PlanService:
    def __init__(self):
        pass

    def get_plan_by_id(self, plan_id: str) -> Plan | None:
        response = supabase.table("Plans").select("*").eq("id", plan_id).execute()
        data = response.data
        if data:
            return Plan(**data[0])
        return None
    
    def get_plans_by_ids(self, plan_ids: list[str]) -> dict:
        response = supabase.table("Plans").select("*").in_("id", plan_ids).execute()
        data = response.data
        plans = {Plan(**plan) for plan in data}
        return plans
    
    def create_plan(self, base_plan: BasePlan) -> Plan:
        plan_data = base_plan.model_dump()
        response = supabase.table("Plans").insert(plan_data).select("*").single().execute()
        data = response.data
        return Plan(**data)
    
    def update_plan(self, plan: Plan, updates: dict) -> Plan:
        updated_data = plan.model_dump()
        updated_data.update(updates)
        response = supabase.table("Plans").update(updated_data).eq("id", plan.id).select("*").single().execute()
        data = response.data
        return Plan(**data)
    
    def delete_plan(self, plan_id: str) -> bool:
        response = supabase.table("Plans").delete().eq("id", plan_id).execute()
        return response.status_code == 200
    
    def delete_plans_by_user(self, user_email: str) -> None:
        response = supabase.table("Plans").delete().eq("user_email", user_email).execute()
        if response.error:
            raise Exception(f"Error deleting plans for user {user_email}: {response.error}")
    
    def remove_workout_from_plans(self, workout_id: str, user_email: str) -> None:
        # Get all plans for this user that contain the workout
        response = (
            supabase.table("Plans")
            .select("*")
            .eq("user_email", user_email)
            .contains("workouts", [workout_id])
            .execute()
        )

        if response.error:
            raise Exception(f"Error fetching plans: {response.error}")

        plans_data = response.data

        for plan_data in plans_data:
            plan = Plan(**plan_data)
            # remove the workout from the list
            plan.workouts.remove(workout_id)
            # update the plan in Supabase
            supabase.table("Plans").update({"workouts": plan.workouts}).eq("id", plan.id).execute()
