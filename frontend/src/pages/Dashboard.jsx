import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getDashboardSummary } from "../services/dashboardService";
import {
  DollarSign,
  ArrowUpCircle,
  ArrowDownCircle,
  Scale,
  Loader2,
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

function Dashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const data = await getDashboardSummary();
        setSummary(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Falha ao carregar o resumo.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

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
      {/* Cabeçalho de saudação */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Bem-vindo, {user?.name || "usuário"}!
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Este é o resumo financeiro do seu mês.
      </p>

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
