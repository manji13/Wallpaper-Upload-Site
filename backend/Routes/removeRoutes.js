import express from "express";
import multer from "multer";
import { removeBackground } from "../Controller/removeController.js";

const router = express.Router();

// Configure multer for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "Upload"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Route: POST /api/remove-bg
router.post("/remove-bg", upload.single("image"), removeBackground);

export default router;
