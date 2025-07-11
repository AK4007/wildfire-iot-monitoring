import React from 'react';
import { Link } from 'react-router-dom';

const AnimatedNavbar = () => {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Wildfire Alert System</h1>
      <div className="flex space-x-6">
      <Link to="/" className="hover:text-orange-400 transition">Home</Link>
      <Link to="/map" className="hover:text-orange-400 transition">Fire Map</Link>
        <Link to="/report" className="hover:text-orange-400 transition">Report Fire</Link>
        <Link to="/live-alerts" className="hover:text-orange-400 transition">Live Alerts</Link>
        <Link to="/login" className="hover:text-orange-400 transition">Login</Link>
      </div>
    </nav>
  );
};

export default AnimatedNavbar;
