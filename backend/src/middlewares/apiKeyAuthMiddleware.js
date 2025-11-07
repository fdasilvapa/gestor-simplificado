import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const apiKeyAuthMiddleware = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Nenhuma chave de API fornecida." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        apiKey: apiKey,
      },
    });

    if (!user) {
      return res
        .status(403)
        .json({ message: "Acesso negado. Chave de API inválida." });
    }

    req.user = user;

    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao validar a chave de API." });
  }
};

export default apiKeyAuthMiddleware;
