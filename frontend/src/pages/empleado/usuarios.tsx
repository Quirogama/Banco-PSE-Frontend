import React, { useEffect, useState } from 'react';
import { employeeService } from '@/services/employeeService';
import useAuth from '@/hooks/useAuth';

export default function EmpleadoUsuariosPage() {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAdmin()) return;
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await employeeService.getUsers({ page: 1, size: 50 });
      setUsers(res.data || res);
    } catch (e) {
      console.error('Error fetching users', e);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin()) return <div className="container mt-5">Acceso no autorizado</div>;

  return (
    <div className="container mt-5">
      <h3>Usuarios</h3>
      {loading && <p>Cargando...</p>}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Balance</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u: any) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre} {u.apellido}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td>{u.balance}</td>
              <td>
                <a href={`/empleado/usuarios/${u.id}`} className="btn btn-sm btn-primary">Ver</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
