import { Router } from "express";
import { getDashboardSummary } from "../controllers/dashboardController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.get('/summary', getDashboardSummary); // GET /api/dashboard/summary

export default router;