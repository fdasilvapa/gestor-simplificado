import { Router } from "express";
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

router.post("/", createUser); // POST /api/users/
router.get("/", getAllUsers); // GET /api/users/
router.put("/:id", updateUser); // PUT /api/users/123
router.delete("/:id", deleteUser); // DELETE /api/users/123

export default router;
