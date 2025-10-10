import { Router } from "express";
import {
  createUser,
  loginUser,
  updateUser,
  //deleteUser,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", createUser); // POST /api/users/register
router.post("/login", loginUser); // POST /api/users/login

router.patch("/profile", authMiddleware, updateUser); // PATCH /api/users/profile

// Funcionalidade futura
// router.delete("/:id", deleteUser); // DELETE /api/users/123

export default router;
