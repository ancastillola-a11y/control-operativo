// src/app/procesos/admin-route-strategy.ts
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle
} from '@angular/router';

import { IonicRouteStrategy } from '@ionic/angular/standalone';

@Injectable()
export class AdminRouteStrategy extends IonicRouteStrategy {
  private rutasSinCache = [
    'dashboard-admin',
    'empleados',
    'materiales',
    'asignacion-trabajos',
    'mas-admin',
    'codigos-seguridad',
    'seguimiento-trabajos'
  ];

  override shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (this.esRutaSinCache(route)) {
      return false;
    }

    return super.shouldDetach(route);
  }

  override store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle
  ): void {
    if (this.esRutaSinCache(route)) {
      return;
    }

    super.store(route, handle);
  }

  override shouldAttach(route: ActivatedRouteSnapshot): boolean {
    if (this.esRutaSinCache(route)) {
      return false;
    }

    return super.shouldAttach(route);
  }

  override shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    if (
      this.esRutaSinCache(future) ||
      this.esRutaSinCache(curr)
    ) {
      return false;
    }

    return super.shouldReuseRoute(future, curr);
  }

  private esRutaSinCache(route: ActivatedRouteSnapshot): boolean {
    const path = this.obtenerPath(route);
    return this.rutasSinCache.includes(path);
  }

  private obtenerPath(route: ActivatedRouteSnapshot): string {
    return String(route.routeConfig?.path || '').trim();
  }
}

