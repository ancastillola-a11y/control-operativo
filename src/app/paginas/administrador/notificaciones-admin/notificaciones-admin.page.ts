// src/app/paginas/administrador/notificaciones-admin/notificaciones-admin.page.ts
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonicModule,
  ModalController,
  NavController,
  ToastController
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  busOutline,
  checkmarkCircleOutline,
  checkmarkDoneOutline,
  navigateOutline,
  notificationsOutline,
  radioButtonOffOutline,
  returnUpBackOutline,
  syncOutline,
  trashOutline,
  warningOutline
} from 'ionicons/icons';

import { DashboardAdminService } from '../../../procesos/dashboard-admin.service';
import { NotificacionService } from '../../../procesos/notificacion.service';

import {
  FiltroNotificacionAdmin,
  NotificacionAdminVista
} from '../../../modelos/notificacion';

import { AdminHeaderComponent } from '../../../shared/componentes/admin-header/admin-header.component';
import { AdminBottomNavComponent } from '../../../shared/componentes/admin-bottom-nav/admin-bottom-nav.component';
import { AdminEmptyStateComponent } from '../../../shared/componentes/admin-empty-state/admin-empty-state.component';
import { AdminConfirmModalComponent } from '../../../shared/componentes/admin-confirm-modal/admin-confirm-modal.component';

@Component({
  selector: 'app-notificaciones-admin',
  templateUrl: './notificaciones-admin.page.html',
  styleUrls: ['./notificaciones-admin.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    AdminHeaderComponent,
    AdminBottomNavComponent,
    AdminEmptyStateComponent
  ]
})
export class NotificacionesAdminPage {
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private modalCtrl = inject(ModalController);
  private cdr = inject(ChangeDetectorRef);

  private dashboardAdminService = inject(DashboardAdminService);
  private notificacionService = inject(NotificacionService);

  adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
  vm$ = this.notificacionService.vm$;

