import React from 'react';
import { Link } from 'react-router-dom';

const AnimatedNavbar = () => {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Wildfire Alert System</h1>
      <div className="flex space-x-6">
        <Link to="/">Home</Link>
        <Link to="/map">Fire Map</Link>
        <Link to="/report">Report Fire</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login">Login</Link>
        <button className="border px-3 py-1 rounded">EN/FR</button>
      </div>
    </nav>
  );
};

export default AnimatedNavbar;
