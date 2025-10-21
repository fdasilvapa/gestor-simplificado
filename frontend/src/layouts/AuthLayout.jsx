import React from "react";
import { Outlet } from "react-router-dom";
import { Wallet } from "lucide-react";

function AuthLayout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* --- Logo --- */}
      <div className="mb-10 text-center">
        <Wallet className="w-16 h-16 mx-auto text-green-600" />
        <h1 className="mt-4 text-4xl font-bold text-gray-800">
          Gestor
          <span className="text-green-600">Simplificado</span>
        </h1>
      </div>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
