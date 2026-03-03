import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Printer, IndianRupee, Diamond } from 'lucide-react';
import StaffNavbar from '../../components/Navbars/StaffNavbar';

const StaffDashboard = () => {
  // --- STATE MANAGEMENT ---
  const [billingMode, setBillingMode] = useState('GOLD');
  const [purity, setPurity] = useState('22K'); // Default
  
  // Item Details States
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [hsn, setHsn] = useState('7113');

  // Customer & Payment Details States
  const [customerName, setCustomerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');

  // Calculation Input States
  const [grossWt, setGrossWt] = useState('');
  const [stoneWt, setStoneWt] = useState('');
  const [wastage, setWastage] = useState('');
  const [making, setMaking] = useState('');
  const [scrap, setScrap] = useState('');
  const [discount, setDiscount] = useState('');

  // --- RATES DICTIONARY (Based on your image) ---
  const goldRates = {
    '24K': 7200.00,
    '22K': 6650.00,
    '18K': 5400.00,
    '14K': 4200.00,
    '9K': 2700.00
  };

  const silverRates = {
    '990': 85.00,
    '970': 83.00,
    '958': 81.00,
    '925': 78.00
  };

  // Switch billing mode and reset purity
  const handleModeSwitch = (mode) => {
    setBillingMode(mode);
    setPurity(mode === 'GOLD' ? '22K' : '990');
  };

  // --- CALCULATIONS LOGIC ---
  const currentRate = billingMode === 'GOLD' ? goldRates[purity] : silverRates[purity];
  
  const gWt = parseFloat(grossWt) || 0;
  const sWt = parseFloat(stoneWt) || 0;
  const wPer = parseFloat(wastage) || 0;
  const mChg = parseFloat(making) || 0;
  const sExch = parseFloat(scrap) || 0;
  const disc = parseFloat(discount) || 0;

  // 1. Net Weight
  const netWt = gWt > sWt ? gWt - sWt : 0;
  
  // 2. Metal Value (Net Wt * Rate)
  const metalValue = netWt * currentRate;
  
  // 3. Wastage Amount
  const wastageAmt = (wPer / 100) * metalValue;
  
  // 4. Total Value (Metal + Wastage)
  const totalValue = metalValue + wastageAmt;
  
  // 5. Taxable Amount (Total + Making - Scrap - Discount)
  let taxableAmount = totalValue + mChg - sExch - disc;
  if (taxableAmount < 0) taxableAmount = 0; // Ensure it doesn't go negative

  // 6. GST 3%
  const gstAmt = taxableAmount * 0.03;
  
  // 7. Grand Total
  const grandTotal = taxableAmount + gstAmt;

  // Normal Print Function 
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans relative">
      
      {/* --- BULLETPROOF ELECTRON PRINT CSS --- */}
      <style>
        {`
          .print-only {
            display: none;
          }

          @media print {
            @page {
              margin: 0;
            }
            body, html, #root {
              background-color: #ffffff !important;
              color: #000000 !important;
              margin: 0 !important;
              padding: 0 !important;
              -webkit-print-color-adjust: exact;
            }
            .no-print {
              display: none !important;
            }
            /* Electron 0 pages Bug Fix */
            .print-only {
              display: block !important;
              position: static !important;
              width: 80mm !important;
              margin: 0 auto !important;
              padding: 5mm !important;
              background-color: white !important;
              color: black !important;
              font-family: 'Courier New', Courier, monospace !important;
              min-height: 500px !important; /* Force layout engine to see content height */
              page-break-after: always !important; /* Force 1 page minimum */
              break-after: page !important;
            }
          }
        `}
      </style>

      {/* ========================================== */}
      {/* --- MAIN UI (Hidden automatically in print) --- */}
      {/* ========================================== */}
      <div className="no-print">
        <StaffNavbar />

        <div className="p-6 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT PANEL: PRODUCT & CALCULATION INPUTS */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Top Controls */}
            <div className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-800 shadow-lg flex justify-between items-center">
              <h2 className="text-[#DAA520] font-bold text-lg flex items-center gap-2">
                <Calculator size={20} /> INVOICE GENERATION
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleModeSwitch('GOLD')}
                  className={`px-6 py-2 rounded font-bold text-sm transition-all ${billingMode === 'GOLD' ? 'bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-black shadow-[0_0_15px_rgba(218,165,32,0.4)]' : 'bg-gray-800 text-gray-400 border border-gray-700'}`}
                >
                  GOLD
                </button>
                <button 
                  onClick={() => handleModeSwitch('SILVER')}
                  className={`px-6 py-2 rounded font-bold text-sm transition-all ${billingMode === 'SILVER' ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-black shadow-[0_0_15px_rgba(200,200,200,0.4)]' : 'bg-gray-800 text-gray-400 border border-gray-700'}`}
                >
                  SILVER
                </button>
              </div>
            </div>

            {/* Form Grid */}
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg">
              
              {/* Row 1: Item Details & Purity */}
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">Item Details</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">Product ID</label>
                  <input type="text" value={productId} onChange={(e)=>setProductId(e.target.value)} className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-[#DAA520] outline-none" placeholder="e.g. G-1001" />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">Product Name</label>
                  <input type="text" value={productName} onChange={(e)=>setProductName(e.target.value)} className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-[#DAA520] outline-none" placeholder="e.g. Necklace" />
                </div>
                <div>
                  <label className="block text-[11px] text-[#DAA520] mb-1 uppercase tracking-wide font-bold">Purity</label>
                  <select 
                    value={purity} 
                    onChange={(e) => setPurity(e.target.value)}
                    className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-[#DAA520] outline-none font-bold"
                  >
                    {billingMode === 'GOLD' ? (
                      <>
                        <option value="24K">24K (99.9%)</option>
                        <option value="22K">22K (91.6%)</option>
                        <option value="18K">18K (75.0%)</option>
                        <option value="14K">14K (58.3%)</option>
                        <option value="9K">9K (37.5%)</option>
                      </>
                    ) : (
                      <>
                        <option value="990">990 Fine</option>
                        <option value="970">970 Fine</option>
                        <option value="958">958 Britannia</option>
                        <option value="925">925 Sterling</option>
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">HSN / SAC</label>
                  <input type="text" value={hsn} onChange={(e)=>setHsn(e.target.value)} className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-[#DAA520] outline-none" placeholder="7113" />
                </div>
              </div>

              {/* Row 2: Weight & Charges */}
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">Weight & Charges Calculations</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-[11px] text-[#DAA520] mb-1 uppercase tracking-wide">Gross Wt. (gm)</label>
                  <input 
                    type="number" 
                    value={grossWt}
                    onChange={(e) => setGrossWt(e.target.value)}
                    className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-[#DAA520] outline-none font-mono" 
                    placeholder="0.000" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">Stone Wt. (gm)</label>
                  <input 
                    type="number" 
                    value={stoneWt}
                    onChange={(e) => setStoneWt(e.target.value)}
                    className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-[#DAA520] outline-none font-mono" 
                    placeholder="0.000" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-green-400 mb-1 uppercase tracking-wide font-bold">Net Wt. (gm)</label>
                  <input 
                    type="text" 
                    value={netWt > 0 ? netWt.toFixed(3) : '0.000'}
                    disabled 
                    className="w-full bg-black border border-gray-800 rounded p-2.5 text-green-400 outline-none font-mono font-bold" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">Wastage (%)</label>
                  <input 
                    type="number" 
                    value={wastage}
                    onChange={(e) => setWastage(e.target.value)}
                    className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-[#DAA520] outline-none" 
                    placeholder="0.0" 
                  />
                </div>
                
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">Making Charges (₹)</label>
                  <input 
                    type="number" 
                    value={making}
                    onChange={(e) => setMaking(e.target.value)}
                    className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-[#DAA520] outline-none" 
                    placeholder="0.00" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-red-400 mb-1 uppercase tracking-wide">Scrap Exchange (₹)</label>
                  <input 
                    type="number" 
                    value={scrap}
                    onChange={(e) => setScrap(e.target.value)}
                    className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-red-200 focus:border-red-500 outline-none" 
                    placeholder="0.00" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-blue-400 mb-1 uppercase tracking-wide">Discount (₹)</label>
                  <input 
                    type="number" 
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-blue-200 focus:border-blue-500 outline-none" 
                    placeholder="0.00" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">Current Rate (₹)</label>
                  <input 
                    type="text" 
                    value={currentRate.toFixed(2)}
                    disabled 
                    className="w-full bg-black border border-gray-800 rounded p-2.5 text-gray-400 outline-none font-mono" 
                  />
                </div>
              </div>

              {/* Row 3: Customer Details & Payment Mode */}
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">Customer & Payment Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">Customer Name</label>
                  <input type="text" value={customerName} onChange={(e)=>setCustomerName(e.target.value)} className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-[#DAA520] outline-none" placeholder="Enter name" />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">Mobile Number</label>
                  <input type="text" value={mobile} onChange={(e)=>setMobile(e.target.value)} className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-[#DAA520] outline-none" placeholder="+91" />
                </div>
                <div>
                  <label className="block text-[11px] text-[#DAA520] mb-1 uppercase tracking-wide font-bold">Payment Mode</label>
                  <select 
                    value={paymentMode} 
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-[#DAA520] outline-none font-bold"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card / POS</option>
                    <option value="UPI">UPI / QR Code</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
              </div>

            </div>
          </motion.div>

          {/* RIGHT PANEL: SUMMARY & BILLING */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Live Rates Card */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] p-5 rounded-xl border border-[#DAA520]/20 shadow-lg relative overflow-hidden">
               <div className="absolute -right-6 -top-6 text-[#DAA520] opacity-5">
                  <Diamond size={100} />
               </div>
               <h3 className="text-[#DAA520] text-xs font-bold tracking-widest uppercase mb-3 border-b border-[#DAA520]/20 pb-2">Today's Bullion Rates</h3>
               <div className="flex justify-between items-center mb-2">
                  <span className={`font-medium ${billingMode === 'GOLD' ? 'text-[#DAA520]' : 'text-gray-400'}`}>Gold Base (24K)</span>
                  <span className={`font-mono font-bold tracking-wide ${billingMode === 'GOLD' ? 'text-[#DAA520]' : 'text-gray-400'}`}>₹ {goldRates['24K'].toFixed(2)}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className={`font-medium ${billingMode === 'SILVER' ? 'text-gray-200' : 'text-gray-400'}`}>Silver Base (990)</span>
                  <span className={`font-mono font-bold tracking-wide ${billingMode === 'SILVER' ? 'text-gray-200' : 'text-gray-400'}`}>₹ {silverRates['990'].toFixed(2)}</span>
               </div>
            </div>

            {/* Final Summary Card */}
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg flex flex-col h-[calc(100%-140px)]">
              <h3 className="text-white text-lg font-bold mb-6 border-b border-gray-800 pb-3 flex items-center gap-2">
                <IndianRupee size={18} className="text-[#DAA520]"/> BILL SUMMARY
              </h3>
              
              <div className="space-y-4 flex-grow">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Metal Value</span>
                  <span className="font-mono text-gray-200">₹ {metalValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Wastage Amount</span>
                  <span className="font-mono text-gray-200">+ ₹ {wastageAmt.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Making Charges</span>
                  <span className="font-mono text-gray-200">+ ₹ {mChg.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Scrap / Discount</span>
                  <span className="font-mono text-red-400">- ₹ {(sExch + disc).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-800 pt-3">
                  <span className="text-gray-300 font-bold">Taxable Amount</span>
                  <span className="font-mono text-gray-200">₹ {taxableAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">GST (3%)</span>
                  <span className="font-mono text-yellow-500">+ ₹ {gstAmt.toFixed(2)}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="bg-[#121212] rounded-lg p-4 mt-6 border border-[#DAA520]/30 text-center">
                 <p className="text-gray-400 text-xs tracking-widest uppercase mb-1">Grand Total</p>
                 <h2 className="text-[#DAA520] text-3xl font-bold font-mono">₹ {grandTotal.toFixed(2)}</h2>
              </div>

              {/* Print Button */}
              <button 
                onClick={handlePrint}
                className="w-full mt-6 bg-gradient-to-r from-[#B8860B] to-[#DAA520] hover:from-[#DAA520] hover:to-[#FFD700] text-black font-extrabold tracking-widest py-4 rounded-lg flex items-center justify-center gap-3 shadow-[0_5px_20px_rgba(218,165,32,0.3)] transition-all"
              >
                <Printer size={20} />
                PRINT INVOICE
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ========================================== */}
      {/* --- DMART STYLE THERMAL RECEIPT UI --- */}
      {/* ========================================== */}
      <div className="print-only">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '8px', lineHeight: '1.2' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0' }}>AK GOLD & SILVER</h1>
          <p style={{ margin: '0', fontSize: '12px' }}>Main Road, Hyderabad, TS</p>
          <p style={{ margin: '0', fontSize: '12px' }}>GSTIN: 36ABCDE1234F1Z5</p>
          <p style={{ margin: '0', fontSize: '12px' }}>Ph: +91 9876543210</p>
        </div>

        <div style={{ borderTop: '1px dashed black', margin: '8px 0' }}></div>

        {/* Bill Meta Details */}
        <div style={{ marginBottom: '8px', lineHeight: '1.2', fontSize: '12px' }}>
          <p style={{ margin: '2px 0' }}>Date: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
          <p style={{ margin: '2px 0' }}>Bill: INV-{Math.floor(1000 + Math.random() * 9000)}</p>
          <p style={{ margin: '2px 0' }}>Cust: {customerName || 'Cash Sale'} {mobile && `(${mobile})`}</p>
          <p style={{ margin: '2px 0', fontWeight: 'bold' }}>Pay Mode: {paymentMode}</p>
          <p style={{ margin: '2px 0' }}>Type: {billingMode} ({purity})</p>
        </div>

        <div style={{ borderTop: '1px dashed black', margin: '8px 0' }}></div>

        {/* Items Table Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '4px', fontSize: '12px' }}>
          <span>ITEM DETAILS</span>
          <span>AMT(Rs)</span>
        </div>

        <div style={{ borderTop: '1px dashed black', margin: '8px 0' }}></div>

        {/* Item Row */}
        <div style={{ marginBottom: '8px', fontSize: '12px' }}>
          <p style={{ fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
            {productName || 'JEWELLERY ITEM'} (HSN:{hsn})
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>NetWt:{netWt.toFixed(3)}g x {currentRate.toFixed(2)}</span>
            <span>{metalValue.toFixed(2)}</span>
          </div>
        </div>

        <div style={{ borderTop: '1px dashed black', margin: '8px 0' }}></div>

        {/* Calculations */}
        <div style={{ lineHeight: '1.4', fontSize: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Wastage ({wastage}%)</span>
            <span>{wastageAmt.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Making Charges</span>
            <span>{mChg.toFixed(2)}</span>
          </div>
          {sExch > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Scrap Exchange</span>
              <span>-{sExch.toFixed(2)}</span>
            </div>
          )}
          {disc > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Discount</span>
              <span>-{disc.toFixed(2)}</span>
            </div>
          )}
          
          <div style={{ borderTop: '1px solid black', margin: '4px 0', paddingTop: '4px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
            <span>Taxable Amount</span>
            <span>{taxableAmount.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>CGST (1.5%)</span>
            <span>{(gstAmt / 2).toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>SGST (1.5%)</span>
            <span>{(gstAmt / 2).toFixed(2)}</span>
          </div>
        </div>

        <div style={{ borderTop: '1px dashed black', margin: '8px 0' }}></div>

        {/* Grand Total */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
          <span>GRAND TOTAL</span>
          <span>Rs {grandTotal.toFixed(2)}</span>
        </div>

        <div style={{ borderTop: '1px dashed black', margin: '8px 0' }}></div>

        {/* Footer */}
        <div style={{ marginTop: '16px', textAlign: 'center', lineHeight: '1.2' }}>
          <p style={{ fontWeight: 'bold', margin: '0 0 4px 0', fontSize: '14px' }}>*** THANK YOU ***</p>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px' }}>Visit Again</p>
          <p style={{ fontSize: '10px', margin: '0' }}>Computer generated invoice</p>
        </div>

      </div>

    </div>
  );
};

export default StaffDashboard;