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
  arrowBackOutline,
  barChartOutline,
  briefcaseOutline,
  calendarOutline,
  checkmarkCircleOutline,
  clipboardOutline,
  documentTextOutline,
  downloadOutline,
  locationOutline,
  peopleOutline,
  refreshOutline,
  timeOutline,
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
  ɵɵstyleProp,
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

// src/app/dao/reporte-trabajos.dao.ts
var _ReporteTrabajosDAO = class _ReporteTrabajosDAO {
  constructor() {
    this.firestore = inject(Firestore);
  }
  escucharTrabajos() {
    const ref = collection(this.firestore, "trabajos");
    return collectionData(ref, { idField: "uid" });
  }
  escucharEmpleados() {
    const ref = collection(this.firestore, "empleados");
    return collectionData(ref, { idField: "uid" });
  }
};
_ReporteTrabajosDAO.\u0275fac = function ReporteTrabajosDAO_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ReporteTrabajosDAO)();
};
_ReporteTrabajosDAO.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReporteTrabajosDAO, factory: _ReporteTrabajosDAO.\u0275fac, providedIn: "root" });
var ReporteTrabajosDAO = _ReporteTrabajosDAO;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReporteTrabajosDAO, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/procesos/reporte-trabajos.service.ts
var _ReporteTrabajosService = class _ReporteTrabajosService {
  constructor() {
    this.reporteDAO = inject(ReporteTrabajosDAO);
    this.filtroSubject = new BehaviorSubject("todos");
    this.fechaInicioSubject = new BehaviorSubject("");
    this.fechaFinSubject = new BehaviorSubject("");
    this.vm$ = combineLatest([
      this.reporteDAO.escucharTrabajos().pipe(catchError((error) => {
        console.error("[ReporteTrabajosService] Error al escuchar trabajos:", error);
        return of([]);
      })),
      this.reporteDAO.escucharEmpleados().pipe(catchError((error) => {
        console.error("[ReporteTrabajosService] Error al escuchar empleados:", error);
        return of([]);
      })),
      this.filtroSubject.asObservable(),
      this.fechaInicioSubject.asObservable(),
      this.fechaFinSubject.asObservable()
    ]).pipe(map(([trabajos, empleados, filtro, fechaInicio, fechaFin]) => {
      const trabajosVista = this.mapearTrabajos(trabajos, empleados);
      const trabajosPorEstado = this.filtrarTrabajosPorEstado(trabajosVista, filtro);
      const trabajosFiltrados = this.filtrarTrabajosPorFecha(trabajosPorEstado, fechaInicio, fechaFin);
      const resumen = this.calcularResumen(trabajosFiltrados);
      const estados = this.calcularEstados(resumen);
      const tiposTrabajo = this.calcularTiposTrabajo(trabajosFiltrados);
      const empleadosResumen = this.calcularEmpleadosResumen(trabajosFiltrados);
      return {
        filtro,
        fechaInicio,
        fechaFin,
        resumen,
        estados,
        tiposTrabajo,
        empleadosResumen,
        trabajos: trabajosVista,
        trabajosFiltrados,
        trabajosRecientes: trabajosFiltrados.slice(0, 6),
        totalFiltrados: trabajosFiltrados.length
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
  mapearTrabajos(trabajos, empleados) {
    const empleadosMap = /* @__PURE__ */ new Map();
    empleados.forEach((empleado) => {
      const uid = this.obtenerUid(empleado);
      if (uid) {
        empleadosMap.set(uid, empleado);
      }
    });
    return (trabajos || []).filter((trabajo) => trabajo?.eliminado !== true && trabajo?.eliminada !== true).map((trabajo) => this.mapearTrabajo(trabajo, empleadosMap)).sort((a, b) => b.fechaReporteOrden - a.fechaReporteOrden);
  }
  mapearTrabajo(trabajo, empleadosMap) {
    const uid = this.obtenerUid(trabajo);
    const estado = this.normalizarEstado(trabajo?.estado || trabajo?.estadoTrabajo || "pendiente");
    const fechaProgramada = this.convertirFecha(trabajo?.fechaProgramada);
    const creadoEnFecha = this.convertirFecha(trabajo?.creadoEn || trabajo?.fechaCreacion || trabajo?.createdAt);
    const fechaReporte = fechaProgramada || creadoEnFecha;
    return {
      uid,
      codigo: this.obtenerCodigoTrabajo(trabajo),
      clienteNombre: String(trabajo?.clienteNombre || trabajo?.cliente || "Cliente no registrado"),
      clienteTelefono: String(trabajo?.clienteTelefono || trabajo?.telefono || ""),
      direccion: String(trabajo?.direccion || trabajo?.direccionMapa || trabajo?.ubicacionTextoOriginal || ""),
      tipoTrabajo: String(trabajo?.tipoTrabajo || trabajo?.tipo || "Trabajo"),
      descripcion: String(trabajo?.descripcion || ""),
      estado,
      estadoTexto: this.obtenerEstadoTexto(estado),
      estadoClase: this.obtenerEstadoClase(estado),
      empleadosTexto: this.obtenerEmpleadosTexto(trabajo, empleadosMap),
      materialesTexto: this.obtenerMaterialesTexto(trabajo),
      fechaProgramadaTexto: this.formatearFecha(fechaProgramada),
      horaProgramadaTexto: String(trabajo?.horaProgramada || ""),
      creadoEnTexto: this.formatearFecha(creadoEnFecha),
      fechaReporteOrden: fechaReporte ? fechaReporte.getTime() : 0,
      creadoEnOrden: creadoEnFecha ? creadoEnFecha.getTime() : 0
    };
  }
  calcularResumen(trabajos) {
    const totalTrabajos = trabajos.length;
    const pendientes = trabajos.filter((item) => item.estado === "pendiente").length;
    const asignados = trabajos.filter((item) => item.estado === "asignado").length;
    const enCamino = trabajos.filter((item) => item.estado === "en_camino").length;
    const enProceso = trabajos.filter((item) => item.estado === "en_proceso").length;
    const finalizados = trabajos.filter((item) => item.estado === "finalizado" || item.estado === "cerrado").length;
    const devolucionPendiente = trabajos.filter((item) => item.estado === "devolucion_pendiente").length;
    const devolucionRealizada = trabajos.filter((item) => item.estado === "devolucion_realizada").length;
    const cancelados = trabajos.filter((item) => item.estado === "cancelado").length;
    const trabajosActivos = pendientes + asignados + enCamino + enProceso + devolucionPendiente;
    const devolucionesTotal = devolucionPendiente + devolucionRealizada;
    return {
      totalTrabajos,
      pendientes,
      asignados,
      enCamino,
      enProceso,
      finalizados,
      devolucionPendiente,
      devolucionRealizada,
      cancelados,
      trabajosActivos,
      devolucionesTotal,
      porcentajeFinalizacion: this.obtenerPorcentaje(finalizados, totalTrabajos),
      porcentajeActivos: this.obtenerPorcentaje(trabajosActivos, totalTrabajos)
    };
  }
  calcularEstados(resumen) {
    const total = Math.max(resumen.totalTrabajos, 1);
    return [
      {
        estado: "pendiente",
        titulo: "Pendientes",
        total: resumen.pendientes,
        porcentaje: this.obtenerPorcentaje(resumen.pendientes, total),
        clase: "warning"
      },
      {
        estado: "asignado",
        titulo: "Asignados",
        total: resumen.asignados,
        porcentaje: this.obtenerPorcentaje(resumen.asignados, total),
        clase: "primary"
      },
      {
        estado: "en_camino",
        titulo: "En camino",
        total: resumen.enCamino,
        porcentaje: this.obtenerPorcentaje(resumen.enCamino, total),
        clase: "info"
      },
      {
        estado: "en_proceso",
        titulo: "En proceso",
        total: resumen.enProceso,
        porcentaje: this.obtenerPorcentaje(resumen.enProceso, total),
        clase: "process"
      },
      {
        estado: "finalizado",
        titulo: "Finalizados",
        total: resumen.finalizados,
        porcentaje: this.obtenerPorcentaje(resumen.finalizados, total),
        clase: "success"
      },
      {
        estado: "devoluciones",
        titulo: "Con devoluci\xF3n",
        total: resumen.devolucionesTotal,
        porcentaje: this.obtenerPorcentaje(resumen.devolucionesTotal, total),
        clase: "purple"
      },
      {
        estado: "cancelado",
        titulo: "Cancelados",
        total: resumen.cancelados,
        porcentaje: this.obtenerPorcentaje(resumen.cancelados, total),
        clase: "danger"
      }
    ];
  }
  calcularTiposTrabajo(trabajos) {
    const total = Math.max(trabajos.length, 1);
    const conteo = /* @__PURE__ */ new Map();
    trabajos.forEach((trabajo) => {
      const tipo = trabajo.tipoTrabajo || "Trabajo";
      conteo.set(tipo, (conteo.get(tipo) || 0) + 1);
    });
    return Array.from(conteo.entries()).map(([tipo, cantidad]) => ({
      tipo,
      total: cantidad,
      porcentaje: this.obtenerPorcentaje(cantidad, total)
    })).sort((a, b) => b.total - a.total).slice(0, 5);
  }
  calcularEmpleadosResumen(trabajos) {
    const conteo = /* @__PURE__ */ new Map();
    trabajos.forEach((trabajo) => {
      const empleados = trabajo.empleadosTexto.split(",").map((item) => item.trim()).filter((item) => item && item !== "Sin empleado asignado");
      empleados.forEach((empleado) => {
        conteo.set(empleado, (conteo.get(empleado) || 0) + 1);
      });
    });
    return Array.from(conteo.entries()).map(([empleado, cantidad]) => ({
      empleado,
      total: cantidad
    })).sort((a, b) => b.total - a.total).slice(0, 5);
  }
  filtrarTrabajosPorEstado(trabajos, filtro) {
    if (filtro === "todos") {
      return trabajos;
    }
    if (filtro === "pendientes") {
      return trabajos.filter((item) => item.estado === "pendiente");
    }
    if (filtro === "asignados") {
      return trabajos.filter((item) => item.estado === "asignado");
    }
    if (filtro === "en_camino") {
      return trabajos.filter((item) => item.estado === "en_camino");
    }
    if (filtro === "en_proceso") {
      return trabajos.filter((item) => item.estado === "en_proceso");
    }
    if (filtro === "finalizados") {
      return trabajos.filter((item) => item.estado === "finalizado" || item.estado === "cerrado");
    }
    if (filtro === "devoluciones") {
      return trabajos.filter((item) => item.estado === "devolucion_pendiente" || item.estado === "devolucion_realizada");
    }
    if (filtro === "cancelados") {
      return trabajos.filter((item) => item.estado === "cancelado");
    }
    return trabajos;
  }
  filtrarTrabajosPorFecha(trabajos, fechaInicio, fechaFin) {
    const inicio = this.convertirFechaInput(fechaInicio, false);
    const fin = this.convertirFechaInput(fechaFin, true);
    if (!inicio && !fin) {
      return trabajos;
    }
    return trabajos.filter((trabajo) => {
      if (!trabajo.fechaReporteOrden) {
        return false;
      }
      if (inicio && trabajo.fechaReporteOrden < inicio.getTime()) {
        return false;
      }
      if (fin && trabajo.fechaReporteOrden > fin.getTime()) {
        return false;
      }
      return true;
    });
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
  obtenerCodigoTrabajo(trabajo) {
    const codigoGuardado = String(trabajo?.codigoTrabajo || trabajo?.codigo || trabajo?.numero || "").trim();
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
  obtenerEmpleadosTexto(trabajo, empleadosMap) {
    const empleadosRaw = trabajo?.empleadosAsignados || trabajo?.empleados || trabajo?.empleadosIds || [];
    if (!Array.isArray(empleadosRaw) || empleadosRaw.length === 0) {
      return "Sin empleado asignado";
    }
    const nombres = empleadosRaw.map((item) => {
      if (typeof item === "string") {
        const empleado = empleadosMap.get(item);
        return empleado ? this.obtenerNombreEmpleado(empleado) : item;
      }
      return item?.nombreCompleto || item?.nombres || item?.nombre || item?.empleadoNombre || item?.correo || "Empleado";
    });
    return nombres.filter(Boolean).join(", ");
  }
  obtenerMaterialesTexto(trabajo) {
    const materialesRaw = trabajo?.materialesAsignados || trabajo?.materiales || [];
    if (!Array.isArray(materialesRaw) || materialesRaw.length === 0) {
      return "Sin materiales registrados";
    }
    return materialesRaw.map((material) => {
      const nombre = String(material?.nombre || material?.materialNombre || material?.nombreMaterial || "Material").trim();
      const cantidad = this.obtenerCantidadMaterial(material);
      const unidad = String(material?.unidad || material?.unidadMedida || "Unidad").trim();
      return `${nombre} (${cantidad} ${unidad})`;
    }).join(", ");
  }
  obtenerCantidadMaterial(material) {
    const posiblesCantidades = [
      material?.cantidadAsignada,
      material?.cantidad,
      material?.cantidadUsada,
      material?.cantidadSolicitada,
      material?.cantidadSeleccionada,
      material?.cantidadMaterial
    ];
    for (const valor of posiblesCantidades) {
      const numero = Number(valor);
      if (!isNaN(numero) && numero > 0) {
        return numero;
      }
    }
    return 0;
  }
  obtenerNombreEmpleado(empleado) {
    return String(empleado?.nombreCompleto || empleado?.nombres || empleado?.nombre || empleado?.usuario || empleado?.correo || "Empleado");
  }
  obtenerUid(item) {
    return String(item?.uid || item?.id || "");
  }
  normalizarEstado(estado) {
    const valor = String(estado || "").trim().toLowerCase();
    if (valor === "pendiente") {
      return "pendiente";
    }
    if (valor === "asignado") {
      return "asignado";
    }
    if (valor === "en camino" || valor === "en_camino" || valor === "encamino") {
      return "en_camino";
    }
    if (valor === "en proceso" || valor === "en_proceso" || valor === "proceso") {
      return "en_proceso";
    }
    if (valor === "finalizado" || valor === "terminado") {
      return "finalizado";
    }
    if (valor === "devolucion pendiente" || valor === "devolucion_pendiente") {
      return "devolucion_pendiente";
    }
    if (valor === "devolucion realizada" || valor === "devolucion_realizada") {
      return "devolucion_realizada";
    }
    if (valor === "cerrado") {
      return "cerrado";
    }
    if (valor === "cancelado") {
      return "cancelado";
    }
    return "pendiente";
  }
  obtenerEstadoTexto(estado) {
    const textos = {
      pendiente: "Pendiente",
      asignado: "Asignado",
      en_camino: "En camino",
      en_proceso: "En proceso",
      finalizado: "Finalizado",
      devolucion_pendiente: "Devoluci\xF3n pendiente",
      devolucion_realizada: "Devoluci\xF3n realizada",
      cerrado: "Cerrado",
      cancelado: "Cancelado"
    };
    return textos[estado] || "Pendiente";
  }
  obtenerEstadoClase(estado) {
    if (estado === "pendiente") {
      return "warning";
    }
    if (estado === "asignado") {
      return "primary";
    }
    if (estado === "en_camino") {
      return "info";
    }
    if (estado === "en_proceso") {
      return "process";
    }
    if (estado === "finalizado" || estado === "devolucion_realizada" || estado === "cerrado") {
      return "success";
    }
    if (estado === "devolucion_pendiente") {
      return "purple";
    }
    if (estado === "cancelado") {
      return "danger";
    }
    return "warning";
  }
  obtenerPorcentaje(valor, total) {
    if (!total) {
      return 0;
    }
    return Math.round(valor / total * 100);
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
    if (valor instanceof Date) {
      return valor;
    }
    if (typeof valor?.toDate === "function") {
      return valor.toDate();
    }
    if (typeof valor === "string") {
      if (/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
        const [anio, mes, dia] = valor.split("-").map(Number);
        return new Date(anio, mes - 1, dia);
      }
      const fecha = new Date(valor);
      if (!isNaN(fecha.getTime())) {
        return fecha;
      }
    }
    return null;
  }
};
_ReporteTrabajosService.\u0275fac = function ReporteTrabajosService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ReporteTrabajosService)();
};
_ReporteTrabajosService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReporteTrabajosService, factory: _ReporteTrabajosService.\u0275fac, providedIn: "root" });
var ReporteTrabajosService = _ReporteTrabajosService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReporteTrabajosService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/paginas/administrador/reporte-trabajos/reporte-trabajos.page.ts
function ReporteTrabajosPage_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "app-admin-header", 6);
    \u0275\u0275listener("menuClick", function ReporteTrabajosPage_ng_container_1_Template_app_admin_header_menuClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirMenu());
    })("notificacionesClick", function ReporteTrabajosPage_ng_container_1_Template_app_admin_header_notificacionesClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirNotificaciones());
    })("perfilClick", function ReporteTrabajosPage_ng_container_1_Template_app_admin_header_perfilClick_1_listener() {
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
function ReporteTrabajosPage_ng_container_3_article_136_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 59)(1, "div", 60)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 61);
    \u0275\u0275element(7, "div", 62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const estado_r6 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(estado_r6.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(estado_r6.total);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", estado_r6.porcentaje, "%");
    \u0275\u0275classProp("warning", estado_r6.clase === "warning")("primary", estado_r6.clase === "primary")("info", estado_r6.clase === "info")("process", estado_r6.clase === "process")("success", estado_r6.clase === "success")("purple", estado_r6.clase === "purple")("danger", estado_r6.clase === "danger");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", estado_r6.porcentaje, "%");
  }
}
function ReporteTrabajosPage_ng_container_3_div_144_article_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 65)(1, "div")(2, "span");
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
    const tipo_r7 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tipo_r7.tipo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", tipo_r7.porcentaje, "% del total");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tipo_r7.total);
  }
}
function ReporteTrabajosPage_ng_container_3_div_144_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275template(1, ReporteTrabajosPage_ng_container_3_div_144_article_1_Template, 8, 3, "article", 64);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r5 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", vm_r5.tiposTrabajo);
  }
}
function ReporteTrabajosPage_ng_container_3_ng_template_145_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-admin-empty-state", 66);
  }
}
function ReporteTrabajosPage_ng_container_3_div_154_article_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 65)(1, "div")(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small");
    \u0275\u0275text(5, "Trabajos asignados");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const empleado_r8 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(empleado_r8.empleado);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(empleado_r8.total);
  }
}
function ReporteTrabajosPage_ng_container_3_div_154_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275template(1, ReporteTrabajosPage_ng_container_3_div_154_article_1_Template, 8, 2, "article", 64);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r5 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", vm_r5.empleadosResumen);
  }
}
function ReporteTrabajosPage_ng_container_3_ng_template_155_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-admin-empty-state", 67);
  }
}
function ReporteTrabajosPage_ng_container_3_button_161_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 68);
    \u0275\u0275listener("click", function ReporteTrabajosPage_ng_container_3_button_161_Template_button_click_0_listener() {
      const filtro_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cambiarFiltro(filtro_r10.valor));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const filtro_r10 = ctx.$implicit;
    const vm_r5 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275classProp("active", vm_r5.filtro === filtro_r10.valor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", filtro_r10.texto, " ");
  }
}
function ReporteTrabajosPage_ng_container_3_div_171_article_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 71)(1, "div", 72)(2, "div")(3, "span", 73);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 74);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 75)(12, "div");
    \u0275\u0275element(13, "ion-icon", 20);
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div");
    \u0275\u0275element(17, "ion-icon", 39);
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div");
    \u0275\u0275element(21, "ion-icon", 37);
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div");
    \u0275\u0275element(25, "ion-icon", 28);
    \u0275\u0275elementStart(26, "span");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const trabajo_r11 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("#", trabajo_r11.codigo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(trabajo_r11.clienteNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(trabajo_r11.tipoTrabajo);
    \u0275\u0275advance();
    \u0275\u0275classProp("warning", trabajo_r11.estadoClase === "warning")("primary", trabajo_r11.estadoClase === "primary")("info", trabajo_r11.estadoClase === "info")("process", trabajo_r11.estadoClase === "process")("success", trabajo_r11.estadoClase === "success")("purple", trabajo_r11.estadoClase === "purple")("danger", trabajo_r11.estadoClase === "danger");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", trabajo_r11.estadoTexto, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", trabajo_r11.fechaProgramadaTexto, " ", trabajo_r11.horaProgramadaTexto);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(trabajo_r11.direccion || "Sin direcci\xF3n registrada");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(trabajo_r11.empleadosTexto);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(trabajo_r11.materialesTexto);
  }
}
function ReporteTrabajosPage_ng_container_3_div_171_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275template(1, ReporteTrabajosPage_ng_container_3_div_171_article_1_Template, 28, 23, "article", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r5 = \u0275\u0275nextContext().ngIf;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", vm_r5.trabajosFiltrados)("ngForTrackBy", ctx_r1.trackByTrabajo);
  }
}
function ReporteTrabajosPage_ng_container_3_ng_template_172_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-admin-empty-state", 76);
  }
}
function ReporteTrabajosPage_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "main", 7)(2, "div", 8)(3, "button", 9);
    \u0275\u0275listener("click", function ReporteTrabajosPage_ng_container_3_Template_button_click_3_listener() {
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
    \u0275\u0275text(13, "Reporte operativo de trabajos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p");
    \u0275\u0275text(15, " Analiza trabajos por estado, periodo, avance, devoluciones, tipos de servicio y empleados asignados. ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(16, "section", 15)(17, "div", 16)(18, "div")(19, "h2");
    \u0275\u0275text(20, "Periodo del reporte");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p");
    \u0275\u0275text(22, " Filtra los trabajos por fecha programada. Si el trabajo no tiene fecha programada, se usa la fecha de registro. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 17)(24, "label", 18)(25, "span");
    \u0275\u0275text(26, "Desde");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 19);
    \u0275\u0275element(28, "ion-icon", 20);
    \u0275\u0275elementStart(29, "input", 21);
    \u0275\u0275listener("change", function ReporteTrabajosPage_ng_container_3_Template_input_change_29_listener($event) {
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
    \u0275\u0275listener("change", function ReporteTrabajosPage_ng_container_3_Template_input_change_35_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarFechaInicio($event.target.value));
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(36, "div", 22)(37, "button", 23);
    \u0275\u0275listener("click", function ReporteTrabajosPage_ng_container_3_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.limpiarFechas());
    });
    \u0275\u0275element(38, "ion-icon", 24);
    \u0275\u0275text(39, " Limpiar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "button", 25);
    \u0275\u0275listener("click", function ReporteTrabajosPage_ng_container_3_Template_button_click_40_listener() {
      const vm_r5 = \u0275\u0275restoreView(_r4).ngIf;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.exportarExcel(vm_r5.trabajosFiltrados, vm_r5.fechaInicio, vm_r5.fechaFin));
    });
    \u0275\u0275element(41, "ion-icon", 26);
    \u0275\u0275text(42, " Excel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 27);
    \u0275\u0275listener("click", function ReporteTrabajosPage_ng_container_3_Template_button_click_43_listener() {
      const vm_r5 = \u0275\u0275restoreView(_r4).ngIf;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.exportarPDF(vm_r5.trabajosFiltrados, vm_r5.fechaInicio, vm_r5.fechaFin));
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
    \u0275\u0275element(53, "ion-icon", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "article", 32)(55, "div")(56, "span");
    \u0275\u0275text(57, "Activos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "h2");
    \u0275\u0275text(59);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(60, "ion-icon", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "article", 34)(62, "div")(63, "span");
    \u0275\u0275text(64, "Pendientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "h2");
    \u0275\u0275text(66);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(67, "ion-icon", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "article", 36)(69, "div")(70, "span");
    \u0275\u0275text(71, "Asignados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "h2");
    \u0275\u0275text(73);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(74, "ion-icon", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "article", 38)(76, "div")(77, "span");
    \u0275\u0275text(78, "En camino");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "h2");
    \u0275\u0275text(80);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(81, "ion-icon", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "article", 32)(83, "div")(84, "span");
    \u0275\u0275text(85, "En proceso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "h2");
    \u0275\u0275text(87);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(88, "ion-icon", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "article", 41)(90, "div")(91, "span");
    \u0275\u0275text(92, "Finalizados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(93, "h2");
    \u0275\u0275text(94);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(95, "ion-icon", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "article", 43)(97, "div")(98, "span");
    \u0275\u0275text(99, "Cancelados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(100, "h2");
    \u0275\u0275text(101);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(102, "ion-icon", 44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(103, "section", 45)(104, "article", 46)(105, "div")(106, "span");
    \u0275\u0275text(107, "Finalizaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(108, "h3");
    \u0275\u0275text(109);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(110, "p");
    \u0275\u0275text(111, "Trabajos finalizados respecto al total filtrado.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(112, "article", 47)(113, "div")(114, "span");
    \u0275\u0275text(115, "Actividad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(116, "h3");
    \u0275\u0275text(117);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(118, "p");
    \u0275\u0275text(119, "Trabajos activos, pendientes, asignados o en ejecuci\xF3n.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(120, "article", 48)(121, "div")(122, "span");
    \u0275\u0275text(123, "Devoluciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(124, "h3");
    \u0275\u0275text(125);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(126, "p");
    \u0275\u0275text(127, "Trabajos con devoluci\xF3n pendiente o realizada.");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(128, "section", 49)(129, "div", 50)(130, "div")(131, "h2");
    \u0275\u0275text(132, "Trabajos por estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(133, "p");
    \u0275\u0275text(134, " Distribuci\xF3n operativa seg\xFAn el periodo y filtro seleccionado. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(135, "div", 51);
    \u0275\u0275template(136, ReporteTrabajosPage_ng_container_3_article_136_Template, 10, 19, "article", 52);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(137, "section", 49)(138, "div", 50)(139, "div")(140, "h2");
    \u0275\u0275text(141, "Tipos de trabajo m\xE1s frecuentes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(142, "p");
    \u0275\u0275text(143, " Servicios con mayor recurrencia dentro del reporte. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(144, ReporteTrabajosPage_ng_container_3_div_144_Template, 2, 1, "div", 53)(145, ReporteTrabajosPage_ng_container_3_ng_template_145_Template, 1, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(147, "section", 49)(148, "div", 50)(149, "div")(150, "h2");
    \u0275\u0275text(151, "Empleados con m\xE1s trabajos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(152, "p");
    \u0275\u0275text(153, " Ranking de empleados seg\xFAn trabajos asignados en el periodo. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(154, ReporteTrabajosPage_ng_container_3_div_154_Template, 2, 1, "div", 53)(155, ReporteTrabajosPage_ng_container_3_ng_template_155_Template, 1, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(157, "section", 54)(158, "h2");
    \u0275\u0275text(159, "Filtrar por estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(160, "div", 55);
    \u0275\u0275template(161, ReporteTrabajosPage_ng_container_3_button_161_Template, 2, 3, "button", 56);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(162, "section", 49)(163, "div", 50)(164, "div")(165, "h2");
    \u0275\u0275text(166, "Detalle de trabajos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(167, "p");
    \u0275\u0275text(168);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(169, "button", 57);
    \u0275\u0275listener("click", function ReporteTrabajosPage_ng_container_3_Template_button_click_169_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirModuloTrabajos());
    });
    \u0275\u0275text(170, " Ver m\xF3dulo ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(171, ReporteTrabajosPage_ng_container_3_div_171_Template, 2, 2, "div", 58)(172, ReporteTrabajosPage_ng_container_3_ng_template_172_Template, 1, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const vm_r5 = ctx.ngIf;
    const sinTipos_r12 = \u0275\u0275reference(146);
    const sinEmpleados_r13 = \u0275\u0275reference(156);
    const sinTrabajos_r14 = \u0275\u0275reference(173);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(29);
    \u0275\u0275property("value", vm_r5.fechaInicio);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", vm_r5.fechaInicio);
    \u0275\u0275advance(17);
    \u0275\u0275textInterpolate(vm_r5.resumen.totalTrabajos);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(vm_r5.resumen.trabajosActivos);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(vm_r5.resumen.pendientes);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(vm_r5.resumen.asignados);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(vm_r5.resumen.enCamino);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(vm_r5.resumen.enProceso);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(vm_r5.resumen.finalizados);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(vm_r5.resumen.cancelados);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", vm_r5.resumen.porcentajeFinalizacion, "%");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", vm_r5.resumen.porcentajeActivos, "%");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(vm_r5.resumen.devolucionesTotal);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngForOf", vm_r5.estados);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", vm_r5.tiposTrabajo.length > 0)("ngIfElse", sinTipos_r12);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngIf", vm_r5.empleadosResumen.length > 0)("ngIfElse", sinEmpleados_r13);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r1.filtros);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", vm_r5.totalFiltrados, " registro(s) encontrados.");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", vm_r5.trabajosFiltrados.length > 0)("ngIfElse", sinTrabajos_r14);
  }
}
var _ReporteTrabajosPage = class _ReporteTrabajosPage {
  constructor() {
    this.navCtrl = inject(NavController);
    this.toastCtrl = inject(ToastController);
    this.cdr = inject(ChangeDetectorRef);
    this.dashboardAdminService = inject(DashboardAdminService);
    this.reporteTrabajosService = inject(ReporteTrabajosService);
    this.logoReportePath = "assets/img/logo.png";
    this.adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
    this.vm$ = this.reporteTrabajosService.vm$;
    this.filtros = [
      { valor: "todos", texto: "Todos" },
      { valor: "pendientes", texto: "Pendientes" },
      { valor: "asignados", texto: "Asignados" },
      { valor: "en_camino", texto: "En camino" },
      { valor: "en_proceso", texto: "En proceso" },
      { valor: "finalizados", texto: "Finalizados" },
      { valor: "devoluciones", texto: "Devoluciones" },
      { valor: "cancelados", texto: "Cancelados" }
    ];
    addIcons({
      "arrow-back-outline": arrowBackOutline,
      "bar-chart-outline": barChartOutline,
      "briefcase-outline": briefcaseOutline,
      "calendar-outline": calendarOutline,
      "checkmark-circle-outline": checkmarkCircleOutline,
      "clipboard-outline": clipboardOutline,
      "document-text-outline": documentTextOutline,
      "download-outline": downloadOutline,
      "location-outline": locationOutline,
      "people-outline": peopleOutline,
      "refresh-outline": refreshOutline,
      "time-outline": timeOutline,
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
    this.reporteTrabajosService.cambiarFiltro(filtro);
  }
  cambiarFechaInicio(valor) {
    this.reporteTrabajosService.cambiarFechaInicio(this.normalizarFechaInput(valor));
  }
  cambiarFechaFin(valor) {
    this.reporteTrabajosService.cambiarFechaFin(this.normalizarFechaInput(valor));
  }
  limpiarFechas() {
    this.reporteTrabajosService.limpiarRangoFechas();
  }
  volverReportes() {
    this.navCtrl.navigateRoot("/reportes", {
      animated: false,
      replaceUrl: true
    });
  }
  abrirModuloTrabajos() {
    this.navCtrl.navigateRoot("/asignacion-trabajos", {
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
  exportarExcel(trabajos, fechaInicio = "", fechaFin = "") {
    if (!trabajos || trabajos.length === 0) {
      this.mostrarToast("No hay datos para exportar.", "primary");
      return;
    }
    const encabezados = [
      "C\xF3digo",
      "Cliente",
      "Tel\xE9fono",
      "Tipo de trabajo",
      "Estado",
      "Empleados",
      "Materiales",
      "Fecha programada",
      "Hora",
      "Direcci\xF3n",
      "Descripci\xF3n"
    ];
    const filas = trabajos.map((trabajo) => [
      trabajo.codigo,
      trabajo.clienteNombre,
      trabajo.clienteTelefono,
      trabajo.tipoTrabajo,
      trabajo.estadoTexto,
      trabajo.empleadosTexto,
      trabajo.materialesTexto,
      trabajo.fechaProgramadaTexto,
      trabajo.horaProgramadaTexto,
      trabajo.direccion,
      trabajo.descripcion
    ]);
    const contenidoFilas = [
      ["Reporte operativo de trabajos"],
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
    enlace.download = `reporte-trabajos-${this.obtenerFechaArchivo()}.csv`;
    enlace.click();
    window.URL.revokeObjectURL(url);
    this.mostrarToast("Reporte exportado para Excel.", "success");
  }
  exportarPDF(trabajos, fechaInicio = "", fechaFin = "") {
    return __async(this, null, function* () {
      if (!trabajos || trabajos.length === 0) {
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
        const resumenOperativo = this.obtenerResumenOperativo(trabajos);
        this.dibujarEncabezadoPDF(doc, logoBase64, periodoTexto, fechaEmision);
        this.dibujarResumenPDF(doc, resumenOperativo);
        const cuerpoTabla = trabajos.map((trabajo, index) => [
          String(index + 1),
          trabajo.codigo,
          trabajo.clienteNombre,
          trabajo.tipoTrabajo,
          trabajo.estadoTexto,
          trabajo.fechaProgramadaTexto,
          trabajo.empleadosTexto,
          trabajo.direccion
        ]);
        autoTable(doc, {
          startY: 80,
          head: [[
            "N\xB0",
            "C\xF3digo",
            "Cliente",
            "Tipo",
            "Estado",
            "Fecha",
            "Empleado(s)",
            "Direcci\xF3n"
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
            cellPadding: 2.2,
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
          },
          columnStyles: {
            0: { cellWidth: 10, halign: "center" },
            1: { cellWidth: 24 },
            2: { cellWidth: 42 },
            3: { cellWidth: 36 },
            4: { cellWidth: 30 },
            5: { cellWidth: 28 },
            6: { cellWidth: 56 },
            7: { cellWidth: 58 }
          }
        });
        this.dibujarPiePaginasPDF(doc);
        doc.save(`reporte-trabajos-${this.obtenerFechaArchivo()}.pdf`);
        this.mostrarToast("Reporte PDF descargado correctamente.", "success");
      } catch (error) {
        console.error("[ReporteTrabajosPage] Error al exportar PDF:", error);
        this.mostrarToast("No se pudo generar el PDF.", "danger");
      }
    });
  }
  trackByTrabajo(index, trabajo) {
    return trabajo.uid || String(index);
  }
  obtenerResumenOperativo(trabajos) {
    const total = trabajos.length;
    const activos = trabajos.filter((item) => item.estado === "pendiente" || item.estado === "asignado" || item.estado === "en_camino" || item.estado === "en_proceso" || item.estado === "devolucion_pendiente").length;
    const finalizados = trabajos.filter((item) => item.estado === "finalizado" || item.estado === "cerrado").length;
    const devoluciones = trabajos.filter((item) => item.estado === "devolucion_pendiente" || item.estado === "devolucion_realizada").length;
    const cancelados = trabajos.filter((item) => item.estado === "cancelado").length;
    return {
      total,
      activos,
      finalizados,
      devoluciones,
      cancelados
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
    } else {
      doc.setFillColor(23, 61, 143);
      doc.circle(31, 21, 9, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text("CO", 31, 24, {
        align: "center"
      });
    }
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("REPORTE OPERATIVO DE TRABAJOS", 55, 18);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("COMPROY S.A.C.", 55, 25);
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
    this.dibujarTarjetaResumenPDF(doc, inicioX + (ancho + espacio), y, ancho, alto, "Activos", String(resumen.activos), [37, 99, 235]);
    this.dibujarTarjetaResumenPDF(doc, inicioX + (ancho + espacio) * 2, y, ancho, alto, "Finalizados", String(resumen.finalizados), [22, 163, 74]);
    this.dibujarTarjetaResumenPDF(doc, inicioX + (ancho + espacio) * 3, y, ancho, alto, "Devoluciones", String(resumen.devoluciones), [124, 58, 237]);
    this.dibujarTarjetaResumenPDF(doc, inicioX + (ancho + espacio) * 4, y, ancho, alto, "Cancelados", String(resumen.cancelados), [220, 38, 38]);
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
      doc.text("Control operativo | Reporte operativo de trabajos", 14, pageHeight - 8);
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
        } catch (error) {
          console.error("[ReporteTrabajosPage] Error al convertir logo:", error);
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
_ReporteTrabajosPage.\u0275fac = function ReporteTrabajosPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ReporteTrabajosPage)();
};
_ReporteTrabajosPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReporteTrabajosPage, selectors: [["app-reporte-trabajos"]], decls: 6, vars: 7, consts: [["sinTipos", ""], ["sinEmpleados", ""], ["sinTrabajos", ""], [1, "reporte-trabajos-root", 3, "fullscreen"], [4, "ngIf"], ["activo", "reportes"], [3, "menuClick", "notificacionesClick", "perfilClick", "nombre", "rol", "fotoUrl", "notificaciones"], [1, "reporte-container"], [1, "page-back-row"], ["type", "button", 1, "back-button", 3, "click"], ["name", "arrow-back-outline"], [1, "hero-card"], [1, "hero-content"], [1, "hero-icon"], ["name", "bar-chart-outline"], [1, "report-tools-card"], [1, "tools-header"], [1, "date-grid"], [1, "date-field"], [1, "date-input-wrap"], ["name", "calendar-outline"], ["type", "date", 3, "change", "value"], [1, "tools-actions"], ["type", "button", 1, "tool-button", "secondary", 3, "click"], ["name", "trash-outline"], ["type", "button", 1, "tool-button", "success", 3, "click"], ["name", "download-outline"], ["type", "button", 1, "tool-button", "danger", 3, "click"], ["name", "document-text-outline"], [1, "summary-grid"], [1, "summary-card", "total"], ["name", "briefcase-outline"], [1, "summary-card", "process"], ["name", "refresh-outline"], [1, "summary-card", "warning"], ["name", "time-outline"], [1, "summary-card", "primary"], ["name", "people-outline"], [1, "summary-card", "info"], ["name", "location-outline"], ["name", "clipboard-outline"], [1, "summary-card", "success"], ["name", "checkmark-circle-outline"], [1, "summary-card", "danger"], ["name", "warning-outline"], [1, "analysis-grid"], [1, "analysis-card", "success"], [1, "analysis-card", "process"], [1, "analysis-card", "purple"], [1, "section-card"], [1, "section-header"], [1, "estado-list"], ["class", "estado-row", 4, "ngFor", "ngForOf"], ["class", "ranking-list", 4, "ngIf", "ngIfElse"], [1, "filter-card"], [1, "filter-scroll"], ["type", "button", "class", "filter-chip", 3, "active", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "outline-button", 3, "click"], ["class", "trabajos-list", 4, "ngIf", "ngIfElse"], [1, "estado-row"], [1, "estado-info"], [1, "progress-track"], [1, "progress-fill"], [1, "ranking-list"], ["class", "ranking-row", 4, "ngFor", "ngForOf"], [1, "ranking-row"], ["icono", "clipboard-outline", "titulo", "Sin tipos de trabajo", "descripcion", "No hay datos suficientes para mostrar tipos de trabajo."], ["icono", "people-outline", "titulo", "Sin empleados asignados", "descripcion", "No hay empleados asociados a los trabajos filtrados."], ["type", "button", 1, "filter-chip", 3, "click"], [1, "trabajos-list"], ["class", "trabajo-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "trabajo-card"], [1, "trabajo-top"], [1, "codigo"], [1, "estado-badge"], [1, "trabajo-info"], ["icono", "briefcase-outline", "titulo", "Sin trabajos", "descripcion", "No hay trabajos para los filtros seleccionados."]], template: function ReporteTrabajosPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 3);
    \u0275\u0275template(1, ReporteTrabajosPage_ng_container_1_Template, 2, 4, "ng-container", 4);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275template(3, ReporteTrabajosPage_ng_container_3_Template, 174, 22, "ng-container", 4);
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
], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n}\nion-content.reporte-trabajos-root[_ngcontent-%COMP%] {\n  --background: var(--color-page-outside, #eef2f7);\n}\n.reporte-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: var(--app-width, 430px);\n  min-height: 100dvh;\n  margin: 0 auto;\n  padding: 14px 14px calc(94px + env(safe-area-inset-bottom));\n  box-sizing: border-box;\n  background: #f5f7fb;\n}\n.page-back-row[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.page-back-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #344054;\n  font-size: 12px;\n  font-weight: 900;\n}\n.back-button[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border: none;\n  background: #ffffff;\n  color: #1a3e8c;\n  border-radius: 14px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  box-shadow: 0 8px 18px rgba(16, 24, 40, 0.08);\n}\n.back-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #1a3e8c;\n}\n.hero-card[_ngcontent-%COMP%] {\n  width: 100%;\n  border-radius: 24px;\n  background:\n    linear-gradient(\n      180deg,\n      #173d8f 0%,\n      #102b68 100%);\n  color: #ffffff;\n  padding: 18px 16px;\n  box-shadow: 0 14px 30px rgba(16, 43, 104, 0.25);\n}\n.hero-content[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 13px;\n  align-items: center;\n  margin-top: 0;\n}\n.hero-icon[_ngcontent-%COMP%] {\n  width: 54px;\n  height: 54px;\n  border-radius: 18px;\n  background: rgba(255, 255, 255, 0.18);\n  display: grid;\n  place-items: center;\n  flex: 0 0 auto;\n}\n.hero-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: #ffffff;\n}\n.hero-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 21px;\n  font-weight: 900;\n  letter-spacing: -0.3px;\n}\n.hero-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  font-size: 12px;\n  line-height: 1.4;\n  opacity: 0.95;\n}\n.report-tools-card[_ngcontent-%COMP%], \n.section-card[_ngcontent-%COMP%], \n.filter-card[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  border-radius: 22px;\n  background: #ffffff;\n  border: 1px solid #e8edf5;\n  padding: 14px;\n  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.06);\n}\n.tools-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.filter-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 900;\n  color: #101828;\n}\n.tools-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.section-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: #667085;\n  font-size: 11.5px;\n  line-height: 1.35;\n  font-weight: 700;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.date-grid[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px;\n}\n.date-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.date-field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 900;\n  color: #344054;\n}\n.date-input-wrap[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 40px;\n  border-radius: 14px;\n  border: 1px solid #d0d5dd;\n  background: #ffffff;\n  position: relative;\n  overflow: hidden;\n  display: block;\n}\n.date-input-wrap[_ngcontent-%COMP%]:focus-within {\n  border-color: #1a3e8c;\n  box-shadow: 0 0 0 3px rgba(26, 62, 140, 0.12);\n}\n.date-input-wrap[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #1a3e8c;\n  font-size: 17px;\n  z-index: 3;\n  pointer-events: none;\n}\n.date-input-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border: none;\n  outline: none;\n  background: transparent;\n  color: #101828;\n  font-size: 12px;\n  font-weight: 800;\n  padding: 0 40px 0 12px;\n  position: relative;\n  z-index: 2;\n  appearance: none;\n  -webkit-appearance: none;\n}\n.date-input-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-calendar-picker-indicator {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 42px;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n  z-index: 4;\n}\n.date-input-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-inner-spin-button, \n.date-input-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-clear-button {\n  display: none;\n  -webkit-appearance: none;\n}\n.tools-actions[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 8px;\n}\n.tool-button[_ngcontent-%COMP%] {\n  height: 38px;\n  border: none;\n  border-radius: 14px;\n  font-size: 11.5px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.tool-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.tool-button.secondary[_ngcontent-%COMP%] {\n  background: #f2f4f7;\n  color: #344054;\n}\n.tool-button.secondary[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #344054;\n}\n.tool-button.success[_ngcontent-%COMP%] {\n  background: #ecfdf3;\n  color: #15803d;\n}\n.tool-button.success[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #15803d;\n}\n.tool-button.danger[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n}\n.tool-button.danger[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.tool-button[_ngcontent-%COMP%]:active, \n.back-button[_ngcontent-%COMP%]:active, \n.outline-button[_ngcontent-%COMP%]:active, \n.filter-chip[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n.summary-grid[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px;\n}\n.summary-card[_ngcontent-%COMP%] {\n  min-height: 92px;\n  border-radius: 20px;\n  background: #ffffff;\n  border: 1px solid #e8edf5;\n  padding: 14px;\n  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.06);\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n.summary-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #667085;\n  font-size: 11.5px;\n  font-weight: 800;\n  margin-bottom: 7px;\n}\n.summary-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #101828;\n  font-size: 25px;\n  font-weight: 900;\n}\n.summary-card[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  flex: 0 0 auto;\n}\n.summary-card.total[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #1a3e8c;\n}\n.summary-card.primary[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #1d4ed8;\n}\n.summary-card.warning[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #f59e0b;\n}\n.summary-card.info[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #0ea5e9;\n}\n.summary-card.process[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n.summary-card.success[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n.summary-card.danger[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.analysis-grid[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 10px;\n}\n.analysis-card[_ngcontent-%COMP%] {\n  border-radius: 20px;\n  background: #ffffff;\n  border: 1px solid #e8edf5;\n  padding: 14px;\n  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.06);\n  position: relative;\n  overflow: hidden;\n}\n.analysis-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0 auto 0 0;\n  width: 5px;\n  border-radius: 20px 0 0 20px;\n  background: #1a3e8c;\n}\n.analysis-card.success[_ngcontent-%COMP%]::before {\n  background: #16a34a;\n}\n.analysis-card.process[_ngcontent-%COMP%]::before {\n  background: #2563eb;\n}\n.analysis-card.purple[_ngcontent-%COMP%]::before {\n  background: #7c3aed;\n}\n.analysis-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #667085;\n  font-size: 11.5px;\n  font-weight: 900;\n  margin-bottom: 6px;\n}\n.analysis-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #101828;\n  font-size: 25px;\n  font-weight: 900;\n}\n.analysis-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  color: #667085;\n  font-size: 11.5px;\n  line-height: 1.35;\n  font-weight: 700;\n}\n.estado-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.estado-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 92px 1fr 42px;\n  gap: 8px;\n  align-items: center;\n}\n.estado-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11.5px;\n  font-weight: 800;\n  color: #344054;\n}\n.estado-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 2px;\n  font-size: 15px;\n  font-weight: 900;\n  color: #101828;\n}\n.progress-track[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 9px;\n  border-radius: 999px;\n  background: #edf1f7;\n  overflow: hidden;\n}\n.progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  min-width: 4px;\n  border-radius: 999px;\n  background: #1a3e8c;\n}\n.progress-fill.warning[_ngcontent-%COMP%] {\n  background: #f59e0b;\n}\n.progress-fill.primary[_ngcontent-%COMP%] {\n  background: #1a3e8c;\n}\n.progress-fill.info[_ngcontent-%COMP%] {\n  background: #0ea5e9;\n}\n.progress-fill.process[_ngcontent-%COMP%] {\n  background: #2563eb;\n}\n.progress-fill.success[_ngcontent-%COMP%] {\n  background: #16a34a;\n}\n.progress-fill.purple[_ngcontent-%COMP%] {\n  background: #7c3aed;\n}\n.progress-fill.danger[_ngcontent-%COMP%] {\n  background: #dc2626;\n}\n.estado-row[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 900;\n  color: #667085;\n  text-align: right;\n}\n.ranking-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.ranking-row[_ngcontent-%COMP%] {\n  border-radius: 16px;\n  background: #f8fafc;\n  border: 1px solid #edf1f7;\n  padding: 12px;\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n  align-items: center;\n}\n.ranking-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #101828;\n  font-size: 13px;\n  font-weight: 900;\n}\n.ranking-row[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 3px;\n  color: #667085;\n  font-size: 11px;\n  font-weight: 700;\n}\n.ranking-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  min-width: 34px;\n  height: 34px;\n  border-radius: 12px;\n  background: #eff6ff;\n  color: #1a3e8c;\n  display: grid;\n  place-items: center;\n  font-size: 15px;\n  font-weight: 900;\n}\n.filter-scroll[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  display: flex;\n  gap: 8px;\n  overflow-x: auto;\n  padding-bottom: 2px;\n}\n.filter-scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n.filter-chip[_ngcontent-%COMP%] {\n  border: 1px solid #d0d5dd;\n  border-radius: 999px;\n  background: #ffffff;\n  color: #344054;\n  height: 34px;\n  padding: 0 13px;\n  font-size: 11.5px;\n  font-weight: 900;\n  white-space: nowrap;\n}\n.filter-chip.active[_ngcontent-%COMP%] {\n  background: #1a3e8c;\n  border-color: #1a3e8c;\n  color: #ffffff;\n}\n.outline-button[_ngcontent-%COMP%] {\n  height: 34px;\n  border-radius: 999px;\n  border: 1px solid #d0d5dd;\n  background: #ffffff;\n  color: #1a3e8c;\n  font-size: 11.5px;\n  font-weight: 900;\n  padding: 0 12px;\n  white-space: nowrap;\n}\n.trabajos-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.trabajo-card[_ngcontent-%COMP%] {\n  border-radius: 20px;\n  background: #ffffff;\n  border: 1px solid #e8edf5;\n  padding: 14px;\n  box-shadow: 0 6px 18px rgba(16, 24, 40, 0.05);\n}\n.trabajo-top[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n  align-items: flex-start;\n}\n.codigo[_ngcontent-%COMP%] {\n  display: inline-block;\n  color: #1a3e8c;\n  font-size: 10.5px;\n  font-weight: 900;\n  margin-bottom: 4px;\n}\n.trabajo-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #101828;\n  font-size: 15px;\n  font-weight: 900;\n}\n.trabajo-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: #667085;\n  font-size: 11.5px;\n  font-weight: 700;\n}\n.estado-badge[_ngcontent-%COMP%] {\n  border-radius: 999px;\n  padding: 6px 9px;\n  font-size: 10.5px;\n  font-weight: 900;\n  white-space: nowrap;\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n}\n.estado-badge.warning[_ngcontent-%COMP%] {\n  background: #fff7ed;\n  color: #c2410c;\n}\n.estado-badge.primary[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  color: #1d4ed8;\n}\n.estado-badge.info[_ngcontent-%COMP%] {\n  background: #ecfeff;\n  color: #0891b2;\n}\n.estado-badge.process[_ngcontent-%COMP%] {\n  background: #eef2ff;\n  color: #4338ca;\n}\n.estado-badge.success[_ngcontent-%COMP%] {\n  background: #ecfdf3;\n  color: #15803d;\n}\n.estado-badge.purple[_ngcontent-%COMP%] {\n  background: #f5f3ff;\n  color: #6d28d9;\n}\n.estado-badge.danger[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n}\n.trabajo-info[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.trabajo-info[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: flex-start;\n  color: #475467;\n  font-size: 11.5px;\n  line-height: 1.35;\n  font-weight: 700;\n}\n.trabajo-info[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #1a3e8c;\n  font-size: 15px;\n  flex: 0 0 auto;\n  margin-top: 1px;\n}\n@media (max-width: 380px) {\n  .summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .date-grid[_ngcontent-%COMP%], \n   .tools-actions[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .estado-row[_ngcontent-%COMP%] {\n    grid-template-columns: 82px 1fr 36px;\n  }\n  .section-header[_ngcontent-%COMP%], \n   .trabajo-top[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .outline-button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=reporte-trabajos.page.css.map */'] });
var ReporteTrabajosPage = _ReporteTrabajosPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReporteTrabajosPage, [{
    type: Component,
    args: [{ selector: "app-reporte-trabajos", standalone: true, imports: [
      CommonModule,
      IonicModule,
      AdminHeaderComponent,
      AdminBottomNavComponent,
      AdminEmptyStateComponent
    ], template: `<!-- src/app/paginas/administrador/reporte-trabajos/reporte-trabajos.page.html -->

<ion-content [fullscreen]="true" class="reporte-trabajos-root">

<ng-container *ngIf="adminVm$ | async as adminVm">
<app-admin-header
[nombre]="adminVm.administrador.nombres || adminVm.administrador.usuario || adminVm.administrador.correo || 'Administrador'"
[rol]="'Administrador'"
[fotoUrl]="adminVm.administrador.fotoUrl || ''"
[notificaciones]="adminVm.resumen.notificacionesNoLeidas"
(menuClick)="abrirMenu()"
(notificacionesClick)="abrirNotificaciones()"
(perfilClick)="abrirPerfil()"
></app-admin-header> </ng-container>

<ng-container *ngIf="vm$ | async as vm"> <main class="reporte-container">


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
      <ion-icon name="bar-chart-outline"></ion-icon>
    </div>

    <div>
      <h1>Reporte operativo de trabajos</h1>
      <p>
        Analiza trabajos por estado, periodo, avance, devoluciones, tipos de servicio y empleados asignados.
      </p>
    </div>
  </div>
</section>

  <section class="report-tools-card">
    <div class="tools-header">
      <div>
        <h2>Periodo del reporte</h2>
        <p>
          Filtra los trabajos por fecha programada. Si el trabajo no tiene fecha programada, se usa la fecha de registro.
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
    [value]="vm.fechaInicio"
    (change)="cambiarFechaInicio($any($event.target).value)"
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
        (click)="exportarExcel(vm.trabajosFiltrados, vm.fechaInicio, vm.fechaFin)"
      >
        <ion-icon name="download-outline"></ion-icon>
        Excel
      </button>

      <button
        type="button"
        class="tool-button danger"
        (click)="exportarPDF(vm.trabajosFiltrados, vm.fechaInicio, vm.fechaFin)"
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
        <h2>{{ vm.resumen.totalTrabajos }}</h2>
      </div>
      <ion-icon name="briefcase-outline"></ion-icon>
    </article>

    <article class="summary-card process">
      <div>
        <span>Activos</span>
        <h2>{{ vm.resumen.trabajosActivos }}</h2>
      </div>
      <ion-icon name="refresh-outline"></ion-icon>
    </article>

    <article class="summary-card warning">
      <div>
        <span>Pendientes</span>
        <h2>{{ vm.resumen.pendientes }}</h2>
      </div>
      <ion-icon name="time-outline"></ion-icon>
    </article>

    <article class="summary-card primary">
      <div>
        <span>Asignados</span>
        <h2>{{ vm.resumen.asignados }}</h2>
      </div>
      <ion-icon name="people-outline"></ion-icon>
    </article>

    <article class="summary-card info">
      <div>
        <span>En camino</span>
        <h2>{{ vm.resumen.enCamino }}</h2>
      </div>
      <ion-icon name="location-outline"></ion-icon>
    </article>

    <article class="summary-card process">
      <div>
        <span>En proceso</span>
        <h2>{{ vm.resumen.enProceso }}</h2>
      </div>
      <ion-icon name="clipboard-outline"></ion-icon>
    </article>

    <article class="summary-card success">
      <div>
        <span>Finalizados</span>
        <h2>{{ vm.resumen.finalizados }}</h2>
      </div>
      <ion-icon name="checkmark-circle-outline"></ion-icon>
    </article>

    <article class="summary-card danger">
      <div>
        <span>Cancelados</span>
        <h2>{{ vm.resumen.cancelados }}</h2>
      </div>
      <ion-icon name="warning-outline"></ion-icon>
    </article>

  </section>

  <section class="analysis-grid">

    <article class="analysis-card success">
      <div>
        <span>Finalizaci\xF3n</span>
        <h3>{{ vm.resumen.porcentajeFinalizacion }}%</h3>
        <p>Trabajos finalizados respecto al total filtrado.</p>
      </div>
    </article>

    <article class="analysis-card process">
      <div>
        <span>Actividad</span>
        <h3>{{ vm.resumen.porcentajeActivos }}%</h3>
        <p>Trabajos activos, pendientes, asignados o en ejecuci\xF3n.</p>
      </div>
    </article>

    <article class="analysis-card purple">
      <div>
        <span>Devoluciones</span>
        <h3>{{ vm.resumen.devolucionesTotal }}</h3>
        <p>Trabajos con devoluci\xF3n pendiente o realizada.</p>
      </div>
    </article>

  </section>

  <section class="section-card">
    <div class="section-header">
      <div>
        <h2>Trabajos por estado</h2>
        <p>
          Distribuci\xF3n operativa seg\xFAn el periodo y filtro seleccionado.
        </p>
      </div>
    </div>

    <div class="estado-list">
      <article
        class="estado-row"
        *ngFor="let estado of vm.estados"
      >
        <div class="estado-info">
          <span>{{ estado.titulo }}</span>
          <strong>{{ estado.total }}</strong>
        </div>

        <div class="progress-track">
          <div
            class="progress-fill"
            [class.warning]="estado.clase === 'warning'"
            [class.primary]="estado.clase === 'primary'"
            [class.info]="estado.clase === 'info'"
            [class.process]="estado.clase === 'process'"
            [class.success]="estado.clase === 'success'"
            [class.purple]="estado.clase === 'purple'"
            [class.danger]="estado.clase === 'danger'"
            [style.width.%]="estado.porcentaje"
          ></div>
        </div>

        <small>{{ estado.porcentaje }}%</small>
      </article>
    </div>
  </section>

  <section class="section-card">
    <div class="section-header">
      <div>
        <h2>Tipos de trabajo m\xE1s frecuentes</h2>
        <p>
          Servicios con mayor recurrencia dentro del reporte.
        </p>
      </div>
    </div>

    <div
      class="ranking-list"
      *ngIf="vm.tiposTrabajo.length > 0; else sinTipos"
    >
      <article
        class="ranking-row"
        *ngFor="let tipo of vm.tiposTrabajo"
      >
        <div>
          <span>{{ tipo.tipo }}</span>
          <small>{{ tipo.porcentaje }}% del total</small>
        </div>

        <strong>{{ tipo.total }}</strong>
      </article>
    </div>

    <ng-template #sinTipos>
      <app-admin-empty-state
        icono="clipboard-outline"
        titulo="Sin tipos de trabajo"
        descripcion="No hay datos suficientes para mostrar tipos de trabajo."
      ></app-admin-empty-state>
    </ng-template>
  </section>

  <section class="section-card">
    <div class="section-header">
      <div>
        <h2>Empleados con m\xE1s trabajos</h2>
        <p>
          Ranking de empleados seg\xFAn trabajos asignados en el periodo.
        </p>
      </div>
    </div>

    <div
      class="ranking-list"
      *ngIf="vm.empleadosResumen.length > 0; else sinEmpleados"
    >
      <article
        class="ranking-row"
        *ngFor="let empleado of vm.empleadosResumen"
      >
        <div>
          <span>{{ empleado.empleado }}</span>
          <small>Trabajos asignados</small>
        </div>

        <strong>{{ empleado.total }}</strong>
      </article>
    </div>

    <ng-template #sinEmpleados>
      <app-admin-empty-state
        icono="people-outline"
        titulo="Sin empleados asignados"
        descripcion="No hay empleados asociados a los trabajos filtrados."
      ></app-admin-empty-state>
    </ng-template>
  </section>

  <section class="filter-card">
    <h2>Filtrar por estado</h2>

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
        <h2>Detalle de trabajos</h2>
        <p>{{ vm.totalFiltrados }} registro(s) encontrados.</p>
      </div>

      <button
        type="button"
        class="outline-button"
        (click)="abrirModuloTrabajos()"
      >
        Ver m\xF3dulo
      </button>
    </div>

    <div
      class="trabajos-list"
      *ngIf="vm.trabajosFiltrados.length > 0; else sinTrabajos"
    >
      <article
        class="trabajo-card"
        *ngFor="let trabajo of vm.trabajosFiltrados; trackBy: trackByTrabajo"
      >
        <div class="trabajo-top">
          <div>
            <span class="codigo">#{{ trabajo.codigo }}</span>
            <h3>{{ trabajo.clienteNombre }}</h3>
            <p>{{ trabajo.tipoTrabajo }}</p>
          </div>

          <span
            class="estado-badge"
            [class.warning]="trabajo.estadoClase === 'warning'"
            [class.primary]="trabajo.estadoClase === 'primary'"
            [class.info]="trabajo.estadoClase === 'info'"
            [class.process]="trabajo.estadoClase === 'process'"
            [class.success]="trabajo.estadoClase === 'success'"
            [class.purple]="trabajo.estadoClase === 'purple'"
            [class.danger]="trabajo.estadoClase === 'danger'"
          >
            {{ trabajo.estadoTexto }}
          </span>
        </div>

        <div class="trabajo-info">
          <div>
            <ion-icon name="calendar-outline"></ion-icon>
            <span>{{ trabajo.fechaProgramadaTexto }} {{ trabajo.horaProgramadaTexto }}</span>
          </div>

          <div>
            <ion-icon name="location-outline"></ion-icon>
            <span>{{ trabajo.direccion || 'Sin direcci\xF3n registrada' }}</span>
          </div>

          <div>
            <ion-icon name="people-outline"></ion-icon>
            <span>{{ trabajo.empleadosTexto }}</span>
          </div>

          <div>
            <ion-icon name="document-text-outline"></ion-icon>
            <span>{{ trabajo.materialesTexto }}</span>
          </div>
        </div>
      </article>
    </div>

    <ng-template #sinTrabajos>
      <app-admin-empty-state
        icono="briefcase-outline"
        titulo="Sin trabajos"
        descripcion="No hay trabajos para los filtros seleccionados."
      ></app-admin-empty-state>
    </ng-template>
  </section>

</main>


  </ng-container>

<app-admin-bottom-nav activo="reportes"></app-admin-bottom-nav>

</ion-content>
`, styles: ['/* src/app/paginas/administrador/reporte-trabajos/reporte-trabajos.page.css */\n:host {\n  display: block;\n}\nion-content.reporte-trabajos-root {\n  --background: var(--color-page-outside, #eef2f7);\n}\n.reporte-container {\n  width: 100%;\n  max-width: var(--app-width, 430px);\n  min-height: 100dvh;\n  margin: 0 auto;\n  padding: 14px 14px calc(94px + env(safe-area-inset-bottom));\n  box-sizing: border-box;\n  background: #f5f7fb;\n}\n.page-back-row {\n  width: 100%;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.page-back-row span {\n  color: #344054;\n  font-size: 12px;\n  font-weight: 900;\n}\n.back-button {\n  width: 38px;\n  height: 38px;\n  border: none;\n  background: #ffffff;\n  color: #1a3e8c;\n  border-radius: 14px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  box-shadow: 0 8px 18px rgba(16, 24, 40, 0.08);\n}\n.back-button ion-icon {\n  font-size: 20px;\n  color: #1a3e8c;\n}\n.hero-card {\n  width: 100%;\n  border-radius: 24px;\n  background:\n    linear-gradient(\n      180deg,\n      #173d8f 0%,\n      #102b68 100%);\n  color: #ffffff;\n  padding: 18px 16px;\n  box-shadow: 0 14px 30px rgba(16, 43, 104, 0.25);\n}\n.hero-content {\n  display: flex;\n  gap: 13px;\n  align-items: center;\n  margin-top: 0;\n}\n.hero-icon {\n  width: 54px;\n  height: 54px;\n  border-radius: 18px;\n  background: rgba(255, 255, 255, 0.18);\n  display: grid;\n  place-items: center;\n  flex: 0 0 auto;\n}\n.hero-icon ion-icon {\n  font-size: 28px;\n  color: #ffffff;\n}\n.hero-content h1 {\n  margin: 0;\n  font-size: 21px;\n  font-weight: 900;\n  letter-spacing: -0.3px;\n}\n.hero-content p {\n  margin: 6px 0 0;\n  font-size: 12px;\n  line-height: 1.4;\n  opacity: 0.95;\n}\n.report-tools-card,\n.section-card,\n.filter-card {\n  margin-top: 14px;\n  border-radius: 22px;\n  background: #ffffff;\n  border: 1px solid #e8edf5;\n  padding: 14px;\n  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.06);\n}\n.tools-header h2,\n.section-header h2,\n.filter-card h2 {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 900;\n  color: #101828;\n}\n.tools-header p,\n.section-header p {\n  margin: 4px 0 0;\n  color: #667085;\n  font-size: 11.5px;\n  line-height: 1.35;\n  font-weight: 700;\n}\n.section-header {\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.date-grid {\n  margin-top: 12px;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px;\n}\n.date-field {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.date-field span {\n  font-size: 11px;\n  font-weight: 900;\n  color: #344054;\n}\n.date-input-wrap {\n  width: 100%;\n  height: 40px;\n  border-radius: 14px;\n  border: 1px solid #d0d5dd;\n  background: #ffffff;\n  position: relative;\n  overflow: hidden;\n  display: block;\n}\n.date-input-wrap:focus-within {\n  border-color: #1a3e8c;\n  box-shadow: 0 0 0 3px rgba(26, 62, 140, 0.12);\n}\n.date-input-wrap ion-icon {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #1a3e8c;\n  font-size: 17px;\n  z-index: 3;\n  pointer-events: none;\n}\n.date-input-wrap input {\n  width: 100%;\n  height: 100%;\n  border: none;\n  outline: none;\n  background: transparent;\n  color: #101828;\n  font-size: 12px;\n  font-weight: 800;\n  padding: 0 40px 0 12px;\n  position: relative;\n  z-index: 2;\n  appearance: none;\n  -webkit-appearance: none;\n}\n.date-input-wrap input::-webkit-calendar-picker-indicator {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 42px;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n  z-index: 4;\n}\n.date-input-wrap input::-webkit-inner-spin-button,\n.date-input-wrap input::-webkit-clear-button {\n  display: none;\n  -webkit-appearance: none;\n}\n.tools-actions {\n  margin-top: 12px;\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 8px;\n}\n.tool-button {\n  height: 38px;\n  border: none;\n  border-radius: 14px;\n  font-size: 11.5px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.tool-button ion-icon {\n  font-size: 16px;\n}\n.tool-button.secondary {\n  background: #f2f4f7;\n  color: #344054;\n}\n.tool-button.secondary ion-icon {\n  color: #344054;\n}\n.tool-button.success {\n  background: #ecfdf3;\n  color: #15803d;\n}\n.tool-button.success ion-icon {\n  color: #15803d;\n}\n.tool-button.danger {\n  background: #fef2f2;\n  color: #dc2626;\n}\n.tool-button.danger ion-icon {\n  color: #dc2626;\n}\n.tool-button:active,\n.back-button:active,\n.outline-button:active,\n.filter-chip:active {\n  transform: scale(0.98);\n}\n.summary-grid {\n  margin-top: 14px;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px;\n}\n.summary-card {\n  min-height: 92px;\n  border-radius: 20px;\n  background: #ffffff;\n  border: 1px solid #e8edf5;\n  padding: 14px;\n  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.06);\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n.summary-card span {\n  display: block;\n  color: #667085;\n  font-size: 11.5px;\n  font-weight: 800;\n  margin-bottom: 7px;\n}\n.summary-card h2 {\n  margin: 0;\n  color: #101828;\n  font-size: 25px;\n  font-weight: 900;\n}\n.summary-card ion-icon {\n  font-size: 24px;\n  flex: 0 0 auto;\n}\n.summary-card.total ion-icon {\n  color: #1a3e8c;\n}\n.summary-card.primary ion-icon {\n  color: #1d4ed8;\n}\n.summary-card.warning ion-icon {\n  color: #f59e0b;\n}\n.summary-card.info ion-icon {\n  color: #0ea5e9;\n}\n.summary-card.process ion-icon {\n  color: #2563eb;\n}\n.summary-card.success ion-icon {\n  color: #16a34a;\n}\n.summary-card.danger ion-icon {\n  color: #dc2626;\n}\n.analysis-grid {\n  margin-top: 14px;\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 10px;\n}\n.analysis-card {\n  border-radius: 20px;\n  background: #ffffff;\n  border: 1px solid #e8edf5;\n  padding: 14px;\n  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.06);\n  position: relative;\n  overflow: hidden;\n}\n.analysis-card::before {\n  content: "";\n  position: absolute;\n  inset: 0 auto 0 0;\n  width: 5px;\n  border-radius: 20px 0 0 20px;\n  background: #1a3e8c;\n}\n.analysis-card.success::before {\n  background: #16a34a;\n}\n.analysis-card.process::before {\n  background: #2563eb;\n}\n.analysis-card.purple::before {\n  background: #7c3aed;\n}\n.analysis-card span {\n  display: block;\n  color: #667085;\n  font-size: 11.5px;\n  font-weight: 900;\n  margin-bottom: 6px;\n}\n.analysis-card h3 {\n  margin: 0;\n  color: #101828;\n  font-size: 25px;\n  font-weight: 900;\n}\n.analysis-card p {\n  margin: 6px 0 0;\n  color: #667085;\n  font-size: 11.5px;\n  line-height: 1.35;\n  font-weight: 700;\n}\n.estado-list {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.estado-row {\n  display: grid;\n  grid-template-columns: 92px 1fr 42px;\n  gap: 8px;\n  align-items: center;\n}\n.estado-info span {\n  display: block;\n  font-size: 11.5px;\n  font-weight: 800;\n  color: #344054;\n}\n.estado-info strong {\n  display: block;\n  margin-top: 2px;\n  font-size: 15px;\n  font-weight: 900;\n  color: #101828;\n}\n.progress-track {\n  width: 100%;\n  height: 9px;\n  border-radius: 999px;\n  background: #edf1f7;\n  overflow: hidden;\n}\n.progress-fill {\n  height: 100%;\n  min-width: 4px;\n  border-radius: 999px;\n  background: #1a3e8c;\n}\n.progress-fill.warning {\n  background: #f59e0b;\n}\n.progress-fill.primary {\n  background: #1a3e8c;\n}\n.progress-fill.info {\n  background: #0ea5e9;\n}\n.progress-fill.process {\n  background: #2563eb;\n}\n.progress-fill.success {\n  background: #16a34a;\n}\n.progress-fill.purple {\n  background: #7c3aed;\n}\n.progress-fill.danger {\n  background: #dc2626;\n}\n.estado-row small {\n  font-size: 11px;\n  font-weight: 900;\n  color: #667085;\n  text-align: right;\n}\n.ranking-list {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.ranking-row {\n  border-radius: 16px;\n  background: #f8fafc;\n  border: 1px solid #edf1f7;\n  padding: 12px;\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n  align-items: center;\n}\n.ranking-row span {\n  display: block;\n  color: #101828;\n  font-size: 13px;\n  font-weight: 900;\n}\n.ranking-row small {\n  display: block;\n  margin-top: 3px;\n  color: #667085;\n  font-size: 11px;\n  font-weight: 700;\n}\n.ranking-row strong {\n  min-width: 34px;\n  height: 34px;\n  border-radius: 12px;\n  background: #eff6ff;\n  color: #1a3e8c;\n  display: grid;\n  place-items: center;\n  font-size: 15px;\n  font-weight: 900;\n}\n.filter-scroll {\n  margin-top: 12px;\n  display: flex;\n  gap: 8px;\n  overflow-x: auto;\n  padding-bottom: 2px;\n}\n.filter-scroll::-webkit-scrollbar {\n  display: none;\n}\n.filter-chip {\n  border: 1px solid #d0d5dd;\n  border-radius: 999px;\n  background: #ffffff;\n  color: #344054;\n  height: 34px;\n  padding: 0 13px;\n  font-size: 11.5px;\n  font-weight: 900;\n  white-space: nowrap;\n}\n.filter-chip.active {\n  background: #1a3e8c;\n  border-color: #1a3e8c;\n  color: #ffffff;\n}\n.outline-button {\n  height: 34px;\n  border-radius: 999px;\n  border: 1px solid #d0d5dd;\n  background: #ffffff;\n  color: #1a3e8c;\n  font-size: 11.5px;\n  font-weight: 900;\n  padding: 0 12px;\n  white-space: nowrap;\n}\n.trabajos-list {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.trabajo-card {\n  border-radius: 20px;\n  background: #ffffff;\n  border: 1px solid #e8edf5;\n  padding: 14px;\n  box-shadow: 0 6px 18px rgba(16, 24, 40, 0.05);\n}\n.trabajo-top {\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n  align-items: flex-start;\n}\n.codigo {\n  display: inline-block;\n  color: #1a3e8c;\n  font-size: 10.5px;\n  font-weight: 900;\n  margin-bottom: 4px;\n}\n.trabajo-card h3 {\n  margin: 0;\n  color: #101828;\n  font-size: 15px;\n  font-weight: 900;\n}\n.trabajo-card p {\n  margin: 4px 0 0;\n  color: #667085;\n  font-size: 11.5px;\n  font-weight: 700;\n}\n.estado-badge {\n  border-radius: 999px;\n  padding: 6px 9px;\n  font-size: 10.5px;\n  font-weight: 900;\n  white-space: nowrap;\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n}\n.estado-badge.warning {\n  background: #fff7ed;\n  color: #c2410c;\n}\n.estado-badge.primary {\n  background: #eff6ff;\n  color: #1d4ed8;\n}\n.estado-badge.info {\n  background: #ecfeff;\n  color: #0891b2;\n}\n.estado-badge.process {\n  background: #eef2ff;\n  color: #4338ca;\n}\n.estado-badge.success {\n  background: #ecfdf3;\n  color: #15803d;\n}\n.estado-badge.purple {\n  background: #f5f3ff;\n  color: #6d28d9;\n}\n.estado-badge.danger {\n  background: #fef2f2;\n  color: #dc2626;\n}\n.trabajo-info {\n  margin-top: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.trabajo-info div {\n  display: flex;\n  gap: 8px;\n  align-items: flex-start;\n  color: #475467;\n  font-size: 11.5px;\n  line-height: 1.35;\n  font-weight: 700;\n}\n.trabajo-info ion-icon {\n  color: #1a3e8c;\n  font-size: 15px;\n  flex: 0 0 auto;\n  margin-top: 1px;\n}\n@media (max-width: 380px) {\n  .summary-grid {\n    grid-template-columns: 1fr;\n  }\n  .date-grid,\n  .tools-actions {\n    grid-template-columns: 1fr;\n  }\n  .estado-row {\n    grid-template-columns: 82px 1fr 36px;\n  }\n  .section-header,\n  .trabajo-top {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .outline-button {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=reporte-trabajos.page.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReporteTrabajosPage, { className: "ReporteTrabajosPage", filePath: "src/app/paginas/administrador/reporte-trabajos/reporte-trabajos.page.ts", lineNumber: 58 });
})();
export {
  ReporteTrabajosPage
};
//# sourceMappingURL=reporte-trabajos.page-S3BHVWSN.js.map
