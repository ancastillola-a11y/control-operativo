// src/app/modelos/material.ts

export type EstadoFiltroMaterial = 'todos' | 'disponibles' | 'stockBajo';

export type EstadoStockMaterial = 'disponible' | 'bajo';

export type TipoMovimientoMaterial =
  | 'entrada'
  | 'salida'
  | 'devolucion'
  | 'ajuste';

export interface Material {
  id?: string;
  uid?: string;

  nombre: string;
  nombreNormalizado?: string;

  unidad: string;
  categoria: string;
  descripcion?: string;

  stockActual: number;
  stockMinimo: number;

  imagenUrl?: string;
  imagenPath?: string;

  activo: boolean;
  eliminado: boolean;

  creadoPorUid?: string;
  actualizadoPorUid?: string;
  eliminadoPorUid?: string;

  createdAt?: any;
  updatedAt?: any;
  deletedAt?: any;
}

export interface MaterialVista extends Material {
  iniciales: string;
  estadoStock: EstadoStockMaterial;
  estadoTexto: string;
  stockTexto: string;
  stockMinimoTexto: string;
}

export interface CrearMaterialData {
  nombre: string;
  unidad: string;
  categoria: string;
  descripcion?: string;
  stockInicial: number;
  stockMinimo: number;
  imagenFile?: File | null;
}

export interface EditarMaterialData {
  uid: string;
  nombre: string;
  unidad: string;
  categoria: string;
  descripcion?: string;
  stockMinimo: number;
  imagenFile?: File | null;
  quitarImagen?: boolean;
  imagenPathActual?: string;
}

export interface MaterialesViewModel {
  materiales: MaterialVista[];
  materialesFiltrados: MaterialVista[];
  materialesPagina: MaterialVista[];

  busqueda: string;
  filtro: EstadoFiltroMaterial;

  paginaActual: number;
  totalPaginas: number;
  paginas: number[];

  totalMateriales: number;
  totalDisponibles: number;
  totalStockBajo: number;
}

export interface MovimientoMaterial {
  id?: string;

  materialUid: string;
  materialNombre: string;

  tipoMovimiento: TipoMovimientoMaterial;
  cantidad: number;

  stockAntes: number;
  stockDespues: number;

  moduloOrigen: string;
  descripcion?: string;

  realizadoPorUid?: string;
  createdAt?: any;
}

