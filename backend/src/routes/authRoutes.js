import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { body, validationResult } from "express-validator";


const router = express.Router();

router.post(
  "/register",
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("contactNumber").isLength({ min: 10, max: 10 }),
  body("role").notEmpty(),
  body("location").notEmpty(),
  register
);

router.post("/login", login);
router.post("/logout", logout);

export default router;