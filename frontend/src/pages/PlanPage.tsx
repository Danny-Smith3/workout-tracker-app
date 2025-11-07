// src/pages/PlanPage.tsx
import React from 'react';
import './SharedPages.css';
import type { User } from '../types/user';

interface PlanPageProps {
  user: User;
}

const PlanPage: React.FC<PlanPageProps> = ({ /* user */ }) => {
  return (
    <div className="page-container">
      <div className="page-card">
        <h1 className="page-title">Plan</h1>
        <p className="page-description">Plan page content will be implemented here.</p>
      </div>
    </div>
  );
};

export default PlanPage;
