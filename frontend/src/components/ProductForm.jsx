import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

function ProductForm({
  initialData,
  onSave,
  onCancel,
  apiError,
  isSubmitting,
}) {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price ?? "");
  const [description, setDescription] = useState(initialData?.description || "");

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setPrice(initialData.price ?? "");
      setDescription(initialData.description || "");
    } else {
      setName("");
      setPrice("");
      setDescription("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors({});

    const errors = {};
    if (!name.trim()) {
      errors.name = "O nome do produto é obrigatório.";
    }

    const priceString = String(price || "");
    const sanitizedPrice = priceString.replace(",", ".").replace(/[^0-9.]/g, "");
    const numericPrice = parseFloat(sanitizedPrice);

    if (isNaN(numericPrice) || numericPrice <= 0) {
      errors.price = "Por favor, insira um preço válido (ex: 10,99).";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    onSave({
      name,
      price: numericPrice,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campo nome */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 "
        >
          Nome do produto *
        </label>
        <input
          id="name"
          type="text"
          maxLength="100"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:border-green-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {formErrors.name && (
          <p className="mt-1 text-xs text-red-600">{formErrors.name}</p>
        )}
      </div>

      {/* Campo preço */}
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Preço (R$) *
        </label>
        <input
          id="price"
          type="text"
          inputMode="decimal"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:border-green-500"
          placeholder="0.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {formErrors.price && (
          <p className="mt-1 text-xs text-red-600">{formErrors.price}</p>
        )}
      </div>

      {/* Campo descrição */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descrição (Opcional)
        </label>
        <textarea
          id="description"
          rows="3"
          maxLength="255"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:border-green-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Exibidor de erro da API */}
      {apiError && (
        <p className="text-sm text-center text-red-600">{apiError}</p>
      )}

      {/* Botões de ação */}
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
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : null}
          {isSubmitting ? "Salvando..." : (initialData ? "Atualizar" : "Salvar produto")}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
