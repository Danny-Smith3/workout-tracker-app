// src/pages/TrackingPage.tsx
import React, { useState } from 'react';
import './TrackingPage.css';
import type { User } from '../types/user';

interface LoggedExercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

interface TrackingPageProps {
  user: User;
}

const TrackingPage: React.FC<TrackingPageProps> = ({ /* user */ }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddMenu, setShowAddMenu] = useState(false);
  
  // Mock data - replace with history service call
  const loggedExercises: LoggedExercise[] = [
    { id: '1', name: 'Bench Press', sets: 3, reps: 8, weight: 185 },
    { id: '2', name: 'Squat', sets: 4, reps: 10, weight: 225 },
  ];

  const activePlanName = "Strength Building Program";

  const handleDateChange = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + days);
    
    // Don't allow future dates
    if (newDate <= new Date()) {
      setCurrentDate(newDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleChangePlan = () => {
    // TODO: Implement plan change functionality
  };

  const handleEdit = (/*id: string*/) => {
    // TODO: Implement edit functionality
  };

  const handleAddExercise = () => {
    // TODO: Implement add exercise functionality
    setShowAddMenu(false);
  };

  const handleAddWorkout = () => {
    // TODO: Implement add workout functionality
    setShowAddMenu(false);
  };

  const handleAddWeight = () => {
    // TODO: Implement add weight functionality
    setShowAddMenu(false);
  };

  return (
    <div className="tracking-container">
      <div className="tracking-content">
        {/* Active Plan Section */}
        <section className="plan-section">
          <div className="plan-header">
            <h2 className="plan-name">{activePlanName}</h2>
            <button className="btn-change-plan" onClick={handleChangePlan}>
              Change Plan
            </button>
          </div>
        </section>

        {/* Daily Log Section */}
        <section className="log-section">
          <div className="log-header">
            <button 
              className="date-nav-btn"
              onClick={() => handleDateChange(-1)}
              aria-label="Previous day"
            >
              ←
            </button>
            <h3 className="log-date">{formatDate(currentDate)}</h3>
            <button 
              className="date-nav-btn"
              onClick={() => handleDateChange(1)}
              disabled={currentDate.toDateString() === new Date().toDateString()}
              aria-label="Next day"
            >
              →
            </button>
          </div>

          <div className="exercises-list">
            {loggedExercises.length === 0 ? (
              <p className="no-exercises">No exercises logged for this day</p>
            ) : (
              loggedExercises.map((exercise) => (
                <div key={exercise.id} className="exercise-item">
                  <div className="exercise-info">
                    <span className="exercise-name">{exercise.name}</span>
                    <div className="exercise-stats">
                      <span>{exercise.sets} sets</span>
                      <span className="stat-separator">•</span>
                      <span>{exercise.reps} reps</span>
                      <span className="stat-separator">•</span>
                      <span>{exercise.weight} lbs</span>
                    </div>
                  </div>
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(exercise.id)}
                    aria-label="Edit exercise"
                  >
                    Edit
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Floating Add Button */}
          <div className="add-button-container">
            <button 
              className={`btn-add-floating ${showAddMenu ? 'active' : ''}`}
              onClick={() => setShowAddMenu(!showAddMenu)}
              aria-label="Add item"
            >
              ✏️
            </button>
            
            {showAddMenu && (
              <div className="add-menu">
                <button className="add-menu-item" onClick={handleAddExercise}>
                  Exercise
                </button>
                <button className="add-menu-item" onClick={handleAddWorkout}>
                  Workout
                </button>
                <button className="add-menu-item" onClick={handleAddWeight}>
                  Weight
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TrackingPage;
