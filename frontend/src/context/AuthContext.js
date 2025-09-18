"use client";

import { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");

    if (storedUserId && storedToken) {
      setUserId(storedUserId);
      setToken(storedToken);
    }
  }, []);

  
  const login = (id, jwtToken) => {
    setUserId(id);
    setToken(jwtToken);
    localStorage.setItem("userId", id);
    localStorage.setItem("token", jwtToken);
  };

  
  const logout = () => {
    setUserId(null);
    setToken(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ userId, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => useContext(AuthContext);
