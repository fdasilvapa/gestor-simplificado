import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { generateApiKey } from "../services/userService";
import { toast } from "react-hot-toast";
import { Loader2, Copy, Check } from "lucide-react";

function Settings() {
  const { user } = useAuth();

  const [apiKey, setApiKey] = useState(user?.apiKey || null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const handleGenerateKey = async () => {
    if (apiKey) {
      if (!window.confirm("Gerar uma nova chave invalidará a chave anterior. Deseja continuar?")) {
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const newKey = await generateApiKey();
      setApiKey(newKey);
      toast.success("Nova chave de API gerada com sucesso!");
    } catch (error) {
      toast.error(error.message || "Falha ao gerar a chave.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setHasCopied(true);
    toast.success("Chave copiada para a área de transferência!");
    setTimeout(() => setHasCopied(false), 2000);
  };

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
        <div className="p-3 bg-red-50 rounded-md border border-red-200 mb-6">
          <p className="text-sm font-medium text-red-700">
            Esta chave é secreta e não deve ser compartilhada com ninguém.
          </p>
        </div>

        <div className="p-4 bg-gray-100 rounded-md">
          <label className="text-sm font-medium text-gray-700">
            Sua chave de API
          </label>

          {/* Seletor de conteúdo */}
          {apiKey ? (
            <div className="flex items-center justify-between mt-2 p-3 bg-gray-200 rounded">
              <span className="font-mono text-sm text-gray-700 truncate">
                ******************************************************
                {apiKey.slice(-4)}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 text-gray-600 hover:text-gray-600 rounded"
                title="Copiar"
              >
                {hasCopied ? (
                  <Check className="w-5 h-5 text-gray-600" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          ) : (
            <p className="mt-2 text-gray-500">
              Você ainda não gerou uma chave de API.
            </p>
          )}

          {/* Botão de gerar/regerar chave */}
          <button
            onClick={handleGenerateKey}
            disabled={isSubmitting}
            className="flex items-center mt-4 px-4 py-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : null}
            {isSubmitting
              ? "Gerando..."
              : apiKey
              ? "Regerar chave"
              : "Gerar chave de API"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
