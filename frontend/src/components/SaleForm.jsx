import React, { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import { Loader2, Plus, Trash2 } from "lucide-react";

const formatCurrency = (value) => {
  return parseFloat(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

function SaleForm({ onSave, onCancel, apiError, isSubmitting }) {
  const [saleDate, setSaleDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [formErrors, setFormErrors] = useState({});

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [allProducts, setAllProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setAllProducts(products);
      } catch (error) {
        setFormErrors({ products: "Erro ao carregar produtos." });
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const newTotal = items.reduce(
      (sum, item) => sum + item.priceAtSale * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [items]);

  const handleAddItem = () => {
    if (!selectedProductId || selectedQuantity <= 0) {
      setFormErrors({ items: "Selecione um produto e uma quantidade válida." });
      return;
    }

    const productId = parseInt(selectedProductId);

    if (items.find((item) => item.productId === productId)) {
      setFormErrors({ items: "Este produto já foi adicionado." });
      return;
    }

    const product = allProducts.find((p) => p.id === productId);

    setItems([
      ...items,
      {
        productId: product.id,
        name: product.name,
        quantity: parseInt(selectedQuantity),
        priceAtSale: parseFloat(product.price),
      },
    ]);

    setFormErrors({});
    setSelectedProductId("");
    setSelectedQuantity(1);
  };

  const handleRemoveItem = (productIdToRemove) => {
    setItems(items.filter((item) => item.productId !== productIdToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});

    const errors = {};

    if (items.length === 0) {
      errors.items = "A venda deve conter pelo menos um item.";
    }
    if (!saleDate) {
      errors.date = "A data é obrigatória.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const itemsForApi = items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    onSave({
      saleDate: new Date(saleDate),
      items: itemsForApi,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* --- Seletor de Itens --- */}
      <fieldset className="border p-4 rounded-md space-y-3">
        <legend className="text-lg font-medium text-gray-800 px-2">
          Adicionar Itens
        </legend>

        {/* Dropdown de Produtos */}
        <div>
          <label
            htmlFor="product"
            className="block text-sm font-medium text-gray-700"
          >
            Produto *
          </label>
          <select
            id="product"
            className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
          >
            <option value="" disabled>
              Selecione um produto...
            </option>
            {allProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({formatCurrency(p.price)})
              </option>
            ))}
          </select>
        </div>

        {/* Quantidade e Botão Adicionar */}
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Qtd. *
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={handleAddItem}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        {formErrors.items && (
          <p className="mt-1 text-xs text-red-600">{formErrors.items}</p>
        )}
      </fieldset>

      {/* Carrinho / Itens Adicionados */}
      <div className="space-y-2">
        <h4 className="text-md font-medium text-gray-700">Itens da Venda:</h4>
        {items.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            Nenhum item adicionado.
          </p>
        ) : (
          <ul className="border rounded-md divide-y divide-gray-200 max-h-32 overflow-y-auto">
            {items.map((item) => (
              <li
                key={item.productId}
                className="flex items-center justify-between p-3"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x {formatCurrency(item.priceAtSale)} ={" "}
                    {formatCurrency(item.quantity * item.priceAtSale)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.productId)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Data da Venda e Total */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div>
          <label
            htmlFor="saleDate"
            className="block text-sm font-medium text-gray-700"
          >
            Data da Venda *
          </label>
          <input
            id="saleDate"
            type="date"
            required
            className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={saleDate}
            onChange={(e) => setSaleDate(e.target.value)}
          />
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-500">Valor Total</p>
          <p className="text-3xl font-bold text-green-700">
            {formatCurrency(total)}
          </p>
        </div>
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
          disabled={isSubmitting || items.length === 0}
          className="flex items-center px-4 py-2 text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : null}
          {isSubmitting ? "Registrando..." : "Registrar Venda"}
        </button>
      </div>
    </form>
  );
}

export default SaleForm;
