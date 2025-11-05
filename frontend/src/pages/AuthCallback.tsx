// src/pages/AuthCallback.tsx
import { useEffect } from "react";
import { handleAuthCallback, getOrCreateUserProfile } from "../services/auth";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/user";
import "./AuthCallback.css";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const processAuth = async () => {
      try {
        // Complete OAuth callback
        await handleAuthCallback();

        // Ensure the user exists in DB
        const user: User | null = await getOrCreateUserProfile();

        if (user) {
          navigate("/dashboard", { replace: true, state: { user } });
        } else {
          console.error("Failed to fetch or create user profile");
          navigate("/login", { replace: true });
        }
      } catch (err) {
        console.error("Auth callback failed:", err);
        navigate("/login", { replace: true });
      }
    };

    processAuth();
  }, [navigate]);

  return (
    <div className="auth-callback-container">
      <div className="auth-spinner-wrapper">
        <div className="auth-spinner"></div>
      </div>
      <p className="auth-callback-text">Completing sign in...</p>
    </div>
  );
}