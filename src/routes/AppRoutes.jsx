import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import VendorDashboard from '../pages/Vendor/VendorDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default path redirects to Login */}
      <Route path="/" element={<LoginPage />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      
      {/* Vendor Routes */}
      <Route path="/vendor" element={<VendorDashboard />} />
    </Routes>
  );
};

export default AppRoutes;