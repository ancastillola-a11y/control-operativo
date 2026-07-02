// src/app/procesos/trabajo.service.ts
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

import { TrabajoDAO } from '../dao/trabajo.dao';

import {
  CrearTrabajoData,
  EditarTrabajoData,
  EstadoFiltroTrabajo,
  EstadoTrabajo,
  Trabajo,
  TrabajoEmpleadoDisponible,
  TrabajoMaterialDisponible,
  TrabajoVista,
  TrabajosViewModel
} from '../modelos/trabajo';

@Injectable({
  providedIn: 'root'
})
export class TrabajoService {
  private dao = inject(TrabajoDAO);
  private auth = inject(Auth);
  private zone = inject(NgZone);

  private trabajosSubject = new BehaviorSubject<TrabajoVista[]>([]);
  private busquedaSubject = new BehaviorSubject<string>('');
  private filtroSubject = new BehaviorSubject<EstadoFiltroTrabajo>('todos');
  private paginaSubject = new BehaviorSubject<number>(1);

  private readonly tamanioPagina = 5;

  vm$: Observable<TrabajosViewModel> = combineLatest([
    this.trabajosSubject.asObservable(),
    this.busquedaSubject.asObservable(),
    this.filtroSubject.asObservable(),
    this.paginaSubject.asObservable()
  ]).pipe(
    map(([trabajos, busqueda, filtro, paginaActual]) => {
      const trabajosFiltrados = this.aplicarFiltros(
        trabajos,
        busqueda,
        filtro
      );

      const totalPaginas = Math.max(
        1,
        Math.ceil(trabajosFiltrados.length / this.tamanioPagina)
      );

      const paginaSegura = Math.min(
        Math.max(1, paginaActual),
        totalPaginas
      );

      const inicio = (paginaSegura - 1) * this.tamanioPagina;
      const fin = inicio + this.tamanioPagina;

      const trabajosPagina = trabajosFiltrados.slice(inicio, fin);

      const paginas = Array.from(
        { length: totalPaginas },
        (_, index) => index + 1
      );

      return {
        trabajos,
        trabajosFiltrados,
        trabajosPagina,

        busqueda,
        filtro,

        paginaActual: paginaSegura,
        totalPaginas,
        paginas,

        totalTrabajos: trabajos.length,
        totalPendientes: trabajos.filter((item) => item.estado === 'pendiente').length,
        totalEnProceso: trabajos.filter((item) => item.estado === 'en_proceso' || item.estado === 'en_camino').length,
        totalFinalizados: trabajos.filter((item) => item.estado === 'finalizado').length,
        totalCancelados: trabajos.filter((item) => item.estado === 'cancelado').length
      };
    }),
    shareReplay({
      bufferSize: 1,
      refCount: false
    })
  );

  constructor() {
    void this.cargarTrabajos();
  }

  async cargarTrabajos(): Promise<void> {
    try {
      const trabajos = await this.dao.obtenerTrabajosUnaVez();

      const trabajosVista = trabajos
        .filter((trabajo) => trabajo.eliminado !== true)
        .map((trabajo) => this.mapearTrabajoVista(trabajo))
        .sort((a, b) => {
          const fechaA = `${a.fechaProgramada || ''} ${a.horaProgramada || ''}`;
          const fechaB = `${b.fechaProgramada || ''} ${b.horaProgramada || ''}`;

          return fechaB.localeCompare(fechaA);
        });

      this.zone.run(() => {
        this.trabajosSubject.next(trabajosVista);
      });
    } catch (error) {
      console.error('[TrabajoService] Error al cargar trabajos:', error);

      this.zone.run(() => {
        this.trabajosSubject.next([]);
      });
    }
  }

  refrescarVista(): Promise<void> {
    return this.cargarTrabajos();
  }

  async obtenerEmpleadosDisponibles(): Promise<TrabajoEmpleadoDisponible[]> {
    return this.dao.obtenerEmpleadosDisponibles();
  }

  async obtenerMaterialesDisponibles(): Promise<TrabajoMaterialDisponible[]> {
    return this.dao.obtenerMaterialesDisponibles();
  }

  cambiarBusqueda(valor: string) {
    this.busquedaSubject.next(
      String(valor || '').trim().toLowerCase()
    );

    this.paginaSubject.next(1);
  }

  cambiarFiltro(filtro: EstadoFiltroTrabajo) {
    this.filtroSubject.next(filtro);
    this.paginaSubject.next(1);
  }

