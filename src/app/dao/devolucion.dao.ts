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

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevolucionDAO {
  private firestore = inject(Firestore);

  escucharTrabajos(): Observable<any[]> {
    const ref = collection(this.firestore, 'trabajos');

    return collectionData(ref, {
      idField: 'uid'
    }) as Observable<any[]>;
  }

  async validarDevolucion(
    trabajoUid: string,
    codigoIngresado: string
  ): Promise<void> {
    const uid = String(trabajoUid || '').trim();

    if (!uid) {
      throw new Error('trabajo-uid-vacio');
    }

    await runTransaction(this.firestore, async (transaction) => {
      const trabajoRef = doc(this.firestore, 'trabajos', uid);
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

      const codigoReal = String(trabajo.codigoDevolucion || '').trim();
      const codigo = String(codigoIngresado || '').trim();

      if (!codigoReal) {
        throw new Error('codigo-devolucion-no-configurado');
      }

      if (codigo !== codigoReal) {
        throw new Error('codigo-devolucion-incorrecto');
      }

      const materiales = Array.isArray(trabajo.materialesAsignados)
        ? trabajo.materialesAsignados
        : [];

      if (materiales.length === 0) {
        throw new Error('sin-materiales-devolver');
      }

      for (const item of materiales) {
        const materialUid = String(
          item.materialUid ||
          item.uid ||
          item.id ||
          ''
        ).trim();

        const cantidad = Number(
          item.cantidadDevuelta ??
          item.cantidadAsignada ??
          item.cantidad ??
          0
        );

        if (!materialUid || cantidad <= 0) {
          continue;
        }

        const materialRef = doc(this.firestore, 'materiales', materialUid);
        const materialSnap = await transaction.get(materialRef);

        if (!materialSnap.exists()) {
          continue;
        }

        const material: any = materialSnap.data();

        const stockActual = Number(
          material.stockActual ??
          material.stock ??
          material.cantidadDisponible ??
          material.cantidad ??
          0
        );

        const nuevoStock = stockActual + cantidad;

        const updateStock: any = {
          actualizadoEn: serverTimestamp()
        };

        if ('stockActual' in material) {
          updateStock.stockActual = nuevoStock;
        } else if ('stock' in material) {
          updateStock.stock = nuevoStock;
        } else if ('cantidadDisponible' in material) {
          updateStock.cantidadDisponible = nuevoStock;
        } else if ('cantidad' in material) {
          updateStock.cantidad = nuevoStock;
        } else {
          updateStock.stockActual = nuevoStock;
        }

        transaction.update(materialRef, updateStock);
      }

      transaction.update(trabajoRef, {
        estado: 'devolucion_realizada',
        devolucionValidada: true,
        fechaDevolucionValidada: serverTimestamp(),
        actualizadoEn: serverTimestamp()
      });
    });
  }
}