import React, { useEffect, useState } from 'react';
import AnimatedNavbar from '../components/AnimatedNavbar';

const LiveAlerts = () => {
  const [data, setData] = useState([]);
  const [latest, setLatest] = useState(null);

  const API_URL = 'http://18.189.248.234:5000/history?device_id=sensor001';

  useEffect(() => {
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
        const sorted = Array.isArray(json)
          ? json.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          : [];

        setData(sorted);
        if (sorted.length > 0) {
          setLatest(sorted[0]);
        }
      } catch (error) {
        console.error('Failed to fetch live alert data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const convertToLocalTime = (utcString) => {
    const date = new Date(utcString + 'Z'); // ensure UTC parsing
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

  const fireDetected = Number(latest?.flame) === 1;

  return (
    <>
      <AnimatedNavbar />
      <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <h1 className="text-4xl font-bold mb-10 text-center">Live Wildfire Alerts</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 🔥 Fire Alert Box */}
          <div className={`p-6 rounded-xl shadow-lg border-2 ${fireDetected ? 'bg-red-700 border-red-500' : 'bg-green-700 border-green-500'}`}>
            <h2 className="text-xl font-semibold mb-2">🔥 Fire Alert Status</h2>
            <p className="text-lg font-bold">
              {fireDetected ? '⚠️ Fire Detected!' : '✅ Safe - No Active Fire'}
            </p>
            <p className="mt-2 text-sm text-white/80">
              Last Updated: {latest?.timestamp ? convertToLocalTime(latest.timestamp) : 'N/A'}
            </p>
          </div>

          {/* 📊 System Metrics Box */}
          <div className="p-6 rounded-xl bg-white/10 shadow-lg border border-white/20">
            <h2 className="text-xl font-semibold mb-3">📊 System Metrics</h2>
            <ul className="text-sm text-white/80 space-y-1">
              <li>🔌 <span className="text-white font-semibold">Total Sensor Readings:</span> {data.length}</li>
              <li>🔥 <span className="text-white font-semibold">Flame Value (Latest):</span> {latest?.flame ?? 'N/A'}</li>
              <li>📡 <span className="text-white font-semibold">Active Sensors:</span> 1 </li>
              <li>🕒 <span className="text-white font-semibold">Last Update:</span> {latest?.timestamp ? convertToLocalTime(latest.timestamp) : 'N/A'}</li>
              <li>🌡️ <span className="text-white font-semibold">Temperature:</span> {latest?.temperature ?? 'N/A'} °C</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveAlerts;
