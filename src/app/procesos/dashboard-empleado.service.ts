// src/app/procesos/dashboard-empleado.service.ts
import { Injectable, inject } from '@angular/core';

import {
  Auth,
  authState
} from '@angular/fire/auth';

import {
  Observable,
  combineLatest,
  of
} from 'rxjs';

import {
  catchError,
  map,
  shareReplay,
  switchMap
} from 'rxjs/operators';

import { DashboardEmpleadoDAO } from '../dao/dashboard-empleado.dao';

import {
  DashboardEmpleadoUsuario,
  DashboardEmpleadoViewModel,
  DashboardTrabajoEmpleado
} from '../modelos/dashboard-empleado';

import {
  EstadoPagoTrabajo,
  FinalizarTrabajoData,
  MetodoPagoTrabajo,
  RegistrarDevolucionTrabajoData
} from '../modelos/trabajo';

type MaterialUsadoEntrada =
  | number
  | {
      materialUid?: string;
      uid?: string;
      id?: string;
      materialId?: string;
      cantidadUsada?: number;
      cantidad?: number;
      usado?: number;
    };

export interface FinalizarTrabajoEmpleadoPayload {
  materialesUsados: MaterialUsadoEntrada[];

  pagoEstado: EstadoPagoTrabajo;
  pagoConfirmado?: boolean;
  montoRecibido?: number;
  metodoPago?: MetodoPagoTrabajo;

  observacionPago?: string;
  observacionFinalizacion?: string;
}

export interface MaterialDevueltoEmpleadoPayload {
  materialUid: string;

  nombre: string;
  unidad: string;

