// src/app/modelos/trabajo.ts

export type EstadoTrabajo =
  | 'pendiente'
  | 'en_camino'
  | 'en_proceso'
  | 'finalizado'
  | 'devolucion_pendiente'
  | 'devolucion_realizada'
  | 'cerrado'
  | 'cancelado';

export type EstadoFiltroTrabajo =
  | 'todos'
  | 'pendientes'
  | 'enProceso'
  | 'finalizados'
  | 'devoluciones'
  | 'cerrados'
  | 'cancelados';

export type EstadoPagoTrabajo =
  | 'pendiente'
  | 'pagado'
  | 'parcial';

export type MetodoPagoTrabajo =
  | 'Efectivo'
  | 'Yape'
  | 'Plin'
  | 'Transferencia'
  | 'Tarjeta'
  | 'Otro';

export interface TrabajoEmpleadoAsignado {
  uid: string;
  nombreCompleto: string;
  usuario: string;
  cargo: string;
}

export interface TrabajoMaterialAsignado {
  materialUid: string;

  nombre: string;
  categoria: string;
  unidad: string;

  cantidadAsignada: number;

  /**
   * Se registra cuando el empleado finaliza el trabajo.
   * No modifica stock directamente.
   */
  cantidadUsada?: number;

  /**
   * Se calcula como:
   * cantidadAsignada - cantidadUsada
   *
   * Solo vuelve al stock cuando el empleado ingresa
   * correctamente el código de devolución.
   */
  cantidadDevuelta?: number;

  stockAntes?: number;
  stockDespues?: number;

  stockRetornoAntes?: number;
  stockRetornoDespues?: number;

  precioUnitario?: number;
  subtotalMaterial?: number;

  devolucionValidada?: boolean;

  imagenUrl?: string;
}

export interface TrabajoEmpleadoDisponible {
  uid: string;
  nombreCompleto: string;
  usuario: string;
  cargo: string;
  iniciales: string;
}


export interface TrabajoMaterialDisponible {
  uid: string;
  nombre: string;
  categoria: string;
  unidad: string;
  stockActual: number;
  stockMinimo: number;
  precioUnitario?: number;
  imagenUrl?: string;
  iniciales: string;
}

export interface Trabajo {
  id?: string;
  uid?: string;

  /**
   * Código visible de seguimiento del trabajo.
   * Ejemplo: T-00025
   */
  codigoTrabajo?: string;

  clienteNombre: string;
  clienteTelefono: string;

  direccion: string;
  referencia?: string;

  latitud?: number | null;
  longitud?: number | null;
  direccionMapa?: string;
  ubicacionTextoOriginal?: string;

  tipoTrabajo: string;
  descripcion?: string;

  fechaProgramada: string;
  horaProgramada: string;

  subtotal: number;

  empleadosAsignados: TrabajoEmpleadoAsignado[];
  materialesAsignados: TrabajoMaterialAsignado[];

  /**
   * Código que el empleado muestra al cliente.
   * Sirve para validar que pertenece al servicio.
   */
  codigoCliente: string;

  /**
   * Código que el administrador/almacén entrega al empleado
   * para validar la devolución de materiales sobrantes.
   * El empleado no debe verlo libremente antes de devolver.
   */
  codigoDevolucion: string;

  estado: EstadoTrabajo;

  /**
   * Datos de pago registrados al finalizar el trabajo.
   */
  pagoEstado?: EstadoPagoTrabajo;
  pagoConfirmado?: boolean;
  montoRecibido?: number;
  metodoPago?: MetodoPagoTrabajo;
  observacionPago?: string;

  /**
   * Datos de finalización del servicio.
   */
  observacionFinalizacion?: string;
  finalizadoPorUid?: string;
  finalizadoPorNombre?: string;
  finalizadoAt?: any;

  /**
   * Datos de ruta e inicio.
   */
  enCaminoPorUid?: string;
  enCaminoPorNombre?: string;
  enCaminoAt?: any;

  iniciadoPorUid?: string;
  iniciadoPorNombre?: string;
  iniciadoAt?: any;

  /**
   * Datos de devolución.
   */
  devolucionRegistrada?: boolean;
  devolucionValidada?: boolean;

  empleadoDevolucionUid?: string;
  empleadoDevolucionNombre?: string;

  fechaDevolucionRegistrada?: any;
  fechaDevolucionValidada?: any;

  /**
   * Datos de cierre administrativo.
   */
  cerradoPorUid?: string;
  cerradoPorNombre?: string;
  cerradoAt?: any;
  observacionCierre?: string;

  activo: boolean;
  eliminado: boolean;

  creadoPorUid?: string;
  actualizadoPorUid?: string;
  eliminadoPorUid?: string;

  createdAt?: any;
  updatedAt?: any;
  deletedAt?: any;
  canceledAt?: any;
}

export interface TrabajoVista extends Trabajo {
  estadoTexto: string;
  estadoClase: string;

  fechaHoraTexto: string;
  subtotalTexto: string;

  empleadosTexto: string;
  materialesTexto: string;

  pagoTexto?: string;
  devolucionTexto?: string;
}

export interface CrearTrabajoData {
  clienteNombre: string;
  clienteTelefono: string;

  direccion: string;
  referencia?: string;

  latitud?: number | null;
  longitud?: number | null;
  direccionMapa?: string;
  ubicacionTextoOriginal?: string;

  tipoTrabajo: string;
  descripcion?: string;

  fechaProgramada: string;
  horaProgramada: string;

  subtotal: number;

  empleadosAsignados: TrabajoEmpleadoAsignado[];
  materialesAsignados: TrabajoMaterialAsignado[];
}

export interface EditarTrabajoData {
  uid: string;

  clienteNombre: string;
  clienteTelefono: string;

  direccion: string;
  referencia?: string;

  latitud?: number | null;
  longitud?: number | null;
  direccionMapa?: string;
  ubicacionTextoOriginal?: string;

  tipoTrabajo: string;
  descripcion?: string;

  fechaProgramada: string;
  horaProgramada: string;

  subtotal: number;

  empleadosAsignados: TrabajoEmpleadoAsignado[];
}

export interface FinalizarTrabajoData {
  trabajoUid: string;

  empleadoUid: string;
  empleadoNombre: string;

  materialesUsados: Array<{
    materialUid: string;
    cantidadUsada: number;
  }>;

  pagoEstado: EstadoPagoTrabajo;
  pagoConfirmado: boolean;
  montoRecibido: number;
  metodoPago: MetodoPagoTrabajo;
  observacionPago?: string;

  observacionFinalizacion?: string;
}

export interface RegistrarDevolucionTrabajoData {
  trabajoUid: string;

  empleadoUid: string;
  empleadoNombre: string;

  codigoDevolucionIngresado: string;

  materialesDevueltos: Array<{
    materialUid: string;
    nombre: string;
    unidad: string;
    cantidadAsignada: number;
    cantidadUsada: number;
    cantidadDevuelta: number;
  }>;
}

export interface CerrarTrabajoData {
  trabajoUid: string;
  observacionCierre?: string;
}

export interface TrabajosViewModel {
  trabajos: TrabajoVista[];
  trabajosFiltrados: TrabajoVista[];
  trabajosPagina: TrabajoVista[];

  busqueda: string;
  filtro: EstadoFiltroTrabajo;

  paginaActual: number;
  totalPaginas: number;
  paginas: number[];

  totalTrabajos: number;
  totalPendientes: number;
  totalEnProceso: number;
  totalFinalizados: number;
  totalDevoluciones?: number;
  totalCerrados?: number;
  totalCancelados: number;
}
