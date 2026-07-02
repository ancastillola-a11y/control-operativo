import {
  IonIcon,
  IonicModule,
  ToastController
} from "./chunk-NAACVANG.js";
import {
  menuOutline,
  notificationsOutline,
  personCircleOutline
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
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch
} from "./chunk-NMRAWXHA.js";
import {
  BehaviorSubject,
  CommonModule,
  Component,
  EventEmitter,
  Injectable,
  Input,
  NavController,
  NgIf,
  Output,
  catchError,
  combineLatest,
  filter,
  inject,
  interval,
  map,
  of,
  setClassMetadata,
  shareReplay,
  startWith,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-D2BFCRPD.js";
import {
  addIcons
} from "./chunk-GGIFJ42N.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-Q3N56TRI.js";

// src/app/dao/notificacion.dao.ts
var _NotificacionDAO = class _NotificacionDAO {
  constructor() {
    this.firestore = inject(Firestore);
  }
  escucharNotificacionesAdmin() {
    const ref = collection(this.firestore, "notificaciones_admin");
    const q = query(ref, orderBy("creadoEn", "desc"));
    return collectionData(q, {
      idField: "uid"
    });
  }
  crearNotificacionAdmin(data) {
    return __async(this, null, function* () {
      const ref = collection(this.firestore, "notificaciones_admin");
      yield addDoc(ref, __spreadProps(__spreadValues({}, data), {
        leida: false,
        eliminada: false,
        activa: true,
        resuelta: false,
        creadoEn: serverTimestamp(),
        actualizadoEn: serverTimestamp()
      }));
    });
  }
  crearOActualizarAlertaStockBajo(data) {
    return __async(this, null, function* () {
      const materialUid = String(data.materialUid || "").trim();
      if (!materialUid) {
        throw new Error("material-uid-vacio");
      }
      const alertaActiva = yield this.buscarAlertaStockBajoActiva(materialUid);
      const stockActual = Number(data.stockActual || 0);
      const stockMinimo = Number(data.stockMinimo || 0);
      const unidad = String(data.unidad || "").trim();
      const mensaje = `El material ${data.materialNombre} est\xE1 por debajo del stock m\xEDnimo.`;
      const detalle = `Stock actual: ${stockActual} ${unidad}. Stock m\xEDnimo: ${stockMinimo} ${unidad}.`;
      if (alertaActiva) {
        const ref = doc(this.firestore, "notificaciones_admin", alertaActiva.uid);
        yield updateDoc(ref, {
          titulo: "Stock bajo",
          mensaje,
          detalle,
          tipo: "stock_bajo",
          materialNombre: data.materialNombre,
          stockActual,
          stockMinimo,
          unidad,
          ruta: "/materiales",
          referenciaUid: materialUid,
          leida: alertaActiva.leida === true,
          activa: true,
          resuelta: false,
          eliminada: false,
          actualizadoEn: serverTimestamp()
        });
        return;
      }
      yield this.crearNotificacionAdmin({
        titulo: "Stock bajo",
        mensaje,
        detalle,
        tipo: "stock_bajo",
        ruta: "/materiales",
        referenciaUid: materialUid,
        materialNombre: data.materialNombre,
        stockActual,
        stockMinimo,
        unidad
      });
    });
  }
  resolverAlertaStockBajo(materialUid) {
    return __async(this, null, function* () {
      const uidMaterial = String(materialUid || "").trim();
      if (!uidMaterial) {
        return;
      }
      const alertaActiva = yield this.buscarAlertaStockBajoActiva(uidMaterial);
      if (!alertaActiva) {
        return;
      }
      const ref = doc(this.firestore, "notificaciones_admin", alertaActiva.uid);
      yield updateDoc(ref, {
        leida: true,
        activa: false,
        resuelta: true,
        resueltoEn: serverTimestamp(),
        actualizadoEn: serverTimestamp()
      });
    });
  }
  marcarComoLeida(uid) {
    return __async(this, null, function* () {
      const notificacionUid = String(uid || "").trim();
      if (!notificacionUid) {
        throw new Error("notificacion-uid-vacio");
      }
      const ref = doc(this.firestore, "notificaciones_admin", notificacionUid);
      yield updateDoc(ref, {
        leida: true,
        actualizadoEn: serverTimestamp()
      });
    });
  }
  marcarComoNoLeida(uid) {
    return __async(this, null, function* () {
      const notificacionUid = String(uid || "").trim();
      if (!notificacionUid) {
        throw new Error("notificacion-uid-vacio");
      }
      const ref = doc(this.firestore, "notificaciones_admin", notificacionUid);
      yield updateDoc(ref, {
        leida: false,
        actualizadoEn: serverTimestamp()
      });
    });
  }
  eliminarNotificacion(uid) {
    return __async(this, null, function* () {
      const notificacionUid = String(uid || "").trim();
      if (!notificacionUid) {
        throw new Error("notificacion-uid-vacio");
      }
      const ref = doc(this.firestore, "notificaciones_admin", notificacionUid);
      yield updateDoc(ref, {
        eliminada: true,
        eliminadoEn: serverTimestamp(),
        actualizadoEn: serverTimestamp()
      });
    });
  }
  marcarTodasComoLeidas(notificaciones) {
    return __async(this, null, function* () {
      const pendientes = notificaciones.filter((item) => !!item.uid && item.leida !== true && item.eliminada !== true && item.resuelta !== true);
      if (pendientes.length === 0) {
        return;
      }
      const batch = writeBatch(this.firestore);
      for (const item of pendientes) {
        const uid = String(item.uid || "").trim();
        if (!uid) {
          continue;
        }
        const ref = doc(this.firestore, "notificaciones_admin", uid);
        batch.update(ref, {
          leida: true,
          actualizadoEn: serverTimestamp()
        });
      }
      yield batch.commit();
    });
  }
  buscarAlertaStockBajoActiva(materialUid) {
    return __async(this, null, function* () {
      const uidMaterial = String(materialUid || "").trim();
      if (!uidMaterial) {
        return null;
      }
      const ref = collection(this.firestore, "notificaciones_admin");
      const q = query(ref, where("referenciaUid", "==", uidMaterial), limit(20));
      const snap = yield getDocs(q);
      if (snap.empty) {
        return null;
      }
      const encontrada = snap.docs.map((documento) => {
        const data = documento.data();
        return __spreadProps(__spreadValues({}, data), {
          uid: documento.id
        });
      }).find((item) => item.tipo === "stock_bajo" && item.eliminada !== true && item.resuelta !== true && item.activa !== false);
      return encontrada || null;
    });
  }
};
_NotificacionDAO.\u0275fac = function NotificacionDAO_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NotificacionDAO)();
};
_NotificacionDAO.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificacionDAO, factory: _NotificacionDAO.\u0275fac, providedIn: "root" });
var NotificacionDAO = _NotificacionDAO;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificacionDAO, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/procesos/notificacion.service.ts
var _NotificacionService = class _NotificacionService {
  constructor() {
    this.dao = inject(NotificacionDAO);
    this.filtroSubject = new BehaviorSubject("todas");
    this.notificacionesBase$ = this.dao.escucharNotificacionesAdmin().pipe(map((items) => items.filter((item) => item.eliminada !== true && item.resuelta !== true).map((item) => this.mapearNotificacionVista(item))), shareReplay({
      bufferSize: 1,
      refCount: true
    }));
    this.contadorNoLeidas$ = this.notificacionesBase$.pipe(map((notificaciones) => notificaciones.filter((item) => item.leida !== true && item.eliminada !== true && item.resuelta !== true).length), shareReplay({
      bufferSize: 1,
      refCount: true
    }));
    this.vm$ = combineLatest([
      this.notificacionesBase$,
      this.filtroSubject.asObservable()
    ]).pipe(map(([notificaciones, filtro]) => {
      const notificacionesFiltradas = this.aplicarFiltro(notificaciones, filtro);
      return {
        filtro,
        notificaciones,
        notificacionesFiltradas,
        total: notificaciones.length,
        noLeidas: notificaciones.filter((item) => item.leida !== true).length,
        totalCambiosEstado: notificaciones.filter((item) => this.esCambioEstado(item.tipo)).length,
        totalStock: notificaciones.filter((item) => item.tipo === "stock_bajo").length,
        totalRutas: notificaciones.filter((item) => this.esRuta(item.tipo)).length,
        totalDevoluciones: notificaciones.filter((item) => this.esDevolucion(item.tipo)).length
      };
    }), shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }
  cambiarFiltro(filtro) {
    this.filtroSubject.next(filtro);
  }
  marcarComoLeida(uid) {
    return __async(this, null, function* () {
      yield this.dao.marcarComoLeida(uid);
    });
  }
  marcarComoNoLeida(uid) {
    return __async(this, null, function* () {
      yield this.dao.marcarComoNoLeida(uid);
    });
  }
  eliminarNotificacion(uid) {
    return __async(this, null, function* () {
      yield this.dao.eliminarNotificacion(uid);
    });
  }
  marcarTodasComoLeidas(notificaciones) {
    return __async(this, null, function* () {
      yield this.dao.marcarTodasComoLeidas(notificaciones);
    });
  }
  aplicarFiltro(notificaciones, filtro) {
    if (filtro === "cambios_estado") {
      return notificaciones.filter((item) => this.esCambioEstado(item.tipo));
    }
    if (filtro === "stock") {
      return notificaciones.filter((item) => item.tipo === "stock_bajo");
    }
    if (filtro === "rutas") {
      return notificaciones.filter((item) => this.esRuta(item.tipo));
    }
    if (filtro === "devoluciones") {
      return notificaciones.filter((item) => this.esDevolucion(item.tipo));
    }
    return notificaciones;
  }
  esCambioEstado(tipo) {
    return [
      "cambio_estado_trabajo",
      "trabajo_finalizado",
      "finalizacion_trabajo"
    ].includes(tipo);
  }
  esRuta(tipo) {
    return [
      "inicio_trabajo",
      "empleado_en_camino"
    ].includes(tipo);
  }
  esDevolucion(tipo) {
    return [
      "devolucion_validada",
      "devolucion_realizada"
    ].includes(tipo);
  }
  mapearNotificacionVista(item) {
    const tipo = item.tipo || "general";
    return __spreadProps(__spreadValues({}, item), {
      uid: item.uid || "",
      titulo: item.titulo || "Notificaci\xF3n",
      mensaje: item.mensaje || "",
      tipo,
      leida: item.leida === true,
      eliminada: item.eliminada === true,
      activa: item.activa !== false,
      resuelta: item.resuelta === true,
      icono: this.obtenerIcono(tipo),
      claseIcono: this.obtenerClaseIcono(tipo),
      fechaTexto: this.obtenerFechaTexto(item.creadoEn)
    });
  }
  obtenerIcono(tipo) {
    const mapa = {
      cambio_estado_trabajo: "sync-outline",
      trabajo_finalizado: "checkmark-circle-outline",
      empleado_en_camino: "bus-outline",
      stock_bajo: "warning-outline",
      inicio_trabajo: "navigate-outline",
      finalizacion_trabajo: "checkmark-done-outline",
      devolucion_validada: "return-up-back-outline",
      devolucion_realizada: "return-up-back-outline",
      general: "notifications-outline"
    };
    return mapa[tipo] || "notifications-outline";
  }
  obtenerClaseIcono(tipo) {
    const mapa = {
      cambio_estado_trabajo: "gris",
      trabajo_finalizado: "success",
      empleado_en_camino: "azul",
      stock_bajo: "warning",
      inicio_trabajo: "azul",
      finalizacion_trabajo: "success",
      devolucion_validada: "morado",
      devolucion_realizada: "morado",
      general: "gris"
    };
    return mapa[tipo] || "gris";
  }
  obtenerFechaTexto(fecha) {
    if (!fecha) {
      return "Sin fecha";
    }
    let date = null;
    if (typeof fecha?.toDate === "function") {
      date = fecha.toDate();
    } else if (fecha instanceof Date) {
      date = fecha;
    }
    if (!date) {
      return "Fecha reciente";
    }
    const hoy = /* @__PURE__ */ new Date();
    const ayer = /* @__PURE__ */ new Date();
    ayer.setDate(hoy.getDate() - 1);
    const mismoDia = date.getFullYear() === hoy.getFullYear() && date.getMonth() === hoy.getMonth() && date.getDate() === hoy.getDate();
    const esAyer = date.getFullYear() === ayer.getFullYear() && date.getMonth() === ayer.getMonth() && date.getDate() === ayer.getDate();
    const hora = date.toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
    if (mismoDia) {
      return `Hoy, ${hora}`;
    }
    if (esAyer) {
      return `Ayer, ${hora}`;
    }
    return date.toLocaleString("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  }
};
_NotificacionService.\u0275fac = function NotificacionService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NotificacionService)();
};
_NotificacionService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificacionService, factory: _NotificacionService.\u0275fac, providedIn: "root" });
var NotificacionService = _NotificacionService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificacionService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/dao/dashboard-admin.dao.ts
var _DashboardAdminDAO = class _DashboardAdminDAO {
  constructor() {
    this.firestore = inject(Firestore);
  }
  obtenerResumenAdmin$() {
    const ref = doc(this.firestore, "dashboard_admin", "resumen");
    return docData(ref);
  }
  obtenerEmpresa$() {
    const ref = doc(this.firestore, "configuracion", "empresa");
    return docData(ref, { idField: "id" });
  }
  obtenerUsuarioAdmin$(uid, correo) {
    const usuarioPorUidRef = doc(this.firestore, "usuarios", uid);
    const usuarioPorUid$ = docData(usuarioPorUidRef, {
      idField: "uid"
    });
    if (!correo || correo.trim() === "") {
      return usuarioPorUid$;
    }
    const usuariosRef = collection(this.firestore, "usuarios");
    const consultaPorCorreo = query(usuariosRef, where("correo", "==", correo.trim()), limit(1));
    return collectionData(consultaPorCorreo, { idField: "id" }).pipe(switchMap((usuarios) => {
      if (usuarios.length > 0) {
        return of(usuarios[0]);
      }
      return usuarioPorUid$;
    }));
  }
  obtenerModulosAdmin$() {
    const ref = collection(this.firestore, "modulos_admin");
    const consulta = query(ref, where("activo", "==", true), orderBy("orden", "asc"));
    return collectionData(consulta, { idField: "id" });
  }
};
_DashboardAdminDAO.\u0275fac = function DashboardAdminDAO_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DashboardAdminDAO)();
};
_DashboardAdminDAO.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DashboardAdminDAO, factory: _DashboardAdminDAO.\u0275fac, providedIn: "root" });
var DashboardAdminDAO = _DashboardAdminDAO;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardAdminDAO, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/procesos/reloj.service.ts
var _RelojService = class _RelojService {
  constructor() {
    this.reloj$ = interval(1e3).pipe(startWith(0), map(() => this.obtenerFechaHoraActual()));
  }
  obtenerFechaHoraActual() {
    const ahora = /* @__PURE__ */ new Date();
    const fechaTexto = new Intl.DateTimeFormat("es-PE", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(ahora);
    const horaTexto = new Intl.DateTimeFormat("es-PE", {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    }).format(ahora);
    return {
      fechaTexto,
      horaTexto
    };
  }
};
_RelojService.\u0275fac = function RelojService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RelojService)();
};
_RelojService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RelojService, factory: _RelojService.\u0275fac, providedIn: "root" });
var RelojService = _RelojService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RelojService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/procesos/dashboard-admin.service.ts
var EMPRESA_DEFAULT = {
  nombre: "COMPROY S.A.C.",
  rubro: "Consultor\xEDa Obras y",
  detalle: "Mantenimiento de Proyectos S.A.C.",
  logoUrl: "assets/img/admin/logo-empresa.png",
  bannerUrl: "assets/img/admin/banner-obrero.png",
  activo: true
};
var ADMIN_DEFAULT = {
  nombres: "Administrador",
  usuario: "Administrador",
  correo: "",
  rol: "admin",
  activo: true,
  fotoUrl: "assets/img/admin/perfil-admin.png"
};
var RESUMEN_DEFAULT = {
  trabajosPendientes: 0,
  materialesStockBajo: 0,
  empleadosActivos: 0,
  notificacionesNoLeidas: 0
};
var MODULO_FINANZAS = {
  titulo: "Finanzas",
  ruta: "/finanzas",
  iconoUrl: "assets/img/admin/icon-pagos.png",
  orden: 8,
  activo: true,
  color: "verde",
  badgeTipo: ""
};
var MODULOS_DEFAULT = [
  {
    titulo: "Trabajos",
    ruta: "/asignacion-trabajos",
    iconoUrl: "assets/img/admin/icon-trabajos.png",
    orden: 1,
    activo: true,
    color: "azul",
    badgeTipo: "trabajos_pendientes"
  },
  {
    titulo: "Almac\xE9n",
    ruta: "/materiales",
    iconoUrl: "assets/img/admin/icon-almacen.png",
    orden: 2,
    activo: true,
    color: "azul",
    badgeTipo: "stock_bajo"
  },
  {
    titulo: "Empleados",
    ruta: "/empleados",
    iconoUrl: "assets/img/admin/icon-empleados.png",
    orden: 3,
    activo: true,
    color: "verde",
    badgeTipo: ""
  },
  {
    titulo: "GPS",
    ruta: "/gps",
    iconoUrl: "assets/img/admin/icon-gps.png",
    orden: 4,
    activo: true,
    color: "azul",
    badgeTipo: ""
  },
  {
    titulo: "Reportes",
    ruta: "/reportes",
    iconoUrl: "assets/img/admin/icon-reportes.png",
    orden: 5,
    activo: true,
    color: "azul",
    badgeTipo: ""
  },
  {
    titulo: "Notificaciones",
    ruta: "/notificaciones-admin",
    iconoUrl: "assets/img/admin/icon-notificaciones.png",
    orden: 6,
    activo: true,
    color: "gris",
    badgeTipo: "notificaciones"
  },
  {
    titulo: "Devoluciones",
    ruta: "/devoluciones",
    iconoUrl: "assets/img/admin/icon-devoluciones.png",
    orden: 7,
    activo: true,
    color: "azul",
    badgeTipo: ""
  },
  MODULO_FINANZAS
];
var VM_DEFAULT = {
  empresa: EMPRESA_DEFAULT,
  administrador: ADMIN_DEFAULT,
  resumen: RESUMEN_DEFAULT,
  modulos: MODULOS_DEFAULT.map((modulo) => __spreadProps(__spreadValues({}, modulo), {
    badgeValor: 0
  }))
};
var _DashboardAdminService = class _DashboardAdminService {
  constructor() {
    this.dao = inject(DashboardAdminDAO);
    this.auth = inject(Auth);
    this.relojService = inject(RelojService);
    this.notificacionService = inject(NotificacionService);
  }
  obtenerReloj$() {
    return this.relojService.reloj$;
  }
  obtenerPanelAdmin$() {
    return authState(this.auth).pipe(filter((usuario) => !!usuario), switchMap((usuario) => {
      const adminTemporal = __spreadProps(__spreadValues({}, ADMIN_DEFAULT), {
        uid: usuario.uid,
        correo: usuario.email || "",
        usuario: usuario.email || "Administrador",
        nombres: usuario.email || "Administrador"
      });
      return combineLatest({
        empresa: this.dao.obtenerEmpresa$().pipe(startWith(EMPRESA_DEFAULT), catchError(() => of(EMPRESA_DEFAULT))),
        administrador: this.dao.obtenerUsuarioAdmin$(usuario.uid, usuario.email).pipe(catchError(() => of(adminTemporal))),
        modulos: this.dao.obtenerModulosAdmin$().pipe(startWith(MODULOS_DEFAULT), catchError(() => of(MODULOS_DEFAULT))),
        resumen: this.dao.obtenerResumenAdmin$().pipe(startWith(RESUMEN_DEFAULT), catchError(() => of(RESUMEN_DEFAULT))),
        notificacionesNoLeidas: this.notificacionService.contadorNoLeidas$.pipe(startWith(0), catchError(() => of(0)))
      }).pipe(map((data) => {
        const empresa = data.empresa || EMPRESA_DEFAULT;
        const administrador = data.administrador || adminTemporal;
        const resumen = __spreadProps(__spreadValues({}, data.resumen || RESUMEN_DEFAULT), {
          notificacionesNoLeidas: Number(data.notificacionesNoLeidas || 0)
        });
        const modulosBase = data.modulos && data.modulos.length > 0 ? data.modulos : MODULOS_DEFAULT;
        const modulosPanel = this.prepararModulosPanelPrincipal(modulosBase);
        const modulos = modulosPanel.filter((modulo) => modulo.activo).sort((a, b) => Number(a.orden || 0) - Number(b.orden || 0)).map((modulo) => __spreadProps(__spreadValues({}, modulo), {
          badgeValor: this.obtenerBadgeModulo(modulo.badgeTipo, resumen)
        }));
        return {
          empresa,
          administrador,
          resumen,
          modulos
        };
      }));
    }), catchError((error) => {
      console.error("[DashboardAdminService] Error al obtener panel admin:", error);
      return of(VM_DEFAULT);
    }), shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }
  prepararModulosPanelPrincipal(modulos) {
    const modulosNormalizados = (modulos || []).filter((modulo) => {
      const titulo = this.normalizarTexto(modulo.titulo);
      const ruta = this.normalizarRuta(modulo.ruta);
      return titulo !== "configuracion" && ruta !== "/configuracion-admin";
    }).map((modulo) => this.normalizarModuloAdmin(modulo));
    const sinDuplicados = /* @__PURE__ */ new Map();
    for (const modulo of modulosNormalizados) {
      const clave = this.normalizarTexto(modulo.titulo) || this.normalizarRuta(modulo.ruta);
      if (!clave) {
        continue;
      }
      if (!sinDuplicados.has(clave)) {
        sinDuplicados.set(clave, modulo);
      }
    }
    const resultado = Array.from(sinDuplicados.values());
    const existeFinanzas = resultado.some((modulo) => {
      const titulo = this.normalizarTexto(modulo.titulo);
      const ruta = this.normalizarRuta(modulo.ruta);
      return titulo === "finanzas" || titulo === "pagos" || ruta === "/finanzas" || ruta === "/pagos";
    });
    if (!existeFinanzas) {
      resultado.push(MODULO_FINANZAS);
    }
    return resultado;
  }
  normalizarModuloAdmin(modulo) {
    const titulo = this.normalizarTexto(modulo.titulo);
    const rutaOriginal = this.normalizarRuta(modulo.ruta);
    const rutaFinal = this.resolverRutaAdmin(titulo, rutaOriginal);
    const esFinanzas = titulo === "finanzas" || titulo === "pagos" || titulo === "pago" || rutaFinal === "/finanzas" || rutaFinal === "/pagos";
    if (esFinanzas) {
      return __spreadProps(__spreadValues(__spreadValues({}, MODULO_FINANZAS), modulo), {
        titulo: "Finanzas",
        ruta: "/finanzas",
        iconoUrl: modulo.iconoUrl || MODULO_FINANZAS.iconoUrl,
        orden: Number(modulo.orden || MODULO_FINANZAS.orden),
        activo: true,
        color: "verde",
        badgeTipo: modulo.badgeTipo || ""
      });
    }
    return __spreadProps(__spreadValues({}, modulo), {
      ruta: rutaFinal || rutaOriginal || "/dashboard-admin",
      activo: modulo.activo !== false,
      color: this.normalizarColorModulo(modulo.color),
      badgeTipo: modulo.badgeTipo || ""
    });
  }
  resolverRutaAdmin(titulo, ruta) {
    const rutas = {
      "/dashboard-admin": "/dashboard-admin",
      "dashboard": "/dashboard-admin",
      "inicio": "/dashboard-admin",
      "/trabajos": "/asignacion-trabajos",
      "/lista-trabajos": "/asignacion-trabajos",
      "/asignacion-trabajo": "/asignacion-trabajos",
      "/asignar-trabajos": "/asignacion-trabajos",
      "/trabajos-admin": "/asignacion-trabajos",
      "/asignacion-trabajos": "/asignacion-trabajos",
      "trabajos": "/asignacion-trabajos",
      "asignacion trabajos": "/asignacion-trabajos",
      "asignacion de trabajos": "/asignacion-trabajos",
      "/materiales": "/materiales",
      "/almacen": "/materiales",
      "/almacen-admin": "/materiales",
      "/materiales-admin": "/materiales",
      "almacen": "/materiales",
      "materiales": "/materiales",
      "/empleados": "/empleados",
      "/usuarios": "/empleados",
      "/personal": "/empleados",
      "/empleados-admin": "/empleados",
      "empleados": "/empleados",
      "usuarios": "/empleados",
      "personal": "/empleados",
      "/gps": "/gps",
      "/gps-admin": "/gps",
      "gps": "/gps",
      "/reportes": "/reportes",
      "/reportes-admin": "/reportes",
      "reportes": "/reportes",
      "/notificaciones": "/notificaciones-admin",
      "/notificaciones-admin": "/notificaciones-admin",
      "notificaciones": "/notificaciones-admin",
      "/devoluciones": "/devoluciones",
      "/reporte-devoluciones": "/devoluciones",
      "devoluciones": "/devoluciones",
      "/finanzas": "/finanzas",
      "/finanzas-admin": "/finanzas",
      "/pagos": "/finanzas",
      "/pago": "/finanzas",
      "/reporte-pagos": "/finanzas",
      "finanzas": "/finanzas",
      "pagos": "/finanzas",
      "pago": "/finanzas",
      "/mas": "/mas-admin",
      "/mas-admin": "/mas-admin",
      "/configuracion-admin": "/mas-admin",
      "mas": "/mas-admin",
      "configuracion": "/mas-admin",
      "/seguimiento": "/seguimiento-trabajos",
      "/seguimiento-admin": "/seguimiento-trabajos",
      "/seguimiento-trabajos": "/seguimiento-trabajos",
      "seguimiento": "/seguimiento-trabajos",
      "seguimiento de trabajos": "/seguimiento-trabajos",
      "/codigos": "/codigos-seguridad",
      "/codigos-admin": "/codigos-seguridad",
      "/codigos-de-seguridad": "/codigos-seguridad",
      "/seguridad": "/codigos-seguridad",
      "/codigos-seguridad": "/codigos-seguridad",
      "codigos": "/codigos-seguridad",
      "codigos de seguridad": "/codigos-seguridad"
    };
    return rutas[ruta] || rutas[titulo] || ruta;
  }
  normalizarRuta(valor) {
    let ruta = String(valor || "").trim().toLowerCase();
    if (!ruta) {
      return "";
    }
    if (!ruta.startsWith("/")) {
      ruta = `/${ruta}`;
    }
    return ruta.replace(/\/+/g, "/");
  }
  normalizarColorModulo(color) {
    const valor = String(color || "").trim().toLowerCase();
    if (valor === "verde" || valor === "gris" || valor === "azul") {
      return valor;
    }
    return "azul";
  }
  obtenerBadgeModulo(badgeTipo, resumen) {
    switch (badgeTipo) {
      case "notificaciones":
        return resumen.notificacionesNoLeidas;
      case "stock_bajo":
        return resumen.materialesStockBajo;
      case "trabajos_pendientes":
        return resumen.trabajosPendientes;
      default:
        return 0;
    }
  }
  normalizarTexto(valor) {
    return String(valor || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
};
_DashboardAdminService.\u0275fac = function DashboardAdminService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DashboardAdminService)();
};
_DashboardAdminService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DashboardAdminService, factory: _DashboardAdminService.\u0275fac, providedIn: "root" });
var DashboardAdminService = _DashboardAdminService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardAdminService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/shared/componentes/admin-header/admin-header.component.ts
function AdminHeaderComponent_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.notificaciones > 99 ? "99+" : ctx_r1.notificaciones, " ");
  }
}
function AdminHeaderComponent_img_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 11);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.fotoUrl, \u0275\u0275sanitizeUrl);
  }
}
function AdminHeaderComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 12);
  }
}
var _AdminHeaderComponent = class _AdminHeaderComponent {
  constructor() {
    this.navCtrl = inject(NavController);
    this.nombre = "Administrador";
    this.rol = "Administrador";
    this.fotoUrl = "";
    this.notificaciones = 0;
    this.menuClick = new EventEmitter();
    this.notificacionesClick = new EventEmitter();
    this.perfilClick = new EventEmitter();
    addIcons({
      "menu-outline": menuOutline,
      "notifications-outline": notificationsOutline,
      "person-circle-outline": personCircleOutline
    });
  }
  abrirMenu(event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.menuClick.emit();
  }
  abrirNotificaciones(event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.navCtrl.navigateRoot("/notificaciones-admin", {
      animated: false,
      replaceUrl: true
    });
  }
  abrirPerfil(event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.perfilClick.emit();
  }
};
_AdminHeaderComponent.\u0275fac = function AdminHeaderComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AdminHeaderComponent)();
};
_AdminHeaderComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminHeaderComponent, selectors: [["app-admin-header"]], inputs: { nombre: "nombre", rol: "rol", fotoUrl: "fotoUrl", notificaciones: "notificaciones" }, outputs: { menuClick: "menuClick", notificacionesClick: "notificacionesClick", perfilClick: "perfilClick" }, decls: 15, vars: 5, consts: [["perfilIcono", ""], [1, "top-header"], ["type", "button", "aria-label", "Abrir men\xFA", 1, "header-btn", 3, "click"], ["name", "menu-outline"], [1, "welcome-box"], ["type", "button", "aria-label", "Abrir notificaciones", 1, "header-btn", "notification-btn", 3, "click"], ["name", "notifications-outline"], ["class", "notification-badge", "aria-hidden", "true", 4, "ngIf"], ["type", "button", "aria-label", "Abrir perfil", 1, "profile-btn", 3, "click"], ["alt", "Perfil", 3, "src", 4, "ngIf", "ngIfElse"], ["aria-hidden", "true", 1, "notification-badge"], ["alt", "Perfil", 3, "src"], ["name", "person-circle-outline"]], template: function AdminHeaderComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 1)(1, "button", 2);
    \u0275\u0275listener("click", function AdminHeaderComponent_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.abrirMenu($event));
    });
    \u0275\u0275element(2, "ion-icon", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 4)(4, "h1");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 5);
    \u0275\u0275listener("click", function AdminHeaderComponent_Template_button_click_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.abrirNotificaciones($event));
    });
    \u0275\u0275element(9, "ion-icon", 6);
    \u0275\u0275template(10, AdminHeaderComponent_span_10_Template, 2, 1, "span", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 8);
    \u0275\u0275listener("click", function AdminHeaderComponent_Template_button_click_11_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.abrirPerfil($event));
    });
    \u0275\u0275template(12, AdminHeaderComponent_img_12_Template, 1, 1, "img", 9)(13, AdminHeaderComponent_ng_template_13_Template, 1, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const perfilIcono_r3 = \u0275\u0275reference(14);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\xA1Bienvenido, ", ctx.nombre, "!");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.rol);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx.notificaciones > 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx.fotoUrl)("ngIfElse", perfilIcono_r3);
  }
}, dependencies: [CommonModule, NgIf, IonicModule, IonIcon], styles: ["\n\n[_nghost-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 1000;\n  display: block;\n  width: 100%;\n  max-width: 430px;\n  margin: 0 auto;\n  background: #f5f7fa;\n}\n.top-header[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 76px;\n  background:\n    linear-gradient(\n      135deg,\n      #062b6f,\n      #0b3d91);\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 16px 14px 12px;\n  box-sizing: border-box;\n  position: relative;\n}\n.header-btn[_ngcontent-%COMP%], \n.profile-btn[_ngcontent-%COMP%] {\n  border: none;\n  outline: none;\n  background: transparent;\n  color: #ffffff;\n  padding: 0;\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n  pointer-events: auto;\n  cursor: pointer;\n  touch-action: manipulation;\n  position: relative;\n}\n.header-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n}\n.header-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 28px;\n  color: currentColor;\n  pointer-events: none;\n}\n.welcome-box[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.welcome-box[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15.5px;\n  font-weight: 800;\n  line-height: 1.1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.welcome-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 800;\n  color: #ffd166;\n}\n.notification-btn[_ngcontent-%COMP%] {\n  z-index: 20;\n  overflow: visible;\n}\n.notification-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 23px;\n}\n.notification-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -2px;\n  right: -2px;\n  min-width: 16px;\n  height: 16px;\n  padding: 0 4px;\n  background: #f04438;\n  color: #ffffff;\n  border-radius: 50px;\n  font-size: 10px;\n  font-weight: 800;\n  display: grid;\n  place-items: center;\n  border: 2px solid #062b6f;\n  pointer-events: none !important;\n  -webkit-user-select: none;\n  user-select: none;\n  z-index: 1;\n}\n.profile-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 50%;\n  overflow: hidden;\n}\n.profile-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 31px;\n  color: currentColor;\n  pointer-events: none;\n}\n.profile-btn[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  object-fit: cover;\n  border-radius: 50%;\n  border: 2px solid rgba(255, 255, 255, 0.7);\n  pointer-events: none;\n}\n/*# sourceMappingURL=admin-header.component.css.map */"] });
var AdminHeaderComponent = _AdminHeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminHeaderComponent, [{
    type: Component,
    args: [{ selector: "app-admin-header", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: `<!-- src/app/shared/componentes/admin-header/admin-header.component.html -->

<header class="top-header">

  <button
    type="button"
    class="header-btn"
    (click)="abrirMenu($event)"
    aria-label="Abrir men\xFA"
  >
    <ion-icon name="menu-outline"></ion-icon>
  </button>

  <div class="welcome-box">
    <h1>\xA1Bienvenido, {{ nombre }}!</h1>
    <p>{{ rol }}</p>
  </div>

  <button
    type="button"
    class="header-btn notification-btn"
    (click)="abrirNotificaciones($event)"
    aria-label="Abrir notificaciones"
  >
    <ion-icon name="notifications-outline"></ion-icon>

    <span
      class="notification-badge"
      *ngIf="notificaciones > 0"
      aria-hidden="true"
    >
      {{ notificaciones > 99 ? '99+' : notificaciones }}
    </span>
  </button>

  <button
    type="button"
    class="profile-btn"
    (click)="abrirPerfil($event)"
    aria-label="Abrir perfil"
  >
    <img
      *ngIf="fotoUrl; else perfilIcono"
      [src]="fotoUrl"
      alt="Perfil"
    />

    <ng-template #perfilIcono>
      <ion-icon name="person-circle-outline"></ion-icon>
    </ng-template>
  </button>

</header>`, styles: ["/* src/app/shared/componentes/admin-header/admin-header.component.css */\n:host {\n  position: sticky;\n  top: 0;\n  z-index: 1000;\n  display: block;\n  width: 100%;\n  max-width: 430px;\n  margin: 0 auto;\n  background: #f5f7fa;\n}\n.top-header {\n  width: 100%;\n  height: 76px;\n  background:\n    linear-gradient(\n      135deg,\n      #062b6f,\n      #0b3d91);\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 16px 14px 12px;\n  box-sizing: border-box;\n  position: relative;\n}\n.header-btn,\n.profile-btn {\n  border: none;\n  outline: none;\n  background: transparent;\n  color: #ffffff;\n  padding: 0;\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n  pointer-events: auto;\n  cursor: pointer;\n  touch-action: manipulation;\n  position: relative;\n}\n.header-btn {\n  width: 34px;\n  height: 34px;\n}\n.header-btn ion-icon {\n  display: block;\n  font-size: 28px;\n  color: currentColor;\n  pointer-events: none;\n}\n.welcome-box {\n  flex: 1;\n  min-width: 0;\n}\n.welcome-box h1 {\n  margin: 0;\n  font-size: 15.5px;\n  font-weight: 800;\n  line-height: 1.1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.welcome-box p {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 800;\n  color: #ffd166;\n}\n.notification-btn {\n  z-index: 20;\n  overflow: visible;\n}\n.notification-btn ion-icon {\n  font-size: 23px;\n}\n.notification-badge {\n  position: absolute;\n  top: -2px;\n  right: -2px;\n  min-width: 16px;\n  height: 16px;\n  padding: 0 4px;\n  background: #f04438;\n  color: #ffffff;\n  border-radius: 50px;\n  font-size: 10px;\n  font-weight: 800;\n  display: grid;\n  place-items: center;\n  border: 2px solid #062b6f;\n  pointer-events: none !important;\n  -webkit-user-select: none;\n  user-select: none;\n  z-index: 1;\n}\n.profile-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 50%;\n  overflow: hidden;\n}\n.profile-btn ion-icon {\n  display: block;\n  font-size: 31px;\n  color: currentColor;\n  pointer-events: none;\n}\n.profile-btn img {\n  width: 32px;\n  height: 32px;\n  object-fit: cover;\n  border-radius: 50%;\n  border: 2px solid rgba(255, 255, 255, 0.7);\n  pointer-events: none;\n}\n/*# sourceMappingURL=admin-header.component.css.map */\n"] }]
  }], () => [], { nombre: [{
    type: Input
  }], rol: [{
    type: Input
  }], fotoUrl: [{
    type: Input
  }], notificaciones: [{
    type: Input
  }], menuClick: [{
    type: Output
  }], notificacionesClick: [{
    type: Output
  }], perfilClick: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminHeaderComponent, { className: "AdminHeaderComponent", filePath: "src/app/shared/componentes/admin-header/admin-header.component.ts", lineNumber: 24 });
})();

