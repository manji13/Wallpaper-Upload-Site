import React from 'react'
import { Link } from "react-router-dom";
import { User, Home, BarChart3 } from "lucide-react";

const EmployeeNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-purple-950/90 to-transparent backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-pink-500 tracking-wide">
            WallPix.
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <Link
            to="/employeepage"
            className="flex items-center space-x-2 text-gray-300 hover:text-white relative group transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/chartpage"
            className="flex items-center space-x-2 text-gray-300 hover:text-white relative group transition-all"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Chart</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/policy"
            className="text-gray-300 hover:text-white relative group transition-all"
          >
            Policy
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

        </div>

        {/* Profile Icon */}
        <div className="flex items-center space-x-4">
          <Link
            to="/profile"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
            title="Profile"
          >
            <User className="w-6 h-6 text-gray-200" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default EmployeeNav
