import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Páginas de autenticação */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Páginas principais da aplicação */}
        <Route path="/app" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* Futuramente: <Route path="products" element={<Products />} /> */}
          {/* Futuramente: <Route path="expenses" element={<Expenses />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;