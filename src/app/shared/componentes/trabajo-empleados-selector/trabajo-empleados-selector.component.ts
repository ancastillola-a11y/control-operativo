// src/app/shared/componentes/trabajo-empleados-selector/trabajo-empleados-selector.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import {
  TrabajoEmpleadoAsignado,
  TrabajoEmpleadoDisponible
} from '../../../modelos/trabajo';

@Component({
  selector: 'app-trabajo-empleados-selector',
  templateUrl: './trabajo-empleados-selector.component.html',
  styleUrls: ['./trabajo-empleados-selector.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class TrabajoEmpleadosSelectorComponent {
  @Input() empleados: TrabajoEmpleadoDisponible[] = [];
  @Input() seleccionados: TrabajoEmpleadoAsignado[] = [];

  @Output() seleccionadosChange = new EventEmitter<TrabajoEmpleadoAsignado[]>();

  estaSeleccionado(uid: string): boolean {
    return this.seleccionados.some((empleado) => empleado.uid === uid);
  }

  alternarEmpleado(empleado: TrabajoEmpleadoDisponible) {
    if (this.estaSeleccionado(empleado.uid)) {
      const nuevos = this.seleccionados.filter((item) => item.uid !== empleado.uid);
      this.seleccionadosChange.emit(nuevos);
      return;
    }

    const empleadoAsignado: TrabajoEmpleadoAsignado = {
      uid: empleado.uid,
      nombreCompleto: empleado.nombreCompleto,
      usuario: empleado.usuario,
      cargo: empleado.cargo
    };

    this.seleccionadosChange.emit([
      ...this.seleccionados,
      empleadoAsignado
    ]);
  }
}

