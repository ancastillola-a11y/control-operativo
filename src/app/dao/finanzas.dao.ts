// src/app/dao/finanzas.dao.ts
import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp
} from '@angular/fire/firestore';

import { Auth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  CrearMovimientoFinancieroData,
  EstadoMovimientoFinanciero,
  MetodoPagoFinanciero,
  MovimientoFinanciero,
  TrabajoFinanzasVista
} from '../modelos/finanzas';

@Injectable({
  providedIn: 'root'
})
export class FinanzasDAO {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  obtenerMovimientos$(): Observable<MovimientoFinanciero[]> {
    const ref = collection(this.firestore, 'finanzas_movimientos');

    return collectionData(ref, { idField: 'id' }).pipe(
      map((data) =>
        (data as MovimientoFinanciero[])
          .map((item) => ({
            ...item,
            uid: item.uid || item.id
          }))
          .filter((item) => item.eliminado !== true)
      ),
      catchError((error) => {
        console.error('[FinanzasDAO] Error obteniendo movimientos:', error);
        return of([]);
      })
    );
  }

  obtenerTrabajosParaFinanzas$(): Observable<TrabajoFinanzasVista[]> {
    const ref = collection(this.firestore, 'trabajos');

    return collectionData(ref, { idField: 'id' }).pipe(
      map((data) =>
        (data as any[])
          .map((trabajo) => this.mapearTrabajoFinanzas(trabajo))
          .filter((trabajo) => !!trabajo.uid)
          .sort((a, b) =>
            String(b.uid || '').localeCompare(String(a.uid || ''))
          )
      ),
      catchError((error) => {
        console.error('[FinanzasDAO] Error obteniendo trabajos:', error);
        return of([]);
      })
    );
  }

