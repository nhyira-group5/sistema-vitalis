import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserById = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`/usuarios/${userId}`);
      setUser(response.data);
      localStorage.setItem('userData', JSON.stringify(response.data));
    } catch (err) {
      setError('deu erro');
    } finally {
      setLoading(false);
    }
  };

  return (
    // <UserContext.Provider value={{ user, loading, error, fetchUserById }}>
    <UserContext.Provider value={{ nome: 'samuca' }}>
      {children}
    </UserContext.Provider>
  );
};
