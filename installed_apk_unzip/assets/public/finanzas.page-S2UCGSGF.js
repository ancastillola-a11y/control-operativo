import {
  AdminPaginationComponent,
  AdminSearchFilterComponent
} from "./chunk-2GFNQYCE.js";
import {
  AdminModuleHeroComponent
} from "./chunk-DT73SCF2.js";
import {
  AdminSummaryCardComponent
} from "./chunk-XIEUEHEY.js";
import {
  AdminConfirmModalComponent
} from "./chunk-BZYK3K3H.js";
import {
  AdminEmptyStateComponent
} from "./chunk-SVPM23ZW.js";
import {
  AdminBottomNavComponent,
  AdminHeaderComponent,
  DashboardAdminService
} from "./chunk-CWBZAVOG.js";
import {
  BooleanValueAccessorDirective,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTextarea,
  IonToggle,
  IonToolbar,
  IonicModule,
  ModalController,
  NumericValueAccessorDirective,
  SelectValueAccessorDirective,
  TextValueAccessorDirective,
  ToastController
} from "./chunk-NAACVANG.js";
import "./chunk-EPPHE4UN.js";
import "./chunk-W7NNY2EY.js";
import "./chunk-LHXREQJQ.js";
import "./chunk-BFF6Y7KF.js";
import "./chunk-L57VMHZV.js";
import "./chunk-5IFZKHAO.js";
import "./chunk-A6UEW27P.js";
import "./chunk-DDQGSBPF.js";
import "./chunk-LQMW4QLB.js";
import "./chunk-JK5VI37U.js";
import "./chunk-BDPDEZJG.js";
import "./chunk-BAXNF7WZ.js";
import "./chunk-F3JJ4YWB.js";
import "./chunk-QOQL43QQ.js";
import "./chunk-WMU45OL4.js";
import "./chunk-IVBL4Y7V.js";
import "./chunk-TBCILI2J.js";
import "./chunk-GMY5SBXE.js";
import {
  addOutline,
  alertCircleOutline,
  banOutline,
  briefcaseOutline,
  calendarOutline,
  cardOutline,
  cashOutline,
  checkmarkCircleOutline,
  chevronForwardOutline,
  closeOutline,
  documentTextOutline,
  ellipsisVerticalOutline,
  locationOutline,
  peopleOutline,
  receiptOutline,
  saveOutline,
  searchOutline,
  timeOutline,
  walletOutline
} from "./chunk-XEVVVGO7.js";
import {
  Auth,
  Firestore,
  collection,
  collectionData,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc
} from "./chunk-NMRAWXHA.js";
import {
  AsyncPipe,
  BehaviorSubject,
  CommonModule,
  Component,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  Injectable,
  Input,
  NavController,
  NgClass,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  ReactiveFormsModule,
  Validators,
  catchError,
  combineLatest,
  inject,
  map,
  of,
  setClassMetadata,
  ɵNgNoValidate,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-D2BFCRPD.js";
import {
  addIcons
} from "./chunk-GGIFJ42N.js";
import "./chunk-Q3XTTR4L.js";
import "./chunk-HFIIUGAS.js";
import "./chunk-EYNBDKL4.js";
import "./chunk-GDCLMRGX.js";
import "./chunk-7D2IXJO2.js";
import "./chunk-SQPD43CM.js";
import "./chunk-CIJ2MFME.js";
import "./chunk-YAS4LRVC.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-Q3N56TRI.js";

// src/app/dao/finanzas.dao.ts
var _FinanzasDAO = class _FinanzasDAO {
  constructor() {
    this.firestore = inject(Firestore);
    this.auth = inject(Auth);
  }
  obtenerMovimientos$() {
    const ref = collection(this.firestore, "finanzas_movimientos");
    return collectionData(ref, { idField: "id" }).pipe(map((data) => data.map((item) => __spreadProps(__spreadValues({}, item), {
      uid: item.uid || item.id
    })).filter((item) => item.eliminado !== true)), catchError((error) => {
      console.error("[FinanzasDAO] Error obteniendo movimientos:", error);
      return of([]);
    }));
  }
  obtenerTrabajosParaFinanzas$() {
    const ref = collection(this.firestore, "trabajos");
    return collectionData(ref, { idField: "id" }).pipe(map((data) => data.map((trabajo) => this.mapearTrabajoFinanzas(trabajo)).filter((trabajo) => !!trabajo.uid).sort((a, b) => String(b.uid || "").localeCompare(String(a.uid || "")))), catchError((error) => {
      console.error("[FinanzasDAO] Error obteniendo trabajos:", error);
      return of([]);
    }));
  }
  crearMovimiento(data) {
    return __async(this, null, function* () {
      const ref = doc(collection(this.firestore, "finanzas_movimientos"));
      const adminUid = this.auth.currentUser?.uid || "";
      const montoTotal = Number(data.montoTotal || 0);
      const cerrado = data.estadoInicial === "cerrado";
      const estado = cerrado ? data.tipo === "cobro_cliente" ? "cobrado" : "pagado" : "pendiente";
      const montoPagado = cerrado ? montoTotal : 0;
      const saldoPendiente = cerrado ? 0 : montoTotal;
      const codigo = yield this.generarCodigoMovimiento(data.tipo);
      const metodoPago = data.metodoPago || "efectivo";
      const movimiento = {
        uid: ref.id,
        codigo,
        tipo: data.tipo,
        estado,
        trabajoUid: String(data.trabajoUid || "").trim(),
        codigoSeguimiento: String(data.codigoSeguimiento || "").trim(),
        concepto: String(data.concepto || "").trim(),
        descripcion: String(data.descripcion || "").trim(),
        clienteNombre: String(data.clienteNombre || "").trim(),
        empleadoUid: String(data.empleadoUid || "").trim(),
        empleadoNombre: String(data.empleadoNombre || "").trim(),
        personaNombre: String(data.personaNombre || "").trim(),
        montoTotal,
        montoPagado,
        saldoPendiente,
        metodoPago,
        metodoPagoTexto: this.obtenerMetodoPagoTexto(metodoPago, data.metodoPagoOtro || ""),
        metodoPagoOtro: String(data.metodoPagoOtro || "").trim(),
        observacion: String(data.observacion || "").trim(),
        actualizarMontoTrabajo: data.actualizarMontoTrabajo === true,
        eliminado: false,
        creadoPorUid: adminUid,
        actualizadoPorUid: adminUid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      yield setDoc(ref, movimiento);
      if (movimiento.tipo === "cobro_cliente" && movimiento.actualizarMontoTrabajo === true) {
        yield this.sincronizarTrabajoConCobro(movimiento);
      }
      yield this.registrarHistorial("crear_movimiento_financiero", `Se registr\xF3 ${codigo} para ${movimiento.codigoSeguimiento}.`, ref.id);
      return ref.id;
    });
  }
  actualizarEstadoMovimiento(_0, _1) {
    return __async(this, arguments, function* (uid, estado, data = {}) {
      const ref = doc(this.firestore, "finanzas_movimientos", uid);
      const adminUid = this.auth.currentUser?.uid || "";
      yield updateDoc(ref, __spreadProps(__spreadValues({}, data), {
        estado,
        actualizadoPorUid: adminUid,
        updatedAt: serverTimestamp()
      }));
      yield this.registrarHistorial("actualizar_estado_financiero", `Se actualiz\xF3 el movimiento financiero a ${estado}.`, uid);
    });
  }
  eliminarMovimiento(uid) {
    return __async(this, null, function* () {
      const ref = doc(this.firestore, "finanzas_movimientos", uid);
      const adminUid = this.auth.currentUser?.uid || "";
      yield updateDoc(ref, {
        eliminado: true,
        eliminadoPorUid: adminUid,
        deletedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      yield this.registrarHistorial("eliminar_movimiento_financiero", "Se anul\xF3 un movimiento financiero.", uid);
    });
  }
  sincronizarTrabajoDesdeMovimiento(movimiento) {
    return __async(this, null, function* () {
      if (!movimiento) {
        return;
      }
      if (movimiento.tipo !== "cobro_cliente") {
        return;
      }
      yield this.sincronizarTrabajoConCobro(movimiento);
      yield this.registrarHistorial("sincronizar_monto_trabajo", `Se actualiz\xF3 el monto del trabajo ${movimiento.codigoSeguimiento} desde Finanzas.`, movimiento.uid || movimiento.id || "");
    });
  }
  mapearTrabajoFinanzas(data) {
    const uid = String(data.uid || data.id || "").trim();
    const id = String(data.id || uid).trim();
    const codigoSeguimiento = this.obtenerCodigoSeguimiento(__spreadProps(__spreadValues({}, data), {
      uid,
      id
    }));
    const empleados = Array.isArray(data.empleadosAsignados) ? data.empleadosAsignados.map((empleado) => ({
      uid: String(empleado.uid || "").trim(),
      nombreCompleto: String(empleado.nombreCompleto || empleado.nombres || empleado.nombre || empleado.usuario || "Empleado").trim(),
      usuario: String(empleado.usuario || "").trim(),
      cargo: String(empleado.cargo || "").trim()
    })) : [];
    const fechaProgramada = String(data.fechaProgramada || "").trim();
    const horaProgramada = String(data.horaProgramada || "").trim();
    const fechaHoraTexto = [fechaProgramada, horaProgramada].filter(Boolean).join(" ");
    const subtotal = Number(data.subtotal || 0);
    const trabajo = {
      uid,
      id,
      codigoSeguimiento,
      clienteNombre: String(data.clienteNombre || "Sin cliente").trim(),
      clienteTelefono: String(data.clienteTelefono || "").trim(),
      direccion: String(data.direccion || "").trim(),
      referencia: String(data.referencia || "").trim(),
      tipoTrabajo: String(data.tipoTrabajo || "Trabajo").trim(),
      descripcion: String(data.descripcion || "").trim(),
      fechaProgramada,
      horaProgramada,
      fechaHoraTexto: fechaHoraTexto || "Sin fecha",
      subtotal,
      subtotalTexto: this.formatearSoles(subtotal),
      estado: String(data.estado || "pendiente").trim(),
      estadoTexto: this.obtenerEstadoTrabajoTexto(String(data.estado || "pendiente").trim()),
      empleadosAsignados: empleados,
      empleadosTexto: empleados.length ? empleados.map((item) => item.nombreCompleto).join(", ") : "Sin empleados",
      textoBusqueda: ""
    };
    trabajo.textoBusqueda = this.normalizar(`${trabajo.codigoSeguimiento} ${trabajo.clienteNombre} ${trabajo.direccion} ${trabajo.tipoTrabajo} ${trabajo.empleadosTexto}`);
    return trabajo;
  }
  obtenerCodigoSeguimiento(trabajo) {
    const codigoGuardado = String(trabajo?.codigoSeguimiento || trabajo?.codigoTrabajo || trabajo?.codigo || trabajo?.numero || "").trim();
    if (/^T-\d{5}$/i.test(codigoGuardado)) {
      return codigoGuardado.toUpperCase();
    }
    const id = String(trabajo?.id || "").trim();
    if (/^T-\d{5}$/i.test(id)) {
      return id.toUpperCase();
    }
    const base = String(trabajo?.uid || trabajo?.id || trabajo?.clienteNombre || "TRABAJO");
    const numero = this.generarNumeroDesdeTexto(base);
    return `T-${numero.toString().padStart(5, "0")}`;
  }
  generarNumeroDesdeTexto(texto) {
    let hash = 0;
    for (let i = 0; i < texto.length; i++) {
      hash = (hash << 5) - hash + texto.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % 1e5;
  }
  obtenerEstadoTrabajoTexto(estado) {
    const mapa = {
      pendiente: "Pendiente",
      asignado: "Asignado",
      en_camino: "En camino",
      en_proceso: "En proceso",
      finalizado: "Finalizado",
      devolucion_pendiente: "Devoluci\xF3n pendiente",
      devolucion_realizada: "Devoluci\xF3n realizada",
      cancelado: "Cancelado"
    };
    return mapa[estado] || "Pendiente";
  }
  generarCodigoMovimiento(tipo) {
    return __async(this, null, function* () {
      const prefijo = tipo === "cobro_cliente" ? "COB" : "PAG";
      const fecha = /* @__PURE__ */ new Date();
      const yyyy = fecha.getFullYear();
      const mm = String(fecha.getMonth() + 1).padStart(2, "0");
      const dd = String(fecha.getDate()).padStart(2, "0");
      const random = Math.floor(Math.random() * 9e3 + 1e3);
      return `${prefijo}-${yyyy}${mm}${dd}-${random}`;
    });
  }
  obtenerMetodoPagoTexto(metodo, otro = "") {
    const mapa = {
      efectivo: "Efectivo",
      yape: "Yape",
      plin: "Plin",
      transferencia: "Transferencia bancaria",
      deposito: "Dep\xF3sito",
      tarjeta: "Tarjeta",
      otro: String(otro || "Otro").trim() || "Otro"
    };
    return mapa[metodo] || "Efectivo";
  }
  formatearSoles(valor) {
    return `S/ ${Number(valor || 0).toFixed(2)}`;
  }
  normalizar(valor) {
    return String(valor || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  sincronizarTrabajoConCobro(movimiento) {
    return __async(this, null, function* () {
      const trabajoUid = String(movimiento.trabajoUid || "").trim();
      if (!trabajoUid) {
        return;
      }
      const trabajoRef = doc(this.firestore, "trabajos", trabajoUid);
      yield updateDoc(trabajoRef, {
        subtotal: Number(movimiento.montoTotal || 0),
        montoCliente: Number(movimiento.montoTotal || 0),
        montoCobradoCliente: Number(movimiento.montoPagado || 0),
        saldoCobroCliente: Number(movimiento.saldoPendiente || 0),
        estadoCobroCliente: movimiento.estado === "cobrado" ? "cobrado" : "pendiente",
        metodoCobroCliente: movimiento.metodoPago || "efectivo",
        metodoCobroClienteTexto: movimiento.metodoPagoTexto || "Efectivo",
        codigoSeguimiento: movimiento.codigoSeguimiento,
        finanzasActualizadoEn: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    });
  }
  registrarHistorial(accion, descripcion, movimientoUid) {
    return __async(this, null, function* () {
      const adminUid = this.auth.currentUser?.uid || "";
      const ref = doc(collection(this.firestore, "historial_actividades"));
      yield setDoc(ref, {
        modulo: "SM-1.8 Gesti\xF3n financiera",
        accion,
        descripcion,
        movimientoUid,
        realizadoPorUid: adminUid,
        createdAt: serverTimestamp()
      });
    });
  }
};
_FinanzasDAO.\u0275fac = function FinanzasDAO_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FinanzasDAO)();
};
_FinanzasDAO.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FinanzasDAO, factory: _FinanzasDAO.\u0275fac, providedIn: "root" });
var FinanzasDAO = _FinanzasDAO;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FinanzasDAO, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/procesos/finanzas.service.ts
var _FinanzasService = class _FinanzasService {
  constructor() {
    this.finanzasDAO = inject(FinanzasDAO);
    this.busquedaSubject = new BehaviorSubject("");
    this.filtroSubject = new BehaviorSubject("todos");
    this.paginaSubject = new BehaviorSubject(1);
    this.itemsPorPagina = 6;
  }
  obtenerFinanzas$() {
    return combineLatest([
      this.finanzasDAO.obtenerMovimientos$(),
      this.finanzasDAO.obtenerTrabajosParaFinanzas$(),
      this.busquedaSubject,
      this.filtroSubject,
      this.paginaSubject
    ]).pipe(map(([movimientosBase, trabajosBase, busqueda, filtro, paginaActual]) => {
      const trabajosMap = /* @__PURE__ */ new Map();
      (trabajosBase || []).forEach((trabajo) => {
        if (trabajo.uid) {
          trabajosMap.set(trabajo.uid, trabajo);
        }
      });
      const movimientos = (movimientosBase || []).map((item) => this.mapearMovimientoVista(item, trabajosMap)).sort((a, b) => this.obtenerFechaMillis(b.createdAt) - this.obtenerFechaMillis(a.createdAt));
      const movimientosFiltrados = this.filtrarMovimientos(movimientos, busqueda, filtro);
      const totalPaginas = Math.max(1, Math.ceil(movimientosFiltrados.length / this.itemsPorPagina));
      const paginaSegura = Math.min(Math.max(1, paginaActual), totalPaginas);
      const inicio = (paginaSegura - 1) * this.itemsPorPagina;
      const movimientosPagina = movimientosFiltrados.slice(inicio, inicio + this.itemsPorPagina);
      const activos = movimientos.filter((item) => item.estado !== "anulado");
      const totalPorCobrar = activos.filter((item) => item.tipo === "cobro_cliente").reduce((total, item) => total + Number(item.saldoPendiente || 0), 0);
      const totalCobrado = activos.filter((item) => item.tipo === "cobro_cliente").reduce((total, item) => total + Number(item.montoPagado || 0), 0);
      const totalPorPagar = activos.filter((item) => item.tipo === "pago_empleado").reduce((total, item) => total + Number(item.saldoPendiente || 0), 0);
      const totalPagadoEmpleados = activos.filter((item) => item.tipo === "pago_empleado").reduce((total, item) => total + Number(item.montoPagado || 0), 0);
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
    }));
  }
  obtenerTrabajosParaFinanzas$() {
    return this.finanzasDAO.obtenerTrabajosParaFinanzas$();
  }
  buscar(texto) {
    this.busquedaSubject.next(texto || "");
    this.paginaSubject.next(1);
  }
  cambiarFiltro() {
    const actual = this.filtroSubject.value;
    if (actual === "todos") {
      this.filtroSubject.next("cobros");
      this.paginaSubject.next(1);
      return;
    }
    if (actual === "cobros") {
      this.filtroSubject.next("pagos");
      this.paginaSubject.next(1);
      return;
    }
    if (actual === "pagos") {
      this.filtroSubject.next("pendientes");
      this.paginaSubject.next(1);
      return;
    }
    if (actual === "pendientes") {
      this.filtroSubject.next("cerrados");
      this.paginaSubject.next(1);
      return;
    }
    this.filtroSubject.next("todos");
    this.paginaSubject.next(1);
  }
  paginaAnterior() {
    this.paginaSubject.next(Math.max(1, this.paginaSubject.value - 1));
  }
  paginaSiguiente(totalPaginas) {
    this.paginaSubject.next(Math.min(totalPaginas, this.paginaSubject.value + 1));
  }
  irPagina(pagina) {
    this.paginaSubject.next(pagina);
  }
  crearMovimiento(data) {
    return __async(this, null, function* () {
      yield this.finanzasDAO.crearMovimiento(data);
    });
  }
  cerrarMovimiento(movimiento) {
    return __async(this, null, function* () {
      const uid = movimiento.uid || movimiento.id || "";
      if (!uid) {
        throw new Error("movimiento-sin-uid");
      }
      const estado = movimiento.tipo === "cobro_cliente" ? "cobrado" : "pagado";
      yield this.finanzasDAO.actualizarEstadoMovimiento(uid, estado, {
        montoPagado: Number(movimiento.montoTotal || 0),
        saldoPendiente: 0
      });
    });
  }
  sincronizarMontoTrabajo(movimiento) {
    return __async(this, null, function* () {
      yield this.finanzasDAO.sincronizarTrabajoDesdeMovimiento(movimiento);
    });
  }
  anularMovimiento(movimiento) {
    return __async(this, null, function* () {
      const uid = movimiento.uid || movimiento.id || "";
      if (!uid) {
        throw new Error("movimiento-sin-uid");
      }
      yield this.finanzasDAO.actualizarEstadoMovimiento(uid, "anulado", {
        saldoPendiente: 0
      });
    });
  }
  filtrarMovimientos(movimientos, busqueda, filtro) {
    const texto = this.normalizar(busqueda);
    return movimientos.filter((item) => {
      const coincideFiltro = this.coincideFiltro(item, filtro);
      const contenido = this.normalizar(`${item.codigo} ${item.codigoSeguimiento} ${item.concepto} ${item.personaNombre} ${item.tipoTexto} ${item.estadoTexto} ${item.metodoPagoTexto}`);
      const coincideBusqueda = !texto || contenido.includes(texto);
      return coincideFiltro && coincideBusqueda;
    });
  }
  coincideFiltro(item, filtro) {
    if (filtro === "todos") {
      return true;
    }
    if (filtro === "cobros") {
      return item.tipo === "cobro_cliente";
    }
    if (filtro === "pagos") {
      return item.tipo === "pago_empleado";
    }
    if (filtro === "pendientes") {
      return item.estado === "pendiente" || item.estado === "parcial";
    }
    if (filtro === "cerrados") {
      return item.estado === "cobrado" || item.estado === "pagado";
    }
    return true;
  }
  mapearMovimientoVista(item, trabajosMap = /* @__PURE__ */ new Map()) {
    const tipoTexto = item.tipo === "cobro_cliente" ? "Cobro a cliente" : "Pago a empleado";
    const personaEtiqueta = item.tipo === "cobro_cliente" ? "Cliente" : "Empleado";
    const icono = item.tipo === "cobro_cliente" ? "receipt-outline" : "people-outline";
    const clase = item.tipo === "cobro_cliente" ? "cobro" : "pago";
    const trabajoRelacionado = item.trabajoUid ? trabajosMap.get(item.trabajoUid) : null;
    const codigoSeguimientoReal = trabajoRelacionado?.codigoSeguimiento || item.codigoSeguimiento || "T-00000";
    return __spreadProps(__spreadValues({}, item), {
      uid: item.uid || item.id,
      codigo: item.codigo || "FIN-0000",
      trabajoUid: item.trabajoUid || "",
      codigoSeguimiento: codigoSeguimientoReal,
      codigoSeguimientoTexto: codigoSeguimientoReal,
      concepto: item.concepto || "Movimiento financiero",
      personaNombre: item.personaNombre || "Sin nombre",
      montoTotal: Number(item.montoTotal || 0),
      montoPagado: Number(item.montoPagado || 0),
      saldoPendiente: Number(item.saldoPendiente || 0),
      estado: item.estado || "pendiente",
      tipoTexto,
      personaEtiqueta,
      icono,
      clase,
      estadoTexto: this.obtenerEstadoTexto(item.estado || "pendiente"),
      estadoClase: item.estado || "pendiente",
      montoTotalTexto: this.formatearSoles(Number(item.montoTotal || 0)),
      montoPagadoTexto: this.formatearSoles(Number(item.montoPagado || 0)),
      saldoPendienteTexto: this.formatearSoles(Number(item.saldoPendiente || 0)),
      metodoPago: item.metodoPago || "efectivo",
      metodoPagoTexto: item.metodoPagoTexto || "Efectivo",
      fechaTexto: this.formatearFecha(item.createdAt)
    });
  }
  obtenerEstadoTexto(estado) {
    switch (estado) {
      case "pendiente":
        return "Pendiente";
      case "parcial":
        return "Parcial";
      case "cobrado":
        return "Cobrado";
      case "pagado":
        return "Pagado";
      case "anulado":
        return "Anulado";
      default:
        return "Pendiente";
    }
  }
  formatearSoles(valor) {
    return `S/ ${Number(valor || 0).toFixed(2)}`;
  }
  formatearFecha(fecha) {
    const date = fecha?.toDate ? fecha.toDate() : null;
    if (!date) {
      return "Sin fecha";
    }
    return new Intl.DateTimeFormat("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(date);
  }
  obtenerFechaMillis(fecha) {
    if (fecha?.toDate) {
      return fecha.toDate().getTime();
    }
    return 0;
  }
  generarPaginas(totalPaginas) {
    return Array.from({ length: totalPaginas }, (_, index) => index + 1);
  }
  normalizar(valor) {
    return String(valor || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
};
_FinanzasService.\u0275fac = function FinanzasService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FinanzasService)();
};
_FinanzasService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FinanzasService, factory: _FinanzasService.\u0275fac, providedIn: "root" });
var FinanzasService = _FinanzasService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FinanzasService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/shared/componentes/finanza-form-modal/finanza-form-modal.component.ts
function FinanzaFormModalComponent_section_33_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275element(1, "ion-spinner", 32);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando trabajos...");
    \u0275\u0275elementEnd()();
  }
}
function FinanzaFormModalComponent_section_33_div_9_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function FinanzaFormModalComponent_section_33_div_9_button_1_Template_button_click_0_listener() {
      const trabajo_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.seleccionarTrabajo(trabajo_r4));
    });
    \u0275\u0275elementStart(1, "div", 36);
    \u0275\u0275element(2, "ion-icon", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 38)(4, "div", 39)(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "p", 40);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 41)(12, "small");
    \u0275\u0275element(13, "ion-icon", 42);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "small");
    \u0275\u0275element(16, "ion-icon", 43);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "p", 44);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const trabajo_r4 = ctx.$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(trabajo_r4.codigoSeguimiento);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(trabajo_r4.estadoTexto);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(trabajo_r4.clienteNombre);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", trabajo_r4.direccion || "Sin direcci\xF3n", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", trabajo_r4.subtotalTexto, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", trabajo_r4.empleadosTexto, " ");
  }
}
function FinanzaFormModalComponent_section_33_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275template(1, FinanzaFormModalComponent_section_33_div_9_button_1_Template, 20, 6, "button", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.trabajosFiltrados);
  }
}
function FinanzaFormModalComponent_section_33_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275element(1, "ion-icon", 46);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "No hay trabajos encontrados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Verifique el c\xF3digo de seguimiento, cliente o direcci\xF3n.");
    \u0275\u0275elementEnd()();
  }
}
function FinanzaFormModalComponent_section_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 22)(1, "div", 23);
    \u0275\u0275element(2, "ion-icon", 24);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Buscar trabajo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "ion-item", 25);
    \u0275\u0275element(6, "ion-icon", 26);
    \u0275\u0275elementStart(7, "ion-input", 27);
    \u0275\u0275listener("ionInput", function FinanzaFormModalComponent_section_33_Template_ion_input_ionInput_7_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.buscarTrabajo($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, FinanzaFormModalComponent_section_33_div_8_Template, 4, 0, "div", 28)(9, FinanzaFormModalComponent_section_33_div_9_Template, 2, 1, "div", 29)(10, FinanzaFormModalComponent_section_33_div_10_Template, 6, 0, "div", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ctx_r1.cargandoTrabajos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.cargandoTrabajos && ctx_r1.trabajosFiltrados.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.cargandoTrabajos && ctx_r1.trabajosFiltrados.length === 0);
  }
}
function FinanzaFormModalComponent_ng_container_34_div_56_ion_select_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-select-option", 70);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const empleado_r6 = ctx.$implicit;
    \u0275\u0275property("value", empleado_r6.uid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", empleado_r6.nombreCompleto, " ");
  }
}
function FinanzaFormModalComponent_ng_container_34_div_56_small_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, " Este trabajo no tiene empleados asignados. ");
    \u0275\u0275elementEnd();
  }
}
function FinanzaFormModalComponent_ng_container_34_div_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "label");
    \u0275\u0275text(2, "Empleado asignado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ion-item", 25)(4, "ion-select", 69);
    \u0275\u0275template(5, FinanzaFormModalComponent_ng_container_34_div_56_ion_select_option_5_Template, 2, 2, "ion-select-option", 66);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, FinanzaFormModalComponent_ng_container_34_div_56_small_6_Template, 2, 0, "small", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.empleadosDisponibles);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.empleadosDisponibles.length === 0);
  }
}
function FinanzaFormModalComponent_ng_container_34_div_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71)(1, "div", 72);
    \u0275\u0275element(2, "ion-icon", 46);
    \u0275\u0275elementStart(3, "div")(4, "h4");
    \u0275\u0275text(5, "El monto no coincide con el trabajo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "ion-item", 73)(9, "ion-label");
    \u0275\u0275text(10, " Actualizar monto del trabajo ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "ion-toggle", 74);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2(" El trabajo figura con ", ctx_r1.textoMontoTrabajoActual, ", pero est\xE1s registrando ", ctx_r1.textoMontoIngresado, ". ");
  }
}
function FinanzaFormModalComponent_ng_container_34_ion_select_option_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-select-option", 70);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const metodo_r7 = ctx.$implicit;
    \u0275\u0275property("value", metodo_r7.valor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", metodo_r7.texto, " ");
  }
}
function FinanzaFormModalComponent_ng_container_34_div_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "label");
    \u0275\u0275text(2, "Especificar m\xE9todo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ion-item", 25);
    \u0275\u0275element(4, "ion-input", 75);
    \u0275\u0275elementEnd()();
  }
}
function FinanzaFormModalComponent_ng_container_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "section", 47)(2, "div", 23);
    \u0275\u0275element(3, "ion-icon", 37);
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Trabajo seleccionado");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 48)(7, "div")(8, "small");
    \u0275\u0275text(9, "C\xF3digo de seguimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div")(13, "small");
    \u0275\u0275text(14, "Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "strong");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div")(18, "small");
    \u0275\u0275text(19, "Tipo de trabajo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "strong");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div")(23, "small");
    \u0275\u0275text(24, "Monto del trabajo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "strong");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "button", 49);
    \u0275\u0275listener("click", function FinanzaFormModalComponent_ng_container_34_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarTrabajo());
    });
    \u0275\u0275text(28, " Cambiar trabajo ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "section", 22)(30, "div", 23);
    \u0275\u0275element(31, "ion-icon", 4);
    \u0275\u0275elementStart(32, "span");
    \u0275\u0275text(33, "Tipo de movimiento");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 50)(35, "button", 51);
    \u0275\u0275listener("click", function FinanzaFormModalComponent_ng_container_34_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.seleccionarTipo("cobro_cliente"));
    });
    \u0275\u0275elementStart(36, "div", 52);
    \u0275\u0275element(37, "ion-icon", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div")(39, "h3");
    \u0275\u0275text(40, "Cobro a cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "p");
    \u0275\u0275text(42, "Ingreso econ\xF3mico del trabajo.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(43, "button", 54);
    \u0275\u0275listener("click", function FinanzaFormModalComponent_ng_container_34_Template_button_click_43_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.seleccionarTipo("pago_empleado"));
    });
    \u0275\u0275elementStart(44, "div", 52);
    \u0275\u0275element(45, "ion-icon", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "div")(47, "h3");
    \u0275\u0275text(48, "Pago a empleado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "p");
    \u0275\u0275text(50, "Egreso por mano de obra.");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(51, "section", 22)(52, "div", 23);
    \u0275\u0275element(53, "ion-icon", 56);
    \u0275\u0275elementStart(54, "span");
    \u0275\u0275text(55, "Datos financieros");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(56, FinanzaFormModalComponent_ng_container_34_div_56_Template, 7, 2, "div", 57);
    \u0275\u0275elementStart(57, "div", 58)(58, "div", 59)(59, "label");
    \u0275\u0275text(60, "Monto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "ion-item", 25);
    \u0275\u0275element(62, "ion-input", 60);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(63, FinanzaFormModalComponent_ng_container_34_div_63_Template, 12, 2, "div", 61);
    \u0275\u0275elementStart(64, "div", 59)(65, "label");
    \u0275\u0275text(66, "Estado inicial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "ion-item", 25)(68, "ion-select", 62)(69, "ion-select-option", 63);
    \u0275\u0275text(70, " Pendiente ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "ion-select-option", 64);
    \u0275\u0275text(72);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(73, "div", 59)(74, "label");
    \u0275\u0275text(75, "M\xE9todo de pago");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "ion-item", 25)(77, "ion-select", 65);
    \u0275\u0275template(78, FinanzaFormModalComponent_ng_container_34_ion_select_option_78_Template, 2, 2, "ion-select-option", 66);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(79, FinanzaFormModalComponent_ng_container_34_div_79_Template, 5, 0, "div", 57);
    \u0275\u0275elementStart(80, "div", 59)(81, "label");
    \u0275\u0275text(82, "Observaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "ion-item", 67);
    \u0275\u0275element(84, "ion-textarea", 68);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r1.trabajoSeleccionado.codigoSeguimiento);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.trabajoSeleccionado.clienteNombre);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.trabajoSeleccionado.tipoTrabajo);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.trabajoSeleccionado.subtotalTexto);
    \u0275\u0275advance(9);
    \u0275\u0275classProp("active", ctx_r1.tipoActual === "cobro_cliente");
    \u0275\u0275advance(8);
    \u0275\u0275classProp("active", ctx_r1.tipoActual === "pago_empleado");
    \u0275\u0275advance(13);
    \u0275\u0275property("ngIf", !ctx_r1.esCobro);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r1.montoDiferenteTrabajo);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", ctx_r1.esCobro ? "Cobrado" : "Pagado", " ");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r1.metodosPago);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.metodoPagoActual === "otro");
  }
}
var _FinanzaFormModalComponent = class _FinanzaFormModalComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.modalCtrl = inject(ModalController);
    this.toastCtrl = inject(ToastController);
    this.finanzasService = inject(FinanzasService);
    this.pasoActual = 1;
    this.cargandoTrabajos = true;
    this.busquedaTrabajo = "";
    this.trabajos = [];
    this.trabajosFiltrados = [];
    this.trabajoSeleccionado = null;
    this.metodosPago = [
      { valor: "efectivo", texto: "Efectivo" },
      { valor: "yape", texto: "Yape" },
      { valor: "plin", texto: "Plin" },
      { valor: "transferencia", texto: "Transferencia bancaria" },
      { valor: "deposito", texto: "Dep\xF3sito" },
      { valor: "tarjeta", texto: "Tarjeta" },
      { valor: "otro", texto: "Otro" }
    ];
    this.formulario = this.fb.group({
      tipo: ["cobro_cliente", [Validators.required]],
      trabajoUid: ["", [Validators.required]],
      codigoSeguimiento: ["", [Validators.required]],
      empleadoUid: [""],
      montoTotal: [null, [Validators.required, Validators.min(0.01)]],
      metodoPago: ["efectivo", [Validators.required]],
      metodoPagoOtro: [""],
      estadoInicial: ["pendiente", [Validators.required]],
      observacion: [""],
      actualizarMontoTrabajo: [true]
    });
    addIcons({
      "wallet-outline": walletOutline,
      "receipt-outline": receiptOutline,
      "people-outline": peopleOutline,
      "close-outline": closeOutline,
      "save-outline": saveOutline,
      "cash-outline": cashOutline,
      "document-text-outline": documentTextOutline,
      "card-outline": cardOutline,
      "search-outline": searchOutline,
      "briefcase-outline": briefcaseOutline,
      "location-outline": locationOutline,
      "calendar-outline": calendarOutline,
      "alert-circle-outline": alertCircleOutline
    });
  }
  ngOnInit() {
    this.trabajosSub = this.finanzasService.obtenerTrabajosParaFinanzas$().subscribe({
      next: (trabajos) => {
        this.trabajos = trabajos || [];
        this.cargandoTrabajos = false;
        this.actualizarFiltroTrabajos();
      },
      error: (error) => {
        console.error("[FinanzaFormModal] Error cargando trabajos:", error);
        this.cargandoTrabajos = false;
        this.trabajos = [];
        this.trabajosFiltrados = [];
      }
    });
  }
  ngOnDestroy() {
    if (this.trabajosSub) {
      this.trabajosSub.unsubscribe();
      this.trabajosSub = void 0;
    }
  }
  get tipoActual() {
    return this.formulario.value.tipo || "cobro_cliente";
  }
  get esCobro() {
    return this.tipoActual === "cobro_cliente";
  }
  get titulo() {
    return "Registrar movimiento financiero";
  }
  get tituloPaso() {
    return this.pasoActual === 1 ? "Seleccionar trabajo" : this.esCobro ? "Registrar cobro" : "Registrar pago";
  }
  get subtitulo() {
    return this.pasoActual === 1 ? "Busque el trabajo por c\xF3digo de seguimiento, cliente, direcci\xF3n o empleado." : "Complete los datos econ\xF3micos del movimiento.";
  }
  get empleadosDisponibles() {
    return this.trabajoSeleccionado?.empleadosAsignados || [];
  }
  get metodoPagoActual() {
    return this.formulario.value.metodoPago || "efectivo";
  }
  get montoTrabajoActual() {
    return Number(this.trabajoSeleccionado?.subtotal || 0);
  }
  get montoIngresado() {
    return Number(this.formulario.value.montoTotal || 0);
  }
  get montoDiferenteTrabajo() {
    if (!this.esCobro || !this.trabajoSeleccionado) {
      return false;
    }
    return Math.abs(this.montoIngresado - this.montoTrabajoActual) > 9e-3;
  }
  get textoMontoTrabajoActual() {
    return `S/ ${Number(this.montoTrabajoActual || 0).toFixed(2)}`;
  }
  get textoMontoIngresado() {
    return `S/ ${Number(this.montoIngresado || 0).toFixed(2)}`;
  }
  buscarTrabajo(event) {
    this.busquedaTrabajo = String(event?.detail?.value || "").trim();
    this.actualizarFiltroTrabajos();
  }
  seleccionarTrabajo(trabajo) {
    this.trabajoSeleccionado = trabajo;
    this.formulario.patchValue({
      trabajoUid: trabajo.uid,
      codigoSeguimiento: trabajo.codigoSeguimiento,
      empleadoUid: "",
      montoTotal: Number(trabajo.subtotal || 0) > 0 ? Number(trabajo.subtotal || 0) : null
    });
    this.pasoActual = 2;
  }
  cambiarTrabajo() {
    this.pasoActual = 1;
  }
  seleccionarTipo(tipo) {
    this.formulario.patchValue({
      tipo,
      empleadoUid: "",
      montoTotal: tipo === "cobro_cliente" ? Number(this.trabajoSeleccionado?.subtotal || 0) > 0 ? Number(this.trabajoSeleccionado?.subtotal || 0) : null : null,
      actualizarMontoTrabajo: tipo === "cobro_cliente"
    });
  }
  cancelar() {
    this.modalCtrl.dismiss(null, "cancel");
  }
  guardar() {
    return __async(this, null, function* () {
      this.formulario.markAllAsTouched();
      if (!this.trabajoSeleccionado) {
        yield this.mostrarToast("Seleccione un trabajo.", "danger");
        return;
      }
      if (this.formulario.invalid) {
        yield this.mostrarToast("Complete los campos obligatorios.", "danger");
        return;
      }
      const data = this.formulario.getRawValue();
      const tipo = data.tipo || "cobro_cliente";
      const montoTotal = Number(data.montoTotal || 0);
      if (montoTotal <= 0) {
        yield this.mostrarToast("Ingrese un monto v\xE1lido mayor a cero.", "danger");
        return;
      }
      if (tipo === "pago_empleado" && !data.empleadoUid) {
        yield this.mostrarToast("Seleccione el empleado a pagar.", "danger");
        return;
      }
      if (data.metodoPago === "otro" && !String(data.metodoPagoOtro || "").trim()) {
        yield this.mostrarToast("Especifique el m\xE9todo de pago.", "danger");
        return;
      }
      const empleado = this.obtenerEmpleadoSeleccionado(String(data.empleadoUid || ""));
      const esCobro = tipo === "cobro_cliente";
      const personaNombre = esCobro ? this.trabajoSeleccionado.clienteNombre : empleado?.nombreCompleto || "";
      const concepto = esCobro ? `Cobro por ${this.trabajoSeleccionado.tipoTrabajo}` : `Pago por ${this.trabajoSeleccionado.tipoTrabajo}`;
      const payload = {
        tipo,
        trabajoUid: this.trabajoSeleccionado.uid,
        codigoSeguimiento: this.trabajoSeleccionado.codigoSeguimiento,
        clienteNombre: this.trabajoSeleccionado.clienteNombre,
        empleadoUid: esCobro ? "" : empleado?.uid || "",
        empleadoNombre: esCobro ? "" : empleado?.nombreCompleto || "",
        personaNombre,
        concepto,
        descripcion: this.trabajoSeleccionado.descripcion || "",
        montoTotal,
        metodoPago: data.metodoPago || "efectivo",
        metodoPagoOtro: String(data.metodoPagoOtro || "").trim(),
        estadoInicial: data.estadoInicial || "pendiente",
        observacion: String(data.observacion || "").trim(),
        actualizarMontoTrabajo: esCobro && this.montoDiferenteTrabajo ? Boolean(data.actualizarMontoTrabajo) : false
      };
      yield this.modalCtrl.dismiss(payload, "confirm");
    });
  }
  actualizarFiltroTrabajos() {
    const texto = this.normalizar(this.busquedaTrabajo);
    const base = [...this.trabajos];
    if (!texto) {
      this.trabajosFiltrados = base.slice(0, 20);
      return;
    }
    this.trabajosFiltrados = base.filter((trabajo) => trabajo.textoBusqueda.includes(texto)).slice(0, 20);
  }
  obtenerEmpleadoSeleccionado(uid) {
    return this.empleadosDisponibles.find((item) => item.uid === uid) || null;
  }
  normalizar(valor) {
    return String(valor || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  mostrarToast(message, color = "primary") {
    return __async(this, null, function* () {
      const toast = yield this.toastCtrl.create({
        message,
        duration: 2200,
        position: "top",
        color
      });
      yield toast.present();
    });
  }
};
_FinanzaFormModalComponent.\u0275fac = function FinanzaFormModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FinanzaFormModalComponent)();
};
_FinanzaFormModalComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FinanzaFormModalComponent, selectors: [["app-finanza-form-modal"]], decls: 42, vars: 16, consts: [[1, "modal-header"], [1, "modal-toolbar-content"], [1, "modal-title-box"], [1, "modal-avatar"], ["name", "wallet-outline"], [1, "modal-title-text"], ["type", "button", 1, "btn-close", 3, "click"], ["name", "close-outline"], [1, "modal-content"], [1, "form-wrapper", 3, "ngSubmit", "formGroup"], [1, "step-card"], [1, "step-header"], [1, "steps-line"], ["type", "button", 1, "step-item", 3, "click"], [1, "step-divider"], ["type", "button", 1, "step-item", 3, "disabled"], ["class", "form-card", 4, "ngIf"], [4, "ngIf"], [1, "modal-actions"], ["type", "button", 1, "btn-cancelar", 3, "click"], ["type", "submit", 1, "btn-guardar", 3, "disabled"], ["name", "save-outline"], [1, "form-card"], [1, "form-section-title"], ["name", "search-outline"], ["lines", "none", 1, "input-card"], ["name", "search-outline", "slot", "start"], ["placeholder", "Buscar por T-00000, cliente, direcci\xF3n o empleado", 3, "ionInput"], ["class", "loading-box", 4, "ngIf"], ["class", "trabajos-resultados", 4, "ngIf"], ["class", "empty-box", 4, "ngIf"], [1, "loading-box"], ["name", "crescent"], [1, "trabajos-resultados"], ["type", "button", "class", "trabajo-option", 3, "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "trabajo-option", 3, "click"], [1, "trabajo-option-icon"], ["name", "briefcase-outline"], [1, "trabajo-option-info"], [1, "trabajo-option-top"], [1, "cliente"], [1, "trabajo-meta"], ["name", "location-outline"], ["name", "cash-outline"], [1, "empleados"], [1, "empty-box"], ["name", "alert-circle-outline"], [1, "form-card", "resumen-trabajo-card"], [1, "resumen-trabajo"], ["type", "button", 1, "btn-cambiar", 3, "click"], [1, "tipo-grid"], ["type", "button", 1, "tipo-option", 3, "click"], [1, "tipo-icon"], ["name", "receipt-outline"], ["type", "button", 1, "tipo-option", "pago", 3, "click"], ["name", "people-outline"], ["name", "document-text-outline"], ["class", "field-group", 4, "ngIf"], [1, "form-grid"], [1, "field-group"], ["formControlName", "montoTotal", "type", "number", "inputmode", "decimal", "placeholder", "S/ 0.00"], ["class", "sync-monto-box", 4, "ngIf"], ["formControlName", "estadoInicial", "interface", "popover"], ["value", "pendiente"], ["value", "cerrado"], ["formControlName", "metodoPago", "interface", "popover", "placeholder", "Seleccione m\xE9todo"], [3, "value", 4, "ngFor", "ngForOf"], ["lines", "none", 1, "input-card", "textarea-card"], ["formControlName", "observacion", "placeholder", "Detalle adicional, opcional", "rows", "3"], ["formControlName", "empleadoUid", "placeholder", "Seleccione empleado", "interface", "popover"], [3, "value"], [1, "sync-monto-box"], [1, "sync-info"], ["lines", "none", 1, "sync-toggle"], ["slot", "end", "formControlName", "actualizarMontoTrabajo"], ["formControlName", "metodoPagoOtro", "placeholder", "Ejemplo: POS, cheque, aplicativo..."]], template: function FinanzaFormModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-header", 0)(1, "ion-toolbar")(2, "div", 1)(3, "div", 2)(4, "div", 3);
    \u0275\u0275element(5, "ion-icon", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 5)(7, "h2");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "button", 6);
    \u0275\u0275listener("click", function FinanzaFormModalComponent_Template_button_click_11_listener() {
      return ctx.cancelar();
    });
    \u0275\u0275element(12, "ion-icon", 7);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(13, "ion-content", 8)(14, "form", 9);
    \u0275\u0275listener("ngSubmit", function FinanzaFormModalComponent_Template_form_ngSubmit_14_listener() {
      return ctx.guardar();
    });
    \u0275\u0275elementStart(15, "section", 10)(16, "div", 11)(17, "h3");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "p");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 12)(22, "button", 13);
    \u0275\u0275listener("click", function FinanzaFormModalComponent_Template_button_click_22_listener() {
      return ctx.cambiarTrabajo();
    });
    \u0275\u0275elementStart(23, "span");
    \u0275\u0275text(24, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "small");
    \u0275\u0275text(26, "Trabajo");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(27, "div", 14);
    \u0275\u0275elementStart(28, "button", 15)(29, "span");
    \u0275\u0275text(30, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "small");
    \u0275\u0275text(32, "Finanzas");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(33, FinanzaFormModalComponent_section_33_Template, 11, 3, "section", 16)(34, FinanzaFormModalComponent_ng_container_34_Template, 85, 13, "ng-container", 17);
    \u0275\u0275elementStart(35, "div", 18)(36, "button", 19);
    \u0275\u0275listener("click", function FinanzaFormModalComponent_Template_button_click_36_listener() {
      return ctx.cancelar();
    });
    \u0275\u0275text(37, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "button", 20);
    \u0275\u0275element(39, "ion-icon", 21);
    \u0275\u0275elementStart(40, "span");
    \u0275\u0275text(41, "Guardar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Paso ", ctx.pasoActual, " de 2 \xB7 ", ctx.tituloPaso);
    \u0275\u0275advance(4);
    \u0275\u0275property("formGroup", ctx.formulario);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.tituloPaso);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.subtitulo);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx.pasoActual === 1)("done", ctx.pasoActual > 1);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("active", ctx.pasoActual === 2);
    \u0275\u0275property("disabled", !ctx.trabajoSeleccionado);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx.pasoActual === 1);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.pasoActual === 2 && ctx.trabajoSeleccionado);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx.trabajoSeleccionado);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, IonicModule, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonSpinner, IonTextarea, IonToggle, IonToolbar, BooleanValueAccessorDirective, NumericValueAccessorDirective, SelectValueAccessorDirective, TextValueAccessorDirective, ReactiveFormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: var(--color-background);\n  font-family: var(--font-main);\n}\n.modal-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      135deg,\n      var(--color-primary),\n      var(--color-primary-hover));\n  --color: #ffffff;\n  --min-height: 86px;\n  --padding-start: 0;\n  --padding-end: 0;\n}\n.modal-toolbar-content[_ngcontent-%COMP%] {\n  min-height: 86px;\n  padding: 0 14px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n.modal-title-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  min-width: 0;\n}\n.modal-avatar[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.16);\n  border: 1px solid rgba(255, 255, 255, 0.22);\n  display: grid;\n  place-items: center;\n  color: #ffffff;\n  flex-shrink: 0;\n}\n.modal-avatar[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 23px;\n}\n.modal-title-text[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.modal-title-text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 800;\n  color: #ffffff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.modal-title-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: #ffd166;\n}\n.btn-close[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.13);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n}\n.btn-close[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.modal-content[_ngcontent-%COMP%] {\n  --background: var(--color-background);\n  flex: 1;\n}\n.form-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: var(--app-width);\n  margin: 0 auto;\n  padding: 12px 14px 18px;\n}\n.step-card[_ngcontent-%COMP%], \n.form-card[_ngcontent-%COMP%] {\n  background: var(--color-card);\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  padding: 14px;\n  margin-bottom: 12px;\n  box-shadow: var(--shadow-card);\n}\n.step-header[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.step-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.step-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  line-height: 1.35;\n}\n.steps-line[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: start;\n  gap: 5px;\n}\n.step-item[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  padding: 0;\n  display: grid;\n  justify-items: center;\n  gap: 4px;\n  color: #94a3b8;\n  font-family: var(--font-main);\n}\n.step-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 999px;\n  background: #e2e8f0;\n  color: #64748b;\n  display: grid;\n  place-items: center;\n  font-size: 12px;\n  font-weight: 800;\n}\n.step-item[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-weight: 700;\n}\n.step-item.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.step-item.done[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #ffffff;\n}\n.step-item.active[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.step-item.done[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.step-divider[_ngcontent-%COMP%] {\n  height: 2px;\n  background: #dbe3ef;\n  margin-top: 13px;\n}\n.form-section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  margin-bottom: 12px;\n  color: var(--color-text);\n  font-size: 13px;\n  font-weight: 800;\n}\n.form-section-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n  color: var(--color-primary);\n}\nion-item.input-card[_ngcontent-%COMP%] {\n  --background: #ffffff;\n  --border-radius: 10px;\n  --min-height: 44px;\n  --padding-start: 12px;\n  --inner-padding-end: 10px;\n  --highlight-height: 0;\n  border: 1px solid var(--color-border);\n  border-radius: 10px;\n  overflow: hidden;\n}\nion-item.input-card[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px rgba(26, 62, 140, 0.12);\n}\nion-item.input-card[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%], \nion-item.input-card[_ngcontent-%COMP%]   ion-textarea[_ngcontent-%COMP%], \nion-item.input-card[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--color-text);\n}\n.textarea-card[_ngcontent-%COMP%] {\n  min-height: 78px;\n}\n.loading-box[_ngcontent-%COMP%], \n.empty-box[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  border-radius: 14px;\n  border: 1px solid var(--color-border);\n  background: #ffffff;\n  padding: 16px;\n  text-align: center;\n  box-shadow: var(--shadow-card);\n}\n.loading-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.empty-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  font-size: 11px;\n  color: var(--color-text-muted);\n}\n.empty-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: var(--color-primary);\n}\n.empty-box[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.trabajos-resultados[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.trabajo-option[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid var(--color-border);\n  background: #ffffff;\n  border-radius: 16px;\n  padding: 11px;\n  display: grid;\n  grid-template-columns: 46px 1fr;\n  gap: 10px;\n  text-align: left;\n  box-shadow: var(--shadow-card);\n  font-family: var(--font-main);\n}\n.trabajo-option[_ngcontent-%COMP%]:active {\n  transform: scale(0.985);\n}\n.trabajo-option-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 14px;\n  display: grid;\n  place-items: center;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.trabajo-option-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 21px;\n}\n.trabajo-option-info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.trabajo-option-top[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n  align-items: center;\n}\n.trabajo-option-top[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 900;\n  color: var(--color-primary);\n}\n.trabajo-option-top[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  height: 22px;\n  padding: 0 8px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 9px;\n  font-weight: 800;\n  display: inline-flex;\n  align-items: center;\n  white-space: nowrap;\n}\n.cliente[_ngcontent-%COMP%] {\n  margin: 3px 0 6px;\n  color: var(--color-text);\n  font-size: 12px;\n  font-weight: 800;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.trabajo-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.trabajo-meta[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  min-height: 21px;\n  padding: 0 7px;\n  border-radius: 999px;\n  background: #f1f5f9;\n  color: #475569;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 9.5px;\n  font-weight: 700;\n  max-width: 180px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.trabajo-meta[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.empleados[_ngcontent-%COMP%] {\n  margin: 7px 0 0;\n  color: var(--color-text-muted);\n  font-size: 10.5px;\n  font-weight: 600;\n  line-height: 1.25;\n}\n.resumen-trabajo[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 9px;\n}\n.resumen-trabajo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid var(--color-border);\n  border-radius: 12px;\n  padding: 9px;\n}\n.resumen-trabajo[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  color: var(--color-text-muted);\n  font-size: 9.5px;\n  font-weight: 700;\n  margin-bottom: 3px;\n}\n.resumen-trabajo[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: var(--color-text);\n  font-size: 11.5px;\n  font-weight: 900;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.btn-cambiar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 38px;\n  border: 1px solid var(--color-primary-soft);\n  border-radius: 11px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  margin-top: 10px;\n  font-size: 12px;\n  font-weight: 800;\n  font-family: var(--font-main);\n}\n.tipo-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.tipo-option[_ngcontent-%COMP%] {\n  border: 1px solid var(--color-border);\n  background: #ffffff;\n  border-radius: 14px;\n  padding: 11px;\n  display: grid;\n  grid-template-columns: 38px 1fr;\n  gap: 9px;\n  align-items: center;\n  text-align: left;\n  font-family: var(--font-main);\n}\n.tipo-option.active[_ngcontent-%COMP%] {\n  border-color: var(--color-primary);\n  background: var(--color-primary-soft);\n}\n.tipo-option.pago.active[_ngcontent-%COMP%] {\n  border-color: var(--color-success);\n  background: var(--color-success-bg);\n}\n.tipo-icon[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 13px;\n  display: grid;\n  place-items: center;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.tipo-option.pago[_ngcontent-%COMP%]   .tipo-icon[_ngcontent-%COMP%] {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.tipo-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.tipo-option[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 12px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.tipo-option[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 10px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  line-height: 1.25;\n}\n.field-group[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.field-group[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.field-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.field-group[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 5px;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.modal-actions[_ngcontent-%COMP%] {\n  position: sticky;\n  bottom: 0;\n  z-index: 4;\n  background: var(--color-background);\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n  padding: 8px 0 0;\n}\n.btn-cancelar[_ngcontent-%COMP%], \n.btn-guardar[_ngcontent-%COMP%] {\n  height: 44px;\n  border: none;\n  border-radius: 10px;\n  font-size: 13px;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  font-family: var(--font-main);\n}\n.btn-cancelar[_ngcontent-%COMP%] {\n  background: #ffffff;\n  color: var(--color-text-muted);\n  border: 1px solid var(--color-border);\n}\n.btn-guardar[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #ffffff;\n  box-shadow: var(--shadow-button);\n}\n.btn-guardar[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n}\n.btn-guardar[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n@media (max-width: 380px) {\n  .tipo-grid[_ngcontent-%COMP%], \n   .form-grid[_ngcontent-%COMP%], \n   .modal-actions[_ngcontent-%COMP%], \n   .resumen-trabajo[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .trabajo-option[_ngcontent-%COMP%] {\n    grid-template-columns: 42px 1fr;\n  }\n  .trabajo-option-icon[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n  }\n  .trabajo-option-top[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .sync-monto-box[_ngcontent-%COMP%] {\n    margin: 0 0 12px;\n    border: 1px solid #ffe1a6;\n    background: #fff8e8;\n    border-radius: 14px;\n    padding: 11px;\n  }\n  .sync-info[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 30px 1fr;\n    gap: 8px;\n    align-items: flex-start;\n    margin-bottom: 8px;\n  }\n  .sync-info[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 22px;\n    color: #b77900;\n    margin-top: 1px;\n  }\n  .sync-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n    margin: 0;\n    font-size: 12.5px;\n    font-weight: 900;\n    color: #92400e;\n  }\n  .sync-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    margin: 3px 0 0;\n    font-size: 10.5px;\n    font-weight: 600;\n    color: #7c2d12;\n    line-height: 1.3;\n  }\n  ion-item.sync-toggle[_ngcontent-%COMP%] {\n    --background: #ffffff;\n    --border-radius: 11px;\n    --min-height: 40px;\n    --padding-start: 10px;\n    --inner-padding-end: 8px;\n    --highlight-height: 0;\n    border: 1px solid #ffe1a6;\n    border-radius: 11px;\n  }\n  ion-item.sync-toggle[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n    font-size: 11px;\n    font-weight: 800;\n    color: #92400e;\n  }\n}\n/*# sourceMappingURL=finanza-form-modal.component.css.map */"] });