  cantidadAsignada: number;
  cantidadUsada: number;
  cantidadDevuelta: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardEmpleadoService {
  private auth = inject(Auth);
  private dao = inject(DashboardEmpleadoDAO);

  obtenerDashboardEmpleado$(): Observable<DashboardEmpleadoViewModel> {
    return authState(this.auth).pipe(
      switchMap((usuarioAuth) => {
        if (!usuarioAuth?.uid) {
          return of(this.crearViewModelVacio());
        }

        return combineLatest([
          this.dao.obtenerEmpleadoActual$(usuarioAuth.uid),
          this.dao.escucharTrabajosAsignados$(usuarioAuth.uid)
        ]).pipe(
          map(([empleado, trabajos]) =>
            this.construirViewModel(empleado, trabajos)
          )
        );
      }),

      catchError((error) => {
        console.error(
          '[DashboardEmpleadoService] Error cargando dashboard empleado:',
          error
        );

        return of(this.crearViewModelVacio());
      }),

      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }

  async marcarEnCamino(
    trabajo: DashboardTrabajoEmpleado,
    empleado: DashboardEmpleadoUsuario
  ): Promise<void> {
    this.validarEmpleado(empleado);

    if (trabajo.estado !== 'pendiente') {
      throw new Error('trabajo-no-pendiente');
    }

    await this.dao.actualizarEstadoTrabajo(
      trabajo,
      'en_camino',
      empleado
    );
  }

  async iniciarTrabajo(
    trabajo: DashboardTrabajoEmpleado,
    empleado: DashboardEmpleadoUsuario
  ): Promise<void> {
    this.validarEmpleado(empleado);

    if (trabajo.estado !== 'en_camino') {
      throw new Error('trabajo-no-en-camino');
    }

    await this.dao.actualizarEstadoTrabajo(
      trabajo,
      'en_proceso',
      empleado
    );
  }

  async finalizarTrabajo(
    trabajo: DashboardTrabajoEmpleado,
    empleado: DashboardEmpleadoUsuario,
    data?: FinalizarTrabajoEmpleadoPayload
  ): Promise<void> {
    this.validarEmpleado(empleado);

    if (trabajo.estado !== 'en_proceso') {
      throw new Error('trabajo-no-en-proceso');
    }

    const payload = this.construirPayloadFinalizacion(
      trabajo,
      empleado,
      data
    );

    await this.dao.finalizarTrabajoEmpleado(payload);
  }

  async registrarDevolucion(
    trabajo: DashboardTrabajoEmpleado,
    empleado: DashboardEmpleadoUsuario,
    materialesDevueltos: MaterialDevueltoEmpleadoPayload[],
    codigoDevolucionIngresado = ''
  ): Promise<void> {
    this.validarEmpleado(empleado);

    const estado = String(trabajo.estado || '').trim();

    if (
      estado !== 'devolucion_pendiente' &&
      estado !== 'finalizado'
    ) {
      throw new Error('trabajo-sin-devolucion-pendiente');
    }

    const codigo = String(codigoDevolucionIngresado || '').trim();

    if (!codigo) {
      throw new Error('codigo-devolucion-vacio');
    }

    const materialesValidos = this.normalizarMaterialesDevueltos(
      trabajo,
      materialesDevueltos
    );

    if (materialesValidos.length === 0) {
      throw new Error('sin-materiales-devolver');
    }

    const payload: RegistrarDevolucionTrabajoData = {
      trabajoUid: this.obtenerTrabajoUid(trabajo),

      empleadoUid: empleado.uid,
      empleadoNombre: this.obtenerNombreEmpleado(empleado),

      codigoDevolucionIngresado: codigo,

      materialesDevueltos: materialesValidos
    };

    await this.dao.validarDevolucionEmpleado(payload);
  }

  private construirViewModel(
    empleado: DashboardEmpleadoUsuario,
    trabajosBase: DashboardTrabajoEmpleado[]
  ): DashboardEmpleadoViewModel {
    const trabajos = (trabajosBase || [])
      .filter((trabajo) => trabajo.eliminado !== true)
      .filter((trabajo) => trabajo.estado !== 'cancelado');

    const trabajosPendientes = trabajos.filter((trabajo) =>
      trabajo.estado === 'pendiente'
    );

    const trabajosEnCamino = trabajos.filter((trabajo) =>
      trabajo.estado === 'en_camino'
    );

    const trabajosEnProceso = trabajos.filter((trabajo) =>
      trabajo.estado === 'en_proceso'
    );

    const trabajosFinalizados = trabajos.filter((trabajo) =>
      [
        'finalizado',
        'devolucion_pendiente',
        'devolucion_realizada',
        'cerrado'
      ].includes(String(trabajo.estado || '').trim())
    );

    const trabajoActual =
      trabajos.find((trabajo) => trabajo.estado === 'en_proceso') ||
      trabajos.find((trabajo) => trabajo.estado === 'en_camino') ||
      trabajos.find((trabajo) => trabajo.estado === 'pendiente') ||
      null;

    return {
      empleado,

      trabajos,
      trabajosPendientes,
      trabajosEnCamino,
      trabajosEnProceso,
      trabajosFinalizados,

      trabajoActual,

      totalTrabajos: trabajos.length,
      totalPendientes: trabajosPendientes.length,
      totalEnCamino: trabajosEnCamino.length,
      totalEnProceso: trabajosEnProceso.length,
      totalFinalizados: trabajosFinalizados.length
    };
  }

  private construirPayloadFinalizacion(
    trabajo: DashboardTrabajoEmpleado,
    empleado: DashboardEmpleadoUsuario,
    data?: FinalizarTrabajoEmpleadoPayload
  ): FinalizarTrabajoData {
    if (!data) {
      throw new Error('finalizacion-incompleta');
    }

    const trabajoUid = this.obtenerTrabajoUid(trabajo);

    if (!trabajoUid) {
      throw new Error('trabajo-uid-vacio');
    }

    const materialesAsignados = this.obtenerMaterialesTrabajo(trabajo);

    if (materialesAsignados.length === 0) {
      throw new Error('sin-materiales-asignados');
    }

    const materialesUsados = this.normalizarMaterialesUsados(
      trabajo,
      data.materialesUsados || []
    );

    const pagoEstado = String(data.pagoEstado || '').trim() as EstadoPagoTrabajo;

    if (!this.esEstadoPagoValido(pagoEstado)) {
      throw new Error('pago-estado-invalido');
    }

    const montoRecibido = Number(data.montoRecibido || 0);

    if (
      (pagoEstado === 'pagado' || pagoEstado === 'parcial') &&
      montoRecibido <= 0
    ) {
      throw new Error('monto-pago-invalido');
    }

    const metodoPago: MetodoPagoTrabajo =
      data.metodoPago || 'Otro';

    if (
      (pagoEstado === 'pagado' || pagoEstado === 'parcial') &&
      !this.esMetodoPagoValido(metodoPago)
    ) {
      throw new Error('metodo-pago-invalido');
    }

    return {
      trabajoUid,

      empleadoUid: empleado.uid,
      empleadoNombre: this.obtenerNombreEmpleado(empleado),

      materialesUsados,

      pagoEstado,
      pagoConfirmado:
        data.pagoConfirmado === true ||
        pagoEstado === 'pagado',

      montoRecibido:
        pagoEstado === 'pendiente'
          ? 0
          : montoRecibido,

      metodoPago,

      observacionPago: String(data.observacionPago || '').trim(),
      observacionFinalizacion: String(data.observacionFinalizacion || '').trim()
    };
  }

  private normalizarMaterialesUsados(
    trabajo: DashboardTrabajoEmpleado,
    entrada: MaterialUsadoEntrada[]
  ): Array<{
    materialUid: string;
    cantidadUsada: number;
  }> {
    const materialesAsignados = this.obtenerMaterialesTrabajo(trabajo);

    if (!Array.isArray(entrada) || entrada.length === 0) {
      throw new Error('materiales-usados-vacios');
    }

    return materialesAsignados.map((material, index) => {
      const materialUid = this.obtenerMaterialUid(material);
      const nombre = String(material.nombre || 'Material').trim();
      const cantidadAsignada = this.obtenerCantidadAsignada(material);

      if (!materialUid) {
        throw new Error('material-sin-uid');
      }

      const itemEntrada = this.buscarMaterialUsadoEntrada(
        entrada,
        materialUid,
        index
      );

      if (itemEntrada === null || itemEntrada === undefined) {
        throw new Error(`material-usado-faltante:${nombre}`);
      }

      const cantidadUsada = this.obtenerCantidadUsadaEntrada(itemEntrada);

      if (
        !Number.isFinite(cantidadUsada) ||
        cantidadUsada < 0 ||
        cantidadUsada > cantidadAsignada
      ) {
        throw new Error(`cantidad-usada-invalida:${nombre}`);
      }

      return {
        materialUid,
        cantidadUsada
      };
    });
  }

  private normalizarMaterialesDevueltos(
    trabajo: DashboardTrabajoEmpleado,
    materialesDevueltos: MaterialDevueltoEmpleadoPayload[]
  ): MaterialDevueltoEmpleadoPayload[] {
    const materialesAsignados = this.obtenerMaterialesTrabajo(trabajo);

    const entrada = Array.isArray(materialesDevueltos)
      ? materialesDevueltos
      : [];

    return entrada
      .map((item) => {
        const materialUid = String(item.materialUid || '').trim();

        const materialOriginal = materialesAsignados.find((material) =>
          this.obtenerMaterialUid(material) === materialUid
        );

        const nombre = String(
          item.nombre ||
          materialOriginal?.nombre ||
          'Material'
        ).trim();

        const unidad = String(
          item.unidad ||
          materialOriginal?.unidad ||
          'und'
        ).trim();

        const cantidadAsignada = Number(
          item.cantidadAsignada ??
          this.obtenerCantidadAsignada(materialOriginal) ??
          0
        );

        const cantidadUsada = Number(
          item.cantidadUsada ??
          materialOriginal?.cantidadUsada ??
          0
        );

        const cantidadDevuelta = Number(
          item.cantidadDevuelta ??
          materialOriginal?.cantidadDevuelta ??
          0
        );

        const sobranteMaximo = Math.max(
          cantidadAsignada - cantidadUsada,
          0
        );

        if (!materialUid) {
          throw new Error('material-devolucion-sin-uid');
        }

        if (
          !Number.isFinite(cantidadAsignada) ||
          !Number.isFinite(cantidadUsada) ||
          !Number.isFinite(cantidadDevuelta)
        ) {
          throw new Error(`cantidad-devolucion-invalida:${nombre}`);
        }

        if (cantidadAsignada < 0 || cantidadUsada < 0 || cantidadDevuelta <= 0) {
          throw new Error(`cantidad-devolucion-invalida:${nombre}`);
        }

        if (cantidadUsada > cantidadAsignada) {
          throw new Error(`cantidad-usada-mayor-asignada:${nombre}`);
        }

        if (cantidadDevuelta > sobranteMaximo) {
          throw new Error(`cantidad-devuelta-mayor-sobrante:${nombre}`);
        }

        return {
          materialUid,
          nombre,
          unidad,
          cantidadAsignada,
          cantidadUsada,
          cantidadDevuelta
        };
      })
      .filter((item) => item.cantidadDevuelta > 0);
  }

  private buscarMaterialUsadoEntrada(
    entrada: MaterialUsadoEntrada[],
    materialUid: string,
    index: number
  ): MaterialUsadoEntrada | null {
    const porUid = entrada.find((item) => {
      if (typeof item === 'number') {
        return false;
      }

      const uid = String(
        item.materialUid ||
        item.uid ||
        item.id ||
        item.materialId ||
        ''
      ).trim();

      return uid === materialUid;
    });

    if (porUid !== undefined) {
      return porUid;
    }

    return entrada[index] ?? null;
  }

  private obtenerCantidadUsadaEntrada(
    item: MaterialUsadoEntrada
  ): number {
    if (typeof item === 'number') {
      return Number(item || 0);
    }

    return Number(
      item.cantidadUsada ??
      item.cantidad ??
      item.usado ??
      0
    );
  }

  private obtenerTrabajoUid(
    trabajo: DashboardTrabajoEmpleado
  ): string {
    return String(trabajo.uid || trabajo.id || '').trim();
  }

  private obtenerMaterialesTrabajo(
    trabajo: DashboardTrabajoEmpleado
  ): any[] {
    return Array.isArray((trabajo as any).materialesAsignados)
      ? (trabajo as any).materialesAsignados
      : [];
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

  private obtenerCantidadAsignada(
    material: any
  ): number {
    return Number(
      material?.cantidadAsignada ??
      material?.cantidad ??
      material?.cantidadEntregada ??
      0
    ) || 0;
  }

  private obtenerNombreEmpleado(
    empleado: DashboardEmpleadoUsuario
  ): string {
    return String(
      empleado.nombreCompleto ||
      empleado.usuario ||
      'Empleado'
    ).trim();
  }

  private esEstadoPagoValido(
    valor: string
  ): valor is EstadoPagoTrabajo {
    return [
      'pendiente',
      'pagado',
      'parcial'
    ].includes(valor);
  }

  private esMetodoPagoValido(
    valor: string
  ): valor is MetodoPagoTrabajo {
    return [
      'Efectivo',
      'Yape',
      'Plin',
      'Transferencia',
      'Tarjeta',
      'Otro'
    ].includes(valor);
  }

  private validarEmpleado(
    empleado: DashboardEmpleadoUsuario
  ): void {
    if (!empleado?.uid) {
      throw new Error('empleado-sin-uid');
    }

    if (!empleado.accesoValido) {
      throw new Error('empleado-sin-acceso');
    }
  }

  private crearViewModelVacio(): DashboardEmpleadoViewModel {
    const empleado: DashboardEmpleadoUsuario = {
      uid: '',
      nombres: '',
      apellidos: '',
      nombreCompleto: 'Empleado',
      usuario: '',
      correo: '',
      correoAuth: '',
      dni: '',
      telefono: '',
      cargo: 'Personal operativo',
      rol: 'empleado',
      habilitado: false,
      activo: false,
      estado: false,
      eliminado: false,
      fotoUrl: '',
      iniciales: 'EM',
      cargoTexto: 'Personal operativo',
      accesoValido: false
    };

    return {
      empleado,

      trabajos: [],
      trabajosPendientes: [],
      trabajosEnCamino: [],
      trabajosEnProceso: [],
      trabajosFinalizados: [],

      trabajoActual: null,

      totalTrabajos: 0,
      totalPendientes: 0,
      totalEnCamino: 0,
      totalEnProceso: 0,
      totalFinalizados: 0
    };
  }
}