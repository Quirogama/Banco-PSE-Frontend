import { api } from './index';

export const employeeService = {
  async getPayments(params: Record<string, any> = {}) {
    const response = await api.get('/pagos', { params });
    return response.data; // { data: Pago[], total, page, size }
  },

  async getPayment(id: number) {
    const response = await api.get(`/pagos/${id}`);
    return response.data;
  },

  async cancelPayment(id: number) {
    const response = await api.post(`/pagos/${id}/cancel`);
    return response.data; // { success, message, pagoId }
  },

  async getUsers(params: Record<string, any> = {}) {
    const response = await api.get('/users', { params });
    return response.data; // { data: Usuario[], total, page, size }
  },

  async getUser(id: number) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
};

export default employeeService;
