import { useState, useEffect } from 'react';

function parseJwt(token: string | null) {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(atob(payload).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    setToken(t);
    setUser(parseJwt(t));
  }, []);

  const isAdmin = () => !!user && (user.rol === 'administrador' || user.rol === 'admin');

  return { token, user, isAdmin };
}

export default useAuth;
