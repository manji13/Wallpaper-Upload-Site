import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Mail, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/signin", formData);
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log("Login Response:", data);

      // Show success animation
      setShowSuccess(true);

      // Redirect after 2.5 seconds
      setTimeout(() => {
        if (data.role && data.role.toLowerCase() === "employee") {
          navigate("/employeepage");
        } else {
          navigate("/userpage");
        }
      }, 2500);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden pt-20">
      <Navbar />
      
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
          style={{ animationDelay: '0s' }}
        ></div>
        <div 
          className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
          style={{ animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
          style={{ animationDelay: '4s' }}
        ></div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes successPop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-success {
          animation: successPop 0.5s ease-out forwards;
        }
      `}</style>

      <div className="flex w-full max-w-6xl relative z-10 gap-8 items-center">
        {/* Left side - Sign in form */}
        <div className="w-full lg:w-1/2 animate-fade-in-up">
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-1">Sign in</h1>
              <p className="text-slate-400 text-xs">Enter your credentials to continue</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email input */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                </div>
              </div>

              {/* Password input */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-4 h-4 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    onChange={handleChange}
                    value={formData.password}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-purple-400 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-purple-600 bg-slate-800 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="ml-2 text-xs text-slate-400">Remember me</span>
                </label>
                <a href="#" className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:from-pink-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
              >
                LOGIN
              </button>

              {/* Sign up link */}
              <p className="text-center text-xs text-slate-400 mt-4">
                Don't have an account?{" "}
                <a href="/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                  Sign up now
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Right side - Welcome text */}
        <div className="hidden lg:block lg:w-1/2">
          <div className="text-right animate-float">
            <h2 className="text-5xl font-bold text-white mb-3">Welcome Back.</h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-md ml-auto">
              Unlock stunning wallpapers, personalize your screen, and explore a world of breathtaking images with just one login.
            </p>
            <div className="mt-6">
              <p className="text-slate-500 text-xs">
                New to this?{" "}
                <a href="/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                  Sign up now
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-purple-700 to-pink-600 p-8 rounded-3xl text-white shadow-2xl animate-success flex flex-col items-center">
            <CheckCircle className="w-16 h-16 mb-3 text-green-300 animate-bounce" />
            <h2 className="text-2xl font-bold mb-1">Login Successful!</h2>
            <p className="text-sm text-purple-100 text-center">
              Redirecting to your dashboard...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
