import React, { useEffect, useState } from "react";
import axios from "axios";
import Usernab from "../../Components/Usernab";
import { FileText, Shield, CheckCircle } from "lucide-react";

import Footer from "../../Components/footer";

const UserPolicy = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/policy");
        setPolicies(res.data);
      } catch (error) {
        console.error("Error fetching policies", error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchPolicies();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-xl font-semibold animate-pulse">
            Loading Policies...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Usernab />
      <div className="max-w-5xl mx-auto px-4 py-12 pt-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-6 shadow-lg">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            All Policies
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transparent guidelines to help you understand how we work and protect your rights
          </p>
        </div>

        {policies.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-xl">No policies found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {policies.map((policy, index) => (
              <div
                key={policy._id}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                
                {/* Content */}
                <div className="relative bg-white rounded-3xl p-8 m-[2px]">
                  <div className="flex items-start gap-6">
                    {/* Icon Section */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-md">
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Text Content - This shows YOUR data from API */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {policy.topic}
                        </h3>
                        <CheckCircle className="w-6 h-6 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {policy.policy}
                      </p>
                    </div>

                    {/* Number Badge */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center shadow-sm">
                        <span className="text-blue-600 font-bold text-lg">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="mt-6 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700 font-medium">
              Your trust is our priority
            </span>
          </div>
        </div>
      </div>
    </div>

    <Footer />
    </div>
  );
};

export default UserPolicy;