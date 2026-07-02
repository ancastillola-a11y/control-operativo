import {
  AdminSummaryCardComponent
} from "./chunk-XIEUEHEY.js";
import {
  AdminEmptyStateComponent
} from "./chunk-SVPM23ZW.js";
import {
  AdminBottomNavComponent,
  AdminHeaderComponent,
  DashboardAdminService
} from "./chunk-CWBZAVOG.js";
import {
  IonContent,
  IonIcon,
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
  archiveOutline,
  barChartOutline,
  chevronForwardOutline,
  clipboardOutline,
  documentTextOutline,
  notificationsOutline,
  peopleOutline,
  personOutline,
  readerOutline,
  warningOutline
} from "./chunk-XEVVVGO7.js";
import {
  Firestore,
  collection,
  collectionData,
  limit,
  orderBy,
  query
} from "./chunk-NMRAWXHA.js";
import {
  AsyncPipe,
  ChangeDetectorRef,
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
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate
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
  __async
} from "./chunk-Q3N56TRI.js";

// src/app/dao/reporte-admin.dao.ts
var _ReporteAdminDAO = class _ReporteAdminDAO {
  constructor() {
    this.firestore = inject(Firestore);
  }
  escucharTrabajos() {
    const ref = collection(this.firestore, "trabajos");
    return collectionData(ref, {
      idField: "uid"
    });
  }
  escucharMateriales() {
    const ref = collection(this.firestore, "materiales");
    return collectionData(ref, {
      idField: "uid"
    });
  }
  escucharEmpleados() {
    const ref = collection(this.firestore, "empleados");
    return collectionData(ref, {
      idField: "uid"
    });
  }
  escucharDevoluciones() {
    const ref = collection(this.firestore, "devoluciones");
    return collectionData(ref, {
      idField: "uid"
    });
  }
  escucharHistorialReciente() {
    const ref = collection(this.firestore, "historial_actividades");
    const consulta = query(ref, orderBy("creadoEn", "desc"), limit(8));
    return collectionData(consulta, {
      idField: "uid"
    });
  }
};
_ReporteAdminDAO.\u0275fac = function ReporteAdminDAO_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ReporteAdminDAO)();
};
_ReporteAdminDAO.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReporteAdminDAO, factory: _ReporteAdminDAO.\u0275fac, providedIn: "root" });
var ReporteAdminDAO = _ReporteAdminDAO;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReporteAdminDAO, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/procesos/reporte-admin.service.ts
var _ReporteAdminService = class _ReporteAdminService {
  constructor() {
    this.dao = inject(ReporteAdminDAO);
    this.vm$ = combineLatest([
      this.dao.escucharTrabajos().pipe(catchError(() => of([]))),
      this.dao.escucharMateriales().pipe(catchError(() => of([]))),
      this.dao.escucharEmpleados().pipe(catchError(() => of([]))),
      this.dao.escucharDevoluciones().pipe(catchError(() => of([]))),
      this.dao.escucharHistorialReciente().pipe(catchError(() => of([])))
    ]).pipe(map(([trabajos, materiales, empleados, devoluciones, historial]) => {
      const resumen = this.construirResumen(trabajos, materiales, empleados, devoluciones, historial);
      return {
        modulos: this.obtenerModulos(),
        resumen,
        actividadesRecientes: this.mapearActividades(historial)
      };
    }), catchError((error) => {
      console.error("[ReporteAdminService] Error al construir VM:", error);
      return of({
        modulos: this.obtenerModulos(),
        resumen: this.obtenerResumenVacio(),
        actividadesRecientes: []
      });
    }), shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }
  obtenerModulos() {
    return [
      {
        tipo: "trabajos",
        titulo: "Trabajos",
        descripcion: "Estados, avance y trabajos realizados.",
        icono: "clipboard-outline",
        ruta: "/reporte-trabajos",
        disponible: true,
        color: "azul"
      },
      {
        tipo: "materiales",
        titulo: "Materiales usados",
        descripcion: "Materiales asignados, usados y devueltos.",
        icono: "archive-outline",
        ruta: "/reporte-materiales",
        disponible: true,
        color: "verde"
      },
      {
        tipo: "pagos",
        titulo: "Pagos",
        descripcion: "Pagos registrados, pendientes y parciales.",
        icono: "person-outline",
        ruta: "/finanzas",
        disponible: true,
        color: "naranja"
      },
      {
        tipo: "devoluciones",
        titulo: "Devoluciones",
        descripcion: "Devoluciones pendientes y realizadas.",
        icono: "document-text-outline",
        ruta: "/devoluciones",
        disponible: true,
        color: "morado"
      },
      {
        tipo: "empleados",
        titulo: "Empleados",
        descripcion: "Trabajos asignados por personal.",
        icono: "people-outline",
        ruta: "/reporte-empleados",
        disponible: true,
        color: "verde"
      },
      {
        tipo: "historial",
        titulo: "Historial general",
        descripcion: "Actividades registradas en el sistema.",
        icono: "reader-outline",
        ruta: "/notificaciones-admin",
        disponible: true,
        color: "gris"
      }
    ];
  }
  construirResumen(trabajos, materiales, empleados, devoluciones, historial) {
    const trabajosActivos = (trabajos || []).filter((item) => this.esRegistroActivo(item));
    const materialesActivos = (materiales || []).filter((item) => this.esRegistroActivo(item));
    const empleadosActivos = (empleados || []).filter((item) => this.esEmpleadoActivo(item));
    const devolucionesActivas = (devoluciones || []).filter((item) => this.esRegistroActivo(item));
    const pendientes = trabajosActivos.filter((item) => {
      const estado = this.normalizarEstadoTrabajo(item?.estado || item?.estadoTrabajo);
      return estado === "pendiente" || estado === "asignado";
    }).length;
    const enProceso = trabajosActivos.filter((item) => {
      const estado = this.normalizarEstadoTrabajo(item?.estado || item?.estadoTrabajo);
      return estado === "en_camino" || estado === "en_proceso";
    }).length;
    const finalizados = trabajosActivos.filter((item) => {
      const estado = this.normalizarEstadoTrabajo(item?.estado || item?.estadoTrabajo);
      return estado === "finalizado" || estado === "cerrado" || estado === "devolucion_realizada";
    }).length;
    const materialesStockBajo = materialesActivos.filter((item) => Number(item?.stockActual || 0) <= Number(item?.stockMinimo || 0)).length;
    const empleadosInferidos = this.contarEmpleadosDesdeTrabajos(trabajosActivos);
    return {
      totalTrabajos: trabajosActivos.length,
      pendientes,
      enProceso,
      finalizados,
      totalMateriales: materialesActivos.length,
      materialesStockBajo,
      totalEmpleados: Math.max(empleadosActivos.length, empleadosInferidos),
      totalDevoluciones: devolucionesActivas.length,
      totalActividades: (historial || []).filter((item) => this.esRegistroActivo(item)).length,
      periodoTexto: "Este mes"
    };
  }
  obtenerResumenVacio() {
    return {
      totalTrabajos: 0,
      pendientes: 0,
      enProceso: 0,
      finalizados: 0,
      totalMateriales: 0,
      materialesStockBajo: 0,
      totalEmpleados: 0,
      totalDevoluciones: 0,
      totalActividades: 0,
      periodoTexto: "Este mes"
    };
  }
  mapearActividades(items) {
    return (items || []).filter((item) => this.esRegistroActivo(item)).slice(0, 5).map((item, index) => {
      const modulo = String(item?.modulo || item?.origen || "general").trim();
      const tipo = String(item?.tipo || "actividad").trim();
      return {
        uid: String(item?.uid || item?.id || index),
        modulo,
        tipo,
        titulo: String(item?.titulo || this.obtenerTituloActividad(tipo)).trim(),
        descripcion: String(item?.descripcion || item?.mensaje || "Actividad registrada en el sistema.").trim(),
        fechaTexto: this.formatearFechaRelativa(item?.creadoEn || item?.fecha),
        icono: this.obtenerIconoActividad(tipo, modulo),
        clase: this.obtenerClaseActividad(tipo, modulo)
      };
    });
  }
  esRegistroActivo(item) {
    if (!item) {
      return false;
    }
    if (item?.eliminado === true || item?.eliminada === true) {
      return false;
    }
    if (String(item?.estado || "").trim().toLowerCase() === "eliminado") {
      return false;
    }
    return true;
  }
  esEmpleadoActivo(item) {
    if (!this.esRegistroActivo(item)) {
      return false;
    }
    if (item?.activo === false) {
      return false;
    }
    if (item?.habilitado === false) {
      return false;
    }
    return true;
  }
  contarEmpleadosDesdeTrabajos(trabajos) {
    const empleados = /* @__PURE__ */ new Set();
    (trabajos || []).forEach((trabajo) => {
      const empleadosRaw = trabajo?.empleadosAsignados || trabajo?.empleados || trabajo?.empleadosIds || [];
      if (!Array.isArray(empleadosRaw)) {
        return;
      }
      empleadosRaw.forEach((empleado) => {
        if (typeof empleado === "string") {
          const id = empleado.trim();
          if (id) {
            empleados.add(id);
          }
          return;
        }
        const nombre = String(empleado?.uid || empleado?.id || empleado?.nombreCompleto || empleado?.nombres || empleado?.nombre || empleado?.empleadoNombre || empleado?.correo || "").trim();
        if (nombre) {
          empleados.add(nombre);
        }
      });
    });
    return empleados.size;
  }
  normalizarEstadoTrabajo(estado) {
    const valor = String(estado || "pendiente").trim().toLowerCase();
    if (valor === "en camino" || valor === "en_camino" || valor === "encamino") {
      return "en_camino";
    }
    if (valor === "en proceso" || valor === "en_proceso" || valor === "proceso") {
      return "en_proceso";
    }
    if (valor === "devolucion pendiente" || valor === "devolucion_pendiente") {
      return "devolucion_pendiente";
    }
    if (valor === "devolucion realizada" || valor === "devolucion_realizada") {
      return "devolucion_realizada";
    }
    if (valor === "terminado") {
      return "finalizado";
    }
    return valor || "pendiente";
  }
  obtenerTituloActividad(tipo) {
    const mapa = {
      trabajo_creado: "Nuevo trabajo registrado",
      cambio_estado_trabajo: "Cambio de estado",
      stock_bajo: "Stock bajo",
      devolucion_validada: "Devoluci\xF3n validada",
      devolucion_realizada: "Devoluci\xF3n realizada",
      material_creado: "Nuevo material registrado",
      empleado_creado: "Nuevo empleado registrado"
    };
    return mapa[tipo] || "Actividad registrada";
  }
  obtenerIconoActividad(tipo, modulo) {
    const texto = (tipo + " " + modulo).toLowerCase();
    if (texto.includes("trabajo")) {
      return "clipboard-outline";
    }
    if (texto.includes("stock") || texto.includes("material")) {
      return "warning-outline";
    }
    if (texto.includes("devolucion") || texto.includes("devoluci\xF3n")) {
      return "document-text-outline";
    }
    if (texto.includes("empleado")) {
      return "people-outline";
    }
    return "reader-outline";
  }
  obtenerClaseActividad(tipo, modulo) {
    const texto = (tipo + " " + modulo).toLowerCase();
    if (texto.includes("stock")) {
      return "warning";
    }
    if (texto.includes("devolucion") || texto.includes("devoluci\xF3n")) {
      return "morado";
    }
    if (texto.includes("trabajo")) {
      return "azul";
    }
    if (texto.includes("empleado")) {
      return "verde";
    }
    return "gris";
  }
  formatearFechaRelativa(valor) {
    const fecha = this.convertirFecha(valor);
    if (!fecha) {
      return "Hoy";
    }
    const ahora = Date.now();
    const diferencia = Math.max(0, ahora - fecha.getTime());
    const minutos = Math.floor(diferencia / 6e4);
    const horas = Math.floor(diferencia / 36e5);
    const dias = Math.floor(diferencia / 864e5);
    if (minutos < 1) {
      return "Ahora";
    }
    if (minutos < 60) {
      return "Hace " + minutos + " min";
    }
    if (horas < 24) {
      return "Hace " + horas + " h";
    }
    if (dias < 7) {
      return "Hace " + dias + " d";
    }
    return fecha.toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  }
  convertirFecha(valor) {
    if (!valor) {
      return null;
    }
    if (valor instanceof Date && !Number.isNaN(valor.getTime())) {
      return valor;
    }
    if (typeof valor?.toDate === "function") {
      const fecha = valor.toDate();
      if (fecha instanceof Date && !Number.isNaN(fecha.getTime())) {
        return fecha;
      }
    }
    if (typeof valor?.seconds === "number") {
      const fecha = new Date(valor.seconds * 1e3);
      if (!Number.isNaN(fecha.getTime())) {
        return fecha;
      }
    }
    if (typeof valor === "string") {
      const fecha = new Date(valor);
      if (!Number.isNaN(fecha.getTime())) {
        return fecha;
      }
    }
    return null;
  }
};
_ReporteAdminService.\u0275fac = function ReporteAdminService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ReporteAdminService)();
};
_ReporteAdminService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReporteAdminService, factory: _ReporteAdminService.\u0275fac, providedIn: "root" });
var ReporteAdminService = _ReporteAdminService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReporteAdminService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/paginas/administrador/reportes/reportes.page.ts
function ReportesPage_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "app-admin-header", 4);
    \u0275\u0275listener("menuClick", function ReportesPage_ng_container_1_Template_app_admin_header_menuClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirMenu());
    })("notificacionesClick", function ReportesPage_ng_container_1_Template_app_admin_header_notificacionesClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirNotificaciones());
    })("perfilClick", function ReportesPage_ng_container_1_Template_app_admin_header_perfilClick_1_listener() {
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
    \u0275\u0275property("nombre", adminVm_r3.administrador.nombres || adminVm_r3.administrador.usuario || adminVm_r3.administrador.correo || "Administrador")("rol", "Administrador")("fotoUrl", adminVm_r3.administrador.fotoUrl || "")("notificaciones", adminVm_r3.resumen.notificacionesNoLeidas || 0);
  }
}
function ReportesPage_ng_container_3_section_8_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function ReportesPage_ng_container_3_section_8_button_1_Template_button_click_0_listener() {
      const modulo_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.abrirModulo(modulo_r5));
    });
    \u0275\u0275elementStart(1, "div", 20);
    \u0275\u0275element(2, "ion-icon", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 22)(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(8, "ion-icon", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const modulo_r5 = ctx.$implicit;
    \u0275\u0275property("ngClass", modulo_r5.color);
    \u0275\u0275advance(2);
    \u0275\u0275property("name", modulo_r5.icono);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(modulo_r5.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(modulo_r5.descripcion);
  }
}
function ReportesPage_ng_container_3_section_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 17);
    \u0275\u0275template(1, ReportesPage_ng_container_3_section_8_button_1_Template, 9, 4, "button", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r6 = \u0275\u0275nextContext().ngIf;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", vm_r6.modulos)("ngForTrackBy", ctx_r1.trackByModulo);
  }
}
function ReportesPage_ng_container_3_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-admin-empty-state", 24);
  }
}
function ReportesPage_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "main", 5)(2, "section", 6)(3, "div")(4, "h2");
    \u0275\u0275text(5, "Reportes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Consulta todos los reportes operativos del sistema.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(8, ReportesPage_ng_container_3_section_8_Template, 2, 2, "section", 7)(9, ReportesPage_ng_container_3_ng_template_9_Template, 1, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(11, "section", 8)(12, "div")(13, "h3");
    \u0275\u0275text(14, "Resumen general");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "section", 9);
    \u0275\u0275element(18, "app-admin-summary-card", 10)(19, "app-admin-summary-card", 11)(20, "app-admin-summary-card", 12)(21, "app-admin-summary-card", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "section", 14)(23, "div", 15)(24, "span");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "p");
    \u0275\u0275text(27, "Materiales");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 16)(29, "span");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "p");
    \u0275\u0275text(32, "Stock bajo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 15)(34, "span");
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "p");
    \u0275\u0275text(37, "Empleados");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 15)(39, "span");
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "p");
    \u0275\u0275text(42, "Devoluciones");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const vm_r6 = ctx.ngIf;
    const sinReportes_r7 = \u0275\u0275reference(10);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", vm_r6.modulos.length > 0)("ngIfElse", sinReportes_r7);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(vm_r6.resumen.periodoTexto);
    \u0275\u0275advance(2);
    \u0275\u0275property("valor", vm_r6.resumen.totalTrabajos);
    \u0275\u0275advance();
    \u0275\u0275property("valor", vm_r6.resumen.pendientes);
    \u0275\u0275advance();
    \u0275\u0275property("valor", vm_r6.resumen.enProceso);
    \u0275\u0275advance();
    \u0275\u0275property("valor", vm_r6.resumen.finalizados);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(vm_r6.resumen.totalMateriales);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(vm_r6.resumen.materialesStockBajo);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(vm_r6.resumen.totalEmpleados);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(vm_r6.resumen.totalDevoluciones);
  }
}
var _ReportesPage = class _ReportesPage {
  constructor() {
    this.navCtrl = inject(NavController);
    this.toastCtrl = inject(ToastController);
    this.cdr = inject(ChangeDetectorRef);
    this.dashboardAdminService = inject(DashboardAdminService);
    this.reporteAdminService = inject(ReporteAdminService);
    this.adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
    this.vm$ = this.reporteAdminService.vm$;
    addIcons({
      "archive-outline": archiveOutline,
      "bar-chart-outline": barChartOutline,
      "chevron-forward-outline": chevronForwardOutline,
      "clipboard-outline": clipboardOutline,
      "document-text-outline": documentTextOutline,
      "notifications-outline": notificationsOutline,
      "people-outline": peopleOutline,
      "person-outline": personOutline,
      "reader-outline": readerOutline,
      "warning-outline": warningOutline
    });
  }
  ionViewWillEnter() {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
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
  abrirModulo(modulo) {
    if (!modulo.ruta) {
      this.mostrarToast("Ruta de reporte no configurada.", "danger");
      return;
    }
    this.navCtrl.navigateRoot(modulo.ruta, {
      animated: false,
      replaceUrl: true
    });
  }
  trackByModulo(index, modulo) {
    return modulo.tipo || String(index);
  }
  mostrarToast(message, color = "primary") {
    return __async(this, null, function* () {
      const toast = yield this.toastCtrl.create({
        message,
        duration: 2300,
        position: "top",
        color
      });
      yield toast.present();
    });
  }
};
_ReportesPage.\u0275fac = function ReportesPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ReportesPage)();
};
_ReportesPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReportesPage, selectors: [["app-reportes"]], decls: 6, vars: 7, consts: [["sinReportes", ""], [1, "reportes-root", 3, "fullscreen"], [4, "ngIf"], ["activo", "reportes"], [3, "menuClick", "notificacionesClick", "perfilClick", "nombre", "rol", "fotoUrl", "notificaciones"], [1, "reportes-container"], [1, "page-title-row"], ["class", "reportes-grid", 4, "ngIf", "ngIfElse"], [1, "resumen-header"], [1, "summary-grid"], ["titulo", "Trabajos", "icono", "clipboard-outline", "tipo", "total", 3, "valor"], ["titulo", "Pendientes", "icono", "warning-outline", "tipo", "danger", 3, "valor"], ["titulo", "En proceso", "icono", "bar-chart-outline", "tipo", "success", 3, "valor"], ["titulo", "Finalizados", "icono", "document-text-outline", "tipo", "total", 3, "valor"], [1, "extra-summary"], [1, "extra-card"], [1, "extra-card", "danger"], [1, "reportes-grid"], ["type", "button", "class", "reporte-card", 3, "ngClass", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "reporte-card", 3, "click", "ngClass"], [1, "reporte-icon"], [3, "name"], [1, "reporte-info"], ["name", "chevron-forward-outline", 1, "reporte-arrow"], ["icono", "bar-chart-outline", "titulo", "Sin reportes", "descripcion", "No hay reportes disponibles por el momento."]], template: function ReportesPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 1);
    \u0275\u0275template(1, ReportesPage_ng_container_1_Template, 2, 4, "ng-container", 2);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275template(3, ReportesPage_ng_container_3_Template, 43, 11, "ng-container", 2);
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
  AdminSummaryCardComponent,
  AdminEmptyStateComponent,
  AsyncPipe
], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  font-family: var(--font-main, "Inter", sans-serif);\n}\nion-content.reportes-root[_ngcontent-%COMP%] {\n  --background: var(--color-page-outside, #e5e7eb);\n}\n.reportes-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: var(--app-width, 430px);\n  min-height: 100dvh;\n  margin: 0 auto;\n  padding: 14px 14px calc(105px + env(safe-area-inset-bottom));\n  background: var(--color-background, #f5f7fa);\n}\n.page-title-row[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.page-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 950;\n  color: #111827;\n}\n.page-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 11.5px;\n  font-weight: 700;\n  color: #64748b;\n}\n.reportes-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px;\n  margin-bottom: 16px;\n}\n.reporte-card[_ngcontent-%COMP%] {\n  min-height: 106px;\n  border: 1px solid #dbe3ef;\n  border-radius: 16px;\n  background: #ffffff;\n  display: grid;\n  grid-template-columns: 42px minmax(0, 1fr) 16px;\n  align-items: center;\n  gap: 8px;\n  padding: 10px;\n  text-align: left;\n  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.07);\n}\n.reporte-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n.reporte-icon[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 13px;\n  display: grid;\n  place-items: center;\n  background: #e8eef8;\n  color: #0b3d91;\n}\n.reporte-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 22px;\n  color: currentColor;\n}\n.reporte-info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.reporte-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 12px;\n  font-weight: 950;\n  color: #0f172a;\n  line-height: 1.15;\n}\n.reporte-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 10px;\n  font-weight: 650;\n  color: #64748b;\n  line-height: 1.2;\n}\n.reporte-status[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 20px;\n  margin-top: 7px;\n  padding: 3px 8px;\n  border-radius: 999px;\n  background: #dcfce7;\n  color: #15803d;\n  font-size: 9px;\n  font-weight: 900;\n}\n.reporte-arrow[_ngcontent-%COMP%] {\n  font-size: 17px;\n  color: #0b3d91;\n}\n.reporte-card.azul[_ngcontent-%COMP%]   .reporte-icon[_ngcontent-%COMP%] {\n  background: #e8eef8;\n  color: #0b3d91;\n}\n.reporte-card.verde[_ngcontent-%COMP%]   .reporte-icon[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #16a34a;\n}\n.reporte-card.naranja[_ngcontent-%COMP%]   .reporte-icon[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #d97706;\n}\n.reporte-card.morado[_ngcontent-%COMP%]   .reporte-icon[_ngcontent-%COMP%] {\n  background: #ede9fe;\n  color: #7c3aed;\n}\n.reporte-card.gris[_ngcontent-%COMP%]   .reporte-icon[_ngcontent-%COMP%] {\n  background: #eef2f7;\n  color: #475569;\n}\n.resumen-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin: 4px 0 10px;\n}\n.resumen-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 950;\n  color: #111827;\n}\n.resumen-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 700;\n  color: #64748b;\n}\n.summary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 7px;\n  margin-bottom: 12px;\n}\n.extra-summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 7px;\n  margin-bottom: 14px;\n}\n.extra-card[_ngcontent-%COMP%] {\n  min-height: 58px;\n  border-radius: 13px;\n  border: 1px solid #dbe3ef;\n  background: #ffffff;\n  display: grid;\n  place-items: center;\n  text-align: center;\n  padding: 8px 4px;\n}\n.extra-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 15px;\n  font-weight: 950;\n  color: #0b3d91;\n}\n.extra-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 2px 0 0;\n  font-size: 9.5px;\n  font-weight: 800;\n  color: #64748b;\n}\n.extra-card.danger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #b42318;\n}\n.report-note[_ngcontent-%COMP%] {\n  border-radius: 16px;\n  background: #ffffff;\n  border: 1px solid #dbe3ef;\n  padding: 13px;\n  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);\n}\n.report-note[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #111827;\n  font-size: 13px;\n  font-weight: 950;\n}\n.report-note[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 5px 0 0;\n  color: #64748b;\n  font-size: 11px;\n  font-weight: 700;\n  line-height: 1.35;\n}\n@media (max-width: 360px) {\n  .reportes-container[_ngcontent-%COMP%] {\n    padding-left: 10px;\n    padding-right: 10px;\n  }\n  .reportes-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .summary-grid[_ngcontent-%COMP%], \n   .extra-summary[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n/*# sourceMappingURL=reportes.page.css.map */'] });
var ReportesPage = _ReportesPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReportesPage, [{
    type: Component,
    args: [{ selector: "app-reportes", standalone: true, imports: [
      CommonModule,
      IonicModule,
      AdminHeaderComponent,
      AdminBottomNavComponent,
      AdminSummaryCardComponent,
      AdminEmptyStateComponent
    ], template: `<!-- src/app/paginas/administrador/reportes/reportes.page.html -->
<ion-content [fullscreen]="true" class="reportes-root">

  <ng-container *ngIf="adminVm$ | async as adminVm">
    <app-admin-header
      [nombre]="adminVm.administrador.nombres || adminVm.administrador.usuario || adminVm.administrador.correo || 'Administrador'"
      [rol]="'Administrador'"
      [fotoUrl]="adminVm.administrador.fotoUrl || ''"
      [notificaciones]="adminVm.resumen.notificacionesNoLeidas || 0"
      (menuClick)="abrirMenu()"
      (notificacionesClick)="abrirNotificaciones()"
      (perfilClick)="abrirPerfil()"
    ></app-admin-header>
  </ng-container>

  <ng-container *ngIf="vm$ | async as vm">

    <main class="reportes-container">

      <section class="page-title-row">
        <div>
          <h2>Reportes</h2>
          <p>Consulta todos los reportes operativos del sistema.</p>
        </div>
      </section>

      <section
        class="reportes-grid"
        *ngIf="vm.modulos.length > 0; else sinReportes"
      >

        <button
          type="button"
          class="reporte-card"
          *ngFor="let modulo of vm.modulos; trackBy: trackByModulo"
          [ngClass]="modulo.color"
          (click)="abrirModulo(modulo)"
        >

          <div class="reporte-icon">
            <ion-icon [name]="modulo.icono"></ion-icon>
          </div>

          <div class="reporte-info">
            <h3>{{ modulo.titulo }}</h3>
            <p>{{ modulo.descripcion }}</p>

           
          </div>

          <ion-icon
            name="chevron-forward-outline"
            class="reporte-arrow"
          ></ion-icon>

        </button>

      </section>

      <ng-template #sinReportes>
        <app-admin-empty-state
          icono="bar-chart-outline"
          titulo="Sin reportes"
          descripcion="No hay reportes disponibles por el momento."
        ></app-admin-empty-state>
      </ng-template>

      <section class="resumen-header">
        <div>
          <h3>Resumen general</h3>
          <p>{{ vm.resumen.periodoTexto }}</p>
        </div>
      </section>

      <section class="summary-grid">

        <app-admin-summary-card
          titulo="Trabajos"
          [valor]="vm.resumen.totalTrabajos"
          icono="clipboard-outline"
          tipo="total"
        ></app-admin-summary-card>

        <app-admin-summary-card
          titulo="Pendientes"
          [valor]="vm.resumen.pendientes"
          icono="warning-outline"
          tipo="danger"
        ></app-admin-summary-card>

        <app-admin-summary-card
          titulo="En proceso"
          [valor]="vm.resumen.enProceso"
          icono="bar-chart-outline"
          tipo="success"
        ></app-admin-summary-card>

        <app-admin-summary-card
          titulo="Finalizados"
          [valor]="vm.resumen.finalizados"
          icono="document-text-outline"
          tipo="total"
        ></app-admin-summary-card>

      </section>

      <section class="extra-summary">

        <div class="extra-card">
          <span>{{ vm.resumen.totalMateriales }}</span>
          <p>Materiales</p>
        </div>

        <div class="extra-card danger">
          <span>{{ vm.resumen.materialesStockBajo }}</span>
          <p>Stock bajo</p>
        </div>

        <div class="extra-card">
          <span>{{ vm.resumen.totalEmpleados }}</span>
          <p>Empleados</p>
        </div>

        <div class="extra-card">
          <span>{{ vm.resumen.totalDevoluciones }}</span>
          <p>Devoluciones</p>
        </div>

      </section>

  

    </main>

  </ng-container>

  <app-admin-bottom-nav activo="reportes"></app-admin-bottom-nav>

</ion-content>`, styles: ['/* src/app/paginas/administrador/reportes/reportes.page.css */\n:host {\n  display: block;\n  font-family: var(--font-main, "Inter", sans-serif);\n}\nion-content.reportes-root {\n  --background: var(--color-page-outside, #e5e7eb);\n}\n.reportes-container {\n  width: 100%;\n  max-width: var(--app-width, 430px);\n  min-height: 100dvh;\n  margin: 0 auto;\n  padding: 14px 14px calc(105px + env(safe-area-inset-bottom));\n  background: var(--color-background, #f5f7fa);\n}\n.page-title-row {\n  margin-bottom: 12px;\n}\n.page-title-row h2 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 950;\n  color: #111827;\n}\n.page-title-row p {\n  margin: 4px 0 0;\n  font-size: 11.5px;\n  font-weight: 700;\n  color: #64748b;\n}\n.reportes-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px;\n  margin-bottom: 16px;\n}\n.reporte-card {\n  min-height: 106px;\n  border: 1px solid #dbe3ef;\n  border-radius: 16px;\n  background: #ffffff;\n  display: grid;\n  grid-template-columns: 42px minmax(0, 1fr) 16px;\n  align-items: center;\n  gap: 8px;\n  padding: 10px;\n  text-align: left;\n  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.07);\n}\n.reporte-card:active {\n  transform: scale(0.98);\n}\n.reporte-icon {\n  width: 38px;\n  height: 38px;\n  border-radius: 13px;\n  display: grid;\n  place-items: center;\n  background: #e8eef8;\n  color: #0b3d91;\n}\n.reporte-icon ion-icon {\n  display: block;\n  font-size: 22px;\n  color: currentColor;\n}\n.reporte-info {\n  min-width: 0;\n}\n.reporte-info h3 {\n  margin: 0;\n  font-size: 12px;\n  font-weight: 950;\n  color: #0f172a;\n  line-height: 1.15;\n}\n.reporte-info p {\n  margin: 4px 0 0;\n  font-size: 10px;\n  font-weight: 650;\n  color: #64748b;\n  line-height: 1.2;\n}\n.reporte-status {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 20px;\n  margin-top: 7px;\n  padding: 3px 8px;\n  border-radius: 999px;\n  background: #dcfce7;\n  color: #15803d;\n  font-size: 9px;\n  font-weight: 900;\n}\n.reporte-arrow {\n  font-size: 17px;\n  color: #0b3d91;\n}\n.reporte-card.azul .reporte-icon {\n  background: #e8eef8;\n  color: #0b3d91;\n}\n.reporte-card.verde .reporte-icon {\n  background: #dcfce7;\n  color: #16a34a;\n}\n.reporte-card.naranja .reporte-icon {\n  background: #fef3c7;\n  color: #d97706;\n}\n.reporte-card.morado .reporte-icon {\n  background: #ede9fe;\n  color: #7c3aed;\n}\n.reporte-card.gris .reporte-icon {\n  background: #eef2f7;\n  color: #475569;\n}\n.resumen-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin: 4px 0 10px;\n}\n.resumen-header h3 {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 950;\n  color: #111827;\n}\n.resumen-header p {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 700;\n  color: #64748b;\n}\n.summary-grid {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 7px;\n  margin-bottom: 12px;\n}\n.extra-summary {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 7px;\n  margin-bottom: 14px;\n}\n.extra-card {\n  min-height: 58px;\n  border-radius: 13px;\n  border: 1px solid #dbe3ef;\n  background: #ffffff;\n  display: grid;\n  place-items: center;\n  text-align: center;\n  padding: 8px 4px;\n}\n.extra-card span {\n  display: block;\n  font-size: 15px;\n  font-weight: 950;\n  color: #0b3d91;\n}\n.extra-card p {\n  margin: 2px 0 0;\n  font-size: 9.5px;\n  font-weight: 800;\n  color: #64748b;\n}\n.extra-card.danger span {\n  color: #b42318;\n}\n.report-note {\n  border-radius: 16px;\n  background: #ffffff;\n  border: 1px solid #dbe3ef;\n  padding: 13px;\n  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);\n}\n.report-note h3 {\n  margin: 0;\n  color: #111827;\n  font-size: 13px;\n  font-weight: 950;\n}\n.report-note p {\n  margin: 5px 0 0;\n  color: #64748b;\n  font-size: 11px;\n  font-weight: 700;\n  line-height: 1.35;\n}\n@media (max-width: 360px) {\n  .reportes-container {\n    padding-left: 10px;\n    padding-right: 10px;\n  }\n  .reportes-grid {\n    grid-template-columns: 1fr;\n  }\n  .summary-grid,\n  .extra-summary {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n/*# sourceMappingURL=reportes.page.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReportesPage, { className: "ReportesPage", filePath: "src/app/paginas/administrador/reportes/reportes.page.ts", lineNumber: 50 });
})();
export {
  ReportesPage
};
//# sourceMappingURL=reportes.page-VCWUGRXZ.js.map
