import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./db.js";

// Routes
import userRouter from "./Routes/userRoutes.js";
import uploadRouter from "./Routes/uploadImageRoutes.js";
import policyRouter from "./Routes/policyRoutes.js";
import removeRoutes from "./Routes/removeRoutes.js";
import chatRouter from "./Routes/chatRoutes.js"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
connectDB();

app.use(express.json());

// Update CORS for Vercel
// Allow your frontend domain OR use "*" for testing
app.use(cors({
    origin: ["http://localhost:3000", "https://YOUR-FRONTEND-URL.vercel.app"], 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

app.use("/uploads", express.static(path.join(__dirname, "Upload")));

// Routers
app.use("/api/users", userRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/policy", policyRouter);
app.use("/api/remove", removeRoutes);
app.use("/api/chat", chatRouter);

// Contact Route
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: "All fields required" });
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }, // Use Env vars!
    });
    const mailOptions = {
      from: email,
      to: "manjikavi8@gmail.com",
      subject: `📩 New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Email not sent" });
  }
});

app.get("/", (req, res) => res.send("API is running..."));

// VERCEL CONFIGURATION
const PORT = process.env.PORT || 5000;

// Only listen if NOT running on Vercel (allows local testing)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// Export the app for Vercel
export default app;