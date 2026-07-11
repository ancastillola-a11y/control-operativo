// src/app/dao/dashboard-empleado.dao.ts
import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  runTransaction,
  serverTimestamp,
  updateDoc
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';

import {
  catchError,
  map
} from 'rxjs/operators';

import {
  DashboardEmpleadoUsuario,
  DashboardTrabajoEmpleado
} from '../modelos/dashboard-empleado';

import { Empleado } from '../modelos/empleado';

import {
  EstadoTrabajo,
  FinalizarTrabajoData,
  RegistrarDevolucionTrabajoData,
  Trabajo,
  TrabajoEmpleadoAsignado,
  TrabajoMaterialAsignado
} from '../modelos/trabajo';

@Injectable({
  providedIn: 'root'
})
export class DashboardEmpleadoDAO {
  private firestore = inject(Firestore);

  obtenerEmpleadoActual$(
    uid: string
  ): Observable<DashboardEmpleadoUsuario> {
    const uidLimpio = String(uid || '').trim();

    if (!uidLimpio) {
      return of(this.crearEmpleadoVacio());
    }

    const ref = doc(this.firestore, 'usuarios', uidLimpio);

    return docData(ref, { idField: 'id' }).pipe(
      map((data: any) =>
        this.mapearEmpleado(uidLimpio, data || {})
      ),
      catchError((error) => {
        console.error('[DashboardEmpleadoDAO] Error obteniendo empleado:', error);
        return of(this.crearEmpleadoVacio(uidLimpio));
      })
    );
  }

  escucharTrabajosAsignados$(
    empleadoUid: string
  ): Observable<DashboardTrabajoEmpleado[]> {
    const uidLimpio = String(empleadoUid || '').trim();

    if (!uidLimpio) {
      return of([]);
    }

    const ref = collection(this.firestore, 'trabajos');

    return collectionData(ref, { idField: 'id' }).pipe(
      map((items: any[]) =>
        (items || [])
          .filter((trabajo) => trabajo?.eliminado !== true)
          .filter((trabajo) =>
            this.trabajoPerteneceAlEmpleado(trabajo, uidLimpio)
          )
          .map((trabajo) => this.mapearTrabajo(trabajo))
          .sort((a, b) => {
            const ordenEstado =
              this.ordenEstado(a.estado) - this.ordenEstado(b.estado);

            if (ordenEstado !== 0) {
              return ordenEstado;
            }

            return this.obtenerFechaOrden(a) - this.obtenerFechaOrden(b);
          })
      ),
      catchError((error) => {
        console.error('[DashboardEmpleadoDAO] Error obteniendo trabajos asignados:', error);
        return of([]);
      })
    );
  }

  async actualizarEstadoTrabajo(
    trabajo: DashboardTrabajoEmpleado,
    nuevoEstado: EstadoTrabajo,
    empleado: DashboardEmpleadoUsuario
  ): Promise<void> {
    const trabajoUid = String(trabajo.uid || trabajo.id || '').trim();

    if (!trabajoUid) {
      throw new Error('trabajo-uid-vacio');
    }

    const ref = doc(this.firestore, 'trabajos', trabajoUid);

    const payload: any = {
      estado: nuevoEstado,
      actualizadoPorUid: empleado.uid,
      actualizadoPorNombre: empleado.nombreCompleto || empleado.usuario || 'Empleado',
      updatedAt: serverTimestamp()
    };

    if (nuevoEstado === 'en_camino') {
      payload.enCaminoPorUid = empleado.uid;
      payload.enCaminoPorNombre = empleado.nombreCompleto || empleado.usuario || 'Empleado';
      payload.enCaminoAt = serverTimestamp();
    }

    if (nuevoEstado === 'en_proceso') {
      payload.iniciadoPorUid = empleado.uid;
      payload.iniciadoPorNombre = empleado.nombreCompleto || empleado.usuario || 'Empleado';
      payload.iniciadoAt = serverTimestamp();
    }

    await updateDoc(ref, payload);

    await this.registrarHistorialCambioEstado(
      trabajo,
      nuevoEstado,
      empleado
    ).catch((error) => {
      console.warn('[DashboardEmpleadoDAO] No se pudo registrar historial:', error);
    });

    await this.notificarAdministradorCambioEstado(
      trabajo,
      nuevoEstado,
      empleado
    ).catch((error) => {
      console.warn('[DashboardEmpleadoDAO] No se pudo notificar al administrador:', error);
    });
  }

