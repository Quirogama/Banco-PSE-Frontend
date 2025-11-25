'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Pago } from '@/types/pago';
import { pagoService } from '@/services';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Alert } from '@/components/ui/Alert';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface PagoPageProps {
  params: {
    id: string;
  };
}

export default function PagoPage({ params }: PagoPageProps) {
  const router = useRouter();
  const [pago, setPago] = useState<Pago | null>(null);
  const [loading, setLoading] = useState(true);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState('');
  const [procesamientoExitoso, setProcesamientoExitoso] = useState(false);
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [jwt, setJwt] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<{ nombre: string; apellido: string } | null>(null);

  // Datos del formulario
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [emailError, setEmailError] = useState('');
  const [contrasenaError, setContrasenaError] = useState('');

  useEffect(() => {
    cargarPago();
  }, [params.id]);

  const cargarPago = async () => {
    try {
      setLoading(true);
      setError('');
      const pagoId = parseInt(params.id);
      
      if (isNaN(pagoId)) {
        setError('ID de pago inválido');
        return;
      }

      const pagoData = await pagoService.obtenerPago(pagoId);
      setPago(pagoData);

      // Reset form/session state when loading a new payment
      setSesionIniciada(false);
      setJwt(null);
      setEmail('');
      setContrasena('');
      setProcesamientoExitoso(false);
      console.log('Pago cargado:', pagoData);
      console.log('Estado interno tras carga:', { sesionIniciada: false, jwt: null });

        // Ajustar mensaje según el estado del pago.
        // Permitir reintentos si el pago falló (estado = 'fallido').
        if (pagoData.estado === 'exitoso') {
          setError('Este pago ya ha sido procesado (exitoso)');
        } else if (pagoData.estado === 'cancelado') {
          setError('Este pago fue cancelado');
        } else if (pagoData.estado === 'fallido') {
          // Mostrar aviso pero permitir que el usuario vuelva a intentar el pago
          setError('El pago falló anteriormente. Puedes intentar nuevamente iniciando sesión.');
        } else {
          setError('');
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar el pago');
      console.error('Error al cargar pago:', err);
    } finally {
      setLoading(false);
    }
  };

  const validarFormulario = (): boolean => {
    let valido = true;
    
    // Validar email
    if (!email) {
      setEmailError('El correo electrónico es requerido');
      valido = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Por favor ingrese un correo válido');
      valido = false;
    } else {
      setEmailError('');
    }

    // Validar contraseña
    if (!contrasena) {
      setContrasenaError('La contraseña es requerida');
      valido = false;
    } else if (contrasena.length < 6) {
      setContrasenaError('La contraseña debe tener al menos 6 caracteres');
      valido = false;
    } else {
      setContrasenaError('');
    }

    return valido;
  };

  const iniciarSesion = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    try {
      setProcesando(true);
      setError('');

      // Validar credenciales con el backend usando login
      const resultado = await pagoService.login({
        email,
        contrasena,
      });

      // El backend responde con access_token y usuario
      if (resultado && resultado.access_token) {
        setJwt(resultado.access_token);
        if (resultado.user && resultado.user.nombre && resultado.user.apellido) {
          setUsuario({ nombre: resultado.user.nombre, apellido: resultado.user.apellido });
        } else {
          setUsuario(null);
        }
        setSesionIniciada(true);
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
      console.error('Error al iniciar sesión:', err);
    } finally {
      setProcesando(false);
    }
  };

  const procesarPago = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pago) {
      return;
    }

    try {
      setProcesando(true);
      setError('');

      if (!jwt) {
        setError('No se ha iniciado sesión.');
        return;
      }

      // Procesar el pago usando el JWT
      const resultado = await pagoService.procesarPago({
        pagoId: pago.id,
        email,
        contrasena,
      }, jwt);

      if (resultado && resultado.success === true) {
        setProcesamientoExitoso(true);
        // Esperar 3 segundos para mostrar confirmación
        setTimeout(() => {
          const sistemaUrl = process.env.NEXT_PUBLIC_SISTEMA_TURISMO_URL || 'https://sistema-turismo.com';
          window.location.href = `${sistemaUrl}/confirmacion?pagoId=${pago.id}&estado=exitoso`;
        }, 3000);
      } else {
        setError("No se pudo procesar el pago.");
      }

    } catch (err: any) {
      setError(err.message || 'Error al procesar el pago');
      console.error('Error al procesar pago:', err);
    } finally {
      setProcesando(false);
    }
  };

  const formatearMonto = (monto: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(monto);
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body">
                <LoadingSpinner message="Cargando información del pago..." />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">Banco Javeriano</h3>
            </div>

            <div className="card-body">
              {process.env.NODE_ENV === 'development' && (
                <div style={{ background: '#f8f9fa', padding: '0.75rem', marginBottom: '1rem', borderRadius: 6 }}>
                  <strong>DEBUG:</strong>
                  <pre style={{ whiteSpace: 'pre-wrap', maxHeight: 200, overflow: 'auto' }}>
                    {JSON.stringify({ pago, sesionIniciada, jwt, loading, error }, null, 2)}
                  </pre>
                </div>
              )}
              {error && !pago && (
                <Alert type="danger">{error}</Alert>
              )}

              {/* Información del pago */}
              {pago && !procesamientoExitoso && (
                <>
                  <h5 className="mb-4">Información del Pago</h5>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Descripción:</label>
                    <p className="text-muted">{pago.descripcion}</p>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">Monto a pagar:</label>
                    <h3 className="text-success">{formatearMonto(pago.monto)}</h3>
                  </div>

                  <hr />

                  {/* Formulario de inicio de sesión */}
                  {pago && !sesionIniciada && (
                    <>
                      <h5 className="mb-3">Iniciar Sesión</h5>

                      <p className="text-muted small">Ingrese sus credenciales para procesar el pago. Si ya inició sesión, verá la opción de confirmar abajo.</p>

                      <form onSubmit={iniciarSesion}>
                        <Input
                          label="Correo Electrónico"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="usuario@ejemplo.com"
                          error={emailError}
                          disabled={procesando}
                          required
                        />

                        <Input
                          label="Contraseña"
                          type="password"
                          value={contrasena}
                          onChange={(e) => setContrasena(e.target.value)}
                          placeholder="********"
                          error={contrasenaError}
                          disabled={procesando}
                          required
                        />

                        {/* Mensaje de error */}
                        {error && <Alert type="danger">{error}</Alert>}

                        <Button
                          type="submit"
                          disabled={procesando}
                          loading={procesando}
                          className="w-100"
                        >
                          {procesando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </Button>
                      </form>
                    </>
                  )}

                  {/* Confirmación de pago después de iniciar sesión */}
                  {pago && sesionIniciada && (
                    <>
                      <h4 className="mb-4">Realizar Pago</h4>

                      <div className="mb-4 p-3 bg-light rounded">
                        <p className="mb-2"><strong>Usuario:</strong> {usuario ? `${usuario.nombre} ${usuario.apellido}` : email}</p>
                        <p className="mb-0"><strong>Monto:</strong> {formatearMonto(pago.monto)}</p>
                      </div>

                      {error && <Alert type="danger">{error}</Alert>}

                      <form onSubmit={procesarPago}>
                        <Button
                          type="submit"
                          disabled={procesando}
                          loading={procesando}
                          className="w-100"
                          style={{ fontSize: '1.1rem', padding: '0.9rem' }}
                        >
                          {procesando ? 'Procesando pago...' : 'Realizar Pago'}
                        </Button>
                      </form>

                      <button
                        type="button"
                        className="btn btn-secondary w-100 mt-3"
                        onClick={() => {
                          setSesionIniciada(false);
                          setJwt(null);
                          setEmail('');
                          setContrasena('');
                          setError('');
                        }}
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                </>
              )}

              {/* Mensaje de éxito */}
              {procesamientoExitoso && (
                <div className="text-center py-4">
                  <div className="mb-4">
                    <div className="text-success" style={{ fontSize: '4rem' }}>
                      ✓
                    </div>
                  </div>
                  <h4 className="text-success">Pago Exitoso</h4>
                  <p>Tu pago ha sido procesado correctamente.</p>
                  <p className="text-muted">
                    Recibirás un correo de confirmación en breve.<br />
                    Serás redirigido automáticamente...
                  </p>
                  <div className="spinner-border spinner-border-sm text-primary mt-3" role="status">
                    <span className="visually-hidden">Redirigiendo...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="card-footer text-muted text-center">
              <small>Conexión segura - Todos los datos están encriptados</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
