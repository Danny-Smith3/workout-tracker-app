// ------------------------------
// Premade Workout (no id)
// ------------------------------
export interface BasePremadeWorkout {
  name: string;
  exercises: string[]; // list of Exercise IDs
}

// ------------------------------
// Premade Workout (read schema with id)
// ------------------------------
export interface PremadeWorkout extends BasePremadeWorkout {
  id: string;
}

// ------------------------------
// Base Workout (user workout, no id)
// ------------------------------
export interface BaseWorkout extends BasePremadeWorkout {
  user_email: string;
}

// ------------------------------
// Workout (read schema with id)
// ------------------------------
export interface Workout extends BaseWorkout {
  id: string;
}