  async finalizarTrabajoEmpleado(
    data: FinalizarTrabajoData
  ): Promise<void> {
    const trabajoUid = String(data.trabajoUid || '').trim();

    if (!trabajoUid) {
      throw new Error('trabajo-uid-vacio');
    }

    const trabajoRef = doc(this.firestore, 'trabajos', trabajoUid);

    await runTransaction(this.firestore, async (transaction) => {
      const trabajoSnap = await transaction.get(trabajoRef);

      if (!trabajoSnap.exists()) {
        throw new Error('trabajo-no-existe');
      }

      const trabajo: any = trabajoSnap.data();

      if (trabajo.estado !== 'en_proceso') {
        throw new Error('trabajo-no-en-proceso');
      }

      const materialesOriginales = Array.isArray(trabajo.materialesAsignados)
        ? trabajo.materialesAsignados
        : [];

      if (materialesOriginales.length === 0) {
        throw new Error('sin-materiales-asignados');
      }

      const materialesUsados = Array.isArray(data.materialesUsados)
        ? data.materialesUsados
        : [];

      if (materialesUsados.length === 0) {
        throw new Error('materiales-usados-vacios');
      }

      const materialesActualizados: TrabajoMaterialAsignado[] =
        materialesOriginales.map((material: any) => {
          const materialUid = this.obtenerMaterialUid(material);
          const nombre = String(material.nombre || material.materialNombre || 'Material').trim();
          const cantidadAsignada = this.obtenerCantidadAsignada(material);

          const usado = materialesUsados.find((item) =>
            String(item.materialUid || '').trim() === materialUid
          );

          if (!materialUid) {
            throw new Error('material-sin-uid');
          }

          if (!usado) {
            throw new Error(`material-usado-faltante:${nombre}`);
          }

          const cantidadUsada = Number(usado.cantidadUsada || 0);

          if (
            !Number.isFinite(cantidadUsada) ||
            cantidadUsada < 0 ||
            cantidadUsada > cantidadAsignada
          ) {
            throw new Error(`cantidad-usada-invalida:${nombre}`);
          }

          const cantidadDevuelta = Math.max(
            cantidadAsignada - cantidadUsada,
            0
          );

          return {
            ...material,

            materialUid,
            nombre,
            categoria: String(material.categoria || 'Sin categoría').trim(),
            unidad: String(material.unidad || 'und').trim(),

            cantidadAsignada,
            cantidadUsada,
            cantidadDevuelta,

            devolucionValidada: false
          };
        });

      const haySobrantes = materialesActualizados.some((material) =>
        Number(material.cantidadDevuelta || 0) > 0
      );

      const nuevoEstado: EstadoTrabajo = haySobrantes
        ? 'devolucion_pendiente'
        : 'finalizado';

      transaction.update(trabajoRef, {
        estado: nuevoEstado,

        materialesAsignados: materialesActualizados,

        pagoEstado: data.pagoEstado,
        pagoConfirmado: data.pagoConfirmado === true,
        montoRecibido: Number(data.montoRecibido || 0),
        metodoPago: data.metodoPago,
        observacionPago: String(data.observacionPago || '').trim(),

        observacionFinalizacion: String(data.observacionFinalizacion || '').trim(),

        finalizadoPorUid: data.empleadoUid,
        finalizadoPorNombre: data.empleadoNombre,
        finalizadoAt: serverTimestamp(),

        devolucionRegistrada: haySobrantes,
        devolucionValidada: false,
        empleadoDevolucionUid: haySobrantes ? data.empleadoUid : '',
        empleadoDevolucionNombre: haySobrantes ? data.empleadoNombre : '',
        fechaDevolucionRegistrada: haySobrantes ? serverTimestamp() : null,

        actualizadoPorUid: data.empleadoUid,
        actualizadoPorNombre: data.empleadoNombre,
        updatedAt: serverTimestamp()
      });

      const historialRef = doc(
        collection(this.firestore, 'historial_actividades')
      );

      transaction.set(historialRef, {
        modulo: 'Panel empleado',
        accion: 'finalizar_trabajo',
        descripcion: haySobrantes
          ? `El empleado ${data.empleadoNombre} finalizó el trabajo y registró materiales sobrantes.`
          : `El empleado ${data.empleadoNombre} finalizó el trabajo sin materiales sobrantes.`,
        trabajoUid,
        codigoTrabajo: this.obtenerCodigoTrabajo({
          ...trabajo,
          uid: trabajoUid,
          id: trabajoUid
        }),
        empleadoUid: data.empleadoUid,
        empleadoNombre: data.empleadoNombre,
        pagoEstado: data.pagoEstado,
        montoRecibido: Number(data.montoRecibido || 0),
        metodoPago: data.metodoPago,
        materialesAsignados: materialesActualizados,
        createdAt: serverTimestamp()
      });

      const notificacionTrabajoRef = doc(
        collection(this.firestore, 'notificaciones_admin')
      );

      transaction.set(notificacionTrabajoRef, {
        titulo: 'Trabajo finalizado',
        mensaje: `${data.empleadoNombre} finalizó un trabajo.`,
        detalle: haySobrantes
          ? 'El trabajo tiene materiales sobrantes pendientes de devolución.'
          : 'El trabajo fue finalizado sin devolución pendiente.',
        tipo: 'trabajo_finalizado',
        ruta: haySobrantes ? '/devoluciones' : '/seguimiento-trabajos',
        referenciaUid: trabajoUid,
        trabajoUid,
        codigoTrabajo: this.obtenerCodigoTrabajo({
          ...trabajo,
          uid: trabajoUid,
          id: trabajoUid
        }),
        empleadoUid: data.empleadoUid,
        empleadoNombre: data.empleadoNombre,
        leido: false,
        leida: false,
        eliminada: false,
        activa: true,
        createdAt: serverTimestamp()
      });
    });
  }

