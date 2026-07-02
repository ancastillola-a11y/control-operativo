// src/app/paginas/administrador/gps-admin/gps-admin.page.ts
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonicModule,
  NavController,
  ToastController
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  locationOutline,
  mapOutline,
  navigateOutline,
  timeOutline
} from 'ionicons/icons';

import { DashboardAdminService } from '../../../procesos/dashboard-admin.service';
import { GpsService } from '../../../procesos/gps.service';

import { GpsUbicacionActual } from '../../../modelos/gps';

import { AdminHeaderComponent } from '../../../shared/componentes/admin-header/admin-header.component';
import { AdminBottomNavComponent } from '../../../shared/componentes/admin-bottom-nav/admin-bottom-nav.component';
import { GpsLiveMapComponent } from '../../../shared/componentes/gps-live-map/gps-live-map.component';

@Component({
  selector: 'app-gps-admin',
  templateUrl: './gps-admin.page.html',
  styleUrls: ['./gps-admin.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    AdminHeaderComponent,
    AdminBottomNavComponent,
    GpsLiveMapComponent
  ]
})
export class GpsAdminPage {
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private cdr = inject(ChangeDetectorRef);

  private dashboardAdminService = inject(DashboardAdminService);
  private gpsService = inject(GpsService);

  adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
  vm$ = this.gpsService.vmAdmin$;

  constructor() {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'location-outline': locationOutline,
      'map-outline': mapOutline,
      'navigate-outline': navigateOutline,
      'time-outline': timeOutline
    });
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.cdr.detectChanges();
      window.dispatchEvent(new Event('resize'));
    }, 150);
  }

  cambiarEmpleado(empleadoUid: string) {
    this.gpsService.cambiarEmpleadoSeleccionado(empleadoUid);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
  }

  volver() {
    this.navCtrl.navigateRoot('/mas-admin', {
      animated: false,
      replaceUrl: true
    });
  }

  abrirMenu() {
    this.navCtrl.navigateRoot('/dashboard-admin', {
      animated: false,
      replaceUrl: true
    });
  }

  abrirNotificaciones() {
    this.navCtrl.navigateRoot('/notificaciones-admin', {
      animated: false,
      replaceUrl: true
    });
  }

  abrirPerfil() {
    this.mostrarToast('Configuración de perfil próximamente.');
  }

  obtenerHoraTexto(ubicacion: GpsUbicacionActual | null): string {
    if (!ubicacion?.actualizadoEn) {
      return 'Sin actualización';
    }

    let fecha: Date | null = null;

    if (typeof ubicacion.actualizadoEn?.toDate === 'function') {
      fecha = ubicacion.actualizadoEn.toDate();
    } else if (ubicacion.actualizadoEn instanceof Date) {
      fecha = ubicacion.actualizadoEn;
    }

    if (!fecha) {
      return 'Actualizado recientemente';
    }

    return fecha.toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  obtenerEstadoTexto(ubicacion: GpsUbicacionActual | null): string {
    const estado = ubicacion?.estado || 'sin_senal';

    if (estado === 'activo') {
      return 'Activo';
    }

    if (estado === 'en_camino') {
      return 'En camino';
    }

    if (estado === 'sin_senal') {
      return 'Sin señal';
    }

    return 'Inactivo';
  }

  tieneRuta(ubicacion: GpsUbicacionActual | null): boolean {
    return Array.isArray(ubicacion?.ruta) && ubicacion!.ruta!.length > 1;
  }

  obtenerDistanciaTexto(ubicacion: GpsUbicacionActual | null): string {
    const distancia = Number(ubicacion?.distanciaRestanteKm || 0);

    if (!distancia) {
      return 'Sin distancia';
    }

    return `${distancia.toFixed(2)} km`;
  }

  obtenerTiempoTexto(ubicacion: GpsUbicacionActual | null): string {
    const minutos = Number(ubicacion?.tiempoEstimadoMin || 0);

    if (!minutos) {
      return 'Sin ETA';
    }

    return `${minutos} min aprox.`;
  }

  obtenerVelocidadTexto(ubicacion: GpsUbicacionActual | null): string {
    const velocidad = Number(ubicacion?.velocidadKmh || 0);

    if (!velocidad) {
      return 'Sin velocidad';
    }

    return `${velocidad.toFixed(1)} km/h`;
  }

  abrirRutaGoogleMaps(ubicacion: GpsUbicacionActual | null) {
    if (!ubicacion) {
      this.mostrarToast('No hay ubicación GPS activa.');
      return;
    }

    const origenLatitud = Number(ubicacion.latitud || 0);
    const origenLongitud = Number(ubicacion.longitud || 0);

    const destino = this.obtenerDestinoRuta(ubicacion);

    if (!origenLatitud || !origenLongitud || !destino) {
      this.mostrarToast('No hay ruta disponible para abrir.');
      return;
    }

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origenLatitud},${origenLongitud}&destination=${destino.latitud},${destino.longitud}&travelmode=driving`;

    window.open(url, '_blank');
  }

  private obtenerDestinoRuta(
    ubicacion: GpsUbicacionActual
  ): { latitud: number; longitud: number } | null {
    if (!ubicacion.ruta || ubicacion.ruta.length < 2) {
      return null;
    }

    const destino = ubicacion.ruta[ubicacion.ruta.length - 1];

    const latitud = Number(destino.latitud || 0);
    const longitud = Number(destino.longitud || 0);

    if (!latitud || !longitud) {
      return null;
    }

    return {
      latitud,
      longitud
    };
  }

  private async mostrarToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2200,
      position: 'top',
      color: 'primary'
    });

    await toast.present();
  }
}