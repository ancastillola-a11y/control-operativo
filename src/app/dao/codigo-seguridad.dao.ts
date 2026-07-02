// src/app/dao/codigo-seguridad.dao.ts
import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from '@angular/fire/firestore';

import { Observable, map } from 'rxjs';

import {
  CodigoTrabajoVista,
  HistorialCodigoSeguridadData,
  TipoCodigoSeguridad
} from '../modelos/codigo-seguridad';

@Injectable({
  providedIn: 'root'
})
export class CodigoSeguridadDao {
  private firestore = inject(Firestore);

  escucharTrabajos(): Observable<CodigoTrabajoVista[]> {
    const ref = collection(this.firestore, 'trabajos');
    const q = query(ref, orderBy('createdAt', 'desc'));

    return collectionData(q, { idField: 'uid' }).pipe(
      map((items: any[]) => {
        return items
          .map((data: any) => {
            const uid = String(data.uid || '').trim();
            return this.mapearTrabajo(uid, data);
          })
          .filter((trabajo) => !trabajo.eliminado);
      })
    );
  }

  async actualizarCodigo(
    trabajoUid: string,
    tipo: TipoCodigoSeguridad,
    codigo: string
  ): Promise<void> {
    const ref = doc(this.firestore, 'trabajos', trabajoUid);

    if (tipo === 'cliente') {
      await updateDoc(ref, {
        codigoCliente: codigo,
        codigoClienteActualizadoAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      return;
    }

    await updateDoc(ref, {
      codigoDevolucion: codigo,
      codigoDevolucionActualizadoAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }

  async registrarHistorial(
    data: HistorialCodigoSeguridadData
  ): Promise<void> {
    const ref = collection(this.firestore, 'historial_actividades');

    await addDoc(ref, {
      modulo: 'SM-1.5 GeneraciÃ³n de cÃ³digos de seguridad',
      accion: data.tipo === 'cliente'
        ? 'regenerar_codigo_cliente'
        : 'regenerar_codigo_devolucion',
      descripcion: data.descripcion,
      trabajoUid: data.trabajoUid,
      trabajoId: data.trabajoId,
      tipoCodigo: data.tipo,
      codigoNuevo: data.codigoNuevo,
      createdAt: serverTimestamp()
    });
  }

  private mapearTrabajo(
    uid: string,
    data: any
  ): CodigoTrabajoVista {
    const codigoCliente = String(data.codigoCliente || '').trim();
    const codigoDevolucion = String(data.codigoDevolucion || '').trim();

    const empleadosAsignados = Array.isArray(data.empleadosAsignados)
      ? data.empleadosAsignados
      : [];

    const empleadosTexto = empleadosAsignados.length > 0
      ? `${empleadosAsignados.length} empleado(s)`
      : 'Sin empleados';

    const fechaProgramada = String(data.fechaProgramada || '').trim();
    const horaProgramada = String(data.horaProgramada || '').trim();

    return {
      uid,
      id: String(data.id || data.codigo || uid).trim(),

      clienteNombre: String(data.clienteNombre || 'Sin cliente').trim(),
      clienteTelefono: String(data.clienteTelefono || '').trim(),
      direccion: String(data.direccion || '').trim(),

      tipoTrabajo: String(data.tipoTrabajo || 'Trabajo').trim(),
      fechaProgramada,
      horaProgramada,
      fechaHoraTexto: this.formatearFechaHora(fechaProgramada, horaProgramada),

      estado: data.estado || 'pendiente',
      estadoTexto: this.obtenerEstadoTexto(data.estado || 'pendiente'),
      estadoClase: this.obtenerEstadoClase(data.estado || 'pendiente'),

      codigoCliente: codigoCliente || '------',
      codigoDevolucion: codigoDevolucion || '------',

      empleadosTexto,
      eliminado: Boolean(data.eliminado)
    };
  }

  private formatearFechaHora(
    fecha: string,
    hora: string
  ): string {
    if (!fecha && !hora) {
      return 'Sin programaciÃ³n';
    }

    if (fecha && hora) {
      return `${fecha} Â· ${hora}`;
    }

    return fecha || hora;
  }

  private obtenerEstadoTexto(estado: string): string {
    const normalizado = String(estado || '').trim();

    if (normalizado === 'pendiente') {
      return 'Pendiente';
    }

    if (normalizado === 'enCamino') {
      return 'En camino';
    }

    if (normalizado === 'enProceso') {
      return 'En proceso';
    }

    if (normalizado === 'finalizado') {
      return 'Finalizado';
    }

    if (normalizado === 'cancelado') {
      return 'Cancelado';
    }

    if (normalizado === 'devolucionRealizada') {
      return 'DevoluciÃ³n realizada';
    }

    return 'Pendiente';
  }

  private obtenerEstadoClase(estado: string): string {
    const normalizado = String(estado || '').trim();

    if (normalizado === 'pendiente') {
      return 'pendiente';
    }

    if (normalizado === 'enCamino') {
      return 'camino';
    }

    if (normalizado === 'enProceso') {
      return 'proceso';
    }

    if (normalizado === 'finalizado') {
      return 'finalizado';
    }

    if (normalizado === 'cancelado') {
      return 'cancelado';
    }

    if (normalizado === 'devolucionRealizada') {
      return 'devolucion';
    }

    return 'pendiente';
  }
}

