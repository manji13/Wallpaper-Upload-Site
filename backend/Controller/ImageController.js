import Image from "../Model/ImageModel.js";

// Upload image
export const uploadImage = async (req, res) => {
  try {
    const { username, category, userId } = req.body;
    if (!username || !category || !userId || !req.file)
      return res.status(400).json({ msg: "All fields are required" });

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

// Get all uploaded images
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch images" });
  }
};

// Edit image category (only owner)
export const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, userId } = req.body;

    const image = await Image.findById(id);
    if (!image) return res.status(404).json({ msg: "Image not found" });

    if (image.userId !== userId)
      return res.status(403).json({ msg: "Unauthorized" });

    image.category = category;
    await image.save();

    res.json({ msg: "Image updated successfully", image });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update image" });
  }
};

// Delete image (only owner)
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const image = await Image.findById(id);
    if (!image) return res.status(404).json({ msg: "Image not found" });

    if (image.userId !== userId)
      return res.status(403).json({ msg: "Unauthorized" });

    await Image.findByIdAndDelete(id);
    res.json({ msg: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete image" });
  }
};
