// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getOrCreateUserProfile } from "../services/auth";
import type { User } from "../types/user";
import "./Home.css";

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
      <div className="home-loading-container">
        <div className="spinner-wrapper">
          <div className="spinner-outer"></div>
          <div className="spinner-inner"></div>
        </div>
        <h1 className="loading-title">Loading your profile...</h1>
        <p className="loading-subtitle">Hang tight while we get things ready!</p>
      </div>
    );
  }

  return null;
};

export default Home;