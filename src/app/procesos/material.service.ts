// src/app/procesos/material.service.ts
import { Injectable, inject, NgZone } from '@angular/core';
import { Auth } from '@angular/fire/auth';

import {
  BehaviorSubject,
  combineLatest,
  Observable
} from 'rxjs';

import {
  map,
  shareReplay
} from 'rxjs/operators';

import { MaterialDAO } from '../dao/material.dao';
import { NotificacionDAO } from '../dao/notificacion.dao';

import {
  CrearMaterialData,
  EditarMaterialData,
  EstadoFiltroMaterial,
  Material,
  MaterialVista,
  MaterialesViewModel
} from '../modelos/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private dao = inject(MaterialDAO);
  private notificacionDAO = inject(NotificacionDAO);
  private auth = inject(Auth);
  private zone = inject(NgZone);

  private materialesSubject = new BehaviorSubject<MaterialVista[]>([]);
  private busquedaSubject = new BehaviorSubject<string>('');
  private filtroSubject = new BehaviorSubject<EstadoFiltroMaterial>('todos');
  private paginaSubject = new BehaviorSubject<number>(1);

  private readonly tamanioPagina = 5;

  vm$: Observable<MaterialesViewModel> = combineLatest([
    this.materialesSubject.asObservable(),
    this.busquedaSubject.asObservable(),
    this.filtroSubject.asObservable(),
    this.paginaSubject.asObservable()
  ]).pipe(
    map(([materiales, busqueda, filtro, paginaActual]) => {
      const materialesFiltrados = this.aplicarFiltros(
        materiales,
        busqueda,
        filtro
      );

      const totalPaginas = Math.max(
        1,
        Math.ceil(materialesFiltrados.length / this.tamanioPagina)
      );

      const paginaSegura = Math.min(
        Math.max(1, paginaActual),
        totalPaginas
      );

      const inicio = (paginaSegura - 1) * this.tamanioPagina;
      const fin = inicio + this.tamanioPagina;

      const materialesPagina = materialesFiltrados.slice(inicio, fin);

      const paginas = Array.from(
        { length: totalPaginas },
        (_, index) => index + 1
      );

      return {
        materiales,
        materialesFiltrados,
        materialesPagina,

        busqueda,
        filtro,

        paginaActual: paginaSegura,
        totalPaginas,
        paginas,

        totalMateriales: materiales.length,
        totalDisponibles: materiales.filter(
          (material) => material.estadoStock === 'disponible'
        ).length,
        totalStockBajo: materiales.filter(
          (material) => material.estadoStock === 'bajo'
        ).length
      };
    }),
    shareReplay({
      bufferSize: 1,
      refCount: false
    })
  );

  constructor() {
    void this.cargarMateriales();
  }

  async cargarMateriales(): Promise<void> {
    try {
      const materiales = await this.dao.obtenerMaterialesUnaVez();

      const materialesVista = materiales
        .filter((material) => material.eliminado !== true)
        .map((material) => this.mapearMaterialVista(material))
        .sort((a, b) => {
          const nombreA = a.nombre || '';
          const nombreB = b.nombre || '';

          return nombreA.localeCompare(nombreB);
        });

      this.zone.run(() => {
        this.materialesSubject.next(materialesVista);
      });
    } catch (error) {
      console.error('[MaterialService] Error al cargar materiales:', error);

      this.zone.run(() => {
        this.materialesSubject.next([]);
      });
    }
  }

  refrescarVista(): Promise<void> {
    return this.cargarMateriales();
  }

  cambiarBusqueda(valor: string) {
    this.busquedaSubject.next(
      String(valor || '').trim().toLowerCase()
    );

    this.paginaSubject.next(1);
  }

  cambiarFiltro(filtro: EstadoFiltroMaterial) {
    this.filtroSubject.next(filtro);
    this.paginaSubject.next(1);
  }

  obtenerFiltroActual(): EstadoFiltroMaterial {
    return this.filtroSubject.value;
  }

  paginaAnterior() {
    const paginaActual = this.paginaSubject.value;

    if (paginaActual > 1) {
      this.paginaSubject.next(paginaActual - 1);
    }
  }

  paginaSiguiente(totalPaginas: number) {
    const paginaActual = this.paginaSubject.value;

    if (paginaActual < totalPaginas) {
      this.paginaSubject.next(paginaActual + 1);
    }
  }

  irPagina(pagina: number) {
    if (pagina >= 1) {
      this.paginaSubject.next(pagina);
    }
  }

  async crearMaterial(data: CrearMaterialData): Promise<void> {
    const nombre = String(data.nombre || '').trim();
    const nombreNormalizado = this.normalizarTexto(nombre);

    if (!nombre) {
      throw new Error('material-nombre-vacio');
    }

    if (await this.dao.existeNombre(nombreNormalizado)) {
      throw new Error('material-duplicado');
    }

    const stockInicial = Number(data.stockInicial || 0);
    const stockMinimo = Number(data.stockMinimo || 0);
    const unidad = String(data.unidad || '').trim();
    const adminUid = this.auth.currentUser?.uid || '';

    const material: Material = {
      nombre,
      nombreNormalizado,

      unidad,
      categoria: String(data.categoria || '').trim(),
      descripcion: String(data.descripcion || '').trim(),

      stockActual: stockInicial,
      stockMinimo,

      imagenUrl: '',
      imagenPath: '',

      activo: true,
      eliminado: false,

      creadoPorUid: adminUid
    };

    const materialUid = await this.dao.crearMaterial(material);

    await this.sincronizarAlertaStockBajo(
      materialUid,
      nombre,
      stockInicial,
      stockMinimo,
      unidad
    );

    if (data.imagenFile) {
      const imagen = await this.dao.subirImagenMaterial(
        materialUid,
        data.imagenFile
      );

      await this.dao.editarMaterial(materialUid, {
        imagenUrl: imagen.imagenUrl,
        imagenPath: imagen.imagenPath
      });
    }

    if (stockInicial > 0) {
      await this.dao.registrarMovimiento({
        materialUid,
        materialNombre: nombre,
        tipoMovimiento: 'entrada',
        cantidad: stockInicial,
        stockAntes: 0,
        stockDespues: stockInicial,
        moduloOrigen: 'registro_material',
        descripcion: 'Registro inicial de material'
      });
    }

    await this.dao.registrarHistorial(
      'crear_material',
      `Se registró el material ${nombre}.`,
      materialUid
    );

    await this.cargarMateriales();
  }

  async editarMaterial(data: EditarMaterialData): Promise<void> {
    const nombre = String(data.nombre || '').trim();
    const nombreNormalizado = this.normalizarTexto(nombre);

    if (!data.uid) {
      throw new Error('material-uid-vacio');
    }

    if (!nombre) {
      throw new Error('material-nombre-vacio');
    }

    if (await this.dao.existeNombre(nombreNormalizado, data.uid)) {
      throw new Error('material-duplicado');
    }

    const materialActual = await this.dao.obtenerMaterialPorUid(data.uid);

    const stockActual = Number(materialActual?.stockActual || 0);
    const stockMinimoNuevo = Number(data.stockMinimo || 0);
    const unidad = String(data.unidad || materialActual?.unidad || '').trim();

    const payload: Partial<Material> = {
      nombre,
      nombreNormalizado,

      unidad,
      categoria: String(data.categoria || '').trim(),
      descripcion: String(data.descripcion || '').trim(),

      stockMinimo: stockMinimoNuevo,

      actualizadoPorUid: this.auth.currentUser?.uid || ''
    };

    if (data.quitarImagen) {
      if (data.imagenPathActual) {
        await this.dao.eliminarImagenPorPath(data.imagenPathActual);
      }

      payload.imagenUrl = '';
      payload.imagenPath = '';
    }

    if (data.imagenFile) {
      if (data.imagenPathActual) {
        await this.dao.eliminarImagenPorPath(data.imagenPathActual);
      }

      const imagen = await this.dao.subirImagenMaterial(
        data.uid,
        data.imagenFile
      );

      payload.imagenUrl = imagen.imagenUrl;
      payload.imagenPath = imagen.imagenPath;
    }

    await this.dao.editarMaterial(data.uid, payload);

    await this.sincronizarAlertaStockBajo(
      data.uid,
      nombre,
      stockActual,
      stockMinimoNuevo,
      unidad
    );

    await this.dao.registrarHistorial(
      'editar_material',
      `Se actualizó el material ${nombre}.`,
      data.uid
    );

    await this.cargarMateriales();
  }

  async eliminarMaterial(
    uid: string,
    nombre: string
  ): Promise<void> {
    if (!uid) {
      throw new Error('material-uid-vacio');
    }

    await this.dao.eliminarMaterial(uid);

    await this.notificacionDAO.resolverAlertaStockBajo(uid);

    await this.dao.registrarHistorial(
      'eliminar_material',
      `Se eliminó el material ${nombre}.`,
      uid
    );

    await this.cargarMateriales();
  }

  normalizarTexto(valor: string): string {
    return String(valor || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ');
  }

  private async sincronizarAlertaStockBajo(
    materialUid: string,
    nombre: string,
    stockActual: number,
    stockMinimo: number,
    unidad: string
  ): Promise<void> {
    try {
      const estaEnStockBajo =
        stockMinimo > 0 && stockActual <= stockMinimo;

      if (estaEnStockBajo) {
        await this.notificacionDAO.crearOActualizarAlertaStockBajo({
          materialUid,
          materialNombre: nombre,
          stockActual,
          stockMinimo,
          unidad
        });

        return;
      }

      await this.notificacionDAO.resolverAlertaStockBajo(materialUid);
    } catch (error) {
      console.warn(
        '[MaterialService] No se pudo sincronizar la alerta de stock bajo:',
        error
      );
    }
  }

  private aplicarFiltros(
    materiales: MaterialVista[],
    busqueda: string,
    filtro: EstadoFiltroMaterial
  ): MaterialVista[] {
    let resultado = [...materiales];

    if (filtro === 'disponibles') {
      resultado = resultado.filter(
        (material) => material.estadoStock === 'disponible'
      );
    }

    if (filtro === 'stockBajo') {
      resultado = resultado.filter(
        (material) => material.estadoStock === 'bajo'
      );
    }

    const termino = String(busqueda || '').trim().toLowerCase();

    if (termino) {
      resultado = resultado.filter((material) => {
        const textoBusqueda = [
          material.nombre,
          material.unidad,
          material.categoria,
          material.descripcion,
          material.estadoTexto
        ]
          .join(' ')
          .toLowerCase();

        return textoBusqueda.includes(termino);
      });
    }

    return resultado;
  }

  private mapearMaterialVista(material: Material): MaterialVista {
    const stockActual = Number(material.stockActual || 0);
    const stockMinimo = Number(material.stockMinimo || 0);

    const estadoStock =
      stockMinimo > 0 && stockActual <= stockMinimo
        ? 'bajo'
        : 'disponible';

    const estadoTexto =
      estadoStock === 'bajo'
        ? 'Stock bajo'
        : 'Disponible';

    return {
      ...material,
      uid: material.uid || material.id,

      iniciales: this.obtenerIniciales(material.nombre),

      estadoStock,
      estadoTexto,

      stockTexto: `${stockActual} ${material.unidad}`,
      stockMinimoTexto: `${stockMinimo} ${material.unidad}`
    };
  }

  private obtenerIniciales(nombre: string): string {
    const palabras = String(nombre || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    const iniciales = palabras
      .slice(0, 2)
      .map((palabra) => palabra.charAt(0))
      .join('')
      .toUpperCase();

    return iniciales || 'MT';
  }
}