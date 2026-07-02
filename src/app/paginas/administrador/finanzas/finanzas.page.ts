// src/app/paginas/administrador/finanzas/finanzas.page.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonicModule,
  ModalController,
  NavController,
  ToastController
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  walletOutline,
  receiptOutline,
  peopleOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
  addOutline,
  cashOutline,
  timeOutline,
  ellipsisVerticalOutline,
  banOutline
} from 'ionicons/icons';

import { DashboardAdminService } from '../../../procesos/dashboard-admin.service';
import { FinanzasService } from '../../../procesos/finanzas.service';

import {
  CrearMovimientoFinancieroData,
  MovimientoFinancieroVista
} from '../../../modelos/finanzas';

import { AdminHeaderComponent } from '../../../shared/componentes/admin-header/admin-header.component';
import { AdminBottomNavComponent } from '../../../shared/componentes/admin-bottom-nav/admin-bottom-nav.component';
import { AdminModuleHeroComponent } from '../../../shared/componentes/admin-module-hero/admin-module-hero.component';
import { AdminSummaryCardComponent } from '../../../shared/componentes/admin-summary-card/admin-summary-card.component';
import { AdminSearchFilterComponent } from '../../../shared/componentes/admin-search-filter/admin-search-filter.component';
import { AdminEmptyStateComponent } from '../../../shared/componentes/admin-empty-state/admin-empty-state.component';
import { AdminPaginationComponent } from '../../../shared/componentes/admin-pagination/admin-pagination.component';
import { AdminConfirmModalComponent } from '../../../shared/componentes/admin-confirm-modal/admin-confirm-modal.component';

import { FinanzaFormModalComponent } from '../../../shared/componentes/finanza-form-modal/finanza-form-modal.component';

import {
  AccionFinanza,
  FinanzaAccionesModalComponent
} from '../../../shared/componentes/finanza-acciones-modal/finanza-acciones-modal.component';

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.page.html',
  styleUrls: ['./finanzas.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    AdminHeaderComponent,
    AdminBottomNavComponent,
    AdminModuleHeroComponent,
    AdminSummaryCardComponent,
    AdminSearchFilterComponent,
    AdminEmptyStateComponent,
    AdminPaginationComponent
  ]
})
export class FinanzasPage {
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private modalCtrl = inject(ModalController);

  private dashboardAdminService = inject(DashboardAdminService);
  private finanzasService = inject(FinanzasService);

  adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
  vm$ = this.finanzasService.obtenerFinanzas$();

  constructor() {
    addIcons({
      'wallet-outline': walletOutline,
      'receipt-outline': receiptOutline,
      'people-outline': peopleOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'alert-circle-outline': alertCircleOutline,
      'add-outline': addOutline,
      'cash-outline': cashOutline,
      'time-outline': timeOutline,
      'ellipsis-vertical-outline': ellipsisVerticalOutline,
      'ban-outline': banOutline
    });
  }

  buscarFinanza(texto: string) {
    this.finanzasService.buscar(texto);
  }

  abrirFiltro() {
    this.finanzasService.cambiarFiltro();
  }

  paginaAnterior() {
    this.finanzasService.paginaAnterior();
  }

  paginaSiguiente(totalPaginas: number) {
    this.finanzasService.paginaSiguiente(totalPaginas);
  }

  irPagina(pagina: number) {
    this.finanzasService.irPagina(pagina);
  }

