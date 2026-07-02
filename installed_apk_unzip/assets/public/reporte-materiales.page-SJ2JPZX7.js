import {
  E,
  autoTable
} from "./chunk-7JGR7BXZ.js";
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
  arrowBackOutline,
  barChartOutline,
  calendarOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  documentTextOutline,
  downloadOutline,
  refreshOutline,
  trashOutline,
  warningOutline
} from "./chunk-XEVVVGO7.js";
import {
  Firestore,
  collection,
  collectionData
} from "./chunk-NMRAWXHA.js";
import {
  AsyncPipe,
  BehaviorSubject,
  ChangeDetectorRef,
  CommonModule,
  Component,
  Injectable,
  NavController,
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
  __async
} from "./chunk-Q3N56TRI.js";

// src/app/dao/reporte-materiales.dao.ts
var _ReporteMaterialesDAO = class _ReporteMaterialesDAO {
  constructor() {
    this.firestore = inject(Firestore);
  }
  escucharMateriales() {
    const ref = collection(this.firestore, "materiales");
    return collectionData(ref, { idField: "uid" });
  }
  escucharTrabajos() {
    const ref = collection(this.firestore, "trabajos");
    return collectionData(ref, { idField: "uid" });
  }
  escucharDevoluciones() {
    const ref = collection(this.firestore, "devoluciones");
    return collectionData(ref, { idField: "uid" });
  }
};
_ReporteMaterialesDAO.\u0275fac = function ReporteMaterialesDAO_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ReporteMaterialesDAO)();
};
_ReporteMaterialesDAO.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReporteMaterialesDAO, factory: _ReporteMaterialesDAO.\u0275fac, providedIn: "root" });
var ReporteMaterialesDAO = _ReporteMaterialesDAO;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReporteMaterialesDAO, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/procesos/reporte-materiales.service.ts
var _ReporteMaterialesService = class _ReporteMaterialesService {
  constructor() {
    this.dao = inject(ReporteMaterialesDAO);
    this.filtroSubject = new BehaviorSubject("todos");
    this.fechaInicioSubject = new BehaviorSubject("");
    this.fechaFinSubject = new BehaviorSubject("");
    this.vm$ = combineLatest([
      this.dao.escucharMateriales().pipe(catchError(() => of([]))),
      this.dao.escucharTrabajos().pipe(catchError(() => of([]))),
      this.dao.escucharDevoluciones().pipe(catchError(() => of([]))),
      this.filtroSubject.asObservable(),
      this.fechaInicioSubject.asObservable(),
      this.fechaFinSubject.asObservable()
    ]).pipe(map(([materiales, trabajos, devoluciones, filtro, fechaInicio, fechaFin]) => {
      const materialesVista = this.mapearMateriales(materiales, trabajos, devoluciones, fechaInicio, fechaFin);
      const materialesFiltrados = this.filtrarMateriales(materialesVista, filtro);
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
    }), shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }
  cambiarFiltro(filtro) {
    this.filtroSubject.next(filtro);
  }
  cambiarFechaInicio(fecha) {
    this.fechaInicioSubject.next(fecha || "");
  }
  cambiarFechaFin(fecha) {
    this.fechaFinSubject.next(fecha || "");
  }
  limpiarRangoFechas() {
    this.fechaInicioSubject.next("");
    this.fechaFinSubject.next("");
  }
  mapearMateriales(materiales, trabajos, devoluciones, fechaInicio, fechaFin) {
    const materialesActivos = (materiales || []).filter((item) => this.esRegistroActivo(item));
    const basePorKey = /* @__PURE__ */ new Map();
    const keyPorNombre = /* @__PURE__ */ new Map();
    materialesActivos.forEach((material) => {
      const key = this.obtenerKeyMaterialBase(material);
      if (key) {
        basePorKey.set(key, material);
      }
      const nombreKey = this.normalizarTexto(material?.nombre || material?.nombreMaterial || material?.materialNombre);
      if (nombreKey && key) {
        keyPorNombre.set(nombreKey, key);
      }
    });
    const trabajosFiltrados = this.filtrarItemsPorFecha((trabajos || []).filter((item) => this.esRegistroActivo(item)), fechaInicio, fechaFin);
    const devolucionesFiltradas = this.filtrarItemsPorFecha((devoluciones || []).filter((item) => this.esRegistroActivo(item)), fechaInicio, fechaFin);
    const usados = this.construirAgregadoMateriales(trabajosFiltrados, basePorKey, keyPorNombre, "uso");
    const devueltos = this.construirAgregadoMateriales(devolucionesFiltradas, basePorKey, keyPorNombre, "devolucion");
    const keys = /* @__PURE__ */ new Set();
    basePorKey.forEach((_material, key) => keys.add(key));
    usados.forEach((_valor, key) => keys.add(key));
    devueltos.forEach((_valor, key) => keys.add(key));
    return Array.from(keys).map((key) => {
      const material = basePorKey.get(key) || {};
      const usado = usados.get(key);
      const devuelto = devueltos.get(key);
      const nombre = String(material?.nombre || material?.nombreMaterial || material?.materialNombre || usado?.nombre || devuelto?.nombre || "Material").trim();
      const unidad = String(material?.unidad || material?.unidadMedida || usado?.unidad || devuelto?.unidad || "Unidad").trim();
      const stockActual = this.obtenerNumero(material?.stockActual ?? material?.stock ?? material?.cantidad ?? material?.cantidadActual ?? 0);
      const stockMinimo = this.obtenerNumero(material?.stockMinimo ?? material?.minimo ?? material?.cantidadMinima ?? 0);
      const estadoStock = this.obtenerEstadoStock(stockActual, stockMinimo);
      return {
        uid: String(material?.uid || material?.id || key),
        codigo: this.obtenerCodigoMaterial(material, key, nombre),
        nombre,
        categoria: String(material?.categoria || material?.tipo || "General"),
        unidad,
        stockActual,
        stockMinimo,
        estadoStock,
        estadoStockTexto: this.obtenerEstadoStockTexto(estadoStock),
        estadoStockClase: this.obtenerEstadoStockClase(estadoStock),
        cantidadUsadaTotal: usado?.cantidad || 0,
        cantidadDevueltaTotal: devuelto?.cantidad || 0,
        trabajosAsociados: usado?.trabajos?.size || 0,
        creadoEnTexto: this.formatearFecha(this.convertirFecha(material?.creadoEn || material?.fechaCreacion)),
        actualizadoEnTexto: this.formatearFecha(this.convertirFecha(material?.actualizadoEn || material?.fechaActualizacion))
      };
    }).sort((a, b) => b.cantidadUsadaTotal - a.cantidadUsadaTotal);
  }
  construirAgregadoMateriales(items, basePorKey, keyPorNombre, tipo) {
    const mapa = /* @__PURE__ */ new Map();
    items.forEach((item) => {
      const materialesRaw = this.obtenerMaterialesRaw(item, tipo);
      const trabajoUid = String(item?.trabajoUid || item?.trabajoId || item?.uidTrabajo || item?.idTrabajo || item?.uid || item?.id || "");
      materialesRaw.forEach((material) => {
        const key = this.obtenerKeyMaterialAsignado(material, basePorKey, keyPorNombre);
        if (!key) {
          return;
        }
        const nombre = String(material?.nombre || material?.materialNombre || material?.nombreMaterial || basePorKey.get(key)?.nombre || "Material").trim();
        const unidad = String(material?.unidad || material?.unidadMedida || basePorKey.get(key)?.unidad || "Unidad").trim();
        const cantidad = this.obtenerCantidadMaterial(material, tipo);
        if (cantidad <= 0) {
          return;
        }
        if (!mapa.has(key)) {
          mapa.set(key, {
            nombre,
            unidad,
            cantidad: 0,
            trabajos: /* @__PURE__ */ new Set()
          });
        }
        const actual = mapa.get(key);
        actual.cantidad += cantidad;
        if (trabajoUid) {
          actual.trabajos.add(trabajoUid);
        }
      });
    });
    return mapa;
  }
  obtenerMaterialesRaw(item, tipo) {
    if (!item) {
      return [];
    }
    if (tipo === "devolucion") {
      const raw2 = item?.materialesDevueltos || item?.materialesDevolucion || item?.devoluciones || item?.materiales || [];
      if (Array.isArray(raw2)) {
        return raw2;
      }
      if (typeof raw2 === "object" && raw2 !== null) {
        return Object.values(raw2);
      }
      const posibleMaterialUnico = item?.materialUid || item?.materialId || item?.idMaterial || item?.nombreMaterial || item?.materialNombre || item?.nombre;
      return posibleMaterialUnico ? [item] : [];
    }
    const raw = item?.materialesAsignados || item?.materialesUsados || item?.materialesSeleccionados || item?.materiales || [];
    if (Array.isArray(raw)) {
      return raw;
    }
    if (typeof raw === "object" && raw !== null) {
      return Object.values(raw);
    }
    return [];
  }
  obtenerCantidadMaterial(material, tipo) {
    const valores = tipo === "devolucion" ? [
      material?.cantidadDevuelta,
      material?.cantidadDevolucion,
      material?.cantidadRetornada,
      material?.cantidad,
      material?.cantidadAsignada
    ] : [
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
  filtrarMateriales(materiales, filtro) {
    if (filtro === "todos") {
      return materiales;
    }
    if (filtro === "stock_bajo") {
      return materiales.filter((item) => item.estadoStock === "stock_bajo");
    }
    if (filtro === "sin_stock") {
      return materiales.filter((item) => item.estadoStock === "sin_stock");
    }
    if (filtro === "usados") {
      return materiales.filter((item) => item.cantidadUsadaTotal > 0);
    }
    if (filtro === "no_usados") {
      return materiales.filter((item) => item.cantidadUsadaTotal === 0);
    }
    if (filtro === "devueltos") {
      return materiales.filter((item) => item.cantidadDevueltaTotal > 0);
    }
    return materiales;
  }
  calcularResumen(materiales) {
    return {
      totalMateriales: materiales.length,
      stockBajo: materiales.filter((item) => item.estadoStock === "stock_bajo").length,
      sinStock: materiales.filter((item) => item.estadoStock === "sin_stock").length,
      materialesUsados: materiales.filter((item) => item.cantidadUsadaTotal > 0).length,
      materialesNoUsados: materiales.filter((item) => item.cantidadUsadaTotal === 0).length,
      materialesDevueltos: materiales.filter((item) => item.cantidadDevueltaTotal > 0).length,
      cantidadUsadaTotal: materiales.reduce((total, item) => total + item.cantidadUsadaTotal, 0),
      cantidadDevueltaTotal: materiales.reduce((total, item) => total + item.cantidadDevueltaTotal, 0)
    };
  }
  calcularRankingUsados(materiales) {
    const total = Math.max(materiales.reduce((suma, item) => suma + item.cantidadUsadaTotal, 0), 1);
    return [...materiales].filter((item) => item.cantidadUsadaTotal > 0).sort((a, b) => b.cantidadUsadaTotal - a.cantidadUsadaTotal).slice(0, 5).map((item) => ({
      nombre: item.nombre,
      unidad: item.unidad,
      total: item.cantidadUsadaTotal,
      porcentaje: this.obtenerPorcentaje(item.cantidadUsadaTotal, total)
    }));
  }
  calcularRankingDevueltos(materiales) {
    const total = Math.max(materiales.reduce((suma, item) => suma + item.cantidadDevueltaTotal, 0), 1);
    return [...materiales].filter((item) => item.cantidadDevueltaTotal > 0).sort((a, b) => b.cantidadDevueltaTotal - a.cantidadDevueltaTotal).slice(0, 5).map((item) => ({
      nombre: item.nombre,
      unidad: item.unidad,
      total: item.cantidadDevueltaTotal,
      porcentaje: this.obtenerPorcentaje(item.cantidadDevueltaTotal, total)
    }));
  }
  obtenerCodigoMaterial(material, key, nombre) {
    const codigoDirecto = String(material?.codigoMaterial || material?.codigo || material?.numero || "").trim();
    if (/^M-\d{3,6}$/i.test(codigoDirecto)) {
      return codigoDirecto.toUpperCase();
    }
    if (/^\d{1,6}$/.test(codigoDirecto)) {
      return "M-" + codigoDirecto.padStart(5, "0");
    }
    const textoBase = String(material?.uid || material?.id || key || codigoDirecto || nombre || "material").trim();
    const numero = this.generarNumeroDesdeTexto(textoBase);
    return "M-" + String(numero).padStart(5, "0");
  }
  generarNumeroDesdeTexto(texto) {
    let hash = 0;
    for (let i = 0; i < texto.length; i++) {
      hash = (hash << 5) - hash + texto.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % 1e5;
  }
  obtenerKeyMaterialBase(material) {
    const uid = String(material?.uid || material?.id || "").trim();
    if (uid) {
      return uid;
    }
    return this.normalizarTexto(material?.nombre || material?.nombreMaterial || material?.materialNombre);
  }
  obtenerKeyMaterialAsignado(material, basePorKey, keyPorNombre) {
    if (typeof material === "string") {
      const texto = material.trim();
      if (texto && basePorKey.has(texto)) {
        return texto;
      }
      const nombreKey2 = this.normalizarTexto(texto);
      if (nombreKey2 && keyPorNombre.has(nombreKey2)) {
        return keyPorNombre.get(nombreKey2);
      }
      return texto || nombreKey2;
    }
    const uid = String(material?.uid || material?.id || material?.materialUid || material?.materialId || material?.idMaterial || "").trim();
    if (uid && basePorKey.has(uid)) {
      return uid;
    }
    const nombreKey = this.normalizarTexto(material?.nombre || material?.materialNombre || material?.nombreMaterial);
    if (nombreKey && keyPorNombre.has(nombreKey)) {
      return keyPorNombre.get(nombreKey);
    }
    return uid || nombreKey;
  }
  filtrarItemsPorFecha(items, fechaInicio, fechaFin) {
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
  obtenerFechaItem(item) {
    return this.convertirFecha(item?.fechaProgramada || item?.fechaTrabajo || item?.fechaDevolucion || item?.fechaValidacion || item?.fechaRegistro || item?.creadoEn || item?.fechaCreacion || item?.createdAt || item?.fecha || item?.actualizadoEn);
  }
  convertirFechaInput(valor, finDelDia) {
    if (!valor) {
      return null;
    }
    const partes = valor.split("-");
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
  obtenerEstadoStock(stockActual, stockMinimo) {
    if (stockActual <= 0) {
      return "sin_stock";
    }
    if (stockMinimo > 0 && stockActual <= stockMinimo) {
      return "stock_bajo";
    }
    return "stock_ok";
  }
  obtenerEstadoStockTexto(estado) {
    const textos = {
      stock_ok: "Stock suficiente",
      stock_bajo: "Stock bajo",
      sin_stock: "Sin stock"
    };
    return textos[estado] || "Stock suficiente";
  }
  obtenerEstadoStockClase(estado) {
    if (estado === "sin_stock") {
      return "danger";
    }
    if (estado === "stock_bajo") {
      return "warning";
    }
    return "success";
  }
  esRegistroActivo(item) {
    if (!item) {
      return false;
    }
    if (item?.eliminado === true || item?.eliminada === true) {
      return false;
    }
    if (item?.activo === false) {
      return false;
    }
    if (String(item?.estado || "").trim().toLowerCase() === "eliminado") {
      return false;
    }
    return true;
  }
  obtenerNumero(valor) {
    if (typeof valor === "number") {
      return Number.isNaN(valor) ? 0 : valor;
    }
    const texto = String(valor ?? "").replace(",", ".").replace(/[^\d.-]/g, "").trim();
    const numero = Number(texto);
    return Number.isNaN(numero) ? 0 : numero;
  }
  obtenerPorcentaje(valor, total) {
    if (!total) {
      return 0;
    }
    return Math.round(valor / total * 100);
  }
  normalizarTexto(valor) {
    return String(valor || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  formatearFecha(fecha) {
    if (!fecha) {
      return "Sin registro";
    }
    return fecha.toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "short",
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
      if (/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
        const [anio, mes, dia] = valor.split("-").map(Number);
        return new Date(anio, mes - 1, dia);
      }
      const fecha = new Date(valor);
      if (!Number.isNaN(fecha.getTime())) {
        return fecha;
      }
    }
    return null;
  }
};
_ReporteMaterialesService.\u0275fac = function ReporteMaterialesService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ReporteMaterialesService)();
};
_ReporteMaterialesService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReporteMaterialesService, factory: _ReporteMaterialesService.\u0275fac, providedIn: "root" });
var ReporteMaterialesService = _ReporteMaterialesService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReporteMaterialesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/paginas/administrador/reporte-materiales/reporte-materiales.page.ts
function ReporteMaterialesPage_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "app-admin-header", 6);
    \u0275\u0275listener("menuClick", function ReporteMaterialesPage_ng_container_1_Template_app_admin_header_menuClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirMenu());
    })("notificacionesClick", function ReporteMaterialesPage_ng_container_1_Template_app_admin_header_notificacionesClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirNotificaciones());
    })("perfilClick", function ReporteMaterialesPage_ng_container_1_Template_app_admin_header_perfilClick_1_listener() {
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
function ReporteMaterialesPage_ng_container_3_div_111_article_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 54)(1, "div")(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r6.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", item_r6.porcentaje, "% del total usado");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", item_r6.total, " ", item_r6.unidad);
  }
}
function ReporteMaterialesPage_ng_container_3_div_111_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275template(1, ReporteMaterialesPage_ng_container_3_div_111_article_1_Template, 8, 4, "article", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r5 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", vm_r5.rankingUsados);
  }
}
function ReporteMaterialesPage_ng_container_3_ng_template_112_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-admin-empty-state", 55);
  }
}
function ReporteMaterialesPage_ng_container_3_div_121_article_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 54)(1, "div")(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r7.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", item_r7.porcentaje, "% del total devuelto");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", item_r7.total, " ", item_r7.unidad);
  }
}
function ReporteMaterialesPage_ng_container_3_div_121_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275template(1, ReporteMaterialesPage_ng_container_3_div_121_article_1_Template, 8, 4, "article", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r5 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", vm_r5.rankingDevueltos);
  }
}
function ReporteMaterialesPage_ng_container_3_ng_template_122_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-admin-empty-state", 56);
  }
}
function ReporteMaterialesPage_ng_container_3_button_128_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 57);
    \u0275\u0275listener("click", function ReporteMaterialesPage_ng_container_3_button_128_Template_button_click_0_listener() {
      const filtro_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cambiarFiltro(filtro_r9.valor));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const filtro_r9 = ctx.$implicit;
    const vm_r5 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275classProp("active", vm_r5.filtro === filtro_r9.valor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", filtro_r9.texto, " ");
  }
}
function ReporteMaterialesPage_ng_container_3_div_138_article_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 60)(1, "div", 61)(2, "div")(3, "span", 62);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 63);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 64)(12, "div")(13, "strong");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "Stock actual");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div")(18, "strong");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21, "Stock m\xEDnimo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div")(23, "strong");
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26, "Usado");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div")(28, "strong");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span");
    \u0275\u0275text(31, "Devuelto");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div", 65)(33, "span");
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const material_r10 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(material_r10.codigo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(material_r10.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", material_r10.categoria, " \xB7 ", material_r10.unidad);
    \u0275\u0275advance();
    \u0275\u0275classProp("success", material_r10.estadoStockClase === "success")("warning", material_r10.estadoStockClase === "warning")("danger", material_r10.estadoStockClase === "danger");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", material_r10.estadoStockTexto, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(material_r10.stockActual);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(material_r10.stockMinimo);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(material_r10.cantidadUsadaTotal);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(material_r10.cantidadDevueltaTotal);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", material_r10.trabajosAsociados, " trabajo(s) asociado(s)");
  }
}
function ReporteMaterialesPage_ng_container_3_div_138_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275template(1, ReporteMaterialesPage_ng_container_3_div_138_article_1_Template, 35, 16, "article", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r5 = \u0275\u0275nextContext().ngIf;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", vm_r5.materialesFiltrados)("ngForTrackBy", ctx_r1.trackByMaterial);
  }
}
function ReporteMaterialesPage_ng_container_3_ng_template_139_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-admin-empty-state", 66);
  }
}
function ReporteMaterialesPage_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "main", 7)(2, "div", 8)(3, "button", 9);
    \u0275\u0275listener("click", function ReporteMaterialesPage_ng_container_3_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.volverReportes());
    });
    \u0275\u0275element(4, "ion-icon", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "Volver a reportes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "section", 11)(8, "div", 12)(9, "div", 13);
    \u0275\u0275element(10, "ion-icon", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div")(12, "h1");
    \u0275\u0275text(13, "Reporte de materiales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p");
    \u0275\u0275text(15, " Analiza stock, materiales usados, materiales devueltos y alertas del almac\xE9n. ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(16, "section", 15)(17, "div", 16)(18, "div")(19, "h2");
    \u0275\u0275text(20, "Periodo del reporte");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p");
    \u0275\u0275text(22, " Filtra los materiales usados o devueltos seg\xFAn la fecha de trabajos y devoluciones. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 17)(24, "label", 18)(25, "span");
    \u0275\u0275text(26, "Desde");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 19);
    \u0275\u0275element(28, "ion-icon", 20);
    \u0275\u0275elementStart(29, "input", 21);
    \u0275\u0275listener("change", function ReporteMaterialesPage_ng_container_3_Template_input_change_29_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarFechaInicio($event.target.value));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "label", 18)(31, "span");
    \u0275\u0275text(32, "Hasta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 19);
    \u0275\u0275element(34, "ion-icon", 20);
    \u0275\u0275elementStart(35, "input", 21);
    \u0275\u0275listener("change", function ReporteMaterialesPage_ng_container_3_Template_input_change_35_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarFechaFin($event.target.value));
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(36, "div", 22)(37, "button", 23);
    \u0275\u0275listener("click", function ReporteMaterialesPage_ng_container_3_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.limpiarFechas());
    });
    \u0275\u0275element(38, "ion-icon", 24);
    \u0275\u0275text(39, " Limpiar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "button", 25);
    \u0275\u0275listener("click", function ReporteMaterialesPage_ng_container_3_Template_button_click_40_listener() {
      const vm_r5 = \u0275\u0275restoreView(_r4).ngIf;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.exportarExcel(vm_r5.materialesFiltrados, vm_r5.fechaInicio, vm_r5.fechaFin));
    });
    \u0275\u0275element(41, "ion-icon", 26);
    \u0275\u0275text(42, " Excel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 27);
    \u0275\u0275listener("click", function ReporteMaterialesPage_ng_container_3_Template_button_click_43_listener() {
      const vm_r5 = \u0275\u0275restoreView(_r4).ngIf;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.exportarPDF(vm_r5.materialesFiltrados, vm_r5.fechaInicio, vm_r5.fechaFin));
    });
    \u0275\u0275element(44, "ion-icon", 28);
    \u0275\u0275text(45, " PDF ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(46, "section", 29)(47, "article", 30)(48, "div")(49, "span");
    \u0275\u0275text(50, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "h2");
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(53, "ion-icon", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "article", 31)(55, "div")(56, "span");
    \u0275\u0275text(57, "Stock bajo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "h2");
    \u0275\u0275text(59);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(60, "ion-icon", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "article", 33)(62, "div")(63, "span");
    \u0275\u0275text(64, "Sin stock");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "h2");
    \u0275\u0275text(66);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(67, "ion-icon", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "article", 35)(69, "div")(70, "span");
    \u0275\u0275text(71, "Usados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "h2");
    \u0275\u0275text(73);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(74, "ion-icon", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "article", 37)(76, "div")(77, "span");
    \u0275\u0275text(78, "Devueltos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "h2");
    \u0275\u0275text(80);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(81, "ion-icon", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "article", 39)(83, "div")(84, "span");
    \u0275\u0275text(85, "No usados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "h2");
    \u0275\u0275text(87);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(88, "ion-icon", 40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(89, "section", 41)(90, "article", 42)(91, "span");
    \u0275\u0275text(92, "Cantidad usada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(93, "h3");
    \u0275\u0275text(94);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(95, "p");
    \u0275\u0275text(96, "Total acumulado de materiales asignados o usados en trabajos.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(97, "article", 43)(98, "span");
    \u0275\u0275text(99, "Cantidad devuelta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(100, "h3");
    \u0275\u0275text(101);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(102, "p");
    \u0275\u0275text(103, "Total acumulado de materiales devueltos al almac\xE9n.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(104, "section", 44)(105, "div", 45)(106, "div")(107, "h2");
    \u0275\u0275text(108, "Materiales m\xE1s usados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(109, "p");
    \u0275\u0275text(110, "Ranking de materiales con mayor consumo en trabajos.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(111, ReporteMaterialesPage_ng_container_3_div_111_Template, 2, 1, "div", 46)(112, ReporteMaterialesPage_ng_container_3_ng_template_112_Template, 1, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(114, "section", 44)(115, "div", 45)(116, "div")(117, "h2");
    \u0275\u0275text(118, "Materiales devueltos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(119, "p");
    \u0275\u0275text(120, "Ranking de materiales retornados al almac\xE9n.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(121, ReporteMaterialesPage_ng_container_3_div_121_Template, 2, 1, "div", 46)(122, ReporteMaterialesPage_ng_container_3_ng_template_122_Template, 1, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(124, "section", 47)(125, "h2");
    \u0275\u0275text(126, "Filtrar materiales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(127, "div", 48);
    \u0275\u0275template(128, ReporteMaterialesPage_ng_container_3_button_128_Template, 2, 3, "button", 49);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(129, "section", 44)(130, "div", 45)(131, "div")(132, "h2");
    \u0275\u0275text(133, "Detalle de materiales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(134, "p");
    \u0275\u0275text(135);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(136, "button", 50);
    \u0275\u0275listener("click", function ReporteMaterialesPage_ng_container_3_Template_button_click_136_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirModuloMateriales());
    });
    \u0275\u0275text(137, " Ver almac\xE9n ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(138, ReporteMaterialesPage_ng_container_3_div_138_Template, 2, 2, "div", 51)(139, ReporteMaterialesPage_ng_container_3_ng_template_139_Template, 1, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const vm_r5 = ctx.ngIf;
    const sinRankingUsados_r11 = \u0275\u0275reference(113);
    const sinRankingDevueltos_r12 = \u0275\u0275reference(123);
    const sinMateriales_r13 = \u0275\u0275reference(140);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(29);
    \u0275\u0275property("value", vm_r5.fechaInicio);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", vm_r5.fechaFin);
    \u0275\u0275advance(17);
    \u0275\u0275textInterpolate(vm_r5.resumen.totalMateriales);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(vm_r5.resumen.stockBajo);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(vm_r5.resumen.sinStock);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(vm_r5.resumen.materialesUsados);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(vm_r5.resumen.materialesDevueltos);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(vm_r5.resumen.materialesNoUsados);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(vm_r5.resumen.cantidadUsadaTotal);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(vm_r5.resumen.cantidadDevueltaTotal);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngIf", vm_r5.rankingUsados.length > 0)("ngIfElse", sinRankingUsados_r11);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngIf", vm_r5.rankingDevueltos.length > 0)("ngIfElse", sinRankingDevueltos_r12);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r1.filtros);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", vm_r5.totalFiltrados, " registro(s) encontrados.");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", vm_r5.materialesFiltrados.length > 0)("ngIfElse", sinMateriales_r13);
  }
}
var _ReporteMaterialesPage = class _ReporteMaterialesPage {
  constructor() {
    this.navCtrl = inject(NavController);
    this.toastCtrl = inject(ToastController);
    this.cdr = inject(ChangeDetectorRef);
    this.dashboardAdminService = inject(DashboardAdminService);
    this.reporteMaterialesService = inject(ReporteMaterialesService);
    this.logoReportePath = "assets/img/logo.png";
    this.adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
    this.vm$ = this.reporteMaterialesService.vm$;
    this.filtros = [
      { valor: "todos", texto: "Todos" },
      { valor: "stock_bajo", texto: "Stock bajo" },
      { valor: "sin_stock", texto: "Sin stock" },
      { valor: "usados", texto: "Usados" },
      { valor: "no_usados", texto: "No usados" },
      { valor: "devueltos", texto: "Devueltos" }
    ];
    addIcons({
      "archive-outline": archiveOutline,
      "arrow-back-outline": arrowBackOutline,
      "bar-chart-outline": barChartOutline,
      "calendar-outline": calendarOutline,
      "checkmark-circle-outline": checkmarkCircleOutline,
      "close-circle-outline": closeCircleOutline,
      "document-text-outline": documentTextOutline,
      "download-outline": downloadOutline,
      "refresh-outline": refreshOutline,
      "trash-outline": trashOutline,
      "warning-outline": warningOutline
    });
  }
  ionViewWillEnter() {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }
  cambiarFiltro(filtro) {
    this.reporteMaterialesService.cambiarFiltro(filtro);
  }
  cambiarFechaInicio(valor) {
    this.reporteMaterialesService.cambiarFechaInicio(this.normalizarFechaInput(valor));
  }
  cambiarFechaFin(valor) {
    this.reporteMaterialesService.cambiarFechaFin(this.normalizarFechaInput(valor));
  }
  limpiarFechas() {
    this.reporteMaterialesService.limpiarRangoFechas();
  }
  volverReportes() {
    this.navCtrl.navigateRoot("/reportes", {
      animated: false,
      replaceUrl: true
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
  abrirModuloMateriales() {
    this.navCtrl.navigateRoot("/materiales", {
      animated: false,
      replaceUrl: true
    });
  }
  exportarExcel(materiales, fechaInicio = "", fechaFin = "") {
    if (!materiales || materiales.length === 0) {
      this.mostrarToast("No hay datos para exportar.", "primary");
      return;
    }
    const encabezados = [
      "C\xF3digo",
      "Material",
      "Categor\xEDa",
      "Unidad",
      "Stock actual",
      "Stock m\xEDnimo",
      "Estado stock",
      "Cantidad usada",
      "Cantidad devuelta",
      "Trabajos asociados"
    ];
    const filas = materiales.map((material) => [
      material.codigo,
      material.nombre,
      material.categoria,
      material.unidad,
      material.stockActual,
      material.stockMinimo,
      material.estadoStockTexto,
      material.cantidadUsadaTotal,
      material.cantidadDevueltaTotal,
      material.trabajosAsociados
    ]);
    const contenidoFilas = [
      ["Reporte de materiales usados"],
      ["Periodo", this.obtenerPeriodoTexto(fechaInicio, fechaFin)],
      ["Fecha de emisi\xF3n", (/* @__PURE__ */ new Date()).toLocaleDateString("es-PE")],
      [],
      encabezados,
      ...filas
    ];
    const contenido = contenidoFilas.map((fila) => fila.map((valor) => this.formatearValorCsv(valor)).join(";")).join("\n");
    const blob = new Blob([`\uFEFF${contenido}`], {
      type: "text/csv;charset=utf-8;"
    });
    const url = window.URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = `reporte-materiales-${this.obtenerFechaArchivo()}.csv`;
    enlace.click();
    window.URL.revokeObjectURL(url);
    this.mostrarToast("Reporte exportado para Excel.", "success");
  }
  exportarPDF(materiales, fechaInicio = "", fechaFin = "") {
    return __async(this, null, function* () {
      if (!materiales || materiales.length === 0) {
        this.mostrarToast("No hay datos para exportar.", "primary");
        return;
      }
      try {
        const logoBase64 = yield this.cargarImagenBase64(this.logoReportePath);
        const doc = new E({
          orientation: "landscape",
          unit: "mm",
          format: "a4"
        });
        const periodoTexto = this.obtenerPeriodoTexto(fechaInicio, fechaFin);
        const fechaEmision = (/* @__PURE__ */ new Date()).toLocaleDateString("es-PE");
        const resumen = this.obtenerResumenPDF(materiales);
        this.dibujarEncabezadoPDF(doc, logoBase64, periodoTexto, fechaEmision);
        this.dibujarResumenPDF(doc, resumen);
        const cuerpoTabla = materiales.map((material, index) => [
          String(index + 1),
          material.codigo,
          material.nombre,
          material.categoria,
          material.unidad,
          String(material.stockActual),
          String(material.stockMinimo),
          material.estadoStockTexto,
          String(material.cantidadUsadaTotal),
          String(material.cantidadDevueltaTotal),
          String(material.trabajosAsociados)
        ]);
        autoTable(doc, {
          startY: 80,
          head: [[
            "N\xB0",
            "C\xF3digo",
            "Material",
            "Categor\xEDa",
            "Unidad",
            "Stock",
            "M\xEDn.",
            "Estado",
            "Usado",
            "Devuelto",
            "Trab."
          ]],
          body: cuerpoTabla,
          margin: {
            left: 14,
            right: 14,
            top: 14,
            bottom: 18
          },
          theme: "grid",
          styles: {
            font: "helvetica",
            fontSize: 8,
            cellPadding: 2,
            valign: "top",
            textColor: [16, 24, 40],
            lineColor: [208, 213, 221],
            lineWidth: 0.15,
            overflow: "linebreak"
          },
          headStyles: {
            fillColor: [23, 61, 143],
            textColor: [255, 255, 255],
            fontStyle: "bold",
            halign: "left"
          },
          alternateRowStyles: {
            fillColor: [248, 250, 252]
          }
        });
        this.dibujarPiePaginasPDF(doc);
        doc.save(`reporte-materiales-${this.obtenerFechaArchivo()}.pdf`);
        this.mostrarToast("Reporte PDF descargado correctamente.", "success");
      } catch (error) {
        console.error("[ReporteMaterialesPage] Error al exportar PDF:", error);
        this.mostrarToast("No se pudo generar el PDF.", "danger");
      }
    });
  }
  trackByMaterial(index, material) {
    return material.uid || String(index);
  }
  obtenerResumenPDF(materiales) {
    return {
      total: materiales.length,
      stockBajo: materiales.filter((item) => item.estadoStock === "stock_bajo").length,
      sinStock: materiales.filter((item) => item.estadoStock === "sin_stock").length,
      usados: materiales.filter((item) => item.cantidadUsadaTotal > 0).length,
      devueltos: materiales.filter((item) => item.cantidadDevueltaTotal > 0).length
    };
  }
  dibujarEncabezadoPDF(doc, logoBase64, periodoTexto, fechaEmision) {
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFillColor(23, 61, 143);
    doc.rect(0, 0, pageWidth, 42, "F");
    doc.setFillColor(15, 35, 86);
    doc.rect(0, 34, pageWidth, 8, "F");
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(14, 8, 34, 26, 4, 4, "F");
    if (logoBase64) {
      doc.addImage(logoBase64, "PNG", 19, 12, 24, 18);
    }
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("REPORTE DE MATERIALES", 55, 18);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Control operativo administrativo", 55, 25);
    doc.setFontSize(8);
    doc.text(`Periodo: ${periodoTexto}`, 55, 32);
    doc.text(`Fecha de emisi\xF3n: ${fechaEmision}`, pageWidth - 14, 32, {
      align: "right"
    });
  }
  dibujarResumenPDF(doc, resumen) {
    const y = 50;
    const alto = 18;
    const ancho = 48;
    const espacio = 5;
    const inicioX = 14;
    this.dibujarTarjetaResumenPDF(doc, inicioX, y, ancho, alto, "Total", String(resumen.total), [23, 61, 143]);
    this.dibujarTarjetaResumenPDF(doc, inicioX + (ancho + espacio), y, ancho, alto, "Stock bajo", String(resumen.stockBajo), [245, 158, 11]);
    this.dibujarTarjetaResumenPDF(doc, inicioX + (ancho + espacio) * 2, y, ancho, alto, "Sin stock", String(resumen.sinStock), [220, 38, 38]);
    this.dibujarTarjetaResumenPDF(doc, inicioX + (ancho + espacio) * 3, y, ancho, alto, "Usados", String(resumen.usados), [37, 99, 235]);
    this.dibujarTarjetaResumenPDF(doc, inicioX + (ancho + espacio) * 4, y, ancho, alto, "Devueltos", String(resumen.devueltos), [22, 163, 74]);
  }
  dibujarTarjetaResumenPDF(doc, x, y, ancho, alto, titulo, valor, color) {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(x, y, ancho, alto, 3, 3, "F");
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(x, y, ancho, alto, 3, 3, "S");
    doc.setFillColor(color[0], color[1], color[2]);
    doc.roundedRect(x, y, 4, alto, 2, 2, "F");
    doc.setTextColor(102, 112, 133);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text(titulo, x + 8, y + 7);
    doc.setTextColor(16, 24, 40);
    doc.setFontSize(14);
    doc.text(valor, x + 8, y + 15);
  }
  dibujarPiePaginasPDF(doc) {
    const totalPaginas = doc.getNumberOfPages();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    for (let pagina = 1; pagina <= totalPaginas; pagina++) {
      doc.setPage(pagina);
      doc.setDrawColor(226, 232, 240);
      doc.line(14, pageHeight - 13, pageWidth - 14, pageHeight - 13);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(102, 112, 133);
      doc.text("Control operativo | Reporte de materiales", 14, pageHeight - 8);
      doc.text(`P\xE1gina ${pagina} de ${totalPaginas}`, pageWidth - 14, pageHeight - 8, {
        align: "right"
      });
    }
  }
  cargarImagenBase64(ruta) {
    return new Promise((resolve) => {
      const imagen = new Image();
      imagen.crossOrigin = "anonymous";
      imagen.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = imagen.naturalWidth || imagen.width;
        canvas.height = imagen.naturalHeight || imagen.height;
        const contexto = canvas.getContext("2d");
        if (!contexto) {
          resolve(null);
          return;
        }
        contexto.drawImage(imagen, 0, 0);
        try {
          resolve(canvas.toDataURL("image/png"));
        } catch {
          resolve(null);
        }
      };
      imagen.onerror = () => {
        resolve(null);
      };
      imagen.src = ruta;
    });
  }
  normalizarFechaInput(valor) {
    return String(valor || "").slice(0, 10);
  }
  formatearValorCsv(valor) {
    const texto = String(valor ?? "").replace(/"/g, '""');
    return `"${texto}"`;
  }
  obtenerPeriodoTexto(fechaInicio, fechaFin) {
    if (fechaInicio && fechaFin) {
      return `${fechaInicio} al ${fechaFin}`;
    }
    if (fechaInicio) {
      return `Desde ${fechaInicio}`;
    }
    if (fechaFin) {
      return `Hasta ${fechaFin}`;
    }
    return "Todos los registros";
  }
  obtenerFechaArchivo() {
    const fecha = /* @__PURE__ */ new Date();
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
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
_ReporteMaterialesPage.\u0275fac = function ReporteMaterialesPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ReporteMaterialesPage)();
};
_ReporteMaterialesPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReporteMaterialesPage, selectors: [["app-reporte-materiales"]], decls: 6, vars: 7, consts: [["sinRankingUsados", ""], ["sinRankingDevueltos", ""], ["sinMateriales", ""], [1, "reporte-materiales-root", 3, "fullscreen"], [4, "ngIf"], ["activo", "reportes"], [3, "menuClick", "notificacionesClick", "perfilClick", "nombre", "rol", "fotoUrl", "notificaciones"], [1, "reporte-container"], [1, "page-back-row"], ["type", "button", 1, "back-button", 3, "click"], ["name", "arrow-back-outline"], [1, "hero-card"], [1, "hero-content"], [1, "hero-icon"], ["name", "archive-outline"], [1, "report-tools-card"], [1, "tools-header"], [1, "date-grid"], [1, "date-field"], [1, "date-input-wrap"], ["name", "calendar-outline"], ["type", "date", 3, "change", "value"], [1, "tools-actions"], ["type", "button", 1, "tool-button", "secondary", 3, "click"], ["name", "trash-outline"], ["type", "button", 1, "tool-button", "success", 3, "click"], ["name", "download-outline"], ["type", "button", 1, "tool-button", "danger", 3, "click"], ["name", "document-text-outline"], [1, "summary-grid"], [1, "summary-card", "total"], [1, "summary-card", "warning"], ["name", "warning-outline"], [1, "summary-card", "danger"], ["name", "close-circle-outline"], [1, "summary-card", "process"], ["name", "bar-chart-outline"], [1, "summary-card", "success"], ["name", "checkmark-circle-outline"], [1, "summary-card", "primary"], ["name", "refresh-outline"], [1, "analysis-grid"], [1, "analysis-card", "process"], [1, "analysis-card", "success"], [1, "section-card"], [1, "section-header"], ["class", "ranking-list", 4, "ngIf", "ngIfElse"], [1, "filter-card"], [1, "filter-scroll"], ["type", "button", "class", "filter-chip", 3, "active", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "outline-button", 3, "click"], ["class", "materiales-list", 4, "ngIf", "ngIfElse"], [1, "ranking-list"], ["class", "ranking-row", 4, "ngFor", "ngForOf"], [1, "ranking-row"], ["icono", "archive-outline", "titulo", "Sin materiales usados", "descripcion", "No hay materiales usados en el periodo seleccionado."], ["icono", "checkmark-circle-outline", "titulo", "Sin devoluciones", "descripcion", "No hay materiales devueltos en el periodo seleccionado."], ["type", "button", 1, "filter-chip", 3, "click"], [1, "materiales-list"], ["class", "material-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "material-card"], [1, "material-top"], [1, "codigo"], [1, "estado-badge"], [1, "material-info"], [1, "material-footer"], ["icono", "archive-outline", "titulo", "Sin materiales", "descripcion", "No hay materiales para los filtros seleccionados."]], template: function ReporteMaterialesPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 3);
    \u0275\u0275template(1, ReporteMaterialesPage_ng_container_1_Template, 2, 4, "ng-container", 4);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275template(3, ReporteMaterialesPage_ng_container_3_Template, 141, 18, "ng-container", 4);
    \u0275\u0275pipe(4, "async");
    \u0275\u0275element(5, "app-admin-bottom-nav", 5);
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
  NgForOf,
  NgIf,
  IonicModule,
  IonContent,
  IonIcon,
  AdminHeaderComponent,
  AdminBottomNavComponent,
  AdminEmptyStateComponent,
  AsyncPipe
], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n}\nion-content.reporte-materiales-root[_ngcontent-%COMP%] {\n  --background: var(--color-page-outside, #eef2f7);\n}\n.reporte-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: var(--app-width, 430px);\n  min-height: 100dvh;\n  margin: 0 auto;\n  padding: 14px 14px calc(94px + env(safe-area-inset-bottom));\n  box-sizing: border-box;\n  background: #f5f7fb;\n}\n.page-back-row[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.page-back-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #344054;\n  font-size: 12px;\n  font-weight: 900;\n}\n.back-button[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border: none;\n  background: #ffffff;\n  color: #1a3e8c;\n  border-radius: 14px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  box-shadow: 0 8px 18px rgba(16, 24, 40, 0.08);\n}\n.back-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #1a3e8c;\n}\n.hero-card[_ngcontent-%COMP%] {\n  width: 100%;\n  border-radius: 24px;\n  background:\n    linear-gradient(\n      180deg,\n      #173d8f 0%,\n      #102b68 100%);\n  color: #ffffff;\n  padding: 18px 16px;\n  box-shadow: 0 14px 30px rgba(16, 43, 104, 0.25);\n}\n.hero-content[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 13px;\n  align-items: center;\n}\n.hero-icon[_ngcontent-%COMP%] {\n  width: 54px;\n  height: 54px;\n  border-radius: 18px;\n  background: rgba(255, 255, 255, 0.18);\n  display: grid;\n  place-items: center;\n  flex: 0 0 auto;\n}\n.hero-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: #ffffff;\n}\n.hero-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 21px;\n  font-weight: 900;\n  letter-spacing: -0.3px;\n}\n.hero-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  font-size: 12px;\n  line-height: 1.4;\n  opacity: 0.95;\n}\n.report-tools-card[_ngcontent-%COMP%], \n.section-card[_ngcontent-%COMP%], \n.filter-card[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  border-radius: 22px;\n  background: #ffffff;\n  border: 1px solid #e8edf5;\n  padding: 14px;\n  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.06);\n}\n.tools-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.filter-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 900;\n  color: #101828;\n}\n.tools-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.section-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: #667085;\n  font-size: 11.5px;\n  line-height: 1.35;\n  font-weight: 700;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.date-grid[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px;\n}\n.date-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.date-field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 900;\n  color: #344054;\n}\n.date-input-wrap[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 40px;\n  border-radius: 14px;\n  border: 1px solid #d0d5dd;\n  background: #ffffff;\n  position: relative;\n  overflow: hidden;\n  display: block;\n}\n.date-input-wrap[_ngcontent-%COMP%]:focus-within {\n  border-color: #1a3e8c;\n  box-shadow: 0 0 0 3px rgba(26, 62, 140, 0.12);\n}\n.date-input-wrap[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #1a3e8c;\n  font-size: 17px;\n  z-index: 3;\n  pointer-events: none;\n}\n.date-input-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border: none;\n  outline: none;\n  background: transparent;\n  color: #101828;\n  font-size: 12px;\n  font-weight: 800;\n  padding: 0 40px 0 12px;\n  position: relative;\n  z-index: 2;\n  appearance: none;\n  -webkit-appearance: none;\n}\n.date-input-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-calendar-picker-indicator {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 42px;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n  z-index: 4;\n}\n.date-input-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-inner-spin-button, \n.date-input-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-clear-button {\n  display: none;\n  -webkit-appearance: none;\n}\n.tools-actions[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 8px;\n}\n.tool-button[_ngcontent-%COMP%] {\n  height: 38px;\n  border: none;\n  border-radius: 14px;\n  font-size: 11.5px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.tool-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.tool-button.secondary[_ngcontent-%COMP%] {\n  background: #f2f4f7;\n  color: #344054;\n}\n.tool-button.secondary[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #344054;\n}\n.tool-button.success[_ngcontent-%COMP%] {\n  background: #ecfdf3;\n  color: #15803d;\n}\n.tool-button.success[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #15803d;\n}\n.tool-button.danger[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n}\n.tool-button.danger[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.summary-grid[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px;\n}\n.summary-card[_ngcontent-%COMP%] {\n  min-height: 92px;\n  border-radius: 20px;\n  background: #ffffff;\n  border: 1px solid #e8edf5;\n  padding: 14px;\n  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.06);\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n.summary-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #667085;\n  font-size: 11.5px;\n  font-weight: 800;\n  margin-bottom: 7px;\n}\n.summary-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #101828;\n  font-size: 25px;\n  font-weight: 900;\n}\n.summary-card[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  flex: 0 0 auto;\n}\n.summary-card.total[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #1a3e8c;\n}\n.summary-card.primary[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #1d4ed8;\n}\n.summary-card.warning[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #f59e0b;\n}\n.summary-card.process[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n.summary-card.success[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n.summary-card.danger[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.analysis-grid[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 10px;\n}\n.analysis-card[_ngcontent-%COMP%] {\n  border-radius: 20px;\n  background: #ffffff;\n  border: 1px solid #e8edf5;\n  padding: 14px;\n  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.06);\n  position: relative;\n  overflow: hidden;\n}\n.analysis-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0 auto 0 0;\n  width: 5px;\n  border-radius: 20px 0 0 20px;\n  background: #1a3e8c;\n}\n.analysis-card.success[_ngcontent-%COMP%]::before {\n  background: #16a34a;\n}\n.analysis-card.process[_ngcontent-%COMP%]::before {\n  background: #2563eb;\n}\n.analysis-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #667085;\n  font-size: 11.5px;\n  font-weight: 900;\n  margin-bottom: 6px;\n}\n.analysis-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #101828;\n  font-size: 25px;\n  font-weight: 900;\n}\n.analysis-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  color: #667085;\n  font-size: 11.5px;\n  line-height: 1.35;\n  font-weight: 700;\n}\n.ranking-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.ranking-row[_ngcontent-%COMP%] {\n  border-radius: 16px;\n  background: #f8fafc;\n  border: 1px solid #edf1f7;\n  padding: 12px;\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n  align-items: center;\n}\n.ranking-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #101828;\n  font-size: 13px;\n  font-weight: 900;\n}\n.ranking-row[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 3px;\n  color: #667085;\n  font-size: 11px;\n  font-weight: 700;\n}\n.ranking-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  min-width: 42px;\n  min-height: 34px;\n  border-radius: 12px;\n  background: #eff6ff;\n  color: #1a3e8c;\n  display: grid;\n  place-items: center;\n  font-size: 12px;\n  font-weight: 900;\n  padding: 0 8px;\n  text-align: center;\n}\n.filter-scroll[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  display: flex;\n  gap: 8px;\n  overflow-x: auto;\n  padding-bottom: 2px;\n}\n.filter-scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n.filter-chip[_ngcontent-%COMP%] {\n  border: 1px solid #d0d5dd;\n  border-radius: 999px;\n  background: #ffffff;\n  color: #344054;\n  height: 34px;\n  padding: 0 13px;\n  font-size: 11.5px;\n  font-weight: 900;\n  white-space: nowrap;\n}\n.filter-chip.active[_ngcontent-%COMP%] {\n  background: #1a3e8c;\n  border-color: #1a3e8c;\n  color: #ffffff;\n}\n.outline-button[_ngcontent-%COMP%] {\n  height: 34px;\n  border-radius: 999px;\n  border: 1px solid #d0d5dd;\n  background: #ffffff;\n  color: #1a3e8c;\n  font-size: 11.5px;\n  font-weight: 900;\n  padding: 0 12px;\n  white-space: nowrap;\n}\n.materiales-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.material-card[_ngcontent-%COMP%] {\n  border-radius: 20px;\n  background: #ffffff;\n  border: 1px solid #e8edf5;\n  padding: 14px;\n  box-shadow: 0 6px 18px rgba(16, 24, 40, 0.05);\n}\n.material-top[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n  align-items: flex-start;\n}\n.codigo[_ngcontent-%COMP%] {\n  display: inline-block;\n  color: #1a3e8c;\n  font-size: 10.5px;\n  font-weight: 900;\n  margin-bottom: 4px;\n}\n.material-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #101828;\n  font-size: 15px;\n  font-weight: 900;\n}\n.material-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: #667085;\n  font-size: 11.5px;\n  font-weight: 700;\n}\n.estado-badge[_ngcontent-%COMP%] {\n  border-radius: 999px;\n  padding: 6px 9px;\n  font-size: 10.5px;\n  font-weight: 900;\n  white-space: nowrap;\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n}\n.estado-badge.success[_ngcontent-%COMP%] {\n  background: #ecfdf3;\n  color: #15803d;\n}\n.estado-badge.warning[_ngcontent-%COMP%] {\n  background: #fff7ed;\n  color: #c2410c;\n}\n.estado-badge.danger[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n}\n.material-info[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 7px;\n}\n.material-info[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  min-height: 56px;\n  border-radius: 14px;\n  background: #f8fafc;\n  border: 1px solid #edf1f7;\n  display: grid;\n  place-items: center;\n  text-align: center;\n  padding: 6px 4px;\n}\n.material-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #101828;\n  font-size: 15px;\n  font-weight: 900;\n}\n.material-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #667085;\n  font-size: 9.5px;\n  font-weight: 800;\n}\n.material-footer[_ngcontent-%COMP%] {\n  margin-top: 11px;\n  border-top: 1px solid #eef2f7;\n  padding-top: 10px;\n}\n.material-footer[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #667085;\n  font-size: 11px;\n  font-weight: 800;\n}\n@media (max-width: 380px) {\n  .summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .date-grid[_ngcontent-%COMP%], \n   .tools-actions[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .section-header[_ngcontent-%COMP%], \n   .material-top[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .outline-button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .material-info[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n/*# sourceMappingURL=reporte-materiales.page.css.map */'] });
var ReporteMaterialesPage = _ReporteMaterialesPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReporteMaterialesPage, [{
    type: Component,
    args: [{ selector: "app-reporte-materiales", standalone: true, imports: [
      CommonModule,
      IonicModule,
      AdminHeaderComponent,
      AdminBottomNavComponent,
      AdminEmptyStateComponent
    ], template: `<!-- src/app/paginas/administrador/reporte-materiales/reporte-materiales.page.html -->
<ion-content [fullscreen]="true" class="reporte-materiales-root">

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

    <main class="reporte-container">

      <div class="page-back-row">
        <button
          type="button"
          class="back-button"
          (click)="volverReportes()"
        >
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>

        <span>Volver a reportes</span>
      </div>

      <section class="hero-card">
        <div class="hero-content">
          <div class="hero-icon">
            <ion-icon name="archive-outline"></ion-icon>
          </div>

          <div>
            <h1>Reporte de materiales</h1>
            <p>
              Analiza stock, materiales usados, materiales devueltos y alertas del almac\xE9n.
            </p>
          </div>
        </div>
      </section>

      <section class="report-tools-card">
        <div class="tools-header">
          <div>
            <h2>Periodo del reporte</h2>
            <p>
              Filtra los materiales usados o devueltos seg\xFAn la fecha de trabajos y devoluciones.
            </p>
          </div>
        </div>

        <div class="date-grid">
          <label class="date-field">
            <span>Desde</span>

            <div class="date-input-wrap">
              <ion-icon name="calendar-outline"></ion-icon>
              <input
                type="date"
                [value]="vm.fechaInicio"
                (change)="cambiarFechaInicio($any($event.target).value)"
              />
            </div>
          </label>

          <label class="date-field">
            <span>Hasta</span>

            <div class="date-input-wrap">
              <ion-icon name="calendar-outline"></ion-icon>
              <input
                type="date"
                [value]="vm.fechaFin"
                (change)="cambiarFechaFin($any($event.target).value)"
              />
            </div>
          </label>
        </div>

        <div class="tools-actions">
          <button
            type="button"
            class="tool-button secondary"
            (click)="limpiarFechas()"
          >
            <ion-icon name="trash-outline"></ion-icon>
            Limpiar
          </button>

          <button
            type="button"
            class="tool-button success"
            (click)="exportarExcel(vm.materialesFiltrados, vm.fechaInicio, vm.fechaFin)"
          >
            <ion-icon name="download-outline"></ion-icon>
            Excel
          </button>

          <button
            type="button"
            class="tool-button danger"
            (click)="exportarPDF(vm.materialesFiltrados, vm.fechaInicio, vm.fechaFin)"
          >
            <ion-icon name="document-text-outline"></ion-icon>
            PDF
          </button>
        </div>
      </section>

      <section class="summary-grid">

        <article class="summary-card total">
          <div>
            <span>Total</span>
            <h2>{{ vm.resumen.totalMateriales }}</h2>
          </div>
          <ion-icon name="archive-outline"></ion-icon>
        </article>

        <article class="summary-card warning">
          <div>
            <span>Stock bajo</span>
            <h2>{{ vm.resumen.stockBajo }}</h2>
          </div>
          <ion-icon name="warning-outline"></ion-icon>
        </article>

        <article class="summary-card danger">
          <div>
            <span>Sin stock</span>
            <h2>{{ vm.resumen.sinStock }}</h2>
          </div>
          <ion-icon name="close-circle-outline"></ion-icon>
        </article>

        <article class="summary-card process">
          <div>
            <span>Usados</span>
            <h2>{{ vm.resumen.materialesUsados }}</h2>
          </div>
          <ion-icon name="bar-chart-outline"></ion-icon>
        </article>

        <article class="summary-card success">
          <div>
            <span>Devueltos</span>
            <h2>{{ vm.resumen.materialesDevueltos }}</h2>
          </div>
          <ion-icon name="checkmark-circle-outline"></ion-icon>
        </article>

        <article class="summary-card primary">
          <div>
            <span>No usados</span>
            <h2>{{ vm.resumen.materialesNoUsados }}</h2>
          </div>
          <ion-icon name="refresh-outline"></ion-icon>
        </article>

      </section>

      <section class="analysis-grid">

        <article class="analysis-card process">
          <span>Cantidad usada</span>
          <h3>{{ vm.resumen.cantidadUsadaTotal }}</h3>
          <p>Total acumulado de materiales asignados o usados en trabajos.</p>
        </article>

        <article class="analysis-card success">
          <span>Cantidad devuelta</span>
          <h3>{{ vm.resumen.cantidadDevueltaTotal }}</h3>
          <p>Total acumulado de materiales devueltos al almac\xE9n.</p>
        </article>

      </section>

      <section class="section-card">
        <div class="section-header">
          <div>
            <h2>Materiales m\xE1s usados</h2>
            <p>Ranking de materiales con mayor consumo en trabajos.</p>
          </div>
        </div>

        <div
          class="ranking-list"
          *ngIf="vm.rankingUsados.length > 0; else sinRankingUsados"
        >
          <article
            class="ranking-row"
            *ngFor="let item of vm.rankingUsados"
          >
            <div>
              <span>{{ item.nombre }}</span>
              <small>{{ item.porcentaje }}% del total usado</small>
            </div>

            <strong>{{ item.total }} {{ item.unidad }}</strong>
          </article>
        </div>

        <ng-template #sinRankingUsados>
          <app-admin-empty-state
            icono="archive-outline"
            titulo="Sin materiales usados"
            descripcion="No hay materiales usados en el periodo seleccionado."
          ></app-admin-empty-state>
        </ng-template>
      </section>

      <section class="section-card">
        <div class="section-header">
          <div>
            <h2>Materiales devueltos</h2>
            <p>Ranking de materiales retornados al almac\xE9n.</p>
          </div>
        </div>

        <div
          class="ranking-list"
          *ngIf="vm.rankingDevueltos.length > 0; else sinRankingDevueltos"
        >
          <article
            class="ranking-row"
            *ngFor="let item of vm.rankingDevueltos"
          >
            <div>
              <span>{{ item.nombre }}</span>
              <small>{{ item.porcentaje }}% del total devuelto</small>
            </div>

            <strong>{{ item.total }} {{ item.unidad }}</strong>
          </article>
        </div>

        <ng-template #sinRankingDevueltos>
          <app-admin-empty-state
            icono="checkmark-circle-outline"
            titulo="Sin devoluciones"
            descripcion="No hay materiales devueltos en el periodo seleccionado."
          ></app-admin-empty-state>
        </ng-template>
      </section>

      <section class="filter-card">
        <h2>Filtrar materiales</h2>

        <div class="filter-scroll">
          <button
            type="button"
            class="filter-chip"
            *ngFor="let filtro of filtros"
            [class.active]="vm.filtro === filtro.valor"
            (click)="cambiarFiltro(filtro.valor)"
          >
            {{ filtro.texto }}
          </button>
        </div>
      </section>

      <section class="section-card">
        <div class="section-header">
          <div>
            <h2>Detalle de materiales</h2>
            <p>{{ vm.totalFiltrados }} registro(s) encontrados.</p>
          </div>

          <button
            type="button"
            class="outline-button"
            (click)="abrirModuloMateriales()"
          >
            Ver almac\xE9n
          </button>
        </div>

        <div
          class="materiales-list"
          *ngIf="vm.materialesFiltrados.length > 0; else sinMateriales"
        >
          <article
            class="material-card"
            *ngFor="let material of vm.materialesFiltrados; trackBy: trackByMaterial"
          >
            <div class="material-top">
              <div>
<span class="codigo">{{ material.codigo }}</span>
                <h3>{{ material.nombre }}</h3>
                <p>{{ material.categoria }} \xB7 {{ material.unidad }}</p>
              </div>

              <span
                class="estado-badge"
                [class.success]="material.estadoStockClase === 'success'"
                [class.warning]="material.estadoStockClase === 'warning'"
                [class.danger]="material.estadoStockClase === 'danger'"
              >
                {{ material.estadoStockTexto }}
              </span>
            </div>

            <div class="material-info">
              <div>
                <strong>{{ material.stockActual }}</strong>
                <span>Stock actual</span>
              </div>

              <div>
                <strong>{{ material.stockMinimo }}</strong>
                <span>Stock m\xEDnimo</span>
              </div>

              <div>
                <strong>{{ material.cantidadUsadaTotal }}</strong>
                <span>Usado</span>
              </div>

              <div>
                <strong>{{ material.cantidadDevueltaTotal }}</strong>
                <span>Devuelto</span>
              </div>
            </div>

            <div class="material-footer">
              <span>{{ material.trabajosAsociados }} trabajo(s) asociado(s)</span>
            </div>
          </article>
        </div>

        <ng-template #sinMateriales>
          <app-admin-empty-state
            icono="archive-outline"
            titulo="Sin materiales"
            descripcion="No hay materiales para los filtros seleccionados."
          ></app-admin-empty-state>
        </ng-template>
      </section>

    </main>

  </ng-container>

  <app-admin-bottom-nav activo="reportes"></app-admin-bottom-nav>

</ion-content>
`, styles: ['/* src/app/paginas/administrador/reporte-materiales/reporte-materiales.page.css */\n:host {\n  display: block;\n}\nion-content.reporte-materiales-root {\n  --background: var(--color-page-outside, #eef2f7);\n}\n.reporte-container {\n  width: 100%;\n  max-width: var(--app-width, 430px);\n  min-height: 100dvh;\n  margin: 0 auto;\n  padding: 14px 14px calc(94px + env(safe-area-inset-bottom));\n  box-sizing: border-box;\n  background: #f5f7fb;\n}\n.page-back-row {\n  width: 100%;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.page-back-row span {\n  color: #344054;\n  font-size: 12px;\n  font-weight: 900;\n}\n.back-button {\n  width: 38px;\n  height: 38px;\n  border: none;\n  background: #ffffff;\n  color: #1a3e8c;\n  border-radius: 14px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  box-shadow: 0 8px 18px rgba(16, 24, 40, 0.08);\n}\n.back-button ion-icon {\n  font-size: 20px;\n  color: #1a3e8c;\n}\n.hero-card {\n  width: 100%;\n  border-radius: 24px;\n  background:\n    linear-gradient(\n      180deg,\n      #173d8f 0%,\n      #102b68 100%);\n  color: #ffffff;\n  padding: 18px 16px;\n  box-shadow: 0 14px 30px rgba(16, 43, 104, 0.25);\n}\n.hero-content {\n  display: flex;\n  gap: 13px;\n  align-items: center;\n}\n.hero-icon {\n  width: 54px;\n  height: 54px;\n  border-radius: 18px;\n  background: rgba(255, 255, 255, 0.18);\n  display: grid;\n  place-items: center;\n  flex: 0 0 auto;\n}\n.hero-icon ion-icon {\n  font-size: 28px;\n  color: #ffffff;\n}\n.hero-content h1 {\n  margin: 0;\n  font-size: 21px;\n  font-weight: 900;\n  letter-spacing: -0.3px;\n}\n.hero-content p {\n  margin: 6px 0 0;\n  font-size: 12px;\n  line-height: 1.4;\n  opacity: 0.95;\n}\n.report-tools-card,\n.section-card,\n.filter-card {\n  margin-top: 14px;\n  border-radius: 22px;\n  background: #ffffff;\n  border: 1px solid #e8edf5;\n  padding: 14px;\n  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.06);\n}\n.tools-header h2,\n.section-header h2,\n.filter-card h2 {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 900;\n  color: #101828;\n}\n.tools-header p,\n.section-header p {\n  margin: 4px 0 0;\n  color: #667085;\n  font-size: 11.5px;\n  line-height: 1.35;\n  font-weight: 700;\n}\n.section-header {\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.date-grid {\n  margin-top: 12px;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px;\n}\n.date-field {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.date-field span {\n  font-size: 11px;\n  font-weight: 900;\n  color: #344054;\n}\n.date-input-wrap {\n  width: 100%;\n  height: 40px;\n  border-radius: 14px;\n  border: 1px solid #d0d5dd;\n  background: #ffffff;\n  position: relative;\n  overflow: hidden;\n  display: block;\n}\n.date-input-wrap:focus-within {\n  border-color: #1a3e8c;\n  box-shadow: 0 0 0 3px rgba(26, 62, 140, 0.12);\n}\n.date-input-wrap ion-icon {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #1a3e8c;\n  font-size: 17px;\n  z-index: 3;\n  pointer-events: none;\n}\n.date-input-wrap input {\n  width: 100%;\n  height: 100%;\n  border: none;\n  outline: none;\n  background: transparent;\n  color: #101828;\n  font-size: 12px;\n  font-weight: 800;\n  padding: 0 40px 0 12px;\n  position: relative;\n  z-index: 2;\n  appearance: none;\n  -webkit-appearance: none;\n}\n.date-input-wrap input::-webkit-calendar-picker-indicator {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 42px;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n  z-index: 4;\n}\n.date-input-wrap input::-webkit-inner-spin-button,\n.date-input-wrap input::-webkit-clear-button {\n  display: none;\n  -webkit-appearance: none;\n}\n.tools-actions {\n  margin-top: 12px;\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 8px;\n}\n.tool-button {\n  height: 38px;\n  border: none;\n  border-radius: 14px;\n  font-size: 11.5px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.tool-button ion-icon {\n  font-size: 16px;\n}\n.tool-button.secondary {\n  background: #f2f4f7;\n  color: #344054;\n}\n.tool-button.secondary ion-icon {\n  color: #344054;\n}\n.tool-button.success {\n  background: #ecfdf3;\n  color: #15803d;\n}\n.tool-button.success ion-icon {\n  color: #15803d;\n}\n.tool-button.danger {\n  background: #fef2f2;\n  color: #dc2626;\n}\n.tool-button.danger ion-icon {\n  color: #dc2626;\n}\n.summary-grid {\n  margin-top: 14px;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px;\n}\n.summary-card {\n  min-height: 92px;\n  border-radius: 20px;\n  background: #ffffff;\n  border: 1px solid #e8edf5;\n  padding: 14px;\n  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.06);\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n.summary-card span {\n  display: block;\n  color: #667085;\n  font-size: 11.5px;\n  font-weight: 800;\n  margin-bottom: 7px;\n}\n.summary-card h2 {\n  margin: 0;\n  color: #101828;\n  font-size: 25px;\n  font-weight: 900;\n}\n.summary-card ion-icon {\n  font-size: 24px;\n  flex: 0 0 auto;\n}\n.summary-card.total ion-icon {\n  color: #1a3e8c;\n}\n.summary-card.primary ion-icon {\n  color: #1d4ed8;\n}\n.summary-card.warning ion-icon {\n  color: #f59e0b;\n}\n.summary-card.process ion-icon {\n  color: #2563eb;\n}\n.summary-card.success ion-icon {\n  color: #16a34a;\n}\n.summary-card.danger ion-icon {\n  color: #dc2626;\n}\n.analysis-grid {\n  margin-top: 14px;\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 10px;\n}\n.analysis-card {\n  border-radius: 20px;\n  background: #ffffff;\n  border: 1px solid #e8edf5;\n  padding: 14px;\n  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.06);\n  position: relative;\n  overflow: hidden;\n}\n.analysis-card::before {\n  content: "";\n  position: absolute;\n  inset: 0 auto 0 0;\n  width: 5px;\n  border-radius: 20px 0 0 20px;\n  background: #1a3e8c;\n}\n.analysis-card.success::before {\n  background: #16a34a;\n}\n.analysis-card.process::before {\n  background: #2563eb;\n}\n.analysis-card span {\n  display: block;\n  color: #667085;\n  font-size: 11.5px;\n  font-weight: 900;\n  margin-bottom: 6px;\n}\n.analysis-card h3 {\n  margin: 0;\n  color: #101828;\n  font-size: 25px;\n  font-weight: 900;\n}\n.analysis-card p {\n  margin: 6px 0 0;\n  color: #667085;\n  font-size: 11.5px;\n  line-height: 1.35;\n  font-weight: 700;\n}\n.ranking-list {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.ranking-row {\n  border-radius: 16px;\n  background: #f8fafc;\n  border: 1px solid #edf1f7;\n  padding: 12px;\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n  align-items: center;\n}\n.ranking-row span {\n  display: block;\n  color: #101828;\n  font-size: 13px;\n  font-weight: 900;\n}\n.ranking-row small {\n  display: block;\n  margin-top: 3px;\n  color: #667085;\n  font-size: 11px;\n  font-weight: 700;\n}\n.ranking-row strong {\n  min-width: 42px;\n  min-height: 34px;\n  border-radius: 12px;\n  background: #eff6ff;\n  color: #1a3e8c;\n  display: grid;\n  place-items: center;\n  font-size: 12px;\n  font-weight: 900;\n  padding: 0 8px;\n  text-align: center;\n}\n.filter-scroll {\n  margin-top: 12px;\n  display: flex;\n  gap: 8px;\n  overflow-x: auto;\n  padding-bottom: 2px;\n}\n.filter-scroll::-webkit-scrollbar {\n  display: none;\n}\n.filter-chip {\n  border: 1px solid #d0d5dd;\n  border-radius: 999px;\n  background: #ffffff;\n  color: #344054;\n  height: 34px;\n  padding: 0 13px;\n  font-size: 11.5px;\n  font-weight: 900;\n  white-space: nowrap;\n}\n.filter-chip.active {\n  background: #1a3e8c;\n  border-color: #1a3e8c;\n  color: #ffffff;\n}\n.outline-button {\n  height: 34px;\n  border-radius: 999px;\n  border: 1px solid #d0d5dd;\n  background: #ffffff;\n  color: #1a3e8c;\n  font-size: 11.5px;\n  font-weight: 900;\n  padding: 0 12px;\n  white-space: nowrap;\n}\n.materiales-list {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.material-card {\n  border-radius: 20px;\n  background: #ffffff;\n  border: 1px solid #e8edf5;\n  padding: 14px;\n  box-shadow: 0 6px 18px rgba(16, 24, 40, 0.05);\n}\n.material-top {\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n  align-items: flex-start;\n}\n.codigo {\n  display: inline-block;\n  color: #1a3e8c;\n  font-size: 10.5px;\n  font-weight: 900;\n  margin-bottom: 4px;\n}\n.material-card h3 {\n  margin: 0;\n  color: #101828;\n  font-size: 15px;\n  font-weight: 900;\n}\n.material-card p {\n  margin: 4px 0 0;\n  color: #667085;\n  font-size: 11.5px;\n  font-weight: 700;\n}\n.estado-badge {\n  border-radius: 999px;\n  padding: 6px 9px;\n  font-size: 10.5px;\n  font-weight: 900;\n  white-space: nowrap;\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n}\n.estado-badge.success {\n  background: #ecfdf3;\n  color: #15803d;\n}\n.estado-badge.warning {\n  background: #fff7ed;\n  color: #c2410c;\n}\n.estado-badge.danger {\n  background: #fef2f2;\n  color: #dc2626;\n}\n.material-info {\n  margin-top: 12px;\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 7px;\n}\n.material-info div {\n  min-height: 56px;\n  border-radius: 14px;\n  background: #f8fafc;\n  border: 1px solid #edf1f7;\n  display: grid;\n  place-items: center;\n  text-align: center;\n  padding: 6px 4px;\n}\n.material-info strong {\n  color: #101828;\n  font-size: 15px;\n  font-weight: 900;\n}\n.material-info span {\n  color: #667085;\n  font-size: 9.5px;\n  font-weight: 800;\n}\n.material-footer {\n  margin-top: 11px;\n  border-top: 1px solid #eef2f7;\n  padding-top: 10px;\n}\n.material-footer span {\n  color: #667085;\n  font-size: 11px;\n  font-weight: 800;\n}\n@media (max-width: 380px) {\n  .summary-grid {\n    grid-template-columns: 1fr;\n  }\n  .date-grid,\n  .tools-actions {\n    grid-template-columns: 1fr;\n  }\n  .section-header,\n  .material-top {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .outline-button {\n    width: 100%;\n  }\n  .material-info {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n/*# sourceMappingURL=reporte-materiales.page.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReporteMaterialesPage, { className: "ReporteMaterialesPage", filePath: "src/app/paginas/administrador/reporte-materiales/reporte-materiales.page.ts", lineNumber: 57 });
})();
export {
  ReporteMaterialesPage
};
//# sourceMappingURL=reporte-materiales.page-SJ2JPZX7.js.map
