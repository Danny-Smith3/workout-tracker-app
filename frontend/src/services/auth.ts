// src/services/auth.ts
import { supabase } from "./supabase";
import type { User } from "../types/user";

/**
 * Start Google OAuth login flow.
 * Redirects to Supabase’s hosted Google sign-in page.
 */
export async function signInWithGoogle() {
  const redirectTo = `${window.location.origin}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });

  if (error) {
    console.error("Google login error:", error.message);
  }

  return data;
}

/**
 * Handle redirect from Supabase after OAuth or magic link login.
 * Exchanges the auth code or sets the session directly from URL tokens.
 */
export async function handleAuthCallback() {
  const url = new URL(window.location.href);

  // OAuth 2.0 code flow
  if (url.searchParams.get("code")) {
    const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
    if (error) console.error("[auth] exchange error:", error.message);

    // Clean up query params
    url.searchParams.delete("code");
    url.searchParams.delete("state");
    window.history.replaceState({}, "", url.pathname + url.search);
  }

  // Hash-based redirect flow (e.g., magic links)
  if (window.location.hash.includes("access_token=")) {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const access_token = hashParams.get("access_token");
    const refresh_token = hashParams.get("refresh_token") ?? "";

    if (access_token) {
      const { error } = await supabase.auth.setSession({ access_token, refresh_token });
      if (error) console.error("[auth] setSession error:", error.message);
    }

    window.history.replaceState({}, "", url.pathname + url.search);
  }
}

export async function getOrCreateUserProfile(): Promise<User | null> {
  const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !authUser) {
    console.error("Failed to get Supabase auth user:", authError?.message);
    return null;
  }

  // Step 1: Try to fetch the user profile from your database
  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("*")
    .eq("email", authUser.email)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") { // PGRST116 = No rows found
    console.error("Error fetching user profile:", fetchError.message);
    return null;
  }

  if (existingUser) return existingUser as User;

  // Step 2: Create a new user record
  const newUser: User = {
    email: authUser.email ?? "",
    name: authUser.user_metadata?.full_name ?? "",
    weight: 0,
    weight_unit_lbs: true,
    exercises: [],
    workouts: [],
    plans: [],
    active_plan: null,
  };

  const { data: createdUser, error: createError } = await supabase
    .from("users")
    .insert([newUser])
    .select()
    .single();

  if (createError) {
    console.error("Error creating new user profile:", createError.message);
    return null;
  }

  return createdUser as User;
}

/**
 * Returns the current authenticated user (if logged in)
 */
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }
  return data.user;
}

/**
 * Logs out the current user and clears session storage.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Error signing out:", error.message);
}