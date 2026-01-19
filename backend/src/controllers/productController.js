import * as productService from "../services/productService.js";
import fs from "fs";
import path from "path";

const deleteFile = (filePath) => {
  if (!filePath) return;

  const relativePath = filePath.startsWith("/") ? filePath.slice(1) : filePath;
  const fullPath = path.resolve(process.cwd(), relativePath);

  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error(`Erro ao deletar arquivo antigo: ${fullPath}`, err.message);
    } else {
      console.log(`Arquivo deletado: ${fullPath}`);
    }
  });
};

export const createNewProduct = async (req, res) => {
  try {
    const userId = req.user.id;

    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const productData = {
      name: req.body.name,
      description: req.body.description,
      price: parseFloat(req.body.price),
      imagePath: imagePath,
      userId: userId,
    };

    const newProduct = await productService.createProduct(productData, userId);
    res.status(201).json({
      message: "Produto cadastrado com sucesso.",
      product: newProduct,
    });
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
    res.status(500).json({ message: "Erro ao buscar produtos." });
  }
};

export const updateExistingProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = parseInt(req.params.id);

    const currentProduct = await productService.getProductById(
      productId,
      userId
    );

    if (!currentProduct) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    let updateData = {};

    if (req.body.name) updateData.name = req.body.name;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.price) updateData.price = parseFloat(req.body.price);

    if (req.file) {
      updateData.imagePath = `/uploads/${req.file.filename}`;

      if (currentProduct.imagePath) {
        deleteFile(currentProduct.imagePath);
      }
    }

    const updatedProduct = await productService.updateProduct(
      productId,
      userId,
      updateData
    );
    res.status(200).json({
      message: "Produto atualizado com sucesso.",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export const deleteExistingProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = parseInt(req.params.id);

    const currentProduct = await productService.getProductById(
      productId,
      userId
    );

    if (currentProduct && currentProduct.imagePath) {
      deleteFile(currentProduct.imagePath);
    }

    await productService.deleteProduct(productId, userId);
    res.status(204).send();
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export const getPublicProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const product = await productService.getProductByIdPublic(productId);

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produto" });
  }
};
