// src/app/dao/dashboard-empleado.dao.ts
import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  serverTimestamp,
  updateDoc
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';

import {
  catchError,
  map
} from 'rxjs/operators';

import {
  DashboardEmpleadoUsuario,
  DashboardTrabajoEmpleado
} from '../modelos/dashboard-empleado';

import {
  Empleado
} from '../modelos/empleado';

import {
  EstadoTrabajo,
  Trabajo,
  TrabajoEmpleadoAsignado
} from '../modelos/trabajo';

@Injectable({
  providedIn: 'root'
})
export class DashboardEmpleadoDAO {
  private firestore = inject(Firestore);

  obtenerEmpleadoActual$(
    uid: string
  ): Observable<DashboardEmpleadoUsuario> {
    const uidLimpio = String(uid || '').trim();

    if (!uidLimpio) {
      return of(this.crearEmpleadoVacio());
    }

    const ref = doc(this.firestore, 'usuarios', uidLimpio);

    return docData(ref, { idField: 'id' }).pipe(
      map((data: any) =>
        this.mapearEmpleado(uidLimpio, data || {})
      ),
      catchError((error) => {
        console.error('[DashboardEmpleadoDAO] Error obteniendo empleado:', error);
        return of(this.crearEmpleadoVacio(uidLimpio));
      })
    );
  }

  escucharTrabajosAsignados$(
    empleadoUid: string
  ): Observable<DashboardTrabajoEmpleado[]> {
    const uidLimpio = String(empleadoUid || '').trim();

    if (!uidLimpio) {
      return of([]);
    }

    const ref = collection(this.firestore, 'trabajos');

    return collectionData(ref, { idField: 'id' }).pipe(
      map((items: any[]) =>
        (items || [])
          .filter((trabajo) => trabajo?.eliminado !== true)
          .filter((trabajo) =>
            this.trabajoPerteneceAlEmpleado(trabajo, uidLimpio)
          )
          .map((trabajo) => this.mapearTrabajo(trabajo))
          .sort((a, b) => {
            const ordenEstado =
              this.ordenEstado(a.estado) - this.ordenEstado(b.estado);

            if (ordenEstado !== 0) {
              return ordenEstado;
            }

            return this.obtenerFechaOrden(a) - this.obtenerFechaOrden(b);
          })
      ),
      catchError((error) => {
        console.error('[DashboardEmpleadoDAO] Error obteniendo trabajos asignados:', error);
        return of([]);
      })
    );
  }

  async actualizarEstadoTrabajo(
    trabajo: DashboardTrabajoEmpleado,
    nuevoEstado: EstadoTrabajo,
    empleado: DashboardEmpleadoUsuario
  ): Promise<void> {
    const trabajoUid = String(trabajo.uid || trabajo.id || '').trim();

    if (!trabajoUid) {
      throw new Error('trabajo-uid-vacio');
    }

    const ref = doc(this.firestore, 'trabajos', trabajoUid);

    const payload: any = {
      estado: nuevoEstado,
      actualizadoPorUid: empleado.uid,
      actualizadoPorNombre: empleado.nombreCompleto,
      updatedAt: serverTimestamp()
    };

    if (nuevoEstado === 'en_camino') {
      payload.enCaminoPorUid = empleado.uid;
      payload.enCaminoPorNombre = empleado.nombreCompleto;
      payload.enCaminoAt = serverTimestamp();
    }

    if (nuevoEstado === 'en_proceso') {
      payload.iniciadoPorUid = empleado.uid;
      payload.iniciadoPorNombre = empleado.nombreCompleto;
      payload.iniciadoAt = serverTimestamp();
    }

    if (nuevoEstado === 'finalizado') {
      payload.finalizadoPorUid = empleado.uid;
      payload.finalizadoPorNombre = empleado.nombreCompleto;
      payload.finalizadoAt = serverTimestamp();
    }

    await updateDoc(ref, payload);

    await this.registrarHistorial(
      trabajo,
      nuevoEstado,
      empleado
    ).catch((error) => {
      console.warn('[DashboardEmpleadoDAO] No se pudo registrar historial:', error);
    });

    await this.notificarAdministrador(
      trabajo,
      nuevoEstado,
      empleado
    ).catch((error) => {
      console.warn('[DashboardEmpleadoDAO] No se pudo notificar al administrador:', error);
    });
  }

  private trabajoPerteneceAlEmpleado(
    trabajo: any,
    empleadoUid: string
  ): boolean {
    const empleados = Array.isArray(trabajo?.empleadosAsignados)
      ? trabajo.empleadosAsignados
      : [];

    return empleados.some((empleado: TrabajoEmpleadoAsignado) =>
      String(empleado?.uid || '').trim() === empleadoUid
    );
  }

