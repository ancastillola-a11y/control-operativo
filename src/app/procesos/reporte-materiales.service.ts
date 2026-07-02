// src/app/procesos/reporte-materiales.service.ts
import { Injectable, inject } from '@angular/core';

import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of
} from 'rxjs';

import {
  catchError,
  map,
  shareReplay
} from 'rxjs/operators';

import { ReporteMaterialesDAO } from '../dao/reporte-materiales.dao';

import {
  FiltroReporteMateriales,
  ReporteMaterialesResumen,
  ReporteMaterialesVM,
  ReporteMaterialRanking,
  ReporteMaterialVista
} from '../modelos/reporte-materiales';

@Injectable({
  providedIn: 'root'
})
export class ReporteMaterialesService {
  private dao = inject(ReporteMaterialesDAO);

  private filtroSubject = new BehaviorSubject<FiltroReporteMateriales>('todos');
  private fechaInicioSubject = new BehaviorSubject<string>('');
  private fechaFinSubject = new BehaviorSubject<string>('');

  vm$: Observable<ReporteMaterialesVM> = combineLatest([
    this.dao.escucharMateriales().pipe(catchError(() => of([]))),
    this.dao.escucharTrabajos().pipe(catchError(() => of([]))),
    this.dao.escucharDevoluciones().pipe(catchError(() => of([]))),
    this.filtroSubject.asObservable(),
    this.fechaInicioSubject.asObservable(),
    this.fechaFinSubject.asObservable()
  ]).pipe(
    map(([materiales, trabajos, devoluciones, filtro, fechaInicio, fechaFin]) => {
      const materialesVista = this.mapearMateriales(
        materiales,
        trabajos,
        devoluciones,
        fechaInicio,
        fechaFin
      );

      const materialesFiltrados = this.filtrarMateriales(
        materialesVista,
        filtro
      );

      const resumen = this.calcularResumen(materialesFiltrados);

      return {
        filtro,
        fechaInicio,
        fechaFin,
        resumen,
        materiales: materialesVista,
        materialesFiltrados,
        rankingUsados: this.calcularRankingUsados(materialesFiltrados),
        rankingDevueltos: this.calcularRankingDevueltos(materialesFiltrados),
        totalFiltrados: materialesFiltrados.length
      };
    }),
    shareReplay({
      bufferSize: 1,
      refCount: true
    })
  );

  cambiarFiltro(filtro: FiltroReporteMateriales) {
    this.filtroSubject.next(filtro);
  }

  cambiarFechaInicio(fecha: string) {
    this.fechaInicioSubject.next(fecha || '');
  }

  cambiarFechaFin(fecha: string) {
    this.fechaFinSubject.next(fecha || '');
  }

  limpiarRangoFechas() {
    this.fechaInicioSubject.next('');
    this.fechaFinSubject.next('');
  }

