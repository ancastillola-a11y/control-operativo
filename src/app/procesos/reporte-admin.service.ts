// src/app/procesos/reporte-admin.service.ts
import { Injectable, inject } from '@angular/core';

import {
  combineLatest,
  Observable,
  of
} from 'rxjs';

import {
  catchError,
  map,
  shareReplay
} from 'rxjs/operators';

import { ReporteAdminDAO } from '../dao/reporte-admin.dao';

import {
  ReporteActividadReciente,
  ReporteAdminResumen,
  ReporteAdminVM,
  ReporteModuloAdmin
} from '../modelos/reporte-admin';

@Injectable({
  providedIn: 'root'
})
export class ReporteAdminService {
  private dao = inject(ReporteAdminDAO);

  vm$: Observable<ReporteAdminVM> = combineLatest([
    this.dao.escucharTrabajos().pipe(catchError(() => of([]))),
    this.dao.escucharMateriales().pipe(catchError(() => of([]))),
    this.dao.escucharEmpleados().pipe(catchError(() => of([]))),
    this.dao.escucharDevoluciones().pipe(catchError(() => of([]))),
    this.dao.escucharHistorialReciente().pipe(catchError(() => of([])))
  ]).pipe(
    map(([trabajos, materiales, empleados, devoluciones, historial]) => {
      const resumen = this.construirResumen(
        trabajos,
        materiales,
        empleados,
        devoluciones,
        historial
      );

      return {
        modulos: this.obtenerModulos(),
        resumen,
        actividadesRecientes: this.mapearActividades(historial)
      };
    }),
    catchError((error) => {
      console.error('[ReporteAdminService] Error al construir VM:', error);

      return of({
        modulos: this.obtenerModulos(),
        resumen: this.obtenerResumenVacio(),
        actividadesRecientes: []
      });
    }),
    shareReplay({
      bufferSize: 1,
      refCount: true
    })
  );

  private obtenerModulos(): ReporteModuloAdmin[] {
  return [
    {
      tipo: 'trabajos',
      titulo: 'Trabajos',
      descripcion: 'Estados, avance y trabajos realizados.',
      icono: 'clipboard-outline',
      ruta: '/reporte-trabajos',
      disponible: true,
      color: 'azul'
    },
    {
      tipo: 'materiales',
      titulo: 'Materiales usados',
      descripcion: 'Materiales asignados, usados y devueltos.',
      icono: 'archive-outline',
      ruta: '/reporte-materiales',
      disponible: true,
      color: 'verde'
    },
    {
      tipo: 'pagos',
      titulo: 'Pagos',
      descripcion: 'Pagos registrados, pendientes y parciales.',
      icono: 'person-outline',
      ruta: '/finanzas',
      disponible: true,
      color: 'naranja'
    },
    {
      tipo: 'devoluciones',
      titulo: 'Devoluciones',
      descripcion: 'Devoluciones pendientes y realizadas.',
      icono: 'document-text-outline',
      ruta: '/devoluciones',
      disponible: true,
      color: 'morado'
    },
    {
      tipo: 'empleados',
      titulo: 'Empleados',
      descripcion: 'Trabajos asignados por personal.',
      icono: 'people-outline',
      ruta: '/reporte-empleados',
      disponible: true,
      color: 'verde'
    },
    {
      tipo: 'historial',
      titulo: 'Historial general',
      descripcion: 'Actividades registradas en el sistema.',
      icono: 'reader-outline',
      ruta: '/notificaciones-admin',
      disponible: true,
      color: 'gris'
    }
  ];
}

