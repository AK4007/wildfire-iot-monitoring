import React, { useEffect, useState } from 'react';
import AnimatedNavbar from '../components/AnimatedNavbar';

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://18.189.248.234:5000/history?device_id=sensor001';

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'X-User-Role': 'government',
          'Content-Type': 'application/json'
        }
      });

      const json = await response.json();
      console.log("Fetched data from API:", json);  // ✅ Debug log

      const sorted = json.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setData(sorted);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      setLoading(false);
    }
  };

  fetchData();
  const interval = setInterval(fetchData, 5000); // refresh every 5 seconds
  return () => clearInterval(interval);
}, []);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <p className="text-lg animate-pulse">Loading sensor data...</p>
      </div>
    );
  }

  if (!data.length) {
    console.log("Final sensor data array:", data);
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <p className="text-lg">No sensor data found in the past 30 minutes.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-black">
      <AnimatedNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-10">
        <h1 className="text-4xl font-bold mb-8 text-center">Admin Sensor Table</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white shadow-lg backdrop-blur-xl bg-white/10 rounded-lg">
            <thead className="text-xs uppercase bg-white/10 border-b border-white/20">
              <tr>
                <th className="px-6 py-4">Sensor ID</th>
                <th className="px-6 py-4">Temperature</th>
                <th className="px-6 py-4">Humidity</th>
                <th className="px-6 py-4">Gas Level</th>
                <th className="px-6 py-4">Flame</th>
                <th className="px-6 py-4">Latitude</th>
                <th className="px-6 py-4">Longitude</th>
                <th className="px-6 py-4">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-white/20 border-b border-white/10 transition-all">
                  <td className="px-6 py-3">{item.device_id}</td>
                  <td className="px-6 py-3">{item.temperature ?? 'N/A'}</td>
                  <td className="px-6 py-3">{item.humidity ?? 'N/A'}</td>
                  <td className="px-6 py-3">{item.gas_level ?? 'N/A'}</td>
                  <td className="px-6 py-3">{item.flame ?? 'N/A'}</td>
                  <td className="px-6 py-3">{item.latitude ?? 'N/A'}</td>
                  <td className="px-6 py-3">{item.longitude ?? 'N/A'}</td>
                  <td className="px-6 py-3">
                    {item.timestamp
                      ? new Intl.DateTimeFormat('en-CA', {
                          timeZone: 'America/Toronto',
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: true,
                        }).format(new Date(item.timestamp + 'Z'))
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
