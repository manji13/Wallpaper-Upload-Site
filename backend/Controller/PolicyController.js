import Policy from "../Model/PolicyModel.js";

// ✅ Add a new policy
export const addPolicy = async (req, res) => {
  try {
    const { topic, policy } = req.body;
    if (!topic || !policy) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newPolicy = await Policy.create({ topic, policy });
    res.status(201).json(newPolicy);
  } catch (error) {
    console.error("Error adding policy:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Get all policies
export const getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find().sort({ createdAt: -1 });
    res.json(policies);
  } catch (error) {
    console.error("Error fetching policies:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Get one policy by ID
export const getPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) return res.status(404).json({ msg: "Policy not found" });
    res.json(policy);
  } catch (error) {
    console.error("Error fetching policy:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Update policy
export const updatePolicy = async (req, res) => {
  try {
    const { topic, policy } = req.body;
    const updatedPolicy = await Policy.findByIdAndUpdate(
      req.params.id,
      { topic, policy },
      { new: true }
    );
    if (!updatedPolicy) return res.status(404).json({ msg: "Policy not found" });
    res.json(updatedPolicy);
  } catch (error) {
    console.error("Error updating policy:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Delete policy
export const deletePolicy = async (req, res) => {
  try {
    const deletedPolicy = await Policy.findByIdAndDelete(req.params.id);
    if (!deletedPolicy) return res.status(404).json({ msg: "Policy not found" });
    res.json({ msg: "Policy deleted successfully" });
  } catch (error) {
    console.error("Error deleting policy:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
