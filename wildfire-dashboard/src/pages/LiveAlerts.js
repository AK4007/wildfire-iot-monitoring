import React, { useEffect, useState } from 'react';
import AnimatedNavbar from '../components/AnimatedNavbar';

const LiveAlerts = () => {
  const [data, setData] = useState([]);
  const [latest, setLatest] = useState(null);

  // Updated API Gateway endpoint for /history
  const API_URL = 'http://18.189.248.234:5000/history?device_id=sensor001';
  const SUBSCRIBE_API = 'https://molcfvotxg.execute-api.us-east-2.amazonaws.com/prod/subscribe';

  const [email, setEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          mode: 'cors',
          headers: {
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

  // Subscription handler
  const handleSubscribe = async () => {
    if (!email) {
      setSubscribeMessage('⚠️ Please enter a valid email');
      return;
    }

    try {
      const response = await fetch(SUBSCRIBE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const result = await response.json();
        setSubscribeMessage(`✅ ${result.message}`);
        setEmail('');
      } else {
        setSubscribeMessage('❌ Failed to subscribe. Try again.');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      setSubscribeMessage('❌ Error. Please try again.');
    }
  };

  return (
    <>
      <AnimatedNavbar />
      <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <h1 className="text-4xl font-bold mb-10 text-center">Live Wildfire Alerts</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fire Alert Box */}
          <div
            className={`p-6 rounded-xl shadow-lg border-2 ${
              fireDetected ? 'bg-red-700 border-red-500' : 'bg-green-700 border-green-500'
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">🔥 Fire Alert Status</h2>
            <p className="text-lg font-bold">
              {fireDetected ? '⚠️ Fire Detected!' : '✅ Safe - No Active Fire'}
            </p>
            <p className="mt-2 text-sm text-white/80">
              Last Updated:{' '}
              {latest?.timestamp ? convertToLocalTime(latest.timestamp) : 'N/A'}
            </p>
          </div>

          {/* System Metrics Box */}
          <div className="p-6 rounded-xl bg-white/10 shadow-lg border border-white/20">
            <h2 className="text-xl font-semibold mb-3">📊 System Metrics</h2>
            <ul className="text-sm text-white/80 space-y-1">
              <li>
                🔌 <span className="text-white font-semibold">Total Sensor Readings:</span>{' '}
                {data.length}
              </li>
              <li>
                🔥 <span className="text-white font-semibold">Flame Value (Latest):</span>{' '}
                {latest?.flame ?? 'N/A'}
              </li>
              <li>
                📡 <span className="text-white font-semibold">Active Sensors:</span> 1
              </li>
              <li>
                🕒 <span className="text-white font-semibold">Last Update:</span>{' '}
                {latest?.timestamp ? convertToLocalTime(latest.timestamp) : 'N/A'}
              </li>
              <li>
                🌡️ <span className="text-white font-semibold">Temperature:</span>{' '}
                {latest?.temperature ?? 'N/A'} °C
              </li>
              <li>
                📍 <span className="text-white font-semibold">GPS Coordinates:</span>{' '}
                {latest?.latitude && latest?.longitude
                  ? `${Number(latest.latitude).toFixed(4)}, ${Number(latest.longitude).toFixed(4)}`
                  : 'N/A'}
              </li>
            </ul>
          </div>
        </div>

        {/* Subscribe to Alerts Section */}
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-semibold mb-3">📧 Subscribe to Alerts</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md text-black w-72"
            />
            <button
              onClick={handleSubscribe}
              className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700"
            >
              Subscribe
            </button>
          </div>
          {subscribeMessage && (
            <p className="mt-3 text-sm text-yellow-300">{subscribeMessage}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default LiveAlerts;
