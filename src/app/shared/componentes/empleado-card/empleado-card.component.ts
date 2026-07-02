// src/app/shared/componentes/empleado-card/empleado-card.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  callOutline,
  ellipsisVerticalOutline,
  personOutline,
  pricetagOutline
} from 'ionicons/icons';

import { EmpleadoVista } from '../../../modelos/empleado';

@Component({
  selector: 'app-empleado-card',
  templateUrl: './empleado-card.component.html',
  styleUrls: ['./empleado-card.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class EmpleadoCardComponent {
  @Input() empleado!: EmpleadoVista;
  @Output() acciones = new EventEmitter<EmpleadoVista>();

  constructor() {
    addIcons({
      'call-outline': callOutline,
      'ellipsis-vertical-outline': ellipsisVerticalOutline,
      'person-outline': personOutline,
      'pricetag-outline': pricetagOutline
    });
  }

  abrirAcciones() {
    this.acciones.emit(this.empleado);
  }
}