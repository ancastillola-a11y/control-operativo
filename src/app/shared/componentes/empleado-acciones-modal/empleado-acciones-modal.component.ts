// src/app/shared/componentes/empleado-acciones-modal/empleado-acciones-modal.component.ts
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  cameraOutline,
  checkmarkCircleOutline,
  chevronForwardOutline,
  closeCircleOutline,
  closeOutline,
  createOutline,
  keyOutline,
  trashOutline
} from 'ionicons/icons';

import { EmpleadoVista } from '../../../modelos/empleado';

export type AccionEmpleado =
  | 'editar'
  | 'foto'
  | 'password'
  | 'estado'
  | 'eliminar';

@Component({
  selector: 'app-empleado-acciones-modal',
  templateUrl: './empleado-acciones-modal.component.html',
  styleUrls: ['./empleado-acciones-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class EmpleadoAccionesModalComponent {
  private modalCtrl = inject(ModalController);

  @Input() empleado!: EmpleadoVista;

  constructor() {
    addIcons({
      'camera-outline': cameraOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'close-circle-outline': closeCircleOutline,
      'close-outline': closeOutline,
      'create-outline': createOutline,
      'key-outline': keyOutline,
      'trash-outline': trashOutline
    });
  }

  get iniciales(): string {
    return this.empleado?.iniciales || 'EM';
  }

  get nombre(): string {
    return this.empleado?.nombreCompleto || 'Empleado';
  }

  get cargo(): string {
    return this.empleado?.cargoTexto || this.empleado?.cargo || 'Personal operativo';
  }

  get codigo(): string {
    return this.empleado?.codigoEmpleadoTexto ||
      this.empleado?.codigoEmpleado ||
      'E-00000';
  }

  get estadoTexto(): string {
    return this.empleado?.habilitado ? 'Activo' : 'Inactivo';
  }

  get accionEstadoTexto(): string {
    return this.empleado?.habilitado ? 'Deshabilitar usuario' : 'Habilitar usuario';
  }

  get accionEstadoIcono(): string {
    return this.empleado?.habilitado ? 'close-circle-outline' : 'checkmark-circle-outline';
  }

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  seleccionar(accion: AccionEmpleado) {
    this.modalCtrl.dismiss({ accion }, 'confirm');
  }
}