import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/gs.jpg';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // --- LOGIN LOGIC ---
  const handleLogin = (e) => {
    e.preventDefault();

    // Spaces theesesi, lowercase ki marchi check cheyadam
    const checkUser = username.trim().toLowerCase();
    const checkPass = password.trim();

    // Role-based Routing
    if (checkUser === 'admin' && checkPass === 'admin123') {
      navigate('/admin'); // Admin Dashboard ki velthundi
    } else if (checkUser === 'staff' && checkPass === 'staff123') {
      navigate('/staff'); // Staff Dashboard ki velthundi
    } else {
      setError('Invalid Username or Password!');
    }
  };

  // --- ANIMATION VARIANTS ---
  const bgVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" } }
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3, ease: "easeOut" } }
  };

  const rightPanelVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const formContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="relative min-h-screen w-full flex overflow-hidden bg-black">

      {/* --- BACKGROUND IMAGE --- */}
      <motion.div
        variants={bgVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 z-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${logo})` }}
      >
        {/* Global slight dark overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Left side gradient to make the text pop without a box */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
      </motion.div>

      {/* --- FLOATING LOGO OVERLAY (Left Side - Text Only) --- */}
      <motion.div
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex absolute top-[35%] left-[10%] flex-col items-start z-10"
      >
        <h1 className="text-[#DAA520] text-7xl md:text-8xl font-extrabold tracking-wider drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
          AK
        </h1>
        <p className="text-white text-3xl md:text-4xl tracking-widest font-light mt-2 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
          GOLD & SILVER
        </p>
        <p className="text-gray-400 text-sm md:text-base tracking-[0.3em] font-medium mt-3 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
          SOFTWARE SYSTEM
        </p>
      </motion.div>

      {/* --- LOGIN FORM PANEL (Right Side - Transparent Glass Effect) --- */}
      <motion.div
        variants={rightPanelVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full md:w-[420px] h-screen ml-auto bg-black/50 backdrop-blur-lg flex flex-col justify-center px-10 md:px-12 shadow-2xl border-l border-white/10"
      >
        <motion.div
          variants={formContainerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-sm mx-auto"
        >
          {/* Header */}
          <motion.h1 variants={itemVariants} className="text-3xl font-bold text-white mb-2 drop-shadow-md">
            Welcome back!
          </motion.h1>
          <motion.p variants={itemVariants} className="text-gray-300 mb-8 text-sm drop-shadow-sm">
            Secure Login Portal
          </motion.p>

          {/* Error Message Display */}
          {error && (
            <motion.p variants={itemVariants} className="text-red-400 mb-4 text-sm font-medium bg-red-900/40 backdrop-blur-sm p-2 rounded border border-red-500/30">
              {error}
            </motion.p>
          )}

          {/* Form Fields */}
          <form onSubmit={handleLogin}>
            <motion.div variants={itemVariants} className="space-y-5">
              <div>
                <label className="block text-gray-200 mb-2 text-xs font-bold tracking-wide">Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/40 text-white rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#DAA520] transition-all border border-gray-600 focus:border-[#DAA520] backdrop-blur-md"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-gray-200 mb-2 text-xs font-bold tracking-wide">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 text-white rounded px-4 py-3 pr-12 focus:outline-none focus:ring-1 focus:ring-[#DAA520] transition-all border border-gray-600 focus:border-[#DAA520] backdrop-blur-md"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-[32px] text-gray-400 hover:text-white transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button
                type="submit"
                onClick={handleLogin}
                className="w-full bg-[#DAA520] hover:bg-[#B8860B] text-black font-bold tracking-wider rounded px-4 py-3.5 mt-6 transition-colors duration-200 shadow-lg"
              >
                SECURE LOGIN
              </button>
            </motion.div>
          </form>

          {/* Footer Note */}
          <motion.div variants={itemVariants} className="mt-10 text-center text-gray-400 text-[11px] uppercase tracking-wider drop-shadow-md">
            Protected by Unique Technology <br /> All Rights Reserved.
          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  );
}