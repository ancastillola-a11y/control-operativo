// src/app/paginas/empleado/dashboard-empleado/dashboard-empleado.page.ts
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import {
  AlertController,
  IonicModule,
  NavController,
  ToastController
} from '@ionic/angular';

import {
  Auth,
  signOut
} from '@angular/fire/auth';

import { addIcons } from 'ionicons';

import {
  alertCircleOutline,
  arrowBackOutline,
  briefcaseOutline,
  calendarOutline,
  callOutline,
  cameraOutline,
  cashOutline,
  checkmarkCircleOutline,
  checkmarkDoneOutline,
  chevronForwardOutline,
  clipboardOutline,
  constructOutline,
  copyOutline,
  cubeOutline,
  homeOutline,
  informationCircleOutline,
  locationOutline,
  mapOutline,
  navigateOutline,
  personCircleOutline,
  personOutline,
  pinOutline,
  playCircleOutline,
  refreshOutline,
  shieldCheckmarkOutline,
  timeOutline
} from 'ionicons/icons';

import { DashboardEmpleadoService } from '../../../procesos/dashboard-empleado.service';
import { GpsEmpleadoService } from '../../../procesos/gps-empleado.service';

import {
  DashboardEmpleadoUsuario,
  DashboardEmpleadoViewModel,
  DashboardTrabajoEmpleado
} from '../../../modelos/dashboard-empleado';

import { EmpleadoHeaderComponent } from '../../../shared/componentes/empleado-header/empleado-header.component';
import { EmpleadoBottomNavComponent } from '../../../shared/componentes/empleado-bottom-nav/empleado-bottom-nav.component';

import { InicioEmpleadoComponent } from './modulos/inicio-empleado/inicio-empleado.component';
import { TrabajosEmpleadoComponent } from './modulos/trabajos-empleado/trabajos-empleado.component';
import { DetalleTrabajoEmpleadoComponent } from './modulos/detalle-trabajo-empleado/detalle-trabajo-empleado.component';
import { CodigoVerificacionEmpleadoComponent } from './modulos/codigo-verificacion-empleado/codigo-verificacion-empleado.component';
import { CambioEstadoEmpleadoComponent } from './modulos/cambio-estado-empleado/cambio-estado-empleado.component';
import { FinalizarTrabajoEmpleadoComponent } from './modulos/finalizar-trabajo-empleado/finalizar-trabajo-empleado.component';
import { MaterialesPosesionEmpleadoComponent } from './modulos/materiales-posesion-empleado/materiales-posesion-empleado.component';
import { DevolucionesEmpleadoComponent } from './modulos/devoluciones-empleado/devoluciones-empleado.component';

export type ModuloEmpleado =
  | 'inicio'
  | 'trabajos'
  | 'detalle'
  | 'codigo'
  | 'cambioEstado'
  | 'finalizar'
  | 'materialesPosesion'
  | 'devoluciones';

export type FiltroTrabajosEmpleado =
  | 'pendientes'
  | 'proceso'
  | 'finalizadas'
  | 'todos';

export type EstadoDestinoEmpleado =
  | 'en_camino'
  | 'en_proceso';

interface MaterialDevueltoEmpleado {
  materialUid: string;
  nombre: string;
  unidad: string;
  cantidadAsignada: number;
  cantidadUsada: number;
  cantidadDevuelta: number;
}

interface FinalizarTrabajoEmpleadoEvento {
  trabajo: DashboardTrabajoEmpleado;
  empleado: DashboardEmpleadoUsuario;
  materialesUsados: number[];
  pagoConfirmado?: boolean;
  metodoPago?: string;
  observacion?: string;
}

interface RegistrarDevolucionEmpleadoEvento {
  trabajo: DashboardTrabajoEmpleado;
  empleado: DashboardEmpleadoUsuario;
  materialesDevueltos: MaterialDevueltoEmpleado[];
}

