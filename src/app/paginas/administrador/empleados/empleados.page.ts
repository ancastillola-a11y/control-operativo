// src/app/paginas/administrador/empleados/empleados.page.ts
import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonicModule,
  ToastController,
  AlertController,
  NavController,
  ModalController
} from '@ionic/angular';

import { EmpleadoService } from '../../../procesos/empleado.service';
import { DashboardAdminService } from '../../../procesos/dashboard-admin.service';

import { AdminConfirmModalComponent } from '../../../shared/componentes/admin-confirm-modal/admin-confirm-modal.component';

import {
  EmpleadoVista,
  EstadoFiltroEmpleado
} from '../../../modelos/empleado';

import { AdminHeaderComponent } from '../../../shared/componentes/admin-header/admin-header.component';
import { AdminBottomNavComponent } from '../../../shared/componentes/admin-bottom-nav/admin-bottom-nav.component';
import { AdminModuleHeroComponent } from '../../../shared/componentes/admin-module-hero/admin-module-hero.component';
import { AdminSummaryCardComponent } from '../../../shared/componentes/admin-summary-card/admin-summary-card.component';
import { AdminSearchFilterComponent } from '../../../shared/componentes/admin-search-filter/admin-search-filter.component';
import { EmpleadoCardComponent } from '../../../shared/componentes/empleado-card/empleado-card.component';
import { AdminEmptyStateComponent } from '../../../shared/componentes/admin-empty-state/admin-empty-state.component';
import { AdminPaginationComponent } from '../../../shared/componentes/admin-pagination/admin-pagination.component';

