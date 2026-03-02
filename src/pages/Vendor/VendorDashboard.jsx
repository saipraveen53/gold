import React from 'react';
import VendorNavbar from '../../components/Navbars/VendorNavbar';

const VendorDashboard = () => {
  return (
    <div>
      <VendorNavbar />
      <div style={{ padding: '20px' }}>
        <h1>Welcome to Vendor Dashboard</h1>
        <p>Ikkada vendor products mariyu sales details untayi.</p>
      </div>
    </div>
  );
};

export default VendorDashboard;