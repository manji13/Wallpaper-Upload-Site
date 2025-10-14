import express from "express";
import multer from "multer";
import path from "path";
import {
  uploadImage,
  getAllImages,
  getUserImages,
  updateImage,
  deleteImage,
} from "../Controller/ImageController.js";

const router = express.Router();

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Upload/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Routes
router.post("/", upload.single("image"), uploadImage);
router.get("/", getAllImages);
router.get("/user/:userId", getUserImages);
router.put("/:id", upload.single("image"), updateImage); // ✅ add multer for edit
router.delete("/:id", deleteImage);

export default router;
