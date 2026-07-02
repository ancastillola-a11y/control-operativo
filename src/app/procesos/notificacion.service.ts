// src/app/procesos/notificacion.service.ts
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

import { NotificacionDAO } from '../dao/notificacion.dao';

import {
  FiltroNotificacionAdmin,
  NotificacionAdmin,
  NotificacionAdminVista,
  NotificacionesAdminVM,
  TipoNotificacionAdmin
} from '../modelos/notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private dao = inject(NotificacionDAO);

  private filtroSubject =
    new BehaviorSubject<FiltroNotificacionAdmin>('todas');

  private notificacionesBase$: Observable<NotificacionAdminVista[]> =
    this.dao.escucharNotificacionesAdmin().pipe(
      map((items) =>
        items
          .filter((item) =>
            item.eliminada !== true &&
            item.resuelta !== true
          )
          .map((item) => this.mapearNotificacionVista(item))
      ),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );

  contadorNoLeidas$: Observable<number> =
    this.notificacionesBase$.pipe(
      map((notificaciones) =>
        notificaciones.filter(
          (item) =>
            item.leida !== true &&
            item.eliminada !== true &&
            item.resuelta !== true
        ).length
      ),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );

  vm$: Observable<NotificacionesAdminVM> =
    combineLatest([
      this.notificacionesBase$,
      this.filtroSubject.asObservable()
    ]).pipe(
      map(([notificaciones, filtro]) => {
        const notificacionesFiltradas = this.aplicarFiltro(
          notificaciones,
          filtro
        );

        return {
          filtro,

          notificaciones,
          notificacionesFiltradas,

          total: notificaciones.length,
          noLeidas: notificaciones.filter((item) => item.leida !== true).length,

          totalCambiosEstado: notificaciones.filter((item) =>
            this.esCambioEstado(item.tipo)
          ).length,

          totalStock: notificaciones.filter((item) =>
            item.tipo === 'stock_bajo'
          ).length,

          totalRutas: notificaciones.filter((item) =>
            this.esRuta(item.tipo)
          ).length,

          totalDevoluciones: notificaciones.filter((item) =>
            this.esDevolucion(item.tipo)
          ).length
        };
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );

  cambiarFiltro(filtro: FiltroNotificacionAdmin) {
    this.filtroSubject.next(filtro);
  }

  async marcarComoLeida(uid: string): Promise<void> {
    await this.dao.marcarComoLeida(uid);
  }

  async marcarComoNoLeida(uid: string): Promise<void> {
    await this.dao.marcarComoNoLeida(uid);
  }

  async eliminarNotificacion(uid: string): Promise<void> {
    await this.dao.eliminarNotificacion(uid);
  }

  async marcarTodasComoLeidas(
    notificaciones: NotificacionAdminVista[]
  ): Promise<void> {
    await this.dao.marcarTodasComoLeidas(notificaciones);
  }

  private aplicarFiltro(
    notificaciones: NotificacionAdminVista[],
    filtro: FiltroNotificacionAdmin
  ): NotificacionAdminVista[] {
    if (filtro === 'cambios_estado') {
      return notificaciones.filter((item) =>
        this.esCambioEstado(item.tipo)
      );
    }

    if (filtro === 'stock') {
      return notificaciones.filter((item) =>
        item.tipo === 'stock_bajo'
      );
    }

    if (filtro === 'rutas') {
      return notificaciones.filter((item) =>
        this.esRuta(item.tipo)
      );
    }

    if (filtro === 'devoluciones') {
      return notificaciones.filter((item) =>
        this.esDevolucion(item.tipo)
      );
    }

    return notificaciones;
  }

  private esCambioEstado(tipo: TipoNotificacionAdmin): boolean {
    return [
      'cambio_estado_trabajo',
      'trabajo_finalizado',
      'finalizacion_trabajo'
    ].includes(tipo);
  }

  private esRuta(tipo: TipoNotificacionAdmin): boolean {
    return [
      'inicio_trabajo',
      'empleado_en_camino'
    ].includes(tipo);
  }

  private esDevolucion(tipo: TipoNotificacionAdmin): boolean {
    return [
      'devolucion_validada',
      'devolucion_realizada'
    ].includes(tipo);
  }

  private mapearNotificacionVista(
    item: NotificacionAdmin
  ): NotificacionAdminVista {
    const tipo = item.tipo || 'general';

    return {
      ...item,
      uid: item.uid || '',
      titulo: item.titulo || 'Notificación',
      mensaje: item.mensaje || '',
      tipo,
      leida: item.leida === true,
      eliminada: item.eliminada === true,
      activa: item.activa !== false,
      resuelta: item.resuelta === true,
      icono: this.obtenerIcono(tipo),
      claseIcono: this.obtenerClaseIcono(tipo),
      fechaTexto: this.obtenerFechaTexto(item.creadoEn)
    };
  }

  private obtenerIcono(tipo: TipoNotificacionAdmin): string {
    const mapa: Record<TipoNotificacionAdmin, string> = {
      cambio_estado_trabajo: 'sync-outline',
      trabajo_finalizado: 'checkmark-circle-outline',
      empleado_en_camino: 'bus-outline',
      stock_bajo: 'warning-outline',
      inicio_trabajo: 'navigate-outline',
      finalizacion_trabajo: 'checkmark-done-outline',
      devolucion_validada: 'return-up-back-outline',
      devolucion_realizada: 'return-up-back-outline',
      general: 'notifications-outline'
    };

    return mapa[tipo] || 'notifications-outline';
  }

  private obtenerClaseIcono(tipo: TipoNotificacionAdmin): string {
    const mapa: Record<TipoNotificacionAdmin, string> = {
      cambio_estado_trabajo: 'gris',
      trabajo_finalizado: 'success',
      empleado_en_camino: 'azul',
      stock_bajo: 'warning',
      inicio_trabajo: 'azul',
      finalizacion_trabajo: 'success',
      devolucion_validada: 'morado',
      devolucion_realizada: 'morado',
      general: 'gris'
    };

    return mapa[tipo] || 'gris';
  }

  private obtenerFechaTexto(fecha: any): string {
    if (!fecha) {
      return 'Sin fecha';
    }

    let date: Date | null = null;

    if (typeof fecha?.toDate === 'function') {
      date = fecha.toDate();
    } else if (fecha instanceof Date) {
      date = fecha;
    }

    if (!date) {
      return 'Fecha reciente';
    }

    const hoy = new Date();
    const ayer = new Date();
    ayer.setDate(hoy.getDate() - 1);

    const mismoDia =
      date.getFullYear() === hoy.getFullYear() &&
      date.getMonth() === hoy.getMonth() &&
      date.getDate() === hoy.getDate();

    const esAyer =
      date.getFullYear() === ayer.getFullYear() &&
      date.getMonth() === ayer.getMonth() &&
      date.getDate() === ayer.getDate();

    const hora = date.toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    if (mismoDia) {
      return `Hoy, ${hora}`;
    }

    if (esAyer) {
      return `Ayer, ${hora}`;
    }

    return date.toLocaleString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
}