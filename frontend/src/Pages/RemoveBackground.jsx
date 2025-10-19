import React, { useState } from "react";
import axios from "axios";

const RemoveBackground = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image!");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);

      const res = await axios.post(
        "http://localhost:5000/api/remove/remove-bg",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult("http://localhost:5000" + res.data.filePath);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Background removal failed!");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-6">Auto Background Remover</h1>

      <form onSubmit={handleUpload} className="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-4"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Processing..." : "Remove Background"}
        </button>
      </form>

      {result && (
        <div className="mt-8 text-center">
          <h2 className="font-semibold mb-2">Result:</h2>
          <img
            src={result}
            alt="Removed Background"
            className="rounded-lg shadow-lg max-w-sm"
          />
          <a
            href={result}
            download
            className="block text-blue-500 mt-2 underline"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
};

export default RemoveBackground;
