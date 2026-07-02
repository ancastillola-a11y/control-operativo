// src/app/paginas/almacen/materiales/materiales.page.ts
import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonicModule,
  ToastController,
  AlertController,
  NavController,
  ModalController
} from '@ionic/angular';

import { MaterialService } from '../../../procesos/material.service';
import { DashboardAdminService } from '../../../procesos/dashboard-admin.service';

import {
  EstadoFiltroMaterial,
  MaterialVista
} from '../../../modelos/material';

import { AdminHeaderComponent } from '../../../shared/componentes/admin-header/admin-header.component';
import { AdminBottomNavComponent } from '../../../shared/componentes/admin-bottom-nav/admin-bottom-nav.component';
import { AdminModuleHeroComponent } from '../../../shared/componentes/admin-module-hero/admin-module-hero.component';
import { AdminSummaryCardComponent } from '../../../shared/componentes/admin-summary-card/admin-summary-card.component';
import { AdminSearchFilterComponent } from '../../../shared/componentes/admin-search-filter/admin-search-filter.component';
import { AdminEmptyStateComponent } from '../../../shared/componentes/admin-empty-state/admin-empty-state.component';
import { AdminPaginationComponent } from '../../../shared/componentes/admin-pagination/admin-pagination.component';
import { AdminConfirmModalComponent } from '../../../shared/componentes/admin-confirm-modal/admin-confirm-modal.component';

import { MaterialCardComponent } from '../../../shared/componentes/material-card/material-card.component';
import { MaterialFormModalComponent } from '../../../shared/componentes/material-form-modal/material-form-modal.component';
import { MaterialAccionesModalComponent } from '../../../shared/componentes/material-acciones-modal/material-acciones-modal.component';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.page.html',
  styleUrls: ['./materiales.page.css'],
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
    MaterialCardComponent
  ]
})
export class MaterialesPage {
  private materialService = inject(MaterialService);
  private dashboardAdminService = inject(DashboardAdminService);

