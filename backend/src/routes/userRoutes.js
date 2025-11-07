import { Router } from "express";
import {
  createUser,
  getUserProfileData,
  loginUser,
  updateUser,
  handleGenerateApiKey,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

// Rotas públicas
router.post("/register", createUser); // POST /api/users/register
router.post("/login", loginUser); // POST /api/users/login

// Rotas protegidas
router.get("/profile", authMiddleware, getUserProfileData); // GET /api/users/profile
router.patch("/profile", authMiddleware, updateUser); // PATCH /api/users/profile

router.post("/api-key", authMiddleware, handleGenerateApiKey);

export default router;
