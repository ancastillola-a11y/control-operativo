// src/app/paginas/empleado/modulos/inicio-empleado/
// inicio-empleado.component.ts

import { CommonModule } from '@angular/common';

import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  briefcaseOutline,
  calendarOutline,
  chevronForwardOutline,
  cubeOutline,
  locationOutline,
  refreshOutline,
  timeOutline,
  warningOutline
} from 'ionicons/icons';

import {
  DashboardEmpleadoViewModel,
  DashboardTrabajoEmpleado
} from '../../../../modelos/dashboard-empleado';

@Component({
  selector: 'app-inicio-empleado',
  standalone: true,

  templateUrl:
    './inicio-empleado.component.html',

  styleUrls: [
    './inicio-empleado.component.css'
  ],

  imports: [
    CommonModule,
    IonicModule
  ]
})
export class InicioEmpleadoComponent {
  /*
   * View model entregado por DashboardEmpleadoPage.
   * Contiene el empleado autenticado y únicamente
   * los trabajos que le fueron asignados.
   */
  @Input()
  vm: DashboardEmpleadoViewModel | null = null;

  /*
   * Se emite al seleccionar una actividad.
   * El dashboard abre la vista interna de detalle.
   */
  @Output()
  abrirTrabajo =
    new EventEmitter<DashboardTrabajoEmpleado>();

  /*
   * Abre el módulo principal de Devoluciones.
   */
  @Output()
  irDevoluciones =
    new EventEmitter<void>();

  constructor() {
    addIcons({
      'briefcase-outline':
        briefcaseOutline,

      'calendar-outline':
        calendarOutline,

      'chevron-forward-outline':
        chevronForwardOutline,

      'cube-outline':
        cubeOutline,

      'location-outline':
        locationOutline,

      'refresh-outline':
        refreshOutline,

      'time-outline':
        timeOutline,

      'warning-outline':
        warningOutline
    });
  }

  /*
   * ============================================================
   * FECHA Y SALUDO
   * ============================================================
   */

  obtenerFechaHoy(): string {
    const texto =
      new Intl.DateTimeFormat(
        'es-PE',
        {
          weekday: 'long',
          day: '2-digit',
          month: 'long'
        }
      ).format(new Date());

    return (
      texto.charAt(0).toUpperCase() +
      texto.slice(1)
    );
  }

  obtenerPrimerNombre(): string {
    const nombreCompleto = String(
      this.vm?.empleado?.nombreCompleto ||
      this.vm?.empleado?.nombres ||
      this.vm?.empleado?.usuario ||
      'Empleado'
    ).trim();

    return (
      nombreCompleto
        .split(/\s+/)
        .filter(Boolean)[0] ||
      'Empleado'
    );
  }

  /*
   * ============================================================
   * RESUMEN DEL EMPLEADO
   * ============================================================
   */

  obtenerTotalPendientes(): number {
    if (
      Number.isFinite(
        Number(this.vm?.totalPendientes)
      )
    ) {
      return Number(
        this.vm?.totalPendientes || 0
      );
    }

    return this.contarEstados([
      'pendiente'
    ]);
  }

  obtenerTotalEnCurso(): number {
    const totalEnCamino = Number(
      this.vm?.totalEnCamino || 0
    );

    const totalEnProceso = Number(
      this.vm?.totalEnProceso || 0
    );

    if (
      totalEnCamino > 0 ||
      totalEnProceso > 0
    ) {
      return (
        totalEnCamino +
        totalEnProceso
      );
    }

    return this.contarEstados([
      'en_camino',
      'en_proceso'
    ]);
  }

  obtenerTotalFinalizados(): number {
    if (
      Number.isFinite(
        Number(this.vm?.totalFinalizados)
      )
    ) {
      return Number(
        this.vm?.totalFinalizados || 0
      );
    }

    return this.contarEstados([
      'finalizado',
      'devolucion_pendiente',
      'devolucion_realizada',
      'cerrado'
    ]);
  }

  obtenerTotalDevolucionesPendientes(): number {
    const valorModelo = Number(
      (this.vm as any)
        ?.totalDevolucionPendiente ||
      0
    );

    if (valorModelo > 0) {
      return valorModelo;
    }

    return this.contarEstados([
      'devolucion_pendiente'
    ]);
  }

  /*
   * ============================================================
   * PRÓXIMO TRABAJO Y ACTIVIDADES DESTACADAS
   * ============================================================
   */

  obtenerProximoTrabajo():
    DashboardTrabajoEmpleado | null {
    const prioridad = [
      'en_proceso',
      'en_camino',
      'pendiente'
    ];

    const trabajos =
      this.obtenerTrabajosActivos();

    for (
      const estado of prioridad
    ) {
      const encontrado =
        trabajos.find(
          (
            trabajo:
              DashboardTrabajoEmpleado
          ) =>
            this.normalizarEstado(
              trabajo.estado
            ) === estado
        );

      if (encontrado) {
        return encontrado;
      }
    }

    return null;
  }

