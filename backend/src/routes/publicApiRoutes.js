import { Router } from "express";
import apiKeyAuthMiddleware from "../middlewares/apiKeyAuthMiddleware.js";

import { getAllProducts, getPublicProductById } from "../controllers/productController.js";
import { createNewSale } from "../controllers/saleController.js";

const router = Router();

router.use(apiKeyAuthMiddleware);

router.get("/products", getAllProducts);
router.get('/products/:id', getPublicProductById);

router.post("/sales", createNewSale);

export default router;
