import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middlewares essenciais
app.use(express.json());

// Define um prefixo para todas as rotas de API e usa o roteador de usuários
app.use("/api/users", userRoutes);

export default app;
