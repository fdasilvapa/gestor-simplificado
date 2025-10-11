import { Router } from "express";
import {
  createUser,
  getUserProfileData,
  loginUser,
  updateUser,
  //deleteUser,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

// Rotas públicas
router.post("/register", createUser); // POST /api/users/register
router.post("/login", loginUser); // POST /api/users/login

// Rotas protegidas
router.get("/profile", authMiddleware, getUserProfileData); // GET /api/users/profile
router.patch("/profile", authMiddleware, updateUser); // PATCH /api/users/profile

// Funcionalidade futura
// router.delete("/:id", deleteUser); // DELETE /api/users/123

export default router;
