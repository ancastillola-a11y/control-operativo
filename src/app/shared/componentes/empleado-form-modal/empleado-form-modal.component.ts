// src/app/shared/componentes/empleado-form-modal/empleado-form-modal.component.ts
import { Component, Input, OnInit, inject } from '@angular/core';
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

import { addIcons } from 'ionicons';

import {
  cameraOutline,
  closeOutline,
  cloudUploadOutline,
  informationCircleOutline,
  keyOutline,
  personOutline,
  saveOutline,
  trashOutline
} from 'ionicons/icons';

import { EmpleadoVista } from '../../../modelos/empleado';

export type ModoEmpleadoForm = 'crear' | 'editar';

@Component({
  selector: 'app-empleado-form-modal',
  templateUrl: './empleado-form-modal.component.html',
  styleUrls: ['./empleado-form-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class EmpleadoFormModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController);
  private toastCtrl = inject(ToastController);

  @Input() modo: ModoEmpleadoForm = 'crear';
  @Input() empleado: EmpleadoVista | null = null;

  fotoPreview = '';
  fotoArchivo: File | null = null;
  fotoNombre = '';
  subiendoFoto = false;

  private fotoUrlActual = '';

  formulario = this.fb.group({
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    dni: ['', [Validators.required, Validators.minLength(8)]],
    telefono: ['', [Validators.required, Validators.minLength(9)]],
    cargo: ['Personal operativo', [Validators.required]],
    usuario: ['', [Validators.required, Validators.minLength(4)]],
    password: ['']
  });

  constructor() {
    addIcons({
      'camera-outline': cameraOutline,
      'close-outline': closeOutline,
      'cloud-upload-outline': cloudUploadOutline,
      'information-circle-outline': informationCircleOutline,
      'key-outline': keyOutline,
      'person-outline': personOutline,
      'save-outline': saveOutline,
      'trash-outline': trashOutline
    });
  }

  ngOnInit() {
    if (this.esCrear) {
      this.formulario.get('password')?.setValidators([
        Validators.required,
        Validators.minLength(6)
      ]);
    }

    if (this.esEditar && this.empleado) {
      this.formulario.patchValue({
        nombres: this.empleado.nombres || '',
        apellidos: this.empleado.apellidos || '',
        dni: this.empleado.dni || '',
        telefono: this.empleado.telefono || '',
        cargo: this.empleado.cargo || 'Personal operativo',
        usuario: this.empleado.usuario || '',
        password: ''
      });

      this.formulario.get('password')?.clearValidators();

      this.fotoUrlActual = String(this.empleado.fotoUrl || '').trim();
      this.fotoPreview = this.fotoUrlActual;
    }

    this.formulario.get('password')?.updateValueAndValidity();
  }

  get esCrear(): boolean {
    return this.modo === 'crear';
  }

  get esEditar(): boolean {
    return this.modo === 'editar';
  }

  get titulo(): string {
    return this.esCrear ? 'Nuevo usuario empleado' : 'Editar empleado';
  }

  get subtitulo(): string {
    return this.esCrear
      ? 'Registra los datos del empleado y su acceso.'
      : 'Actualiza los datos operativos del empleado.';
  }

  get textoBoton(): string {
    if (this.subiendoFoto) {
      return 'Guardando...';
    }

    return this.esCrear ? 'Crear usuario' : 'Guardar cambios';
  }

  get iniciales(): string {
    const nombres = this.formulario.value.nombres || this.empleado?.nombres || '';
    const apellidos = this.formulario.value.apellidos || this.empleado?.apellidos || '';

    const inicial = `${nombres.charAt(0)}${apellidos.charAt(0)}`.toUpperCase();

    return inicial || 'EM';
  }

  async seleccionarFoto(event: Event) {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0] || null;

    if (!archivo) {
      return;
    }

    const errorArchivo = this.validarArchivoImagen(archivo);

    if (errorArchivo) {
      input.value = '';
      await this.mostrarToast(errorArchivo);
      return;
    }

    this.fotoArchivo = archivo;
    this.fotoNombre = archivo.name;

    console.log('[EmpleadoFormModal] Foto seleccionada:', {
      nombre: archivo.name,
      tipo: archivo.type,
      peso: archivo.size
    });

    const lector = new FileReader();

    lector.onload = () => {
      this.fotoPreview = String(lector.result || '');
    };

    lector.readAsDataURL(archivo);
  }

  quitarFoto() {
    this.fotoArchivo = null;
    this.fotoNombre = '';
    this.fotoPreview = '';
    this.fotoUrlActual = '';
  }

  cancelar() {
    if (this.subiendoFoto) {
      return;
    }

    this.modalCtrl.dismiss(null, 'cancel');
  }

  async guardar() {
  this.formulario.markAllAsTouched();

  if (this.formulario.invalid) {
    await this.mostrarToast('Complete correctamente los campos obligatorios');
    return;
  }

  const data = this.formulario.getRawValue();

  const payload: any = {
    nombres: String(data.nombres || '').trim(),
    apellidos: String(data.apellidos || '').trim(),
    dni: String(data.dni || '').trim(),
    telefono: String(data.telefono || '').trim(),
    cargo: String(data.cargo || '').trim() || 'Personal operativo',
    usuario: String(data.usuario || '').trim(),
    fotoUrl: this.fotoUrlActual,
    fotoArchivo: this.fotoArchivo || null
  };

  if (this.esCrear) {
    payload.password = String(data.password || '').trim();
  }

  if (this.esEditar && this.empleado?.uid) {
    payload.uid = this.empleado.uid;
  }

  await this.modalCtrl.dismiss(payload, 'confirm');
}

  private validarArchivoImagen(archivo: File): string {
    const tiposPermitidos = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp'
    ];

    if (!tiposPermitidos.includes(archivo.type)) {
      return 'Seleccione una imagen válida: JPG, PNG o WEBP';
    }

    const pesoMb = archivo.size / (1024 * 1024);

    if (pesoMb > 3) {
      return 'La imagen no debe superar los 3 MB';
    }

    return '';
  }

  private obtenerMensajeError(error: any): string {
    const code = String(error?.code || error?.message || '');

    if (code.includes('storage/unauthorized')) {
      return 'No tiene permisos para subir imágenes';
    }

    if (code.includes('storage/canceled')) {
      return 'La subida de imagen fue cancelada';
    }

    if (code.includes('uid-empleado-vacio')) {
      return 'No se encontró el UID del empleado';
    }

    if (code.includes('archivo-vacio')) {
      return 'No se seleccionó ninguna imagen';
    }

    return 'No se pudo guardar la imagen';
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