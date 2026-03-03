import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Package, Users, Settings, LogOut, 
  TrendingUp, AlertCircle, IndianRupee, Diamond, Activity,
  Search, Plus, Edit, Trash2, X, Filter, ChevronDown, Award, Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ==========================================
// 1. DASHBOARD OVERVIEW COMPONENT
// ==========================================
const DashboardOverview = ({ stats, lowStockAlerts, deadStockAlerts, goldRates, silverRates }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-xl border border-gray-800 shadow-lg relative overflow-hidden group hover:border-[#DAA520]/50 transition-all">
        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><IndianRupee size={60} /></div>
        <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-2">Monthly Turnover</p>
        <h3 className="text-3xl font-mono font-bold text-white">₹ {stats.turnover}</h3>
        <p className="text-green-400 text-xs mt-3 flex items-center gap-1"><TrendingUp size={14}/> +12% from last month</p>
      </div>

      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-xl border border-gray-800 shadow-lg relative overflow-hidden group hover:border-[#DAA520]/50 transition-all">
        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><TrendingUp size={60} /></div>
        <p className="text-[#DAA520] text-xs font-bold tracking-widest uppercase mb-2">Estimated Profit</p>
        <h3 className="text-3xl font-mono font-bold text-[#DAA520]">₹ {stats.profit}</h3>
        <p className="text-green-400 text-xs mt-3 flex items-center gap-1"><TrendingUp size={14}/> +5% from last month</p>
      </div>

      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-xl border border-gray-800 shadow-lg relative overflow-hidden group hover:border-[#DAA520]/50 transition-all">
        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Package size={60} /></div>
        <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-2">Total Sales (Items)</p>
        <h3 className="text-3xl font-mono font-bold text-white">{stats.salesCount}</h3>
        <p className="text-gray-500 text-xs mt-3">In current month</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#DAA520]/30 shadow-[0_0_15px_rgba(218,165,32,0.05)]">
        <h3 className="text-[#DAA520] font-bold flex items-center gap-2 mb-4 border-b border-gray-800 pb-2">
          <Activity size={18} /> TODAY'S GOLD RATES (1 GM)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(goldRates).map(([purity, rate]) => (
            <div key={purity} className="flex justify-between items-center bg-[#121212] p-3 rounded border border-gray-800">
              <span className="text-gray-300 text-sm font-medium">{purity}</span>
              <span className="text-[#DAA520] font-mono font-bold tracking-wide">₹ {rate.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-700 shadow-lg">
        <h3 className="text-gray-300 font-bold flex items-center gap-2 mb-4 border-b border-gray-800 pb-2">
          <Activity size={18} /> TODAY'S SILVER RATES (1 GM)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(silverRates).map(([purity, rate]) => (
            <div key={purity} className="flex justify-between items-center bg-[#121212] p-3 rounded border border-gray-800">
              <span className="text-gray-400 text-sm font-medium">{purity}</span>
              <span className="text-white font-mono font-bold tracking-wide">₹ {rate.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#1a1a1a] rounded-xl border border-red-900/30 shadow-lg overflow-hidden">
        <div className="bg-red-900/20 px-6 py-4 border-b border-red-900/30 flex justify-between items-center">
          <h3 className="text-red-400 font-bold flex items-center gap-2">
            <AlertCircle size={18} /> LOW STOCK ALERT
          </h3>
          <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded font-bold">{lowStockAlerts.length} Items</span>
        </div>
        <div className="p-2">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-500 text-xs uppercase bg-[#121212]">
              <tr>
                <th className="p-3 rounded-tl-lg">Item ID</th>
                <th className="p-3">Product Name</th>
                <th className="p-3 rounded-tr-lg text-right">Qty Left</th>
              </tr>
            </thead>
            <tbody>
              {lowStockAlerts.length > 0 ? lowStockAlerts.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-800 last:border-0 hover:bg-[#121212] transition-colors">
                  <td className="p-3 font-mono text-gray-300">{item.id}</td>
                  <td className="p-3 text-gray-300 line-clamp-1">{item.name}</td>
                  <td className="p-3 text-right font-bold text-red-400">{item.qty} Pcs</td>
                </tr>
              )) : (
                <tr><td colSpan="3" className="p-4 text-center text-gray-500">No Low Stock Items</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[#1a1a1a] rounded-xl border border-orange-900/30 shadow-lg overflow-hidden">
        <div className="bg-orange-900/20 px-6 py-4 border-b border-orange-900/30 flex justify-between items-center">
          <h3 className="text-orange-400 font-bold flex items-center gap-2">
            <AlertCircle size={18} /> DEAD STOCK ALERT
          </h3>
          <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded font-bold">{deadStockAlerts.length} Items</span>
        </div>
        <div className="p-2">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-500 text-xs uppercase bg-[#121212]">
              <tr>
                <th className="p-3 rounded-tl-lg">Item ID</th>
                <th className="p-3">Product Name</th>
                <th className="p-3 rounded-tr-lg text-right">Days Unsold</th>
              </tr>
            </thead>
            <tbody>
              {deadStockAlerts.length > 0 ? deadStockAlerts.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-800 last:border-0 hover:bg-[#121212] transition-colors">
                  <td className="p-3 font-mono text-gray-300">{item.id}</td>
                  <td className="p-3 text-gray-300 line-clamp-1">{item.name}</td>
                  <td className="p-3 text-right font-bold text-orange-400">{item.daysUnsold} Days</td>
                </tr>
              )) : (
                <tr><td colSpan="3" className="p-4 text-center text-gray-500">No Dead Stock Items</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </motion.div>
);

// ==========================================
// 2. INVENTORY COMPONENT (WITH SEARCH & FILTERS)
// ==========================================
const InventoryView = ({ inventoryData, setShowAddModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState({ value: 'ALL', label: 'All Purchase Stock' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  const filterOptions = [
    { value: 'ALL', label: 'All Purchase Stock' },
    { value: 'LOW_STOCK', label: 'Low Stock Alert' },
    { value: 'DEAD_STOCK', label: 'Dead Stock Alert' },
    { value: 'EXCHANGE', label: 'Exchange Stock' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const filteredData = inventoryData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (activeFilter.value === 'LOW_STOCK') matchesFilter = product.qty < 5 && product.type !== 'EXCHANGE';
    if (activeFilter.value === 'DEAD_STOCK') matchesFilter = product.daysUnsold > 90 && product.type !== 'EXCHANGE';
    if (activeFilter.value === 'EXCHANGE') matchesFilter = product.type === 'EXCHANGE';
    if (activeFilter.value === 'ALL') matchesFilter = product.type !== 'EXCHANGE'; // Usually 'All' shows only purchase stock
    
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#1a1a1a] p-5 rounded-xl border border-gray-800 shadow-lg">
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search by Product Name or ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121212] border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#DAA520] transition-colors"
          />
          <Search className="absolute left-3 top-3 text-gray-500" size={18} />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto z-20">
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-[#121212] border border-gray-700 hover:border-gray-500 rounded-lg px-4 py-2.5 text-gray-300 font-medium transition-colors w-56 justify-between"
            >
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-[#DAA520]" />
                <span className="truncate">{activeFilter.label}</span>
              </div>
              <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-full bg-[#121212] border border-gray-700 rounded-lg shadow-2xl overflow-hidden"
                >
                  {filterOptions.map((opt) => (
                    <div 
                      key={opt.value}
                      onClick={() => {
                        setActiveFilter(opt);
                        setIsDropdownOpen(false);
                      }}
                      className={`px-4 py-3 cursor-pointer text-sm font-medium transition-colors ${
                        activeFilter.value === opt.value 
                          ? 'bg-[#DAA520]/20 text-[#DAA520]' 
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-black font-bold px-6 py-2.5 rounded-lg shadow-[0_0_15px_rgba(218,165,32,0.3)] hover:from-[#DAA520] hover:to-[#FFD700] transition-all"
          >
            <Plus size={18} /> Add Stock
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {filteredData.length === 0 ? (
        <div className="text-center py-20 bg-[#1a1a1a] rounded-xl border border-gray-800">
          <Package size={48} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-400">No products found</h3>
          <p className="text-gray-500 mt-2">Try changing your search or filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredData.map((product, idx) => (
            <div key={product.id} className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden shadow-lg group hover:border-[#DAA520]/50 transition-all flex flex-col">
              
              <div className="h-48 overflow-hidden relative border-b border-gray-800 bg-[#121212]">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className={`px-2 py-1 text-xs font-bold rounded shadow-md ${product.category === 'GOLD' ? 'bg-[#DAA520] text-black' : 'bg-gray-200 text-black'}`}>
                    {product.category}
                  </span>
                  <span className="px-2 py-1 text-xs font-bold rounded shadow-md bg-black/80 text-white backdrop-blur-sm border border-gray-700">
                    {product.purity}
                  </span>
                </div>
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.qty < 5 && product.type !== 'EXCHANGE' && <span className="px-2 py-1 text-[10px] font-bold rounded shadow-md bg-red-600 text-white">LOW STOCK</span>}
                  {product.daysUnsold > 90 && product.type !== 'EXCHANGE' && <span className="px-2 py-1 text-[10px] font-bold rounded shadow-md bg-orange-600 text-white">DEAD STOCK</span>}
                  {product.type === 'EXCHANGE' && <span className="px-2 py-1 text-[10px] font-bold rounded shadow-md bg-purple-600 text-white">EXCHANGE ITEM</span>}
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-white line-clamp-1">{product.name}</h3>
                </div>
                <p className="text-gray-500 font-mono text-xs mb-4 border-b border-gray-800 pb-3">
                  ID: {product.id} • HSN: {product.hsn}
                  {product.daysUnsold > 0 && ` • Unsold: ${product.daysUnsold} days`}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-4 flex-1">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Weight</p>
                    <p className="text-gray-200 font-bold">{product.weight}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Stock Qty</p>
                    <p className={`font-bold ${product.qty < 5 && product.type !== 'EXCHANGE' ? 'text-red-400' : 'text-green-400'}`}>
                      {product.qty} Pcs {(product.qty < 5 && product.type !== 'EXCHANGE') && '(Low)'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-auto pt-4 border-t border-gray-800/50">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#121212] hover:bg-gray-800 text-gray-300 rounded border border-gray-700 transition-colors text-sm font-medium">
                    <Edit size={16} /> Edit
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#121212] hover:bg-red-900/30 text-red-400 rounded border border-gray-700 hover:border-red-500/50 transition-colors text-sm font-medium">
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

// ==========================================
// 3. STAFF & TARGETS COMPONENT (Expanded)
// ==========================================
const StaffTargetsView = () => {
  const staffMembers = [
    { id: 'STF-01', name: 'Ramesh Babu', role: 'Senior Sales Exec', target: 5000000, achieved: 4200000, commissionRate: 1.5 },
    { id: 'STF-02', name: 'Suresh Kumar', role: 'Sales Exec', target: 3000000, achieved: 3150000, commissionRate: 1.5 },
    { id: 'STF-03', name: 'Priya Reddy', role: 'Junior Sales', target: 1500000, achieved: 800000, commissionRate: 1.0 },
    { id: 'STF-04', name: 'Venkatesh Rao', role: 'Store Manager', target: 8000000, achieved: 8500000, commissionRate: 2.0 },
    { id: 'STF-05', name: 'Anita Sharma', role: 'Sales Exec', target: 3000000, achieved: 2900000, commissionRate: 1.5 },
    { id: 'STF-06', name: 'Karthik N', role: 'Trainee', target: 1000000, achieved: 450000, commissionRate: 0.5 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#1a1a1a] p-5 rounded-xl border border-gray-800 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#DAA520]/20 rounded-lg">
            <Target className="text-[#DAA520]" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Staff Performance & Targets</h2>
            <p className="text-sm text-gray-400">Track monthly sales goals and commissions</p>
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 bg-[#121212] hover:bg-gray-800 text-white font-medium px-6 py-2.5 border border-gray-700 rounded-lg transition-all">
          <Settings size={18} /> Manage Rates
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {staffMembers.map((staff) => {
          const progressPercent = Math.min((staff.achieved / staff.target) * 100, 100);
          const commissionEarned = (staff.achieved * (staff.commissionRate / 100));
          const isTargetMet = staff.achieved >= staff.target;

          return (
            <div key={staff.id} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg relative overflow-hidden">
              {isTargetMet && (
                <div className="absolute top-0 right-0 bg-green-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-lg shadow-md flex items-center gap-1">
                  <Award size={12} /> TARGET REACHED
                </div>
              )}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-[#121212] flex items-center justify-center border-2 border-gray-700">
                    <Users size={20} className="text-[#DAA520]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{staff.name}</h3>
                    <p className="text-xs text-gray-400 font-mono">ID: {staff.id} • {staff.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Commission Rate</p>
                  <p className="text-[#DAA520] font-bold bg-[#DAA520]/10 px-2 py-1 rounded inline-block">{staff.commissionRate}%</p>
                </div>
              </div>

              <div className="mb-6 bg-[#121212] p-4 rounded-lg border border-gray-800/50">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Monthly Target</span>
                  <span className="font-bold text-white font-mono">₹ {staff.target.toLocaleString('en-IN')}</span>
                </div>
                <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full rounded-full ${isTargetMet ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-gradient-to-r from-[#B8860B] to-[#DAA520]'}`}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className={`${isTargetMet ? 'text-green-400' : 'text-[#DAA520]'} font-bold`}>{progressPercent.toFixed(1)}% Achieved</span>
                  <span className="text-gray-400 font-mono">Achieved: ₹ {staff.achieved.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Earned Commission</p>
                  <p className="text-xl font-mono font-bold text-white">₹ {commissionEarned.toLocaleString('en-IN')}</p>
                </div>
                <button className="bg-[#121212] hover:bg-[#DAA520] hover:text-black text-[#DAA520] border border-[#DAA520]/50 transition-colors font-bold px-4 py-2 rounded text-sm">
                  Pay Commission
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};


// ==========================================
// 4. MAIN ADMIN DASHBOARD WRAPPER
// ==========================================
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => navigate('/');

  const stats = { turnover: "45,50,000", profit: "8,20,000", salesCount: 124 };
  
  // FIXED: All Gold & Silver Rates Added
  const goldRates = { '24K': 7200.00, '22K': 6650.00, '18K': 5400.00, '14K': 4200.00, '9K': 2700.00 };
  const silverRates = { '990 Fine': 85.00, '970 Fine': 83.00, '958 Britannia': 81.00, '925 Sterling': 78.00 };

  // 9 Premium Products covering all filters
  const inventoryData = [
    { id: 'G-1001', name: '22K Gold Bridal Necklace', category: 'GOLD', purity: '22K', weight: '45.500 g', qty: 12, hsn: '7113', type: 'PURCHASE', daysUnsold: 10, img: 'https://m.media-amazon.com/images/I/51enyK6kZgL._AC_UY1100_.jpg' },
    { id: 'S-2005', name: '925 Silver Designer Ring', category: 'SILVER', purity: '925', weight: '12.000 g', qty: 3, hsn: '7113', type: 'PURCHASE', daysUnsold: 30, img: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSHwo6yCk0XUbLeOA2vIX_9CbDlzv7axl_bZV9HSfu8oShtsTbdeQHvIUgQCDzMgl5CkmKHldbS86Fy0Daa5W0qCTODh4ziicI-VmLI3ja5I-LKlPXMt8ADMt8' }, // Low Stock
    { id: 'G-1045', name: '18K Diamond Rose Ring', category: 'GOLD', purity: '18K', weight: '5.200 g', qty: 8, hsn: '7113', type: 'PURCHASE', daysUnsold: 120, img: 'data:image/jpeg;base64,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' }, // Dead Stock
    { id: 'S-2010', name: '990 Fine Silver Bowl', category: 'SILVER', purity: '990', weight: '250.000 g', qty: 15, hsn: '7114', type: 'PURCHASE', daysUnsold: 5, img: 'data:image/jpeg;base64,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' },
    { id: 'E-3001', name: 'Old Gold Chain (Customer)', category: 'GOLD', purity: '22K', weight: '15.000 g', qty: 1, hsn: '7113', type: 'EXCHANGE', daysUnsold: 2, img: 'data:image/jpeg;base64,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' }, // Exchange
    { id: 'G-1088', name: '24K Gold Bullion Coin', category: 'GOLD', purity: '24K', weight: '10.000 g', qty: 2, hsn: '7118', type: 'PURCHASE', daysUnsold: 100, img: 'data:image/jpeg;base64,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' }, // Low & Dead Stock
    { id: 'S-2099', name: '958 Silver Anklets (Pair)', category: 'SILVER', purity: '958', weight: '45.000 g', qty: 20, hsn: '7113', type: 'PURCHASE', daysUnsold: 15, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop' },
    { id: 'G-1102', name: '22K Gold Bangles Set', category: 'GOLD', purity: '22K', weight: '30.000 g', qty: 4, hsn: '7113', type: 'PURCHASE', daysUnsold: 45, img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop' }, // Low Stock
    { id: 'E-3005', name: 'Scrap Silver Spoons', category: 'SILVER', purity: '925', weight: '150.000 g', qty: 1, hsn: '7114', type: 'EXCHANGE', daysUnsold: 1, img: 'data:image/jpeg;base64,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' }, // Exchange
  ];

  // Dynamically calculate alerts for dashboard based on inventory
  const lowStockAlerts = inventoryData.filter(item => item.qty < 5 && item.type !== 'EXCHANGE');
  const deadStockAlerts = inventoryData.filter(item => item.daysUnsold > 90 && item.type !== 'EXCHANGE');

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-gray-200 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-[#121212] border-r border-[#DAA520]/20 flex flex-col shadow-2xl z-30 relative">
        <div className="p-6 border-b border-gray-800 flex items-center gap-3">
          <Diamond className="text-[#DAA520]" size={28} />
          <div>
            <h1 className="text-[#DAA520] text-xl font-extrabold tracking-widest leading-none">AK GOLD</h1>
            <p className="text-gray-400 text-[10px] tracking-[0.2em] uppercase mt-1">Admin Panel</p>
          </div>
        </div>
        <div className="flex-1 py-6 px-4 space-y-2">
          <button onClick={() => setActiveTab('DASHBOARD')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'DASHBOARD' ? 'bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-black' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}><LayoutDashboard size={18} /> Dashboard</button>
          <button onClick={() => setActiveTab('INVENTORY')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'INVENTORY' ? 'bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-black' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}><Package size={18} /> Inventory</button>
          <button onClick={() => setActiveTab('STAFF')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'STAFF' ? 'bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-black' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}><Users size={18} /> Staff & Targets</button>
        </div>
        <div className="p-4 border-t border-gray-800 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-sm text-gray-400 hover:bg-gray-800"><Settings size={18} /> Settings</button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold text-sm text-red-400 hover:bg-red-400/10"><LogOut size={18} /> Logout</button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#0a0a0a] to-[#0a0a0a]">
        <header className="px-8 py-6 border-b border-gray-800/50 flex justify-between items-center bg-black/20 backdrop-blur-md sticky top-0 z-20">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wide">
              {activeTab === 'DASHBOARD' && 'Business Overview'}
              {activeTab === 'INVENTORY' && 'Inventory Management'}
              {activeTab === 'STAFF' && 'Staff & Commission'}
            </h2>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="bg-[#121212] border border-[#DAA520]/30 px-4 py-2 rounded-lg flex items-center gap-2 text-[#DAA520]">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live Rates Active
            </div>
          </div>
        </header>

        <main className="p-8">
          {activeTab === 'DASHBOARD' && <DashboardOverview stats={stats} lowStockAlerts={lowStockAlerts} deadStockAlerts={deadStockAlerts} goldRates={goldRates} silverRates={silverRates} />}
          {activeTab === 'INVENTORY' && <InventoryView inventoryData={inventoryData} setShowAddModal={setShowAddModal} />}
          {activeTab === 'STAFF' && <StaffTargetsView />}
        </main>
      </div>

      {/* ADD NEW PRODUCT MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#1a1a1a] rounded-xl border border-gray-700 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-[#121212]">
                <h2 className="text-xl font-bold text-[#DAA520] flex items-center gap-2"><Package size={20} /> Add Purchase/Exchange Stock</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white transition-colors p-1"><X size={24} /></button>
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar">
                <form className="space-y-6">
                  <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-[#DAA520] transition-colors bg-[#121212]/50 cursor-pointer">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="p-3 bg-gray-800 rounded-full mb-3"><Plus size={24} className="text-[#DAA520]" /></div>
                      <p className="font-medium text-white mb-1">Click to upload product image</p>
                    </div>
                  </div>
                  
                  {/* EXPANDED FIELDS LIST */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">Product ID</label>
                      <input type="text" placeholder="e.g. G-1005" className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">Product Name</label>
                      <input type="text" placeholder="Enter product name" className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">Category</label>
                      <select className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white outline-none">
                        <option>GOLD</option>
                        <option>SILVER</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">Purity</label>
                      <select className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white outline-none">
                        <option>24K</option>
                        <option>22K</option>
                        <option>18K</option>
                        <option>14K</option>
                        <option>9K</option>
                        <option>990 Fine</option>
                        <option>970 Fine</option>
                        <option>958 Britannia</option>
                        <option>925 Sterling</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#DAA520] mb-1 font-bold uppercase tracking-wide">Gross Weight (gm)</label>
                      <input type="number" placeholder="0.000" className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">Stock Quantity (Pcs)</label>
                      <input type="number" placeholder="1" className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">HSN / SAC</label>
                      <input type="text" placeholder="7113" className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#DAA520] mb-1 font-bold uppercase tracking-wide">Stock Type</label>
                      <select className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-[#DAA520] font-bold outline-none">
                        <option value="PURCHASE">PURCHASE</option>
                        <option value="EXCHANGE">EXCHANGE</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div className="px-6 py-4 border-t border-gray-800 bg-[#121212] flex justify-end gap-3">
                <button onClick={() => setShowAddModal(false)} className="px-6 py-2 rounded font-bold text-sm text-gray-400 hover:text-white transition-all">Cancel</button>
                <button className="px-6 py-2 rounded font-bold text-sm bg-[#DAA520] hover:bg-[#B8860B] text-black transition-all">Save Stock</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;