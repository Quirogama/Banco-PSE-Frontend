export interface Pago {
  id: number;
  idUsuario: number;
  monto: number;
  descripcion: string;
  fecha: string;
  estado: 'pendiente' | 'completado' | 'fallido';
}

export interface ProcesarPagoDto {
  pagoId: number;
  email: string;
  contrasena: string;
}

export interface ProcesarPagoResponse {
  mensaje: string;
  pago: Pago;
  nuevoBalance: number;
  estado?: 'pendiente' | 'exitoso' | 'fallido' | 'cancelado';
  success?: boolean;
