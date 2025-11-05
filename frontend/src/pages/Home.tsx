// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getOrCreateUserProfile } from "../services/auth";
import type { User } from "../types/user";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redirectBasedOnUser = async () => {
      try {
        // Try to get user from navigation state first
        const navStateUser = (location.state as { user?: User })?.user;

        if (navStateUser) {
          navigate("/dashboard", { replace: true, state: { user: navStateUser } });
          return;
        }

        // Otherwise fetch or create user from DB
        const user: User | null = await getOrCreateUserProfile();
        if (user) {
          navigate("/dashboard", { replace: true, state: { user } });
        } else {
          navigate("/login", { replace: true });
        }
      } catch (err) {
        console.error("Home redirect failed:", err);
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    redirectBasedOnUser();
  }, [navigate, location.state]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-50 to-white text-gray-700">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-blue-400 border-t-transparent animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-blue-600 border-t-transparent animate-[spin_1.5s_linear_infinite] opacity-60"></div>
        </div>
        <h1 className="text-2xl font-semibold mb-2">Loading your profile...</h1>
        <p className="text-gray-500 text-sm">Hang tight while we get things ready!</p>
      </div>
    );
  }

  return null;
};

export default Home;