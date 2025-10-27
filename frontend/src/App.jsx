import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// "Guardas" de rota
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfAuth from "./components/RedirectIfAuth";

// Layouts
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

// Páginas
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
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
            {/* Futuramente: <Route path="products" element={<Products />} /> */}
            {/* Futuramente: <Route path="expenses" element={<Expenses />} /> */}
          </Route>
        </Route>

        <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
