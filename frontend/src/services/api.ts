import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'Ha ocurrido un error';
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.response?.status === 401) {
      errorMessage = 'Credenciales incorrectas';
    } else if (error.response?.status === 404) {
      errorMessage = 'Pago no encontrado';
    } else if (error.response?.status === 500) {
      errorMessage = 'Error del servidor';
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Tiempo de espera agotado';
    } else if (!error.response) {
      errorMessage = 'No se pudo conectar con el servidor';
    }
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
