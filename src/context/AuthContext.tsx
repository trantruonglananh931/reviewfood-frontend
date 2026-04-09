import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginRequest, RegisterRequest } from '../types/post';
import axiosClient from '../api/axiosClient';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        // Invalid stored data, clear it
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      setIsLoading(true);
      console.log('Login request data:', credentials);
      
      // Clear old token before login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      const response = await axiosClient.post<any>('/auth/login', credentials);

      console.log('Login response:', response.data);

      // Backend might return just token string
      if (typeof response.data === 'string') {
        const token = response.data;
        // Store token and create mock user from email
        localStorage.setItem('token', token);
        
        // Create mock user object from credentials
        const mockUser = {
          id: 0,
          username: credentials.email.split('@')[0],
          email: credentials.email,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        setToken(token);
        setUser(mockUser);
      } else if (response.data?.token && response.data?.user) {
        // Proper AuthResponse format
        const { token: newToken, user: userData } = response.data;
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(newToken);
        setUser(userData);
      }
      
      console.log('Login successful');
    } catch (error: any) {
      console.error('Login error details:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<void> => {
    try {
      setIsLoading(true);
      console.log('Register request data:', userData);
      
      // Clear old token before register
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      const response = await axiosClient.post<any>('/auth/register', userData);

      // Backend returns string message, not AuthResponse
      console.log('Register response:', response.data);
      
      if (typeof response.data === 'string') {
        // Check if it's an error message
        if (response.data.toLowerCase().includes('exists') || 
            response.data.toLowerCase().includes('error') ||
            response.data.toLowerCase().includes('fail')) {
          throw new Error(response.data);
        }
        // Success - need to show message to user
        console.log('Register successful, please login');
        // Return success but let component handle it
        return;
      }

      // If response has token and user (proper format)
      if (response.data?.token && response.data?.user) {
        const { token: newToken, user: newUser } = response.data;
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
      }
      
      console.log('Register successful');
    } catch (error: any) {
      console.error('Register error details:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Clear state
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};