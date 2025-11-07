// src/components/NavigationBar.tsx
import React from 'react';
import './NavigationBar.css';

interface NavigationBarProps {
  currentPage: 'settings' | 'workouts' | 'exercises' | 'plan' | 'tracking';
  onNavigate: (page: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'workouts', label: 'Workouts', icon: '💪' },
    { id: 'exercises', label: 'Exercises', icon: '🏋️' },
    { id: 'plan', label: 'Plan', icon: '📋' },
    { id: 'tracking', label: 'Track', icon: '📊' },
  ];

  return (
    <nav className="navigation-bar">
      <div className="nav-container">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-label={item.label}
            aria-current={currentPage === item.id ? 'page' : undefined}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavigationBar;