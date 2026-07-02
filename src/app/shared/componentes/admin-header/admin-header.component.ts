// src/app/shared/componentes/admin-header/admin-header.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  menuOutline,
  notificationsOutline,
  personCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class AdminHeaderComponent {
  private navCtrl = inject(NavController);

  @Input() nombre = 'Administrador';
  @Input() rol = 'Administrador';
  @Input() fotoUrl = '';
  @Input() notificaciones = 0;

  @Output() menuClick = new EventEmitter<void>();
  @Output() notificacionesClick = new EventEmitter<void>();
  @Output() perfilClick = new EventEmitter<void>();

  constructor() {
    addIcons({
      'menu-outline': menuOutline,
      'notifications-outline': notificationsOutline,
      'person-circle-outline': personCircleOutline
    });
  }

  abrirMenu(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();

    this.menuClick.emit();
  }

  abrirNotificaciones(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();

    this.navCtrl.navigateRoot('/notificaciones-admin', {
      animated: false,
      replaceUrl: true
    });
  }

  abrirPerfil(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();

    this.perfilClick.emit();
  }
}