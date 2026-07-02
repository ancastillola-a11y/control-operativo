// src/app/dao/reporte-admin.dao.ts
import { Injectable, inject } from '@angular/core';

import {
  collection,
  collectionData,
  Firestore,
  limit,
  orderBy,
  query
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteAdminDAO {
  private firestore = inject(Firestore);

  escucharTrabajos(): Observable<any[]> {
    const ref = collection(this.firestore, 'trabajos');

    return collectionData(ref, {
      idField: 'uid'
    }) as Observable<any[]>;
  }

  escucharMateriales(): Observable<any[]> {
    const ref = collection(this.firestore, 'materiales');

    return collectionData(ref, {
      idField: 'uid'
    }) as Observable<any[]>;
  }

  escucharEmpleados(): Observable<any[]> {
    const ref = collection(this.firestore, 'empleados');

    return collectionData(ref, {
      idField: 'uid'
    }) as Observable<any[]>;
  }

  escucharDevoluciones(): Observable<any[]> {
    const ref = collection(this.firestore, 'devoluciones');

    return collectionData(ref, {
      idField: 'uid'
    }) as Observable<any[]>;
  }

  escucharHistorialReciente(): Observable<any[]> {
    const ref = collection(this.firestore, 'historial_actividades');

    const consulta = query(
      ref,
      orderBy('creadoEn', 'desc'),
      limit(8)
    );

    return collectionData(consulta, {
      idField: 'uid'
    }) as Observable<any[]>;
  }
}