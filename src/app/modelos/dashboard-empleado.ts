// src/app/modelos/dashboard-empleado.ts

import {
  EstadoPagoTrabajo,
  EstadoTrabajo,
  MetodoPagoTrabajo,
  Trabajo,
  TrabajoEmpleadoAsignado,
  TrabajoMaterialAsignado
} from './trabajo';

export type ModuloEmpleado =
  | 'inicio'
  | 'trabajos'
  | 'detalle'
  | 'codigo'
  | 'cambioEstado'
  | 'finalizar'
  | 'materialesPosesion'
  | 'devoluciones'
  | 'historial'
  | 'perfil';

export type FiltroTrabajoEmpleado =
  | 'todos'
  | 'pendientes'
  | 'en_camino'
  | 'en_proceso'
  | 'finalizados'
  | 'devoluciones'
  | 'cerrados';

export type EstadoDestinoEmpleado =
  | 'en_camino'
  | 'en_proceso';

export interface DashboardEmpleadoUsuario {
  id?: string;
  uid: string;

  nombres: string;
  apellidos: string;
  nombreCompleto: string;

  usuario: string;

  correo: string;
  correoAuth: string;

  dni: string;
  telefono: string;

  cargo: string;
  rol: string;

  habilitado: boolean;
  activo: boolean;
  estado: boolean;
  eliminado: boolean;

  fotoUrl: string;
  iniciales: string;
  cargoTexto: string;

  accesoValido: boolean;

  notificacionesPendientes?: number;

  createdAt?: any;
  updatedAt?: any;
}

export interface DashboardMaterialTrabajoEmpleado
  extends TrabajoMaterialAsignado {
  materialUid: string;

  nombre: string;
  categoria: string;
  unidad: string;

  cantidadAsignada: number;
  cantidadUsada?: number;
  cantidadDevuelta?: number;

  cantidadAsignadaTexto?: string;
  cantidadUsadaTexto?: string;
  cantidadDevueltaTexto?: string;

  tieneSobrante?: boolean;
  devolucionValidada?: boolean;
}

export interface DashboardEmpleadoAsignado
  extends TrabajoEmpleadoAsignado {
  uid: string;
  nombreCompleto: string;
  usuario: string;
  cargo: string;

  iniciales?: string;
}

export interface DashboardTrabajoEmpleado extends Trabajo {
  id?: string;
  uid?: string;

  codigoTrabajo?: string;

  clienteNombre: string;
  clienteTelefono: string;

  direccion: string;
  referencia?: string;
  direccionTexto?: string;

  latitud?: number | null;
  longitud?: number | null;
  direccionMapa?: string;
  ubicacionTextoOriginal?: string;

  tipoTrabajo: string;
  descripcion?: string;

  fechaProgramada: string;
  horaProgramada: string;
  fechaHoraTexto?: string;

  subtotal: number;
  subtotalTexto?: string;

  empleadosAsignados: DashboardEmpleadoAsignado[];
  materialesAsignados: DashboardMaterialTrabajoEmpleado[];

  materialesTexto?: string;
  empleadosTexto?: string;

  codigoCliente: string;

  /**
   * Debe enviarse vacío al panel del empleado.
   * El empleado solamente ingresa el código recibido
   * del administrador o encargado de almacén.
   */
  codigoDevolucion: string;

  estado: EstadoTrabajo;
  estadoTexto?: string;
  estadoClase?: string;

  pagoEstado?: EstadoPagoTrabajo;
  pagoConfirmado?: boolean;
  montoRecibido?: number;
  metodoPago?: MetodoPagoTrabajo;
  observacionPago?: string;
  pagoTexto?: string;

  observacionFinalizacion?: string;

  devolucionRegistrada?: boolean;
  devolucionValidada?: boolean;
  devolucionTexto?: string;

  empleadoDevolucionUid?: string;
  empleadoDevolucionNombre?: string;

  fechaDevolucionRegistrada?: any;
  fechaDevolucionValidada?: any;

  puedeMarcarEnCamino?: boolean;
  puedeIniciar?: boolean;
  puedeFinalizar?: boolean;
  puedeDevolver?: boolean;
  puedeVerCodigoCliente?: boolean;

  tieneTelefono?: boolean;
  tieneMapa?: boolean;
  tieneMaterialesSobrantes?: boolean;

  activo: boolean;
  eliminado: boolean;

  createdAt?: any;
  updatedAt?: any;
  deletedAt?: any;
  canceledAt?: any;
}

export interface DashboardEmpleadoViewModel {
  empleado: DashboardEmpleadoUsuario;

  trabajos: DashboardTrabajoEmpleado[];

  trabajosPendientes: DashboardTrabajoEmpleado[];
  trabajosEnCamino: DashboardTrabajoEmpleado[];
  trabajosEnProceso: DashboardTrabajoEmpleado[];
  trabajosFinalizados: DashboardTrabajoEmpleado[];

  trabajosConDevolucionPendiente?: DashboardTrabajoEmpleado[];
  trabajosConDevolucionRealizada?: DashboardTrabajoEmpleado[];
  trabajosCerrados?: DashboardTrabajoEmpleado[];

  trabajoActual: DashboardTrabajoEmpleado | null;

  totalTrabajos: number;
  totalPendientes: number;
  totalEnCamino: number;
  totalEnProceso: number;
  totalFinalizados: number;

  totalDevolucionPendiente?: number;
  totalDevolucionRealizada?: number;
  totalCerrados?: number;

  notificacionesPendientes?: number;
}

export interface MaterialUsadoEmpleado {
  materialUid: string;

  nombre?: string;
  unidad?: string;

  cantidadAsignada: number;
  cantidadUsada: number;
  cantidadDevuelta?: number;
}

export interface FinalizarTrabajoEmpleadoFormulario {
  trabajoUid: string;

  materialesUsados: MaterialUsadoEmpleado[];

  pagoEstado: EstadoPagoTrabajo;
  pagoConfirmado: boolean;

  montoRecibido: number;
  metodoPago: MetodoPagoTrabajo;

  observacionPago?: string;
  observacionFinalizacion?: string;
}

export interface MaterialDevolucionEmpleadoFormulario {
  materialUid: string;

  nombre: string;
  unidad: string;

  cantidadAsignada: number;
  cantidadUsada: number;
  cantidadDevuelta: number;
}

export interface RegistrarDevolucionEmpleadoFormulario {
  trabajoUid: string;

  codigoDevolucionIngresado: string;

  materialesDevueltos: MaterialDevolucionEmpleadoFormulario[];
}

export interface CambioEstadoEmpleadoFormulario {
  trabajoUid: string;
  estadoDestino: EstadoDestinoEmpleado;
}