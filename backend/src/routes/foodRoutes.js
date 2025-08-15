import express from "express";
import { createFood, getAllFood, assignNGO, deleteFood } from "../controllers/foodController.js";
import { auth, permit } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth(), permit("mess"), createFood);
router.get("/", auth(), getAllFood);
router.put("/assign/:id", auth(), permit("ngo"), assignNGO);
router.delete("/:id", auth(), permit("mess", "admin"), deleteFood);

export default router;