  private mapearMateriales(
    materiales: any[],
    trabajos: any[],
    devoluciones: any[],
    fechaInicio: string,
    fechaFin: string
  ): ReporteMaterialVista[] {
    const materialesActivos = (materiales || []).filter((item) =>
      this.esRegistroActivo(item)
    );

    const basePorKey = new Map<string, any>();
    const keyPorNombre = new Map<string, string>();

    materialesActivos.forEach((material) => {
      const key = this.obtenerKeyMaterialBase(material);

      if (key) {
        basePorKey.set(key, material);
      }

      const nombreKey = this.normalizarTexto(
        material?.nombre ||
        material?.nombreMaterial ||
        material?.materialNombre
      );

      if (nombreKey && key) {
        keyPorNombre.set(nombreKey, key);
      }
    });

    const trabajosFiltrados = this.filtrarItemsPorFecha(
      (trabajos || []).filter((item) => this.esRegistroActivo(item)),
      fechaInicio,
      fechaFin
    );

    const devolucionesFiltradas = this.filtrarItemsPorFecha(
      (devoluciones || []).filter((item) => this.esRegistroActivo(item)),
      fechaInicio,
      fechaFin
    );

    const usados = this.construirAgregadoMateriales(
      trabajosFiltrados,
      basePorKey,
      keyPorNombre,
      'uso'
    );

    const devueltos = this.construirAgregadoMateriales(
      devolucionesFiltradas,
      basePorKey,
      keyPorNombre,
      'devolucion'
    );

    const keys = new Set<string>();

    basePorKey.forEach((_material, key) => keys.add(key));
    usados.forEach((_valor, key) => keys.add(key));
    devueltos.forEach((_valor, key) => keys.add(key));

    return Array.from(keys)
      .map((key) => {
        const material = basePorKey.get(key) || {};
        const usado = usados.get(key);
        const devuelto = devueltos.get(key);

        const nombre = String(
          material?.nombre ||
          material?.nombreMaterial ||
          material?.materialNombre ||
          usado?.nombre ||
          devuelto?.nombre ||
          'Material'
        ).trim();

        const unidad = String(
          material?.unidad ||
          material?.unidadMedida ||
          usado?.unidad ||
          devuelto?.unidad ||
          'Unidad'
        ).trim();

        const stockActual = this.obtenerNumero(
          material?.stockActual ??
          material?.stock ??
          material?.cantidad ??
          material?.cantidadActual ??
          0
        );

        const stockMinimo = this.obtenerNumero(
          material?.stockMinimo ??
          material?.minimo ??
          material?.cantidadMinima ??
          0
        );

        const estadoStock = this.obtenerEstadoStock(stockActual, stockMinimo);

        return {
          uid: String(material?.uid || material?.id || key),
          codigo: this.obtenerCodigoMaterial(material, key, nombre),
          nombre,
          categoria: String(material?.categoria || material?.tipo || 'General'),
          unidad,

          stockActual,
          stockMinimo,

          estadoStock,
          estadoStockTexto: this.obtenerEstadoStockTexto(estadoStock),
          estadoStockClase: this.obtenerEstadoStockClase(estadoStock),

          cantidadUsadaTotal: usado?.cantidad || 0,
          cantidadDevueltaTotal: devuelto?.cantidad || 0,
          trabajosAsociados: usado?.trabajos?.size || 0,

          creadoEnTexto: this.formatearFecha(
            this.convertirFecha(material?.creadoEn || material?.fechaCreacion)
          ),
          actualizadoEnTexto: this.formatearFecha(
            this.convertirFecha(material?.actualizadoEn || material?.fechaActualizacion)
          )
        };
      })
      .sort((a, b) => b.cantidadUsadaTotal - a.cantidadUsadaTotal);
  }

  private construirAgregadoMateriales(
    items: any[],
    basePorKey: Map<string, any>,
    keyPorNombre: Map<string, string>,
    tipo: 'uso' | 'devolucion'
  ): Map<string, {
    nombre: string;
    unidad: string;
    cantidad: number;
    trabajos: Set<string>;
  }> {
    const mapa = new Map<string, {
      nombre: string;
      unidad: string;
      cantidad: number;
      trabajos: Set<string>;
    }>();

    items.forEach((item) => {
      const materialesRaw = this.obtenerMaterialesRaw(item, tipo);
      const trabajoUid = String(
        item?.trabajoUid ||
        item?.trabajoId ||
        item?.uidTrabajo ||
        item?.idTrabajo ||
        item?.uid ||
        item?.id ||
        ''
      );

      materialesRaw.forEach((material: any) => {
        const key = this.obtenerKeyMaterialAsignado(
          material,
          basePorKey,
          keyPorNombre
        );

        if (!key) {
          return;
        }

        const nombre = String(
          material?.nombre ||
          material?.materialNombre ||
          material?.nombreMaterial ||
          basePorKey.get(key)?.nombre ||
          'Material'
        ).trim();

        const unidad = String(
          material?.unidad ||
          material?.unidadMedida ||
          basePorKey.get(key)?.unidad ||
          'Unidad'
        ).trim();

        const cantidad = this.obtenerCantidadMaterial(material, tipo);

        if (cantidad <= 0) {
          return;
        }

        if (!mapa.has(key)) {
          mapa.set(key, {
            nombre,
            unidad,
            cantidad: 0,
            trabajos: new Set<string>()
          });
        }

        const actual = mapa.get(key)!;
        actual.cantidad += cantidad;

        if (trabajoUid) {
          actual.trabajos.add(trabajoUid);
        }
      });
    });

    return mapa;
  }

