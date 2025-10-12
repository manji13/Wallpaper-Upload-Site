import express from "express";
import { registerUser, loginUser, getAllUsers, deleteUser, getUserStats } from "../Controller/userController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);
router.get("/stats", getUserStats);

export default router;
