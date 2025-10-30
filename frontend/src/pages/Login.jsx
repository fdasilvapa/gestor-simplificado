import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  // Estados para armazenar o valor dos inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = "O e-mail é obrigatório.";
    }
    if (!password) {
      errors.password = "A senha é obrigatória.";
    }
    return errors;
  };

  // Função para lidar com o envio do formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    setFormErrors({});
    setIsSubmitting(true);

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      await login(email, password);

      navigate("/app/dashboard");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError("Ocorreu um erro. Tente novamente mais tarde.");
      }
    } finally {
      setIsSubmitting(false);
    }
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
              className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:border-green-500"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {formErrors.email && (
            <p className="mt-1 text-xs text-red-600">{formErrors.email}</p>
          )}
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
              className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:border-green-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {formErrors.password && (
            <p className="mt-1 text-xs text-red-600">{formErrors.password}</p>
          )}
        </div>

        {/* Exibidor de erro da API */}
        {apiError && (
          <p className="text-sm text-center text-red-600">{apiError}</p>
        )}

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
