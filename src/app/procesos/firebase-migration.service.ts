// src/app/procesos/firebase-migration.service.ts
import { Injectable, inject } from '@angular/core';

import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseMigrationService {
  private firestore = inject(Firestore);

  async crearEmpleadosDesdeUsuarios() {
    const usuariosRef = collection(this.firestore, 'usuarios');
    const usuariosSnap = await getDocs(usuariosRef);

    let revisados = 0;
    let creados = 0;
    let omitidos = 0;

    for (const usuarioDoc of usuariosSnap.docs) {
      const usuario: any = {
        uid: usuarioDoc.id,
        ...usuarioDoc.data()
      };

      const rol = String(usuario?.rol || '').trim().toLowerCase();

      const esEmpleado =
        rol === 'empleado' ||
        rol === 'trabajador' ||
        rol === 'tecnico' ||
        rol === 'técnico';

      if (!esEmpleado) {
        continue;
      }

      revisados += 1;

      const uid = String(usuario?.uid || usuarioDoc.id).trim();

      if (!uid) {
        omitidos += 1;
        continue;
      }

      const empleadoRef = doc(this.firestore, 'empleados', uid);
      const empleadoSnap = await getDoc(empleadoRef);

      if (empleadoSnap.exists()) {
        omitidos += 1;
        continue;
      }

      const nombres = String(usuario?.nombres || '').trim();
      const apellidos = String(usuario?.apellidos || '').trim();

      const nombreCompleto = String(
        usuario?.nombreCompleto ||
        [nombres, apellidos].filter(Boolean).join(' ') ||
        usuario?.usuario ||
        usuario?.correo ||
        'Empleado'
      ).trim();

      await setDoc(empleadoRef, {
        uid,
        usuarioUid: uid,

        nombres,
        apellidos,
        nombreCompleto,

        usuario: usuario?.usuario || '',
        correo: usuario?.correo || usuario?.email || usuario?.correoAuth || '',
        correoAuth: usuario?.correoAuth || usuario?.correo || '',
        telefono: usuario?.telefono || usuario?.celular || usuario?.numero || '',
        celular: usuario?.celular || usuario?.telefono || '',
        dni: usuario?.dni || '',

        cargo: usuario?.cargo || 'Empleado',
        rolOperativo: 'empleado',

        fotoUrl: usuario?.fotoUrl || '',
        activo: usuario?.activo !== false,
        habilitado: usuario?.habilitado !== false,
        estado: usuario?.estado ?? true,

        creadoPorUid: usuario?.creadoPorUid || '',
        actualizadoPorUid: usuario?.actualizadoPorUid || '',

        createdAt: usuario?.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp(),

        origenMigracion: 'usuarios_a_empleados'
      });

      creados += 1;
    }

    const resultado = {
      revisados,
      creados,
      omitidos
    };

    console.log('[MIGRACIÓN EMPLEADOS]', resultado);

    return resultado;
  }
}