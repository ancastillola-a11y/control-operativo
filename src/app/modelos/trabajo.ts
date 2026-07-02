// src/app/modelos/trabajo.ts

export type EstadoTrabajo =
  | 'pendiente'
  | 'en_camino'
  | 'en_proceso'
  | 'finalizado'
  | 'devolucion_pendiente'
  | 'devolucion_realizada'
  | 'cancelado';

export type EstadoFiltroTrabajo =
  | 'todos'
  | 'pendientes'
  | 'enProceso'
  | 'finalizados'
  | 'cancelados';

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

  stockAntes?: number;
  stockDespues?: number;

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
  imagenUrl?: string;
  iniciales: string;
}

export interface Trabajo {
  id?: string;
  uid?: string;

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

  codigoCliente: string;
  codigoDevolucion: string;

  estado: EstadoTrabajo;

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
  totalCancelados: number;
}

