import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeNav from "../Components/EmployeeNav"; // Navbar
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#ec4899", "#8b5cf6"];

const EmployeePage = () => {
  const [stats, setStats] = useState({ employeeCount: 0, userCount: 0, total: 0 });
  const [users, setUsers] = useState([]);

  // Fetch stats and users
  const fetchData = async () => {
    try {
      const { data: statsData } = await axios.get("http://localhost:5000/api/users/stats");
      setStats(statsData);

      const { data: usersData } = await axios.get("http://localhost:5000/api/users");
      setUsers(usersData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
      fetchData();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const chartData = [
    { name: "Employees", value: stats.employeeCount },
    { name: "Users", value: stats.userCount },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <EmployeeNav />

      <div className="max-w-6xl mx-auto p-6 mt-10 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">User & Employee Dashboard</h1>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {/* Pie Chart */}
          <div className="bg-slate-800/60 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl text-center text-slate-300 mb-4">Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-slate-800/60 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl text-center text-slate-300 mb-4">Comparison</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="value" fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto bg-slate-800/60 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl text-slate-300 font-semibold mb-4">Registered Users & Employees</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="px-4 py-2 text-slate-300">Name</th>
                <th className="px-4 py-2 text-slate-300">Email</th>
                <th className="px-4 py-2 text-slate-300">Role</th>
                <th className="px-4 py-2 text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-2 text-white">{user.name}</td>
                  <td className="px-4 py-2 text-white">{user.email}</td>
                  <td className="px-4 py-2 text-white capitalize">{user.role}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-slate-400 py-4">
                    No registered users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center text-slate-300">
          <p>
            Total Registered Accounts:{" "}
            <span className="text-pink-400 font-semibold">{stats.total}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
