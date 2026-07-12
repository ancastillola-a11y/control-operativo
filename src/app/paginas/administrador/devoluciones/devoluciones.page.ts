// src/app/paginas/administrador/devoluciones/devoluciones.page.ts

import { CommonModule } from '@angular/common';

import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';

import {
  AlertController,
  IonicModule,
  NavController,
  ToastController
} from '@ionic/angular';

import { Auth } from '@angular/fire/auth';
import { IonicSafeString } from '@ionic/core';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  checkmarkCircleOutline,
  cubeOutline,
  informationCircleOutline,
  warningOutline
} from 'ionicons/icons';

import {
  DashboardAdminService
} from '../../../procesos/dashboard-admin.service';

import {
  DevolucionService
} from '../../../procesos/devolucion.service';

import {
  DevolucionTrabajoVista,
  FiltroDevolucion,
  ValidarDevolucionData
} from '../../../modelos/devolucion';

import {
  AdminHeaderComponent
} from '../../../shared/componentes/admin-header/admin-header.component';

import {
  AdminBottomNavComponent
} from '../../../shared/componentes/admin-bottom-nav/admin-bottom-nav.component';

type ColorToast =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger';

@Component({
  selector: 'app-devoluciones',
  standalone: true,

  templateUrl: './devoluciones.page.html',
  styleUrls: ['./devoluciones.page.css'],

  imports: [
    CommonModule,
    IonicModule,
    AdminHeaderComponent,
    AdminBottomNavComponent
  ]
})
export class DevolucionesPage {
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController);
  private cdr = inject(ChangeDetectorRef);
  private auth = inject(Auth);

  private dashboardAdminService =
    inject(DashboardAdminService);

  private devolucionService =
    inject(DevolucionService);

  accionEnProcesoUid = '';
  busqueda = '';

  adminVm$ =
    this.dashboardAdminService.obtenerPanelAdmin$();

  vm$ =
    this.devolucionService.vm$;

  constructor() {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'cube-outline': cubeOutline,
      'information-circle-outline': informationCircleOutline,
      'warning-outline': warningOutline
    });
  }

  ionViewWillEnter(): void {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  /*
   * ============================================================
   * FILTROS Y BÚSQUEDA
   * ============================================================
   */

  cambiarFiltro(
    filtro: FiltroDevolucion
  ): void {
    this.devolucionService.cambiarFiltro(filtro);
  }

  cambiarBusqueda(
    event: any
  ): void {
    this.busqueda = String(
      event?.detail?.value || ''
    ).trim();
  }

  obtenerResultados(
    devoluciones: DevolucionTrabajoVista[]
  ): DevolucionTrabajoVista[] {
    const lista = Array.isArray(devoluciones)
      ? devoluciones
      : [];

    const termino = this.normalizarTextoBusqueda(
      this.busqueda
    );

    if (!termino) {
      return lista;
    }

    return lista.filter((item) => {
      const materialesTexto = Array.isArray(item.materiales)
        ? item.materiales
            .map((material) =>
              [
                material.nombre,
                material.unidad,
                material.cantidadAsignada,
                material.cantidadUsada,
                material.cantidadDevuelta
              ].join(' ')
            )
            .join(' ')
        : '';

      const textoCompleto =
        this.normalizarTextoBusqueda(
          [
            item.codigoTrabajo,
            item.clienteNombre,
            item.tipoTrabajo,
            item.empleadoTexto,
            item.estadoTexto,
            item.fechaTexto,
            item.fechaRegistroTexto,
            item.fechaValidacionTexto,
            item.observacionDevolucion,
            materialesTexto
          ].join(' ')
        );

      return textoCompleto.includes(termino);
    });
  }

  /*
   * ============================================================
   * NAVEGACIÓN
   * ============================================================
   */

  volver(): void {
    void this.navCtrl.navigateRoot(
      '/mas-admin',
      {
        animated: false,
        replaceUrl: true
      }
    );
  }

  abrirMenu(): void {
    void this.navCtrl.navigateRoot(
      '/dashboard-admin',
      {
        animated: false,
        replaceUrl: true
      }
    );
  }

  abrirNotificaciones(): void {
    void this.navCtrl.navigateRoot(
      '/notificaciones-admin',
      {
        animated: false,
        replaceUrl: true
      }
    );
  }

  abrirPerfil(): void {
    void this.mostrarToast(
      'Configuración de perfil próximamente.',
      'primary'
    );
  }

  /*
   * ============================================================
   * VALIDACIÓN DE LA DEVOLUCIÓN
   * ============================================================
   */

  async validar(
    item: DevolucionTrabajoVista
  ): Promise<void> {
    if (!item) {
      await this.mostrarToast(
        'No se encontró la devolución seleccionada.',
        'danger'
      );

      return;
    }

    if (item.estadoDevolucion === 'validada') {
      await this.mostrarToast(
        'Esta devolución ya fue validada.',
        'primary'
      );

      return;
    }

    const trabajoUid = String(
      item.uid || ''
    ).trim();

    if (!trabajoUid) {
      await this.mostrarToast(
        'La devolución no tiene identificador de trabajo.',
        'danger'
      );

      return;
    }

    const totalDevuelto = Number(
      item.totalDevuelto || 0
    );

    if (
      !Number.isFinite(totalDevuelto) ||
      totalDevuelto <= 0
    ) {
      await this.mostrarToast(
        'Este trabajo no tiene materiales sobrantes para validar.',
        'warning'
      );

      return;
    }

    if (this.accionEnProcesoUid === trabajoUid) {
      await this.mostrarToast(
        'La devolución ya se está procesando.',
        'warning'
      );

      return;
    }

    const codigoSeguimiento = String(
      item.codigoTrabajo ||
      'Sin código'
    ).trim();

    const alert = await this.alertCtrl.create({
      header: 'Validar devolución',

      subHeader:
        `Seguimiento: ${codigoSeguimiento}`,

      message: new IonicSafeString(`
        Ingresa el
        <strong>código de devolución</strong>
        correspondiente a este trabajo.

        <br><br>

        El código de seguimiento
        <strong>
          ${this.escaparHtml(codigoSeguimiento)}
        </strong>
        solo identifica el trabajo y no valida la devolución.

        <br><br>

        Cantidad sobrante registrada:
        <strong>
          ${this.formatearCantidad(totalDevuelto)}
        </strong>
      `),

      inputs: [
        {
          name: 'codigoDevolucion',
          type: 'text',
          placeholder: 'DV-123456',

          attributes: {
            maxlength: 20,
            autocomplete: 'off',
            autocapitalize: 'characters',
            spellcheck: false
          }
        }
      ],

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Validar',
          role: 'confirm'
        }
      ],

      cssClass: 'devolucion-validacion-alert'
    });

    await alert.present();

    const resultado =
      await alert.onDidDismiss();

    if (resultado.role !== 'confirm') {
      return;
    }

    const codigoIngresado = String(
      resultado.data?.values
        ?.codigoDevolucion ||
      ''
    )
      .trim()
      .toUpperCase();

    if (!codigoIngresado) {
      await this.mostrarToast(
        'Debes ingresar el código de devolución.',
        'warning'
      );

      return;
    }

    await this.confirmarValidacion(
      item,
      codigoIngresado
    );
  }

  private async confirmarValidacion(
    item: DevolucionTrabajoVista,
    codigo: string
  ): Promise<void> {
    const trabajoUid = String(
      item?.uid || ''
    ).trim();

    const codigoIngresado = String(
      codigo || ''
    )
      .trim()
      .toUpperCase();

    if (!trabajoUid) {
      await this.mostrarToast(
        'No se encontró el identificador del trabajo.',
        'danger'
      );

      return;
    }

    if (!codigoIngresado) {
      await this.mostrarToast(
        'Ingresa el código de devolución.',
        'warning'
      );

      return;
    }

    if (!this.bloquearAccion(trabajoUid)) {
      return;
    }

    try {
      const administrador =
        this.obtenerAdministradorActual();

      const payload: ValidarDevolucionData = {
        trabajoUid,
        codigoIngresado,

        origenValidacion: 'administrador',

        administradorUid:
          administrador.uid,

        administradorNombre:
          administrador.nombre
      };

      await this.devolucionService
        .validarDevolucion(payload);

      await this.mostrarToast(
        'Devolución validada. El stock del almacén fue actualizado.',
        'success'
      );

      setTimeout(() => {
        this.cdr.detectChanges();
      }, 50);
    } catch (error: unknown) {
      console.error(
        '[DevolucionesPage] Error validando devolución:',
        error
      );

      await this.mostrarToast(
        this.obtenerMensajeError(error),
        'danger'
      );
    } finally {
      this.liberarAccion(trabajoUid);
    }
  }

  /*
   * ============================================================
   * ESTADOS VISUALES
   * ============================================================
   */

  estaValidando(
    item: DevolucionTrabajoVista
  ): boolean {
    const uid = String(
      item?.uid || ''
    ).trim();

    return (
      !!uid &&
      this.accionEnProcesoUid === uid
    );
  }

  trackByDevolucion(
    index: number,
    item: DevolucionTrabajoVista
  ): string {
    return (
      String(item?.uid || '').trim() ||
      String(index)
    );
  }

  /*
   * ============================================================
   * MÉTODOS PRIVADOS
   * ============================================================
   */

  private normalizarTextoBusqueda(
    valor: unknown
  ): string {
    return String(valor || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ');
  }

  private bloquearAccion(
    trabajoUid: string
  ): boolean {
    const uid = String(
      trabajoUid || ''
    ).trim();

    if (!uid) {
      return false;
    }

    if (this.accionEnProcesoUid === uid) {
      return false;
    }

    this.accionEnProcesoUid = uid;

    return true;
  }

  private liberarAccion(
    trabajoUid: string
  ): void {
    const uid = String(
      trabajoUid || ''
    ).trim();

    if (this.accionEnProcesoUid === uid) {
      this.accionEnProcesoUid = '';
    }
  }

  private obtenerAdministradorActual(): {
    uid: string;
    nombre: string;
  } {
    const usuario = this.auth.currentUser;

    return {
      uid: String(
        usuario?.uid || ''
      ).trim(),

      nombre: String(
        usuario?.displayName ||
        usuario?.email ||
        'Administrador'
      ).trim()
    };
  }

  private formatearCantidad(
    valor: number
  ): string {
    const numero = Number(valor || 0);

    if (!Number.isFinite(numero)) {
      return '0';
    }

    if (Number.isInteger(numero)) {
      return String(numero);
    }

    return numero
      .toFixed(2)
      .replace(/\.?0+$/, '');
  }

  private escaparHtml(
    valor: string
  ): string {
    return String(valor || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  private obtenerMensajeError(
    error: unknown
  ): string {
    const objeto = error as {
      code?: string;
      message?: string;
    };

    const codigo = String(
      objeto?.code ||
      objeto?.message ||
      error ||
      ''
    );

    if (codigo.includes('codigo-devolucion-vacio')) {
      return 'Ingresa el código de devolución.';
    }

    if (codigo.includes('codigo-devolucion-incorrecto')) {
      return 'El código de devolución es incorrecto.';
    }

    if (
      codigo.includes(
        'codigo-devolucion-no-configurado'
      )
    ) {
      return 'Este trabajo no tiene código de devolución configurado.';
    }

    if (codigo.includes('devolucion-ya-validada')) {
      return 'Esta devolución ya fue validada anteriormente.';
    }

    if (
      codigo.includes(
        'trabajo-sin-devolucion-pendiente'
      )
    ) {
      return 'Este trabajo no tiene una devolución pendiente.';
    }

    if (codigo.includes('trabajo-no-existe')) {
      return 'El trabajo relacionado ya no existe.';
    }

    if (codigo.includes('trabajo-uid-vacio')) {
      return 'No se encontró el identificador del trabajo.';
    }

    if (codigo.includes('sin-materiales-devolver')) {
      return 'No existen materiales sobrantes para devolver.';
    }

    if (
      codigo.includes(
        'material-devolucion-no-asignado'
      )
    ) {
      return 'Uno de los materiales no pertenece al trabajo.';
    }

    if (codigo.includes('material-no-existe')) {
      return 'Uno de los materiales ya no existe en el almacén.';
    }

    if (
      codigo.includes(
        'cantidad-devuelta-mayor-sobrante'
      )
    ) {
      return 'La cantidad devuelta supera el sobrante registrado.';
    }

    if (
      codigo.includes(
        'cantidad-devolucion-invalida'
      )
    ) {
      return 'La cantidad registrada para devolución no es válida.';
    }

    if (codigo.includes('permission-denied')) {
      return 'No tienes permisos para validar esta devolución.';
    }

    if (codigo.includes('unauthenticated')) {
      return 'La sesión del administrador no está activa.';
    }

    if (codigo.includes('unavailable')) {
      return 'No hay conexión con Firebase. Revisa tu internet.';
    }

    return 'No se pudo validar la devolución.';
  }

  private async mostrarToast(
    message: string,
    color: ColorToast = 'primary'
  ): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2800,
      position: 'top',
      color
    });

    await toast.present();
  }
}