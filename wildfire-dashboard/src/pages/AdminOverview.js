import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedNavbar from '../components/AnimatedNavbar';

const AdminOverview = () => {
  const [data, setData] = useState([]);
  const [latestTimestamp, setLatestTimestamp] = useState('N/A');
  const [latestFlame, setLatestFlame] = useState(0);
  const navigate = useNavigate();

  const API_URL = 'http://localhost:5000/history?device_id=sensor001';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-User-Role': 'government',
          },
        });

        const json = await response.json();
        const sorted = Array.isArray(json)
          ? [...json].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          : [];

        setData(sorted);

        if (sorted.length > 0) {
          const latest = sorted[0];
          const formattedTime = new Date(latest.timestamp).toLocaleString('en-CA', {
            timeZone: 'America/Toronto',
          });
          setLatestTimestamp(formattedTime);
          setLatestFlame(Number(latest.flame));
        }

      } catch (error) {
        console.error('Error fetching fire data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 7000);
    return () => clearInterval(interval);
  }, []);

  const fireDetected = latestFlame > 0;

  const avgTemp = data.length > 0
    ? (
        data.reduce((sum, item) => sum + (Number(item.temperature) || 0), 0) / data.length
      ).toFixed(1)
    : 'N/A';

  return (
    <div className="min-h-screen text-white bg-black">
      <AnimatedNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-10">
        <h1 className="text-4xl font-bold mb-10 text-center">Admin Dashboard Overview</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* 🔥 FIRE STATUS CARD */}
          <div
            className={`p-6 rounded-2xl shadow-lg border transition-all duration-300 ${
              fireDetected
                ? 'bg-red-700/60 border-red-500'
                : 'bg-green-700/60 border-green-500'
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">🔥 Fire Alert Status</h2>
            <p className="text-lg font-bold">
              {fireDetected ? '⚠️ Fire Detected!' : '✅ Safe - No Active Fire'}
            </p>
            <p className="mt-2 text-sm text-white/80">
              Last Updated: {latestTimestamp}
            </p>
          </div>

          {/* 📋 NAV TO TABLE */}
          <div
            className="p-6 rounded-2xl backdrop-blur-md bg-white/10 shadow-lg hover:-translate-y-2 transition-transform cursor-pointer border border-white/20"
            onClick={() => navigate('/admin/table')}
          >
            <h2 className="text-xl font-semibold mb-3">📋 View Detailed Data</h2>
            <p className="text-white/80">
              Click to view the full table of sensor data including temperature, humidity, and GPS logs.
            </p>
          </div>

          {/* 📊 SYSTEM METRICS */}
          <div className="p-6 rounded-2xl backdrop-blur-md bg-white/10 shadow-lg border border-white/20">
            <h2 className="text-xl font-semibold mb-3">📊 System Metrics</h2>
            <p>🔌 Total Sensor Readings: {data.length}</p>
            <p>🔥 Flame Value (Latest): {latestFlame}</p>
            <p>📡 Active Sensors: 1 (Simulated)</p>
            <p>🕒 Last Update: {latestTimestamp}</p>
            <p>📈 Avg Temperature: {avgTemp} °C</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
