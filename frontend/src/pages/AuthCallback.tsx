// src/pages/AuthCallback.tsx
import { useEffect } from "react";
import { handleAuthCallback, getOrCreateUserProfile } from "../services/auth";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/user";

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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-6 text-gray-700 text-lg font-medium">Completing sign in...</p>
    </div>
  );
}