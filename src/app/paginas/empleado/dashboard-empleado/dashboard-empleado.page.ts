// src/app/paginas/empleado/dashboard-empleado/dashboard-empleado.page.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonicModule,
  NavController,
  ToastController,
  AlertController
} from '@ionic/angular';

import {
  Auth,
  signOut
} from '@angular/fire/auth';

import { addIcons } from 'ionicons';

import {
  alertCircleOutline,
  briefcaseOutline,
  calendarOutline,
  callOutline,
  cashOutline,
  checkmarkCircleOutline,
  checkmarkDoneOutline,
  clipboardOutline,
  constructOutline,
  cubeOutline,
  documentTextOutline,
  locateOutline,
  locationOutline,
  logOutOutline,
  mapOutline,
  navigateOutline,
  pinOutline,
  playCircleOutline,
  radioOutline,
  refreshOutline,
  stopCircleOutline,
  timeOutline
} from 'ionicons/icons';

import { DashboardEmpleadoService } from '../../../procesos/dashboard-empleado.service';
import { GpsEmpleadoService } from '../../../procesos/gps-empleado.service';

import {
  DashboardEmpleadoUsuario,
  DashboardTrabajoEmpleado
} from '../../../modelos/dashboard-empleado';

import { AdminModuleHeroComponent } from '../../../shared/componentes/admin-module-hero/admin-module-hero.component';
import { AdminSummaryCardComponent } from '../../../shared/componentes/admin-summary-card/admin-summary-card.component';
import { AdminEmptyStateComponent } from '../../../shared/componentes/admin-empty-state/admin-empty-state.component';