var FinanzaFormModalComponent = _FinanzaFormModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FinanzaFormModalComponent, [{
    type: Component,
    args: [{ selector: "app-finanza-form-modal", standalone: true, imports: [
      CommonModule,
      IonicModule,
      ReactiveFormsModule
    ], template: `<!-- src/app/shared/componentes/finanza-form-modal/finanza-form-modal.component.html -->

<ion-header class="modal-header">
  <ion-toolbar>

    <div class="modal-toolbar-content">

      <div class="modal-title-box">
        <div class="modal-avatar">
          <ion-icon name="wallet-outline"></ion-icon>
        </div>

        <div class="modal-title-text">
          <h2>{{ titulo }}</h2>
          <p>Paso {{ pasoActual }} de 2 \xB7 {{ tituloPaso }}</p>
        </div>
      </div>

      <button
        type="button"
        class="btn-close"
        (click)="cancelar()"
      >
        <ion-icon name="close-outline"></ion-icon>
      </button>

    </div>

  </ion-toolbar>
</ion-header>

<ion-content class="modal-content">

  <form
    class="form-wrapper"
    [formGroup]="formulario"
    (ngSubmit)="guardar()"
  >

    <section class="step-card">

      <div class="step-header">
        <h3>{{ tituloPaso }}</h3>
        <p>{{ subtitulo }}</p>
      </div>

      <div class="steps-line">

        <button
          type="button"
          class="step-item"
          [class.active]="pasoActual === 1"
          [class.done]="pasoActual > 1"
          (click)="cambiarTrabajo()"
        >
          <span>1</span>
          <small>Trabajo</small>
        </button>

        <div class="step-divider"></div>

        <button
          type="button"
          class="step-item"
          [class.active]="pasoActual === 2"
          [disabled]="!trabajoSeleccionado"
        >
          <span>2</span>
          <small>Finanzas</small>
        </button>

      </div>

    </section>

    <!-- PASO 1 -->
    <section
      class="form-card"
      *ngIf="pasoActual === 1"
    >

      <div class="form-section-title">
        <ion-icon name="search-outline"></ion-icon>
        <span>Buscar trabajo</span>
      </div>

      <ion-item lines="none" class="input-card">
        <ion-icon name="search-outline" slot="start"></ion-icon>

        <ion-input
          placeholder="Buscar por T-00000, cliente, direcci\xF3n o empleado"
          (ionInput)="buscarTrabajo($event)"
        ></ion-input>
      </ion-item>

      <div
        class="loading-box"
        *ngIf="cargandoTrabajos"
      >
        <ion-spinner name="crescent"></ion-spinner>
        <p>Cargando trabajos...</p>
      </div>

      <div
        class="trabajos-resultados"
        *ngIf="!cargandoTrabajos && trabajosFiltrados.length > 0"
      >

        <button
          type="button"
          class="trabajo-option"
          *ngFor="let trabajo of trabajosFiltrados"
          (click)="seleccionarTrabajo(trabajo)"
        >

          <div class="trabajo-option-icon">
            <ion-icon name="briefcase-outline"></ion-icon>
          </div>

          <div class="trabajo-option-info">
            <div class="trabajo-option-top">
              <h3>{{ trabajo.codigoSeguimiento }}</h3>
              <span>{{ trabajo.estadoTexto }}</span>
            </div>

            <p class="cliente">{{ trabajo.clienteNombre }}</p>

            <div class="trabajo-meta">
              <small>
                <ion-icon name="location-outline"></ion-icon>
                {{ trabajo.direccion || 'Sin direcci\xF3n' }}
              </small>

              <small>
                <ion-icon name="cash-outline"></ion-icon>
                {{ trabajo.subtotalTexto }}
              </small>
            </div>

            <p class="empleados">
              {{ trabajo.empleadosTexto }}
            </p>
          </div>

        </button>

      </div>

      <div
        class="empty-box"
        *ngIf="!cargandoTrabajos && trabajosFiltrados.length === 0"
      >
        <ion-icon name="alert-circle-outline"></ion-icon>
        <h3>No hay trabajos encontrados</h3>
        <p>Verifique el c\xF3digo de seguimiento, cliente o direcci\xF3n.</p>
      </div>

    </section>

    <!-- PASO 2 -->
    <ng-container *ngIf="pasoActual === 2 && trabajoSeleccionado">

      <section class="form-card resumen-trabajo-card">

        <div class="form-section-title">
          <ion-icon name="briefcase-outline"></ion-icon>
          <span>Trabajo seleccionado</span>
        </div>

        <div class="resumen-trabajo">

          <div>
            <small>C\xF3digo de seguimiento</small>
            <strong>{{ trabajoSeleccionado.codigoSeguimiento }}</strong>
          </div>

          <div>
            <small>Cliente</small>
            <strong>{{ trabajoSeleccionado.clienteNombre }}</strong>
          </div>

          <div>
            <small>Tipo de trabajo</small>
            <strong>{{ trabajoSeleccionado.tipoTrabajo }}</strong>
          </div>

          <div>
            <small>Monto del trabajo</small>
            <strong>{{ trabajoSeleccionado.subtotalTexto }}</strong>
          </div>

        </div>

        <button
          type="button"
          class="btn-cambiar"
          (click)="cambiarTrabajo()"
        >
          Cambiar trabajo
        </button>

      </section>

      <section class="form-card">

        <div class="form-section-title">
          <ion-icon name="wallet-outline"></ion-icon>
          <span>Tipo de movimiento</span>
        </div>

        <div class="tipo-grid">

          <button
            type="button"
            class="tipo-option"
            [class.active]="tipoActual === 'cobro_cliente'"
            (click)="seleccionarTipo('cobro_cliente')"
          >
            <div class="tipo-icon">
              <ion-icon name="receipt-outline"></ion-icon>
            </div>

            <div>
              <h3>Cobro a cliente</h3>
              <p>Ingreso econ\xF3mico del trabajo.</p>
            </div>
          </button>

          <button
            type="button"
            class="tipo-option pago"
            [class.active]="tipoActual === 'pago_empleado'"
            (click)="seleccionarTipo('pago_empleado')"
          >
            <div class="tipo-icon">
              <ion-icon name="people-outline"></ion-icon>
            </div>

            <div>
              <h3>Pago a empleado</h3>
              <p>Egreso por mano de obra.</p>
            </div>
          </button>

        </div>

      </section>

      <section class="form-card">

        <div class="form-section-title">
          <ion-icon name="document-text-outline"></ion-icon>
          <span>Datos financieros</span>
        </div>

        <div
          class="field-group"
          *ngIf="!esCobro"
        >
          <label>Empleado asignado</label>

          <ion-item lines="none" class="input-card">
            <ion-select
              formControlName="empleadoUid"
              placeholder="Seleccione empleado"
              interface="popover"
            >
              <ion-select-option
                *ngFor="let empleado of empleadosDisponibles"
                [value]="empleado.uid"
              >
                {{ empleado.nombreCompleto }}
              </ion-select-option>
            </ion-select>
          </ion-item>

          <small *ngIf="empleadosDisponibles.length === 0">
            Este trabajo no tiene empleados asignados.
          </small>
        </div>

        <div class="form-grid">

          <div class="field-group">
            <label>Monto</label>

            <ion-item lines="none" class="input-card">
              <ion-input
                formControlName="montoTotal"
                type="number"
                inputmode="decimal"
                placeholder="S/ 0.00"
              ></ion-input>
            </ion-item>
          </div>
<div
  class="sync-monto-box"
  *ngIf="montoDiferenteTrabajo"
>
  <div class="sync-info">
    <ion-icon name="alert-circle-outline"></ion-icon>

    <div>
      <h4>El monto no coincide con el trabajo</h4>
      <p>
        El trabajo figura con {{ textoMontoTrabajoActual }},
        pero est\xE1s registrando {{ textoMontoIngresado }}.
      </p>
    </div>
  </div>

  <ion-item lines="none" class="sync-toggle">
    <ion-label>
      Actualizar monto del trabajo
    </ion-label>

    <ion-toggle
      slot="end"
      formControlName="actualizarMontoTrabajo"
    ></ion-toggle>
  </ion-item>
</div>
          <div class="field-group">
            <label>Estado inicial</label>

            <ion-item lines="none" class="input-card">
              <ion-select
                formControlName="estadoInicial"
                interface="popover"
              >
                <ion-select-option value="pendiente">
                  Pendiente
                </ion-select-option>

                <ion-select-option value="cerrado">
                  {{ esCobro ? 'Cobrado' : 'Pagado' }}
                </ion-select-option>
              </ion-select>
            </ion-item>
          </div>

        </div>

        <div class="field-group">
          <label>M\xE9todo de pago</label>

          <ion-item lines="none" class="input-card">
            <ion-select
              formControlName="metodoPago"
              interface="popover"
              placeholder="Seleccione m\xE9todo"
            >
              <ion-select-option
                *ngFor="let metodo of metodosPago"
                [value]="metodo.valor"
              >
                {{ metodo.texto }}
              </ion-select-option>
            </ion-select>
          </ion-item>
        </div>

        <div
          class="field-group"
          *ngIf="metodoPagoActual === 'otro'"
        >
          <label>Especificar m\xE9todo</label>

          <ion-item lines="none" class="input-card">
            <ion-input
              formControlName="metodoPagoOtro"
              placeholder="Ejemplo: POS, cheque, aplicativo..."
            ></ion-input>
          </ion-item>
        </div>

        <div class="field-group">
          <label>Observaci\xF3n</label>

          <ion-item lines="none" class="input-card textarea-card">
            <ion-textarea
              formControlName="observacion"
              placeholder="Detalle adicional, opcional"
              rows="3"
            ></ion-textarea>
          </ion-item>
        </div>

      </section>

    </ng-container>

    <div class="modal-actions">

      <button
        type="button"
        class="btn-cancelar"
        (click)="cancelar()"
      >
        Cancelar
      </button>

      <button
        type="submit"
        class="btn-guardar"
        [disabled]="!trabajoSeleccionado"
      >
        <ion-icon name="save-outline"></ion-icon>
        <span>Guardar</span>
      </button>

    </div>

  </form>

</ion-content>`, styles: ["/* src/app/shared/componentes/finanza-form-modal/finanza-form-modal.component.css */\n:host {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: var(--color-background);\n  font-family: var(--font-main);\n}\n.modal-header ion-toolbar {\n  --background:\n    linear-gradient(\n      135deg,\n      var(--color-primary),\n      var(--color-primary-hover));\n  --color: #ffffff;\n  --min-height: 86px;\n  --padding-start: 0;\n  --padding-end: 0;\n}\n.modal-toolbar-content {\n  min-height: 86px;\n  padding: 0 14px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n.modal-title-box {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  min-width: 0;\n}\n.modal-avatar {\n  width: 44px;\n  height: 44px;\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.16);\n  border: 1px solid rgba(255, 255, 255, 0.22);\n  display: grid;\n  place-items: center;\n  color: #ffffff;\n  flex-shrink: 0;\n}\n.modal-avatar ion-icon {\n  font-size: 23px;\n}\n.modal-title-text {\n  min-width: 0;\n}\n.modal-title-text h2 {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 800;\n  color: #ffffff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.modal-title-text p {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: #ffd166;\n}\n.btn-close {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.13);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n}\n.btn-close ion-icon {\n  font-size: 22px;\n}\n.modal-content {\n  --background: var(--color-background);\n  flex: 1;\n}\n.form-wrapper {\n  width: 100%;\n  max-width: var(--app-width);\n  margin: 0 auto;\n  padding: 12px 14px 18px;\n}\n.step-card,\n.form-card {\n  background: var(--color-card);\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  padding: 14px;\n  margin-bottom: 12px;\n  box-shadow: var(--shadow-card);\n}\n.step-header {\n  margin-bottom: 12px;\n}\n.step-header h3 {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.step-header p {\n  margin: 4px 0 0;\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  line-height: 1.35;\n}\n.steps-line {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: start;\n  gap: 5px;\n}\n.step-item {\n  border: none;\n  background: transparent;\n  padding: 0;\n  display: grid;\n  justify-items: center;\n  gap: 4px;\n  color: #94a3b8;\n  font-family: var(--font-main);\n}\n.step-item span {\n  width: 28px;\n  height: 28px;\n  border-radius: 999px;\n  background: #e2e8f0;\n  color: #64748b;\n  display: grid;\n  place-items: center;\n  font-size: 12px;\n  font-weight: 800;\n}\n.step-item small {\n  font-size: 9px;\n  font-weight: 700;\n}\n.step-item.active span,\n.step-item.done span {\n  background: var(--color-primary);\n  color: #ffffff;\n}\n.step-item.active small,\n.step-item.done small {\n  color: var(--color-primary);\n}\n.step-divider {\n  height: 2px;\n  background: #dbe3ef;\n  margin-top: 13px;\n}\n.form-section-title {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  margin-bottom: 12px;\n  color: var(--color-text);\n  font-size: 13px;\n  font-weight: 800;\n}\n.form-section-title ion-icon {\n  font-size: 17px;\n  color: var(--color-primary);\n}\nion-item.input-card {\n  --background: #ffffff;\n  --border-radius: 10px;\n  --min-height: 44px;\n  --padding-start: 12px;\n  --inner-padding-end: 10px;\n  --highlight-height: 0;\n  border: 1px solid var(--color-border);\n  border-radius: 10px;\n  overflow: hidden;\n}\nion-item.input-card:focus-within {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px rgba(26, 62, 140, 0.12);\n}\nion-item.input-card ion-input,\nion-item.input-card ion-textarea,\nion-item.input-card ion-select {\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--color-text);\n}\n.textarea-card {\n  min-height: 78px;\n}\n.loading-box,\n.empty-box {\n  margin-top: 12px;\n  border-radius: 14px;\n  border: 1px solid var(--color-border);\n  background: #ffffff;\n  padding: 16px;\n  text-align: center;\n  box-shadow: var(--shadow-card);\n}\n.loading-box p,\n.empty-box p {\n  margin: 6px 0 0;\n  font-size: 11px;\n  color: var(--color-text-muted);\n}\n.empty-box ion-icon {\n  font-size: 28px;\n  color: var(--color-primary);\n}\n.empty-box h3 {\n  margin: 6px 0 0;\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.trabajos-resultados {\n  margin-top: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.trabajo-option {\n  width: 100%;\n  border: 1px solid var(--color-border);\n  background: #ffffff;\n  border-radius: 16px;\n  padding: 11px;\n  display: grid;\n  grid-template-columns: 46px 1fr;\n  gap: 10px;\n  text-align: left;\n  box-shadow: var(--shadow-card);\n  font-family: var(--font-main);\n}\n.trabajo-option:active {\n  transform: scale(0.985);\n}\n.trabajo-option-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 14px;\n  display: grid;\n  place-items: center;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.trabajo-option-icon ion-icon {\n  font-size: 21px;\n}\n.trabajo-option-info {\n  min-width: 0;\n}\n.trabajo-option-top {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n  align-items: center;\n}\n.trabajo-option-top h3 {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 900;\n  color: var(--color-primary);\n}\n.trabajo-option-top span {\n  height: 22px;\n  padding: 0 8px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 9px;\n  font-weight: 800;\n  display: inline-flex;\n  align-items: center;\n  white-space: nowrap;\n}\n.cliente {\n  margin: 3px 0 6px;\n  color: var(--color-text);\n  font-size: 12px;\n  font-weight: 800;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.trabajo-meta {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.trabajo-meta small {\n  min-height: 21px;\n  padding: 0 7px;\n  border-radius: 999px;\n  background: #f1f5f9;\n  color: #475569;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 9.5px;\n  font-weight: 700;\n  max-width: 180px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.trabajo-meta ion-icon {\n  font-size: 12px;\n}\n.empleados {\n  margin: 7px 0 0;\n  color: var(--color-text-muted);\n  font-size: 10.5px;\n  font-weight: 600;\n  line-height: 1.25;\n}\n.resumen-trabajo {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 9px;\n}\n.resumen-trabajo div {\n  background: #f8fafc;\n  border: 1px solid var(--color-border);\n  border-radius: 12px;\n  padding: 9px;\n}\n.resumen-trabajo small {\n  display: block;\n  color: var(--color-text-muted);\n  font-size: 9.5px;\n  font-weight: 700;\n  margin-bottom: 3px;\n}\n.resumen-trabajo strong {\n  display: block;\n  color: var(--color-text);\n  font-size: 11.5px;\n  font-weight: 900;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.btn-cambiar {\n  width: 100%;\n  height: 38px;\n  border: 1px solid var(--color-primary-soft);\n  border-radius: 11px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  margin-top: 10px;\n  font-size: 12px;\n  font-weight: 800;\n  font-family: var(--font-main);\n}\n.tipo-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.tipo-option {\n  border: 1px solid var(--color-border);\n  background: #ffffff;\n  border-radius: 14px;\n  padding: 11px;\n  display: grid;\n  grid-template-columns: 38px 1fr;\n  gap: 9px;\n  align-items: center;\n  text-align: left;\n  font-family: var(--font-main);\n}\n.tipo-option.active {\n  border-color: var(--color-primary);\n  background: var(--color-primary-soft);\n}\n.tipo-option.pago.active {\n  border-color: var(--color-success);\n  background: var(--color-success-bg);\n}\n.tipo-icon {\n  width: 38px;\n  height: 38px;\n  border-radius: 13px;\n  display: grid;\n  place-items: center;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.tipo-option.pago .tipo-icon {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.tipo-icon ion-icon {\n  font-size: 20px;\n}\n.tipo-option h3 {\n  margin: 0;\n  font-size: 12px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.tipo-option p {\n  margin: 3px 0 0;\n  font-size: 10px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  line-height: 1.25;\n}\n.field-group {\n  margin-bottom: 12px;\n}\n.field-group:last-child {\n  margin-bottom: 0;\n}\n.field-group label {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.field-group small {\n  display: block;\n  margin-top: 5px;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.form-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.modal-actions {\n  position: sticky;\n  bottom: 0;\n  z-index: 4;\n  background: var(--color-background);\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n  padding: 8px 0 0;\n}\n.btn-cancelar,\n.btn-guardar {\n  height: 44px;\n  border: none;\n  border-radius: 10px;\n  font-size: 13px;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  font-family: var(--font-main);\n}\n.btn-cancelar {\n  background: #ffffff;\n  color: var(--color-text-muted);\n  border: 1px solid var(--color-border);\n}\n.btn-guardar {\n  background: var(--color-primary);\n  color: #ffffff;\n  box-shadow: var(--shadow-button);\n}\n.btn-guardar:disabled {\n  opacity: 0.55;\n}\n.btn-guardar ion-icon {\n  font-size: 17px;\n}\n@media (max-width: 380px) {\n  .tipo-grid,\n  .form-grid,\n  .modal-actions,\n  .resumen-trabajo {\n    grid-template-columns: 1fr;\n  }\n  .trabajo-option {\n    grid-template-columns: 42px 1fr;\n  }\n  .trabajo-option-icon {\n    width: 40px;\n    height: 40px;\n  }\n  .trabajo-option-top {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .sync-monto-box {\n    margin: 0 0 12px;\n    border: 1px solid #ffe1a6;\n    background: #fff8e8;\n    border-radius: 14px;\n    padding: 11px;\n  }\n  .sync-info {\n    display: grid;\n    grid-template-columns: 30px 1fr;\n    gap: 8px;\n    align-items: flex-start;\n    margin-bottom: 8px;\n  }\n  .sync-info ion-icon {\n    font-size: 22px;\n    color: #b77900;\n    margin-top: 1px;\n  }\n  .sync-info h4 {\n    margin: 0;\n    font-size: 12.5px;\n    font-weight: 900;\n    color: #92400e;\n  }\n  .sync-info p {\n    margin: 3px 0 0;\n    font-size: 10.5px;\n    font-weight: 600;\n    color: #7c2d12;\n    line-height: 1.3;\n  }\n  ion-item.sync-toggle {\n    --background: #ffffff;\n    --border-radius: 11px;\n    --min-height: 40px;\n    --padding-start: 10px;\n    --inner-padding-end: 8px;\n    --highlight-height: 0;\n    border: 1px solid #ffe1a6;\n    border-radius: 11px;\n  }\n  ion-item.sync-toggle ion-label {\n    font-size: 11px;\n    font-weight: 800;\n    color: #92400e;\n  }\n}\n/*# sourceMappingURL=finanza-form-modal.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FinanzaFormModalComponent, { className: "FinanzaFormModalComponent", filePath: "src/app/shared/componentes/finanza-form-modal/finanza-form-modal.component.ts", lineNumber: 64 });
})();

// src/app/shared/componentes/finanza-acciones-modal/finanza-acciones-modal.component.ts
function FinanzaAccionesModalComponent_button_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function FinanzaAccionesModalComponent_button_36_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.seleccionar("cerrar"));
    });
    \u0275\u0275elementStart(1, "div", 14);
    \u0275\u0275element(2, "ion-icon", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 16)(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(8, "ion-icon", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.cerrarTexto);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.cerrarDescripcion);
  }
}
function FinanzaAccionesModalComponent_button_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function FinanzaAccionesModalComponent_button_37_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.seleccionar("sincronizar_trabajo"));
    });
    \u0275\u0275elementStart(1, "div", 14);
    \u0275\u0275element(2, "ion-icon", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 16)(4, "h3");
    \u0275\u0275text(5, "Actualizar monto del trabajo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(8, "ion-icon", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" Cambia el monto del trabajo a ", ctx_r1.movimiento.montoTotalTexto, ". ");
  }
}
function FinanzaAccionesModalComponent_button_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function FinanzaAccionesModalComponent_button_38_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.seleccionar("anular"));
    });
    \u0275\u0275elementStart(1, "div", 20);
    \u0275\u0275element(2, "ion-icon", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 16)(4, "h3");
    \u0275\u0275text(5, "Anular movimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "El movimiento no se contar\xE1 como pendiente ni como cerrado.");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(8, "ion-icon", 17);
    \u0275\u0275elementEnd();
  }
}
var _FinanzaAccionesModalComponent = class _FinanzaAccionesModalComponent {
  constructor() {
    this.modalCtrl = inject(ModalController);
    addIcons({
      "receipt-outline": receiptOutline,
      "people-outline": peopleOutline,
      "close-outline": closeOutline,
      "checkmark-circle-outline": checkmarkCircleOutline,
      "ban-outline": banOutline,
      "chevron-forward-outline": chevronForwardOutline,
      "cash-outline": cashOutline,
      "time-outline": timeOutline
    });
  }
  get icono() {
    return this.movimiento?.tipo === "cobro_cliente" ? "receipt-outline" : "people-outline";
  }
  get titulo() {
    return this.movimiento?.codigo || this.movimiento?.concepto || "Movimiento financiero";
  }
  get subtitulo() {
    return this.movimiento?.tipoTexto || "Finanzas";
  }
  get cerrarTexto() {
    return this.movimiento?.tipo === "cobro_cliente" ? "Marcar como cobrado" : "Marcar como pagado";
  }
  get cerrarDescripcion() {
    return this.movimiento?.tipo === "cobro_cliente" ? "Registrar que el cliente ya pag\xF3 el monto pendiente." : "Registrar que el empleado ya recibi\xF3 su pago.";
  }
  get estaCerrado() {
    const estado = this.movimiento?.estado;
    return estado === "cobrado" || estado === "pagado" || estado === "anulado";
  }
  cancelar() {
    this.modalCtrl.dismiss(null, "cancel");
  }
  seleccionar(accion) {
    this.modalCtrl.dismiss({ accion }, "confirm");
  }
};
_FinanzaAccionesModalComponent.\u0275fac = function FinanzaAccionesModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FinanzaAccionesModalComponent)();
};
_FinanzaAccionesModalComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FinanzaAccionesModalComponent, selectors: [["app-finanza-acciones-modal"]], inputs: { movimiento: "movimiento" }, decls: 39, vars: 12, consts: [[1, "acciones-panel"], [1, "modal-bar"], [1, "acciones-header"], [1, "finanza-avatar"], [3, "name"], [1, "finanza-info"], [3, "ngClass"], ["type", "button", 1, "btn-close", 3, "click"], ["name", "close-outline"], [1, "resumen-box"], [1, "acciones-lista"], ["type", "button", "class", "accion-item", 3, "click", 4, "ngIf"], ["type", "button", "class", "accion-item danger", 3, "click", 4, "ngIf"], ["type", "button", 1, "accion-item", 3, "click"], [1, "accion-icon", "cerrar"], ["name", "checkmark-circle-outline"], [1, "accion-text"], ["name", "chevron-forward-outline", 1, "arrow"], ["name", "cash-outline"], ["type", "button", 1, "accion-item", "danger", 3, "click"], [1, "accion-icon", "anular"], ["name", "ban-outline"]], template: function FinanzaAccionesModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "div", 1);
    \u0275\u0275elementStart(2, "header", 2)(3, "div", 3);
    \u0275\u0275element(4, "ion-icon", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 5)(6, "h2");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 6);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 7);
    \u0275\u0275listener("click", function FinanzaAccionesModalComponent_Template_button_click_12_listener() {
      return ctx.cancelar();
    });
    \u0275\u0275element(13, "ion-icon", 8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "section", 9)(15, "article")(16, "span");
    \u0275\u0275text(17, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "strong");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "article")(21, "span");
    \u0275\u0275text(22, "Pagado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "strong");
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "article")(26, "span");
    \u0275\u0275text(27, "Pendiente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "strong");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "article")(31, "span");
    \u0275\u0275text(32, "Seguimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "strong");
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "section", 10);
    \u0275\u0275template(36, FinanzaAccionesModalComponent_button_36_Template, 9, 2, "button", 11)(37, FinanzaAccionesModalComponent_button_37_Template, 9, 1, "button", 11)(38, FinanzaAccionesModalComponent_button_38_Template, 9, 0, "button", 12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275property("name", ctx.icono);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.subtitulo);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx.movimiento.estadoClase);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.movimiento.estadoTexto, " ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx.movimiento.montoTotalTexto);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.movimiento.montoPagadoTexto);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.movimiento.saldoPendienteTexto);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.movimiento.codigoSeguimiento);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx.estaCerrado);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.movimiento.tipo === "cobro_cliente" && ctx.movimiento.estado !== "anulado");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.movimiento.estado !== "anulado");
  }
}, dependencies: [CommonModule, NgClass, NgIf, IonicModule, IonIcon], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  background: transparent;\n  font-family: var(--font-main);\n}\n.acciones-panel[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 100%;\n  background: #f5f7fb;\n  border-top-left-radius: 24px;\n  border-top-right-radius: 24px;\n  padding: 10px 14px 18px;\n  box-sizing: border-box;\n  overflow-y: auto;\n}\n.modal-bar[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 5px;\n  border-radius: 999px;\n  background: #cbd5e1;\n  margin: 0 auto 14px;\n}\n.acciones-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #062b6f,\n      #0b3d91);\n  border-radius: 18px;\n  padding: 14px;\n  display: grid;\n  grid-template-columns: 48px minmax(0, 1fr) 36px;\n  gap: 12px;\n  align-items: center;\n  color: #ffffff;\n  margin-bottom: 12px;\n}\n.finanza-avatar[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 16px;\n  background: rgba(255, 255, 255, 0.16);\n  display: grid;\n  place-items: center;\n  color: #ffffff;\n}\n.finanza-avatar[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 25px;\n}\n.finanza-info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.finanza-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 900;\n  color: #ffffff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.finanza-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 6px;\n  font-size: 11px;\n  font-weight: 700;\n  color: #ffd166;\n}\n.finanza-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-flex;\n  height: 22px;\n  padding: 0 9px;\n  align-items: center;\n  border-radius: 999px;\n  font-size: 10px;\n  font-weight: 900;\n}\n.finanza-info[_ngcontent-%COMP%]   span.pendiente[_ngcontent-%COMP%], \n.finanza-info[_ngcontent-%COMP%]   span.parcial[_ngcontent-%COMP%] {\n  background: #fff4d6;\n  color: #b77900;\n}\n.finanza-info[_ngcontent-%COMP%]   span.cobrado[_ngcontent-%COMP%], \n.finanza-info[_ngcontent-%COMP%]   span.pagado[_ngcontent-%COMP%] {\n  background: #daf5e4;\n  color: #1f9d57;\n}\n.finanza-info[_ngcontent-%COMP%]   span.anulado[_ngcontent-%COMP%] {\n  background: #fde2e2;\n  color: #d63a3a;\n}\n.btn-close[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.15);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n}\n.btn-close[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.resumen-box[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 9px;\n  margin-bottom: 12px;\n}\n.resumen-box[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  min-height: 58px;\n  background: #ffffff;\n  border: 1px solid #e6ebf3;\n  border-radius: 14px;\n  padding: 10px;\n  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);\n  box-sizing: border-box;\n}\n.resumen-box[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 4px;\n  font-size: 10px;\n  font-weight: 700;\n  color: #64748b;\n}\n.resumen-box[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  font-weight: 900;\n  color: #111827;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.acciones-lista[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.accion-item[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #e6ebf3;\n  border-radius: 16px;\n  background: #ffffff;\n  padding: 12px;\n  display: grid;\n  grid-template-columns: 42px minmax(0, 1fr) 20px;\n  gap: 10px;\n  align-items: center;\n  text-align: left;\n  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);\n  font-family: var(--font-main);\n}\n.accion-item[_ngcontent-%COMP%]:active {\n  transform: scale(0.985);\n}\n.accion-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  display: grid;\n  place-items: center;\n}\n.accion-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 21px;\n}\n.accion-icon.cerrar[_ngcontent-%COMP%] {\n  background: #eafaf0;\n  color: #1f9d57;\n}\n.accion-icon.anular[_ngcontent-%COMP%] {\n  background: #ffecec;\n  color: #d63a3a;\n}\n.accion-text[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.accion-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 900;\n  color: #111827;\n}\n.accion-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: #64748b;\n  line-height: 1.25;\n}\n.accion-item.danger[_ngcontent-%COMP%]   .accion-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #b42318;\n}\n.arrow[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-size: 17px;\n}\n@media (max-width: 360px) {\n  .resumen-box[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .acciones-header[_ngcontent-%COMP%] {\n    grid-template-columns: 44px minmax(0, 1fr) 34px;\n  }\n  .finanza-avatar[_ngcontent-%COMP%] {\n    width: 44px;\n    height: 44px;\n  }\n}\n/*# sourceMappingURL=finanza-acciones-modal.component.css.map */"] });
var FinanzaAccionesModalComponent = _FinanzaAccionesModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FinanzaAccionesModalComponent, [{
    type: Component,
    args: [{ selector: "app-finanza-acciones-modal", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: `<!-- src/app/shared/componentes/finanza-acciones-modal/finanza-acciones-modal.component.html -->

<div class="acciones-panel">

  <div class="modal-bar"></div>

  <header class="acciones-header">

    <div class="finanza-avatar">
      <ion-icon [name]="icono"></ion-icon>
    </div>

    <div class="finanza-info">
      <h2>{{ titulo }}</h2>
      <p>{{ subtitulo }}</p>

      <span [ngClass]="movimiento.estadoClase">
        {{ movimiento.estadoTexto }}
      </span>
    </div>

    <button
      type="button"
      class="btn-close"
      (click)="cancelar()"
    >
      <ion-icon name="close-outline"></ion-icon>
    </button>

  </header>

  <section class="resumen-box">

    <article>
      <span>Total</span>
      <strong>{{ movimiento.montoTotalTexto }}</strong>
    </article>

    <article>
      <span>Pagado</span>
      <strong>{{ movimiento.montoPagadoTexto }}</strong>
    </article>

    <article>
      <span>Pendiente</span>
      <strong>{{ movimiento.saldoPendienteTexto }}</strong>
    </article>

    <article>
      <span>Seguimiento</span>
      <strong>{{ movimiento.codigoSeguimiento }}</strong>
    </article>

  </section>

  <section class="acciones-lista">

    <button
      *ngIf="!estaCerrado"
      type="button"
      class="accion-item"
      (click)="seleccionar('cerrar')"
    >
      <div class="accion-icon cerrar">
        <ion-icon name="checkmark-circle-outline"></ion-icon>
      </div>

      <div class="accion-text">
        <h3>{{ cerrarTexto }}</h3>
        <p>{{ cerrarDescripcion }}</p>
      </div>

      <ion-icon name="chevron-forward-outline" class="arrow"></ion-icon>
    </button>
<button
  *ngIf="movimiento.tipo === 'cobro_cliente' && movimiento.estado !== 'anulado'"
  type="button"
  class="accion-item"
  (click)="seleccionar('sincronizar_trabajo')"
>
  <div class="accion-icon cerrar">
    <ion-icon name="cash-outline"></ion-icon>
  </div>

  <div class="accion-text">
    <h3>Actualizar monto del trabajo</h3>
    <p>
      Cambia el monto del trabajo a {{ movimiento.montoTotalTexto }}.
    </p>
  </div>

  <ion-icon name="chevron-forward-outline" class="arrow"></ion-icon>
</button>
    <button
      *ngIf="movimiento.estado !== 'anulado'"
      type="button"
      class="accion-item danger"
      (click)="seleccionar('anular')"
    >
      <div class="accion-icon anular">
        <ion-icon name="ban-outline"></ion-icon>
      </div>

      <div class="accion-text">
        <h3>Anular movimiento</h3>
        <p>El movimiento no se contar\xE1 como pendiente ni como cerrado.</p>
      </div>

      <ion-icon name="chevron-forward-outline" class="arrow"></ion-icon>
    </button>

  </section>

</div>`, styles: ["/* src/app/shared/componentes/finanza-acciones-modal/finanza-acciones-modal.component.css */\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n  background: transparent;\n  font-family: var(--font-main);\n}\n.acciones-panel {\n  width: 100%;\n  min-height: 100%;\n  background: #f5f7fb;\n  border-top-left-radius: 24px;\n  border-top-right-radius: 24px;\n  padding: 10px 14px 18px;\n  box-sizing: border-box;\n  overflow-y: auto;\n}\n.modal-bar {\n  width: 44px;\n  height: 5px;\n  border-radius: 999px;\n  background: #cbd5e1;\n  margin: 0 auto 14px;\n}\n.acciones-header {\n  background:\n    linear-gradient(\n      135deg,\n      #062b6f,\n      #0b3d91);\n  border-radius: 18px;\n  padding: 14px;\n  display: grid;\n  grid-template-columns: 48px minmax(0, 1fr) 36px;\n  gap: 12px;\n  align-items: center;\n  color: #ffffff;\n  margin-bottom: 12px;\n}\n.finanza-avatar {\n  width: 48px;\n  height: 48px;\n  border-radius: 16px;\n  background: rgba(255, 255, 255, 0.16);\n  display: grid;\n  place-items: center;\n  color: #ffffff;\n}\n.finanza-avatar ion-icon {\n  font-size: 25px;\n}\n.finanza-info {\n  min-width: 0;\n}\n.finanza-info h2 {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 900;\n  color: #ffffff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.finanza-info p {\n  margin: 3px 0 6px;\n  font-size: 11px;\n  font-weight: 700;\n  color: #ffd166;\n}\n.finanza-info span {\n  display: inline-flex;\n  height: 22px;\n  padding: 0 9px;\n  align-items: center;\n  border-radius: 999px;\n  font-size: 10px;\n  font-weight: 900;\n}\n.finanza-info span.pendiente,\n.finanza-info span.parcial {\n  background: #fff4d6;\n  color: #b77900;\n}\n.finanza-info span.cobrado,\n.finanza-info span.pagado {\n  background: #daf5e4;\n  color: #1f9d57;\n}\n.finanza-info span.anulado {\n  background: #fde2e2;\n  color: #d63a3a;\n}\n.btn-close {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.15);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n}\n.btn-close ion-icon {\n  font-size: 22px;\n}\n.resumen-box {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 9px;\n  margin-bottom: 12px;\n}\n.resumen-box article {\n  min-height: 58px;\n  background: #ffffff;\n  border: 1px solid #e6ebf3;\n  border-radius: 14px;\n  padding: 10px;\n  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);\n  box-sizing: border-box;\n}\n.resumen-box span {\n  display: block;\n  margin-bottom: 4px;\n  font-size: 10px;\n  font-weight: 700;\n  color: #64748b;\n}\n.resumen-box strong {\n  display: block;\n  font-size: 13px;\n  font-weight: 900;\n  color: #111827;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.acciones-lista {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.accion-item {\n  width: 100%;\n  border: 1px solid #e6ebf3;\n  border-radius: 16px;\n  background: #ffffff;\n  padding: 12px;\n  display: grid;\n  grid-template-columns: 42px minmax(0, 1fr) 20px;\n  gap: 10px;\n  align-items: center;\n  text-align: left;\n  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);\n  font-family: var(--font-main);\n}\n.accion-item:active {\n  transform: scale(0.985);\n}\n.accion-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  display: grid;\n  place-items: center;\n}\n.accion-icon ion-icon {\n  font-size: 21px;\n}\n.accion-icon.cerrar {\n  background: #eafaf0;\n  color: #1f9d57;\n}\n.accion-icon.anular {\n  background: #ffecec;\n  color: #d63a3a;\n}\n.accion-text {\n  min-width: 0;\n}\n.accion-text h3 {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 900;\n  color: #111827;\n}\n.accion-text p {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: #64748b;\n  line-height: 1.25;\n}\n.accion-item.danger .accion-text h3 {\n  color: #b42318;\n}\n.arrow {\n  color: #94a3b8;\n  font-size: 17px;\n}\n@media (max-width: 360px) {\n  .resumen-box {\n    grid-template-columns: 1fr;\n  }\n  .acciones-header {\n    grid-template-columns: 44px minmax(0, 1fr) 34px;\n  }\n  .finanza-avatar {\n    width: 44px;\n    height: 44px;\n  }\n}\n/*# sourceMappingURL=finanza-acciones-modal.component.css.map */\n"] }]
  }], () => [], { movimiento: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FinanzaAccionesModalComponent, { className: "FinanzaAccionesModalComponent", filePath: "src/app/shared/componentes/finanza-acciones-modal/finanza-acciones-modal.component.ts", lineNumber: 35 });
})();

