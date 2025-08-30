import express from "express";
import {
    createFood,
    getAllFood,
    claimFood,          // ✅ New controller
    markFoodCollected,  // ✅ New controller
    deleteFood
} from "../controllers/foodController.js";
import { auth, permit } from "../middleware/auth.js";

const router = express.Router();

// 🍽️ Mess uploads new food
router.post("/", auth(), permit("mess"), createFood);

// 📦 Fetch all food (available, claimed, collected)
router.get("/", auth(), getAllFood);

// 🟢 NGO claims food (status: available → claimed)
router.put("/:id/claim", auth(), permit("ngo"), claimFood);

// ✅ NGO marks food as collected (status: claimed → collected)
router.put("/:id/collected", auth(), permit("ngo"), markFoodCollected);

// ❌ Delete food (only mess or admin can delete)
router.delete("/:id", auth(), permit("mess", "admin"), deleteFood);

export default router;
