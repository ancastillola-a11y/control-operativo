// src/app/procesos/devolucion.service.ts

import {
  Injectable,
  inject
} from '@angular/core';

import {
  BehaviorSubject,
  combineLatest,
  Observable
} from 'rxjs';

import {
  map,
  shareReplay
} from 'rxjs/operators';

import {
  DevolucionDAO
} from '../dao/devolucion.dao';

import {
  DevolucionTrabajoVista,
  DevolucionesVM,
  EstadoDevolucion,
  FiltroDevolucion,
  MaterialDevolucionVista,
  ValidarDevolucionData
} from '../modelos/devolucion';

@Injectable({
  providedIn: 'root'
})
export class DevolucionService {
  private dao = inject(DevolucionDAO);

  private filtroSubject =
    new BehaviorSubject<FiltroDevolucion>('pendientes');

  vm$: Observable<DevolucionesVM> = combineLatest([
    this.dao.escucharTrabajos(),
    this.filtroSubject.asObservable()
  ]).pipe(
    map(([trabajos, filtro]) => {
      const devoluciones: DevolucionTrabajoVista[] =
        (trabajos || [])
          .filter(
            (trabajo: any) =>
              trabajo?.eliminado !== true
          )
          .filter(
            (trabajo: any) =>
              this.esTrabajoConDevolucionReal(trabajo)
          )
          .map(
            (
              trabajo: any
            ): DevolucionTrabajoVista =>
              this.mapearDevolucion(trabajo)
          )
          .sort(
            (
              a: DevolucionTrabajoVista,
              b: DevolucionTrabajoVista
            ) => {
              const ordenEstado =
                this.ordenEstadoDevolucion(
                  a.estadoDevolucion
                ) -
                this.ordenEstadoDevolucion(
                  b.estadoDevolucion
                );

              if (ordenEstado !== 0) {
                return ordenEstado;
              }

              return b.uid.localeCompare(a.uid);
            }
          );

      const devolucionesFiltradas =
        this.aplicarFiltro(
          devoluciones,
          filtro
        );

      return {
        filtro,

        devoluciones,
        devolucionesFiltradas,

        totalPendientes:
          devoluciones.filter(
            (
              item: DevolucionTrabajoVista
            ) =>
              item.estadoDevolucion ===
              'pendiente'
          ).length,

        totalValidadas:
          devoluciones.filter(
            (
              item: DevolucionTrabajoVista
            ) =>
              item.estadoDevolucion ===
              'validada'
          ).length,

        totalHistorial:
          devoluciones.length
      };
    }),

    shareReplay({
      bufferSize: 1,
      refCount: true
    })
  );

  cambiarFiltro(
    filtro: FiltroDevolucion
  ): void {
    this.filtroSubject.next(filtro);
  }

  async validarDevolucion(
    data: ValidarDevolucionData | string,
    codigo = ''
  ): Promise<void> {
    if (typeof data === 'string') {
      await this.dao.validarDevolucion({
        trabajoUid:
          String(data || '').trim(),

        codigoIngresado:
          String(codigo || '').trim(),

        origenValidacion:
          'administrador'
      });

      return;
    }

    await this.dao.validarDevolucion(data);
  }

  /*
   * ============================================================
   * FILTRO DE LA VISTA
   * ============================================================
   */

  private aplicarFiltro(
    devoluciones: DevolucionTrabajoVista[],
    filtro: FiltroDevolucion
  ): DevolucionTrabajoVista[] {
    if (filtro === 'pendientes') {
      return devoluciones.filter(
        (
          item: DevolucionTrabajoVista
        ) =>
          item.estadoDevolucion ===
          'pendiente'
      );
    }

    if (filtro === 'validadas') {
      return devoluciones.filter(
        (
          item: DevolucionTrabajoVista
        ) =>
          item.estadoDevolucion ===
          'validada'
      );
    }

    return devoluciones;
  }

  /*
   * ============================================================
   * IDENTIFICAR TRABAJOS CON DEVOLUCIÓN
   * ============================================================
   */

