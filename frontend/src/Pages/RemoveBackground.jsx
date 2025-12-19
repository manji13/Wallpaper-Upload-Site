import React, { useState, useRef } from "react";
import { Upload, Download, Image, X } from "lucide-react";
import Usernab from "../Components/Usernab";
import Swal from "sweetalert2";
import axios from "axios";
import "sweetalert2/dist/sweetalert2.min.css";
import ChatBot from "../Pages/Chatbot.jsx";

import Footer from "../Components/footer.jsx";

const RemoveBackground = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setResult("");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image!");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);

      const res = await fetch("http://localhost:5000/api/remove/remove-bg", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const imageUrl = "http://localhost:5000" + data.filePath;
      setResult(imageUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Background removal failed!");
    }
    setLoading(false);
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setResult("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ✅ SweetAlert download + open image
  const handleDownload = async () => {
    if (!result) return;

    const resultAlert = await Swal.fire({
      title: "Download Image?",
      text: "Do you want to download this background-removed image?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, download",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      background: "#ffffff",
      color: "#1f2937",
      showClass: { popup: "animate__animated animate__fadeInDown" },
      hideClass: { popup: "animate__animated animate__fadeOutUp" },
    });

    if (resultAlert.isConfirmed) {
      try {
        setDownloading(true);
        const res = await axios.get(result, { responseType: "blob" });
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "background_removed.png");
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        // ✅ Show image in new tab after download
        window.open(result, "_blank");

        setTimeout(() => setDownloading(false), 1500);
      } catch (err) {
        console.error("Download failed:", err);
        Swal.fire({
          title: "Error",
          text: "Download failed. Try again.",
          icon: "error",
          background: "#ffffff",
          color: "#1f2937",
        });
        setDownloading(false);
      }
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Usernab />
        <ChatBot />
        <div className="max-w-6xl mx-auto px-4 py-12 pt-24">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Remove Background
            </h1>
            <p className="text-gray-600 text-lg">
              100% automatic and free - Remove image backgrounds in seconds
            </p>
          </div>

          {!preview && !result ? (
            /* Upload Area */
            <div className="max-w-2xl mx-auto">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-4 border-dashed border-blue-300 rounded-2xl p-16 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-6 rounded-full mb-6">
                    <Upload className="w-12 h-12 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                    Upload Image
                  </h2>
                  <p className="text-gray-500 mb-6">or drop a file here</p>
                  <button
                    type="button"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Select Image
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
              <p className="text-center text-sm text-gray-500 mt-4">
                Supports: JPG, PNG, WebP
              </p>
            </div>
          ) : (
            /* Preview and Result Area */
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {result ? "Your Result" : "Preview"}
                </h2>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                  Start Over
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Original Image */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-3 border-b">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                      <Image className="w-5 h-5" />
                      Original
                    </h3>
                  </div>
                  <div className="p-4 flex items-center justify-center bg-gray-50 min-h-[400px]">
                    <img
                      src={preview}
                      alt="Original"
                      className="max-w-full max-h-[400px] object-contain rounded-lg"
                    />
                  </div>
                </div>

                {/* Result Image */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-3 border-b">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                      <Image className="w-5 h-5" />
                      Processed
                    </h3>
                  </div>
                  <div
                    className="p-4 flex items-center justify-center min-h-[400px]"
                    style={{
                      backgroundImage:
                        "linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)",
                      backgroundSize: "20px 20px",
                      backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                    }}
                  >
                    {loading ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-600 font-medium">
                          Processing your image...
                        </p>
                      </div>
                    ) : result ? (
                      <img
                        src={result}
                        alt="Result"
                        className="max-w-full max-h-[400px] object-contain rounded-lg"
                      />
                    ) : (
                      <div className="text-center text-gray-400">
                        <Image className="w-16 h-16 mx-auto mb-2 opacity-50" />
                        <p>Awaiting processing</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 pt-4">
                {!result && !loading && (
                  <button
                    onClick={handleUpload}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Remove Background
                  </button>
                )}

                {result && (
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className={`${downloading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg transform hover:scale-105"
                      } text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2`}
                  >
                    <Download className="w-5 h-5" />
                    {downloading ? "Downloading..." : "Download Image"}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-800">Easy Upload</h3>
              <p className="text-gray-600 text-sm">
                Simply drag and drop or select your image
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-800">AI Powered</h3>
              <p className="text-gray-600 text-sm">
                Advanced AI removes backgrounds instantly
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-800">Free Download</h3>
              <p className="text-gray-600 text-sm">
                Download your processed image for free
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RemoveBackground;
