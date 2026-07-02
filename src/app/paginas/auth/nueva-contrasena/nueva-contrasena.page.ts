//control-operativo\src\app\controlador\nueva-contrasena\nueva-contrasena.page.ts
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthService } from '../../../procesos/auth.service';

@Component({
  selector: 'app-nueva-contrasena',
  templateUrl: './nueva-contrasena.page.html',
  styleUrls: ['./nueva-contrasena.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class NuevaContrasenaPage implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastCtrl = inject(ToastController);

  mostrarPassword = false;
  mostrarConfirmar = false;

  cargando = true;
  procesando = false;
  codigoValido = false;

  oobCode = '';
  correoVerificado = '';

  formulario = this.fb.group(
    {
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', [Validators.required]]
    },
    {
      validators: this.validarPasswordsIguales
    }
  );

  async ngOnInit() {
    this.oobCode = this.route.snapshot.queryParamMap.get('oobCode') ?? '';

    if (!this.oobCode) {
      this.cargando = false;
      this.codigoValido = false;
      this.showToast('El enlace de recuperaciÃ³n no es vÃ¡lido');
      return;
    }

    try {
      this.correoVerificado = await this.authService.verificarCodigoRecuperacion(this.oobCode);
      this.codigoValido = true;
    } catch (error) {
      console.error(error);
      this.codigoValido = false;
      this.showToast('El enlace expirÃ³ o no es vÃ¡lido');
    } finally {
      this.cargando = false;
    }
  }

  validarPasswordsIguales(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmarPassword = control.get('confirmarPassword')?.value;

    if (!password || !confirmarPassword) return null;

    return password === confirmarPassword ? null : { passwordsNoCoinciden: true };
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  toggleConfirmar() {
    this.mostrarConfirmar = !this.mostrarConfirmar;
  }

  async guardarNuevaContrasena() {
    if (!this.codigoValido) {
      this.showToast('El enlace de recuperaciÃ³n no es vÃ¡lido');
      return;
    }

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.showToast('Complete correctamente las contraseÃ±as');
      return;
    }

    const nuevaContrasena = this.formulario.value.password!;

    try {
      this.procesando = true;
      await this.authService.confirmarNuevaContrasena(this.oobCode, nuevaContrasena);

      this.showToast('Contraseña actualizada correctamente', 'success');

      setTimeout(() => {
        this.router.navigateByUrl('/seleccion-usuario');
      }, 1200);

    } catch (error) {
      console.error(error);
      this.showToast('No se pudo actualizar la contraseÃ±a');
    } finally {
      this.procesando = false;
    }
  }

  volverLogin() {
this.router.navigateByUrl('/seleccion-usuario');  }

  private async showToast(message: string, color: 'danger' | 'success' = 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });

    await toast.present();
  }
}