  private mapearEmpleado(
    uid: string,
    data: any
  ): DashboardEmpleadoUsuario {
    const nombres = String(data.nombres || '').trim();
    const apellidos = String(data.apellidos || '').trim();

    const nombreCompleto = String(
      data.nombreCompleto ||
      `${nombres} ${apellidos}`.trim() ||
      data.usuario ||
      'Empleado'
    ).trim();

    const rol = String(data.rol || '').trim().toLowerCase();

    const empleado: DashboardEmpleadoUsuario = {
      ...(data as Empleado),

      id: String(data.id || uid).trim(),
      uid: String(data.uid || uid).trim(),

      nombres,
      apellidos,
      nombreCompleto,

      usuario: String(data.usuario || '').trim(),
      correo: String(data.correo || '').trim().toLowerCase(),
      correoAuth: String(data.correoAuth || data.correo || '').trim().toLowerCase(),

      dni: String(data.dni || '').trim(),
      telefono: String(data.telefono || '').trim(),
      cargo: String(data.cargo || 'Personal operativo').trim(),

      rol: 'empleado',

      habilitado: data.habilitado !== false,
      activo: data.activo !== false,
      estado: data.estado !== false,
      eliminado: data.eliminado === true,

      fotoUrl: String(data.fotoUrl || '').trim(),

      iniciales: this.obtenerIniciales(nombreCompleto),
      cargoTexto: String(data.cargo || 'Personal operativo').trim(),

      accesoValido:
        rol === 'empleado' &&
        data.eliminado !== true &&
        data.habilitado !== false &&
        data.activo !== false &&
        data.estado !== false
    };

    return empleado;
  }

  private mapearTrabajo(data: any): DashboardTrabajoEmpleado {
    const id = String(data.id || '').trim();
    const uid = String(data.uid || id).trim();

    const estado = this.normalizarEstado(data.estado);
    const fechaProgramada = String(data.fechaProgramada || '').trim();
    const horaProgramada = String(data.horaProgramada || '').trim();

    const subtotal = Number(data.subtotal || 0);

    const materialesAsignados = Array.isArray(data.materialesAsignados)
      ? data.materialesAsignados
      : [];

    const trabajo: DashboardTrabajoEmpleado = {
      ...(data as Trabajo),

      id,
      uid,

      clienteNombre: String(data.clienteNombre || 'Sin cliente').trim(),
      clienteTelefono: String(data.clienteTelefono || '').trim(),

      direccion: String(data.direccion || '').trim(),
      referencia: String(data.referencia || '').trim(),

      latitud: data.latitud ?? null,
      longitud: data.longitud ?? null,
      direccionMapa: String(data.direccionMapa || '').trim(),
      ubicacionTextoOriginal: String(data.ubicacionTextoOriginal || '').trim(),

      tipoTrabajo: String(data.tipoTrabajo || 'Trabajo').trim(),
      descripcion: String(data.descripcion || '').trim(),

      fechaProgramada,
      horaProgramada,

      subtotal,

      empleadosAsignados: Array.isArray(data.empleadosAsignados)
        ? data.empleadosAsignados
        : [],

      materialesAsignados,

      codigoCliente: String(data.codigoCliente || '').trim(),
      codigoDevolucion: String(data.codigoDevolucion || '').trim(),

      estado,

      activo: data.activo !== false,
      eliminado: data.eliminado === true,

      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      canceledAt: data.canceledAt,

      codigoTrabajo: this.obtenerCodigoTrabajo({
        ...data,
        id,
        uid
      }),

      estadoTexto: this.obtenerEstadoTexto(estado),
      estadoClase: estado,

      fechaHoraTexto: this.obtenerFechaHoraTexto(fechaProgramada, horaProgramada),
      subtotalTexto: this.formatearSoles(subtotal),

      direccionTexto: this.obtenerDireccionTexto(data),

      materialesTexto: materialesAsignados.length
        ? materialesAsignados
            .map((material: any) =>
              `${material.nombre || 'Material'} (${Number(material.cantidadAsignada || 0)} ${material.unidad || 'und.'})`
            )
            .join(', ')
        : 'Sin materiales registrados',

      puedeMarcarEnCamino: estado === 'pendiente',
      puedeIniciar: estado === 'en_camino',
      puedeFinalizar: estado === 'en_proceso',

      tieneTelefono: !!String(data.clienteTelefono || '').trim(),

      tieneMapa:
        !!Number(data.latitud || 0) &&
        !!Number(data.longitud || 0)
    };

    return trabajo;
  }

  private async registrarHistorial(
    trabajo: DashboardTrabajoEmpleado,
    nuevoEstado: EstadoTrabajo,
    empleado: DashboardEmpleadoUsuario
  ): Promise<void> {
    const ref = collection(this.firestore, 'historial_actividades');

    await addDoc(ref, {
      modulo: 'Panel empleado',
      accion: `cambio_estado_${nuevoEstado}`,
      descripcion: `${empleado.nombreCompleto} actualizó el trabajo ${trabajo.codigoTrabajo} a ${this.obtenerEstadoTexto(nuevoEstado)}.`,
      trabajoUid: trabajo.uid,
      codigoTrabajo: trabajo.codigoTrabajo,
      empleadoUid: empleado.uid,
      empleadoNombre: empleado.nombreCompleto,
      createdAt: serverTimestamp()
    });
  }