  constructor() {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'bus-outline': busOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'checkmark-done-outline': checkmarkDoneOutline,
      'navigate-outline': navigateOutline,
      'notifications-outline': notificationsOutline,
      'radio-button-off-outline': radioButtonOffOutline,
      'return-up-back-outline': returnUpBackOutline,
      'sync-outline': syncOutline,
      'trash-outline': trashOutline,
      'warning-outline': warningOutline
    });
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  cambiarFiltro(filtro: FiltroNotificacionAdmin) {
    this.notificacionService.cambiarFiltro(filtro);
  }

  volver() {
    this.navCtrl.navigateRoot('/dashboard-admin', {
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
    this.mostrarToast('Ya estás en notificaciones.', 'primary');
  }

  abrirPerfil() {
    this.mostrarToast('Configuración de perfil próximamente.', 'primary');
  }

  async marcarTodas(notificaciones: NotificacionAdminVista[]) {
    try {
      await this.notificacionService.marcarTodasComoLeidas(notificaciones);

      await this.mostrarToast(
        'Todas las notificaciones fueron marcadas como leídas.',
        'success'
      );
    } catch (error) {
      console.error('[NotificacionesAdminPage] Error al marcar todas:', error);

      await this.mostrarToast(
        'No se pudieron actualizar las notificaciones.',
        'danger'
      );
    }
  }

  async abrirNotificacion(item: NotificacionAdminVista) {
    try {
      const ruta = this.obtenerRutaModulo(item);

      if (ruta) {
        await this.navCtrl.navigateRoot(ruta, {
          animated: false,
          replaceUrl: true
        });

        if (!item.leida && item.uid) {
          this.notificacionService.marcarComoLeida(item.uid).catch((error) => {
            console.warn(
              '[NotificacionesAdminPage] No se pudo marcar como leída después de navegar:',
              error
            );
          });
        }

        return;
      }

      if (!item.leida && item.uid) {
        await this.notificacionService.marcarComoLeida(item.uid);
      }

      await this.mostrarToast(
        item.detalle || item.mensaje || 'Notificación revisada.',
        'primary'
      );
    } catch (error) {
      console.error('[NotificacionesAdminPage] Error al abrir notificación:', error);

      await this.mostrarToast(
        'No se pudo abrir la notificación.',
        'danger'
      );
    }
  }

  async cambiarEstadoLectura(item: NotificacionAdminVista) {
    if (item.leida) {
      await this.marcarNoVista(item);
      return;
    }

    await this.marcarVista(item);
  }

  async marcarVista(item: NotificacionAdminVista) {
    try {
      await this.notificacionService.marcarComoLeida(item.uid);

      await this.mostrarToast(
        'Notificación marcada como vista.',
        'success'
      );
    } catch (error) {
      console.error('[NotificacionesAdminPage] Error al marcar vista:', error);

      await this.mostrarToast(
        'No se pudo actualizar la notificación.',
        'danger'
      );
    }
  }

  async marcarNoVista(item: NotificacionAdminVista) {
    try {
      await this.notificacionService.marcarComoNoLeida(item.uid);

      await this.mostrarToast(
        'Notificación marcada como no leída.',
        'success'
      );
    } catch (error) {
      console.error('[NotificacionesAdminPage] Error al marcar no vista:', error);

      await this.mostrarToast(
        'No se pudo actualizar la notificación.',
        'danger'
      );
    }
  }

  async confirmarEliminar(item: NotificacionAdminVista) {
    const confirmado = await this.abrirConfirmacion({
      tipo: 'danger',
      icono: 'trash-outline',
      titulo: 'Eliminar notificación',
      mensaje: '¿Deseas ocultar esta notificación de la lista?',
      detalle: 'Esta acción no eliminará el registro operativo relacionado.',
      textoCancelar: 'Cancelar',
      textoConfirmar: 'Eliminar'
    });

    if (!confirmado) {
      return;
    }

    await this.eliminar(item);
  }

  private async eliminar(item: NotificacionAdminVista) {
    try {
      await this.notificacionService.eliminarNotificacion(item.uid);

      await this.mostrarToast(
        'Notificación eliminada de la vista.',
        'success'
      );
    } catch (error) {
      console.error('[NotificacionesAdminPage] Error al eliminar:', error);

      await this.mostrarToast(
        'No se pudo eliminar la notificación.',
        'danger'
      );
    }
  }

  obtenerIconoSeguro(item: NotificacionAdminVista | null): string {
    if (!item) {
      return 'notifications-outline';
    }

    return item.icono || this.obtenerIconoPorTipo(String(item.tipo || 'general'));
  }

  obtenerClaseIconoSeguro(item: NotificacionAdminVista | null): string {
    if (!item) {
      return 'gris';
    }

    return item.claseIcono || this.obtenerClasePorTipo(String(item.tipo || 'general'));
  }

  trackByNotificacion(
    index: number,
    item: NotificacionAdminVista
  ): string {
    return item.uid || String(index);
  }

  private obtenerRutaModulo(item: NotificacionAdminVista): string {
    const rutaOriginal = String(item.ruta || '').trim();

    if (rutaOriginal) {
      return this.normalizarRuta(rutaOriginal);
    }

    const tipo = String(item.tipo || '').trim();

    const rutasPorTipo: Record<string, string> = {
      stock_bajo: '/materiales',

      devolucion_validada: '/devoluciones',
      devolucion_realizada: '/devoluciones',

      cambio_estado_trabajo: '/seguimiento-trabajos',
      trabajo_finalizado: '/seguimiento-trabajos',
      inicio_trabajo: '/seguimiento-trabajos',
      finalizacion_trabajo: '/seguimiento-trabajos',

      empleado_en_camino: '/gps'
    };

    return rutasPorTipo[tipo] || '';
  }

  private normalizarRuta(ruta: string): string {
    const valor = String(ruta || '').trim();

    const rutas: Record<string, string> = {
      '/materiales': '/materiales',
      'materiales': '/materiales',

      '/devoluciones': '/devoluciones',
      'devoluciones': '/devoluciones',

      '/gps': '/gps',
      'gps': '/gps',
      '/gps-admin': '/gps',
      'gps-admin': '/gps',

      '/asignacion-trabajos': '/asignacion-trabajos',
      'asignacion-trabajos': '/asignacion-trabajos',
      '/trabajos': '/asignacion-trabajos',
      'trabajos': '/asignacion-trabajos',

      '/codigos-seguridad': '/codigos-seguridad',
      'codigos-seguridad': '/codigos-seguridad',

      '/seguimiento-trabajos': '/seguimiento-trabajos',
      'seguimiento-trabajos': '/seguimiento-trabajos',

      '/dashboard-admin': '/dashboard-admin',
      'dashboard-admin': '/dashboard-admin',

      '/mas-admin': '/mas-admin',
      'mas-admin': '/mas-admin',

      '/notificaciones-admin': '/notificaciones-admin',
      'notificaciones-admin': '/notificaciones-admin',

      '/empleados': '/empleados',
      'empleados': '/empleados'
    };

    return rutas[valor] || '';
  }

  private obtenerIconoPorTipo(tipo: string): string {
    const mapa: Record<string, string> = {
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

  private obtenerClasePorTipo(tipo: string): string {
    const mapa: Record<string, string> = {
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

  private async abrirConfirmacion(data: {
    tipo: 'danger' | 'warning' | 'success' | 'primary';
    icono: string;
    titulo: string;
    mensaje: string;
    detalle?: string;
    textoCancelar?: string;
    textoConfirmar?: string;
  }): Promise<boolean> {
    const modal = await this.modalCtrl.create({
      component: AdminConfirmModalComponent,
      cssClass: 'admin-confirm-modal',
      backdropDismiss: true,
      componentProps: {
        tipo: data.tipo,
        icono: data.icono,
        titulo: data.titulo,
        mensaje: data.mensaje,
        detalle: data.detalle || '',
        textoCancelar: data.textoCancelar || 'Cancelar',
        textoConfirmar: data.textoConfirmar || 'Confirmar'
      }
    });

    await modal.present();

    const { role } = await modal.onWillDismiss();

    return role === 'confirm';
  }

  private async mostrarToast(
    message: string,
    color: 'primary' | 'success' | 'danger'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2400,
      position: 'top',
      color
    });

    await toast.present();
  }
}