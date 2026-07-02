import {
  AdminBottomNavComponent,
  AdminHeaderComponent,
  DashboardAdminService
} from "./chunk-CWBZAVOG.js";
import "./chunk-VG2ZDDDH.js";
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
import "./chunk-XEVVVGO7.js";
import {
  animate,
  style,
  transition,
  trigger
} from "./chunk-N6ZASUBG.js";
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
  ɵɵsanitizeUrl,
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

// src/app/paginas/administrador/dashboard-admin/dashboard-admin.page.ts
function DashboardAdminPage_ng_container_1_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 21);
    \u0275\u0275element(2, "ion-icon", 22);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const reloj_r3 = ctx.ngIf;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(reloj_r3.fechaTexto);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(reloj_r3.horaTexto);
  }
}
function DashboardAdminPage_ng_container_1_button_30_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const modulo_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", modulo_r5.badgeValor, " ");
  }
}
function DashboardAdminPage_ng_container_1_button_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function DashboardAdminPage_ng_container_1_button_30_Template_button_click_0_listener() {
      const modulo_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.abrirModulo(modulo_r5));
    });
    \u0275\u0275elementStart(1, "div", 24);
    \u0275\u0275element(2, "img", 25);
    \u0275\u0275template(3, DashboardAdminPage_ng_container_1_button_30_span_3_Template, 2, 1, "span", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const modulo_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("src", modulo_r5.iconoUrl, \u0275\u0275sanitizeUrl)("alt", modulo_r5.titulo);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", modulo_r5.badgeValor > 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(modulo_r5.titulo);
  }
}
function DashboardAdminPage_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 4)(2, "app-admin-header", 5);
    \u0275\u0275listener("menuClick", function DashboardAdminPage_ng_container_1_Template_app_admin_header_menuClick_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirMenu());
    })("notificacionesClick", function DashboardAdminPage_ng_container_1_Template_app_admin_header_notificacionesClick_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirNotificaciones());
    })("perfilClick", function DashboardAdminPage_ng_container_1_Template_app_admin_header_perfilClick_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirPerfil());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "section", 6)(4, "div", 7)(5, "div", 8);
    \u0275\u0275element(6, "img", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 10)(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(14, DashboardAdminPage_ng_container_1_div_14_Template, 7, 2, "div", 11);
    \u0275\u0275pipe(15, "async");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "section", 12)(17, "div", 13)(18, "h2");
    \u0275\u0275text(19, "Control y monitoreo en tiempo real");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p");
    \u0275\u0275text(21, "Gestiona almac\xE9n, trabajos y personal en campo.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 14);
    \u0275\u0275listener("click", function DashboardAdminPage_ng_container_1_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirMapa());
    });
    \u0275\u0275text(23, " Ver mapa ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 15);
    \u0275\u0275element(25, "img", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "section", 17)(27, "h3");
    \u0275\u0275text(28, "M\xF3dulos principales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 18);
    \u0275\u0275template(30, DashboardAdminPage_ng_container_1_button_30_Template, 6, 4, "button", 19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const vm_r6 = ctx.ngIf;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("@fadeIn", void 0);
    \u0275\u0275advance();
    \u0275\u0275property("nombre", vm_r6.administrador.nombres || vm_r6.administrador.usuario || vm_r6.administrador.correo || "Administrador")("rol", "Administrador")("fotoUrl", vm_r6.administrador.fotoUrl || "")("notificaciones", vm_r6.resumen.notificacionesNoLeidas);
    \u0275\u0275advance(4);
    \u0275\u0275property("src", vm_r6.empresa.logoUrl || "assets/img/admin/logo-empresa.png", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(vm_r6.empresa.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(vm_r6.empresa.rubro);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(vm_r6.empresa.detalle);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(15, 13, ctx_r1.reloj$));
    \u0275\u0275advance(11);
    \u0275\u0275property("src", vm_r6.empresa.bannerUrl || "assets/img/admin/banner-obrero.png", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", vm_r6.modulos)("ngForTrackBy", ctx_r1.trackByModulo);
  }
}
function DashboardAdminPage_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 28);
    \u0275\u0275element(2, "ion-icon", 29);
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Cargando panel administrativo...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Espere un momento.");
    \u0275\u0275elementEnd()()();
  }
}
var _DashboardAdminPage = class _DashboardAdminPage {
  constructor() {
    this.toastCtrl = inject(ToastController);
    this.navCtrl = inject(NavController);
    this.cdr = inject(ChangeDetectorRef);
    this.dashboardService = inject(DashboardAdminService);
    this.vm$ = this.dashboardService.obtenerPanelAdmin$();
    this.reloj$ = this.dashboardService.obtenerReloj$();
  }
  ionViewWillEnter() {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }
  trackByModulo(index, modulo) {
    return modulo.ruta || modulo.titulo || String(index);
  }
  abrirModulo(modulo) {
    const ruta = this.resolverRutaModulo(modulo);
    if (!ruta) {
      this.mostrarToast(`El m\xF3dulo ${modulo.titulo} todav\xEDa no tiene ruta v\xE1lida.`);
      return;
    }
    console.log("[DashboardAdminPage] Abriendo m\xF3dulo:", {
      titulo: modulo.titulo,
      rutaOriginal: modulo.ruta,
      rutaFinal: ruta
    });
    this.navCtrl.navigateRoot(ruta, {
      animated: false,
      replaceUrl: true
    });
  }
  abrirMenu() {
    this.navCtrl.navigateRoot("/mas-admin", {
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
    this.mostrarToast("Configuraci\xF3n de perfil pr\xF3ximamente.");
  }
  abrirMapa() {
    this.navCtrl.navigateRoot("/gps", {
      animated: false,
      replaceUrl: true
    });
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
  resolverRutaModulo(modulo) {
    let ruta = String(modulo.ruta || "").trim().toLowerCase();
    const titulo = String(modulo.titulo || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (ruta && !ruta.startsWith("/")) {
      ruta = `/${ruta}`;
    }
    const rutas = {
      "/dashboard-admin": "/dashboard-admin",
      "/inicio": "/dashboard-admin",
      "inicio": "/dashboard-admin",
      "dashboard": "/dashboard-admin",
      "dashboard-admin": "/dashboard-admin",
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
      "/usuario": "/empleados",
      "/personal": "/empleados",
      "/empleados-admin": "/empleados",
      "empleados": "/empleados",
      "usuarios": "/empleados",
      "usuario": "/empleados",
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
      "mas-admin": "/mas-admin",
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
_DashboardAdminPage.\u0275fac = function DashboardAdminPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DashboardAdminPage)();
};
_DashboardAdminPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardAdminPage, selectors: [["app-dashboard-admin"]], decls: 6, vars: 5, consts: [["cargandoDashboard", ""], [1, "admin-root", 3, "fullscreen"], [4, "ngIf", "ngIfElse"], ["activo", "inicio"], [1, "admin-container"], [3, "menuClick", "notificacionesClick", "perfilClick", "nombre", "rol", "fotoUrl", "notificaciones"], [1, "company-card"], [1, "company-left"], [1, "company-logo"], ["alt", "Logo", 3, "src"], [1, "company-info"], ["class", "company-date", 4, "ngIf"], [1, "monitor-card"], [1, "monitor-text"], ["type", "button", 1, "btn-map", 3, "click"], [1, "monitor-image"], ["alt", "Monitoreo", 3, "src"], [1, "modules-section"], [1, "modules-grid"], ["type", "button", "class", "module-card", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "company-date"], [1, "date-line"], ["name", "calendar-outline"], ["type", "button", 1, "module-card", 3, "click"], [1, "module-icon"], [3, "src", "alt"], ["class", "module-badge", 4, "ngIf"], [1, "module-badge"], [1, "empty-state"], ["name", "hourglass-outline"]], template: function DashboardAdminPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 1);
    \u0275\u0275template(1, DashboardAdminPage_ng_container_1_Template, 31, 15, "ng-container", 2);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275template(3, DashboardAdminPage_ng_template_3_Template, 7, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275element(5, "app-admin-bottom-nav", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cargandoDashboard_r7 = \u0275\u0275reference(4);
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(2, 3, ctx.vm$))("ngIfElse", cargandoDashboard_r7);
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
  AsyncPipe
], styles: ["\n\nion-content.admin-root[_ngcontent-%COMP%] {\n  --background: #f5f7fa;\n}\n.admin-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 430px;\n  min-height: 100%;\n  margin: 0 auto;\n  padding-bottom: 88px;\n  background: #f5f7fa;\n}\n.top-header[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 76px;\n  background:\n    linear-gradient(\n      135deg,\n      #062b6f,\n      #0b3d91);\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 16px 14px 12px;\n}\n.header-btn[_ngcontent-%COMP%], \n.profile-btn[_ngcontent-%COMP%] {\n  border: none;\n  outline: none;\n  background: transparent;\n  color: #ffffff;\n  padding: 0;\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n}\n.header-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n}\n.header-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.welcome-box[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.welcome-box[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15.5px;\n  font-weight: 800;\n  line-height: 1.1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.welcome-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 800;\n  color: #ffd166;\n}\n.notification-btn[_ngcontent-%COMP%] {\n  position: relative;\n}\n.notification-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 23px;\n}\n.notification-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  min-width: 16px;\n  height: 16px;\n  padding: 0 4px;\n  background: #f04438;\n  color: #ffffff;\n  border-radius: 50px;\n  font-size: 10px;\n  font-weight: 800;\n  display: grid;\n  place-items: center;\n  border: 2px solid #062b6f;\n}\n.profile-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 50%;\n  overflow: hidden;\n}\n.profile-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 31px;\n}\n.profile-btn[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  object-fit: cover;\n  border-radius: 50%;\n  border: 2px solid rgba(255, 255, 255, 0.7);\n}\n.company-card[_ngcontent-%COMP%] {\n  margin: 14px 14px 12px;\n  background: #ffffff;\n  border-radius: 16px;\n  padding: 13px 12px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.08);\n}\n.company-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n}\n.company-logo[_ngcontent-%COMP%] {\n  width: 46px;\n  height: 46px;\n  border-radius: 13px;\n  background: #eaf1ff;\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.company-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 37px;\n  height: 37px;\n  object-fit: contain;\n}\n.company-info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.company-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #101828;\n  font-size: 13px;\n  font-weight: 800;\n  line-height: 1.15;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.company-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  color: #0b3d91;\n  font-size: 10px;\n  font-weight: 700;\n  line-height: 1.15;\n}\n.company-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 2px;\n  color: #667085;\n  font-size: 9px;\n  font-weight: 600;\n  line-height: 1.2;\n}\n.company-date[_ngcontent-%COMP%] {\n  max-width: 116px;\n  text-align: right;\n  flex-shrink: 0;\n}\n.date-line[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 4px;\n  color: #0b3d91;\n  font-size: 9px;\n  font-weight: 800;\n}\n.date-line[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.company-date[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: #667085;\n  font-size: 9px;\n  font-weight: 700;\n  line-height: 1.2;\n  text-transform: capitalize;\n}\n.monitor-card[_ngcontent-%COMP%] {\n  margin: 0 14px 18px;\n  min-height: 150px;\n  border-radius: 17px;\n  background:\n    linear-gradient(\n      135deg,\n      #062b6f,\n      #0b3d91);\n  color: #ffffff;\n  display: flex;\n  overflow: hidden;\n  position: relative;\n  padding: 18px 15px;\n  box-shadow: 0 10px 24px rgba(6, 43, 111, 0.24);\n}\n.monitor-text[_ngcontent-%COMP%] {\n  width: 57%;\n  position: relative;\n  z-index: 2;\n}\n.monitor-text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16.5px;\n  font-weight: 900;\n  line-height: 1.2;\n}\n.monitor-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 9px 0 14px;\n  font-size: 11px;\n  font-weight: 500;\n  line-height: 1.35;\n  color: rgba(255, 255, 255, 0.86);\n}\n.btn-map[_ngcontent-%COMP%] {\n  height: 34px;\n  border: none;\n  border-radius: 8px;\n  background: #0a6bff;\n  color: #ffffff;\n  padding: 0 16px;\n  font-size: 12px;\n  font-weight: 800;\n}\n.monitor-image[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: flex-end;\n  justify-content: center;\n  min-width: 0;\n}\n.monitor-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 118px;\n  max-height: 128px;\n  object-fit: contain;\n}\n.modules-section[_ngcontent-%COMP%] {\n  margin: 0 14px;\n}\n.modules-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  color: #101828;\n  font-size: 15px;\n  font-weight: 900;\n}\n.modules-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 9px;\n}\n.module-card[_ngcontent-%COMP%] {\n  min-height: 78px;\n  border: 1px solid #e4e7ec;\n  border-radius: 13px;\n  background: #ffffff;\n  padding: 9px 4px 8px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);\n}\n.module-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.module-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  position: relative;\n  display: grid;\n  place-items: center;\n}\n.module-icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 29px;\n  height: 29px;\n  object-fit: contain;\n}\n.module-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -8px;\n  right: -9px;\n  min-width: 17px;\n  height: 17px;\n  padding: 0 4px;\n  background: #f04438;\n  color: #ffffff;\n  border-radius: 50px;\n  font-size: 10px;\n  font-weight: 800;\n  display: grid;\n  place-items: center;\n}\n.module-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #101828;\n  font-size: 10px;\n  font-weight: 800;\n  text-align: center;\n  line-height: 1.08;\n}\n.bottom-nav[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 50%;\n  bottom: 0;\n  transform: translateX(-50%);\n  width: 100%;\n  max-width: 430px;\n  height: 68px;\n  background: #ffffff;\n  border-top: 1px solid #e4e7ec;\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  padding: 6px 4px 8px;\n  z-index: 30;\n}\n.nav-item[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #667085;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 3px;\n  padding: 0;\n}\n.nav-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.nav-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 800;\n}\n.nav-item.active[_ngcontent-%COMP%] {\n  color: #0a6bff;\n}\n@media (max-width: 390px) {\n  .top-header[_ngcontent-%COMP%] {\n    padding-left: 12px;\n    padding-right: 12px;\n  }\n  .company-card[_ngcontent-%COMP%], \n   .monitor-card[_ngcontent-%COMP%], \n   .modules-section[_ngcontent-%COMP%] {\n    margin-left: 12px;\n    margin-right: 12px;\n  }\n  .welcome-box[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 14.5px;\n  }\n  .monitor-text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 15.5px;\n  }\n  .monitor-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 108px;\n  }\n  .modules-grid[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .module-card[_ngcontent-%COMP%] {\n    min-height: 74px;\n  }\n  .module-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 9.5px;\n  }\n}\n@media (max-width: 340px) {\n  .company-card[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n  .company-date[_ngcontent-%COMP%] {\n    max-width: 92px;\n  }\n  .date-line[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .company-date[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .monitor-card[_ngcontent-%COMP%] {\n    min-height: 142px;\n    padding: 16px 12px;\n  }\n  .monitor-text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 14.5px;\n  }\n  .monitor-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .monitor-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 98px;\n  }\n  .modules-grid[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n  .module-card[_ngcontent-%COMP%] {\n    min-height: 70px;\n    border-radius: 11px;\n  }\n  .module-icon[_ngcontent-%COMP%] {\n    width: 29px;\n    height: 29px;\n  }\n  .module-icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 26px;\n    height: 26px;\n  }\n}\n/*# sourceMappingURL=dashboard-admin.page.css.map */"], data: { animation: [
  trigger("fadeIn", [
    transition(":enter", [
      style({
        opacity: 0,
        transform: "translateY(10px)"
      }),
      animate("350ms ease-out", style({
        opacity: 1,
        transform: "translateY(0)"
      }))
    ])
  ])
] } });
var DashboardAdminPage = _DashboardAdminPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardAdminPage, [{
    type: Component,
    args: [{ selector: "app-dashboard-admin", standalone: true, imports: [
      CommonModule,
      IonicModule,
      AdminHeaderComponent,
      AdminBottomNavComponent
    ], animations: [
      trigger("fadeIn", [
        transition(":enter", [
          style({
            opacity: 0,
            transform: "translateY(10px)"
          }),
          animate("350ms ease-out", style({
            opacity: 1,
            transform: "translateY(0)"
          }))
        ])
      ])
    ], template: `<!-- src/app/paginas/administrador/dashboard-admin/dashboard-admin.page.html -->
<ion-content [fullscreen]="true" class="admin-root">

  <ng-container *ngIf="vm$ | async as vm; else cargandoDashboard">

    <div class="admin-container" @fadeIn>

      <!-- HEADER REUTILIZABLE -->
      <app-admin-header
        [nombre]="
          vm.administrador.nombres ||
          vm.administrador.usuario ||
          vm.administrador.correo ||
          'Administrador'
        "
        [rol]="'Administrador'"
        [fotoUrl]="vm.administrador.fotoUrl || ''"
        [notificaciones]="vm.resumen.notificacionesNoLeidas"
        (menuClick)="abrirMenu()"
        (notificacionesClick)="abrirNotificaciones()"
        (perfilClick)="abrirPerfil()"
      ></app-admin-header>

      <!-- TARJETA DE EMPRESA -->
      <section class="company-card">

        <div class="company-left">
          <div class="company-logo">
            <img
              [src]="vm.empresa.logoUrl || 'assets/img/admin/logo-empresa.png'"
              alt="Logo"
            />
          </div>

          <div class="company-info">
            <h2>{{ vm.empresa.nombre }}</h2>
            <p>{{ vm.empresa.rubro }}</p>
            <span>{{ vm.empresa.detalle }}</span>
          </div>
        </div>

        <div class="company-date" *ngIf="reloj$ | async as reloj">
          <div class="date-line">
            <ion-icon name="calendar-outline"></ion-icon>
            <span>{{ reloj.fechaTexto }}</span>
          </div>

          <p>{{ reloj.horaTexto }}</p>
        </div>

      </section>

      <!-- BANNER PRINCIPAL -->
      <section class="monitor-card">

        <div class="monitor-text">
          <h2>Control y monitoreo en tiempo real</h2>
          <p>Gestiona almac\xE9n, trabajos y personal en campo.</p>

          <button type="button" class="btn-map" (click)="abrirMapa()">
            Ver mapa
          </button>
        </div>

        <div class="monitor-image">
          <img
            [src]="vm.empresa.bannerUrl || 'assets/img/admin/banner-obrero.png'"
            alt="Monitoreo"
          />
        </div>

      </section>

      <!-- M\xD3DULOS PRINCIPALES -->
      <section class="modules-section">

        <h3>M\xF3dulos principales</h3>

        <div class="modules-grid">

          <button
            type="button"
            class="module-card"
            *ngFor="let modulo of vm.modulos; trackBy: trackByModulo"
            (click)="abrirModulo(modulo)"
          >

            <div class="module-icon">
              <img
                [src]="modulo.iconoUrl"
                [alt]="modulo.titulo"
              />

              <span
                class="module-badge"
                *ngIf="modulo.badgeValor > 0"
              >
                {{ modulo.badgeValor }}
              </span>
            </div>

            <p>{{ modulo.titulo }}</p>

          </button>

        </div>

      </section>

    </div>

  </ng-container>

  <!-- ESTADO DE CARGA -->
  <ng-template #cargandoDashboard>
    <div class="admin-container">
      <div class="empty-state">
        <ion-icon name="hourglass-outline"></ion-icon>
        <h3>Cargando panel administrativo...</h3>
        <p>Espere un momento.</p>
      </div>
    </div>
  </ng-template>

  <!-- FOOTER / BARRA INFERIOR REUTILIZABLE -->
  <app-admin-bottom-nav activo="inicio"></app-admin-bottom-nav>

</ion-content>`, styles: ["/* src/app/paginas/administrador/dashboard-admin/dashboard-admin.page.css */\nion-content.admin-root {\n  --background: #f5f7fa;\n}\n.admin-container {\n  width: 100%;\n  max-width: 430px;\n  min-height: 100%;\n  margin: 0 auto;\n  padding-bottom: 88px;\n  background: #f5f7fa;\n}\n.top-header {\n  width: 100%;\n  height: 76px;\n  background:\n    linear-gradient(\n      135deg,\n      #062b6f,\n      #0b3d91);\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 16px 14px 12px;\n}\n.header-btn,\n.profile-btn {\n  border: none;\n  outline: none;\n  background: transparent;\n  color: #ffffff;\n  padding: 0;\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n}\n.header-btn {\n  width: 34px;\n  height: 34px;\n}\n.header-btn ion-icon {\n  font-size: 28px;\n}\n.welcome-box {\n  flex: 1;\n  min-width: 0;\n}\n.welcome-box h1 {\n  margin: 0;\n  font-size: 15.5px;\n  font-weight: 800;\n  line-height: 1.1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.welcome-box p {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 800;\n  color: #ffd166;\n}\n.notification-btn {\n  position: relative;\n}\n.notification-btn ion-icon {\n  font-size: 23px;\n}\n.notification-badge {\n  position: absolute;\n  top: 0;\n  right: 0;\n  min-width: 16px;\n  height: 16px;\n  padding: 0 4px;\n  background: #f04438;\n  color: #ffffff;\n  border-radius: 50px;\n  font-size: 10px;\n  font-weight: 800;\n  display: grid;\n  place-items: center;\n  border: 2px solid #062b6f;\n}\n.profile-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 50%;\n  overflow: hidden;\n}\n.profile-btn ion-icon {\n  font-size: 31px;\n}\n.profile-btn img {\n  width: 32px;\n  height: 32px;\n  object-fit: cover;\n  border-radius: 50%;\n  border: 2px solid rgba(255, 255, 255, 0.7);\n}\n.company-card {\n  margin: 14px 14px 12px;\n  background: #ffffff;\n  border-radius: 16px;\n  padding: 13px 12px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.08);\n}\n.company-left {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n}\n.company-logo {\n  width: 46px;\n  height: 46px;\n  border-radius: 13px;\n  background: #eaf1ff;\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.company-logo img {\n  width: 37px;\n  height: 37px;\n  object-fit: contain;\n}\n.company-info {\n  min-width: 0;\n}\n.company-info h2 {\n  margin: 0;\n  color: #101828;\n  font-size: 13px;\n  font-weight: 800;\n  line-height: 1.15;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.company-info p {\n  margin: 3px 0 0;\n  color: #0b3d91;\n  font-size: 10px;\n  font-weight: 700;\n  line-height: 1.15;\n}\n.company-info span {\n  display: block;\n  margin-top: 2px;\n  color: #667085;\n  font-size: 9px;\n  font-weight: 600;\n  line-height: 1.2;\n}\n.company-date {\n  max-width: 116px;\n  text-align: right;\n  flex-shrink: 0;\n}\n.date-line {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 4px;\n  color: #0b3d91;\n  font-size: 9px;\n  font-weight: 800;\n}\n.date-line ion-icon {\n  font-size: 13px;\n}\n.company-date p {\n  margin: 4px 0 0;\n  color: #667085;\n  font-size: 9px;\n  font-weight: 700;\n  line-height: 1.2;\n  text-transform: capitalize;\n}\n.monitor-card {\n  margin: 0 14px 18px;\n  min-height: 150px;\n  border-radius: 17px;\n  background:\n    linear-gradient(\n      135deg,\n      #062b6f,\n      #0b3d91);\n  color: #ffffff;\n  display: flex;\n  overflow: hidden;\n  position: relative;\n  padding: 18px 15px;\n  box-shadow: 0 10px 24px rgba(6, 43, 111, 0.24);\n}\n.monitor-text {\n  width: 57%;\n  position: relative;\n  z-index: 2;\n}\n.monitor-text h2 {\n  margin: 0;\n  font-size: 16.5px;\n  font-weight: 900;\n  line-height: 1.2;\n}\n.monitor-text p {\n  margin: 9px 0 14px;\n  font-size: 11px;\n  font-weight: 500;\n  line-height: 1.35;\n  color: rgba(255, 255, 255, 0.86);\n}\n.btn-map {\n  height: 34px;\n  border: none;\n  border-radius: 8px;\n  background: #0a6bff;\n  color: #ffffff;\n  padding: 0 16px;\n  font-size: 12px;\n  font-weight: 800;\n}\n.monitor-image {\n  flex: 1;\n  display: flex;\n  align-items: flex-end;\n  justify-content: center;\n  min-width: 0;\n}\n.monitor-image img {\n  width: 118px;\n  max-height: 128px;\n  object-fit: contain;\n}\n.modules-section {\n  margin: 0 14px;\n}\n.modules-section h3 {\n  margin: 0 0 12px;\n  color: #101828;\n  font-size: 15px;\n  font-weight: 900;\n}\n.modules-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 9px;\n}\n.module-card {\n  min-height: 78px;\n  border: 1px solid #e4e7ec;\n  border-radius: 13px;\n  background: #ffffff;\n  padding: 9px 4px 8px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);\n}\n.module-card:active {\n  transform: scale(0.97);\n}\n.module-icon {\n  width: 32px;\n  height: 32px;\n  position: relative;\n  display: grid;\n  place-items: center;\n}\n.module-icon img {\n  width: 29px;\n  height: 29px;\n  object-fit: contain;\n}\n.module-badge {\n  position: absolute;\n  top: -8px;\n  right: -9px;\n  min-width: 17px;\n  height: 17px;\n  padding: 0 4px;\n  background: #f04438;\n  color: #ffffff;\n  border-radius: 50px;\n  font-size: 10px;\n  font-weight: 800;\n  display: grid;\n  place-items: center;\n}\n.module-card p {\n  margin: 0;\n  color: #101828;\n  font-size: 10px;\n  font-weight: 800;\n  text-align: center;\n  line-height: 1.08;\n}\n.bottom-nav {\n  position: fixed;\n  left: 50%;\n  bottom: 0;\n  transform: translateX(-50%);\n  width: 100%;\n  max-width: 430px;\n  height: 68px;\n  background: #ffffff;\n  border-top: 1px solid #e4e7ec;\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  padding: 6px 4px 8px;\n  z-index: 30;\n}\n.nav-item {\n  border: none;\n  background: transparent;\n  color: #667085;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 3px;\n  padding: 0;\n}\n.nav-item ion-icon {\n  font-size: 22px;\n}\n.nav-item span {\n  font-size: 10px;\n  font-weight: 800;\n}\n.nav-item.active {\n  color: #0a6bff;\n}\n@media (max-width: 390px) {\n  .top-header {\n    padding-left: 12px;\n    padding-right: 12px;\n  }\n  .company-card,\n  .monitor-card,\n  .modules-section {\n    margin-left: 12px;\n    margin-right: 12px;\n  }\n  .welcome-box h1 {\n    font-size: 14.5px;\n  }\n  .monitor-text h2 {\n    font-size: 15.5px;\n  }\n  .monitor-image img {\n    width: 108px;\n  }\n  .modules-grid {\n    gap: 8px;\n  }\n  .module-card {\n    min-height: 74px;\n  }\n  .module-card p {\n    font-size: 9.5px;\n  }\n}\n@media (max-width: 340px) {\n  .company-card {\n    align-items: flex-start;\n  }\n  .company-date {\n    max-width: 92px;\n  }\n  .date-line {\n    font-size: 8px;\n  }\n  .company-date p {\n    font-size: 8px;\n  }\n  .monitor-card {\n    min-height: 142px;\n    padding: 16px 12px;\n  }\n  .monitor-text h2 {\n    font-size: 14.5px;\n  }\n  .monitor-text p {\n    font-size: 10px;\n  }\n  .monitor-image img {\n    width: 98px;\n  }\n  .modules-grid {\n    gap: 6px;\n  }\n  .module-card {\n    min-height: 70px;\n    border-radius: 11px;\n  }\n  .module-icon {\n    width: 29px;\n    height: 29px;\n  }\n  .module-icon img {\n    width: 26px;\n    height: 26px;\n  }\n}\n/*# sourceMappingURL=dashboard-admin.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardAdminPage, { className: "DashboardAdminPage", filePath: "src/app/paginas/administrador/dashboard-admin/dashboard-admin.page.ts", lineNumber: 53 });
})();
export {
  DashboardAdminPage
};
//# sourceMappingURL=dashboard-admin.page-AHURHNHT.js.map
