import React, { useState, useEffect } from "react";
import { Loader2, Upload, X } from "lucide-react";

function ProductForm({
  initialData,
  onSave,
  onCancel,
  apiError,
  isSubmitting,
}) {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price ?? "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    initialData?.imagePath
      ? `http://localhost:3000${initialData.imagePath}`
      : null
  );

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setPrice(initialData.price ?? "");
      setDescription(initialData.description || "");
      if (initialData.imagePath) {
        setPreview(`http://localhost:3000${initialData.imagePath}`);
      }
    } else {
      setName("");
      setPrice("");
      setDescription("");
      setPreview(null);
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    setFormErrors({});

    const file = e.target.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors({
          ...formErrors,
          image: "A imagem é muito grande. Máximo: 5MB.",
        });

        e.target.value = "";
        return;
      }

      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors({});

    const errors = {};
    if (!name.trim()) {
      errors.name = "O nome do produto é obrigatório.";
    }

    const priceString = String(price || "");
    const sanitizedPrice = priceString
      .replace(",", ".")
      .replace(/[^0-9.]/g, "");
    const numericPrice = parseFloat(sanitizedPrice);

    if (isNaN(numericPrice) || numericPrice <= 0) {
      errors.price = "Por favor, insira um preço válido (ex: 10,99).";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", numericPrice);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campo imagem */}
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="h-40 w-full object-cover rounded-md"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center cursor-pointer w-full">
            <Upload className="w-10 h-10 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">
              Clique para enviar uma imagem
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        )}
      </div>
      {formErrors.image && (
        <p className="text-sm text-center text-red-600 mt-2 font-medium">
          {formErrors.image}
        </p>
      )}
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
          placeholder="0,00"
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
          {isSubmitting
            ? "Salvando..."
            : initialData
            ? "Atualizar"
            : "Salvar produto"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
