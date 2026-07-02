// src/app/shared/componentes/trabajo-form-modal/trabajo-form-modal.component.ts
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

import { TrabajoService } from '../../../procesos/trabajo.service';

import {
  TrabajoEmpleadoAsignado,
  TrabajoEmpleadoDisponible,
  TrabajoMaterialAsignado,
  TrabajoMaterialDisponible,
  TrabajoVista
} from '../../../modelos/trabajo';

import { TrabajoEmpleadosSelectorComponent } from '../trabajo-empleados-selector/trabajo-empleados-selector.component';
import { TrabajoMaterialesSelectorComponent } from '../trabajo-materiales-selector/trabajo-materiales-selector.component';
import {
  OsmMapPickerComponent,
  UbicacionOsmSeleccionada
} from '../osm-map-picker/osm-map-picker.component';
export type ModoTrabajoForm = 'crear' | 'editar';

@Component({
  selector: 'app-trabajo-form-modal',
  templateUrl: './trabajo-form-modal.component.html',
  styleUrls: ['./trabajo-form-modal.component.css'],
  standalone: true,
  imports: [
  CommonModule,
  IonicModule,
  ReactiveFormsModule,
  TrabajoEmpleadosSelectorComponent,
  TrabajoMaterialesSelectorComponent,
  OsmMapPickerComponent
]
})
export class TrabajoFormModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController);
  private toastCtrl = inject(ToastController);
  private trabajoService = inject(TrabajoService);

  @Input() modo: ModoTrabajoForm = 'crear';
  @Input() trabajo: TrabajoVista | null = null;

  pasoActual = 1;
  totalPasos = 4;

  empleadosDisponibles: TrabajoEmpleadoDisponible[] = [];
  materialesDisponibles: TrabajoMaterialDisponible[] = [];

  empleadosSeleccionados: TrabajoEmpleadoAsignado[] = [];
  materialesSeleccionados: TrabajoMaterialAsignado[] = [];

  cargandoDatos = false;
mostrarMapa = false;

latitudSeleccionada: number | null = null;
longitudSeleccionada: number | null = null;
direccionMapaSeleccionada = '';
ubicacionTextoOriginal = '';
  tiposTrabajo = [
    'Instalación eléctrica',
    'Mantenimiento eléctrico',
    'Reparación',
    'Inspección técnica',
    'Construcción',
    'Otro'
  ];

  formulario = this.fb.group({
    clienteNombre: ['', [Validators.required]],
    clienteTelefono: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    referencia: [''],

    tipoTrabajo: ['', [Validators.required]],
    descripcion: [''],

    fechaProgramada: ['', [Validators.required]],
    horaProgramada: ['', [Validators.required]],

    subtotal: [0, [Validators.required, Validators.min(0)]]
  });
alternarMapa() {
  this.mostrarMapa = !this.mostrarMapa;

  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 250);
}

