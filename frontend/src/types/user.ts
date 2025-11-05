// ------------------------------
// User
// ------------------------------
export interface BaseUser {
  email: string;
  name: string;
  weight: number;
  weight_unit_lbs: boolean;
  exercises: string[];
  workouts: string[];
  plans: string[];
  active_plan: string | null;
}

// Matches DB object
export interface User extends BaseUser {}