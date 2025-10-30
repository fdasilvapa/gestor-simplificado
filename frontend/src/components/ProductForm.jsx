import React, { useState } from "react";
import { Loader2 } from "lucide-react";

function ProductForm({ onSave, onCancel, apiError, isSubmitting }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      name,
      price: parseFloat(price),
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
          required
          className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          type="number"
          step="0.01"
          min="0.01"
          required
          className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          placeholder="0.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
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
          className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
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
          {isSubmitting ? "Salvando..." : "Salvar produto"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
