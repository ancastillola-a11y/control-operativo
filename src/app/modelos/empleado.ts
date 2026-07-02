// src/app/modelos/empleado.ts

export type EstadoFiltroEmpleado = 'todos' | 'habilitados' | 'deshabilitados';

export interface Empleado {
  id?: string;
  uid?: string;

  codigoEmpleado?: string;

  nombres: string;
  apellidos?: string;
  nombreCompleto?: string;

  usuario: string;

  correo: string;
  correoAuth: string;

  dni?: string;
  telefono?: string;
  cargo?: string;

  rol: 'empleado';

  habilitado: boolean;
  activo: boolean;
  estado: boolean;

  eliminado?: boolean;

  fotoUrl?: string;

  creadoPorUid?: string;
  actualizadoPorUid?: string;
  eliminadoPorUid?: string;

  createdAt?: any;
  updatedAt?: any;
  deletedAt?: any;
}

export interface EmpleadoVista extends Empleado {
  iniciales: string;
  cargoTexto: string;
  codigoEmpleadoTexto: string;
  tieneFoto: boolean;
}

export interface CrearEmpleadoData {
  nombres: string;
  apellidos: string;
  usuario: string;
  password: string;
  dni: string;
  telefono: string;
  cargo: string;
  fotoUrl?: string;
  fotoArchivo?: File | null;
}

export interface EditarEmpleadoData {
  uid: string;
  nombres: string;
  apellidos: string;
  usuario: string;
  dni: string;
  telefono: string;
  cargo: string;
  fotoUrl?: string;
  fotoArchivo?: File | null;
}

export interface EmpleadosViewModel {
  empleados: EmpleadoVista[];
  empleadosFiltrados: EmpleadoVista[];
  empleadosPagina: EmpleadoVista[];

  busqueda: string;
  filtro: EstadoFiltroEmpleado;

  paginaActual: number;
  totalPaginas: number;
  paginas: number[];

  totalEmpleados: number;
  totalHabilitados: number;
  totalDeshabilitados: number;
}