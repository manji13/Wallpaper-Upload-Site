import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

export const chatWithBot = async (req, res) => {
  const { message } = req.body;

  // Log the incoming request
  console.log("📩 Request:", message);

  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ Error: API Key missing.");
    return res.status(500).json({ reply: "Server Error: API Key missing." });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // ✅ FIX: Using a model that is explicitly on your allowed list
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // 1. Ask Gemini if this is an image generation request
    const intentPrompt = `
      Analyze this user message: "${message}".
      Does the user want to generate, create, or see an image/picture/photo?
      Answer ONLY with "YES" or "NO".
    `;
    
    const intentResult = await model.generateContent(intentPrompt);
    const intentResponse = intentResult.response.text().trim().toUpperCase();

    if (intentResponse.includes("YES")) {
      console.log("🎨 Image Request Detected");

      // Generate the prompt
      const refinementPrompt = `
        The user wants an image described as: "${message}".
        Create a short, highly detailed, cinematic prompt (max 15 words) for an AI image generator.
        Return ONLY the prompt, no extra text.
      `;
      
      const promptResult = await model.generateContent(refinementPrompt);
      const refinedPrompt = promptResult.response.text().trim();

      // Create Image URL
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(refinedPrompt)}?nologo=true`;

      return res.json({
        reply: `Here is your generated image based on: "${refinedPrompt}"`,
        imageUrl: imageUrl,
      });

    } else {
      console.log("💬 Text Chat Detected");
      // Standard text chat
      const result = await model.generateContent(message);
      const response = await result.response;
      const text = response.text();

      return res.json({
        reply: text,
        imageUrl: null,
      });
    }

  } catch (error) {
    console.error("❌ GEMINI ERROR:", error);
    res.status(500).json({ 
        reply: "I'm having trouble connecting. Please check the backend terminal." 
    });
  }
};