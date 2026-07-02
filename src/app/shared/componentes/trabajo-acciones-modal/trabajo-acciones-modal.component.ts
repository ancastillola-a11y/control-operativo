// src/app/shared/componentes/trabajo-acciones-modal/trabajo-acciones-modal.component.ts
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

import { TrabajoVista } from '../../../modelos/trabajo';

export type AccionTrabajo =
  | 'detalle'
  | 'editar'
  | 'codigos'
  | 'cancelar'
  | 'eliminar';

@Component({
  selector: 'app-trabajo-acciones-modal',
  templateUrl: './trabajo-acciones-modal.component.html',
  styleUrls: ['./trabajo-acciones-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class TrabajoAccionesModalComponent {
  private modalCtrl = inject(ModalController);

  @Input() trabajo!: TrabajoVista;

  get puedeCancelar(): boolean {
    return this.trabajo?.estado === 'pendiente';
  }

  get puedeEliminar(): boolean {
    return this.trabajo?.estado === 'pendiente' || this.trabajo?.estado === 'cancelado';
  }

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  seleccionar(accion: AccionTrabajo) {
    this.modalCtrl.dismiss({ accion }, 'confirm');
  }
}

