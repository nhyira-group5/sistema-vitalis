import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [user, setUser] = useState(null);

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

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
