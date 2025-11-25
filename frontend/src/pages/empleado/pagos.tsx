import React, { useEffect, useState } from 'react';
import { employeeService } from '@/services/employeeService';
import useAuth from '@/hooks/useAuth';

export default function EmpleadoPagosPage() {
  const { isAdmin } = useAuth();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isAdmin()) return;
    fetchPayments();
  }, [page]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await employeeService.getPayments({ page, size: 25 });
      setPayments(res.data || res);
    } catch (e) {
      console.error('Error fetching payments', e);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin()) return <div className="container mt-5">Acceso no autorizado</div>;

  return (
    <div className="container mt-5">
      <h3>Consulta de Pagos (Empleado)</h3>
      {loading && <p>Cargando...</p>}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Monto</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p: any) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.usuario ? `${p.usuario.nombre} ${p.usuario.apellido}` : p.idUsuario}</td>
              <td>{p.monto}</td>
              <td>{p.estado}</td>
              <td>{p.fecha}</td>
              <td>
                <a href={`/empleado/pagos/${p.id}`} className="btn btn-sm btn-primary me-2">Ver</a>
                <button className="btn btn-sm btn-danger" onClick={async () => {
                  if (!confirm('Cancelar pago?')) return;
                  await employeeService.cancelPayment(p.id);
                  fetchPayments();
                }}>Cancelar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
