import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FireMapPage from './pages/FireMapPage';
import ReportFirePage from './pages/ReportFirePage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import LiveAlerts from './pages/LiveAlerts';
import AdminDashboardOverview from './pages/AdminDashboardOverview'; 
import { Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext'; // if not already

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<FireMapPage />} />
        <Route path="/report" element={<ReportFirePage />} />
        <Route path="/live-alerts" element={<LiveAlerts />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ✅ Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={isLoggedIn ? <AdminDashboardOverview /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/admin/table"
          element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}
export default App;
