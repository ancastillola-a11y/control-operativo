const fs = require('fs');

const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);

function backup(path) {
  if (fs.existsSync(path)) {
    fs.copyFileSync(path, `${path}.bak_estado_empleado_${stamp}`);
  }
}

function read(path) {
  return fs.readFileSync(path, 'utf8');
}

function write(path, content) {
  fs.writeFileSync(path, content, 'utf8');
}

function patch(path, fn) {
  backup(path);
  const original = read(path);
  const next = fn(original);
  if (next !== original) {
    write(path, next);
    console.log('PATCH OK:', path);
  } else {
    console.log('SIN CAMBIOS:', path);
  }
}

/* =========================================================
   1. BOTTOM NAV: agregar modo empleado sin romper admin
========================================================= */

patch('src/app/shared/componentes/admin-bottom-nav/admin-bottom-nav.component.ts', (txt) => {
  if (!txt.includes("@Input() modo: 'admin' | 'empleado'")) {
    txt = txt.replace(
      "@Input() activo: AdminNavItem = 'inicio';",
      "@Input() activo: AdminNavItem = 'inicio';\n  @Input() modo: 'admin' | 'empleado' = 'admin';"
    );
  }

  function insertGuard(methodName, code) {
    const pos = txt.indexOf(`${methodName}()`);
    if (pos === -1) return;
    const fragment = txt.slice(pos, pos + 350);
    if (fragment.includes("this.modo === 'empleado'")) return;

    const re = new RegExp(`(${methodName}\\(\\)\\s*{\\s*)`);
    txt = txt.replace(re, `$1${code}`);
  }

  const irEmpleado = `
    if (this.modo === 'empleado') {
      this.navCtrl.navigateRoot('/dashboard-empleado', {
        animated: false,
        replaceUrl: true
      });
      return;
    }

`;

  const irEmpleadoGps = `
    if (this.modo === 'empleado') {
      this.mostrarToast('El GPS está dentro de tu panel operativo.');
      this.navCtrl.navigateRoot('/dashboard-empleado', {
        animated: false,
        replaceUrl: true
      });
      return;
    }

`;

  const irEmpleadoRuta = `
    if (this.modo === 'empleado') {
      this.mostrarToast('La ruta está disponible dentro del trabajo actual.');
      this.navCtrl.navigateRoot('/dashboard-empleado', {
        animated: false,
        replaceUrl: true
      });
      return;
    }

`;

  const irEmpleadoCuenta = `
    if (this.modo === 'empleado') {
      this.mostrarToast('Tu cuenta se gestiona desde el panel operativo.');
      this.navCtrl.navigateRoot('/dashboard-empleado', {
        animated: false,
        replaceUrl: true
      });
      return;
    }

`;

  insertGuard('irInicio', irEmpleado);
  insertGuard('irAlmacen', irEmpleadoGps);
  insertGuard('irTrabajos', irEmpleado);
  insertGuard('irReportes', irEmpleadoRuta);
  insertGuard('irMas', irEmpleadoCuenta);

  return txt;
});

patch('src/app/shared/componentes/admin-bottom-nav/admin-bottom-nav.component.html', (txt) => {
  txt = txt.replace(
    /<span>Almac(?:én|Ã©n)<\/span>/,
    "<span>{{ modo === 'empleado' ? 'GPS' : 'Almacén' }}</span>"
  );

  txt = txt.replace(
    /<span>Reportes<\/span>/,
    "<span>{{ modo === 'empleado' ? 'Ruta' : 'Reportes' }}</span>"
  );

  txt = txt.replace(
    /<span>M(?:ás|Ã¡s)<\/span>/,
    "<span>{{ modo === 'empleado' ? 'Cuenta' : 'Más' }}</span>"
  );

  return txt;
});

/* =========================================================
   2. PANEL EMPLEADO: header, bottom nav y bloqueo doble clic
========================================================= */

