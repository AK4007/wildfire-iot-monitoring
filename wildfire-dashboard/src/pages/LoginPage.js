// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple static check – replace with real auth in production
    if (email === 'admin@wildfire.com' && password === 'admin123') {
      login(); // set auth true
      navigate('/admin/dashboard'); // it has to go to Admin Dashboard for all the metrics
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center">Admin Login</h2>
        
        <input
          type="email"
          placeholder="Enter email"
          className="w-full border px-4 py-2 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          className="w-full border px-4 py-2 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
