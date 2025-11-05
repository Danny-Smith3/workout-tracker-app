// ------------------------------
// Premade Plan (no id)
// ------------------------------
export interface BasePremadePlan {
  name: string;
  interval: number; // smallint
  workouts: string[]; // list of Workout IDs
  schedule: number[]; // list of indexes
}

// ------------------------------
// Premade Plan (read schema with id)
// ------------------------------
export interface PremadePlan extends BasePremadePlan {
  id: string;
}

// ------------------------------
// Base Plan (user plan, no id)
// ------------------------------
export interface BasePlan extends BasePremadePlan {
  user_email: string; // EmailStr → string
}

// ------------------------------
// Plan (read schema with id)
// ------------------------------
export interface Plan extends BasePlan {
  id: string;
}