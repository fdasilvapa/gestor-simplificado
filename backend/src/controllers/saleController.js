import * as saleService from "../services/saleService.js";

export const createNewSale = async (req, res) => {
    try {
        const userId = req.user.id;
        const saleInput = req.body;
        const newSale = await saleService.createSale(saleInput, userId);
        res.status(201).json({ message: "Venda criada com sucesso.", sale: newSale });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllSales = async (req, res) => {
    try {
        const userId = req.user.id;
        const sales = await saleService.getSalesByUser(userId);
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar vendas.' });
    }
};

export const getSalesById = async (req, res) => {
    try {
        const userId = req.user.id;
        const saleId = parseInt(req.params.id);
        const sale = await saleService.getSaleDetails(saleId, userId);
        res.status(200).json(sale);
    } catch (error) {
        if (error.message.includes('não encontrada')) {
            return res.status(404).json({ message: error.message });
        }
        if (error.message.includes('Acesso negado')) {
            return res.status(403).json({ message: error.message });
        }

        return res.status(400).json({ message: error.message });
    }
};