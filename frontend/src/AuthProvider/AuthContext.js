import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../Api/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Load token and user from localStorage on init
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  useEffect(() => {
    // Sync state to localStorage whenever token or user changes
    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token, user]);

  const login = async (credentials) => {
    const res = await loginUser(credentials);
    setToken(res.data.token);

    // Assume res.data.user = { firstName, lastName, email, username, ... }
    setUser(res.data.user);

    navigate('/');
  };

  const register = async (credentials) => {
    await registerUser(credentials);
    navigate('/login');
  };

  const logout = () => {
    localStorage.clear(); // clear everything
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        register,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
