// src/app/shared/componentes/admin-confirm-modal/admin-confirm-modal.component.ts
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

export type AdminConfirmTipo =
  | 'danger'
  | 'warning'
  | 'success'
  | 'primary';

@Component({
  selector: 'app-admin-confirm-modal',
  templateUrl: './admin-confirm-modal.component.html',
  styleUrls: ['./admin-confirm-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class AdminConfirmModalComponent {
  private modalCtrl = inject(ModalController);

  @Input() tipo: AdminConfirmTipo = 'primary';
  @Input() icono = 'information-circle-outline';
  @Input() titulo = 'Confirmar acciÃ³n';
  @Input() mensaje = '';
  @Input() detalle = '';
  @Input() textoCancelar = 'Cancelar';
  @Input() textoConfirmar = 'Confirmar';

  cancelar() {
    this.modalCtrl.dismiss(false, 'cancel');
  }

  confirmar() {
    this.modalCtrl.dismiss(true, 'confirm');
  }
}

