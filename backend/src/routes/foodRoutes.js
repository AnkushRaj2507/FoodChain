import express from "express";
import {
  createFood,
  getAllFood,
  claimFood,
  markFoodCollected,
  deleteFood,
} from "../controllers/foodController.js";
import { auth, permit } from "../middleware/auth.js";
import Food from "../models/Food.js"; // ✅ Import Food model

const router = express.Router();

// Mess uploads new food
router.post("/", auth(), permit("mess"), createFood);

// Fetch all food (available, claimed, collected)
router.get("/", auth(), getAllFood);

// NGO claims food (status: available → claimed)
router.put("/:id/claim", auth(), permit("ngo"), claimFood);

// NGO marks food as collected (status: claimed → collected)
router.put("/:id/collected", auth(), permit("ngo"), markFoodCollected);

// Delete food (only mess or admin can delete)
router.delete("/:id", auth(), permit("mess", "admin"), deleteFood);

// Leaderboard route
router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await Food.aggregate([
      {
        $group: {
          _id: "$messName", // group by messName
          totalDonations: { $sum: 1 }, // count donations
        },
      },
      { $sort: { totalDonations: -1 } }, // sort highest first
    ]);

    res.json(
      leaderboard.map((l) => ({
        messName: l._id,
        totalDonations: l.totalDonations,
      }))
    );
  } catch (error) {
    console.error("Leaderboard fetch failed:", error);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
});

export default router;
