// src/Pages/Policy/EditPolicy.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PolicyNav from "../../Components/PolicyNav";

const EditPolicy = () => {
  const [policies, setPolicies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/policy");
      setPolicies(res.data);
    } catch (error) {
      console.error("Error fetching policies", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editpolicyform/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this policy?")) {
      try {
        await axios.delete(`http://localhost:5000/api/policy/${id}`);
        setPolicies(policies.filter((p) => p._id !== id));
        toast.success("Policy deleted successfully!");
      } catch (error) {
        toast.error("Error deleting policy!");
      }
    }
  };

  return (
    <div>
    
    <div className="min-h-screen bg-gradient-to-tr from-yellow-200 via-green-200 to-blue-200 p-8">
        <PolicyNav />
      <h2 className="text-3xl font-bold text-center mb-8">Manage Policies</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((policy) => (
          <div
            key={policy._id}
            className="bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow-md transition-all hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">{policy.topic}</h3>
            <p className="text-gray-700 mb-4">{policy.policy}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleEdit(policy._id)}
                className="text-blue-600 hover:text-blue-800"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDelete(policy._id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default EditPolicy;