  async validarDevolucionEmpleado(
    data: RegistrarDevolucionTrabajoData
  ): Promise<void> {
    const trabajoUid = String(data.trabajoUid || '').trim();

    if (!trabajoUid) {
      throw new Error('trabajo-uid-vacio');
    }

    const codigoIngresado = String(data.codigoDevolucionIngresado || '').trim();

    if (!codigoIngresado) {
      throw new Error('codigo-devolucion-vacio');
    }

    const materialesDevueltos = Array.isArray(data.materialesDevueltos)
      ? data.materialesDevueltos
      : [];

    if (materialesDevueltos.length === 0) {
      throw new Error('sin-materiales-devolver');
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
        trabajo.estado !== 'finalizado'
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

      const stockRetornoPorMaterial: Record<string, {
        stockAntes: number;
        stockDespues: number;
      }> = {};

      let totalDevuelto = 0;

      for (const devuelto of materialesDevueltos) {
        const materialUid = String(devuelto.materialUid || '').trim();
        const cantidadDevuelta = Number(devuelto.cantidadDevuelta || 0);

        if (!materialUid || cantidadDevuelta <= 0) {
          continue;
        }

        const materialOriginal = materialesOriginales.find((material: any) =>
          this.obtenerMaterialUid(material) === materialUid
        );

        if (!materialOriginal) {
          throw new Error(`material-devolucion-no-asignado:${devuelto.nombre}`);
        }

        const nombre = String(
          devuelto.nombre ||
          materialOriginal.nombre ||
          'Material'
        ).trim();

        const cantidadAsignada = Number(
          materialOriginal.cantidadAsignada ??
          devuelto.cantidadAsignada ??
          0
        );

        const cantidadUsada = Number(
          materialOriginal.cantidadUsada ??
          devuelto.cantidadUsada ??
          0
        );

        const sobranteMaximo = Math.max(
          cantidadAsignada - cantidadUsada,
          0
        );

        if (
          !Number.isFinite(cantidadAsignada) ||
          !Number.isFinite(cantidadUsada) ||
          !Number.isFinite(cantidadDevuelta)
        ) {
          throw new Error(`cantidad-devolucion-invalida:${nombre}`);
        }

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
          cantidad: cantidadDevuelta,

          stockAntes,
          stockDespues,

          moduloOrigen: 'devolucion_materiales',
          trabajoUid,
          codigoTrabajo: this.obtenerCodigoTrabajo({
            ...trabajo,
            uid: trabajoUid,
            id: trabajoUid
          }),

          descripcion: `Entrada por devolución de materiales del trabajo ${this.obtenerCodigoTrabajo({
            ...trabajo,
            uid: trabajoUid,
            id: trabajoUid
          })}.`,

          realizadoPorUid: data.empleadoUid,
          realizadoPorNombre: data.empleadoNombre,

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

      const materialesActualizados: TrabajoMaterialAsignado[] =
        materialesOriginales.map((material: any) => {
          const materialUid = this.obtenerMaterialUid(material);

          const devuelto = materialesDevueltos.find((item) =>
            String(item.materialUid || '').trim() === materialUid
          );

          if (!devuelto) {
            return {
              ...material,
              materialUid,
              cantidadUsada: Number(material.cantidadUsada || 0),
              cantidadDevuelta: Number(material.cantidadDevuelta || 0),
              devolucionValidada:
                Number(material.cantidadDevuelta || 0) > 0
                  ? material.devolucionValidada === true
                  : true
            };
          }

          const stockRetorno = stockRetornoPorMaterial[materialUid];

          return {
            ...material,

            materialUid,

            nombre: material.nombre || devuelto.nombre || 'Material',
            unidad: material.unidad || devuelto.unidad || 'und',

            cantidadAsignada: Number(
              material.cantidadAsignada ??
              devuelto.cantidadAsignada ??
              0
            ),

            cantidadUsada: Number(
              material.cantidadUsada ??
              devuelto.cantidadUsada ??
              0
            ),

            cantidadDevuelta: Number(devuelto.cantidadDevuelta || 0),

            stockRetornoAntes: stockRetorno?.stockAntes ?? null,
            stockRetornoDespues: stockRetorno?.stockDespues ?? null,

            devolucionValidada: true
          };
        });

      transaction.update(trabajoRef, {
        estado: 'devolucion_realizada',

        materialesAsignados: materialesActualizados,

        devolucionRegistrada: true,
        devolucionValidada: true,

        empleadoDevolucionUid: data.empleadoUid,
        empleadoDevolucionNombre: data.empleadoNombre,

        fechaDevolucionValidada: serverTimestamp(),

        actualizadoPorUid: data.empleadoUid,
        actualizadoPorNombre: data.empleadoNombre,
        updatedAt: serverTimestamp()
      });

      const historialRef = doc(
        collection(this.firestore, 'historial_actividades')
      );

      transaction.set(historialRef, {
        modulo: 'Panel empleado',
        accion: 'devolucion_realizada',
        descripcion: `El empleado ${data.empleadoNombre} validó la devolución de materiales con código.`,
        trabajoUid,
        codigoTrabajo: this.obtenerCodigoTrabajo({
          ...trabajo,
          uid: trabajoUid,
          id: trabajoUid
        }),
        empleadoUid: data.empleadoUid,
        empleadoNombre: data.empleadoNombre,
        materialesDevueltos,
        totalDevuelto,
        createdAt: serverTimestamp()
      });

      const notificacionRef = doc(
        collection(this.firestore, 'notificaciones_admin')
      );

      transaction.set(notificacionRef, {
        titulo: 'Devolución realizada',
        mensaje: `${data.empleadoNombre} devolvió materiales sobrantes.`,
        detalle: 'El stock fue actualizado mediante código de devolución.',
        tipo: 'devolucion_realizada',
        ruta: '/devoluciones',
        referenciaUid: trabajoUid,
        trabajoUid,
        codigoTrabajo: this.obtenerCodigoTrabajo({
          ...trabajo,
          uid: trabajoUid,
          id: trabajoUid
        }),
        empleadoUid: data.empleadoUid,
        empleadoNombre: data.empleadoNombre,
        leido: false,
        leida: false,
        eliminada: false,
        activa: true,
        createdAt: serverTimestamp()
      });
    });
  }

