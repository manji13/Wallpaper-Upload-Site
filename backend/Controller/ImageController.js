import Image from "../Model/ImageModel.js";
import fs from "fs";
import path from "path";

// ✅ Upload image
export const uploadImage = async (req, res) => {
  try {
    const { username, category, userId } = req.body;

    if (!username || !category || !userId || !req.file) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const newImage = await Image.create({
      username,
      category,
      imageUrl,
      userId,
    });

    res.status(201).json({ msg: "Image uploaded successfully", newImage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// ✅ Get all uploaded images
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch images" });
  }
};

// ✅ Get user images
export const getUserImages = async (req, res) => {
  try {
    const { userId } = req.params;
    const images = await Image.find({ userId }).sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch user images" });
  }
};

// ✅ Update image & category
export const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, userId } = req.body;

    const image = await Image.findById(id);
    if (!image) return res.status(404).json({ msg: "Image not found" });

    if (image.userId !== userId)
      return res.status(403).json({ msg: "Unauthorized - Not your image" });

    // If a new file is uploaded, delete the old one
    if (req.file) {
      const oldPath = path.join(process.cwd(), "Upload", path.basename(image.imageUrl));
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      image.imageUrl = `/uploads/${req.file.filename}`;
    }

    if (category) image.category = category;

    await image.save();

    res.json({ msg: "Image updated successfully", image });
  } catch (err) {
    console.error("Error updating image:", err);
    res.status(500).json({ msg: "Failed to update image", error: err.message });
  }
};

// ✅ Delete image
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const image = await Image.findById(id);
    if (!image) return res.status(404).json({ msg: "Image not found" });

    if (image.userId !== userId)
      return res.status(403).json({ msg: "Unauthorized - Not your image" });

    // delete image file from server
    const filePath = path.join(process.cwd(), "Upload", path.basename(image.imageUrl));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Image.findByIdAndDelete(id);

    res.json({ msg: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete image" });
  }
};