  async nuevoMovimiento() {
    const modal = await this.modalCtrl.create({
      component: FinanzaFormModalComponent,
      cssClass: 'finanza-form-modal-full',
      backdropDismiss: false,
      handle: false,
      breakpoints: [0, 1],
      initialBreakpoint: 1
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      await this.guardarMovimiento(data);
    }
  }

  private async guardarMovimiento(data: CrearMovimientoFinancieroData) {
    try {
      await this.finanzasService.crearMovimiento(data);
      await this.mostrarToast('Movimiento financiero registrado.', 'success');
    } catch (error) {
      console.error('[FinanzasPage] Error guardando movimiento:', error);
      await this.mostrarToast('No se pudo registrar el movimiento.', 'danger');
    }
  }

  async abrirAcciones(movimiento: MovimientoFinancieroVista) {
    const modal = await this.modalCtrl.create({
      component: FinanzaAccionesModalComponent,
      cssClass: 'finanza-acciones-modal',
      backdropDismiss: true,
      breakpoints: [0, 0.72, 0.92],
      initialBreakpoint: 0.72,
      handle: false,
      componentProps: {
        movimiento
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'confirm' || !data?.accion) {
      return;
    }

    const accion = data.accion as AccionFinanza;

    if (accion === 'cerrar') {
      await this.confirmarCerrarMovimiento(movimiento);
      return;
    }

    if (accion === 'anular') {
      await this.confirmarAnularMovimiento(movimiento);
      return;
    }

    if (accion === 'sincronizar_trabajo') {
      await this.confirmarSincronizarTrabajo(movimiento);
      return;
    }
  }

  private async confirmarCerrarMovimiento(
    movimiento: MovimientoFinancieroVista
  ) {
    const esCobro = movimiento.tipo === 'cobro_cliente';

    const confirmado = await this.abrirConfirmacion({
      tipo: 'success',
      icono: 'checkmark-circle-outline',
      titulo: esCobro ? 'Confirmar cobro' : 'Confirmar pago',
      mensaje: esCobro
        ? '¿Deseas marcar este movimiento como cobrado?'
        : '¿Deseas marcar este movimiento como pagado?',
      detalle: `${movimiento.codigoSeguimiento} - ${movimiento.montoTotalTexto}`,
      textoConfirmar: esCobro ? 'Marcar cobrado' : 'Marcar pagado'
    });

    if (!confirmado) {
      return;
    }

    try {
      await this.finanzasService.cerrarMovimiento(movimiento);
      await this.mostrarToast('Movimiento actualizado.', 'success');
    } catch (error) {
      console.error('[FinanzasPage] Error cerrando movimiento:', error);
      await this.mostrarToast('No se pudo actualizar el movimiento.', 'danger');
    }
  }

  private async confirmarAnularMovimiento(
    movimiento: MovimientoFinancieroVista
  ) {
    const confirmado = await this.abrirConfirmacion({
      tipo: 'danger',
      icono: 'ban-outline',
      titulo: 'Anular movimiento',
      mensaje: '¿Deseas anular este movimiento financiero?',
      detalle: 'El movimiento no se contará como pendiente ni como cerrado.',
      textoConfirmar: 'Anular'
    });

    if (!confirmado) {
      return;
    }

    try {
      await this.finanzasService.anularMovimiento(movimiento);
      await this.mostrarToast('Movimiento anulado.', 'success');
    } catch (error) {
      console.error('[FinanzasPage] Error anulando movimiento:', error);
      await this.mostrarToast('No se pudo anular el movimiento.', 'danger');
    }
  }

  private async confirmarSincronizarTrabajo(
    movimiento: MovimientoFinancieroVista
  ) {
    const confirmado = await this.abrirConfirmacion({
      tipo: 'primary',
      icono: 'cash-outline',
      titulo: 'Actualizar monto del trabajo',
      mensaje: '¿Deseas actualizar el monto del trabajo con el monto registrado en este cobro?',
      detalle: `${movimiento.codigoSeguimiento} cambiará a ${movimiento.montoTotalTexto}`,
      textoConfirmar: 'Actualizar'
    });

    if (!confirmado) {
      return;
    }

    try {
      await this.finanzasService.sincronizarMontoTrabajo(movimiento);
      await this.mostrarToast('Monto del trabajo actualizado.', 'success');
    } catch (error) {
      console.error('[FinanzasPage] Error sincronizando monto del trabajo:', error);
      await this.mostrarToast('No se pudo actualizar el monto del trabajo.', 'danger');
    }
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

  trackByMovimiento(
    index: number,
    item: MovimientoFinancieroVista
  ): string {
    return item.uid || item.id || String(index);
  }

  private async mostrarToast(
    message: string,
    color: 'primary' | 'success' | 'danger' = 'primary'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2200,
      position: 'top',
      color
    });

    await toast.present();
  }
}