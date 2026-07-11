// src/app/procesos/trabajo.service.ts
import {
  Injectable,
  NgZone,
  inject
} from '@angular/core';

import { Auth } from '@angular/fire/auth';

import {
  BehaviorSubject,
  Observable,
  combineLatest
} from 'rxjs';

import {
  map,
  shareReplay
} from 'rxjs/operators';

import { TrabajoDAO } from '../dao/trabajo.dao';

import {
  CerrarTrabajoData,
  CrearTrabajoData,
  EditarTrabajoData,
  EstadoFiltroTrabajo,
  EstadoPagoTrabajo,
  EstadoTrabajo,
  MetodoPagoTrabajo,
  Trabajo,
  TrabajoEmpleadoAsignado,
  TrabajoEmpleadoDisponible,
  TrabajoMaterialAsignado,
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

        totalPendientes: trabajos.filter((item) =>
          item.estado === 'pendiente'
        ).length,

        totalEnProceso: trabajos.filter((item) =>
          item.estado === 'en_camino' ||
          item.estado === 'en_proceso'
        ).length,

        totalFinalizados: trabajos.filter((item) =>
          item.estado === 'finalizado'
        ).length,

        totalDevoluciones: trabajos.filter((item) =>
          item.estado === 'devolucion_pendiente' ||
          item.estado === 'devolucion_realizada'
        ).length,

        totalCerrados: trabajos.filter((item) =>
          item.estado === 'cerrado'
        ).length,

        totalCancelados: trabajos.filter((item) =>
          item.estado === 'cancelado'
        ).length
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

      const trabajosVista = (trabajos || [])
        .filter((trabajo) => trabajo?.eliminado !== true)
        .map((trabajo) => this.mapearTrabajoVista(trabajo))
        .sort((a, b) => this.ordenarTrabajos(a, b));

      this.zone.run(() => {
        this.trabajosSubject.next(trabajosVista);
      });
    } catch (error) {
      console.error('[TrabajoService] Error cargando trabajos:', error);

      this.zone.run(() => {
        this.trabajosSubject.next([]);
      });
    }
  }

  async recargar(): Promise<void> {
    await this.cargarTrabajos();
  }

  cambiarBusqueda(valor: string): void {
    this.busquedaSubject.next(String(valor || '').trim().toLowerCase());
    this.paginaSubject.next(1);
  }

  buscarTrabajo(valor: string): void {
    this.cambiarBusqueda(valor);
  }

  cambiarFiltro(filtro: EstadoFiltroTrabajo): void {
    this.filtroSubject.next(filtro || 'todos');
    this.paginaSubject.next(1);
  }

  obtenerFiltroActual(): EstadoFiltroTrabajo {
    return this.filtroSubject.value;
  }
  cambiarPagina(pagina: number): void {
    const paginaSegura = Math.max(1, Number(pagina || 1));
    this.paginaSubject.next(paginaSegura);
  }

  irPagina(pagina: number): void {
    this.cambiarPagina(pagina);
  }

  paginaAnterior(): void {
    const paginaActual = Number(this.paginaSubject.value || 1);
    this.paginaSubject.next(Math.max(1, paginaActual - 1));
  }

  paginaSiguiente(totalPaginas = 999999): void {
    const paginaActual = Number(this.paginaSubject.value || 1);
    const limite = Math.max(1, Number(totalPaginas || 1));

    this.paginaSubject.next(
      Math.min(limite, paginaActual + 1)
    );
  }

  obtenerTrabajosActuales(): TrabajoVista[] {
    return [...this.trabajosSubject.value];
  }

  obtenerTrabajoPorUid(uid: string): TrabajoVista | null {
    const uidLimpio = String(uid || '').trim();

    if (!uidLimpio) {
      return null;
    }

    return this.trabajosSubject.value.find((trabajo) =>
      String(trabajo.uid || trabajo.id || '').trim() === uidLimpio
    ) || null;
  }

  async obtenerEmpleadosDisponibles(): Promise<TrabajoEmpleadoDisponible[]> {
    return await this.dao.obtenerEmpleadosDisponiblesUnaVez();
  }

  async obtenerMaterialesDisponibles(): Promise<TrabajoMaterialDisponible[]> {
    return await this.dao.obtenerMaterialesDisponiblesUnaVez();
  }

  async crearTrabajo(data: CrearTrabajoData): Promise<string> {
    this.validarCrearTrabajo(data);

    const trabajo = this.construirTrabajoNuevo(data);

    const trabajoUid = await this.dao.crearTrabajoConAsignacion(trabajo);

    await this.cargarTrabajos();

    return trabajoUid;
  }

  async editarTrabajo(
    dataOrUid: EditarTrabajoData | string,
    dataParametro?: Partial<EditarTrabajoData>
  ): Promise<void> {
    const data = this.normalizarEditarTrabajoData(
      dataOrUid,
      dataParametro
    );

    this.validarEditarTrabajo(data);

    const payload: Partial<Trabajo> = {
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

      empleadosAsignados: this.normalizarEmpleadosAsignados(
        data.empleadosAsignados || []
      ),

      actualizadoPorUid: this.auth.currentUser?.uid || ''
    };

    await this.dao.editarTrabajo(data.uid, payload);

    await this.cargarTrabajos();
  }

  async actualizarTrabajo(
    dataOrUid: EditarTrabajoData | string,
    dataParametro?: Partial<EditarTrabajoData>
  ): Promise<void> {
    await this.editarTrabajo(dataOrUid, dataParametro);
  }

  async cancelarTrabajo(uid: string): Promise<void> {
    const uidLimpio = String(uid || '').trim();

    if (!uidLimpio) {
      throw new Error('trabajo-uid-vacio');
    }

    const trabajo = this.obtenerTrabajoPorUid(uidLimpio);

    if (trabajo && trabajo.estado !== 'pendiente') {
      throw new Error('solo-pendiente-puede-cancelarse');
    }

    await this.dao.cancelarTrabajoPendiente(uidLimpio);

    await this.cargarTrabajos();
  }

  async eliminarTrabajo(uid: string): Promise<void> {
    const uidLimpio = String(uid || '').trim();

    if (!uidLimpio) {
      throw new Error('trabajo-uid-vacio');
    }

    const trabajo = this.obtenerTrabajoPorUid(uidLimpio);

    if (
      trabajo &&
      trabajo.estado !== 'pendiente' &&
      trabajo.estado !== 'cancelado'
    ) {
      throw new Error('solo-pendiente-o-cancelado-puede-eliminarse');
    }

    await this.dao.eliminarTrabajo(uidLimpio);

    await this.cargarTrabajos();
  }

  async restaurarTrabajo(uid: string): Promise<void> {
    const uidLimpio = String(uid || '').trim();

    if (!uidLimpio) {
      throw new Error('trabajo-uid-vacio');
    }

    const trabajo = this.obtenerTrabajoPorUid(uidLimpio);

    if (trabajo && trabajo.estado !== 'cancelado') {
      throw new Error('solo-cancelado-puede-restaurarse');
    }

    await this.dao.restaurarTrabajo(uidLimpio);

    await this.cargarTrabajos();
  }

  async cerrarTrabajo(
    dataOrUid: CerrarTrabajoData | string,
    observacionCierre = ''
  ): Promise<void> {
    const data: CerrarTrabajoData =
      typeof dataOrUid === 'string'
        ? {
            trabajoUid: String(dataOrUid || '').trim(),
            observacionCierre: String(observacionCierre || '').trim()
          }
        : {
            trabajoUid: String(dataOrUid.trabajoUid || '').trim(),
            observacionCierre: String(
              dataOrUid.observacionCierre || ''
            ).trim()
          };

    if (!data.trabajoUid) {
      throw new Error('trabajo-uid-vacio');
    }

    const trabajo = this.obtenerTrabajoPorUid(data.trabajoUid);

    if (trabajo?.estado === 'devolucion_pendiente') {
      throw new Error('trabajo-con-devolucion-pendiente');
    }

    if (
      trabajo &&
      trabajo.estado !== 'finalizado' &&
      trabajo.estado !== 'devolucion_realizada'
    ) {
      throw new Error('trabajo-no-listo-para-cierre');
    }

    await this.dao.cerrarTrabajo(data);

    await this.cargarTrabajos();
  }

  async retrocederEstadoTrabajo(
    trabajo: TrabajoVista,
    motivo = ''
  ): Promise<void> {
    const uid = String(
      trabajo?.uid ||
      trabajo?.id ||
      ''
    ).trim();

    if (!uid) {
      throw new Error('trabajo-uid-vacio');
    }

    const estadoActual = this.normalizarEstado(
      trabajo.estado
    );

    const mapaRetroceso: Partial<
      Record<EstadoTrabajo, EstadoTrabajo>
    > = {
      en_camino: 'pendiente',
      en_proceso: 'en_camino'
    };

    const estadoAnterior = mapaRetroceso[estadoActual];

    if (!estadoAnterior) {
      throw new Error('estado-no-retrocedible');
    }

    const actorUid = this.auth.currentUser?.uid || '';

    const payload: any = {
      estado: estadoAnterior,

      motivoCorreccionEstado: String(
        motivo ||
        'Corrección administrativa'
      ).trim(),

      estadoAntesCorreccion: estadoActual,
      estadoDespuesCorreccion: estadoAnterior,

      corregidoPorUid: actorUid,
      corregidoAt: new Date().toISOString(),

      actualizadoPorUid: actorUid
    };

    if (estadoActual === 'en_camino') {
      payload.enCaminoPorUid = '';
      payload.enCaminoPorNombre = '';
      payload.enCaminoAt = null;
    }

    if (estadoActual === 'en_proceso') {
      payload.iniciadoPorUid = '';
      payload.iniciadoPorNombre = '';
      payload.iniciadoAt = null;
    }

    await this.dao.editarTrabajo(
      uid,
      payload
    );

    await this.cargarTrabajos();
  }
  puedeEditarTrabajo(trabajo: TrabajoVista): boolean {
    return trabajo.estado === 'pendiente';
  }

  puedeCancelarTrabajo(trabajo: TrabajoVista): boolean {
    return trabajo.estado === 'pendiente';
  }

  puedeEliminarTrabajo(trabajo: TrabajoVista): boolean {
    return (
      trabajo.estado === 'pendiente' ||
      trabajo.estado === 'cancelado'
    );
  }

  puedeRestaurarTrabajo(trabajo: TrabajoVista): boolean {
    return trabajo.estado === 'cancelado';
  }

  puedeCerrarTrabajo(trabajo: TrabajoVista): boolean {
    return (
      trabajo.estado === 'finalizado' ||
      trabajo.estado === 'devolucion_realizada'
    );
  }

  private construirTrabajoNuevo(
    data: CrearTrabajoData
  ): Trabajo {
    const empleadosAsignados = this.normalizarEmpleadosAsignados(
      data.empleadosAsignados || []
    );

    const materialesAsignados = this.normalizarMaterialesAsignados(
      data.materialesAsignados || []
    );

    const fecha = new Date();

    const trabajo: Trabajo = {
      codigoTrabajo: this.generarCodigoTrabajoLocal(fecha),

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

      empleadosAsignados,
      materialesAsignados,

      codigoCliente: this.generarCodigoCliente(),
      codigoDevolucion: this.generarCodigoDevolucion(),

      estado: 'pendiente',

      pagoEstado: 'pendiente',
      pagoConfirmado: false,
      montoRecibido: 0,
      metodoPago: 'Otro',

      devolucionRegistrada: false,
      devolucionValidada: false,

      activo: true,
      eliminado: false,

      creadoPorUid: this.auth.currentUser?.uid || '',
      actualizadoPorUid: this.auth.currentUser?.uid || ''
    };

    return trabajo;
  }

  private normalizarEditarTrabajoData(
    dataOrUid: EditarTrabajoData | string,
    dataParametro?: Partial<EditarTrabajoData>
  ): EditarTrabajoData {
    if (typeof dataOrUid === 'string') {
      return {
        uid: String(dataOrUid || '').trim(),

        clienteNombre: String(dataParametro?.clienteNombre || '').trim(),
        clienteTelefono: String(dataParametro?.clienteTelefono || '').trim(),

        direccion: String(dataParametro?.direccion || '').trim(),
        referencia: String(dataParametro?.referencia || '').trim(),

        latitud: dataParametro?.latitud ?? null,
        longitud: dataParametro?.longitud ?? null,
        direccionMapa: String(dataParametro?.direccionMapa || '').trim(),
        ubicacionTextoOriginal: String(
          dataParametro?.ubicacionTextoOriginal || ''
        ).trim(),

        tipoTrabajo: String(dataParametro?.tipoTrabajo || '').trim(),
        descripcion: String(dataParametro?.descripcion || '').trim(),

        fechaProgramada: String(dataParametro?.fechaProgramada || '').trim(),
        horaProgramada: String(dataParametro?.horaProgramada || '').trim(),

        subtotal: Number(dataParametro?.subtotal || 0),

        empleadosAsignados: Array.isArray(dataParametro?.empleadosAsignados)
          ? dataParametro.empleadosAsignados
          : []
      };
    }

    return {
      ...dataOrUid,
      uid: String(dataOrUid.uid || '').trim()
    };
  }

  private validarCrearTrabajo(data: CrearTrabajoData): void {
    const clienteNombre = String(data?.clienteNombre || '').trim();
    const clienteTelefono = String(data?.clienteTelefono || '').trim();
    const direccion = String(data?.direccion || '').trim();
    const tipoTrabajo = String(data?.tipoTrabajo || '').trim();
    const fechaProgramada = String(data?.fechaProgramada || '').trim();
    const horaProgramada = String(data?.horaProgramada || '').trim();

    if (!clienteNombre) {
      throw new Error('cliente-nombre-vacio');
    }

    if (!clienteTelefono) {
      throw new Error('cliente-telefono-vacio');
    }

    if (!direccion) {
      throw new Error('direccion-vacia');
    }

    if (!tipoTrabajo) {
      throw new Error('tipo-trabajo-vacio');
    }

    if (!fechaProgramada) {
      throw new Error('fecha-programada-vacia');
    }

    if (!horaProgramada) {
      throw new Error('hora-programada-vacia');
    }

    if (!Array.isArray(data.empleadosAsignados) || data.empleadosAsignados.length === 0) {
      throw new Error('sin-empleados-asignados');
    }

    if (!Array.isArray(data.materialesAsignados) || data.materialesAsignados.length === 0) {
      throw new Error('sin-materiales-asignados');
    }

    if (Number(data.subtotal || 0) < 0) {
      throw new Error('subtotal-invalido');
    }

    this.validarMaterialesAsignados(data.materialesAsignados);
  }

  private validarEditarTrabajo(data: EditarTrabajoData): void {
    if (!String(data.uid || '').trim()) {
      throw new Error('trabajo-uid-vacio');
    }

    if (!String(data.clienteNombre || '').trim()) {
      throw new Error('cliente-nombre-vacio');
    }

    if (!String(data.clienteTelefono || '').trim()) {
      throw new Error('cliente-telefono-vacio');
    }

    if (!String(data.direccion || '').trim()) {
      throw new Error('direccion-vacia');
    }

    if (!String(data.tipoTrabajo || '').trim()) {
      throw new Error('tipo-trabajo-vacio');
    }

    if (!String(data.fechaProgramada || '').trim()) {
      throw new Error('fecha-programada-vacia');
    }

    if (!String(data.horaProgramada || '').trim()) {
      throw new Error('hora-programada-vacia');
    }

    if (!Array.isArray(data.empleadosAsignados) || data.empleadosAsignados.length === 0) {
      throw new Error('sin-empleados-asignados');
    }

    if (Number(data.subtotal || 0) < 0) {
      throw new Error('subtotal-invalido');
    }
  }

  private validarMaterialesAsignados(
    materiales: TrabajoMaterialAsignado[]
  ): void {
    for (const material of materiales || []) {
      const nombre = String(material?.nombre || 'Material').trim();

      const materialUid = String(
        material?.materialUid ||
        (material as any)?.uid ||
        (material as any)?.id ||
        ''
      ).trim();

      const cantidadAsignada = Number(
        material?.cantidadAsignada ??
        (material as any)?.cantidad ??
        0
      );

      if (!materialUid) {
        throw new Error(`material-sin-uid:${nombre}`);
      }

      if (
        !Number.isFinite(cantidadAsignada) ||
        cantidadAsignada <= 0
      ) {
        throw new Error(`cantidad-asignada-invalida:${nombre}`);
      }

      const stockDisponible = Number(
        (material as any)?.stockActual ??
        material?.stockAntes ??
        NaN
      );

      if (
        Number.isFinite(stockDisponible) &&
        stockDisponible >= 0 &&
        cantidadAsignada > stockDisponible
      ) {
        throw new Error(`stock-insuficiente:${nombre}`);
      }
    }
  }

  private normalizarEmpleadosAsignados(
    empleados: TrabajoEmpleadoAsignado[]
  ): TrabajoEmpleadoAsignado[] {
    return (empleados || [])
      .map((empleado: any) => {
        const uid = String(
          empleado?.uid ||
          empleado?.id ||
          ''
        ).trim();

        const nombreCompleto = String(
          empleado?.nombreCompleto ||
          `${empleado?.nombres || ''} ${empleado?.apellidos || ''}`.trim() ||
          empleado?.usuario ||
          'Empleado'
        ).trim();

        return {
          uid,
          nombreCompleto,
          usuario: String(empleado?.usuario || '').trim(),
          cargo: String(empleado?.cargo || 'Personal operativo').trim()
        };
      })
      .filter((empleado) => !!empleado.uid);
  }

  private normalizarMaterialesAsignados(
    materiales: TrabajoMaterialAsignado[]
  ): TrabajoMaterialAsignado[] {
    return (materiales || [])
      .map((material: any) => {
        const materialUid = String(
          material?.materialUid ||
          material?.uid ||
          material?.id ||
          material?.materialId ||
          ''
        ).trim();

        const nombre = String(
          material?.nombre ||
          material?.materialNombre ||
          'Material'
        ).trim();

        const categoria = String(
          material?.categoria ||
          'Sin categoría'
        ).trim();

        const unidad = String(
          material?.unidad ||
          'und'
        ).trim();

        const cantidadAsignada = Number(
          material?.cantidadAsignada ??
          material?.cantidad ??
          material?.cantidadEntregada ??
          0
        );

        const precioUnitario = Number(
          material?.precioUnitario ??
          material?.precio ??
          0
        );

        const stockActual = Number(
          material?.stockActual ??
          material?.stockAntes ??
          NaN
        );

        const item: TrabajoMaterialAsignado = {
          materialUid,

          nombre,
          categoria,
          unidad,

          cantidadAsignada,

          cantidadUsada: 0,
          cantidadDevuelta: 0,

          devolucionValidada: false
        };

        if (Number.isFinite(stockActual)) {
          item.stockAntes = stockActual;
          item.stockDespues = stockActual - cantidadAsignada;
        }

        if (precioUnitario > 0) {
          item.precioUnitario = precioUnitario;
          item.subtotalMaterial = precioUnitario * cantidadAsignada;
        }

        if (material?.imagenUrl) {
          item.imagenUrl = String(material.imagenUrl || '').trim();
        }

        return item;
      })
      .filter((material) =>
        !!material.materialUid &&
        Number(material.cantidadAsignada || 0) > 0
      );
  }

  private mapearTrabajoVista(
    trabajo: Trabajo
  ): TrabajoVista {
    const uid = String(trabajo.uid || trabajo.id || '').trim();
    const id = String(trabajo.id || uid).trim();

    const estado = this.normalizarEstado(trabajo.estado);

    const empleadosAsignados = Array.isArray(trabajo.empleadosAsignados)
      ? trabajo.empleadosAsignados
      : [];

    const materialesAsignados = Array.isArray(trabajo.materialesAsignados)
      ? trabajo.materialesAsignados
      : [];

    const subtotal = Number(trabajo.subtotal || 0);

    const pagoEstado = this.normalizarEstadoPago(
      trabajo.pagoEstado ||
      (trabajo as any).estadoPago ||
      'pendiente'
    );

    const metodoPago = this.normalizarMetodoPago(
      trabajo.metodoPago ||
      (trabajo as any).medioPago ||
      'Otro'
    );

    const trabajoVista: any = {
      ...trabajo,

      id,
      uid,

      codigoTrabajo: this.obtenerCodigoTrabajo({
        ...trabajo,
        id,
        uid
      }),

      clienteNombre: String(trabajo.clienteNombre || 'Sin cliente').trim(),
      clienteTelefono: String(trabajo.clienteTelefono || '').trim(),

      direccion: String(trabajo.direccion || '').trim(),
      referencia: String(trabajo.referencia || '').trim(),

      latitud: trabajo.latitud ?? null,
      longitud: trabajo.longitud ?? null,
      direccionMapa: String(trabajo.direccionMapa || '').trim(),
      ubicacionTextoOriginal: String(
        trabajo.ubicacionTextoOriginal || ''
      ).trim(),

      tipoTrabajo: String(trabajo.tipoTrabajo || 'Trabajo').trim(),
      descripcion: String(trabajo.descripcion || '').trim(),

      fechaProgramada: String(trabajo.fechaProgramada || '').trim(),
      horaProgramada: String(trabajo.horaProgramada || '').trim(),

      subtotal,

      empleadosAsignados,
      materialesAsignados,

      codigoCliente: String(trabajo.codigoCliente || '').trim(),
      codigoDevolucion: String(trabajo.codigoDevolucion || '').trim(),

      estado,

      pagoEstado,
      pagoConfirmado: trabajo.pagoConfirmado === true,
      montoRecibido: Number(trabajo.montoRecibido || 0),
      metodoPago,
      observacionPago: String(trabajo.observacionPago || '').trim(),

      devolucionRegistrada: trabajo.devolucionRegistrada === true,
      devolucionValidada: trabajo.devolucionValidada === true,

      activo: trabajo.activo !== false,
      eliminado: trabajo.eliminado === true,

      estadoTexto: this.obtenerEstadoTexto(estado),
      estadoClase: this.obtenerEstadoClase(estado),

      fechaHoraTexto: this.obtenerFechaHoraTexto(
        String(trabajo.fechaProgramada || '').trim(),
        String(trabajo.horaProgramada || '').trim()
      ),

      subtotalTexto: this.formatearSoles(subtotal),

      direccionTexto: this.obtenerDireccionTexto(trabajo),

      empleadosTexto: this.obtenerEmpleadosTexto(empleadosAsignados),
      materialesTexto: this.obtenerMaterialesTexto(materialesAsignados),

      pagoTexto: this.obtenerPagoTexto(
        pagoEstado,
        Number(trabajo.montoRecibido || 0),
        metodoPago
      ),

      devolucionTexto: this.obtenerDevolucionTexto(trabajo, estado),

      puedeEditar: estado === 'pendiente',
      puedeCancelar: estado === 'pendiente',
      puedeEliminar:
        estado === 'pendiente' ||
        estado === 'cancelado',
      puedeRestaurar: estado === 'cancelado',
      puedeCerrar:
        estado === 'finalizado' ||
        estado === 'devolucion_realizada'
    };

    return trabajoVista as TrabajoVista;
  }

  private aplicarFiltros(
    trabajos: TrabajoVista[],
    busqueda: string,
    filtro: EstadoFiltroTrabajo
  ): TrabajoVista[] {
    const textoBusqueda = String(busqueda || '').trim().toLowerCase();

    return (trabajos || [])
      .filter((trabajo) => this.cumpleFiltroEstado(trabajo, filtro))
      .filter((trabajo) => {
        if (!textoBusqueda) {
          return true;
        }

        const empleadosTexto = String(
          trabajo.empleadosTexto ||
          ''
        ).toLowerCase();

        const materialesTexto = String(
          trabajo.materialesTexto ||
          ''
        ).toLowerCase();

        const texto = [
          trabajo.codigoTrabajo,
          trabajo.clienteNombre,
          trabajo.clienteTelefono,
          trabajo.direccion,
          (trabajo as any).direccionTexto,
          trabajo.referencia,
          trabajo.tipoTrabajo,
          trabajo.descripcion,
          trabajo.estadoTexto,
          empleadosTexto,
          materialesTexto
        ]
          .join(' ')
          .toLowerCase();

        return texto.includes(textoBusqueda);
      });
  }

  private cumpleFiltroEstado(
    trabajo: TrabajoVista,
    filtro: EstadoFiltroTrabajo
  ): boolean {
    const estado = this.normalizarEstado(trabajo.estado);

    if (filtro === 'todos') {
      return true;
    }

    if (filtro === 'pendientes') {
      return estado === 'pendiente';
    }

    if (filtro === 'enProceso') {
      return (
        estado === 'en_camino' ||
        estado === 'en_proceso'
      );
    }

    if (filtro === 'finalizados') {
      return estado === 'finalizado';
    }

    if (filtro === 'devoluciones') {
      return (
        estado === 'devolucion_pendiente' ||
        estado === 'devolucion_realizada'
      );
    }

    if (filtro === 'cerrados') {
      return estado === 'cerrado';
    }

    if (filtro === 'cancelados') {
      return estado === 'cancelado';
    }

    return true;
  }

  private ordenarTrabajos(
    a: TrabajoVista,
    b: TrabajoVista
  ): number {
    const ordenEstado =
      this.ordenEstado(a.estado) - this.ordenEstado(b.estado);

    if (ordenEstado !== 0) {
      return ordenEstado;
    }

    const fechaA = `${a.fechaProgramada || ''} ${a.horaProgramada || ''}`;
    const fechaB = `${b.fechaProgramada || ''} ${b.horaProgramada || ''}`;

    return fechaB.localeCompare(fechaA);
  }

  private ordenEstado(estado: EstadoTrabajo): number {
    const mapa: Record<EstadoTrabajo, number> = {
      en_proceso: 1,
      en_camino: 2,
      pendiente: 3,
      devolucion_pendiente: 4,
      finalizado: 5,
      devolucion_realizada: 6,
      cerrado: 7,
      cancelado: 8
    };

    return mapa[estado] || 99;
  }

  private normalizarEstado(valor: any): EstadoTrabajo {
    const estado = String(valor || '').trim();

    if (estado === 'enCamino') {
      return 'en_camino';
    }

    if (estado === 'enProceso') {
      return 'en_proceso';
    }

    if (estado === 'devolucionPendiente') {
      return 'devolucion_pendiente';
    }

    if (estado === 'devolucionRealizada') {
      return 'devolucion_realizada';
    }

    const estadosValidos: EstadoTrabajo[] = [
      'pendiente',
      'en_camino',
      'en_proceso',
      'finalizado',
      'devolucion_pendiente',
      'devolucion_realizada',
      'cerrado',
      'cancelado'
    ];

    return estadosValidos.includes(estado as EstadoTrabajo)
      ? estado as EstadoTrabajo
      : 'pendiente';
  }

  obtenerEstadoTexto(estado: EstadoTrabajo): string {
    const mapa: Record<EstadoTrabajo, string> = {
      pendiente: 'Pendiente',
      en_camino: 'En camino',
      en_proceso: 'En proceso',
      finalizado: 'Finalizado',
      devolucion_pendiente: 'Devolución pendiente',
      devolucion_realizada: 'Devolución realizada',
      cerrado: 'Cerrado',
      cancelado: 'Cancelado'
    };

    return mapa[estado] || 'Pendiente';
  }

  obtenerEstadoClase(estado: EstadoTrabajo): string {
    if (estado === 'pendiente') {
      return 'pendiente';
    }

    if (
      estado === 'en_camino' ||
      estado === 'en_proceso'
    ) {
      return 'proceso';
    }

    if (estado === 'finalizado') {
      return 'finalizado';
    }

    if (estado === 'devolucion_pendiente') {
      return 'devolucion_pendiente';
    }

    if (estado === 'devolucion_realizada') {
      return 'devolucion_realizada';
    }

    if (estado === 'cerrado') {
      return 'cerrado';
    }

    if (estado === 'cancelado') {
      return 'cancelado';
    }

    return 'pendiente';
  }

  private normalizarEstadoPago(valor: any): EstadoPagoTrabajo {
    const estado = String(valor || '').trim().toLowerCase();

    if (estado === 'pagado') {
      return 'pagado';
    }

    if (estado === 'parcial') {
      return 'parcial';
    }

    return 'pendiente';
  }

  private normalizarMetodoPago(valor: any): MetodoPagoTrabajo {
    const metodo = String(valor || '').trim();

    const metodos: MetodoPagoTrabajo[] = [
      'Efectivo',
      'Yape',
      'Plin',
      'Transferencia',
      'Tarjeta',
      'Otro'
    ];

    return metodos.includes(metodo as MetodoPagoTrabajo)
      ? metodo as MetodoPagoTrabajo
      : 'Otro';
  }

  private obtenerFechaHoraTexto(
    fecha: string,
    hora: string
  ): string {
    const fechaTexto = String(fecha || '').trim();
    const horaTexto = String(hora || '').trim();

    if (fechaTexto && horaTexto) {
      return `${fechaTexto} · ${horaTexto}`;
    }

    if (fechaTexto) {
      return fechaTexto;
    }

    if (horaTexto) {
      return horaTexto;
    }

    return 'Sin fecha programada';
  }

  private obtenerDireccionTexto(trabajo: Trabajo): string {
    const direccionMapa = String(trabajo.direccionMapa || '').trim();
    const direccion = String(trabajo.direccion || '').trim();
    const ubicacionOriginal = String(
      trabajo.ubicacionTextoOriginal || ''
    ).trim();

    return direccionMapa || direccion || ubicacionOriginal || 'Sin dirección';
  }

  private obtenerEmpleadosTexto(
    empleados: TrabajoEmpleadoAsignado[]
  ): string {
    if (!Array.isArray(empleados) || empleados.length === 0) {
      return 'Sin empleados asignados';
    }

    return empleados
      .map((empleado: any) =>
        empleado.nombreCompleto ||
        empleado.nombres ||
        empleado.usuario ||
        'Empleado'
      )
      .join(', ');
  }

  private obtenerMaterialesTexto(
    materiales: TrabajoMaterialAsignado[]
  ): string {
    if (!Array.isArray(materiales) || materiales.length === 0) {
      return 'Sin materiales asignados';
    }

    return materiales
      .map((material: any) => {
        const nombre = String(
          material.nombre ||
          material.materialNombre ||
          'Material'
        ).trim();

        const unidad = String(material.unidad || 'und').trim();

        const asignada = Number(
          material.cantidadAsignada ??
          material.cantidad ??
          0
        );

        const usada = Number(material.cantidadUsada || 0);
        const devuelta = Number(material.cantidadDevuelta || 0);

        if (usada > 0 || devuelta > 0) {
          return `${nombre}: asignado ${asignada} ${unidad}, usado ${usada}, devuelto ${devuelta}`;
        }

        return `${nombre}: ${asignada} ${unidad}`;
      })
      .join(', ');
  }

  private obtenerPagoTexto(
    estado: EstadoPagoTrabajo,
    monto: number,
    metodo: MetodoPagoTrabajo
  ): string {
    if (estado === 'pagado') {
      return `Pagado · ${this.formatearSoles(monto)} · ${metodo}`;
    }

    if (estado === 'parcial') {
      return `Pago parcial · ${this.formatearSoles(monto)} · ${metodo}`;
    }

    return 'Pago pendiente';
  }

  private obtenerDevolucionTexto(
    trabajo: Trabajo,
    estado: EstadoTrabajo
  ): string {
    if (estado === 'devolucion_pendiente') {
      return 'Materiales sobrantes pendientes de devolución';
    }

    if (estado === 'devolucion_realizada') {
      return 'Devolución realizada y stock actualizado';
    }

    if (trabajo.devolucionValidada === true) {
      return 'Devolución validada';
    }

    if (trabajo.devolucionRegistrada === true) {
      return 'Devolución registrada';
    }

    return 'Sin devolución pendiente';
  }

  private obtenerCodigoTrabajo(trabajo: any): string {
    const codigoGuardado = String(
      trabajo?.codigoSeguimiento ||
      trabajo?.codigoTrabajo ||
      trabajo?.codigo ||
      trabajo?.numero ||
      ''
    ).trim();

    if (/^T-\d{5}$/i.test(codigoGuardado)) {
      return codigoGuardado.toUpperCase();
    }

    const id = String(trabajo?.id || '').trim();

    if (/^T-\d{5}$/i.test(id)) {
      return id.toUpperCase();
    }

    const base = String(
      trabajo?.uid ||
      trabajo?.id ||
      trabajo?.clienteNombre ||
      'TRABAJO'
    );

    const numero = this.generarNumeroDesdeTexto(base);

    return `T-${numero.toString().padStart(5, '0')}`;
  }

  private generarCodigoTrabajoLocal(fecha: Date): string {
    const base =
      fecha.getTime().toString() +
      Math.floor(Math.random() * 99999).toString();

    const numero = this.generarNumeroDesdeTexto(base);

    return `T-${numero.toString().padStart(5, '0')}`;
  }

  private generarCodigoCliente(): string {
    return this.generarCodigoSimple('CL');
  }

  private generarCodigoDevolucion(): string {
    return this.generarCodigoSimple('DV');
  }

  private generarCodigoSimple(prefijo: string): string {
    const numero = Math.floor(100000 + Math.random() * 900000);
    return `${prefijo}-${numero}`;
  }

  private generarNumeroDesdeTexto(texto: string): number {
    let hash = 0;

    for (let i = 0; i < texto.length; i++) {
      hash = ((hash << 5) - hash) + texto.charCodeAt(i);
      hash |= 0;
    }

    return Math.abs(hash) % 100000;
  }

  private formatearSoles(valor: number): string {
    return `S/ ${Number(valor || 0).toFixed(2)}`;
  }
}

