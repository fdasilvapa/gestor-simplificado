import React from "react";
import { Loader2, AlertTriangle } from "lucide-react";

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isSubmitting,
}) {
  if (!isOpen) return null;

  const handleOverlayMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onMouseDown={handleOverlayMouseDown}
    >
      {/* Card do modal */}
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div className="flex items-start space-x-4">
          {/* Ícone de alerta */}
          <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>

          {/* Conteúdo */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="mt-2 text-sm text-gray-600">{message}</p>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex justify-end pt-6 mt-6 border-t border-gray-200 space-x-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex items-center px-4 py-2 text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : null}
            {isSubmitting ? "Excluindo..." : "Sim, Excluir"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