actualizarUbicacionMapa(ubicacion: UbicacionOsmSeleccionada) {
  this.latitudSeleccionada = ubicacion.latitud;
  this.longitudSeleccionada = ubicacion.longitud;
  this.direccionMapaSeleccionada = ubicacion.direccionMapa;
  this.ubicacionTextoOriginal = ubicacion.ubicacionTextoOriginal;

  this.formulario.patchValue({
    direccion: ubicacion.direccionMapa || ubicacion.ubicacionTextoOriginal
  });
}
  async ngOnInit() {
    await this.cargarDatos();

    if (this.esEditar && this.trabajo) {
      this.formulario.patchValue({
        clienteNombre: this.trabajo.clienteNombre || '',
        clienteTelefono: this.trabajo.clienteTelefono || '',
        direccion: this.trabajo.direccion || '',
        referencia: this.trabajo.referencia || '',

        tipoTrabajo: this.trabajo.tipoTrabajo || '',
        descripcion: this.trabajo.descripcion || '',

        fechaProgramada: this.trabajo.fechaProgramada || '',
        horaProgramada: this.trabajo.horaProgramada || '',

        subtotal: Number(this.trabajo.subtotal || 0)
      });

      this.empleadosSeleccionados = [...(this.trabajo.empleadosAsignados || [])];
      this.materialesSeleccionados = [...(this.trabajo.materialesAsignados || [])];
    this.latitudSeleccionada = this.trabajo.latitud ?? null;
this.longitudSeleccionada = this.trabajo.longitud ?? null;
this.direccionMapaSeleccionada = this.trabajo.direccionMapa || '';
this.ubicacionTextoOriginal = this.trabajo.ubicacionTextoOriginal || '';
    }
  }

  get esCrear(): boolean {
    return this.modo === 'crear';
  }

  get esEditar(): boolean {
    return this.modo === 'editar';
  }

  get titulo(): string {
    return this.esCrear ? 'Nuevo trabajo' : 'Editar trabajo';
  }

  get subtitulo(): string {
    if (this.pasoActual === 1) {
      return 'Información principal del trabajo.';
    }

    if (this.pasoActual === 2) {
      return 'Seleccione los empleados responsables.';
    }

    if (this.pasoActual === 3) {
      return this.esCrear
        ? 'Seleccione materiales y cantidades.'
        : 'Materiales bloqueados por trazabilidad.';
    }

    return 'Revise la información antes de guardar.';
  }

  get textoBotonFinal(): string {
    return this.esCrear ? 'Asignar trabajo' : 'Guardar cambios';
  }

  get tituloPaso(): string {
    if (this.pasoActual === 1) {
      return 'Información';
    }

    if (this.pasoActual === 2) {
      return 'Empleados';
    }

    if (this.pasoActual === 3) {
      return 'Materiales';
    }

    return 'Confirmación';
  }

  get resumenMateriales(): string {
    if (this.materialesSeleccionados.length === 0) {
      return 'Sin materiales seleccionados';
    }

    return `${this.materialesSeleccionados.length} material(es) seleccionado(s)`;
  }

  get resumenEmpleados(): string {
    if (this.empleadosSeleccionados.length === 0) {
      return 'Sin empleados seleccionados';
    }

    return `${this.empleadosSeleccionados.length} empleado(s) seleccionado(s)`;
  }

  async cargarDatos() {
    this.cargandoDatos = true;

    try {
      const [empleados, materiales] = await Promise.all([
        this.trabajoService.obtenerEmpleadosDisponibles(),
        this.trabajoService.obtenerMaterialesDisponibles()
      ]);

      this.empleadosDisponibles = empleados;
      this.materialesDisponibles = materiales;
    } catch (error) {
      console.error(error);
      this.mostrarToast('No se pudieron cargar empleados o materiales');
    } finally {
      this.cargandoDatos = false;
    }
  }

  actualizarEmpleados(empleados: TrabajoEmpleadoAsignado[]) {
    this.empleadosSeleccionados = empleados;
  }

  actualizarMateriales(materiales: TrabajoMaterialAsignado[]) {
    this.materialesSeleccionados = materiales;
  }

  irPaso(paso: number) {
    if (paso < 1 || paso > this.totalPasos) {
      return;
    }

    if (paso > this.pasoActual && !this.validarPasoActual()) {
      return;
    }

    this.pasoActual = paso;
  }

  siguiente() {
    if (!this.validarPasoActual()) {
      return;
    }

    if (this.pasoActual < this.totalPasos) {
      this.pasoActual++;
    }
  }

  anterior() {
    if (this.pasoActual > 1) {
      this.pasoActual--;
    }
  }

  private validarPasoActual(): boolean {
    if (this.pasoActual === 1) {
      const campos = [
        'clienteNombre',
        'clienteTelefono',
        'direccion',
        'tipoTrabajo',
        'fechaProgramada',
        'horaProgramada',
        'subtotal'
      ];

      campos.forEach((campo) => {
        this.formulario.get(campo)?.markAsTouched();
      });

      if (
        this.formulario.get('clienteNombre')?.invalid ||
        this.formulario.get('clienteTelefono')?.invalid ||
        this.formulario.get('direccion')?.invalid ||
        this.formulario.get('tipoTrabajo')?.invalid ||
        this.formulario.get('fechaProgramada')?.invalid ||
        this.formulario.get('horaProgramada')?.invalid ||
        this.formulario.get('subtotal')?.invalid
      ) {
        this.mostrarToast('Complete correctamente la información del trabajo');
        return false;
      }
    }

    if (this.pasoActual === 2 && this.empleadosSeleccionados.length === 0) {
      this.mostrarToast('Seleccione al menos un empleado');
      return false;
    }

    if (
      this.pasoActual === 3 &&
      this.esCrear &&
      this.materialesSeleccionados.length === 0
    ) {
      this.mostrarToast('Seleccione al menos un material');
      return false;
    }

    return true;
  }

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async guardar() {
    this.formulario.markAllAsTouched();

    if (!this.validarPasoActual()) {
      return;
    }

    if (this.formulario.invalid) {
      this.mostrarToast('Complete correctamente los datos del trabajo');
      return;
    }

    if (this.empleadosSeleccionados.length === 0) {
      this.mostrarToast('Seleccione al menos un empleado');
      return;
    }

    if (this.esCrear && this.materialesSeleccionados.length === 0) {
      this.mostrarToast('Seleccione al menos un material');
      return;
    }

    const data = this.formulario.getRawValue();

    const payload: any = {
      clienteNombre: String(data.clienteNombre || '').trim(),
      clienteTelefono: String(data.clienteTelefono || '').trim(),
      direccion: String(data.direccion || '').trim(),
      referencia: String(data.referencia || '').trim(),
 latitud: this.latitudSeleccionada,
  longitud: this.longitudSeleccionada,
  direccionMapa: this.direccionMapaSeleccionada,
  ubicacionTextoOriginal: this.ubicacionTextoOriginal,
      tipoTrabajo: String(data.tipoTrabajo || '').trim(),
      descripcion: String(data.descripcion || '').trim(),

      fechaProgramada: String(data.fechaProgramada || '').trim(),
      horaProgramada: String(data.horaProgramada || '').trim(),

      subtotal: Number(data.subtotal || 0),

      empleadosAsignados: this.empleadosSeleccionados
    };

    if (this.esCrear) {
      payload.materialesAsignados = this.materialesSeleccionados;
    }

    if (this.esEditar && this.trabajo?.uid) {
      payload.uid = this.trabajo.uid;
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