import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">
        <Link to="/">Wildfire Alert System</Link>
      </div>
      <div className="flex space-x-6 text-sm font-medium items-center">
        <Link to="/" className="hover:text-orange-400 transition">Home</Link>
        <Link to="/map" className="hover:text-orange-400 transition">Fire Map</Link>
        <Link to="/report" className="hover:text-orange-400 transition">Report Fire</Link>
        <Link to="/live-alerts" className="...">Live Alerts</Link>
        <Link to="/admin" className="hover:text-orange-400 transition">Admin</Link>
        <button className="border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition">EN/FR</button>
      </div>
    </nav>
  );
};

export default Header;
