import express from "express";
import multer from "multer";
import path from "path";
import {
  uploadImage,
  getAllImages,
  updateImage,
  deleteImage,
} from "../Controller/ImageController.js";

const router = express.Router();

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Upload/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// routes
router.post("/", upload.single("image"), uploadImage);
router.get("/", getAllImages);
router.put("/:id", updateImage);
router.delete("/:id", deleteImage);

export default router;
