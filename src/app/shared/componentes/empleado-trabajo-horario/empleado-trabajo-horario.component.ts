import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';

import {
  calendarOutline,
  timeOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-empleado-trabajo-horario',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ],
  templateUrl: './empleado-trabajo-horario.component.html',
  styleUrls: ['./empleado-trabajo-horario.component.css']
})
export class EmpleadoTrabajoHorarioComponent {
  @Input() fecha = '';
  @Input() hora = '';
  @Input() texto = '';

  constructor() {
    addIcons({
      'calendar-outline': calendarOutline,
      'time-outline': timeOutline
    });
  }

  get fechaTexto(): string {
    const fecha = String(this.fecha || '').trim();

    if (!fecha) {
      return 'Sin fecha';
    }

    return fecha;
  }

  get horaTexto(): string {
    const hora = String(this.hora || '').trim();

    if (!hora) {
      return 'Sin hora';
    }

    return hora;
  }

  get tieneHora(): boolean {
    return !!String(this.hora || '').trim();
  }
}
