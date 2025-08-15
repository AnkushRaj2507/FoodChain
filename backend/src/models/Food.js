import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  messName: { type: String, required: true },
  foodDescription: { type: String, required: true },
  pickupAddress: { type: String, required: true },
  contactNumber: { type: String, required: true },
  ngoAssigned: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "Pending" } // Pending, Collected, Delivered
}, { timestamps: true });

export default mongoose.model("Food", foodSchema);
