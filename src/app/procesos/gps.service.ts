// src/app/procesos/gps.service.ts
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

import { GpsDAO } from '../dao/gps.dao';

import {
  EstadoGps,
  GpsAdminVM,
  GpsEmpleadoFiltro,
  GpsHistorial,
  GpsUbicacionActual
} from '../modelos/gps';

@Injectable({
  providedIn: 'root'
})
export class GpsService {
  private dao = inject(GpsDAO);

  private empleadoSeleccionadoSubject = new BehaviorSubject<string>('todos');

  private ubicaciones$: Observable<GpsUbicacionActual[]> =
    this.dao.escucharUbicacionesActuales().pipe(
      map((ubicaciones) =>
        ubicaciones
          .filter((item) => this.esCoordenadaValida(item.latitud, item.longitud))
          .map((item) => this.normalizarEstadoGps(item))
      ),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );

  private empleados$: Observable<GpsEmpleadoFiltro[]> =
    this.dao.escucharEmpleadosGps().pipe(
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );

  vmAdmin$: Observable<GpsAdminVM> = combineLatest([
    this.ubicaciones$,
    this.empleados$,
    this.empleadoSeleccionadoSubject.asObservable()
  ]).pipe(
    map(([ubicaciones, empleados, empleadoSeleccionadoUid]) => {
      const empleadosFiltro: GpsEmpleadoFiltro[] = [
        {
          uid: 'todos',
          etiqueta: 'Todos los trabajadores',
          nombreCompleto: 'Todos los trabajadores',
          cargo: 'General'
        },
        ...empleados
      ];

      const empleadoSeleccionado =
        empleadoSeleccionadoUid === 'todos'
          ? null
          : empleados.find((item) => item.uid === empleadoSeleccionadoUid) || null;

      const ubicacionesFiltradas =
        empleadoSeleccionadoUid === 'todos'
          ? ubicaciones
          : ubicaciones.filter(
              (item) => item.empleadoUid === empleadoSeleccionadoUid
            );

      return {
        ubicaciones,
        ubicacionesFiltradas,

        empleadosFiltro,
        empleadoSeleccionadoUid,
        empleadoSeleccionado,

        empleadoPrincipal: ubicacionesFiltradas[0] || null,

        totalActivos: ubicaciones.filter((item) =>
          item.estado === 'activo' || item.estado === 'en_camino'
        ).length,

        totalSinSenal: ubicaciones.filter((item) =>
          item.estado === 'sin_senal'
        ).length,

        totalInactivos: ubicaciones.filter((item) =>
          item.estado === 'inactivo'
        ).length
      };
    }),
    shareReplay({
      bufferSize: 1,
      refCount: true
    })
  );

  cambiarEmpleadoSeleccionado(empleadoUid: string) {
    this.empleadoSeleccionadoSubject.next(
      String(empleadoUid || 'todos').trim() || 'todos'
    );
  }

  async enviarUbicacionEmpleado(data: GpsUbicacionActual): Promise<void> {
    if (!data.empleadoUid) {
      throw new Error('gps-empleado-uid-vacio');
    }

    if (!this.esCoordenadaValida(data.latitud, data.longitud)) {
      throw new Error('gps-coordenada-invalida');
    }

    const payload: GpsUbicacionActual = {
      ...data,
      estado: data.estado || 'activo'
    };

    await this.dao.guardarUbicacionActual(payload);

    const historial: GpsHistorial = {
      empleadoUid: payload.empleadoUid,
      empleadoNombre: payload.empleadoNombre,

      trabajoUid: payload.trabajoUid,
      trabajoCodigo: payload.trabajoCodigo,

      latitud: payload.latitud,
      longitud: payload.longitud,
      precision: payload.precision ?? null
    };

    await this.dao.registrarHistorial(historial);
  }

  private normalizarEstadoGps(
    item: GpsUbicacionActual
  ): GpsUbicacionActual {
    const minutos = this.obtenerMinutosDesdeActualizacion(item.actualizadoEn);

    let estado: EstadoGps = item.estado || 'activo';

    if (minutos > 5) {
      estado = 'sin_senal';
    }

    if (minutos > 30) {
      estado = 'inactivo';
    }

    return {
      ...item,
      estado
    };
  }

  private obtenerMinutosDesdeActualizacion(fecha: any): number {
    const fechaMs = this.obtenerTiempoMs(fecha);

    if (!fechaMs) {
      return 999;
    }

    return Math.floor((Date.now() - fechaMs) / 60000);
  }

  private obtenerTiempoMs(fecha: any): number {
    if (!fecha) {
      return 0;
    }

    if (typeof fecha?.toMillis === 'function') {
      return fecha.toMillis();
    }

    if (fecha instanceof Date) {
      return fecha.getTime();
    }

    if (typeof fecha === 'number') {
      return fecha;
    }

    return 0;
  }

  private esCoordenadaValida(
    latitud: number,
    longitud: number
  ): boolean {
    return (
      typeof latitud === 'number' &&
      typeof longitud === 'number' &&
      !Number.isNaN(latitud) &&
      !Number.isNaN(longitud) &&
      latitud >= -90 &&
      latitud <= 90 &&
      longitud >= -180 &&
      longitud <= 180
    );
  }
}