// src/app/shared/componentes/admin-bottom-nav/admin-bottom-nav.component.ts
var _AdminBottomNavComponent = class _AdminBottomNavComponent {
  constructor() {
    this.navCtrl = inject(NavController);
    this.toastCtrl = inject(ToastController);
    this.activo = "inicio";
  }
  irInicio() {
    this.navCtrl.navigateRoot("/dashboard-admin", {
      animated: false,
      replaceUrl: true
    });
  }
  irAlmacen() {
    this.navCtrl.navigateRoot("/materiales", {
      animated: false,
      replaceUrl: true
    });
  }
  irTrabajos() {
    this.navCtrl.navigateRoot("/asignacion-trabajos", {
      animated: false,
      replaceUrl: true
    });
  }
  irReportes() {
    this.navCtrl.navigateRoot("/reportes", {
      animated: false,
      replaceUrl: true
    });
  }
  irMas() {
    this.navCtrl.navigateRoot("/mas-admin", {
      animated: false,
      replaceUrl: true
    });
  }
  mostrarToast(message) {
    return __async(this, null, function* () {
      const toast = yield this.toastCtrl.create({
        message,
        duration: 2200,
        position: "top",
        color: "primary"
      });
      yield toast.present();
    });
  }
};
_AdminBottomNavComponent.\u0275fac = function AdminBottomNavComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AdminBottomNavComponent)();
};
_AdminBottomNavComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminBottomNavComponent, selectors: [["app-admin-bottom-nav"]], inputs: { activo: "activo" }, decls: 21, vars: 10, consts: [[1, "bottom-nav"], ["type", "button", 1, "nav-item", 3, "click"], ["name", "home"], ["name", "cube-outline"], ["name", "clipboard-outline"], ["name", "bar-chart-outline"], ["name", "ellipsis-horizontal"]], template: function AdminBottomNavComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nav", 0)(1, "button", 1);
    \u0275\u0275listener("click", function AdminBottomNavComponent_Template_button_click_1_listener() {
      return ctx.irInicio();
    });
    \u0275\u0275element(2, "ion-icon", 2);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Inicio");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 1);
    \u0275\u0275listener("click", function AdminBottomNavComponent_Template_button_click_5_listener() {
      return ctx.irAlmacen();
    });
    \u0275\u0275element(6, "ion-icon", 3);
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8, "Almac\xE9n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 1);
    \u0275\u0275listener("click", function AdminBottomNavComponent_Template_button_click_9_listener() {
      return ctx.irTrabajos();
    });
    \u0275\u0275element(10, "ion-icon", 4);
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12, "Trabajos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 1);
    \u0275\u0275listener("click", function AdminBottomNavComponent_Template_button_click_13_listener() {
      return ctx.irReportes();
    });
    \u0275\u0275element(14, "ion-icon", 5);
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "Reportes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "button", 1);
    \u0275\u0275listener("click", function AdminBottomNavComponent_Template_button_click_17_listener() {
      return ctx.irMas();
    });
    \u0275\u0275element(18, "ion-icon", 6);
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "M\xE1s");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx.activo === "inicio");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx.activo === "almacen");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx.activo === "trabajos");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx.activo === "reportes");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx.activo === "mas");
  }
}, dependencies: [
  CommonModule,
  IonicModule,
  IonIcon
], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.bottom-nav[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 50%;\n  right: auto;\n  bottom: 0;\n  transform: translateX(-50%);\n  width: 100%;\n  max-width: 430px;\n  height: 68px;\n  background: #ffffff;\n  border-top: 1px solid #e9edf3;\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  padding: 6px 4px 8px;\n  box-sizing: border-box;\n  z-index: 100;\n}\n.nav-item[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 3px;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 0;\n}\n.nav-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.nav-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 800;\n}\n.nav-item.active[_ngcontent-%COMP%] {\n  color: #1759e8;\n}\n/*# sourceMappingURL=admin-bottom-nav.component.css.map */"] });
var AdminBottomNavComponent = _AdminBottomNavComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminBottomNavComponent, [{
    type: Component,
    args: [{ selector: "app-admin-bottom-nav", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: `<nav class="bottom-nav">

  <button
    type="button"
    class="nav-item"
    [class.active]="activo === 'inicio'"
    (click)="irInicio()"
  >
    <ion-icon name="home"></ion-icon>
    <span>Inicio</span>
  </button>

  <button
    type="button"
    class="nav-item"
    [class.active]="activo === 'almacen'"
    (click)="irAlmacen()"
  >
    <ion-icon name="cube-outline"></ion-icon>
    <span>Almac\xE9n</span>
  </button>

  <button
    type="button"
    class="nav-item"
    [class.active]="activo === 'trabajos'"
    (click)="irTrabajos()"
  >
    <ion-icon name="clipboard-outline"></ion-icon>
    <span>Trabajos</span>
  </button>

  <button
    type="button"
    class="nav-item"
    [class.active]="activo === 'reportes'"
    (click)="irReportes()"
  >
    <ion-icon name="bar-chart-outline"></ion-icon>
    <span>Reportes</span>
  </button>

  <button
    type="button"
    class="nav-item"
    [class.active]="activo === 'mas'"
    (click)="irMas()"
  >
    <ion-icon name="ellipsis-horizontal"></ion-icon>
    <span>M\xE1s</span>
  </button>

</nav>
`, styles: ["/* src/app/shared/componentes/admin-bottom-nav/admin-bottom-nav.component.css */\n:host {\n  display: block;\n}\n.bottom-nav {\n  position: fixed;\n  left: 50%;\n  right: auto;\n  bottom: 0;\n  transform: translateX(-50%);\n  width: 100%;\n  max-width: 430px;\n  height: 68px;\n  background: #ffffff;\n  border-top: 1px solid #e9edf3;\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  padding: 6px 4px 8px;\n  box-sizing: border-box;\n  z-index: 100;\n}\n.nav-item {\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 3px;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 0;\n}\n.nav-item ion-icon {\n  font-size: 20px;\n}\n.nav-item span {\n  font-size: 10px;\n  font-weight: 800;\n}\n.nav-item.active {\n  color: #1759e8;\n}\n/*# sourceMappingURL=admin-bottom-nav.component.css.map */\n"] }]
  }], null, { activo: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminBottomNavComponent, { className: "AdminBottomNavComponent", filePath: "src/app/shared/componentes/admin-bottom-nav/admin-bottom-nav.component.ts", lineNumber: 27 });
})();

export {
  NotificacionDAO,
  NotificacionService,
  DashboardAdminService,
  AdminHeaderComponent,
  AdminBottomNavComponent
};
//# sourceMappingURL=chunk-CWBZAVOG.js.map
