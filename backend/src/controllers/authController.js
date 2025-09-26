import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password, role, contactNumber, location } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already registered" });

  const user = await User.create({ name, email, password, role, contactNumber, location });
  res.status(201).json({ id: user._id, name, email, role, contactNumber,location, token: generateToken(user._id, role) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json({ id: user._id, name: user.name, email, role: user.role, token: generateToken(user._id, user.role) });
};

export const logout = async (req, res) => {
  try {
    res.status(200).json({ message: "Logged out successfully. Please clear token on client." });
  } catch (error) {
    res.status(500).json({ message: "Server error during logout" });
  }
};
