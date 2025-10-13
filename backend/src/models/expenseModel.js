import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const create = async (expenseData) => {
    return await prisma.expense.create({
        data: expenseData,
    });
};

export const findManyByUserId = async (userId) => {
    return await prisma.expense.findMany({
        where: { userId: userId },
        orderBy: { date: 'desc' },
    });
};

export const findById = async (expenseId) => {
    return await prisma.expense.findUnique({
        where: { id: expenseId },
    });
};

export const update = async (expenseId, updateData) => {
    return await prisma.expense.update({
        where: { id: expenseId },
        data: updateData,
    });
};

export const remove = async (expenseId) => {
    return await prisma.expense.delete({
        where: { id: expenseId },
    });
};