// src/app/modelos/reporte-trabajos.ts

export type FiltroReporteTrabajos =
| 'todos'
| 'pendientes'
| 'asignados'
| 'en_camino'
| 'en_proceso'
| 'finalizados'
| 'devoluciones'
| 'cancelados';

export interface ReporteTrabajosResumen {
totalTrabajos: number;
pendientes: number;
asignados: number;
enCamino: number;
enProceso: number;
finalizados: number;
devolucionPendiente: number;
devolucionRealizada: number;
cancelados: number;
trabajosActivos: number;
devolucionesTotal: number;
porcentajeFinalizacion: number;
porcentajeActivos: number;
}

export interface ReporteTrabajoEstado {
estado: string;
titulo: string;
total: number;
porcentaje: number;
clase: string;
}

export interface ReporteTrabajoTipo {
tipo: string;
total: number;
porcentaje: number;
}

export interface ReporteTrabajoEmpleado {
empleado: string;
total: number;
}

export interface ReporteTrabajoVista {
uid: string;
codigo: string;
clienteNombre: string;
clienteTelefono: string;
direccion: string;
tipoTrabajo: string;
descripcion: string;

estado: string;
estadoTexto: string;
estadoClase: string;

empleadosTexto: string;
materialesTexto: string;

fechaProgramadaTexto: string;
horaProgramadaTexto: string;
creadoEnTexto: string;

fechaReporteOrden: number;
creadoEnOrden: number;
}

export interface ReporteTrabajosVM {
filtro: FiltroReporteTrabajos;
fechaInicio: string;
fechaFin: string;
resumen: ReporteTrabajosResumen;
estados: ReporteTrabajoEstado[];
tiposTrabajo: ReporteTrabajoTipo[];
empleadosResumen: ReporteTrabajoEmpleado[];
trabajos: ReporteTrabajoVista[];
trabajosFiltrados: ReporteTrabajoVista[];
trabajosRecientes: ReporteTrabajoVista[];
totalFiltrados: number;
}
