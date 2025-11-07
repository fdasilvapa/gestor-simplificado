import React from "react";

function Settings() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Configurações</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Chave de API (Integração)
        </h2>
        <p className="text-gray-600 mb-4">
          Use esta chave para conectar seu E-commerce (V2) ao Gestor
          Simplificado.
        </p>

        <div className="p-4 bg-gray-100 rounded-md">
          <p className="text-gray-700">Sua chave de API aparecerá aqui...</p>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700">
            Gerar chave de API
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
