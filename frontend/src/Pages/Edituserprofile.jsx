import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Save } from "lucide-react";
import Userprofilenav from "../Components/Userprofilenav.jsx";

const EditProfile = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      setFormData({ name: storedUser.name, email: storedUser.email, password: "" });
      setUserId(storedUser._id);
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        formData
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      alert("Profile updated successfully!");
      navigate("/userprofile");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center pt-20 p-4">
      <Userprofilenav />
      <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 shadow-2xl max-w-md w-full mt-16">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-800/50 border border-slate-600 rounded-xl text-white text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-800/50 border border-slate-600 rounded-xl text-white text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter new password (optional)"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-800/50 border border-slate-600 rounded-xl text-white text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-purple-400"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:from-pink-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
