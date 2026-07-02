// src/app/procesos/gps-empleado.service.ts
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { GpsService } from './gps.service';

import {
  GpsPuntoRuta,
  GpsUbicacionActual
} from '../modelos/gps';

import {
  DashboardEmpleadoUsuario,
  DashboardTrabajoEmpleado
} from '../modelos/dashboard-empleado';

type EstadoPermisoGps = 'granted' | 'denied' | 'prompt' | 'unknown';

@Injectable({
  providedIn: 'root'
})
export class GpsEmpleadoService {
  private gpsService = inject(GpsService);

  private watchId: number | null = null;

  private ultimoEnvioMs = 0;
  private ultimaLatitud: number | null = null;
  private ultimaLongitud: number | null = null;

  private readonly intervaloMinimoMs = 10000;
  private readonly distanciaMinimaMetros = 8;

  private activoSubject = new BehaviorSubject<boolean>(false);
  private estadoTextoSubject = new BehaviorSubject<string>('GPS inactivo');

  activo$ = this.activoSubject.asObservable();
  estadoTexto$ = this.estadoTextoSubject.asObservable();

  async activarSeguimiento(
    empleado: DashboardEmpleadoUsuario,
    trabajo: DashboardTrabajoEmpleado | null
  ): Promise<void> {
    if (!empleado?.uid) {
      throw new Error('empleado-sin-uid');
    }

    if (!empleado.accesoValido) {
      throw new Error('empleado-sin-acceso');
    }

    /*
      En navegador:
      - localhost funciona.
      - http://192.168.x.x normalmente bloquea GPS.
      - HTTPS funciona.

      En APK real:
      esto ya no dependerá de Chrome.
    */
    if (typeof window !== 'undefined' && window.isSecureContext === false) {
      this.estadoTextoSubject.next('GPS bloqueado: abre la app con HTTPS');
      throw new Error('gps-contexto-no-seguro');
    }

    if (!('geolocation' in navigator)) {
      throw new Error('gps-no-soportado');
    }

    const permiso = await this.obtenerEstadoPermisoGps();

    if (permiso === 'denied') {
      this.estadoTextoSubject.next('GPS inactivo: permiso bloqueado en el navegador');
      throw new Error('gps-permiso-denegado');
    }

    if (this.watchId !== null) {
      this.estadoTextoSubject.next('GPS ya está activo');
      return;
    }

    try {
      this.estadoTextoSubject.next('Solicitando permiso de ubicación...');

      const posicionInicial = await this.obtenerPosicionActual();

      this.activoSubject.next(true);
      this.estadoTextoSubject.next('Enviando primera ubicación...');

      await this.procesarPosicion(
        posicionInicial,
        empleado,
        trabajo
      );

      this.watchId = navigator.geolocation.watchPosition(
        (posicion) => {
          void this.procesarPosicion(
            posicion,
            empleado,
            trabajo
          );
        },
        (error) => {
          console.error('[GpsEmpleadoService] Error GPS watch:', error);

          const mensaje = this.obtenerMensajeErrorGps(error);
          this.desactivarSeguimiento(mensaje);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 5000
        }
      );

      this.estadoTextoSubject.next('GPS activo y enviando ubicación');

    } catch (error) {
      console.error('[GpsEmpleadoService] Error activando GPS:', error);

      this.desactivarSeguimiento(
        this.obtenerMensajeErrorGeneral(error)
      );

      throw error;
    }
  }

