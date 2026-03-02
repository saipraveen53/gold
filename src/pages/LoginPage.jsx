import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

// Ikkada mee image import
import logo from '../assets/gs.jpg';

// --- SOCIAL ICONS (SVGs for exact match) ---
const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" fill="#1877F2"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ig-grad" x1="2%" y1="98%" x2="98%" y2="2%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="url(#ig-grad)"/>
  </svg>
);

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  // --- ANIMATION VARIANTS ---
  const bgVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" } }
  };

  const logoVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5, ease: "easeOut" } }
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
      
      {/* --- BACKGROUND IMAGE (Now covers full screen) --- */}
      <motion.div
        variants={bgVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 z-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${logo})`, 
        }}
      >
        {/* Subtle global overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </motion.div>

      {/* --- FLOATING LOGO OVERLAY (Left Side) --- */}
      <motion.div 
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex absolute top-1/3 left-[15%] flex-col items-center z-10 opacity-90"
      >
        <h1 className="text-white text-7xl font-light tracking-widest mb-2" style={{ fontFamily: 'sans-serif' }}>MCB</h1>
        <p className="text-gray-200 text-2xl tracking-wide font-light drop-shadow-md">Mack's Chocolate Box</p>
      </motion.div>

      {/* --- LOGIN FORM PANEL (Right Side - Transparent/Glassmorphism) --- */}
      <motion.div 
        variants={rightPanelVariants}
        initial="hidden"
        animate="visible"
        // --- NOTE: Changed background to black/60 with backdrop blur for glass effect ---
        className="relative z-10 w-full md:w-[480px] h-screen ml-auto bg-black/60 backdrop-blur-md flex flex-col justify-center px-10 md:px-14 shadow-2xl border-l border-white/10"
      >
        <motion.div
          variants={formContainerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-sm mx-auto"
        >
          {/* Header */}
          <motion.h1 variants={itemVariants} className="text-3xl font-bold text-white mb-2">
            Welcome back!
          </motion.h1>
          <motion.p variants={itemVariants} className="text-gray-300 mb-10 text-base">
            Login your account
          </motion.p>

          {/* Form Fields */}
          <motion.div variants={itemVariants} className="space-y-5">
            <div>
              <label className="block text-gray-200 mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                defaultValue="admin@lms.com"
                className="w-full bg-[#e8e8e8] text-black rounded-md px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#fdbb7e] transition-all"
              />
            </div>
            
            <div className="relative">
              <label className="block text-gray-200 mb-2 text-sm font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                defaultValue="password"
                className="w-full bg-[#e8e8e8] text-black rounded-md px-4 py-3.5 pr-12 focus:outline-none focus:ring-2 focus:ring-[#fdbb7e] transition-all"
              />
              <button
                type="button"
                className="absolute right-4 top-[38px] text-gray-500 hover:text-gray-700 transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button className="w-full bg-[#fdbb7e] hover:bg-[#fca85e] text-white font-bold tracking-wide rounded-md px-4 py-3.5 mt-2 transition-colors duration-200">
              SIGN IN
            </button>
          </motion.div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="flex items-center my-8">
            <div className="flex-grow border-t border-gray-500/50"></div>
            <span className="mx-4 text-gray-400 text-sm">or sign in with</span>
            <div className="flex-grow border-t border-gray-500/50"></div>
          </motion.div>

          {/* Social Buttons */}
          <motion.div variants={itemVariants} className="flex justify-between gap-4">
            <button className="flex-1 bg-white py-3 rounded-md flex justify-center items-center hover:bg-gray-100 transition duration-200 shadow-sm">
              <GoogleIcon />
            </button>
            <button className="flex-1 bg-white py-3 rounded-md flex justify-center items-center hover:bg-gray-100 transition duration-200 shadow-sm">
              <FacebookIcon />
            </button>
            <button className="flex-1 bg-white py-3 rounded-md flex justify-center items-center hover:bg-gray-100 transition duration-200 shadow-sm">
              <InstagramIcon />
            </button>
          </motion.div>

          {/* Footer */}
          <motion.div variants={itemVariants} className="mt-8 text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <a href="#" className="text-[#3b82f6] hover:underline transition-all">
              View as Guest
            </a>
          </motion.div>
          
        </motion.div>
      </motion.div>
    </div>
  );
}