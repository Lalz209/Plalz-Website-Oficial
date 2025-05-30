export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  emailVerified: boolean;
  company?: {
    name: string;
    position: string;
    industry: string;
    size: string;
  };
  preferences: {
    language: 'es' | 'en';
    servicesOfInterest: string[];
    notifications: {
      email: boolean;
      marketing: boolean;
      updates: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  // Step 1: Basic Info
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  
  // Step 2: Company Info (optional)
  companyName?: string;
  position?: string;
  industry?: string;
  companySize?: string;
  
  // Step 3: Preferences
  language: 'es' | 'en';
  servicesOfInterest: string[];
  acceptTerms: boolean;
  acceptMarketing: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
  token: string;
}

export interface AuthContextType {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: ResetPasswordFormData) => Promise<void>;
  clearError: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

export type AuthProvider = 'google' | 'github' | 'microsoft';

export interface OAuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  message?: string;
}

export interface AuthError {
  code: string;
  message: string;
  field?: string;
} 