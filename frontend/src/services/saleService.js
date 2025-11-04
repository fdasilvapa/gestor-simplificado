import api from "./api";

export const getSales = async () => {
  try {
    const { data } = await api.get("/sales");
    return data;
  } catch (error) {
    throw error.response.data.message || "Erro ao buscar histórico de vendas.";
  }
};

export const getSaleById = async (id) => {
  try {
    const { data } = await api.get(`/sales/${id}`);
    return data;
  } catch (error) {
    throw error.response.data.message || "Erro ao buscar detalhes da venda.";
  }
};

export const createSale = async (saleData) => {
  try {
    const { data } = await api.post("/sales", saleData);
    return data;
  } catch (error) {
    throw error.response.data.message || "Erro ao criar venda.";
  }
};