  private obtenerMaterialesRaw(
    item: any,
    tipo: 'uso' | 'devolucion'
  ): any[] {
    if (!item) {
      return [];
    }

    if (tipo === 'devolucion') {
      const raw =
        item?.materialesDevueltos ||
        item?.materialesDevolucion ||
        item?.devoluciones ||
        item?.materiales ||
        [];

      if (Array.isArray(raw)) {
        return raw;
      }

      if (typeof raw === 'object' && raw !== null) {
        return Object.values(raw);
      }

      const posibleMaterialUnico =
        item?.materialUid ||
        item?.materialId ||
        item?.idMaterial ||
        item?.nombreMaterial ||
        item?.materialNombre ||
        item?.nombre;

      return posibleMaterialUnico ? [item] : [];
    }

    const raw =
      item?.materialesAsignados ||
      item?.materialesUsados ||
      item?.materialesSeleccionados ||
      item?.materiales ||
      [];

    if (Array.isArray(raw)) {
      return raw;
    }

    if (typeof raw === 'object' && raw !== null) {
      return Object.values(raw);
    }

    return [];
  }

  private obtenerCantidadMaterial(
    material: any,
    tipo: 'uso' | 'devolucion'
  ): number {
    const valores = tipo === 'devolucion'
      ? [
          material?.cantidadDevuelta,
          material?.cantidadDevolucion,
          material?.cantidadRetornada,
          material?.cantidad,
          material?.cantidadAsignada
        ]
      : [
          material?.cantidadAsignada,
          material?.cantidadUsada,
          material?.cantidad,
          material?.cantidadSolicitada,
          material?.cantidadSeleccionada,
          material?.cantidadMaterial
        ];

    for (const valor of valores) {
      const numero = this.obtenerNumero(valor);

      if (numero > 0) {
        return numero;
      }
    }

    return 0;
  }

  private filtrarMateriales(
    materiales: ReporteMaterialVista[],
    filtro: FiltroReporteMateriales
  ): ReporteMaterialVista[] {
    if (filtro === 'todos') {
      return materiales;
    }

    if (filtro === 'stock_bajo') {
      return materiales.filter((item) => item.estadoStock === 'stock_bajo');
    }

    if (filtro === 'sin_stock') {
      return materiales.filter((item) => item.estadoStock === 'sin_stock');
    }

    if (filtro === 'usados') {
      return materiales.filter((item) => item.cantidadUsadaTotal > 0);
    }

    if (filtro === 'no_usados') {
      return materiales.filter((item) => item.cantidadUsadaTotal === 0);
    }

    if (filtro === 'devueltos') {
      return materiales.filter((item) => item.cantidadDevueltaTotal > 0);
    }

    return materiales;
  }

  private calcularResumen(
    materiales: ReporteMaterialVista[]
  ): ReporteMaterialesResumen {
    return {
      totalMateriales: materiales.length,
      stockBajo: materiales.filter((item) => item.estadoStock === 'stock_bajo').length,
      sinStock: materiales.filter((item) => item.estadoStock === 'sin_stock').length,
      materialesUsados: materiales.filter((item) => item.cantidadUsadaTotal > 0).length,
      materialesNoUsados: materiales.filter((item) => item.cantidadUsadaTotal === 0).length,
      materialesDevueltos: materiales.filter((item) => item.cantidadDevueltaTotal > 0).length,
      cantidadUsadaTotal: materiales.reduce((total, item) => total + item.cantidadUsadaTotal, 0),
      cantidadDevueltaTotal: materiales.reduce((total, item) => total + item.cantidadDevueltaTotal, 0)
    };
  }