  private trabajoPerteneceAlEmpleado(
    trabajo: any,
    empleadoUid: string
  ): boolean {
    const empleados = Array.isArray(trabajo?.empleadosAsignados)
      ? trabajo.empleadosAsignados
      : [];

    return empleados.some((empleado: TrabajoEmpleadoAsignado) =>
      String(empleado?.uid || '').trim() === empleadoUid
    );
  }

  private mapearEmpleado(
    uid: string,
    data: any
  ): DashboardEmpleadoUsuario {
    const nombres = String(data.nombres || '').trim();
    const apellidos = String(data.apellidos || '').trim();

    const nombreCompleto = String(
      data.nombreCompleto ||
      `${nombres} ${apellidos}`.trim() ||
      data.usuario ||
      'Empleado'
    ).trim();

    const rol = String(data.rol || '').trim().toLowerCase();

    const empleado: DashboardEmpleadoUsuario = {
      ...(data as Empleado),

      id: String(data.id || uid).trim(),
      uid: String(data.uid || uid).trim(),

      nombres,
      apellidos,
      nombreCompleto,

      usuario: String(data.usuario || '').trim(),
      correo: String(data.correo || '').trim().toLowerCase(),
      correoAuth: String(data.correoAuth || data.correo || '').trim().toLowerCase(),

      dni: String(data.dni || '').trim(),
      telefono: String(data.telefono || '').trim(),
      cargo: String(data.cargo || 'Personal operativo').trim(),

      rol: 'empleado',

      habilitado: data.habilitado !== false,
      activo: data.activo !== false,
      estado: data.estado !== false,
      eliminado: data.eliminado === true,

      fotoUrl: String(data.fotoUrl || '').trim(),

      iniciales: this.obtenerIniciales(nombreCompleto),
      cargoTexto: String(data.cargo || 'Personal operativo').trim(),

      accesoValido:
        rol === 'empleado' &&
        data.eliminado !== true &&
        data.habilitado !== false &&
        data.activo !== false &&
        data.estado !== false
    };

    return empleado;
  }

