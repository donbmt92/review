'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra xem có session đăng nhập nào không
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('admin_token');
        if (token) {
          setIsAuthenticated(true);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Lấy thông tin đăng nhập từ biến môi trường
      const envUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
      const envPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

      if (username === envUsername && password === envPassword) {
        // Tạo token đơn giản (trong thực tế nên sử dụng JWT)
        const token = `${username}:${Date.now()}`;
        if (typeof window !== 'undefined') {
          localStorage.setItem('admin_token', token);
        }
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
