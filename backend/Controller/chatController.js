import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

export const chatWithBot = async (req, res) => {
  const { message } = req.body;

  console.log("📩 Request Received:", message);

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ reply: "API Key missing in .env" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // ✅ FIXED: Using the exact alias from your "Available Models" list
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    // 1. Ask Gemini to identify the intent
    const intentPrompt = `
      User message: "${message}".
      Does the user want to generate or see an image?
      Answer ONLY with "YES" or "NO".
    `;
    
    const intentResult = await model.generateContent(intentPrompt);
    const intentResponse = intentResult.response.text().trim().toUpperCase();

    if (intentResponse.includes("YES")) {
      console.log("🎨 Processing Image Intent...");

      // 2. Create a clean prompt for the image generator
      const refinementPrompt = `
        Description: "${message}".
        Create a detailed cinematic image prompt (max 15 words).
        Return ONLY the prompt.
      `;
      
      const promptResult = await model.generateContent(refinementPrompt);
      const refinedPrompt = promptResult.response.text().trim();

      // Using Pollinations for the actual image rendering
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(refinedPrompt)}?nologo=true`;

      return res.json({
        reply: `Here is the image for: "${refinedPrompt}"`,
        imageUrl: imageUrl,
      });

    } else {
      console.log("💬 Processing Text Intent...");
      
      // 3. Standard chat response
      const result = await model.generateContent(message);
      const text = result.response.text();

      return res.json({
        reply: text,
        imageUrl: null,
      });
    }

  } catch (error) {
    console.error("❌ ERROR:", error);

    // Handle 429 (Quota exceeded)
    if (error.status === 429) {
        return res.status(429).json({ 
            reply: "I'm a bit overwhelmed! Please wait 60 seconds and try again." 
        });
    }

    // Handle 404 (Just in case)
    if (error.status === 404) {
        return res.status(404).json({ 
            reply: "Model name not recognized. Please check backend config." 
        });
    }

    res.status(500).json({ 
        reply: "Sorry, I ran into an error connecting to the AI." 
    });
  }
};