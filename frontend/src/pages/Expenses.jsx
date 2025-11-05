import React, { useState, useEffect } from "react";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../services/expenseService";
import { toast } from "react-hot-toast";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import Modal from "../components/ui/Modal";
import ConfirmationModal from "../components/ui/ConfirmationModal";
import ExpenseForm from "../components/ExpenseForm";

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
    return "Data inválida";
  }
};

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formError, setFormError] = useState(null);

  const [editingExpense, setEditingExpense] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses();
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError(err || "Falha ao carregar despesas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleCreateClick = () => {
    setEditingExpense(null);
    setFormError(null);
    setIsFormModalOpen(true);
  };

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
    setFormError(null);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    if (isSubmitting) return;
    setIsFormModalOpen(false);
    setEditingExpense(null);
  };

  const handleSaveExpense = async (expenseData) => {
    setFormError(null);
    setIsSubmitting(true);

    try {
      if (editingExpense) {
        await updateExpense(editingExpense.id, expenseData);
        toast.success("Despesa atualizada com sucesso!");
      } else {
        await createExpense(expenseData);
        toast.success("Despesa criada com sucesso!");
      }

      setIsFormModalOpen(false);
      setEditingExpense(null);
      fetchExpenses();
    } catch (err) {
      setFormError(err || "Falha ao salvar despesa.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (expense) => {
    setExpenseToDelete(expense);
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    if (isDeleting) return;
    setIsConfirmModalOpen(false);
    setExpenseToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!expenseToDelete) return;

    setIsDeleting(true);
    try {
      await deleteExpense(expenseToDelete.id);
      toast.success("Despesa excluída com sucesso!");
      setIsConfirmModalOpen(false);
      setExpenseToDelete(null);
      fetchExpenses();
    } catch (err) {
      toast.error(err || "Falha ao excluir despesa.");
    } finally {
      setIsDeleting(false);
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
        <h1 className="text-4xl font-bold text-gray-800">Minhas Despesas</h1>
        <button
          onClick={handleCreateClick}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nova Despesa
        </button>
      </div>

      {/* Tabela de Despesas */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descrição
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {expense.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {expense.category || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(expense.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEditClick(expense)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(expense)}
                      className="text-red-600 hover:text-red-900 p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  Você ainda não cadastrou nenhuma despesa.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Criar/Editar Despesa */}
      <Modal
        title={editingExpense ? "Editar Despesa" : "Nova Despesa"}
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
      >
        <ExpenseForm
          initialData={editingExpense}
          onSave={handleSaveExpense}
          onCancel={handleCloseFormModal}
          apiError={formError}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Modal de Confirmação */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmDelete}
        title="Excluir Despesa"
        message={`Você tem certeza que deseja excluir a despesa "${expenseToDelete?.description}"? Esta ação não pode ser desfeita.`}
        isSubmitting={isDeleting}
      />
    </div>
  );
}

export default Expenses;
