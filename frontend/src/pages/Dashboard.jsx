import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getDashboardSummary } from "../services/dashboardService";
import {
  DollarSign,
  ArrowUpCircle,
  ArrowDownCircle,
  Scale,
  Loader2,
  Filter,
} from "lucide-react";

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
    <div className={`p-3 rounded-full ${colorClass}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800">
        {value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </p>
    </div>
  </div>
);

const FilterButton = ({ label, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md text-sm font-medium ${
      isActive
        ? "bg-green-600 text-white shadow-md"
        : "bg-white text-gray-700 hover:bg-gray-50"
    }`}
  >
    {label}
  </button>
);

function Dashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [period, setPeriod] = useState("thisMonth");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const data = await getDashboardSummary(period);
        setSummary(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Falha ao carregar o resumo.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [period]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>Não foi possível carregar os dados do dashboard.</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Bloco de saudação */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Bem-vindo, {user?.name || "usuário"}!
        </h1>
        <p className="text-lg text-gray-600">
          Este é o seu resumo financeiro.
        </p>
      </div>

      {/* Bloco de controles/filtros */}
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="w-5 h-5 text-gray-600" />
        <label
          htmlFor="period-filter"
          className="text-sm font-medium text-gray-700"
        >
          Período:
        </label>
        <select
          id="period-filter"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="thisMonth">Este Mês</option>
          <option value="lastMonth">Mês Passado</option>
          <option value="last7days">Últ. 7 Dias</option>
          <option value="last3months">Últ. 3 Meses</option>
          <option value="last6months">Últ. 6 Meses</option>
          <option value="last12months">Últ. 12 Meses</option>
        </select>
      </div>

      {/* Grids de cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total de vendas"
            value={summary.totalSales}
            icon={ArrowUpCircle}
            colorClass="bg-green-500"
          />
          <StatCard
            title="Total de despesas"
            value={summary.totalExpenses}
            icon={ArrowDownCircle}
            colorClass="bg-red-500"
          />
          <StatCard
            title="Saldo do Mês"
            value={summary.balance}
            icon={Scale}
            colorClass={summary.balance >= 0 ? "bg-blue-500" : "bg-yellow-500"}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
