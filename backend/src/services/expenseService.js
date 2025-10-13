import * as expenseModel from "../models/expenseModel.js";

export const createExpense = async (expenseData, userId) => {
    const { description, amount, date } = expenseData;

    if (!description || amount === undefined || !date) {
        throw new Error('Descrição, valor e data são obrigatórios.');
    }
    if (amount <= 0) {
        throw new Error('O valor da despesa deve ser positivo.');
    }

    const fullExpenseData = { ...expenseData, userId };

    return await expenseModel.create(fullExpenseData);
};

export const getExpensesByUser = async (userId) => {
    return await expenseModel.findManyByUserId(userId);
};

export const updateExpense = async (expenseId, userId, updateData) => {
    const expense = await expenseModel.findById(expenseId);
    if (!expense) {
        throw new Error('Despesa não encontrada.');
    }
    if (expense.userId !== userId) {
        throw new Error('Acesso negado. Você não tem permissão para editar esta despesa.');
    }

    if (updateData.amount !== undefined && updateData.amount <= 0) {
        throw new Error('O valor da despesa deve ser positivo.');
    }

    return await expenseModel.update(expenseId, updateData);
};

export const deleteExpense = async (expenseId, userId) => {
    const expense = await expenseModel.findById(expenseId);
    if (!expense) {
        throw new Error('Despesa não encontrada.');
    }
    if (expense.userId !== userId) {
        throw new Error('Acesso negado. Você não tem permissão para deletar esta despesa.');
    }

    return await expenseModel.remove(expenseId);
};