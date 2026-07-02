import {
  TrabajoDetalleModalComponent,
  TrabajoService
} from "./chunk-NBQHUH52.js";
import {
  AdminBottomNavComponent,
  AdminHeaderComponent,
  DashboardAdminService
} from "./chunk-CWBZAVOG.js";
import {
  IonContent,
  IonIcon,
  IonicModule,
  ModalController,
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
import "./chunk-XEVVVGO7.js";
import "./chunk-NMRAWXHA.js";
import {
  AsyncPipe,
  BehaviorSubject,
  ChangeDetectorRef,
  CommonModule,
  Component,
  NavController,
  NgClass,
  NgForOf,
  NgIf,
  combineLatest,
  inject,
  map,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
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
  ɵɵtextInterpolate1
} from "./chunk-D2BFCRPD.js";
import "./chunk-GGIFJ42N.js";
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

// src/app/paginas/trabajos/seguimiento-trabajos/seguimiento-trabajos.page.ts
function SeguimientoTrabajosPage_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "app-admin-header", 4);
    \u0275\u0275listener("menuClick", function SeguimientoTrabajosPage_ng_container_1_Template_app_admin_header_menuClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirMenu());
    })("notificacionesClick", function SeguimientoTrabajosPage_ng_container_1_Template_app_admin_header_notificacionesClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirNotificaciones());
    })("perfilClick", function SeguimientoTrabajosPage_ng_container_1_Template_app_admin_header_perfilClick_1_listener() {
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
function SeguimientoTrabajosPage_ng_container_3_section_17_article_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 15);
    \u0275\u0275listener("click", function SeguimientoTrabajosPage_ng_container_3_section_17_article_1_Template_article_click_0_listener() {
      const trabajo_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.abrirDetalleTrabajo(trabajo_r6));
    });
    \u0275\u0275elementStart(1, "div", 16)(2, "div", 17)(3, "div", 18)(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 19)(9, "span");
    \u0275\u0275text(10, "Cliente:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 19)(14, "span");
    \u0275\u0275text(15, "Empleado:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 20)(19, "span");
    \u0275\u0275text(20, "Estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "strong", 21);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "small");
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(25, "ion-icon", 22);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const trabajo_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.obtenerCodigoTrabajo(trabajo_r6));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(trabajo_r6.tipoTrabajo);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(trabajo_r6.clienteNombre);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(trabajo_r6.empleadosTexto);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r1.obtenerClaseEstado(trabajo_r6));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.obtenerEstadoTexto(trabajo_r6), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.obtenerFechaHoraSeguimiento(trabajo_r6));
  }
}
function SeguimientoTrabajosPage_ng_container_3_section_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 13);
    \u0275\u0275template(1, SeguimientoTrabajosPage_ng_container_3_section_17_article_1_Template, 26, 7, "article", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r7 = \u0275\u0275nextContext().ngIf;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", vm_r7.trabajosFiltrados)("ngForTrackBy", ctx_r1.trackByTrabajo);
  }
}
function SeguimientoTrabajosPage_ng_container_3_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 23);
    \u0275\u0275element(1, "ion-icon", 12);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "No hay trabajos para mostrar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "No se encontraron trabajos con el estado seleccionado.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 9);
    \u0275\u0275listener("click", function SeguimientoTrabajosPage_ng_container_3_ng_template_18_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.verTodos());
    });
    \u0275\u0275text(7, " Ver todos los trabajos ");
    \u0275\u0275elementEnd()();
  }
}
function SeguimientoTrabajosPage_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 5)(2, "button", 6);
    \u0275\u0275listener("click", function SeguimientoTrabajosPage_ng_container_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.irAtras());
    });
    \u0275\u0275element(3, "ion-icon", 7);
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Seguimiento de trabajos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "section", 8)(7, "button", 9);
    \u0275\u0275listener("click", function SeguimientoTrabajosPage_ng_container_3_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarFiltro("todos"));
    });
    \u0275\u0275text(8, " Todos ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 9);
    \u0275\u0275listener("click", function SeguimientoTrabajosPage_ng_container_3_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarFiltro("pendientes"));
    });
    \u0275\u0275text(10, " Pendientes ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 9);
    \u0275\u0275listener("click", function SeguimientoTrabajosPage_ng_container_3_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarFiltro("en_camino"));
    });
    \u0275\u0275text(12, " En camino ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 9);
    \u0275\u0275listener("click", function SeguimientoTrabajosPage_ng_container_3_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarFiltro("en_proceso"));
    });
    \u0275\u0275text(14, " En proceso ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 9);
    \u0275\u0275listener("click", function SeguimientoTrabajosPage_ng_container_3_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarFiltro("finalizados"));
    });
    \u0275\u0275text(16, " Finalizados ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(17, SeguimientoTrabajosPage_ng_container_3_section_17_Template, 2, 2, "section", 10)(18, SeguimientoTrabajosPage_ng_container_3_ng_template_18_Template, 8, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(20, "button", 11);
    \u0275\u0275listener("click", function SeguimientoTrabajosPage_ng_container_3_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.verTodos());
    });
    \u0275\u0275element(21, "ion-icon", 12);
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23, "Ver todos los trabajos");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const vm_r7 = ctx.ngIf;
    const sinTrabajos_r9 = \u0275\u0275reference(19);
    \u0275\u0275advance(7);
    \u0275\u0275classProp("active", vm_r7.filtroActivo === "todos");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", vm_r7.filtroActivo === "pendientes");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", vm_r7.filtroActivo === "en_camino");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", vm_r7.filtroActivo === "en_proceso");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", vm_r7.filtroActivo === "finalizados");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", vm_r7.trabajosFiltrados.length > 0)("ngIfElse", sinTrabajos_r9);
  }
}
var _SeguimientoTrabajosPage = class _SeguimientoTrabajosPage {
  constructor() {
    this.trabajoService = inject(TrabajoService);
    this.dashboardAdminService = inject(DashboardAdminService);
    this.navCtrl = inject(NavController);
    this.modalCtrl = inject(ModalController);
    this.toastCtrl = inject(ToastController);
    this.cdr = inject(ChangeDetectorRef);
    this.adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
    this.filtroSubject = new BehaviorSubject("todos");
    this.navegando = false;
    this.vm$ = combineLatest([
      this.trabajoService.vm$,
      this.filtroSubject.asObservable()
    ]).pipe(map(([trabajoVm, filtroActivo]) => {
      const trabajosBase = trabajoVm.trabajos || [];
      const trabajos = trabajosBase.filter((trabajo) => {
        const estado = this.normalizarEstado(trabajo.estado);
        return estado !== "cancelado";
      });
      const trabajosFiltrados = this.filtrarTrabajos(trabajos, filtroActivo);
      return {
        trabajos,
        trabajosFiltrados,
        filtroActivo,
        totalTrabajos: trabajos.length,
        totalPendientes: trabajos.filter((item) => this.normalizarEstado(item.estado) === "pendiente").length,
        totalEnCamino: trabajos.filter((item) => this.normalizarEstado(item.estado) === "en_camino").length,
        totalEnProceso: trabajos.filter((item) => this.normalizarEstado(item.estado) === "en_proceso").length,
        totalFinalizados: trabajos.filter((item) => {
          const estado = this.normalizarEstado(item.estado);
          return estado === "finalizado" || estado === "devolucion_realizada";
        }).length
      };
    }));
  }
  ionViewWillEnter() {
    this.trabajoService.cargarTrabajos();
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }
  trackByTrabajo(index, trabajo) {
    return trabajo.uid || trabajo.id || String(index);
  }
  cambiarFiltro(filtro) {
    this.filtroSubject.next(filtro);
  }
  verTodos() {
    this.filtroSubject.next("todos");
  }
  abrirDetalleTrabajo(trabajo) {
    return __async(this, null, function* () {
      const modal = yield this.modalCtrl.create({
        component: TrabajoDetalleModalComponent,
        cssClass: "trabajo-detalle-modal",
        backdropDismiss: true,
        componentProps: {
          trabajo
        }
      });
      yield modal.present();
      const { data, role } = yield modal.onWillDismiss();
      if (role === "codigos" || data?.accion === "codigos") {
        this.abrirCodigosSeguridad(trabajo);
      }
    });
  }
  abrirCodigosSeguridad(trabajo) {
    if (!trabajo.uid) {
      this.mostrarToast("El trabajo no tiene UID v\xC3\xA1lido.", "danger");
      return;
    }
    this.navCtrl.navigateForward(`/codigos-seguridad?trabajoUid=${encodeURIComponent(trabajo.uid)}`, {
      animated: false
    });
  }
  obtenerCodigoTrabajo(trabajo) {
    const codigoGuardado = String(trabajo.codigoTrabajo || trabajo.codigo || "").trim();
    if (/^T-\d{5}$/i.test(codigoGuardado)) {
      return codigoGuardado.toUpperCase();
    }
    const id = String(trabajo.id || "").trim();
    if (/^T-\d{5}$/i.test(id)) {
      return id.toUpperCase();
    }
    const base = String(trabajo.uid || trabajo.id || trabajo.clienteNombre || "TRABAJO");
    const numero = this.generarNumeroDesdeTexto(base);
    return `T-${numero.toString().padStart(5, "0")}`;
  }
  obtenerEstadoTexto(trabajo) {
    const estado = this.normalizarEstado(trabajo.estado);
    const mapa = {
      pendiente: "Pendiente",
      en_camino: "En camino",
      en_proceso: "En proceso",
      finalizado: "Finalizado",
      devolucion_pendiente: "Devoluci\xF3n pendiente",
      devolucion_realizada: "Devoluci\xF3n realizada",
      cancelado: "Cancelado"
    };
    return mapa[estado] || trabajo.estadoTexto || "Pendiente";
  }
  obtenerClaseEstado(trabajo) {
    return this.normalizarEstado(trabajo.estado);
  }
  obtenerFechaHoraSeguimiento(trabajo) {
    const fechaDesdeTimestamp = this.obtenerFechaDesdeTimestamp(trabajo);
    if (fechaDesdeTimestamp) {
      return this.formatearFechaRelativa(fechaDesdeTimestamp);
    }
    const fecha = String(trabajo.fechaProgramada || "").trim();
    const hora = String(trabajo.horaProgramada || "").trim();
    if (!fecha && !hora) {
      return "Sin hora";
    }
    const horaTexto = this.formatearHoraAmPm(hora);
    if (!fecha) {
      return horaTexto || "Sin hora";
    }
    const fechaTexto = this.formatearFechaProgramada(fecha);
    if (!horaTexto) {
      return fechaTexto;
    }
    return `${fechaTexto}, ${horaTexto}`;
  }
  abrirMenu() {
    this.navegarRoot("/dashboard-admin");
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
  irAtras() {
    this.navegarRoot("/mas-admin");
  }
  irAsignacionTrabajos() {
    this.navegarRoot("/asignacion-trabajos");
  }
  filtrarTrabajos(trabajos, filtro) {
    if (filtro === "todos") {
      return trabajos;
    }
    if (filtro === "pendientes") {
      return trabajos.filter((trabajo) => this.normalizarEstado(trabajo.estado) === "pendiente");
    }
    if (filtro === "en_camino") {
      return trabajos.filter((trabajo) => this.normalizarEstado(trabajo.estado) === "en_camino");
    }
    if (filtro === "en_proceso") {
      return trabajos.filter((trabajo) => this.normalizarEstado(trabajo.estado) === "en_proceso");
    }
    if (filtro === "finalizados") {
      return trabajos.filter((trabajo) => {
        const estado = this.normalizarEstado(trabajo.estado);
        return estado === "finalizado" || estado === "devolucion_realizada";
      });
    }
    return trabajos;
  }
  normalizarEstado(estado) {
    const valor = String(estado || "").trim();
    if (valor === "enCamino") {
      return "en_camino";
    }
    if (valor === "enProceso") {
      return "en_proceso";
    }
    if (valor === "devolucionPendiente") {
      return "devolucion_pendiente";
    }
    if (valor === "devolucionRealizada") {
      return "devolucion_realizada";
    }
    return valor || "pendiente";
  }
  generarNumeroDesdeTexto(texto) {
    let hash = 0;
    for (let i = 0; i < texto.length; i++) {
      hash = (hash << 5) - hash + texto.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % 1e5;
  }
  obtenerFechaDesdeTimestamp(trabajo) {
    const updatedAt = trabajo.updatedAt;
    const createdAt = trabajo.createdAt;
    if (updatedAt?.toDate) {
      return updatedAt.toDate();
    }
    if (createdAt?.toDate) {
      return createdAt.toDate();
    }
    return null;
  }
  formatearFechaRelativa(fecha) {
    const hoy = /* @__PURE__ */ new Date();
    const ayer = /* @__PURE__ */ new Date();
    ayer.setDate(hoy.getDate() - 1);
    const mismaFecha = (a, b) => {
      return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    };
    const hora = this.formatearHoraAmPmDesdeDate(fecha);
    if (mismaFecha(fecha, hoy)) {
      return `Hoy, ${hora}`;
    }
    if (mismaFecha(fecha, ayer)) {
      return `Ayer, ${hora}`;
    }
    return `${this.dosDigitos(fecha.getDate())}/${this.dosDigitos(fecha.getMonth() + 1)}/${fecha.getFullYear()}, ${hora}`;
  }
  formatearFechaProgramada(fecha) {
    const partes = fecha.split("-");
    if (partes.length !== 3) {
      return fecha;
    }
    const anio = Number(partes[0]);
    const mes = Number(partes[1]) - 1;
    const dia = Number(partes[2]);
    const fechaObj = new Date(anio, mes, dia);
    if (Number.isNaN(fechaObj.getTime())) {
      return fecha;
    }
    const hoy = /* @__PURE__ */ new Date();
    const ayer = /* @__PURE__ */ new Date();
    ayer.setDate(hoy.getDate() - 1);
    const mismaFecha = (a, b) => {
      return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    };
    if (mismaFecha(fechaObj, hoy)) {
      return "Hoy";
    }
    if (mismaFecha(fechaObj, ayer)) {
      return "Ayer";
    }
    return `${this.dosDigitos(dia)}/${this.dosDigitos(mes + 1)}/${anio}`;
  }
  formatearHoraAmPm(hora) {
    const limpio = String(hora || "").trim();
    if (!limpio) {
      return "";
    }
    const coincidencia = limpio.match(/^(\d{1,2}):(\d{2})/);
    if (!coincidencia) {
      return limpio;
    }
    const horas24 = Number(coincidencia[1]);
    const minutos = coincidencia[2];
    if (!Number.isFinite(horas24)) {
      return limpio;
    }
    const periodo = horas24 >= 12 ? "p. m." : "a. m.";
    const horas12 = horas24 % 12 || 12;
    return `${this.dosDigitos(horas12)}:${minutos} ${periodo}`;
  }
  formatearHoraAmPmDesdeDate(fecha) {
    const horas24 = fecha.getHours();
    const minutos = this.dosDigitos(fecha.getMinutes());
    const periodo = horas24 >= 12 ? "p. m." : "a. m.";
    const horas12 = horas24 % 12 || 12;
    return `${this.dosDigitos(horas12)}:${minutos} ${periodo}`;
  }
  dosDigitos(valor) {
    return String(valor).padStart(2, "0");
  }
  navegarRoot(ruta) {
    return __async(this, null, function* () {
      if (this.navegando) {
        return;
      }
      this.navegando = true;
      try {
        yield this.navCtrl.navigateRoot(ruta, {
          animated: false
        });
      } finally {
        setTimeout(() => {
          this.navegando = false;
        }, 300);
      }
    });
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
_SeguimientoTrabajosPage.\u0275fac = function SeguimientoTrabajosPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SeguimientoTrabajosPage)();
};
_SeguimientoTrabajosPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SeguimientoTrabajosPage, selectors: [["app-seguimiento-trabajos"]], decls: 6, vars: 7, consts: [["sinTrabajos", ""], [1, "seguimiento-root", 3, "fullscreen"], [4, "ngIf"], ["activo", "mas"], [3, "menuClick", "notificacionesClick", "perfilClick", "nombre", "rol", "fotoUrl", "notificaciones"], [1, "seguimiento-container"], ["type", "button", 1, "back-row", 3, "click"], ["name", "arrow-back-outline"], [1, "tabs-row"], ["type", "button", 3, "click"], ["class", "trabajos-list", 4, "ngIf", "ngIfElse"], ["type", "button", 1, "btn-ver-todos", 3, "click"], ["name", "clipboard-outline"], [1, "trabajos-list"], ["class", "seguimiento-card", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "seguimiento-card", 3, "click"], [1, "card-main-row"], [1, "trabajo-main-info"], [1, "trabajo-title-row"], [1, "info-row"], [1, "estado-row"], [1, "estado-badge", 3, "ngClass"], ["name", "chevron-forward-outline", 1, "card-arrow"], [1, "empty-card"]], template: function SeguimientoTrabajosPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 1);
    \u0275\u0275template(1, SeguimientoTrabajosPage_ng_container_1_Template, 2, 4, "ng-container", 2);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275template(3, SeguimientoTrabajosPage_ng_container_3_Template, 24, 12, "ng-container", 2);
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
  AsyncPipe
], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\nion-content.seguimiento-root[_ngcontent-%COMP%] {\n  --background: var(--color-page-outside);\n}\n.seguimiento-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: var(--app-width);\n  min-height: calc(100vh - 76px);\n  margin: 0 auto;\n  padding: 12px 14px 94px;\n  background: var(--color-background);\n}\n.back-row[_ngcontent-%COMP%] {\n  width: 100%;\n  border: none;\n  background: transparent;\n  padding: 2px 0 12px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--color-text);\n  font-family: var(--font-main);\n}\n.back-row[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--color-primary);\n}\n.back-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 900;\n}\n.tabs-row[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  gap: 7px;\n  overflow-x: auto;\n  padding-bottom: 10px;\n  margin-bottom: 8px;\n}\n.tabs-row[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n.tabs-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-width: max-content;\n  height: 34px;\n  padding: 0 12px;\n  border: 1px solid var(--color-border);\n  border-radius: 10px;\n  background: #ffffff;\n  color: var(--color-text-muted);\n  font-family: var(--font-main);\n  font-size: 10.5px;\n  font-weight: 800;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);\n}\n.tabs-row[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #ffffff;\n  border-color: var(--color-primary);\n  box-shadow: var(--shadow-button);\n}\n.trabajos-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 11px;\n}\n.seguimiento-card[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  background: #ffffff;\n  box-shadow: var(--shadow-card);\n  padding: 13px;\n  font-family: var(--font-main);\n}\n.card-main-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 22px;\n  gap: 8px;\n  align-items: center;\n}\n.trabajo-main-info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.trabajo-title-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 10px;\n  align-items: center;\n  margin-bottom: 10px;\n}\n.trabajo-title-row[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 12px;\n  font-weight: 900;\n  color: var(--color-primary);\n  letter-spacing: 0.1px;\n}\n.trabajo-title-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11.5px;\n  font-weight: 900;\n  color: var(--color-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.info-row[_ngcontent-%COMP%], \n.estado-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 62px 1fr;\n  gap: 6px;\n  align-items: center;\n  margin-top: 5px;\n}\n.info-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.estado-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 800;\n  color: var(--color-primary);\n}\n.info-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 10.8px;\n  font-weight: 700;\n  color: var(--color-text);\n  line-height: 1.3;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.estado-row[_ngcontent-%COMP%] {\n  grid-template-columns: 62px auto 1fr;\n}\n.estado-badge[_ngcontent-%COMP%] {\n  width: max-content;\n  min-height: 22px;\n  padding: 0 8px;\n  border-radius: 999px;\n  font-size: 9.5px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.estado-badge.pendiente[_ngcontent-%COMP%] {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.estado-badge.en_camino[_ngcontent-%COMP%] {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.estado-badge.en_proceso[_ngcontent-%COMP%] {\n  background: #e8f5ff;\n  color: var(--color-primary);\n}\n.estado-badge.finalizado[_ngcontent-%COMP%], \n.estado-badge.devolucion_realizada[_ngcontent-%COMP%] {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.estado-badge.devolucion_pendiente[_ngcontent-%COMP%] {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.estado-row[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  justify-self: end;\n  font-size: 9.5px;\n  font-weight: 700;\n  color: var(--color-text-muted);\n  text-align: right;\n  white-space: nowrap;\n}\n.card-arrow[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--color-primary);\n}\n.btn-ver-todos[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 42px;\n  margin-top: 14px;\n  border: 1px solid #dbe8ff;\n  border-radius: 13px;\n  background: #ffffff;\n  color: var(--color-primary);\n  font-family: var(--font-main);\n  font-size: 12px;\n  font-weight: 900;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n  box-shadow: var(--shadow-card);\n}\n.btn-ver-todos[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.empty-card[_ngcontent-%COMP%] {\n  padding: 26px 16px;\n  border-radius: 18px;\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  text-align: center;\n  box-shadow: var(--shadow-card);\n}\n.empty-card[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 42px;\n  color: var(--color-primary);\n}\n.empty-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 10px 0 0;\n  font-size: 15px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n.empty-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0 14px;\n  font-size: 11.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  line-height: 1.35;\n}\n.empty-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  height: 39px;\n  padding: 0 15px;\n  border: none;\n  border-radius: 12px;\n  background: var(--color-primary);\n  color: #ffffff;\n  font-family: var(--font-main);\n  font-size: 12px;\n  font-weight: 800;\n}\n@media (max-width: 360px) {\n  .estado-row[_ngcontent-%COMP%] {\n    grid-template-columns: 62px 1fr;\n  }\n  .estado-row[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    grid-column: 2 / 3;\n    justify-self: start;\n  }\n}\n/*# sourceMappingURL=seguimiento-trabajos.page.css.map */"] });
var SeguimientoTrabajosPage = _SeguimientoTrabajosPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SeguimientoTrabajosPage, [{
    type: Component,
    args: [{ selector: "app-seguimiento-trabajos", standalone: true, imports: [
      CommonModule,
      IonicModule,
      AdminHeaderComponent,
      AdminBottomNavComponent
    ], template: `<!-- src/app/paginas/trabajos/seguimiento-trabajos/seguimiento-trabajos.page.html -->

<ion-content [fullscreen]="true" class="seguimiento-root">

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

    <div class="seguimiento-container">

      <button
        type="button"
        class="back-row"
        (click)="irAtras()"
      >
        <ion-icon name="arrow-back-outline"></ion-icon>
        <span>Seguimiento de trabajos</span>
      </button>

      <section class="tabs-row">

        <button
          type="button"
          [class.active]="vm.filtroActivo === 'todos'"
          (click)="cambiarFiltro('todos')"
        >
          Todos
        </button>

        <button
          type="button"
          [class.active]="vm.filtroActivo === 'pendientes'"
          (click)="cambiarFiltro('pendientes')"
        >
          Pendientes
        </button>

        <button
          type="button"
          [class.active]="vm.filtroActivo === 'en_camino'"
          (click)="cambiarFiltro('en_camino')"
        >
          En camino
        </button>

        <button
          type="button"
          [class.active]="vm.filtroActivo === 'en_proceso'"
          (click)="cambiarFiltro('en_proceso')"
        >
          En proceso
        </button>

        <button
          type="button"
          [class.active]="vm.filtroActivo === 'finalizados'"
          (click)="cambiarFiltro('finalizados')"
        >
          Finalizados
        </button>

      </section>

      <section
        class="trabajos-list"
        *ngIf="vm.trabajosFiltrados.length > 0; else sinTrabajos"
      >

        <article
          class="seguimiento-card"
          *ngFor="let trabajo of vm.trabajosFiltrados; trackBy: trackByTrabajo"
          (click)="abrirDetalleTrabajo(trabajo)"
        >

          <div class="card-main-row">

            <div class="trabajo-main-info">
              <div class="trabajo-title-row">
                <h3>{{ obtenerCodigoTrabajo(trabajo) }}</h3>
                <strong>{{ trabajo.tipoTrabajo }}</strong>
              </div>

              <div class="info-row">
                <span>Cliente:</span>
                <p>{{ trabajo.clienteNombre }}</p>
              </div>

              <div class="info-row">
                <span>Empleado:</span>
                <p>{{ trabajo.empleadosTexto }}</p>
              </div>

              <div class="estado-row">
                <span>Estado:</span>

                <strong
                  class="estado-badge"
                  [ngClass]="obtenerClaseEstado(trabajo)"
                >
                  {{ obtenerEstadoTexto(trabajo) }}
                </strong>

                <small>{{ obtenerFechaHoraSeguimiento(trabajo) }}</small>
              </div>
            </div>

            <ion-icon
              class="card-arrow"
              name="chevron-forward-outline"
            ></ion-icon>

          </div>

        </article>

      </section>

      <ng-template #sinTrabajos>
        <section class="empty-card">
          <ion-icon name="clipboard-outline"></ion-icon>
          <h3>No hay trabajos para mostrar</h3>
          <p>No se encontraron trabajos con el estado seleccionado.</p>

          <button
            type="button"
            (click)="verTodos()"
          >
            Ver todos los trabajos
          </button>
        </section>
      </ng-template>

      <button
        type="button"
        class="btn-ver-todos"
        (click)="verTodos()"
      >
        <ion-icon name="clipboard-outline"></ion-icon>
        <span>Ver todos los trabajos</span>
      </button>

    </div>

  </ng-container>

  <app-admin-bottom-nav activo="mas"></app-admin-bottom-nav>

</ion-content>`, styles: ["/* src/app/paginas/trabajos/seguimiento-trabajos/seguimiento-trabajos.page.css */\n:host {\n  display: block;\n}\nion-content.seguimiento-root {\n  --background: var(--color-page-outside);\n}\n.seguimiento-container {\n  width: 100%;\n  max-width: var(--app-width);\n  min-height: calc(100vh - 76px);\n  margin: 0 auto;\n  padding: 12px 14px 94px;\n  background: var(--color-background);\n}\n.back-row {\n  width: 100%;\n  border: none;\n  background: transparent;\n  padding: 2px 0 12px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--color-text);\n  font-family: var(--font-main);\n}\n.back-row ion-icon {\n  font-size: 20px;\n  color: var(--color-primary);\n}\n.back-row span {\n  font-size: 16px;\n  font-weight: 900;\n}\n.tabs-row {\n  width: 100%;\n  display: flex;\n  gap: 7px;\n  overflow-x: auto;\n  padding-bottom: 10px;\n  margin-bottom: 8px;\n}\n.tabs-row::-webkit-scrollbar {\n  display: none;\n}\n.tabs-row button {\n  min-width: max-content;\n  height: 34px;\n  padding: 0 12px;\n  border: 1px solid var(--color-border);\n  border-radius: 10px;\n  background: #ffffff;\n  color: var(--color-text-muted);\n  font-family: var(--font-main);\n  font-size: 10.5px;\n  font-weight: 800;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);\n}\n.tabs-row button.active {\n  background: var(--color-primary);\n  color: #ffffff;\n  border-color: var(--color-primary);\n  box-shadow: var(--shadow-button);\n}\n.trabajos-list {\n  display: flex;\n  flex-direction: column;\n  gap: 11px;\n}\n.seguimiento-card {\n  width: 100%;\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  background: #ffffff;\n  box-shadow: var(--shadow-card);\n  padding: 13px;\n  font-family: var(--font-main);\n}\n.card-main-row {\n  display: grid;\n  grid-template-columns: 1fr 22px;\n  gap: 8px;\n  align-items: center;\n}\n.trabajo-main-info {\n  min-width: 0;\n}\n.trabajo-title-row {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 10px;\n  align-items: center;\n  margin-bottom: 10px;\n}\n.trabajo-title-row h3 {\n  margin: 0;\n  font-size: 12px;\n  font-weight: 900;\n  color: var(--color-primary);\n  letter-spacing: 0.1px;\n}\n.trabajo-title-row strong {\n  display: block;\n  font-size: 11.5px;\n  font-weight: 900;\n  color: var(--color-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.info-row,\n.estado-row {\n  display: grid;\n  grid-template-columns: 62px 1fr;\n  gap: 6px;\n  align-items: center;\n  margin-top: 5px;\n}\n.info-row span,\n.estado-row span {\n  font-size: 10.5px;\n  font-weight: 800;\n  color: var(--color-primary);\n}\n.info-row p {\n  margin: 0;\n  font-size: 10.8px;\n  font-weight: 700;\n  color: var(--color-text);\n  line-height: 1.3;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.estado-row {\n  grid-template-columns: 62px auto 1fr;\n}\n.estado-badge {\n  width: max-content;\n  min-height: 22px;\n  padding: 0 8px;\n  border-radius: 999px;\n  font-size: 9.5px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.estado-badge.pendiente {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.estado-badge.en_camino {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.estado-badge.en_proceso {\n  background: #e8f5ff;\n  color: var(--color-primary);\n}\n.estado-badge.finalizado,\n.estado-badge.devolucion_realizada {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.estado-badge.devolucion_pendiente {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.estado-row small {\n  justify-self: end;\n  font-size: 9.5px;\n  font-weight: 700;\n  color: var(--color-text-muted);\n  text-align: right;\n  white-space: nowrap;\n}\n.card-arrow {\n  font-size: 20px;\n  color: var(--color-primary);\n}\n.btn-ver-todos {\n  width: 100%;\n  height: 42px;\n  margin-top: 14px;\n  border: 1px solid #dbe8ff;\n  border-radius: 13px;\n  background: #ffffff;\n  color: var(--color-primary);\n  font-family: var(--font-main);\n  font-size: 12px;\n  font-weight: 900;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n  box-shadow: var(--shadow-card);\n}\n.btn-ver-todos ion-icon {\n  font-size: 18px;\n}\n.empty-card {\n  padding: 26px 16px;\n  border-radius: 18px;\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  text-align: center;\n  box-shadow: var(--shadow-card);\n}\n.empty-card ion-icon {\n  font-size: 42px;\n  color: var(--color-primary);\n}\n.empty-card h3 {\n  margin: 10px 0 0;\n  font-size: 15px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n.empty-card p {\n  margin: 6px 0 14px;\n  font-size: 11.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  line-height: 1.35;\n}\n.empty-card button {\n  height: 39px;\n  padding: 0 15px;\n  border: none;\n  border-radius: 12px;\n  background: var(--color-primary);\n  color: #ffffff;\n  font-family: var(--font-main);\n  font-size: 12px;\n  font-weight: 800;\n}\n@media (max-width: 360px) {\n  .estado-row {\n    grid-template-columns: 62px 1fr;\n  }\n  .estado-row small {\n    grid-column: 2 / 3;\n    justify-self: start;\n  }\n}\n/*# sourceMappingURL=seguimiento-trabajos.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SeguimientoTrabajosPage, { className: "SeguimientoTrabajosPage", filePath: "src/app/paginas/trabajos/seguimiento-trabajos/seguimiento-trabajos.page.ts", lineNumber: 58 });
})();
export {
  SeguimientoTrabajosPage
};
//# sourceMappingURL=seguimiento-trabajos.page-7OSMZGX3.js.map
