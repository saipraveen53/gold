import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Printer, IndianRupee, Diamond, Plus, Trash2, Search } from 'lucide-react';
import StaffNavbar from '../../components/Navbars/StaffNavbar';

const StaffDashboard = () => {
  // --- MOCK INVENTORY DATA ---
  const inventoryData = [
    { id: 'G-1001', name: '22K Gold Bridal Necklace', category: 'GOLD', purity: '22K', weight: 45.500, hsn: '7113' },
    { id: 'S-2005', name: '925 Silver Designer Ring', category: 'SILVER', purity: '925', weight: 12.000, hsn: '7113' },
    { id: 'G-1045', name: '18K Diamond Rose Ring', category: 'GOLD', purity: '18K', weight: 5.200, hsn: '7113' },
    { id: 'S-2010', name: '990 Fine Silver Bowl', category: 'SILVER', purity: '990', weight: 250.000, hsn: '7114' },
    { id: 'G-1088', name: '24K Gold Bullion Coin', category: 'GOLD', purity: '24K', weight: 10.000, hsn: '7118' },
    { id: 'S-2099', name: '958 Silver Anklets (Pair)', category: 'SILVER', purity: '958', weight: 45.000, hsn: '7113' }
  ];

  // --- STATE MANAGEMENT ---
  const [cart, setCart] = useState([]); // Multiple items kosam Cart state
  const [billingMode, setBillingMode] = useState('GOLD');
  const [purity, setPurity] = useState('22K');
  
  // Custom Searchable Dropdown States
  const [productSearch, setProductSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

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

  // --- RATES DICTIONARY ---
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

  const handleModeSwitch = (mode) => {
    setBillingMode(mode);
    setPurity(mode === 'GOLD' ? '22K' : '990');
  };

  // --- LIVE PREVIEW CALCULATIONS (For current form inputs) ---
  const currentRate = billingMode === 'GOLD' ? goldRates[purity] : silverRates[purity];
  const gWt = parseFloat(grossWt) || 0;
  const sWt = parseFloat(stoneWt) || 0;
  const wPer = parseFloat(wastage) || 0;
  const mChg = parseFloat(making) || 0;
  const sExch = parseFloat(scrap) || 0;
  const disc = parseFloat(discount) || 0;

  const netWt = gWt > sWt ? gWt - sWt : 0;
  const metalValue = netWt * currentRate;
  const wastageAmt = (wPer / 100) * metalValue;
  const totalValue = metalValue + wastageAmt;
  let itemTaxableAmount = totalValue + mChg - sExch - disc;
  if (itemTaxableAmount < 0) itemTaxableAmount = 0;

  // --- ADD ITEM TO CART LOGIC ---
  const handleAddItem = () => {
    if (!productName || !grossWt) {
      alert("Please enter Product Name and Gross Weight!");
      return;
    }

    const newItem = {
      id: Date.now().toString(), // Unique ID for cart row
      productId,
      productName,
      purity,
      hsn,
      rate: currentRate,
      grossWt: gWt,
      stoneWt: sWt,
      netWt,
      wastage: wPer,
      wastageAmt,
      making: mChg,
      scrap: sExch,
      discount: disc,
      metalValue,
      taxableAmount: itemTaxableAmount
    };

    setCart([...cart, newItem]);

    // Clear form inputs for next product
    setProductId('');
    setProductSearch('');
    setProductName('');
    setGrossWt('');
    setStoneWt('');
    setWastage('');
    setMaking('');
    setScrap('');
    setDiscount('');
  };

  // --- REMOVE ITEM FROM CART ---
  const removeCartItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // --- CART TOTALS AGGREGATION ---
  const totals = cart.reduce((acc, item) => {
    acc.metalValue += item.metalValue;
    acc.wastageAmt += item.wastageAmt;
    acc.making += item.making;
    acc.scrap += item.scrap;
    acc.discount += item.discount;
    acc.taxableAmount += item.taxableAmount;
    return acc;
  }, {
    metalValue: 0, wastageAmt: 0, making: 0, scrap: 0, discount: 0, taxableAmount: 0
  });

  const totalGstAmt = totals.taxableAmount * 0.03;
  const grandTotal = totals.taxableAmount + totalGstAmt;

  // =========================================================
  // --- BULLETPROOF ELECTRON PRINT FUNCTION (IFRAME METHOD) ---
  // =========================================================
  const handlePrint = () => {
    if (cart.length === 0) {
      alert("Please add at least one item to the bill before printing!");
      return;
    }

    // Creating thermal receipt HTML dynamically
    const htmlContent = `
      <div style="text-align: center; margin-bottom: 8px; line-height: 1.2;">
        <h1 style="font-size: 18px; font-weight: bold; margin: 0 0 4px 0;">AK GOLD & SILVER</h1>
        <p style="margin: 0; font-size: 12px;">Main Road, Hyderabad, TS</p>
        <p style="margin: 0; font-size: 12px;">GSTIN: 36ABCDE1234F1Z5</p>
        <p style="margin: 0; font-size: 12px;">Ph: +91 9876543210</p>
      </div>

      <div style="border-top: 1px dashed black; margin: 8px 0;"></div>

      <div style="margin-bottom: 8px; line-height: 1.2; font-size: 12px;">
        <p style="margin: 2px 0;">Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
        <p style="margin: 2px 0;">Bill: INV-${Math.floor(1000 + Math.random() * 9000)}</p>
        <p style="margin: 2px 0;">Cust: ${customerName || 'Cash Sale'} ${mobile && `(${mobile})`}</p>
        <p style="margin: 2px 0; font-weight: bold;">Pay Mode: ${paymentMode}</p>
      </div>

      <div style="border-top: 1px dashed black; margin: 8px 0;"></div>

      <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 4px; font-size: 12px;">
        <span>ITEM DETAILS</span>
        <span>AMT(Rs)</span>
      </div>

      <div style="border-top: 1px dashed black; margin: 8px 0;"></div>

      ${cart.map(item => `
        <div style="margin-bottom: 8px; font-size: 12px;">
          <p style="font-weight: bold; text-transform: uppercase; margin: 0 0 4px 0;">
            ${item.productName} (${item.purity})
          </p>
          <div style="display: flex; justify-content: space-between;">
            <span>NetWt:${item.netWt.toFixed(3)}g x ${item.rate.toFixed(2)}</span>
            <span>${item.metalValue.toFixed(2)}</span>
          </div>
        </div>
      `).join('')}

      <div style="border-top: 1px dashed black; margin: 8px 0;"></div>

      <div style="line-height: 1.4; font-size: 12px;">
        <div style="display: flex; justify-content: space-between;">
          <span>Total Wastage</span>
          <span>${totals.wastageAmt.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Total Making Chg</span>
          <span>${totals.making.toFixed(2)}</span>
        </div>
        ${totals.scrap > 0 ? `
        <div style="display: flex; justify-content: space-between;">
          <span>Scrap Exchange</span>
          <span>-${totals.scrap.toFixed(2)}</span>
        </div>` : ''}
        ${totals.discount > 0 ? `
        <div style="display: flex; justify-content: space-between;">
          <span>Total Discount</span>
          <span>-${totals.discount.toFixed(2)}</span>
        </div>` : ''}
        
        <div style="border-top: 1px solid black; margin: 4px 0; padding-top: 4px; display: flex; justify-content: space-between; font-weight: bold;">
          <span>Taxable Amount</span>
          <span>${totals.taxableAmount.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>CGST (1.5%)</span>
          <span>${(totalGstAmt / 2).toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>SGST (1.5%)</span>
          <span>${(totalGstAmt / 2).toFixed(2)}</span>
        </div>
      </div>

      <div style="border-top: 1px dashed black; margin: 8px 0;"></div>

      <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 16px; margin-bottom: 8px;">
        <span>GRAND TOTAL</span>
        <span>Rs ${grandTotal.toFixed(2)}</span>
      </div>

      <div style="border-top: 1px dashed black; margin: 8px 0;"></div>

      <div style="margin-top: 16px; text-align: center; line-height: 1.2;">
        <p style="font-weight: bold; margin: 0 0 4px 0; font-size: 14px;">*** THANK YOU ***</p>
        <p style="margin: 0 0 8px 0; font-size: 12px;">Visit Again</p>
        <p style="font-size: 10px; margin: 0;">Computer generated invoice</p>
      </div>
    `;
    
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '-9999px';
    iframe.style.bottom = '-9999px';
    iframe.style.width = '80mm';
    iframe.style.height = '100vh';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice</title>
          <style>
            @page { margin: 0; size: auto; }
            body {
              margin: 0;
              padding: 5mm;
              font-family: 'Courier New', Courier, monospace;
              background-color: white;
              color: black;
              width: 80mm;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `);
    iframeDoc.close();

    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 2000);
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans relative">
      
      {/* --- MAIN UI --- */}
      <div>
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
              <div className="grid grid-cols-4 gap-4 mb-6 relative">
                
                {/* Searchable Custom Dropdown */}
                <div className="relative">
                  <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">Search Product</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={productSearch}
                      onChange={(e) => {
                        setProductSearch(e.target.value);
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                      className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-[#DAA520] outline-none pl-8" 
                      placeholder="Type to search..." 
                    />
                    <Search className="absolute left-2.5 top-2.5 text-gray-500" size={16} />
                  </div>
                  
                  {/* Dropdown Options */}
                  {showDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-[#1a1a1a] border border-gray-700 rounded shadow-2xl max-h-48 overflow-y-auto">
                      {inventoryData
                        .filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.id.toLowerCase().includes(productSearch.toLowerCase()))
                        .map(item => (
                        <div 
                          key={item.id} 
                          className="p-2.5 hover:bg-[#DAA520] hover:text-black cursor-pointer text-sm transition-colors text-gray-300"
                          onClick={() => {
                            setProductId(item.id);
                            setProductName(item.name);
                            setProductSearch(`${item.id} - ${item.name}`);
                            setBillingMode(item.category);
                            setPurity(item.purity);
                            setGrossWt(item.weight.toString());
                            setHsn(item.hsn);
                            setShowDropdown(false);
                          }}
                        >
                          <span className="font-bold">{item.id}</span> - {item.name}
                        </div>
                      ))}
                    </div>
                  )}
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
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">Weight & Charges</h3>
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

              {/* Add Item Button */}
              <button 
                onClick={handleAddItem}
                className="w-full bg-[#202020] border border-gray-700 hover:border-[#DAA520] hover:bg-[#DAA520] hover:text-black text-[#DAA520] font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors mb-6"
              >
                <Plus size={20} /> ADD ITEM TO BILL
              </button>

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
            className="space-y-6 flex flex-col h-full"
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
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg flex flex-col flex-grow">
              <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-3">
                <h3 className="text-white text-lg font-bold flex items-center gap-2">
                  <IndianRupee size={18} className="text-[#DAA520]"/> BILL SUMMARY
                </h3>
                <span className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-300 font-bold">{cart.length} Items</span>
              </div>
              
              {/* CART ITEMS LIST */}
              {cart.length > 0 ? (
                <div className="mb-4 max-h-40 overflow-y-auto space-y-2 pr-2">
                  {cart.map((item, idx) => (
                    <div key={item.id} className="bg-[#121212] p-3 rounded border border-gray-800 flex justify-between items-center group">
                      <div>
                        <p className="text-sm font-bold text-gray-200 line-clamp-1">{idx + 1}. {item.productName}</p>
                        <p className="text-xs text-gray-500 font-mono mt-1">
                          {item.netWt.toFixed(3)}g @ {item.purity} | Taxable: ₹{item.taxableAmount.toFixed(2)}
                        </p>
                      </div>
                      <button onClick={() => removeCartItem(item.id)} className="text-red-500 hover:text-red-400 p-2 opacity-70 hover:opacity-100 transition-opacity">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mb-4 text-center py-6 text-gray-600 border border-dashed border-gray-800 rounded bg-[#121212]/50">
                  <p className="text-sm">No items added to bill yet.</p>
                </div>
              )}

              <div className="space-y-3 flex-grow mt-auto">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Metal Value</span>
                  <span className="font-mono text-gray-200">₹ {totals.metalValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Wastage</span>
                  <span className="font-mono text-gray-200">+ ₹ {totals.wastageAmt.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Making Chg</span>
                  <span className="font-mono text-gray-200">+ ₹ {totals.making.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Scrap/Discount</span>
                  <span className="font-mono text-red-400">- ₹ {(totals.scrap + totals.discount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-800 pt-3">
                  <span className="text-gray-300 font-bold">Total Taxable</span>
                  <span className="font-mono text-gray-200 font-bold">₹ {totals.taxableAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">GST (3%)</span>
                  <span className="font-mono text-yellow-500">+ ₹ {totalGstAmt.toFixed(2)}</span>
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
                className={`w-full mt-4 font-extrabold tracking-widest py-4 rounded-lg flex items-center justify-center gap-3 transition-all ${cart.length > 0 ? 'bg-gradient-to-r from-[#B8860B] to-[#DAA520] hover:from-[#DAA520] hover:to-[#FFD700] text-black shadow-[0_5px_20px_rgba(218,165,32,0.3)]' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                disabled={cart.length === 0}
              >
                <Printer size={20} />
                PRINT INVOICE
              </button>
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
};

export default StaffDashboard;