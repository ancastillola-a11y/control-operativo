// src/app/procesos/firebase-migration.service.ts
import { Injectable, inject } from '@angular/core';

import { FirebaseApp } from '@angular/fire/app';

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
  private firebaseApp = inject(FirebaseApp);

  async crearEmpleadosDesdeUsuarios() {
    const projectId = this.firebaseApp.options.projectId || 'sin-project-id';

    console.group('[MIGRACIÓN EMPLEADOS]');
    console.log('Proyecto Firebase actual:', projectId);

    const usuariosRef = collection(this.firestore, 'usuarios');
    const empleadosRef = collection(this.firestore, 'empleados');

    const usuariosSnap = await getDocs(usuariosRef);
    const empleadosAntesSnap = await getDocs(empleadosRef);

    console.log('Usuarios encontrados:', usuariosSnap.size);
    console.log('Empleados antes:', empleadosAntesSnap.size);

    let usuariosRevisados = 0;
    let usuariosConRolEmpleado = 0;
    let creadosActualizados = 0;
    let comprobados = 0;
    const errores: any[] = [];

    for (const usuarioDoc of usuariosSnap.docs) {
      usuariosRevisados++;

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

      console.log('Usuario revisado:', {
        uid: usuario.uid,
        usuario: usuario.usuario,
        rol,
        esEmpleado
      });

      if (!esEmpleado) {
        continue;
      }

      usuariosConRolEmpleado++;

      const uid = String(usuario?.uid || usuarioDoc.id).trim();

      if (!uid) {
        errores.push({
          tipo: 'usuario_sin_uid',
          usuario: usuario?.usuario || ''
        });

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

      const telefono = String(
        usuario?.telefono ||
        usuario?.celular ||
        usuario?.numero ||
        usuario?.numeroTelefono ||
        usuario?.numeroCelular ||
        ''
      ).trim();

      const empleadoData = {
        uid,
        usuarioUid: uid,

        nombres,
        apellidos,
        nombreCompleto,

        usuario: usuario?.usuario || '',
        correo: usuario?.correo || usuario?.email || usuario?.correoAuth || '',
        correoAuth: usuario?.correoAuth || usuario?.correo || '',
        telefono,
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
      };

      try {
        const empleadoDocRef = doc(this.firestore, 'empleados', uid);

        await setDoc(empleadoDocRef, empleadoData, {
          merge: true
        });

        creadosActualizados++;

        const comprobacionSnap = await getDoc(empleadoDocRef);

        if (comprobacionSnap.exists()) {
          comprobados++;
          console.log('Empleado creado/verificado:', uid);
        } else {
          errores.push({
            tipo: 'no_se_pudo_verificar',
            uid
          });
        }
      } catch (error: any) {
        console.error('Error creando empleado:', uid, error);

        errores.push({
          tipo: 'error_setDoc',
          uid,
          mensaje: error?.message || String(error),
          code: error?.code || ''
        });
      }
    }

    const empleadosDespuesSnap = await getDocs(empleadosRef);

    const resultado = {
      projectId,
      usuariosRevisados,
      usuariosConRolEmpleado,
      empleadosAntes: empleadosAntesSnap.size,
      creadosActualizados,
      comprobados,
      empleadosDespues: empleadosDespuesSnap.size,
      errores
    };

    console.log('Resultado final:', resultado);
    console.groupEnd();

    return resultado;
  }
}