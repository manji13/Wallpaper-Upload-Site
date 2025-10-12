import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import connectDB from "./db.js";
import router from "./Routes/userRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // allow frontend
app.use(express.json());

// Default route
app.get("/", (req, res) => res.send("API is running..."));

// User routes
app.use("/api/users", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
