// src/app/modelos/codigo-seguridad.ts

export type TipoCodigoSeguridad = 'cliente' | 'devolucion';

export type EstadoCodigoTrabajo =
  | 'pendiente'
  | 'enCamino'
  | 'enProceso'
  | 'finalizado'
  | 'cancelado'
  | 'devolucionRealizada';

export interface CodigoTrabajoVista {
  uid: string;
  id: string;

  clienteNombre: string;
  clienteTelefono: string;
  direccion: string;

  tipoTrabajo: string;
  fechaProgramada: string;
  horaProgramada: string;
  fechaHoraTexto: string;

  estado: EstadoCodigoTrabajo | string;
  estadoTexto: string;
  estadoClase: string;

  codigoCliente: string;
  codigoDevolucion: string;

  empleadosTexto: string;
  eliminado: boolean;
}

export interface CodigoSeguridadVM {
  cargando: boolean;

  trabajos: CodigoTrabajoVista[];
  trabajoSeleccionado: CodigoTrabajoVista | null;

  totalTrabajos: number;
  totalConCodigoCliente: number;
  totalConCodigoDevolucion: number;

  tabActivo: TipoCodigoSeguridad;

  mensajeVacio: string;
}

export interface ActualizarCodigoSeguridadData {
  trabajoUid: string;
  tipo: TipoCodigoSeguridad;
  codigo: string;
}

export interface HistorialCodigoSeguridadData {
  trabajoUid: string;
  trabajoId: string;
  tipo: TipoCodigoSeguridad;
  codigoNuevo: string;
  descripcion: string;
}

