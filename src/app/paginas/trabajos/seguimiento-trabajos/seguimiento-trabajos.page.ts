// src/app/paginas/trabajos/seguimiento-trabajos/
// seguimiento-trabajos.page.ts

import { CommonModule } from '@angular/common';

import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';

import {
  AlertController,
  IonicModule,
  ModalController,
  NavController,
  ToastController
} from '@ionic/angular';

import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable
} from 'rxjs';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  chevronForwardOutline,
  clipboardOutline,
  constructOutline,
  navigateOutline,
  personOutline,
  refreshOutline,
  timeOutline,
  warningOutline
} from 'ionicons/icons';

import {
  TrabajoService
} from '../../../procesos/trabajo.service';

import {
  DashboardAdminService
} from '../../../procesos/dashboard-admin.service';

import {
  TrabajoVista
} from '../../../modelos/trabajo';

import {
  AdminHeaderComponent
} from '../../../shared/componentes/admin-header/admin-header.component';

import {
  AdminBottomNavComponent
} from '../../../shared/componentes/admin-bottom-nav/admin-bottom-nav.component';

import {
  TrabajoDetalleModalComponent
} from '../../../shared/componentes/trabajo-detalle-modal/trabajo-detalle-modal.component';

export type FiltroSeguimiento =
  | 'todos'
  | 'pendientes'
  | 'en_camino'
  | 'en_proceso'
  | 'finalizados';

interface SeguimientoVM {
  trabajos: TrabajoVista[];
  trabajosFiltrados: TrabajoVista[];

  filtroActivo: FiltroSeguimiento;
  busqueda: string;

  totalTrabajos: number;
  totalPendientes: number;
  totalEnCamino: number;
  totalEnProceso: number;
  totalFinalizados: number;
}

type ColorToast =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger';

@Component({
  selector: 'app-seguimiento-trabajos',
  standalone: true,

  templateUrl: './seguimiento-trabajos.page.html',
  styleUrls: ['./seguimiento-trabajos.page.css'],

  imports: [
    CommonModule,
    IonicModule,
    AdminHeaderComponent,
    AdminBottomNavComponent
  ]
})
export class SeguimientoTrabajosPage {
  private trabajoService =
    inject(TrabajoService);

  private dashboardAdminService =
    inject(DashboardAdminService);

  private navCtrl =
    inject(NavController);

  private modalCtrl =
    inject(ModalController);

  private toastCtrl =
    inject(ToastController);

  private alertCtrl =
    inject(AlertController);

  private cdr =
    inject(ChangeDetectorRef);

  adminVm$ =
    this.dashboardAdminService.obtenerPanelAdmin$();

  private filtroSubject =
    new BehaviorSubject<FiltroSeguimiento>('todos');

  private busquedaSubject =
    new BehaviorSubject<string>('');

  private navegando = false;

  accionAdminUid = '';

