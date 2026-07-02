// src/app/procesos/reporte-trabajos.service.ts
import { Injectable, inject } from '@angular/core';

import {
BehaviorSubject,
combineLatest,
of
} from 'rxjs';

import {
catchError,
map,
shareReplay
} from 'rxjs/operators';

import { ReporteTrabajosDAO } from '../dao/reporte-trabajos.dao';

import {
FiltroReporteTrabajos,
ReporteTrabajoEmpleado,
ReporteTrabajoEstado,
ReporteTrabajoTipo,
ReporteTrabajoVista,
ReporteTrabajosResumen,
ReporteTrabajosVM
} from '../modelos/reporte-trabajos';

@Injectable({
providedIn: 'root'
})
export class ReporteTrabajosService {
private reporteDAO = inject(ReporteTrabajosDAO);

private filtroSubject = new BehaviorSubject<FiltroReporteTrabajos>('todos');
private fechaInicioSubject = new BehaviorSubject<string>('');
private fechaFinSubject = new BehaviorSubject<string>('');

vm$ = combineLatest([
this.reporteDAO.escucharTrabajos().pipe(
catchError((error) => {
console.error('[ReporteTrabajosService] Error al escuchar trabajos:', error);
return of([]);
})
),
this.reporteDAO.escucharEmpleados().pipe(
catchError((error) => {
console.error('[ReporteTrabajosService] Error al escuchar empleados:', error);
return of([]);
})
),
this.filtroSubject.asObservable(),
this.fechaInicioSubject.asObservable(),
this.fechaFinSubject.asObservable()
]).pipe(
map(([trabajos, empleados, filtro, fechaInicio, fechaFin]) => {
const trabajosVista = this.mapearTrabajos(trabajos, empleados);


  const trabajosPorEstado = this.filtrarTrabajosPorEstado(
    trabajosVista,
    filtro
  );

  const trabajosFiltrados = this.filtrarTrabajosPorFecha(
    trabajosPorEstado,
    fechaInicio,
    fechaFin
  );

  const resumen = this.calcularResumen(trabajosFiltrados);
  const estados = this.calcularEstados(resumen);
  const tiposTrabajo = this.calcularTiposTrabajo(trabajosFiltrados);
  const empleadosResumen = this.calcularEmpleadosResumen(trabajosFiltrados);

  return {
    filtro,
    fechaInicio,
    fechaFin,
    resumen,
    estados,
    tiposTrabajo,
    empleadosResumen,
    trabajos: trabajosVista,
    trabajosFiltrados,
    trabajosRecientes: trabajosFiltrados.slice(0, 6),
    totalFiltrados: trabajosFiltrados.length
  } as ReporteTrabajosVM;
}),
shareReplay({
  bufferSize: 1,
  refCount: true
})


);

cambiarFiltro(filtro: FiltroReporteTrabajos) {
this.filtroSubject.next(filtro);
}

cambiarFechaInicio(fecha: string) {
this.fechaInicioSubject.next(fecha || '');
}

cambiarFechaFin(fecha: string) {
this.fechaFinSubject.next(fecha || '');
}

limpiarRangoFechas() {
this.fechaInicioSubject.next('');
this.fechaFinSubject.next('');
}

private mapearTrabajos(
trabajos: any[],
empleados: any[]
): ReporteTrabajoVista[] {
const empleadosMap = new Map<string, any>();


empleados.forEach((empleado) => {
  const uid = this.obtenerUid(empleado);

  if (uid) {
    empleadosMap.set(uid, empleado);
  }
});

return (trabajos || [])
  .filter((trabajo) => trabajo?.eliminado !== true && trabajo?.eliminada !== true)
  .map((trabajo) => this.mapearTrabajo(trabajo, empleadosMap))
  .sort((a, b) => b.fechaReporteOrden - a.fechaReporteOrden);


}

private mapearTrabajo(
trabajo: any,
empleadosMap: Map<string, any>
): ReporteTrabajoVista {
const uid = this.obtenerUid(trabajo);


const estado = this.normalizarEstado(
  trabajo?.estado || trabajo?.estadoTrabajo || 'pendiente'
);

const fechaProgramada = this.convertirFecha(trabajo?.fechaProgramada);
const creadoEnFecha = this.convertirFecha(
  trabajo?.creadoEn || trabajo?.fechaCreacion || trabajo?.createdAt
);

const fechaReporte = fechaProgramada || creadoEnFecha;

return {
  uid,
  codigo: this.obtenerCodigoTrabajo(trabajo),
  clienteNombre: String(
    trabajo?.clienteNombre ||
    trabajo?.cliente ||
    'Cliente no registrado'
  ),
  clienteTelefono: String(trabajo?.clienteTelefono || trabajo?.telefono || ''),
  direccion: String(
    trabajo?.direccion ||
    trabajo?.direccionMapa ||
    trabajo?.ubicacionTextoOriginal ||
    ''
  ),
  tipoTrabajo: String(trabajo?.tipoTrabajo || trabajo?.tipo || 'Trabajo'),
  descripcion: String(trabajo?.descripcion || ''),

  estado,
  estadoTexto: this.obtenerEstadoTexto(estado),
  estadoClase: this.obtenerEstadoClase(estado),

  empleadosTexto: this.obtenerEmpleadosTexto(trabajo, empleadosMap),
  materialesTexto: this.obtenerMaterialesTexto(trabajo),

  fechaProgramadaTexto: this.formatearFecha(fechaProgramada),
  horaProgramadaTexto: String(trabajo?.horaProgramada || ''),
  creadoEnTexto: this.formatearFecha(creadoEnFecha),

  fechaReporteOrden: fechaReporte ? fechaReporte.getTime() : 0,
  creadoEnOrden: creadoEnFecha ? creadoEnFecha.getTime() : 0
};


}

private calcularResumen(
trabajos: ReporteTrabajoVista[]
): ReporteTrabajosResumen {
const totalTrabajos = trabajos.length;


const pendientes = trabajos.filter((item) => item.estado === 'pendiente').length;
const asignados = trabajos.filter((item) => item.estado === 'asignado').length;
const enCamino = trabajos.filter((item) => item.estado === 'en_camino').length;
const enProceso = trabajos.filter((item) => item.estado === 'en_proceso').length;

const finalizados = trabajos.filter((item) =>
  item.estado === 'finalizado' ||
  item.estado === 'cerrado'
).length;

const devolucionPendiente = trabajos.filter((item) =>
  item.estado === 'devolucion_pendiente'
).length;

const devolucionRealizada = trabajos.filter((item) =>
  item.estado === 'devolucion_realizada'
).length;

const cancelados = trabajos.filter((item) =>
  item.estado === 'cancelado'
).length;

const trabajosActivos =
  pendientes +
  asignados +
  enCamino +
  enProceso +
  devolucionPendiente;

const devolucionesTotal =
  devolucionPendiente +
  devolucionRealizada;

return {
  totalTrabajos,
  pendientes,
  asignados,
  enCamino,
  enProceso,
  finalizados,
  devolucionPendiente,
  devolucionRealizada,
  cancelados,
  trabajosActivos,
  devolucionesTotal,
  porcentajeFinalizacion: this.obtenerPorcentaje(finalizados, totalTrabajos),
  porcentajeActivos: this.obtenerPorcentaje(trabajosActivos, totalTrabajos)
};


}

private calcularEstados(
resumen: ReporteTrabajosResumen
): ReporteTrabajoEstado[] {
const total = Math.max(resumen.totalTrabajos, 1);


return [
  {
    estado: 'pendiente',
    titulo: 'Pendientes',
    total: resumen.pendientes,
    porcentaje: this.obtenerPorcentaje(resumen.pendientes, total),
    clase: 'warning'
  },
  {
    estado: 'asignado',
    titulo: 'Asignados',
    total: resumen.asignados,
    porcentaje: this.obtenerPorcentaje(resumen.asignados, total),
    clase: 'primary'
  },
  {
    estado: 'en_camino',
    titulo: 'En camino',
    total: resumen.enCamino,
    porcentaje: this.obtenerPorcentaje(resumen.enCamino, total),
    clase: 'info'
  },
  {
    estado: 'en_proceso',
    titulo: 'En proceso',
    total: resumen.enProceso,
    porcentaje: this.obtenerPorcentaje(resumen.enProceso, total),
    clase: 'process'
  },
  {
    estado: 'finalizado',
    titulo: 'Finalizados',
    total: resumen.finalizados,
    porcentaje: this.obtenerPorcentaje(resumen.finalizados, total),
    clase: 'success'
  },
  {
    estado: 'devoluciones',
    titulo: 'Con devolución',
    total: resumen.devolucionesTotal,
    porcentaje: this.obtenerPorcentaje(resumen.devolucionesTotal, total),
    clase: 'purple'
  },
  {
    estado: 'cancelado',
    titulo: 'Cancelados',
    total: resumen.cancelados,
    porcentaje: this.obtenerPorcentaje(resumen.cancelados, total),
    clase: 'danger'
  }
];


}

private calcularTiposTrabajo(
trabajos: ReporteTrabajoVista[]
): ReporteTrabajoTipo[] {
const total = Math.max(trabajos.length, 1);
const conteo = new Map<string, number>();


trabajos.forEach((trabajo) => {
  const tipo = trabajo.tipoTrabajo || 'Trabajo';
  conteo.set(tipo, (conteo.get(tipo) || 0) + 1);
});

return Array.from(conteo.entries())
  .map(([tipo, cantidad]) => ({
    tipo,
    total: cantidad,
    porcentaje: this.obtenerPorcentaje(cantidad, total)
  }))
  .sort((a, b) => b.total - a.total)
  .slice(0, 5);


}

private calcularEmpleadosResumen(
trabajos: ReporteTrabajoVista[]
): ReporteTrabajoEmpleado[] {
const conteo = new Map<string, number>();


trabajos.forEach((trabajo) => {
  const empleados = trabajo.empleadosTexto
    .split(',')
    .map((item) => item.trim())
    .filter((item) =>
      item &&
      item !== 'Sin empleado asignado'
    );

  empleados.forEach((empleado) => {
    conteo.set(empleado, (conteo.get(empleado) || 0) + 1);
  });
});

return Array.from(conteo.entries())
  .map(([empleado, cantidad]) => ({
    empleado,
    total: cantidad
  }))
  .sort((a, b) => b.total - a.total)
  .slice(0, 5);


}

private filtrarTrabajosPorEstado(
trabajos: ReporteTrabajoVista[],
filtro: FiltroReporteTrabajos
): ReporteTrabajoVista[] {
if (filtro === 'todos') {
return trabajos;
}


if (filtro === 'pendientes') {
  return trabajos.filter((item) => item.estado === 'pendiente');
}

if (filtro === 'asignados') {
  return trabajos.filter((item) => item.estado === 'asignado');
}

if (filtro === 'en_camino') {
  return trabajos.filter((item) => item.estado === 'en_camino');
}

if (filtro === 'en_proceso') {
  return trabajos.filter((item) => item.estado === 'en_proceso');
}

if (filtro === 'finalizados') {
  return trabajos.filter((item) =>
    item.estado === 'finalizado' ||
    item.estado === 'cerrado'
  );
}

if (filtro === 'devoluciones') {
  return trabajos.filter((item) =>
    item.estado === 'devolucion_pendiente' ||
    item.estado === 'devolucion_realizada'
  );
}

if (filtro === 'cancelados') {
  return trabajos.filter((item) => item.estado === 'cancelado');
}

return trabajos;


}

private filtrarTrabajosPorFecha(
trabajos: ReporteTrabajoVista[],
fechaInicio: string,
fechaFin: string
): ReporteTrabajoVista[] {
const inicio = this.convertirFechaInput(fechaInicio, false);
const fin = this.convertirFechaInput(fechaFin, true);


if (!inicio && !fin) {
  return trabajos;
}

return trabajos.filter((trabajo) => {
  if (!trabajo.fechaReporteOrden) {
    return false;
  }

  if (inicio && trabajo.fechaReporteOrden < inicio.getTime()) {
    return false;
  }

  if (fin && trabajo.fechaReporteOrden > fin.getTime()) {
    return false;
  }

  return true;
});


}

private convertirFechaInput(
valor: string,
finDelDia: boolean
): Date | null {
if (!valor) {
return null;
}


const partes = valor.split('-');

if (partes.length !== 3) {
  return null;
}

const anio = Number(partes[0]);
const mes = Number(partes[1]);
const dia = Number(partes[2]);

if (!anio || !mes || !dia) {
  return null;
}

const fecha = new Date(anio, mes - 1, dia);

if (finDelDia) {
  fecha.setHours(23, 59, 59, 999);
} else {
  fecha.setHours(0, 0, 0, 0);
}

return fecha;


}

private obtenerCodigoTrabajo(trabajo: any): string {
const codigoGuardado = String(
trabajo?.codigoTrabajo ||
trabajo?.codigo ||
trabajo?.numero ||
''
).trim();


if (/^T-\d{5}$/i.test(codigoGuardado)) {
  return codigoGuardado.toUpperCase();
}

const id = String(trabajo?.id || '').trim();

if (/^T-\d{5}$/i.test(id)) {
  return id.toUpperCase();
}

const base = String(
  trabajo?.uid ||
  trabajo?.id ||
  trabajo?.clienteNombre ||
  'TRABAJO'
);

const numero = this.generarNumeroDesdeTexto(base);

return `T-${numero.toString().padStart(5, '0')}`;


}

private generarNumeroDesdeTexto(texto: string): number {
let hash = 0;


for (let i = 0; i < texto.length; i++) {
  hash = ((hash << 5) - hash) + texto.charCodeAt(i);
  hash |= 0;
}

return Math.abs(hash) % 100000;


}

private obtenerEmpleadosTexto(
trabajo: any,
empleadosMap: Map<string, any>
): string {
const empleadosRaw =
trabajo?.empleadosAsignados ||
trabajo?.empleados ||
trabajo?.empleadosIds ||
[];


if (!Array.isArray(empleadosRaw) || empleadosRaw.length === 0) {
  return 'Sin empleado asignado';
}

const nombres = empleadosRaw.map((item: any) => {
  if (typeof item === 'string') {
    const empleado = empleadosMap.get(item);

    return empleado
      ? this.obtenerNombreEmpleado(empleado)
      : item;
  }

  return (
    item?.nombreCompleto ||
    item?.nombres ||
    item?.nombre ||
    item?.empleadoNombre ||
    item?.correo ||
    'Empleado'
  );
});

return nombres.filter(Boolean).join(', ');


}

private obtenerMaterialesTexto(trabajo: any): string {
const materialesRaw =
trabajo?.materialesAsignados ||
trabajo?.materiales ||
[];


if (!Array.isArray(materialesRaw) || materialesRaw.length === 0) {
  return 'Sin materiales registrados';
}

return materialesRaw
  .map((material: any) => {
    const nombre = String(
      material?.nombre ||
      material?.materialNombre ||
      material?.nombreMaterial ||
      'Material'
    ).trim();

    const cantidad = this.obtenerCantidadMaterial(material);
    const unidad = String(material?.unidad || material?.unidadMedida || 'Unidad').trim();

    return `${nombre} (${cantidad} ${unidad})`;
  })
  .join(', ');


}

private obtenerCantidadMaterial(material: any): number {
const posiblesCantidades = [
material?.cantidadAsignada,
material?.cantidad,
material?.cantidadUsada,
material?.cantidadSolicitada,
material?.cantidadSeleccionada,
material?.cantidadMaterial
];


for (const valor of posiblesCantidades) {
  const numero = Number(valor);

  if (!isNaN(numero) && numero > 0) {
    return numero;
  }
}

return 0;


}

private obtenerNombreEmpleado(empleado: any): string {
return String(
empleado?.nombreCompleto ||
empleado?.nombres ||
empleado?.nombre ||
empleado?.usuario ||
empleado?.correo ||
'Empleado'
);
}

private obtenerUid(item: any): string {
return String(item?.uid || item?.id || '');
}

private normalizarEstado(estado: string): string {
const valor = String(estado || '').trim().toLowerCase();


if (valor === 'pendiente') {
  return 'pendiente';
}

if (valor === 'asignado') {
  return 'asignado';
}

if (valor === 'en camino' || valor === 'en_camino' || valor === 'encamino') {
  return 'en_camino';
}

if (valor === 'en proceso' || valor === 'en_proceso' || valor === 'proceso') {
  return 'en_proceso';
}

if (valor === 'finalizado' || valor === 'terminado') {
  return 'finalizado';
}

if (valor === 'devolucion pendiente' || valor === 'devolucion_pendiente') {
  return 'devolucion_pendiente';
}

if (valor === 'devolucion realizada' || valor === 'devolucion_realizada') {
  return 'devolucion_realizada';
}

if (valor === 'cerrado') {
  return 'cerrado';
}

if (valor === 'cancelado') {
  return 'cancelado';
}

return 'pendiente';


}

private obtenerEstadoTexto(estado: string): string {
const textos: Record<string, string> = {
pendiente: 'Pendiente',
asignado: 'Asignado',
en_camino: 'En camino',
en_proceso: 'En proceso',
finalizado: 'Finalizado',
devolucion_pendiente: 'Devolución pendiente',
devolucion_realizada: 'Devolución realizada',
cerrado: 'Cerrado',
cancelado: 'Cancelado'
};


return textos[estado] || 'Pendiente';


}

private obtenerEstadoClase(estado: string): string {
if (estado === 'pendiente') {
return 'warning';
}


if (estado === 'asignado') {
  return 'primary';
}

if (estado === 'en_camino') {
  return 'info';
}

if (estado === 'en_proceso') {
  return 'process';
}

if (
  estado === 'finalizado' ||
  estado === 'devolucion_realizada' ||
  estado === 'cerrado'
) {
  return 'success';
}

if (estado === 'devolucion_pendiente') {
  return 'purple';
}

if (estado === 'cancelado') {
  return 'danger';
}

return 'warning';


}

private obtenerPorcentaje(valor: number, total: number): number {
if (!total) {
return 0;
}

return Math.round((valor / total) * 100);


}

private formatearFecha(fecha: Date | null): string {
if (!fecha) {
return 'Sin registro';
}


return fecha.toLocaleDateString('es-PE', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
});


}

private convertirFecha(valor: any): Date | null {
if (!valor) {
return null;
}


if (valor instanceof Date) {
  return valor;
}

if (typeof valor?.toDate === 'function') {
  return valor.toDate();
}

if (typeof valor === 'string') {
  if (/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    const [anio, mes, dia] = valor.split('-').map(Number);
    return new Date(anio, mes - 1, dia);
  }

  const fecha = new Date(valor);

  if (!isNaN(fecha.getTime())) {
    return fecha;
  }
}

return null;


}
}
