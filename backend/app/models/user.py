from pydantic import BaseModel, EmailStr
from typing import List

# Base schema
class UserBase(BaseModel):
    email: EmailStr
    name: str
    weight: int
    weight_unit_lbs: bool

# Extended schema for API requests/responses
class UserExtended(UserBase):
    exercises: List[str] = []
    workouts: List[str] = []
    plans: List[str] = []
    active_plan: str = ""

# Schema for reading from API (matches DB object)
class User(UserExtended):
    class Config:
        orm_mode = True