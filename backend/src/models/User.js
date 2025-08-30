import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// const locationSchema = new mongoose.Schema(
//   {
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     lat: { type: Number, required: true },
//     lng: { type: Number, required: true },
//   },
//   { _id: false }
// );

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["mess", "ngo", "admin"], default: "mess", required: true },
    contactNumber: { type: String, required: true },
    location: {  type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

export default mongoose.model("User", userSchema);
