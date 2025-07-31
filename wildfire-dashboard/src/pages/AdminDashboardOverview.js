import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const AdminDashboardOverview = () => {
  const { isLoggedIn } = useAuth();
  const [data, setData] = useState([]);
  const [latest, setLatest] = useState(null);
  const navigate = useNavigate();

  const API_URL = 'http://18.189.248.234:5000/history?device_id=sensor001';

  useEffect(() => {
    if (!isLoggedIn) return; // Don't fetch data if not logged in

    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'X-User-Role': 'government',
            'Content-Type': 'application/json',
          },
        });

        const json = await response.json();
        const sorted = json.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setData(sorted);
        if (sorted.length > 0) setLatest(sorted[0]);
      } catch (error) {
        console.error('Error fetching fire data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 7000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const fireDetected = Number(latest?.flame) === 1;

  // ❌ Block access if not logged in
  if (!isLoggedIn) {
    return (
      <div className="text-center py-10 text-red-500 text-xl">
        ❌ Access Denied: Please login as an admin.
      </div>
    );
  }

  const convertToLocalTime = (utcString) => {
    if (!utcString) return 'N/A';
    const date = new Date(utcString + 'Z');
    return date.toLocaleString('en-CA', {
      timeZone: 'America/Toronto',
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  // ✅ Render admin dashboard view
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-12 text-center">Admin Dashboard Overview</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {/*  Fire Alert Status */}
        <div
          className={`p-6 rounded-2xl shadow-lg transition-transform transform hover:-translate-y-2 border ${
            fireDetected ? 'bg-red-700/80 border-red-500' : 'bg-green-700/80 border-green-500'
          }`}
        >
          <h2 className="text-xl font-semibold mb-2">🔥 Fire Alert Status</h2>
          <p className="text-lg font-bold">
            {fireDetected ? '⚠️ Fire Detected!' : '✅ Safe - No Active Fire'}
          </p>
          <p className="mt-2 text-sm text-white/80">
            Last Updated: {latest?.timestamp ? convertToLocalTime(latest.timestamp) : 'N/A'}
          </p>
        </div>

        {/* 📋 View Detailed Data */}
        <div
          className="p-6 rounded-2xl backdrop-blur-md bg-white/10 shadow-lg hover:-translate-y-2 transition transform border border-white/20 cursor-pointer"
          onClick={() => navigate('/admin/table')}
        >
          <h2 className="text-xl font-semibold mb-3">📋 View Detailed Data</h2>
          <p className="text-white/80">
            Click to view the full table of sensor data including temperature, humidity, GPS logs.
          </p>
        </div>

        {/* 📊 System Metrics */}
        <div className="p-6 rounded-2xl backdrop-blur-md bg-white/10 shadow-lg hover:-translate-y-2 transition transform border border-white/20">
          <h2 className="text-xl font-semibold mb-3">📊 System Metrics</h2>
          <div className="space-y-2 text-sm text-white/80">
            <p>🔌 <span className="text-white font-semibold">Total Sensor Readings:</span> {data.length}</p>
            <p>🔥 <span className="text-white font-semibold">Flame Value (Latest):</span> {latest?.flame ?? 'N/A'}</p>
            <p>📡 <span className="text-white font-semibold">Active Sensors:</span> 1 (Simulated)</p>
            <p>🕒 <span className="text-white font-semibold">Last Update:</span> {latest?.timestamp ? convertToLocalTime(latest.timestamp) : 'N/A'}</p>
            <p>🌡️ <span className="text-white font-semibold">Avg Temperature:</span> {latest?.temperature ?? 'N/A'} °C</p>
            <p>📍 <span className="text-white font-semibold">GPS Coordinates:</span> 
              {latest?.latitude && latest?.longitude 
                ? `${latest.latitude}, ${latest.longitude}` 
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOverview;