  vm$: Observable<SeguimientoVM> = combineLatest([
    this.trabajoService.vm$,
    this.filtroSubject.asObservable(),
    this.busquedaSubject.asObservable()
  ]).pipe(
    map(
      ([
        trabajoVm,
        filtroActivo,
        busqueda
      ]) => {
        const trabajosBase: TrabajoVista[] =
          Array.isArray(trabajoVm?.trabajos)
            ? trabajoVm.trabajos
            : [];

        const trabajos = trabajosBase
          .filter(
            (trabajo: TrabajoVista) => {
              const estado =
                this.normalizarEstado(
                  trabajo?.estado
                );

              return (
                estado !== 'cancelado' &&
                (trabajo as any)?.eliminado !== true
              );
            }
          )
          .sort(
            (
              a: TrabajoVista,
              b: TrabajoVista
            ) =>
              this.obtenerMarcaTiempo(b) -
              this.obtenerMarcaTiempo(a)
          );

        const trabajosPorEstado =
          this.filtrarTrabajos(
            trabajos,
            filtroActivo
          );

        const trabajosFiltrados =
          this.aplicarBusqueda(
            trabajosPorEstado,
            busqueda
          );

        const totalPendientes =
          trabajos.filter(
            (item: TrabajoVista) =>
              this.normalizarEstado(
                item.estado
              ) === 'pendiente'
          ).length;

        const totalEnCamino =
          trabajos.filter(
            (item: TrabajoVista) =>
              this.normalizarEstado(
                item.estado
              ) === 'en_camino'
          ).length;

        const totalEnProceso =
          trabajos.filter(
            (item: TrabajoVista) =>
              this.normalizarEstado(
                item.estado
              ) === 'en_proceso'
          ).length;

        const totalFinalizados =
          trabajos.filter(
            (item: TrabajoVista) =>
              this.esEstadoFinalizado(
                this.normalizarEstado(
                  item.estado
                )
              )
          ).length;

        return {
          trabajos,
          trabajosFiltrados,

          filtroActivo,
          busqueda,

          totalTrabajos:
            trabajos.length,

          totalPendientes,
          totalEnCamino,
          totalEnProceso,
          totalFinalizados
        };
      }
    )
  );

  constructor() {
    addIcons({
      'arrow-back-outline':
        arrowBackOutline,

      'chevron-forward-outline':
        chevronForwardOutline,

      'clipboard-outline':
        clipboardOutline,

      'construct-outline':
        constructOutline,

      'navigate-outline':
        navigateOutline,

      'person-outline':
        personOutline,

      'refresh-outline':
        refreshOutline,

      'time-outline':
        timeOutline,

      'warning-outline':
        warningOutline
    });
  }

