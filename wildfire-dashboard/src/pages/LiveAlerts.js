import React, { useEffect, useState } from 'react';
import AnimatedNavbar from '../components/AnimatedNavbar';

const LiveAlerts = () => {
  const [data, setData] = useState([]);
  const [latestTimestamp, setLatestTimestamp] = useState('');
  const [fireDetected, setFireDetected] = useState(false);

  const API_URL = 'https://molcfvotxg.execute-api.us-east-2.amazonaws.com/prod/data';

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
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* ✅ Add Navbar here */}
      <AnimatedNavbar />

      <div className="px-6 py-10">
        <h1 className="text-4xl font-bold mb-12 text-center">Live Wildfire Alerts</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 🔥 Fire Status */}
          <div className={`p-6 rounded-2xl backdrop-blur-md shadow-lg border ${fireDetected ? 'border-red-500 bg-red-700/20' : 'border-green-500 bg-green-700/20'}`}>
            <h2 className="text-xl font-semibold mb-2">🔥 Fire Alert Status</h2>
            <p className="text-lg">
              {fireDetected ? (
                <span className="text-red-400 font-bold">⚠️ Fire Detected!</span>
              ) : (
                <span className="text-green-400 font-bold">✅ Safe - No Active Fire</span>
              )}
            </p>
            <p className="mt-2 text-sm text-white/80">Last Updated: {latestTimestamp || 'N/A'}</p>
          </div>

          {/* 📊 System Metrics */}
          <div className="p-6 rounded-2xl backdrop-blur-md bg-white/10 shadow-lg border border-white/20">
            <h2 className="text-xl font-semibold mb-3">📊 System Metrics</h2>
            <div className="space-y-2 text-sm text-white/80">
              <p>🔌 <span className="text-white font-semibold">Total Sensor Readings:</span> {data.length}</p>
              <p>🔥 <span className="text-white font-semibold">Flame Value (Latest):</span> {data[0]?.payload?.flame ?? 'N/A'}</p>
              <p>📡 <span className="text-white font-semibold">Active Sensors:</span> 1 (Simulated)</p>
              <p>🕒 <span className="text-white font-semibold">Last Update:</span> {latestTimestamp || 'N/A'}</p>
              <p>📈 <span className="text-white font-semibold">Average Temperature:</span> {
                data.length > 0
                  ? (data.reduce((acc, val) => acc + (val.payload?.temperature || 0), 0) / data.length).toFixed(1)
                  : 'N/A'
              } °C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAlerts;
