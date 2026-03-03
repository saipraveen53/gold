import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import StaffDashboard from '../pages/Staff/StaffDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/staff" element={<StaffDashboard />} />
    </Routes>
  );
};

export default AppRoutes;