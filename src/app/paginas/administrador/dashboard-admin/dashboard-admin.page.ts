// src/app/paginas/administrador/dashboard-admin/dashboard-admin.page.ts
import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonicModule,
  ToastController,
  NavController
} from '@ionic/angular';

import { Observable } from 'rxjs';
import { trigger, style, animate, transition } from '@angular/animations';

import { RelojPanel } from '../../../procesos/reloj.service';

import {
  DashboardAdminService,
  ModuloAdminVista
} from '../../../procesos/dashboard-admin.service';

import { AdminHeaderComponent } from '../../../shared/componentes/admin-header/admin-header.component';
import { AdminBottomNavComponent } from '../../../shared/componentes/admin-bottom-nav/admin-bottom-nav.component';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.page.html',
  styleUrls: ['./dashboard-admin.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    AdminHeaderComponent,
    AdminBottomNavComponent
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(10px)'
        }),
        animate(
          '350ms ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0)'
          })
        )
      ])
    ])
  ]
})
export class DashboardAdminPage {
  private toastCtrl = inject(ToastController);
  private navCtrl = inject(NavController);
  private cdr = inject(ChangeDetectorRef);
  private dashboardService = inject(DashboardAdminService);

  vm$ = this.dashboardService.obtenerPanelAdmin$();
  reloj$: Observable<RelojPanel> = this.dashboardService.obtenerReloj$();

  ionViewWillEnter() {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  trackByModulo(
    index: number,
    modulo: ModuloAdminVista
  ): string {
    return modulo.ruta || modulo.titulo || String(index);
  }

  abrirModulo(modulo: ModuloAdminVista) {
    const ruta = this.resolverRutaModulo(modulo);

    if (!ruta) {
      this.mostrarToast(`El módulo ${modulo.titulo} todavía no tiene ruta válida.`);
      return;
    }

    console.log('[DashboardAdminPage] Abriendo módulo:', {
      titulo: modulo.titulo,
      rutaOriginal: modulo.ruta,
      rutaFinal: ruta
    });

    this.navCtrl.navigateRoot(ruta, {
      animated: false,
      replaceUrl: true
    });
  }

  abrirMenu() {
    this.navCtrl.navigateRoot('/mas-admin', {
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
    this.mostrarToast('Configuración de perfil próximamente.');
  }

  abrirMapa() {
    this.navCtrl.navigateRoot('/gps', {
      animated: false,
      replaceUrl: true
    });
  }

  irInicio() {
    this.navCtrl.navigateRoot('/dashboard-admin', {
      animated: false,
      replaceUrl: true
    });
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

  private resolverRutaModulo(modulo: ModuloAdminVista): string {
    let ruta = String(modulo.ruta || '').trim().toLowerCase();

    const titulo = String(modulo.titulo || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (ruta && !ruta.startsWith('/')) {
      ruta = `/${ruta}`;
    }

    const rutas: Record<string, string> = {
      '/dashboard-admin': '/dashboard-admin',
      '/inicio': '/dashboard-admin',
      'inicio': '/dashboard-admin',
      'dashboard': '/dashboard-admin',
      'dashboard-admin': '/dashboard-admin',

      '/trabajos': '/asignacion-trabajos',
      '/lista-trabajos': '/asignacion-trabajos',
      '/asignacion-trabajo': '/asignacion-trabajos',
      '/asignar-trabajos': '/asignacion-trabajos',
      '/trabajos-admin': '/asignacion-trabajos',
      '/asignacion-trabajos': '/asignacion-trabajos',
      'trabajos': '/asignacion-trabajos',
      'asignacion trabajos': '/asignacion-trabajos',
      'asignacion de trabajos': '/asignacion-trabajos',

      '/materiales': '/materiales',
      '/almacen': '/materiales',
      '/almacen-admin': '/materiales',
      '/materiales-admin': '/materiales',
      'almacen': '/materiales',
      'materiales': '/materiales',

      '/empleados': '/empleados',
      '/usuarios': '/empleados',
      '/usuario': '/empleados',
      '/personal': '/empleados',
      '/empleados-admin': '/empleados',
      'empleados': '/empleados',
      'usuarios': '/empleados',
      'usuario': '/empleados',
      'personal': '/empleados',

      '/gps': '/gps',
      '/gps-admin': '/gps',
      'gps': '/gps',

      '/reportes': '/reportes',
      '/reportes-admin': '/reportes',
      'reportes': '/reportes',

      '/notificaciones': '/notificaciones-admin',
      '/notificaciones-admin': '/notificaciones-admin',
      'notificaciones': '/notificaciones-admin',

      '/devoluciones': '/devoluciones',
      '/reporte-devoluciones': '/devoluciones',
      'devoluciones': '/devoluciones',

      '/finanzas': '/finanzas',
      '/finanzas-admin': '/finanzas',
      '/pagos': '/finanzas',
      '/pago': '/finanzas',
      '/reporte-pagos': '/finanzas',
      'finanzas': '/finanzas',
      'pagos': '/finanzas',
      'pago': '/finanzas',

      '/mas': '/mas-admin',
      '/mas-admin': '/mas-admin',
      '/configuracion-admin': '/mas-admin',
      'mas': '/mas-admin',
      'mas-admin': '/mas-admin',
      'configuracion': '/mas-admin',

      '/seguimiento': '/seguimiento-trabajos',
      '/seguimiento-admin': '/seguimiento-trabajos',
      '/seguimiento-trabajos': '/seguimiento-trabajos',
      'seguimiento': '/seguimiento-trabajos',
      'seguimiento de trabajos': '/seguimiento-trabajos',

      '/codigos': '/codigos-seguridad',
      '/codigos-admin': '/codigos-seguridad',
      '/codigos-de-seguridad': '/codigos-seguridad',
      '/seguridad': '/codigos-seguridad',
      '/codigos-seguridad': '/codigos-seguridad',
      'codigos': '/codigos-seguridad',
      'codigos de seguridad': '/codigos-seguridad'
    };

    return rutas[ruta] || rutas[titulo] || ruta;
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