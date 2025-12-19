import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Download, Images, User } from "lucide-react"; 
import Swal from "sweetalert2";
import Usernab from "../Components/Usernab";
import ChatBot from "../Pages/Chatbot.jsx"; // ✅ 1. Import ChatBot here
import "sweetalert2/dist/sweetalert2.min.css";

import Footer from "../Components/footer.jsx";

// Import the video properly
import video1 from "../Assets/backgroundImage.mp4"; 

const fallbackVideos = [
  "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-white-clouds-passing-in-the-sky-1175-large.mp4"
];

const Userpage = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);
  const [downloadingIndex, setDownloadingIndex] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const backgroundVideos = video1 ? [video1] : fallbackVideos;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/upload");
        setImages(res.data);
        setFilteredImages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchImages();

    const timer = setTimeout(() => setIsPageLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredImages(images);
    } else {
      const filtered = images.filter(
        (img) => img.category && img.category.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredImages(filtered);
    }
  }, [search, images]);

  const handleDownload = async (imageUrl, uploaderName, index) => {
    const result = await Swal.fire({
      title: "Download Image?",
      text: `Do you want to download this image uploaded by ${uploaderName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, download",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#8b5cf6",
      cancelButtonColor: "#ef4444",
      background: "#ffffff",
      color: "#1f2937",
    });

    if (result.isConfirmed) {
      try {
        setDownloadingIndex(index);
        const res = await axios.get(`http://localhost:5000${imageUrl}`, { responseType: "blob" });
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", imageUrl.split("/").pop());
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        setTimeout(() => setDownloadingIndex(null), 1500);
      } catch (err) {
        console.error("Download failed:", err);
        setDownloadingIndex(null);
      }
    }
  };

  if (isPageLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 backdrop-blur-md z-50 animate-fade-in">
        <div className="flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
          <p className="text-gray-800 text-xl font-semibold animate-pulse">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
    <div className="animate-fade-in relative"> {/* Added relative for safety */}
      <Usernab />
      
      {/* ✅ 2. Add the ChatBot Component here */}
      <ChatBot />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto mt-20 px-4 pb-20">
          {/* Header Section */}
          <div className="relative text-center mb-12 rounded-3xl overflow-hidden shadow-2xl animate-slide-down">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              src={videoError ? fallbackVideos[0] : backgroundVideos[0]}
              onError={() => setVideoError(true)}
            >
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

            <div className="relative z-10 py-20 px-4">
              <div className="flex items-center justify-center mb-6 animate-bounce-in">
                <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl shadow-2xl border-2 border-white/30 animate-pulse-slow">
                  <Images className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl animate-fade-in-up delay-150">
                Image Gallery
              </h1>
              <p className="text-white/90 text-xl drop-shadow-lg mb-8 animate-fade-in-up delay-300">
                Discover and download beautiful images
              </p>

              <div className="flex justify-center mb-6 animate-scale-in delay-500">
                <div className="relative w-full max-w-2xl">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by category: nature, rain, road, wallpaper"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/95 backdrop-blur-sm border-2 border-white/30 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all shadow-xl hover:shadow-2xl animate-pulse-gentle"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.length > 0 ? (
              filteredImages.map((img, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-stagger-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden bg-white">
                    <img
                      src={`http://localhost:5000${img.imageUrl}`}
                      alt="Uploaded"
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 text-xs font-semibold shadow-lg border border-gray-200">
                        {img.category || "Unknown"}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-purple-500 p-1.5 rounded-full shadow-lg">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-white text-sm font-medium drop-shadow-lg">
                            {img.uploaderName || img.username || "Anonymous"}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDownload(img.imageUrl, img.uploaderName || img.username || "Anonymous", index)}
                          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 p-2.5 rounded-full transition-all transform hover:scale-110 active:scale-95 shadow-lg"
                          disabled={downloadingIndex === index}
                        >
                          {downloadingIndex === index ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Download className="w-5 h-5 text-white" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 animate-fade-in-up">
                <div className="bg-gray-100 rounded-full p-8 mb-6">
                  <Search className="w-16 h-16 text-gray-400" />
                </div>
                <p className="text-gray-700 text-xl font-medium">
                  No images found for "{search}"
                </p>
                <p className="text-gray-500 text-sm mt-2">Try searching for: nature, rain, road, or wallpaper</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes bounceIn { 0% { transform: scale(0.3); opacity: 0; } 50% { transform: scale(1.05); opacity: 0.8; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes staggerFadeIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes pulseSlow { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes pulseGentle { 0%, 100% { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); } 50% { box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); } }
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
        .animate-slide-down { animation: slideDown 0.8s ease-out; }
        .animate-bounce-in { animation: bounceIn 1s ease-out; }
        .animate-scale-in { animation: scaleIn 0.6s ease-out; }
        .animate-stagger-fade-in { animation: staggerFadeIn 0.6s ease-out both; }
        .animate-pulse-slow { animation: pulseSlow 3s infinite; }
        .animate-pulse-gentle { animation: pulseGentle 2s infinite; }
      `}</style>
    </div>
    <Footer />
    </div>
  );
};

export default Userpage;