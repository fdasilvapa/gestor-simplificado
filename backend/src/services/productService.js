import * as productModel from "../models/productModel.js";
import { Prisma } from "@prisma/client";

export const createProduct = async (productData, userId) => {
  const { name, price } = productData;

  if (!name || price === undefined) {
    throw new Error("Nome e preço são obrigatórios.");
  }

  if (price <= 0) {
    throw new Error("O preço deve ser um valor positivo.");
  }

  const fullProductData = { ...productData, userId: userId };

  return await productModel.create(fullProductData);
};

export const getProductsByUser = async (userId) => {
  return await productModel.findManyByUserId(userId);
};

export const updateProduct = async (productId, userId, updateData) => {
  const product = await productModel.findById(productId);
  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  if (product.userId !== userId) {
    throw new Error(
      "Acesso negado. Você não possui permissão para editar este produto."
    );
  }

  if (updateData.price !== undefined && updateData.price <= 0) {
    throw new Error("O preço deve ser um valor positivo.");
  }

  return await productModel.update(productId, updateData);
};

export const deleteProduct = async (productId, userId) => {
  const product = await productModel.findById(productId);

  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  if (product.userId !== userId) {
    throw new Error(
      "Acesso negado. Você não possui permissão para deletar este produto."
    );
  }

  try {
    return await productModel.remove(productId);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        throw new Error(
          "Este produto não pode ser excluído pois já está associado a uma ou mais vendas."
        );
      }
    }
    throw error;
  }
};

export const getProductById = async (productId, userId) => {
  return await prisma.product.findFirst({
    where: {
      id: productId,
      userId: userId,
    },
  });
};