  private calcularRankingUsados(
    materiales: ReporteMaterialVista[]
  ): ReporteMaterialRanking[] {
    const total = Math.max(
      materiales.reduce((suma, item) => suma + item.cantidadUsadaTotal, 0),
      1
    );

    return [...materiales]
      .filter((item) => item.cantidadUsadaTotal > 0)
      .sort((a, b) => b.cantidadUsadaTotal - a.cantidadUsadaTotal)
      .slice(0, 5)
      .map((item) => ({
        nombre: item.nombre,
        unidad: item.unidad,
        total: item.cantidadUsadaTotal,
        porcentaje: this.obtenerPorcentaje(item.cantidadUsadaTotal, total)
      }));
  }

  private calcularRankingDevueltos(
    materiales: ReporteMaterialVista[]
  ): ReporteMaterialRanking[] {
    const total = Math.max(
      materiales.reduce((suma, item) => suma + item.cantidadDevueltaTotal, 0),
      1
    );

    return [...materiales]
      .filter((item) => item.cantidadDevueltaTotal > 0)
      .sort((a, b) => b.cantidadDevueltaTotal - a.cantidadDevueltaTotal)
      .slice(0, 5)
      .map((item) => ({
        nombre: item.nombre,
        unidad: item.unidad,
        total: item.cantidadDevueltaTotal,
        porcentaje: this.obtenerPorcentaje(item.cantidadDevueltaTotal, total)
      }));
  }

  private obtenerCodigoMaterial(
    material: any,
    key: string,
    nombre: string
  ): string {
    const codigoDirecto = String(
      material?.codigoMaterial ||
      material?.codigo ||
      material?.numero ||
      ''
    ).trim();

    if (/^M-\d{3,6}$/i.test(codigoDirecto)) {
      return codigoDirecto.toUpperCase();
    }

    if (/^\d{1,6}$/.test(codigoDirecto)) {
      return 'M-' + codigoDirecto.padStart(5, '0');
    }

    const textoBase = String(
      material?.uid ||
      material?.id ||
      key ||
      codigoDirecto ||
      nombre ||
      'material'
    ).trim();

    const numero = this.generarNumeroDesdeTexto(textoBase);

    return 'M-' + String(numero).padStart(5, '0');
  }

  private generarNumeroDesdeTexto(texto: string): number {
    let hash = 0;

    for (let i = 0; i < texto.length; i++) {
      hash = ((hash << 5) - hash) + texto.charCodeAt(i);
      hash |= 0;
    }

    return Math.abs(hash) % 100000;
  }

  private obtenerKeyMaterialBase(material: any): string {
    const uid = String(material?.uid || material?.id || '').trim();

    if (uid) {
      return uid;
    }

    return this.normalizarTexto(
      material?.nombre ||
      material?.nombreMaterial ||
      material?.materialNombre
    );
  }

  private obtenerKeyMaterialAsignado(
    material: any,
    basePorKey: Map<string, any>,
    keyPorNombre: Map<string, string>
  ): string {
    if (typeof material === 'string') {
      const texto = material.trim();

      if (texto && basePorKey.has(texto)) {
        return texto;
      }

      const nombreKey = this.normalizarTexto(texto);

      if (nombreKey && keyPorNombre.has(nombreKey)) {
        return keyPorNombre.get(nombreKey)!;
      }

      return texto || nombreKey;
    }

    const uid = String(
      material?.uid ||
      material?.id ||
      material?.materialUid ||
      material?.materialId ||
      material?.idMaterial ||
      ''
    ).trim();

    if (uid && basePorKey.has(uid)) {
      return uid;
    }

    const nombreKey = this.normalizarTexto(
      material?.nombre ||
      material?.materialNombre ||
      material?.nombreMaterial
    );

    if (nombreKey && keyPorNombre.has(nombreKey)) {
      return keyPorNombre.get(nombreKey)!;
    }

    return uid || nombreKey;
  }

  private filtrarItemsPorFecha(
    items: any[],
    fechaInicio: string,
    fechaFin: string
  ): any[] {
    const inicio = this.convertirFechaInput(fechaInicio, false);
    const fin = this.convertirFechaInput(fechaFin, true);

    if (!inicio && !fin) {
      return items;
    }

    return items.filter((item) => {
      const fecha = this.obtenerFechaItem(item);

      if (!fecha) {
        return false;
      }

      if (inicio && fecha.getTime() < inicio.getTime()) {
        return false;
      }

      if (fin && fecha.getTime() > fin.getTime()) {
        return false;
      }

      return true;
    });
  }

