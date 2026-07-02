// src/app/shared/componentes/finanza-form-modal/finanza-form-modal.component.ts
import {
  Component,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core';

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

import { Subscription } from 'rxjs';

import { addIcons } from 'ionicons';

import {
  walletOutline,
  receiptOutline,
  peopleOutline,
  closeOutline,
  saveOutline,
  cashOutline,
  documentTextOutline,
  cardOutline,
  searchOutline,
  briefcaseOutline,
  locationOutline,
  calendarOutline,
  alertCircleOutline
} from 'ionicons/icons';

import { FinanzasService } from '../../../procesos/finanzas.service';

import {
  CrearMovimientoFinancieroData,
  MetodoPagoFinanciero,
  TipoMovimientoFinanciero,
  TrabajoEmpleadoFinanzas,
  TrabajoFinanzasVista
} from '../../../modelos/finanzas';

@Component({
  selector: 'app-finanza-form-modal',
  templateUrl: './finanza-form-modal.component.html',
  styleUrls: ['./finanza-form-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class FinanzaFormModalComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController);
  private toastCtrl = inject(ToastController);
  private finanzasService = inject(FinanzasService);

  private trabajosSub?: Subscription;

  pasoActual = 1;

  cargandoTrabajos = true;
  busquedaTrabajo = '';

  trabajos: TrabajoFinanzasVista[] = [];
  trabajosFiltrados: TrabajoFinanzasVista[] = [];
  trabajoSeleccionado: TrabajoFinanzasVista | null = null;

  metodosPago: {
    valor: MetodoPagoFinanciero;
    texto: string;
  }[] = [
    { valor: 'efectivo', texto: 'Efectivo' },
    { valor: 'yape', texto: 'Yape' },
    { valor: 'plin', texto: 'Plin' },
    { valor: 'transferencia', texto: 'Transferencia bancaria' },
    { valor: 'deposito', texto: 'Depósito' },
    { valor: 'tarjeta', texto: 'Tarjeta' },
    { valor: 'otro', texto: 'Otro' }
  ];

  formulario = this.fb.group({
    tipo: ['cobro_cliente' as TipoMovimientoFinanciero, [Validators.required]],

    trabajoUid: ['', [Validators.required]],
    codigoSeguimiento: ['', [Validators.required]],

    empleadoUid: [''],

    montoTotal: [null as number | null, [Validators.required, Validators.min(0.01)]],

    metodoPago: ['efectivo' as MetodoPagoFinanciero, [Validators.required]],
    metodoPagoOtro: [''],

    estadoInicial: ['pendiente' as 'pendiente' | 'cerrado', [Validators.required]],

    observacion: [''],
    actualizarMontoTrabajo: [true]
  });

  constructor() {
    addIcons({
      'wallet-outline': walletOutline,
      'receipt-outline': receiptOutline,
      'people-outline': peopleOutline,
      'close-outline': closeOutline,
      'save-outline': saveOutline,
      'cash-outline': cashOutline,
      'document-text-outline': documentTextOutline,
      'card-outline': cardOutline,
      'search-outline': searchOutline,
      'briefcase-outline': briefcaseOutline,
      'location-outline': locationOutline,
      'calendar-outline': calendarOutline,
      'alert-circle-outline': alertCircleOutline
    });
  }

  ngOnInit() {
    this.trabajosSub = this.finanzasService.obtenerTrabajosParaFinanzas$()
      .subscribe({
        next: (trabajos) => {
          this.trabajos = trabajos || [];
          this.cargandoTrabajos = false;
          this.actualizarFiltroTrabajos();
        },
        error: (error) => {
          console.error('[FinanzaFormModal] Error cargando trabajos:', error);
          this.cargandoTrabajos = false;
          this.trabajos = [];
          this.trabajosFiltrados = [];
        }
      });
  }

  ngOnDestroy() {
    if (this.trabajosSub) {
      this.trabajosSub.unsubscribe();
      this.trabajosSub = undefined;
    }
  }

  get tipoActual(): TipoMovimientoFinanciero {
    return this.formulario.value.tipo || 'cobro_cliente';
  }

  get esCobro(): boolean {
    return this.tipoActual === 'cobro_cliente';
  }

  get titulo(): string {
    return 'Registrar movimiento financiero';
  }

  get tituloPaso(): string {
    return this.pasoActual === 1
      ? 'Seleccionar trabajo'
      : this.esCobro
        ? 'Registrar cobro'
        : 'Registrar pago';
  }

  get subtitulo(): string {
    return this.pasoActual === 1
      ? 'Busque el trabajo por código de seguimiento, cliente, dirección o empleado.'
      : 'Complete los datos económicos del movimiento.';
  }

  get empleadosDisponibles(): TrabajoEmpleadoFinanzas[] {
    return this.trabajoSeleccionado?.empleadosAsignados || [];
  }

  get metodoPagoActual(): MetodoPagoFinanciero {
    return this.formulario.value.metodoPago || 'efectivo';
  }
get montoTrabajoActual(): number {
  return Number(this.trabajoSeleccionado?.subtotal || 0);
}

get montoIngresado(): number {
  return Number(this.formulario.value.montoTotal || 0);
}

get montoDiferenteTrabajo(): boolean {
  if (!this.esCobro || !this.trabajoSeleccionado) {
    return false;
  }

  return Math.abs(this.montoIngresado - this.montoTrabajoActual) > 0.009;
}

get textoMontoTrabajoActual(): string {
  return `S/ ${Number(this.montoTrabajoActual || 0).toFixed(2)}`;
}

get textoMontoIngresado(): string {
  return `S/ ${Number(this.montoIngresado || 0).toFixed(2)}`;
}
  buscarTrabajo(event: any) {
    this.busquedaTrabajo = String(event?.detail?.value || '').trim();
    this.actualizarFiltroTrabajos();
  }

  seleccionarTrabajo(trabajo: TrabajoFinanzasVista) {
    this.trabajoSeleccionado = trabajo;

    this.formulario.patchValue({
      trabajoUid: trabajo.uid,
      codigoSeguimiento: trabajo.codigoSeguimiento,
      empleadoUid: '',
      montoTotal: Number(trabajo.subtotal || 0) > 0
        ? Number(trabajo.subtotal || 0)
        : null
    });

    this.pasoActual = 2;
  }

  cambiarTrabajo() {
    this.pasoActual = 1;
  }

 seleccionarTipo(tipo: TipoMovimientoFinanciero) {
  this.formulario.patchValue({
    tipo,
    empleadoUid: '',
    montoTotal: tipo === 'cobro_cliente'
      ? Number(this.trabajoSeleccionado?.subtotal || 0) > 0
        ? Number(this.trabajoSeleccionado?.subtotal || 0)
        : null
      : null,
    actualizarMontoTrabajo: tipo === 'cobro_cliente'
  });
}

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async guardar() {
    this.formulario.markAllAsTouched();

    if (!this.trabajoSeleccionado) {
      await this.mostrarToast('Seleccione un trabajo.', 'danger');
      return;
    }

    if (this.formulario.invalid) {
      await this.mostrarToast('Complete los campos obligatorios.', 'danger');
      return;
    }

    const data = this.formulario.getRawValue();
    const tipo = data.tipo || 'cobro_cliente';

    const montoTotal = Number(data.montoTotal || 0);

    if (montoTotal <= 0) {
      await this.mostrarToast('Ingrese un monto válido mayor a cero.', 'danger');
      return;
    }

    if (tipo === 'pago_empleado' && !data.empleadoUid) {
      await this.mostrarToast('Seleccione el empleado a pagar.', 'danger');
      return;
    }

    if (data.metodoPago === 'otro' && !String(data.metodoPagoOtro || '').trim()) {
      await this.mostrarToast('Especifique el método de pago.', 'danger');
      return;
    }

    const empleado = this.obtenerEmpleadoSeleccionado(String(data.empleadoUid || ''));

    const esCobro = tipo === 'cobro_cliente';

    const personaNombre = esCobro
      ? this.trabajoSeleccionado.clienteNombre
      : empleado?.nombreCompleto || '';

    const concepto = esCobro
      ? `Cobro por ${this.trabajoSeleccionado.tipoTrabajo}`
      : `Pago por ${this.trabajoSeleccionado.tipoTrabajo}`;

    const payload: CrearMovimientoFinancieroData = {
      tipo,

      trabajoUid: this.trabajoSeleccionado.uid,
      codigoSeguimiento: this.trabajoSeleccionado.codigoSeguimiento,

      clienteNombre: this.trabajoSeleccionado.clienteNombre,

      empleadoUid: esCobro ? '' : empleado?.uid || '',
      empleadoNombre: esCobro ? '' : empleado?.nombreCompleto || '',

      personaNombre,
      concepto,

      descripcion: this.trabajoSeleccionado.descripcion || '',

      montoTotal,

      metodoPago: data.metodoPago || 'efectivo',
      metodoPagoOtro: String(data.metodoPagoOtro || '').trim(),

      estadoInicial: data.estadoInicial || 'pendiente',

      observacion: String(data.observacion || '').trim(),

      actualizarMontoTrabajo: esCobro && this.montoDiferenteTrabajo
  ? Boolean(data.actualizarMontoTrabajo)
  : false
    };

    await this.modalCtrl.dismiss(payload, 'confirm');
  }

  private actualizarFiltroTrabajos() {
    const texto = this.normalizar(this.busquedaTrabajo);

    const base = [...this.trabajos];

    if (!texto) {
      this.trabajosFiltrados = base.slice(0, 20);
      return;
    }

    this.trabajosFiltrados = base
      .filter((trabajo) => trabajo.textoBusqueda.includes(texto))
      .slice(0, 20);
  }

  private obtenerEmpleadoSeleccionado(
    uid: string
  ): TrabajoEmpleadoFinanzas | null {
    return this.empleadosDisponibles.find((item) => item.uid === uid) || null;
  }

  private normalizar(valor: string): string {
    return String(valor || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  private async mostrarToast(
    message: string,
    color: 'primary' | 'success' | 'danger' = 'primary'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2200,
      position: 'top',
      color
    });

    await toast.present();
  }
}