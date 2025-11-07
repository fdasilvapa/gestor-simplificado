import api from "./api";

export const generateApiKey = async () => {
  try {
    const { data } = await api.post("/users/api-key");
    return data.apiKey;
  } catch (error) {
    throw error.response.data.message || "Erro ao gerar chave de API";
  }
};

export const getUserProfile = async () => {
  try {
    const { data } = await api.get("/users/profile");
    return data;
  } catch (error) {
    throw error.response.data.message || "Erro ao buscar perfil";
  }
};
