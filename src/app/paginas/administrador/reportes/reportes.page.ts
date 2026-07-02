// src/app/paginas/administrador/reportes/reportes.page.ts
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonicModule,
  NavController,
  ToastController
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  archiveOutline,
  barChartOutline,
  chevronForwardOutline,
  clipboardOutline,
  documentTextOutline,
  notificationsOutline,
  peopleOutline,
  personOutline,
  readerOutline,
  warningOutline
} from 'ionicons/icons';

import { DashboardAdminService } from '../../../procesos/dashboard-admin.service';
import { ReporteAdminService } from '../../../procesos/reporte-admin.service';

import { ReporteModuloAdmin } from '../../../modelos/reporte-admin';

import { AdminHeaderComponent } from '../../../shared/componentes/admin-header/admin-header.component';
import { AdminBottomNavComponent } from '../../../shared/componentes/admin-bottom-nav/admin-bottom-nav.component';
import { AdminSummaryCardComponent } from '../../../shared/componentes/admin-summary-card/admin-summary-card.component';
import { AdminEmptyStateComponent } from '../../../shared/componentes/admin-empty-state/admin-empty-state.component';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    AdminHeaderComponent,
    AdminBottomNavComponent,
    AdminSummaryCardComponent,
    AdminEmptyStateComponent
  ]
})
export class ReportesPage {
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private cdr = inject(ChangeDetectorRef);

  private dashboardAdminService = inject(DashboardAdminService);
  private reporteAdminService = inject(ReporteAdminService);

  adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
  vm$ = this.reporteAdminService.vm$;

  constructor() {
    addIcons({
      'archive-outline': archiveOutline,
      'bar-chart-outline': barChartOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'clipboard-outline': clipboardOutline,
      'document-text-outline': documentTextOutline,
      'notifications-outline': notificationsOutline,
      'people-outline': peopleOutline,
      'person-outline': personOutline,
      'reader-outline': readerOutline,
      'warning-outline': warningOutline
    });
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
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

  abrirModulo(modulo: ReporteModuloAdmin) {
    if (!modulo.ruta) {
      this.mostrarToast('Ruta de reporte no configurada.', 'danger');
      return;
    }

    this.navCtrl.navigateRoot(modulo.ruta, {
      animated: false,
      replaceUrl: true
    });
  }

  trackByModulo(
    index: number,
    modulo: ReporteModuloAdmin
  ): string {
    return modulo.tipo || String(index);
  }

  private async mostrarToast(
    message: string,
    color: 'primary' | 'success' | 'danger' = 'primary'
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