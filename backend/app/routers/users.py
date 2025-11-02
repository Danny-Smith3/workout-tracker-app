from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List
from app.services.user_service import UserService
from app.models.user import BaseUser

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

service = UserService()

#region Retrieval Endpoints
@router.get("/{user_email}", response_model=dict)
def get_user(user_email: str):
    user = service.get_user_by_email(user_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
#endregion

#region Creation Endpoints
@router.post("/create", response_model=dict)
def create_user(baseUser: BaseUser):
    existing_user = service.get_user_by_email(baseUser.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    user = service.create_user(baseUser)
    return user
#endregion

#region Update Endpoints
@router.patch("/update/{user_email}", response_model=dict)
def update_user(user_email: str, updates: dict):
    user = service.get_user_by_email(user_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    updated_user = service.update_user(user, updates)
    return updated_user
#endregion

#region Deletion Endpoints
@router.delete("/delete/{user_email}", response_model=dict)
def delete_user(user_email: str):
    user = service.get_user_by_email(user_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    service.delete_user(user_email)
    return {"detail": "User deleted successfully"}
#endregion