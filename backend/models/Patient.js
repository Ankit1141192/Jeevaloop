const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  medicalHistory: { type: String, default: "" },
  diagnoses: [{ type: String }],
  treatmentPlans: [{ type: String }],
  medications: [{ type: String }],
  // Add fields as needed
}, { timestamps: true });

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