  async crearMovimiento(data: CrearMovimientoFinancieroData): Promise<string> {
    const ref = doc(collection(this.firestore, 'finanzas_movimientos'));
    const adminUid = this.auth.currentUser?.uid || '';

    const montoTotal = Number(data.montoTotal || 0);
    const cerrado = data.estadoInicial === 'cerrado';

    const estado: EstadoMovimientoFinanciero = cerrado
      ? data.tipo === 'cobro_cliente'
        ? 'cobrado'
        : 'pagado'
      : 'pendiente';

    const montoPagado = cerrado ? montoTotal : 0;
    const saldoPendiente = cerrado ? 0 : montoTotal;

    const codigo = await this.generarCodigoMovimiento(data.tipo);
    const metodoPago: MetodoPagoFinanciero = data.metodoPago || 'efectivo';

    const movimiento: MovimientoFinanciero = {
      uid: ref.id,
      codigo,

      tipo: data.tipo,
      estado,

      trabajoUid: String(data.trabajoUid || '').trim(),
      codigoSeguimiento: String(data.codigoSeguimiento || '').trim(),

      concepto: String(data.concepto || '').trim(),
      descripcion: String(data.descripcion || '').trim(),

      clienteNombre: String(data.clienteNombre || '').trim(),

      empleadoUid: String(data.empleadoUid || '').trim(),
      empleadoNombre: String(data.empleadoNombre || '').trim(),

      personaNombre: String(data.personaNombre || '').trim(),

      montoTotal,
      montoPagado,
      saldoPendiente,

      metodoPago,
      metodoPagoTexto: this.obtenerMetodoPagoTexto(
        metodoPago,
        data.metodoPagoOtro || ''
      ),
      metodoPagoOtro: String(data.metodoPagoOtro || '').trim(),

      observacion: String(data.observacion || '').trim(),

      actualizarMontoTrabajo: data.actualizarMontoTrabajo === true,

      eliminado: false,

      creadoPorUid: adminUid,
      actualizadoPorUid: adminUid,

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(ref, movimiento);

    if (
      movimiento.tipo === 'cobro_cliente' &&
      movimiento.actualizarMontoTrabajo === true
    ) {
      await this.sincronizarTrabajoConCobro(movimiento);
    }

    await this.registrarHistorial(
      'crear_movimiento_financiero',
      `Se registró ${codigo} para ${movimiento.codigoSeguimiento}.`,
      ref.id
    );

    return ref.id;
  }

  async actualizarEstadoMovimiento(
    uid: string,
    estado: EstadoMovimientoFinanciero,
    data: Partial<MovimientoFinanciero> = {}
  ): Promise<void> {
    const ref = doc(this.firestore, 'finanzas_movimientos', uid);
    const adminUid = this.auth.currentUser?.uid || '';

    await updateDoc(ref, {
      ...data,
      estado,
      actualizadoPorUid: adminUid,
      updatedAt: serverTimestamp()
    });

    await this.registrarHistorial(
      'actualizar_estado_financiero',
      `Se actualizó el movimiento financiero a ${estado}.`,
      uid
    );
  }

  async eliminarMovimiento(uid: string): Promise<void> {
    const ref = doc(this.firestore, 'finanzas_movimientos', uid);
    const adminUid = this.auth.currentUser?.uid || '';

    await updateDoc(ref, {
      eliminado: true,
      eliminadoPorUid: adminUid,
      deletedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    await this.registrarHistorial(
      'eliminar_movimiento_financiero',
      'Se anuló un movimiento financiero.',
      uid
    );
  }

  async sincronizarTrabajoDesdeMovimiento(
    movimiento: MovimientoFinanciero
  ): Promise<void> {
    if (!movimiento) {
      return;
    }

    if (movimiento.tipo !== 'cobro_cliente') {
      return;
    }

    await this.sincronizarTrabajoConCobro(movimiento);

    await this.registrarHistorial(
      'sincronizar_monto_trabajo',
      `Se actualizó el monto del trabajo ${movimiento.codigoSeguimiento} desde Finanzas.`,
      movimiento.uid || movimiento.id || ''
    );
  }

  private mapearTrabajoFinanzas(data: any): TrabajoFinanzasVista {
    const uid = String(data.uid || data.id || '').trim();
    const id = String(data.id || uid).trim();

    const codigoSeguimiento = this.obtenerCodigoSeguimiento({
      ...data,
      uid,
      id
    });

    const empleados = Array.isArray(data.empleadosAsignados)
      ? data.empleadosAsignados.map((empleado: any) => ({
          uid: String(empleado.uid || '').trim(),
          nombreCompleto: String(
            empleado.nombreCompleto ||
              empleado.nombres ||
              empleado.nombre ||
              empleado.usuario ||
              'Empleado'
          ).trim(),
          usuario: String(empleado.usuario || '').trim(),
          cargo: String(empleado.cargo || '').trim()
        }))
      : [];

    const fechaProgramada = String(data.fechaProgramada || '').trim();
    const horaProgramada = String(data.horaProgramada || '').trim();

    const fechaHoraTexto = [fechaProgramada, horaProgramada]
      .filter(Boolean)
      .join(' ');

    const subtotal = Number(data.subtotal || 0);

    const trabajo: TrabajoFinanzasVista = {
      uid,
      id,

      codigoSeguimiento,

      clienteNombre: String(data.clienteNombre || 'Sin cliente').trim(),
      clienteTelefono: String(data.clienteTelefono || '').trim(),
      direccion: String(data.direccion || '').trim(),
      referencia: String(data.referencia || '').trim(),

      tipoTrabajo: String(data.tipoTrabajo || 'Trabajo').trim(),
      descripcion: String(data.descripcion || '').trim(),

      fechaProgramada,
      horaProgramada,
      fechaHoraTexto: fechaHoraTexto || 'Sin fecha',

      subtotal,
      subtotalTexto: this.formatearSoles(subtotal),

      estado: String(data.estado || 'pendiente').trim(),
      estadoTexto: this.obtenerEstadoTrabajoTexto(
        String(data.estado || 'pendiente').trim()
      ),

      empleadosAsignados: empleados,
      empleadosTexto: empleados.length
        ? empleados.map((item: any) => item.nombreCompleto).join(', ')
        : 'Sin empleados',

      textoBusqueda: ''
    };

    trabajo.textoBusqueda = this.normalizar(
      `${trabajo.codigoSeguimiento} ${trabajo.clienteNombre} ${trabajo.direccion} ${trabajo.tipoTrabajo} ${trabajo.empleadosTexto}`
    );

    return trabajo;
  }

  private obtenerCodigoSeguimiento(trabajo: any): string {
    const codigoGuardado = String(
      trabajo?.codigoSeguimiento ||
        trabajo?.codigoTrabajo ||
        trabajo?.codigo ||
        trabajo?.numero ||
        ''
    ).trim();

    if (/^T-\d{5}$/i.test(codigoGuardado)) {
      return codigoGuardado.toUpperCase();
    }

    const id = String(trabajo?.id || '').trim();

    if (/^T-\d{5}$/i.test(id)) {
      return id.toUpperCase();
    }

    const base = String(
      trabajo?.uid ||
        trabajo?.id ||
        trabajo?.clienteNombre ||
        'TRABAJO'
    );

    const numero = this.generarNumeroDesdeTexto(base);

    return `T-${numero.toString().padStart(5, '0')}`;
  }

  private generarNumeroDesdeTexto(texto: string): number {
    let hash = 0;

    for (let i = 0; i < texto.length; i++) {
      hash = ((hash << 5) - hash) + texto.charCodeAt(i);
      hash |= 0;
    }

    return Math.abs(hash) % 100000;
  }

  private obtenerEstadoTrabajoTexto(estado: string): string {
    const mapa: Record<string, string> = {
      pendiente: 'Pendiente',
      asignado: 'Asignado',
      en_camino: 'En camino',
      en_proceso: 'En proceso',
      finalizado: 'Finalizado',
      devolucion_pendiente: 'Devolución pendiente',
      devolucion_realizada: 'Devolución realizada',
      cancelado: 'Cancelado'
    };

    return mapa[estado] || 'Pendiente';
  }

  private async generarCodigoMovimiento(tipo: string): Promise<string> {
    const prefijo = tipo === 'cobro_cliente' ? 'COB' : 'PAG';
    const fecha = new Date();

    const yyyy = fecha.getFullYear();
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const dd = String(fecha.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 9000 + 1000);

    return `${prefijo}-${yyyy}${mm}${dd}-${random}`;
  }

  private obtenerMetodoPagoTexto(
    metodo: MetodoPagoFinanciero,
    otro = ''
  ): string {
    const mapa: Record<MetodoPagoFinanciero, string> = {
      efectivo: 'Efectivo',
      yape: 'Yape',
      plin: 'Plin',
      transferencia: 'Transferencia bancaria',
      deposito: 'Depósito',
      tarjeta: 'Tarjeta',
      otro: String(otro || 'Otro').trim() || 'Otro'
    };

    return mapa[metodo] || 'Efectivo';
  }

  private formatearSoles(valor: number): string {
    return `S/ ${Number(valor || 0).toFixed(2)}`;
  }

  private normalizar(valor: string): string {
    return String(valor || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  private async sincronizarTrabajoConCobro(
    movimiento: MovimientoFinanciero
  ): Promise<void> {
    const trabajoUid = String(movimiento.trabajoUid || '').trim();

    if (!trabajoUid) {
      return;
    }

    const trabajoRef = doc(this.firestore, 'trabajos', trabajoUid);

    await updateDoc(trabajoRef, {
      subtotal: Number(movimiento.montoTotal || 0),

      montoCliente: Number(movimiento.montoTotal || 0),
      montoCobradoCliente: Number(movimiento.montoPagado || 0),
      saldoCobroCliente: Number(movimiento.saldoPendiente || 0),

      estadoCobroCliente:
        movimiento.estado === 'cobrado' ? 'cobrado' : 'pendiente',

      metodoCobroCliente: movimiento.metodoPago || 'efectivo',
      metodoCobroClienteTexto: movimiento.metodoPagoTexto || 'Efectivo',

      codigoSeguimiento: movimiento.codigoSeguimiento,

      finanzasActualizadoEn: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }

  async registrarHistorial(
    accion: string,
    descripcion: string,
    movimientoUid: string
  ): Promise<void> {
    const adminUid = this.auth.currentUser?.uid || '';
    const ref = doc(collection(this.firestore, 'historial_actividades'));

    await setDoc(ref, {
      modulo: 'SM-1.8 Gestión financiera',
      accion,
      descripcion,
      movimientoUid,
      realizadoPorUid: adminUid,
      createdAt: serverTimestamp()
    });
  }
}