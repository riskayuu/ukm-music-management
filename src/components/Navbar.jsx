import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from '../images/logo1.jpg';
import "boxicons/css/boxicons.min.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", label: "Home", icon: "bx-home-alt" },
    { path: "/about", label: "About Us", icon: "bx-info-circle" },
    { path: "/kegiatan", label: "Kegiatan", icon: "bx-calendar-event" },
    { path: "/daftar", label: "Daftar", icon: "bx-user-plus" }
  ];

  return (
    <motion.nav 
      initial={false}
      animate={{ 
        backgroundColor: scrolled ? "rgb(17 24 39)" : "rgb(31 41 55)",
        boxShadow: scrolled ? "0 2px 4px rgba(0,0,0,0.1)" : "none" 
      }}
      className="fixed w-full top-0 z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <motion.img 
              whileHover={{ scale: 1.1, rotate: 5 }}
              src={logo}
              alt="Logo UKM Seni Musik UAD" 
              className="w-12 h-12 rounded-full shadow-lg"
            />
            <div>
              <h1 className="text-xl font-bold text-white">UKM Seni Musik</h1>
              <p className="text-sm text-gray-300">Universitas Ahmad Dahlan</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200
                    ${isActive(item.path) 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                >
                  <i className={`bx ${item.icon}`}></i>
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-700 focus:outline-none"
          >
            <i className={`bx ${isOpen ? 'bx-x' : 'bx-menu'} text-2xl`}></i>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    onClick={toggleMenu}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg mb-1
                      ${isActive(item.path)
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                  >
                    <i className={`bx ${item.icon}`}></i>
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default Navbar;
