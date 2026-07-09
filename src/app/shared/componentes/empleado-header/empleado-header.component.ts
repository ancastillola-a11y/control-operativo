//src/app/shared/componentes/empleado-header/empleado-header.component.ts

import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';

import {
  menuOutline,
  notificationsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-empleado-header',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ],
  templateUrl: './empleado-header.component.html',
  styleUrls: ['./empleado-header.component.css']
})
export class EmpleadoHeaderComponent {
  @Input() nombre = 'Empleado';
  @Input() cargo = 'Personal operativo';
  @Input() fotoUrl = '';
  @Input() iniciales = 'EM';
  @Input() notificaciones = 0;

  @Output() menuClick = new EventEmitter<void>();
  @Output() notificacionesClick = new EventEmitter<void>();
  @Output() perfilClick = new EventEmitter<void>();

  constructor() {
    addIcons({
      'menu-outline': menuOutline,
      'notifications-outline': notificationsOutline
    });
  }

  get primerNombre(): string {
    const nombreLimpio = String(this.nombre || 'Empleado').trim();

    return nombreLimpio.split(/\s+/)[0] || 'Empleado';
  }
}