  private esTrabajoConDevolucionReal(
    trabajo: any
  ): boolean {
    const estado = String(
      trabajo?.estado || ''
    ).trim();

    if (
      estado === 'devolucion_pendiente' ||
      estado === 'devolucion_realizada'
    ) {
      return true;
    }

    if (
      trabajo?.devolucionRegistrada === true ||
      trabajo?.devolucionValidada === true
    ) {
      return true;
    }

    const materiales: any[] =
      Array.isArray(
        trabajo?.materialesAsignados
      )
        ? trabajo.materialesAsignados
        : [];

    return materiales.some(
      (material: any) => {
        const cantidadAsignada = Number(
          material?.cantidadAsignada ??
          material?.cantidad ??
          0
        );

        const cantidadUsada = Number(
          material?.cantidadUsada ??
          material?.usado ??
          0
        );

        const sobranteCalculado = Math.max(
          cantidadAsignada - cantidadUsada,
          0
        );

        const cantidadDevuelta = Number(
          material?.cantidadDevuelta ??
          material?.cantidadRetornada ??
          material?.cantidadSobrante ??
          sobranteCalculado
        );

        return (
          Number.isFinite(cantidadDevuelta) &&
          cantidadDevuelta > 0
        );
      }
    );
  }

  /*
   * ============================================================
   * MAPEAR TRABAJO A DEVOLUCIÓN
   * ============================================================
   */

  private mapearDevolucion(
    trabajo: any
  ): DevolucionTrabajoVista {
    const materialesOriginales: any[] =
      Array.isArray(
        trabajo?.materialesAsignados
      )
        ? trabajo.materialesAsignados
        : [];

    const materiales: MaterialDevolucionVista[] =
      materialesOriginales
        .map(
          (
            item: any,
            index: number
          ): MaterialDevolucionVista => {
            const cantidadAsignada = Number(
              item?.cantidadAsignada ??
              item?.cantidad ??
              0
            );

            const cantidadUsada = Number(
              item?.cantidadUsada ??
              item?.usado ??
              0
            );

            const sobranteCalculado = Math.max(
              cantidadAsignada -
              cantidadUsada,
              0
            );

            const cantidadDevuelta = Number(
              item?.cantidadDevuelta ??
              item?.cantidadRetornada ??
              item?.cantidadSobrante ??
              sobranteCalculado
            );

            const materialUid = String(
              item?.materialUid ||
              item?.uid ||
              item?.id ||
              item?.materialId ||
              ''
            ).trim();

            const unidad = String(
              item?.unidad ||
              'und'
            ).trim();

            const cantidadAsignadaNormalizada =
              Number.isFinite(
                cantidadAsignada
              )
                ? Math.max(
                    cantidadAsignada,
                    0
                  )
                : 0;

            const cantidadUsadaNormalizada =
              Number.isFinite(
                cantidadUsada
              )
                ? Math.max(
                    cantidadUsada,
                    0
                  )
                : 0;

            const cantidadDevueltaNormalizada =
              Number.isFinite(
                cantidadDevuelta
              )
                ? Math.max(
                    cantidadDevuelta,
                    0
                  )
                : 0;

            return {
              /*
               * Los registros históricos pueden no tener
               * materialUid. La clave temporal solo se usa
               * para mostrar la información en pantalla.
               */
              materialUid:
                materialUid ||
                `historico-${index}`,

              nombre: String(
                item?.nombre ||
                item?.materialNombre ||
                'Material'
              ).trim(),

              unidad,

              cantidadAsignada:
                cantidadAsignadaNormalizada,

              cantidadUsada:
                cantidadUsadaNormalizada,

              cantidadDevuelta:
                cantidadDevueltaNormalizada,

              cantidadTexto:
                `${cantidadDevueltaNormalizada} ${unidad}`
            };
          }
        )
        .filter(
          (
            item: MaterialDevolucionVista
          ): boolean =>
            Number(
              item.cantidadDevuelta || 0
            ) > 0
        );

    const estadoDevolucion:
      EstadoDevolucion =
        trabajo?.estado ===
          'devolucion_realizada' ||
        trabajo?.devolucionValidada ===
          true
          ? 'validada'
          : 'pendiente';

    const empleados: any[] =
      Array.isArray(
        trabajo?.empleadosAsignados
      )
        ? trabajo.empleadosAsignados
        : [];

    const empleadoTexto = String(
      trabajo?.empleadoDevolucionNombre ||
      (
        empleados.length > 0
          ? empleados
              .map(
                (empleado: any) =>
                  empleado?.nombreCompleto ||
                  empleado?.nombres ||
                  empleado?.usuario ||
                  'Empleado'
              )
              .join(', ')
          : 'Sin empleado'
      )
    ).trim();

    const totalDevuelto =
      materiales.reduce(
        (
          total: number,
          material:
            MaterialDevolucionVista
        ) =>
          total +
          Number(
            material.cantidadDevuelta ||
            0
          ),
        0
      );

    return {
      uid: String(
        trabajo?.uid ||
        trabajo?.id ||
        ''
      ).trim(),

      codigoTrabajo:
        this.obtenerCodigoTrabajo(
          trabajo
        ),

      clienteNombre: String(
        trabajo?.clienteNombre ||
        'Sin cliente'
      ).trim(),

      tipoTrabajo: String(
        trabajo?.tipoTrabajo ||
        'Trabajo operativo'
      ).trim(),

      empleadoTexto,

      fechaTexto:
        this.obtenerFechaTexto(
          trabajo
        ),

      codigoDevolucion: String(
        trabajo?.codigoDevolucion ||
        ''
      ).trim(),

      estadoTrabajo: String(
        trabajo?.estado ||
        ''
      ).trim(),

      estadoDevolucion,

      estadoTexto:
        estadoDevolucion ===
        'validada'
          ? 'Validada'
          : 'Pendiente',

      totalMateriales:
        materiales.length,

      totalDevuelto,

      materiales,

      devolucionRegistrada:
        trabajo?.devolucionRegistrada ===
        true,

      devolucionValidada:
        trabajo?.devolucionValidada ===
        true,

      empleadoDevolucionUid:
        String(
          trabajo?.empleadoDevolucionUid ||
          ''
        ).trim(),

      empleadoDevolucionNombre:
        String(
          trabajo?.empleadoDevolucionNombre ||
          empleadoTexto ||
          ''
        ).trim(),

      fechaRegistroTexto:
        this.obtenerFechaRegistroTexto(
          trabajo
        ),

      fechaValidacionTexto:
        this.obtenerFechaValidacionTexto(
          trabajo
        ),

      observacionDevolucion:
        String(
          trabajo?.observacionDevolucion ||
          ''
        ).trim()
    };
  }

