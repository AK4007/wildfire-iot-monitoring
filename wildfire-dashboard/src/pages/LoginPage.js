import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'admin@wildfire.com' && password === 'admin123') {
      navigate('/admin');
    } else {
      alert('Invalid credentials. Try admin@example.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-white">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">🔐 Admin Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded bg-orange-500 hover:bg-orange-600 font-semibold transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