@Component({
  selector: 'app-dashboard-empleado',
  templateUrl: './dashboard-empleado.page.html',
  styleUrls: ['./dashboard-empleado.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,

    EmpleadoHeaderComponent,
    EmpleadoBottomNavComponent,

    InicioEmpleadoComponent,
    TrabajosEmpleadoComponent,
    DetalleTrabajoEmpleadoComponent,
    CodigoVerificacionEmpleadoComponent,
    CambioEstadoEmpleadoComponent,
    FinalizarTrabajoEmpleadoComponent,
    MaterialesPosesionEmpleadoComponent,
    DevolucionesEmpleadoComponent
  ]
})
export class DashboardEmpleadoPage {
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController);
  private auth = inject(Auth);

  private dashboardEmpleadoService = inject(DashboardEmpleadoService);
  private gpsEmpleadoService = inject(GpsEmpleadoService);

  vm$ = this.dashboardEmpleadoService.obtenerDashboardEmpleado$();

  gpsActivo$ = this.gpsEmpleadoService.activo$;
  gpsEstadoTexto$ = this.gpsEmpleadoService.estadoTexto$;

  moduloActual: ModuloEmpleado = 'inicio';

  filtroTrabajos: FiltroTrabajosEmpleado = 'pendientes';

  trabajoSeleccionado: DashboardTrabajoEmpleado | null = null;
  trabajoSeleccionadoUid = '';

  estadoDestino: EstadoDestinoEmpleado = 'en_camino';

  materialesUsadosFinalizacion: number[] = [];

  accionEnProcesoUid = '';

  constructor() {
    addIcons({
      'alert-circle-outline': alertCircleOutline,
      'arrow-back-outline': arrowBackOutline,
      'briefcase-outline': briefcaseOutline,
      'calendar-outline': calendarOutline,
      'call-outline': callOutline,
      'camera-outline': cameraOutline,
      'cash-outline': cashOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'checkmark-done-outline': checkmarkDoneOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'clipboard-outline': clipboardOutline,
      'construct-outline': constructOutline,
      'copy-outline': copyOutline,
      'cube-outline': cubeOutline,
      'home-outline': homeOutline,
      'information-circle-outline': informationCircleOutline,
      'location-outline': locationOutline,
      'map-outline': mapOutline,
      'navigate-outline': navigateOutline,
      'person-circle-outline': personCircleOutline,
      'person-outline': personOutline,
      'pin-outline': pinOutline,
      'play-circle-outline': playCircleOutline,
      'refresh-outline': refreshOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'time-outline': timeOutline
    });
  }

  irInicio() {
    this.moduloActual = 'inicio';
    this.subirPantalla();
  }

  irTrabajos() {
    this.moduloActual = 'trabajos';
    this.subirPantalla();
  }

  irDevoluciones() {
    this.moduloActual = 'devoluciones';
    this.subirPantalla();
  }

  irHistorial() {
    void this.mostrarToast(
      'El historial operativo se integrará después.',
      'primary'
    );
  }

  abrirDetalleTrabajo(trabajo: DashboardTrabajoEmpleado) {
    this.trabajoSeleccionado = trabajo;
    this.trabajoSeleccionadoUid = this.obtenerTrabajoUid(trabajo);
    this.moduloActual = 'detalle';
    this.subirPantalla();
  }

  irCodigo(trabajo: DashboardTrabajoEmpleado) {
    this.trabajoSeleccionado = trabajo;
    this.trabajoSeleccionadoUid = this.obtenerTrabajoUid(trabajo);
    this.moduloActual = 'codigo';
    this.subirPantalla();
  }

  irCambioEstado(
    trabajo: DashboardTrabajoEmpleado,
    estado: EstadoDestinoEmpleado
  ) {
    this.trabajoSeleccionado = trabajo;
    this.trabajoSeleccionadoUid = this.obtenerTrabajoUid(trabajo);
    this.estadoDestino = estado;
    this.moduloActual = 'cambioEstado';
    this.subirPantalla();
  }

  irFinalizar(trabajo: DashboardTrabajoEmpleado) {
    this.trabajoSeleccionado = trabajo;
    this.trabajoSeleccionadoUid = this.obtenerTrabajoUid(trabajo);

    this.materialesUsadosFinalizacion = this.obtenerMaterialesTrabajo(trabajo)
      .map((material) => this.obtenerCantidadAsignada(material));

    this.moduloActual = 'finalizar';
    this.subirPantalla();
  }

  trabajoActual(
    vm: DashboardEmpleadoViewModel
  ): DashboardTrabajoEmpleado | null {
    const uidSeleccionado = String(
      this.trabajoSeleccionadoUid ||
      this.trabajoSeleccionado?.uid ||
      this.trabajoSeleccionado?.id ||
      ''
    ).trim();

    if (!uidSeleccionado) {
      return this.trabajoSeleccionado;
    }

    const trabajoRemoto = (vm.trabajos || []).find((trabajo) =>
      this.obtenerTrabajoUid(trabajo) === uidSeleccionado
    );

    if (!trabajoRemoto) {
      return this.trabajoSeleccionado;
    }

    if (!this.trabajoSeleccionado) {
      return trabajoRemoto;
    }

    const estadoLocal = this.ordenEstadoFlujo(this.trabajoSeleccionado.estado);
    const estadoRemoto = this.ordenEstadoFlujo(trabajoRemoto.estado);

    if (estadoLocal > estadoRemoto) {
      return {
        ...(trabajoRemoto as any),
        ...(this.trabajoSeleccionado as any),
        codigoCliente:
          (trabajoRemoto as any).codigoCliente ||
          (this.trabajoSeleccionado as any).codigoCliente
      } as DashboardTrabajoEmpleado;
    }

    return trabajoRemoto;
  }

  sm41TotalAvisos(vm: DashboardEmpleadoViewModel): number {
    const trabajos = vm.trabajos || [];

    const pendientes = trabajos.filter((trabajo) =>
      trabajo.estado === 'pendiente'
    ).length;

    const devoluciones = trabajos.filter((trabajo) =>
      trabajo.estado === 'devolucion_pendiente'
    ).length;

    const trabajoActivo = trabajos.some((trabajo) =>
      [
        'pendiente',
        'en_camino',
        'en_proceso'
      ].includes(String(trabajo.estado || '').trim())
    );

    return pendientes + devoluciones + (trabajoActivo ? 1 : 0);
  }

  sm41VerTodas() {
    void this.mostrarToast(
      'Las notificaciones completas se integrarán después.',
      'primary'
    );
  }

  async confirmarCambioEstado(
    evento: DashboardTrabajoEmpleado | {
      trabajo: DashboardTrabajoEmpleado;
      estadoDestino?: EstadoDestinoEmpleado;
      empleado?: DashboardEmpleadoUsuario;
    },
    empleadoParametro?: DashboardEmpleadoUsuario
  ) {
    const trabajo = this.extraerTrabajoEvento(evento);
    const empleado = empleadoParametro || (evento as any)?.empleado || null;
    const estadoDestino = (evento as any)?.estadoDestino || this.estadoDestino;

    if (!trabajo || !empleado) {
      await this.mostrarToast(
        'No se pudo identificar el trabajo o el empleado.',
        'danger'
      );
      return;
    }

    if (!this.bloquearAccionTrabajo(trabajo)) {
      return;
    }

    try {
      if (estadoDestino === 'en_camino') {
        await this.dashboardEmpleadoService.marcarEnCamino(
          trabajo,
          empleado
        );

        this.trabajoSeleccionado = this.crearTrabajoLocalConEstado(
          trabajo,
          'en_camino'
        );

        await this.mostrarToast(
          'Trabajo marcado como en camino.',
          'success'
        );
      }

      if (estadoDestino === 'en_proceso') {
        await this.dashboardEmpleadoService.iniciarTrabajo(
          trabajo,
          empleado
        );

        this.trabajoSeleccionado = this.crearTrabajoLocalConEstado(
          trabajo,
          'en_proceso'
        );

        await this.mostrarToast(
          'Trabajo iniciado correctamente.',
          'success'
        );
      }

      this.trabajoSeleccionadoUid = this.obtenerTrabajoUid(trabajo);
      this.moduloActual = 'detalle';
      this.subirPantalla();
    } catch (error) {
      console.error('[DashboardEmpleadoPage] Error cambiando estado:', error);
      await this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    } finally {
      this.liberarAccionTrabajo(trabajo);
    }
  }

  async finalizarDesdeModulo(
    evento: FinalizarTrabajoEmpleadoEvento
  ) {
    const trabajo = evento?.trabajo;
    const empleado = evento?.empleado;

    if (!trabajo || !empleado) {
      await this.mostrarToast(
        'No se pudo identificar el trabajo o el empleado.',
        'danger'
      );
      return;
    }

    if (!this.bloquearAccionTrabajo(trabajo)) {
      return;
    }

    try {
      this.materialesUsadosFinalizacion =
        Array.isArray(evento.materialesUsados)
          ? evento.materialesUsados
          : this.obtenerMaterialesTrabajo(trabajo).map((material) =>
              this.obtenerCantidadAsignada(material)
            );

      await this.dashboardEmpleadoService.finalizarTrabajo(
        trabajo,
        empleado
      );

      this.trabajoSeleccionado = this.crearTrabajoLocalFinalizado(
        trabajo,
        this.materialesUsadosFinalizacion
      );

      this.trabajoSeleccionadoUid = this.obtenerTrabajoUid(trabajo);
      this.moduloActual = 'materialesPosesion';

      await this.mostrarToast(
        'Trabajo finalizado correctamente.',
        'success'
      );

      this.subirPantalla();
    } catch (error) {
      console.error('[DashboardEmpleadoPage] Error finalizando trabajo:', error);
      await this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    } finally {
      this.liberarAccionTrabajo(trabajo);
    }
  }

  async registrarDevolucionDesdeModulo(
    evento: RegistrarDevolucionEmpleadoEvento
  ) {
    const trabajo = evento?.trabajo;
    const empleado = evento?.empleado;
    const materialesDevueltos = this.normalizarMaterialesDevueltos(
      evento?.materialesDevueltos || []
    );

    if (!trabajo || !empleado) {
      await this.mostrarToast(
        'No se pudo identificar el trabajo o el empleado.',
        'danger'
      );
      return;
    }

    if (materialesDevueltos.length === 0) {
      await this.mostrarToast(
        'No hay materiales sobrantes para devolver.',
        'primary'
      );
      return;
    }

    const confirmado = await this.confirmarAccionEstado(
      'Registrar devolución',
      'Se registrarán los materiales sobrantes para que el administrador los valide y recién ahí vuelvan al stock.'
    );

    if (!confirmado) {
      return;
    }

    if (!this.bloquearAccionTrabajo(trabajo)) {
      return;
    }

    try {
      await this.dashboardEmpleadoService.registrarDevolucion(
        trabajo,
        empleado,
        materialesDevueltos
      );

      this.trabajoSeleccionado = this.crearTrabajoLocalConDevolucion(
        trabajo,
        materialesDevueltos
      );

      this.trabajoSeleccionadoUid = this.obtenerTrabajoUid(trabajo);
      this.moduloActual = 'devoluciones';

      await this.mostrarToast(
        'Devolución registrada. El administrador debe validarla.',
        'success'
      );

      this.subirPantalla();
    } catch (error) {
      console.error('[DashboardEmpleadoPage] Error registrando devolución:', error);
      await this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    } finally {
      this.liberarAccionTrabajo(trabajo);
    }
  }

  async copiarCodigoCliente(
    valor: DashboardTrabajoEmpleado | string
  ) {
    const codigo = typeof valor === 'string'
      ? valor
      : this.obtenerCodigoCliente(valor);

    if (!codigo || codigo === '----') {
      await this.mostrarToast(
        'Este trabajo todavía no tiene código generado.',
        'primary'
      );
      return;
    }

    const copiado = await this.copiarTexto(codigo);

    await this.mostrarToast(
      copiado
        ? `Código copiado: ${codigo}`
        : `Código vigente: ${codigo}`,
      'success'
    );
  }

  llamarCliente(trabajo: DashboardTrabajoEmpleado) {
    const telefono = String((trabajo as any).clienteTelefono || '').trim();

    if (!telefono) {
      void this.mostrarToast(
        'Este trabajo no tiene teléfono registrado.',
        'primary'
      );
      return;
    }

    window.open(`tel:${telefono}`, '_self');
  }

  abrirRutaTrabajo(trabajo: DashboardTrabajoEmpleado | null) {
    if (!trabajo) {
      void this.mostrarToast(
        'No tienes un trabajo seleccionado.',
        'primary'
      );
      return;
    }

    const url = this.gpsEmpleadoService.obtenerUrlRutaGoogleMaps(trabajo);
    window.open(url, '_blank');
  }

  async activarGps(
    empleado: DashboardEmpleadoUsuario,
    trabajo: DashboardTrabajoEmpleado | null
  ) {
    try {
      await this.gpsEmpleadoService.activarSeguimiento(
        empleado,
        trabajo
      );

      await this.mostrarToast(
        'GPS activado. El administrador ya puede ver tu ubicación.',
        'success'
      );
    } catch (error) {
      console.error('[DashboardEmpleadoPage] Error activando GPS:', error);
      await this.mostrarToast(this.obtenerMensajeErrorGps(error), 'danger');
    }
  }

  async desactivarGps() {
    this.gpsEmpleadoService.desactivarSeguimiento();

    await this.mostrarToast(
      'GPS desactivado.',
      'primary'
    );
  }

  async abrirPerfil() {
    const alert = await this.alertCtrl.create({
      header: 'Perfil del empleado',
      message: '¿Deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cerrar sesión',
          role: 'confirm'
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    if (role === 'confirm') {
      await this.cerrarSesion();
    }
  }

  async cerrarSesion() {
    try {
      this.gpsEmpleadoService.desactivarSeguimiento();

      await signOut(this.auth);

      await this.navCtrl.navigateRoot('/seleccion-usuario', {
        animated: false,
        replaceUrl: true
      });
    } catch (error) {
      console.error('[DashboardEmpleadoPage] Error al cerrar sesión:', error);

      await this.mostrarToast(
        'No se pudo cerrar sesión.',
        'danger'
      );
    }
  }

  async refrescar(event: any) {
    setTimeout(() => {
      event?.target?.complete?.();
    }, 500);
  }

  async refrescarManual() {
    await this.mostrarToast(
      'Información actualizada.',
      'success'
    );
  }

  trackByTrabajo(
    index: number,
    trabajo: DashboardTrabajoEmpleado
  ): string {
    return trabajo.uid || trabajo.id || String(index);
  }

  estaProcesando(trabajo: DashboardTrabajoEmpleado): boolean {
    const uid = this.obtenerTrabajoUid(trabajo);

    return !!uid && this.accionEnProcesoUid === uid;
  }

  private extraerTrabajoEvento(
    evento: DashboardTrabajoEmpleado | {
      trabajo: DashboardTrabajoEmpleado;
    }
  ): DashboardTrabajoEmpleado | null {
    const data = evento as any;

    if (data?.trabajo) {
      return data.trabajo as DashboardTrabajoEmpleado;
    }

    if (data?.uid || data?.id) {
      return evento as DashboardTrabajoEmpleado;
    }

    return null;
  }

  private obtenerTrabajoUid(
    trabajo: DashboardTrabajoEmpleado
  ): string {
    return String(trabajo.uid || trabajo.id || '').trim();
  }

  private obtenerMaterialesTrabajo(
    trabajo: DashboardTrabajoEmpleado
  ): any[] {
    return Array.isArray((trabajo as any).materialesAsignados)
      ? (trabajo as any).materialesAsignados
      : [];
  }

  private obtenerCantidadAsignada(material: any): number {
    return Number(
      material?.cantidadAsignada ??
      material?.cantidad ??
      material?.cantidadEntregada ??
      0
    ) || 0;
  }

  private obtenerCodigoCliente(
    trabajo: DashboardTrabajoEmpleado
  ): string {
    const data = trabajo as any;

    const codigo = String(
      data.codigoCliente ||
      data.codigoVerificacionCliente ||
      data.codigoVerificacion ||
      data.codigoSeguridadCliente ||
      data.codigoClienteVerificacion ||
      data.codigoValidacionCliente ||
      data.codigoTrabajoVerificacion ||
      ''
    ).trim();

    return codigo || '----';
  }

  private crearTrabajoLocalConEstado(
    trabajo: DashboardTrabajoEmpleado,
    estado: 'en_camino' | 'en_proceso' | 'finalizado'
  ): DashboardTrabajoEmpleado {
    return {
      ...(trabajo as any),
      estado,
      estadoTexto: this.obtenerEstadoTexto(estado),
      estadoClase: estado
    } as DashboardTrabajoEmpleado;
  }

  private crearTrabajoLocalFinalizado(
    trabajo: DashboardTrabajoEmpleado,
    materialesUsados: number[]
  ): DashboardTrabajoEmpleado {
    const materialesAsignados = this.obtenerMaterialesTrabajo(trabajo)
      .map((material, index) => ({
        ...material,
        cantidadUsada: Number(
          materialesUsados[index] ??
          this.obtenerCantidadAsignada(material)
        )
      }));

    return {
      ...(trabajo as any),
      estado: 'finalizado',
      estadoTexto: 'Finalizado',
      estadoClase: 'finalizado',
      materialesAsignados
    } as DashboardTrabajoEmpleado;
  }

  private crearTrabajoLocalConDevolucion(
    trabajo: DashboardTrabajoEmpleado,
    materialesDevueltos: MaterialDevueltoEmpleado[]
  ): DashboardTrabajoEmpleado {
    const materialesAsignados = this.obtenerMaterialesTrabajo(trabajo)
      .map((material) => {
        const materialUid = String(
          material.materialUid ||
          material.uid ||
          material.id ||
          material.materialId ||
          ''
        ).trim();

        const devuelto = materialesDevueltos.find((item) =>
          item.materialUid === materialUid
        );

        if (!devuelto) {
          return {
            ...material,
            materialUid,
            cantidadDevuelta: Number(material.cantidadDevuelta || 0)
          };
        }

        return {
          ...material,
          materialUid,
          nombre: material.nombre || material.materialNombre || devuelto.nombre,
          unidad: material.unidad || devuelto.unidad || 'und',
          cantidadAsignada: Number(
            material.cantidadAsignada ??
            material.cantidad ??
            devuelto.cantidadAsignada ??
            0
          ),
          cantidadUsada: Number(devuelto.cantidadUsada || 0),
          cantidadDevuelta: Number(devuelto.cantidadDevuelta || 0)
        };
      });

    return {
      ...(trabajo as any),
      estado: 'devolucion_pendiente',
      estadoTexto: 'Devolución pendiente',
      estadoClase: 'devolucion_pendiente',
      devolucionRegistrada: true,
      devolucionValidada: false,
      materialesAsignados
    } as DashboardTrabajoEmpleado;
  }

  private normalizarMaterialesDevueltos(
    materiales: MaterialDevueltoEmpleado[]
  ): MaterialDevueltoEmpleado[] {
    return (materiales || [])
      .map((item) => ({
        materialUid: String(item.materialUid || '').trim(),
        nombre: String(item.nombre || 'Material').trim(),
        unidad: String(item.unidad || 'und').trim(),
        cantidadAsignada: Number(item.cantidadAsignada || 0),
        cantidadUsada: Number(item.cantidadUsada || 0),
        cantidadDevuelta: Number(item.cantidadDevuelta || 0)
      }))
      .filter((item) =>
        item.materialUid &&
        item.cantidadDevuelta > 0
      );
  }

  private obtenerEstadoTexto(estado: string): string {
    const mapa: Record<string, string> = {
      pendiente: 'Pendiente',
      en_camino: 'En camino',
      en_proceso: 'En proceso',
      finalizado: 'Finalizado',
      devolucion_pendiente: 'Devolución pendiente',
      devolucion_realizada: 'Devolución validada',
      cancelado: 'Cancelado'
    };

    return mapa[String(estado || '').trim()] || 'Pendiente';
  }

  private ordenEstadoFlujo(estado: string): number {
    const mapa: Record<string, number> = {
      pendiente: 1,
      en_camino: 2,
      en_proceso: 3,
      finalizado: 4,
      devolucion_pendiente: 5,
      devolucion_realizada: 6,
      cancelado: 7
    };

    return mapa[String(estado || '').trim()] || 0;
  }

  private bloquearAccionTrabajo(
    trabajo: DashboardTrabajoEmpleado
  ): boolean {
    const uid = this.obtenerTrabajoUid(trabajo);

    if (!uid) {
      return false;
    }

    if (this.accionEnProcesoUid === uid) {
      return false;
    }

    this.accionEnProcesoUid = uid;
    return true;
  }

  private liberarAccionTrabajo(
    trabajo: DashboardTrabajoEmpleado
  ): void {
    const uid = this.obtenerTrabajoUid(trabajo);

    if (this.accionEnProcesoUid === uid) {
      this.accionEnProcesoUid = '';
    }
  }

  private async confirmarAccionEstado(
    titulo: string,
    mensaje: string
  ): Promise<boolean> {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          role: 'confirm'
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    return role === 'confirm';
  }

  private async copiarTexto(valor: string): Promise<boolean> {
    try {
      if (
        typeof navigator !== 'undefined' &&
        navigator.clipboard &&
        navigator.clipboard.writeText
      ) {
        await navigator.clipboard.writeText(valor);
        return true;
      }

      const input = document.createElement('textarea');
      input.value = valor;
      input.style.position = 'fixed';
      input.style.left = '-9999px';
      input.style.top = '-9999px';

      document.body.appendChild(input);
      input.focus();
      input.select();

      const resultado = document.execCommand('copy');

      document.body.removeChild(input);

      return resultado;
    } catch (error) {
      console.warn('[DashboardEmpleadoPage] No se pudo copiar:', error);
      return false;
    }
  }

  private subirPantalla() {
    setTimeout(() => {
      document.querySelector('.sm-container')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 50);
  }

  private obtenerMensajeErrorGps(error: any): string {
    const code = String(error?.code || error?.message || error || '');

    if (code.includes('empleado-sin-acceso')) {
      return 'Tu usuario no tiene acceso operativo habilitado.';
    }

    if (code.includes('gps-permiso-denegado')) {
      return 'El permiso de ubicación fue denegado.';
    }

    if (code.includes('gps-no-disponible')) {
      return 'El celular no pudo entregar ubicación. Activa el GPS.';
    }

    if (code.includes('permission-denied')) {
      return 'Firestore no permitió guardar la ubicación.';
    }

    return 'No se pudo activar el GPS.';
  }

  private obtenerMensajeError(error: any): string {
    const code = String(error?.code || error?.message || error || '');

    if (code.includes('empleado-sin-acceso')) {
      return 'Tu usuario no tiene acceso operativo habilitado.';
    }

    if (code.includes('empleado-sin-uid')) {
      return 'No se encontró el UID del empleado.';
    }

    if (code.includes('trabajo-no-pendiente')) {
      return 'Solo puedes marcar en camino un trabajo pendiente.';
    }

    if (code.includes('trabajo-no-en-camino')) {
      return 'Primero marca el trabajo como en camino.';
    }

    if (code.includes('trabajo-no-en-proceso')) {
      return 'Solo puedes finalizar un trabajo en proceso.';
    }

    if (code.includes('trabajo-no-finalizado')) {
      return 'Primero debes finalizar el trabajo para registrar devolución.';
    }

    if (code.includes('sin-materiales-devolver')) {
      return 'No hay materiales sobrantes para devolver.';
    }

    if (code.includes('permission-denied')) {
      return 'No tienes permisos para actualizar este trabajo.';
    }

    return 'No se pudo completar la operación.';
  }

  private async mostrarToast(
    message: string,
    color: 'primary' | 'success' | 'danger' = 'primary'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2400,
      position: 'top',
      color
    });

    await toast.present();
  }
}