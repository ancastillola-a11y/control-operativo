// src/app/shared/componentes/admin-bottom-nav/admin-bottom-nav.component.ts
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonicModule,
  NavController,
  ToastController
} from '@ionic/angular';

export type AdminNavItem =
  | 'inicio'
  | 'almacen'
  | 'trabajos'
  | 'reportes'
  | 'mas';

@Component({
  selector: 'app-admin-bottom-nav',
  templateUrl: './admin-bottom-nav.component.html',
  styleUrls: ['./admin-bottom-nav.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class AdminBottomNavComponent {
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);

  @Input() activo: AdminNavItem = 'inicio';

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