// src/pages/MainApp.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import SettingsPage from './SettingsPage';
import WorkoutsPage from './WorkoutsPage';
import ExercisesPage from './ExercisesPage';
import PlanPage from './PlanPage';
import TrackingPage from './TrackingPage';
import { getOrCreateUserProfile } from '../services/auth';
import type { User } from '../types/user';

type PageType = 'settings' | 'workouts' | 'exercises' | 'plan' | 'tracking';

const MainApp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      // First try to get user from navigation state
      const navStateUser = (location.state as { user?: User })?.user;
      
      if (navStateUser) {
        setUser(navStateUser);
        setLoading(false);
        return;
      }

      // If no user in state, try to fetch from auth
      try {
        const fetchedUser = await getOrCreateUserProfile();
        if (fetchedUser) {
          setUser(fetchedUser);
        } else {
          // No authenticated user, redirect to home
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        navigate('/', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []); // Only run once on mount

  // Determine current page from URL
  const getCurrentPage = (): PageType => {
    const path = location.pathname.split('/').pop();
    switch (path) {
      case 'settings':
        return 'settings';
      case 'workouts':
        return 'workouts';
      case 'exercises':
        return 'exercises';
      case 'plan':
        return 'plan';
      case 'tracking':
        return 'tracking';
      default:
        return 'tracking';
    }
  };

  const handleNavigate = (page: string) => {
    navigate(`/app/${page}`);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="page-container">
        <div className="page-card">
          <p className="page-description">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render until we have a user
  if (!user) {
    return null;
  }

  // Render the appropriate page based on current route
  const renderPage = () => {
    const currentPage = getCurrentPage();
    switch (currentPage) {
      case 'settings':
        return <SettingsPage user={user} />;
      case 'workouts':
        return <WorkoutsPage user={user} />;
      case 'exercises':
        return <ExercisesPage user={user} />;
      case 'plan':
        return <PlanPage user={user} />;
      case 'tracking':
        return <TrackingPage user={user} />;
      default:
        return <TrackingPage user={user} />;
    }
  };

  return (
    <>
      {renderPage()}
      <NavigationBar currentPage={getCurrentPage()} onNavigate={handleNavigate} />
    </>
  );
};

export default MainApp;