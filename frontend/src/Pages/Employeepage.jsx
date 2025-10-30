import React, { useEffect } from "react";
import EmployeeNav from "../Components/EmployeeNav";
import AOS from "aos";
import "aos/dist/aos.css";
import { Globe2, Users } from "lucide-react";

const employees = [
  {
    name: "Manjitha Kavishan",
    role: "Employee Manager",
    country: "🇱🇰 Sri Lanka",
    img: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Lithira Sasmitha",
    role: "Senior Developer",
    country: "🇮🇳 India",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Ashvinindi Uthkarsha",
    role: "UI/UX Designer",
    country: "🇱🇰 Sri Lanka",
    img: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    name: "Ranumi Pesakya",
    role: "Project Coordinator",
    country: "🇱🇰 Sri Lanka",
    img: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    name: "Sadew Lakshan",
    role: "Backend Engineer",
    country: "🇱🇰 Sri Lanka",
    img: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  {
    name: "Allan Reel",
    role: "System Architect",
    country: "🇦🇺 Australia",
    img: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    name: "Chalow Manal",
    role: "Frontend Developer",
    country: "🇮🇳 India",
    img: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    name: "Kasun Lakshitha",
    role: "QA Engineer",
    country: "🇱🇰 Sri Lanka",
    img: "https://randomuser.me/api/portraits/men/61.jpg",
  },
];

const Employeepage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <EmployeeNav />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <div data-aos="fade-down">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
            Meet Our Amazing Team
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            We’re a diverse and passionate group of individuals from Sri Lanka, India, 
            and Australia — working together to build meaningful digital experiences.
          </p>
        </div>

        <div
          className="flex gap-4 mt-10 text-gray-400"
          data-aos="zoom-in-up"
        >
          <div className="flex items-center gap-2">
            <Globe2 className="text-teal-400" />
            <span>Sri Lanka</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe2 className="text-indigo-400" />
            <span>India</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe2 className="text-cyan-400" />
            <span>Australia</span>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-8 md:px-20 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {employees.map((emp, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-teal-500/20 transition-transform duration-500"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={emp.img}
                alt={emp.name}
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-teal-500/40"
              />
              <h3 className="text-xl font-semibold text-white mb-1">
                {emp.name}
              </h3>
              <p className="text-teal-400 text-sm mb-2">{emp.role}</p>
              <p className="text-gray-400 text-sm">{emp.country}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 px-8 md:px-20 text-center">
        <div
          className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-xl"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
            Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Our team believes in innovation, collaboration, and creativity. 
            From Sri Lanka to India and Australia, we unite diverse skills to 
            deliver high-quality designs, efficient systems, and remarkable user experiences.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 text-sm border-t border-white/10">
        <div className="flex justify-center items-center gap-2">
          <Users className="text-teal-400" size={18} />
          <span>© 2025 Employee Portal | Designed by Manjitha Kavishan</span>
        </div>
      </footer>
    </div>
  );
};

export default Employeepage;
