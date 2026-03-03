import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Receipt, User, Diamond } from 'lucide-react';

const StaffNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="bg-[#121212] border-b border-[#DAA520]/30 px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo Area */}
      <div className="flex items-center gap-3">
        <Diamond className="text-[#DAA520]" size={28} />
        <div>
          <h1 className="text-[#DAA520] text-xl font-extrabold tracking-widest leading-none">AK GOLD</h1>
          <p className="text-gray-400 text-[10px] tracking-[0.2em] uppercase mt-1">Staff Portal</p>
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        <div className="flex bg-[#1a1a1a] rounded-lg p-1 border border-gray-800">
          <button className="flex items-center gap-2 bg-[#DAA520]/20 text-[#DAA520] px-4 py-2 rounded-md font-semibold text-sm transition-all">
            <Receipt size={16} />
            Billing (New)
          </button>
        </div>

        {/* User & Logout */}
        <div className="flex items-center gap-4 border-l border-gray-700 pl-4">
          <div className="flex items-center gap-2 text-gray-300">
            <User size={18} className="text-gray-400" />
            <span className="text-sm font-medium">Staff User</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm font-bold bg-red-400/10 px-3 py-1.5 rounded"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default StaffNavbar;