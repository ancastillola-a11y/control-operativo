// src/app/modelos/finanzas.ts

export type TipoMovimientoFinanciero =
  | 'cobro_cliente'
  | 'pago_empleado';

export type EstadoMovimientoFinanciero =
  | 'pendiente'
  | 'parcial'
  | 'cobrado'
  | 'pagado'
  | 'anulado';

export type EstadoInicialMovimiento =
  | 'pendiente'
  | 'cerrado';

export type MetodoPagoFinanciero =
  | 'efectivo'
  | 'yape'
  | 'plin'
  | 'transferencia'
  | 'deposito'
  | 'tarjeta'
  | 'otro';

export type FiltroFinanzas =
  | 'todos'
  | 'cobros'
  | 'pagos'
  | 'pendientes'
  | 'cerrados';

export interface TrabajoEmpleadoFinanzas {
  uid: string;
  nombreCompleto: string;
  usuario?: string;
  cargo?: string;
}

export interface TrabajoFinanzasVista {
  uid: string;
  id?: string;

  codigoSeguimiento: string;

  clienteNombre: string;
  clienteTelefono?: string;
  direccion: string;
  referencia?: string;

  tipoTrabajo: string;
  descripcion?: string;

  fechaProgramada?: string;
  horaProgramada?: string;
  fechaHoraTexto: string;

  subtotal: number;
  subtotalTexto: string;

  estado: string;
  estadoTexto: string;

  empleadosAsignados: TrabajoEmpleadoFinanzas[];
  empleadosTexto: string;

  textoBusqueda: string;
}

export interface MovimientoFinanciero {
  id?: string;
  uid?: string;
  codigo?: string;

  tipo: TipoMovimientoFinanciero;
  estado: EstadoMovimientoFinanciero;

  trabajoUid: string;
  codigoSeguimiento: string;

  concepto: string;
  descripcion?: string;

  clienteNombre?: string;

  empleadoUid?: string;
  empleadoNombre?: string;

  personaNombre: string;

  montoTotal: number;
  montoPagado: number;
  saldoPendiente: number;
 

  metodoPago: MetodoPagoFinanciero;
  metodoPagoTexto: string;
  metodoPagoOtro?: string;

  observacion?: string;
 actualizarMontoTrabajo?: boolean;
  eliminado?: boolean;

  creadoPorUid?: string;
  actualizadoPorUid?: string;
  eliminadoPorUid?: string;

  createdAt?: any;
  updatedAt?: any;
  deletedAt?: any;
}

export interface CrearMovimientoFinancieroData {
  tipo: TipoMovimientoFinanciero;

  trabajoUid: string;
  codigoSeguimiento: string;

  clienteNombre?: string;

  empleadoUid?: string;
  empleadoNombre?: string;

  personaNombre: string;

  concepto: string;
  descripcion?: string;

  montoTotal: number;
  metodoPago: MetodoPagoFinanciero;
  metodoPagoOtro?: string;

  estadoInicial: EstadoInicialMovimiento;

  observacion?: string;

  actualizarMontoTrabajo?: boolean;

}

export interface MovimientoFinancieroVista extends MovimientoFinanciero {
  tipoTexto: string;
  estadoTexto: string;
  personaEtiqueta: string;

  codigoSeguimientoTexto: string;

  montoTotalTexto: string;
  montoPagadoTexto: string;
  saldoPendienteTexto: string;

  icono: string;
  clase: 'cobro' | 'pago';
  estadoClase: string;

  fechaTexto: string;
}

export interface FinanzasViewModel {
  movimientos: MovimientoFinancieroVista[];
  movimientosFiltrados: MovimientoFinancieroVista[];
  movimientosPagina: MovimientoFinancieroVista[];

  busqueda: string;
  filtro: FiltroFinanzas;

  paginaActual: number;
  totalPaginas: number;
  paginas: number[];

  totalMovimientos: number;

  totalPorCobrar: number;
  totalCobrado: number;
  totalPorPagar: number;
  totalPagadoEmpleados: number;

  totalPorCobrarTexto: string;
  totalCobradoTexto: string;
  totalPorPagarTexto: string;
  totalPagadoEmpleadosTexto: string;
}