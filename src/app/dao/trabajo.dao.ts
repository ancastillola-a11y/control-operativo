// src/app/dao/trabajo.dao.ts
import { Injectable, inject } from '@angular/core';

import { Auth } from '@angular/fire/auth';

import {
  Firestore,
  collection,
  doc,
  getDocs,
  runTransaction,
  serverTimestamp,
  updateDoc
} from '@angular/fire/firestore';

import {
  CerrarTrabajoData,
  EstadoTrabajo,
  Trabajo,
  TrabajoEmpleadoAsignado,
  TrabajoEmpleadoDisponible,
  TrabajoMaterialAsignado,
  TrabajoMaterialDisponible
} from '../modelos/trabajo';

@Injectable({
  providedIn: 'root'
})
export class TrabajoDAO {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  async obtenerTrabajosUnaVez(): Promise<Trabajo[]> {
    const ref = collection(this.firestore, 'trabajos');
    const snapshot = await getDocs(ref);

    return snapshot.docs
      .map((documento) =>
        this.mapearTrabajoDocumento(
          documento.id,
          documento.data()
        )
      )
      .filter((trabajo) => trabajo.eliminado !== true);
  }

  async obtenerTrabajos(): Promise<Trabajo[]> {
    return await this.obtenerTrabajosUnaVez();
  }

  async obtenerEmpleadosDisponiblesUnaVez(): Promise<TrabajoEmpleadoDisponible[]> {
    const ref = collection(this.firestore, 'usuarios');
    const snapshot = await getDocs(ref);

    return snapshot.docs
      .map((documento) => {
        const data: any = documento.data();

        const nombres = String(data.nombres || '').trim();
        const apellidos = String(data.apellidos || '').trim();

        const nombreCompleto = String(
          data.nombreCompleto ||
          `${nombres} ${apellidos}`.trim() ||
          data.usuario ||
          'Empleado'
        ).trim();

        const rol = String(data.rol || '').trim().toLowerCase();

        const item: TrabajoEmpleadoDisponible = {
          uid: String(data.uid || documento.id).trim(),

          nombreCompleto,

          usuario: String(data.usuario || '').trim(),

          cargo: String(
            data.cargo ||
            'Personal operativo'
          ).trim(),

          iniciales: this.obtenerIniciales(nombreCompleto)
        };

        return {
          ...item,
          rol,
          eliminado: data.eliminado === true,
          habilitado: data.habilitado !== false,
          activo: data.activo !== false,
          estado: data.estado !== false
        } as any;
      })
      .filter((empleado: any) =>
        empleado.rol === 'empleado' &&
        empleado.eliminado !== true &&
        empleado.habilitado !== false &&
        empleado.activo !== false &&
        empleado.estado !== false
      )
      .map((empleado: any) => ({
        uid: empleado.uid,
        nombreCompleto: empleado.nombreCompleto,
        usuario: empleado.usuario,
        cargo: empleado.cargo,
        iniciales: empleado.iniciales
      }))
      .sort((a, b) =>
        a.nombreCompleto.localeCompare(b.nombreCompleto)
      );
  }

  async obtenerEmpleadosDisponibles(): Promise<TrabajoEmpleadoDisponible[]> {
    return await this.obtenerEmpleadosDisponiblesUnaVez();
  }

