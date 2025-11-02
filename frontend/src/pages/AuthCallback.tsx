// src/pages/AuthCallback.tsx
import { useEffect } from "react";
import { handleAuthCallback } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await handleAuthCallback();
      navigate("/dashboard");
    })();
  }, []);

  return <p>Completing sign in...</p>;
}