  private mapearTrabajo(data: any): DashboardTrabajoEmpleado {
    const id = String(data.id || '').trim();
    const uid = String(data.uid || id).trim();

    const estado = this.normalizarEstado(data.estado);
    const fechaProgramada = String(data.fechaProgramada || '').trim();
    const horaProgramada = String(data.horaProgramada || '').trim();

    const subtotal = Number(data.subtotal || 0);

    const materialesAsignados = Array.isArray(data.materialesAsignados)
      ? data.materialesAsignados
      : [];

    const trabajo: DashboardTrabajoEmpleado = {
      ...(data as Trabajo),

      id,
      uid,

      clienteNombre: String(data.clienteNombre || 'Sin cliente').trim(),
      clienteTelefono: String(data.clienteTelefono || '').trim(),

      direccion: String(data.direccion || '').trim(),
      referencia: String(data.referencia || '').trim(),

      latitud: data.latitud ?? null,
      longitud: data.longitud ?? null,
      direccionMapa: String(data.direccionMapa || '').trim(),
      ubicacionTextoOriginal: String(data.ubicacionTextoOriginal || '').trim(),

      tipoTrabajo: String(data.tipoTrabajo || 'Trabajo').trim(),
      descripcion: String(data.descripcion || '').trim(),

      fechaProgramada,
      horaProgramada,

      subtotal,

      empleadosAsignados: Array.isArray(data.empleadosAsignados)
        ? data.empleadosAsignados
        : [],

      materialesAsignados,

      codigoCliente: String(data.codigoCliente || '').trim(),

      /*
        Importante:
        El empleado NO debe ver libremente el código de devolución.
        Solo debe ingresarlo cuando el administrador o almacén se lo entregue.
      */
      codigoDevolucion: '',

      estado,

      activo: data.activo !== false,
      eliminado: data.eliminado === true,

      pagoEstado: data.pagoEstado,
      pagoConfirmado: data.pagoConfirmado === true,
      montoRecibido: Number(data.montoRecibido || 0),
      metodoPago: data.metodoPago,
      observacionPago: String(data.observacionPago || '').trim(),
      observacionFinalizacion: String(data.observacionFinalizacion || '').trim(),

      devolucionRegistrada: data.devolucionRegistrada === true,
      devolucionValidada: data.devolucionValidada === true,

      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      canceledAt: data.canceledAt,

      codigoTrabajo: this.obtenerCodigoTrabajo({
        ...data,
        id,
        uid
      }),

      estadoTexto: this.obtenerEstadoTexto(estado),
      estadoClase: this.obtenerEstadoClase(estado),

      fechaHoraTexto: this.obtenerFechaHoraTexto(
        fechaProgramada,
        horaProgramada
      ),

      subtotalTexto: this.formatearSoles(subtotal),

      direccionTexto: this.obtenerDireccionTexto(data),

      materialesTexto: materialesAsignados.length
        ? materialesAsignados
            .map((material: any) => {
              const asignada = Number(material.cantidadAsignada || 0);
              const usada = Number(material.cantidadUsada || 0);
              const devuelta = Number(material.cantidadDevuelta || 0);

              if (usada || devuelta) {
                return `${material.nombre || 'Material'} (${asignada} ${material.unidad || 'und.'}, usado: ${usada}, sobrante: ${devuelta})`;
              }

              return `${material.nombre || 'Material'} (${asignada} ${material.unidad || 'und.'})`;
            })
            .join(', ')
        : 'Sin materiales registrados',

      puedeMarcarEnCamino: estado === 'pendiente',
      puedeIniciar: estado === 'en_camino',
      puedeFinalizar: estado === 'en_proceso',

      tieneTelefono: !!String(data.clienteTelefono || '').trim(),

      tieneMapa:
        !!Number(data.latitud || 0) &&
        !!Number(data.longitud || 0)
    };

    return trabajo;
  }