  private construirResumen(
    trabajos: any[],
    materiales: any[],
    empleados: any[],
    devoluciones: any[],
    historial: any[]
  ): ReporteAdminResumen {
    const trabajosActivos = (trabajos || []).filter((item) =>
      this.esRegistroActivo(item)
    );

    const materialesActivos = (materiales || []).filter((item) =>
      this.esRegistroActivo(item)
    );

    const empleadosActivos = (empleados || []).filter((item) =>
      this.esEmpleadoActivo(item)
    );

    const devolucionesActivas = (devoluciones || []).filter((item) =>
      this.esRegistroActivo(item)
    );

    const pendientes = trabajosActivos.filter((item) => {
      const estado = this.normalizarEstadoTrabajo(
        item?.estado || item?.estadoTrabajo
      );

      return estado === 'pendiente' || estado === 'asignado';
    }).length;

    const enProceso = trabajosActivos.filter((item) => {
      const estado = this.normalizarEstadoTrabajo(
        item?.estado || item?.estadoTrabajo
      );

      return estado === 'en_camino' || estado === 'en_proceso';
    }).length;

    const finalizados = trabajosActivos.filter((item) => {
      const estado = this.normalizarEstadoTrabajo(
        item?.estado || item?.estadoTrabajo
      );

      return estado === 'finalizado' ||
        estado === 'cerrado' ||
        estado === 'devolucion_realizada';
    }).length;

    const materialesStockBajo = materialesActivos.filter((item) =>
      Number(item?.stockActual || 0) <= Number(item?.stockMinimo || 0)
    ).length;

    const empleadosInferidos = this.contarEmpleadosDesdeTrabajos(trabajosActivos);

    return {
      totalTrabajos: trabajosActivos.length,
      pendientes,
      enProceso,
      finalizados,

      totalMateriales: materialesActivos.length,
      materialesStockBajo,

      totalEmpleados: Math.max(empleadosActivos.length, empleadosInferidos),
      totalDevoluciones: devolucionesActivas.length,
      totalActividades: (historial || []).filter((item) =>
        this.esRegistroActivo(item)
      ).length,

      periodoTexto: 'Este mes'
    };
  }

  private obtenerResumenVacio(): ReporteAdminResumen {
    return {
      totalTrabajos: 0,
      pendientes: 0,
      enProceso: 0,
      finalizados: 0,

      totalMateriales: 0,
      materialesStockBajo: 0,

      totalEmpleados: 0,
      totalDevoluciones: 0,
      totalActividades: 0,

      periodoTexto: 'Este mes'
    };
  }

  private mapearActividades(items: any[]): ReporteActividadReciente[] {
    return (items || [])
      .filter((item) => this.esRegistroActivo(item))
      .slice(0, 5)
      .map((item, index) => {
        const modulo = String(item?.modulo || item?.origen || 'general').trim();
        const tipo = String(item?.tipo || 'actividad').trim();

        return {
          uid: String(item?.uid || item?.id || index),
          modulo,
          tipo,
          titulo: String(item?.titulo || this.obtenerTituloActividad(tipo)).trim(),
          descripcion: String(
            item?.descripcion ||
            item?.mensaje ||
            'Actividad registrada en el sistema.'
          ).trim(),
          fechaTexto: this.formatearFechaRelativa(item?.creadoEn || item?.fecha),
          icono: this.obtenerIconoActividad(tipo, modulo),
          clase: this.obtenerClaseActividad(tipo, modulo)
        };
      });
  }

  private esRegistroActivo(item: any): boolean {
    if (!item) {
      return false;
    }

    if (item?.eliminado === true || item?.eliminada === true) {
      return false;
    }

    if (String(item?.estado || '').trim().toLowerCase() === 'eliminado') {
      return false;
    }

    return true;
  }

  private esEmpleadoActivo(item: any): boolean {
    if (!this.esRegistroActivo(item)) {
      return false;
    }

    if (item?.activo === false) {
      return false;
    }

    if (item?.habilitado === false) {
      return false;
    }

    return true;
  }

  private contarEmpleadosDesdeTrabajos(trabajos: any[]): number {
    const empleados = new Set<string>();

    (trabajos || []).forEach((trabajo) => {
      const empleadosRaw =
        trabajo?.empleadosAsignados ||
        trabajo?.empleados ||
        trabajo?.empleadosIds ||
        [];

      if (!Array.isArray(empleadosRaw)) {
        return;
      }

      empleadosRaw.forEach((empleado: any) => {
        if (typeof empleado === 'string') {
          const id = empleado.trim();

          if (id) {
            empleados.add(id);
          }

          return;
        }

        const nombre = String(
          empleado?.uid ||
          empleado?.id ||
          empleado?.nombreCompleto ||
          empleado?.nombres ||
          empleado?.nombre ||
          empleado?.empleadoNombre ||
          empleado?.correo ||
          ''
        ).trim();

        if (nombre) {
          empleados.add(nombre);
        }
      });
    });

    return empleados.size;
  }

