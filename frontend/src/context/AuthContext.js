import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('access_token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('access_token', newToken);
    navigate('/home');
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
