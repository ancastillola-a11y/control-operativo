// src/app/procesos/dashboard-admin.service.ts
import { Injectable, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Observable, combineLatest, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  shareReplay,
  startWith,
  switchMap
} from 'rxjs/operators';

import {
  DashboardAdminDAO,
  EmpresaPanel,
  UsuarioPanel,
  ModuloAdminFirebase,
  ResumenDashboardFirebase
} from '../dao/dashboard-admin.dao';

import { RelojPanel, RelojService } from './reloj.service';
import { NotificacionService } from './notificacion.service';

export interface ModuloAdminVista extends ModuloAdminFirebase {
  badgeValor: number;
}

export interface DashboardAdminVM {
  empresa: EmpresaPanel;
  administrador: UsuarioPanel;
  modulos: ModuloAdminVista[];
  resumen: ResumenDashboardFirebase;
}

const EMPRESA_DEFAULT: EmpresaPanel = {
  nombre: 'COMPROY S.A.C.',
  rubro: 'Consultoría Obras y',
  detalle: 'Mantenimiento de Proyectos S.A.C.',
  logoUrl: 'assets/img/admin/logo-empresa.png',
  bannerUrl: 'assets/img/admin/banner-obrero.png',
  activo: true
};

const ADMIN_DEFAULT: UsuarioPanel = {
  nombres: 'Administrador',
  usuario: 'Administrador',
  correo: '',
  rol: 'admin',
  activo: true,
  fotoUrl: 'assets/img/admin/perfil-admin.png'
};

const RESUMEN_DEFAULT: ResumenDashboardFirebase = {
  trabajosPendientes: 0,
  materialesStockBajo: 0,
  empleadosActivos: 0,
  notificacionesNoLeidas: 0
};

const MODULO_FINANZAS: ModuloAdminFirebase = {
  titulo: 'Finanzas',
  ruta: '/finanzas',
  iconoUrl: 'assets/img/admin/icon-pagos.png',
  orden: 8,
  activo: true,
  color: 'verde',
  badgeTipo: ''
};

const MODULOS_DEFAULT: ModuloAdminFirebase[] = [
  {
    titulo: 'Trabajos',
    ruta: '/asignacion-trabajos',
    iconoUrl: 'assets/img/admin/icon-trabajos.png',
    orden: 1,
    activo: true,
    color: 'azul',
    badgeTipo: 'trabajos_pendientes'
  },
  {
    titulo: 'Almacén',
    ruta: '/materiales',
    iconoUrl: 'assets/img/admin/icon-almacen.png',
    orden: 2,
    activo: true,
    color: 'azul',
    badgeTipo: 'stock_bajo'
  },
  {
    titulo: 'Empleados',
    ruta: '/empleados',
    iconoUrl: 'assets/img/admin/icon-empleados.png',
    orden: 3,
    activo: true,
    color: 'verde',
    badgeTipo: ''
  },
  {
    titulo: 'GPS',
    ruta: '/gps',
    iconoUrl: 'assets/img/admin/icon-gps.png',
    orden: 4,
    activo: true,
    color: 'azul',
    badgeTipo: ''
  },
  {
    titulo: 'Reportes',
    ruta: '/reportes',
    iconoUrl: 'assets/img/admin/icon-reportes.png',
    orden: 5,
    activo: true,
    color: 'azul',
    badgeTipo: ''
  },
  {
    titulo: 'Notificaciones',
    ruta: '/notificaciones-admin',
    iconoUrl: 'assets/img/admin/icon-notificaciones.png',
    orden: 6,
    activo: true,
    color: 'gris',
    badgeTipo: 'notificaciones'
  },
  {
    titulo: 'Devoluciones',
    ruta: '/devoluciones',
    iconoUrl: 'assets/img/admin/icon-devoluciones.png',
    orden: 7,
    activo: true,
    color: 'azul',
    badgeTipo: ''
  },
  MODULO_FINANZAS
];

const VM_DEFAULT: DashboardAdminVM = {
  empresa: EMPRESA_DEFAULT,
  administrador: ADMIN_DEFAULT,
  resumen: RESUMEN_DEFAULT,
  modulos: MODULOS_DEFAULT.map((modulo): ModuloAdminVista => ({
    ...modulo,
    badgeValor: 0
  }))
};

@Injectable({
  providedIn: 'root'
})
export class DashboardAdminService {
  private dao = inject(DashboardAdminDAO);
  private auth = inject(Auth);
  private relojService = inject(RelojService);
  private notificacionService = inject(NotificacionService);

  obtenerReloj$(): Observable<RelojPanel> {
    return this.relojService.reloj$;
  }

