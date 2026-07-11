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
  MaterialDevolucionVista,
  ValidarDevolucionData
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
      const devoluciones = (trabajos || [])
        .filter((trabajo: any) => trabajo?.eliminado !== true)
        .filter((trabajo: any) => this.esTrabajoConDevolucionReal(trabajo))
        .map((trabajo: any) => this.mapearDevolucion(trabajo))
        .sort((a, b) => {
          const ordenEstado =
            this.ordenEstadoDevolucion(a.estadoDevolucion) -
            this.ordenEstadoDevolucion(b.estadoDevolucion);

          if (ordenEstado !== 0) {
            return ordenEstado;
          }

          return b.uid.localeCompare(a.uid);
        });

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
    data: ValidarDevolucionData | string,
    codigo = ''
  ): Promise<void> {
    if (typeof data === 'string') {
      await this.dao.validarDevolucion({
        trabajoUid: String(data || '').trim(),
        codigoIngresado: String(codigo || '').trim(),
        origenValidacion: 'administrador'
      });

      return;
    }

    await this.dao.validarDevolucion(data);
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

  private esTrabajoConDevolucionReal(trabajo: any): boolean {
    const estado = String(trabajo?.estado || '').trim();

    if (
      estado === 'devolucion_pendiente' ||
      estado === 'devolucion_realizada'
    ) {
      return true;
    }

    if (
      trabajo?.devolucionRegistrada === true ||
      trabajo?.devolucionValidada === true
    ) {
      return true;
    }

    const materiales = Array.isArray(trabajo?.materialesAsignados)
      ? trabajo.materialesAsignados
      : [];

    return materiales.some((material: any) =>
      Number(material?.cantidadDevuelta || 0) > 0
    );
  }

  private mapearDevolucion(
    trabajo: any
  ): DevolucionTrabajoVista {
    const materialesOriginales = Array.isArray(trabajo.materialesAsignados)
      ? trabajo.materialesAsignados
      : [];

    const materiales: MaterialDevolucionVista[] = materialesOriginales
      .map((item: any) => {
        const cantidadAsignada = Number(
          item.cantidadAsignada ??
          item.cantidad ??
          0
        );

        const cantidadUsada = Number(
          item.cantidadUsada ??
          item.usado ??
          0
        );

        const cantidadDevuelta = Number(
          item.cantidadDevuelta ??
          0
        );

        return {
          materialUid: String(
            item.materialUid ||
            item.uid ||
            item.id ||
            ''
          ),

          nombre: String(
            item.nombre ||
            item.materialNombre ||
            'Material'
          ),

          unidad: String(item.unidad || 'und'),

          cantidadAsignada,
          cantidadUsada,
          cantidadDevuelta,

          cantidadTexto:
            `${cantidadDevuelta} ${String(item.unidad || 'und')}`
        };
      })
      .filter((item: MaterialDevolucionVista) =>
        item.materialUid &&
        Number(item.cantidadDevuelta || 0) > 0
      );

    const estadoDevolucion: EstadoDevolucion =
      trabajo.estado === 'devolucion_realizada' ||
      trabajo.devolucionValidada === true
        ? 'validada'
        : 'pendiente';

    const empleados = Array.isArray(trabajo.empleadosAsignados)
      ? trabajo.empleadosAsignados
      : [];

    const empleadoTexto =
      trabajo.empleadoDevolucionNombre ||
      (
        empleados.length > 0
          ? empleados
              .map((empleado: any) =>
                empleado.nombreCompleto ||
                empleado.nombres ||
                empleado.usuario ||
                'Empleado'
              )
              .join(', ')
          : 'Sin empleado'
      );

    const totalDevuelto = materiales.reduce(
      (total, material) =>
        total + Number(material.cantidadDevuelta || 0),
      0
    );

    return {
      uid: String(trabajo.uid || trabajo.id || ''),

      codigoTrabajo: this.obtenerCodigoTrabajo(trabajo),

      clienteNombre: String(
        trabajo.clienteNombre ||
        'Sin cliente'
      ),

      tipoTrabajo: String(
        trabajo.tipoTrabajo ||
        'Trabajo operativo'
      ),

      empleadoTexto,

      fechaTexto: this.obtenerFechaTexto(trabajo),

      codigoDevolucion: String(trabajo.codigoDevolucion || ''),

      estadoTrabajo: String(trabajo.estado || ''),

      estadoDevolucion,

      estadoTexto:
        estadoDevolucion === 'validada'
          ? 'Validada'
          : 'Pendiente',

      totalMateriales: materiales.length,
      totalDevuelto,

      materiales,

      devolucionRegistrada: trabajo.devolucionRegistrada === true,
      devolucionValidada: trabajo.devolucionValidada === true,

      empleadoDevolucionUid: String(
        trabajo.empleadoDevolucionUid ||
        ''
      ),

      empleadoDevolucionNombre: String(
        trabajo.empleadoDevolucionNombre ||
        empleadoTexto ||
        ''
      ),

      fechaRegistroTexto: this.obtenerFechaRegistroTexto(trabajo),
      fechaValidacionTexto: this.obtenerFechaValidacionTexto(trabajo),

      observacionDevolucion: String(
        trabajo.observacionDevolucion ||
        ''
      )
    };
  }

  private ordenEstadoDevolucion(
    estado: EstadoDevolucion
  ): number {
    if (estado === 'pendiente') {
      return 1;
    }

    if (estado === 'validada') {
      return 2;
    }

    return 99;
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

  private obtenerFechaRegistroTexto(trabajo: any): string {
    const fecha =
      trabajo.fechaDevolucionRegistrada ||
      trabajo.finalizadoAt ||
      trabajo.updatedAt;

    return this.formatearFechaFirestore(fecha);
  }

  private obtenerFechaValidacionTexto(trabajo: any): string {
    return this.formatearFechaFirestore(
      trabajo.fechaDevolucionValidada
    );
  }

  private formatearFechaFirestore(fecha: any): string {
    if (!fecha) {
      return '';
    }

    if (typeof fecha?.toDate === 'function') {
      return fecha.toDate().toLocaleString('es-PE');
    }

    if (fecha instanceof Date) {
      return fecha.toLocaleString('es-PE');
    }

    return '';
  }

  private obtenerCodigoTrabajo(trabajo: any): string {
    const codigoDirecto = String(
      trabajo.codigoTrabajo ||
      trabajo.codigoSeguimiento ||
      trabajo.codigo ||
      ''
    ).trim();

    if (codigoDirecto) {
      return codigoDirecto;
    }

    const uid = String(trabajo.uid || trabajo.id || '').trim();

    if (!uid) {
      return 'T-00000';
    }

    return `T-${uid.slice(0, 5).toUpperCase()}`;
  }
}
