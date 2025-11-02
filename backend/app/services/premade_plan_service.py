from app.models.plan import PremadePlan, BasePremadePlan
from app.db.supabase_client import supabase

class PremadePlanService:
    def __init__(self):
        pass

    def get_all_premade_plans(self) -> dict:
        response = supabase.table("Premade_Plans").select("*").execute()
        plans = response.data
        premade_plans = [PremadePlan(**plan) for plan in plans]
        return {"premade_plans": premade_plans}