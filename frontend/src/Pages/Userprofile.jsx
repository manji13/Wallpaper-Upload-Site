import React, { useEffect, useState } from "react";
import Userprofilenav from "../Components/Userprofilenav.jsx";

const Userprofile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get logged user info from localStorage
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p className="text-lg">No user logged in</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-24 px-6">
      <Userprofilenav />

      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-center animate-fade-in">
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-3xl font-bold shadow-lg">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
        </div>

        {/* User Details */}
        <h1 className="text-2xl font-semibold text-white mb-2">
          {user.name}
        </h1>
        <p className="text-slate-300 mb-4">{user.email}</p>

        <div className="flex justify-center items-center gap-3 text-sm">
          <span className="px-4 py-1 rounded-full bg-pink-600/40 text-pink-200 font-medium uppercase tracking-wide">
            {user.role}
          </span>
        </div>

        {/* Decorative line */}
        <div className="my-6 border-t border-slate-600/40"></div>

        {/* Extra info */}
        <p className="text-slate-400 text-sm leading-relaxed">
          Welcome back, <span className="text-purple-300 font-medium">{user.name}</span>!  
          You’re logged in as a <span className="text-pink-400">{user.role}</span>.
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Userprofile;
