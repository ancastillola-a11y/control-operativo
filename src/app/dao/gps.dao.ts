// src/app/dao/gps.dao.ts
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
  setDoc,
  where
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  GpsEmpleadoFiltro,
  GpsHistorial,
  GpsUbicacionActual
} from '../modelos/gps';

@Injectable({
  providedIn: 'root'
})
export class GpsDAO {
  private firestore = inject(Firestore);

  escucharUbicacionesActuales(): Observable<GpsUbicacionActual[]> {
    const ref = collection(this.firestore, 'gps_ubicaciones_actuales');

    const q = query(
      ref,
      orderBy('actualizadoEn', 'desc')
    );

    return collectionData(q, {
      idField: 'uid'
    }) as Observable<GpsUbicacionActual[]>;
  }

  escucharEmpleadosGps(): Observable<GpsEmpleadoFiltro[]> {
    const refUsuarios = collection(this.firestore, 'usuarios');

    const q = query(
      refUsuarios,
      where('rol', '==', 'empleado')
    );

    return collectionData(q, {
      idField: 'id'
    }).pipe(
      map((items: any[]) => {
        return items
          .map((data: any) => {
            const nombres = String(data.nombres || '').trim();
            const apellidos = String(data.apellidos || '').trim();

            const nombreCompleto = String(
              data.nombreCompleto ||
              `${nombres} ${apellidos}`.trim() ||
              data.usuario ||
              'Empleado'
            ).trim();

            const cargo = String(
              data.cargo ||
              data.rolNombre ||
              'Personal operativo'
            ).trim();

            return {
              uid: String(data.uid || data.id || '').trim(),
              etiqueta: `${nombreCompleto} - ${cargo}`,
              nombreCompleto,
              cargo,
              fotoUrl: String(data.fotoUrl || data.photoURL || '').trim(),
              iniciales: this.obtenerIniciales(nombreCompleto),
              habilitado: data.habilitado === true,
              eliminado: data.eliminado === true
            };
          })
          .filter((empleado: any) =>
            empleado.uid &&
            empleado.habilitado === true &&
            empleado.eliminado !== true
          )
          .map((empleado: any): GpsEmpleadoFiltro => ({
            uid: empleado.uid,
            etiqueta: empleado.etiqueta,
            nombreCompleto: empleado.nombreCompleto,
            cargo: empleado.cargo,
            fotoUrl: empleado.fotoUrl,
            iniciales: empleado.iniciales
          }));
      })
    );
  }

  async guardarUbicacionActual(
    data: GpsUbicacionActual
  ): Promise<void> {
    if (!data.empleadoUid) {
      throw new Error('gps-empleado-uid-vacio');
    }

    const ref = doc(
      this.firestore,
      'gps_ubicaciones_actuales',
      data.empleadoUid
    );

    await setDoc(
      ref,
      {
        ...data,
        actualizadoEn: serverTimestamp(),
        creadoEn: data.creadoEn || serverTimestamp()
      },
      {
        merge: true
      }
    );
  }

  async registrarHistorial(
    data: GpsHistorial
  ): Promise<void> {
    const ref = collection(this.firestore, 'gps_historial');

    await addDoc(ref, {
      ...data,
      registradoEn: serverTimestamp()
    });
  }

  private obtenerIniciales(nombre: string): string {
    const palabras = String(nombre || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    return palabras
      .slice(0, 2)
      .map((palabra) => palabra.charAt(0))
      .join('')
      .toUpperCase() || 'EM';
  }
}