// src/app/dao/trabajo.dao.ts
import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDocs,
  query,
  where,
  serverTimestamp,
  runTransaction,
  updateDoc,
  setDoc
} from '@angular/fire/firestore';

import { Auth } from '@angular/fire/auth';
import { Observable, map } from 'rxjs';

import {
  Trabajo,
  TrabajoEmpleadoDisponible,
  TrabajoMaterialDisponible,
  TrabajoMaterialAsignado
} from '../modelos/trabajo';

@Injectable({
  providedIn: 'root'
})
export class TrabajoDAO {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  escucharTrabajos(): Observable<Trabajo[]> {
    const refTrabajos = collection(this.firestore, 'trabajos');

    return collectionData(refTrabajos, { idField: 'id' }).pipe(
      map((items: any[]) => {
        return items.map((data: any) => {
          const id = String(data.id || '').trim();
          const uid = String(data.uid || id).trim();

          return {
            ...data,
            id,
            uid
          } as Trabajo;
        });
      })
    );
  }

  async obtenerTrabajosUnaVez(): Promise<Trabajo[]> {
    const refTrabajos = collection(this.firestore, 'trabajos');
    const snap = await getDocs(refTrabajos);

    return snap.docs.map((documento) => {
      const data = documento.data() as Trabajo;

      return {
        ...data,
        id: documento.id,
        uid: data.uid || documento.id
      };
    });
  }

