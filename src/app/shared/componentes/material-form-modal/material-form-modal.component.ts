// src/app/shared/componentes/material-form-modal/material-form-modal.component.ts
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

import { MaterialVista } from '../../../modelos/material';

export type ModoMaterialForm = 'crear' | 'editar';

@Component({
  selector: 'app-material-form-modal',
  templateUrl: './material-form-modal.component.html',
  styleUrls: ['./material-form-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class MaterialFormModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController);
  private toastCtrl = inject(ToastController);

  @Input() modo: ModoMaterialForm = 'crear';
  @Input() material: MaterialVista | null = null;

  imagenPreview = '';
  imagenFile: File | null = null;
  quitarImagen = false;

  unidades = [
    'Unidad',
    'Metro',
    'Kilogramo',
    'Bolsa',
    'Caja',
    'Galón',
    'Litro',
    'Rollo',
    'Paquete'
  ];

  categorias = [
    'Electrico',
    'Construcción',
    'Ferretería',
    'Pintura',
    'Herramientas',
    'Seguridad',
    'Otros'
  ];

  formulario = this.fb.group({
    nombre: ['', [Validators.required]],
    unidad: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    stockInicial: [0, [Validators.required, Validators.min(0)]],
    stockMinimo: [0, [Validators.required, Validators.min(0)]],
    descripcion: ['']
  });

  ngOnInit() {
    if (this.esEditar && this.material) {
      this.formulario.patchValue({
        nombre: this.material.nombre || '',
        unidad: this.material.unidad || '',
        categoria: this.material.categoria || '',
        stockInicial: Number(this.material.stockActual || 0),
        stockMinimo: Number(this.material.stockMinimo || 0),
        descripcion: this.material.descripcion || ''
      });

      this.imagenPreview = this.material.imagenUrl || '';
    }
  }

  get esCrear(): boolean {
    return this.modo === 'crear';
  }

  get esEditar(): boolean {
    return this.modo === 'editar';
  }

  get titulo(): string {
    return this.esCrear ? 'Nuevo material' : 'Editar material';
  }

  get subtitulo(): string {
    return this.esCrear
      ? 'Registra material, stock inicial e imagen.'
      : 'Actualiza datos generales del material.';
  }

  get textoBoton(): string {
    return this.esCrear ? 'Registrar' : 'Guardar';
  }

  seleccionarImagen(event: Event) {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (!archivo) {
      return;
    }

    if (!archivo.type.startsWith('image/')) {
      this.mostrarToast('Seleccione una imagen vÃ¡lida');
      return;
    }

    this.imagenFile = archivo;
    this.quitarImagen = false;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagenPreview = String(reader.result || '');
    };

    reader.readAsDataURL(archivo);
  }

  quitarImagenActual() {
    this.imagenFile = null;
    this.imagenPreview = '';
    this.quitarImagen = true;
  }

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async guardar() {
    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      this.mostrarToast('Complete correctamente los campos obligatorios');
      return;
    }

    const data = this.formulario.getRawValue();

    const payload: any = {
      nombre: String(data.nombre || '').trim(),
      unidad: String(data.unidad || '').trim(),
      categoria: String(data.categoria || '').trim(),
      descripcion: String(data.descripcion || '').trim(),
      stockInicial: Number(data.stockInicial || 0),
      stockMinimo: Number(data.stockMinimo || 0),
      imagenFile: this.imagenFile,
      quitarImagen: this.quitarImagen
    };

    if (this.esEditar && this.material?.uid) {
      payload.uid = this.material.uid;
      payload.imagenPathActual = this.material.imagenPath || '';
    }

    await this.modalCtrl.dismiss(payload, 'confirm');
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

