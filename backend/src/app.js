import express from "express";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

// Middlewares essenciais
app.use(express.json());

// Define um prefixo para todas as rotas de API e usa o roteador de usuários
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

export default app;
