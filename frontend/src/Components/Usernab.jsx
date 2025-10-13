import React from "react";
import { Link } from "react-router-dom";
import { User, Upload } from "lucide-react"; // ✅ Added Upload icon

const Usernab = () => {
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
            to="/userpage"
            className="text-gray-300 hover:text-white relative group transition-all"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/policy"
            className="text-gray-300 hover:text-white relative group transition-all"
          >
            Policy
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/remove-bg"
            className="text-gray-300 hover:text-white relative group transition-all"
          >
            Remove Background
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/contact"
            className="text-gray-300 hover:text-white relative group transition-all"
          >
            Contact Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Right Side: Upload Button + Profile Icon */}
        <div className="flex items-center space-x-4">
          <Link
            to="/uploadimage"
            className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-all duration-200 shadow-md"
          >
            <Upload className="w-4 h-4" />
            Upload
          </Link>

          <Link
            to="/userprofile"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
          >
            <User className="w-6 h-6 text-gray-200" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Usernab;