  obtenerPanelAdmin$(): Observable<DashboardAdminVM> {
    return authState(this.auth).pipe(
      filter((usuario): usuario is NonNullable<typeof usuario> => !!usuario),

      switchMap((usuario) => {
        const adminTemporal: UsuarioPanel = {
          ...ADMIN_DEFAULT,
          uid: usuario.uid,
          correo: usuario.email || '',
          usuario: usuario.email || 'Administrador',
          nombres: usuario.email || 'Administrador'
        };

        return combineLatest({
          empresa: this.dao.obtenerEmpresa$().pipe(
            startWith(EMPRESA_DEFAULT),
            catchError(() => of(EMPRESA_DEFAULT))
          ),

          administrador: this.dao.obtenerUsuarioAdmin$(
            usuario.uid,
            usuario.email
          ).pipe(
            catchError(() => of(adminTemporal))
          ),

          modulos: this.dao.obtenerModulosAdmin$().pipe(
            startWith(MODULOS_DEFAULT),
            catchError(() => of(MODULOS_DEFAULT))
          ),

          resumen: this.dao.obtenerResumenAdmin$().pipe(
            startWith(RESUMEN_DEFAULT),
            catchError(() => of(RESUMEN_DEFAULT))
          ),

          notificacionesNoLeidas: this.notificacionService.contadorNoLeidas$.pipe(
            startWith(0),
            catchError(() => of(0))
          )
        }).pipe(
          map((data) => {
            const empresa = data.empresa || EMPRESA_DEFAULT;

            const administrador =
              data.administrador || adminTemporal;

            const resumen: ResumenDashboardFirebase = {
              ...(data.resumen || RESUMEN_DEFAULT),
              notificacionesNoLeidas: Number(data.notificacionesNoLeidas || 0)
            };

            const modulosBase =
              data.modulos && data.modulos.length > 0
                ? data.modulos
                : MODULOS_DEFAULT;

            const modulosPanel = this.prepararModulosPanelPrincipal(modulosBase);

            const modulos: ModuloAdminVista[] = modulosPanel
              .filter((modulo) => modulo.activo)
              .sort((a, b) => Number(a.orden || 0) - Number(b.orden || 0))
              .map((modulo): ModuloAdminVista => ({
                ...modulo,
                badgeValor: this.obtenerBadgeModulo(
                  modulo.badgeTipo,
                  resumen
                )
              }));

            return {
              empresa,
              administrador,
              resumen,
              modulos
            };
          })
        );
      }),

      catchError((error) => {
        console.error('[DashboardAdminService] Error al obtener panel admin:', error);
        return of(VM_DEFAULT);
      }),

      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }

 private prepararModulosPanelPrincipal(
  modulos: ModuloAdminFirebase[]
): ModuloAdminFirebase[] {
  const modulosNormalizados = (modulos || [])
    .filter((modulo) => {
      const titulo = this.normalizarTexto(modulo.titulo);
      const ruta = this.normalizarRuta(modulo.ruta);

      return titulo !== 'configuracion' && ruta !== '/configuracion-admin';
    })
    .map((modulo) => this.normalizarModuloAdmin(modulo));

  const sinDuplicados = new Map<string, ModuloAdminFirebase>();

  for (const modulo of modulosNormalizados) {
    const clave =
      this.normalizarTexto(modulo.titulo) ||
      this.normalizarRuta(modulo.ruta);

    if (!clave) {
      continue;
    }

    if (!sinDuplicados.has(clave)) {
      sinDuplicados.set(clave, modulo);
    }
  }

  const resultado = Array.from(sinDuplicados.values());

  const existeFinanzas = resultado.some((modulo) => {
    const titulo = this.normalizarTexto(modulo.titulo);
    const ruta = this.normalizarRuta(modulo.ruta);

    return titulo === 'finanzas' || titulo === 'pagos' || ruta === '/finanzas' || ruta === '/pagos';
  });

  if (!existeFinanzas) {
    resultado.push(MODULO_FINANZAS);
  }

  return resultado;
}
private normalizarModuloAdmin(
  modulo: ModuloAdminFirebase
): ModuloAdminFirebase {
  const titulo = this.normalizarTexto(modulo.titulo);
  const rutaOriginal = this.normalizarRuta(modulo.ruta);
  const rutaFinal = this.resolverRutaAdmin(titulo, rutaOriginal);

  const esFinanzas =
    titulo === 'finanzas' ||
    titulo === 'pagos' ||
    titulo === 'pago' ||
    rutaFinal === '/finanzas' ||
    rutaFinal === '/pagos';

  if (esFinanzas) {
    return {
      ...MODULO_FINANZAS,
      ...modulo,
      titulo: 'Finanzas',
      ruta: '/finanzas',
      iconoUrl: modulo.iconoUrl || MODULO_FINANZAS.iconoUrl,
      orden: Number(modulo.orden || MODULO_FINANZAS.orden),
      activo: true,
      color: 'verde',
      badgeTipo: (modulo.badgeTipo || '') as ModuloAdminFirebase['badgeTipo']
    };
  }

  return {
    ...modulo,
    ruta: rutaFinal || rutaOriginal || '/dashboard-admin',
    activo: modulo.activo !== false,
    color: this.normalizarColorModulo(modulo.color),
    badgeTipo: (modulo.badgeTipo || '') as ModuloAdminFirebase['badgeTipo']
  };
}

private resolverRutaAdmin(
  titulo: string,
  ruta: string
): string {
  const rutas: Record<string, string> = {
    '/dashboard-admin': '/dashboard-admin',
    'dashboard': '/dashboard-admin',
    'inicio': '/dashboard-admin',

    '/trabajos': '/asignacion-trabajos',
    '/lista-trabajos': '/asignacion-trabajos',
    '/asignacion-trabajo': '/asignacion-trabajos',
    '/asignar-trabajos': '/asignacion-trabajos',
    '/trabajos-admin': '/asignacion-trabajos',
    '/asignacion-trabajos': '/asignacion-trabajos',
    'trabajos': '/asignacion-trabajos',
    'asignacion trabajos': '/asignacion-trabajos',
    'asignacion de trabajos': '/asignacion-trabajos',

    '/materiales': '/materiales',
    '/almacen': '/materiales',
    '/almacen-admin': '/materiales',
    '/materiales-admin': '/materiales',
    'almacen': '/materiales',
    'materiales': '/materiales',

    '/empleados': '/empleados',
    '/usuarios': '/empleados',
    '/personal': '/empleados',
    '/empleados-admin': '/empleados',
    'empleados': '/empleados',
    'usuarios': '/empleados',
    'personal': '/empleados',

    '/gps': '/gps',
    '/gps-admin': '/gps',
    'gps': '/gps',

    '/reportes': '/reportes',
    '/reportes-admin': '/reportes',
    'reportes': '/reportes',

    '/notificaciones': '/notificaciones-admin',
    '/notificaciones-admin': '/notificaciones-admin',
    'notificaciones': '/notificaciones-admin',

    '/devoluciones': '/devoluciones',
    '/reporte-devoluciones': '/devoluciones',
    'devoluciones': '/devoluciones',

    '/finanzas': '/finanzas',
    '/finanzas-admin': '/finanzas',
    '/pagos': '/finanzas',
    '/pago': '/finanzas',
    '/reporte-pagos': '/finanzas',
    'finanzas': '/finanzas',
    'pagos': '/finanzas',
    'pago': '/finanzas',

    '/mas': '/mas-admin',
    '/mas-admin': '/mas-admin',
    '/configuracion-admin': '/mas-admin',
    'mas': '/mas-admin',
    'configuracion': '/mas-admin',

    '/seguimiento': '/seguimiento-trabajos',
    '/seguimiento-admin': '/seguimiento-trabajos',
    '/seguimiento-trabajos': '/seguimiento-trabajos',
    'seguimiento': '/seguimiento-trabajos',
    'seguimiento de trabajos': '/seguimiento-trabajos',

    '/codigos': '/codigos-seguridad',
    '/codigos-admin': '/codigos-seguridad',
    '/codigos-de-seguridad': '/codigos-seguridad',
    '/seguridad': '/codigos-seguridad',
    '/codigos-seguridad': '/codigos-seguridad',
    'codigos': '/codigos-seguridad',
    'codigos de seguridad': '/codigos-seguridad'
  };

  return rutas[ruta] || rutas[titulo] || ruta;
}

private normalizarRuta(valor: string): string {
  let ruta = String(valor || '').trim().toLowerCase();

  if (!ruta) {
    return '';
  }

  if (!ruta.startsWith('/')) {
    ruta = `/${ruta}`;
  }

  return ruta.replace(/\/+/g, '/');
}

private normalizarColorModulo(
  color: any
): ModuloAdminFirebase['color'] {
  const valor = String(color || '').trim().toLowerCase();

  if (valor === 'verde' || valor === 'gris' || valor === 'azul') {
    return valor;
  }

  return 'azul';
}
  private obtenerBadgeModulo(
    badgeTipo: ModuloAdminFirebase['badgeTipo'],
    resumen: ResumenDashboardFirebase
  ): number {
    switch (badgeTipo) {
      case 'notificaciones':
        return resumen.notificacionesNoLeidas;

      case 'stock_bajo':
        return resumen.materialesStockBajo;

      case 'trabajos_pendientes':
        return resumen.trabajosPendientes;

      default:
        return 0;
    }
  }

  private normalizarTexto(valor: string): string {
    return String(valor || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}