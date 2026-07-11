// src/app/dao/devolucion.dao.ts
import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  collectionData,
  doc,
  runTransaction,
  serverTimestamp
} from '@angular/fire/firestore';

import { Auth } from '@angular/fire/auth';

import { Observable } from 'rxjs';

import {
  ValidarDevolucionData
} from '../modelos/devolucion';

@Injectable({
  providedIn: 'root'
})
export class DevolucionDAO {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  escucharTrabajos(): Observable<any[]> {
    const ref = collection(this.firestore, 'trabajos');

    return collectionData(ref, {
      idField: 'uid'
    }) as Observable<any[]>;
  }

  async validarDevolucion(
    data: ValidarDevolucionData | string,
    codigoIngresadoParametro = ''
  ): Promise<void> {
    const payload = this.normalizarPayloadValidacion(
      data,
      codigoIngresadoParametro
    );

    const trabajoUid = String(payload.trabajoUid || '').trim();
    const codigoIngresado = String(payload.codigoIngresado || '').trim();

    if (!trabajoUid) {
      throw new Error('trabajo-uid-vacio');
    }

    if (!codigoIngresado) {
      throw new Error('codigo-devolucion-vacio');
    }

    const trabajoRef = doc(this.firestore, 'trabajos', trabajoUid);

    await runTransaction(this.firestore, async (transaction) => {
      const trabajoSnap = await transaction.get(trabajoRef);

      if (!trabajoSnap.exists()) {
        throw new Error('trabajo-no-existe');
      }

      const trabajo: any = trabajoSnap.data();

      if (
        trabajo.estado === 'devolucion_realizada' ||
        trabajo.devolucionValidada === true
      ) {
        throw new Error('devolucion-ya-validada');
      }

      if (
        trabajo.estado !== 'devolucion_pendiente' &&
        trabajo.devolucionRegistrada !== true
      ) {
        throw new Error('trabajo-sin-devolucion-pendiente');
      }

      const codigoReal = String(trabajo.codigoDevolucion || '').trim();

      if (!codigoReal) {
        throw new Error('codigo-devolucion-no-configurado');
      }

      if (codigoIngresado !== codigoReal) {
        throw new Error('codigo-devolucion-incorrecto');
      }

      const materialesOriginales = Array.isArray(trabajo.materialesAsignados)
        ? trabajo.materialesAsignados
        : [];

      if (materialesOriginales.length === 0) {
        throw new Error('sin-materiales-devolver');
      }

      const materialesConDevolucion = materialesOriginales
        .map((material: any) => {
          const materialUid = this.obtenerMaterialUid(material);
          const cantidadAsignada = this.obtenerCantidadAsignada(material);
          const cantidadUsada = this.obtenerCantidadUsada(material);
          const cantidadDevuelta = this.obtenerCantidadDevuelta(material);

          return {
            ...material,
            materialUid,
            cantidadAsignada,
            cantidadUsada,
            cantidadDevuelta
          };
        })
        .filter((material: any) =>
          material.materialUid &&
          Number(material.cantidadDevuelta || 0) > 0
        );

      if (materialesConDevolucion.length === 0) {
        throw new Error('sin-materiales-devolver');
      }

      const codigoTrabajo = this.obtenerCodigoTrabajo({
        ...trabajo,
        uid: trabajoUid,
        id: trabajoUid
      });

      const validador = this.obtenerValidador(payload);

      const stockRetornoPorMaterial: Record<string, {
        stockAntes: number;
        stockDespues: number;
      }> = {};

      let totalDevuelto = 0;

      for (const item of materialesConDevolucion) {
        const materialUid = String(item.materialUid || '').trim();

        const nombre = String(
          item.nombre ||
          item.materialNombre ||
          'Material'
        ).trim();

        const unidad = String(item.unidad || 'und').trim();

        const cantidadAsignada = Number(item.cantidadAsignada || 0);
        const cantidadUsada = Number(item.cantidadUsada || 0);
        const cantidadDevuelta = Number(item.cantidadDevuelta || 0);

        if (!materialUid) {
          throw new Error(`material-sin-uid:${nombre}`);
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

        const sobranteMaximo = Math.max(
          cantidadAsignada - cantidadUsada,
          0
        );

        if (cantidadDevuelta > sobranteMaximo) {
          throw new Error(`cantidad-devuelta-mayor-sobrante:${nombre}`);
        }

        const materialRef = doc(
          this.firestore,
          'materiales',
          materialUid
        );

        const materialSnap = await transaction.get(materialRef);

        if (!materialSnap.exists()) {
          throw new Error(`material-no-existe:${nombre}`);
        }

        const materialData: any = materialSnap.data();

        const stockAntes = Number(materialData.stockActual || 0);
        const stockDespues = stockAntes + cantidadDevuelta;
        const stockMinimo = Number(materialData.stockMinimo || 0);

        transaction.update(materialRef, {
          stockActual: stockDespues,
          stockBajo: stockMinimo > 0 && stockDespues <= stockMinimo,
          updatedAt: serverTimestamp()
        });

        const movimientoRef = doc(
          collection(this.firestore, 'movimientos_materiales')
        );

        transaction.set(movimientoRef, {
          materialUid,
          materialNombre: nombre,

          tipoMovimiento: 'entrada',
          tipo: 'entrada',

          cantidad: cantidadDevuelta,

          stockAntes,
          stockDespues,

          moduloOrigen: 'devolucion_materiales',

          trabajoUid,
          codigoTrabajo,

          unidad,
          origenValidacion: payload.origenValidacion,

          descripcion: `Entrada por devolución de ${cantidadDevuelta} ${unidad} de ${nombre} del trabajo ${codigoTrabajo}.`,

          realizadoPorUid: validador.uid,
          realizadoPorNombre: validador.nombre,

          createdAt: serverTimestamp()
        });

        stockRetornoPorMaterial[materialUid] = {
          stockAntes,
          stockDespues
        };

        totalDevuelto += cantidadDevuelta;
      }

      if (totalDevuelto <= 0) {
        throw new Error('sin-materiales-devolver');
      }

      const materialesActualizados = materialesOriginales.map((material: any) => {
        const materialUid = this.obtenerMaterialUid(material);
        const stockRetorno = stockRetornoPorMaterial[materialUid];

        const cantidadAsignada = this.obtenerCantidadAsignada(material);
        const cantidadUsada = this.obtenerCantidadUsada(material);
        const cantidadDevuelta = this.obtenerCantidadDevuelta(material);

        if (!stockRetorno) {
          return {
            ...material,

            materialUid,

            cantidadAsignada,
            cantidadUsada,
            cantidadDevuelta,

            devolucionValidada:
              cantidadDevuelta > 0
                ? material.devolucionValidada === true
                : true
          };
        }

        return {
          ...material,

          materialUid,

          cantidadAsignada,
          cantidadUsada,
          cantidadDevuelta,

          stockRetornoAntes: stockRetorno.stockAntes,
          stockRetornoDespues: stockRetorno.stockDespues,

          devolucionValidada: true
        };
      });

      transaction.update(trabajoRef, {
        estado: 'devolucion_realizada',

        materialesAsignados: materialesActualizados,

        devolucionRegistrada: true,
        devolucionValidada: true,

        origenValidacionDevolucion: payload.origenValidacion,

        empleadoDevolucionUid:
          payload.empleadoUid ||
          trabajo.empleadoDevolucionUid ||
          '',

        empleadoDevolucionNombre:
          payload.empleadoNombre ||
          trabajo.empleadoDevolucionNombre ||
          '',

        devolucionValidadaPorUid: validador.uid,
        devolucionValidadaPorNombre: validador.nombre,

        fechaDevolucionValidada: serverTimestamp(),

        actualizadoPorUid: validador.uid,
        actualizadoPorNombre: validador.nombre,

        updatedAt: serverTimestamp()
      });

      const historialRef = doc(
        collection(this.firestore, 'historial_actividades')
      );

      transaction.set(historialRef, {
        modulo: 'Devolución de materiales',
        accion: 'validar_devolucion',
        descripcion:
          payload.origenValidacion === 'empleado'
            ? `El empleado ${validador.nombre} validó la devolución con código.`
            : `El administrador ${validador.nombre} validó la devolución.`,

        trabajoUid,
        codigoTrabajo,

        origenValidacion: payload.origenValidacion,

        empleadoUid: payload.empleadoUid || '',
        empleadoNombre: payload.empleadoNombre || '',

        administradorUid: payload.administradorUid || '',
        administradorNombre: payload.administradorNombre || '',

        materialesDevueltos: materialesActualizados
          .filter((material: any) => Number(material.cantidadDevuelta || 0) > 0)
          .map((material: any) => ({
            materialUid: material.materialUid,
            nombre: material.nombre || material.materialNombre || 'Material',
            unidad: material.unidad || 'und',
            cantidadAsignada: Number(material.cantidadAsignada || 0),
            cantidadUsada: Number(material.cantidadUsada || 0),
            cantidadDevuelta: Number(material.cantidadDevuelta || 0),
            stockRetornoAntes: material.stockRetornoAntes ?? null,
            stockRetornoDespues: material.stockRetornoDespues ?? null
          })),

        totalDevuelto,

        createdAt: serverTimestamp()
      });

      const notificacionRef = doc(
        collection(this.firestore, 'notificaciones_admin')
      );

      transaction.set(notificacionRef, {
        titulo: 'Devolución realizada',
        mensaje:
          payload.origenValidacion === 'empleado'
            ? `${validador.nombre} devolvió materiales sobrantes.`
            : 'Se validó una devolución de materiales.',

        detalle: `El stock fue actualizado para el trabajo ${codigoTrabajo}.`,

        tipo: 'devolucion_realizada',

        ruta: '/devoluciones',

        referenciaUid: trabajoUid,
        trabajoUid,
        codigoTrabajo,

        empleadoUid:
          payload.empleadoUid ||
          trabajo.empleadoDevolucionUid ||
          '',

        empleadoNombre:
          payload.empleadoNombre ||
          trabajo.empleadoDevolucionNombre ||
          '',

        leido: false,
        leida: false,
        eliminada: false,
        activa: true,

        createdAt: serverTimestamp()
      });
    });
  }

  private normalizarPayloadValidacion(
    data: ValidarDevolucionData | string,
    codigoIngresadoParametro: string
  ): ValidarDevolucionData {
    if (typeof data === 'string') {
      return {
        trabajoUid: String(data || '').trim(),
        codigoIngresado: String(codigoIngresadoParametro || '').trim(),
        origenValidacion: 'administrador',
        administradorUid: this.auth.currentUser?.uid || '',
        administradorNombre: 'Administrador'
      };
    }

    return {
      trabajoUid: String(data.trabajoUid || '').trim(),
      codigoIngresado: String(data.codigoIngresado || '').trim(),

      origenValidacion: data.origenValidacion || 'administrador',

      empleadoUid: String(data.empleadoUid || '').trim(),
      empleadoNombre: String(data.empleadoNombre || '').trim(),

      administradorUid: String(
        data.administradorUid ||
        this.auth.currentUser?.uid ||
        ''
      ).trim(),

      administradorNombre: String(
        data.administradorNombre ||
        'Administrador'
      ).trim()
    };
  }

  private obtenerValidador(
    payload: ValidarDevolucionData
  ): {
    uid: string;
    nombre: string;
  } {
    if (payload.origenValidacion === 'empleado') {
      return {
        uid: String(payload.empleadoUid || '').trim(),
        nombre: String(payload.empleadoNombre || 'Empleado').trim()
      };
    }

    return {
      uid: String(
        payload.administradorUid ||
        this.auth.currentUser?.uid ||
        ''
      ).trim(),

      nombre: String(
        payload.administradorNombre ||
        'Administrador'
      ).trim()
    };
  }

  private obtenerMaterialUid(material: any): string {
    return String(
      material?.materialUid ||
      material?.uid ||
      material?.id ||
      material?.materialId ||
      ''
    ).trim();
  }

  private obtenerCantidadAsignada(material: any): number {
    return Number(
      material?.cantidadAsignada ??
      material?.cantidad ??
      material?.cantidadEntregada ??
      0
    ) || 0;
  }

  private obtenerCantidadUsada(material: any): number {
    return Number(
      material?.cantidadUsada ??
      material?.usado ??
      0
    ) || 0;
  }

  private obtenerCantidadDevuelta(material: any): number {
    /*
      Regla clave:
      Para devolver stock se usa SOLO cantidadDevuelta.
      Nunca se usa cantidadAsignada como respaldo.
    */
    return Number(material?.cantidadDevuelta ?? 0) || 0;
  }

  private obtenerCodigoTrabajo(trabajo: any): string {
    const codigoGuardado = String(
      trabajo?.codigoSeguimiento ||
      trabajo?.codigoTrabajo ||
      trabajo?.codigo ||
      trabajo?.numero ||
      ''
    ).trim();

    if (/^T-\d{5}$/i.test(codigoGuardado)) {
      return codigoGuardado.toUpperCase();
    }

    const id = String(trabajo?.id || '').trim();

    if (/^T-\d{5}$/i.test(id)) {
      return id.toUpperCase();
    }

    const base = String(
      trabajo?.uid ||
      trabajo?.id ||
      trabajo?.clienteNombre ||
      'TRABAJO'
    );

    const numero = this.generarNumeroDesdeTexto(base);

    return `T-${numero.toString().padStart(5, '0')}`;
  }

  private generarNumeroDesdeTexto(texto: string): number {
    let hash = 0;

    for (let i = 0; i < texto.length; i++) {
      hash = ((hash << 5) - hash) + texto.charCodeAt(i);
      hash |= 0;
    }

    return Math.abs(hash) % 100000;
  }
}