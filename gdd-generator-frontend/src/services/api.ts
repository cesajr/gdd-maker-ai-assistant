// src/services/api.ts
import axios from 'axios';
import { auth } from './firebase';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

// Interceptor que adiciona o token de autenticação em todas as requisições
api.interceptors.request.use(
  async (config) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken(true); // Garante um token fresco
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
