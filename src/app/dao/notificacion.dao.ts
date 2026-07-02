// src/app/dao/notificacion.dao.ts
import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import {
  NotificacionAdmin,
  TipoNotificacionAdmin
} from '../modelos/notificacion';

type NotificacionAdminConUid = NotificacionAdmin & {
  uid: string;
};

@Injectable({
  providedIn: 'root'
})
export class NotificacionDAO {
  private firestore = inject(Firestore);

  escucharNotificacionesAdmin(): Observable<NotificacionAdmin[]> {
    const ref = collection(this.firestore, 'notificaciones_admin');

    const q = query(
      ref,
      orderBy('creadoEn', 'desc')
    );

    return collectionData(q, {
      idField: 'uid'
    }) as Observable<NotificacionAdmin[]>;
  }

  async crearNotificacionAdmin(data: {
    titulo: string;
    mensaje: string;
    detalle?: string;
    tipo: TipoNotificacionAdmin;
    ruta?: string;
    referenciaUid?: string;
    materialNombre?: string;
    stockActual?: number;
    stockMinimo?: number;
    unidad?: string;
  }): Promise<void> {
    const ref = collection(this.firestore, 'notificaciones_admin');

    await addDoc(ref, {
      ...data,
      leida: false,
      eliminada: false,
      activa: true,
      resuelta: false,
      creadoEn: serverTimestamp(),
      actualizadoEn: serverTimestamp()
    });
  }

  async crearOActualizarAlertaStockBajo(data: {
    materialUid: string;
    materialNombre: string;
    stockActual: number;
    stockMinimo: number;
    unidad: string;
  }): Promise<void> {
    const materialUid = String(data.materialUid || '').trim();

    if (!materialUid) {
      throw new Error('material-uid-vacio');
    }

    const alertaActiva = await this.buscarAlertaStockBajoActiva(materialUid);

    const stockActual = Number(data.stockActual || 0);
    const stockMinimo = Number(data.stockMinimo || 0);
    const unidad = String(data.unidad || '').trim();

    const mensaje =
      `El material ${data.materialNombre} está por debajo del stock mínimo.`;

    const detalle =
      `Stock actual: ${stockActual} ${unidad}. ` +
      `Stock mínimo: ${stockMinimo} ${unidad}.`;

    if (alertaActiva) {
      const ref = doc(
        this.firestore,
        'notificaciones_admin',
        alertaActiva.uid
      );

      await updateDoc(ref, {
        titulo: 'Stock bajo',
        mensaje,
        detalle,

        tipo: 'stock_bajo',

        materialNombre: data.materialNombre,
        stockActual,
        stockMinimo,
        unidad,

        ruta: '/materiales',
        referenciaUid: materialUid,

        leida: alertaActiva.leida === true,
        activa: true,
        resuelta: false,
        eliminada: false,

        actualizadoEn: serverTimestamp()
      });

      return;
    }

    await this.crearNotificacionAdmin({
      titulo: 'Stock bajo',
      mensaje,
      detalle,
      tipo: 'stock_bajo',
      ruta: '/materiales',
      referenciaUid: materialUid,
      materialNombre: data.materialNombre,
      stockActual,
      stockMinimo,
      unidad
    });
  }

  async resolverAlertaStockBajo(materialUid: string): Promise<void> {
    const uidMaterial = String(materialUid || '').trim();

    if (!uidMaterial) {
      return;
    }

    const alertaActiva = await this.buscarAlertaStockBajoActiva(uidMaterial);

    if (!alertaActiva) {
      return;
    }

    const ref = doc(
      this.firestore,
      'notificaciones_admin',
      alertaActiva.uid
    );

    await updateDoc(ref, {
      leida: true,
      activa: false,
      resuelta: true,
      resueltoEn: serverTimestamp(),
      actualizadoEn: serverTimestamp()
    });
  }

  async marcarComoLeida(uid: string): Promise<void> {
    const notificacionUid = String(uid || '').trim();

    if (!notificacionUid) {
      throw new Error('notificacion-uid-vacio');
    }

    const ref = doc(
      this.firestore,
      'notificaciones_admin',
      notificacionUid
    );

    await updateDoc(ref, {
      leida: true,
      actualizadoEn: serverTimestamp()
    });
  }

  async marcarComoNoLeida(uid: string): Promise<void> {
    const notificacionUid = String(uid || '').trim();

    if (!notificacionUid) {
      throw new Error('notificacion-uid-vacio');
    }

    const ref = doc(
      this.firestore,
      'notificaciones_admin',
      notificacionUid
    );

    await updateDoc(ref, {
      leida: false,
      actualizadoEn: serverTimestamp()
    });
  }

  async eliminarNotificacion(uid: string): Promise<void> {
    const notificacionUid = String(uid || '').trim();

    if (!notificacionUid) {
      throw new Error('notificacion-uid-vacio');
    }

    const ref = doc(
      this.firestore,
      'notificaciones_admin',
      notificacionUid
    );

    await updateDoc(ref, {
      eliminada: true,
      eliminadoEn: serverTimestamp(),
      actualizadoEn: serverTimestamp()
    });
  }

  async marcarTodasComoLeidas(
    notificaciones: NotificacionAdmin[]
  ): Promise<void> {
    const pendientes = notificaciones.filter(
      (item) =>
        !!item.uid &&
        item.leida !== true &&
        item.eliminada !== true &&
        item.resuelta !== true
    );

    if (pendientes.length === 0) {
      return;
    }

    const batch = writeBatch(this.firestore);

    for (const item of pendientes) {
      const uid = String(item.uid || '').trim();

      if (!uid) {
        continue;
      }

      const ref = doc(
        this.firestore,
        'notificaciones_admin',
        uid
      );

      batch.update(ref, {
        leida: true,
        actualizadoEn: serverTimestamp()
      });
    }

    await batch.commit();
  }

  private async buscarAlertaStockBajoActiva(
    materialUid: string
  ): Promise<NotificacionAdminConUid | null> {
    const uidMaterial = String(materialUid || '').trim();

    if (!uidMaterial) {
      return null;
    }

    const ref = collection(this.firestore, 'notificaciones_admin');

    const q = query(
      ref,
      where('referenciaUid', '==', uidMaterial),
      limit(20)
    );

    const snap = await getDocs(q);

    if (snap.empty) {
      return null;
    }

    const encontrada = snap.docs
      .map((documento): NotificacionAdminConUid => {
        const data = documento.data() as NotificacionAdmin;

        return {
          ...data,
          uid: documento.id
        };
      })
      .find((item) =>
        item.tipo === 'stock_bajo' &&
        item.eliminada !== true &&
        item.resuelta !== true &&
        item.activa !== false
      );

    return encontrada || null;
  }
}