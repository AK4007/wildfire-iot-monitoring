import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

import HomePage from './pages/HomePage';
import FireMapPage from './pages/FireMapPage';
import ReportFirePage from './pages/ReportFirePage';
import AdminOverview from './pages/AdminOverview';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<FireMapPage />} />
        <Route path="/report" element={<ReportFirePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminOverview />} />
        <Route path="/admin/table" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
