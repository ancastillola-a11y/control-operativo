// src/app/dao/empleado.dao.ts
import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
  limit,
  getDocs,
  serverTimestamp
} from '@angular/fire/firestore';

import { Auth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Empleado } from '../modelos/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoDAO {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  obtenerEmpleados$(): Observable<Empleado[]> {
    const ref = collection(this.firestore, 'usuarios');

    const consulta = query(
      ref,
      where('rol', '==', 'empleado')
    );

    return collectionData(consulta, { idField: 'id' }).pipe(
      map((data) =>
        (data as Empleado[])
          .map((empleado) => ({
            ...empleado,
            uid: empleado.uid || empleado.id
          }))
          .filter((empleado) => empleado.eliminado !== true)
      ),
      catchError((error) => {
        console.error('[EmpleadoDAO] Error obteniendo empleados:', error);
        return of([]);
      })
    );
  }

  async obtenerEmpleadosUnaVez(): Promise<Empleado[]> {
    const ref = collection(this.firestore, 'usuarios');

    const consulta = query(
      ref,
      where('rol', '==', 'empleado')
    );

    const snap = await getDocs(consulta);

    return snap.docs
      .map((documento) => {
        const data = documento.data() as Empleado;

        return {
          ...data,
          id: documento.id,
          uid: data.uid || documento.id
        };
      })
      .filter((empleado) => empleado.eliminado !== true);
  }

  async existeUsuario(
    usuario: string,
    uidIgnorado = ''
  ): Promise<boolean> {
    const ref = collection(this.firestore, 'usuarios');

    const consulta = query(
      ref,
      where('usuario', '==', usuario),
      limit(1)
    );

    const snap = await getDocs(consulta);

    if (snap.empty) {
      return false;
    }

    return snap.docs[0].id !== uidIgnorado;
  }

  async existeDni(
    dni: string,
    uidIgnorado = ''
  ): Promise<boolean> {
    const ref = collection(this.firestore, 'usuarios');

    const consulta = query(
      ref,
      where('dni', '==', dni),
      limit(1)
    );

    const snap = await getDocs(consulta);

    if (snap.empty) {
      return false;
    }

    return snap.docs[0].id !== uidIgnorado;
  }

  async crearPerfilEmpleado(
    uid: string,
    empleado: Empleado
  ): Promise<void> {
    const ref = doc(this.firestore, 'usuarios', uid);

    await setDoc(ref, {
      ...empleado,
      uid,
      eliminado: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }

  async editarEmpleado(
    uid: string,
    data: Partial<Empleado>
  ): Promise<void> {
    const ref = doc(this.firestore, 'usuarios', uid);

    await updateDoc(ref, {
      ...data,
      updatedAt: serverTimestamp()
    });
  }

  async guardarCodigoEmpleado(
    uid: string,
    codigoEmpleado: string
  ): Promise<void> {
    const ref = doc(this.firestore, 'usuarios', uid);

    await updateDoc(ref, {
      codigoEmpleado,
      updatedAt: serverTimestamp()
    });
  }

  async actualizarFotoEmpleado(
    uid: string,
    fotoUrl: string
  ): Promise<void> {
    const ref = doc(this.firestore, 'usuarios', uid);
    const adminUid = this.auth.currentUser?.uid || '';

    await updateDoc(ref, {
      fotoUrl,
      actualizadoPorUid: adminUid,
      updatedAt: serverTimestamp()
    });
  }

  async cambiarEstadoEmpleado(
    uid: string,
    habilitado: boolean
  ): Promise<void> {
    const ref = doc(this.firestore, 'usuarios', uid);

    await updateDoc(ref, {
      habilitado,
      activo: habilitado,
      estado: habilitado,
      updatedAt: serverTimestamp()
    });
  }

  async eliminarEmpleado(uid: string): Promise<void> {
    const ref = doc(this.firestore, 'usuarios', uid);
    const adminUid = this.auth.currentUser?.uid || '';

    await updateDoc(ref, {
      eliminado: true,
      habilitado: false,
      activo: false,
      estado: false,
      eliminadoPorUid: adminUid,
      deletedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }

  async registrarHistorial(
    accion: string,
    descripcion: string,
    empleadoUid: string
  ): Promise<void> {
    const adminUid = this.auth.currentUser?.uid || '';

    const ref = doc(collection(this.firestore, 'historial_actividades'));

    await setDoc(ref, {
      modulo: 'SM-1.2 Gestión de usuarios empleados',
      accion,
      descripcion,
      empleadoUid,
      realizadoPorUid: adminUid,
      createdAt: serverTimestamp()
    });
  }
}