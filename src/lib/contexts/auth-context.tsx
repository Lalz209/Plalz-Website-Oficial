"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthState, AuthContextType, LoginFormData, RegisterFormData, ResetPasswordFormData } from '@/lib/types/auth';
import { AUTH_ERRORS } from '@/lib/data/auth-data';

// Auth reducer actions
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOGOUT' }
  | { type: 'SET_HYDRATED' };

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
        error: null,
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'LOGOUT':
      return { ...initialState, isLoading: false };
    case 'SET_HYDRATED':
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API functions (replace with real API calls)
const mockAPI = {
  async login(data: LoginFormData): Promise<{ user: User; token: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (data.email === 'test@example.com' && data.password === 'Test123!') {
      const user: User = {
        id: '1',
        email: data.email,
        firstName: 'Usuario',
        lastName: 'Demo',
        emailVerified: true,
        preferences: {
          language: 'es',
          servicesOfInterest: ['website'],
          notifications: {
            email: true,
            marketing: false,
            updates: true,
          },
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return { user, token: 'mock-jwt-token' };
    }
    
    throw new Error('auth/wrong-password');
  },

  async register(data: RegisterFormData): Promise<{ user: User; token: string }> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock email check
    if (data.email === 'existing@example.com') {
      throw new Error('auth/email-already-in-use');
    }
    
    const user: User = {
      id: Date.now().toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      emailVerified: false,
      company: data.companyName ? {
        name: data.companyName,
        position: data.position || '',
        industry: data.industry || '',
        size: data.companySize || '',
      } : undefined,
      preferences: {
        language: data.language,
        servicesOfInterest: data.servicesOfInterest,
        notifications: {
          email: true,
          marketing: data.acceptMarketing,
          updates: true,
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    return { user, token: 'mock-jwt-token' };
  },

  async forgotPassword(email: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'nonexistent@example.com') {
      throw new Error('auth/user-not-found');
    }
    
    // Mock success
    console.log('Password reset email sent to:', email);
  },

  async resetPassword(data: ResetPasswordFormData): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (data.token === 'invalid-token') {
      throw new Error('auth/invalid-token');
    }
    
    // Mock success
    console.log('Password reset successful');
  },

  async updateUser(userData: Partial<User>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock update
    const currentUser = JSON.parse(localStorage.getItem('auth-user') || '{}');
    const updatedUser = { ...currentUser, ...userData, updatedAt: new Date() };
    
    return updatedUser;
  },
};

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadStoredAuth = () => {
      try {
        const storedUser = localStorage.getItem('auth-user');
        const storedToken = localStorage.getItem('auth-token');
        
        if (storedUser && storedToken) {
          const user = JSON.parse(storedUser);
          dispatch({ type: 'SET_USER', payload: user });
        } else {
          dispatch({ type: 'SET_HYDRATED' });
        }
      } catch (error) {
        console.error('Error loading stored auth:', error);
        dispatch({ type: 'SET_HYDRATED' });
      }
    };

    loadStoredAuth();
  }, []);

  // Helper function to get error message
  const getErrorMessage = (error: any): string => {
    if (typeof error === 'string') return error;
    if (error?.message) {
      return AUTH_ERRORS[error.message as keyof typeof AUTH_ERRORS] || AUTH_ERRORS.default;
    }
    return AUTH_ERRORS.default;
  };

  // Auth actions
  const login = async (data: LoginFormData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      const response = await mockAPI.login(data);
      
      // Store in localStorage
      localStorage.setItem('auth-user', JSON.stringify(response.user));
      localStorage.setItem('auth-token', response.token);
      
      if (data.rememberMe) {
        localStorage.setItem('auth-remember', 'true');
      }
      
      dispatch({ type: 'SET_USER', payload: response.user });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const register = async (data: RegisterFormData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      const response = await mockAPI.register(data);
      
      // Store in localStorage
      localStorage.setItem('auth-user', JSON.stringify(response.user));
      localStorage.setItem('auth-token', response.token);
      
      dispatch({ type: 'SET_USER', payload: response.user });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('auth-user');
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-remember');
    
    dispatch({ type: 'LOGOUT' });
  };

  const forgotPassword = async (email: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      await mockAPI.forgotPassword(email);
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const resetPassword = async (data: ResetPasswordFormData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      await mockAPI.resetPassword(data);
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      const updatedUser = await mockAPI.updateUser(userData);
      
      // Update localStorage
      localStorage.setItem('auth-user', JSON.stringify(updatedUser));
      
      dispatch({ type: 'SET_USER', payload: updatedUser });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateUser,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook for protected routes
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  
  return {
    isAuthenticated,
    isLoading,
    shouldRedirect: !isLoading && !isAuthenticated,
  };
} 