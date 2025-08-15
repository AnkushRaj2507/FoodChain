import express from "express";
import { register, login } from "../controllers/authController.js";
import { body, validationResult } from "express-validator";


const router = express.Router();

router.post(
  "/register",
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  register
);

router.post("/login", login);

export default router;
