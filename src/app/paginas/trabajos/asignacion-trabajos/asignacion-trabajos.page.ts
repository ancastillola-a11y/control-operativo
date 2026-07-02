// src/app/paginas/trabajos/asignacion-trabajos/asignacion-trabajos.page.ts
import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonicModule,
  ToastController,
  AlertController,
  NavController,
  ModalController
} from '@ionic/angular';

import { TrabajoService } from '../../../procesos/trabajo.service';
import { DashboardAdminService } from '../../../procesos/dashboard-admin.service';

import {
  EstadoFiltroTrabajo,
  TrabajoVista
} from '../../../modelos/trabajo';

import { AdminHeaderComponent } from '../../../shared/componentes/admin-header/admin-header.component';
import { AdminBottomNavComponent } from '../../../shared/componentes/admin-bottom-nav/admin-bottom-nav.component';
import { AdminModuleHeroComponent } from '../../../shared/componentes/admin-module-hero/admin-module-hero.component';
import { AdminSummaryCardComponent } from '../../../shared/componentes/admin-summary-card/admin-summary-card.component';
import { AdminSearchFilterComponent } from '../../../shared/componentes/admin-search-filter/admin-search-filter.component';
import { AdminEmptyStateComponent } from '../../../shared/componentes/admin-empty-state/admin-empty-state.component';
import { AdminPaginationComponent } from '../../../shared/componentes/admin-pagination/admin-pagination.component';
import { AdminConfirmModalComponent } from '../../../shared/componentes/admin-confirm-modal/admin-confirm-modal.component';

import { TrabajoCardComponent } from '../../../shared/componentes/trabajo-card/trabajo-card.component';
import { TrabajoFormModalComponent } from '../../../shared/componentes/trabajo-form-modal/trabajo-form-modal.component';
import { TrabajoAccionesModalComponent } from '../../../shared/componentes/trabajo-acciones-modal/trabajo-acciones-modal.component';
import { TrabajoDetalleModalComponent } from '../../../shared/componentes/trabajo-detalle-modal/trabajo-detalle-modal.component';

@Component({
  selector: 'app-asignacion-trabajos',
  templateUrl: './asignacion-trabajos.page.html',
  styleUrls: ['./asignacion-trabajos.page.css'],
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
    AdminPaginationComponent,
    TrabajoCardComponent
  ]
})
export class AsignacionTrabajosPage {
  private trabajoService = inject(TrabajoService);
  private dashboardAdminService = inject(DashboardAdminService);