  obtenerTrabajosDestacados():
    DashboardTrabajoEmpleado[] {
    const prioridad:
      Record<string, number> = {
        en_proceso: 1,
        en_camino: 2,
        pendiente: 3,
        devolucion_pendiente: 4
      };

    return this.obtenerTrabajosActivos()
      .filter(
        (
          trabajo:
            DashboardTrabajoEmpleado
        ) =>
          Object.prototype.hasOwnProperty.call(
            prioridad,
            this.normalizarEstado(
              trabajo.estado
            )
          )
      )
      .sort(
        (
          a: DashboardTrabajoEmpleado,
          b: DashboardTrabajoEmpleado
        ) => {
          const estadoA =
            this.normalizarEstado(
              a.estado
            );

          const estadoB =
            this.normalizarEstado(
              b.estado
            );

          const ordenEstado =
            prioridad[estadoA] -
            prioridad[estadoB];

          if (ordenEstado !== 0) {
            return ordenEstado;
          }

          return (
            this.obtenerMarcaTiempo(a) -
            this.obtenerMarcaTiempo(b)
          );
        }
      )
      .slice(0, 3);
  }

  tieneActividadesPendientes(): boolean {
    return (
      this.obtenerTrabajosDestacados()
        .length > 0
    );
  }

  /*
   * ============================================================
   * DATOS VISUALES DEL TRABAJO
   * ============================================================
   */

  obtenerCodigoTrabajo(
    trabajo:
      DashboardTrabajoEmpleado
  ): string {
    const data =
      trabajo as any;

    const candidatos = [
      trabajo?.codigoTrabajo,
      data?.codigoSeguimiento,
      data?.codigo,
      data?.numero
    ]
      .map(
        (valor: unknown) =>
          String(valor || '').trim()
      )
      .filter(Boolean);

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

  obtenerEstadoTexto(
    trabajo:
      DashboardTrabajoEmpleado
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
    trabajo:
      DashboardTrabajoEmpleado
  ): string {
    return this.normalizarEstado(
      trabajo?.estado
    );
  }

  obtenerFechaHora(
    trabajo:
      DashboardTrabajoEmpleado
  ): string {
    const fechaHoraTexto = String(
      trabajo?.fechaHoraTexto ||
      ''
    ).trim();

    if (fechaHoraTexto) {
      return fechaHoraTexto;
    }

    const fecha = String(
      trabajo?.fechaProgramada ||
      ''
    ).trim();

    const hora = String(
      trabajo?.horaProgramada ||
      ''
    ).trim();

    if (fecha && hora) {
      return `${fecha} · ${hora}`;
    }

    if (fecha) {
      return fecha;
    }

    return 'Sin fecha programada';
  }

  obtenerDireccion(
    trabajo:
      DashboardTrabajoEmpleado
  ): string {
    return String(
      trabajo?.direccionTexto ||
      trabajo?.direccionMapa ||
      trabajo?.direccion ||
      trabajo?.ubicacionTextoOriginal ||
      'Sin dirección registrada'
    ).trim();
  }

  /*
   * ============================================================
   * EVENTOS
   * ============================================================
   */

  seleccionarTrabajo(
    trabajo:
      DashboardTrabajoEmpleado
  ): void {
    if (!trabajo) {
      return;
    }

    this.abrirTrabajo.emit(
      trabajo
    );
  }

  abrirDevoluciones(): void {
    this.irDevoluciones.emit();
  }

  /*
   * Se declara como función flecha para conservar el
   * contexto cuando Angular la usa dentro de *ngFor.
   */
  trackByTrabajo = (
    index: number,
    trabajo:
      DashboardTrabajoEmpleado
  ): string => {
    return (
      String(
        trabajo?.uid ||
        trabajo?.id ||
        ''
      ).trim() ||
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

  private obtenerTrabajosActivos():
    DashboardTrabajoEmpleado[] {
    return Array.isArray(
      this.vm?.trabajos
    )
      ? this.vm!.trabajos.filter(
          (
            trabajo:
              DashboardTrabajoEmpleado
          ) => {
            const data =
              trabajo as any;

            const estado =
              this.normalizarEstado(
                trabajo?.estado
              );

            return (
              data?.eliminado !== true &&
              estado !== 'cancelado'
            );
          }
        )
      : [];
  }

  private contarEstados(
    estados: string[]
  ): number {
    return this.obtenerTrabajosActivos()
      .filter(
        (
          trabajo:
            DashboardTrabajoEmpleado
        ) =>
          estados.includes(
            this.normalizarEstado(
              trabajo.estado
            )
          )
      )
      .length;
  }

  private normalizarEstado(
    estado: unknown
  ): string {
    return String(
      estado || ''
    )
      .trim()
      .toLowerCase()
      .replace(
        /[\s-]+/g,
        '_'
      );
  }

  private obtenerMarcaTiempo(
    trabajo:
      DashboardTrabajoEmpleado
  ): number {
    const data =
      trabajo as any;

    const candidatos = [
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

    const fechaProgramada =
      String(
        trabajo?.fechaProgramada ||
        ''
      ).trim();

    const horaProgramada =
      String(
        trabajo?.horaProgramada ||
        '00:00'
      ).trim();

    const fechaTexto =
      `${fechaProgramada}T${horaProgramada}`;

    const resultado =
      new Date(fechaTexto)
        .getTime();

    return Number.isNaN(
      resultado
    )
      ? Number.MAX_SAFE_INTEGER
      : resultado;
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
      return Number(
        valor.toMillis()
      ) || 0;
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
        new Date(fecha)
          .getTime();

      return Number.isNaN(
        resultado
      )
        ? 0
        : resultado;
    }

    return 0;
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
}