  private async registrarHistorialCambioEstado(
    trabajo: DashboardTrabajoEmpleado,
    nuevoEstado: EstadoTrabajo,
    empleado: DashboardEmpleadoUsuario
  ): Promise<void> {
    const ref = collection(this.firestore, 'historial_actividades');

    await addDoc(ref, {
      modulo: 'Panel empleado',
      accion: `cambio_estado_${nuevoEstado}`,
      descripcion: `${empleado.nombreCompleto} actualizó el trabajo ${trabajo.codigoTrabajo} a ${this.obtenerEstadoTexto(nuevoEstado)}.`,
      trabajoUid: trabajo.uid,
      codigoTrabajo: trabajo.codigoTrabajo,
      empleadoUid: empleado.uid,
      empleadoNombre: empleado.nombreCompleto,
      createdAt: serverTimestamp()
    });
  }

  private async notificarAdministradorCambioEstado(
    trabajo: DashboardTrabajoEmpleado,
    nuevoEstado: EstadoTrabajo,
    empleado: DashboardEmpleadoUsuario
  ): Promise<void> {
    const ref = collection(this.firestore, 'notificaciones_admin');

    await addDoc(ref, {
      titulo: 'Actualización de trabajo',
      mensaje: `${empleado.nombreCompleto} actualizó un trabajo.`,
      detalle: `${trabajo.codigoTrabajo} - ${trabajo.clienteNombre} cambió a ${this.obtenerEstadoTexto(nuevoEstado)}.`,
      tipo: 'cambio_estado_trabajo',
      ruta: '/seguimiento-trabajos',
      referenciaUid: trabajo.uid,
      trabajoUid: trabajo.uid,
      codigoTrabajo: trabajo.codigoTrabajo,
      empleadoUid: empleado.uid,
      empleadoNombre: empleado.nombreCompleto,
      leido: false,
      leida: false,
      eliminada: false,
      activa: true,
      createdAt: serverTimestamp()
    });
  }

