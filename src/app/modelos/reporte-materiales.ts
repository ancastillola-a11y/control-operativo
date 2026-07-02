// src/app/modelos/reporte-materiales.ts

export type FiltroReporteMateriales =
  | 'todos'
  | 'stock_bajo'
  | 'sin_stock'
  | 'usados'
  | 'no_usados'
  | 'devueltos';

export interface ReporteMaterialVista {
  uid: string;
  codigo: string;
  nombre: string;
  categoria: string;
  unidad: string;

  stockActual: number;
  stockMinimo: number;

  estadoStock: string;
  estadoStockTexto: string;
  estadoStockClase: string;

  cantidadUsadaTotal: number;
  cantidadDevueltaTotal: number;
  trabajosAsociados: number;

  creadoEnTexto: string;
  actualizadoEnTexto: string;
}

export interface ReporteMaterialesResumen {
  totalMateriales: number;
  stockBajo: number;
  sinStock: number;
  materialesUsados: number;
  materialesNoUsados: number;
  materialesDevueltos: number;
  cantidadUsadaTotal: number;
  cantidadDevueltaTotal: number;
}

export interface ReporteMaterialRanking {
  nombre: string;
  unidad: string;
  total: number;
  porcentaje: number;
}

export interface ReporteMaterialesVM {
  filtro: FiltroReporteMateriales;
  fechaInicio: string;
  fechaFin: string;

  resumen: ReporteMaterialesResumen;

  materiales: ReporteMaterialVista[];
  materialesFiltrados: ReporteMaterialVista[];

  rankingUsados: ReporteMaterialRanking[];
  rankingDevueltos: ReporteMaterialRanking[];

  totalFiltrados: number;
}