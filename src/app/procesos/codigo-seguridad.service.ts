// src/app/procesos/codigo-seguridad.service.ts
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { CodigoSeguridadDao } from '../dao/codigo-seguridad.dao';

import {
  CodigoSeguridadVM,
  CodigoTrabajoVista,
  TipoCodigoSeguridad
} from '../modelos/codigo-seguridad';

@Injectable({
  providedIn: 'root'
})
export class CodigoSeguridadService {
  private dao = inject(CodigoSeguridadDao);
  private trabajosSub?: Subscription;

  private vmSubject = new BehaviorSubject<CodigoSeguridadVM>({
    cargando: false,

    trabajos: [],
    trabajoSeleccionado: null,

    totalTrabajos: 0,
    totalConCodigoCliente: 0,
    totalConCodigoDevolucion: 0,

    tabActivo: 'cliente',

    mensajeVacio: 'No hay trabajos registrados para generar cÃ³digos.'
  });

  vm$ = this.vmSubject.asObservable();

  obtenerEstadoActual(): CodigoSeguridadVM {
    return this.vmSubject.value;
  }

  cargarTrabajos(
    trabajoUidInicial?: string | null
  ): void {
    this.actualizarVM({
      cargando: true
    });

    if (this.trabajosSub) {
      this.trabajosSub.unsubscribe();
      this.trabajosSub = undefined;
    }

    this.trabajosSub = this.dao.escucharTrabajos().subscribe({
      next: (trabajos) => {
        const estadoActual = this.vmSubject.value;

        let seleccionado: CodigoTrabajoVista | null = null;

        if (trabajoUidInicial) {
          seleccionado =
            trabajos.find((trabajo) => trabajo.uid === trabajoUidInicial) || null;
        }

        if (!seleccionado && estadoActual.trabajoSeleccionado) {
          seleccionado =
            trabajos.find(
              (trabajo) => trabajo.uid === estadoActual.trabajoSeleccionado?.uid
            ) || null;
        }

        if (!seleccionado) {
          seleccionado = trabajos[0] || null;
        }

        this.actualizarVM({
          cargando: false,
          trabajos,
          trabajoSeleccionado: seleccionado,
          totalTrabajos: trabajos.length,
          totalConCodigoCliente: trabajos.filter(
            (trabajo) => this.codigoValido(trabajo.codigoCliente)
          ).length,
          totalConCodigoDevolucion: trabajos.filter(
            (trabajo) => this.codigoValido(trabajo.codigoDevolucion)
          ).length,
          mensajeVacio: trabajos.length === 0
            ? 'No hay trabajos registrados para generar cÃ³digos.'
            : ''
        });
      },
      error: (error) => {
        console.error(error);

        this.actualizarVM({
          cargando: false,
          trabajos: [],
          trabajoSeleccionado: null,
          totalTrabajos: 0,
          totalConCodigoCliente: 0,
          totalConCodigoDevolucion: 0,
          mensajeVacio: 'No se pudieron cargar los trabajos.'
        });
      }
    });
  }

  detenerEscucha(): void {
    if (this.trabajosSub) {
      this.trabajosSub.unsubscribe();
      this.trabajosSub = undefined;
    }
  }

  seleccionarTrabajo(uid: string): void {
    const estado = this.vmSubject.value;
    const seleccionado =
      estado.trabajos.find((trabajo) => trabajo.uid === uid) || null;

    this.actualizarVM({
      trabajoSeleccionado: seleccionado
    });
  }

  cambiarTab(tab: TipoCodigoSeguridad): void {
    this.actualizarVM({
      tabActivo: tab
    });
  }

  async regenerarCodigoCliente(): Promise<string> {
    return this.regenerarCodigo('cliente');
  }

  async regenerarCodigoDevolucion(): Promise<string> {
    return this.regenerarCodigo('devolucion');
  }

  private async regenerarCodigo(
    tipo: TipoCodigoSeguridad
  ): Promise<string> {
    const estado = this.vmSubject.value;
    const trabajo = estado.trabajoSeleccionado;

    if (!trabajo) {
      throw new Error('trabajo-no-seleccionado');
    }

    if (trabajo.eliminado) {
      throw new Error('trabajo-eliminado');
    }

    const codigoNuevo = this.generarCodigo();

    await this.dao.actualizarCodigo(
      trabajo.uid,
      tipo,
      codigoNuevo
    );

    await this.dao.registrarHistorial({
      trabajoUid: trabajo.uid,
      trabajoId: trabajo.id,
      tipo,
      codigoNuevo,
      descripcion: tipo === 'cliente'
        ? `Se regenerÃ³ el cÃ³digo de validaciÃ³n del cliente para el trabajo ${trabajo.id}.`
        : `Se regenerÃ³ el cÃ³digo de devoluciÃ³n de materiales para el trabajo ${trabajo.id}.`
    });

    const trabajosActualizados = estado.trabajos.map((item) => {
      if (item.uid !== trabajo.uid) {
        return item;
      }

      if (tipo === 'cliente') {
        return {
          ...item,
          codigoCliente: codigoNuevo
        };
      }

      return {
        ...item,
        codigoDevolucion: codigoNuevo
      };
    });

    const trabajoActualizado =
      trabajosActualizados.find((item) => item.uid === trabajo.uid) || null;

    this.actualizarVM({
      trabajos: trabajosActualizados,
      trabajoSeleccionado: trabajoActualizado,
      totalConCodigoCliente: trabajosActualizados.filter(
        (item) => this.codigoValido(item.codigoCliente)
      ).length,
      totalConCodigoDevolucion: trabajosActualizados.filter(
        (item) => this.codigoValido(item.codigoDevolucion)
      ).length
    });

    return codigoNuevo;
  }

  private generarCodigo(): string {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  private codigoValido(codigo: string): boolean {
    const limpio = String(codigo || '').trim();

    return /^\d{6}$/.test(limpio);
  }

  private actualizarVM(
    cambios: Partial<CodigoSeguridadVM>
  ): void {
    this.vmSubject.next({
      ...this.vmSubject.value,
      ...cambios
    });
  }
}

