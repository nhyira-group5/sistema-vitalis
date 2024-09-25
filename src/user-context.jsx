import { ContinuousColorLegend } from "@mui/x-charts";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [activitySelected, setActivitySelected] = useState(0);

  useEffect(() => {
    const usuario = localStorage.getItem('user')
    if (usuario !== null) {
      const transformado = JSON.parse(usuario)
      setUser(transformado);
    }
  }, [])

  const updateUser = (userData) => {
    setUser(userData);
  };

  const updatePagamento = () => {
    setUser((prevUsuario) => ({
      ...prevUsuario,
      pagamentoAtivo: true,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loading, error, updateUser, updatePagamento }}>
      {children}
    </UserContext.Provider>
  );
};
