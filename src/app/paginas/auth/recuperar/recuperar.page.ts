// src/app/controlador/recuperar/recuperar.page.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthService } from '../../../procesos/auth.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
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
export class RecuperarPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);

  formulario = this.fb.group({
    correo: ['', [Validators.required, Validators.email]]
  });

  async enviarEnlace() {
    if (this.formulario.invalid) {
      this.showToast('Ingrese un correo vÃ¡lido');
      return;
    }

    const { correo } = this.formulario.value;

    try {
      const usuarioData = await this.authService.obtenerUsuarioPorCorreoOUsuario(correo!);
      if (!usuarioData) {
        this.showToast('Usuario no registrado');
        return;
      }

      await this.authService.resetPassword(usuarioData.correo);
      this.showToast('Correo de recuperaciÃ³n enviado', 'success');
    } catch (err) {
      console.error(err);
      this.showToast('Error al enviar el correo');
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




