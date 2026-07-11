//src/app/paginas/empleado/dashboard-empleado/dashboard-empleado.page.ts
import { CommonModule } from '@angular/common';

import {
  Component,
  inject
} from '@angular/core';

import {
  AlertController,
  IonicModule,
  NavController,
  ToastController
} from '@ionic/angular';

import {
  Auth,
  signOut
} from '@angular/fire/auth';

import { tap } from 'rxjs/operators';

import { addIcons } from 'ionicons';

import {
  alertCircleOutline,
  arrowBackOutline,
  briefcaseOutline,
  calendarOutline,
  callOutline,
  cameraOutline,
  cashOutline,
  checkmarkCircleOutline,
  checkmarkDoneOutline,
  chevronForwardOutline,
  clipboardOutline,
  constructOutline,
  copyOutline,
  cubeOutline,
  homeOutline,
  informationCircleOutline,
  locationOutline,
  mapOutline,
  navigateOutline,
  personCircleOutline,
  personOutline,
  pinOutline,
  playCircleOutline,
  refreshOutline,
  shieldCheckmarkOutline,
  timeOutline
} from 'ionicons/icons';

import {
  DashboardEmpleadoService,
  MaterialDevueltoEmpleadoPayload
} from '../../../procesos/dashboard-empleado.service';

import { GpsEmpleadoService } from '../../../procesos/gps-empleado.service';

import {
  DashboardEmpleadoUsuario,
  DashboardEmpleadoViewModel,
  DashboardTrabajoEmpleado
} from '../../../modelos/dashboard-empleado';

import {
  EstadoPagoTrabajo,
  MetodoPagoTrabajo
} from '../../../modelos/trabajo';

import { EmpleadoHeaderComponent } from '../../../shared/componentes/empleado-header/empleado-header.component';

import { EmpleadoBottomNavComponent } from '../../../shared/componentes/empleado-bottom-nav/empleado-bottom-nav.component';

import { InicioEmpleadoComponent } from '../modulos/inicio-empleado/inicio-empleado.component';

import { TrabajosEmpleadoComponent } from '../modulos/trabajos-empleado/trabajos-empleado.component';

import { DetalleTrabajoEmpleadoComponent } from '../modulos/detalle-trabajo-empleado/detalle-trabajo-empleado.component';

import { CodigoVerificacionEmpleadoComponent } from '../modulos/codigo-verificacion-empleado/codigo-verificacion-empleado.component';

import { CambioEstadoEmpleadoComponent } from '../modulos/cambio-estado-empleado/cambio-estado-empleado.component';

import { FinalizarTrabajoEmpleadoComponent } from '../modulos/finalizar-trabajo-empleado/finalizar-trabajo-empleado.component';

import { MaterialesPosesionEmpleadoComponent } from '../modulos/materiales-posesion-empleado/materiales-posesion-empleado.component';

import { DevolucionesEmpleadoComponent } from '../modulos/devoluciones-empleado/devoluciones-empleado.component';

export type ModuloEmpleado =
  | 'inicio'
  | 'trabajos'
  | 'detalle'
  | 'codigo'
  | 'cambioEstado'
  | 'finalizar'
  | 'materialesPosesion'
  | 'devoluciones';

export type FiltroTrabajosEmpleado =
  | 'pendientes'
  | 'proceso'
  | 'finalizadas'
  | 'todos';

export type EstadoDestinoEmpleado =
  | 'en_camino'
  | 'en_proceso';

type ColorToast =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger';

interface EventoCambioEstadoEmpleado {
  trabajo?: DashboardTrabajoEmpleado;
  empleado?: DashboardEmpleadoUsuario;
  estadoDestino?: EstadoDestinoEmpleado;
}

interface EventoFinalizarTrabajoEmpleado {
  trabajo?: DashboardTrabajoEmpleado;
  empleado?: DashboardEmpleadoUsuario;

  materialesUsados?: Array<
    number |
    {
      materialUid?: string;
      uid?: string;
      id?: string;
      materialId?: string;
      cantidadUsada?: number;
      cantidad?: number;
      usado?: number;
    }
  >;

  pagoEstado?: EstadoPagoTrabajo;
  estadoPago?: EstadoPagoTrabajo;

  pagoConfirmado?: boolean;

  montoRecibido?: number;
  montoPagado?: number;
  monto?: number;

  metodoPago?: MetodoPagoTrabajo | string;
  medioPago?: MetodoPagoTrabajo | string;

  observacionPago?: string;
  observacionFinalizacion?: string;
  observacion?: string;
}

interface EventoRegistrarDevolucionEmpleado {
  trabajo?: DashboardTrabajoEmpleado;
  empleado?: DashboardEmpleadoUsuario;

  codigoDevolucionIngresado?: string;
  codigoIngresado?: string;
  codigoDevolucion?: string;
  codigo?: string;

  observacionDevolucion?: string;

  materialesDevueltos?: MaterialDevueltoEmpleadoPayload[];
}

