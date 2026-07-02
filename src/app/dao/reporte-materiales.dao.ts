// src/app/dao/reporte-materiales.dao.ts
import { Injectable, inject } from '@angular/core';

import {
  collection,
  collectionData,
  Firestore
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteMaterialesDAO {
  private firestore = inject(Firestore);

  escucharMateriales(): Observable<any[]> {
    const ref = collection(this.firestore, 'materiales');
    return collectionData(ref, { idField: 'uid' }) as Observable<any[]>;
  }

  escucharTrabajos(): Observable<any[]> {
    const ref = collection(this.firestore, 'trabajos');
    return collectionData(ref, { idField: 'uid' }) as Observable<any[]>;
  }

  escucharDevoluciones(): Observable<any[]> {
    const ref = collection(this.firestore, 'devoluciones');
    return collectionData(ref, { idField: 'uid' }) as Observable<any[]>;
  }
}