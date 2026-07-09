// src/app/procesos/dashboard-empleado.service.ts
import { Injectable, inject } from '@angular/core';

import {
  Auth,
  authState
} from '@angular/fire/auth';

import {
  Observable,
  combineLatest,
  of
} from 'rxjs';

import {
  catchError,
  map,
  shareReplay,
  switchMap
} from 'rxjs/operators';

import { DashboardEmpleadoDAO } from '../dao/dashboard-empleado.dao';

import {
  DashboardEmpleadoUsuario,
  DashboardEmpleadoViewModel,
  DashboardTrabajoEmpleado
} from '../modelos/dashboard-empleado';

@Injectable({
  providedIn: 'root'
})
export class DashboardEmpleadoService {
  private auth = inject(Auth);
  private dao = inject(DashboardEmpleadoDAO);

  obtenerDashboardEmpleado$(): Observable<DashboardEmpleadoViewModel> {
    return authState(this.auth).pipe(
      switchMap((usuarioAuth) => {
        if (!usuarioAuth?.uid) {
          return of(this.crearViewModelVacio());
        }

        return combineLatest([
          this.dao.obtenerEmpleadoActual$(usuarioAuth.uid),
          this.dao.escucharTrabajosAsignados$(usuarioAuth.uid)
        ]).pipe(
          map(([empleado, trabajos]) =>
            this.construirViewModel(empleado, trabajos)
          )
        );
      }),

      catchError((error) => {
        console.error('[DashboardEmpleadoService] Error cargando dashboard empleado:', error);
        return of(this.crearViewModelVacio());
      }),

      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }

  async marcarEnCamino(
    trabajo: DashboardTrabajoEmpleado,
    empleado: DashboardEmpleadoUsuario
  ): Promise<void> {
    this.validarEmpleado(empleado);

    if (trabajo.estado !== 'pendiente') {
      throw new Error('trabajo-no-pendiente');
    }

    await this.dao.actualizarEstadoTrabajo(
      trabajo,
      'en_camino',
      empleado
    );
  }

  async iniciarTrabajo(
    trabajo: DashboardTrabajoEmpleado,
    empleado: DashboardEmpleadoUsuario
  ): Promise<void> {
    this.validarEmpleado(empleado);

    if (trabajo.estado !== 'en_camino') {
      throw new Error('trabajo-no-en-camino');
    }

    await this.dao.actualizarEstadoTrabajo(
      trabajo,
      'en_proceso',
      empleado
    );
  }

  async finalizarTrabajo(
    trabajo: DashboardTrabajoEmpleado,
    empleado: DashboardEmpleadoUsuario
  ): Promise<void> {
    this.validarEmpleado(empleado);

    if (trabajo.estado !== 'en_proceso') {
      throw new Error('trabajo-no-en-proceso');
    }

    await this.dao.actualizarEstadoTrabajo(
      trabajo,
      'finalizado',
      empleado
    );
  }

  async registrarDevolucion(
    trabajo: DashboardTrabajoEmpleado,
    empleado: DashboardEmpleadoUsuario,
    materialesDevueltos: Array<{
      materialUid: string;
      nombre: string;
      unidad: string;
      cantidadAsignada: number;
      cantidadUsada: number;
      cantidadDevuelta: number;
    }>
  ): Promise<void> {
    this.validarEmpleado(empleado);

    const estado = String(trabajo.estado || '').trim();

    if (
      estado !== 'finalizado' &&
      estado !== 'devolucion_pendiente'
    ) {
      throw new Error('trabajo-no-finalizado');
    }

    const materialesValidos = (materialesDevueltos || [])
      .map((item) => ({
        materialUid: String(item.materialUid || '').trim(),
        nombre: String(item.nombre || 'Material').trim(),
        unidad: String(item.unidad || 'und').trim(),
        cantidadAsignada: Number(item.cantidadAsignada || 0),
        cantidadUsada: Number(item.cantidadUsada || 0),
        cantidadDevuelta: Number(item.cantidadDevuelta || 0)
      }))
      .filter((item) =>
        item.materialUid &&
        item.cantidadAsignada >= 0 &&
        item.cantidadUsada >= 0 &&
        item.cantidadDevuelta > 0
      );

    if (materialesValidos.length === 0) {
      throw new Error('sin-materiales-devolver');
    }

    await this.dao.registrarDevolucionEmpleado(
      trabajo,
      empleado,
      materialesValidos
    );
  }

  private construirViewModel(
    empleado: DashboardEmpleadoUsuario,
    trabajosBase: DashboardTrabajoEmpleado[]
  ): DashboardEmpleadoViewModel {
    const trabajos = (trabajosBase || [])
      .filter((trabajo) => trabajo.eliminado !== true)
      .filter((trabajo) => trabajo.estado !== 'cancelado');

    const trabajosPendientes = trabajos.filter((trabajo) =>
      trabajo.estado === 'pendiente'
    );

    const trabajosEnCamino = trabajos.filter((trabajo) =>
      trabajo.estado === 'en_camino'
    );

    const trabajosEnProceso = trabajos.filter((trabajo) =>
      trabajo.estado === 'en_proceso'
    );

    const trabajosFinalizados = trabajos.filter((trabajo) =>
      [
        'finalizado',
        'devolucion_pendiente',
        'devolucion_realizada'
      ].includes(trabajo.estado)
    );

    const trabajoActual =
      trabajos.find((trabajo) => trabajo.estado === 'en_proceso') ||
      trabajos.find((trabajo) => trabajo.estado === 'en_camino') ||
      trabajos.find((trabajo) => trabajo.estado === 'pendiente') ||
      null;

    return {
      empleado,

      trabajos,
      trabajosPendientes,
      trabajosEnCamino,
      trabajosEnProceso,
      trabajosFinalizados,

      trabajoActual,

      totalTrabajos: trabajos.length,
      totalPendientes: trabajosPendientes.length,
      totalEnCamino: trabajosEnCamino.length,
      totalEnProceso: trabajosEnProceso.length,
      totalFinalizados: trabajosFinalizados.length
    };
  }

  private validarEmpleado(
    empleado: DashboardEmpleadoUsuario
  ): void {
    if (!empleado?.uid) {
      throw new Error('empleado-sin-uid');
    }

    if (!empleado.accesoValido) {
      throw new Error('empleado-sin-acceso');
    }
  }

  private crearViewModelVacio(): DashboardEmpleadoViewModel {
    const empleado: DashboardEmpleadoUsuario = {
      uid: '',
      nombres: '',
      apellidos: '',
      nombreCompleto: 'Empleado',
      usuario: '',
      correo: '',
      correoAuth: '',
      dni: '',
      telefono: '',
      cargo: 'Personal operativo',
      rol: 'empleado',
      habilitado: false,
      activo: false,
      estado: false,
      eliminado: false,
      fotoUrl: '',
      iniciales: 'EM',
      cargoTexto: 'Personal operativo',
      accesoValido: false
    };

    return {
      empleado,

      trabajos: [],
      trabajosPendientes: [],
      trabajosEnCamino: [],
      trabajosEnProceso: [],
      trabajosFinalizados: [],

      trabajoActual: null,

      totalTrabajos: 0,
      totalPendientes: 0,
      totalEnCamino: 0,
      totalEnProceso: 0,
      totalFinalizados: 0
    };
  }
}