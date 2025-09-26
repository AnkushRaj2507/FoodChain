import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  messName: { type: String, required: true },
  foodDescription: { type: String, required: true },
  pickupAddress: { type: String, required: true },
  contactNumber: { type: String, required: true },
  ngoAssigned: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["available", "claimed", "collected"],
    default: "available", // Automatically set available
  },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ✅ New field
}, { timestamps: true });

export default mongoose.model("Food", foodSchema);