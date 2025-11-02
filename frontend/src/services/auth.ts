// src/auth.ts
import { supabase } from "./supabase";

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