import { EmpleadoFormModalComponent } from '../../../shared/componentes/empleado-form-modal/empleado-form-modal.component';
import { EmpleadoAccionesModalComponent } from '../../../shared/componentes/empleado-acciones-modal/empleado-acciones-modal.component';
import { EmpleadoPasswordModalComponent } from '../../../shared/componentes/empleado-password-modal/empleado-password-modal.component';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    AdminHeaderComponent,
    AdminBottomNavComponent,
    AdminModuleHeroComponent,
    AdminSummaryCardComponent,
    AdminSearchFilterComponent,
    EmpleadoCardComponent,
    AdminEmptyStateComponent,
    AdminPaginationComponent
  ]
})
export class EmpleadosPage {
  private empleadoService = inject(EmpleadoService);
  private dashboardAdminService = inject(DashboardAdminService);
  private modalCtrl = inject(ModalController);
  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController);
  private navCtrl = inject(NavController);
  private cdr = inject(ChangeDetectorRef);

  vm$ = this.empleadoService.vm$;
  adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();

  async ionViewWillEnter() {
    await this.empleadoService.cargarEmpleados();

    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  async ionViewDidEnter() {
    await this.empleadoService.cargarEmpleados();

    setTimeout(() => {
      this.cdr.detectChanges();
    }, 150);
  }

  trackByEmpleado(
    index: number,
    empleado: EmpleadoVista
  ): string {
    return empleado.uid || empleado.id || String(index);
  }

  buscarEmpleado(valor: string | any) {
    const termino = typeof valor === 'string'
      ? valor
      : valor?.detail?.value ?? '';

    this.empleadoService.cambiarBusqueda(termino);
  }

  async abrirFiltro() {
    const filtroActual = this.empleadoService.obtenerFiltroActual();

    const alert = await this.alertCtrl.create({
      header: 'Filtrar empleados',
      inputs: [
        {
          type: 'radio',
          label: 'Todos',
          value: 'todos',
          checked: filtroActual === 'todos'
        },
        {
          type: 'radio',
          label: 'Activos',
          value: 'habilitados',
          checked: filtroActual === 'habilitados'
        },
        {
          type: 'radio',
          label: 'Inactivos',
          value: 'deshabilitados',
          checked: filtroActual === 'deshabilitados'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aplicar',
          handler: (filtro: EstadoFiltroEmpleado) => {
            this.empleadoService.cambiarFiltro(filtro);
          }
        }
      ]
    });

    await alert.present();
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

  async nuevoUsuario() {
    const modal = await this.modalCtrl.create({
      component: EmpleadoFormModalComponent,
      cssClass: 'empleado-modal',
      backdropDismiss: false,
      componentProps: {
        modo: 'crear'
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      await this.guardarNuevoUsuario(data);
    }
  }

  private async guardarNuevoUsuario(data: any) {
   const payload = {
  nombres: String(data.nombres || '').trim(),
  apellidos: String(data.apellidos || '').trim(),
  dni: String(data.dni || '').trim(),
  telefono: String(data.telefono || '').trim(),
  cargo: String(data.cargo || '').trim() || 'Personal operativo',
  usuario: this.empleadoService.normalizarUsuario(data.usuario || ''),
  password: String(data.password || '').trim(),
  fotoUrl: String(data.fotoUrl || '').trim(),
  fotoArchivo: data.fotoArchivo || null
};

    if (!this.validarNuevoEmpleado(payload)) {
      return;
    }

    try {
      await this.empleadoService.crearEmpleado(payload);
      await this.empleadoService.cargarEmpleados();

      await this.mostrarToast('Empleado creado correctamente', 'success');

      setTimeout(() => {
        this.cdr.detectChanges();
      }, 100);
    } catch (error: any) {
      console.error('[EmpleadosPage] Error creando empleado:', error);
      await this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    }
  }

  private validarNuevoEmpleado(data: any): boolean {
    if (!data.nombres) {
      this.mostrarToast('Ingrese los nombres', 'danger');
      return false;
    }

    if (!data.apellidos) {
      this.mostrarToast('Ingrese los apellidos', 'danger');
      return false;
    }

    if (!data.dni || data.dni.length < 8) {
      this.mostrarToast('Ingrese un DNI válido', 'danger');
      return false;
    }

    if (!data.telefono || data.telefono.length < 9) {
      this.mostrarToast('Ingrese un teléfono válido', 'danger');
      return false;
    }

    if (!data.usuario) {
      this.mostrarToast('Ingrese un usuario', 'danger');
      return false;
    }

    if (data.usuario.length < 4) {
      this.mostrarToast('El usuario debe tener mínimo 4 caracteres', 'danger');
      return false;
    }

    if (!data.password || data.password.length < 6) {
      this.mostrarToast('La contraseña debe tener mínimo 6 caracteres', 'danger');
      return false;
    }

    return true;
  }

  async abrirAcciones(empleado: EmpleadoVista) {
    const modal = await this.modalCtrl.create({
      component: EmpleadoAccionesModalComponent,
      cssClass: 'empleado-actions-modal',
      backdropDismiss: true,
      componentProps: {
        empleado
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'confirm' || !data?.accion) {
      return;
    }

    if (data.accion === 'editar' || data.accion === 'foto') {
      await this.editarEmpleado(empleado);
      return;
    }

    if (data.accion === 'password') {
      await this.abrirCambioPassword(empleado);
      return;
    }

    if (data.accion === 'estado') {
      await this.confirmarCambioEstado(empleado);
      return;
    }

    if (data.accion === 'eliminar') {
      await this.confirmarEliminarEmpleado(empleado);
    }
  }

  private async editarEmpleado(empleado: EmpleadoVista) {
    const modal = await this.modalCtrl.create({
      component: EmpleadoFormModalComponent,
      cssClass: 'empleado-modal',
      backdropDismiss: false,
      componentProps: {
        modo: 'editar',
        empleado
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      await this.guardarEdicionEmpleado(empleado, data);
    }
  }

  private async abrirCambioPassword(empleado: EmpleadoVista) {
    const modal = await this.modalCtrl.create({
      component: EmpleadoPasswordModalComponent,
      cssClass: 'empleado-password-modal',
      backdropDismiss: false,
      componentProps: {
        empleado
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'confirm' || !data?.password) {
      return;
    }

    await this.mostrarToast('Contraseña registrada correctamente', 'success');
  }

  private async guardarEdicionEmpleado(
    empleado: EmpleadoVista,
    data: any
  ) {
    if (!empleado.uid) {
      await this.mostrarToast('El empleado no tiene UID válido', 'danger');
      return;
    }

   const payload = {
  uid: empleado.uid,
  nombres: String(data.nombres || '').trim(),
  apellidos: String(data.apellidos || '').trim(),
  usuario: this.empleadoService.normalizarUsuario(data.usuario || ''),
  dni: String(data.dni || '').trim(),
  telefono: String(data.telefono || '').trim(),
  cargo: String(data.cargo || '').trim() || 'Personal operativo',
  fotoUrl: String(data.fotoUrl ?? empleado.fotoUrl ?? '').trim(),
  fotoArchivo: data.fotoArchivo || null
};


    if (!this.validarEdicionEmpleado(payload)) {
      return;
    }

    try {
      await this.empleadoService.editarEmpleado(payload);
      await this.empleadoService.cargarEmpleados();

      await this.mostrarToast('Registro actualizado correctamente', 'success');

      setTimeout(() => {
        this.cdr.detectChanges();
      }, 100);
    } catch (error: any) {
      console.error('[EmpleadosPage] Error editando empleado:', error);
      await this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    }
  }

  private validarEdicionEmpleado(data: any): boolean {
    if (!data.nombres) {
      this.mostrarToast('Ingrese los nombres', 'danger');
      return false;
    }

    if (!data.apellidos) {
      this.mostrarToast('Ingrese los apellidos', 'danger');
      return false;
    }

    if (!data.usuario) {
      this.mostrarToast('Ingrese el usuario', 'danger');
      return false;
    }

    if (data.usuario.length < 4) {
      this.mostrarToast('El usuario debe tener mínimo 4 caracteres', 'danger');
      return false;
    }

    if (!data.dni || data.dni.length < 8) {
      this.mostrarToast('Ingrese un DNI válido', 'danger');
      return false;
    }

    if (!data.telefono || data.telefono.length < 9) {
      this.mostrarToast('Ingrese un teléfono válido', 'danger');
      return false;
    }

    return true;
  }

  private async confirmarCambioEstado(empleado: EmpleadoVista) {
    const nuevoEstado = !empleado.habilitado;

    const confirmado = await this.abrirConfirmacion({
      tipo: nuevoEstado ? 'success' : 'warning',
      icono: nuevoEstado ? 'checkmark-circle-outline' : 'close-circle-outline',
      titulo: nuevoEstado ? 'Habilitar usuario' : 'Deshabilitar usuario',
      mensaje: nuevoEstado
        ? `¿Deseas habilitar el acceso de ${empleado.nombreCompleto || 'este empleado'}?`
        : `¿Deseas deshabilitar el acceso de ${empleado.nombreCompleto || 'este empleado'}?`,
      detalle: nuevoEstado
        ? 'El empleado podrá ingresar nuevamente a la aplicación.'
        : 'El empleado no podrá ingresar ni operar dentro de la aplicación.',
      textoCancelar: 'Cancelar',
      textoConfirmar: nuevoEstado ? 'Habilitar' : 'Deshabilitar'
    });

    if (!confirmado) {
      return;
    }

    await this.cambiarEstado(empleado, nuevoEstado);
  }

  private async cambiarEstado(
    empleado: EmpleadoVista,
    habilitado: boolean
  ) {
    if (!empleado.uid) {
      await this.mostrarToast('El empleado no tiene UID válido', 'danger');
      return;
    }

    try {
      await this.empleadoService.cambiarEstadoEmpleado(
        empleado.uid,
        habilitado
      );

      await this.empleadoService.cargarEmpleados();

      await this.mostrarToast(
        habilitado
          ? 'Usuario habilitado correctamente'
          : 'Usuario deshabilitado correctamente',
        'success'
      );

      setTimeout(() => {
        this.cdr.detectChanges();
      }, 100);
    } catch (error: any) {
      console.error('[EmpleadosPage] Error cambiando estado:', error);
      await this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    }
  }

  private async confirmarEliminarEmpleado(empleado: EmpleadoVista) {
    const confirmado = await this.abrirConfirmacion({
      tipo: 'danger',
      icono: 'trash-outline',
      titulo: 'Eliminar empleado',
      mensaje: `¿Deseas eliminar el registro de ${empleado.nombreCompleto || 'este empleado'}?`,
      detalle: 'Esta acción ocultará al empleado del módulo y bloqueará su acceso operativo.',
      textoCancelar: 'Cancelar',
      textoConfirmar: 'Eliminar'
    });

    if (!confirmado) {
      return;
    }

    await this.eliminarEmpleado(empleado);
  }

  private async eliminarEmpleado(empleado: EmpleadoVista) {
    if (!empleado.uid) {
      await this.mostrarToast('El empleado no tiene UID válido', 'danger');
      return;
    }

    try {
      await this.empleadoService.eliminarEmpleado(
        empleado.uid,
        empleado.nombreCompleto || 'Empleado'
      );

      await this.empleadoService.cargarEmpleados();

      await this.mostrarToast('Registro eliminado correctamente', 'success');

      setTimeout(() => {
        this.cdr.detectChanges();
      }, 100);
    } catch (error: any) {
      console.error('[EmpleadosPage] Error eliminando empleado:', error);
      await this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    }
  }

  paginaAnterior() {
    this.empleadoService.paginaAnterior();
  }

  paginaSiguiente(totalPaginas: number) {
    this.empleadoService.paginaSiguiente(totalPaginas);
  }

  irPagina(pagina: number) {
    this.empleadoService.irPagina(pagina);
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
    const code = String(error?.code || error?.message || '');

    if (code.includes('uid-empleado-vacio')) {
      return 'No se encontró el UID del empleado';
    }

    if (code.includes('archivo-vacio')) {
      return 'No se seleccionó ninguna imagen';
    }

    if (code.includes('storage/unauthorized')) {
      return 'No tiene permisos para subir imágenes';
    }

    if (code.includes('storage/canceled')) {
      return 'La subida de imagen fue cancelada';
    }

    if (code.includes('usuario-vacio')) {
      return 'Ingrese un usuario válido';
    }

    if (code.includes('usuario-duplicado')) {
      return 'Ese usuario ya está registrado';
    }

    if (code.includes('dni-duplicado')) {
      return 'Ese DNI ya está registrado';
    }

    if (code.includes('auth/email-already-in-use')) {
      return 'Ese usuario ya tiene una cuenta de acceso';
    }

    if (code.includes('auth/weak-password')) {
      return 'La contraseña es muy débil';
    }

    if (code.includes('auth/invalid-email')) {
      return 'El usuario generado no es válido';
    }

    if (code.includes('permission-denied')) {
      return 'No tiene permisos para realizar esta acción';
    }

    if (code.includes('firebase-config-no-encontrado')) {
      return 'No se encontró la configuración de Firebase';
    }

    if (code.includes('missing-or-insufficient-permissions')) {
      return 'Permisos insuficientes en Firebase';
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