// src/app/modelos/gps.ts

export type EstadoGps =
  | 'activo'
  | 'en_camino'
  | 'sin_senal'
  | 'inactivo';

export interface GpsPuntoRuta {
  latitud: number;
  longitud: number;
}

export interface GpsEmpleadoFiltro {
  uid: string;
  etiqueta: string;
  nombreCompleto: string;
  cargo: string;
  fotoUrl?: string;
  iniciales?: string;
}

export interface GpsUbicacionActual {
  uid?: string;

  empleadoUid: string;
  empleadoNombre: string;
  empleadoRol?: string;
  empleadoFotoUrl?: string;

  trabajoUid?: string;
  trabajoCodigo?: string;
  trabajoTitulo?: string;

  latitud: number;
  longitud: number;
  precision?: number | null;

  velocidadKmh?: number | null;
  distanciaRestanteKm?: number | null;
  tiempoEstimadoMin?: number | null;

  direccionTexto?: string;

  estado: EstadoGps;

  ruta?: GpsPuntoRuta[];

  creadoEn?: any;
  actualizadoEn?: any;
}

export interface GpsHistorial {
  uid?: string;

  empleadoUid: string;
  empleadoNombre: string;

  trabajoUid?: string;
  trabajoCodigo?: string;

  latitud: number;
  longitud: number;
  precision?: number | null;

  registradoEn?: any;
}

export interface GpsAdminVM {
  ubicaciones: GpsUbicacionActual[];
  ubicacionesFiltradas: GpsUbicacionActual[];

  empleadosFiltro: GpsEmpleadoFiltro[];
  empleadoSeleccionadoUid: string;
  empleadoSeleccionado: GpsEmpleadoFiltro | null;

  empleadoPrincipal: GpsUbicacionActual | null;

  totalActivos: number;
  totalSinSenal: number;
  totalInactivos: number;
}