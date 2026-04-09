import axios from "axios";
import type { AxiosInstance } from "axios";

// Use API URL from environment variable
// Local (.env): https://reviewfood-h4j4.onrender.com/api (backend fixed CORS)
// Production (.env.production): /api (relative path for Render)
const axiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    
    // Debug logging
    console.log('Axios Request:', {
      url: (config.baseURL || '') + (config.url || ''),
      method: config.method,
      headers: config.headers,
      data: config.data,
    });
    
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;