// src/app/modelos/reporte-admin.ts

export type ReporteModuloTipo =
  | 'trabajos'
  | 'materiales'
  | 'pagos'
  | 'devoluciones'
  | 'empleados'
  | 'historial';

export interface ReporteModuloAdmin {
  tipo: ReporteModuloTipo;
  titulo: string;
  descripcion: string;
  icono: string;
  ruta?: string;
  disponible: boolean;
  color: 'azul' | 'verde' | 'naranja' | 'morado' | 'gris';
}

export interface ReporteAdminResumen {
  totalTrabajos: number;
  pendientes: number;
  enProceso: number;
  finalizados: number;

  totalMateriales: number;
  materialesStockBajo: number;

  totalEmpleados: number;
  totalDevoluciones: number;
  totalActividades: number;

  periodoTexto: string;
}

export interface ReporteActividadReciente {
  uid: string;
  modulo: string;
  tipo: string;
  titulo: string;
  descripcion: string;
  fechaTexto: string;
  icono: string;
  clase: string;
}

export interface ReporteAdminVM {
  modulos: ReporteModuloAdmin[];
  resumen: ReporteAdminResumen;
  actividadesRecientes: ReporteActividadReciente[];
}