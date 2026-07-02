// src/app/modelos/devolucion.ts

export type EstadoDevolucion =
  | 'pendiente'
  | 'validada';

export type FiltroDevolucion =
  | 'pendientes'
  | 'validadas'
  | 'historial';

export interface MaterialDevolucionVista {
  materialUid: string;
  nombre: string;
  unidad: string;
  cantidadAsignada: number;
}

export interface DevolucionTrabajoVista {
  uid: string;

  codigoTrabajo: string;
  clienteNombre: string;
  tipoTrabajo: string;

  empleadoTexto: string;
  fechaTexto: string;

  codigoDevolucion: string;

  estadoTrabajo: string;
  estadoDevolucion: EstadoDevolucion;
  estadoTexto: string;

  totalMateriales: number;
  materiales: MaterialDevolucionVista[];

  fechaValidacionTexto?: string;
}

export interface DevolucionesVM {
  filtro: FiltroDevolucion;

  devoluciones: DevolucionTrabajoVista[];
  devolucionesFiltradas: DevolucionTrabajoVista[];

  totalPendientes: number;
  totalValidadas: number;
  totalHistorial: number;
}