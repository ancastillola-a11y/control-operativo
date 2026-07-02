// src/app/shared/componentes/material-card/material-card.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MaterialVista } from '../../../modelos/material';

@Component({
  selector: 'app-material-card',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class MaterialCardComponent {
  @Input() material!: MaterialVista;
  @Output() acciones = new EventEmitter<MaterialVista>();

  abrirAcciones() {
    this.acciones.emit(this.material);
  }
}

