import React from 'react';
import { Link } from 'react-router-dom';

const VendorNavbar = () => {
  return (
    <nav style={{ background: '#27ae60', padding: '1rem', color: 'white' }}>
      <h2>Vendor Panel</h2>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
        <li><Link to="/vendor" style={{ color: 'white' }}>My Products</Link></li>
        <li><Link to="/vendor/orders" style={{ color: 'white' }}>Orders</Link></li>
        <li><Link to="/" style={{ color: 'white' }}>Logout</Link></li>
      </ul>
    </nav>
  );
};

export default VendorNavbar;