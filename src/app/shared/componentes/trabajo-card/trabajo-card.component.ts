// src/app/shared/componentes/trabajo-card/trabajo-card.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TrabajoVista } from '../../../modelos/trabajo';

@Component({
  selector: 'app-trabajo-card',
  templateUrl: './trabajo-card.component.html',
  styleUrls: ['./trabajo-card.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class TrabajoCardComponent {
  @Input() trabajo!: TrabajoVista;
  @Output() acciones = new EventEmitter<TrabajoVista>();

  abrirAcciones() {
    this.acciones.emit(this.trabajo);
  }
}