  /*
   * ============================================================
   * ORDEN
   * ============================================================
   */

  private ordenEstadoDevolucion(
    estado: EstadoDevolucion
  ): number {
    if (estado === 'pendiente') {
      return 1;
    }

    if (estado === 'validada') {
      return 2;
    }

    return 99;
  }

  /*
   * ============================================================
   * FECHAS
   * ============================================================
   */

  private obtenerFechaTexto(
    trabajo: any
  ): string {
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

    return 'Sin fecha';
  }

  private obtenerFechaRegistroTexto(
    trabajo: any
  ): string {
    const fecha =
      trabajo?.fechaDevolucionRegistrada ||
      trabajo?.finalizadoAt ||
      trabajo?.updatedAt;

    return this.formatearFechaFirestore(
      fecha
    );
  }

  private obtenerFechaValidacionTexto(
    trabajo: any
  ): string {
    return this.formatearFechaFirestore(
      trabajo?.fechaDevolucionValidada
    );
  }

  private formatearFechaFirestore(
    fecha: any
  ): string {
    if (!fecha) {
      return '';
    }

    if (
      typeof fecha?.toDate ===
      'function'
    ) {
      return fecha
        .toDate()
        .toLocaleString('es-PE');
    }

    if (fecha instanceof Date) {
      return fecha.toLocaleString(
        'es-PE'
      );
    }

    if (typeof fecha === 'string') {
      const fechaConvertida =
        new Date(fecha);

      if (
        !Number.isNaN(
          fechaConvertida.getTime()
        )
      ) {
        return fechaConvertida
          .toLocaleString('es-PE');
      }
    }

    return '';
  }

  /*
   * ============================================================
   * CÓDIGO DE SEGUIMIENTO
   * ============================================================
   */

  private obtenerCodigoTrabajo(
    trabajo: any
  ): string {
    /*
     * Este código identifica el trabajo.
     * No es el código de devolución.
     */

    const candidatos = [
      trabajo?.codigoSeguimiento,
      trabajo?.codigoTrabajo,
      trabajo?.codigo,
      trabajo?.numero,
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

    /*
     * Compatibilidad con trabajos antiguos
     * que todavía no guardaron T-#####.
     */
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

    return Math.abs(hash) % 100000;
  }
}