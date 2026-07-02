// src/app/paginas/auth/seleccion-usuario/seleccion-usuario.page.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-seleccion-usuario',
  templateUrl: './seleccion-usuario.page.html',
  styleUrls: ['./seleccion-usuario.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SeleccionUsuarioPage {
  private navCtrl = inject(NavController);

  seleccionarRol(rol: 'admin' | 'empleado'): void {
    localStorage.setItem('rolSeleccionado', rol);

    if (rol === 'admin') {
      this.navCtrl.navigateForward('/login-admin', {
        animated: false
      });
      return;
    }

    this.navCtrl.navigateForward('/login-empleado', {
      animated: false
    });
  }

  seleccionarAdministrador(): void {
    this.seleccionarRol('admin');
  }

  seleccionarEmpleado(): void {
    this.seleccionarRol('empleado');
  }
}

