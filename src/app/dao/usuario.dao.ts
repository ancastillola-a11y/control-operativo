// src/app/dao/usuario.dao.ts
import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  limit
} from '@angular/fire/firestore';

export interface Usuario {
  id?: string;
  uid?: string;

  correo: string;
  correoAuth?: string;
  usuario?: string;
  usuarioLower?: string;

  nombres?: string;
  apellidos?: string;

  rol: 'admin' | 'administrador' | 'empleado';

  activo?: boolean;
  estado?: boolean;
  habilitado?: boolean;
  eliminado?: boolean;

  fotoUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioDAO {
  private firestore = inject(Firestore);

  async obtenerRol(uid: string): Promise<Usuario | null> {
    return await this.obtenerUsuarioPorUid(uid);
  }

  async obtenerUsuarioPorUid(uid: string): Promise<Usuario | null> {
    const uidLimpio = String(uid || '').trim();

    if (!uidLimpio) {
      return null;
    }

    const ref = doc(this.firestore, 'usuarios', uidLimpio);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      return this.mapearUsuario(snap.id, snap.data());
    }

    const usuariosRef = collection(this.firestore, 'usuarios');

    const consultaPorUid = query(
      usuariosRef,
      where('uid', '==', uidLimpio),
      limit(1)
    );

    const snapshot = await getDocs(consultaPorUid);

    if (!snapshot.empty) {
      const documento = snapshot.docs[0];
      return this.mapearUsuario(documento.id, documento.data());
    }

    return null;
  }

  async obtenerUsuarioPorCorreoOUsuario(valor: string): Promise<Usuario | null> {
    const termino = String(valor || '').trim().toLowerCase();

    if (!termino) {
      return null;
    }

    const usuariosRef = collection(this.firestore, 'usuarios');

    const camposBusqueda = [
      'usuarioLower',
      'usuario',
      'correoAuth',
      'correo'
    ];

    for (const campo of camposBusqueda) {
      const consulta = query(
        usuariosRef,
        where(campo, '==', termino),
        limit(1)
      );

      const snapshot = await getDocs(consulta);

      if (!snapshot.empty) {
        const documento = snapshot.docs[0];
        return this.mapearUsuario(documento.id, documento.data());
      }
    }

    return null;
  }

  private mapearUsuario(
    id: string,
    data: any
  ): Usuario {
    const correo = String(data.correo || '').trim().toLowerCase();
    const correoAuth = String(data.correoAuth || correo || '').trim().toLowerCase();
    const usuario = String(data.usuario || '').trim().toLowerCase();
    const usuarioLower = String(data.usuarioLower || usuario || '').trim().toLowerCase();

    return {
      id,
      uid: String(data.uid || id).trim(),

      correo,
      correoAuth,
      usuario,
      usuarioLower,

      nombres: String(data.nombres || '').trim(),
      apellidos: String(data.apellidos || '').trim(),

      rol: String(data.rol || '').trim().toLowerCase() as Usuario['rol'],

      activo: data.activo,
      estado: data.estado,
      habilitado: data.habilitado,
      eliminado: data.eliminado,

      fotoUrl: String(data.fotoUrl || '').trim()
    };
  }
}