  private async notificarAdministrador(
    trabajo: DashboardTrabajoEmpleado,
    nuevoEstado: EstadoTrabajo,
    empleado: DashboardEmpleadoUsuario
  ): Promise<void> {
    const ref = collection(this.firestore, 'notificaciones_admin');

    await addDoc(ref, {
      titulo: 'Actualización de trabajo',
      mensaje: `${empleado.nombreCompleto} actualizó un trabajo.`,
      detalle: `${trabajo.codigoTrabajo} - ${trabajo.clienteNombre} cambió a ${this.obtenerEstadoTexto(nuevoEstado)}.`,
      tipo: 'cambio_estado_trabajo',
      ruta: '/seguimiento-trabajos',
      referenciaUid: trabajo.uid,
      trabajoUid: trabajo.uid,
      codigoTrabajo: trabajo.codigoTrabajo,
      empleadoUid: empleado.uid,
      empleadoNombre: empleado.nombreCompleto,
      leida: false,
      eliminada: false,
      activa: true,
      createdAt: serverTimestamp()
    });
  }

  private normalizarEstado(valor: any): EstadoTrabajo {
    const estado = String(valor || '').trim();

    if (estado === 'enCamino') {
      return 'en_camino';
    }

    if (estado === 'enProceso') {
      return 'en_proceso';
    }

    if (estado === 'devolucionPendiente') {
      return 'devolucion_pendiente';
    }

    if (estado === 'devolucionRealizada') {
      return 'devolucion_realizada';
    }

    const estadosValidos: EstadoTrabajo[] = [
      'pendiente',
      'en_camino',
      'en_proceso',
      'finalizado',
      'devolucion_pendiente',
      'devolucion_realizada',
      'cancelado'
    ];

    return estadosValidos.includes(estado as EstadoTrabajo)
      ? estado as EstadoTrabajo
      : 'pendiente';
  }

  private obtenerEstadoTexto(estado: EstadoTrabajo): string {
    const mapa: Record<EstadoTrabajo, string> = {
      pendiente: 'Pendiente',
      en_camino: 'En camino',
      en_proceso: 'En proceso',
      finalizado: 'Finalizado',
      devolucion_pendiente: 'Devolución pendiente',
      devolucion_realizada: 'Devolución realizada',
      cancelado: 'Cancelado'
    };

    return mapa[estado] || 'Pendiente';
  }

  private ordenEstado(estado: EstadoTrabajo): number {
    const mapa: Record<EstadoTrabajo, number> = {
      en_proceso: 1,
      en_camino: 2,
      pendiente: 3,
      devolucion_pendiente: 4,
      finalizado: 5,
      devolucion_realizada: 6,
      cancelado: 7
    };

    return mapa[estado] || 99;
  }

  private obtenerFechaOrden(trabajo: DashboardTrabajoEmpleado): number {
    const fecha = String(trabajo.fechaProgramada || '').trim();
    const hora = String(trabajo.horaProgramada || '00:00').trim();

    const timestamp = new Date(`${fecha}T${hora}`).getTime();

    if (!Number.isNaN(timestamp)) {
      return timestamp;
    }

    return 0;
  }

  private obtenerFechaHoraTexto(
    fecha: string,
    hora: string
  ): string {
    const fechaTexto = String(fecha || '').trim();
    const horaTexto = String(hora || '').trim();

    if (!fechaTexto && !horaTexto) {
      return 'Sin fecha programada';
    }

    if (!fechaTexto) {
      return horaTexto;
    }

    if (!horaTexto) {
      return fechaTexto;
    }

    return `${fechaTexto} - ${horaTexto}`;
  }

  private obtenerDireccionTexto(data: any): string {
    const direccionMapa = String(data.direccionMapa || '').trim();
    const direccion = String(data.direccion || '').trim();
    const ubicacionOriginal = String(data.ubicacionTextoOriginal || '').trim();

    return direccionMapa || direccion || ubicacionOriginal || 'Sin dirección';
  }

  private obtenerCodigoTrabajo(trabajo: any): string {
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

  private obtenerIniciales(nombre: string): string {
    const partes = String(nombre || 'Empleado')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    return partes
      .slice(0, 2)
      .map((parte) => parte.charAt(0).toUpperCase())
      .join('') || 'EM';
  }

  private formatearSoles(valor: number): string {
    return `S/ ${Number(valor || 0).toFixed(2)}`;
  }

  private crearEmpleadoVacio(uid = ''): DashboardEmpleadoUsuario {
    return {
      uid,
      nombres: '',
      apellidos: '',
      nombreCompleto: 'Empleado',
      usuario: '',
      correo: '',
      correoAuth: '',
      dni: '',
      telefono: '',
      cargo: 'Personal operativo',
      rol: 'empleado',
      habilitado: false,
      activo: false,
      estado: false,
      eliminado: false,
      fotoUrl: '',
      iniciales: 'EM',
      cargoTexto: 'Personal operativo',
      accesoValido: false
    };
  }
}