import {
  AdminConfirmModalComponent
} from "./chunk-BZYK3K3H.js";
import {
  AdminEmptyStateComponent
} from "./chunk-SVPM23ZW.js";
import {
  AdminBottomNavComponent,
  AdminHeaderComponent,
  DashboardAdminService,
  NotificacionService
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
import {
  arrowBackOutline,
  busOutline,
  checkmarkCircleOutline,
  checkmarkDoneOutline,
  navigateOutline,
  notificationsOutline,
  radioButtonOffOutline,
  returnUpBackOutline,
  syncOutline,
  trashOutline,
  warningOutline
} from "./chunk-XEVVVGO7.js";
import "./chunk-NMRAWXHA.js";
import {
  AsyncPipe,
  ChangeDetectorRef,
  CommonModule,
  Component,
  NavController,
  NgForOf,
  NgIf,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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

// src/app/paginas/administrador/notificaciones-admin/notificaciones-admin.page.ts
function NotificacionesAdminPage_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "app-admin-header", 4);
    \u0275\u0275listener("menuClick", function NotificacionesAdminPage_ng_container_1_Template_app_admin_header_menuClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirMenu());
    })("notificacionesClick", function NotificacionesAdminPage_ng_container_1_Template_app_admin_header_notificacionesClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirNotificaciones());
    })("perfilClick", function NotificacionesAdminPage_ng_container_1_Template_app_admin_header_perfilClick_1_listener() {
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
function NotificacionesAdminPage_ng_container_3_section_34_article_1_span_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 27);
  }
}
function NotificacionesAdminPage_ng_container_3_section_34_article_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 17);
    \u0275\u0275listener("click", function NotificacionesAdminPage_ng_container_3_section_34_article_1_Template_article_click_0_listener() {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.abrirNotificacion(item_r7));
    });
    \u0275\u0275elementStart(1, "div", 18);
    \u0275\u0275element(2, "ion-icon", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 20)(4, "div", 21)(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, NotificacionesAdminPage_ng_container_3_section_34_article_1_span_11_Template, 1, 0, "span", 22);
    \u0275\u0275elementStart(12, "div", 23)(13, "button", 24);
    \u0275\u0275listener("click", function NotificacionesAdminPage_ng_container_3_section_34_article_1_Template_button_click_13_listener($event) {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      ctx_r1.cambiarEstadoLectura(item_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(14, "ion-icon", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 25);
    \u0275\u0275listener("click", function NotificacionesAdminPage_ng_container_3_section_34_article_1_Template_button_click_15_listener($event) {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      ctx_r1.confirmarEliminar(item_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(16, "ion-icon", 26);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("unread", !item_r7.leida);
    \u0275\u0275advance();
    \u0275\u0275classProp("azul", ctx_r1.obtenerClaseIconoSeguro(item_r7) === "azul")("azul-claro", ctx_r1.obtenerClaseIconoSeguro(item_r7) === "azul-claro")("warning", ctx_r1.obtenerClaseIconoSeguro(item_r7) === "warning")("success", ctx_r1.obtenerClaseIconoSeguro(item_r7) === "success")("morado", ctx_r1.obtenerClaseIconoSeguro(item_r7) === "morado")("gris", ctx_r1.obtenerClaseIconoSeguro(item_r7) === "gris");
    \u0275\u0275advance();
    \u0275\u0275property("name", ctx_r1.obtenerIconoSeguro(item_r7));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r7.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r7.fechaTexto);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r7.mensaje);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !item_r7.leida);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", item_r7.leida ? "Marcar como no le\xEDda" : "Marcar como vista");
    \u0275\u0275advance();
    \u0275\u0275property("name", item_r7.leida ? "radio-button-off-outline" : "checkmark-done-outline");
  }
}
function NotificacionesAdminPage_ng_container_3_section_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 15);
    \u0275\u0275template(1, NotificacionesAdminPage_ng_container_3_section_34_article_1_Template, 17, 21, "article", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r5 = \u0275\u0275nextContext().ngIf;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", vm_r5.notificacionesFiltradas)("ngForTrackBy", ctx_r1.trackByNotificacion);
  }
}
function NotificacionesAdminPage_ng_container_3_ng_template_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-admin-empty-state", 28);
  }
}
function NotificacionesAdminPage_ng_container_3_section_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 29)(1, "p");
    \u0275\u0275text(2, "No hay m\xE1s notificaciones");
    \u0275\u0275elementEnd()();
  }
}
function NotificacionesAdminPage_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "main", 5)(2, "section", 6)(3, "div", 7)(4, "button", 8);
    \u0275\u0275listener("click", function NotificacionesAdminPage_ng_container_3_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.volver());
    });
    \u0275\u0275element(5, "ion-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "h2");
    \u0275\u0275text(8, "Notificaciones del administrador");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "button", 10);
    \u0275\u0275listener("click", function NotificacionesAdminPage_ng_container_3_Template_button_click_11_listener() {
      const vm_r5 = \u0275\u0275restoreView(_r4).ngIf;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.marcarTodas(vm_r5.notificaciones));
    });
    \u0275\u0275text(12, " Marcar todas como le\xEDdas ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "section", 11)(14, "button", 12);
    \u0275\u0275listener("click", function NotificacionesAdminPage_ng_container_3_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarFiltro("todas"));
    });
    \u0275\u0275text(15, " Todas ");
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "button", 12);
    \u0275\u0275listener("click", function NotificacionesAdminPage_ng_container_3_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarFiltro("cambios_estado"));
    });
    \u0275\u0275text(19, " Cambios de estado ");
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "button", 12);
    \u0275\u0275listener("click", function NotificacionesAdminPage_ng_container_3_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarFiltro("stock"));
    });
    \u0275\u0275text(23, " Stock ");
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "button", 12);
    \u0275\u0275listener("click", function NotificacionesAdminPage_ng_container_3_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarFiltro("rutas"));
    });
    \u0275\u0275text(27, " Rutas ");
    \u0275\u0275elementStart(28, "span");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "button", 12);
    \u0275\u0275listener("click", function NotificacionesAdminPage_ng_container_3_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarFiltro("devoluciones"));
    });
    \u0275\u0275text(31, " Devoluciones ");
    \u0275\u0275elementStart(32, "span");
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(34, NotificacionesAdminPage_ng_container_3_section_34_Template, 2, 2, "section", 13)(35, NotificacionesAdminPage_ng_container_3_ng_template_35_Template, 1, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(37, NotificacionesAdminPage_ng_container_3_section_37_Template, 3, 0, "section", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const vm_r5 = ctx.ngIf;
    const sinNotificaciones_r8 = \u0275\u0275reference(36);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate2("", vm_r5.noLeidas, " sin leer \xB7 ", vm_r5.total, " en total");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", vm_r5.noLeidas === 0);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", vm_r5.filtro === "todas");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(vm_r5.total);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", vm_r5.filtro === "cambios_estado");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(vm_r5.totalCambiosEstado);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", vm_r5.filtro === "stock");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(vm_r5.totalStock);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", vm_r5.filtro === "rutas");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(vm_r5.totalRutas);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", vm_r5.filtro === "devoluciones");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(vm_r5.totalDevoluciones);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", vm_r5.notificacionesFiltradas.length > 0)("ngIfElse", sinNotificaciones_r8);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", vm_r5.notificacionesFiltradas.length > 0);
  }
}
var _NotificacionesAdminPage = class _NotificacionesAdminPage {
  constructor() {
    this.navCtrl = inject(NavController);
    this.toastCtrl = inject(ToastController);
    this.modalCtrl = inject(ModalController);
    this.cdr = inject(ChangeDetectorRef);
    this.dashboardAdminService = inject(DashboardAdminService);
    this.notificacionService = inject(NotificacionService);
    this.adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
    this.vm$ = this.notificacionService.vm$;
    addIcons({
      "arrow-back-outline": arrowBackOutline,
      "bus-outline": busOutline,
      "checkmark-circle-outline": checkmarkCircleOutline,
      "checkmark-done-outline": checkmarkDoneOutline,
      "navigate-outline": navigateOutline,
      "notifications-outline": notificationsOutline,
      "radio-button-off-outline": radioButtonOffOutline,
      "return-up-back-outline": returnUpBackOutline,
      "sync-outline": syncOutline,
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
    this.notificacionService.cambiarFiltro(filtro);
  }
  volver() {
    this.navCtrl.navigateRoot("/dashboard-admin", {
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
    this.mostrarToast("Ya est\xE1s en notificaciones.", "primary");
  }
  abrirPerfil() {
    this.mostrarToast("Configuraci\xF3n de perfil pr\xF3ximamente.", "primary");
  }
  marcarTodas(notificaciones) {
    return __async(this, null, function* () {
      try {
        yield this.notificacionService.marcarTodasComoLeidas(notificaciones);
        yield this.mostrarToast("Todas las notificaciones fueron marcadas como le\xEDdas.", "success");
      } catch (error) {
        console.error("[NotificacionesAdminPage] Error al marcar todas:", error);
        yield this.mostrarToast("No se pudieron actualizar las notificaciones.", "danger");
      }
    });
  }
  abrirNotificacion(item) {
    return __async(this, null, function* () {
      try {
        const ruta = this.obtenerRutaModulo(item);
        if (ruta) {
          yield this.navCtrl.navigateRoot(ruta, {
            animated: false,
            replaceUrl: true
          });
          if (!item.leida && item.uid) {
            this.notificacionService.marcarComoLeida(item.uid).catch((error) => {
              console.warn("[NotificacionesAdminPage] No se pudo marcar como le\xEDda despu\xE9s de navegar:", error);
            });
          }
          return;
        }
        if (!item.leida && item.uid) {
          yield this.notificacionService.marcarComoLeida(item.uid);
        }
        yield this.mostrarToast(item.detalle || item.mensaje || "Notificaci\xF3n revisada.", "primary");
      } catch (error) {
        console.error("[NotificacionesAdminPage] Error al abrir notificaci\xF3n:", error);
        yield this.mostrarToast("No se pudo abrir la notificaci\xF3n.", "danger");
      }
    });
  }
  cambiarEstadoLectura(item) {
    return __async(this, null, function* () {
      if (item.leida) {
        yield this.marcarNoVista(item);
        return;
      }
      yield this.marcarVista(item);
    });
  }
  marcarVista(item) {
    return __async(this, null, function* () {
      try {
        yield this.notificacionService.marcarComoLeida(item.uid);
        yield this.mostrarToast("Notificaci\xF3n marcada como vista.", "success");
      } catch (error) {
        console.error("[NotificacionesAdminPage] Error al marcar vista:", error);
        yield this.mostrarToast("No se pudo actualizar la notificaci\xF3n.", "danger");
      }
    });
  }
  marcarNoVista(item) {
    return __async(this, null, function* () {
      try {
        yield this.notificacionService.marcarComoNoLeida(item.uid);
        yield this.mostrarToast("Notificaci\xF3n marcada como no le\xEDda.", "success");
      } catch (error) {
        console.error("[NotificacionesAdminPage] Error al marcar no vista:", error);
        yield this.mostrarToast("No se pudo actualizar la notificaci\xF3n.", "danger");
      }
    });
  }
  confirmarEliminar(item) {
    return __async(this, null, function* () {
      const confirmado = yield this.abrirConfirmacion({
        tipo: "danger",
        icono: "trash-outline",
        titulo: "Eliminar notificaci\xF3n",
        mensaje: "\xBFDeseas ocultar esta notificaci\xF3n de la lista?",
        detalle: "Esta acci\xF3n no eliminar\xE1 el registro operativo relacionado.",
        textoCancelar: "Cancelar",
        textoConfirmar: "Eliminar"
      });
      if (!confirmado) {
        return;
      }
      yield this.eliminar(item);
    });
  }
  eliminar(item) {
    return __async(this, null, function* () {
      try {
        yield this.notificacionService.eliminarNotificacion(item.uid);
        yield this.mostrarToast("Notificaci\xF3n eliminada de la vista.", "success");
      } catch (error) {
        console.error("[NotificacionesAdminPage] Error al eliminar:", error);
        yield this.mostrarToast("No se pudo eliminar la notificaci\xF3n.", "danger");
      }
    });
  }
  obtenerIconoSeguro(item) {
    if (!item) {
      return "notifications-outline";
    }
    return item.icono || this.obtenerIconoPorTipo(String(item.tipo || "general"));
  }
  obtenerClaseIconoSeguro(item) {
    if (!item) {
      return "gris";
    }
    return item.claseIcono || this.obtenerClasePorTipo(String(item.tipo || "general"));
  }
  trackByNotificacion(index, item) {
    return item.uid || String(index);
  }
  obtenerRutaModulo(item) {
    const rutaOriginal = String(item.ruta || "").trim();
    if (rutaOriginal) {
      return this.normalizarRuta(rutaOriginal);
    }
    const tipo = String(item.tipo || "").trim();
    const rutasPorTipo = {
      stock_bajo: "/materiales",
      devolucion_validada: "/devoluciones",
      devolucion_realizada: "/devoluciones",
      cambio_estado_trabajo: "/seguimiento-trabajos",
      trabajo_finalizado: "/seguimiento-trabajos",
      inicio_trabajo: "/seguimiento-trabajos",
      finalizacion_trabajo: "/seguimiento-trabajos",
      empleado_en_camino: "/gps"
    };
    return rutasPorTipo[tipo] || "";
  }
  normalizarRuta(ruta) {
    const valor = String(ruta || "").trim();
    const rutas = {
      "/materiales": "/materiales",
      "materiales": "/materiales",
      "/devoluciones": "/devoluciones",
      "devoluciones": "/devoluciones",
      "/gps": "/gps",
      "gps": "/gps",
      "/gps-admin": "/gps",
      "gps-admin": "/gps",
      "/asignacion-trabajos": "/asignacion-trabajos",
      "asignacion-trabajos": "/asignacion-trabajos",
      "/trabajos": "/asignacion-trabajos",
      "trabajos": "/asignacion-trabajos",
      "/codigos-seguridad": "/codigos-seguridad",
      "codigos-seguridad": "/codigos-seguridad",
      "/seguimiento-trabajos": "/seguimiento-trabajos",
      "seguimiento-trabajos": "/seguimiento-trabajos",
      "/dashboard-admin": "/dashboard-admin",
      "dashboard-admin": "/dashboard-admin",
      "/mas-admin": "/mas-admin",
      "mas-admin": "/mas-admin",
      "/notificaciones-admin": "/notificaciones-admin",
      "notificaciones-admin": "/notificaciones-admin",
      "/empleados": "/empleados",
      "empleados": "/empleados"
    };
    return rutas[valor] || "";
  }
  obtenerIconoPorTipo(tipo) {
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
  obtenerClasePorTipo(tipo) {
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
  mostrarToast(message, color) {
    return __async(this, null, function* () {
      const toast = yield this.toastCtrl.create({
        message,
        duration: 2400,
        position: "top",
        color
      });
      yield toast.present();
    });
  }
};
_NotificacionesAdminPage.\u0275fac = function NotificacionesAdminPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NotificacionesAdminPage)();
};
_NotificacionesAdminPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificacionesAdminPage, selectors: [["app-notificaciones-admin"]], decls: 6, vars: 7, consts: [["sinNotificaciones", ""], [1, "notificaciones-root", 3, "fullscreen"], [4, "ngIf"], ["activo", "inicio"], [3, "menuClick", "notificacionesClick", "perfilClick", "nombre", "rol", "fotoUrl", "notificaciones"], [1, "notificaciones-container"], [1, "page-title-row"], [1, "title-left"], ["type", "button", "aria-label", "Volver", 1, "btn-back", 3, "click"], ["name", "arrow-back-outline"], ["type", "button", 1, "btn-read-all", 3, "click", "disabled"], [1, "filters-scroll"], ["type", "button", 1, "filter-chip", 3, "click"], ["class", "notificaciones-list", 4, "ngIf", "ngIfElse"], ["class", "end-message", 4, "ngIf"], [1, "notificaciones-list"], ["class", "notificacion-card", 3, "unread", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "notificacion-card", 3, "click"], [1, "notification-icon"], [3, "name"], [1, "notification-content"], [1, "notification-top"], ["class", "unread-dot", 4, "ngIf"], [1, "notification-actions"], ["type", "button", 1, "btn-action", 3, "click"], ["type", "button", "aria-label", "Eliminar notificaci\xF3n", 1, "btn-action", "danger", 3, "click"], ["name", "trash-outline"], [1, "unread-dot"], ["icono", "notifications-outline", "titulo", "Sin notificaciones", "descripcion", "No hay notificaciones para este filtro."], [1, "end-message"]], template: function NotificacionesAdminPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 1);
    \u0275\u0275template(1, NotificacionesAdminPage_ng_container_1_Template, 2, 4, "ng-container", 2);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275template(3, NotificacionesAdminPage_ng_container_3_Template, 38, 21, "ng-container", 2);
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
  NgForOf,
  NgIf,
  IonicModule,
  IonContent,
  IonIcon,
  AdminHeaderComponent,
  AdminBottomNavComponent,
  AdminEmptyStateComponent,
  AsyncPipe
], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  font-family: var(--font-main, "Inter", sans-serif);\n}\nion-content.notificaciones-root[_ngcontent-%COMP%] {\n  --background: var(--color-page-outside, #e5e7eb);\n}\n.notificaciones-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: var(--app-width, 430px);\n  min-height: 100dvh;\n  margin: 0 auto;\n  padding: 14px 12px calc(105px + env(safe-area-inset-bottom));\n  background: var(--color-background, #f5f7fa);\n}\n.page-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n.title-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 9px;\n  min-width: 0;\n}\n.btn-back[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: #e8eef8;\n  color: #0b2f6b;\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n}\n.btn-back[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 20px;\n  color: currentColor;\n}\n.page-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 17px;\n  font-weight: 900;\n  color: #111827;\n  line-height: 1.08;\n}\n.page-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 11.5px;\n  font-weight: 700;\n  color: #64748b;\n}\n.btn-read-all[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #0b3d91;\n  font-size: 10.5px;\n  font-weight: 900;\n  padding: 4px 0;\n  white-space: nowrap;\n}\n.btn-read-all[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n}\n.filters-scroll[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  overflow-x: auto;\n  padding: 0 0 10px;\n  margin-bottom: 2px;\n  scrollbar-width: none;\n}\n.filters-scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n.filter-chip[_ngcontent-%COMP%] {\n  min-height: 34px;\n  border: 1px solid #d5deea;\n  border-radius: 12px;\n  background: #ffffff;\n  color: #111827;\n  padding: 0 12px;\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 11px;\n  font-weight: 900;\n  white-space: nowrap;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.filter-chip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  min-width: 20px;\n  height: 20px;\n  padding: 0 5px;\n  border-radius: 999px;\n  background: #e8eef8;\n  color: #475569;\n  display: grid;\n  place-items: center;\n  font-size: 10px;\n  font-weight: 900;\n}\n.filter-chip.active[_ngcontent-%COMP%] {\n  background: #143f8f;\n  border-color: #143f8f;\n  color: #ffffff;\n}\n.filter-chip.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.22);\n  color: #ffffff;\n}\n.notificaciones-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 10px;\n}\n.notificacion-card[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  min-height: 72px;\n  border: 1px solid #d9e1ee;\n  border-radius: 16px;\n  background: #ffffff;\n  display: grid;\n  grid-template-columns: 44px minmax(0, 1fr) 76px;\n  align-items: center;\n  gap: 9px;\n  padding: 10px;\n  box-shadow: 0 3px 8px rgba(15, 23, 42, 0.08);\n  cursor: pointer;\n}\n.notificacion-card.unread[_ngcontent-%COMP%] {\n  border-color: #c7d7f2;\n  background: #ffffff;\n}\n.notification-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 13px;\n  display: grid;\n  place-items: center;\n  background: #eef2f7;\n  color: #475569;\n  flex-shrink: 0;\n}\n.notification-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 23px;\n  color: currentColor;\n}\n.notification-icon.warning[_ngcontent-%COMP%] {\n  background: #fff4d6;\n  color: #d97706;\n}\n.notification-icon.success[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #16a34a;\n}\n.notification-icon.azul[_ngcontent-%COMP%], \n.notification-icon.azul-claro[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1d4ed8;\n}\n.notification-icon.morado[_ngcontent-%COMP%] {\n  background: #ede9fe;\n  color: #7c3aed;\n}\n.notification-icon.gris[_ngcontent-%COMP%] {\n  background: #eef2f7;\n  color: #475569;\n}\n.notification-content[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.notification-top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 3px;\n}\n.notification-top[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 12px;\n  font-weight: 900;\n  color: #111827;\n  line-height: 1.1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.notification-top[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 10.5px;\n  font-weight: 900;\n  color: #0b3d91;\n  white-space: nowrap;\n}\n.notification-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 11.2px;\n  font-weight: 600;\n  line-height: 1.2;\n  color: #334155;\n  display: -webkit-box;\n  line-clamp: 2;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.unread-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 999px;\n  background: #0b3d91;\n  position: absolute;\n  top: 13px;\n  right: 86px;\n}\n.notification-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 6px;\n}\n.btn-action[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: #eef2f7;\n  color: #0b2f6b;\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n}\n.btn-action.danger[_ngcontent-%COMP%] {\n  background: #fee4e2;\n  color: #b42318;\n}\n.btn-action[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 20px;\n  color: currentColor;\n}\n.end-message[_ngcontent-%COMP%] {\n  padding: 16px 0 4px;\n  text-align: center;\n}\n.end-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 11.5px;\n  font-weight: 800;\n  color: #64748b;\n}\n@media (max-width: 360px) {\n  .notificaciones-container[_ngcontent-%COMP%] {\n    padding-left: 10px;\n    padding-right: 10px;\n  }\n  .page-title-row[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .btn-read-all[_ngcontent-%COMP%] {\n    font-size: 9.5px;\n  }\n  .notificacion-card[_ngcontent-%COMP%] {\n    grid-template-columns: 40px minmax(0, 1fr) 70px;\n    gap: 7px;\n    padding: 9px;\n  }\n  .notification-icon[_ngcontent-%COMP%] {\n    width: 38px;\n    height: 38px;\n  }\n  .btn-action[_ngcontent-%COMP%] {\n    width: 32px;\n    height: 32px;\n  }\n  .unread-dot[_ngcontent-%COMP%] {\n    right: 78px;\n  }\n}\n/*# sourceMappingURL=notificaciones-admin.page.css.map */'] });
var NotificacionesAdminPage = _NotificacionesAdminPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificacionesAdminPage, [{
    type: Component,
    args: [{ selector: "app-notificaciones-admin", standalone: true, imports: [
      CommonModule,
      IonicModule,
      AdminHeaderComponent,
      AdminBottomNavComponent,
      AdminEmptyStateComponent
    ], template: `<!-- src/app/paginas/administrador/notificaciones-admin/notificaciones-admin.page.html -->

<ion-content [fullscreen]="true" class="notificaciones-root">

  <ng-container *ngIf="adminVm$ | async as adminVm">
    <app-admin-header
      [nombre]="
        adminVm.administrador.nombres ||
        adminVm.administrador.usuario ||
        adminVm.administrador.correo ||
        'Administrador'
      "
      [rol]="'Administrador'"
      [fotoUrl]="adminVm.administrador.fotoUrl || ''"
      [notificaciones]="adminVm.resumen.notificacionesNoLeidas || 0"
      (menuClick)="abrirMenu()"
      (notificacionesClick)="abrirNotificaciones()"
      (perfilClick)="abrirPerfil()"
    ></app-admin-header>
  </ng-container>

  <ng-container *ngIf="vm$ | async as vm">

    <main class="notificaciones-container">

      <section class="page-title-row">

        <div class="title-left">
          <button
            type="button"
            class="btn-back"
            (click)="volver()"
            aria-label="Volver"
          >
            <ion-icon name="arrow-back-outline"></ion-icon>
          </button>

          <div>
            <h2>Notificaciones del administrador</h2>
            <p>{{ vm.noLeidas }} sin leer \xB7 {{ vm.total }} en total</p>
          </div>
        </div>

        <button
          type="button"
          class="btn-read-all"
          (click)="marcarTodas(vm.notificaciones)"
          [disabled]="vm.noLeidas === 0"
        >
          Marcar todas como le\xEDdas
        </button>

      </section>

      <section class="filters-scroll">

        <button
          type="button"
          class="filter-chip"
          [class.active]="vm.filtro === 'todas'"
          (click)="cambiarFiltro('todas')"
        >
          Todas
          <span>{{ vm.total }}</span>
        </button>

        <button
          type="button"
          class="filter-chip"
          [class.active]="vm.filtro === 'cambios_estado'"
          (click)="cambiarFiltro('cambios_estado')"
        >
          Cambios de estado
          <span>{{ vm.totalCambiosEstado }}</span>
        </button>

        <button
          type="button"
          class="filter-chip"
          [class.active]="vm.filtro === 'stock'"
          (click)="cambiarFiltro('stock')"
        >
          Stock
          <span>{{ vm.totalStock }}</span>
        </button>

        <button
          type="button"
          class="filter-chip"
          [class.active]="vm.filtro === 'rutas'"
          (click)="cambiarFiltro('rutas')"
        >
          Rutas
          <span>{{ vm.totalRutas }}</span>
        </button>

        <button
          type="button"
          class="filter-chip"
          [class.active]="vm.filtro === 'devoluciones'"
          (click)="cambiarFiltro('devoluciones')"
        >
          Devoluciones
          <span>{{ vm.totalDevoluciones }}</span>
        </button>

      </section>

      <section
        class="notificaciones-list"
        *ngIf="vm.notificacionesFiltradas.length > 0; else sinNotificaciones"
      >

        <article
          class="notificacion-card"
          *ngFor="let item of vm.notificacionesFiltradas; trackBy: trackByNotificacion"
          [class.unread]="!item.leida"
          (click)="abrirNotificacion(item)"
        >

          <div
            class="notification-icon"
            [class.azul]="obtenerClaseIconoSeguro(item) === 'azul'"
            [class.azul-claro]="obtenerClaseIconoSeguro(item) === 'azul-claro'"
            [class.warning]="obtenerClaseIconoSeguro(item) === 'warning'"
            [class.success]="obtenerClaseIconoSeguro(item) === 'success'"
            [class.morado]="obtenerClaseIconoSeguro(item) === 'morado'"
            [class.gris]="obtenerClaseIconoSeguro(item) === 'gris'"
          >
            <ion-icon [name]="obtenerIconoSeguro(item)"></ion-icon>
          </div>

          <div class="notification-content">

            <div class="notification-top">
              <h3>{{ item.titulo }}</h3>
              <span>{{ item.fechaTexto }}</span>
            </div>

            <p>{{ item.mensaje }}</p>

          </div>

          <span
            class="unread-dot"
            *ngIf="!item.leida"
          ></span>

          <div class="notification-actions">

            <button
              type="button"
              class="btn-action"
              (click)="cambiarEstadoLectura(item); $event.stopPropagation()"
              [attr.aria-label]="item.leida ? 'Marcar como no le\xEDda' : 'Marcar como vista'"
            >
              <ion-icon
                [name]="item.leida ? 'radio-button-off-outline' : 'checkmark-done-outline'"
              ></ion-icon>
            </button>

            <button
              type="button"
              class="btn-action danger"
              (click)="confirmarEliminar(item); $event.stopPropagation()"
              aria-label="Eliminar notificaci\xF3n"
            >
              <ion-icon name="trash-outline"></ion-icon>
            </button>

          </div>

        </article>

      </section>

      <ng-template #sinNotificaciones>
        <app-admin-empty-state
          icono="notifications-outline"
          titulo="Sin notificaciones"
          descripcion="No hay notificaciones para este filtro."
        ></app-admin-empty-state>
      </ng-template>

      <section
        class="end-message"
        *ngIf="vm.notificacionesFiltradas.length > 0"
      >
        <p>No hay m\xE1s notificaciones</p>
      </section>

    </main>

  </ng-container>

  <app-admin-bottom-nav activo="inicio"></app-admin-bottom-nav>

</ion-content>`, styles: ['/* src/app/paginas/administrador/notificaciones-admin/notificaciones-admin.page.css */\n:host {\n  display: block;\n  font-family: var(--font-main, "Inter", sans-serif);\n}\nion-content.notificaciones-root {\n  --background: var(--color-page-outside, #e5e7eb);\n}\n.notificaciones-container {\n  width: 100%;\n  max-width: var(--app-width, 430px);\n  min-height: 100dvh;\n  margin: 0 auto;\n  padding: 14px 12px calc(105px + env(safe-area-inset-bottom));\n  background: var(--color-background, #f5f7fa);\n}\n.page-title-row {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n.title-left {\n  display: flex;\n  align-items: flex-start;\n  gap: 9px;\n  min-width: 0;\n}\n.btn-back {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: #e8eef8;\n  color: #0b2f6b;\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n}\n.btn-back ion-icon {\n  display: block;\n  font-size: 20px;\n  color: currentColor;\n}\n.page-title-row h2 {\n  margin: 0;\n  font-size: 17px;\n  font-weight: 900;\n  color: #111827;\n  line-height: 1.08;\n}\n.page-title-row p {\n  margin: 4px 0 0;\n  font-size: 11.5px;\n  font-weight: 700;\n  color: #64748b;\n}\n.btn-read-all {\n  border: none;\n  background: transparent;\n  color: #0b3d91;\n  font-size: 10.5px;\n  font-weight: 900;\n  padding: 4px 0;\n  white-space: nowrap;\n}\n.btn-read-all:disabled {\n  opacity: 0.45;\n}\n.filters-scroll {\n  display: flex;\n  gap: 8px;\n  overflow-x: auto;\n  padding: 0 0 10px;\n  margin-bottom: 2px;\n  scrollbar-width: none;\n}\n.filters-scroll::-webkit-scrollbar {\n  display: none;\n}\n.filter-chip {\n  min-height: 34px;\n  border: 1px solid #d5deea;\n  border-radius: 12px;\n  background: #ffffff;\n  color: #111827;\n  padding: 0 12px;\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 11px;\n  font-weight: 900;\n  white-space: nowrap;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.filter-chip span {\n  min-width: 20px;\n  height: 20px;\n  padding: 0 5px;\n  border-radius: 999px;\n  background: #e8eef8;\n  color: #475569;\n  display: grid;\n  place-items: center;\n  font-size: 10px;\n  font-weight: 900;\n}\n.filter-chip.active {\n  background: #143f8f;\n  border-color: #143f8f;\n  color: #ffffff;\n}\n.filter-chip.active span {\n  background: rgba(255, 255, 255, 0.22);\n  color: #ffffff;\n}\n.notificaciones-list {\n  display: grid;\n  gap: 10px;\n}\n.notificacion-card {\n  position: relative;\n  width: 100%;\n  min-height: 72px;\n  border: 1px solid #d9e1ee;\n  border-radius: 16px;\n  background: #ffffff;\n  display: grid;\n  grid-template-columns: 44px minmax(0, 1fr) 76px;\n  align-items: center;\n  gap: 9px;\n  padding: 10px;\n  box-shadow: 0 3px 8px rgba(15, 23, 42, 0.08);\n  cursor: pointer;\n}\n.notificacion-card.unread {\n  border-color: #c7d7f2;\n  background: #ffffff;\n}\n.notification-icon {\n  width: 40px;\n  height: 40px;\n  border-radius: 13px;\n  display: grid;\n  place-items: center;\n  background: #eef2f7;\n  color: #475569;\n  flex-shrink: 0;\n}\n.notification-icon ion-icon {\n  display: block;\n  font-size: 23px;\n  color: currentColor;\n}\n.notification-icon.warning {\n  background: #fff4d6;\n  color: #d97706;\n}\n.notification-icon.success {\n  background: #dcfce7;\n  color: #16a34a;\n}\n.notification-icon.azul,\n.notification-icon.azul-claro {\n  background: #dbeafe;\n  color: #1d4ed8;\n}\n.notification-icon.morado {\n  background: #ede9fe;\n  color: #7c3aed;\n}\n.notification-icon.gris {\n  background: #eef2f7;\n  color: #475569;\n}\n.notification-content {\n  min-width: 0;\n}\n.notification-top {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 3px;\n}\n.notification-top h3 {\n  margin: 0;\n  font-size: 12px;\n  font-weight: 900;\n  color: #111827;\n  line-height: 1.1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.notification-top span {\n  flex-shrink: 0;\n  font-size: 10.5px;\n  font-weight: 900;\n  color: #0b3d91;\n  white-space: nowrap;\n}\n.notification-content p {\n  margin: 0;\n  font-size: 11.2px;\n  font-weight: 600;\n  line-height: 1.2;\n  color: #334155;\n  display: -webkit-box;\n  line-clamp: 2;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.unread-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 999px;\n  background: #0b3d91;\n  position: absolute;\n  top: 13px;\n  right: 86px;\n}\n.notification-actions {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 6px;\n}\n.btn-action {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: #eef2f7;\n  color: #0b2f6b;\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n}\n.btn-action.danger {\n  background: #fee4e2;\n  color: #b42318;\n}\n.btn-action ion-icon {\n  display: block;\n  font-size: 20px;\n  color: currentColor;\n}\n.end-message {\n  padding: 16px 0 4px;\n  text-align: center;\n}\n.end-message p {\n  margin: 0;\n  font-size: 11.5px;\n  font-weight: 800;\n  color: #64748b;\n}\n@media (max-width: 360px) {\n  .notificaciones-container {\n    padding-left: 10px;\n    padding-right: 10px;\n  }\n  .page-title-row {\n    gap: 8px;\n  }\n  .btn-read-all {\n    font-size: 9.5px;\n  }\n  .notificacion-card {\n    grid-template-columns: 40px minmax(0, 1fr) 70px;\n    gap: 7px;\n    padding: 9px;\n  }\n  .notification-icon {\n    width: 38px;\n    height: 38px;\n  }\n  .btn-action {\n    width: 32px;\n    height: 32px;\n  }\n  .unread-dot {\n    right: 78px;\n  }\n}\n/*# sourceMappingURL=notificaciones-admin.page.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificacionesAdminPage, { className: "NotificacionesAdminPage", filePath: "src/app/paginas/administrador/notificaciones-admin/notificaciones-admin.page.ts", lineNumber: 54 });
})();
export {
  NotificacionesAdminPage
};
//# sourceMappingURL=notificaciones-admin.page-ZK2GCKOR.js.map
