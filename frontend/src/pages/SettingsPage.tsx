// src/pages/SettingsPage.tsx
import React from 'react';
import './SharedPages.css';
import type { User } from '../types/user';

interface SettingsPageProps {
  user: User;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ /* user */ }) => {
  return (
    <div className="page-container">
      <div className="page-card">
        <h1 className="page-title">Settings</h1>
        <p className="page-description">Settings page content will be implemented here.</p>
      </div>
    </div>
  );
};

export default SettingsPage;