  desactivarSeguimiento(
    mensaje = 'GPS inactivo'
  ): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }

    this.activoSubject.next(false);
    this.estadoTextoSubject.next(mensaje);
  }

  obtenerUrlRutaGoogleMaps(
    trabajo: DashboardTrabajoEmpleado | null
  ): string {
    if (!trabajo) {
      return 'https://www.google.com/maps';
    }

    const destinoLatitud = Number(trabajo.latitud || 0);
    const destinoLongitud = Number(trabajo.longitud || 0);

    if (this.ultimaLatitud && this.ultimaLongitud && destinoLatitud && destinoLongitud) {
      return `https://www.google.com/maps/dir/?api=1&origin=${this.ultimaLatitud},${this.ultimaLongitud}&destination=${destinoLatitud},${destinoLongitud}&travelmode=driving`;
    }

    if (destinoLatitud && destinoLongitud) {
      return `https://www.google.com/maps/search/?api=1&query=${destinoLatitud},${destinoLongitud}`;
    }

    const direccion = String(
      trabajo.direccionMapa ||
        trabajo.direccion ||
        trabajo.ubicacionTextoOriginal ||
        ''
    ).trim();

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
  }

  private async obtenerEstadoPermisoGps(): Promise<EstadoPermisoGps> {
    try {
      const permisos = (navigator as any).permissions;

      if (!permisos?.query) {
        return 'unknown';
      }

      const resultado = await permisos.query({
        name: 'geolocation'
      });

      const estado = String(resultado?.state || 'unknown');

      if (estado === 'granted' || estado === 'denied' || estado === 'prompt') {
        return estado;
      }

      return 'unknown';
    } catch {
      return 'unknown';
    }
  }

  private obtenerPosicionActual(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (posicion) => {
          resolve(posicion);
        },
        (error) => {
          reject(this.convertirErrorGps(error));
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 3000
        }
      );
    });
  }

  private async procesarPosicion(
    posicion: GeolocationPosition,
    empleado: DashboardEmpleadoUsuario,
    trabajo: DashboardTrabajoEmpleado | null
  ): Promise<void> {
    const latitud = Number(posicion.coords.latitude);
    const longitud = Number(posicion.coords.longitude);
    const precision = posicion.coords.accuracy ?? null;

    if (!this.esCoordenadaValida(latitud, longitud)) {
      throw new Error('gps-coordenada-invalida');
    }

    if (!this.debeEnviar(latitud, longitud)) {
      return;
    }

    const destinoLatitud = Number(trabajo?.latitud || 0);
    const destinoLongitud = Number(trabajo?.longitud || 0);

    const tieneDestino =
      this.esCoordenadaValida(destinoLatitud, destinoLongitud) &&
      destinoLatitud !== 0 &&
      destinoLongitud !== 0;

    const distanciaRestanteKm = tieneDestino
      ? this.calcularDistanciaKm(
          latitud,
          longitud,
          destinoLatitud,
          destinoLongitud
        )
      : null;

    const velocidadKmh = this.obtenerVelocidadKmh(posicion);

    const tiempoEstimadoMin = distanciaRestanteKm
      ? this.calcularTiempoEstimadoMin(
          distanciaRestanteKm,
          velocidadKmh
        )
      : null;

    const ruta = tieneDestino
      ? await this.obtenerRuta(
          latitud,
          longitud,
          destinoLatitud,
          destinoLongitud
        )
      : [
          {
            latitud,
            longitud
          }
        ];

    const payload: GpsUbicacionActual = {
      empleadoUid: empleado.uid,
      empleadoNombre: empleado.nombreCompleto,
      empleadoRol: empleado.cargoTexto || empleado.cargo || 'Personal operativo',
      empleadoFotoUrl: empleado.fotoUrl || '',

      trabajoUid: trabajo?.uid || '',
      trabajoCodigo: trabajo?.codigoTrabajo || '',
      trabajoTitulo: trabajo?.tipoTrabajo || trabajo?.clienteNombre || '',

      latitud,
      longitud,
      precision,

      velocidadKmh,
      distanciaRestanteKm,
      tiempoEstimadoMin,

      direccionTexto: trabajo?.direccionTexto || trabajo?.direccion || '',

      estado: trabajo?.estado === 'en_camino'
        ? 'en_camino'
        : 'activo',

      ruta
    };

    await this.gpsService.enviarUbicacionEmpleado(payload);

    this.ultimoEnvioMs = Date.now();
    this.ultimaLatitud = latitud;
    this.ultimaLongitud = longitud;

    this.activoSubject.next(true);
    this.estadoTextoSubject.next(
      `GPS activo · enviado ${new Date().toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })}`
    );
  }

  private debeEnviar(
    latitud: number,
    longitud: number
  ): boolean {
    const ahora = Date.now();

    if (!this.ultimaLatitud || !this.ultimaLongitud || !this.ultimoEnvioMs) {
      return true;
    }

    const pasaronMs = ahora - this.ultimoEnvioMs;

    const distanciaMetros = this.calcularDistanciaKm(
      this.ultimaLatitud,
      this.ultimaLongitud,
      latitud,
      longitud
    ) * 1000;

    return (
      pasaronMs >= this.intervaloMinimoMs ||
      distanciaMetros >= this.distanciaMinimaMetros
    );
  }

  private async obtenerRuta(
    origenLatitud: number,
    origenLongitud: number,
    destinoLatitud: number,
    destinoLongitud: number
  ): Promise<GpsPuntoRuta[]> {
    try {
      const url =
        `https://router.project-osrm.org/route/v1/driving/` +
        `${origenLongitud},${origenLatitud};${destinoLongitud},${destinoLatitud}` +
        `?overview=full&geometries=geojson`;

      const respuesta = await fetch(url);

      if (!respuesta.ok) {
        throw new Error('osrm-error');
      }

      const data = await respuesta.json();

      const coordenadas = data?.routes?.[0]?.geometry?.coordinates;

      if (!Array.isArray(coordenadas) || coordenadas.length < 2) {
        throw new Error('osrm-ruta-vacia');
      }

      return coordenadas.map((coordenada: number[]) => ({
        latitud: Number(coordenada[1]),
        longitud: Number(coordenada[0])
      }));

    } catch (error) {
      console.warn('[GpsEmpleadoService] Ruta OSRM no disponible. Usando línea directa:', error);

      return [
        {
          latitud: origenLatitud,
          longitud: origenLongitud
        },
        {
          latitud: destinoLatitud,
          longitud: destinoLongitud
        }
      ];
    }
  }

  private convertirErrorGps(
    error: GeolocationPositionError
  ): Error {
    if (error.code === error.PERMISSION_DENIED) {
      return new Error('gps-permiso-denegado');
    }

    if (error.code === error.POSITION_UNAVAILABLE) {
      return new Error('gps-no-disponible');
    }

    if (error.code === error.TIMEOUT) {
      return new Error('gps-tiempo-agotado');
    }

    return new Error('gps-error-desconocido');
  }

  private obtenerMensajeErrorGps(
    error: GeolocationPositionError
  ): string {
    if (error.code === error.PERMISSION_DENIED) {
      return 'GPS inactivo: permiso denegado';
    }

    if (error.code === error.POSITION_UNAVAILABLE) {
      return 'GPS inactivo: ubicación no disponible';
    }

    if (error.code === error.TIMEOUT) {
      return 'GPS inactivo: tiempo agotado';
    }

    return 'GPS inactivo: error del dispositivo';
  }

  private obtenerMensajeErrorGeneral(error: any): string {
    const code = String(error?.message || error?.code || error || '');

    if (code.includes('gps-contexto-no-seguro')) {
      return 'GPS bloqueado: abre la app con HTTPS';
    }

    if (code.includes('gps-permiso-denegado')) {
      return 'GPS inactivo: permiso denegado';
    }

    if (code.includes('gps-no-disponible')) {
      return 'GPS inactivo: ubicación no disponible';
    }

    if (code.includes('gps-tiempo-agotado')) {
      return 'GPS inactivo: tiempo agotado';
    }

    if (code.includes('permission-denied')) {
      return 'GPS inactivo: Firestore rechazó el guardado';
    }

    return 'GPS inactivo';
  }

  private obtenerVelocidadKmh(
    posicion: GeolocationPosition
  ): number | null {
    const velocidadMs = posicion.coords.speed;

    if (velocidadMs === null || velocidadMs === undefined) {
      return null;
    }

    const velocidad = Number(velocidadMs) * 3.6;

    if (!Number.isFinite(velocidad) || velocidad < 0) {
      return null;
    }

    return Number(velocidad.toFixed(1));
  }

  private calcularTiempoEstimadoMin(
    distanciaKm: number,
    velocidadKmh: number | null
  ): number | null {
    if (!distanciaKm || distanciaKm <= 0) {
      return null;
    }

    const velocidadBase = velocidadKmh && velocidadKmh > 5
      ? velocidadKmh
      : 25;

    return Math.max(
      1,
      Math.round((distanciaKm / velocidadBase) * 60)
    );
  }

  private calcularDistanciaKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    if (!this.esCoordenadaValida(lat1, lon1) || !this.esCoordenadaValida(lat2, lon2)) {
      return 0;
    }

    const radioTierraKm = 6371;

    const dLat = this.gradosARadianes(lat2 - lat1);
    const dLon = this.gradosARadianes(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.gradosARadianes(lat1)) *
        Math.cos(this.gradosARadianes(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

    return Number((radioTierraKm * c).toFixed(2));
  }

  private gradosARadianes(valor: number): number {
    return valor * Math.PI / 180;
  }

  private esCoordenadaValida(
    latitud: number,
    longitud: number
  ): boolean {
    return (
      typeof latitud === 'number' &&
      typeof longitud === 'number' &&
      Number.isFinite(latitud) &&
      Number.isFinite(longitud) &&
      latitud >= -90 &&
      latitud <= 90 &&
      longitud >= -180 &&
      longitud <= 180
    );
  }
}