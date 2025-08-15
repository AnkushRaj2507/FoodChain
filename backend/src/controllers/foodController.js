import Food from "../models/Food.js";
import { io } from "../server.js";

export const createFood = async (req, res) => {
  const { messName, foodDescription, pickupAddress, contactNumber } = req.body;
  const food = await Food.create({ messName, foodDescription, pickupAddress, contactNumber });
  io.emit("new-food", food); // Real-time notification
  res.status(201).json(food);
};

export const getAllFood = async (req, res) => {
  const foods = await Food.find().populate("ngoAssigned", "name email");
  res.json(foods);
};

export const assignNGO = async (req, res) => {
  const food = await Food.findById(req.params.id);
  if (!food) return res.status(404).json({ message: "Food not found" });
  food.ngoAssigned = req.user.id;
  food.status = "Collected";
  await food.save();
  io.emit("food-updated", food);
  res.json(food);
};

export const deleteFood = async (req, res) => {
  await Food.findByIdAndDelete(req.params.id);
  io.emit("food-deleted", { id: req.params.id });
  res.json({ message: "Deleted" });
};
