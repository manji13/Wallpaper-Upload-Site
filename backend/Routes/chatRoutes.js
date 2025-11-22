import express from "express";
import { chatWithBot } from "../Controller/chatController.js";

const router = express.Router();

router.post("/", chatWithBot);

export default router;