import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
    const updateUser = (userData) => {
      setUser(userData);
    };


  return (
    <UserContext.Provider value={{ user, loading, error, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
