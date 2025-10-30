import React from "react";
import { X } from "lucide-react";

function Modal({ isOpen, onClose, title, children }) {
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
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Conteúdo (Children) */}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
