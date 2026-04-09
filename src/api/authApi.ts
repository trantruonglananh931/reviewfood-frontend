import axiosClient from './axiosClient';
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '../types/post';

// Auth API endpoints
export const authApi = {
  // Login
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  // Register
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },

  // Get current user profile (if endpoint exists)
  getCurrentUser: async (): Promise<User> => {
    const response = await axiosClient.get<User>('/auth/me');
    return response.data;
  },

  // Logout (if backend endpoint exists)
  logout: async (): Promise<void> => {
    await axiosClient.post('/auth/logout');
  },
};

export default authApi;
