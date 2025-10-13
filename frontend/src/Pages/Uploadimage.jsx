import React, { useState } from "react";
import axios from "axios";
import { Upload, Check, Image as ImageIcon } from "lucide-react";
import UploadImagenav from "../Components/UploadImageNav";



const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [category, setCategory] = useState("nature");
  const [userId, setUserId] = useState("user123"); // Mock - replace with localStorage.getItem("userId")
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    // Create preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("username", userName);
    formData.append("category", category);
    formData.append("userId", userId); // ✅ Add userId here

    try {
      setIsUploading(true);
      setSuccess(false);

      await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setIsUploading(false);
      setSuccess(true);
      setImage(null);
      setUserName("");
      setCategory("nature");
      setPreviewUrl(null);

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setIsUploading(false);
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div>
      <UploadImagenav />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 relative z-10 transform transition-all hover:scale-[1.02]">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-3 rounded-full">
              <ImageIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center text-white mb-8 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
            Upload Image
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative group">
              <input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all backdrop-blur-sm border border-white/10"
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"></div>
            </div>

            <div className="relative group">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-4 rounded-xl bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all backdrop-blur-sm border border-white/10 cursor-pointer"
              >
                <option value="nature" className="bg-indigo-900">Nature</option>
                <option value="rain" className="bg-indigo-900">Rain</option>
                <option value="road" className="bg-indigo-900">Road</option>
                <option value="wallpaper" className="bg-indigo-900">Wallpaper</option>
              </select>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"></div>
            </div>

            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="file-upload"
                required
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/20 text-white cursor-pointer hover:bg-white/30 transition-all backdrop-blur-sm border-2 border-dashed border-white/30 hover:border-purple-400 group"
              >
                <Upload className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{image ? image.name : "Click to select image"}</span>
              </label>
              
              {previewUrl && (
                <div className="mt-4 rounded-xl overflow-hidden border-2 border-purple-400/50">
                  <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover" />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="relative bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isUploading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Upload
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            {success && (
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-4 rounded-xl text-center font-medium shadow-lg animate-bounce-in flex items-center justify-center gap-2">
                <div className="bg-white rounded-full p-1 animate-scale-in">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <span>Successfully uploaded image!</span>
              </div>
            )}
          </form>
        </div>

        <style jsx>{`
          @keyframes blob {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
          }

          @keyframes bounce-in {
            0% {
              opacity: 0;
              transform: scale(0.3) translateY(-20px);
            }
            50% {
              transform: scale(1.05) translateY(0);
            }
            70% {
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes scale-in {
            0% {
              transform: scale(0);
            }
            50% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
            }
          }

          .animate-blob {
            animation: blob 7s infinite;
          }

          .animation-delay-2000 {
            animation-delay: 2s;
          }

          .animation-delay-4000 {
            animation-delay: 4s;
          }

          .animate-bounce-in {
            animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }

          .animate-scale-in {
            animation: scale-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
        `}</style>
      </div>
    </div>
  );
};

export default UploadImage;