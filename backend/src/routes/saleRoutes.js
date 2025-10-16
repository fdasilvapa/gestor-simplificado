import { Router } from "express";
import {
    createNewSale,
    getAllSales,
    getSalesById,
} from "../controllers/saleController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post('/', createNewSale); // POST /api/sales
router.get('/', getAllSales); // GET /api/sales

router.get('/:id', getSalesById); // GET /api/sales/:id

export default router;