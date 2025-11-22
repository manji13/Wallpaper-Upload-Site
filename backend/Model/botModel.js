import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix: Make sure we can find the .env file no matter where this script is
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Look for .env one folder up (in backend root) since this file is in Model/
dotenv.config({ path: path.join(__dirname, "../.env") }); 

const apiKey = process.env.GEMINI_API_KEY;

console.log("------------------------------------------------");
console.log("🔑 Testing API Key...");

if (!apiKey) {
  console.error("❌ CRITICAL ERROR: GEMINI_API_KEY is missing.");
  console.log("   Make sure your .env file is in the 'backend' folder.");
  process.exit(1);
} else {
    console.log("   Key found (starts with):", apiKey.substring(0, 8) + "...");
}

const genAI = new GoogleGenerativeAI(apiKey);

async function checkModels() {
  try {
    console.log("📡 Connecting to Google...");
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();

    if (data.error) {
      console.error("❌ API ERROR:", data.error.message);
      console.log("   Reason: Your API key is invalid or has no permissions.");
    } else {
      console.log("\n✅ SUCCESS! Your API Key works.");
      console.log("📋 Available Models:");
      console.log("---------------------------------------------");
      
      const validModels = [];
      data.models.forEach(m => {
        if (m.supportedGenerationMethods.includes("generateContent")) {
           const name = m.name.replace("models/", "");
           console.log(`   👉 "${name}"`);
           validModels.push(name);
        }
      });
      
      console.log("---------------------------------------------");
      
      // Suggest the best model
      if (validModels.includes("gemini-1.5-flash")) {
          console.log("💡 RECOMMENDATION: Use 'gemini-1.5-flash' in your code.");
      } else if (validModels.includes("gemini-pro")) {
          console.log("💡 RECOMMENDATION: Use 'gemini-pro' in your code.");
      }
    }

  } catch (error) {
    console.error("❌ CONNECTION ERROR:", error.message);
  }
}

checkModels();