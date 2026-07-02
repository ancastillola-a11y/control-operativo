// src/app/dao/reporte-trabajos.dao.ts
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
export class ReporteTrabajosDAO {
  private firestore = inject(Firestore);

  escucharTrabajos(): Observable<any[]> {
    const ref = collection(this.firestore, 'trabajos');
    return collectionData(ref, { idField: 'uid' }) as Observable<any[]>;
  }

  escucharEmpleados(): Observable<any[]> {
    const ref = collection(this.firestore, 'empleados');
    return collectionData(ref, { idField: 'uid' }) as Observable<any[]>;
  }
}