  private modalCtrl = inject(ModalController);
  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController);
  private navCtrl = inject(NavController);
  private cdr = inject(ChangeDetectorRef);

  vm$ = this.materialService.vm$;
  adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();

  async ionViewWillEnter() {
    await this.materialService.cargarMateriales();

    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  async ionViewDidEnter() {
    await this.materialService.cargarMateriales();

    setTimeout(() => {
      this.cdr.detectChanges();
    }, 150);
  }

  trackByMaterial(
    index: number,
    material: MaterialVista
  ): string {
    return material.uid || material.id || String(index);
  }

  buscarMaterial(valor: string | any) {
    const termino = typeof valor === 'string'
      ? valor
      : valor?.detail?.value ?? '';

    this.materialService.cambiarBusqueda(termino);
  }

  async abrirFiltro() {
    const filtroActual = this.materialService.obtenerFiltroActual();

    const alert = await this.alertCtrl.create({
      header: 'Filtrar materiales',
      inputs: [
        {
          type: 'radio',
          label: 'Todos',
          value: 'todos',
          checked: filtroActual === 'todos'
        },
        {
          type: 'radio',
          label: 'Disponibles',
          value: 'disponibles',
          checked: filtroActual === 'disponibles'
        },
        {
          type: 'radio',
          label: 'Stock bajo',
          value: 'stockBajo',
          checked: filtroActual === 'stockBajo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aplicar',
          handler: (filtro: EstadoFiltroMaterial) => {
            this.materialService.cambiarFiltro(filtro);
          }
        }
      ]
    });

    await alert.present();
  }

  async nuevoMaterial() {
    const modal = await this.modalCtrl.create({
      component: MaterialFormModalComponent,
      cssClass: 'material-modal',
      backdropDismiss: false,
      componentProps: {
        modo: 'crear'
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      await this.guardarNuevoMaterial(data);
    }
  }

  private async guardarNuevoMaterial(data: any) {
    const payload = {
      nombre: String(data.nombre || '').trim(),
      unidad: String(data.unidad || '').trim(),
      categoria: String(data.categoria || '').trim(),
      descripcion: String(data.descripcion || '').trim(),
      stockInicial: Number(data.stockInicial || 0),
      stockMinimo: Number(data.stockMinimo || 0),
      imagenFile: data.imagenFile || null
    };

    if (!this.validarMaterial(payload, true)) {
      return;
    }

    try {
      await this.materialService.crearMaterial(payload);
      await this.materialService.cargarMateriales();

      this.mostrarToast('Material registrado correctamente', 'success');

      setTimeout(() => {
        this.cdr.detectChanges();
      }, 100);
    } catch (error: any) {
      console.error(error);
      this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    }
  }

  async abrirAcciones(material: MaterialVista) {
    const modal = await this.modalCtrl.create({
      component: MaterialAccionesModalComponent,
      cssClass: 'material-actions-modal',
      backdropDismiss: true,
      componentProps: {
        material
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'confirm' || !data?.accion) {
      return;
    }

    if (data.accion === 'editar') {
      await this.editarMaterial(material);
      return;
    }

    if (data.accion === 'movimientos') {
      this.mostrarToast('Historial de movimientos en desarrollo', 'primary');
      return;
    }

    if (data.accion === 'eliminar') {
      await this.confirmarEliminarMaterial(material);
    }
  }

  private async editarMaterial(material: MaterialVista) {
    const modal = await this.modalCtrl.create({
      component: MaterialFormModalComponent,
      cssClass: 'material-modal',
      backdropDismiss: false,
      componentProps: {
        modo: 'editar',
        material
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      await this.guardarEdicionMaterial(material, data);
    }
  }

  private async guardarEdicionMaterial(
    material: MaterialVista,
    data: any
  ) {
    if (!material.uid) {
      this.mostrarToast('El material no tiene UID válido', 'danger');
      return;
    }

    const payload = {
      uid: material.uid,
      nombre: String(data.nombre || '').trim(),
      unidad: String(data.unidad || '').trim(),
      categoria: String(data.categoria || '').trim(),
      descripcion: String(data.descripcion || '').trim(),
      stockMinimo: Number(data.stockMinimo || 0),
      imagenFile: data.imagenFile || null,
      quitarImagen: data.quitarImagen === true,
      imagenPathActual: material.imagenPath || ''
    };

    if (!this.validarMaterial(payload, false)) {
      return;
    }

    try {
      await this.materialService.editarMaterial(payload);
      await this.materialService.cargarMateriales();

      this.mostrarToast('Material actualizado correctamente', 'success');

      setTimeout(() => {
        this.cdr.detectChanges();
      }, 100);
    } catch (error: any) {
      console.error(error);
      this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    }
  }

  private validarMaterial(data: any, esCrear: boolean): boolean {
    if (!data.nombre) {
      this.mostrarToast('Ingrese el nombre del material', 'danger');
      return false;
    }

    if (!data.unidad) {
      this.mostrarToast('Seleccione la unidad de medida', 'danger');
      return false;
    }

    if (!data.categoria) {
      this.mostrarToast('Seleccione la categoría', 'danger');
      return false;
    }

    if (esCrear && Number(data.stockInicial) < 0) {
      this.mostrarToast('El stock inicial no puede ser negativo', 'danger');
      return false;
    }

    if (Number(data.stockMinimo) < 0) {
      this.mostrarToast('El stock mínimo no puede ser negativo', 'danger');
      return false;
    }

    return true;
  }

  private async confirmarEliminarMaterial(material: MaterialVista) {
    const confirmado = await this.abrirConfirmacion({
      tipo: 'danger',
      icono: 'trash-outline',
      titulo: 'Eliminar material',
      mensaje: `¿Deseas eliminar el material ${material.nombre || 'seleccionado'}?`,
      detalle: 'Esta acción ocultará el material del almacén y no estará disponible para futuras asignaciones.',
      textoCancelar: 'Cancelar',
      textoConfirmar: 'Eliminar'
    });

    if (!confirmado) {
      return;
    }

    await this.eliminarMaterial(material);
  }

  private async eliminarMaterial(material: MaterialVista) {
    if (!material.uid) {
      this.mostrarToast('El material no tiene UID válido', 'danger');
      return;
    }

    try {
      await this.materialService.eliminarMaterial(
        material.uid,
        material.nombre || 'Material'
      );

      await this.materialService.cargarMateriales();

      this.mostrarToast('Material eliminado correctamente', 'success');

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
    this.materialService.paginaAnterior();
  }

  paginaSiguiente(totalPaginas: number) {
    this.materialService.paginaSiguiente(totalPaginas);
  }

  irPagina(pagina: number) {
    this.materialService.irPagina(pagina);
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

    if (code.includes('material-duplicado')) {
      return 'Ese material ya está registrado';
    }

    if (code.includes('material-nombre-vacio')) {
      return 'Ingrese el nombre del material';
    }

    if (code.includes('permission-denied')) {
      return 'No tiene permisos para realizar esta acción';
    }

    if (code.includes('storage')) {
      return 'No se pudo subir la imagen del material';
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

