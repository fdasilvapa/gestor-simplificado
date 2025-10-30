import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// "Guardas" de rota
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfAuth from "./components/RedirectIfAuth";

// Layouts
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

// Páginas de autenticação
import Login from "./pages/Login";
import Register from "./pages/Register";

// Páginas protegidas
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Expenses from "./pages/Expenses";
import Sales from "./pages/Sales";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
      <Routes>
        {/* Páginas de autenticação */}
        <Route element={<RedirectIfAuth />}>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>

        {/* Páginas principais da aplicação */}
        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="sales" element={<Sales />} />
          </Route>
        </Route>

        <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
