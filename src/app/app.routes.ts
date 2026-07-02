// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'seleccion-usuario',
    pathMatch: 'full'
  },

  {
    path: 'debug-firebase',
    loadComponent: () =>
      import('./paginas/debug/firebase-debug/firebase-debug.page').then(
        (m) => m.FirebaseDebugPage
      )
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage)
  },

  // ==========================
  // AUTENTICACIÓN
  // ==========================

  {
    path: 'seleccion-usuario',
    loadComponent: () =>
      import('./paginas/auth/seleccion-usuario/seleccion-usuario.page').then(
        (m) => m.SeleccionUsuarioPage
      )
  },
  {
    path: 'login',
    redirectTo: 'seleccion-usuario',
    pathMatch: 'full'
  },
  {
    path: 'login-admin',
    loadComponent: () =>
      import('./paginas/auth/login-admin/login-admin.page').then(
        (m) => m.LoginAdminPage
      )
  },
  {
    path: 'login-empleado',
    loadComponent: () =>
      import('./paginas/auth/login-empleado/login-empleado.page').then(
        (m) => m.LoginEmpleadoPage
      )
  },
  {
    path: 'recuperar',
    loadComponent: () =>
      import('./paginas/auth/recuperar/recuperar.page').then(
        (m) => m.RecuperarPage
      )
  },
  {
    path: 'nueva-contrasena',
    loadComponent: () =>
      import('./paginas/auth/nueva-contrasena/nueva-contrasena.page').then(
        (m) => m.NuevaContrasenaPage
      )
  },

  // ==========================
  // ADMINISTRADOR
  // ==========================

  {
    path: 'dashboard-admin',
    loadComponent: () =>
      import('./paginas/administrador/dashboard-admin/dashboard-admin.page').then(
        (m) => m.DashboardAdminPage
      )
  },
  {
    path: 'empleados',
    loadComponent: () =>
      import('./paginas/administrador/empleados/empleados.page').then(
        (m) => m.EmpleadosPage
      )
  },
  {
    path: 'gps',
    loadComponent: () =>
      import('./paginas/administrador/gps-admin/gps-admin.page').then(
        (m) => m.GpsAdminPage
      )
  },
  {
    path: 'devoluciones',
    loadComponent: () =>
      import('./paginas/administrador/devoluciones/devoluciones.page').then(
        (m) => m.DevolucionesPage
      )
  },
  {
    path: 'finanzas',
    loadComponent: () =>
      import('./paginas/administrador/finanzas/finanzas.page').then(
        (m) => m.FinanzasPage
      )
  },
  {
    path: 'mas-admin',
    loadComponent: () =>
      import('./paginas/administrador/mas-admin/mas-admin.page').then(
        (m) => m.MasAdminPage
      )
  },
  {
    path: 'notificaciones-admin',
    loadComponent: () =>
      import('./paginas/administrador/notificaciones-admin/notificaciones-admin.page').then(
        (m) => m.NotificacionesAdminPage
      )
  },
  {
    path: 'reportes',
    loadComponent: () =>
      import('./paginas/administrador/reportes/reportes.page').then(
        (m) => m.ReportesPage
      )
  },
  {
    path: 'reporte-trabajos',
    loadComponent: () =>
      import('./paginas/administrador/reporte-trabajos/reporte-trabajos.page').then(
        (m) => m.ReporteTrabajosPage
      )
  },
  {
    path: 'reporte-materiales',
    loadComponent: () =>
      import('./paginas/administrador/reporte-materiales/reporte-materiales.page').then(
        (m) => m.ReporteMaterialesPage
      )
  },
  {
    path: 'reporte-empleados',
    loadComponent: () =>
      import('./paginas/administrador/reporte-empleados/reporte-empleados.page').then(
        (m) => m.ReporteEmpleadosPage
      )
  },

  // ==========================
  // EMPLEADO
  // ==========================

  {
    path: 'dashboard-empleado',
    loadComponent: () =>
      import('./paginas/empleado/dashboard-empleado/dashboard-empleado.page').then(
        (m) => m.DashboardEmpleadoPage
      )
  },

  // ==========================
  // ALMACÉN
  // ==========================

  {
    path: 'materiales',
    loadComponent: () =>
      import('./paginas/almacen/materiales/materiales.page').then(
        (m) => m.MaterialesPage
      )
  },

  // ==========================
  // TRABAJOS
  // ==========================

  {
    path: 'asignacion-trabajos',
    loadComponent: () =>
      import('./paginas/trabajos/asignacion-trabajos/asignacion-trabajos.page').then(
        (m) => m.AsignacionTrabajosPage
      )
  },
  {
    path: 'codigos-seguridad',
    loadComponent: () =>
      import('./paginas/trabajos/codigos-seguridad/codigos-seguridad.page').then(
        (m) => m.CodigosSeguridadPage
      )
  },
  {
    path: 'seguimiento-trabajos',
    loadComponent: () =>
      import('./paginas/trabajos/seguimiento-trabajos/seguimiento-trabajos.page').then(
        (m) => m.SeguimientoTrabajosPage
      )
  },

  // ==========================
  // REDIRECCIONES DE COMPATIBILIDAD
  // ==========================

  {
    path: 'gps-admin',
    redirectTo: 'gps',
    pathMatch: 'full'
  },

  {
    path: 'pagos',
    redirectTo: 'finanzas',
    pathMatch: 'full'
  },
  {
    path: 'pago',
    redirectTo: 'finanzas',
    pathMatch: 'full'
  },
  {
    path: 'finanzas-admin',
    redirectTo: 'finanzas',
    pathMatch: 'full'
  },
  {
    path: 'reporte-pagos',
    redirectTo: 'finanzas',
    pathMatch: 'full'
  },

  {
    path: 'trabajos',
    redirectTo: 'asignacion-trabajos',
    pathMatch: 'full'
  },
  {
    path: 'lista-trabajos',
    redirectTo: 'asignacion-trabajos',
    pathMatch: 'full'
  },
  {
    path: 'asignar-trabajos',
    redirectTo: 'asignacion-trabajos',
    pathMatch: 'full'
  },
  {
    path: 'asignacion-trabajo',
    redirectTo: 'asignacion-trabajos',
    pathMatch: 'full'
  },
  {
    path: 'trabajos-admin',
    redirectTo: 'asignacion-trabajos',
    pathMatch: 'full'
  },

  {
    path: 'almacen',
    redirectTo: 'materiales',
    pathMatch: 'full'
  },
  {
    path: 'almacen-admin',
    redirectTo: 'materiales',
    pathMatch: 'full'
  },
  {
    path: 'materiales-admin',
    redirectTo: 'materiales',
    pathMatch: 'full'
  },

  {
    path: 'usuarios',
    redirectTo: 'empleados',
    pathMatch: 'full'
  },
  {
    path: 'usuario',
    redirectTo: 'empleados',
    pathMatch: 'full'
  },
  {
    path: 'personal',
    redirectTo: 'empleados',
    pathMatch: 'full'
  },
  {
    path: 'empleados-admin',
    redirectTo: 'empleados',
    pathMatch: 'full'
  },

  {
    path: 'seguimiento',
    redirectTo: 'seguimiento-trabajos',
    pathMatch: 'full'
  },
  {
    path: 'seguimiento-admin',
    redirectTo: 'seguimiento-trabajos',
    pathMatch: 'full'
  },

  {
    path: 'codigos',
    redirectTo: 'codigos-seguridad',
    pathMatch: 'full'
  },
  {
    path: 'codigos-admin',
    redirectTo: 'codigos-seguridad',
    pathMatch: 'full'
  },
  {
    path: 'codigos-de-seguridad',
    redirectTo: 'codigos-seguridad',
    pathMatch: 'full'
  },
  {
    path: 'seguridad',
    redirectTo: 'codigos-seguridad',
    pathMatch: 'full'
  },

  {
    path: 'reporte-devoluciones',
    redirectTo: 'devoluciones',
    pathMatch: 'full'
  },
  {
    path: 'historial',
    redirectTo: 'notificaciones-admin',
    pathMatch: 'full'
  },
  {
    path: 'historial-actividades',
    redirectTo: 'notificaciones-admin',
    pathMatch: 'full'
  },
  {
    path: 'notificaciones',
    redirectTo: 'notificaciones-admin',
    pathMatch: 'full'
  },

  {
    path: 'configuracion-admin',
    redirectTo: 'mas-admin',
    pathMatch: 'full'
  },
  {
    path: 'mas',
    redirectTo: 'mas-admin',
    pathMatch: 'full'
  },
  {
    path: 'reportes-admin',
    redirectTo: 'reportes',
    pathMatch: 'full'
  },

  // ==========================
  // RUTA DE SEGURIDAD
  // ==========================

  {
    path: '**',
    redirectTo: 'seleccion-usuario'
  }
];