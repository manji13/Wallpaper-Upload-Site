import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Edit3, Trash2, Save, ImagePlus, Loader2 } from "lucide-react";
import UploadImagenav from "../Components/UploadImageNav";

const ImageEdit = () => {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingImageId, setEditingImageId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true); // ✅ Page load

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?._id || "";

  useEffect(() => {
    // ✅ Page load animation
    const timer = setTimeout(() => setIsPageLoading(false), 1500);
    fetchUserImages();
    return () => clearTimeout(timer);
  }, []);

  const fetchUserImages = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/upload/user/${userId}`);
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id) => {
    if (!selectedCategory && !selectedFile) {
      Swal.fire("Nothing to update!", "Please change category or image.", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("category", selectedCategory);
    if (selectedFile) formData.append("image", selectedFile);

    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/api/upload/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        title: "Updated!",
        text: "Image updated successfully.",
        icon: "success",
        confirmButtonColor: "#6366f1",
      });

      setEditingImageId(null);
      setSelectedCategory("");
      setSelectedFile(null);
      fetchUserImages();
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire("Error!", "Failed to update image.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This image will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await axios.delete(`http://localhost:5000/api/upload/${id}`, { data: { userId } });
          Swal.fire("Deleted!", "Image deleted successfully.", "success");
          fetchUserImages();
        } catch (err) {
          Swal.fire("Error!", "Failed to delete image.", "error");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  // ✅ Page load overlay
  if (isPageLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 z-50">
        <div className="flex flex-col items-center gap-3 animate-fade-in">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
          <p className="text-white text-xl font-semibold animate-pulse">Loading Image Edit Page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white p-6 animate-fade-in">
      <UploadImagenav />

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-white" />
            <p className="text-white text-lg font-medium">Please wait...</p>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto mt-12 bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
          Edit Your Uploaded Images
        </h2>

        {images.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">
            You haven’t uploaded any images yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {images.map((img) => (
              <div
                key={img._id}
                className="relative bg-white/10 rounded-xl p-4 shadow-lg hover:scale-105 transition-all"
              >
                <img
                  src={`http://localhost:5000${img.imageUrl}`}
                  alt={img.category}
                  className="rounded-lg w-full h-48 object-cover border border-white/20"
                />

                <div className="mt-3">
                  <p className="text-sm text-gray-300 mb-2">
                    Category: <span className="font-semibold text-white">{img.category}</span>
                  </p>

                  {editingImageId === img._id ? (
                    <div className="flex flex-col gap-2">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="p-2 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none"
                      >
                        <option value="">Select Category</option>
                        <option value="nature">Nature</option>
                        <option value="rain">Rain</option>
                        <option value="road">Road</option>
                        <option value="wallpaper">Wallpaper</option>
                      </select>

                      <label className="flex items-center gap-2 text-sm cursor-pointer bg-white/10 p-2 rounded-lg hover:bg-white/20">
                        <ImagePlus className="w-4 h-4" />
                        <span>Change Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setSelectedFile(e.target.files[0])}
                          className="hidden"
                        />
                      </label>

                      <button
                        onClick={() => handleUpdate(img._id)}
                        className="bg-green-500 px-3 py-2 rounded-lg hover:bg-green-600 flex justify-center items-center gap-2"
                      >
                        <Save className="w-4 h-4" /> Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={() => setEditingImageId(img._id)}
                        className="bg-blue-500 hover:bg-blue-600 p-2 rounded-lg"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(img._id)}
                        className="bg-red-500 hover:bg-red-600 p-2 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageEdit;
