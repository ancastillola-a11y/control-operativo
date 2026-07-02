// src/app/paginas/trabajos/seguimiento-trabajos/seguimiento-trabajos.page.ts
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonicModule,
  ModalController,
  NavController,
  ToastController
} from '@ionic/angular';

import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable
} from 'rxjs';

import { TrabajoService } from '../../../procesos/trabajo.service';
import { DashboardAdminService } from '../../../procesos/dashboard-admin.service';

import { TrabajoVista } from '../../../modelos/trabajo';

import { AdminHeaderComponent } from '../../../shared/componentes/admin-header/admin-header.component';
import { AdminBottomNavComponent } from '../../../shared/componentes/admin-bottom-nav/admin-bottom-nav.component';
import { TrabajoDetalleModalComponent } from '../../../shared/componentes/trabajo-detalle-modal/trabajo-detalle-modal.component';

type FiltroSeguimiento =
  | 'todos'
  | 'pendientes'
  | 'en_camino'
  | 'en_proceso'
  | 'finalizados';

interface SeguimientoVM {
  trabajos: TrabajoVista[];
  trabajosFiltrados: TrabajoVista[];
  filtroActivo: FiltroSeguimiento;

  totalTrabajos: number;
  totalPendientes: number;
  totalEnCamino: number;
  totalEnProceso: number;
  totalFinalizados: number;
}

@Component({
  selector: 'app-seguimiento-trabajos',
  templateUrl: './seguimiento-trabajos.page.html',
  styleUrls: ['./seguimiento-trabajos.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    AdminHeaderComponent,
    AdminBottomNavComponent
  ]
})
export class SeguimientoTrabajosPage {
  private trabajoService = inject(TrabajoService);
  private dashboardAdminService = inject(DashboardAdminService);

  private navCtrl = inject(NavController);
  private modalCtrl = inject(ModalController);
  private toastCtrl = inject(ToastController);
  private cdr = inject(ChangeDetectorRef);

  adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();

  private filtroSubject = new BehaviorSubject<FiltroSeguimiento>('todos');
  private navegando = false;

  vm$: Observable<SeguimientoVM> = combineLatest([
    this.trabajoService.vm$,
    this.filtroSubject.asObservable()
  ]).pipe(
    map(([trabajoVm, filtroActivo]) => {
      const trabajosBase = trabajoVm.trabajos || [];

      const trabajos = trabajosBase.filter((trabajo) => {
        const estado = this.normalizarEstado(trabajo.estado);
        return estado !== 'cancelado';
      });

      const trabajosFiltrados = this.filtrarTrabajos(
        trabajos,
        filtroActivo
      );

      return {
        trabajos,
        trabajosFiltrados,
        filtroActivo,

        totalTrabajos: trabajos.length,
        totalPendientes: trabajos.filter((item) => this.normalizarEstado(item.estado) === 'pendiente').length,
        totalEnCamino: trabajos.filter((item) => this.normalizarEstado(item.estado) === 'en_camino').length,
        totalEnProceso: trabajos.filter((item) => this.normalizarEstado(item.estado) === 'en_proceso').length,
        totalFinalizados: trabajos.filter((item) => {
          const estado = this.normalizarEstado(item.estado);
          return estado === 'finalizado' || estado === 'devolucion_realizada';
        }).length
      };
    })
  );

