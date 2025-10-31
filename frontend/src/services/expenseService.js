import api from "./api";

export const getExpenses = async () => {
  try {
    const { data } = await api.get("/expenses");
    return data;
  } catch (error) {
    throw error.response.data.message || "Erro ao buscar despesas";
  }
};

export const createExpense = async (expenseData) => {
  try {
    const { data } = await api.post("/expenses", expenseData);
    return data;
  } catch (error) {
    throw error.response.data.message || "Erro ao criar despesa";
  }
};

export const updateExpense = async (id, updateData) => {
  try {
    const { data } = api.patch(`/expenses/${id}`, updateData);
    return data;
  } catch (error) {
    throw error.response.data.message || "Erro ao atualizar despesa";
  }
};

export const deleteExpense = async (id) => {
  try {
    await api.delete(`/expenses/${id}`);
  } catch (error) {
    throw error.response.data.message || "Erro ao deletar despesa";
  }
};
