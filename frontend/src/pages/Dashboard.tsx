// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { User } from "../types/user";
import { getOrCreateUserProfile } from "../services/auth";
import "./Dashboard.css";

interface DashboardProps {
  user?: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user: initialUser }) => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(initialUser ?? null);

  useEffect(() => {
    const loadUser = async () => {
      const navStateUser = (location.state as { user?: User })?.user;
      if (navStateUser) {
        setUser(navStateUser);
      } else {
        const fetchedUser = await getOrCreateUserProfile();
        setUser(fetchedUser);
      }
    };

    loadUser();
  }, [location.state]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Dashboard</h1>

        {user ? (
          <p className="dashboard-welcome">
            Welcome back, <span className="user-email">{user.email}</span>!
          </p>
        ) : (
          <p className="dashboard-loading">Loading your profile...</p>
        )}

        <p className="dashboard-description">
          This is your main dashboard where you will track workouts and plans.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;