  async obtenerEmpleadosDisponibles(): Promise<TrabajoEmpleadoDisponible[]> {
    const refUsuarios = collection(this.firestore, 'usuarios');

    const consulta = query(
      refUsuarios,
      where('rol', '==', 'empleado')
    );

    const snap = await getDocs(consulta);

    return snap.docs
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

        return {
          uid: data.uid || documento.id,
          nombreCompleto,
          usuario: String(data.usuario || '').trim(),
          cargo: String(data.cargo || 'Personal operativo').trim(),
          iniciales: this.obtenerIniciales(nombreCompleto),
          habilitado: data.habilitado === true,
          eliminado: data.eliminado === true
        };
      })
      .filter((empleado: any) =>
        empleado.habilitado === true &&
        empleado.eliminado !== true
      )
      .map((empleado: any) => ({
        uid: empleado.uid,
        nombreCompleto: empleado.nombreCompleto,
        usuario: empleado.usuario,
        cargo: empleado.cargo,
        iniciales: empleado.iniciales
      }));
  }

  async obtenerMaterialesDisponibles(): Promise<TrabajoMaterialDisponible[]> {
    const refMateriales = collection(this.firestore, 'materiales');

    const consulta = query(
      refMateriales,
      where('eliminado', '==', false)
    );

    const snap = await getDocs(consulta);

    return snap.docs
      .map((documento) => {
        const data: any = documento.data();

        const nombre = String(data.nombre || 'Material').trim();

        return {
          uid: data.uid || documento.id,
          nombre,
          categoria: String(data.categoria || 'Sin categorÃ­a').trim(),
          unidad: String(data.unidad || 'Unidad').trim(),
          stockActual: Number(data.stockActual || 0),
          stockMinimo: Number(data.stockMinimo || 0),
          imagenUrl: String(data.imagenUrl || ''),
          iniciales: this.obtenerIniciales(nombre),
          activo: data.activo !== false,
          eliminado: data.eliminado === true
        };
      })
      .filter((material: any) =>
        material.activo === true &&
        material.eliminado !== true &&
        Number(material.stockActual || 0) > 0
      )
      .map((material: any) => ({
        uid: material.uid,
        nombre: material.nombre,
        categoria: material.categoria,
        unidad: material.unidad,
        stockActual: material.stockActual,
        stockMinimo: material.stockMinimo,
        imagenUrl: material.imagenUrl,
        iniciales: material.iniciales
      }));
  }

  async crearTrabajoConAsignacion(trabajo: Trabajo): Promise<string> {
    const trabajoRef = doc(collection(this.firestore, 'trabajos'));
    const trabajoUid = trabajoRef.id;

    const adminUid = this.auth.currentUser?.uid || '';

    await runTransaction(this.firestore, async (transaction) => {
      const materialesLeidos: Array<{
        materialRef: any;
        materialSnap: any;
        asignacion: TrabajoMaterialAsignado;
      }> = [];

      for (const asignacion of trabajo.materialesAsignados) {
        const materialRef = doc(
          this.firestore,
          'materiales',
          asignacion.materialUid
        );

        const materialSnap = await transaction.get(materialRef);

        if (!materialSnap.exists()) {
          throw new Error('material-no-existe');
        }

        materialesLeidos.push({
          materialRef,
          materialSnap,
          asignacion
        });
      }

      const materialesFinales: TrabajoMaterialAsignado[] = [];

      for (const item of materialesLeidos) {
        const materialData: any = item.materialSnap.data();

        const stockAntes = Number(materialData.stockActual || 0);
        const cantidadAsignada = Number(item.asignacion.cantidadAsignada || 0);

        if (cantidadAsignada <= 0) {
          throw new Error('cantidad-material-invalida');
        }

        if (cantidadAsignada > stockAntes) {
          throw new Error(`stock-insuficiente:${item.asignacion.nombre}`);
        }

        const stockDespues = stockAntes - cantidadAsignada;

        const materialFinal: TrabajoMaterialAsignado = {
          materialUid: item.asignacion.materialUid,
          nombre: item.asignacion.nombre || String(materialData.nombre || ''),
          categoria: item.asignacion.categoria || String(materialData.categoria || ''),
          unidad: item.asignacion.unidad || String(materialData.unidad || ''),
          cantidadAsignada,
          stockAntes,
          stockDespues,
          imagenUrl: item.asignacion.imagenUrl || String(materialData.imagenUrl || '')
        };

        materialesFinales.push(materialFinal);

        transaction.update(item.materialRef, {
          stockActual: stockDespues,
          updatedAt: serverTimestamp()
        });

        const movimientoRef = doc(
          collection(this.firestore, 'movimientos_materiales')
        );

        transaction.set(movimientoRef, {
          materialUid: materialFinal.materialUid,
          materialNombre: materialFinal.nombre,
          tipoMovimiento: 'salida',
          cantidad: cantidadAsignada,
          stockAntes,
          stockDespues,
          moduloOrigen: 'asignacion_trabajo',
          trabajoUid,
          descripcion: `Salida por asignaciÃ³n al trabajo de ${trabajo.clienteNombre}.`,
          realizadoPorUid: adminUid,
          createdAt: serverTimestamp()
        });
      }

      transaction.set(trabajoRef, {
        ...trabajo,
        uid: trabajoUid,
        materialesAsignados: materialesFinales,
        estado: 'pendiente',
        activo: true,
        eliminado: false,
        creadoPorUid: adminUid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      const historialRef = doc(
        collection(this.firestore, 'historial_actividades')
      );

      transaction.set(historialRef, {
        modulo: 'SM-1.4 AsignaciÃ³n de trabajos',
        accion: 'crear_trabajo',
        descripcion: `Se creÃ³ el trabajo para el cliente ${trabajo.clienteNombre}.`,
        trabajoUid,
        realizadoPorUid: adminUid,
        createdAt: serverTimestamp()
      });

      for (const empleado of trabajo.empleadosAsignados) {
        const notificacionRef = doc(
          collection(this.firestore, 'notificaciones')
        );

        transaction.set(notificacionRef, {
          titulo: 'Nuevo trabajo asignado',
          mensaje: `Tienes un nuevo trabajo programado para el ${trabajo.fechaProgramada} a las ${trabajo.horaProgramada}.`,
          tipo: 'trabajo_asignado',
          usuarioUid: empleado.uid,
          trabajoUid,
          leido: false,
          createdAt: serverTimestamp()
        });
      }
    });

    return trabajoUid;
  }

  async editarTrabajo(
    uid: string,
    data: Partial<Trabajo>
  ): Promise<void> {
    const trabajoRef = doc(this.firestore, 'trabajos', uid);

    await updateDoc(trabajoRef, {
      ...data,
      actualizadoPorUid: this.auth.currentUser?.uid || '',
      updatedAt: serverTimestamp()
    });

    await this.registrarHistorial(
      'editar_trabajo',
      `Se actualizÃ³ el trabajo ${uid}.`,
      uid
    );
  }

  async cancelarTrabajoPendiente(trabajoUid: string): Promise<void> {
    const trabajoRef = doc(this.firestore, 'trabajos', trabajoUid);
    const adminUid = this.auth.currentUser?.uid || '';

    await runTransaction(this.firestore, async (transaction) => {
      const trabajoSnap = await transaction.get(trabajoRef);

      if (!trabajoSnap.exists()) {
        throw new Error('trabajo-no-existe');
      }

      const trabajo = trabajoSnap.data() as Trabajo;

      if (trabajo.estado !== 'pendiente') {
        throw new Error('trabajo-no-cancelable');
      }

      const materialesAsignados = trabajo.materialesAsignados || [];

      const materialesLeidos: Array<{
        materialRef: any;
        materialSnap: any;
        asignacion: TrabajoMaterialAsignado;
      }> = [];

      for (const asignacion of materialesAsignados) {
        const materialRef = doc(
          this.firestore,
          'materiales',
          asignacion.materialUid
        );

        const materialSnap = await transaction.get(materialRef);

        if (materialSnap.exists()) {
          materialesLeidos.push({
            materialRef,
            materialSnap,
            asignacion
          });
        }
      }

      for (const item of materialesLeidos) {
        const materialData: any = item.materialSnap.data();

        const stockAntes = Number(materialData.stockActual || 0);
        const cantidad = Number(item.asignacion.cantidadAsignada || 0);
        const stockDespues = stockAntes + cantidad;

        transaction.update(item.materialRef, {
          stockActual: stockDespues,
          updatedAt: serverTimestamp()
        });

        const movimientoRef = doc(
          collection(this.firestore, 'movimientos_materiales')
        );

        transaction.set(movimientoRef, {
          materialUid: item.asignacion.materialUid,
          materialNombre: item.asignacion.nombre,
          tipoMovimiento: 'ajuste',
          cantidad,
          stockAntes,
          stockDespues,
          moduloOrigen: 'cancelacion_trabajo',
          trabajoUid,
          descripcion: `Retorno de stock por cancelaciÃ³n del trabajo de ${trabajo.clienteNombre}.`,
          realizadoPorUid: adminUid,
          createdAt: serverTimestamp()
        });
      }

      transaction.update(trabajoRef, {
        estado: 'cancelado',
        activo: false,
        actualizadoPorUid: adminUid,
        canceledAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      const historialRef = doc(
        collection(this.firestore, 'historial_actividades')
      );

      transaction.set(historialRef, {
        modulo: 'SM-1.4 AsignaciÃ³n de trabajos',
        accion: 'cancelar_trabajo',
        descripcion: `Se cancelÃ³ el trabajo del cliente ${trabajo.clienteNombre}.`,
        trabajoUid,
        realizadoPorUid: adminUid,
        createdAt: serverTimestamp()
      });
    });
  }

  async eliminarTrabajoLogico(trabajoUid: string): Promise<void> {
    const trabajoRef = doc(this.firestore, 'trabajos', trabajoUid);
    const adminUid = this.auth.currentUser?.uid || '';

    await runTransaction(this.firestore, async (transaction) => {
      const trabajoSnap = await transaction.get(trabajoRef);

      if (!trabajoSnap.exists()) {
        throw new Error('trabajo-no-existe');
      }

      const trabajo = trabajoSnap.data() as Trabajo;

      if (trabajo.estado !== 'pendiente' && trabajo.estado !== 'cancelado') {
        throw new Error('trabajo-no-eliminable');
      }

      transaction.update(trabajoRef, {
        eliminado: true,
        activo: false,
        eliminadoPorUid: adminUid,
        deletedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      const historialRef = doc(
        collection(this.firestore, 'historial_actividades')
      );

      transaction.set(historialRef, {
        modulo: 'SM-1.4 AsignaciÃ³n de trabajos',
        accion: 'eliminar_trabajo',
        descripcion: `Se eliminÃ³ el registro del trabajo del cliente ${trabajo.clienteNombre}.`,
        trabajoUid,
        realizadoPorUid: adminUid,
        createdAt: serverTimestamp()
      });
    });
  }

  async registrarHistorial(
    accion: string,
    descripcion: string,
    trabajoUid: string
  ): Promise<void> {
    const historialRef = doc(
      collection(this.firestore, 'historial_actividades')
    );

    await setDoc(historialRef, {
      modulo: 'SM-1.4 AsignaciÃ³n de trabajos',
      accion,
      descripcion,
      trabajoUid,
      realizadoPorUid: this.auth.currentUser?.uid || '',
      createdAt: serverTimestamp()
    });
  }

  private obtenerIniciales(nombre: string): string {
    const palabras = String(nombre || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    const iniciales = palabras
      .slice(0, 2)
      .map((palabra) => palabra.charAt(0))
      .join('')
      .toUpperCase();

    return iniciales || 'TR';
  }
}