@Component({
  selector: 'app-dashboard-empleado',
  templateUrl: './dashboard-empleado.page.html',
  styleUrls: ['./dashboard-empleado.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    AdminModuleHeroComponent,
    AdminSummaryCardComponent,
    AdminEmptyStateComponent
  ]
})
export class DashboardEmpleadoPage {
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController);
  private auth = inject(Auth);

  private dashboardEmpleadoService = inject(DashboardEmpleadoService);
  private gpsEmpleadoService = inject(GpsEmpleadoService);

  vm$ = this.dashboardEmpleadoService.obtenerDashboardEmpleado$();

  gpsActivo$ = this.gpsEmpleadoService.activo$;
  gpsEstadoTexto$ = this.gpsEmpleadoService.estadoTexto$;

  constructor() {
    addIcons({
      'alert-circle-outline': alertCircleOutline,
      'briefcase-outline': briefcaseOutline,
      'calendar-outline': calendarOutline,
      'call-outline': callOutline,
      'cash-outline': cashOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'checkmark-done-outline': checkmarkDoneOutline,
      'clipboard-outline': clipboardOutline,
      'construct-outline': constructOutline,
      'cube-outline': cubeOutline,
      'document-text-outline': documentTextOutline,
      'locate-outline': locateOutline,
      'location-outline': locationOutline,
      'log-out-outline': logOutOutline,
      'map-outline': mapOutline,
      'navigate-outline': navigateOutline,
      'pin-outline': pinOutline,
      'play-circle-outline': playCircleOutline,
      'radio-outline': radioOutline,
      'refresh-outline': refreshOutline,
      'stop-circle-outline': stopCircleOutline,
      'time-outline': timeOutline
    });
  }

  puedeMarcarEnCamino(trabajo: DashboardTrabajoEmpleado): boolean {
    return trabajo.puedeMarcarEnCamino === true;
  }

  puedeIniciar(trabajo: DashboardTrabajoEmpleado): boolean {
    return trabajo.puedeIniciar === true;
  }

  puedeFinalizar(trabajo: DashboardTrabajoEmpleado): boolean {
    return trabajo.puedeFinalizar === true;
  }

 async activarGps(
  empleado: DashboardEmpleadoUsuario,
  trabajo: DashboardTrabajoEmpleado | null
) {
  try {
    const confirmado = await this.confirmarActivacionGps();

    if (!confirmado) {
      return;
    }

    await this.gpsEmpleadoService.activarSeguimiento(
      empleado,
      trabajo
    );

    await this.mostrarToast(
      'GPS activado. El administrador ya puede ver tu ubicación.',
      'success'
    );
  } catch (error) {
    console.error('[DashboardEmpleadoPage] Error activando GPS:', error);
    await this.mostrarToast(this.obtenerMensajeErrorGps(error), 'danger');
  }
}
  async desactivarGps() {
    this.gpsEmpleadoService.desactivarSeguimiento();
    await this.mostrarToast('GPS desactivado.', 'primary');
  }

  abrirRutaTrabajo(trabajo: DashboardTrabajoEmpleado | null) {
    if (!trabajo) {
      this.mostrarToast('No tienes un trabajo seleccionado.', 'primary');
      return;
    }

    const url = this.gpsEmpleadoService.obtenerUrlRutaGoogleMaps(trabajo);
    window.open(url, '_blank');
  }

  async marcarEnCamino(
    trabajo: DashboardTrabajoEmpleado,
    empleado: DashboardEmpleadoUsuario
  ) {
    try {
      await this.dashboardEmpleadoService.marcarEnCamino(
        trabajo,
        empleado
      );

      await this.mostrarToast('Trabajo marcado como en camino.', 'success');
    } catch (error) {
      console.error('[DashboardEmpleadoPage] Error marcando en camino:', error);
      await this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    }
  }

  async iniciarTrabajo(
    trabajo: DashboardTrabajoEmpleado,
    empleado: DashboardEmpleadoUsuario
  ) {
    try {
      await this.dashboardEmpleadoService.iniciarTrabajo(
        trabajo,
        empleado
      );

      await this.mostrarToast('Trabajo iniciado correctamente.', 'success');
    } catch (error) {
      console.error('[DashboardEmpleadoPage] Error iniciando trabajo:', error);
      await this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    }
  }

  async finalizarTrabajo(
    trabajo: DashboardTrabajoEmpleado,
    empleado: DashboardEmpleadoUsuario
  ) {
    try {
      await this.dashboardEmpleadoService.finalizarTrabajo(
        trabajo,
        empleado
      );

      await this.mostrarToast('Trabajo finalizado correctamente.', 'success');
    } catch (error) {
      console.error('[DashboardEmpleadoPage] Error finalizando trabajo:', error);
      await this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    }
  }

  llamarCliente(trabajo: DashboardTrabajoEmpleado) {
    const telefono = String(trabajo.clienteTelefono || '').trim();

    if (!telefono) {
      this.mostrarToast('Este trabajo no tiene teléfono registrado.', 'primary');
      return;
    }

    window.open(`tel:${telefono}`, '_self');
  }

  abrirMapa(trabajo: DashboardTrabajoEmpleado) {
    const latitud = Number(trabajo.latitud || 0);
    const longitud = Number(trabajo.longitud || 0);

    if (latitud && longitud) {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitud},${longitud}`;
      window.open(url, '_blank');
      return;
    }

    const direccion = String(
      trabajo.direccionMapa ||
        trabajo.direccion ||
        trabajo.ubicacionTextoOriginal ||
        ''
    ).trim();

    if (!direccion) {
      this.mostrarToast('Este trabajo no tiene ubicación registrada.', 'primary');
      return;
    }

    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;

    window.open(url, '_blank');
  }

  async refrescar(event: any) {
    setTimeout(() => {
      event?.target?.complete?.();
    }, 500);
  }

  async cerrarSesion() {
    try {
      this.gpsEmpleadoService.desactivarSeguimiento();

      await signOut(this.auth);

      await this.navCtrl.navigateRoot('/seleccion-usuario', {
        animated: false,
        replaceUrl: true
      });

    } catch (error) {
      console.error('[DashboardEmpleadoPage] Error al cerrar sesión:', error);
      await this.mostrarToast('No se pudo cerrar sesión.', 'danger');
    }
  }

  trackByTrabajo(
    index: number,
    trabajo: DashboardTrabajoEmpleado
  ): string {
    return trabajo.uid || trabajo.id || String(index);
  }
private async confirmarActivacionGps(): Promise<boolean> {
  const alert = await this.alertCtrl.create({
    header: 'Activar ubicación',
    message:
      'Para que el administrador vea tu ubicación y la ruta hacia el trabajo, debes permitir el acceso al GPS del celular.',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Continuar',
        role: 'confirm'
      }
    ]
  });

  await alert.present();

  const { role } = await alert.onWillDismiss();

  return role === 'confirm';
}
 private obtenerMensajeErrorGps(error: any): string {
  const code = String(error?.code || error?.message || error || '');

  if (code.includes('gps-contexto-no-seguro')) {
    return 'Abre la app con HTTPS. En http://192.168.x.x Chrome bloquea el GPS.';
  }

  if (code.includes('empleado-sin-acceso')) {
    return 'Tu usuario no tiene acceso operativo habilitado.';
  }

  if (code.includes('gps-permiso-denegado')) {
    return 'El navegador tiene bloqueada la ubicación. Restablece el permiso de ubicación para esta página.';
  }

  if (code.includes('gps-no-disponible')) {
    return 'El celular no pudo entregar ubicación. Activa ubicación y precisión alta.';
  }

  if (code.includes('gps-tiempo-agotado')) {
    return 'El GPS tardó demasiado. Intenta nuevamente al aire libre.';
  }

  if (code.includes('gps-no-soportado')) {
    return 'Este dispositivo no soporta GPS desde el navegador.';
  }

  if (code.includes('permission-denied')) {
    return 'Firestore no permitió guardar la ubicación.';
  }

  return 'No se pudo activar el GPS.';
}
  private obtenerMensajeError(error: any): string {
    const code = String(error?.code || error?.message || error || '');

    if (code.includes('empleado-sin-acceso')) {
      return 'Tu usuario no tiene acceso operativo habilitado.';
    }

    if (code.includes('empleado-sin-uid')) {
      return 'No se encontró el UID del empleado.';
    }

    if (code.includes('trabajo-no-pendiente')) {
      return 'Solo puedes marcar en camino un trabajo pendiente.';
    }

    if (code.includes('trabajo-no-en-camino')) {
      return 'Primero marca el trabajo como en camino.';
    }

    if (code.includes('trabajo-no-en-proceso')) {
      return 'Solo puedes finalizar un trabajo en proceso.';
    }

    if (code.includes('permission-denied')) {
      return 'No tienes permisos para actualizar este trabajo.';
    }

    return 'No se pudo completar la operación.';
  }

  private async mostrarToast(
    message: string,
    color: 'primary' | 'success' | 'danger' = 'primary'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2600,
      position: 'top',
      color
    });

    await toast.present();
  }
}