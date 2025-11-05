import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export const create = async (productData) => {
    return await prisma.product.create({
        data: productData,
    });
};

export const findManyByUserId = async (userId) => {
    return await prisma.product.findMany({
        where: { userId: userId },
    });
};

export const findManyByIdsAndUserId = async (productIds, userId) => {
    return await prisma.product.findMany({
        where: {
            id: { in: productIds },
            userId: userId,
        },
    });
};

export const findById = async (productId) => {
    return await prisma.product.findUnique({
        where: { id: productId },
    });
};

export const update = async (productId, updateData) => {
    return await prisma.product.update({
        where: { id: productId },
        data: updateData,
    });
};

export const remove = async (productId) => {
    return await prisma.product.delete({
        where: { id: productId },
    });
};
