import * as saleModel from "../models/saleModel.js";
import * as productModel from "../models/productModel.js";

export const createSale = async (saleInput, userId) => {
  const { items, saleDate } = saleInput;

  if (!items || items.length === 0) {
    throw new Error("A venda deve conter pelo menos um item.");
  }
  if (!saleDate) {
    throw new Error("A data da venda é obrigatória.");
  }

  const productIds = items.map((item) => item.productId);
  const productsFromDb = await productModel.findManyByIdsAndUserId(productIds, userId);

  if (productsFromDb.length !== productIds.length) {
    throw new Error(
      "Um ou mais produtos não foram encontrados ou não pertencem a você."
    );
  }

  let totalAmount = 0;
  const itemsData = [];

  for (const item of items) {
    const product = productsFromDb.find((p) => p.id === item.productId);

    const itemTotal = parseFloat(product.price) * item.quantity;
    totalAmount += itemTotal;

    itemsData.push({
      productId: item.productId,
      quantity: item.quantity,
      priceAtSale: product.price,
    });
  }

  const saleData = {
    userId: userId,
    saleDate: new Date(saleDate),
    totalAmount: totalAmount,
  };

  return await saleModel.createWithItems(saleData, itemsData);
};

export const getSalesByUser = async (userId) => {
  return await saleModel.findManyByUserId(userId);
};

export const getSaleDetails = async (saleId, userId) => {
  const sale = await saleModel.findById(saleId);

  if (!sale) {
    throw new Error("Venda não encontrada.");
  }

  if (sale.userId !== userId) {
    throw new Error("Acesso negado.");
  }

  return sale;
};
