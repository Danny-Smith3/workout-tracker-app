// src/pages/ExercisesPage.tsx
import React from 'react';
import './SharedPages.css';
import type { User } from '../types/user';

interface ExercisesPageProps {
  user: User;
}

const ExercisesPage: React.FC<ExercisesPageProps> = ({ user }) => {
  return (
    <div className="page-container">
      <div className="page-card">
        <h1 className="page-title">Exercises</h1>
        <p className="page-description">Exercises page content will be implemented here.</p>
      </div>
    </div>
  );
};

export default ExercisesPage;