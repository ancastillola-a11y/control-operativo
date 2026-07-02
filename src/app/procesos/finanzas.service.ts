// src/app/procesos/finanzas.service.ts
import { Injectable, inject } from '@angular/core';

import {
  BehaviorSubject,
  combineLatest,
  Observable
} from 'rxjs';

import { map } from 'rxjs/operators';

import { FinanzasDAO } from '../dao/finanzas.dao';

import {
  CrearMovimientoFinancieroData,
  EstadoMovimientoFinanciero,
  FiltroFinanzas,
  FinanzasViewModel,
  MovimientoFinanciero,
  MovimientoFinancieroVista,
  TrabajoFinanzasVista
} from '../modelos/finanzas';

@Injectable({
  providedIn: 'root'
})
export class FinanzasService {
  private finanzasDAO = inject(FinanzasDAO);

  private busquedaSubject = new BehaviorSubject<string>('');
  private filtroSubject = new BehaviorSubject<FiltroFinanzas>('todos');
  private paginaSubject = new BehaviorSubject<number>(1);

  private readonly itemsPorPagina = 6;

  obtenerFinanzas$(): Observable<FinanzasViewModel> {
   return combineLatest([
  this.finanzasDAO.obtenerMovimientos$(),
  this.finanzasDAO.obtenerTrabajosParaFinanzas$(),
  this.busquedaSubject,
  this.filtroSubject,
  this.paginaSubject
]).pipe(
  map(([movimientosBase, trabajosBase, busqueda, filtro, paginaActual]) => {
    const trabajosMap = new Map<string, TrabajoFinanzasVista>();

    (trabajosBase || []).forEach((trabajo) => {
      if (trabajo.uid) {
        trabajosMap.set(trabajo.uid, trabajo);
      }
    });
        const movimientos = (movimientosBase || [])
  .map((item) => this.mapearMovimientoVista(item, trabajosMap))
          .sort((a, b) => this.obtenerFechaMillis(b.createdAt) - this.obtenerFechaMillis(a.createdAt));

        const movimientosFiltrados = this.filtrarMovimientos(
          movimientos,
          busqueda,
          filtro
        );

        const totalPaginas = Math.max(
          1,
          Math.ceil(movimientosFiltrados.length / this.itemsPorPagina)
        );

        const paginaSegura = Math.min(
          Math.max(1, paginaActual),
          totalPaginas
        );

        const inicio = (paginaSegura - 1) * this.itemsPorPagina;

        const movimientosPagina = movimientosFiltrados.slice(
          inicio,
          inicio + this.itemsPorPagina
        );

        const activos = movimientos.filter((item) => item.estado !== 'anulado');

        const totalPorCobrar = activos
          .filter((item) => item.tipo === 'cobro_cliente')
          .reduce((total, item) => total + Number(item.saldoPendiente || 0), 0);

        const totalCobrado = activos
          .filter((item) => item.tipo === 'cobro_cliente')
          .reduce((total, item) => total + Number(item.montoPagado || 0), 0);

        const totalPorPagar = activos
          .filter((item) => item.tipo === 'pago_empleado')
          .reduce((total, item) => total + Number(item.saldoPendiente || 0), 0);

        const totalPagadoEmpleados = activos
          .filter((item) => item.tipo === 'pago_empleado')
          .reduce((total, item) => total + Number(item.montoPagado || 0), 0);

        return {
          movimientos,
          movimientosFiltrados,
          movimientosPagina,

          busqueda,
          filtro,

          paginaActual: paginaSegura,
          totalPaginas,
          paginas: this.generarPaginas(totalPaginas),

          totalMovimientos: movimientos.length,

          totalPorCobrar,
          totalCobrado,
          totalPorPagar,
          totalPagadoEmpleados,

          totalPorCobrarTexto: this.formatearSoles(totalPorCobrar),
          totalCobradoTexto: this.formatearSoles(totalCobrado),
          totalPorPagarTexto: this.formatearSoles(totalPorPagar),
          totalPagadoEmpleadosTexto: this.formatearSoles(totalPagadoEmpleados)
        };
      })
    );
  }

  obtenerTrabajosParaFinanzas$(): Observable<TrabajoFinanzasVista[]> {
    return this.finanzasDAO.obtenerTrabajosParaFinanzas$();
  }

  buscar(texto: string) {
    this.busquedaSubject.next(texto || '');
    this.paginaSubject.next(1);
  }

  cambiarFiltro() {
    const actual = this.filtroSubject.value;

    if (actual === 'todos') {
      this.filtroSubject.next('cobros');
      this.paginaSubject.next(1);
      return;
    }

    if (actual === 'cobros') {
      this.filtroSubject.next('pagos');
      this.paginaSubject.next(1);
      return;
    }

    if (actual === 'pagos') {
      this.filtroSubject.next('pendientes');
      this.paginaSubject.next(1);
      return;
    }

    if (actual === 'pendientes') {
      this.filtroSubject.next('cerrados');
      this.paginaSubject.next(1);
      return;
    }

    this.filtroSubject.next('todos');
    this.paginaSubject.next(1);
  }

  paginaAnterior() {
    this.paginaSubject.next(
      Math.max(1, this.paginaSubject.value - 1)
    );
  }

  paginaSiguiente(totalPaginas: number) {
    this.paginaSubject.next(
      Math.min(totalPaginas, this.paginaSubject.value + 1)
    );
  }

  irPagina(pagina: number) {
    this.paginaSubject.next(pagina);
  }

  async crearMovimiento(data: CrearMovimientoFinancieroData): Promise<void> {
    await this.finanzasDAO.crearMovimiento(data);
  }

