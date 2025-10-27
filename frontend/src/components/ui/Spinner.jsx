import React from "react";
import { Loader2 } from "lucide-react";

function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
      <span className="mt-4 text-lg text-gray-700">Carregando...</span>
    </div>
  );
}

export default Spinner;