  private normalizarEstadoTrabajo(estado: any): string {
    const valor = String(estado || 'pendiente').trim().toLowerCase();

    if (valor === 'en camino' || valor === 'en_camino' || valor === 'encamino') {
      return 'en_camino';
    }

    if (valor === 'en proceso' || valor === 'en_proceso' || valor === 'proceso') {
      return 'en_proceso';
    }

    if (valor === 'devolucion pendiente' || valor === 'devolucion_pendiente') {
      return 'devolucion_pendiente';
    }

    if (valor === 'devolucion realizada' || valor === 'devolucion_realizada') {
      return 'devolucion_realizada';
    }

    if (valor === 'terminado') {
      return 'finalizado';
    }

    return valor || 'pendiente';
  }

  private obtenerTituloActividad(tipo: string): string {
    const mapa: Record<string, string> = {
      trabajo_creado: 'Nuevo trabajo registrado',
      cambio_estado_trabajo: 'Cambio de estado',
      stock_bajo: 'Stock bajo',
      devolucion_validada: 'Devolución validada',
      devolucion_realizada: 'Devolución realizada',
      material_creado: 'Nuevo material registrado',
      empleado_creado: 'Nuevo empleado registrado'
    };

    return mapa[tipo] || 'Actividad registrada';
  }

  private obtenerIconoActividad(
    tipo: string,
    modulo: string
  ): string {
    const texto = (tipo + ' ' + modulo).toLowerCase();

    if (texto.includes('trabajo')) {
      return 'clipboard-outline';
    }

    if (texto.includes('stock') || texto.includes('material')) {
      return 'warning-outline';
    }

    if (texto.includes('devolucion') || texto.includes('devolución')) {
      return 'document-text-outline';
    }

    if (texto.includes('empleado')) {
      return 'people-outline';
    }

    return 'reader-outline';
  }

  private obtenerClaseActividad(
    tipo: string,
    modulo: string
  ): string {
    const texto = (tipo + ' ' + modulo).toLowerCase();

    if (texto.includes('stock')) {
      return 'warning';
    }

    if (texto.includes('devolucion') || texto.includes('devolución')) {
      return 'morado';
    }

    if (texto.includes('trabajo')) {
      return 'azul';
    }

    if (texto.includes('empleado')) {
      return 'verde';
    }

    return 'gris';
  }

  private formatearFechaRelativa(valor: any): string {
    const fecha = this.convertirFecha(valor);

    if (!fecha) {
      return 'Hoy';
    }

    const ahora = Date.now();
    const diferencia = Math.max(0, ahora - fecha.getTime());

    const minutos = Math.floor(diferencia / 60000);
    const horas = Math.floor(diferencia / 3600000);
    const dias = Math.floor(diferencia / 86400000);

    if (minutos < 1) {
      return 'Ahora';
    }

    if (minutos < 60) {
      return 'Hace ' + minutos + ' min';
    }

    if (horas < 24) {
      return 'Hace ' + horas + ' h';
    }

    if (dias < 7) {
      return 'Hace ' + dias + ' d';
    }

    return fecha.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  private convertirFecha(valor: any): Date | null {
    if (!valor) {
      return null;
    }

    if (valor instanceof Date && !Number.isNaN(valor.getTime())) {
      return valor;
    }

    if (typeof valor?.toDate === 'function') {
      const fecha = valor.toDate();

      if (fecha instanceof Date && !Number.isNaN(fecha.getTime())) {
        return fecha;
      }
    }

    if (typeof valor?.seconds === 'number') {
      const fecha = new Date(valor.seconds * 1000);

      if (!Number.isNaN(fecha.getTime())) {
        return fecha;
      }
    }

    if (typeof valor === 'string') {
      const fecha = new Date(valor);

      if (!Number.isNaN(fecha.getTime())) {
        return fecha;
      }
    }

    return null;
  }
}