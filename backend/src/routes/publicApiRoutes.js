import { Router } from "express";
import apiKeyAuthMiddleware from "../middlewares/apiKeyAuthMiddleware.js";

import { getAllProducts } from "../controllers/productController.js";
import { createNewSale } from "../controllers/saleController.js";

const router = Router();

router.use(apiKeyAuthMiddleware);

router.get("/products", getAllProducts);

router.post("/sales", createNewSale);

export default router;
