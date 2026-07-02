// src/app/procesos/app-navigation.service.ts
import { Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppNavigationService {
  private router = inject(Router);
  private navCtrl = inject(NavController);
  private zone = inject(NgZone);

  private navegando = false;

  async irRoot(ruta: string): Promise<boolean> {
    const rutaFinal = this.normalizarRuta(ruta);

    if (!rutaFinal) {
      console.warn('[AppNavigationService] Ruta vacÃ­a.');
      return false;
    }

    if (this.navegando) {
      return false;
    }

    this.navegando = true;

    return await this.zone.run(async () => {
      try {
        console.log('[AppNavigationService] Navegando limpio a:', rutaFinal);

        await this.navCtrl.navigateRoot(rutaFinal, {
          animated: false,
          replaceUrl: true
        });

        return true;

      } catch (error) {
        console.error('[AppNavigationService] Error al navegar:', {
          ruta: rutaFinal,
          error
        });

        return false;

      } finally {
        setTimeout(() => {
          this.navegando = false;
        }, 300);
      }
    });
  }

  async irTrabajos(): Promise<boolean> {
    return await this.irRoot('/asignacion-trabajos');
  }

  private normalizarRuta(ruta: string): string {
    const limpia = String(ruta || '').trim();

    if (!limpia) {
      return '';
    }

    return limpia.startsWith('/')
      ? limpia
      : `/${limpia}`;
  }
}

