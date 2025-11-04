import api from "./api.js";

export const getDashboardSummary = async (periodKey = "thisMonth") => {
  try {
    const { data } = await api.get(`/dashboard/summary?period=${periodKey}`);
    return data;
  } catch (error) {
    throw error.response.data.message || "Erro ao buscar dados do dashboard";
  }
};
