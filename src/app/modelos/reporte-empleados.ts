// src/app/modelos/reporte-empleados.ts

export type FiltroReporteEmpleados =
  | 'todos'
  | 'activos'
  | 'inactivos'
  | 'con_trabajos'
  | 'sin_trabajos'
  | 'pendientes'
  | 'en_proceso'
  | 'finalizados';

export interface ReporteEmpleadoVista {
  uid: string;
  codigo: string;
  nombre: string;
  cargo: string;
  correo: string;
  telefono: string;

  estado: string;
  estadoTexto: string;
  estadoClase: string;

  totalTrabajos: number;
  pendientes: number;
  enCamino: number;
  enProceso: number;
  finalizados: number;
  cancelados: number;

  porcentajeFinalizacion: number;

  fechaIngresoTexto: string;
  ultimoTrabajoTexto: string;
}

export interface ReporteEmpleadosResumen {
  totalEmpleados: number;
  empleadosActivos: number;
  empleadosInactivos: number;
  empleadosConTrabajos: number;
  empleadosSinTrabajos: number;

  totalTrabajosAsignados: number;
  trabajosPendientes: number;
  trabajosEnProceso: number;
  trabajosFinalizados: number;
  trabajosCancelados: number;

  promedioFinalizacion: number;
}

export interface ReporteEmpleadoRanking {
  uid: string;
  nombre: string;
  cargo: string;
  totalTrabajos: number;
  finalizados: number;
  porcentajeFinalizacion: number;
}

export interface ReporteEmpleadosVM {
  filtro: FiltroReporteEmpleados;
  fechaInicio: string;
  fechaFin: string;

  resumen: ReporteEmpleadosResumen;

  empleados: ReporteEmpleadoVista[];
  empleadosFiltrados: ReporteEmpleadoVista[];

  rankingProductividad: ReporteEmpleadoRanking[];

  totalFiltrados: number;
}