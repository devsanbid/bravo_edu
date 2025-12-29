"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { account } from '@/lib/appwrite';
import { Models } from 'appwrite';

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ requiresVerification: boolean; userId?: string }>;
  verifySecretCode: (secretCode: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isVerified: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
      
      // Check if verification is stored in local storage
      const verified = localStorage.getItem('secret_code_verified');
      setIsVerified(verified === 'true');
    } catch (error) {
      setUser(null);
      setIsVerified(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Delete any existing session first
      try {
        await account.deleteSession('current');
      } catch (e) {
        // No existing session, continue
      }

      // Create new session
      await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();
      
      // Don't set user yet - wait for secret code verification
      return { 
        requiresVerification: true, 
        userId: currentUser.$id
      };
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    }
  };

  const verifySecretCode = async (secretCode: string): Promise<boolean> => {
    try {
      // Get current user to check their stored secret code
      const currentUser = await account.get();
      
      // Secret code is stored in user preferences
      const storedSecretCode = currentUser.prefs?.secretCode;
      
      if (!storedSecretCode) {
        console.error('No secret code set for this user');
        return false;
      }
      
      // Verify the code matches
      if (storedSecretCode === secretCode) {
        setUser(currentUser);
        setIsVerified(true);
        
        // Store verification status in local storage
        localStorage.setItem('secret_code_verified', 'true');
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Secret code verification error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      setIsVerified(false);
      localStorage.removeItem('secret_code_verified');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        verifySecretCode,
        logout,
        isAuthenticated: !!user,
        isVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
