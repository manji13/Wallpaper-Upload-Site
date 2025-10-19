import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import path from "path";

export const removeBackground = async (req, res) => {
  try {
    const imagePath = req.file.path;

    const formData = new FormData();
    formData.append("image", fs.createReadStream(imagePath));

    // Call Python server
    const response = await axios.post(
      "http://127.0.0.1:5001/remove-bg",
      formData,
      {
        headers: formData.getHeaders(),
        responseType: "arraybuffer",
      }
    );

    const outputDir = path.join("Upload");
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    const outputFile = `removed-${path.basename(imagePath)}`;
    const outputPath = path.join(outputDir, outputFile);

    // Write the PNG bytes returned by Python
    fs.writeFileSync(outputPath, response.data);

    res.json({
      success: true,
      message: "Background removed successfully!",
      filePath: `/uploads/${outputFile}`, // lowercase matches server.js
    });
  } catch (error) {
    console.error("❌ Background remove failed:", error.message);
    res.status(500).json({ success: false, message: "Background removal failed!" });
  }
};
