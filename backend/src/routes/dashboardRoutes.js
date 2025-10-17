import { Router } from "express";
import { getDashboardSummary } from "../controllers/dashboardController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get('/summary', getDashboardSummary); // GET /api/dashboard/summary

export default router;