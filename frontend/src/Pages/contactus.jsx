import React, { useState } from "react";
import axios from "axios";
import Usernab from "../Components/Usernab";
import { motion } from "framer-motion"; // Import Framer Motion

const Contactus = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setShowStatus(true);

    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.data.success) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setShowStatus(false), 3000);
      }
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message.");
      setTimeout(() => setShowStatus(false), 3000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <Usernab />

      <div className="flex flex-col lg:flex-row items-center justify-center min-h-[90vh] w-full p-6 lg:p-16 gap-12">
        {/* Left side image */}
        <motion.div
          className="w-full lg:w-1/2 relative"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="absolute -inset-2 bg-blue-100 rounded-3xl blur-3xl opacity-50"></div>
          <img
            src="https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1000&q=80"
            alt="Office building"
            className="relative rounded-3xl shadow-2xl w-full h-[450px] object-cover border border-gray-200"
          />
        </motion.div>

        {/* Right side form */}
        <motion.div
          className="w-full lg:w-1/2 bg-white rounded-3xl shadow-xl border border-gray-100 p-10 backdrop-blur-md relative transition-all hover:shadow-2xl duration-500"
          initial="hidden"
          animate="visible"
          variants={formVariants}
        >
          <h2 className="text-4xl font-extrabold mb-4 text-gray-800 text-center">
            Let’s Get In Touch
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Have a question or proposal? We’d love to hear from you. <br />
            Or email us directly at{" "}
            <a
              href="mailto:hello@slothui.com"
              className="text-blue-600 font-semibold hover:underline"
            >
              manjikavi8@gmail.com
            </a>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              className="flex flex-col gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.2 }}
            >
              <motion.input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-200 px-5 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition bg-gray-50 hover:bg-white"
                required
              />
              <motion.input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-200 px-5 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition bg-gray-50 hover:bg-white"
                required
              />
              <motion.textarea
                name="message"
                placeholder="Your Message..."
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-200 px-5 py-3 rounded-xl h-32 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition resize-none bg-gray-50 hover:bg-white"
                required
              />
            </motion.div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:shadow-xl transition duration-300"
            >
              Send Message →
            </button>
          </form>

          {showStatus && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <div
                className={`px-6 py-3 rounded-full font-semibold text-white shadow-lg transition-all duration-500 ${
                  status.includes("successfully")
                    ? "bg-green-500 animate-pulse"
                    : "bg-red-500 animate-bounce"
                }`}
              >
                {status}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contactus;
