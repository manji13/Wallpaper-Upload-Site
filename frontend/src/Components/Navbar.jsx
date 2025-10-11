import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-purple-950/90 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              <span className="text-pink-500">WallPix .</span>
            </span>
          </Link>

          {/* Navigation Links & Sign In Button */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                to="/about" 
                className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Sign In Button */}
            <Link 
              to="/login"
              className="px-6 py-2 border border-gray-400 text-gray-300 rounded-full hover:bg-white/10 hover:border-white transition-all duration-200"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;