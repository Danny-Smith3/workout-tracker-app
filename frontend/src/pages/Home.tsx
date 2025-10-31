import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Workout Tracker</h1>
      <Link
        to="/dashboard"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Home;