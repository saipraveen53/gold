import React from 'react';
import AdminNavbar from '../../components/Navbars/AdminNavbar';

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <div style={{ padding: '20px' }}>
        <h1>Welcome to Admin Dashboard</h1>
        <p>Ikkada admin related settings mariyu user management untundhi.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;