import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav style={{ background: '#2c3e50', padding: '1rem', color: 'white' }}>
      <h2>Admin Panel</h2>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
        <li><Link to="/admin" style={{ color: 'white' }}>Dashboard</Link></li>
        <li><Link to="/admin/users" style={{ color: 'white' }}>Manage Users</Link></li>
        <li><Link to="/" style={{ color: 'white' }}>Logout</Link></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;