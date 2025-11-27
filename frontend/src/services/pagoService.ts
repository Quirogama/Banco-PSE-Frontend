import api from './api';
import { Pago, ProcesarPagoDto, ProcesarPagoResponse } from '@/types/pago';

export const pagoService = {
  /**
   * Obtiene los detalles de un pago por su ID
   */
  async obtenerPago(id: number, token?: string): Promise<Pago> {
    const response = await api.get<Pago>(`/pagos/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  },

  /**
   * Procesa un pago con autenticación del usuario
   */
  async procesarPago(datos: ProcesarPagoDto, token: string): Promise<ProcesarPagoResponse> {
    const response = await api.post<ProcesarPagoResponse>('/pagos/procesar', datos, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  /**
   * Iniciar sesión y obtener JWT
   */
  async login({ tipoDocumento, identificacion, contrasena }: { tipoDocumento: string, identificacion: string, contrasena: string }) {
    const response = await api.post('/auth/login', { tipoDocumento, identificacion, contrasena });
    return response.data;
  },
};