  private obtenerFechaItem(item: any): Date | null {
    return this.convertirFecha(
      item?.fechaProgramada ||
      item?.fechaTrabajo ||
      item?.fechaDevolucion ||
      item?.fechaValidacion ||
      item?.fechaRegistro ||
      item?.creadoEn ||
      item?.fechaCreacion ||
      item?.createdAt ||
      item?.fecha ||
      item?.actualizadoEn
    );
  }

  private convertirFechaInput(
    valor: string,
    finDelDia: boolean
  ): Date | null {
    if (!valor) {
      return null;
    }

    const partes = valor.split('-');

    if (partes.length !== 3) {
      return null;
    }

    const anio = Number(partes[0]);
    const mes = Number(partes[1]);
    const dia = Number(partes[2]);

    if (!anio || !mes || !dia) {
      return null;
    }

    const fecha = new Date(anio, mes - 1, dia);

    if (finDelDia) {
      fecha.setHours(23, 59, 59, 999);
    } else {
      fecha.setHours(0, 0, 0, 0);
    }

    return fecha;
  }

  private obtenerEstadoStock(
    stockActual: number,
    stockMinimo: number
  ): string {
    if (stockActual <= 0) {
      return 'sin_stock';
    }

    if (stockMinimo > 0 && stockActual <= stockMinimo) {
      return 'stock_bajo';
    }

    return 'stock_ok';
  }

  private obtenerEstadoStockTexto(estado: string): string {
    const textos: Record<string, string> = {
      stock_ok: 'Stock suficiente',
      stock_bajo: 'Stock bajo',
      sin_stock: 'Sin stock'
    };

    return textos[estado] || 'Stock suficiente';
  }

  private obtenerEstadoStockClase(estado: string): string {
    if (estado === 'sin_stock') {
      return 'danger';
    }

    if (estado === 'stock_bajo') {
      return 'warning';
    }

    return 'success';
  }

  private esRegistroActivo(item: any): boolean {
    if (!item) {
      return false;
    }

    if (item?.eliminado === true || item?.eliminada === true) {
      return false;
    }

    if (item?.activo === false) {
      return false;
    }

    if (String(item?.estado || '').trim().toLowerCase() === 'eliminado') {
      return false;
    }

    return true;
  }

  private obtenerNumero(valor: any): number {
    if (typeof valor === 'number') {
      return Number.isNaN(valor) ? 0 : valor;
    }

    const texto = String(valor ?? '')
      .replace(',', '.')
      .replace(/[^\d.-]/g, '')
      .trim();

    const numero = Number(texto);

    return Number.isNaN(numero) ? 0 : numero;
  }

  private obtenerPorcentaje(valor: number, total: number): number {
    if (!total) {
      return 0;
    }

    return Math.round((valor / total) * 100);
  }

  private normalizarTexto(valor: any): string {
    return String(valor || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  private formatearFecha(fecha: Date | null): string {
    if (!fecha) {
      return 'Sin registro';
    }

    return fecha.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  private convertirFecha(valor: any): Date | null {
    if (!valor) {
      return null;
    }

    if (valor instanceof Date && !Number.isNaN(valor.getTime())) {
      return valor;
    }

    if (typeof valor?.toDate === 'function') {
      const fecha = valor.toDate();

      if (fecha instanceof Date && !Number.isNaN(fecha.getTime())) {
        return fecha;
      }
    }

    if (typeof valor?.seconds === 'number') {
      const fecha = new Date(valor.seconds * 1000);

      if (!Number.isNaN(fecha.getTime())) {
        return fecha;
      }
    }

    if (typeof valor === 'string') {
      if (/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
        const [anio, mes, dia] = valor.split('-').map(Number);
        return new Date(anio, mes - 1, dia);
      }

      const fecha = new Date(valor);

      if (!Number.isNaN(fecha.getTime())) {
        return fecha;
      }
    }

    return null;
  }
}