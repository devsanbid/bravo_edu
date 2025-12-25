'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { themeService, ThemeType } from '@/lib/themeService';
import { THEME_CONFIGS, ThemeConfig } from '@/config/themes';

interface ThemeContextType {
  currentTheme: ThemeType;
  themeConfig: ThemeConfig;
  isLoading: boolean;
  refreshTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('normal');
  const [isLoading, setIsLoading] = useState(true);

  const loadTheme = async () => {
    try {
      const theme = await themeService.getCurrentTheme();
      setCurrentTheme(theme);
    } catch (error) {
      console.error('Failed to load theme:', error);
      setCurrentTheme('normal');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTheme();
  }, []);

  const refreshTheme = async () => {
    setIsLoading(true);
    await loadTheme();
  };

  const themeConfig = THEME_CONFIGS[currentTheme];

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeConfig,
        isLoading,
        refreshTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
