import express from "express";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

const app = express();

// Middlewares essenciais
app.use(express.json());

// Prefixos das rotas
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/expenses", expenseRoutes);

export default app;