  ionViewWillEnter() {
    this.trabajoService.cargarTrabajos();

    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  trackByTrabajo(
    index: number,
    trabajo: TrabajoVista
  ): string {
    return trabajo.uid || trabajo.id || String(index);
  }

  cambiarFiltro(filtro: FiltroSeguimiento) {
    this.filtroSubject.next(filtro);
  }

  verTodos() {
    this.filtroSubject.next('todos');
  }

  async abrirDetalleTrabajo(trabajo: TrabajoVista) {
    const modal = await this.modalCtrl.create({
      component: TrabajoDetalleModalComponent,
      cssClass: 'trabajo-detalle-modal',
      backdropDismiss: true,
      componentProps: {
        trabajo
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'codigos' || data?.accion === 'codigos') {
      this.abrirCodigosSeguridad(trabajo);
    }
  }

  abrirCodigosSeguridad(trabajo: TrabajoVista) {
    if (!trabajo.uid) {
      this.mostrarToast('El trabajo no tiene UID vÃ¡lido.', 'danger');
      return;
    }

   this.navCtrl.navigateForward(
  `/codigos-seguridad?trabajoUid=${encodeURIComponent(trabajo.uid)}`,
  {
    animated: false
  }
);
  }

  obtenerCodigoTrabajo(trabajo: TrabajoVista): string {
    const codigoGuardado = String(
      (trabajo as any).codigoTrabajo ||
      (trabajo as any).codigo ||
      ''
    ).trim();

    if (/^T-\d{5}$/i.test(codigoGuardado)) {
      return codigoGuardado.toUpperCase();
    }

    const id = String(trabajo.id || '').trim();

    if (/^T-\d{5}$/i.test(id)) {
      return id.toUpperCase();
    }

    const base = String(trabajo.uid || trabajo.id || trabajo.clienteNombre || 'TRABAJO');
    const numero = this.generarNumeroDesdeTexto(base);

    return `T-${numero.toString().padStart(5, '0')}`;
  }

  obtenerEstadoTexto(trabajo: TrabajoVista): string {
    const estado = this.normalizarEstado(trabajo.estado);

    const mapa: Record<string, string> = {
      pendiente: 'Pendiente',
      en_camino: 'En camino',
      en_proceso: 'En proceso',
      finalizado: 'Finalizado',
      devolucion_pendiente: 'Devolución pendiente',
      devolucion_realizada: 'Devolución realizada',
      cancelado: 'Cancelado'
    };

    return mapa[estado] || trabajo.estadoTexto || 'Pendiente';
  }

  obtenerClaseEstado(trabajo: TrabajoVista): string {
    return this.normalizarEstado(trabajo.estado);
  }

  obtenerFechaHoraSeguimiento(trabajo: TrabajoVista): string {
    const fechaDesdeTimestamp = this.obtenerFechaDesdeTimestamp(trabajo);

    if (fechaDesdeTimestamp) {
      return this.formatearFechaRelativa(fechaDesdeTimestamp);
    }

    const fecha = String(trabajo.fechaProgramada || '').trim();
    const hora = String(trabajo.horaProgramada || '').trim();

    if (!fecha && !hora) {
      return 'Sin hora';
    }

    const horaTexto = this.formatearHoraAmPm(hora);

    if (!fecha) {
      return horaTexto || 'Sin hora';
    }

    const fechaTexto = this.formatearFechaProgramada(fecha);

    if (!horaTexto) {
      return fechaTexto;
    }

    return `${fechaTexto}, ${horaTexto}`;
  }

  abrirMenu() {
    this.navegarRoot('/dashboard-admin');
  }

  abrirNotificaciones() {
  this.navCtrl.navigateRoot('/notificaciones-admin', {
    animated: false,
    replaceUrl: true
  });
}

  abrirPerfil() {
    this.mostrarToast('Configuración de perfil próximamente.', 'primary');
  }

  irAtras() {
    this.navegarRoot('/mas-admin');
  }

  irAsignacionTrabajos() {
    this.navegarRoot('/asignacion-trabajos');
  }

  private filtrarTrabajos(
    trabajos: TrabajoVista[],
    filtro: FiltroSeguimiento
  ): TrabajoVista[] {
    if (filtro === 'todos') {
      return trabajos;
    }

    if (filtro === 'pendientes') {
      return trabajos.filter((trabajo) => this.normalizarEstado(trabajo.estado) === 'pendiente');
    }

    if (filtro === 'en_camino') {
      return trabajos.filter((trabajo) => this.normalizarEstado(trabajo.estado) === 'en_camino');
    }

    if (filtro === 'en_proceso') {
      return trabajos.filter((trabajo) => this.normalizarEstado(trabajo.estado) === 'en_proceso');
    }

    if (filtro === 'finalizados') {
      return trabajos.filter((trabajo) => {
        const estado = this.normalizarEstado(trabajo.estado);
        return estado === 'finalizado' || estado === 'devolucion_realizada';
      });
    }

    return trabajos;
  }

  private normalizarEstado(estado: any): string {
    const valor = String(estado || '').trim();

    if (valor === 'enCamino') {
      return 'en_camino';
    }

    if (valor === 'enProceso') {
      return 'en_proceso';
    }

    if (valor === 'devolucionPendiente') {
      return 'devolucion_pendiente';
    }

    if (valor === 'devolucionRealizada') {
      return 'devolucion_realizada';
    }

    return valor || 'pendiente';
  }

  private generarNumeroDesdeTexto(texto: string): number {
    let hash = 0;

    for (let i = 0; i < texto.length; i++) {
      hash = ((hash << 5) - hash) + texto.charCodeAt(i);
      hash |= 0;
    }

    return Math.abs(hash) % 100000;
  }

  private obtenerFechaDesdeTimestamp(trabajo: TrabajoVista): Date | null {
    const updatedAt = (trabajo as any).updatedAt;
    const createdAt = (trabajo as any).createdAt;

    if (updatedAt?.toDate) {
      return updatedAt.toDate();
    }

    if (createdAt?.toDate) {
      return createdAt.toDate();
    }

    return null;
  }

  private formatearFechaRelativa(fecha: Date): string {
    const hoy = new Date();
    const ayer = new Date();
    ayer.setDate(hoy.getDate() - 1);

    const mismaFecha = (a: Date, b: Date): boolean => {
      return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
      );
    };

    const hora = this.formatearHoraAmPmDesdeDate(fecha);

    if (mismaFecha(fecha, hoy)) {
      return `Hoy, ${hora}`;
    }

    if (mismaFecha(fecha, ayer)) {
      return `Ayer, ${hora}`;
    }

    return `${this.dosDigitos(fecha.getDate())}/${this.dosDigitos(fecha.getMonth() + 1)}/${fecha.getFullYear()}, ${hora}`;
  }

  private formatearFechaProgramada(fecha: string): string {
    const partes = fecha.split('-');

    if (partes.length !== 3) {
      return fecha;
    }

    const anio = Number(partes[0]);
    const mes = Number(partes[1]) - 1;
    const dia = Number(partes[2]);

    const fechaObj = new Date(anio, mes, dia);

    if (Number.isNaN(fechaObj.getTime())) {
      return fecha;
    }

    const hoy = new Date();
    const ayer = new Date();
    ayer.setDate(hoy.getDate() - 1);

    const mismaFecha = (a: Date, b: Date): boolean => {
      return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
      );
    };

    if (mismaFecha(fechaObj, hoy)) {
      return 'Hoy';
    }

    if (mismaFecha(fechaObj, ayer)) {
      return 'Ayer';
    }

    return `${this.dosDigitos(dia)}/${this.dosDigitos(mes + 1)}/${anio}`;
  }

  private formatearHoraAmPm(hora: string): string {
    const limpio = String(hora || '').trim();

    if (!limpio) {
      return '';
    }

    const coincidencia = limpio.match(/^(\d{1,2}):(\d{2})/);

    if (!coincidencia) {
      return limpio;
    }

    const horas24 = Number(coincidencia[1]);
    const minutos = coincidencia[2];

    if (!Number.isFinite(horas24)) {
      return limpio;
    }

    const periodo = horas24 >= 12 ? 'p. m.' : 'a. m.';
    const horas12 = horas24 % 12 || 12;

    return `${this.dosDigitos(horas12)}:${minutos} ${periodo}`;
  }

  private formatearHoraAmPmDesdeDate(fecha: Date): string {
    const horas24 = fecha.getHours();
    const minutos = this.dosDigitos(fecha.getMinutes());
    const periodo = horas24 >= 12 ? 'p. m.' : 'a. m.';
    const horas12 = horas24 % 12 || 12;

    return `${this.dosDigitos(horas12)}:${minutos} ${periodo}`;
  }

  private dosDigitos(valor: number): string {
    return String(valor).padStart(2, '0');
  }

  private async navegarRoot(ruta: string) {
    if (this.navegando) {
      return;
    }

    this.navegando = true;

    try {
      await this.navCtrl.navigateRoot(ruta, {
        animated: false
      });
    } finally {
      setTimeout(() => {
        this.navegando = false;
      }, 300);
    }
  }

  private async mostrarToast(
    message: string,
    color: 'success' | 'danger' | 'primary' = 'primary'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2300,
      position: 'top',
      color
    });

    await toast.present();
  }
}

