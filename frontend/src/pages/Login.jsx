import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

function Login() {
  // Estados para armazenar o valor dos inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Função para lidar com o envio do formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do login: ", { email, password });
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo de e-mail */}
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            E-mail
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Campo de senha */}
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Senha
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Botão de Entrar */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-3 font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
          >
            Entrar
          </button>
        </div>
      </form>

      {/* Link para Cadastro */}
      <p className="text-sm text-center text-gray-600">
        Não tem uma conta?{" "}
        <Link
          to="/register"
          className="font-medium text-green-600 hover:text-green-500"
        >
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}

export default Login;