  private modalCtrl = inject(ModalController);
  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController);
  private navCtrl = inject(NavController);
  private cdr = inject(ChangeDetectorRef);

  vm$ = this.trabajoService.vm$;
  adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();

  async ionViewWillEnter() {
    await this.trabajoService.cargarTrabajos();

    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  async ionViewDidEnter() {
    await this.trabajoService.cargarTrabajos();

    setTimeout(() => {
      this.cdr.detectChanges();
    }, 150);
  }

  trackByTrabajo(
    index: number,
    trabajo: TrabajoVista
  ): string {
    return trabajo.uid || trabajo.id || String(index);
  }

  buscarTrabajo(valor: string | any) {
    const termino = typeof valor === 'string'
      ? valor
      : valor?.detail?.value ?? '';

    this.trabajoService.cambiarBusqueda(termino);
  }

  async abrirFiltro() {
    const filtroActual = this.trabajoService.obtenerFiltroActual();

    const alert = await this.alertCtrl.create({
      header: 'Filtrar trabajos',
      inputs: [
        {
          type: 'radio',
          label: 'Todos',
          value: 'todos',
          checked: filtroActual === 'todos'
        },
        {
          type: 'radio',
          label: 'Pendientes',
          value: 'pendientes',
          checked: filtroActual === 'pendientes'
        },
        {
          type: 'radio',
          label: 'En proceso',
          value: 'enProceso',
          checked: filtroActual === 'enProceso'
        },
        {
          type: 'radio',
          label: 'Finalizados',
          value: 'finalizados',
          checked: filtroActual === 'finalizados'
        },
        {
          type: 'radio',
          label: 'Cancelados',
          value: 'cancelados',
          checked: filtroActual === 'cancelados'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aplicar',
          handler: (filtro: EstadoFiltroTrabajo) => {
            this.trabajoService.cambiarFiltro(filtro);
          }
        }
      ]
    });

    await alert.present();
  }

  async nuevoTrabajo() {
  try {
    console.log('[Trabajos] Clic en Nuevo / Registrar trabajo');

    const modal = await this.modalCtrl.create({
      component: TrabajoFormModalComponent,
      cssClass: 'trabajo-modal',
      backdropDismiss: false,
      componentProps: {
        modo: 'crear'
      }
    });

    console.log('[Trabajos] Modal creado correctamente');

    await modal.present();

    console.log('[Trabajos] Modal presentado');

    const { data, role } = await modal.onWillDismiss();

    console.log('[Trabajos] Modal cerrado:', { role, data });

    if (role === 'confirm' && data) {
      await this.guardarNuevoTrabajo(data);
    }

  } catch (error) {
    console.error('[Trabajos] Error real al abrir formulario:', error);
    this.mostrarToast('No se pudo abrir el formulario de trabajo.', 'danger');
  }
}
  private async guardarNuevoTrabajo(data: any) {
    const payload = {
      clienteNombre: String(data.clienteNombre || '').trim(),
      clienteTelefono: String(data.clienteTelefono || '').trim(),
      direccion: String(data.direccion || '').trim(),
      referencia: String(data.referencia || '').trim(),
latitud: data.latitud ?? null,
longitud: data.longitud ?? null,
direccionMapa: String(data.direccionMapa || '').trim(),
ubicacionTextoOriginal: String(data.ubicacionTextoOriginal || '').trim(),
      tipoTrabajo: String(data.tipoTrabajo || '').trim(),
      descripcion: String(data.descripcion || '').trim(),

      fechaProgramada: String(data.fechaProgramada || '').trim(),
      horaProgramada: String(data.horaProgramada || '').trim(),

      subtotal: Number(data.subtotal || 0),

      empleadosAsignados: data.empleadosAsignados || [],
      materialesAsignados: data.materialesAsignados || []
    };

    if (!this.validarTrabajo(payload, true)) {
      return;
    }

    try {
      await this.trabajoService.crearTrabajo(payload);
      await this.trabajoService.cargarTrabajos();

      this.mostrarToast('Trabajo asignado correctamente', 'success');

      setTimeout(() => {
        this.cdr.detectChanges();
      }, 100);
    } catch (error: any) {
      console.error(error);
      this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    }
  }

  async abrirAcciones(trabajo: TrabajoVista) {
    const modal = await this.modalCtrl.create({
      component: TrabajoAccionesModalComponent,
      cssClass: 'trabajo-actions-modal',
      backdropDismiss: true,
      componentProps: {
        trabajo
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'confirm' || !data?.accion) {
      return;
    }

    if (data.accion === 'detalle') {
      await this.verDetalleTrabajo(trabajo);
      return;
    }

    if (data.accion === 'editar') {
      await this.editarTrabajo(trabajo);
      return;
    }

    if (data.accion === 'cancelar') {
      await this.confirmarCancelarTrabajo(trabajo);
      return;
    }

    if (data.accion === 'eliminar') {
      await this.confirmarEliminarTrabajo(trabajo);
    }
  }

  private async verDetalleTrabajo(trabajo: TrabajoVista) {
    const modal = await this.modalCtrl.create({
      component: TrabajoDetalleModalComponent,
      cssClass: 'trabajo-detalle-modal',
      backdropDismiss: true,
      componentProps: {
        trabajo
      }
    });

    await modal.present();
  }

  private async editarTrabajo(trabajo: TrabajoVista) {
    const modal = await this.modalCtrl.create({
      component: TrabajoFormModalComponent,
      cssClass: 'trabajo-modal',
      backdropDismiss: false,
      componentProps: {
        modo: 'editar',
        trabajo
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      await this.guardarEdicionTrabajo(trabajo, data);
    }
  }

  private async guardarEdicionTrabajo(
    trabajo: TrabajoVista,
    data: any
  ) {
    if (!trabajo.uid) {
      this.mostrarToast('El trabajo no tiene UID válido', 'danger');
      return;
    }

    const payload = {
      uid: trabajo.uid,

      clienteNombre: String(data.clienteNombre || '').trim(),
      clienteTelefono: String(data.clienteTelefono || '').trim(),
      direccion: String(data.direccion || '').trim(),
      referencia: String(data.referencia || '').trim(),
latitud: data.latitud ?? null,
longitud: data.longitud ?? null,
direccionMapa: String(data.direccionMapa || '').trim(),
ubicacionTextoOriginal: String(data.ubicacionTextoOriginal || '').trim(),
      tipoTrabajo: String(data.tipoTrabajo || '').trim(),
      descripcion: String(data.descripcion || '').trim(),

      fechaProgramada: String(data.fechaProgramada || '').trim(),
      horaProgramada: String(data.horaProgramada || '').trim(),

      subtotal: Number(data.subtotal || 0),

      empleadosAsignados: data.empleadosAsignados || []
    };

    if (!this.validarTrabajo(payload, false)) {
      return;
    }

    try {
      await this.trabajoService.editarTrabajo(payload);
      await this.trabajoService.cargarTrabajos();

      this.mostrarToast('Trabajo actualizado correctamente', 'success');

      setTimeout(() => {
        this.cdr.detectChanges();
      }, 100);
    } catch (error: any) {
      console.error(error);
      this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    }
  }

  private validarTrabajo(data: any, esCrear: boolean): boolean {
    if (!data.clienteNombre) {
      this.mostrarToast('Ingrese el nombre del cliente', 'danger');
      return false;
    }

    if (!data.clienteTelefono) {
      this.mostrarToast('Ingrese el celular del cliente', 'danger');
      return false;
    }

    if (!data.direccion) {
      this.mostrarToast('Ingrese la dirección del trabajo', 'danger');
      return false;
    }

    if (!data.tipoTrabajo) {
      this.mostrarToast('Seleccione el tipo de trabajo', 'danger');
      return false;
    }

    if (!data.fechaProgramada) {
      this.mostrarToast('Seleccione la fecha programada', 'danger');
      return false;
    }

    if (!data.horaProgramada) {
      this.mostrarToast('Seleccione la hora programada', 'danger');
      return false;
    }

    if (Number(data.subtotal) < 0) {
      this.mostrarToast('El subtotal no puede ser negativo', 'danger');
      return false;
    }

    if (!data.empleadosAsignados || data.empleadosAsignados.length === 0) {
      this.mostrarToast('Seleccione al menos un empleado', 'danger');
      return false;
    }

    if (esCrear && (!data.materialesAsignados || data.materialesAsignados.length === 0)) {
      this.mostrarToast('Seleccione al menos un material', 'danger');
      return false;
    }

    return true;
  }

  private async confirmarCancelarTrabajo(trabajo: TrabajoVista) {
    const confirmado = await this.abrirConfirmacion({
      tipo: 'warning',
      icono: 'ban-outline',
      titulo: 'Cancelar trabajo',
      mensaje: `¿Deseas cancelar el trabajo de ${trabajo.clienteNombre || 'este cliente'}?`,
      detalle: 'Solo se permite cancelar trabajos pendientes. Los materiales asignados retornarán al stock.',
      textoCancelar: 'Volver',
      textoConfirmar: 'Cancelar trabajo'
    });

    if (!confirmado) {
      return;
    }

    await this.cancelarTrabajo(trabajo);
  }

  private async cancelarTrabajo(trabajo: TrabajoVista) {
    if (!trabajo.uid) {
      this.mostrarToast('El trabajo no tiene UID válido', 'danger');
      return;
    }

    try {
      await this.trabajoService.cancelarTrabajo(trabajo.uid);
      await this.trabajoService.cargarTrabajos();

      this.mostrarToast('Trabajo cancelado correctamente', 'success');

      setTimeout(() => {
        this.cdr.detectChanges();
      }, 100);
    } catch (error: any) {
      console.error(error);
      this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    }
  }

  private async confirmarEliminarTrabajo(trabajo: TrabajoVista) {
    const confirmado = await this.abrirConfirmacion({
      tipo: 'danger',
      icono: 'trash-outline',
      titulo: 'Eliminar trabajo',
      mensaje: `¿Deseas eliminar el registro del trabajo de ${trabajo.clienteNombre || 'este cliente'}?`,
      detalle: 'Esta acción ocultará el registro del módulo administrativo.',
      textoCancelar: 'Cancelar',
      textoConfirmar: 'Eliminar'
    });

    if (!confirmado) {
      return;
    }

    await this.eliminarTrabajo(trabajo);
  }

  private async eliminarTrabajo(trabajo: TrabajoVista) {
    if (!trabajo.uid) {
      this.mostrarToast('El trabajo no tiene UID válido', 'danger');
      return;
    }

    try {
      await this.trabajoService.eliminarTrabajo(trabajo.uid);
      await this.trabajoService.cargarTrabajos();

      this.mostrarToast('Trabajo eliminado correctamente', 'success');

      setTimeout(() => {
        this.cdr.detectChanges();
      }, 100);
    } catch (error: any) {
      console.error(error);
      this.mostrarToast(this.obtenerMensajeError(error), 'danger');
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

  paginaAnterior() {
    this.trabajoService.paginaAnterior();
  }

  paginaSiguiente(totalPaginas: number) {
    this.trabajoService.paginaSiguiente(totalPaginas);
  }

  irPagina(pagina: number) {
    this.trabajoService.irPagina(pagina);
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
  abrirMenu() {
    this.navCtrl.navigateRoot('/dashboard-admin');
  }

  irInicio() {
    this.navCtrl.navigateRoot('/dashboard-admin');
  }

  irAlmacen() {
  this.navCtrl.navigateRoot('/materiales', {
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

irReportes() {
    this.navCtrl.navigateRoot('/reportes', {
      animated: false,
      replaceUrl: true
    });
  }

irMas() {
  this.navCtrl.navigateRoot('/mas-admin', {
    animated: false,
    replaceUrl: true
  });
}


  private obtenerMensajeError(error: any): string {
    const code = error?.code || error?.message || '';

    if (code.includes('cliente-vacio')) {
      return 'Ingrese el nombre del cliente';
    }

    if (code.includes('empleados-vacios')) {
      return 'Seleccione al menos un empleado';
    }

    if (code.includes('materiales-vacios')) {
      return 'Seleccione al menos un material';
    }

    if (code.includes('material-no-existe')) {
      return 'Uno de los materiales seleccionados ya no existe';
    }

    if (code.includes('cantidad-material-invalida')) {
      return 'La cantidad de material no es válida';
    }

    if (code.includes('stock-insuficiente')) {
      const partes = code.split(':');
      return partes[1]
        ? `Stock insuficiente para ${partes[1]}`
        : 'Stock insuficiente para uno de los materiales';
    }

    if (code.includes('trabajo-no-cancelable')) {
      return 'Solo se puede cancelar un trabajo pendiente';
    }

    if (code.includes('trabajo-no-eliminable')) {
      return 'Solo se puede eliminar un trabajo pendiente o cancelado';
    }

    if (code.includes('permission-denied')) {
      return 'No tiene permisos para realizar esta acción';
    }

    return 'No se pudo completar la operación';
  }

  private async mostrarToast(
    message: string,
    color: 'success' | 'danger' | 'primary' = 'primary'
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