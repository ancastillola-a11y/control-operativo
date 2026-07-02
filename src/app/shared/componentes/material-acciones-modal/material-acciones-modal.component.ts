// src/app/shared/componentes/material-acciones-modal/material-acciones-modal.component.ts
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

import { MaterialVista } from '../../../modelos/material';

export type AccionMaterial =
  | 'editar'
  | 'movimientos'
  | 'eliminar';

@Component({
  selector: 'app-material-acciones-modal',
  templateUrl: './material-acciones-modal.component.html',
  styleUrls: ['./material-acciones-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class MaterialAccionesModalComponent {
  private modalCtrl = inject(ModalController);

  @Input() material!: MaterialVista;

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  seleccionar(accion: AccionMaterial) {
    this.modalCtrl.dismiss({ accion }, 'confirm');
  }
}