  async obtenerMaterialesDisponiblesUnaVez(): Promise<TrabajoMaterialDisponible[]> {
    const ref = collection(this.firestore, 'materiales');
    const snapshot = await getDocs(ref);

    return snapshot.docs
      .map((documento) => {
        const data: any = documento.data();

        const nombre = String(
          data.nombre ||
          data.materialNombre ||
          'Material'
        ).trim();

        const stockActual = Number(
          data.stockActual ??
          data.cantidadDisponible ??
          data.cantidad ??
          0
        );

        const stockMinimo = Number(
          data.stockMinimo ??
          data.stock_minimo ??
          0
        );

        const item: TrabajoMaterialDisponible = {
          uid: String(data.uid || documento.id).trim(),

          nombre,

          categoria: String(
            data.categoria ||
            'Sin categoría'
          ).trim(),

          unidad: String(
            data.unidad ||
            'und'
          ).trim(),

          stockActual,
          stockMinimo,

          precioUnitario: Number(
            data.precioUnitario ??
            data.precio ??
            0
          ),

          imagenUrl: String(data.imagenUrl || '').trim(),

          iniciales: this.obtenerIniciales(nombre)
        };

        return {
          ...item,
          eliminado: data.eliminado === true,
          activo: data.activo !== false
        } as any;
      })
      .filter((material: any) =>
        material.eliminado !== true &&
        material.activo !== false
      )
      .map((material: any) => ({
        uid: material.uid,
        nombre: material.nombre,
        categoria: material.categoria,
        unidad: material.unidad,
        stockActual: material.stockActual,
        stockMinimo: material.stockMinimo,
        precioUnitario: material.precioUnitario,
        imagenUrl: material.imagenUrl,
        iniciales: material.iniciales
      }))
      .sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      );
  }

  async obtenerMaterialesDisponibles(): Promise<TrabajoMaterialDisponible[]> {
    return await this.obtenerMaterialesDisponiblesUnaVez();
  }

  async crearTrabajoConAsignacion(
    trabajo: Trabajo
  ): Promise<string> {
    const actor = this.obtenerActorActual();

    const trabajoRef = doc(
      collection(this.firestore, 'trabajos')
    );

    const trabajoUid = trabajoRef.id;

    const materialesAsignados = this.normalizarMaterialesAsignados(
      trabajo.materialesAsignados || []
    );

    if (materialesAsignados.length === 0) {
      throw new Error('sin-materiales-asignados');
    }

    const empleadosAsignados = this.normalizarEmpleadosAsignados(
      trabajo.empleadosAsignados || []
    );

    if (empleadosAsignados.length === 0) {
      throw new Error('sin-empleados-asignados');
    }

    await runTransaction(this.firestore, async (transaction) => {
      const gruposMateriales = this.agruparMaterialesParaStock(
        materialesAsignados
      );

      const lecturasStock = [];

      for (const grupo of gruposMateriales) {
        const materialRef = doc(
          this.firestore,
          'materiales',
          grupo.materialUid
        );

        const materialSnap = await transaction.get(materialRef);

        if (!materialSnap.exists()) {
          throw new Error(`material-no-existe:${grupo.nombre}`);
        }

        const materialData: any = materialSnap.data();

        const stockAntes = Number(
          materialData.stockActual ??
          materialData.cantidadDisponible ??
          materialData.cantidad ??
          0
        );

        const stockMinimo = Number(
          materialData.stockMinimo ??
          materialData.stock_minimo ??
          0
        );

        if (grupo.cantidad > stockAntes) {
          throw new Error(`stock-insuficiente:${grupo.nombre}`);
        }

        lecturasStock.push({
          ...grupo,
          materialRef,
          materialData,
          stockAntes,
          stockDespues: stockAntes - grupo.cantidad,
          stockMinimo
        });
      }

      const codigoTrabajo = this.obtenerCodigoTrabajo(
        trabajo,
        trabajoUid
      );

      const stockPorMaterial: Record<string, {
        stockAntes: number;
        stockDespues: number;
      }> = {};

      for (const lectura of lecturasStock) {
        transaction.update(lectura.materialRef, {
          stockActual: lectura.stockDespues,
          cantidadDisponible: lectura.stockDespues,
          stockBajo:
            lectura.stockMinimo > 0 &&
            lectura.stockDespues <= lectura.stockMinimo,
          updatedAt: serverTimestamp()
        });

        stockPorMaterial[lectura.materialUid] = {
          stockAntes: lectura.stockAntes,
          stockDespues: lectura.stockDespues
        };

        const movimientoRef = doc(
          collection(this.firestore, 'movimientos_materiales')
        );

        transaction.set(movimientoRef, {
          materialUid: lectura.materialUid,
          materialNombre: lectura.nombre,

          tipoMovimiento: 'salida',
          tipo: 'salida',

          cantidad: lectura.cantidad,

          stockAntes: lectura.stockAntes,
          stockDespues: lectura.stockDespues,

          moduloOrigen: 'asignacion_trabajo',

          trabajoUid,
          codigoTrabajo,

          unidad: lectura.unidad,

          descripcion:
            `Salida de ${lectura.cantidad} ${lectura.unidad} de ${lectura.nombre} por asignación al trabajo ${codigoTrabajo}.`,

          realizadoPorUid: actor.uid,
          realizadoPorNombre: actor.nombre,

          createdAt: serverTimestamp()
        });
      }

      const materialesConStock = materialesAsignados.map((material) => {
        const stock = stockPorMaterial[material.materialUid];

        return {
          ...material,

          stockAntes: stock?.stockAntes ?? material.stockAntes ?? 0,
          stockDespues: stock?.stockDespues ?? material.stockDespues ?? 0,

          cantidadUsada: 0,
          cantidadDevuelta: 0,
          devolucionValidada: false
        };
      });

      transaction.set(trabajoRef, {
        ...trabajo,

        id: trabajoUid,
        uid: trabajoUid,

        codigoTrabajo,

        clienteNombre: String(trabajo.clienteNombre || '').trim(),
        clienteTelefono: String(trabajo.clienteTelefono || '').trim(),

        direccion: String(trabajo.direccion || '').trim(),
        referencia: String(trabajo.referencia || '').trim(),

        latitud: trabajo.latitud ?? null,
        longitud: trabajo.longitud ?? null,
        direccionMapa: String(trabajo.direccionMapa || '').trim(),
        ubicacionTextoOriginal: String(
          trabajo.ubicacionTextoOriginal || ''
        ).trim(),

        tipoTrabajo: String(trabajo.tipoTrabajo || '').trim(),
        descripcion: String(trabajo.descripcion || '').trim(),

        fechaProgramada: String(trabajo.fechaProgramada || '').trim(),
        horaProgramada: String(trabajo.horaProgramada || '').trim(),

        subtotal: Number(trabajo.subtotal || 0),

        empleadosAsignados,
        materialesAsignados: materialesConStock,

        codigoCliente:
          String(trabajo.codigoCliente || '').trim() ||
          this.generarCodigoSimple('CL'),

        codigoDevolucion:
          String(trabajo.codigoDevolucion || '').trim() ||
          this.generarCodigoSimple('DV'),

        estado: 'pendiente',

        pagoEstado: trabajo.pagoEstado || 'pendiente',
        pagoConfirmado: trabajo.pagoConfirmado === true,
        montoRecibido: Number(trabajo.montoRecibido || 0),
        metodoPago: trabajo.metodoPago || 'Otro',

        devolucionRegistrada: false,
        devolucionValidada: false,

        stockDescontadoAsignacion: true,
        stockRevertidoCancelacion: false,

        activo: true,
        eliminado: false,

        creadoPorUid: trabajo.creadoPorUid || actor.uid,
        creadoPorNombre: actor.nombre,

        actualizadoPorUid: actor.uid,
        actualizadoPorNombre: actor.nombre,

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      const historialRef = doc(
        collection(this.firestore, 'historial_actividades')
      );

      transaction.set(historialRef, {
        modulo: 'Trabajos',
        accion: 'crear_trabajo',
        descripcion:
          `Se creó el trabajo ${codigoTrabajo} y se descontó el stock asignado.`,

        trabajoUid,
        codigoTrabajo,

        clienteNombre: trabajo.clienteNombre,
        tipoTrabajo: trabajo.tipoTrabajo,

        empleadosAsignados,
        materialesAsignados: materialesConStock,

        realizadoPorUid: actor.uid,
        realizadoPorNombre: actor.nombre,

        createdAt: serverTimestamp()
      });

      for (const empleado of empleadosAsignados) {
        const notificacionRef = doc(
          collection(this.firestore, 'notificaciones_empleado')
        );

        transaction.set(notificacionRef, {
          titulo: 'Nuevo trabajo asignado',
          mensaje: `Tienes un nuevo trabajo asignado: ${codigoTrabajo}.`,
          detalle:
            `${trabajo.clienteNombre} · ${trabajo.tipoTrabajo} · ${trabajo.fechaProgramada} ${trabajo.horaProgramada}`,

          tipo: 'trabajo_asignado',
          ruta: '/dashboard-empleado',

          referenciaUid: trabajoUid,
          trabajoUid,
          codigoTrabajo,

          empleadoUid: empleado.uid,
          empleadoNombre: empleado.nombreCompleto,

          leido: false,
          leida: false,
          eliminada: false,
          activa: true,

          createdAt: serverTimestamp()
        });
      }
    });

    return trabajoUid;
  }

  async crearTrabajo(
    trabajo: Trabajo
  ): Promise<string> {
    return await this.crearTrabajoConAsignacion(trabajo);
  }

  async editarTrabajo(
    uid: string,
    payload: Partial<Trabajo>
  ): Promise<void> {
    const uidLimpio = String(uid || '').trim();

    if (!uidLimpio) {
      throw new Error('trabajo-uid-vacio');
    }

    const actor = this.obtenerActorActual();

    const ref = doc(this.firestore, 'trabajos', uidLimpio);

    await updateDoc(ref, {
      ...payload,

      actualizadoPorUid: actor.uid,
      actualizadoPorNombre: actor.nombre,

      updatedAt: serverTimestamp()
    });
  }

  async actualizarTrabajo(
    uid: string,
    payload: Partial<Trabajo>
  ): Promise<void> {
    await this.editarTrabajo(uid, payload);
  }

  async cancelarTrabajoPendiente(
    uid: string
  ): Promise<void> {
    const uidLimpio = String(uid || '').trim();

    if (!uidLimpio) {
      throw new Error('trabajo-uid-vacio');
    }

    const actor = this.obtenerActorActual();
    const trabajoRef = doc(this.firestore, 'trabajos', uidLimpio);

    await runTransaction(this.firestore, async (transaction) => {
      const trabajoSnap = await transaction.get(trabajoRef);

      if (!trabajoSnap.exists()) {
        throw new Error('trabajo-no-existe');
      }

      const trabajo: any = trabajoSnap.data();

      if (trabajo.estado !== 'pendiente') {
        throw new Error('solo-pendiente-puede-cancelarse');
      }

      const codigoTrabajo = this.obtenerCodigoTrabajo(
        {
          ...trabajo,
          uid: uidLimpio,
          id: uidLimpio
        },
        uidLimpio
      );

      if (trabajo.stockRevertidoCancelacion !== true) {
        await this.moverStockPorMateriales(
          transaction,
          trabajo.materialesAsignados || [],
          'entrada',
          uidLimpio,
          codigoTrabajo,
          actor,
          'cancelacion_trabajo',
          'Entrada por cancelación del trabajo'
        );
      }

      transaction.update(trabajoRef, {
        estado: 'cancelado',

        stockRevertidoCancelacion: true,

        canceladoPorUid: actor.uid,
        canceladoPorNombre: actor.nombre,

        actualizadoPorUid: actor.uid,
        actualizadoPorNombre: actor.nombre,

        canceledAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      const historialRef = doc(
        collection(this.firestore, 'historial_actividades')
      );

      transaction.set(historialRef, {
        modulo: 'Trabajos',
        accion: 'cancelar_trabajo',
        descripcion:
          `Se canceló el trabajo ${codigoTrabajo} y se devolvió el stock asignado.`,

        trabajoUid: uidLimpio,
        codigoTrabajo,

        realizadoPorUid: actor.uid,
        realizadoPorNombre: actor.nombre,

        createdAt: serverTimestamp()
      });
    });
  }

  async eliminarTrabajo(
    uid: string
  ): Promise<void> {
    const uidLimpio = String(uid || '').trim();

    if (!uidLimpio) {
      throw new Error('trabajo-uid-vacio');
    }

    const actor = this.obtenerActorActual();
    const trabajoRef = doc(this.firestore, 'trabajos', uidLimpio);

    await runTransaction(this.firestore, async (transaction) => {
      const trabajoSnap = await transaction.get(trabajoRef);

      if (!trabajoSnap.exists()) {
        throw new Error('trabajo-no-existe');
      }

      const trabajo: any = trabajoSnap.data();

      if (
        trabajo.estado !== 'pendiente' &&
        trabajo.estado !== 'cancelado'
      ) {
        throw new Error('solo-pendiente-o-cancelado-puede-eliminarse');
      }

      const codigoTrabajo = this.obtenerCodigoTrabajo(
        {
          ...trabajo,
          uid: uidLimpio,
          id: uidLimpio
        },
        uidLimpio
      );

      if (
        trabajo.estado === 'pendiente' &&
        trabajo.stockRevertidoCancelacion !== true
      ) {
        await this.moverStockPorMateriales(
          transaction,
          trabajo.materialesAsignados || [],
          'entrada',
          uidLimpio,
          codigoTrabajo,
          actor,
          'eliminacion_trabajo',
          'Entrada por eliminación del trabajo'
        );
      }

      transaction.update(trabajoRef, {
        estado: 'cancelado',

        activo: false,
        eliminado: true,

        stockRevertidoCancelacion: true,

        eliminadoPorUid: actor.uid,
        eliminadoPorNombre: actor.nombre,

        actualizadoPorUid: actor.uid,
        actualizadoPorNombre: actor.nombre,

        deletedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      const historialRef = doc(
        collection(this.firestore, 'historial_actividades')
      );

      transaction.set(historialRef, {
        modulo: 'Trabajos',
        accion: 'eliminar_trabajo',
        descripcion:
          `Se eliminó el trabajo ${codigoTrabajo}.`,

        trabajoUid: uidLimpio,
        codigoTrabajo,

        realizadoPorUid: actor.uid,
        realizadoPorNombre: actor.nombre,

        createdAt: serverTimestamp()
      });
    });
  }

  async restaurarTrabajo(
    uid: string
  ): Promise<void> {
    const uidLimpio = String(uid || '').trim();

    if (!uidLimpio) {
      throw new Error('trabajo-uid-vacio');
    }

    const actor = this.obtenerActorActual();
    const trabajoRef = doc(this.firestore, 'trabajos', uidLimpio);

    await runTransaction(this.firestore, async (transaction) => {
      const trabajoSnap = await transaction.get(trabajoRef);

      if (!trabajoSnap.exists()) {
        throw new Error('trabajo-no-existe');
      }

      const trabajo: any = trabajoSnap.data();

      if (trabajo.estado !== 'cancelado') {
        throw new Error('solo-cancelado-puede-restaurarse');
      }

      const codigoTrabajo = this.obtenerCodigoTrabajo(
        {
          ...trabajo,
          uid: uidLimpio,
          id: uidLimpio
        },
        uidLimpio
      );

      if (trabajo.stockRevertidoCancelacion === true) {
        await this.moverStockPorMateriales(
          transaction,
          trabajo.materialesAsignados || [],
          'salida',
          uidLimpio,
          codigoTrabajo,
          actor,
          'restauracion_trabajo',
          'Salida por restauración del trabajo'
        );
      }

      transaction.update(trabajoRef, {
        estado: 'pendiente',

        activo: true,
        eliminado: false,

        stockRevertidoCancelacion: false,

        restauradoPorUid: actor.uid,
        restauradoPorNombre: actor.nombre,

        actualizadoPorUid: actor.uid,
        actualizadoPorNombre: actor.nombre,

        canceledAt: null,
        deletedAt: null,
        updatedAt: serverTimestamp()
      });

      const historialRef = doc(
        collection(this.firestore, 'historial_actividades')
      );

      transaction.set(historialRef, {
        modulo: 'Trabajos',
        accion: 'restaurar_trabajo',
        descripcion:
          `Se restauró el trabajo ${codigoTrabajo} y se descontó nuevamente el stock asignado.`,

        trabajoUid: uidLimpio,
        codigoTrabajo,

        realizadoPorUid: actor.uid,
        realizadoPorNombre: actor.nombre,

        createdAt: serverTimestamp()
      });

      const empleados = Array.isArray(trabajo.empleadosAsignados)
        ? trabajo.empleadosAsignados
        : [];

      for (const empleado of empleados) {
        const empleadoUid = String(empleado?.uid || '').trim();

        if (!empleadoUid) {
          continue;
        }

        const notificacionRef = doc(
          collection(this.firestore, 'notificaciones_empleado')
        );

        transaction.set(notificacionRef, {
          titulo: 'Trabajo restaurado',
          mensaje: `El trabajo ${codigoTrabajo} fue restaurado.`,
          detalle: 'El trabajo vuelve a estar pendiente.',

          tipo: 'trabajo_restaurado',
          ruta: '/dashboard-empleado',

          referenciaUid: uidLimpio,
          trabajoUid: uidLimpio,
          codigoTrabajo,

          empleadoUid,
          empleadoNombre:
            empleado.nombreCompleto ||
            empleado.usuario ||
            'Empleado',

          leido: false,
          leida: false,
          eliminada: false,
          activa: true,

          createdAt: serverTimestamp()
        });
      }
    });
  }

  async cerrarTrabajo(
    data: CerrarTrabajoData
  ): Promise<void> {
    const trabajoUid = String(data.trabajoUid || '').trim();

    if (!trabajoUid) {
      throw new Error('trabajo-uid-vacio');
    }

    const actor = this.obtenerActorActual();
    const trabajoRef = doc(this.firestore, 'trabajos', trabajoUid);

    await runTransaction(this.firestore, async (transaction) => {
      const trabajoSnap = await transaction.get(trabajoRef);

      if (!trabajoSnap.exists()) {
        throw new Error('trabajo-no-existe');
      }

      const trabajo: any = trabajoSnap.data();

      const estado = String(trabajo.estado || '').trim();

      if (estado === 'devolucion_pendiente') {
        throw new Error('trabajo-con-devolucion-pendiente');
      }

      if (
        estado !== 'finalizado' &&
        estado !== 'devolucion_realizada'
      ) {
        throw new Error('trabajo-no-listo-para-cierre');
      }

      const materiales = Array.isArray(trabajo.materialesAsignados)
        ? trabajo.materialesAsignados
        : [];

      const tieneDevolucionPendiente = materiales.some((material: any) => {
        const cantidadDevuelta = Number(material.cantidadDevuelta || 0);

        return (
          cantidadDevuelta > 0 &&
          material.devolucionValidada !== true &&
          trabajo.devolucionValidada !== true
        );
      });

      if (tieneDevolucionPendiente) {
        throw new Error('materiales-pendientes-de-devolucion');
      }

      const codigoTrabajo = this.obtenerCodigoTrabajo(
        {
          ...trabajo,
          uid: trabajoUid,
          id: trabajoUid
        },
        trabajoUid
      );

      transaction.update(trabajoRef, {
        estado: 'cerrado',

        cerradoPorUid: actor.uid,
        cerradoPorNombre: actor.nombre,
        cerradoAt: serverTimestamp(),

        observacionCierre: String(
          data.observacionCierre || ''
        ).trim(),

        actualizadoPorUid: actor.uid,
        actualizadoPorNombre: actor.nombre,

        updatedAt: serverTimestamp()
      });

      const historialRef = doc(
        collection(this.firestore, 'historial_actividades')
      );

      transaction.set(historialRef, {
        modulo: 'Trabajos',
        accion: 'cerrar_trabajo',
        descripcion:
          `Se cerró administrativamente el trabajo ${codigoTrabajo}.`,

        trabajoUid,
        codigoTrabajo,

        clienteNombre: trabajo.clienteNombre || '',
        tipoTrabajo: trabajo.tipoTrabajo || '',

        observacionCierre: String(
          data.observacionCierre || ''
        ).trim(),

        realizadoPorUid: actor.uid,
        realizadoPorNombre: actor.nombre,

        createdAt: serverTimestamp()
      });
    });
  }

  private async moverStockPorMateriales(
    transaction: any,
    materiales: any[],
    tipo: 'entrada' | 'salida',
    trabajoUid: string,
    codigoTrabajo: string,
    actor: {
      uid: string;
      nombre: string;
    },
    moduloOrigen: string,
    descripcionBase: string
  ): Promise<number> {
    const grupos = this.agruparMaterialesParaStock(materiales);

    if (grupos.length === 0) {
      return 0;
    }

    const lecturas = [];

    for (const grupo of grupos) {
      const materialRef = doc(
        this.firestore,
        'materiales',
        grupo.materialUid
      );

      const materialSnap = await transaction.get(materialRef);

      if (!materialSnap.exists()) {
        throw new Error(`material-no-existe:${grupo.nombre}`);
      }

      const materialData: any = materialSnap.data();

      const stockAntes = Number(
        materialData.stockActual ??
        materialData.cantidadDisponible ??
        materialData.cantidad ??
        0
      );

      const stockMinimo = Number(
        materialData.stockMinimo ??
        materialData.stock_minimo ??
        0
      );

      const stockDespues =
        tipo === 'entrada'
          ? stockAntes + grupo.cantidad
          : stockAntes - grupo.cantidad;

      if (tipo === 'salida' && stockDespues < 0) {
        throw new Error(`stock-insuficiente:${grupo.nombre}`);
      }

      lecturas.push({
        ...grupo,
        materialRef,
        stockAntes,
        stockDespues,
        stockMinimo
      });
    }

    let totalMovido = 0;

    for (const lectura of lecturas) {
      transaction.update(lectura.materialRef, {
        stockActual: lectura.stockDespues,
        cantidadDisponible: lectura.stockDespues,
        stockBajo:
          lectura.stockMinimo > 0 &&
          lectura.stockDespues <= lectura.stockMinimo,
        updatedAt: serverTimestamp()
      });

      const movimientoRef = doc(
        collection(this.firestore, 'movimientos_materiales')
      );

      transaction.set(movimientoRef, {
        materialUid: lectura.materialUid,
        materialNombre: lectura.nombre,

        tipoMovimiento: tipo,
        tipo,

        cantidad: lectura.cantidad,

        stockAntes: lectura.stockAntes,
        stockDespues: lectura.stockDespues,

        moduloOrigen,

        trabajoUid,
        codigoTrabajo,

        unidad: lectura.unidad,

        descripcion:
          `${descripcionBase}: ${lectura.cantidad} ${lectura.unidad} de ${lectura.nombre} en el trabajo ${codigoTrabajo}.`,

        realizadoPorUid: actor.uid,
        realizadoPorNombre: actor.nombre,

        createdAt: serverTimestamp()
      });

      totalMovido += lectura.cantidad;
    }

    return totalMovido;
  }

  private mapearTrabajoDocumento(
    id: string,
    data: any
  ): Trabajo {
    const uid = String(data.uid || id).trim();

    return {
      ...(data as Trabajo),

      id,
      uid,

      codigoTrabajo: this.obtenerCodigoTrabajo(
        {
          ...data,
          id,
          uid
        },
        uid
      ),

      clienteNombre: String(
        data.clienteNombre ||
        'Sin cliente'
      ).trim(),

      clienteTelefono: String(
        data.clienteTelefono ||
        ''
      ).trim(),

      direccion: String(data.direccion || '').trim(),
      referencia: String(data.referencia || '').trim(),

      latitud: data.latitud ?? null,
      longitud: data.longitud ?? null,
      direccionMapa: String(data.direccionMapa || '').trim(),
      ubicacionTextoOriginal: String(
        data.ubicacionTextoOriginal || ''
      ).trim(),

      tipoTrabajo: String(
        data.tipoTrabajo ||
        'Trabajo'
      ).trim(),

      descripcion: String(data.descripcion || '').trim(),

      fechaProgramada: String(data.fechaProgramada || '').trim(),
      horaProgramada: String(data.horaProgramada || '').trim(),

      subtotal: Number(data.subtotal || 0),

      empleadosAsignados: this.normalizarEmpleadosAsignados(
        Array.isArray(data.empleadosAsignados)
          ? data.empleadosAsignados
          : []
      ),

      materialesAsignados: this.normalizarMaterialesAsignados(
        Array.isArray(data.materialesAsignados)
          ? data.materialesAsignados
          : []
      ),

      codigoCliente: String(data.codigoCliente || '').trim(),
      codigoDevolucion: String(data.codigoDevolucion || '').trim(),

      estado: this.normalizarEstado(data.estado),

      pagoEstado: data.pagoEstado || data.estadoPago || 'pendiente',
      pagoConfirmado: data.pagoConfirmado === true,
      montoRecibido: Number(data.montoRecibido || 0),
      metodoPago: data.metodoPago || data.medioPago || 'Otro',

      devolucionRegistrada: data.devolucionRegistrada === true,
      devolucionValidada: data.devolucionValidada === true,

      activo: data.activo !== false,
      eliminado: data.eliminado === true,

      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      canceledAt: data.canceledAt
    };
  }

  private normalizarEmpleadosAsignados(
    empleados: any[]
  ): TrabajoEmpleadoAsignado[] {
    return (empleados || [])
      .map((empleado: any) => {
        const uid = String(
          empleado?.uid ||
          empleado?.id ||
          ''
        ).trim();

        const nombreCompleto = String(
          empleado?.nombreCompleto ||
          `${empleado?.nombres || ''} ${empleado?.apellidos || ''}`.trim() ||
          empleado?.usuario ||
          'Empleado'
        ).trim();

        return {
          uid,
          nombreCompleto,
          usuario: String(empleado?.usuario || '').trim(),
          cargo: String(
            empleado?.cargo ||
            'Personal operativo'
          ).trim()
        };
      })
      .filter((empleado) => !!empleado.uid);
  }

  private normalizarMaterialesAsignados(
    materiales: any[]
  ): TrabajoMaterialAsignado[] {
    return (materiales || [])
      .map((material: any) => {
        const materialUid = this.obtenerMaterialUid(material);

        const nombre = String(
          material?.nombre ||
          material?.materialNombre ||
          'Material'
        ).trim();

        const categoria = String(
          material?.categoria ||
          'Sin categoría'
        ).trim();

        const unidad = String(
          material?.unidad ||
          'und'
        ).trim();

        const cantidadAsignada = Number(
          material?.cantidadAsignada ??
          material?.cantidad ??
          material?.cantidadEntregada ??
          0
        );

        const cantidadUsada = Number(
          material?.cantidadUsada ??
          material?.usado ??
          0
        );

        const cantidadDevuelta = Number(
          material?.cantidadDevuelta ??
          0
        );

        const precioUnitario = Number(
          material?.precioUnitario ??
          material?.precio ??
          0
        );

        const item: TrabajoMaterialAsignado = {
          materialUid,

          nombre,
          categoria,
          unidad,

          cantidadAsignada,

          cantidadUsada,
          cantidadDevuelta,

          stockAntes: Number(material?.stockAntes || 0),
          stockDespues: Number(material?.stockDespues || 0),

          stockRetornoAntes: material?.stockRetornoAntes ?? undefined,
          stockRetornoDespues: material?.stockRetornoDespues ?? undefined,

          precioUnitario,
          subtotalMaterial: Number(
            material?.subtotalMaterial ??
            precioUnitario * cantidadAsignada
          ),

          devolucionValidada: material?.devolucionValidada === true,

          imagenUrl: String(material?.imagenUrl || '').trim()
        };

        return item;
      })
      .filter((material) =>
        !!material.materialUid &&
        Number(material.cantidadAsignada || 0) > 0
      );
  }

  private agruparMaterialesParaStock(
    materiales: any[]
  ): Array<{
    materialUid: string;
    nombre: string;
    unidad: string;
    cantidad: number;
  }> {
    const mapa = new Map<string, {
      materialUid: string;
      nombre: string;
      unidad: string;
      cantidad: number;
    }>();

    for (const material of materiales || []) {
      const materialUid = this.obtenerMaterialUid(material);

      const nombre = String(
        material?.nombre ||
        material?.materialNombre ||
        'Material'
      ).trim();

      const unidad = String(
        material?.unidad ||
        'und'
      ).trim();

      const cantidad = Number(
        material?.cantidadAsignada ??
        material?.cantidad ??
        material?.cantidadEntregada ??
        0
      );

      if (!materialUid || cantidad <= 0) {
        continue;
      }

      const existente = mapa.get(materialUid);

      if (existente) {
        existente.cantidad += cantidad;
      } else {
        mapa.set(materialUid, {
          materialUid,
          nombre,
          unidad,
          cantidad
        });
      }
    }

    return Array.from(mapa.values());
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

  private obtenerCodigoTrabajo(
    trabajo: any,
    fallback = ''
  ): string {
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

    if (codigoGuardado) {
      return codigoGuardado;
    }

    const id = String(
      trabajo?.id ||
      trabajo?.uid ||
      fallback ||
      ''
    ).trim();

    if (/^T-\d{5}$/i.test(id)) {
      return id.toUpperCase();
    }

    const base = String(
      trabajo?.uid ||
      trabajo?.id ||
      fallback ||
      trabajo?.clienteNombre ||
      'TRABAJO'
    );

    const numero = this.generarNumeroDesdeTexto(base);

    return `T-${numero.toString().padStart(5, '0')}`;
  }

  private generarCodigoSimple(
    prefijo: string
  ): string {
    const numero = Math.floor(100000 + Math.random() * 900000);
    return `${prefijo}-${numero}`;
  }

  private generarNumeroDesdeTexto(
    texto: string
  ): number {
    let hash = 0;

    for (let i = 0; i < texto.length; i++) {
      hash = ((hash << 5) - hash) + texto.charCodeAt(i);
      hash |= 0;
    }

    return Math.abs(hash) % 100000;
  }

  private obtenerIniciales(
    nombre: string
  ): string {
    const partes = String(nombre || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    return partes
      .slice(0, 2)
      .map((parte) => parte.charAt(0).toUpperCase())
      .join('') || 'NA';
  }

  private obtenerActorActual(): {
    uid: string;
    nombre: string;
  } {
    const usuario = this.auth.currentUser;

    return {
      uid: usuario?.uid || '',
      nombre:
        usuario?.displayName ||
        usuario?.email ||
        'Administrador'
    };
  }
}