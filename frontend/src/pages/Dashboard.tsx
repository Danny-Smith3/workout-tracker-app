// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { User } from "../types/user";
import { getOrCreateUserProfile } from "../services/auth";

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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {user ? (
        <p className="text-lg">
          Welcome back, <span className="font-semibold">{user.email}</span>!
        </p>
      ) : (
        <p className="text-gray-600">Loading your profile...</p>
      )}

      <p className="mt-4 text-gray-700">
        This is your main dashboard where you will track workouts and plans.
      </p>
    </div>
  );
};

export default Dashboard;