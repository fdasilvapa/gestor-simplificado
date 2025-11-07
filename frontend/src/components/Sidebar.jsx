import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import {
  LayoutDashboard,
  Package,
  DollarSign,
  ShoppingCart,
  LogOut,
  User,
  Settings as SettingsIcon,
} from "lucide-react";

const NavItem = ({ to, icon: Icon, children }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center p-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors ${
          isActive ? "bg-green-100 text-green-700 font-medium" : ""
        }`
      }
    >
      <Icon className="w-5 h-5 mr-3" />
      {children}
    </NavLink>
  </li>
);

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white p-6 shadow-lg flex flex-col">
      {/* Logo */}
      <h2 className="text-3xl font-bold text-green-600 mb-8">Gestor</h2>

      {/* Menu principal */}
      <nav className="flex-1">
        <ul className="list-none p-0 m-0 space-y-2">
          <NavItem to="/app/dashboard" icon={LayoutDashboard}>
            Dashboard
          </NavItem>
          <NavItem to="/app/products" icon={Package}>
            Produtos
          </NavItem>
          <NavItem to="/app/expenses" icon={DollarSign}>
            Despesas
          </NavItem>
          <NavItem to="/app/sales" icon={ShoppingCart}>
            Vendas
          </NavItem>
        </ul>
      </nav>

      {/* Menu do usuário */}
      <div className="mt-auto">
        <ul className="list-none p-0 m-0 space-y-2">
          <NavItem to="/app/settings" icon={SettingsIcon}>
            Configurações
          </NavItem>

          <li>
            <div className="flex items-center p-3 mt-2 border-t border-gray-100">
              <User className="w-6 h-6 mr-3 text-gray-500" />
              <span className="text-gray-800 font-medium">
                {user?.name || "Usuário"}
              </span>
            </div>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sair
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
