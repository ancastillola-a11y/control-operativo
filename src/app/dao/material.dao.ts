// src/app/dao/material.dao.ts
import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
  limit,
  getDocs,
  getDoc,
  serverTimestamp
} from '@angular/fire/firestore';

import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from '@angular/fire/storage';

import { Auth } from '@angular/fire/auth';

import {
  Material,
  MovimientoMaterial
} from '../modelos/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialDAO {
  private firestore = inject(Firestore);
  private storage = inject(Storage);
  private auth = inject(Auth);

  async obtenerMaterialesUnaVez(): Promise<Material[]> {
    const refMateriales = collection(this.firestore, 'materiales');

    const consulta = query(
      refMateriales,
      where('eliminado', '==', false)
    );

    const snap = await getDocs(consulta);

    return snap.docs.map((documento) => {
      const data = documento.data() as Material;

      return {
        ...data,
        id: documento.id,
        uid: data.uid || documento.id
      };
    });
  }

  async obtenerMaterialPorUid(uid: string): Promise<Material | null> {
    if (!uid) {
      return null;
    }

    const refMaterial = doc(this.firestore, 'materiales', uid);
    const snap = await getDoc(refMaterial);

    if (!snap.exists()) {
      return null;
    }

    const data = snap.data() as Material;

    return {
      ...data,
      id: snap.id,
      uid: data.uid || snap.id
    };
  }

  async existeNombre(
    nombreNormalizado: string,
    uidIgnorado = ''
  ): Promise<boolean> {
    const refMateriales = collection(this.firestore, 'materiales');

    const consulta = query(
      refMateriales,
      where('nombreNormalizado', '==', nombreNormalizado),
      where('eliminado', '==', false),
      limit(1)
    );

    const snap = await getDocs(consulta);

    if (snap.empty) {
      return false;
    }

    return snap.docs[0].id !== uidIgnorado;
  }

  async crearMaterial(material: Material): Promise<string> {
    const refMaterial = doc(collection(this.firestore, 'materiales'));
    const uid = refMaterial.id;

    const adminUid = this.auth.currentUser?.uid || '';

    const stockActual = Number(material.stockActual || 0);
    const stockMinimo = Number(material.stockMinimo || 0);

    await setDoc(refMaterial, {
      ...material,
      uid,

      stockActual,
      stockMinimo,
      stockBajo: stockMinimo > 0 && stockActual <= stockMinimo,

      activo: true,
      eliminado: false,

      creadoPorUid: material.creadoPorUid || adminUid,

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return uid;
  }

  async editarMaterial(
    uid: string,
    data: Partial<Material>
  ): Promise<void> {
    if (!uid) {
      throw new Error('material-uid-vacio');
    }

    const refMaterial = doc(this.firestore, 'materiales', uid);

    const materialActual = await this.obtenerMaterialPorUid(uid);

    const stockActual =
      data.stockActual !== undefined
        ? Number(data.stockActual || 0)
        : Number(materialActual?.stockActual || 0);

    const stockMinimo =
      data.stockMinimo !== undefined
        ? Number(data.stockMinimo || 0)
        : Number(materialActual?.stockMinimo || 0);

    const payload: any = {
      ...data,
      stockBajo: stockMinimo > 0 && stockActual <= stockMinimo,
      updatedAt: serverTimestamp()
    };

    await updateDoc(refMaterial, payload);
  }

  async eliminarMaterial(uid: string): Promise<void> {
    if (!uid) {
      throw new Error('material-uid-vacio');
    }

    const refMaterial = doc(this.firestore, 'materiales', uid);
    const adminUid = this.auth.currentUser?.uid || '';

    await updateDoc(refMaterial, {
      eliminado: true,
      activo: false,
      eliminadoPorUid: adminUid,
      deletedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }

  async subirImagenMaterial(
    materialUid: string,
    archivo: File
  ): Promise<{ imagenUrl: string; imagenPath: string }> {
    if (!materialUid) {
      throw new Error('material-uid-vacio');
    }

    const extension = this.obtenerExtension(archivo.name);
    const nombreArchivo = `imagen_${Date.now()}.${extension}`;
    const imagenPath = `materiales/${materialUid}/${nombreArchivo}`;

    const storageRef = ref(this.storage, imagenPath);

    await uploadBytes(storageRef, archivo, {
      contentType: archivo.type
    });

    const imagenUrl = await getDownloadURL(storageRef);

    return {
      imagenUrl,
      imagenPath
    };
  }

  async eliminarImagenPorPath(imagenPath: string): Promise<void> {
    if (!imagenPath) {
      return;
    }

    const storageRef = ref(this.storage, imagenPath);

    try {
      await deleteObject(storageRef);
    } catch (error) {
      console.warn('[MaterialDAO] No se pudo eliminar la imagen:', error);
    }
  }

  async registrarMovimiento(
    movimiento: MovimientoMaterial
  ): Promise<void> {
    const refMovimiento = doc(
      collection(this.firestore, 'movimientos_materiales')
    );

    const adminUid = this.auth.currentUser?.uid || '';

    await setDoc(refMovimiento, {
      ...movimiento,
      realizadoPorUid: movimiento.realizadoPorUid || adminUid,
      createdAt: serverTimestamp()
    });
  }

  async registrarHistorial(
    accion: string,
    descripcion: string,
    materialUid: string
  ): Promise<void> {
    const adminUid = this.auth.currentUser?.uid || '';

    const refHistorial = doc(
      collection(this.firestore, 'historial_actividades')
    );

    await setDoc(refHistorial, {
      modulo: 'SM-1.3 Gestión de materiales',
      accion,
      descripcion,
      materialUid,
      realizadoPorUid: adminUid,
      createdAt: serverTimestamp()
    });
  }

  private obtenerExtension(nombreArchivo: string): string {
    const partes = String(nombreArchivo || '').split('.');
    const extension = partes.length > 1 ? partes.pop() : 'jpg';

    return String(extension || 'jpg').toLowerCase();
  }
}