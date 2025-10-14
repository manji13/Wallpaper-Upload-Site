// src/Pages/Policy/AddPolicy.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Save, Loader, ArrowLeft } from "lucide-react";
import PolicyNav from "../../Components/PolicyNav";

const AddPolicy = () => {
  const [formData, setFormData] = useState({ topic: "", policy: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.topic.trim() || !formData.policy.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/api/policy", formData);
      toast.success("Policy added successfully!");
      setFormData({ topic: "", policy: "" });
    } catch (error) {
      toast.error("Error adding policy");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation Bar */}
      <PolicyNav />
      
      {/* Main Content - Positioned under nav */}
      <div className="p-10 pt-40">
        <div className="max-w-4xl mx-auto">
         
          {/* Main Form Card */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Side - Form */}
            <div className="lg:col-span-3">
              <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-500 ${
                isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Save className="text-white" size={24} />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-white">Add New Policy</h1>
                      <p className="text-blue-100 text-sm mt-1">Create and save new organizational policies</p>
                    </div>
                  </div>
                </div>

                {/* Form Section */}
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Topic Input */}
                    <div className={`transition-all duration-500 delay-100 ${
                      isPageLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Policy Topic *
                      </label>
                      <input
                        type="text"
                        name="topic"
                        placeholder="e.g., Data Privacy Policy, Remote Work Guidelines"
                        value={formData.topic}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>

                    {/* Policy Details Textarea */}
                    <div className={`transition-all duration-500 delay-200 ${
                      isPageLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Policy Details *
                      </label>
                      <textarea
                        name="policy"
                        placeholder="Enter the complete policy details, guidelines, and procedures..."
                        value={formData.policy}
                        onChange={handleChange}
                        rows={10}
                        disabled={isLoading}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className={`pt-4 transition-all duration-500 delay-300 ${
                      isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:shadow-lg disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
                      >
                        {/* Loading Overlay */}
                        {isLoading && (
                          <div className="absolute inset-0 bg-blue-600 flex items-center justify-center">
                            <Loader className="animate-spin" size={20} />
                          </div>
                        )}
                        
                        {/* Button Content */}
                        <div className={`flex items-center gap-3 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                          <Save size={20} />
                          <span className="text-lg">Save Policy</span>
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Right Side - Quick Stats */}
            <div className="lg:col-span-1">
              <div className={`space-y-6 transition-all duration-500 delay-400 ${
                isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                
                {/* Quick Stats Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-4">Policy Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Total Policies</span>
                      <span className="font-semibold text-gray-800">24</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Active</span>
                      <span className="font-semibold text-green-600">18</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Draft</span>
                      <span className="font-semibold text-blue-600">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Archived</span>
                      <span className="font-semibold text-gray-500">3</span>
                    </div>
                  </div>
                </div>

                {/* Quick Tips Card */}
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="font-semibold text-blue-800 mb-3">Tips</h3>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Be clear and specific in policy details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Use consistent formatting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Include effective dates if applicable</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100 max-w-sm mx-4">
            <div className="flex flex-col items-center gap-4">
              {/* Professional Spinner */}
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
              </div>
              
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 text-lg">Saving Policy</h3>
                <p className="text-gray-600 text-sm mt-1">Please wait while we save your policy</p>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div className="bg-blue-600 h-1.5 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPolicy;