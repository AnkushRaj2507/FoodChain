import Food from "../models/Food.js";
import { io } from "../server.js";

// CREATE FOOD POST
export const createFood = async (req, res) => {
  try {
    const { messName, foodDescription, pickupAddress, contactNumber } = req.body;

    const food = await Food.create({
      messName,
      foodDescription,
      pickupAddress,
      contactNumber,
      postedBy: req.user.id,
      status: "available", // NEW FOOD = AVAILABLE
    });

    io.emit("new-food", food);
    res.status(201).json(food);
  } catch (e) {
    res.status(500).json({ message: "Failed to post food" });
  }
};

// GET ALL FOOD
export const getAllFood = async (req, res) => {
  try {
    const foods = await Food.find().populate('ngoAssigned', 'name');
    res.json(foods);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch food" });
  }
};

// NGO claims food
export const claimFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });

    if (food.status !== "available") {
      return res.status(400).json({ message: "Food already claimed" });
    }

    food.ngoAssigned = req.user.id;
    food.status = "claimed"; // ✅ Correct status
    await food.save();

    io.emit("food-updated", food);
    res.json(food);
  } catch (e) {
    res.status(500).json({ message: "Failed to claim food" });
  }
};

// NGO marks food as collected
export const markFoodCollected = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });

    if (String(food.ngoAssigned) !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    food.status = "collected"; // ✅ Correct status
    await food.save();

    io.emit("food-updated", food);
    res.json(food);
  } catch (e) {
    res.status(500).json({ message: "Failed to mark food as collected" });
  }
};


// DELETE FOOD
export const deleteFood = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    io.emit("food-deleted", { id: req.params.id });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: "Failed to delete" });
  }
};
