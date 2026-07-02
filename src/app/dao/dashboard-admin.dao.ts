// src/app/dao/dashboard-admin.dao.ts
import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  query,
  where,
  orderBy,
  limit
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface ResumenDashboardFirebase {
  trabajosPendientes: number;
  materialesStockBajo: number;
  empleadosActivos: number;
  notificacionesNoLeidas: number;
}

export interface EmpresaPanel {
  id?: string;
  nombre: string;
  rubro: string;
  detalle: string;
  logoUrl: string;
  bannerUrl: string;
  activo: boolean;
}

export interface UsuarioPanel {
  id?: string;
  uid?: string;
  nombres?: string;
  apellidos?: string;
  usuario?: string;
  correo?: string;
  rol?: 'admin' | 'empleado';
  activo?: boolean;
  fotoUrl?: string;
}

export interface ModuloAdminFirebase {
  id?: string;
  titulo: string;
  ruta: string;
  iconoUrl: string;
  orden: number;
  activo: boolean;
  color: 'azul' | 'verde' | 'gris';
  badgeTipo: '' | 'notificaciones' | 'stock_bajo' | 'trabajos_pendientes';
}

@Injectable({
  providedIn: 'root'
})
export class DashboardAdminDAO {
  private firestore = inject(Firestore);

  obtenerResumenAdmin$(): Observable<ResumenDashboardFirebase | undefined> {
    const ref = doc(this.firestore, 'dashboard_admin', 'resumen');
    return docData(ref) as Observable<ResumenDashboardFirebase | undefined>;
  }

  obtenerEmpresa$(): Observable<EmpresaPanel | undefined> {
    const ref = doc(this.firestore, 'configuracion', 'empresa');
    return docData(ref, { idField: 'id' }) as Observable<EmpresaPanel | undefined>;
  }

  obtenerUsuarioAdmin$(
    uid: string,
    correo?: string | null
  ): Observable<UsuarioPanel | undefined> {
    const usuarioPorUidRef = doc(this.firestore, 'usuarios', uid);

    const usuarioPorUid$ = docData(usuarioPorUidRef, {
      idField: 'uid'
    }) as Observable<UsuarioPanel | undefined>;

    if (!correo || correo.trim() === '') {
      return usuarioPorUid$;
    }

    const usuariosRef = collection(this.firestore, 'usuarios');

    const consultaPorCorreo = query(
      usuariosRef,
      where('correo', '==', correo.trim()),
      limit(1)
    );

    return collectionData(consultaPorCorreo, { idField: 'id' }).pipe(
      switchMap((usuarios) => {
        if (usuarios.length > 0) {
          return of(usuarios[0] as UsuarioPanel);
        }

        return usuarioPorUid$;
      })
    );
  }

  obtenerModulosAdmin$(): Observable<ModuloAdminFirebase[]> {
    const ref = collection(this.firestore, 'modulos_admin');

    const consulta = query(
      ref,
      where('activo', '==', true),
      orderBy('orden', 'asc')
    );

    return collectionData(consulta, { idField: 'id' }) as Observable<ModuloAdminFirebase[]>;
  }
}

