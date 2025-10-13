import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true }, // who uploaded
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);
export default Image;
