// src/app/procesos/firebase-storage.service.ts
import { Injectable, inject } from '@angular/core';

import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  private storage = inject(Storage);

  async subirFotoUsuarioEmpleado(
    uidEmpleado: string,
    archivo: File
  ): Promise<string> {
    if (!uidEmpleado) {
      throw new Error('uid-empleado-vacio');
    }

    if (!archivo) {
      throw new Error('archivo-vacio');
    }

    console.log('[FirebaseStorageService] Archivo recibido:', {
      uidEmpleado,
      nombre: archivo.name,
      tipo: archivo.type,
      peso: archivo.size
    });

    const extension = this.obtenerExtension(archivo);
    const nombreArchivo = `foto-perfil-${Date.now()}.${extension}`;
    const ruta = `usuarios/${uidEmpleado}/perfil/${nombreArchivo}`;

    const storageRef = ref(this.storage, ruta);

    await uploadBytes(storageRef, archivo, {
      contentType: archivo.type || 'image/jpeg'
    });

    const url = await getDownloadURL(storageRef);

    console.log('[FirebaseStorageService] URL generada:', url);

    return url;
  }

  async subirFotoEmpleado(
    uidEmpleado: string,
    archivo: File
  ): Promise<string> {
    return this.subirFotoUsuarioEmpleado(uidEmpleado, archivo);
  }

  private obtenerExtension(archivo: File): string {
    const tipo = String(archivo.type || '').toLowerCase();
    const nombre = String(archivo.name || '').toLowerCase();

    if (tipo.includes('png') || nombre.endsWith('.png')) {
      return 'png';
    }

    if (tipo.includes('webp') || nombre.endsWith('.webp')) {
      return 'webp';
    }

    return 'jpg';
  }
}