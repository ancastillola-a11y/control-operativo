// src/app/modelos/notificacion.ts

export type TipoNotificacionAdmin =
  | 'cambio_estado_trabajo'
  | 'trabajo_finalizado'
  | 'empleado_en_camino'
  | 'stock_bajo'
  | 'inicio_trabajo'
  | 'finalizacion_trabajo'
  | 'devolucion_validada'
  | 'devolucion_realizada'
  | 'general';

export type FiltroNotificacionAdmin =
  | 'todas'
  | 'cambios_estado'
  | 'stock'
  | 'rutas'
  | 'devoluciones';

export interface NotificacionAdmin {
  uid?: string;

  titulo: string;
  mensaje: string;
  detalle?: string;

  tipo: TipoNotificacionAdmin;

  leida: boolean;
  eliminada?: boolean;

  activa?: boolean;
  resuelta?: boolean;

  ruta?: string;
  referenciaUid?: string;

  materialNombre?: string;
  stockActual?: number;
  stockMinimo?: number;
  unidad?: string;

  creadoEn?: any;
  actualizadoEn?: any;
  eliminadoEn?: any;
  resueltoEn?: any;
}

export interface NotificacionAdminVista extends NotificacionAdmin {
  uid: string;
  icono: string;
  claseIcono: string;
  fechaTexto: string;
}

export interface NotificacionesAdminVM {
  filtro: FiltroNotificacionAdmin;

  notificaciones: NotificacionAdminVista[];
  notificacionesFiltradas: NotificacionAdminVista[];

  total: number;
  noLeidas: number;

  totalCambiosEstado: number;
  totalStock: number;
  totalRutas: number;
  totalDevoluciones: number;
}