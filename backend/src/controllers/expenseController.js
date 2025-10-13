import * as expenseService from "../services/expenseService.js";

export const createNewExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenseData = req.body;
        const newExpense = await expenseService.createExpense(expenseData, userId);
        res.status(201).json({ message: 'Despesa criada com sucesso.', expense: newExpense });
    } catch(error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllExpenses = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await expenseService.getExpensesByUser(userId);
        res.status(200).json(expenses);
    } catch(error) {
        res.status(500).json({ message: 'Erro ao buscar despesas.' });
    }
};

export const updateExistingExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenseId = parseInt(req.params.id);
        const updateData = req.body;

        const updatedExpense = await expenseService.updateExpense(expenseId, userId, updateData);
        res.status(200).json({ message: 'Despesa atualizada com sucesso.', expense: updatedExpense});
    } catch(error) {
        if (error.message.includes('não encontrada')) {
            return res.status(404).json({ message: error.message });
        }
        if (error.message.includes('Acesso negado')) {
            return res.status(403).json({ message: error.message });
        }

        return res.status(400).json({ message: error.message });
    }
};

export const deleteExistingExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenseId = parseInt(req.params.id);

        await expenseService.deleteExpense(expenseId, userId);
        res.status(204).send();
    } catch(error) {
        if (error.message.includes('não encontrada')) {
            return res.status(404).json({ message: error.message });
        }
        if (error.message.includes('Acesso negado')) {
            return res.status(403).json({ message: error.message });
        }
        return res.status(400).json({ message: error.message });
    }
};