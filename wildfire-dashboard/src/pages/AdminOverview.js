import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminOverview = () => {
  const { isLoggedIn } = useAuth(); // 👈 access login state
  const [data, setData] = useState([]);
  const [latestTimestamp, setLatestTimestamp] = useState('');
  const [fireDetected, setFireDetected] = useState(false);
  const navigate = useNavigate();

  const API_URL = 'http://18.189.248.234:5000/history?device_id=sensor001';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        const reversed = Array.isArray(json) ? json.reverse() : [];
        setData(reversed);

        const latest = reversed.find(item => item.timestamp);
        if (latest) {
          setFireDetected(latest.payload?.flame === 1);
          setLatestTimestamp(new Date(latest.timestamp).toLocaleString());
        }
      } catch (error) {
        console.error('Error fetching fire data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-12 text-center">
        {isLoggedIn ? 'Admin Dashboard Overview' : 'Live Alerts'}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* 🔥 Fire Status */}
        <div className={`p-6 rounded-2xl shadow-lg transition-transform transform hover:-translate-y-2 border ${fireDetected ? 'bg-red-700/80 border-red-500' : 'bg-green-700/80 border-green-500'}`}>
          <h2 className="text-xl font-semibold mb-2">🔥 Fire Alert Status</h2>
          <p className="text-lg font-bold">
            {fireDetected ? '⚠️ Fire Detected!' : '✅ Safe - No Active Fire'}
          </p>
          <p className="mt-2 text-sm text-white/80">Last Updated: {latestTimestamp || 'N/A'}</p>
        </div>

        {/* 📋 View Detailed Data – only for admin */}
        {isLoggedIn && (
          <div
            className="p-6 rounded-2xl backdrop-blur-md bg-white/10 shadow-lg hover:-translate-y-2 transition transform border border-white/20 cursor-pointer"
            onClick={() => navigate('/admin/table')}
          >
            <h2 className="text-xl font-semibold mb-3">📋 View Detailed Data</h2>
            <p className="text-white/80">Click to view the full table of sensor data including temperature, humidity, and GPS logs.</p>
          </div>
        )}

        {/* 📊 System Metrics */}
        <div className="p-6 rounded-2xl backdrop-blur-md bg-white/10 shadow-lg hover:-translate-y-2 transition transform border border-white/20">
          <h2 className="text-xl font-semibold mb-3">📊 System Metrics</h2>
          <div className="space-y-2 text-sm text-white/80">
            <p>🔌 <span className="text-white font-semibold">Total Sensor Readings:</span> {data.length}</p>
            <p>🔥 <span className="text-white font-semibold">Flame Value (Latest):</span> {data[0]?.payload?.flame ?? 'N/A'}</p>
            <p>📡 <span className="text-white font-semibold">Active Sensors:</span> 1 (Simulated)</p>
            <p>🕒 <span className="text-white font-semibold">Last Update:</span> {latestTimestamp || 'N/A'}</p>
            <p>🌡️ <span className="text-white font-semibold">Avg Temperature:</span> {
              data.length > 0
                ? (data.reduce((acc, val) => acc + (val.payload?.temperature || 0), 0) / data.length).toFixed(1)
                : 'N/A'
            } °C</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