patch('src/app/paginas/empleado/dashboard-empleado/dashboard-empleado.page.ts', (txt) => {
  if (!txt.includes('AdminHeaderComponent')) {
    txt = txt.replace(
      "import { AdminModuleHeroComponent } from '../../../shared/componentes/admin-module-hero/admin-module-hero.component';",
      "import { AdminHeaderComponent } from '../../../shared/componentes/admin-header/admin-header.component';\nimport { AdminBottomNavComponent } from '../../../shared/componentes/admin-bottom-nav/admin-bottom-nav.component';\nimport { AdminModuleHeroComponent } from '../../../shared/componentes/admin-module-hero/admin-module-hero.component';"
    );
  }

  if (!txt.includes('AdminHeaderComponent,')) {
    txt = txt.replace(
      "IonicModule,\n    AdminModuleHeroComponent,",
      "IonicModule,\n    AdminHeaderComponent,\n    AdminBottomNavComponent,\n    AdminModuleHeroComponent,"
    );
  }

  if (!txt.includes('accionEnProcesoUid')) {
    txt = txt.replace(
      "gpsEstadoTexto$ = this.gpsEmpleadoService.estadoTexto$;",
      "gpsEstadoTexto$ = this.gpsEmpleadoService.estadoTexto$;\n\n  accionEnProcesoUid = '';"
    );
  }

  if (!txt.includes('estaProcesando(')) {
    const helpers = `
  estaProcesando(trabajo: DashboardTrabajoEmpleado): boolean {
    const uid = this.obtenerTrabajoUid(trabajo);
    return !!uid && this.accionEnProcesoUid === uid;
  }

  private obtenerTrabajoUid(trabajo: DashboardTrabajoEmpleado): string {
    return String(trabajo.uid || trabajo.id || '').trim();
  }

  private bloquearAccionTrabajo(trabajo: DashboardTrabajoEmpleado): boolean {
    const uid = this.obtenerTrabajoUid(trabajo);

    if (!uid) {
      return false;
    }

    if (this.accionEnProcesoUid === uid) {
      return false;
    }

    this.accionEnProcesoUid = uid;
    return true;
  }

  private liberarAccionTrabajo(trabajo: DashboardTrabajoEmpleado): void {
    const uid = this.obtenerTrabajoUid(trabajo);

    if (this.accionEnProcesoUid === uid) {
      this.accionEnProcesoUid = '';
    }
  }

  private async confirmarAccionEstado(
    titulo: string,
    mensaje: string
  ): Promise<boolean> {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          role: 'confirm'
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    return role === 'confirm';
  }

  irPanelEmpleado() {
    this.navCtrl.navigateRoot('/dashboard-empleado', {
      animated: false,
      replaceUrl: true
    });
  }

  abrirMenu() {
    this.irPanelEmpleado();
  }

  abrirNotificaciones() {
    this.mostrarToast('Tus avisos operativos aparecerán dentro del panel.', 'primary');
  }

  async abrirPerfil() {
    const alert = await this.alertCtrl.create({
      header: 'Cuenta del empleado',
      message: '¿Deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cerrar sesión',
          role: 'confirm'
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    if (role === 'confirm') {
      await this.cerrarSesion();
    }
  }

`;

    txt = txt.replace(
      " async activarGps(",
      helpers + "\n async activarGps("
    );
  }

  txt = txt.replace(
    /  async marcarEnCamino\([\s\S]*?\n  async iniciarTrabajo\(/,
`  async marcarEnCamino(
    trabajo: DashboardTrabajoEmpleado,
    empleado: DashboardEmpleadoUsuario
  ) {
    if (!this.bloquearAccionTrabajo(trabajo)) {
      return;
    }

    try {
      const confirmado = await this.confirmarAccionEstado(
        'Marcar en camino',
        'Confirma que ya te estás dirigiendo al trabajo.'
      );

      if (!confirmado) {
        return;
      }

      await this.dashboardEmpleadoService.marcarEnCamino(
        trabajo,
        empleado
      );

      await this.mostrarToast('Trabajo marcado como en camino.', 'success');
    } catch (error) {
      console.error('[DashboardEmpleadoPage] Error marcando en camino:', error);
      await this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    } finally {
      this.liberarAccionTrabajo(trabajo);
    }
  }

  async iniciarTrabajo(`
  );

  txt = txt.replace(
    /  async iniciarTrabajo\([\s\S]*?\n  async finalizarTrabajo\(/,
`  async iniciarTrabajo(
    trabajo: DashboardTrabajoEmpleado,
    empleado: DashboardEmpleadoUsuario
  ) {
    if (!this.bloquearAccionTrabajo(trabajo)) {
      return;
    }

    try {
      const confirmado = await this.confirmarAccionEstado(
        'Iniciar trabajo',
        'Confirma que ya estás en el lugar y vas a iniciar el trabajo.'
      );

      if (!confirmado) {
        return;
      }

      await this.dashboardEmpleadoService.iniciarTrabajo(
        trabajo,
        empleado
      );

      await this.mostrarToast('Trabajo iniciado correctamente.', 'success');
    } catch (error) {
      console.error('[DashboardEmpleadoPage] Error iniciando trabajo:', error);
      await this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    } finally {
      this.liberarAccionTrabajo(trabajo);
    }
  }

  async finalizarTrabajo(`
  );

  txt = txt.replace(
    /  async finalizarTrabajo\([\s\S]*?\n  llamarCliente\(/,
`  async finalizarTrabajo(
    trabajo: DashboardTrabajoEmpleado,
    empleado: DashboardEmpleadoUsuario
  ) {
    if (!this.bloquearAccionTrabajo(trabajo)) {
      return;
    }

    try {
      const confirmado = await this.confirmarAccionEstado(
        'Finalizar trabajo',
        'Confirma que el trabajo ya fue terminado. Luego se podrá registrar la devolución si corresponde.'
      );

      if (!confirmado) {
        return;
      }

      await this.dashboardEmpleadoService.finalizarTrabajo(
        trabajo,
        empleado
      );

      await this.mostrarToast('Trabajo finalizado correctamente.', 'success');
    } catch (error) {
      console.error('[DashboardEmpleadoPage] Error finalizando trabajo:', error);
      await this.mostrarToast(this.obtenerMensajeError(error), 'danger');
    } finally {
      this.liberarAccionTrabajo(trabajo);
    }
  }

  llamarCliente(`
  );

  return txt;
});

patch('src/app/paginas/empleado/dashboard-empleado/dashboard-empleado.page.html', (txt) => {
  if (!txt.includes('<app-admin-header')) {
    const header = `
      <app-admin-header
        [nombre]="vm.empleado.nombreCompleto || 'Empleado'"
        [rol]="vm.empleado.cargoTexto || 'Personal operativo'"
        [fotoUrl]="vm.empleado.fotoUrl || ''"
        [notificaciones]="0"
        (menuClick)="abrirMenu()"
        (notificacionesClick)="abrirNotificaciones()"
        (perfilClick)="abrirPerfil()"
      ></app-admin-header>

`;

    txt = txt.replace(
      /      <section class="empleado-topbar">[\s\S]*?      <\/section>\s*/,
      header
    );
  }

  txt = txt.replace(
    /(\*ngIf="puedeMarcarEnCamino\(trabajo\)"\s*\n\s*type="button")/g,
    '$1\n                [disabled]="estaProcesando(trabajo)"'
  );

  txt = txt.replace(
    /(\*ngIf="puedeIniciar\(trabajo\)"\s*\n\s*type="button")/g,
    '$1\n                [disabled]="estaProcesando(trabajo)"'
  );

  txt = txt.replace(
    /(\*ngIf="puedeFinalizar\(trabajo\)"\s*\n\s*type="button")/g,
    '$1\n                [disabled]="estaProcesando(trabajo)"'
  );

  if (!txt.includes('modo="empleado"')) {
    txt = txt.replace(
      /\n<\/ion-content>\s*$/,
      '\n  <app-admin-bottom-nav activo="inicio" modo="empleado"></app-admin-bottom-nav>\n\n</ion-content>\n'
    );
  }

  return txt;
});

patch('src/app/paginas/empleado/dashboard-empleado/dashboard-empleado.page.css', (txt) => {
  txt = txt.replace(
    'padding: 12px 12px 34px;',
    'padding: 12px 12px 104px;'
  );

  if (!txt.includes('FIX PANEL EMPLEADO HEADER FOOTER')) {
    txt += `

/* FIX PANEL EMPLEADO HEADER FOOTER */
:host ::ng-deep app-admin-header {
  display: block;
  margin-bottom: 12px;
}

:host ::ng-deep app-admin-bottom-nav {
  display: block;
}

.btn-action:disabled,
.gps-button:disabled {
  opacity: 0.55;
  pointer-events: none;
  filter: grayscale(0.25);
}

@media (min-width: 431px) {
  .empleado-container {
    max-width: 430px;
    box-shadow: 0 0 0 1px rgba(16, 24, 40, 0.04);
  }
}
`;
  }

  return txt;
});

/* =========================================================
   3. ADMIN: retroceder estado desde seguimiento
========================================================= */

patch('src/app/dao/trabajo.dao.ts', (txt) => {
  if (!txt.includes('EstadoTrabajo')) {
    txt = txt.replace(
      'TrabajoMaterialAsignado\n} from',
      'TrabajoMaterialAsignado,\n  EstadoTrabajo\n} from'
    );
  }

  if (!txt.includes('cambiarEstadoAdmin(')) {
    const method = `
  async cambiarEstadoAdmin(
    trabajoUid: string,
    nuevoEstado: EstadoTrabajo,
    motivo = ''
  ): Promise<void> {
    const uid = String(trabajoUid || '').trim();

    if (!uid) {
      throw new Error('trabajo-uid-vacio');
    }

    const adminUid = this.auth.currentUser?.uid || '';
    const trabajoRef = doc(this.firestore, 'trabajos', uid);

    await updateDoc(trabajoRef, {
      estado: nuevoEstado,
      estadoCorregidoPorAdmin: true,
      motivoCorreccionEstado: String(motivo || '').trim(),
      actualizadoPorUid: adminUid,
      updatedAt: serverTimestamp()
    });

    await this.registrarHistorial(
      'retroceder_estado_trabajo',
      'Se corrigió el estado del trabajo a ' + nuevoEstado + '. Motivo: ' + String(motivo || 'Corrección administrativa'),
      uid
    );
  }

`;

    txt = txt.replace(
      '\n  async registrarHistorial(',
      '\n' + method + '\n  async registrarHistorial('
    );
  }

  return txt;
});

patch('src/app/procesos/trabajo.service.ts', (txt) => {
  if (!txt.includes('retrocederEstadoTrabajo(')) {
    const method = `
  async retrocederEstadoTrabajo(
    trabajo: TrabajoVista,
    motivo = ''
  ): Promise<void> {
    const uid = String(trabajo.uid || trabajo.id || '').trim();

    if (!uid) {
      throw new Error('trabajo-uid-vacio');
    }

    const estadoActual = trabajo.estado;

    const mapaRetroceso: Partial<Record<EstadoTrabajo, EstadoTrabajo>> = {
      en_camino: 'pendiente',
      en_proceso: 'en_camino',
      finalizado: 'en_proceso'
    };

    const estadoAnterior = mapaRetroceso[estadoActual];

    if (!estadoAnterior) {
      throw new Error('estado-no-retrocedible');
    }

    await this.dao.cambiarEstadoAdmin(
      uid,
      estadoAnterior,
      motivo
    );

    await this.cargarTrabajos();
  }

`;

    txt = txt.replace(
      '\n  private aplicarFiltros(',
      '\n' + method + '\n  private aplicarFiltros('
    );
  }

  return txt;
});

patch('src/app/paginas/trabajos/seguimiento-trabajos/seguimiento-trabajos.page.ts', (txt) => {
  if (!txt.includes('AlertController')) {
    txt = txt.replace(
      'IonicModule,\n  ModalController,',
      'IonicModule,\n  AlertController,\n  ModalController,'
    );
  }

  if (!txt.includes('private alertCtrl')) {
    txt = txt.replace(
      'private toastCtrl = inject(ToastController);',
      'private toastCtrl = inject(ToastController);\n  private alertCtrl = inject(AlertController);'
    );
  }

  if (!txt.includes('accionAdminUid')) {
    txt = txt.replace(
      'private navegando = false;',
      "private navegando = false;\n  accionAdminUid = '';"
    );
  }

  if (!txt.includes('puedeRetrocederEstado(')) {
    const methods = `
  puedeRetrocederEstado(trabajo: TrabajoVista): boolean {
    const estado = this.normalizarEstado(trabajo.estado);

    return [
      'en_camino',
      'en_proceso',
      'finalizado'
    ].includes(estado);
  }

  estaProcesandoAdmin(trabajo: TrabajoVista): boolean {
    const uid = String(trabajo.uid || trabajo.id || '').trim();
    return !!uid && this.accionAdminUid === uid;
  }

  obtenerEstadoAnteriorTexto(trabajo: TrabajoVista): string {
    const estado = this.normalizarEstado(trabajo.estado);

    const mapa: Record<string, string> = {
      en_camino: 'Pendiente',
      en_proceso: 'En camino',
      finalizado: 'En proceso'
    };

    return mapa[estado] || '';
  }

  async retrocederEstado(trabajo: TrabajoVista): Promise<void> {
    const uid = String(trabajo.uid || trabajo.id || '').trim();

    if (!uid || this.accionAdminUid === uid) {
      return;
    }

    if (!this.puedeRetrocederEstado(trabajo)) {
      await this.mostrarToast('Este estado no se puede retroceder desde seguimiento.', 'primary');
      return;
    }

    let motivo = '';

    const alert = await this.alertCtrl.create({
      header: 'Retroceder estado',
      subHeader: trabajo.codigoTrabajo || trabajo.clienteNombre,
      message: 'El estado volverá a: ' + this.obtenerEstadoAnteriorTexto(trabajo) + '. Esto no modifica stock ni elimina el trabajo.',
      inputs: [
        {
          name: 'motivo',
          type: 'text',
          placeholder: 'Motivo de la corrección'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Retroceder',
          role: 'confirm',
          handler: (data) => {
            motivo = String(data?.motivo || 'Corrección administrativa').trim();
            return true;
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    if (role !== 'confirm') {
      return;
    }

    this.accionAdminUid = uid;

    try {
      await this.trabajoService.retrocederEstadoTrabajo(
        trabajo,
        motivo || 'Corrección administrativa'
      );

      await this.trabajoService.cargarTrabajos();

      await this.mostrarToast('Estado retrocedido correctamente.', 'success');
    } catch (error) {
      console.error('[SeguimientoTrabajosPage] Error retrocediendo estado:', error);
      await this.mostrarToast('No se pudo retroceder el estado.', 'danger');
    } finally {
      this.accionAdminUid = '';
    }
  }

`;

    txt = txt.replace(
      '\n  obtenerEstadoTexto(',
      '\n' + methods + '\n  obtenerEstadoTexto('
    );
  }

  return txt;
});

patch('src/app/paginas/trabajos/seguimiento-trabajos/seguimiento-trabajos.page.html', (txt) => {
  if (txt.includes('(click)="$event.stopPropagation(); retrocederEstado(trabajo)"')) {
    return txt;
  }

  const boton = `
            <div class="seguimiento-actions">
              <button
                type="button"
                class="btn-retroceder"
                *ngIf="puedeRetrocederEstado(trabajo)"
                [disabled]="estaProcesandoAdmin(trabajo)"
                (click)="$event.stopPropagation(); retrocederEstado(trabajo)"
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
                <span>Retroceder</span>
              </button>
            </div>

`;

  txt = txt.replace(
    /(\s*<ion-icon\s+class="card-arrow"\s+name="chevron-forward-outline"\s*><\/ion-icon>)/,
    boton + '$1'
  );

  return txt;
});

patch('src/app/paginas/trabajos/seguimiento-trabajos/seguimiento-trabajos.page.css', (txt) => {
  if (!txt.includes('.btn-retroceder')) {
    txt += `

.seguimiento-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.btn-retroceder {
  min-height: 34px;
  border: none;
  border-radius: 999px;
  padding: 0 12px;
  background: #fff4d6;
  color: #b77900;
  font-size: 11px;
  font-weight: 900;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-retroceder ion-icon {
  font-size: 16px;
}

.btn-retroceder:disabled {
  opacity: 0.55;
  pointer-events: none;
}
`;
  }

  return txt;
});

console.log('PATCH TERMINADO: empleado protegido, header/footer aplicado y admin puede retroceder estado.');