@Component({
  selector: 'app-dashboard-empleado',
  templateUrl: './dashboard-empleado.page.html',
  styleUrls: ['./dashboard-empleado.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,

    EmpleadoHeaderComponent,
    EmpleadoBottomNavComponent,

    InicioEmpleadoComponent,
    TrabajosEmpleadoComponent,
    DetalleTrabajoEmpleadoComponent,
    CodigoVerificacionEmpleadoComponent,
    CambioEstadoEmpleadoComponent,
    FinalizarTrabajoEmpleadoComponent,
    MaterialesPosesionEmpleadoComponent,
    DevolucionesEmpleadoComponent
  ]
})
export class DashboardEmpleadoPage {
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController);
  private auth = inject(Auth);

  private dashboardEmpleadoService =
    inject(DashboardEmpleadoService);

  private gpsEmpleadoService =
    inject(GpsEmpleadoService);

  private empleadoActual: DashboardEmpleadoUsuario | null = null;

  vm$ = this.dashboardEmpleadoService
    .obtenerDashboardEmpleado$()
    .pipe(
      tap((vm) => {
        this.empleadoActual = vm.empleado;

        if (!this.trabajoSeleccionadoUid) {
          return;
        }

        const trabajoActualizado = (vm.trabajos || []).find(
          (trabajo) =>
            this.obtenerTrabajoUid(trabajo) ===
            this.trabajoSeleccionadoUid
        );

        if (trabajoActualizado) {
          this.trabajoSeleccionado = trabajoActualizado;
        }
      })
    );

  gpsActivo$ = this.gpsEmpleadoService.activo$;
  gpsEstadoTexto$ = this.gpsEmpleadoService.estadoTexto$;

  moduloActual: ModuloEmpleado = 'inicio';

  filtroTrabajos: FiltroTrabajosEmpleado = 'pendientes';

  trabajoSeleccionado: DashboardTrabajoEmpleado | null = null;
  trabajoSeleccionadoUid = '';

  estadoDestino: EstadoDestinoEmpleado = 'en_camino';

  materialesUsadosFinalizacion: number[] = [];

  accionEnProcesoUid = '';

  constructor() {
    addIcons({
      'alert-circle-outline': alertCircleOutline,
      'arrow-back-outline': arrowBackOutline,
      'briefcase-outline': briefcaseOutline,
      'calendar-outline': calendarOutline,
      'call-outline': callOutline,
      'camera-outline': cameraOutline,
      'cash-outline': cashOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'checkmark-done-outline': checkmarkDoneOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'clipboard-outline': clipboardOutline,
      'construct-outline': constructOutline,
      'copy-outline': copyOutline,
      'cube-outline': cubeOutline,
      'home-outline': homeOutline,
      'information-circle-outline': informationCircleOutline,
      'location-outline': locationOutline,
      'map-outline': mapOutline,
      'navigate-outline': navigateOutline,
      'person-circle-outline': personCircleOutline,
      'person-outline': personOutline,
      'pin-outline': pinOutline,
      'play-circle-outline': playCircleOutline,
      'refresh-outline': refreshOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'time-outline': timeOutline
    });
  }

  /*
   * ============================================================
   * NAVEGACIÓN ENTRE MÓDULOS
   * ============================================================
   */

  irInicio(): void {
    this.moduloActual = 'inicio';
    this.subirPantalla();
  }

  irTrabajos(): void {
    this.moduloActual = 'trabajos';
    this.subirPantalla();
  }

  irDevoluciones(): void {
    this.moduloActual = 'devoluciones';
    this.subirPantalla();
  }

  irHistorial(): void {
    this.filtroTrabajos = 'finalizadas';
    this.moduloActual = 'trabajos';

    this.subirPantalla();

    void this.mostrarToast(
      'Mostrando trabajos finalizados y devoluciones.',
      'primary'
    );
  }

  abrirDetalleTrabajo(
    trabajo: DashboardTrabajoEmpleado
  ): void {
    if (!trabajo) {
      return;
    }

    this.seleccionarTrabajo(trabajo);
    this.moduloActual = 'detalle';

    this.subirPantalla();
  }

  irCodigo(
    trabajo: DashboardTrabajoEmpleado
  ): void {
    if (!trabajo) {
      return;
    }

    this.seleccionarTrabajo(trabajo);
    this.moduloActual = 'codigo';

    this.subirPantalla();
  }

  irCambioEstado(
    trabajo: DashboardTrabajoEmpleado,
    estadoDestino: EstadoDestinoEmpleado
  ): void {
    if (!trabajo) {
      return;
    }

    if (
      estadoDestino !== 'en_camino' &&
      estadoDestino !== 'en_proceso'
    ) {
      void this.mostrarToast(
        'El estado solicitado no es válido.',
        'danger'
      );

      return;
    }

    if (
      estadoDestino === 'en_camino' &&
      trabajo.estado !== 'pendiente'
    ) {
      void this.mostrarToast(
        'Solo un trabajo pendiente puede pasar a en camino.',
        'warning'
      );

      return;
    }

    if (
      estadoDestino === 'en_proceso' &&
      trabajo.estado !== 'en_camino'
    ) {
      void this.mostrarToast(
        'Primero debes marcar el trabajo como en camino.',
        'warning'
      );

      return;
    }

    this.seleccionarTrabajo(trabajo);
    this.estadoDestino = estadoDestino;
    this.moduloActual = 'cambioEstado';

    this.subirPantalla();
  }

  irFinalizar(
    trabajo: DashboardTrabajoEmpleado
  ): void {
    if (!trabajo) {
      return;
    }

    if (trabajo.estado !== 'en_proceso') {
      void this.mostrarToast(
        'Solo puedes finalizar un trabajo que está en proceso.',
        'warning'
      );

      return;
    }

    this.seleccionarTrabajo(trabajo);

    this.materialesUsadosFinalizacion =
      this.obtenerCantidadesUsadasTrabajo(trabajo);

    this.moduloActual = 'finalizar';

    this.subirPantalla();
  }

  trabajoActual(
    vm: DashboardEmpleadoViewModel
  ): DashboardTrabajoEmpleado | null {
    if (!this.trabajoSeleccionadoUid) {
      return this.trabajoSeleccionado;
    }

    const trabajoActualizado = (vm.trabajos || []).find(
      (trabajo) =>
        this.obtenerTrabajoUid(trabajo) ===
        this.trabajoSeleccionadoUid
    );

    return trabajoActualizado || this.trabajoSeleccionado;
  }

  /*
   * ============================================================
   * CAMBIO DE ESTADO
   * ============================================================
   */

  async confirmarCambioEstado(
    evento: EventoCambioEstadoEmpleado | DashboardTrabajoEmpleado,
    empleadoParametro?: DashboardEmpleadoUsuario
  ): Promise<void> {
    const trabajo = this.obtenerTrabajoDesdeEvento(evento);

    const empleado = this.obtenerEmpleadoDesdeEvento(
      evento,
      empleadoParametro
    );

    const estadoDestino = this.obtenerEstadoDestinoDesdeEvento(evento);

    if (!trabajo) {
      await this.mostrarToast(
        'No se encontró el trabajo seleccionado.',
        'danger'
      );

      return;
    }

    if (!empleado?.uid) {
      await this.mostrarToast(
        'No se encontró el empleado autenticado.',
        'danger'
      );

      return;
    }

    if (!this.bloquearAccionTrabajo(trabajo)) {
      return;
    }

    try {
      if (estadoDestino === 'en_camino') {
        await this.dashboardEmpleadoService.marcarEnCamino(
          trabajo,
          empleado
        );

        let gpsActivado = true;

        try {
          await this.gpsEmpleadoService.activarSeguimiento(
            empleado,
            trabajo
          );
        } catch (errorGps) {
          gpsActivado = false;

          console.error(
            '[DashboardEmpleadoPage] Estado actualizado, pero no se pudo activar GPS:',
            errorGps
          );
        }

        this.trabajoSeleccionado = {
          ...trabajo,
          estado: 'en_camino',
          estadoTexto: 'En camino',
          estadoClase: 'en_camino',
          puedeMarcarEnCamino: false,
          puedeIniciar: true,
          puedeFinalizar: false
        };

        this.moduloActual = 'detalle';

        if (gpsActivado) {
          await this.mostrarToast(
            'Trabajo marcado en camino. El GPS quedó activado.',
            'success'
          );
        } else {
          await this.mostrarToast(
            'El trabajo pasó a en camino, pero debes activar el GPS del celular.',
            'warning'
          );
        }
      }

      if (estadoDestino === 'en_proceso') {
        await this.dashboardEmpleadoService.iniciarTrabajo(
          trabajo,
          empleado
        );

        this.trabajoSeleccionado = {
          ...trabajo,
          estado: 'en_proceso',
          estadoTexto: 'En proceso',
          estadoClase: 'en_proceso',
          puedeMarcarEnCamino: false,
          puedeIniciar: false,
          puedeFinalizar: true
        };

        this.moduloActual = 'detalle';

        await this.mostrarToast(
          'Trabajo iniciado correctamente.',
          'success'
        );
      }

      this.subirPantalla();
    } catch (error) {
      console.error(
        '[DashboardEmpleadoPage] Error cambiando estado:',
        error
      );

      await this.mostrarToast(
        this.obtenerMensajeError(error),
        'danger'
      );
    } finally {
      this.liberarAccionTrabajo(trabajo);
    }
  }

  async marcarEnCamino(
    trabajo: DashboardTrabajoEmpleado,
    empleado: DashboardEmpleadoUsuario
  ): Promise<void> {
    await this.confirmarCambioEstado(
      {
        trabajo,
        empleado,
        estadoDestino: 'en_camino'
      },
      empleado
    );
  }

  async iniciarTrabajo(
    trabajo: DashboardTrabajoEmpleado,
    empleado: DashboardEmpleadoUsuario
  ): Promise<void> {
    await this.confirmarCambioEstado(
      {
        trabajo,
        empleado,
        estadoDestino: 'en_proceso'
      },
      empleado
    );
  }

  /*
   * ============================================================
   * FINALIZACIÓN DEL TRABAJO
   * ============================================================
   */

  async finalizarDesdeModulo(
    evento: EventoFinalizarTrabajoEmpleado
  ): Promise<void> {
    const trabajo =
      evento?.trabajo ||
      this.trabajoSeleccionado;

    const empleado =
      evento?.empleado ||
      this.empleadoActual;

    if (!trabajo) {
      await this.mostrarToast(
        'No se encontró el trabajo seleccionado.',
        'danger'
      );

      return;
    }

    if (!empleado?.uid) {
      await this.mostrarToast(
        'No se encontró el empleado autenticado.',
        'danger'
      );

      return;
    }

    if (!this.bloquearAccionTrabajo(trabajo)) {
      return;
    }

    try {
      const materialesUsados =
        this.normalizarMaterialesUsadosEvento(
          trabajo,
          evento?.materialesUsados || []
        );

      const pagoEstado =
        this.obtenerEstadoPagoEvento(evento);

      const montoRecibido =
        this.obtenerMontoRecibidoEvento(
          evento,
          trabajo,
          pagoEstado
        );

      const metodoPago =
        this.obtenerMetodoPagoEvento(evento);

      await this.dashboardEmpleadoService.finalizarTrabajo(
        trabajo,
        empleado,
        {
          materialesUsados,

          pagoEstado,

          pagoConfirmado:
            evento?.pagoConfirmado === true ||
            pagoEstado === 'pagado',

          montoRecibido,
          metodoPago,

          observacionPago: String(
            evento?.observacionPago || ''
          ).trim(),

          observacionFinalizacion: String(
            evento?.observacionFinalizacion ||
            evento?.observacion ||
            ''
          ).trim()
        }
      );

      const materialesActualizados =
        this.construirMaterialesFinalizados(
          trabajo,
          materialesUsados
        );

      const haySobrantes = materialesActualizados.some(
        (material) =>
          Number(material.cantidadDevuelta || 0) > 0
      );

      this.materialesUsadosFinalizacion =
        materialesActualizados.map(
          (material) =>
            Number(material.cantidadUsada || 0)
        );

      this.trabajoSeleccionado = {
        ...trabajo,

        materialesAsignados: materialesActualizados,

        pagoEstado,
        pagoConfirmado:
          evento?.pagoConfirmado === true ||
          pagoEstado === 'pagado',

        montoRecibido,
        metodoPago,

        observacionPago: String(
          evento?.observacionPago || ''
        ).trim(),

        observacionFinalizacion: String(
          evento?.observacionFinalizacion ||
          evento?.observacion ||
          ''
        ).trim(),

        estado: haySobrantes
          ? 'devolucion_pendiente'
          : 'finalizado',

        estadoTexto: haySobrantes
          ? 'Devolución pendiente'
          : 'Finalizado',

        estadoClase: haySobrantes
          ? 'devolucion_pendiente'
          : 'finalizado',

        devolucionRegistrada: haySobrantes,
        devolucionValidada: false,

        puedeMarcarEnCamino: false,
        puedeIniciar: false,
        puedeFinalizar: false,

        tieneMaterialesSobrantes: haySobrantes,
        puedeDevolver: haySobrantes
      };

      this.gpsEmpleadoService.desactivarSeguimiento();

      if (haySobrantes) {
        this.moduloActual = 'materialesPosesion';

        await this.mostrarToast(
          'Trabajo finalizado. Tienes materiales sobrantes pendientes de devolución.',
          'warning'
        );
      } else {
        this.moduloActual = 'detalle';

        await this.mostrarToast(
          'Trabajo finalizado sin materiales pendientes de devolución.',
          'success'
        );
      }

      this.subirPantalla();
    } catch (error) {
      console.error(
        '[DashboardEmpleadoPage] Error finalizando trabajo:',
        error
      );

      await this.mostrarToast(
        this.obtenerMensajeError(error),
        'danger'
      );
    } finally {
      this.liberarAccionTrabajo(trabajo);
    }
  }

  /*
   * ============================================================
   * DEVOLUCIÓN DE MATERIALES
   * ============================================================
   */

  async registrarDevolucionDesdeModulo(
    evento: EventoRegistrarDevolucionEmpleado
  ): Promise<void> {
    const trabajo =
      evento?.trabajo ||
      this.trabajoSeleccionado;

    const empleado =
      evento?.empleado ||
      this.empleadoActual;

    if (!trabajo) {
      await this.mostrarToast(
        'No se encontró el trabajo de la devolución.',
        'danger'
      );

      return;
    }

    if (!empleado?.uid) {
      await this.mostrarToast(
        'No se encontró el empleado autenticado.',
        'danger'
      );

      return;
    }

    const codigoIngresado = String(
      evento?.codigoDevolucionIngresado ||
      evento?.codigoIngresado ||
      evento?.codigoDevolucion ||
      evento?.codigo ||
      ''
    ).trim();

    if (!codigoIngresado) {
      await this.mostrarToast(
        'Ingresa el código de devolución entregado por el administrador.',
        'warning'
      );

      return;
    }

    const materialesDevueltos =
      this.normalizarMaterialesDevueltosEvento(
        trabajo,
        evento?.materialesDevueltos || []
      );

    if (materialesDevueltos.length === 0) {
      await this.mostrarToast(
        'No existen materiales sobrantes para devolver.',
        'warning'
      );

      return;
    }

    if (!this.bloquearAccionTrabajo(trabajo)) {
      return;
    }

    try {
      await this.dashboardEmpleadoService.registrarDevolucion(
        trabajo,
        empleado,
        materialesDevueltos,
        codigoIngresado
      );

      const materialesActualizados =
        (trabajo.materialesAsignados || []).map(
          (material) => {
            const materialUid = this.obtenerMaterialUid(material);

            const devuelto = materialesDevueltos.find(
              (item) =>
                item.materialUid === materialUid
            );

            if (!devuelto) {
              return material;
            }

            return {
              ...material,
              cantidadAsignada: devuelto.cantidadAsignada,
              cantidadUsada: devuelto.cantidadUsada,
              cantidadDevuelta: devuelto.cantidadDevuelta,
              devolucionValidada: true
            };
          }
        );

      this.trabajoSeleccionado = {
        ...trabajo,

        materialesAsignados: materialesActualizados,

        estado: 'devolucion_realizada',
        estadoTexto: 'Devolución realizada',
        estadoClase: 'devolucion_realizada',

        devolucionRegistrada: true,
        devolucionValidada: true,

        puedeDevolver: false,
        tieneMaterialesSobrantes: false
      };

      this.moduloActual = 'devoluciones';

      await this.mostrarToast(
        'Código correcto. La devolución fue registrada y el stock se actualizó.',
        'success'
      );

      this.subirPantalla();
    } catch (error) {
      console.error(
        '[DashboardEmpleadoPage] Error validando devolución:',
        error
      );

      await this.mostrarToast(
        this.obtenerMensajeError(error),
        'danger'
      );
    } finally {
      this.liberarAccionTrabajo(trabajo);
    }
  }

  /*
   * ============================================================
   * CLIENTE, CÓDIGO Y UBICACIÓN
   * ============================================================
   */

  llamarCliente(
    trabajo: DashboardTrabajoEmpleado
  ): void {
    const telefono = String(
      trabajo?.clienteTelefono || ''
    )
      .replace(/\s+/g, '')
      .trim();

    if (!telefono) {
      void this.mostrarToast(
        'Este trabajo no tiene teléfono registrado.',
        'warning'
      );

      return;
    }

    window.open(`tel:${telefono}`, '_self');
  }

  abrirRutaTrabajo(
    trabajo: DashboardTrabajoEmpleado | null
  ): void {
    if (!trabajo) {
      void this.mostrarToast(
        'No tienes un trabajo seleccionado.',
        'warning'
      );

      return;
    }

    try {
      const url =
        this.gpsEmpleadoService.obtenerUrlRutaGoogleMaps(
          trabajo
        );

      if (!url) {
        void this.mostrarToast(
          'El trabajo no tiene una ubicación válida.',
          'warning'
        );

        return;
      }

      window.open(url, '_blank');
    } catch (error) {
      console.error(
        '[DashboardEmpleadoPage] Error abriendo ruta:',
        error
      );

      void this.mostrarToast(
        'No se pudo abrir la ruta del trabajo.',
        'danger'
      );
    }
  }

  async activarGps(
    empleado: DashboardEmpleadoUsuario,
    trabajo: DashboardTrabajoEmpleado | null
  ): Promise<void> {
    if (!trabajo) {
      await this.mostrarToast(
        'Selecciona un trabajo antes de activar el GPS.',
        'warning'
      );

      return;
    }

    try {
      await this.gpsEmpleadoService.activarSeguimiento(
        empleado,
        trabajo
      );

      await this.mostrarToast(
        'GPS activado para este trabajo.',
        'success'
      );
    } catch (error) {
      console.error(
        '[DashboardEmpleadoPage] Error activando GPS:',
        error
      );

      await this.mostrarToast(
        this.obtenerMensajeErrorGps(error),
        'danger'
      );
    }
  }

  async desactivarGps(): Promise<void> {
    this.gpsEmpleadoService.desactivarSeguimiento();

    await this.mostrarToast(
      'GPS desactivado.',
      'primary'
    );
  }

  async copiarCodigoCliente(
    evento: DashboardTrabajoEmpleado | string | any
  ): Promise<void> {
    let codigo = '';

    if (typeof evento === 'string') {
      codigo = evento.trim();
    } else {
      codigo = String(
        evento?.codigoCliente ||
        evento?.codigo ||
        evento?.trabajo?.codigoCliente ||
        this.trabajoSeleccionado?.codigoCliente ||
        ''
      ).trim();
    }

    if (!codigo) {
      await this.mostrarToast(
        'El trabajo no tiene código de cliente.',
        'warning'
      );

      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(codigo);
      } else {
        this.copiarTextoAlternativo(codigo);
      }

      await this.mostrarToast(
        'Código del cliente copiado.',
        'success'
      );
    } catch (error) {
      console.error(
        '[DashboardEmpleadoPage] Error copiando código:',
        error
      );

      this.copiarTextoAlternativo(codigo);

      await this.mostrarToast(
        `Código del cliente: ${codigo}`,
        'primary'
      );
    }
  }

  /*
   * ============================================================
   * PERFIL Y SESIÓN
   * ============================================================
   */

  async abrirPerfil(): Promise<void> {
    const empleado = this.empleadoActual;

    const nombre = String(
      empleado?.nombreCompleto ||
      empleado?.usuario ||
      'Empleado'
    ).trim();

    const cargo = String(
      empleado?.cargoTexto ||
      empleado?.cargo ||
      'Personal operativo'
    ).trim();

    const alert = await this.alertCtrl.create({
      header: nombre,
      subHeader: cargo,
      message: '¿Deseas cerrar tu sesión?',
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

    const resultado = await alert.onDidDismiss();

    if (resultado.role === 'confirm') {
      await this.cerrarSesion();
    }
  }

  async cerrarSesion(): Promise<void> {
    try {
      this.gpsEmpleadoService.desactivarSeguimiento();

      await signOut(this.auth);

      await this.navCtrl.navigateRoot(
        '/seleccion-usuario',
        {
          animated: false,
          replaceUrl: true
        }
      );
    } catch (error) {
      console.error(
        '[DashboardEmpleadoPage] Error cerrando sesión:',
        error
      );

      await this.mostrarToast(
        'No se pudo cerrar la sesión.',
        'danger'
      );
    }
  }

  /*
   * ============================================================
   * REFRESCAR Y AVISOS
   * ============================================================
   */

  async refrescar(
    event: any
  ): Promise<void> {
    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 450);
      });
    } finally {
      event?.target?.complete?.();
    }
  }

  async refrescarManual(): Promise<void> {
    await this.mostrarToast(
      'La información está actualizada.',
      'success'
    );
  }

  sm41TotalAvisos(
    vm: DashboardEmpleadoViewModel
  ): number {
    const notificacionesGuardadas = Number(
      vm.notificacionesPendientes || 0
    );

    if (notificacionesGuardadas > 0) {
      return notificacionesGuardadas;
    }

    const pendientes = (vm.trabajos || []).filter(
      (trabajo) =>
        trabajo.estado === 'pendiente'
    ).length;

    const devoluciones = (vm.trabajos || []).filter(
      (trabajo) =>
        trabajo.estado === 'devolucion_pendiente'
    ).length;

    return pendientes + devoluciones;
  }

  sm41VerTodas(): void {
    const avisos = this.empleadoActual?.notificacionesPendientes || 0;

    if (avisos > 0) {
      void this.mostrarToast(
        `Tienes ${avisos} notificación(es) pendiente(s).`,
        'primary'
      );

      return;
    }

    void this.mostrarToast(
      'No tienes nuevas notificaciones.',
      'success'
    );
  }

  /*
   * ============================================================
   * VALIDACIONES VISUALES
   * ============================================================
   */

  puedeMarcarEnCamino(
    trabajo: DashboardTrabajoEmpleado
  ): boolean {
    return (
      trabajo.estado === 'pendiente' ||
      trabajo.puedeMarcarEnCamino === true
    );
  }

  puedeIniciar(
    trabajo: DashboardTrabajoEmpleado
  ): boolean {
    return (
      trabajo.estado === 'en_camino' ||
      trabajo.puedeIniciar === true
    );
  }

  puedeFinalizar(
    trabajo: DashboardTrabajoEmpleado
  ): boolean {
    return (
      trabajo.estado === 'en_proceso' ||
      trabajo.puedeFinalizar === true
    );
  }

  estaProcesando(
    trabajo: DashboardTrabajoEmpleado
  ): boolean {
    const uid = this.obtenerTrabajoUid(trabajo);

    return (
      !!uid &&
      this.accionEnProcesoUid === uid
    );
  }

  trackByTrabajo(
    index: number,
    trabajo: DashboardTrabajoEmpleado
  ): string {
    return (
      this.obtenerTrabajoUid(trabajo) ||
      String(index)
    );
  }

  /*
   * ============================================================
   * MÉTODOS PRIVADOS
   * ============================================================
   */

  private seleccionarTrabajo(
    trabajo: DashboardTrabajoEmpleado
  ): void {
    this.trabajoSeleccionado = trabajo;
    this.trabajoSeleccionadoUid =
      this.obtenerTrabajoUid(trabajo);
  }

  private obtenerTrabajoDesdeEvento(
    evento: EventoCambioEstadoEmpleado | DashboardTrabajoEmpleado
  ): DashboardTrabajoEmpleado | null {
    if (!evento) {
      return this.trabajoSeleccionado;
    }

    if ((evento as EventoCambioEstadoEmpleado).trabajo) {
      return (
        (evento as EventoCambioEstadoEmpleado).trabajo ||
        this.trabajoSeleccionado
      );
    }

    if (
      (evento as DashboardTrabajoEmpleado).estado &&
      (
        (evento as DashboardTrabajoEmpleado).uid ||
        (evento as DashboardTrabajoEmpleado).id
      )
    ) {
      return evento as DashboardTrabajoEmpleado;
    }

    return this.trabajoSeleccionado;
  }

  private obtenerEmpleadoDesdeEvento(
    evento: EventoCambioEstadoEmpleado | DashboardTrabajoEmpleado,
    empleadoParametro?: DashboardEmpleadoUsuario
  ): DashboardEmpleadoUsuario | null {
    const empleadoEvento =
      (evento as EventoCambioEstadoEmpleado)?.empleado;

    return (
      empleadoEvento ||
      empleadoParametro ||
      this.empleadoActual
    );
  }

  private obtenerEstadoDestinoDesdeEvento(
    evento: EventoCambioEstadoEmpleado | DashboardTrabajoEmpleado
  ): EstadoDestinoEmpleado {
    const estadoEvento =
      (evento as EventoCambioEstadoEmpleado)?.estadoDestino;

    if (
      estadoEvento === 'en_camino' ||
      estadoEvento === 'en_proceso'
    ) {
      return estadoEvento;
    }

    return this.estadoDestino;
  }

  private normalizarMaterialesUsadosEvento(
    trabajo: DashboardTrabajoEmpleado,
    materialesEvento: EventoFinalizarTrabajoEmpleado['materialesUsados']
  ): Array<
    number |
    {
      materialUid: string;
      cantidadUsada: number;
    }
  > {
    const materialesAsignados =
      Array.isArray(trabajo.materialesAsignados)
        ? trabajo.materialesAsignados
        : [];

    const entrada =
      Array.isArray(materialesEvento)
        ? materialesEvento
        : [];

    if (entrada.length === 0) {
      throw new Error('materiales-usados-vacios');
    }

    return materialesAsignados.map(
      (material, index) => {
        const materialUid =
          this.obtenerMaterialUid(material);

        const cantidadAsignada = Number(
          material.cantidadAsignada || 0
        );

        const porUid = entrada.find((item) => {
          if (typeof item === 'number') {
            return false;
          }

          return (
            this.obtenerMaterialUid(item) ===
            materialUid
          );
        });

        const itemEntrada =
          porUid !== undefined
            ? porUid
            : entrada[index];

        const cantidadUsada =
          typeof itemEntrada === 'number'
            ? Number(itemEntrada)
            : Number(
                itemEntrada?.cantidadUsada ??
                itemEntrada?.cantidad ??
                itemEntrada?.usado ??
                NaN
              );

        if (!Number.isFinite(cantidadUsada)) {
          throw new Error(
            `material-usado-faltante:${material.nombre}`
          );
        }

        if (
          cantidadUsada < 0 ||
          cantidadUsada > cantidadAsignada
        ) {
          throw new Error(
            `cantidad-usada-invalida:${material.nombre}`
          );
        }

        return {
          materialUid,
          cantidadUsada
        };
      }
    );
  }

 private construirMaterialesFinalizados(
  trabajo: DashboardTrabajoEmpleado,
  materialesUsados: Array<
    number |
    {
      materialUid: string;
      cantidadUsada: number;
    }
  >
): DashboardTrabajoEmpleado['materialesAsignados'] {
  return (trabajo.materialesAsignados || []).map(
    (material, index) => {
      const materialUid =
        this.obtenerMaterialUid(material);

      const encontrado = materialesUsados.find(
        (
          item
        ): item is {
          materialUid: string;
          cantidadUsada: number;
        } => {
          return (
            typeof item !== 'number' &&
            item.materialUid === materialUid
          );
        }
      );

      const itemIndice = materialesUsados[index];

      let cantidadUsada = 0;

      if (encontrado) {
        cantidadUsada = Number(
          encontrado.cantidadUsada || 0
        );
      } else if (typeof itemIndice === 'number') {
        cantidadUsada = Number(itemIndice || 0);
      } else if (itemIndice) {
        cantidadUsada = Number(
          itemIndice.cantidadUsada || 0
        );
      }

      const cantidadAsignada = Number(
        material.cantidadAsignada || 0
      );

      const cantidadDevuelta = Math.max(
        cantidadAsignada - cantidadUsada,
        0
      );

      return {
        ...material,

        materialUid,

        cantidadAsignada,
        cantidadUsada,
        cantidadDevuelta,

        devolucionValidada:
          cantidadDevuelta <= 0
      };
    }
  );
}

  private normalizarMaterialesDevueltosEvento(
    trabajo: DashboardTrabajoEmpleado,
    materialesEvento: MaterialDevueltoEmpleadoPayload[]
  ): MaterialDevueltoEmpleadoPayload[] {
    const materialesAsignados =
      Array.isArray(trabajo.materialesAsignados)
        ? trabajo.materialesAsignados
        : [];

    const entrada =
      Array.isArray(materialesEvento)
        ? materialesEvento
        : [];

    const resultado = materialesAsignados
      .map((material) => {
        const materialUid =
          this.obtenerMaterialUid(material);

        const itemEvento = entrada.find(
          (item) =>
            String(item.materialUid || '').trim() ===
            materialUid
        );

        const cantidadAsignada = Number(
          itemEvento?.cantidadAsignada ??
          material.cantidadAsignada ??
          0
        );

        const cantidadUsada = Number(
          itemEvento?.cantidadUsada ??
          material.cantidadUsada ??
          0
        );

        const sobranteCalculado = Math.max(
          cantidadAsignada - cantidadUsada,
          0
        );

        const cantidadDevuelta = Number(
          itemEvento?.cantidadDevuelta ??
          material.cantidadDevuelta ??
          sobranteCalculado
        );

        if (
          !materialUid ||
          cantidadDevuelta <= 0
        ) {
          return null;
        }

        if (cantidadDevuelta > sobranteCalculado) {
          throw new Error(
            `cantidad-devuelta-mayor-sobrante:${material.nombre}`
          );
        }

        return {
          materialUid,

          nombre: String(
            itemEvento?.nombre ||
            material.nombre ||
            'Material'
          ).trim(),

          unidad: String(
            itemEvento?.unidad ||
            material.unidad ||
            'und'
          ).trim(),

          cantidadAsignada,
          cantidadUsada,
          cantidadDevuelta
        };
      })
      .filter(
        (
          material
        ): material is MaterialDevueltoEmpleadoPayload =>
          material !== null
      );

    return resultado;
  }

  private obtenerEstadoPagoEvento(
    evento: EventoFinalizarTrabajoEmpleado
  ): EstadoPagoTrabajo {
    const valor = String(
      evento?.pagoEstado ||
      evento?.estadoPago ||
      ''
    )
      .trim()
      .toLowerCase();

    if (valor === 'pagado') {
      return 'pagado';
    }

    if (valor === 'parcial') {
      return 'parcial';
    }

    if (valor === 'pendiente') {
      return 'pendiente';
    }

    return evento?.pagoConfirmado === true
      ? 'pagado'
      : 'pendiente';
  }

  private obtenerMontoRecibidoEvento(
    evento: EventoFinalizarTrabajoEmpleado,
    trabajo: DashboardTrabajoEmpleado,
    pagoEstado: EstadoPagoTrabajo
  ): number {
    if (pagoEstado === 'pendiente') {
      return 0;
    }

    const monto = Number(
      evento?.montoRecibido ??
      evento?.montoPagado ??
      evento?.monto ??
      0
    );

    if (
      monto > 0 &&
      Number.isFinite(monto)
    ) {
      return monto;
    }

    if (pagoEstado === 'pagado') {
      return Number(trabajo.subtotal || 0);
    }

    return 0;
  }

  private obtenerMetodoPagoEvento(
    evento: EventoFinalizarTrabajoEmpleado
  ): MetodoPagoTrabajo {
    const valor = String(
      evento?.metodoPago ||
      evento?.medioPago ||
      'Otro'
    ).trim();

    const mapa: Record<string, MetodoPagoTrabajo> = {
      efectivo: 'Efectivo',
      yape: 'Yape',
      plin: 'Plin',
      transferencia: 'Transferencia',
      tarjeta: 'Tarjeta',
      otro: 'Otro'
    };

    return mapa[valor.toLowerCase()] || 'Otro';
  }

  private obtenerCantidadesUsadasTrabajo(
    trabajo: DashboardTrabajoEmpleado
  ): number[] {
    return (trabajo.materialesAsignados || []).map(
      (material) =>
        Number(material.cantidadUsada || 0)
    );
  }

  private obtenerTrabajoUid(
    trabajo: DashboardTrabajoEmpleado
  ): string {
    return String(
      trabajo?.uid ||
      trabajo?.id ||
      ''
    ).trim();
  }

  private obtenerMaterialUid(
    material: any
  ): string {
    return String(
      material?.materialUid ||
      material?.uid ||
      material?.id ||
      material?.materialId ||
      ''
    ).trim();
  }

  private bloquearAccionTrabajo(
    trabajo: DashboardTrabajoEmpleado
  ): boolean {
    const uid = this.obtenerTrabajoUid(trabajo);

    if (!uid) {
      void this.mostrarToast(
        'El trabajo no tiene identificador.',
        'danger'
      );

      return false;
    }

    if (this.accionEnProcesoUid === uid) {
      return false;
    }

    this.accionEnProcesoUid = uid;

    return true;
  }

  private liberarAccionTrabajo(
    trabajo: DashboardTrabajoEmpleado
  ): void {
    const uid = this.obtenerTrabajoUid(trabajo);

    if (this.accionEnProcesoUid === uid) {
      this.accionEnProcesoUid = '';
    }
  }

  private copiarTextoAlternativo(
    texto: string
  ): void {
    const textarea = document.createElement('textarea');

    textarea.value = texto;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';

    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('copy');

    document.body.removeChild(textarea);
  }

  private subirPantalla(): void {
    setTimeout(() => {
      document
        .querySelector('.sm-container')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
    }, 50);
  }

  private obtenerMensajeErrorGps(
    error: any
  ): string {
    const codigo = String(
      error?.code ||
      error?.message ||
      error ||
      ''
    );

    if (codigo.includes('empleado-sin-acceso')) {
      return 'Tu usuario no tiene acceso operativo habilitado.';
    }

    if (codigo.includes('gps-contexto-no-seguro')) {
      return 'El GPS necesita una conexión segura.';
    }

    if (codigo.includes('gps-permiso-denegado')) {
      return 'El permiso de ubicación fue denegado.';
    }

    if (
      codigo.includes('gps-no-disponible') ||
      codigo.includes('gps-no-soportado')
    ) {
      return 'Activa el GPS del celular e inténtalo nuevamente.';
    }

    if (codigo.includes('permission-denied')) {
      return 'No tienes permisos para registrar la ubicación.';
    }

    return 'No se pudo activar el seguimiento GPS.';
  }

  private obtenerMensajeError(
    error: any
  ): string {
    const codigo = String(
      error?.code ||
      error?.message ||
      error ||
      ''
    );

    if (codigo.includes('empleado-sin-acceso')) {
      return 'Tu usuario no tiene acceso operativo habilitado.';
    }

    if (codigo.includes('empleado-sin-uid')) {
      return 'No se encontró el empleado autenticado.';
    }

    if (codigo.includes('trabajo-uid-vacio')) {
      return 'No se encontró el identificador del trabajo.';
    }

    if (codigo.includes('trabajo-no-existe')) {
      return 'El trabajo ya no existe.';
    }

    if (codigo.includes('trabajo-no-pendiente')) {
      return 'Solo puedes marcar en camino un trabajo pendiente.';
    }

    if (codigo.includes('trabajo-no-en-camino')) {
      return 'Primero debes marcar el trabajo como en camino.';
    }

    if (codigo.includes('trabajo-no-en-proceso')) {
      return 'Solo puedes finalizar un trabajo en proceso.';
    }

    if (codigo.includes('finalizacion-incompleta')) {
      return 'Completa los materiales usados y la información del pago.';
    }

    if (codigo.includes('materiales-usados-vacios')) {
      return 'Debes registrar la cantidad usada de cada material.';
    }

    if (codigo.includes('material-usado-faltante')) {
      return 'Falta registrar la cantidad usada de un material.';
    }

    if (codigo.includes('cantidad-usada-invalida')) {
      return 'La cantidad usada no puede superar la cantidad asignada.';
    }

    if (codigo.includes('pago-estado-invalido')) {
      return 'Selecciona un estado de pago válido.';
    }

    if (codigo.includes('monto-pago-invalido')) {
      return 'Ingresa un monto válido para el pago.';
    }

    if (codigo.includes('metodo-pago-invalido')) {
      return 'Selecciona un método de pago válido.';
    }

    if (codigo.includes('trabajo-sin-devolucion-pendiente')) {
      return 'Este trabajo no tiene una devolución pendiente.';
    }

    if (codigo.includes('codigo-devolucion-vacio')) {
      return 'Ingresa el código entregado por el administrador.';
    }

    if (codigo.includes('codigo-devolucion-incorrecto')) {
      return 'El código de devolución es incorrecto.';
    }

    if (codigo.includes('codigo-devolucion-no-configurado')) {
      return 'Este trabajo no tiene código de devolución configurado.';
    }

    if (codigo.includes('devolucion-ya-validada')) {
      return 'Esta devolución ya fue realizada anteriormente.';
    }

    if (codigo.includes('sin-materiales-devolver')) {
      return 'No hay materiales sobrantes para devolver.';
    }

    if (codigo.includes('material-devolucion-no-asignado')) {
      return 'Uno de los materiales no pertenece a este trabajo.';
    }

    if (codigo.includes('material-no-existe')) {
      return 'Uno de los materiales ya no existe en el almacén.';
    }

    if (codigo.includes('cantidad-devuelta-mayor-sobrante')) {
      return 'La cantidad devuelta supera el sobrante registrado.';
    }

    if (codigo.includes('cantidad-devolucion-invalida')) {
      return 'La cantidad de devolución no es válida.';
    }

    if (codigo.includes('permission-denied')) {
      return 'No tienes permisos para completar esta operación.';
    }

    if (codigo.includes('unavailable')) {
      return 'No hay conexión. Revisa tu internet e inténtalo nuevamente.';
    }

    return 'No se pudo completar la operación.';
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