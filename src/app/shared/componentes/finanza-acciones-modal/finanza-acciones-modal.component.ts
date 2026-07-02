// src/app/shared/componentes/finanza-acciones-modal/finanza-acciones-modal.component.ts
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  receiptOutline,
  peopleOutline,
  closeOutline,
  checkmarkCircleOutline,
  banOutline,
  chevronForwardOutline,
  cashOutline,
  timeOutline
} from 'ionicons/icons';

import { MovimientoFinancieroVista } from '../../../modelos/finanzas';

export type AccionFinanza =
  | 'cerrar'
  | 'anular'
  | 'sincronizar_trabajo';
@Component({
  selector: 'app-finanza-acciones-modal',
  templateUrl: './finanza-acciones-modal.component.html',
  styleUrls: ['./finanza-acciones-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class FinanzaAccionesModalComponent {
  private modalCtrl = inject(ModalController);

  @Input() movimiento!: MovimientoFinancieroVista;

  constructor() {
    addIcons({
      'receipt-outline': receiptOutline,
      'people-outline': peopleOutline,
      'close-outline': closeOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'ban-outline': banOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'cash-outline': cashOutline,
      'time-outline': timeOutline
    });
  }

  get icono(): string {
    return this.movimiento?.tipo === 'cobro_cliente'
      ? 'receipt-outline'
      : 'people-outline';
  }

  get titulo(): string {
    return this.movimiento?.codigo || this.movimiento?.concepto || 'Movimiento financiero';
  }

  get subtitulo(): string {
    return this.movimiento?.tipoTexto || 'Finanzas';
  }

  get cerrarTexto(): string {
    return this.movimiento?.tipo === 'cobro_cliente'
      ? 'Marcar como cobrado'
      : 'Marcar como pagado';
  }

  get cerrarDescripcion(): string {
    return this.movimiento?.tipo === 'cobro_cliente'
      ? 'Registrar que el cliente ya pagó el monto pendiente.'
      : 'Registrar que el empleado ya recibió su pago.';
  }

  get estaCerrado(): boolean {
    const estado = this.movimiento?.estado;

    return estado === 'cobrado' ||
      estado === 'pagado' ||
      estado === 'anulado';
  }

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  seleccionar(accion: AccionFinanza) {
    this.modalCtrl.dismiss({ accion }, 'confirm');
  }
}