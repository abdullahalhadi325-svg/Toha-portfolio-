'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import initialPortfolioData from '../data/portfolioData.json';
import { PortfolioData } from '../types/portfolio';

export const STORAGE_KEY = 'portfolio_cms_data';
export const AUTH_STORAGE_KEY = 'portfolio_cms_auth';

export interface PortfolioContextType {
  data: PortfolioData;
  updateData: (newData: PortfolioData) => boolean;
  resetData: () => boolean;
  exportData: () => void;
  isLoaded: boolean;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  login: (user: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData as unknown as PortfolioData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const syncFromStorage = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setData(parsed);
        } else {
          setData(initialPortfolioData as unknown as PortfolioData);
        }

        const auth = sessionStorage.getItem(AUTH_STORAGE_KEY);
        if (auth === 'true') {
          setIsAuthenticated(true);
        }
      }
    } catch (e) {
      console.error('Failed to parse portfolio CMS data from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    syncFromStorage();

    const handleUpdate = () => syncFromStorage();
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('portfolio-data-updated', handleUpdate);
    window.addEventListener('portfolio-auth-updated', handleUpdate);

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('portfolio-data-updated', handleUpdate);
      window.removeEventListener('portfolio-auth-updated', handleUpdate);
    };
  }, [syncFromStorage]);

  const updateData = useCallback((newData: PortfolioData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData, null, 2));
      setData(newData);
      window.dispatchEvent(new Event('portfolio-data-updated'));
      return true;
    } catch (e) {
      console.error('Failed to save portfolio data to localStorage:', e);
      return false;
    }
  }, []);

  const resetData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setData(initialPortfolioData as unknown as PortfolioData);
      window.dispatchEvent(new Event('portfolio-data-updated'));
      return true;
    } catch (e) {
      console.error('Failed to reset portfolio data:', e);
      return false;
    }
  }, []);

  const exportData = useCallback(() => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', 'portfolioData.json');
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e) {
      console.error('Failed to export portfolio data:', e);
    }
  }, [data]);

  const login = useCallback((user: string, pass: string) => {
    if (user === 'Mahmudul' && pass === 'Mahmudul@Mahmudul') {
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      setIsLoginOpen(false);
      setIsAdminOpen(true);
      window.dispatchEvent(new Event('portfolio-auth-updated'));
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setIsAdminOpen(false);
    window.dispatchEvent(new Event('portfolio-auth-updated'));
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        resetData,
        exportData,
        isLoaded,
        isAdminOpen,
        setIsAdminOpen,
        isLoginOpen,
        setIsLoginOpen,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioData(): PortfolioContextType {
  const context = useContext(PortfolioContext);
  if (!context) {
    // Fallback if rendered outside provider
    const fallbackData = initialPortfolioData as unknown as PortfolioData;
    return {
      data: fallbackData,
      updateData: () => false,
      resetData: () => false,
      exportData: () => {},
      isLoaded: true,
      isAdminOpen: false,
      setIsAdminOpen: () => {},
      isLoginOpen: false,
      setIsLoginOpen: () => {},
      isAuthenticated: false,
      setIsAuthenticated: () => {},
      login: () => ({ success: false, error: 'Provider not initialized' }),
      logout: () => {},
    };
  }
  return context;
}