  private normalizarEstado(valor: any): EstadoTrabajo {
    const estado = String(valor || '').trim();

    if (estado === 'enCamino') {
      return 'en_camino';
    }

    if (estado === 'enProceso') {
      return 'en_proceso';
    }

    if (estado === 'devolucionPendiente') {
      return 'devolucion_pendiente';
    }

    if (estado === 'devolucionRealizada') {
      return 'devolucion_realizada';
    }

    const estadosValidos: EstadoTrabajo[] = [
      'pendiente',
      'en_camino',
      'en_proceso',
      'finalizado',
      'devolucion_pendiente',
      'devolucion_realizada',
      'cerrado',
      'cancelado'
    ];

    return estadosValidos.includes(estado as EstadoTrabajo)
      ? estado as EstadoTrabajo
      : 'pendiente';
  }

  private obtenerEstadoTexto(estado: EstadoTrabajo): string {
    const mapa: Record<EstadoTrabajo, string> = {
      pendiente: 'Pendiente',
      en_camino: 'En camino',
      en_proceso: 'En proceso',
      finalizado: 'Finalizado',
      devolucion_pendiente: 'Devolución pendiente',
      devolucion_realizada: 'Devolución realizada',
      cerrado: 'Cerrado',
      cancelado: 'Cancelado'
    };

    return mapa[estado] || 'Pendiente';
  }

  private obtenerEstadoClase(estado: EstadoTrabajo): string {
    if (estado === 'pendiente') {
      return 'pendiente';
    }

    if (estado === 'en_camino' || estado === 'en_proceso') {
      return 'proceso';
    }

    if (
      estado === 'finalizado' ||
      estado === 'devolucion_realizada' ||
      estado === 'cerrado'
    ) {
      return 'finalizado';
    }

    if (estado === 'devolucion_pendiente') {
      return 'devolucion_pendiente';
    }

    if (estado === 'cancelado') {
      return 'cancelado';
    }

    return 'pendiente';
  }

  private ordenEstado(estado: EstadoTrabajo): number {
    const mapa: Record<EstadoTrabajo, number> = {
      en_proceso: 1,
      en_camino: 2,
      pendiente: 3,
      devolucion_pendiente: 4,
      finalizado: 5,
      devolucion_realizada: 6,
      cerrado: 7,
      cancelado: 8
    };

    return mapa[estado] || 99;
  }

  private obtenerFechaOrden(trabajo: DashboardTrabajoEmpleado): number {
    const fecha = String(trabajo.fechaProgramada || '').trim();
    const hora = String(trabajo.horaProgramada || '00:00').trim();

    const timestamp = new Date(`${fecha}T${hora}`).getTime();

    if (!Number.isNaN(timestamp)) {
      return timestamp;
    }

    return 0;
  }

  private obtenerFechaHoraTexto(
    fecha: string,
    hora: string
  ): string {
    const fechaTexto = String(fecha || '').trim();
    const horaTexto = String(hora || '').trim();

    if (!fechaTexto && !horaTexto) {
      return 'Sin fecha programada';
    }

    if (!fechaTexto) {
      return horaTexto;
    }

    if (!horaTexto) {
      return fechaTexto;
    }

    return `${fechaTexto} - ${horaTexto}`;
  }

  private obtenerDireccionTexto(data: any): string {
    const direccionMapa = String(data.direccionMapa || '').trim();
    const direccion = String(data.direccion || '').trim();
    const ubicacionOriginal = String(data.ubicacionTextoOriginal || '').trim();

    return direccionMapa || direccion || ubicacionOriginal || 'Sin dirección';
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

  private obtenerIniciales(nombre: string): string {
    const partes = String(nombre || 'Empleado')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    return partes
      .slice(0, 2)
      .map((parte) => parte.charAt(0).toUpperCase())
      .join('') || 'EM';
  }

  private formatearSoles(valor: number): string {
    return `S/ ${Number(valor || 0).toFixed(2)}`;
  }

  private crearEmpleadoVacio(uid = ''): DashboardEmpleadoUsuario {
    return {
      uid,
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
  }
}