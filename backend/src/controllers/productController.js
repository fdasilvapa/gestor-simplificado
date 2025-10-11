import * as productService from '../services/productService.js';

export const createNewProduct = async (req, res) => {
    try {
        const userId = req.user.id;
        const productData = req.body;
        const newProduct = productService.createProduct(productData, userId);
        res.status(201).json({ message: 'Produto cadastrado com sucesso.', product: newProduct });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const userId = req.user.id;
        const products = await productService.getProductsByUser(userId);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produtos.' });
    }
};

export const updateExistingProduct = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = parseInt(req.params.id);
        const updateData = req.body;

        const updatedProduct = await productService.updateProduct(productId, userId, updateData);
        res.status(200).json({ message: 'Produto atualizado com sucesso.', product: updatedProduct });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

export const deleteExistingProduct = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = parseInt(req.params.id);

        await productService.deleteProduct(productId, userId);
        res.status(204).send();
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};