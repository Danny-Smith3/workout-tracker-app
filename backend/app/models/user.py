from pydantic import BaseModel, EmailStr
from typing import List

# Base schema
class BaseUser(BaseModel):
    email: EmailStr
    name: str
    weight: int
    weight_unit_lbs: bool
    exercises: List[str] = []
    workouts: List[str] = []
    plans: List[str] = []
    active_plan: str = ""

# Schema for reading from API (matches DB object)
class User(BaseUser):
    class Config:
        orm_mode = True