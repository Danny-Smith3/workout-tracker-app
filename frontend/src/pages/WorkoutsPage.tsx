// src/pages/WorkoutsPage.tsx
import React from 'react';
import './SharedPages.css';
import type { User } from '../types/user';

interface WorkoutsPageProps {
  user: User;
}

const WorkoutsPage: React.FC<WorkoutsPageProps> = ({ /* user */ }) => {
  return (
    <div className="page-container">
      <div className="page-card">
        <h1 className="page-title">Workouts</h1>
        <p className="page-description">Workouts page content will be implemented here.</p>
      </div>
    </div>
  );
};

export default WorkoutsPage;
