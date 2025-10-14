// src/Pages/Policy/EditPolicyForm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Save } from "lucide-react";
import { toast } from "react-toastify";
import PolicyNav from "../../Components/PolicyNav";

const EditPolicyForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ topic: "", policy: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/policy/${id}`);
        setFormData(res.data);
      } catch (error) {
        toast.error("Error fetching policy!");
      }
    };
    fetchPolicy();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/policy/${id}`, formData);
      toast.success("Policy updated successfully!");
      navigate("/editpolicy");
    } catch (error) {
      toast.error("Error updating policy!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-200 via-blue-200 to-purple-300 p-8">
      <PolicyNav />
      <div className="max-w-lg mx-auto bg-white/40 backdrop-blur-md p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit Policy</h2>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            name="topic"
            placeholder="Policy Topic"
            value={formData.topic}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea
            name="policy"
            placeholder="Policy Details"
            value={formData.policy}
            onChange={handleChange}
            rows={5}
            className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl"
          >
            <Save size={18} /> Update Policy
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPolicyForm;
