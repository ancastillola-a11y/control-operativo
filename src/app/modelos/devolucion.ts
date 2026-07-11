// src/app/modelos/devolucion.ts

export type EstadoDevolucion =
  | 'pendiente'
  | 'validada';

export type FiltroDevolucion =
  | 'pendientes'
  | 'validadas'
  | 'historial';

export type OrigenValidacionDevolucion =
  | 'empleado'
  | 'administrador';

export interface MaterialDevolucionVista {
  materialUid: string;

  nombre: string;
  unidad: string;

  /**
   * Cantidad que el administrador entregó al crear el trabajo.
   */
  cantidadAsignada: number;

  /**
   * Cantidad que el empleado declaró como usada al finalizar.
   */
  cantidadUsada?: number;

  /**
   * Cantidad sobrante que debe volver al almacén.
   * Esta es la única cantidad que debe sumarse al stock.
   */
  cantidadDevuelta?: number;

  /**
   * Texto listo para mostrar en pantalla.
   */
  cantidadTexto?: string;
}

export interface DevolucionTrabajoVista {
  uid: string;

  codigoTrabajo: string;

  clienteNombre: string;
  tipoTrabajo: string;

  empleadoTexto: string;
  fechaTexto: string;

  /**
   * Código generado cuando el administrador crea el trabajo.
   * El empleado debe ingresarlo al momento de devolver materiales.
   */
  codigoDevolucion: string;

  estadoTrabajo: string;

  /**
   * Estado visual de la devolución.
   */
  estadoDevolucion: EstadoDevolucion;
  estadoTexto: string;

  totalMateriales: number;
  totalDevuelto?: number;

  materiales: MaterialDevolucionVista[];

  devolucionRegistrada?: boolean;
  devolucionValidada?: boolean;

  empleadoDevolucionUid?: string;
  empleadoDevolucionNombre?: string;

  fechaRegistroTexto?: string;
  fechaValidacionTexto?: string;

  observacionDevolucion?: string;
}

export interface DevolucionesVM {
  filtro: FiltroDevolucion;

  devoluciones: DevolucionTrabajoVista[];
  devolucionesFiltradas: DevolucionTrabajoVista[];

  totalPendientes: number;
  totalValidadas: number;
  totalHistorial: number;
}

export interface ValidarDevolucionData {
  trabajoUid: string;

  codigoIngresado: string;

  origenValidacion: OrigenValidacionDevolucion;

  empleadoUid?: string;
  empleadoNombre?: string;

  administradorUid?: string;
  administradorNombre?: string;
}

export interface ResultadoValidacionDevolucion {
  trabajoUid: string;

  estado: 'devolucion_realizada';

  materialesDevueltos: Array<{
    materialUid: string;
    nombre: string;
    unidad: string;
    cantidadDevuelta: number;
    stockAntes: number;
    stockDespues: number;
  }>;

  totalDevuelto: number;
}