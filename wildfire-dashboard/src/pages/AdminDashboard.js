import React, { useEffect, useState } from 'react';
import AnimatedNavbar from '../components/AnimatedNavbar';


const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://molcfvotxg.execute-api.us-east-2.amazonaws.com/prod/data';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        const formatted = Array.isArray(json) ? json.reverse() : [];
        setData(formatted);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching fire data:', error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
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
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <p className="text-lg">No data available.</p>
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
              <th className="px-6 py-4">Smoke</th>
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
                <td className="px-6 py-3">{item.payload?.temperature ?? 'N/A'}</td>
                <td className="px-6 py-3">{item.payload?.humidity ?? 'N/A'}</td>
                <td className="px-6 py-3">{item.payload?.smoke ?? 'N/A'}</td>
                <td className="px-6 py-3">{item.payload?.flame ?? 'N/A'}</td>
                <td className="px-6 py-3">{item.payload?.latitude ?? 'N/A'}</td>
                <td className="px-6 py-3">{item.payload?.longitude ?? 'N/A'}</td>
                <td className="px-6 py-3">{new Date(item.timestamp).toLocaleString()}</td>
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
