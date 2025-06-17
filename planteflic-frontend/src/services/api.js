// frontend/src/services/api.js

//import axios 
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
  });
  
  // Ajouter le token automatiquement dans les headers
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  export default api;