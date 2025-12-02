import api from "./api";

export const getProducts = async () => {
  try {
    const { data } = await api.get("/products");
    return data;
  } catch (error) {
    throw error.response.data.message || "Erro ao buscar produtos";
  }
};

export const createProduct = async (productData) => {
  try {
    const { data } = await api.post("/products", productData);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Erro ao criar produto";
  }
};

export const updateProduct = async (id, updateData) => {
  try {
    const { data } = await api.patch(`/products/${id}`, updateData);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Erro ao atualizar produto";
  }
};

export const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    throw error.response?.data?.message || "Erro ao deletar produto";
  }
};
