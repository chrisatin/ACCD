import React, { createContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("token");
  }, []);

  const checkTokenExpiration = useCallback((token) => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          logout();
        } else {
          const timeUntilExpiration = (decodedToken.exp - currentTime) * 1000;
          setTimeout(logout, timeUntilExpiration);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        logout();
      }
    }
  }, [logout]);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    setIsAuthenticated(true);
    checkTokenExpiration(newToken);
  };

  const checkAuth = useCallback(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      checkTokenExpiration(savedToken);
      if (isAuthenticated) {
        setToken(savedToken);
      }
    }
  }, [checkTokenExpiration, isAuthenticated]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};