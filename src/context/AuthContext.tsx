import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Student, Faculty, UserRole } from '../types';
import { dataService } from '../services/dataService';

interface AuthSession {
  token: string;
  user: User;
  profile: Student | Faculty | null;
}

interface AuthContextType {
  user: User | null;
  profile: (Student | Faculty) | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (username: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  quickLogin: (account: 'aarav' | 'meera' | 'rajesh' | 'diya') => Promise<void>;
  resetAllData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const SESSION_STORAGE_KEY = 'scholix_demo_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession | null>(() => {
    try {
      const saved = localStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading session:', e);
    }
    return null;
  });

  useEffect(() => {
    if (session) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, [session]);

  const login = async (username: string, password: string, role: UserRole) => {
    const res = await dataService.authenticate(username, password, role);
    setSession({
      token: res.token,
      user: res.user,
      profile: res.profile,
    });
  };

  const logout = () => {
    setSession(null);
  };

  const quickLogin = async (account: 'aarav' | 'meera' | 'rajesh' | 'diya') => {
    let username = '';
    let password = '';
    let role: UserRole = 'student';

    switch (account) {
      case 'aarav':
        username = 'aarav.sharma@scholix.demo';
        password = 'student123';
        role = 'student';
        break;
      case 'diya':
        username = 'diya.patel@scholix.demo';
        password = 'student123';
        role = 'student';
        break;
      case 'meera':
        username = 'meera.kulkarni@scholix.demo';
        password = 'faculty123';
        role = 'faculty';
        break;
      case 'rajesh':
        username = 'rajesh.deshmukh@scholix.demo';
        password = 'faculty123';
        role = 'faculty';
        break;
    }

    await login(username, password, role);
  };

  const resetAllData = async () => {
    await dataService.resetData();
    // Refresh current profile if logged in
    if (session) {
      const state = dataService.getState();
      let updatedProfile = null;
      if (session.user.role === 'student') {
        updatedProfile = state.students.find((s) => s.id === session.user.linkedProfileId) || null;
      } else {
        updatedProfile = state.faculty.find((f) => f.id === session.user.linkedProfileId) || null;
      }
      setSession({
        ...session,
        profile: updatedProfile,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user || null,
        profile: session?.profile || null,
        role: session?.user.role || null,
        isAuthenticated: !!session,
        login,
        logout,
        quickLogin,
        resetAllData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
