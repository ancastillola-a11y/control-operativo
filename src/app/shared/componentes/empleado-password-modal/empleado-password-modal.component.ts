// src/app/shared/componentes/empleado-password-modal/empleado-password-modal.component.ts
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonicModule,
  ModalController,
  ToastController
} from '@ionic/angular';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { EmpleadoVista } from '../../../modelos/empleado';

@Component({
  selector: 'app-empleado-password-modal',
  templateUrl: './empleado-password-modal.component.html',
  styleUrls: ['./empleado-password-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class EmpleadoPasswordModalComponent {
  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController);
  private toastCtrl = inject(ToastController);

  @Input() empleado!: EmpleadoVista;

  formulario = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmarPassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  get nombreEmpleado(): string {
    return this.empleado?.nombreCompleto || 'Empleado';
  }

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async guardar() {
    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      this.mostrarToast('Ingrese una contraseÃ±a vÃ¡lida');
      return;
    }

    const password = String(this.formulario.value.password || '').trim();
    const confirmarPassword = String(this.formulario.value.confirmarPassword || '').trim();

    if (password !== confirmarPassword) {
      this.mostrarToast('Las contraseÃ±as no coinciden');
      return;
    }

    await this.modalCtrl.dismiss(
      {
        password
      },
      'confirm'
    );
  }

  private async mostrarToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2200,
      color: 'danger',
      position: 'top'
    });

    await toast.present();
  }
}

