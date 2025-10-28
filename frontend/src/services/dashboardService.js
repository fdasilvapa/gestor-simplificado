import api from "./api.js";

export const getDashboardSummary = async () => {
  try {
    const { data } = await api.get("/dashboard/summary");
    return data;
  } catch (error) {
    throw error.response.data.message || "Erro ao buscar dados do dashboard";
  }
};
