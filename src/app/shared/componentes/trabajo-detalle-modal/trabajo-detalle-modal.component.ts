// src/app/shared/componentes/trabajo-detalle-modal/trabajo-detalle-modal.component.ts
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

import { TrabajoVista } from '../../../modelos/trabajo';

@Component({
  selector: 'app-trabajo-detalle-modal',
  templateUrl: './trabajo-detalle-modal.component.html',
  styleUrls: ['./trabajo-detalle-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class TrabajoDetalleModalComponent {
  private modalCtrl = inject(ModalController);

  @Input() trabajo!: TrabajoVista;

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  verCodigosSeguridad() {
    this.modalCtrl.dismiss(
      {
        accion: 'codigos',
        trabajoUid: this.trabajo?.uid || ''
      },
      'codigos'
    );
  }
}

