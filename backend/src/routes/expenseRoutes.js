import { Router } from "express";
import {
    createNewExpense,
    getAllExpenses,
    updateExistingExpense,
    deleteExistingExpense,
} from "../controllers/expenseController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post('/', createNewExpense); // POST /api/expenses
router.get('/', getAllExpenses); // GET /api/expenses

router.patch('/:id', updateExistingExpense); // PATCH /api/expenses/:id
router.delete('/:id', deleteExistingExpense); // DELETE /api/expenses/:id

export default router;