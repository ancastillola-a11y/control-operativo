import {
  GpsService
} from "./chunk-2JYSEZGS.js";
import {
  AdminModuleHeroComponent
} from "./chunk-DT73SCF2.js";
import {
  AdminSummaryCardComponent
} from "./chunk-XIEUEHEY.js";
import {
  AdminEmptyStateComponent
} from "./chunk-SVPM23ZW.js";
import {
  AlertController,
  IonContent,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonicModule,
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
  alertCircleOutline,
  briefcaseOutline,
  calendarOutline,
  callOutline,
  cashOutline,
  checkmarkCircleOutline,
  checkmarkDoneOutline,
  clipboardOutline,
  constructOutline,
  cubeOutline,
  documentTextOutline,
  locateOutline,
  locationOutline,
  logOutOutline,
  mapOutline,
  navigateOutline,
  pinOutline,
  playCircleOutline,
  radioOutline,
  refreshOutline,
  stopCircleOutline,
  timeOutline
} from "./chunk-XEVVVGO7.js";
import {
  Auth,
  Firestore,
  addDoc,
  authState,
  collection,
  collectionData,
  doc,
  docData,
  serverTimestamp,
  signOut2 as signOut,
  updateDoc
} from "./chunk-NMRAWXHA.js";
import {
  AsyncPipe,
  BehaviorSubject,
  CommonModule,
  Component,
  Injectable,
  NavController,
  NgClass,
  NgForOf,
  NgIf,
  catchError,
  combineLatest,
  inject,
  map,
  of,
  setClassMetadata,
  shareReplay,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵsanitizeUrl,
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

// src/app/dao/dashboard-empleado.dao.ts
var _DashboardEmpleadoDAO = class _DashboardEmpleadoDAO {
  constructor() {
    this.firestore = inject(Firestore);
  }
  obtenerEmpleadoActual$(uid) {
    const uidLimpio = String(uid || "").trim();
    if (!uidLimpio) {
      return of(this.crearEmpleadoVacio());
    }
    const ref = doc(this.firestore, "usuarios", uidLimpio);
    return docData(ref, { idField: "id" }).pipe(map((data) => this.mapearEmpleado(uidLimpio, data || {})), catchError((error) => {
      console.error("[DashboardEmpleadoDAO] Error obteniendo empleado:", error);
      return of(this.crearEmpleadoVacio(uidLimpio));
    }));
  }
  escucharTrabajosAsignados$(empleadoUid) {
    const uidLimpio = String(empleadoUid || "").trim();
    if (!uidLimpio) {
      return of([]);
    }
    const ref = collection(this.firestore, "trabajos");
    return collectionData(ref, { idField: "id" }).pipe(map((items) => (items || []).filter((trabajo) => trabajo?.eliminado !== true).filter((trabajo) => this.trabajoPerteneceAlEmpleado(trabajo, uidLimpio)).map((trabajo) => this.mapearTrabajo(trabajo)).sort((a, b) => {
      const ordenEstado = this.ordenEstado(a.estado) - this.ordenEstado(b.estado);
      if (ordenEstado !== 0) {
        return ordenEstado;
      }
      return this.obtenerFechaOrden(a) - this.obtenerFechaOrden(b);
    })), catchError((error) => {
      console.error("[DashboardEmpleadoDAO] Error obteniendo trabajos asignados:", error);
      return of([]);
    }));
  }
  actualizarEstadoTrabajo(trabajo, nuevoEstado, empleado) {
    return __async(this, null, function* () {
      const trabajoUid = String(trabajo.uid || trabajo.id || "").trim();
      if (!trabajoUid) {
        throw new Error("trabajo-uid-vacio");
      }
      const ref = doc(this.firestore, "trabajos", trabajoUid);
      const payload = {
        estado: nuevoEstado,
        actualizadoPorUid: empleado.uid,
        actualizadoPorNombre: empleado.nombreCompleto,
        updatedAt: serverTimestamp()
      };
      if (nuevoEstado === "en_camino") {
        payload.enCaminoPorUid = empleado.uid;
        payload.enCaminoPorNombre = empleado.nombreCompleto;
        payload.enCaminoAt = serverTimestamp();
      }
      if (nuevoEstado === "en_proceso") {
        payload.iniciadoPorUid = empleado.uid;
        payload.iniciadoPorNombre = empleado.nombreCompleto;
        payload.iniciadoAt = serverTimestamp();
      }
      if (nuevoEstado === "finalizado") {
        payload.finalizadoPorUid = empleado.uid;
        payload.finalizadoPorNombre = empleado.nombreCompleto;
        payload.finalizadoAt = serverTimestamp();
      }
      yield updateDoc(ref, payload);
      yield this.registrarHistorial(trabajo, nuevoEstado, empleado).catch((error) => {
        console.warn("[DashboardEmpleadoDAO] No se pudo registrar historial:", error);
      });
      yield this.notificarAdministrador(trabajo, nuevoEstado, empleado).catch((error) => {
        console.warn("[DashboardEmpleadoDAO] No se pudo notificar al administrador:", error);
      });
    });
  }
  trabajoPerteneceAlEmpleado(trabajo, empleadoUid) {
    const empleados = Array.isArray(trabajo?.empleadosAsignados) ? trabajo.empleadosAsignados : [];
    return empleados.some((empleado) => String(empleado?.uid || "").trim() === empleadoUid);
  }
  mapearEmpleado(uid, data) {
    const nombres = String(data.nombres || "").trim();
    const apellidos = String(data.apellidos || "").trim();
    const nombreCompleto = String(data.nombreCompleto || `${nombres} ${apellidos}`.trim() || data.usuario || "Empleado").trim();
    const rol = String(data.rol || "").trim().toLowerCase();
    const empleado = __spreadProps(__spreadValues({}, data), {
      id: String(data.id || uid).trim(),
      uid: String(data.uid || uid).trim(),
      nombres,
      apellidos,
      nombreCompleto,
      usuario: String(data.usuario || "").trim(),
      correo: String(data.correo || "").trim().toLowerCase(),
      correoAuth: String(data.correoAuth || data.correo || "").trim().toLowerCase(),
      dni: String(data.dni || "").trim(),
      telefono: String(data.telefono || "").trim(),
      cargo: String(data.cargo || "Personal operativo").trim(),
      rol: "empleado",
      habilitado: data.habilitado !== false,
      activo: data.activo !== false,
      estado: data.estado !== false,
      eliminado: data.eliminado === true,
      fotoUrl: String(data.fotoUrl || "").trim(),
      iniciales: this.obtenerIniciales(nombreCompleto),
      cargoTexto: String(data.cargo || "Personal operativo").trim(),
      accesoValido: rol === "empleado" && data.eliminado !== true && data.habilitado !== false && data.activo !== false && data.estado !== false
    });
    return empleado;
  }
  mapearTrabajo(data) {
    const id = String(data.id || "").trim();
    const uid = String(data.uid || id).trim();
    const estado = this.normalizarEstado(data.estado);
    const fechaProgramada = String(data.fechaProgramada || "").trim();
    const horaProgramada = String(data.horaProgramada || "").trim();
    const subtotal = Number(data.subtotal || 0);
    const materialesAsignados = Array.isArray(data.materialesAsignados) ? data.materialesAsignados : [];
    const trabajo = __spreadProps(__spreadValues({}, data), {
      id,
      uid,
      clienteNombre: String(data.clienteNombre || "Sin cliente").trim(),
      clienteTelefono: String(data.clienteTelefono || "").trim(),
      direccion: String(data.direccion || "").trim(),
      referencia: String(data.referencia || "").trim(),
      latitud: data.latitud ?? null,
      longitud: data.longitud ?? null,
      direccionMapa: String(data.direccionMapa || "").trim(),
      ubicacionTextoOriginal: String(data.ubicacionTextoOriginal || "").trim(),
      tipoTrabajo: String(data.tipoTrabajo || "Trabajo").trim(),
      descripcion: String(data.descripcion || "").trim(),
      fechaProgramada,
      horaProgramada,
      subtotal,
      empleadosAsignados: Array.isArray(data.empleadosAsignados) ? data.empleadosAsignados : [],
      materialesAsignados,
      codigoCliente: String(data.codigoCliente || "").trim(),
      codigoDevolucion: String(data.codigoDevolucion || "").trim(),
      estado,
      activo: data.activo !== false,
      eliminado: data.eliminado === true,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      canceledAt: data.canceledAt,
      codigoTrabajo: this.obtenerCodigoTrabajo(__spreadProps(__spreadValues({}, data), {
        id,
        uid
      })),
      estadoTexto: this.obtenerEstadoTexto(estado),
      estadoClase: estado,
      fechaHoraTexto: this.obtenerFechaHoraTexto(fechaProgramada, horaProgramada),
      subtotalTexto: this.formatearSoles(subtotal),
      direccionTexto: this.obtenerDireccionTexto(data),
      materialesTexto: materialesAsignados.length ? materialesAsignados.map((material) => `${material.nombre || "Material"} (${Number(material.cantidadAsignada || 0)} ${material.unidad || "und."})`).join(", ") : "Sin materiales registrados",
      puedeMarcarEnCamino: estado === "pendiente",
      puedeIniciar: estado === "en_camino",
      puedeFinalizar: estado === "en_proceso",
      tieneTelefono: !!String(data.clienteTelefono || "").trim(),
      tieneMapa: !!Number(data.latitud || 0) && !!Number(data.longitud || 0)
    });
    return trabajo;
  }
  registrarHistorial(trabajo, nuevoEstado, empleado) {
    return __async(this, null, function* () {
      const ref = collection(this.firestore, "historial_actividades");
      yield addDoc(ref, {
        modulo: "Panel empleado",
        accion: `cambio_estado_${nuevoEstado}`,
        descripcion: `${empleado.nombreCompleto} actualiz\xF3 el trabajo ${trabajo.codigoTrabajo} a ${this.obtenerEstadoTexto(nuevoEstado)}.`,
        trabajoUid: trabajo.uid,
        codigoTrabajo: trabajo.codigoTrabajo,
        empleadoUid: empleado.uid,
        empleadoNombre: empleado.nombreCompleto,
        createdAt: serverTimestamp()
      });
    });
  }
  notificarAdministrador(trabajo, nuevoEstado, empleado) {
    return __async(this, null, function* () {
      const ref = collection(this.firestore, "notificaciones_admin");
      yield addDoc(ref, {
        titulo: "Actualizaci\xF3n de trabajo",
        mensaje: `${empleado.nombreCompleto} actualiz\xF3 un trabajo.`,
        detalle: `${trabajo.codigoTrabajo} - ${trabajo.clienteNombre} cambi\xF3 a ${this.obtenerEstadoTexto(nuevoEstado)}.`,
        tipo: "cambio_estado_trabajo",
        ruta: "/seguimiento-trabajos",
        referenciaUid: trabajo.uid,
        trabajoUid: trabajo.uid,
        codigoTrabajo: trabajo.codigoTrabajo,
        empleadoUid: empleado.uid,
        empleadoNombre: empleado.nombreCompleto,
        leida: false,
        eliminada: false,
        activa: true,
        createdAt: serverTimestamp()
      });
    });
  }
  normalizarEstado(valor) {
    const estado = String(valor || "").trim();
    if (estado === "enCamino") {
      return "en_camino";
    }
    if (estado === "enProceso") {
      return "en_proceso";
    }
    if (estado === "devolucionPendiente") {
      return "devolucion_pendiente";
    }
    if (estado === "devolucionRealizada") {
      return "devolucion_realizada";
    }
    const estadosValidos = [
      "pendiente",
      "en_camino",
      "en_proceso",
      "finalizado",
      "devolucion_pendiente",
      "devolucion_realizada",
      "cancelado"
    ];
    return estadosValidos.includes(estado) ? estado : "pendiente";
  }
  obtenerEstadoTexto(estado) {
    const mapa = {
      pendiente: "Pendiente",
      en_camino: "En camino",
      en_proceso: "En proceso",
      finalizado: "Finalizado",
      devolucion_pendiente: "Devoluci\xF3n pendiente",
      devolucion_realizada: "Devoluci\xF3n realizada",
      cancelado: "Cancelado"
    };
    return mapa[estado] || "Pendiente";
  }
  ordenEstado(estado) {
    const mapa = {
      en_proceso: 1,
      en_camino: 2,
      pendiente: 3,
      devolucion_pendiente: 4,
      finalizado: 5,
      devolucion_realizada: 6,
      cancelado: 7
    };
    return mapa[estado] || 99;
  }
  obtenerFechaOrden(trabajo) {
    const fecha = String(trabajo.fechaProgramada || "").trim();
    const hora = String(trabajo.horaProgramada || "00:00").trim();
    const timestamp = (/* @__PURE__ */ new Date(`${fecha}T${hora}`)).getTime();
    if (!Number.isNaN(timestamp)) {
      return timestamp;
    }
    return 0;
  }
  obtenerFechaHoraTexto(fecha, hora) {
    const fechaTexto = String(fecha || "").trim();
    const horaTexto = String(hora || "").trim();
    if (!fechaTexto && !horaTexto) {
      return "Sin fecha programada";
    }
    if (!fechaTexto) {
      return horaTexto;
    }
    if (!horaTexto) {
      return fechaTexto;
    }
    return `${fechaTexto} - ${horaTexto}`;
  }
  obtenerDireccionTexto(data) {
    const direccionMapa = String(data.direccionMapa || "").trim();
    const direccion = String(data.direccion || "").trim();
    const ubicacionOriginal = String(data.ubicacionTextoOriginal || "").trim();
    return direccionMapa || direccion || ubicacionOriginal || "Sin direcci\xF3n";
  }
  obtenerCodigoTrabajo(trabajo) {
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
  obtenerIniciales(nombre) {
    const partes = String(nombre || "Empleado").trim().split(/\s+/).filter(Boolean);
    return partes.slice(0, 2).map((parte) => parte.charAt(0).toUpperCase()).join("") || "EM";
  }
  formatearSoles(valor) {
    return `S/ ${Number(valor || 0).toFixed(2)}`;
  }
  crearEmpleadoVacio(uid = "") {
    return {
      uid,
      nombres: "",
      apellidos: "",
      nombreCompleto: "Empleado",
      usuario: "",
      correo: "",
      correoAuth: "",
      dni: "",
      telefono: "",
      cargo: "Personal operativo",
      rol: "empleado",
      habilitado: false,
      activo: false,
      estado: false,
      eliminado: false,
      fotoUrl: "",
      iniciales: "EM",
      cargoTexto: "Personal operativo",
      accesoValido: false
    };
  }
};
_DashboardEmpleadoDAO.\u0275fac = function DashboardEmpleadoDAO_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DashboardEmpleadoDAO)();
};
_DashboardEmpleadoDAO.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DashboardEmpleadoDAO, factory: _DashboardEmpleadoDAO.\u0275fac, providedIn: "root" });
var DashboardEmpleadoDAO = _DashboardEmpleadoDAO;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardEmpleadoDAO, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/procesos/dashboard-empleado.service.ts
var _DashboardEmpleadoService = class _DashboardEmpleadoService {
  constructor() {
    this.auth = inject(Auth);
    this.dao = inject(DashboardEmpleadoDAO);
  }
  obtenerDashboardEmpleado$() {
    return authState(this.auth).pipe(switchMap((usuarioAuth) => {
      if (!usuarioAuth?.uid) {
        return of(this.crearViewModelVacio());
      }
      return combineLatest([
        this.dao.obtenerEmpleadoActual$(usuarioAuth.uid),
        this.dao.escucharTrabajosAsignados$(usuarioAuth.uid)
      ]).pipe(map(([empleado, trabajos]) => this.construirViewModel(empleado, trabajos)));
    }), catchError((error) => {
      console.error("[DashboardEmpleadoService] Error cargando dashboard empleado:", error);
      return of(this.crearViewModelVacio());
    }), shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }
  marcarEnCamino(trabajo, empleado) {
    return __async(this, null, function* () {
      this.validarEmpleado(empleado);
      if (trabajo.estado !== "pendiente") {
        throw new Error("trabajo-no-pendiente");
      }
      yield this.dao.actualizarEstadoTrabajo(trabajo, "en_camino", empleado);
    });
  }
  iniciarTrabajo(trabajo, empleado) {
    return __async(this, null, function* () {
      this.validarEmpleado(empleado);
      if (trabajo.estado !== "en_camino") {
        throw new Error("trabajo-no-en-camino");
      }
      yield this.dao.actualizarEstadoTrabajo(trabajo, "en_proceso", empleado);
    });
  }
  finalizarTrabajo(trabajo, empleado) {
    return __async(this, null, function* () {
      this.validarEmpleado(empleado);
      if (trabajo.estado !== "en_proceso") {
        throw new Error("trabajo-no-en-proceso");
      }
      yield this.dao.actualizarEstadoTrabajo(trabajo, "finalizado", empleado);
    });
  }
  construirViewModel(empleado, trabajosBase) {
    const trabajos = (trabajosBase || []).filter((trabajo) => trabajo.eliminado !== true).filter((trabajo) => trabajo.estado !== "cancelado");
    const trabajosPendientes = trabajos.filter((trabajo) => trabajo.estado === "pendiente");
    const trabajosEnCamino = trabajos.filter((trabajo) => trabajo.estado === "en_camino");
    const trabajosEnProceso = trabajos.filter((trabajo) => trabajo.estado === "en_proceso");
    const trabajosFinalizados = trabajos.filter((trabajo) => [
      "finalizado",
      "devolucion_pendiente",
      "devolucion_realizada"
    ].includes(trabajo.estado));
    const trabajoActual = trabajos.find((trabajo) => trabajo.estado === "en_proceso") || trabajos.find((trabajo) => trabajo.estado === "en_camino") || trabajos.find((trabajo) => trabajo.estado === "pendiente") || null;
    return {
      empleado,
      trabajos,
      trabajosPendientes,
      trabajosEnCamino,
      trabajosEnProceso,
      trabajosFinalizados,
      trabajoActual,
      totalTrabajos: trabajos.length,
      totalPendientes: trabajosPendientes.length,
      totalEnCamino: trabajosEnCamino.length,
      totalEnProceso: trabajosEnProceso.length,
      totalFinalizados: trabajosFinalizados.length
    };
  }
  validarEmpleado(empleado) {
    if (!empleado?.uid) {
      throw new Error("empleado-sin-uid");
    }
    if (!empleado.accesoValido) {
      throw new Error("empleado-sin-acceso");
    }
  }
  crearViewModelVacio() {
    const empleado = {
      uid: "",
      nombres: "",
      apellidos: "",
      nombreCompleto: "Empleado",
      usuario: "",
      correo: "",
      correoAuth: "",
      dni: "",
      telefono: "",
      cargo: "Personal operativo",
      rol: "empleado",
      habilitado: false,
      activo: false,
      estado: false,
      eliminado: false,
      fotoUrl: "",
      iniciales: "EM",
      cargoTexto: "Personal operativo",
      accesoValido: false
    };
    return {
      empleado,
      trabajos: [],
      trabajosPendientes: [],
      trabajosEnCamino: [],
      trabajosEnProceso: [],
      trabajosFinalizados: [],
      trabajoActual: null,
      totalTrabajos: 0,
      totalPendientes: 0,
      totalEnCamino: 0,
      totalEnProceso: 0,
      totalFinalizados: 0
    };
  }
};
_DashboardEmpleadoService.\u0275fac = function DashboardEmpleadoService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DashboardEmpleadoService)();
};
_DashboardEmpleadoService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DashboardEmpleadoService, factory: _DashboardEmpleadoService.\u0275fac, providedIn: "root" });
var DashboardEmpleadoService = _DashboardEmpleadoService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardEmpleadoService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/procesos/gps-empleado.service.ts
var _GpsEmpleadoService = class _GpsEmpleadoService {
  constructor() {
    this.gpsService = inject(GpsService);
    this.watchId = null;
    this.ultimoEnvioMs = 0;
    this.ultimaLatitud = null;
    this.ultimaLongitud = null;
    this.intervaloMinimoMs = 1e4;
    this.distanciaMinimaMetros = 8;
    this.activoSubject = new BehaviorSubject(false);
    this.estadoTextoSubject = new BehaviorSubject("GPS inactivo");
    this.activo$ = this.activoSubject.asObservable();
    this.estadoTexto$ = this.estadoTextoSubject.asObservable();
  }
  activarSeguimiento(empleado, trabajo) {
    return __async(this, null, function* () {
      if (!empleado?.uid) {
        throw new Error("empleado-sin-uid");
      }
      if (!empleado.accesoValido) {
        throw new Error("empleado-sin-acceso");
      }
      if (typeof window !== "undefined" && window.isSecureContext === false) {
        this.estadoTextoSubject.next("GPS bloqueado: abre la app con HTTPS");
        throw new Error("gps-contexto-no-seguro");
      }
      if (!("geolocation" in navigator)) {
        throw new Error("gps-no-soportado");
      }
      const permiso = yield this.obtenerEstadoPermisoGps();
      if (permiso === "denied") {
        this.estadoTextoSubject.next("GPS inactivo: permiso bloqueado en el navegador");
        throw new Error("gps-permiso-denegado");
      }
      if (this.watchId !== null) {
        this.estadoTextoSubject.next("GPS ya est\xE1 activo");
        return;
      }
      try {
        this.estadoTextoSubject.next("Solicitando permiso de ubicaci\xF3n...");
        const posicionInicial = yield this.obtenerPosicionActual();
        this.activoSubject.next(true);
        this.estadoTextoSubject.next("Enviando primera ubicaci\xF3n...");
        yield this.procesarPosicion(posicionInicial, empleado, trabajo);
        this.watchId = navigator.geolocation.watchPosition((posicion) => {
          void this.procesarPosicion(posicion, empleado, trabajo);
        }, (error) => {
          console.error("[GpsEmpleadoService] Error GPS watch:", error);
          const mensaje = this.obtenerMensajeErrorGps(error);
          this.desactivarSeguimiento(mensaje);
        }, {
          enableHighAccuracy: true,
          timeout: 15e3,
          maximumAge: 5e3
        });
        this.estadoTextoSubject.next("GPS activo y enviando ubicaci\xF3n");
      } catch (error) {
        console.error("[GpsEmpleadoService] Error activando GPS:", error);
        this.desactivarSeguimiento(this.obtenerMensajeErrorGeneral(error));
        throw error;
      }
    });
  }
  desactivarSeguimiento(mensaje = "GPS inactivo") {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
    this.activoSubject.next(false);
    this.estadoTextoSubject.next(mensaje);
  }
  obtenerUrlRutaGoogleMaps(trabajo) {
    if (!trabajo) {
      return "https://www.google.com/maps";
    }
    const destinoLatitud = Number(trabajo.latitud || 0);
    const destinoLongitud = Number(trabajo.longitud || 0);
    if (this.ultimaLatitud && this.ultimaLongitud && destinoLatitud && destinoLongitud) {
      return `https://www.google.com/maps/dir/?api=1&origin=${this.ultimaLatitud},${this.ultimaLongitud}&destination=${destinoLatitud},${destinoLongitud}&travelmode=driving`;
    }
    if (destinoLatitud && destinoLongitud) {
      return `https://www.google.com/maps/search/?api=1&query=${destinoLatitud},${destinoLongitud}`;
    }
    const direccion = String(trabajo.direccionMapa || trabajo.direccion || trabajo.ubicacionTextoOriginal || "").trim();
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
  }
  obtenerEstadoPermisoGps() {
    return __async(this, null, function* () {
      try {
        const permisos = navigator.permissions;
        if (!permisos?.query) {
          return "unknown";
        }
        const resultado = yield permisos.query({
          name: "geolocation"
        });
        const estado = String(resultado?.state || "unknown");
        if (estado === "granted" || estado === "denied" || estado === "prompt") {
          return estado;
        }
        return "unknown";
      } catch {
        return "unknown";
      }
    });
  }
  obtenerPosicionActual() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((posicion) => {
        resolve(posicion);
      }, (error) => {
        reject(this.convertirErrorGps(error));
      }, {
        enableHighAccuracy: true,
        timeout: 15e3,
        maximumAge: 3e3
      });
    });
  }
  procesarPosicion(posicion, empleado, trabajo) {
    return __async(this, null, function* () {
      const latitud = Number(posicion.coords.latitude);
      const longitud = Number(posicion.coords.longitude);
      const precision = posicion.coords.accuracy ?? null;
      if (!this.esCoordenadaValida(latitud, longitud)) {
        throw new Error("gps-coordenada-invalida");
      }
      if (!this.debeEnviar(latitud, longitud)) {
        return;
      }
      const destinoLatitud = Number(trabajo?.latitud || 0);
      const destinoLongitud = Number(trabajo?.longitud || 0);
      const tieneDestino = this.esCoordenadaValida(destinoLatitud, destinoLongitud) && destinoLatitud !== 0 && destinoLongitud !== 0;
      const distanciaRestanteKm = tieneDestino ? this.calcularDistanciaKm(latitud, longitud, destinoLatitud, destinoLongitud) : null;
      const velocidadKmh = this.obtenerVelocidadKmh(posicion);
      const tiempoEstimadoMin = distanciaRestanteKm ? this.calcularTiempoEstimadoMin(distanciaRestanteKm, velocidadKmh) : null;
      const ruta = tieneDestino ? yield this.obtenerRuta(latitud, longitud, destinoLatitud, destinoLongitud) : [
        {
          latitud,
          longitud
        }
      ];
      const payload = {
        empleadoUid: empleado.uid,
        empleadoNombre: empleado.nombreCompleto,
        empleadoRol: empleado.cargoTexto || empleado.cargo || "Personal operativo",
        empleadoFotoUrl: empleado.fotoUrl || "",
        trabajoUid: trabajo?.uid || "",
        trabajoCodigo: trabajo?.codigoTrabajo || "",
        trabajoTitulo: trabajo?.tipoTrabajo || trabajo?.clienteNombre || "",
        latitud,
        longitud,
        precision,
        velocidadKmh,
        distanciaRestanteKm,
        tiempoEstimadoMin,
        direccionTexto: trabajo?.direccionTexto || trabajo?.direccion || "",
        estado: trabajo?.estado === "en_camino" ? "en_camino" : "activo",
        ruta
      };
      yield this.gpsService.enviarUbicacionEmpleado(payload);
      this.ultimoEnvioMs = Date.now();
      this.ultimaLatitud = latitud;
      this.ultimaLongitud = longitud;
      this.activoSubject.next(true);
      this.estadoTextoSubject.next(`GPS activo \xB7 enviado ${(/* @__PURE__ */ new Date()).toLocaleTimeString("es-PE", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })}`);
    });
  }
  debeEnviar(latitud, longitud) {
    const ahora = Date.now();
    if (!this.ultimaLatitud || !this.ultimaLongitud || !this.ultimoEnvioMs) {
      return true;
    }
    const pasaronMs = ahora - this.ultimoEnvioMs;
    const distanciaMetros = this.calcularDistanciaKm(this.ultimaLatitud, this.ultimaLongitud, latitud, longitud) * 1e3;
    return pasaronMs >= this.intervaloMinimoMs || distanciaMetros >= this.distanciaMinimaMetros;
  }
  obtenerRuta(origenLatitud, origenLongitud, destinoLatitud, destinoLongitud) {
    return __async(this, null, function* () {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${origenLongitud},${origenLatitud};${destinoLongitud},${destinoLatitud}?overview=full&geometries=geojson`;
        const respuesta = yield fetch(url);
        if (!respuesta.ok) {
          throw new Error("osrm-error");
        }
        const data = yield respuesta.json();
        const coordenadas = data?.routes?.[0]?.geometry?.coordinates;
        if (!Array.isArray(coordenadas) || coordenadas.length < 2) {
          throw new Error("osrm-ruta-vacia");
        }
        return coordenadas.map((coordenada) => ({
          latitud: Number(coordenada[1]),
          longitud: Number(coordenada[0])
        }));
      } catch (error) {
        console.warn("[GpsEmpleadoService] Ruta OSRM no disponible. Usando l\xEDnea directa:", error);
        return [
          {
            latitud: origenLatitud,
            longitud: origenLongitud
          },
          {
            latitud: destinoLatitud,
            longitud: destinoLongitud
          }
        ];
      }
    });
  }
  convertirErrorGps(error) {
    if (error.code === error.PERMISSION_DENIED) {
      return new Error("gps-permiso-denegado");
    }
    if (error.code === error.POSITION_UNAVAILABLE) {
      return new Error("gps-no-disponible");
    }
    if (error.code === error.TIMEOUT) {
      return new Error("gps-tiempo-agotado");
    }
    return new Error("gps-error-desconocido");
  }
  obtenerMensajeErrorGps(error) {
    if (error.code === error.PERMISSION_DENIED) {
      return "GPS inactivo: permiso denegado";
    }
    if (error.code === error.POSITION_UNAVAILABLE) {
      return "GPS inactivo: ubicaci\xF3n no disponible";
    }
    if (error.code === error.TIMEOUT) {
      return "GPS inactivo: tiempo agotado";
    }
    return "GPS inactivo: error del dispositivo";
  }
  obtenerMensajeErrorGeneral(error) {
    const code = String(error?.message || error?.code || error || "");
    if (code.includes("gps-contexto-no-seguro")) {
      return "GPS bloqueado: abre la app con HTTPS";
    }
    if (code.includes("gps-permiso-denegado")) {
      return "GPS inactivo: permiso denegado";
    }
    if (code.includes("gps-no-disponible")) {
      return "GPS inactivo: ubicaci\xF3n no disponible";
    }
    if (code.includes("gps-tiempo-agotado")) {
      return "GPS inactivo: tiempo agotado";
    }
    if (code.includes("permission-denied")) {
      return "GPS inactivo: Firestore rechaz\xF3 el guardado";
    }
    return "GPS inactivo";
  }
  obtenerVelocidadKmh(posicion) {
    const velocidadMs = posicion.coords.speed;
    if (velocidadMs === null || velocidadMs === void 0) {
      return null;
    }
    const velocidad = Number(velocidadMs) * 3.6;
    if (!Number.isFinite(velocidad) || velocidad < 0) {
      return null;
    }
    return Number(velocidad.toFixed(1));
  }
  calcularTiempoEstimadoMin(distanciaKm, velocidadKmh) {
    if (!distanciaKm || distanciaKm <= 0) {
      return null;
    }
    const velocidadBase = velocidadKmh && velocidadKmh > 5 ? velocidadKmh : 25;
    return Math.max(1, Math.round(distanciaKm / velocidadBase * 60));
  }
  calcularDistanciaKm(lat1, lon1, lat2, lon2) {
    if (!this.esCoordenadaValida(lat1, lon1) || !this.esCoordenadaValida(lat2, lon2)) {
      return 0;
    }
    const radioTierraKm = 6371;
    const dLat = this.gradosARadianes(lat2 - lat1);
    const dLon = this.gradosARadianes(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.gradosARadianes(lat1)) * Math.cos(this.gradosARadianes(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Number((radioTierraKm * c).toFixed(2));
  }
  gradosARadianes(valor) {
    return valor * Math.PI / 180;
  }
  esCoordenadaValida(latitud, longitud) {
    return typeof latitud === "number" && typeof longitud === "number" && Number.isFinite(latitud) && Number.isFinite(longitud) && latitud >= -90 && latitud <= 90 && longitud >= -180 && longitud <= 180;
  }
};
_GpsEmpleadoService.\u0275fac = function GpsEmpleadoService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _GpsEmpleadoService)();
};
_GpsEmpleadoService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GpsEmpleadoService, factory: _GpsEmpleadoService.\u0275fac, providedIn: "root" });
var GpsEmpleadoService = _GpsEmpleadoService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GpsEmpleadoService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/paginas/empleado/dashboard-empleado/dashboard-empleado.page.ts
function DashboardEmpleadoPage_ng_container_3_img_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 38);
  }
  if (rf & 2) {
    const vm_r3 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275property("src", vm_r3.empleado.fotoUrl, \u0275\u0275sanitizeUrl);
  }
}
function DashboardEmpleadoPage_ng_container_3_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r3 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(vm_r3.empleado.iniciales);
  }
}
function DashboardEmpleadoPage_ng_container_3_section_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 39);
    \u0275\u0275element(1, "ion-icon", 40);
    \u0275\u0275elementStart(2, "div")(3, "h3");
    \u0275\u0275text(4, "Acceso operativo no habilitado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Tu usuario existe, pero no est\xE1 habilitado para operar. Comun\xEDcate con el administrador.");
    \u0275\u0275elementEnd()()();
  }
}
function DashboardEmpleadoPage_ng_container_3_ng_container_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "button", 41);
    \u0275\u0275listener("click", function DashboardEmpleadoPage_ng_container_3_ng_container_31_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.desactivarGps());
    });
    \u0275\u0275element(2, "ion-icon", 42);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Desactivar GPS");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
}
function DashboardEmpleadoPage_ng_container_3_ng_template_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 43);
    \u0275\u0275listener("click", function DashboardEmpleadoPage_ng_container_3_ng_template_33_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const vm_r3 = \u0275\u0275nextContext().ngIf;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.activarGps(vm_r3.empleado, vm_r3.trabajoActual));
    });
    \u0275\u0275element(1, "ion-icon", 44);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Activar GPS");
    \u0275\u0275elementEnd()();
  }
}
function DashboardEmpleadoPage_ng_container_3_h2_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r3 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", vm_r3.trabajoActual.codigoTrabajo, " ");
  }
}
function DashboardEmpleadoPage_ng_container_3_ng_template_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2");
    \u0275\u0275text(1, "Sin trabajo activo");
    \u0275\u0275elementEnd();
  }
}
function DashboardEmpleadoPage_ng_container_3_p_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r3 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", vm_r3.trabajoActual.clienteNombre, " \xB7 ", vm_r3.trabajoActual.estadoTexto, " ");
  }
}
function DashboardEmpleadoPage_ng_container_3_p_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, " Cuando tengas un trabajo asignado aparecer\xE1 aqu\xED. ");
    \u0275\u0275elementEnd();
  }
}
function DashboardEmpleadoPage_ng_container_3_div_63_article_1_p_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275element(1, "ion-icon", 64);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const trabajo_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(trabajo_r8.referencia);
  }
}
function DashboardEmpleadoPage_ng_container_3_div_63_article_1_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65);
    \u0275\u0275element(1, "ion-icon", 66);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const trabajo_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(trabajo_r8.descripcion);
  }
}
function DashboardEmpleadoPage_ng_container_3_div_63_article_1_button_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 67);
    \u0275\u0275listener("click", function DashboardEmpleadoPage_ng_container_3_div_63_article_1_button_39_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const trabajo_r8 = \u0275\u0275nextContext().$implicit;
      const vm_r3 = \u0275\u0275nextContext(2).ngIf;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.marcarEnCamino(trabajo_r8, vm_r3.empleado));
    });
    \u0275\u0275element(1, "ion-icon", 68);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "En camino");
    \u0275\u0275elementEnd()();
  }
}
function DashboardEmpleadoPage_ng_container_3_div_63_article_1_button_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 67);
    \u0275\u0275listener("click", function DashboardEmpleadoPage_ng_container_3_div_63_article_1_button_40_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const trabajo_r8 = \u0275\u0275nextContext().$implicit;
      const vm_r3 = \u0275\u0275nextContext(2).ngIf;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.iniciarTrabajo(trabajo_r8, vm_r3.empleado));
    });
    \u0275\u0275element(1, "ion-icon", 69);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Iniciar");
    \u0275\u0275elementEnd()();
  }
}
function DashboardEmpleadoPage_ng_container_3_div_63_article_1_button_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 70);
    \u0275\u0275listener("click", function DashboardEmpleadoPage_ng_container_3_div_63_article_1_button_41_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const trabajo_r8 = \u0275\u0275nextContext().$implicit;
      const vm_r3 = \u0275\u0275nextContext(2).ngIf;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.finalizarTrabajo(trabajo_r8, vm_r3.empleado));
    });
    \u0275\u0275element(1, "ion-icon", 71);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Finalizar");
    \u0275\u0275elementEnd()();
  }
}
function DashboardEmpleadoPage_ng_container_3_div_63_article_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 47)(1, "header", 48)(2, "div", 49)(3, "span", 50);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 51);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 52)(12, "p");
    \u0275\u0275element(13, "ion-icon", 53);
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "p");
    \u0275\u0275element(17, "ion-icon", 54);
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(20, DashboardEmpleadoPage_ng_container_3_div_63_article_1_p_20_Template, 4, 1, "p", 33);
    \u0275\u0275elementStart(21, "p");
    \u0275\u0275element(22, "ion-icon", 55);
    \u0275\u0275elementStart(23, "span");
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(25, DashboardEmpleadoPage_ng_container_3_div_63_article_1_div_25_Template, 4, 1, "div", 56);
    \u0275\u0275elementStart(26, "div", 57);
    \u0275\u0275element(27, "ion-icon", 58);
    \u0275\u0275elementStart(28, "span");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 59)(31, "button", 60);
    \u0275\u0275listener("click", function DashboardEmpleadoPage_ng_container_3_div_63_article_1_Template_button_click_31_listener() {
      const trabajo_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.llamarCliente(trabajo_r8));
    });
    \u0275\u0275element(32, "ion-icon", 61);
    \u0275\u0275elementStart(33, "span");
    \u0275\u0275text(34, "Llamar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "button", 60);
    \u0275\u0275listener("click", function DashboardEmpleadoPage_ng_container_3_div_63_article_1_Template_button_click_35_listener() {
      const trabajo_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.abrirMapa(trabajo_r8));
    });
    \u0275\u0275element(36, "ion-icon", 23);
    \u0275\u0275elementStart(37, "span");
    \u0275\u0275text(38, "Mapa");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(39, DashboardEmpleadoPage_ng_container_3_div_63_article_1_button_39_Template, 4, 0, "button", 62)(40, DashboardEmpleadoPage_ng_container_3_div_63_article_1_button_40_Template, 4, 0, "button", 62)(41, DashboardEmpleadoPage_ng_container_3_div_63_article_1_button_41_Template, 4, 0, "button", 63);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const trabajo_r8 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(trabajo_r8.codigoTrabajo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(trabajo_r8.clienteNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(trabajo_r8.tipoTrabajo);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", trabajo_r8.estadoClase);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", trabajo_r8.estadoTexto, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(trabajo_r8.fechaHoraTexto);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(trabajo_r8.direccionTexto);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", trabajo_r8.referencia);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(trabajo_r8.subtotalTexto);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", trabajo_r8.descripcion);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(trabajo_r8.materialesTexto);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngIf", ctx_r3.puedeMarcarEnCamino(trabajo_r8));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.puedeIniciar(trabajo_r8));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.puedeFinalizar(trabajo_r8));
  }
}
function DashboardEmpleadoPage_ng_container_3_div_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275template(1, DashboardEmpleadoPage_ng_container_3_div_63_article_1_Template, 42, 14, "article", 46);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r3 = \u0275\u0275nextContext().ngIf;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", vm_r3.trabajos)("ngForTrackBy", ctx_r3.trackByTrabajo);
  }
}
function DashboardEmpleadoPage_ng_container_3_ng_template_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-admin-empty-state", 72);
  }
}
function DashboardEmpleadoPage_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "main", 8)(2, "section", 9)(3, "div", 10);
    \u0275\u0275template(4, DashboardEmpleadoPage_ng_container_3_img_4_Template, 1, 1, "img", 11)(5, DashboardEmpleadoPage_ng_container_3_ng_template_5_Template, 2, 1, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 12)(8, "span");
    \u0275\u0275text(9, "Bienvenido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "h1");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 13);
    \u0275\u0275listener("click", function DashboardEmpleadoPage_ng_container_3_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.cerrarSesion());
    });
    \u0275\u0275element(15, "ion-icon", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(16, "app-admin-module-hero", 15);
    \u0275\u0275template(17, DashboardEmpleadoPage_ng_container_3_section_17_Template, 7, 0, "section", 16);
    \u0275\u0275elementStart(18, "section", 17)(19, "div", 18)(20, "div", 19);
    \u0275\u0275element(21, "ion-icon", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div")(23, "span");
    \u0275\u0275text(24, "Ubicaci\xF3n en tiempo real");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "h2");
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "async");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "p");
    \u0275\u0275text(29, " El administrador ver\xE1 tu ubicaci\xF3n y la ruta hacia el trabajo cuando el GPS est\xE9 activo. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div", 21);
    \u0275\u0275template(31, DashboardEmpleadoPage_ng_container_3_ng_container_31_Template, 5, 0, "ng-container", 7);
    \u0275\u0275pipe(32, "async");
    \u0275\u0275template(33, DashboardEmpleadoPage_ng_container_3_ng_template_33_Template, 4, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(35, "button", 22);
    \u0275\u0275listener("click", function DashboardEmpleadoPage_ng_container_3_Template_button_click_35_listener() {
      const vm_r3 = \u0275\u0275restoreView(_r2).ngIf;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.abrirRutaTrabajo(vm_r3.trabajoActual));
    });
    \u0275\u0275element(36, "ion-icon", 23);
    \u0275\u0275elementStart(37, "span");
    \u0275\u0275text(38, "Ruta");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(39, "section", 24);
    \u0275\u0275element(40, "app-admin-summary-card", 25)(41, "app-admin-summary-card", 26)(42, "app-admin-summary-card", 27)(43, "app-admin-summary-card", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "section", 29)(45, "div", 30);
    \u0275\u0275element(46, "ion-icon", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 32)(48, "span");
    \u0275\u0275text(49, "Trabajo actual");
    \u0275\u0275elementEnd();
    \u0275\u0275template(50, DashboardEmpleadoPage_ng_container_3_h2_50_Template, 2, 1, "h2", 7)(51, DashboardEmpleadoPage_ng_container_3_ng_template_51_Template, 2, 0, "ng-template", null, 3, \u0275\u0275templateRefExtractor)(53, DashboardEmpleadoPage_ng_container_3_p_53_Template, 2, 2, "p", 33)(54, DashboardEmpleadoPage_ng_container_3_p_54_Template, 2, 0, "p", 33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "section", 34)(56, "div")(57, "h3");
    \u0275\u0275text(58, "Mis trabajos asignados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "p");
    \u0275\u0275text(60);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(61, "ion-icon", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "section", 36);
    \u0275\u0275template(63, DashboardEmpleadoPage_ng_container_3_div_63_Template, 2, 2, "div", 37)(64, DashboardEmpleadoPage_ng_container_3_ng_template_64_Template, 1, 0, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const vm_r3 = ctx.ngIf;
    const inicialesEmpleado_r12 = \u0275\u0275reference(6);
    const gpsApagado_r13 = \u0275\u0275reference(34);
    const sinTrabajoActual_r14 = \u0275\u0275reference(52);
    const sinTrabajos_r15 = \u0275\u0275reference(65);
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", vm_r3.empleado.fotoUrl)("ngIfElse", inicialesEmpleado_r12);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(vm_r3.empleado.nombreCompleto);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(vm_r3.empleado.cargoTexto);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !vm_r3.empleado.accesoValido);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(27, 19, ctx_r3.gpsEstadoTexto$));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(32, 21, ctx_r3.gpsActivo$))("ngIfElse", gpsApagado_r13);
    \u0275\u0275advance(9);
    \u0275\u0275property("valor", vm_r3.totalTrabajos);
    \u0275\u0275advance();
    \u0275\u0275property("valor", vm_r3.totalPendientes);
    \u0275\u0275advance();
    \u0275\u0275property("valor", vm_r3.totalEnCamino);
    \u0275\u0275advance();
    \u0275\u0275property("valor", vm_r3.totalEnProceso);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", vm_r3.trabajoActual)("ngIfElse", sinTrabajoActual_r14);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", vm_r3.trabajoActual);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !vm_r3.trabajoActual);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", vm_r3.trabajos.length, " trabajo(s) encontrado(s)");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", vm_r3.trabajos.length > 0)("ngIfElse", sinTrabajos_r15);
  }
}
function DashboardEmpleadoPage_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "main", 8);
    \u0275\u0275element(1, "app-admin-empty-state", 73);
    \u0275\u0275elementEnd();
  }
}
var _DashboardEmpleadoPage = class _DashboardEmpleadoPage {
  constructor() {
    this.navCtrl = inject(NavController);
    this.toastCtrl = inject(ToastController);
    this.alertCtrl = inject(AlertController);
    this.auth = inject(Auth);
    this.dashboardEmpleadoService = inject(DashboardEmpleadoService);
    this.gpsEmpleadoService = inject(GpsEmpleadoService);
    this.vm$ = this.dashboardEmpleadoService.obtenerDashboardEmpleado$();
    this.gpsActivo$ = this.gpsEmpleadoService.activo$;
    this.gpsEstadoTexto$ = this.gpsEmpleadoService.estadoTexto$;
    addIcons({
      "alert-circle-outline": alertCircleOutline,
      "briefcase-outline": briefcaseOutline,
      "calendar-outline": calendarOutline,
      "call-outline": callOutline,
      "cash-outline": cashOutline,
      "checkmark-circle-outline": checkmarkCircleOutline,
      "checkmark-done-outline": checkmarkDoneOutline,
      "clipboard-outline": clipboardOutline,
      "construct-outline": constructOutline,
      "cube-outline": cubeOutline,
      "document-text-outline": documentTextOutline,
      "locate-outline": locateOutline,
      "location-outline": locationOutline,
      "log-out-outline": logOutOutline,
      "map-outline": mapOutline,
      "navigate-outline": navigateOutline,
      "pin-outline": pinOutline,
      "play-circle-outline": playCircleOutline,
      "radio-outline": radioOutline,
      "refresh-outline": refreshOutline,
      "stop-circle-outline": stopCircleOutline,
      "time-outline": timeOutline
    });
  }
  puedeMarcarEnCamino(trabajo) {
    return trabajo.puedeMarcarEnCamino === true;
  }
  puedeIniciar(trabajo) {
    return trabajo.puedeIniciar === true;
  }
  puedeFinalizar(trabajo) {
    return trabajo.puedeFinalizar === true;
  }
  activarGps(empleado, trabajo) {
    return __async(this, null, function* () {
      try {
        const confirmado = yield this.confirmarActivacionGps();
        if (!confirmado) {
          return;
        }
        yield this.gpsEmpleadoService.activarSeguimiento(empleado, trabajo);
        yield this.mostrarToast("GPS activado. El administrador ya puede ver tu ubicaci\xF3n.", "success");
      } catch (error) {
        console.error("[DashboardEmpleadoPage] Error activando GPS:", error);
        yield this.mostrarToast(this.obtenerMensajeErrorGps(error), "danger");
      }
    });
  }
  desactivarGps() {
    return __async(this, null, function* () {
      this.gpsEmpleadoService.desactivarSeguimiento();
      yield this.mostrarToast("GPS desactivado.", "primary");
    });
  }
  abrirRutaTrabajo(trabajo) {
    if (!trabajo) {
      this.mostrarToast("No tienes un trabajo seleccionado.", "primary");
      return;
    }
    const url = this.gpsEmpleadoService.obtenerUrlRutaGoogleMaps(trabajo);
    window.open(url, "_blank");
  }
  marcarEnCamino(trabajo, empleado) {
    return __async(this, null, function* () {
      try {
        yield this.dashboardEmpleadoService.marcarEnCamino(trabajo, empleado);
        yield this.mostrarToast("Trabajo marcado como en camino.", "success");
      } catch (error) {
        console.error("[DashboardEmpleadoPage] Error marcando en camino:", error);
        yield this.mostrarToast(this.obtenerMensajeError(error), "danger");
      }
    });
  }
  iniciarTrabajo(trabajo, empleado) {
    return __async(this, null, function* () {
      try {
        yield this.dashboardEmpleadoService.iniciarTrabajo(trabajo, empleado);
        yield this.mostrarToast("Trabajo iniciado correctamente.", "success");
      } catch (error) {
        console.error("[DashboardEmpleadoPage] Error iniciando trabajo:", error);
        yield this.mostrarToast(this.obtenerMensajeError(error), "danger");
      }
    });
  }
  finalizarTrabajo(trabajo, empleado) {
    return __async(this, null, function* () {
      try {
        yield this.dashboardEmpleadoService.finalizarTrabajo(trabajo, empleado);
        yield this.mostrarToast("Trabajo finalizado correctamente.", "success");
      } catch (error) {
        console.error("[DashboardEmpleadoPage] Error finalizando trabajo:", error);
        yield this.mostrarToast(this.obtenerMensajeError(error), "danger");
      }
    });
  }
  llamarCliente(trabajo) {
    const telefono = String(trabajo.clienteTelefono || "").trim();
    if (!telefono) {
      this.mostrarToast("Este trabajo no tiene tel\xE9fono registrado.", "primary");
      return;
    }
    window.open(`tel:${telefono}`, "_self");
  }
  abrirMapa(trabajo) {
    const latitud = Number(trabajo.latitud || 0);
    const longitud = Number(trabajo.longitud || 0);
    if (latitud && longitud) {
      const url2 = `https://www.google.com/maps/search/?api=1&query=${latitud},${longitud}`;
      window.open(url2, "_blank");
      return;
    }
    const direccion = String(trabajo.direccionMapa || trabajo.direccion || trabajo.ubicacionTextoOriginal || "").trim();
    if (!direccion) {
      this.mostrarToast("Este trabajo no tiene ubicaci\xF3n registrada.", "primary");
      return;
    }
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
    window.open(url, "_blank");
  }
  refrescar(event) {
    return __async(this, null, function* () {
      setTimeout(() => {
        event?.target?.complete?.();
      }, 500);
    });
  }
  cerrarSesion() {
    return __async(this, null, function* () {
      try {
        this.gpsEmpleadoService.desactivarSeguimiento();
        yield signOut(this.auth);
        yield this.navCtrl.navigateRoot("/seleccion-usuario", {
          animated: false,
          replaceUrl: true
        });
      } catch (error) {
        console.error("[DashboardEmpleadoPage] Error al cerrar sesi\xF3n:", error);
        yield this.mostrarToast("No se pudo cerrar sesi\xF3n.", "danger");
      }
    });
  }
  trackByTrabajo(index, trabajo) {
    return trabajo.uid || trabajo.id || String(index);
  }
  confirmarActivacionGps() {
    return __async(this, null, function* () {
      const alert = yield this.alertCtrl.create({
        header: "Activar ubicaci\xF3n",
        message: "Para que el administrador vea tu ubicaci\xF3n y la ruta hacia el trabajo, debes permitir el acceso al GPS del celular.",
        buttons: [
          {
            text: "Cancelar",
            role: "cancel"
          },
          {
            text: "Continuar",
            role: "confirm"
          }
        ]
      });
      yield alert.present();
      const { role } = yield alert.onWillDismiss();
      return role === "confirm";
    });
  }
  obtenerMensajeErrorGps(error) {
    const code = String(error?.code || error?.message || error || "");
    if (code.includes("gps-contexto-no-seguro")) {
      return "Abre la app con HTTPS. En http://192.168.x.x Chrome bloquea el GPS.";
    }
    if (code.includes("empleado-sin-acceso")) {
      return "Tu usuario no tiene acceso operativo habilitado.";
    }
    if (code.includes("gps-permiso-denegado")) {
      return "El navegador tiene bloqueada la ubicaci\xF3n. Restablece el permiso de ubicaci\xF3n para esta p\xE1gina.";
    }
    if (code.includes("gps-no-disponible")) {
      return "El celular no pudo entregar ubicaci\xF3n. Activa ubicaci\xF3n y precisi\xF3n alta.";
    }
    if (code.includes("gps-tiempo-agotado")) {
      return "El GPS tard\xF3 demasiado. Intenta nuevamente al aire libre.";
    }
    if (code.includes("gps-no-soportado")) {
      return "Este dispositivo no soporta GPS desde el navegador.";
    }
    if (code.includes("permission-denied")) {
      return "Firestore no permiti\xF3 guardar la ubicaci\xF3n.";
    }
    return "No se pudo activar el GPS.";
  }
  obtenerMensajeError(error) {
    const code = String(error?.code || error?.message || error || "");
    if (code.includes("empleado-sin-acceso")) {
      return "Tu usuario no tiene acceso operativo habilitado.";
    }
    if (code.includes("empleado-sin-uid")) {
      return "No se encontr\xF3 el UID del empleado.";
    }
    if (code.includes("trabajo-no-pendiente")) {
      return "Solo puedes marcar en camino un trabajo pendiente.";
    }
    if (code.includes("trabajo-no-en-camino")) {
      return "Primero marca el trabajo como en camino.";
    }
    if (code.includes("trabajo-no-en-proceso")) {
      return "Solo puedes finalizar un trabajo en proceso.";
    }
    if (code.includes("permission-denied")) {
      return "No tienes permisos para actualizar este trabajo.";
    }
    return "No se pudo completar la operaci\xF3n.";
  }
  mostrarToast(message, color = "primary") {
    return __async(this, null, function* () {
      const toast = yield this.toastCtrl.create({
        message,
        duration: 2600,
        position: "top",
        color
      });
      yield toast.present();
    });
  }
};
_DashboardEmpleadoPage.\u0275fac = function DashboardEmpleadoPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DashboardEmpleadoPage)();
};
_DashboardEmpleadoPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardEmpleadoPage, selectors: [["app-dashboard-empleado"]], decls: 7, vars: 5, consts: [["cargandoPanel", ""], ["inicialesEmpleado", ""], ["gpsApagado", ""], ["sinTrabajoActual", ""], ["sinTrabajos", ""], [1, "empleado-root", 3, "fullscreen"], ["slot", "fixed", 3, "ionRefresh"], [4, "ngIf", "ngIfElse"], [1, "empleado-container"], [1, "empleado-topbar"], [1, "empleado-avatar"], ["alt", "Foto empleado", 3, "src", 4, "ngIf", "ngIfElse"], [1, "empleado-topbar-info"], ["type", "button", 1, "logout-button", 3, "click"], ["name", "log-out-outline"], ["titulo", "Panel operativo", "descripcion", "Controla tus trabajos asignados, ruta y ubicaci\xF3n GPS en tiempo real.", "icono", "briefcase-outline"], ["class", "alerta-acceso", 4, "ngIf"], [1, "gps-card"], [1, "gps-main"], [1, "gps-icon"], ["name", "radio-outline"], [1, "gps-actions"], ["type", "button", 1, "gps-button", "secondary", 3, "click"], ["name", "map-outline"], [1, "summary-grid"], ["titulo", "Total", "icono", "clipboard-outline", "tipo", "total", 3, "valor"], ["titulo", "Pendientes", "icono", "time-outline", "tipo", "warning", 3, "valor"], ["titulo", "En camino", "icono", "navigate-outline", "tipo", "primary", 3, "valor"], ["titulo", "En proceso", "icono", "construct-outline", "tipo", "success", 3, "valor"], [1, "trabajo-actual-card"], [1, "trabajo-actual-icon"], ["name", "briefcase-outline"], [1, "trabajo-actual-info"], [4, "ngIf"], [1, "list-title-row"], ["name", "refresh-outline"], [1, "list-section"], ["class", "trabajos-list", 4, "ngIf", "ngIfElse"], ["alt", "Foto empleado", 3, "src"], [1, "alerta-acceso"], ["name", "alert-circle-outline"], ["type", "button", 1, "gps-button", "danger", 3, "click"], ["name", "stop-circle-outline"], ["type", "button", 1, "gps-button", "success", 3, "click"], ["name", "locate-outline"], [1, "trabajos-list"], ["class", "trabajo-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "trabajo-card"], [1, "trabajo-card-header"], [1, "trabajo-title"], [1, "codigo-chip"], [1, "estado-badge", 3, "ngClass"], [1, "trabajo-info-grid"], ["name", "calendar-outline"], ["name", "pin-outline"], ["name", "cash-outline"], ["class", "trabajo-descripcion", 4, "ngIf"], [1, "materiales-box"], ["name", "cube-outline"], [1, "trabajo-actions"], ["type", "button", 1, "btn-action", "secundario", 3, "click"], ["name", "call-outline"], ["type", "button", "class", "btn-action principal", 3, "click", 4, "ngIf"], ["type", "button", "class", "btn-action finalizar", 3, "click", 4, "ngIf"], ["name", "location-outline"], [1, "trabajo-descripcion"], ["name", "document-text-outline"], ["type", "button", 1, "btn-action", "principal", 3, "click"], ["name", "navigate-outline"], ["name", "play-circle-outline"], ["type", "button", 1, "btn-action", "finalizar", 3, "click"], ["name", "checkmark-done-outline"], ["icono", "briefcase-outline", "titulo", "No tienes trabajos asignados", "descripcion", "Cuando el administrador te asigne un trabajo, aparecer\xE1 aqu\xED."], ["icono", "time-outline", "titulo", "Cargando panel empleado", "descripcion", "Espere un momento."]], template: function DashboardEmpleadoPage_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-content", 5)(1, "ion-refresher", 6);
    \u0275\u0275listener("ionRefresh", function DashboardEmpleadoPage_Template_ion_refresher_ionRefresh_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.refrescar($event));
    });
    \u0275\u0275element(2, "ion-refresher-content");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, DashboardEmpleadoPage_ng_container_3_Template, 66, 23, "ng-container", 7);
    \u0275\u0275pipe(4, "async");
    \u0275\u0275template(5, DashboardEmpleadoPage_ng_template_5_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cargandoPanel_r16 = \u0275\u0275reference(6);
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(4, 3, ctx.vm$))("ngIfElse", cargandoPanel_r16);
  }
}, dependencies: [
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  IonicModule,
  IonContent,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  AdminModuleHeroComponent,
  AdminSummaryCardComponent,
  AdminEmptyStateComponent,
  AsyncPipe
], styles: ["\n\n[_nghost-%COMP%] {\n  --color-primary: #087b2d;\n  --color-primary-soft: #eaf8ef;\n  --color-background: #eef6f0;\n  --color-page-outside: #dcefe3;\n  --color-border: #dfeee4;\n  --color-text: #101828;\n  --color-text-muted: #667085;\n  --shadow-card: 0 6px 18px rgba(16, 24, 40, 0.07);\n  display: block;\n}\nion-content.empleado-root[_ngcontent-%COMP%] {\n  --background: var(--color-page-outside);\n}\n.empleado-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 430px;\n  min-height: 100dvh;\n  margin: 0 auto;\n  padding: 12px 12px 34px;\n  background: var(--color-background);\n  box-sizing: border-box;\n}\n[_nghost-%COMP%]     app-admin-module-hero .module-hero {\n  background:\n    linear-gradient(\n      135deg,\n      #087b2d,\n      #005f22) !important;\n}\n[_nghost-%COMP%]     app-admin-module-hero .btn-hero {\n  color: #087b2d !important;\n}\n[_nghost-%COMP%]     app-admin-summary-card .summary-card {\n  border-color: #dfeee4 !important;\n}\n[_nghost-%COMP%]     app-admin-empty-state .empty-icon {\n  background: #eaf8ef !important;\n  color: #087b2d !important;\n}\n[_nghost-%COMP%]     app-admin-empty-state .btn-empty {\n  background: #087b2d !important;\n}\n.empleado-topbar[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 78px;\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 18px;\n  box-shadow: var(--shadow-card);\n  padding: 12px;\n  display: grid;\n  grid-template-columns: 52px minmax(0, 1fr) 38px;\n  gap: 10px;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.empleado-avatar[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 17px;\n  background: #eaf8ef;\n  color: #087b2d;\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n  border: 1px solid #d6f0df;\n}\n.empleado-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.empleado-avatar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 1000;\n}\n.empleado-topbar-info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.empleado-topbar-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10.5px;\n  font-weight: 900;\n  color: #087b2d;\n  margin-bottom: 3px;\n}\n.empleado-topbar-info[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15.5px;\n  font-weight: 1000;\n  color: #101828;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.empleado-topbar-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 11.5px;\n  font-weight: 700;\n  color: #667085;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.logout-button[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border: none;\n  border-radius: 13px;\n  background: #eaf8ef;\n  color: #087b2d;\n  display: grid;\n  place-items: center;\n}\n.logout-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 21px;\n}\n.alerta-acceso[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  background: #fff7e6;\n  border: 1px solid #ffd78a;\n  border-radius: 16px;\n  padding: 12px;\n  display: grid;\n  grid-template-columns: 32px minmax(0, 1fr);\n  gap: 10px;\n}\n.alerta-acceso[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: #b86b00;\n}\n.alerta-acceso[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 900;\n  color: #7c3e00;\n}\n.alerta-acceso[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 11.5px;\n  line-height: 1.35;\n  font-weight: 600;\n  color: #92400e;\n}\n.gps-card[_ngcontent-%COMP%], \n.trabajo-actual-card[_ngcontent-%COMP%], \n.list-section[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 18px;\n  box-shadow: var(--shadow-card);\n}\n.gps-card[_ngcontent-%COMP%] {\n  padding: 13px;\n  margin: 12px 0;\n}\n.gps-main[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 46px minmax(0, 1fr);\n  gap: 10px;\n  align-items: center;\n}\n.gps-icon[_ngcontent-%COMP%] {\n  width: 46px;\n  height: 46px;\n  border-radius: 15px;\n  background: #eaf8ef;\n  color: #087b2d;\n  display: grid;\n  place-items: center;\n}\n.gps-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 25px;\n}\n.gps-main[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10.5px;\n  font-weight: 900;\n  color: #087b2d;\n  margin-bottom: 3px;\n}\n.gps-main[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13.5px;\n  font-weight: 1000;\n  color: #101828;\n}\n.gps-main[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  line-height: 1.35;\n  color: #667085;\n}\n.gps-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-top: 12px;\n}\n.gps-button[_ngcontent-%COMP%] {\n  min-height: 39px;\n  border: none;\n  border-radius: 12px;\n  padding: 0 11px;\n  font-size: 11.5px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.gps-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.gps-button.success[_ngcontent-%COMP%] {\n  flex: 1;\n  background: #087b2d;\n  color: #ffffff;\n  box-shadow: 0 6px 14px rgba(8, 123, 45, 0.2);\n}\n.gps-button.danger[_ngcontent-%COMP%] {\n  flex: 1;\n  background: #dc2626;\n  color: #ffffff;\n}\n.gps-button.secondary[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  color: #334155;\n}\n.summary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 9px;\n  margin: 12px 0;\n}\n.trabajo-actual-card[_ngcontent-%COMP%] {\n  padding: 13px;\n  display: grid;\n  grid-template-columns: 48px minmax(0, 1fr);\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.trabajo-actual-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 15px;\n  background: #eaf8ef;\n  color: #087b2d;\n  display: grid;\n  place-items: center;\n}\n.trabajo-actual-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 25px;\n}\n.trabajo-actual-info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.trabajo-actual-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10.5px;\n  font-weight: 900;\n  color: #087b2d;\n}\n.trabajo-actual-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 16px;\n  font-weight: 1000;\n  color: #101828;\n}\n.trabajo-actual-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 11.5px;\n  font-weight: 600;\n  line-height: 1.35;\n  color: #667085;\n}\n.list-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin: 12px 0 9px;\n}\n.list-title-row[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 1000;\n  color: #101828;\n}\n.list-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: #667085;\n}\n.list-title-row[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #087b2d;\n}\n.list-section[_ngcontent-%COMP%] {\n  padding: 10px;\n}\n.trabajos-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.trabajo-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e3ece6;\n  border-radius: 18px;\n  padding: 13px;\n  box-shadow: 0 4px 12px rgba(16, 24, 40, 0.04);\n}\n.trabajo-card-header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  gap: 8px;\n  align-items: flex-start;\n  margin-bottom: 12px;\n}\n.trabajo-title[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.codigo-chip[_ngcontent-%COMP%] {\n  height: 22px;\n  padding: 0 9px;\n  border-radius: 999px;\n  background: #eaf8ef;\n  color: #087b2d;\n  font-size: 10px;\n  font-weight: 1000;\n  display: inline-flex;\n  align-items: center;\n  margin-bottom: 5px;\n}\n.trabajo-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 1000;\n  color: #101828;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.trabajo-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 11.5px;\n  font-weight: 700;\n  color: #667085;\n}\n.estado-badge[_ngcontent-%COMP%] {\n  min-height: 26px;\n  padding: 0 9px;\n  border-radius: 999px;\n  font-size: 10px;\n  font-weight: 1000;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  white-space: nowrap;\n}\n.estado-badge.pendiente[_ngcontent-%COMP%] {\n  background: #fff4d6;\n  color: #b77900;\n}\n.estado-badge.en_camino[_ngcontent-%COMP%] {\n  background: #e8f1ff;\n  color: #1759e8;\n}\n.estado-badge.en_proceso[_ngcontent-%COMP%] {\n  background: #eaf8ef;\n  color: #087b2d;\n}\n.estado-badge.finalizado[_ngcontent-%COMP%], \n.estado-badge.devolucion_realizada[_ngcontent-%COMP%] {\n  background: #daf5e4;\n  color: #1f9d57;\n}\n.estado-badge.devolucion_pendiente[_ngcontent-%COMP%] {\n  background: #fff0df;\n  color: #c76a00;\n}\n.estado-badge.cancelado[_ngcontent-%COMP%] {\n  background: #ffecec;\n  color: #d63a3a;\n}\n.trabajo-info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 7px;\n  margin-bottom: 10px;\n}\n.trabajo-info-grid[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  display: grid;\n  grid-template-columns: 18px minmax(0, 1fr);\n  gap: 7px;\n  align-items: flex-start;\n  font-size: 11.5px;\n  font-weight: 700;\n  color: #475467;\n  line-height: 1.35;\n}\n.trabajo-info-grid[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #087b2d;\n  margin-top: 1px;\n}\n.trabajo-descripcion[_ngcontent-%COMP%], \n.materiales-box[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #edf2f7;\n  border-radius: 13px;\n  padding: 9px;\n  display: grid;\n  grid-template-columns: 18px minmax(0, 1fr);\n  gap: 7px;\n  align-items: flex-start;\n  margin-bottom: 9px;\n  color: #475467;\n  font-size: 11.5px;\n  font-weight: 650;\n  line-height: 1.35;\n}\n.trabajo-descripcion[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.materiales-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #087b2d;\n  margin-top: 1px;\n}\n.trabajo-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 10px;\n}\n.btn-action[_ngcontent-%COMP%] {\n  min-height: 38px;\n  border: none;\n  border-radius: 12px;\n  padding: 0 11px;\n  font-size: 11.5px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.btn-action[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.btn-action.secundario[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  color: #334155;\n}\n.btn-action.principal[_ngcontent-%COMP%] {\n  background: #087b2d;\n  color: #ffffff;\n  box-shadow: 0 6px 14px rgba(8, 123, 45, 0.2);\n}\n.btn-action.finalizar[_ngcontent-%COMP%] {\n  background: #0b3d91;\n  color: #ffffff;\n}\n@media (max-width: 370px) {\n  .summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .trabajo-card-header[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .estado-badge[_ngcontent-%COMP%] {\n    width: max-content;\n  }\n  .gps-actions[_ngcontent-%COMP%], \n   .trabajo-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .gps-button[_ngcontent-%COMP%], \n   .btn-action[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=dashboard-empleado.page.css.map */"] });
var DashboardEmpleadoPage = _DashboardEmpleadoPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardEmpleadoPage, [{
    type: Component,
    args: [{ selector: "app-dashboard-empleado", standalone: true, imports: [
      CommonModule,
      IonicModule,
      AdminModuleHeroComponent,
      AdminSummaryCardComponent,
      AdminEmptyStateComponent
    ], template: '<!-- src/app/paginas/empleado/dashboard-empleado/dashboard-empleado.page.html -->\n\n<ion-content [fullscreen]="true" class="empleado-root">\n\n  <ion-refresher slot="fixed" (ionRefresh)="refrescar($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ng-container *ngIf="vm$ | async as vm; else cargandoPanel">\n\n    <main class="empleado-container">\n\n      <section class="empleado-topbar">\n\n        <div class="empleado-avatar">\n\n          <img\n            *ngIf="vm.empleado.fotoUrl; else inicialesEmpleado"\n            [src]="vm.empleado.fotoUrl"\n            alt="Foto empleado"\n          />\n\n          <ng-template #inicialesEmpleado>\n            <span>{{ vm.empleado.iniciales }}</span>\n          </ng-template>\n\n        </div>\n\n        <div class="empleado-topbar-info">\n          <span>Bienvenido</span>\n          <h1>{{ vm.empleado.nombreCompleto }}</h1>\n          <p>{{ vm.empleado.cargoTexto }}</p>\n        </div>\n\n        <button\n          type="button"\n          class="logout-button"\n          (click)="cerrarSesion()"\n        >\n          <ion-icon name="log-out-outline"></ion-icon>\n        </button>\n\n      </section>\n\n      <app-admin-module-hero\n        titulo="Panel operativo"\n        descripcion="Controla tus trabajos asignados, ruta y ubicaci\xF3n GPS en tiempo real."\n        icono="briefcase-outline"\n      ></app-admin-module-hero>\n\n      <section\n        class="alerta-acceso"\n        *ngIf="!vm.empleado.accesoValido"\n      >\n        <ion-icon name="alert-circle-outline"></ion-icon>\n\n        <div>\n          <h3>Acceso operativo no habilitado</h3>\n          <p>Tu usuario existe, pero no est\xE1 habilitado para operar. Comun\xEDcate con el administrador.</p>\n        </div>\n      </section>\n\n      <section class="gps-card">\n\n        <div class="gps-main">\n          <div class="gps-icon">\n            <ion-icon name="radio-outline"></ion-icon>\n          </div>\n\n          <div>\n            <span>Ubicaci\xF3n en tiempo real</span>\n            <h2>{{ gpsEstadoTexto$ | async }}</h2>\n            <p>\n              El administrador ver\xE1 tu ubicaci\xF3n y la ruta hacia el trabajo cuando el GPS est\xE9 activo.\n            </p>\n          </div>\n        </div>\n\n        <div class="gps-actions">\n\n          <ng-container *ngIf="gpsActivo$ | async; else gpsApagado">\n            <button\n              type="button"\n              class="gps-button danger"\n              (click)="desactivarGps()"\n            >\n              <ion-icon name="stop-circle-outline"></ion-icon>\n              <span>Desactivar GPS</span>\n            </button>\n          </ng-container>\n\n          <ng-template #gpsApagado>\n            <button\n  type="button"\n  class="gps-button success"\n  (click)="activarGps(vm.empleado, vm.trabajoActual)"\n>\n  <ion-icon name="locate-outline"></ion-icon>\n  <span>Activar GPS</span>\n</button>\n          </ng-template>\n\n          <button\n            type="button"\n            class="gps-button secondary"\n            (click)="abrirRutaTrabajo(vm.trabajoActual)"\n          >\n            <ion-icon name="map-outline"></ion-icon>\n            <span>Ruta</span>\n          </button>\n\n        </div>\n\n      </section>\n\n      <section class="summary-grid">\n\n        <app-admin-summary-card\n          titulo="Total"\n          [valor]="vm.totalTrabajos"\n          icono="clipboard-outline"\n          tipo="total"\n        ></app-admin-summary-card>\n\n        <app-admin-summary-card\n          titulo="Pendientes"\n          [valor]="vm.totalPendientes"\n          icono="time-outline"\n          tipo="warning"\n        ></app-admin-summary-card>\n\n        <app-admin-summary-card\n          titulo="En camino"\n          [valor]="vm.totalEnCamino"\n          icono="navigate-outline"\n          tipo="primary"\n        ></app-admin-summary-card>\n\n        <app-admin-summary-card\n          titulo="En proceso"\n          [valor]="vm.totalEnProceso"\n          icono="construct-outline"\n          tipo="success"\n        ></app-admin-summary-card>\n\n      </section>\n\n      <section class="trabajo-actual-card">\n\n        <div class="trabajo-actual-icon">\n          <ion-icon name="briefcase-outline"></ion-icon>\n        </div>\n\n        <div class="trabajo-actual-info">\n          <span>Trabajo actual</span>\n\n          <h2 *ngIf="vm.trabajoActual; else sinTrabajoActual">\n            {{ vm.trabajoActual.codigoTrabajo }}\n          </h2>\n\n          <ng-template #sinTrabajoActual>\n            <h2>Sin trabajo activo</h2>\n          </ng-template>\n\n          <p *ngIf="vm.trabajoActual">\n            {{ vm.trabajoActual.clienteNombre }} \xB7 {{ vm.trabajoActual.estadoTexto }}\n          </p>\n\n          <p *ngIf="!vm.trabajoActual">\n            Cuando tengas un trabajo asignado aparecer\xE1 aqu\xED.\n          </p>\n        </div>\n\n      </section>\n\n      <section class="list-title-row">\n        <div>\n          <h3>Mis trabajos asignados</h3>\n          <p>{{ vm.trabajos.length }} trabajo(s) encontrado(s)</p>\n        </div>\n\n        <ion-icon name="refresh-outline"></ion-icon>\n      </section>\n\n      <section class="list-section">\n\n        <div\n          class="trabajos-list"\n          *ngIf="vm.trabajos.length > 0; else sinTrabajos"\n        >\n\n          <article\n            class="trabajo-card"\n            *ngFor="let trabajo of vm.trabajos; trackBy: trackByTrabajo"\n          >\n\n            <header class="trabajo-card-header">\n\n              <div class="trabajo-title">\n                <span class="codigo-chip">{{ trabajo.codigoTrabajo }}</span>\n                <h3>{{ trabajo.clienteNombre }}</h3>\n                <p>{{ trabajo.tipoTrabajo }}</p>\n              </div>\n\n              <span\n                class="estado-badge"\n                [ngClass]="trabajo.estadoClase"\n              >\n                {{ trabajo.estadoTexto }}\n              </span>\n\n            </header>\n\n            <div class="trabajo-info-grid">\n\n              <p>\n                <ion-icon name="calendar-outline"></ion-icon>\n                <span>{{ trabajo.fechaHoraTexto }}</span>\n              </p>\n\n              <p>\n                <ion-icon name="pin-outline"></ion-icon>\n                <span>{{ trabajo.direccionTexto }}</span>\n              </p>\n\n              <p *ngIf="trabajo.referencia">\n                <ion-icon name="location-outline"></ion-icon>\n                <span>{{ trabajo.referencia }}</span>\n              </p>\n\n              <p>\n                <ion-icon name="cash-outline"></ion-icon>\n                <span>{{ trabajo.subtotalTexto }}</span>\n              </p>\n\n            </div>\n\n            <div\n              class="trabajo-descripcion"\n              *ngIf="trabajo.descripcion"\n            >\n              <ion-icon name="document-text-outline"></ion-icon>\n              <span>{{ trabajo.descripcion }}</span>\n            </div>\n\n            <div class="materiales-box">\n              <ion-icon name="cube-outline"></ion-icon>\n              <span>{{ trabajo.materialesTexto }}</span>\n            </div>\n\n            <div class="trabajo-actions">\n\n              <button\n                type="button"\n                class="btn-action secundario"\n                (click)="llamarCliente(trabajo)"\n              >\n                <ion-icon name="call-outline"></ion-icon>\n                <span>Llamar</span>\n              </button>\n\n              <button\n                type="button"\n                class="btn-action secundario"\n                (click)="abrirMapa(trabajo)"\n              >\n                <ion-icon name="map-outline"></ion-icon>\n                <span>Mapa</span>\n              </button>\n\n              <button\n                *ngIf="puedeMarcarEnCamino(trabajo)"\n                type="button"\n                class="btn-action principal"\n                (click)="marcarEnCamino(trabajo, vm.empleado)"\n              >\n                <ion-icon name="navigate-outline"></ion-icon>\n                <span>En camino</span>\n              </button>\n\n              <button\n                *ngIf="puedeIniciar(trabajo)"\n                type="button"\n                class="btn-action principal"\n                (click)="iniciarTrabajo(trabajo, vm.empleado)"\n              >\n                <ion-icon name="play-circle-outline"></ion-icon>\n                <span>Iniciar</span>\n              </button>\n\n              <button\n                *ngIf="puedeFinalizar(trabajo)"\n                type="button"\n                class="btn-action finalizar"\n                (click)="finalizarTrabajo(trabajo, vm.empleado)"\n              >\n                <ion-icon name="checkmark-done-outline"></ion-icon>\n                <span>Finalizar</span>\n              </button>\n\n            </div>\n\n          </article>\n\n        </div>\n\n        <ng-template #sinTrabajos>\n          <app-admin-empty-state\n            icono="briefcase-outline"\n            titulo="No tienes trabajos asignados"\n            descripcion="Cuando el administrador te asigne un trabajo, aparecer\xE1 aqu\xED."\n          ></app-admin-empty-state>\n        </ng-template>\n\n      </section>\n\n    </main>\n\n  </ng-container>\n\n  <ng-template #cargandoPanel>\n    <main class="empleado-container">\n      <app-admin-empty-state\n        icono="time-outline"\n        titulo="Cargando panel empleado"\n        descripcion="Espere un momento."\n      ></app-admin-empty-state>\n    </main>\n  </ng-template>\n\n</ion-content>', styles: ["/* src/app/paginas/empleado/dashboard-empleado/dashboard-empleado.page.css */\n:host {\n  --color-primary: #087b2d;\n  --color-primary-soft: #eaf8ef;\n  --color-background: #eef6f0;\n  --color-page-outside: #dcefe3;\n  --color-border: #dfeee4;\n  --color-text: #101828;\n  --color-text-muted: #667085;\n  --shadow-card: 0 6px 18px rgba(16, 24, 40, 0.07);\n  display: block;\n}\nion-content.empleado-root {\n  --background: var(--color-page-outside);\n}\n.empleado-container {\n  width: 100%;\n  max-width: 430px;\n  min-height: 100dvh;\n  margin: 0 auto;\n  padding: 12px 12px 34px;\n  background: var(--color-background);\n  box-sizing: border-box;\n}\n:host ::ng-deep app-admin-module-hero .module-hero {\n  background:\n    linear-gradient(\n      135deg,\n      #087b2d,\n      #005f22) !important;\n}\n:host ::ng-deep app-admin-module-hero .btn-hero {\n  color: #087b2d !important;\n}\n:host ::ng-deep app-admin-summary-card .summary-card {\n  border-color: #dfeee4 !important;\n}\n:host ::ng-deep app-admin-empty-state .empty-icon {\n  background: #eaf8ef !important;\n  color: #087b2d !important;\n}\n:host ::ng-deep app-admin-empty-state .btn-empty {\n  background: #087b2d !important;\n}\n.empleado-topbar {\n  width: 100%;\n  min-height: 78px;\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 18px;\n  box-shadow: var(--shadow-card);\n  padding: 12px;\n  display: grid;\n  grid-template-columns: 52px minmax(0, 1fr) 38px;\n  gap: 10px;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.empleado-avatar {\n  width: 52px;\n  height: 52px;\n  border-radius: 17px;\n  background: #eaf8ef;\n  color: #087b2d;\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n  border: 1px solid #d6f0df;\n}\n.empleado-avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.empleado-avatar span {\n  font-size: 14px;\n  font-weight: 1000;\n}\n.empleado-topbar-info {\n  min-width: 0;\n}\n.empleado-topbar-info span {\n  display: block;\n  font-size: 10.5px;\n  font-weight: 900;\n  color: #087b2d;\n  margin-bottom: 3px;\n}\n.empleado-topbar-info h1 {\n  margin: 0;\n  font-size: 15.5px;\n  font-weight: 1000;\n  color: #101828;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.empleado-topbar-info p {\n  margin: 3px 0 0;\n  font-size: 11.5px;\n  font-weight: 700;\n  color: #667085;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.logout-button {\n  width: 38px;\n  height: 38px;\n  border: none;\n  border-radius: 13px;\n  background: #eaf8ef;\n  color: #087b2d;\n  display: grid;\n  place-items: center;\n}\n.logout-button ion-icon {\n  font-size: 21px;\n}\n.alerta-acceso {\n  margin: 12px 0;\n  background: #fff7e6;\n  border: 1px solid #ffd78a;\n  border-radius: 16px;\n  padding: 12px;\n  display: grid;\n  grid-template-columns: 32px minmax(0, 1fr);\n  gap: 10px;\n}\n.alerta-acceso ion-icon {\n  font-size: 24px;\n  color: #b86b00;\n}\n.alerta-acceso h3 {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 900;\n  color: #7c3e00;\n}\n.alerta-acceso p {\n  margin: 4px 0 0;\n  font-size: 11.5px;\n  line-height: 1.35;\n  font-weight: 600;\n  color: #92400e;\n}\n.gps-card,\n.trabajo-actual-card,\n.list-section {\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 18px;\n  box-shadow: var(--shadow-card);\n}\n.gps-card {\n  padding: 13px;\n  margin: 12px 0;\n}\n.gps-main {\n  display: grid;\n  grid-template-columns: 46px minmax(0, 1fr);\n  gap: 10px;\n  align-items: center;\n}\n.gps-icon {\n  width: 46px;\n  height: 46px;\n  border-radius: 15px;\n  background: #eaf8ef;\n  color: #087b2d;\n  display: grid;\n  place-items: center;\n}\n.gps-icon ion-icon {\n  font-size: 25px;\n}\n.gps-main span {\n  display: block;\n  font-size: 10.5px;\n  font-weight: 900;\n  color: #087b2d;\n  margin-bottom: 3px;\n}\n.gps-main h2 {\n  margin: 0;\n  font-size: 13.5px;\n  font-weight: 1000;\n  color: #101828;\n}\n.gps-main p {\n  margin: 4px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  line-height: 1.35;\n  color: #667085;\n}\n.gps-actions {\n  display: flex;\n  gap: 8px;\n  margin-top: 12px;\n}\n.gps-button {\n  min-height: 39px;\n  border: none;\n  border-radius: 12px;\n  padding: 0 11px;\n  font-size: 11.5px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.gps-button ion-icon {\n  font-size: 17px;\n}\n.gps-button.success {\n  flex: 1;\n  background: #087b2d;\n  color: #ffffff;\n  box-shadow: 0 6px 14px rgba(8, 123, 45, 0.2);\n}\n.gps-button.danger {\n  flex: 1;\n  background: #dc2626;\n  color: #ffffff;\n}\n.gps-button.secondary {\n  background: #f1f5f9;\n  color: #334155;\n}\n.summary-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 9px;\n  margin: 12px 0;\n}\n.trabajo-actual-card {\n  padding: 13px;\n  display: grid;\n  grid-template-columns: 48px minmax(0, 1fr);\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.trabajo-actual-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 15px;\n  background: #eaf8ef;\n  color: #087b2d;\n  display: grid;\n  place-items: center;\n}\n.trabajo-actual-icon ion-icon {\n  font-size: 25px;\n}\n.trabajo-actual-info {\n  min-width: 0;\n}\n.trabajo-actual-info span {\n  display: block;\n  font-size: 10.5px;\n  font-weight: 900;\n  color: #087b2d;\n}\n.trabajo-actual-info h2 {\n  margin: 3px 0 0;\n  font-size: 16px;\n  font-weight: 1000;\n  color: #101828;\n}\n.trabajo-actual-info p {\n  margin: 4px 0 0;\n  font-size: 11.5px;\n  font-weight: 600;\n  line-height: 1.35;\n  color: #667085;\n}\n.list-title-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin: 12px 0 9px;\n}\n.list-title-row h3 {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 1000;\n  color: #101828;\n}\n.list-title-row p {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: #667085;\n}\n.list-title-row ion-icon {\n  font-size: 20px;\n  color: #087b2d;\n}\n.list-section {\n  padding: 10px;\n}\n.trabajos-list {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.trabajo-card {\n  background: #ffffff;\n  border: 1px solid #e3ece6;\n  border-radius: 18px;\n  padding: 13px;\n  box-shadow: 0 4px 12px rgba(16, 24, 40, 0.04);\n}\n.trabajo-card-header {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  gap: 8px;\n  align-items: flex-start;\n  margin-bottom: 12px;\n}\n.trabajo-title {\n  min-width: 0;\n}\n.codigo-chip {\n  height: 22px;\n  padding: 0 9px;\n  border-radius: 999px;\n  background: #eaf8ef;\n  color: #087b2d;\n  font-size: 10px;\n  font-weight: 1000;\n  display: inline-flex;\n  align-items: center;\n  margin-bottom: 5px;\n}\n.trabajo-title h3 {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 1000;\n  color: #101828;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.trabajo-title p {\n  margin: 4px 0 0;\n  font-size: 11.5px;\n  font-weight: 700;\n  color: #667085;\n}\n.estado-badge {\n  min-height: 26px;\n  padding: 0 9px;\n  border-radius: 999px;\n  font-size: 10px;\n  font-weight: 1000;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  white-space: nowrap;\n}\n.estado-badge.pendiente {\n  background: #fff4d6;\n  color: #b77900;\n}\n.estado-badge.en_camino {\n  background: #e8f1ff;\n  color: #1759e8;\n}\n.estado-badge.en_proceso {\n  background: #eaf8ef;\n  color: #087b2d;\n}\n.estado-badge.finalizado,\n.estado-badge.devolucion_realizada {\n  background: #daf5e4;\n  color: #1f9d57;\n}\n.estado-badge.devolucion_pendiente {\n  background: #fff0df;\n  color: #c76a00;\n}\n.estado-badge.cancelado {\n  background: #ffecec;\n  color: #d63a3a;\n}\n.trabajo-info-grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 7px;\n  margin-bottom: 10px;\n}\n.trabajo-info-grid p {\n  margin: 0;\n  display: grid;\n  grid-template-columns: 18px minmax(0, 1fr);\n  gap: 7px;\n  align-items: flex-start;\n  font-size: 11.5px;\n  font-weight: 700;\n  color: #475467;\n  line-height: 1.35;\n}\n.trabajo-info-grid ion-icon {\n  font-size: 16px;\n  color: #087b2d;\n  margin-top: 1px;\n}\n.trabajo-descripcion,\n.materiales-box {\n  background: #f8fafc;\n  border: 1px solid #edf2f7;\n  border-radius: 13px;\n  padding: 9px;\n  display: grid;\n  grid-template-columns: 18px minmax(0, 1fr);\n  gap: 7px;\n  align-items: flex-start;\n  margin-bottom: 9px;\n  color: #475467;\n  font-size: 11.5px;\n  font-weight: 650;\n  line-height: 1.35;\n}\n.trabajo-descripcion ion-icon,\n.materiales-box ion-icon {\n  font-size: 16px;\n  color: #087b2d;\n  margin-top: 1px;\n}\n.trabajo-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 10px;\n}\n.btn-action {\n  min-height: 38px;\n  border: none;\n  border-radius: 12px;\n  padding: 0 11px;\n  font-size: 11.5px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.btn-action ion-icon {\n  font-size: 16px;\n}\n.btn-action.secundario {\n  background: #f1f5f9;\n  color: #334155;\n}\n.btn-action.principal {\n  background: #087b2d;\n  color: #ffffff;\n  box-shadow: 0 6px 14px rgba(8, 123, 45, 0.2);\n}\n.btn-action.finalizar {\n  background: #0b3d91;\n  color: #ffffff;\n}\n@media (max-width: 370px) {\n  .summary-grid {\n    grid-template-columns: 1fr;\n  }\n  .trabajo-card-header {\n    grid-template-columns: 1fr;\n  }\n  .estado-badge {\n    width: max-content;\n  }\n  .gps-actions,\n  .trabajo-actions {\n    flex-direction: column;\n  }\n  .gps-button,\n  .btn-action {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=dashboard-empleado.page.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardEmpleadoPage, { className: "DashboardEmpleadoPage", filePath: "src/app/paginas/empleado/dashboard-empleado/dashboard-empleado.page.ts", lineNumber: 69 });
})();
export {
  DashboardEmpleadoPage
};
//# sourceMappingURL=dashboard-empleado.page-TTGQ4NLB.js.map
