// src/app/paginas/administrador/devoluciones/devoluciones.page.ts
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AlertController,
  IonicModule,
  NavController,
  ToastController
} from '@ionic/angular';

import { DashboardAdminService } from '../../../procesos/dashboard-admin.service';
import { DevolucionService } from '../../../procesos/devolucion.service';

import {
  DevolucionTrabajoVista,
  FiltroDevolucion
} from '../../../modelos/devolucion';

import { AdminHeaderComponent } from '../../../shared/componentes/admin-header/admin-header.component';
import { AdminBottomNavComponent } from '../../../shared/componentes/admin-bottom-nav/admin-bottom-nav.component';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.page.html',
  styleUrls: ['./devoluciones.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    AdminHeaderComponent,
    AdminBottomNavComponent
  ]
})
export class DevolucionesPage {
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController);
  private cdr = inject(ChangeDetectorRef);

  private dashboardAdminService = inject(DashboardAdminService);
  private devolucionService = inject(DevolucionService);

  adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
  vm$ = this.devolucionService.vm$;

  ionViewWillEnter() {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  cambiarFiltro(filtro: FiltroDevolucion) {
    this.devolucionService.cambiarFiltro(filtro);
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
    this.mostrarToast('Configuración de perfil próximamente.', 'primary');
  }

  async verDetalle(item: DevolucionTrabajoVista) {
    const materialesTexto = item.materiales
      .map((material) =>
        `${material.nombre}: ${material.cantidadAsignada} ${material.unidad}`
      )
      .join('\n');

    const alert = await this.alertCtrl.create({
      header: item.codigoTrabajo,
      subHeader: item.tipoTrabajo,
      message: `
        Cliente: ${item.clienteNombre}
        <br>
        Empleado: ${item.empleadoTexto}
        <br><br>
        Materiales:
        <br>
        ${materialesTexto.replace(/\n/g, '<br>')}
      `,
      buttons: ['Cerrar']
    });

    await alert.present();
  }

  async validar(item: DevolucionTrabajoVista) {
    if (item.estadoDevolucion === 'validada') {
      this.mostrarToast('Esta devolución ya fue validada.', 'primary');
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Validar devolución',
      subHeader: item.codigoTrabajo,
      message: 'Ingrese el código de devolución para sumar los materiales al stock.',
      inputs: [
        {
          name: 'codigo',
          type: 'text',
          placeholder: 'Código de devolución'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Validar',
          handler: async (data) => {
            await this.confirmarValidacion(item, data.codigo);
          }
        }
      ]
    });

    await alert.present();
  }

  private async confirmarValidacion(
    item: DevolucionTrabajoVista,
    codigo: string
  ) {
    try {
      await this.devolucionService.validarDevolucion(
        item.uid,
        codigo
      );

      this.mostrarToast(
        'Devolución validada. El stock fue actualizado.',
        'success'
      );
    } catch (error: any) {
      console.error(error);
      this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    }
  }

  trackByDevolucion(
    index: number,
    item: DevolucionTrabajoVista
  ): string {
    return item.uid || String(index);
  }

  private obtenerMensajeError(error: any): string {
    const code = String(error?.message || error?.code || '');

    if (code.includes('codigo-devolucion-incorrecto')) {
      return 'El código de devolución es incorrecto.';
    }

    if (code.includes('codigo-devolucion-no-configurado')) {
      return 'Este trabajo no tiene código de devolución configurado.';
    }

    if (code.includes('devolucion-ya-validada')) {
      return 'Esta devolución ya fue validada.';
    }

    if (code.includes('sin-materiales-devolver')) {
      return 'Este trabajo no tiene materiales para devolver.';
    }

    if (code.includes('permission-denied')) {
      return 'No tiene permisos para validar la devolución.';
    }

    return 'No se pudo validar la devolución.';
  }

  private async mostrarToast(
    message: string,
    color: 'primary' | 'success' | 'danger'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'top',
      color
    });

    await toast.present();
  }
}