  async cerrarMovimiento(movimiento: MovimientoFinancieroVista): Promise<void> {
    const uid = movimiento.uid || movimiento.id || '';

    if (!uid) {
      throw new Error('movimiento-sin-uid');
    }

    const estado: EstadoMovimientoFinanciero =
      movimiento.tipo === 'cobro_cliente' ? 'cobrado' : 'pagado';

    await this.finanzasDAO.actualizarEstadoMovimiento(uid, estado, {
      montoPagado: Number(movimiento.montoTotal || 0),
      saldoPendiente: 0
    });
  }
async sincronizarMontoTrabajo(
  movimiento: MovimientoFinancieroVista
): Promise<void> {
  await this.finanzasDAO.sincronizarTrabajoDesdeMovimiento(movimiento);
}
  async anularMovimiento(movimiento: MovimientoFinancieroVista): Promise<void> {
    const uid = movimiento.uid || movimiento.id || '';

    if (!uid) {
      throw new Error('movimiento-sin-uid');
    }

    await this.finanzasDAO.actualizarEstadoMovimiento(uid, 'anulado', {
      saldoPendiente: 0
    });
  }

  private filtrarMovimientos(
    movimientos: MovimientoFinancieroVista[],
    busqueda: string,
    filtro: FiltroFinanzas
  ): MovimientoFinancieroVista[] {
    const texto = this.normalizar(busqueda);

    return movimientos.filter((item) => {
      const coincideFiltro = this.coincideFiltro(item, filtro);

      const contenido = this.normalizar(
        `${item.codigo} ${item.codigoSeguimiento} ${item.concepto} ${item.personaNombre} ${item.tipoTexto} ${item.estadoTexto} ${item.metodoPagoTexto}`
      );

      const coincideBusqueda = !texto || contenido.includes(texto);

      return coincideFiltro && coincideBusqueda;
    });
  }

  private coincideFiltro(
    item: MovimientoFinancieroVista,
    filtro: FiltroFinanzas
  ): boolean {
    if (filtro === 'todos') {
      return true;
    }

    if (filtro === 'cobros') {
      return item.tipo === 'cobro_cliente';
    }

    if (filtro === 'pagos') {
      return item.tipo === 'pago_empleado';
    }

    if (filtro === 'pendientes') {
      return item.estado === 'pendiente' || item.estado === 'parcial';
    }

    if (filtro === 'cerrados') {
      return item.estado === 'cobrado' || item.estado === 'pagado';
    }

    return true;
  }

  private mapearMovimientoVista(
  item: MovimientoFinanciero,
  trabajosMap: Map<string, TrabajoFinanzasVista> = new Map()
): MovimientoFinancieroVista {
    const tipoTexto = item.tipo === 'cobro_cliente'
      ? 'Cobro a cliente'
      : 'Pago a empleado';

    const personaEtiqueta = item.tipo === 'cobro_cliente'
      ? 'Cliente'
      : 'Empleado';

    const icono = item.tipo === 'cobro_cliente'
      ? 'receipt-outline'
      : 'people-outline';

    const clase = item.tipo === 'cobro_cliente'
      ? 'cobro'
      : 'pago';
const trabajoRelacionado = item.trabajoUid
  ? trabajosMap.get(item.trabajoUid)
  : null;

const codigoSeguimientoReal =
  trabajoRelacionado?.codigoSeguimiento ||
  item.codigoSeguimiento ||
  'T-00000';

    return {
      ...item,
      uid: item.uid || item.id,
      codigo: item.codigo || 'FIN-0000',

      trabajoUid: item.trabajoUid || '',
      codigoSeguimiento: codigoSeguimientoReal,
      codigoSeguimientoTexto: codigoSeguimientoReal,

      concepto: item.concepto || 'Movimiento financiero',
      personaNombre: item.personaNombre || 'Sin nombre',

      montoTotal: Number(item.montoTotal || 0),
      montoPagado: Number(item.montoPagado || 0),
      saldoPendiente: Number(item.saldoPendiente || 0),

      estado: item.estado || 'pendiente',

      tipoTexto,
      personaEtiqueta,
      icono,
      clase,

      estadoTexto: this.obtenerEstadoTexto(item.estado || 'pendiente'),
      estadoClase: item.estado || 'pendiente',

      montoTotalTexto: this.formatearSoles(Number(item.montoTotal || 0)),
      montoPagadoTexto: this.formatearSoles(Number(item.montoPagado || 0)),
      saldoPendienteTexto: this.formatearSoles(Number(item.saldoPendiente || 0)),

      metodoPago: item.metodoPago || 'efectivo',
      metodoPagoTexto: item.metodoPagoTexto || 'Efectivo',

      fechaTexto: this.formatearFecha(item.createdAt)
    };
  }

  private obtenerEstadoTexto(estado: EstadoMovimientoFinanciero): string {
    switch (estado) {
      case 'pendiente':
        return 'Pendiente';

      case 'parcial':
        return 'Parcial';

      case 'cobrado':
        return 'Cobrado';

      case 'pagado':
        return 'Pagado';

      case 'anulado':
        return 'Anulado';

      default:
        return 'Pendiente';
    }
  }

  private formatearSoles(valor: number): string {
    return `S/ ${Number(valor || 0).toFixed(2)}`;
  }

  private formatearFecha(fecha: any): string {
    const date = fecha?.toDate ? fecha.toDate() : null;

    if (!date) {
      return 'Sin fecha';
    }

    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }

  private obtenerFechaMillis(fecha: any): number {
    if (fecha?.toDate) {
      return fecha.toDate().getTime();
    }

    return 0;
  }

  private generarPaginas(totalPaginas: number): number[] {
    return Array.from(
      { length: totalPaginas },
      (_, index) => index + 1
    );
  }

  private normalizar(valor: string): string {
    return String(valor || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}