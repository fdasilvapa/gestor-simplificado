import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromToken = async () => {
      if (token) {
        try {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const { data } = await api.get("users/profile");
          setUser(data);
        } catch (error) {
          console.error("Token inválido, limpando...");
          setToken(null);
          setUser(null);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    loadUserFromToken();
  }, [token]);

  const login = async (email, password) => {
    const { data } = await api.post("/users/login", { email, password });

    setToken(data.token);
    localStorage.setItem("token", data.token);

    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    const { data: userData } = await api.get("/users/profile");
    setUser(userData);
  };

  const register = async (name, email, password) => {
    await api.post("/users/register", { name, email, password });
    await login(email, password);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  };

  const authContextValue = {
    isAuthenticated: !!token,
    token,
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider.");
  }
  return context;
};
