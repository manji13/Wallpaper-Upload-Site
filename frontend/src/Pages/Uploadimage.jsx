import React, { useState, useEffect } from "react";
import axios from "axios";
import { Upload, Check, Image as ImageIcon, Loader2 } from "lucide-react";
import UploadImagenav from "../Components/UploadImageNav";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [category, setCategory] = useState("nature");
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true); // <-- page loading

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?._id || "";

  // ✅ Page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1500); // 1.5s loading effect
    return () => clearTimeout(timer);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !userId) return alert("Please login and select an image!");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("username", userName);
    formData.append("category", category);
    formData.append("userId", userId);

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
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
      setIsUploading(false);
    }
  };

  // ✅ Loading screen on page open
  if (isPageLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 z-50">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <Loader2 className="w-16 h-16 text-white animate-spin" />
          <p className="text-white text-xl font-semibold animate-pulse">
            Loading Upload Page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in"> {/* fade-in page animation */}
      <UploadImagenav />
      {/* 🌀 Full-page Loading Overlay */}
      {isUploading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-white" />
            <p className="text-white text-lg font-medium animate-pulse">
              Uploading Image...
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 relative overflow-hidden">
        {/* Animated background blobs */}
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
            {/* Username */}
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all backdrop-blur-sm border border-white/10"
              required
            />

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all backdrop-blur-sm border border-white/10 cursor-pointer"
            >
              <option value="nature">Nature</option>
              <option value="rain">Rain</option>
              <option value="road">Road</option>
              <option value="wallpaper">Wallpaper</option>
            </select>

            {/* Image Upload */}
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

            {/* Preview */}
            {previewUrl && (
              <div className="mt-4 rounded-xl overflow-hidden border-2 border-purple-400/50">
                <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover" />
              </div>
            )}

            {/* Submit Button */}
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
            </button>

            {/* Success message */}
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
      </div>
    </div>
  );
};

export default UploadImage;
