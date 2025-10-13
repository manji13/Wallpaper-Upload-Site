import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Download, Images } from "lucide-react";
import Swal from "sweetalert2";
import Usernab from "../Components/Usernab";
import "sweetalert2/dist/sweetalert2.min.css";

const Userpage = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);
  const [downloadingIndex, setDownloadingIndex] = useState(null);

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

  // ✅ handleDownload with SweetAlert2 confirmation
  const handleDownload = async (imageUrl, index) => {
    const result = await Swal.fire({
      title: "Download Image?",
      text: "Do you want to download this image?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, download",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#4ade80",
      cancelButtonColor: "#f87171",
      background: "rgba(30, 30, 40, 0.95)",
      color: "#fff",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });

    if (result.isConfirmed) {
      try {
        setDownloadingIndex(index);
        const res = await axios.get(`http://localhost:5000${imageUrl}`, {
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", imageUrl.split("/").pop());
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        setTimeout(() => {
          setDownloadingIndex(null);
        }, 1500);
      } catch (err) {
        console.error("Download failed:", err);
        Swal.fire({
          title: "Error",
          text: "Download failed. Try again.",
          icon: "error",
          background: "rgba(30, 30, 40, 0.95)",
          color: "#fff",
        });
        setDownloadingIndex(null);
      }
    }
  };

  return (
    <div>
      <Usernab />
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 px-4 pb-20 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-4 rounded-full">
                <Images className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
              Image Gallery
            </h1>
            <p className="text-white/70 text-lg">Discover and download beautiful images</p>
          </div>

          {/* Search input */}
          <div className="mb-10 flex justify-center animate-slide-up">
            <div className="relative w-full max-w-xl group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-white/50 group-focus-within:text-purple-400 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search by category: nature, rain, road, wallpaper"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all shadow-lg hover:bg-white/15"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
            </div>
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.length > 0 ? (
              filteredImages.map((img, index) => (
                <div
                  key={index}
                  className="group bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={`http://localhost:5000${img.imageUrl}`}
                      alt="Uploaded"
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Category badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold border border-white/30">
                        {img.category || "Unknown"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <a
                      href="#"
                      onClick={() => handleDownload(img.imageUrl, index)}
                      className="relative flex items-center justify-center gap-2 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105 active:scale-95 overflow-hidden group/btn"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {downloadingIndex === index ? (
                          <>
                            <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                            Downloading...
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5 group-hover/btn:animate-bounce" />
                            Download
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 animate-fade-in">
                <div className="bg-white/10 backdrop-blur-xl rounded-full p-8 mb-6">
                  <Search className="w-16 h-16 text-white/50" />
                </div>
                <p className="text-white/80 text-xl font-medium">
                  No images found for "{search}"
                </p>
                <p className="text-white/60 text-sm mt-2">Try searching for: nature, rain, road, or wallpaper</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userpage;
