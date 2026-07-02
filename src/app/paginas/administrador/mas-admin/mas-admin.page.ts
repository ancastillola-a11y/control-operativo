// src/app/paginas/administrador/mas-admin/mas-admin.page.ts
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonicModule,
  NavController,
  ToastController
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  chevronForwardOutline,
  lockClosedOutline,
  refreshOutline,
  shieldCheckmarkOutline,
  settingsOutline
} from 'ionicons/icons';

import { DashboardAdminService } from '../../../procesos/dashboard-admin.service';

import { AdminHeaderComponent } from '../../../shared/componentes/admin-header/admin-header.component';
import { AdminBottomNavComponent } from '../../../shared/componentes/admin-bottom-nav/admin-bottom-nav.component';

interface MasAdminItem {
  titulo: string;
  descripcion: string;
  icono: string;
  ruta?: string;
  estado: 'disponible' | 'proximamente';
}

@Component({
  selector: 'app-mas-admin',
  templateUrl: './mas-admin.page.html',
  styleUrls: ['./mas-admin.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    AdminHeaderComponent,
    AdminBottomNavComponent
  ]
})
export class MasAdminPage {
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private cdr = inject(ChangeDetectorRef);
  private dashboardAdminService = inject(DashboardAdminService);

  adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();

  private navegando = false;

  modulos: MasAdminItem[] = [
    {
      titulo: 'Códigos de seguridad',
      descripcion: 'Gestiona el código del cliente y el código para devolución de materiales.',
      icono: 'shield-checkmark-outline',
      ruta: '/codigos-seguridad',
      estado: 'disponible'
    },
    {
      titulo: 'Seguimiento de trabajos',
      descripcion: 'Visualiza el avance operativo de los trabajos registrados.',
      icono: 'refresh-outline',
      ruta: '/seguimiento-trabajos',
      estado: 'disponible'
    },
    {
      titulo: 'Configuración',
      descripcion: 'Ajustes generales de empresa, perfil y parámetros administrativos.',
      icono: 'settings-outline',
      estado: 'proximamente'
    }
  ];

  constructor() {
    addIcons({
  'chevron-forward-outline': chevronForwardOutline,
  'lock-closed-outline': lockClosedOutline,
  'refresh-outline': refreshOutline,
  'shield-checkmark-outline': shieldCheckmarkOutline,
  'settings-outline': settingsOutline
});
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  abrirModulo(modulo: MasAdminItem) {
    if (!modulo.ruta || modulo.estado !== 'disponible') {
      this.mostrarToast(`${modulo.titulo} estará disponible próximamente.`);
      return;
    }

    this.navegarRoot(modulo.ruta);
  }

  abrirMenu() {
    this.navegarRoot('/dashboard-admin');
  }

  abrirNotificaciones() {
    this.navegarRoot('/notificaciones-admin');
  }

  abrirPerfil() {
    this.mostrarToast('Configuración de perfil próximamente.');
  }

 private async navegarRoot(ruta: string) {
  if (this.navegando) {
    return;
  }

  const rutaFinal = this.resolverRutaMas(ruta);

  if (!rutaFinal) {
    await this.mostrarToast('Ruta no configurada.');
    return;
  }

  this.navegando = true;

  try {
    await this.navCtrl.navigateRoot(rutaFinal, {
      animated: false,
      replaceUrl: true
    });
  } catch (error) {
    console.error('[MasAdminPage] Error al navegar:', {
      ruta,
      rutaFinal,
      error
    });

    await this.mostrarToast('No se pudo abrir el módulo seleccionado.');
  } finally {
    setTimeout(() => {
      this.navegando = false;
    }, 200);
  }
}
private resolverRutaMas(ruta: string): string {
  let valor = String(ruta || '').trim().toLowerCase();

  if (!valor) {
    return '';
  }

  if (!valor.startsWith('/')) {
    valor = `/${valor}`;
  }

  const rutas: Record<string, string> = {
    '/codigos': '/codigos-seguridad',
    '/codigos-admin': '/codigos-seguridad',
    '/codigos-de-seguridad': '/codigos-seguridad',
    '/seguridad': '/codigos-seguridad',
    '/codigos-seguridad': '/codigos-seguridad',

    '/seguimiento': '/seguimiento-trabajos',
    '/seguimiento-admin': '/seguimiento-trabajos',
    '/seguimiento-trabajos': '/seguimiento-trabajos',

    '/configuracion-admin': '/mas-admin',
    '/mas': '/mas-admin',
    '/mas-admin': '/mas-admin'
  };

  return rutas[valor] || valor;
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