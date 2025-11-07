// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
import MainApp from "./pages/MainApp";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          
          {/* Main app routes with navigation - these should be protected */}
          <Route path="/app/settings" element={<MainApp />} />
          <Route path="/app/workouts" element={<MainApp />} />
          <Route path="/app/exercises" element={<MainApp />} />
          <Route path="/app/plan" element={<MainApp />} />
          <Route path="/app/tracking" element={<MainApp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;