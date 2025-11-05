import express from "express";
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

// Middlewares essenciais
app.use(express.json());

app.use(cors({
  origin: process.env.CORS_ORIGIN 
}));

// Prefixos das rotas
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;