  async ionViewWillEnter(): Promise<void> {
    try {
      await this.trabajoService
        .cargarTrabajos();
    } catch (error: unknown) {
      console.error(
        '[SeguimientoTrabajosPage] Error cargando trabajos:',
        error
      );

      await this.mostrarToast(
        'No se pudieron actualizar los trabajos.',
        'danger'
      );
    } finally {
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 100);
    }
  }

  /*
   * ============================================================
   * FILTROS Y BÚSQUEDA
   * ============================================================
   */

  cambiarFiltro(
    filtro: FiltroSeguimiento
  ): void {
    this.filtroSubject.next(filtro);
  }

  verTodos(): void {
    this.filtroSubject.next('todos');
  }

  cambiarBusqueda(
    event: any
  ): void {
    const valor = String(
      event?.detail?.value || ''
    ).trim();

    this.busquedaSubject.next(valor);
  }

  limpiarBusqueda(): void {
    this.busquedaSubject.next('');
  }

  /*
   * ============================================================
   * DETALLE Y CÓDIGOS
   * ============================================================
   */

  async abrirDetalleTrabajo(
    trabajo: TrabajoVista
  ): Promise<void> {
    if (!trabajo) {
      await this.mostrarToast(
        'No se encontró el trabajo seleccionado.',
        'warning'
      );

      return;
    }

    const modal =
      await this.modalCtrl.create({
        component:
          TrabajoDetalleModalComponent,

        cssClass:
          'trabajo-detalle-modal',

        backdropDismiss: true,

        componentProps: {
          trabajo
        }
      });

    await modal.present();

    const resultado =
      await modal.onWillDismiss();

    if (
      resultado.role === 'codigos' ||
      resultado.data?.accion === 'codigos'
    ) {
      this.abrirCodigosSeguridad(
        trabajo
      );
    }
  }

  abrirCodigosSeguridad(
    trabajo: TrabajoVista
  ): void {
    const uid =
      this.obtenerTrabajoUid(
        trabajo
      );

    if (!uid) {
      void this.mostrarToast(
        'El trabajo no tiene un identificador válido.',
        'danger'
      );

      return;
    }

    void this.navCtrl.navigateForward(
      `/codigos-seguridad?trabajoUid=${encodeURIComponent(uid)}`,
      {
        animated: false
      }
    );
  }

  /*
   * ============================================================
   * CÓDIGO DE SEGUIMIENTO
   * ============================================================
   */

  obtenerCodigoTrabajo(
    trabajo: TrabajoVista
  ): string {
    const data =
      trabajo as any;

    const candidatos = [
      data?.codigoSeguimiento,
      data?.codigoTrabajo,
      data?.codigo,
      data?.numero,
      trabajo?.id
    ]
      .map(
        (valor: unknown) =>
          String(valor || '').trim()
      )
      .filter(
        (valor: string) =>
          valor.length > 0
      );

    const codigoValido =
      candidatos.find(
        (codigo: string) =>
          /^T-\d{5}$/i.test(
            codigo
          )
      );

    if (codigoValido) {
      return codigoValido
        .toUpperCase();
    }

    const base = String(
      trabajo?.uid ||
      trabajo?.id ||
      trabajo?.clienteNombre ||
      'TRABAJO'
    ).trim();

    const numero =
      this.generarNumeroDesdeTexto(
        base
      );

    return `T-${String(numero).padStart(
      5,
      '0'
    )}`;
  }

  /*
   * ============================================================
   * RETROCESO ADMINISTRATIVO CONTROLADO
   * ============================================================
   */

  puedeRetrocederEstado(
    trabajo: TrabajoVista
  ): boolean {
    const estado =
      this.normalizarEstado(
        trabajo?.estado
      );

    return (
      estado === 'en_camino' ||
      estado === 'en_proceso'
    );
  }

  estaProcesandoAdmin(
    trabajo: TrabajoVista
  ): boolean {
    const uid =
      this.obtenerTrabajoUid(
        trabajo
      );

    return (
      !!uid &&
      this.accionAdminUid === uid
    );
  }

  async retrocederEstado(
    trabajo: TrabajoVista
  ): Promise<void> {
    if (!trabajo) {
      await this.mostrarToast(
        'No se encontró el trabajo seleccionado.',
        'warning'
      );

      return;
    }

    const uid =
      this.obtenerTrabajoUid(
        trabajo
      );

    const estadoActual =
      this.normalizarEstado(
        trabajo.estado
      );

    if (!uid) {
      await this.mostrarToast(
        'El trabajo no tiene un identificador válido.',
        'danger'
      );

      return;
    }

    if (
      !this.puedeRetrocederEstado(
        trabajo
      )
    ) {
      await this.mostrarToast(
        'Este estado no puede retrocederse.',
        'warning'
      );

      return;
    }

    if (
      this.accionAdminUid === uid
    ) {
      return;
    }

    const estadoAnterior =
      estadoActual === 'en_proceso'
        ? 'En camino'
        : 'Pendiente';

    const alert =
      await this.alertCtrl.create({
        header:
          'Retroceder estado',

        subHeader:
          this.obtenerCodigoTrabajo(
            trabajo
          ),

        message:
          `El trabajo volverá de “${this.obtenerEstadoTexto(trabajo)}” a “${estadoAnterior}”. Esta acción es solo para corregir un estado registrado por error.`,

        inputs: [
          {
            name: 'motivo',
            type: 'textarea',
            placeholder:
              'Escribe el motivo de la corrección',

            attributes: {
              maxlength: 250,
              rows: 4
            }
          }
        ],

        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Retroceder',
            role: 'confirm'
          }
        ],

        cssClass:
          'seguimiento-retroceso-alert'
      });

    await alert.present();

    const resultado =
      await alert.onDidDismiss();

    if (
      resultado.role !== 'confirm'
    ) {
      return;
    }

    const motivo = String(
      resultado.data?.values
        ?.motivo ||
      ''
    ).trim();

    if (motivo.length < 5) {
      await this.mostrarToast(
        'Escribe un motivo de al menos 5 caracteres.',
        'warning'
      );

      return;
    }

    this.accionAdminUid = uid;

    try {
      await this.trabajoService
        .retrocederEstadoTrabajo(
          trabajo,
          motivo
        );

      await this.mostrarToast(
        `El trabajo volvió a “${estadoAnterior}”.`,
        'success'
      );

      setTimeout(() => {
        this.cdr.detectChanges();
      }, 80);
    } catch (error: unknown) {
      console.error(
        '[SeguimientoTrabajosPage] Error retrocediendo estado:',
        error
      );

      await this.mostrarToast(
        this.obtenerMensajeError(
          error
        ),
        'danger'
      );
    } finally {
      if (
        this.accionAdminUid === uid
      ) {
        this.accionAdminUid = '';
      }
    }
  }

  /*
   * ============================================================
   * PRESENTACIÓN
   * ============================================================
   */

  obtenerEstadoTexto(
    trabajo: TrabajoVista
  ): string {
    const estado =
      this.normalizarEstado(
        trabajo?.estado
      );

    const mapa:
      Record<string, string> = {
        pendiente:
          'Pendiente',

        en_camino:
          'En camino',

        en_proceso:
          'En proceso',

        finalizado:
          'Finalizado',

        devolucion_pendiente:
          'Devolución pendiente',

        devolucion_realizada:
          'Devolución realizada',

        cerrado:
          'Cerrado',

        cancelado:
          'Cancelado'
      };

    return (
      mapa[estado] ||
      String(
        trabajo?.estadoTexto ||
        ''
      ).trim() ||
      'Pendiente'
    );
  }

  obtenerClaseEstado(
    trabajo: TrabajoVista
  ): string {
    return this.normalizarEstado(
      trabajo?.estado
    );
  }

  obtenerFechaHoraSeguimiento(
    trabajo: TrabajoVista
  ): string {
    const data =
      trabajo as any;

    const estado =
      this.normalizarEstado(
        trabajo?.estado
      );

    let fecha: unknown = null;

    if (estado === 'en_camino') {
      fecha =
        data?.enCaminoAt;
    } else if (
      estado === 'en_proceso'
    ) {
      fecha =
        data?.iniciadoAt;
    } else if (
      estado === 'finalizado'
    ) {
      fecha =
        data?.finalizadoAt;
    } else if (
      estado === 'devolucion_pendiente'
    ) {
      fecha =
        data?.fechaDevolucionRegistrada ||
        data?.finalizadoAt;
    } else if (
      estado === 'devolucion_realizada'
    ) {
      fecha =
        data?.fechaDevolucionValidada ||
        data?.fechaDevolucionRegistrada;
    } else if (
      estado === 'cerrado'
    ) {
      fecha =
        data?.cerradoAt;
    }

    fecha =
      fecha ||
      data?.updatedAt ||
      data?.createdAt;

    const fechaFormateada =
      this.formatearFecha(
        fecha
      );

    if (fechaFormateada) {
      return fechaFormateada;
    }

    const fechaProgramada =
      String(
        trabajo?.fechaProgramada ||
        ''
      ).trim();

    const horaProgramada =
      String(
        trabajo?.horaProgramada ||
        ''
      ).trim();

    if (
      fechaProgramada &&
      horaProgramada
    ) {
      return `${fechaProgramada} · ${horaProgramada}`;
    }

    if (fechaProgramada) {
      return fechaProgramada;
    }

    return 'Sin fecha registrada';
  }

  /*
   * ============================================================
   * NAVEGACIÓN
   * ============================================================
   */

  abrirMenu(): void {
    this.navegarUnaVez(
      '/dashboard-admin'
    );
  }

  abrirNotificaciones(): void {
    this.navegarUnaVez(
      '/notificaciones-admin'
    );
  }

  abrirPerfil(): void {
    void this.mostrarToast(
      'Configuración de perfil próximamente.',
      'primary'
    );
  }

  irAtras(): void {
    this.navegarUnaVez(
      '/mas-admin'
    );
  }

  /*
   * ============================================================
   * TRACK BY
   * ============================================================
   */

  trackByTrabajo = (
    index: number,
    trabajo: TrabajoVista
  ): string => {
    const uid = String(
      trabajo?.uid ||
      trabajo?.id ||
      ''
    ).trim();

    return (
      uid ||
      this.obtenerCodigoTrabajo(
        trabajo
      ) ||
      String(index)
    );
  };

  /*
   * ============================================================
   * MÉTODOS PRIVADOS
   * ============================================================
   */

  private aplicarBusqueda(
    trabajos: TrabajoVista[],
    busqueda: string
  ): TrabajoVista[] {
    const termino =
      this.normalizarTextoBusqueda(
        busqueda
      );

    if (!termino) {
      return trabajos;
    }

    return trabajos.filter(
      (trabajo: TrabajoVista) => {
        const texto =
          this.normalizarTextoBusqueda(
            [
              this.obtenerCodigoTrabajo(
                trabajo
              ),
              trabajo?.tipoTrabajo,
              trabajo?.clienteNombre,
              trabajo?.empleadosTexto,
              trabajo?.direccionMapa,
              trabajo?.direccion,
              trabajo?.ubicacionTextoOriginal,
              this.obtenerEstadoTexto(
                trabajo
              ),
              this.obtenerFechaHoraSeguimiento(
                trabajo
              )
            ].join(' ')
          );

        return texto.includes(termino);
      }
    );
  }

  private normalizarTextoBusqueda(
    valor: unknown
  ): string {
    return String(valor || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(
        /[\u0300-\u036f]/g,
        ''
      )
      .replace(/\s+/g, ' ');
  }

  private filtrarTrabajos(
    trabajos: TrabajoVista[],
    filtro: FiltroSeguimiento
  ): TrabajoVista[] {
    if (filtro === 'todos') {
      return trabajos;
    }

    if (filtro === 'pendientes') {
      return trabajos.filter(
        (trabajo: TrabajoVista) =>
          this.normalizarEstado(
            trabajo.estado
          ) === 'pendiente'
      );
    }

    if (filtro === 'en_camino') {
      return trabajos.filter(
        (trabajo: TrabajoVista) =>
          this.normalizarEstado(
            trabajo.estado
          ) === 'en_camino'
      );
    }

    if (filtro === 'en_proceso') {
      return trabajos.filter(
        (trabajo: TrabajoVista) =>
          this.normalizarEstado(
            trabajo.estado
          ) === 'en_proceso'
      );
    }

    return trabajos.filter(
      (trabajo: TrabajoVista) =>
        this.esEstadoFinalizado(
          this.normalizarEstado(
            trabajo.estado
          )
        )
    );
  }

  private esEstadoFinalizado(
    estado: string
  ): boolean {
    return [
      'finalizado',
      'devolucion_pendiente',
      'devolucion_realizada',
      'cerrado'
    ].includes(estado);
  }

  private normalizarEstado(
    estado: unknown
  ): string {
    const valor =
      String(
        estado || ''
      )
        .trim()
        .toLowerCase()
        .replace(
          /[\s-]+/g,
          '_'
        );

    const mapa:
      Record<string, string> = {
        pendiente:
          'pendiente',

        asignado:
          'pendiente',

        en_camino:
          'en_camino',

        encamino:
          'en_camino',

        en_proceso:
          'en_proceso',

        enproceso:
          'en_proceso',

        proceso:
          'en_proceso',

        finalizado:
          'finalizado',

        finalizada:
          'finalizado',

        devolucion_pendiente:
          'devolucion_pendiente',

        devolucionpendiente:
          'devolucion_pendiente',

        devolucion_realizada:
          'devolucion_realizada',

        devolucionrealizada:
          'devolucion_realizada',

        cerrado:
          'cerrado',

        cerrada:
          'cerrado',

        cancelado:
          'cancelado',

        cancelada:
          'cancelado'
      };

    return (
      mapa[valor] ||
      valor ||
      'pendiente'
    );
  }

  private obtenerTrabajoUid(
    trabajo: TrabajoVista
  ): string {
    return String(
      trabajo?.uid ||
      trabajo?.id ||
      ''
    ).trim();
  }

  private generarNumeroDesdeTexto(
    texto: string
  ): number {
    let hash = 0;

    for (
      let indice = 0;
      indice < texto.length;
      indice++
    ) {
      hash =
        ((hash << 5) - hash) +
        texto.charCodeAt(indice);

      hash |= 0;
    }

    return (
      Math.abs(hash) %
      100000
    );
  }

  private obtenerMarcaTiempo(
    trabajo: TrabajoVista
  ): number {
    const data =
      trabajo as any;

    const candidatos = [
      data?.cerradoAt,
      data?.fechaDevolucionValidada,
      data?.fechaDevolucionRegistrada,
      data?.finalizadoAt,
      data?.iniciadoAt,
      data?.enCaminoAt,
      data?.updatedAt,
      data?.createdAt
    ];

    for (
      const fecha of candidatos
    ) {
      const marca =
        this.convertirFechaAMilisegundos(
          fecha
        );

      if (marca > 0) {
        return marca;
      }
    }

    return 0;
  }

  private convertirFechaAMilisegundos(
    fecha: unknown
  ): number {
    if (!fecha) {
      return 0;
    }

    const valor =
      fecha as any;

    if (
      typeof valor?.toMillis ===
      'function'
    ) {
      return (
        Number(
          valor.toMillis()
        ) ||
        0
      );
    }

    if (
      typeof valor?.toDate ===
      'function'
    ) {
      return valor
        .toDate()
        .getTime();
    }

    if (fecha instanceof Date) {
      return fecha.getTime();
    }

    if (
      typeof fecha === 'number'
    ) {
      return fecha;
    }

    if (
      typeof fecha === 'string'
    ) {
      const resultado =
        new Date(
          fecha
        ).getTime();

      return Number.isNaN(
        resultado
      )
        ? 0
        : resultado;
    }

    return 0;
  }

  private formatearFecha(
    fecha: unknown
  ): string {
    const milisegundos =
      this.convertirFechaAMilisegundos(
        fecha
      );

    if (milisegundos <= 0) {
      return '';
    }

    return new Date(
      milisegundos
    ).toLocaleString(
      'es-PE',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    );
  }

  private navegarUnaVez(
    ruta: string
  ): void {
    if (this.navegando) {
      return;
    }

    this.navegando = true;

    void this.navCtrl
      .navigateRoot(
        ruta,
        {
          animated: false,
          replaceUrl: true
        }
      )
      .finally(() => {
        setTimeout(() => {
          this.navegando = false;
        }, 250);
      });
  }

  private obtenerMensajeError(
    error: unknown
  ): string {
    const objeto =
      error as {
        code?: string;
        message?: string;
      };

    const codigo = String(
      objeto?.code ||
      objeto?.message ||
      error ||
      ''
    );

    if (
      codigo.includes(
        'trabajo-uid-vacio'
      )
    ) {
      return 'No se encontró el identificador del trabajo.';
    }

    if (
      codigo.includes(
        'estado-no-retrocedible'
      )
    ) {
      return 'El estado actual no permite retroceso.';
    }

    if (
      codigo.includes(
        'trabajo-no-existe'
      )
    ) {
      return 'El trabajo ya no existe.';
    }

    if (
      codigo.includes(
        'permission-denied'
      )
    ) {
      return 'No tienes permisos para corregir el estado.';
    }

    if (
      codigo.includes(
        'unauthenticated'
      )
    ) {
      return 'La sesión del administrador no está activa.';
    }

    if (
      codigo.includes(
        'unavailable'
      )
    ) {
      return 'No hay conexión. Revisa tu internet.';
    }

    return 'No se pudo completar la corrección del estado.';
  }

  private async mostrarToast(
    message: string,
    color: ColorToast = 'primary'
  ): Promise<void> {
    const toast =
      await this.toastCtrl.create({
        message,
        duration: 2600,
        position: 'top',
        color
      });

    await toast.present();
  }
}