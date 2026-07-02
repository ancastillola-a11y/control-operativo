// src/app/procesos/devolucion.service.ts
import { Injectable, inject } from '@angular/core';

import {
  BehaviorSubject,
  combineLatest,
  Observable
} from 'rxjs';

import {
  map,
  shareReplay
} from 'rxjs/operators';

import { DevolucionDAO } from '../dao/devolucion.dao';

import {
  DevolucionTrabajoVista,
  DevolucionesVM,
  EstadoDevolucion,
  FiltroDevolucion,
  MaterialDevolucionVista
} from '../modelos/devolucion';

@Injectable({
  providedIn: 'root'
})
export class DevolucionService {
  private dao = inject(DevolucionDAO);

  private filtroSubject =
    new BehaviorSubject<FiltroDevolucion>('pendientes');

  vm$: Observable<DevolucionesVM> = combineLatest([
    this.dao.escucharTrabajos(),
    this.filtroSubject.asObservable()
  ]).pipe(
    map(([trabajos, filtro]) => {
      const devoluciones = trabajos
        .filter((trabajo: any) => trabajo.eliminado !== true)
        .filter((trabajo: any) =>
          Array.isArray(trabajo.materialesAsignados) &&
          trabajo.materialesAsignados.length > 0
        )
        .filter((trabajo: any) =>
          trabajo.estado !== 'pendiente' &&
          trabajo.estado !== 'cancelado'
        )
        .map((trabajo: any) => this.mapearDevolucion(trabajo))
        .sort((a, b) => b.uid.localeCompare(a.uid));

      const devolucionesFiltradas = this.aplicarFiltro(
        devoluciones,
        filtro
      );

      return {
        filtro,

        devoluciones,
        devolucionesFiltradas,

        totalPendientes: devoluciones.filter(
          (item) => item.estadoDevolucion === 'pendiente'
        ).length,

        totalValidadas: devoluciones.filter(
          (item) => item.estadoDevolucion === 'validada'
        ).length,

        totalHistorial: devoluciones.length
      };
    }),
    shareReplay({
      bufferSize: 1,
      refCount: true
    })
  );

  cambiarFiltro(filtro: FiltroDevolucion) {
    this.filtroSubject.next(filtro);
  }

  async validarDevolucion(
    trabajoUid: string,
    codigo: string
  ): Promise<void> {
    await this.dao.validarDevolucion(trabajoUid, codigo);
  }

  private aplicarFiltro(
    devoluciones: DevolucionTrabajoVista[],
    filtro: FiltroDevolucion
  ): DevolucionTrabajoVista[] {
    if (filtro === 'pendientes') {
      return devoluciones.filter(
        (item) => item.estadoDevolucion === 'pendiente'
      );
    }

    if (filtro === 'validadas') {
      return devoluciones.filter(
        (item) => item.estadoDevolucion === 'validada'
      );
    }

    return devoluciones;
  }

  private mapearDevolucion(trabajo: any): DevolucionTrabajoVista {
    const materiales: MaterialDevolucionVista[] =
      (trabajo.materialesAsignados || []).map((item: any) => ({
        materialUid: String(
          item.materialUid ||
          item.uid ||
          item.id ||
          ''
        ),
        nombre: String(item.nombre || item.materialNombre || 'Material'),
        unidad: String(item.unidad || 'und'),
        cantidadAsignada: Number(
          item.cantidadAsignada ??
          item.cantidad ??
          0
        )
      }));

    const estadoDevolucion: EstadoDevolucion =
      trabajo.estado === 'devolucion_realizada' ||
      trabajo.devolucionValidada === true
        ? 'validada'
        : 'pendiente';

    const empleados = Array.isArray(trabajo.empleadosAsignados)
      ? trabajo.empleadosAsignados
      : [];

    const empleadoTexto = empleados.length > 0
      ? empleados
          .map((empleado: any) =>
            empleado.nombreCompleto ||
            empleado.nombres ||
            empleado.usuario ||
            'Empleado'
          )
          .join(', ')
      : 'Sin empleado';

    return {
      uid: String(trabajo.uid || trabajo.id || ''),

      codigoTrabajo: String(
        trabajo.codigoTrabajo ||
        trabajo.codigo ||
        `T-${String(trabajo.uid || '').slice(0, 5).toUpperCase()}`
      ),

      clienteNombre: String(trabajo.clienteNombre || 'Sin cliente'),
      tipoTrabajo: String(trabajo.tipoTrabajo || 'Trabajo operativo'),

      empleadoTexto,
      fechaTexto: this.obtenerFechaTexto(trabajo),

      codigoDevolucion: String(trabajo.codigoDevolucion || ''),

      estadoTrabajo: String(trabajo.estado || ''),
      estadoDevolucion,
      estadoTexto: estadoDevolucion === 'validada'
        ? 'Validada'
        : 'Pendiente',

      totalMateriales: materiales.length,
      materiales,

      fechaValidacionTexto: this.obtenerFechaValidacionTexto(trabajo)
    };
  }

  private obtenerFechaTexto(trabajo: any): string {
    const fecha = String(trabajo.fechaProgramada || '').trim();
    const hora = String(trabajo.horaProgramada || '').trim();

    if (fecha && hora) {
      return `${fecha} · ${hora}`;
    }

    if (fecha) {
      return fecha;
    }

    return 'Sin fecha';
  }

  private obtenerFechaValidacionTexto(trabajo: any): string {
    const fecha = trabajo.fechaDevolucionValidada;

    if (!fecha) {
      return '';
    }

    if (typeof fecha?.toDate === 'function') {
      return fecha.toDate().toLocaleString('es-PE');
    }

    return '';
  }
}