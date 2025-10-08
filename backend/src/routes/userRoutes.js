import { Router } from "express";
import {
  createUser,
  loginUser,
  updateUser,
  //deleteUser,
} from "../controllers/userController.js";

const router = Router();

router.post("/register", createUser); // POST /api/users/register
router.post("/login", loginUser); // POST /api/users/login

router.put("/:id", updateUser); // PUT /api/users/123

// Funcionalidade futura
// router.delete("/:id", deleteUser); // DELETE /api/users/123

export default router;
