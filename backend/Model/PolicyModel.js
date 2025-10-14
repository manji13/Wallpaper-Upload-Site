import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    policy: { type: String, required: true },
  },
  { timestamps: true }
);

const Policy = mongoose.model("Policy", policySchema);
export default Policy;
