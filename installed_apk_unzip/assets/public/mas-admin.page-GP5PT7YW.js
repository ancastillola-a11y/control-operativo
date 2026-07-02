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
  chevronForwardOutline,
  lockClosedOutline,
  refreshOutline,
  settingsOutline,
  shieldCheckmarkOutline
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
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

// src/app/paginas/administrador/mas-admin/mas-admin.page.ts
function MasAdminPage_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "app-admin-header", 7);
    \u0275\u0275listener("menuClick", function MasAdminPage_ng_container_1_Template_app_admin_header_menuClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirMenu());
    })("notificacionesClick", function MasAdminPage_ng_container_1_Template_app_admin_header_notificacionesClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirNotificaciones());
    })("perfilClick", function MasAdminPage_ng_container_1_Template_app_admin_header_perfilClick_1_listener() {
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
function MasAdminPage_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function MasAdminPage_button_11_Template_button_click_0_listener() {
      const modulo_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirModulo(modulo_r5));
    });
    \u0275\u0275elementStart(1, "div", 9);
    \u0275\u0275element(2, "ion-icon", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 11)(4, "div", 12)(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "h3");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(11, "ion-icon", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const modulo_r5 = ctx.$implicit;
    \u0275\u0275classProp("disponible", modulo_r5.estado === "disponible")("proximamente", modulo_r5.estado === "proximamente");
    \u0275\u0275attribute("aria-label", modulo_r5.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275property("name", modulo_r5.icono);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("badge-ok", modulo_r5.estado === "disponible")("badge-soon", modulo_r5.estado === "proximamente");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", modulo_r5.estado === "disponible" ? "Disponible" : "Pr\xF3ximamente", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(modulo_r5.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(modulo_r5.descripcion);
    \u0275\u0275advance();
    \u0275\u0275property("name", modulo_r5.estado === "disponible" ? "chevron-forward-outline" : "lock-closed-outline");
  }
}
var _MasAdminPage = class _MasAdminPage {
  constructor() {
    this.navCtrl = inject(NavController);
    this.toastCtrl = inject(ToastController);
    this.cdr = inject(ChangeDetectorRef);
    this.dashboardAdminService = inject(DashboardAdminService);
    this.adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
    this.navegando = false;
    this.modulos = [
      {
        titulo: "C\xF3digos de seguridad",
        descripcion: "Gestiona el c\xF3digo del cliente y el c\xF3digo para devoluci\xF3n de materiales.",
        icono: "shield-checkmark-outline",
        ruta: "/codigos-seguridad",
        estado: "disponible"
      },
      {
        titulo: "Seguimiento de trabajos",
        descripcion: "Visualiza el avance operativo de los trabajos registrados.",
        icono: "refresh-outline",
        ruta: "/seguimiento-trabajos",
        estado: "disponible"
      },
      {
        titulo: "Configuraci\xF3n",
        descripcion: "Ajustes generales de empresa, perfil y par\xE1metros administrativos.",
        icono: "settings-outline",
        estado: "proximamente"
      }
    ];
    addIcons({
      "chevron-forward-outline": chevronForwardOutline,
      "lock-closed-outline": lockClosedOutline,
      "refresh-outline": refreshOutline,
      "shield-checkmark-outline": shieldCheckmarkOutline,
      "settings-outline": settingsOutline
    });
  }
  ionViewWillEnter() {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }
  abrirModulo(modulo) {
    if (!modulo.ruta || modulo.estado !== "disponible") {
      this.mostrarToast(`${modulo.titulo} estar\xE1 disponible pr\xF3ximamente.`);
      return;
    }
    this.navegarRoot(modulo.ruta);
  }
  abrirMenu() {
    this.navegarRoot("/dashboard-admin");
  }
  abrirNotificaciones() {
    this.navegarRoot("/notificaciones-admin");
  }
  abrirPerfil() {
    this.mostrarToast("Configuraci\xF3n de perfil pr\xF3ximamente.");
  }
  navegarRoot(ruta) {
    return __async(this, null, function* () {
      if (this.navegando) {
        return;
      }
      const rutaFinal = this.resolverRutaMas(ruta);
      if (!rutaFinal) {
        yield this.mostrarToast("Ruta no configurada.");
        return;
      }
      this.navegando = true;
      try {
        yield this.navCtrl.navigateRoot(rutaFinal, {
          animated: false,
          replaceUrl: true
        });
      } catch (error) {
        console.error("[MasAdminPage] Error al navegar:", {
          ruta,
          rutaFinal,
          error
        });
        yield this.mostrarToast("No se pudo abrir el m\xF3dulo seleccionado.");
      } finally {
        setTimeout(() => {
          this.navegando = false;
        }, 200);
      }
    });
  }
  resolverRutaMas(ruta) {
    let valor = String(ruta || "").trim().toLowerCase();
    if (!valor) {
      return "";
    }
    if (!valor.startsWith("/")) {
      valor = `/${valor}`;
    }
    const rutas = {
      "/codigos": "/codigos-seguridad",
      "/codigos-admin": "/codigos-seguridad",
      "/codigos-de-seguridad": "/codigos-seguridad",
      "/seguridad": "/codigos-seguridad",
      "/codigos-seguridad": "/codigos-seguridad",
      "/seguimiento": "/seguimiento-trabajos",
      "/seguimiento-admin": "/seguimiento-trabajos",
      "/seguimiento-trabajos": "/seguimiento-trabajos",
      "/configuracion-admin": "/mas-admin",
      "/mas": "/mas-admin",
      "/mas-admin": "/mas-admin"
    };
    return rutas[valor] || valor;
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
_MasAdminPage.\u0275fac = function MasAdminPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MasAdminPage)();
};
_MasAdminPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MasAdminPage, selectors: [["app-mas-admin"]], decls: 13, vars: 5, consts: [[1, "mas-root", 3, "fullscreen"], [4, "ngIf"], [1, "mas-container"], [1, "section-title"], [1, "mas-grid"], ["type", "button", "class", "mas-card", 3, "disponible", "proximamente", "click", 4, "ngFor", "ngForOf"], ["activo", "mas"], [3, "menuClick", "notificacionesClick", "perfilClick", "nombre", "rol", "fotoUrl", "notificaciones"], ["type", "button", 1, "mas-card", 3, "click"], [1, "card-icon"], [3, "name"], [1, "card-content"], [1, "card-top"], [1, "card-arrow", 3, "name"]], template: function MasAdminPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0);
    \u0275\u0275template(1, MasAdminPage_ng_container_1_Template, 2, 4, "ng-container", 1);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275elementStart(3, "main", 2)(4, "section", 3)(5, "div")(6, "h2");
    \u0275\u0275text(7, "M\xF3dulos administrativos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, "Selecciona una opci\xF3n para continuar.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "section", 4);
    \u0275\u0275template(11, MasAdminPage_button_11_Template, 12, 14, "button", 5);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(12, "app-admin-bottom-nav", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(2, 3, ctx.adminVm$));
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx.modulos);
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
], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\nion-content.mas-root[_ngcontent-%COMP%] {\n  --background: var(--color-page-outside);\n}\n.mas-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: var(--app-width);\n  min-height: calc(100vh - 76px);\n  margin: 0 auto;\n  padding: 14px 14px 94px;\n  background: var(--color-background);\n}\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin: 4px 0 11px;\n}\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.section-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.mas-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.mas-card[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid var(--color-border);\n  border-radius: 17px;\n  background: #ffffff;\n  padding: 12px;\n  display: grid;\n  grid-template-columns: 48px 1fr 22px;\n  gap: 11px;\n  align-items: center;\n  text-align: left;\n  box-shadow: var(--shadow-card);\n  font-family: var(--font-main);\n}\n.mas-card.disponible[_ngcontent-%COMP%] {\n  border-color: #dbe8ff;\n}\n.mas-card.proximamente[_ngcontent-%COMP%] {\n  opacity: 0.86;\n}\n.card-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 15px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  display: grid;\n  place-items: center;\n}\n.mas-card.proximamente[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  color: var(--color-text-muted);\n}\n.card-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.card-content[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.card-top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 4px;\n}\n.card-top[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  height: 21px;\n  padding: 0 7px;\n  border-radius: 999px;\n  font-size: 9px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  white-space: nowrap;\n}\n.badge-ok[_ngcontent-%COMP%] {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.badge-soon[_ngcontent-%COMP%] {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.card-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.card-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 10.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  line-height: 1.35;\n}\n.card-arrow[_ngcontent-%COMP%] {\n  font-size: 19px;\n  color: var(--color-text-muted);\n}\n.mas-card.disponible[_ngcontent-%COMP%]   .card-arrow[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.info-card[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  padding: 12px;\n  border-radius: 16px;\n  background: var(--color-primary-soft);\n  border: 1px solid #dbe8ff;\n  display: flex;\n  gap: 9px;\n  align-items: flex-start;\n}\n.info-card[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--color-primary);\n  flex-shrink: 0;\n}\n.info-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 11.2px;\n  font-weight: 600;\n  color: var(--color-text);\n  line-height: 1.45;\n}\n/*# sourceMappingURL=mas-admin.page.css.map */"] });
var MasAdminPage = _MasAdminPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MasAdminPage, [{
    type: Component,
    args: [{ selector: "app-mas-admin", standalone: true, imports: [
      CommonModule,
      IonicModule,
      AdminHeaderComponent,
      AdminBottomNavComponent
    ], template: `<!-- src/app/paginas/administrador/mas-admin/mas-admin.page.html -->

<ion-content [fullscreen]="true" class="mas-root">

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

  <main class="mas-container">

    <section class="section-title">
      <div>
        <h2>M\xF3dulos administrativos</h2>
        <p>Selecciona una opci\xF3n para continuar.</p>
      </div>
    </section>

    <section class="mas-grid">

      <button
        type="button"
        class="mas-card"
        *ngFor="let modulo of modulos"
        [class.disponible]="modulo.estado === 'disponible'"
        [class.proximamente]="modulo.estado === 'proximamente'"
        (click)="abrirModulo(modulo)"
        [attr.aria-label]="modulo.titulo"
      >

        <div class="card-icon">
          <ion-icon [name]="modulo.icono"></ion-icon>
        </div>

        <div class="card-content">

          <div class="card-top">
            <strong
              [class.badge-ok]="modulo.estado === 'disponible'"
              [class.badge-soon]="modulo.estado === 'proximamente'"
            >
              {{ modulo.estado === 'disponible' ? 'Disponible' : 'Pr\xF3ximamente' }}
            </strong>
          </div>

          <h3>{{ modulo.titulo }}</h3>
          <p>{{ modulo.descripcion }}</p>

        </div>

        <ion-icon
          class="card-arrow"
          [name]="modulo.estado === 'disponible' ? 'chevron-forward-outline' : 'lock-closed-outline'"
        ></ion-icon>

      </button>

    </section>

  </main>

  <app-admin-bottom-nav activo="mas"></app-admin-bottom-nav>

</ion-content>`, styles: ["/* src/app/paginas/administrador/mas-admin/mas-admin.page.css */\n:host {\n  display: block;\n}\nion-content.mas-root {\n  --background: var(--color-page-outside);\n}\n.mas-container {\n  width: 100%;\n  max-width: var(--app-width);\n  min-height: calc(100vh - 76px);\n  margin: 0 auto;\n  padding: 14px 14px 94px;\n  background: var(--color-background);\n}\n.section-title {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin: 4px 0 11px;\n}\n.section-title h2 {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.section-title p {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.mas-grid {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.mas-card {\n  width: 100%;\n  border: 1px solid var(--color-border);\n  border-radius: 17px;\n  background: #ffffff;\n  padding: 12px;\n  display: grid;\n  grid-template-columns: 48px 1fr 22px;\n  gap: 11px;\n  align-items: center;\n  text-align: left;\n  box-shadow: var(--shadow-card);\n  font-family: var(--font-main);\n}\n.mas-card.disponible {\n  border-color: #dbe8ff;\n}\n.mas-card.proximamente {\n  opacity: 0.86;\n}\n.card-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 15px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  display: grid;\n  place-items: center;\n}\n.mas-card.proximamente .card-icon {\n  background: #f8fafc;\n  color: var(--color-text-muted);\n}\n.card-icon ion-icon {\n  font-size: 24px;\n}\n.card-content {\n  min-width: 0;\n}\n.card-top {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 4px;\n}\n.card-top strong {\n  height: 21px;\n  padding: 0 7px;\n  border-radius: 999px;\n  font-size: 9px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  white-space: nowrap;\n}\n.badge-ok {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.badge-soon {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.card-content h3 {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.card-content p {\n  margin: 4px 0 0;\n  font-size: 10.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  line-height: 1.35;\n}\n.card-arrow {\n  font-size: 19px;\n  color: var(--color-text-muted);\n}\n.mas-card.disponible .card-arrow {\n  color: var(--color-primary);\n}\n.info-card {\n  margin-top: 12px;\n  padding: 12px;\n  border-radius: 16px;\n  background: var(--color-primary-soft);\n  border: 1px solid #dbe8ff;\n  display: flex;\n  gap: 9px;\n  align-items: flex-start;\n}\n.info-card ion-icon {\n  font-size: 18px;\n  color: var(--color-primary);\n  flex-shrink: 0;\n}\n.info-card p {\n  margin: 0;\n  font-size: 11.2px;\n  font-weight: 600;\n  color: var(--color-text);\n  line-height: 1.45;\n}\n/*# sourceMappingURL=mas-admin.page.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MasAdminPage, { className: "MasAdminPage", filePath: "src/app/paginas/administrador/mas-admin/mas-admin.page.ts", lineNumber: 46 });
})();
export {
  MasAdminPage
};
//# sourceMappingURL=mas-admin.page-GP5PT7YW.js.map