// src/app/paginas/administrador/finanzas/finanzas.page.ts
function FinanzasPage_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "app-admin-header", 4);
    \u0275\u0275listener("menuClick", function FinanzasPage_ng_container_1_Template_app_admin_header_menuClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirMenu());
    })("notificacionesClick", function FinanzasPage_ng_container_1_Template_app_admin_header_notificacionesClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirNotificaciones());
    })("perfilClick", function FinanzasPage_ng_container_1_Template_app_admin_header_perfilClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirPerfil());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const adminVm_r3 = ctx.ngIf;
    \u0275\u0275advance();
    \u0275\u0275property("nombre", adminVm_r3.administrador.nombres || adminVm_r3.administrador.usuario || adminVm_r3.administrador.correo || "Administrador")("rol", "Administrador")("fotoUrl", adminVm_r3.administrador.fotoUrl || "")("notificaciones", adminVm_r3.resumen.notificacionesNoLeidas);
  }
}
function FinanzasPage_ng_container_3_div_17_button_1_p_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const movimiento_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Seguimiento: ", movimiento_r6.codigoSeguimiento, "\n");
  }
}
function FinanzasPage_ng_container_3_div_17_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function FinanzasPage_ng_container_3_div_17_button_1_Template_button_click_0_listener() {
      const movimiento_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.abrirAcciones(movimiento_r6));
    });
    \u0275\u0275elementStart(1, "div", 20)(2, "div", 21);
    \u0275\u0275element(3, "ion-icon", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 23)(5, "div", 24)(6, "span", 25);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 26);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "h3");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 27);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 28)(15, "span");
    \u0275\u0275element(16, "ion-icon", 29);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275element(19, "ion-icon", 30);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(21, FinanzasPage_ng_container_3_div_17_button_1_p_21_Template, 2, 1, "p", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 32);
    \u0275\u0275element(23, "ion-icon", 33);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const movimiento_r6 = ctx.$implicit;
    \u0275\u0275classProp("cobro", movimiento_r6.clase === "cobro")("pago", movimiento_r6.clase === "pago");
    \u0275\u0275advance(3);
    \u0275\u0275property("name", movimiento_r6.icono);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", movimiento_r6.codigo, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", movimiento_r6.estadoClase);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", movimiento_r6.estadoTexto, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(movimiento_r6.concepto);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", movimiento_r6.personaEtiqueta, ": ", movimiento_r6.personaNombre, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Total: ", movimiento_r6.montoTotalTexto, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Pendiente: ", movimiento_r6.saldoPendienteTexto, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", movimiento_r6.codigoSeguimiento);
  }
}
function FinanzasPage_ng_container_3_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275template(1, FinanzasPage_ng_container_3_div_17_button_1_Template, 24, 14, "button", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r7 = \u0275\u0275nextContext().ngIf;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", vm_r7.movimientosPagina)("ngForTrackBy", ctx_r1.trackByMovimiento);
  }
}
function FinanzasPage_ng_container_3_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-admin-empty-state", 35);
    \u0275\u0275listener("botonClick", function FinanzasPage_ng_container_3_ng_template_18_Template_app_admin_empty_state_botonClick_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.nuevoMovimiento());
    });
    \u0275\u0275elementEnd();
  }
}
function FinanzasPage_ng_container_3_app_admin_pagination_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-admin-pagination", 36);
    \u0275\u0275listener("anterior", function FinanzasPage_ng_container_3_app_admin_pagination_20_Template_app_admin_pagination_anterior_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.paginaAnterior());
    })("siguiente", function FinanzasPage_ng_container_3_app_admin_pagination_20_Template_app_admin_pagination_siguiente_0_listener() {
      \u0275\u0275restoreView(_r9);
      const vm_r7 = \u0275\u0275nextContext().ngIf;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.paginaSiguiente(vm_r7.totalPaginas));
    })("irPagina", function FinanzasPage_ng_container_3_app_admin_pagination_20_Template_app_admin_pagination_irPagina_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.irPagina($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r7 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275property("paginaActual", vm_r7.paginaActual)("totalPaginas", vm_r7.totalPaginas)("paginas", vm_r7.paginas);
  }
}
function FinanzasPage_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 5)(2, "app-admin-module-hero", 6);
    \u0275\u0275listener("botonClick", function FinanzasPage_ng_container_3_Template_app_admin_module_hero_botonClick_2_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nuevoMovimiento());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "section", 7);
    \u0275\u0275element(4, "app-admin-summary-card", 8)(5, "app-admin-summary-card", 9)(6, "app-admin-summary-card", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "app-admin-search-filter", 11);
    \u0275\u0275listener("buscar", function FinanzasPage_ng_container_3_Template_app_admin_search_filter_buscar_7_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.buscarFinanza($event));
    })("filtrar", function FinanzasPage_ng_container_3_Template_app_admin_search_filter_filtrar_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirFiltro());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "section", 12)(9, "div")(10, "h3");
    \u0275\u0275text(11, "Movimientos financieros");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "span", 13);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "section", 14);
    \u0275\u0275template(17, FinanzasPage_ng_container_3_div_17_Template, 2, 2, "div", 15)(18, FinanzasPage_ng_container_3_ng_template_18_Template, 1, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, FinanzasPage_ng_container_3_app_admin_pagination_20_Template, 1, 3, "app-admin-pagination", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const vm_r7 = ctx.ngIf;
    const sinResultados_r10 = \u0275\u0275reference(19);
    \u0275\u0275advance(4);
    \u0275\u0275property("valor", vm_r7.totalPorCobrarTexto);
    \u0275\u0275advance();
    \u0275\u0275property("valor", vm_r7.totalCobradoTexto);
    \u0275\u0275advance();
    \u0275\u0275property("valor", vm_r7.totalPorPagarTexto);
    \u0275\u0275advance();
    \u0275\u0275property("filtroActual", vm_r7.filtro);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", vm_r7.movimientosFiltrados.length, " registro(s) encontrado(s)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" P\xE1g. ", vm_r7.paginaActual, " / ", vm_r7.totalPaginas, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", vm_r7.movimientosPagina.length > 0)("ngIfElse", sinResultados_r10);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", vm_r7.totalPaginas > 1);
  }
}
var _FinanzasPage = class _FinanzasPage {
  constructor() {
    this.navCtrl = inject(NavController);
    this.toastCtrl = inject(ToastController);
    this.modalCtrl = inject(ModalController);
    this.dashboardAdminService = inject(DashboardAdminService);
    this.finanzasService = inject(FinanzasService);
    this.adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
    this.vm$ = this.finanzasService.obtenerFinanzas$();
    addIcons({
      "wallet-outline": walletOutline,
      "receipt-outline": receiptOutline,
      "people-outline": peopleOutline,
      "checkmark-circle-outline": checkmarkCircleOutline,
      "alert-circle-outline": alertCircleOutline,
      "add-outline": addOutline,
      "cash-outline": cashOutline,
      "time-outline": timeOutline,
      "ellipsis-vertical-outline": ellipsisVerticalOutline,
      "ban-outline": banOutline
    });
  }
  buscarFinanza(texto) {
    this.finanzasService.buscar(texto);
  }
  abrirFiltro() {
    this.finanzasService.cambiarFiltro();
  }
  paginaAnterior() {
    this.finanzasService.paginaAnterior();
  }
  paginaSiguiente(totalPaginas) {
    this.finanzasService.paginaSiguiente(totalPaginas);
  }
  irPagina(pagina) {
    this.finanzasService.irPagina(pagina);
  }
  nuevoMovimiento() {
    return __async(this, null, function* () {
      const modal = yield this.modalCtrl.create({
        component: FinanzaFormModalComponent,
        cssClass: "finanza-form-modal-full",
        backdropDismiss: false,
        handle: false,
        breakpoints: [0, 1],
        initialBreakpoint: 1
      });
      yield modal.present();
      const { data, role } = yield modal.onWillDismiss();
      if (role === "confirm" && data) {
        yield this.guardarMovimiento(data);
      }
    });
  }
  guardarMovimiento(data) {
    return __async(this, null, function* () {
      try {
        yield this.finanzasService.crearMovimiento(data);
        yield this.mostrarToast("Movimiento financiero registrado.", "success");
      } catch (error) {
        console.error("[FinanzasPage] Error guardando movimiento:", error);
        yield this.mostrarToast("No se pudo registrar el movimiento.", "danger");
      }
    });
  }
  abrirAcciones(movimiento) {
    return __async(this, null, function* () {
      const modal = yield this.modalCtrl.create({
        component: FinanzaAccionesModalComponent,
        cssClass: "finanza-acciones-modal",
        backdropDismiss: true,
        breakpoints: [0, 0.72, 0.92],
        initialBreakpoint: 0.72,
        handle: false,
        componentProps: {
          movimiento
        }
      });
      yield modal.present();
      const { data, role } = yield modal.onWillDismiss();
      if (role !== "confirm" || !data?.accion) {
        return;
      }
      const accion = data.accion;
      if (accion === "cerrar") {
        yield this.confirmarCerrarMovimiento(movimiento);
        return;
      }
      if (accion === "anular") {
        yield this.confirmarAnularMovimiento(movimiento);
        return;
      }
      if (accion === "sincronizar_trabajo") {
        yield this.confirmarSincronizarTrabajo(movimiento);
        return;
      }
    });
  }
  confirmarCerrarMovimiento(movimiento) {
    return __async(this, null, function* () {
      const esCobro = movimiento.tipo === "cobro_cliente";
      const confirmado = yield this.abrirConfirmacion({
        tipo: "success",
        icono: "checkmark-circle-outline",
        titulo: esCobro ? "Confirmar cobro" : "Confirmar pago",
        mensaje: esCobro ? "\xBFDeseas marcar este movimiento como cobrado?" : "\xBFDeseas marcar este movimiento como pagado?",
        detalle: `${movimiento.codigoSeguimiento} - ${movimiento.montoTotalTexto}`,
        textoConfirmar: esCobro ? "Marcar cobrado" : "Marcar pagado"
      });
      if (!confirmado) {
        return;
      }
      try {
        yield this.finanzasService.cerrarMovimiento(movimiento);
        yield this.mostrarToast("Movimiento actualizado.", "success");
      } catch (error) {
        console.error("[FinanzasPage] Error cerrando movimiento:", error);
        yield this.mostrarToast("No se pudo actualizar el movimiento.", "danger");
      }
    });
  }
  confirmarAnularMovimiento(movimiento) {
    return __async(this, null, function* () {
      const confirmado = yield this.abrirConfirmacion({
        tipo: "danger",
        icono: "ban-outline",
        titulo: "Anular movimiento",
        mensaje: "\xBFDeseas anular este movimiento financiero?",
        detalle: "El movimiento no se contar\xE1 como pendiente ni como cerrado.",
        textoConfirmar: "Anular"
      });
      if (!confirmado) {
        return;
      }
      try {
        yield this.finanzasService.anularMovimiento(movimiento);
        yield this.mostrarToast("Movimiento anulado.", "success");
      } catch (error) {
        console.error("[FinanzasPage] Error anulando movimiento:", error);
        yield this.mostrarToast("No se pudo anular el movimiento.", "danger");
      }
    });
  }
  confirmarSincronizarTrabajo(movimiento) {
    return __async(this, null, function* () {
      const confirmado = yield this.abrirConfirmacion({
        tipo: "primary",
        icono: "cash-outline",
        titulo: "Actualizar monto del trabajo",
        mensaje: "\xBFDeseas actualizar el monto del trabajo con el monto registrado en este cobro?",
        detalle: `${movimiento.codigoSeguimiento} cambiar\xE1 a ${movimiento.montoTotalTexto}`,
        textoConfirmar: "Actualizar"
      });
      if (!confirmado) {
        return;
      }
      try {
        yield this.finanzasService.sincronizarMontoTrabajo(movimiento);
        yield this.mostrarToast("Monto del trabajo actualizado.", "success");
      } catch (error) {
        console.error("[FinanzasPage] Error sincronizando monto del trabajo:", error);
        yield this.mostrarToast("No se pudo actualizar el monto del trabajo.", "danger");
      }
    });
  }
  abrirConfirmacion(data) {
    return __async(this, null, function* () {
      const modal = yield this.modalCtrl.create({
        component: AdminConfirmModalComponent,
        cssClass: "admin-confirm-modal",
        backdropDismiss: true,
        componentProps: {
          tipo: data.tipo,
          icono: data.icono,
          titulo: data.titulo,
          mensaje: data.mensaje,
          detalle: data.detalle || "",
          textoCancelar: data.textoCancelar || "Cancelar",
          textoConfirmar: data.textoConfirmar || "Confirmar"
        }
      });
      yield modal.present();
      const { role } = yield modal.onWillDismiss();
      return role === "confirm";
    });
  }
  abrirMenu() {
    this.navCtrl.navigateRoot("/dashboard-admin", {
      animated: false,
      replaceUrl: true
    });
  }
  abrirNotificaciones() {
    this.navCtrl.navigateRoot("/notificaciones-admin", {
      animated: false,
      replaceUrl: true
    });
  }
  abrirPerfil() {
    this.mostrarToast("Configuraci\xF3n de perfil pr\xF3ximamente.", "primary");
  }
  trackByMovimiento(index, item) {
    return item.uid || item.id || String(index);
  }
  mostrarToast(message, color = "primary") {
    return __async(this, null, function* () {
      const toast = yield this.toastCtrl.create({
        message,
        duration: 2200,
        position: "top",
        color
      });
      yield toast.present();
    });
  }
};
_FinanzasPage.\u0275fac = function FinanzasPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FinanzasPage)();
};
_FinanzasPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FinanzasPage, selectors: [["app-finanzas"]], decls: 6, vars: 7, consts: [["sinResultados", ""], [1, "finanzas-root", 3, "fullscreen"], [4, "ngIf"], ["activo", "inicio"], [3, "menuClick", "notificacionesClick", "perfilClick", "nombre", "rol", "fotoUrl", "notificaciones"], [1, "finanzas-container"], ["titulo", "Gesti\xF3n financiera", "descripcion", "Controla cobros a clientes y pagos a empleados por trabajos realizados.", "icono", "wallet-outline", "botonTexto", "Nuevo", "botonIcono", "add-outline", 3, "botonClick"], [1, "summary-grid"], ["titulo", "Por cobrar", "icono", "receipt-outline", "tipo", "total", 3, "valor"], ["titulo", "Cobrado", "icono", "checkmark-circle-outline", "tipo", "success", 3, "valor"], ["titulo", "Por pagar", "icono", "alert-circle-outline", "tipo", "danger", 3, "valor"], ["placeholder", "Buscar cobro, pago, cliente...", 3, "buscar", "filtrar", "filtroActual"], [1, "list-title-row"], [1, "page-indicator"], [1, "list-section"], ["class", "finanzas-list", 4, "ngIf", "ngIfElse"], [3, "paginaActual", "totalPaginas", "paginas", "anterior", "siguiente", "irPagina", 4, "ngIf"], [1, "finanzas-list"], ["type", "button", "class", "finanza-card", 3, "cobro", "pago", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "finanza-card", 3, "click"], [1, "finanza-main"], [1, "finanza-icon"], [3, "name"], [1, "finanza-info"], [1, "codigo-row"], [1, "codigo-chip"], [1, "estado-badge", 3, "ngClass"], [1, "finanza-persona"], [1, "finanza-meta"], ["name", "cash-outline"], ["name", "time-outline"], ["class", "trabajo-ref", 4, "ngIf"], [1, "finanza-side"], ["name", "ellipsis-vertical-outline"], [1, "trabajo-ref"], ["icono", "wallet-outline", "titulo", "No hay movimientos financieros", "descripcion", "Registra cobros a clientes o pagos a empleados para que aparezcan en esta lista.", "botonTexto", "Nuevo movimiento", "botonIcono", "add-outline", 3, "botonClick"], [3, "anterior", "siguiente", "irPagina", "paginaActual", "totalPaginas", "paginas"]], template: function FinanzasPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 1);
    \u0275\u0275template(1, FinanzasPage_ng_container_1_Template, 2, 4, "ng-container", 2);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275template(3, FinanzasPage_ng_container_3_Template, 21, 10, "ng-container", 2);
    \u0275\u0275pipe(4, "async");
    \u0275\u0275element(5, "app-admin-bottom-nav", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(2, 3, ctx.adminVm$));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(4, 5, ctx.vm$));
  }
}, dependencies: [
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  IonicModule,
  IonContent,
  IonIcon,
  AdminHeaderComponent,
  AdminBottomNavComponent,
  AdminModuleHeroComponent,
  AdminSummaryCardComponent,
  AdminSearchFilterComponent,
  AdminEmptyStateComponent,
  AdminPaginationComponent,
  AsyncPipe
], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\nion-content.finanzas-root[_ngcontent-%COMP%] {\n  --background: var(--color-page-outside);\n}\n.finanzas-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: var(--app-width);\n  min-height: calc(100vh - 76px);\n  margin: 0 auto;\n  padding: 14px 14px 94px;\n  background: var(--color-background);\n}\n.summary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 9px;\n  margin-bottom: 12px;\n}\n.list-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin: 4px 0 10px;\n}\n.list-title-row[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.list-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.page-indicator[_ngcontent-%COMP%] {\n  height: 26px;\n  padding: 0 9px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 10px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.list-section[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  padding: 0;\n  min-height: 330px;\n}\n.finanzas-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.finanza-card[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  background: var(--color-card);\n  padding: 11px;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 38px;\n  align-items: center;\n  gap: 8px;\n  text-align: left;\n  box-shadow: var(--shadow-card);\n  font-family: var(--font-main);\n}\n.finanza-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.985);\n}\n.finanza-main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n}\n.finanza-icon[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  border-radius: 16px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n  border: 1px solid #dbe8ff;\n}\n.finanza-card.pago[_ngcontent-%COMP%]   .finanza-icon[_ngcontent-%COMP%] {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n  border-color: #d8f3e2;\n}\n.finanza-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.finanza-info[_ngcontent-%COMP%] {\n  min-width: 0;\n  width: 100%;\n}\n.codigo-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 5px;\n}\n.codigo-chip[_ngcontent-%COMP%] {\n  height: 21px;\n  padding: 0 8px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 9.5px;\n  font-weight: 800;\n  display: inline-flex;\n  align-items: center;\n  max-width: 145px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.estado-badge[_ngcontent-%COMP%] {\n  height: 23px;\n  padding: 0 8px;\n  border-radius: 999px;\n  font-size: 9.5px;\n  font-weight: 800;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  white-space: nowrap;\n}\n.estado-badge.pendiente[_ngcontent-%COMP%], \n.estado-badge.parcial[_ngcontent-%COMP%] {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.estado-badge.cobrado[_ngcontent-%COMP%], \n.estado-badge.pagado[_ngcontent-%COMP%] {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.estado-badge.anulado[_ngcontent-%COMP%] {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.finanza-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--color-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.finanza-persona[_ngcontent-%COMP%] {\n  margin: 3px 0 6px;\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.finanza-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n}\n.finanza-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  max-width: 160px;\n  height: 22px;\n  padding: 0 7px;\n  border-radius: 999px;\n  background: #f1f5f9;\n  color: #475569;\n  font-size: 9.8px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.finanza-meta[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #64748b;\n  flex-shrink: 0;\n}\n.trabajo-ref[_ngcontent-%COMP%] {\n  margin: 7px 0 0;\n  font-size: 10px;\n  font-weight: 700;\n  color: var(--color-primary);\n}\n.finanza-side[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 34px;\n  border: 1px solid #dbe3ef;\n  border-radius: 12px;\n  background: #f8fafc;\n  color: var(--color-primary);\n  display: grid;\n  place-items: center;\n  padding: 0;\n  flex-shrink: 0;\n}\n.finanza-side[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.admin-container[_ngcontent-%COMP%], \n.page-container[_ngcontent-%COMP%], \n.materiales-container[_ngcontent-%COMP%], \n.trabajos-container[_ngcontent-%COMP%], \n.empleados-container[_ngcontent-%COMP%], \n.mas-container[_ngcontent-%COMP%], \n.finanzas-container[_ngcontent-%COMP%] {\n  padding-bottom: 95px;\n}\n@media (max-width: 360px) {\n  .summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .finanza-card[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .finanza-side[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .codigo-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n/*# sourceMappingURL=finanzas.page.css.map */"] });
var FinanzasPage = _FinanzasPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FinanzasPage, [{
    type: Component,
    args: [{ selector: "app-finanzas", standalone: true, imports: [
      CommonModule,
      IonicModule,
      AdminHeaderComponent,
      AdminBottomNavComponent,
      AdminModuleHeroComponent,
      AdminSummaryCardComponent,
      AdminSearchFilterComponent,
      AdminEmptyStateComponent,
      AdminPaginationComponent
    ], template: `<!-- src/app/paginas/administrador/finanzas/finanzas.page.html -->

<ion-content [fullscreen]="true" class="finanzas-root">

  <ng-container *ngIf="adminVm$ | async as adminVm">
    <app-admin-header
      [nombre]="adminVm.administrador.nombres || adminVm.administrador.usuario || adminVm.administrador.correo || 'Administrador'"
      [rol]="'Administrador'"
      [fotoUrl]="adminVm.administrador.fotoUrl || ''"
      [notificaciones]="adminVm.resumen.notificacionesNoLeidas"
      (menuClick)="abrirMenu()"
      (notificacionesClick)="abrirNotificaciones()"
      (perfilClick)="abrirPerfil()"
    ></app-admin-header>
  </ng-container>

  <ng-container *ngIf="vm$ | async as vm">

    <div class="finanzas-container">

      <app-admin-module-hero
        titulo="Gesti\xF3n financiera"
        descripcion="Controla cobros a clientes y pagos a empleados por trabajos realizados."
        icono="wallet-outline"
        botonTexto="Nuevo"
        botonIcono="add-outline"
        (botonClick)="nuevoMovimiento()"
      ></app-admin-module-hero>

      <section class="summary-grid">

        <app-admin-summary-card
          titulo="Por cobrar"
          [valor]="vm.totalPorCobrarTexto"
          icono="receipt-outline"
          tipo="total"
        ></app-admin-summary-card>

        <app-admin-summary-card
          titulo="Cobrado"
          [valor]="vm.totalCobradoTexto"
          icono="checkmark-circle-outline"
          tipo="success"
        ></app-admin-summary-card>

        <app-admin-summary-card
          titulo="Por pagar"
          [valor]="vm.totalPorPagarTexto"
          icono="alert-circle-outline"
          tipo="danger"
        ></app-admin-summary-card>

      </section>

      <app-admin-search-filter
        placeholder="Buscar cobro, pago, cliente..."
        [filtroActual]="vm.filtro"
        (buscar)="buscarFinanza($event)"
        (filtrar)="abrirFiltro()"
      ></app-admin-search-filter>

      <section class="list-title-row">
        <div>
          <h3>Movimientos financieros</h3>
          <p>{{ vm.movimientosFiltrados.length }} registro(s) encontrado(s)</p>
        </div>

        <span class="page-indicator">
          P\xE1g. {{ vm.paginaActual }} / {{ vm.totalPaginas }}
        </span>
      </section>

      <section class="list-section">

        <div
          class="finanzas-list"
          *ngIf="vm.movimientosPagina.length > 0; else sinResultados"
        >

          <button
            type="button"
            class="finanza-card"
            *ngFor="let movimiento of vm.movimientosPagina; trackBy: trackByMovimiento"
            [class.cobro]="movimiento.clase === 'cobro'"
            [class.pago]="movimiento.clase === 'pago'"
            (click)="abrirAcciones(movimiento)"
          >

            <div class="finanza-main">

              <div class="finanza-icon">
                <ion-icon [name]="movimiento.icono"></ion-icon>
              </div>

              <div class="finanza-info">

                <div class="codigo-row">
                  <span class="codigo-chip">
                    {{ movimiento.codigo }}
                  </span>

                  <span
                    class="estado-badge"
                    [ngClass]="movimiento.estadoClase"
                  >
                    {{ movimiento.estadoTexto }}
                  </span>
                </div>

                <h3>{{ movimiento.concepto }}</h3>

                <p class="finanza-persona">
                  {{ movimiento.personaEtiqueta }}: {{ movimiento.personaNombre }}
                </p>

                <div class="finanza-meta">

                  <span>
                    <ion-icon name="cash-outline"></ion-icon>
                    Total: {{ movimiento.montoTotalTexto }}
                  </span>

                  <span>
                    <ion-icon name="time-outline"></ion-icon>
                    Pendiente: {{ movimiento.saldoPendienteTexto }}
                  </span>

                </div>

  <p
  class="trabajo-ref"
  *ngIf="movimiento.codigoSeguimiento"
>
  Seguimiento: {{ movimiento.codigoSeguimiento }}
</p>

              </div>

            </div>

            <div class="finanza-side">
              <ion-icon name="ellipsis-vertical-outline"></ion-icon>
            </div>

          </button>

        </div>

        <ng-template #sinResultados>
          <app-admin-empty-state
            icono="wallet-outline"
            titulo="No hay movimientos financieros"
            descripcion="Registra cobros a clientes o pagos a empleados para que aparezcan en esta lista."
            botonTexto="Nuevo movimiento"
            botonIcono="add-outline"
            (botonClick)="nuevoMovimiento()"
          ></app-admin-empty-state>
        </ng-template>

      </section>

      <app-admin-pagination
        *ngIf="vm.totalPaginas > 1"
        [paginaActual]="vm.paginaActual"
        [totalPaginas]="vm.totalPaginas"
        [paginas]="vm.paginas"
        (anterior)="paginaAnterior()"
        (siguiente)="paginaSiguiente(vm.totalPaginas)"
        (irPagina)="irPagina($event)"
      ></app-admin-pagination>

    </div>

  </ng-container>

  <app-admin-bottom-nav activo="inicio"></app-admin-bottom-nav>

</ion-content>`, styles: ["/* src/app/paginas/administrador/finanzas/finanzas.page.css */\n:host {\n  display: block;\n}\nion-content.finanzas-root {\n  --background: var(--color-page-outside);\n}\n.finanzas-container {\n  width: 100%;\n  max-width: var(--app-width);\n  min-height: calc(100vh - 76px);\n  margin: 0 auto;\n  padding: 14px 14px 94px;\n  background: var(--color-background);\n}\n.summary-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 9px;\n  margin-bottom: 12px;\n}\n.list-title-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin: 4px 0 10px;\n}\n.list-title-row h3 {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.list-title-row p {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.page-indicator {\n  height: 26px;\n  padding: 0 9px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 10px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.list-section {\n  background: transparent;\n  border: none;\n  padding: 0;\n  min-height: 330px;\n}\n.finanzas-list {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.finanza-card {\n  width: 100%;\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  background: var(--color-card);\n  padding: 11px;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 38px;\n  align-items: center;\n  gap: 8px;\n  text-align: left;\n  box-shadow: var(--shadow-card);\n  font-family: var(--font-main);\n}\n.finanza-card:active {\n  transform: scale(0.985);\n}\n.finanza-main {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n}\n.finanza-icon {\n  width: 50px;\n  height: 50px;\n  border-radius: 16px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n  border: 1px solid #dbe8ff;\n}\n.finanza-card.pago .finanza-icon {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n  border-color: #d8f3e2;\n}\n.finanza-icon ion-icon {\n  font-size: 24px;\n}\n.finanza-info {\n  min-width: 0;\n  width: 100%;\n}\n.codigo-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 5px;\n}\n.codigo-chip {\n  height: 21px;\n  padding: 0 8px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 9.5px;\n  font-weight: 800;\n  display: inline-flex;\n  align-items: center;\n  max-width: 145px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.estado-badge {\n  height: 23px;\n  padding: 0 8px;\n  border-radius: 999px;\n  font-size: 9.5px;\n  font-weight: 800;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  white-space: nowrap;\n}\n.estado-badge.pendiente,\n.estado-badge.parcial {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.estado-badge.cobrado,\n.estado-badge.pagado {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.estado-badge.anulado {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.finanza-info h3 {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--color-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.finanza-persona {\n  margin: 3px 0 6px;\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.finanza-meta {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n}\n.finanza-meta span {\n  max-width: 160px;\n  height: 22px;\n  padding: 0 7px;\n  border-radius: 999px;\n  background: #f1f5f9;\n  color: #475569;\n  font-size: 9.8px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.finanza-meta ion-icon {\n  font-size: 12px;\n  color: #64748b;\n  flex-shrink: 0;\n}\n.trabajo-ref {\n  margin: 7px 0 0;\n  font-size: 10px;\n  font-weight: 700;\n  color: var(--color-primary);\n}\n.finanza-side {\n  width: 36px;\n  height: 34px;\n  border: 1px solid #dbe3ef;\n  border-radius: 12px;\n  background: #f8fafc;\n  color: var(--color-primary);\n  display: grid;\n  place-items: center;\n  padding: 0;\n  flex-shrink: 0;\n}\n.finanza-side ion-icon {\n  font-size: 20px;\n}\n.admin-container,\n.page-container,\n.materiales-container,\n.trabajos-container,\n.empleados-container,\n.mas-container,\n.finanzas-container {\n  padding-bottom: 95px;\n}\n@media (max-width: 360px) {\n  .summary-grid {\n    grid-template-columns: 1fr;\n  }\n  .finanza-card {\n    grid-template-columns: 1fr;\n  }\n  .finanza-side {\n    display: none;\n  }\n  .codigo-row {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n/*# sourceMappingURL=finanzas.page.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FinanzasPage, { className: "FinanzasPage", filePath: "src/app/paginas/administrador/finanzas/finanzas.page.ts", lineNumber: 68 });
})();
export {
  FinanzasPage
};
//# sourceMappingURL=finanzas.page-S2UCGSGF.js.map
