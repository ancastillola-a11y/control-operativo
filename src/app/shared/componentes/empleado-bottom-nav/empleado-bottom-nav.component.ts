//src/app/shared/componentes/empleado-bottom-nav/empleado-bottom-nav.component.ts
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
  briefcaseOutline,
  cubeOutline,
  homeOutline,
  personCircleOutline,
  timeOutline
} from 'ionicons/icons';

export type EmpleadoNavItem =
  | 'inicio'
  | 'trabajos'
  | 'materiales'
  | 'historial'
  | 'perfil';

@Component({
  selector: 'app-empleado-bottom-nav',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ],
  templateUrl: './empleado-bottom-nav.component.html',
  styleUrls: ['./empleado-bottom-nav.component.css']
})
export class EmpleadoBottomNavComponent {
  @Input() activo: EmpleadoNavItem = 'inicio';

  @Output() inicioClick = new EventEmitter<void>();
  @Output() trabajosClick = new EventEmitter<void>();
  @Output() materialesClick = new EventEmitter<void>();
  @Output() historialClick = new EventEmitter<void>();
  @Output() perfilClick = new EventEmitter<void>();

  constructor() {
    addIcons({
      'briefcase-outline': briefcaseOutline,
      'cube-outline': cubeOutline,
      'home-outline': homeOutline,
      'person-circle-outline': personCircleOutline,
      'time-outline': timeOutline
    });
  }
}