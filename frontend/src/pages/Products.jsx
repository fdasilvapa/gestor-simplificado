import React, { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import { Loader2, Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import Modal from "../components/ui/Modal";
import ConfirmationModal from "../components/ui/ConfirmationModal";
import ProductForm from "../components/ProductForm";
import { toast } from "react-hot-toast";

const formatCurrency = (value) => {
  return parseFloat(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err || "Falha ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateClick = () => {
    setEditingProduct(null);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = async (productData) => {
    setFormError(null);
    setIsSubmitting(true);

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        toast.success("Produto atualizado com sucesso!");
      } else {
        await createProduct(productData);
        toast.success("Produto criado com sucesso!");
      }

      setIsModalOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      setFormError(err || "Falha ao salvar produto.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setProductToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    try {
      await deleteProduct(productToDelete.id);

      toast.success("Produto excluído com sucesso!");
      setIsConfirmModalOpen(false);
      setProductToDelete(null);
      fetchProducts();
    } catch (err) {
      toast.error(err || "Falha ao excluir produto.");
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
        <h1 className="text-4xl font-bold text-gray-800">Meus Produtos</h1>
        <button
          onClick={handleCreateClick}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Novo Produto
        </button>
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                Imagem
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descrição
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.imagePath ? (
                      <img
                        src={`http://localhost:3000${product.imagePath}`}
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded-md border"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center border">
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.description || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product)}
                      className="text-red-600 hover:text-red-900 p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  Você ainda não cadastrou nenhum produto.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        title={editingProduct ? "Editar produto" : "Novo Produto"}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <ProductForm
          initialData={editingProduct}
          onSave={handleSaveProduct}
          onCancel={handleCloseModal}
          apiError={formError}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Confirmação */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmDelete}
        title="Excluir produto"
        message={`Você tem certeza que deseja excluir o produto "${productToDelete?.name}"? Esta ação não pode ser desfeita.`}
        isSubmitting={isDeleting}
      />
    </div>
  );
}

export default Products;
