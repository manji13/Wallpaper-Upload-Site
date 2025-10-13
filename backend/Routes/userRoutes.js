import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getUserStats,
  updateUserProfile,
} from "../Controller/userController.js";

const router = express.Router();

// Authentication routes
router.post("/signup", registerUser);
router.post("/signin", loginUser);

// User management
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);
router.get("/stats", getUserStats);

// ✅ Edit profile (Update current user)
router.put("/:id", updateUserProfile);

export default router;