  obtenerFiltroActual(): EstadoFiltroTrabajo {
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

  async crearTrabajo(data: CrearTrabajoData): Promise<void> {
    const clienteNombre = String(data.clienteNombre || '').trim();

    if (!clienteNombre) {
      throw new Error('cliente-vacio');
    }

    if (!data.empleadosAsignados || data.empleadosAsignados.length === 0) {
      throw new Error('empleados-vacios');
    }

    if (!data.materialesAsignados || data.materialesAsignados.length === 0) {
      throw new Error('materiales-vacios');
    }

    const trabajo: Trabajo = {
      clienteNombre,
      clienteTelefono: String(data.clienteTelefono || '').trim(),
     direccion: String(data.direccion || '').trim(),
referencia: String(data.referencia || '').trim(),

latitud: data.latitud ?? null,
longitud: data.longitud ?? null,
direccionMapa: String(data.direccionMapa || '').trim(),
ubicacionTextoOriginal: String(data.ubicacionTextoOriginal || '').trim(),

tipoTrabajo: String(data.tipoTrabajo || '').trim(),
      descripcion: String(data.descripcion || '').trim(),

      fechaProgramada: String(data.fechaProgramada || '').trim(),
      horaProgramada: String(data.horaProgramada || '').trim(),

      subtotal: Number(data.subtotal || 0),

      empleadosAsignados: data.empleadosAsignados,
      materialesAsignados: data.materialesAsignados,

      codigoCliente: this.generarCodigo(),
      codigoDevolucion: this.generarCodigo(),

      estado: 'pendiente',

      activo: true,
      eliminado: false,

      creadoPorUid: this.auth.currentUser?.uid || ''
    };

    await this.dao.crearTrabajoConAsignacion(trabajo);
    await this.cargarTrabajos();
  }

  async editarTrabajo(data: EditarTrabajoData): Promise<void> {
    if (!data.uid) {
      throw new Error('trabajo-uid-vacio');
    }

    if (!data.empleadosAsignados || data.empleadosAsignados.length === 0) {
      throw new Error('empleados-vacios');
    }

    await this.dao.editarTrabajo(data.uid, {
      clienteNombre: String(data.clienteNombre || '').trim(),
      clienteTelefono: String(data.clienteTelefono || '').trim(),
     direccion: String(data.direccion || '').trim(),
referencia: String(data.referencia || '').trim(),

latitud: data.latitud ?? null,
longitud: data.longitud ?? null,
direccionMapa: String(data.direccionMapa || '').trim(),
ubicacionTextoOriginal: String(data.ubicacionTextoOriginal || '').trim(),

tipoTrabajo: String(data.tipoTrabajo || '').trim(),
      descripcion: String(data.descripcion || '').trim(),

      fechaProgramada: String(data.fechaProgramada || '').trim(),
      horaProgramada: String(data.horaProgramada || '').trim(),

      subtotal: Number(data.subtotal || 0),

      empleadosAsignados: data.empleadosAsignados
    });

    await this.cargarTrabajos();
  }

  async cancelarTrabajo(uid: string): Promise<void> {
    if (!uid) {
      throw new Error('trabajo-uid-vacio');
    }

    await this.dao.cancelarTrabajoPendiente(uid);
    await this.cargarTrabajos();
  }

  async eliminarTrabajo(uid: string): Promise<void> {
    if (!uid) {
      throw new Error('trabajo-uid-vacio');
    }

    await this.dao.eliminarTrabajoLogico(uid);
    await this.cargarTrabajos();
  }

  private aplicarFiltros(
    trabajos: TrabajoVista[],
    busqueda: string,
    filtro: EstadoFiltroTrabajo
  ): TrabajoVista[] {
    let resultado = [...trabajos];

    if (filtro === 'pendientes') {
      resultado = resultado.filter((trabajo) => trabajo.estado === 'pendiente');
    }

    if (filtro === 'enProceso') {
      resultado = resultado.filter((trabajo) =>
        trabajo.estado === 'en_camino' ||
        trabajo.estado === 'en_proceso'
      );
    }

    if (filtro === 'finalizados') {
      resultado = resultado.filter((trabajo) => trabajo.estado === 'finalizado');
    }

    if (filtro === 'cancelados') {
      resultado = resultado.filter((trabajo) => trabajo.estado === 'cancelado');
    }

    const termino = String(busqueda || '').trim().toLowerCase();

    if (termino) {
      resultado = resultado.filter((trabajo) => {
        const textoBusqueda = [
          trabajo.clienteNombre,
          trabajo.clienteTelefono,
          trabajo.direccion,
          trabajo.tipoTrabajo,
          trabajo.estadoTexto,
          trabajo.empleadosTexto,
          trabajo.materialesTexto
        ]
          .join(' ')
          .toLowerCase();

        return textoBusqueda.includes(termino);
      });
    }

    return resultado;
  }

  private mapearTrabajoVista(trabajo: Trabajo): TrabajoVista {
    const estadoTexto = this.obtenerEstadoTexto(trabajo.estado);
    const estadoClase = this.obtenerEstadoClase(trabajo.estado);

    const empleadosTexto = (trabajo.empleadosAsignados || [])
      .map((empleado) => empleado.nombreCompleto)
      .join(', ') || 'Sin empleados';

    const materialesTexto = (trabajo.materialesAsignados || [])
      .map((material) => `${material.nombre} (${material.cantidadAsignada} ${material.unidad})`)
      .join(', ') || 'Sin materiales';

    return {
      ...trabajo,
      uid: trabajo.uid || trabajo.id,

      estadoTexto,
      estadoClase,

      fechaHoraTexto: `${trabajo.fechaProgramada || 'Sin fecha'} - ${trabajo.horaProgramada || 'Sin hora'}`,
      subtotalTexto: `S/ ${Number(trabajo.subtotal || 0).toFixed(2)}`,

      empleadosTexto,
      materialesTexto
    };
  }

  private obtenerEstadoTexto(estado: EstadoTrabajo): string {
    const mapa: Record<EstadoTrabajo, string> = {
      pendiente: 'Pendiente',
      en_camino: 'En camino',
      en_proceso: 'En proceso',
      finalizado: 'Finalizado',
      devolucion_pendiente: 'Devolución pendiente',
      devolucion_realizada: 'Devolución realizada',
      cancelado: 'Cancelado'
    };

    return mapa[estado] || 'Pendiente';
  }

  private obtenerEstadoClase(estado: EstadoTrabajo): string {
    if (estado === 'pendiente') {
      return 'pendiente';
    }

    if (estado === 'en_camino' || estado === 'en_proceso') {
      return 'proceso';
    }

    if (estado === 'finalizado' || estado === 'devolucion_realizada') {
      return 'finalizado';
    }

    if (estado === 'cancelado') {
      return 'cancelado';
    }

    return 'pendiente';
  }

  private generarCodigo(): string {
    return String(
      Math.floor(100000 + Math.random() * 900000)
    );
  }
}