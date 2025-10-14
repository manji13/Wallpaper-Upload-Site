import React, { useEffect, useState } from "react";
import axios from "axios";
import Usernab from "../../Components/Usernab";

const UserPolicy = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/policy");
        setPolicies(res.data);
      } catch (error) {
        console.error("Error fetching policies", error);
      } finally {
        setTimeout(() => setLoading(false), 1000); // small delay for smooth animation
      }
    };

    fetchPolicies();
  }, []);

  // ✅ Blue background loading animation
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-600">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinning circle */}
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          {/* Text with fade animation */}
          <p className="text-white text-xl font-semibold animate-pulse">
            Loading Policies...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-green-200 p-8 transition-all duration-700">
      <Usernab />
      <h2 className="text-3xl font-bold text-center mb-8">All Policies</h2>

      {policies.length === 0 ? (
        <p className="text-center text-gray-700 text-lg">No policies found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy) => (
            <div
              key={policy._id}
              className="bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow-md transition-transform hover:scale-105 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{policy.topic}</h3>
              <p className="text-gray-700">{policy.policy}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPolicy;
