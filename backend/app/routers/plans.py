from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List
from app.services.premade_plan_service import PremadePlanService
from app.services.plan_service import PlanService
from app.services.user_service import UserService
from app.models.plan import BasePlan

router = APIRouter(
    prefix="/plans",
    tags=["Plans"]
)

premadeService = PremadePlanService()
service = PlanService()
userService = UserService()

class PlanRequest(BaseModel):
    plans: List[str]

# region Retrieval Endpoints
@router.get("/premade", response_model=dict)
def get_premade_plans():
    return premadeService.get_all_premade_plans()

@router.post("/", response_model=dict)
def get_plans(request: PlanRequest):
    return service.get_plans_by_ids(request.plans)

@router.get("/{plan_id}", response_model=dict)
def get_plan(plan_id: str):
    plan = service.get_plan_by_id(plan_id)
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    return plan
# endregion

# region Creation Endpoints
@router.post("/create", response_model=dict)
def create_plan(basePlan: BasePlan):
    user = userService.get_user_by_email(basePlan.user_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.plans.__len__() >= 10:
        raise HTTPException(status_code=400, detail="Plan limit reached (10)")
    
    plan = service.create_plan(basePlan)
    userService.add_plan_to_user(user, plan.id)
    return plan
# endregion

# region Update Endpoints
@router.patch("/update/{plan_id}", response_model=dict)
def update_plan(plan_id: str, updates: dict):
    plan = service.get_plan_by_id(plan_id)
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    
    updated_plan = service.update_plan(plan, updates)
    return updated_plan
# endregion

# region Deletion Endpoints
@router.delete("/delete/{plan_id}", response_model=dict)
def delete_plan(plan_id: str, user_email: str):
    user = userService.get_user_by_email(user_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if plan_id not in user.plans:
        raise HTTPException(status_code=403, detail="Plan does not belong to user")
    
    service.delete_plan(plan_id)
    userService.remove_plan_from_user(user, plan_id)
    
    return {"detail": "Plan deleted successfully"}
# endregion