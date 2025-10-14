import express from "express";
import {
  addPolicy,
  getAllPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy,
} from "../Controller/PolicyController.js";

const router = express.Router();

router.post("/", addPolicy);         // Create
router.get("/", getAllPolicies);     // Read all
router.get("/:id", getPolicyById);   // Read one
router.put("/:id", updatePolicy);    // Update
router.delete("/:id", deletePolicy); // Delete

export default router;
