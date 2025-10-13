import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Edit3, LogOut } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Userprofilenav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ec4899', // pink
      cancelButtonColor: '#6b7280',   // gray
      confirmButtonText: 'Yes, logout!',
      reverseButtons: true,
      backdrop: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove user data from localStorage
        localStorage.removeItem("userInfo");
        // Optional: remove token
        // localStorage.removeItem("token");

        // Redirect to home page
        navigate("/");
      }
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-purple-950/90 to-transparent backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-pink-500 tracking-wide">
            WallPix.
          </span>
        </Link>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-4">
          <Link
            to="/userprofile"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 text-gray-200 rounded-full hover:bg-white/20 transition-all duration-200"
          >
            <User className="w-4 h-4 text-pink-400" />
            Profile
          </Link>

          <Link
            to="/editprofile"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 text-gray-200 rounded-full hover:bg-white/20 transition-all duration-200"
          >
            <Edit3 className="w-4 h-4 text-pink-400" />
            Edit Profile
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Userprofilenav;
