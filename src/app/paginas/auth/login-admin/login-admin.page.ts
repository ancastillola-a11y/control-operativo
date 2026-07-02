// src/app/paginas/auth/login-admin/login-admin.page.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  IonicModule,
  LoadingController,
  NavController,
  ToastController
} from '@ionic/angular';

import {
  arrowBackOutline,
  eyeOffOutline,
  eyeOutline,
  lockClosedOutline,
  personOutline,
  shieldCheckmarkOutline
} from 'ionicons/icons';
import { AuthService, Usuario } from '../../../procesos/auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.page.html',
  styleUrls: ['./login-admin.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class LoginAdminPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);

  mostrarPassword = false;
  cargando = false;

readonly arrowBackIcon = arrowBackOutline;
readonly shieldIcon = shieldCheckmarkOutline;
readonly personIcon = personOutline;
readonly lockIcon = lockClosedOutline;
readonly eyeIcon = eyeOutline;
readonly eyeOffIcon = eyeOffOutline;

  formulario = this.fb.group({
    usuario: ['', Validators.required],
    password: ['', Validators.required],
    recordarme: [false]
  });

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  async ingresar() {
  if (this.formulario.invalid) {
    this.formulario.markAllAsTouched();
    await this.mostrarToast('Complete usuario y contraseña.', 'danger');
    return;
  }

  const usuarioIngresado = String(this.formulario.value.usuario || '')
    .trim()
    .toLowerCase();

  const password = String(this.formulario.value.password || '');

  const loading = await this.loadingCtrl.create({
    message: 'Validando administrador...',
    spinner: 'crescent'
  });

  try {
    this.cargando = true;
    await loading.present();

    const credencial = await this.loginAdminSeguro(
      usuarioIngresado,
      password
    );

    const uid = credencial?.user?.uid || '';

    if (!uid) {
      throw new Error('uid-auth-vacio');
    }

    const rol = await this.authService.obtenerRol(uid);

    const esAdministrador =
      rol === 'admin' ||
      rol === 'administrador';

    if (!esAdministrador) {
      throw new Error('usuario-no-admin');
    }

    await loading.dismiss().catch(() => {});
    this.cargando = false;

    await this.irPanelAdministrador();

  } catch (error: any) {
    console.error('[LoginAdminPage] Error real:', error);

    await loading.dismiss().catch(() => {});
    this.cargando = false;

    await this.mostrarToast(this.obtenerMensajeError(error), 'danger');
  }
}

  volver() {
    this.navCtrl.navigateRoot('/seleccion-usuario', {
      animated: false,
      replaceUrl: true
    });
  }

  recuperarContrasena() {
    this.navCtrl.navigateForward('/recuperar', {
      animated: false
    });
  }

private async loginAdminSeguro(
  usuarioIngresado: string,
  password: string
): Promise<any> {
  const correoDirecto = this.resolverCorreoAuth(usuarioIngresado);

  try {
    return await this.authService.login(correoDirecto, password);
  } catch (errorDirecto) {
    console.warn('[LoginAdminPage] Falló login directo. Intentando Firestore como respaldo:', errorDirecto);
  }

  const usuarioData = await this.buscarUsuarioSinRomper(usuarioIngresado);

  if (!usuarioData) {
    throw new Error('auth/invalid-credential');
  }

  const correos = [
    usuarioData.correoAuth,
    usuarioData.correo,
    usuarioData.usuario ? `${usuarioData.usuario}@comproy.local` : ''
  ]
    .map((correo) => String(correo || '').trim().toLowerCase())
    .filter((correo) => correo.length > 0)
    .filter((correo, index, lista) => lista.indexOf(correo) === index);

  let ultimoError: any = null;

  for (const correo of correos) {
    try {
      return await this.authService.login(correo, password);
    } catch (error) {
      ultimoError = error;
    }
  }

  throw ultimoError || new Error('login-fallido');
}

private resolverCorreoAuth(usuarioIngresado: string): string {
  const valor = String(usuarioIngresado || '').trim().toLowerCase();

  if (valor.includes('@')) {
    return valor;
  }

  return `${valor}@comproy.local`;
}

private async buscarUsuarioSinRomper(
  usuarioIngresado: string
): Promise<Usuario | null> {
  try {
    return await this.authService.obtenerUsuarioPorCorreoOUsuario(usuarioIngresado);
  } catch (error) {
    console.warn('[LoginAdminPage] Firestore no permitió buscar usuario antes del login:', error);
    return null;
  }
}

  private async loginConCorreosDisponibles(
    usuarioData: Usuario,
    password: string
  ): Promise<void> {
    const correos = [
      usuarioData.correoAuth,
      usuarioData.correo
    ]
      .map((correo) => String(correo || '').trim().toLowerCase())
      .filter((correo) => correo.length > 0)
      .filter((correo, index, lista) => lista.indexOf(correo) === index);

    if (correos.length === 0) {
      throw new Error('correo-auth-vacio');
    }

    let ultimoError: any = null;

    for (const correo of correos) {
      if (!this.esCorreoValido(correo)) {
        ultimoError = new Error(`correo-auth-invalido:${correo}`);
        continue;
      }

      try {
        console.log('[LoginAdminPage] Intentando login con:', correo);

        await this.authService.login(correo, password);

        console.log('[LoginAdminPage] Login correcto con:', correo);
        return;

      } catch (error: any) {
        console.error('[LoginAdminPage] Falló login con:', correo, error);
        ultimoError = error;
      }
    }

    throw ultimoError || new Error('login-fallido');
  }

  private async irPanelAdministrador(): Promise<void> {
    console.log('[LoginAdminPage] Login correcto. Abriendo /dashboard-admin...');

    await this.navCtrl.navigateRoot('/dashboard-admin', {
      animated: false,
      replaceUrl: true
    });
  }

  private usuarioBloqueado(usuario: Usuario): boolean {
    return (
      usuario.habilitado === false ||
      usuario.activo === false ||
      usuario.estado === false ||
      (usuario as any).eliminado === true
    );
  }

  private esCorreoValido(correo: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  }

  private obtenerMensajeError(error: any): string {
    const code = String(error?.code || error?.message || error || '');

    console.error('[ERROR LOGIN ADMIN DETALLE]', {
      code: error?.code,
      message: error?.message,
      error
    });

    if (
      code.includes('auth/wrong-password') ||
      code.includes('auth/invalid-credential') ||
      code.includes('auth/invalid-login-credentials')
    ) {
      return 'Usuario o contraseña incorrectos.';
    }

    if (code.includes('auth/user-not-found')) {
      return 'Usuario no registrado en Firebase Authentication.';
    }

    if (code.includes('auth/invalid-email')) {
      return 'El correo de autenticación registrado no es válido.';
    }

    if (code.includes('auth/too-many-requests')) {
      return 'Demasiados intentos. Intente nuevamente más tarde.';
    }

    if (code.includes('auth/network-request-failed')) {
      return 'Revise su conexión a internet.';
    }

    if (code.includes('permission-denied')) {
      return 'No tiene permisos para consultar usuarios en Firestore.';
    }

    if (code.includes('correo-auth-vacio')) {
      return 'El usuario no tiene correo de autenticación configurado.';
    }

    if (code.includes('correo-auth-invalido')) {
      return 'El correo de autenticación del usuario no es válido.';
    }

    if (code.includes('password-vacio')) {
      return 'Ingrese su contraseña.';
    }

    if (code.includes('login-fallido')) {
      return 'No se pudo validar el acceso con los correos registrados.';
    }

    return `No se pudo iniciar sesión. Detalle: ${code || 'error desconocido'}`;
  }

  private async mostrarToast(
  message: string,
  color: 'success' | 'danger' | 'primary'
) {
  try {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });

    await toast.present();
  } catch (error) {
    alert(message);
  }
}
}

