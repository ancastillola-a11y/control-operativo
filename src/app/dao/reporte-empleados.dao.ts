// src/app/dao/reporte-empleados.dao.ts
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
export class ReporteEmpleadosDAO {
  private firestore = inject(Firestore);

  escucharEmpleados(): Observable<any[]> {
    const ref = collection(this.firestore, 'empleados');
    return collectionData(ref, { idField: 'uid' }) as Observable<any[]>;
  }

  escucharUsuarios(): Observable<any[]> {
    const ref = collection(this.firestore, 'usuarios');
    return collectionData(ref, { idField: 'uid' }) as Observable<any[]>;
  }

  escucharTrabajos(): Observable<any[]> {
    const ref = collection(this.firestore, 'trabajos');
    return collectionData(ref, { idField: 'uid' }) as Observable<any[]>;
  }
}