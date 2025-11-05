import React, { useState, useEffect } from "react";
import { getSales, createSale } from "../services/saleService";
import { Loader2, Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import Modal from "../components/ui/Modal";
import SaleForm from "../components/SaleForm";

const formatCurrency = (value) => {
  return parseFloat(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    });
  } catch (e) {
    return "Data inválida.";
  }
};

function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const data = await getSales();
      setSales(data);
      setError(null);
    } catch (err) {
      setError(err || "Falha ao carregar vendas.");
      toast.error(err || "Falha ao carregar vendas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleCreateClick = () => {
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
  };

  const handleSaveSale = async (saleData) => {
    setFormError(null);
    setIsSubmitting(true);

    try {
      await createSale(saleData);

      toast.success("Venda registrada com sucesso!");
      setIsModalOpen(false);
      fetchSales();
    } catch (err) {
      setFormError(err || "Falha ao registrar venda.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Cabeçalho da Página e Botão de Ação */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Histórico de Vendas
        </h1>
        <button
          onClick={handleCreateClick}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nova Venda
        </button>
      </div>

      {/* Tabela de Vendas */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID da Venda
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Itens Vendidos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales.length > 0 ? (
              sales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{sale.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(sale.saleDate)}
                  </td>

                  {/* Célula de Itens Vendidos */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <ul className="list-disc list-inside">
                      {sale.items.map((item) => (
                        <li key={item.id}>
                          {item.quantity}x{" "}
                          {item.product?.name || (
                            <span className="text-red-500">
                              [Produto Excluído]
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-700">
                    {formatCurrency(sale.totalAmount)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  Você ainda não registrou nenhuma venda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de nova venda */}
      <Modal
        title="Registrar Nova Venda"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <SaleForm
          onSave={handleSaveSale}
          onCancel={handleCloseModal}
          apiError={formError}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
}

export default Sales;
