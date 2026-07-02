// src/app/paginas/debug/firebase-debug/firebase-debug.page.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonicModule,
  NavController,
  ToastController
} from '@ionic/angular';

import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  limit,
  serverTimestamp,
  updateDoc,
  doc
} from '@angular/fire/firestore';

@Component({
  selector: 'app-firebase-debug',
  templateUrl: './firebase-debug.page.html',
  styleUrls: ['./firebase-debug.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class FirebaseDebugPage {
  private firestore = inject(Firestore);
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);

  cargando = false;
  resumenTexto = '';
  resultadoTexto = '';
async sincronizarAlertasStockBajo() {
  this.cargando = true;

  try {
    const materialesSnap = await getDocs(
      collection(this.firestore, 'materiales')
    );

    const notificacionesSnap = await getDocs(
      collection(this.firestore, 'notificaciones_admin')
    );

    const notificaciones = notificacionesSnap.docs.map((documento) => {
      const data: any = documento.data();

      return {
        id: documento.id,
        uid: documento.id,
        tipo: data.tipo || '',
        referenciaUid: data.referenciaUid || '',
        eliminada: data.eliminada === true,
        activa: data.activa !== false,
        resuelta: data.resuelta === true
      };
    });

    let creadas = 0;
    let resueltas = 0;

    for (const documento of materialesSnap.docs) {
      const data: any = documento.data();

      const materialUid = data.uid || documento.id;
      const nombre = data.nombre || 'Material';
      const unidad = data.unidad || '';

      const eliminado = data.eliminado === true;
      const stockActual = Number(data.stockActual ?? data.stock ?? data.cantidad ?? 0);
      const stockMinimo = Number(data.stockMinimo ?? data.minimo ?? 0);

      const estaBajo =
        eliminado !== true &&
        stockMinimo > 0 &&
        stockActual <= stockMinimo;

      const alertaActiva = notificaciones.find((notificacion) =>
        notificacion.tipo === 'stock_bajo' &&
        notificacion.referenciaUid === materialUid &&
        notificacion.eliminada !== true &&
        notificacion.resuelta !== true &&
        notificacion.activa !== false
      );

      if (estaBajo && !alertaActiva) {
        await addDoc(collection(this.firestore, 'notificaciones_admin'), {
          titulo: 'Stock bajo',
          mensaje: `El material ${nombre} está por debajo del stock mínimo.`,
          detalle: `Stock actual: ${stockActual} ${unidad}. Stock mínimo: ${stockMinimo} ${unidad}.`,
          tipo: 'stock_bajo',

          leida: false,
          eliminada: false,
          activa: true,
          resuelta: false,

          ruta: '/materiales',
          referenciaUid: materialUid,

          materialNombre: nombre,
          stockActual,
          stockMinimo,
          unidad,

          creadoEn: serverTimestamp(),
          actualizadoEn: serverTimestamp()
        });

        creadas++;
      }

      if (!estaBajo && alertaActiva) {
        await updateDoc(
          doc(this.firestore, 'notificaciones_admin', alertaActiva.uid),
          {
            leida: true,
            activa: false,
            resuelta: true,
            resueltoEn: serverTimestamp(),
            actualizadoEn: serverTimestamp()
          }
        );

        resueltas++;
      }
    }

    await this.generarDiagnostico();

    await this.mostrarToast(
      `Sincronización lista. Creadas: ${creadas}. Resueltas: ${resueltas}.`,
      'success'
    );
  } catch (error) {
    console.error('[FirebaseDebugPage] Error al sincronizar alertas:', error);

    await this.mostrarToast(
      'No se pudo sincronizar alertas de stock bajo.',
      'danger'
    );
  } finally {
    this.cargando = false;
  }
}
  async ionViewWillEnter() {
    await this.generarDiagnostico();
  }

  async generarDiagnostico() {
    this.cargando = true;
    this.resumenTexto = '';
    this.resultadoTexto = '';

    try {
      const [
        materialesSnap,
        notificacionesAdminSnap,
        notificacionesAntiguasSnap,
        movimientosSnap,
        historialSnap
      ] = await Promise.all([
        getDocs(collection(this.firestore, 'materiales')),
        getDocs(collection(this.firestore, 'notificaciones_admin')),
        getDocs(collection(this.firestore, 'notificaciones')),
        getDocs(collection(this.firestore, 'movimientos_materiales')),
        getDocs(collection(this.firestore, 'historial_actividades'))
      ]);

      const materiales = materialesSnap.docs.map((documento) => {
        const data: any = documento.data();

        const stockActual = Number(data.stockActual ?? data.stock ?? data.cantidad ?? 0);
        const stockMinimo = Number(data.stockMinimo ?? data.minimo ?? 0);

        const stockBajoCalculado =
          stockMinimo > 0 && stockActual <= stockMinimo;

        return {
          id: documento.id,
          uid: data.uid || documento.id,

          nombre: data.nombre || '',
          nombreNormalizado: data.nombreNormalizado || '',
          categoria: data.categoria || '',
          unidad: data.unidad || '',

          stockActual,
          stockMinimo,

          stockBajoFirebase: data.stockBajo === true,
          stockBajoCalculado,

          activo: data.activo === true,
          eliminado: data.eliminado === true,

          creadoPorUid: data.creadoPorUid || '',
          actualizadoPorUid: data.actualizadoPorUid || '',

          createdAt: this.formatearFecha(data.createdAt),
          updatedAt: this.formatearFecha(data.updatedAt),
          deletedAt: this.formatearFecha(data.deletedAt)
        };
      });

      const notificacionesAdmin = notificacionesAdminSnap.docs.map((documento) => {
        const data: any = documento.data();

        return {
          id: documento.id,
          uid: data.uid || documento.id,

          titulo: data.titulo || '',
          mensaje: data.mensaje || '',
          detalle: data.detalle || '',

          tipo: data.tipo || '',
          leida: data.leida === true,
          eliminada: data.eliminada === true,
          activa: data.activa !== false,
          resuelta: data.resuelta === true,

          ruta: data.ruta || '',
          referenciaUid: data.referenciaUid || '',

          materialNombre: data.materialNombre || '',
          stockActual: Number(data.stockActual || 0),
          stockMinimo: Number(data.stockMinimo || 0),
          unidad: data.unidad || '',

          creadoEn: this.formatearFecha(data.creadoEn),
          actualizadoEn: this.formatearFecha(data.actualizadoEn),
          eliminadoEn: this.formatearFecha(data.eliminadoEn),
          resueltoEn: this.formatearFecha(data.resueltoEn)
        };
      });

      const notificacionesAntiguas = notificacionesAntiguasSnap.docs.map((documento) => {
        const data: any = documento.data();

        return {
          id: documento.id,
          uid: data.uid || documento.id,
          titulo: data.titulo || '',
          mensaje: data.mensaje || '',
          tipo: data.tipo || '',
          leida: data.leida === true,
          eliminada: data.eliminada === true,
          ruta: data.ruta || '',
          referenciaUid: data.referenciaUid || '',
          creadoEn: this.formatearFecha(data.creadoEn || data.createdAt)
        };
      });

      const movimientos = movimientosSnap.docs.map((documento) => {
        const data: any = documento.data();

        return {
          id: documento.id,
          materialUid: data.materialUid || '',
          materialNombre: data.materialNombre || '',
          tipoMovimiento: data.tipoMovimiento || '',
          cantidad: Number(data.cantidad || 0),
          stockAntes: Number(data.stockAntes || 0),
          stockDespues: Number(data.stockDespues || 0),
          moduloOrigen: data.moduloOrigen || '',
          descripcion: data.descripcion || '',
          createdAt: this.formatearFecha(data.createdAt)
        };
      });

      const historial = historialSnap.docs.map((documento) => {
        const data: any = documento.data();

        return {
          id: documento.id,
          modulo: data.modulo || '',
          accion: data.accion || '',
          descripcion: data.descripcion || '',
          materialUid: data.materialUid || '',
          realizadoPorUid: data.realizadoPorUid || '',
          createdAt: this.formatearFecha(data.createdAt)
        };
      });

      const materialesActivos = materiales.filter(
        (material) => material.eliminado !== true
      );

      const materialesStockBajo = materialesActivos.filter(
        (material) => material.stockBajoCalculado
      );

      const materialesConStockBajoMalMarcado = materialesActivos.filter(
        (material) => material.stockBajoFirebase !== material.stockBajoCalculado
      );

      const notificacionesAdminActivas = notificacionesAdmin.filter(
        (notificacion) => notificacion.eliminada !== true
      );

      const notificacionesNoLeidas = notificacionesAdminActivas.filter(
        (notificacion) =>
          notificacion.leida !== true &&
          notificacion.resuelta !== true
      );

      const alertasStockBajoActivas = notificacionesAdminActivas.filter(
        (notificacion) =>
          notificacion.tipo === 'stock_bajo' &&
          notificacion.resuelta !== true &&
          notificacion.activa !== false
      );

      const alertasStockBajoNoLeidas = alertasStockBajoActivas.filter(
        (notificacion) => notificacion.leida !== true
      );

      const referenciasAlertasStockBajoActivas = new Set(
        alertasStockBajoActivas
          .map((notificacion) => notificacion.referenciaUid)
          .filter(Boolean)
      );

      const materialesStockBajoSinAlertaActiva = materialesStockBajo.filter(
        (material) => !referenciasAlertasStockBajoActivas.has(material.uid)
      );

      const materialesPorUid = new Map(
        materialesActivos.map((material) => [material.uid, material])
      );

      const alertasActivasPeroMaterialYaNoEstaBajo = alertasStockBajoActivas.filter(
        (alerta) => {
          const material = materialesPorUid.get(alerta.referenciaUid);

          if (!material) {
            return true;
          }

          return material.stockBajoCalculado !== true;
        }
      );

      const notificacionesSinCreadoEn = notificacionesAdmin.filter(
        (notificacion) => !notificacion.creadoEn
      );

      const notificacionesSinCamposClave = notificacionesAdmin.filter(
        (notificacion) =>
          notificacion.tipo === '' ||
          notificacion.leida === undefined ||
          notificacion.eliminada === undefined
      );

      const alertasStockBajoDuplicadas =
        this.obtenerDuplicadosPorReferencia(alertasStockBajoActivas);

      const diagnostico = {
        generadoEn: new Date().toISOString(),

        resumen: {
          totalMateriales: materiales.length,
          materialesActivos: materialesActivos.length,
          materialesStockBajo: materialesStockBajo.length,
          materialesConStockBajoMalMarcado: materialesConStockBajoMalMarcado.length,

          totalNotificacionesAdmin: notificacionesAdmin.length,
          notificacionesAdminActivas: notificacionesAdminActivas.length,
          notificacionesNoLeidas: notificacionesNoLeidas.length,

          alertasStockBajoActivas: alertasStockBajoActivas.length,
          alertasStockBajoNoLeidas: alertasStockBajoNoLeidas.length,
          materialesStockBajoSinAlertaActiva: materialesStockBajoSinAlertaActiva.length,
          alertasActivasPeroMaterialYaNoEstaBajo: alertasActivasPeroMaterialYaNoEstaBajo.length,
          alertasStockBajoDuplicadas: alertasStockBajoDuplicadas.length,

          notificacionesSinCreadoEn: notificacionesSinCreadoEn.length,
          notificacionesSinCamposClave: notificacionesSinCamposClave.length,

          coleccionAntiguaNotificaciones: notificacionesAntiguas.length,

          movimientosMateriales: movimientos.length,
          historialActividades: historial.length
        },

        materialesStockBajo,
        materialesStockBajoSinAlertaActiva,
        materialesConStockBajoMalMarcado,

        notificacionesNoLeidas,
        alertasStockBajoActivas,
        alertasStockBajoNoLeidas,
        alertasActivasPeroMaterialYaNoEstaBajo,
        alertasStockBajoDuplicadas,

        notificacionesSinCreadoEn,
        notificacionesSinCamposClave,

        muestraMateriales: materiales.slice(0, 50),
        muestraNotificacionesAdmin: notificacionesAdmin.slice(0, 80),
        muestraColeccionAntiguaNotificaciones: notificacionesAntiguas.slice(0, 30),
        muestraMovimientosMateriales: movimientos.slice(0, 30),
        muestraHistorialActividades: historial.slice(0, 30)
      };

      this.resumenTexto = JSON.stringify(diagnostico.resumen, null, 2);
      this.resultadoTexto = JSON.stringify(diagnostico, null, 2);

      console.log('DIAGNOSTICO_FIREBASE_CONTROL_OPERATIVO:', diagnostico);

      await this.mostrarToast('Diagnóstico generado correctamente.', 'success');
    } catch (error) {
      console.error('[FirebaseDebugPage] Error al generar diagnóstico:', error);

      this.resultadoTexto = JSON.stringify(
        {
          error: true,
          mensaje: 'No se pudo generar el diagnóstico de Firebase.',
          detalle: String(error)
        },
        null,
        2
      );

      await this.mostrarToast('No se pudo generar el diagnóstico.', 'danger');
    } finally {
      this.cargando = false;
    }
  }

  async copiarResultado() {
    if (!this.resultadoTexto) {
      await this.mostrarToast('No hay resultado para copiar.', 'primary');
      return;
    }

    try {
      await navigator.clipboard.writeText(this.resultadoTexto);
      await this.mostrarToast('Diagnóstico copiado. Pégalo en el chat.', 'success');
    } catch (error) {
      console.error('[FirebaseDebugPage] Error al copiar:', error);
      await this.mostrarToast('No se pudo copiar. Selecciona el texto manualmente.', 'danger');
    }
  }

  volverDashboard() {
    this.navCtrl.navigateRoot('/dashboard-admin', {
      animated: false,
      replaceUrl: true
    });
  }

  private obtenerDuplicadosPorReferencia(notificaciones: any[]) {
    const grupos: Record<string, any[]> = {};

    for (const notificacion of notificaciones) {
      const clave = String(notificacion.referenciaUid || 'SIN_REFERENCIA');

      if (!grupos[clave]) {
        grupos[clave] = [];
      }

      grupos[clave].push(notificacion);
    }

    return Object.entries(grupos)
      .filter(([, items]) => items.length > 1)
      .map(([referenciaUid, items]) => ({
        referenciaUid,
        cantidad: items.length,
        items
      }));
  }

  private formatearFecha(valor: any): string | null {
    if (!valor) {
      return null;
    }

    if (typeof valor?.toDate === 'function') {
      return valor.toDate().toISOString();
    }

    if (typeof valor?.seconds === 'number') {
      return new Date(valor.seconds * 1000).toISOString();
    }

    if (valor instanceof Date) {
      return valor.toISOString();
    }

    return String(valor);
  }

  private async mostrarToast(
    message: string,
    color: 'primary' | 'success' | 'danger'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2200,
      position: 'top',
      color
    });

    await toast.present();
  }
}