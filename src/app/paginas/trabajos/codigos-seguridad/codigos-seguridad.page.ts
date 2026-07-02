// src/app/paginas/trabajos/codigos-seguridad/codigos-seguridad.page.ts
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlertController,
  IonicModule,
  NavController,
  ToastController
} from '@ionic/angular';

import { ActivatedRoute } from '@angular/router';

import { CodigoSeguridadService } from '../../../procesos/codigo-seguridad.service';
import { DashboardAdminService } from '../../../procesos/dashboard-admin.service';

import {
  CodigoTrabajoVista,
  TipoCodigoSeguridad
} from '../../../modelos/codigo-seguridad';

import { AdminHeaderComponent } from '../../../shared/componentes/admin-header/admin-header.component';
import { AdminBottomNavComponent } from '../../../shared/componentes/admin-bottom-nav/admin-bottom-nav.component';
import { CodigoSeguridadCardComponent } from '../../../shared/componentes/codigo-seguridad-card/codigo-seguridad-card.component';

@Component({
  selector: 'app-codigos-seguridad',
  templateUrl: './codigos-seguridad.page.html',
  styleUrls: ['./codigos-seguridad.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    AdminHeaderComponent,
    AdminBottomNavComponent,
    CodigoSeguridadCardComponent
  ]
})
export class CodigosSeguridadPage {
  private codigoService = inject(CodigoSeguridadService);
  private dashboardAdminService = inject(DashboardAdminService);
  private route = inject(ActivatedRoute);

  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController);
  private cdr = inject(ChangeDetectorRef);

  vm$ = this.codigoService.vm$;
  adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();

  ionViewWillEnter() {
    const trabajoUid = this.route.snapshot.queryParamMap.get('trabajoUid');

    this.codigoService.cargarTrabajos(trabajoUid);

    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  ionViewWillLeave() {
    this.codigoService.detenerEscucha();
  }

  cambiarTrabajo(event: any) {
    const uid = String(event?.detail?.value || '').trim();

    if (!uid) {
      return;
    }

    this.codigoService.seleccionarTrabajo(uid);
  }

  cambiarTab(tab: TipoCodigoSeguridad) {
    this.codigoService.cambiarTab(tab);
  }

  async copiarCodigo(codigo: string) {
    const limpio = String(codigo || '').trim();

    if (!/^\d{6}$/.test(limpio)) {
      this.mostrarToast('No hay un código válido para copiar.', 'danger');
      return;
    }

    try {
      await navigator.clipboard.writeText(limpio);
      this.mostrarToast('Código copiado correctamente.', 'success');
    } catch (error) {
      console.error(error);
      this.mostrarToast(`Código: ${limpio}`, 'primary');
    }
  }

  async confirmarRegenerar(
    tipo: TipoCodigoSeguridad,
    trabajo: CodigoTrabajoVista | null
  ) {
    if (!trabajo) {
      this.mostrarToast('Seleccione un trabajo.', 'danger');
      return;
    }

    const titulo = tipo === 'cliente'
      ? 'Generar nuevo código de cliente'
      : 'Generar nuevo código de devolución';

    const mensaje = tipo === 'cliente'
      ? 'El código anterior dejará de ser válido para la validación del cliente.'
      : 'El código anterior dejará de ser válido para la devolución de materiales.';

    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Generar',
          role: 'confirm',
          handler: async () => {
            await this.regenerarCodigo(tipo);
          }
        }
      ]
    });

    await alert.present();
  }

  private async regenerarCodigo(tipo: TipoCodigoSeguridad) {
    try {
      if (tipo === 'cliente') {
        await this.codigoService.regenerarCodigoCliente();
        this.mostrarToast('Código de cliente actualizado.', 'success');
        return;
      }

      await this.codigoService.regenerarCodigoDevolucion();
      this.mostrarToast('Código de devolución actualizado.', 'success');
    } catch (error: any) {
      console.error(error);
      this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    }
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
    this.mostrarToast('Configuración de perfil próximamente.', 'primary');
  }

  irAtras() {
    const trabajoUid = this.route.snapshot.queryParamMap.get('trabajoUid');

    if (trabajoUid) {
      this.navCtrl.navigateBack('/asignacion-trabajos', {
        animated: false,
replaceUrl: true
      });
      return;
    }

    this.navCtrl.navigateBack('/mas-admin', {
      animated: false,
replaceUrl: true
    });
  }

  irTrabajos() {
   this.navCtrl.navigateRoot('/asignacion-trabajos', {
  animated: false,
  replaceUrl: true
});
  }

  private obtenerMensajeError(error: any): string {
    const code = String(error?.message || error?.code || '');

    if (code.includes('trabajo-no-seleccionado')) {
      return 'Seleccione un trabajo.';
    }

    if (code.includes('trabajo-eliminado')) {
      return 'No se puede generar código para un trabajo eliminado.';
    }

    if (code.includes('permission-denied')) {
      return 'No tiene permisos para realizar esta acción.';
    }

    return 'No se pudo completar la operación.';
  }

  private async mostrarToast(
    message: string,
    color: 'success' | 'danger' | 'primary'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2300,
      position: 'top',
      color
    });

    await toast.present();
  }
}

