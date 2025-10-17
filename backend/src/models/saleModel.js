import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createWithItems = async (saleData, itemsData) => {
  return await prisma.$transaction(async (tx) => {
    const sale = await tx.sale.create({
      data: saleData,
    });

    const itemsWithSaleId = itemsData.map((item) => ({
      ...item,
      saleId: sale.id,
    }));

    await tx.saleItem.createMany({
      data: itemsWithSaleId,
    });

    return tx.sale.findUnique({
      where: { id: sale.id },
      include: {
        items: true,
      },
    });
  });
};

export const findManyByUserId = async (userId) => {
  return await prisma.sale.findMany({
    where: { userId: userId },
    orderBy: { saleDate: "desc" },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const findById = async (saleId) => {
  return await prisma.sale.findUnique({
    where: { id: saleId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const sumByUserIdAndDateRange = async (userId, startDate, endDate) => {
  const result = await prisma.sale.aggregate({
    _sum: {
      totalAmount: true,
    },
    where: {
      userId: userId,
      saleDate: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  return parseFloat(result._sum.totalAmount) || 0;
};