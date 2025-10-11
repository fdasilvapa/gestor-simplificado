import * as productModel from '../models/productModel.js';

export const createProduct = async (productData, userId) => {
    const { name, price } = productData;

    if (!name || !price === undefined) {
        throw new Error('Nome e preço são obrigatórios.');
    }

    if (price <= 0) {
        throw new Error('O preço deve ser um valor positivo.');
    }

    const fullProductData = { ...productData, userId:userId };

    return await productModel.create(fullProductData);
};

export const getProductsByUser = async (userId) => {
    return await productModel.findManyByUserId(userId);
};

export const updateProduct = async (productId, userId, updateData) => {
    const product = await productModel.findById(productId);
    if(!product) {
        throw new Error('Produto não encontrado.');
    }

    if (product.userId !== userId) {
        throw new Error('Acesso negado. Você não possui permissão para editar este produto.');
    }

    if (updateData.price !== undefined && updateData.price <= 0) {
        throw new Error('O preço deve ser um valor positivo.');
    }

    return await productModel.update(productId, updateData);
};

export const deleteProduct = async (productId, userId) => {
    const product = productModel.findById(productId);
    if (!product) {
        throw new Error('Produto não encontrado.');
    }

    if (productId.userId !== userId) {
        throw new Error('Acesso negado. Você não possui permissão para deletar este produto.')
    }

    return await productModel.remove(productId);
};
