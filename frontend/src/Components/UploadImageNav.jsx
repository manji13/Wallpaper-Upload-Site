// UploadImagenav.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Edit3 } from "lucide-react";

const UploadImagenav = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-purple-950/90 to-transparent backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        {/* Upload / Edit Links */}
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-1 px-4 py-2 border border-gray-400 text-gray-300 rounded-full hover:bg-white/10 hover:border-white transition-all duration-200">
            <Upload size={16} />
            <span>Upload Image</span>
          </button>

          <button className="flex items-center space-x-1 px-4 py-2 border border-gray-400 text-gray-300 rounded-full hover:bg-white/10 hover:border-white transition-all duration-200">
            <Edit3 size={16} />
            <span>Edit Upload</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UploadImagenav;
