// src/app/procesos/auth.service.ts
import { Injectable, inject } from '@angular/core';

import {
  Auth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  UserCredential
} from '@angular/fire/auth';

import { UsuarioDAO, Usuario } from '../dao/usuario.dao';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private usuarioDAO = inject(UsuarioDAO);

  async login(
    correo: string,
    password: string
  ): Promise<UserCredential> {
    const correoLimpio = String(correo || '').trim().toLowerCase();
    const passwordLimpio = String(password || '');

    if (!correoLimpio) {
      throw new Error('correo-auth-vacio');
    }

    if (!this.esCorreoValido(correoLimpio)) {
      throw new Error(`correo-auth-invalido:${correoLimpio}`);
    }

    if (!passwordLimpio) {
      throw new Error('password-vacio');
    }

    try {
      return await signInWithEmailAndPassword(
        this.auth,
        correoLimpio,
        passwordLimpio
      );
    } catch (error: any) {
      console.error('[AuthService] Error Firebase Auth:', {
        code: error?.code,
        message: error?.message,
        name: error?.name,
        error
      });

      throw error;
    }
  }

  async resetPassword(correo: string) {
    const correoLimpio = String(correo || '').trim().toLowerCase();

    if (!correoLimpio) {
      throw new Error('correo-vacio');
    }

    return await sendPasswordResetEmail(
      this.auth,
      correoLimpio
    );
  }

  async verificarCodigoRecuperacion(oobCode: string): Promise<string> {
    return await verifyPasswordResetCode(
      this.auth,
      oobCode
    );
  }

  async confirmarNuevaContrasena(
    oobCode: string,
    nuevaContrasena: string
  ) {
    return await confirmPasswordReset(
      this.auth,
      oobCode,
      nuevaContrasena
    );
  }

  async obtenerRol(uid: string): Promise<'admin' | 'administrador' | 'empleado' | null> {
    const usuario = await this.usuarioDAO.obtenerRol(uid);
    const rol = String(usuario?.rol || '').trim().toLowerCase();

    if (rol === 'admin' || rol === 'administrador' || rol === 'empleado') {
      return rol as 'admin' | 'administrador' | 'empleado';
    }

    return null;
  }

  async obtenerUsuarioPorCorreoOUsuario(
    valor: string
  ): Promise<Usuario | null> {
    const termino = String(valor || '').trim().toLowerCase();

    if (!termino) {
      return null;
    }

    return await this.usuarioDAO.obtenerUsuarioPorCorreoOUsuario(termino);
  }

  private esCorreoValido(correo: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  }
}

export type { Usuario };

