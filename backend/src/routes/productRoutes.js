import { Router } from "express";
import {
  createNewProduct,
  getAllProducts,
  updateExistingProduct,
  deleteExistingProduct,
} from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { upload } from "../config/uploadConfig.js";

const router = Router();

router.use(authMiddleware);

// Rotas protegidas  
router.post("/", upload.single('image'), createNewProduct); // POST /api/products
router.get("/", getAllProducts); // GET /api/products

router.patch("/:id", upload.single('image'), updateExistingProduct); // PATCH /api/products/:id
router.delete("/:id", deleteExistingProduct); // DELETE /api/products/:id

export default router;