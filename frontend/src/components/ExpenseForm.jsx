import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

function ExpenseForm({
  initialData,
  onSave,
  onCancel,
  apiError,
  isSubmitting,
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "";

    try {
      return new Date(dateString).toISOString().split("T")[0];
    } catch (e) {
      return "";
    }
  };

  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [amount, setAmount] = useState(initialData?.amount ?? "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [date, setDate] = useState(formatDate(initialData?.date));

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setDescription(initialData.description || "");
      setAmount(initialData.amount ?? "");
      setCategory(initialData.category || "");
      setDate(formatDate(initialData.date));
    } else {
      setDescription("");
      setAmount("");
      setCategory("");
      setDate(formatDate(new Date().toISOString()));
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});

    const errors = {};
    if (!description.trim()) {
      errors.description = "A descrição é obrigatória.";
    }
    if (!date) {
      errors.date = "A data é obrigatória.";
    }

    const amountString = String(amount || "");
    const sanitizedAmount = amountString
      .replace(",", ".")
      .replace(/[^0-9.]/g, "");
    const numericAmount = parseFloat(sanitizedAmount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      errors.amount = "Por favor, insira um valor válido (ex: 10,99).";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    onSave({
      description,
      amount: numericAmount,
      category,
      date: new Date(date),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Campo descrição */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descrição *
        </label>
        <input
          id="description"
          type="text"
          maxLength="255"
          required
          className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {formErrors.description && (
          <p className="mt-1 text-xs text-red-600">{formErrors.description}</p>
        )}
      </div>

      {/* Linha com valor e data */}
      <div className="flex flex-col md:flex-row md:space-x-4">
        {/* Valor */}
        <div className="flex-1">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Valor (R$) *
          </label>
          <input
            id="amount"
            type="text"
            inputMode="decimal"
            className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            placeholder="0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {formErrors.amount && (
            <p className="mt-1 text-xs text-red-600">{formErrors.amount}</p>
          )}
        </div>

        {/* Data */}
        <div className="flex-1 mt-4 md:mt-0">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Data *
          </label>
          <input
            id="date"
            type="date"
            required
            className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {formErrors.date && (
            <p className="mt-1 text-xs text-red-600">{formErrors.date}</p>
          )}
        </div>
      </div>

      {/* Categoria */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Categoria (Opcional)
        </label>
        <input
          id="category"
          type="text"
          maxLength="100"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          placeholder="Ex: Software, Alimentação..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      {/* Exibidor de Erro da API */}
      {apiError && (
        <p className="text-sm text-center text-red-600">{apiError}</p>
      )}

      {/* Botões de Ação */}
      <div className="flex justify-end pt-4 space-x-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center px-4 py-2 text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
          {isSubmitting ? "Salvando..." : (initialData ? "Atualizar Despesa" : "Salvar Despesa")}
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
