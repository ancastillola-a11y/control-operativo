import {
  TrabajoDetalleModalComponent,
  TrabajoService
} from "./chunk-NBQHUH52.js";
import {
  require_leaflet_src
} from "./chunk-NF6GRHB5.js";
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
  AlertController,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonTextarea,
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
import "./chunk-XEVVVGO7.js";
import "./chunk-NMRAWXHA.js";
import {
  AsyncPipe,
  ChangeDetectorRef,
  CommonModule,
  Component,
  EventEmitter,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  Input,
  NavController,
  NgClass,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  Output,
  ReactiveFormsModule,
  Validators,
  ViewChild,
  inject,
  setClassMetadata,
  ɵNgNoValidate,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
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
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵviewQuery
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
  __async,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-Q3N56TRI.js";

// src/app/shared/componentes/trabajo-card/trabajo-card.component.ts
var _TrabajoCardComponent = class _TrabajoCardComponent {
  constructor() {
    this.acciones = new EventEmitter();
  }
  abrirAcciones() {
    this.acciones.emit(this.trabajo);
  }
};
_TrabajoCardComponent.\u0275fac = function TrabajoCardComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TrabajoCardComponent)();
};
_TrabajoCardComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TrabajoCardComponent, selectors: [["app-trabajo-card"]], inputs: { trabajo: "trabajo" }, outputs: { acciones: "acciones" }, decls: 31, vars: 9, consts: [[1, "trabajo-card"], [1, "trabajo-main"], [1, "trabajo-icon"], ["name", "briefcase-outline"], [1, "trabajo-info"], [1, "trabajo-title-row"], [1, "trabajo-tipo"], [1, "trabajo-meta"], ["name", "location-outline"], ["name", "calendar-outline"], ["name", "people-outline"], [1, "trabajo-footer-info"], [1, "subtotal"], [1, "materiales"], [1, "trabajo-side"], [1, "estado-badge", 3, "ngClass"], ["type", "button", "aria-label", "Acciones del trabajo", 1, "btn-more", 3, "click"], [1, "dots-text"]], template: function TrabajoCardComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 0)(1, "div", 1)(2, "div", 2);
    \u0275\u0275element(3, "ion-icon", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p", 6);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 7)(11, "span");
    \u0275\u0275element(12, "ion-icon", 8);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275element(15, "ion-icon", 9);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275element(18, "ion-icon", 10);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 11)(21, "span", 12);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 13);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(25, "div", 14)(26, "span", 15);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 16);
    \u0275\u0275listener("click", function TrabajoCardComponent_Template_button_click_28_listener() {
      return ctx.abrirAcciones();
    });
    \u0275\u0275elementStart(29, "span", 17);
    \u0275\u0275text(30, "\u22EE");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx.trabajo.clienteNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.trabajo.tipoTrabajo, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.trabajo.direccion || "Sin direcci\xF3n", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.trabajo.fechaHoraTexto, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.trabajo.empleadosTexto, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.trabajo.subtotalTexto, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.trabajo.materialesAsignados.length || 0, " material(es) ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx.trabajo.estadoClase);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.trabajo.estadoTexto, " ");
  }
}, dependencies: [CommonModule, NgClass, IonicModule, IonIcon], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  font-family: var(--font-main);\n}\n.trabajo-card[_ngcontent-%COMP%] {\n  background: var(--color-card);\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  padding: 11px;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 82px;\n  align-items: center;\n  gap: 8px;\n  box-shadow: var(--shadow-card);\n}\n.trabajo-main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  min-width: 0;\n}\n.trabajo-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 16px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n  border: 1px solid #dbe8ff;\n}\n.trabajo-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 23px;\n}\n.trabajo-info[_ngcontent-%COMP%] {\n  min-width: 0;\n  flex: 1;\n}\n.trabajo-title-row[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13.5px;\n  font-weight: 700;\n  color: var(--color-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.trabajo-tipo[_ngcontent-%COMP%] {\n  margin: 3px 0 6px;\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.trabajo-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n}\n.trabajo-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  max-width: 190px;\n  min-height: 22px;\n  padding: 3px 7px;\n  border-radius: 999px;\n  background: #f1f5f9;\n  color: #475569;\n  font-size: 9.8px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.trabajo-meta[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #64748b;\n  flex-shrink: 0;\n}\n.trabajo-footer-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  margin-top: 7px;\n}\n.subtotal[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--color-primary);\n}\n.materiales[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 700;\n  color: var(--color-text-muted);\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 999px;\n  padding: 3px 7px;\n}\n.trabajo-side[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.estado-badge[_ngcontent-%COMP%] {\n  min-width: 78px;\n  height: 25px;\n  padding: 0 8px;\n  border-radius: 999px;\n  font-size: 9.5px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.estado-badge.pendiente[_ngcontent-%COMP%] {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.estado-badge.proceso[_ngcontent-%COMP%] {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.estado-badge.finalizado[_ngcontent-%COMP%] {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.estado-badge.cancelado[_ngcontent-%COMP%] {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.btn-more[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 34px;\n  border: 1px solid #dbe3ef;\n  border-radius: 12px;\n  background: #f8fafc;\n  color: var(--color-primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  flex-shrink: 0;\n}\n.dots-text[_ngcontent-%COMP%] {\n  font-size: 28px;\n  line-height: 1;\n  font-weight: 700;\n  color: var(--color-primary);\n  transform: translateY(-2px);\n}\n.btn-more[_ngcontent-%COMP%]:active {\n  transform: scale(0.94);\n  background: var(--color-primary-soft);\n}\n@media (max-width: 360px) {\n  .trabajo-card[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .trabajo-side[_ngcontent-%COMP%] {\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n  }\n}\n/*# sourceMappingURL=trabajo-card.component.css.map */"] });
var TrabajoCardComponent = _TrabajoCardComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrabajoCardComponent, [{
    type: Component,
    args: [{ selector: "app-trabajo-card", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: `<!-- src/app/shared/componentes/trabajo-card/trabajo-card.component.html -->

<article class="trabajo-card">

  <div class="trabajo-main">

    <div class="trabajo-icon">
      <ion-icon name="briefcase-outline"></ion-icon>
    </div>

    <div class="trabajo-info">

      <div class="trabajo-title-row">
        <h3>{{ trabajo.clienteNombre }}</h3>
      </div>

      <p class="trabajo-tipo">
        {{ trabajo.tipoTrabajo }}
      </p>

      <div class="trabajo-meta">

        <span>
          <ion-icon name="location-outline"></ion-icon>
          {{ trabajo.direccion || 'Sin direcci\xF3n' }}
        </span>

        <span>
          <ion-icon name="calendar-outline"></ion-icon>
          {{ trabajo.fechaHoraTexto }}
        </span>

        <span>
          <ion-icon name="people-outline"></ion-icon>
          {{ trabajo.empleadosTexto }}
        </span>

      </div>

      <div class="trabajo-footer-info">
        <span class="subtotal">
          {{ trabajo.subtotalTexto }}
        </span>

        <span class="materiales">
          {{ trabajo.materialesAsignados.length || 0 }} material(es)
        </span>
      </div>

    </div>

  </div>

  <div class="trabajo-side">

    <span
      class="estado-badge"
      [ngClass]="trabajo.estadoClase"
    >
      {{ trabajo.estadoTexto }}
    </span>

    <button
      type="button"
      class="btn-more"
      aria-label="Acciones del trabajo"
      (click)="abrirAcciones()"
    >
      <span class="dots-text">\u22EE</span>
    </button>

  </div>

</article>`, styles: ["/* src/app/shared/componentes/trabajo-card/trabajo-card.component.css */\n:host {\n  display: block;\n  font-family: var(--font-main);\n}\n.trabajo-card {\n  background: var(--color-card);\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  padding: 11px;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 82px;\n  align-items: center;\n  gap: 8px;\n  box-shadow: var(--shadow-card);\n}\n.trabajo-main {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  min-width: 0;\n}\n.trabajo-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 16px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n  border: 1px solid #dbe8ff;\n}\n.trabajo-icon ion-icon {\n  font-size: 23px;\n}\n.trabajo-info {\n  min-width: 0;\n  flex: 1;\n}\n.trabajo-title-row h3 {\n  margin: 0;\n  font-size: 13.5px;\n  font-weight: 700;\n  color: var(--color-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.trabajo-tipo {\n  margin: 3px 0 6px;\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.trabajo-meta {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n}\n.trabajo-meta span {\n  max-width: 190px;\n  min-height: 22px;\n  padding: 3px 7px;\n  border-radius: 999px;\n  background: #f1f5f9;\n  color: #475569;\n  font-size: 9.8px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.trabajo-meta ion-icon {\n  font-size: 12px;\n  color: #64748b;\n  flex-shrink: 0;\n}\n.trabajo-footer-info {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  margin-top: 7px;\n}\n.subtotal {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--color-primary);\n}\n.materiales {\n  font-size: 10px;\n  font-weight: 700;\n  color: var(--color-text-muted);\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 999px;\n  padding: 3px 7px;\n}\n.trabajo-side {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.estado-badge {\n  min-width: 78px;\n  height: 25px;\n  padding: 0 8px;\n  border-radius: 999px;\n  font-size: 9.5px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.estado-badge.pendiente {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.estado-badge.proceso {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.estado-badge.finalizado {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.estado-badge.cancelado {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.btn-more {\n  width: 36px;\n  height: 34px;\n  border: 1px solid #dbe3ef;\n  border-radius: 12px;\n  background: #f8fafc;\n  color: var(--color-primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  flex-shrink: 0;\n}\n.dots-text {\n  font-size: 28px;\n  line-height: 1;\n  font-weight: 700;\n  color: var(--color-primary);\n  transform: translateY(-2px);\n}\n.btn-more:active {\n  transform: scale(0.94);\n  background: var(--color-primary-soft);\n}\n@media (max-width: 360px) {\n  .trabajo-card {\n    grid-template-columns: 1fr;\n  }\n  .trabajo-side {\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n  }\n}\n/*# sourceMappingURL=trabajo-card.component.css.map */\n"] }]
  }], null, { trabajo: [{
    type: Input
  }], acciones: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TrabajoCardComponent, { className: "TrabajoCardComponent", filePath: "src/app/shared/componentes/trabajo-card/trabajo-card.component.ts", lineNumber: 18 });
})();

// src/app/shared/componentes/trabajo-empleados-selector/trabajo-empleados-selector.component.ts
function TrabajoEmpleadosSelectorComponent_div_9_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function TrabajoEmpleadosSelectorComponent_div_9_button_1_Template_button_click_0_listener() {
      const empleado_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.alternarEmpleado(empleado_r2));
    });
    \u0275\u0275elementStart(1, "div", 7)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 8)(5, "h4");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "small");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 9);
    \u0275\u0275element(12, "ion-icon", 10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const empleado_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r2.estaSeleccionado(empleado_r2.uid));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(empleado_r2.iniciales);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(empleado_r2.nombreCompleto);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(empleado_r2.cargo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(empleado_r2.usuario);
    \u0275\u0275advance(2);
    \u0275\u0275property("name", ctx_r2.estaSeleccionado(empleado_r2.uid) ? "checkmark-circle-outline" : "ellipse-outline");
  }
}
function TrabajoEmpleadosSelectorComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275template(1, TrabajoEmpleadosSelectorComponent_div_9_button_1_Template, 13, 7, "button", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.empleados);
  }
}
function TrabajoEmpleadosSelectorComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "ion-icon", 12);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No hay empleados habilitados para asignar.");
    \u0275\u0275elementEnd()();
  }
}
var _TrabajoEmpleadosSelectorComponent = class _TrabajoEmpleadosSelectorComponent {
  constructor() {
    this.empleados = [];
    this.seleccionados = [];
    this.seleccionadosChange = new EventEmitter();
  }
  estaSeleccionado(uid) {
    return this.seleccionados.some((empleado) => empleado.uid === uid);
  }
  alternarEmpleado(empleado) {
    if (this.estaSeleccionado(empleado.uid)) {
      const nuevos = this.seleccionados.filter((item) => item.uid !== empleado.uid);
      this.seleccionadosChange.emit(nuevos);
      return;
    }
    const empleadoAsignado = {
      uid: empleado.uid,
      nombreCompleto: empleado.nombreCompleto,
      usuario: empleado.usuario,
      cargo: empleado.cargo
    };
    this.seleccionadosChange.emit([
      ...this.seleccionados,
      empleadoAsignado
    ]);
  }
};
_TrabajoEmpleadosSelectorComponent.\u0275fac = function TrabajoEmpleadosSelectorComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TrabajoEmpleadosSelectorComponent)();
};
_TrabajoEmpleadosSelectorComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TrabajoEmpleadosSelectorComponent, selectors: [["app-trabajo-empleados-selector"]], inputs: { empleados: "empleados", seleccionados: "seleccionados" }, outputs: { seleccionadosChange: "seleccionadosChange" }, decls: 12, vars: 3, consts: [["sinEmpleados", ""], [1, "selector-wrapper"], [1, "selector-header"], ["class", "selector-list", 4, "ngIf", "ngIfElse"], [1, "selector-list"], ["type", "button", "class", "empleado-option", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "empleado-option", 3, "click"], [1, "avatar"], [1, "info"], [1, "check"], [3, "name"], [1, "empty-mini"], ["name", "people-outline"]], template: function TrabajoEmpleadosSelectorComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 1)(1, "div", 2)(2, "div")(3, "h3");
    \u0275\u0275text(4, "Empleados disponibles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Seleccione uno o m\xE1s empleados responsables.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, TrabajoEmpleadosSelectorComponent_div_9_Template, 2, 1, "div", 3)(10, TrabajoEmpleadosSelectorComponent_ng_template_10_Template, 4, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sinEmpleados_r4 = \u0275\u0275reference(11);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", ctx.seleccionados.length, " seleccionado(s)");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.empleados.length > 0)("ngIfElse", sinEmpleados_r4);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, IonicModule, IonIcon], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  font-family: var(--font-main);\n}\n.selector-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.selector-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 2px;\n}\n.selector-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.selector-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.selector-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  height: 24px;\n  padding: 0 8px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 10px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  white-space: nowrap;\n}\n.selector-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.empleado-option[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid var(--color-border);\n  border-radius: 14px;\n  background: #ffffff;\n  padding: 10px;\n  display: grid;\n  grid-template-columns: 42px 1fr 26px;\n  gap: 9px;\n  align-items: center;\n  text-align: left;\n}\n.empleado-option.selected[_ngcontent-%COMP%] {\n  border-color: var(--color-primary);\n  background: var(--color-primary-soft);\n}\n.avatar[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  display: grid;\n  place-items: center;\n  font-size: 12px;\n  font-weight: 700;\n}\n.info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 12.5px;\n  font-weight: 700;\n  color: var(--color-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 2px;\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--color-primary);\n}\n.check[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  color: var(--color-primary);\n}\n.check[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.empty-mini[_ngcontent-%COMP%] {\n  border: 1px dashed var(--color-border);\n  border-radius: 14px;\n  padding: 16px;\n  text-align: center;\n  color: var(--color-text-muted);\n}\n.empty-mini[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--color-primary);\n}\n.empty-mini[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  font-size: 11px;\n  font-weight: 500;\n}\n/*# sourceMappingURL=trabajo-empleados-selector.component.css.map */"] });
var TrabajoEmpleadosSelectorComponent = _TrabajoEmpleadosSelectorComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrabajoEmpleadosSelectorComponent, [{
    type: Component,
    args: [{ selector: "app-trabajo-empleados-selector", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: `<!-- src/app/shared/componentes/trabajo-empleados-selector/trabajo-empleados-selector.component.html -->

<section class="selector-wrapper">

  <div class="selector-header">
    <div>
      <h3>Empleados disponibles</h3>
      <p>Seleccione uno o m\xE1s empleados responsables.</p>
    </div>

    <span>{{ seleccionados.length }} seleccionado(s)</span>
  </div>

  <div class="selector-list" *ngIf="empleados.length > 0; else sinEmpleados">

    <button
      type="button"
      class="empleado-option"
      *ngFor="let empleado of empleados"
      [class.selected]="estaSeleccionado(empleado.uid)"
      (click)="alternarEmpleado(empleado)"
    >

      <div class="avatar">
        <span>{{ empleado.iniciales }}</span>
      </div>

      <div class="info">
        <h4>{{ empleado.nombreCompleto }}</h4>
        <p>{{ empleado.cargo }}</p>
        <small>{{ empleado.usuario }}</small>
      </div>

      <div class="check">
        <ion-icon
          [name]="estaSeleccionado(empleado.uid) ? 'checkmark-circle-outline' : 'ellipse-outline'"
        ></ion-icon>
      </div>

    </button>

  </div>

  <ng-template #sinEmpleados>
    <div class="empty-mini">
      <ion-icon name="people-outline"></ion-icon>
      <p>No hay empleados habilitados para asignar.</p>
    </div>
  </ng-template>

</section>`, styles: ["/* src/app/shared/componentes/trabajo-empleados-selector/trabajo-empleados-selector.component.css */\n:host {\n  display: block;\n  font-family: var(--font-main);\n}\n.selector-wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.selector-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 2px;\n}\n.selector-header h3 {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.selector-header p {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.selector-header span {\n  height: 24px;\n  padding: 0 8px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 10px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  white-space: nowrap;\n}\n.selector-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.empleado-option {\n  width: 100%;\n  border: 1px solid var(--color-border);\n  border-radius: 14px;\n  background: #ffffff;\n  padding: 10px;\n  display: grid;\n  grid-template-columns: 42px 1fr 26px;\n  gap: 9px;\n  align-items: center;\n  text-align: left;\n}\n.empleado-option.selected {\n  border-color: var(--color-primary);\n  background: var(--color-primary-soft);\n}\n.avatar {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  display: grid;\n  place-items: center;\n  font-size: 12px;\n  font-weight: 700;\n}\n.info {\n  min-width: 0;\n}\n.info h4 {\n  margin: 0;\n  font-size: 12.5px;\n  font-weight: 700;\n  color: var(--color-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.info p {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.info small {\n  display: block;\n  margin-top: 2px;\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--color-primary);\n}\n.check {\n  display: grid;\n  place-items: center;\n  color: var(--color-primary);\n}\n.check ion-icon {\n  font-size: 22px;\n}\n.empty-mini {\n  border: 1px dashed var(--color-border);\n  border-radius: 14px;\n  padding: 16px;\n  text-align: center;\n  color: var(--color-text-muted);\n}\n.empty-mini ion-icon {\n  font-size: 26px;\n  color: var(--color-primary);\n}\n.empty-mini p {\n  margin: 6px 0 0;\n  font-size: 11px;\n  font-weight: 500;\n}\n/*# sourceMappingURL=trabajo-empleados-selector.component.css.map */\n"] }]
  }], null, { empleados: [{
    type: Input
  }], seleccionados: [{
    type: Input
  }], seleccionadosChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TrabajoEmpleadosSelectorComponent, { className: "TrabajoEmpleadosSelectorComponent", filePath: "src/app/shared/componentes/trabajo-empleados-selector/trabajo-empleados-selector.component.ts", lineNumber: 21 });
})();

// src/app/shared/componentes/trabajo-materiales-selector/trabajo-materiales-selector.component.ts
function TrabajoMaterialesSelectorComponent_div_9_article_1_img_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 15);
  }
  if (rf & 2) {
    const material_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", material_r2.imagenUrl, \u0275\u0275sanitizeUrl);
  }
}
function TrabajoMaterialesSelectorComponent_div_9_article_1_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const material_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(material_r2.iniciales);
  }
}
function TrabajoMaterialesSelectorComponent_div_9_article_1_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "label");
    \u0275\u0275text(2, "Cantidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ion-input", 17);
    \u0275\u0275listener("ionInput", function TrabajoMaterialesSelectorComponent_div_9_article_1_div_15_Template_ion_input_ionInput_3_listener($event) {
      \u0275\u0275restoreView(_r4);
      const material_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.cambiarCantidad(material_r2, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const material_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("max", material_r2.stockActual)("value", ctx_r2.obtenerCantidad(material_r2.uid))("readonly", ctx_r2.readonly);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(material_r2.unidad);
  }
}
function TrabajoMaterialesSelectorComponent_div_9_article_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 7)(1, "button", 8);
    \u0275\u0275listener("click", function TrabajoMaterialesSelectorComponent_div_9_article_1_Template_button_click_1_listener() {
      const material_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.alternarMaterial(material_r2));
    });
    \u0275\u0275elementStart(2, "div", 9);
    \u0275\u0275template(3, TrabajoMaterialesSelectorComponent_div_9_article_1_img_3_Template, 1, 1, "img", 10)(4, TrabajoMaterialesSelectorComponent_div_9_article_1_ng_template_4_Template, 2, 1, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 11)(7, "h4");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "small");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 12);
    \u0275\u0275element(14, "ion-icon", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(15, TrabajoMaterialesSelectorComponent_div_9_article_1_div_15_Template, 6, 4, "div", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const material_r2 = ctx.$implicit;
    const inicialesMaterial_r5 = \u0275\u0275reference(5);
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r2.estaSeleccionado(material_r2.uid));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", material_r2.imagenUrl)("ngIfElse", inicialesMaterial_r5);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(material_r2.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(material_r2.categoria);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Stock: ", material_r2.stockActual, " ", material_r2.unidad);
    \u0275\u0275advance(2);
    \u0275\u0275property("name", ctx_r2.estaSeleccionado(material_r2.uid) ? "checkmark-circle-outline" : "ellipse-outline");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.estaSeleccionado(material_r2.uid));
  }
}
function TrabajoMaterialesSelectorComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275template(1, TrabajoMaterialesSelectorComponent_div_9_article_1_Template, 16, 10, "article", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.materiales);
  }
}
function TrabajoMaterialesSelectorComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275element(1, "ion-icon", 19);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No hay materiales con stock disponible.");
    \u0275\u0275elementEnd()();
  }
}
var _TrabajoMaterialesSelectorComponent = class _TrabajoMaterialesSelectorComponent {
  constructor() {
    this.materiales = [];
    this.seleccionados = [];
    this.readonly = false;
    this.seleccionadosChange = new EventEmitter();
  }
  estaSeleccionado(uid) {
    return this.seleccionados.some((material) => material.materialUid === uid);
  }
  obtenerCantidad(uid) {
    const encontrado = this.seleccionados.find((material) => material.materialUid === uid);
    return Number(encontrado?.cantidadAsignada || 1);
  }
  alternarMaterial(material) {
    if (this.readonly) {
      return;
    }
    if (this.estaSeleccionado(material.uid)) {
      const nuevos = this.seleccionados.filter((item) => item.materialUid !== material.uid);
      this.seleccionadosChange.emit(nuevos);
      return;
    }
    const cantidad = material.stockActual > 0 ? 1 : 0;
    const asignado = {
      materialUid: material.uid,
      nombre: material.nombre,
      categoria: material.categoria,
      unidad: material.unidad,
      cantidadAsignada: cantidad,
      stockAntes: material.stockActual,
      stockDespues: material.stockActual - cantidad,
      imagenUrl: material.imagenUrl || ""
    };
    this.seleccionadosChange.emit([
      ...this.seleccionados,
      asignado
    ]);
  }
  cambiarCantidad(material, event) {
    if (this.readonly) {
      return;
    }
    let cantidad = Number(event?.detail?.value || 0);
    if (cantidad < 1) {
      cantidad = 1;
    }
    if (cantidad > material.stockActual) {
      cantidad = material.stockActual;
    }
    const nuevos = this.seleccionados.map((item) => {
      if (item.materialUid !== material.uid) {
        return item;
      }
      return __spreadProps(__spreadValues({}, item), {
        cantidadAsignada: cantidad,
        stockAntes: material.stockActual,
        stockDespues: material.stockActual - cantidad
      });
    });
    this.seleccionadosChange.emit(nuevos);
  }
};
_TrabajoMaterialesSelectorComponent.\u0275fac = function TrabajoMaterialesSelectorComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TrabajoMaterialesSelectorComponent)();
};
_TrabajoMaterialesSelectorComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TrabajoMaterialesSelectorComponent, selectors: [["app-trabajo-materiales-selector"]], inputs: { materiales: "materiales", seleccionados: "seleccionados", readonly: "readonly" }, outputs: { seleccionadosChange: "seleccionadosChange" }, decls: 12, vars: 3, consts: [["sinMateriales", ""], ["inicialesMaterial", ""], [1, "selector-wrapper"], [1, "selector-header"], ["class", "selector-list", 4, "ngIf", "ngIfElse"], [1, "selector-list"], ["class", "material-option", 3, "selected", 4, "ngFor", "ngForOf"], [1, "material-option"], ["type", "button", 1, "material-main", 3, "click"], [1, "material-image"], ["alt", "Material", 3, "src", 4, "ngIf", "ngIfElse"], [1, "info"], [1, "check"], [3, "name"], ["class", "cantidad-box", 4, "ngIf"], ["alt", "Material", 3, "src"], [1, "cantidad-box"], ["type", "number", "inputmode", "decimal", "min", "1", 3, "ionInput", "max", "value", "readonly"], [1, "empty-mini"], ["name", "cube-outline"]], template: function TrabajoMaterialesSelectorComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 2)(1, "div", 3)(2, "div")(3, "h3");
    \u0275\u0275text(4, "Materiales disponibles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Seleccione materiales y cantidad a asignar.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, TrabajoMaterialesSelectorComponent_div_9_Template, 2, 1, "div", 4)(10, TrabajoMaterialesSelectorComponent_ng_template_10_Template, 4, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sinMateriales_r6 = \u0275\u0275reference(11);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", ctx.seleccionados.length, " seleccionado(s)");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.materiales.length > 0)("ngIfElse", sinMateriales_r6);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, IonicModule, IonIcon, IonInput, NumericValueAccessorDirective], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  font-family: var(--font-main);\n}\n.selector-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.selector-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 2px;\n}\n.selector-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.selector-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.selector-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  height: 24px;\n  padding: 0 8px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 10px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  white-space: nowrap;\n}\n.selector-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.material-option[_ngcontent-%COMP%] {\n  border: 1px solid var(--color-border);\n  border-radius: 14px;\n  background: #ffffff;\n  overflow: hidden;\n}\n.material-option.selected[_ngcontent-%COMP%] {\n  border-color: var(--color-primary);\n  background: var(--color-primary-soft);\n}\n.material-main[_ngcontent-%COMP%] {\n  width: 100%;\n  border: none;\n  background: transparent;\n  padding: 10px;\n  display: grid;\n  grid-template-columns: 44px 1fr 26px;\n  gap: 9px;\n  align-items: center;\n  text-align: left;\n}\n.material-image[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 14px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  display: grid;\n  place-items: center;\n  font-size: 12px;\n  font-weight: 700;\n  overflow: hidden;\n}\n.material-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 12.5px;\n  font-weight: 700;\n  color: var(--color-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 2px;\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--color-primary);\n}\n.check[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  color: var(--color-primary);\n}\n.check[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.cantidad-box[_ngcontent-%COMP%] {\n  border-top: 1px solid #dbe8ff;\n  padding: 9px 10px;\n  display: grid;\n  grid-template-columns: 1fr 90px auto;\n  gap: 8px;\n  align-items: center;\n  background: #ffffff;\n}\n.cantidad-box[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.cantidad-box[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n  height: 34px;\n  min-height: 34px;\n  border: 1px solid var(--color-border);\n  border-radius: 10px;\n  text-align: center;\n  font-size: 12px;\n  font-weight: 700;\n  --padding-start: 8px;\n  --padding-end: 8px;\n}\n.cantidad-box[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--color-text-muted);\n}\n.empty-mini[_ngcontent-%COMP%] {\n  border: 1px dashed var(--color-border);\n  border-radius: 14px;\n  padding: 16px;\n  text-align: center;\n  color: var(--color-text-muted);\n}\n.empty-mini[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--color-primary);\n}\n.empty-mini[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  font-size: 11px;\n  font-weight: 500;\n}\n@media (max-width: 360px) {\n  .cantidad-box[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=trabajo-materiales-selector.component.css.map */"] });
var TrabajoMaterialesSelectorComponent = _TrabajoMaterialesSelectorComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrabajoMaterialesSelectorComponent, [{
    type: Component,
    args: [{ selector: "app-trabajo-materiales-selector", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: `<!-- src/app/shared/componentes/trabajo-materiales-selector/trabajo-materiales-selector.component.html -->

<section class="selector-wrapper">

  <div class="selector-header">
    <div>
      <h3>Materiales disponibles</h3>
      <p>Seleccione materiales y cantidad a asignar.</p>
    </div>

    <span>{{ seleccionados.length }} seleccionado(s)</span>
  </div>

  <div class="selector-list" *ngIf="materiales.length > 0; else sinMateriales">

    <article
      class="material-option"
      *ngFor="let material of materiales"
      [class.selected]="estaSeleccionado(material.uid)"
    >

      <button
        type="button"
        class="material-main"
        (click)="alternarMaterial(material)"
      >

        <div class="material-image">
          <img
            *ngIf="material.imagenUrl; else inicialesMaterial"
            [src]="material.imagenUrl"
            alt="Material"
          />

          <ng-template #inicialesMaterial>
            <span>{{ material.iniciales }}</span>
          </ng-template>
        </div>

        <div class="info">
          <h4>{{ material.nombre }}</h4>
          <p>{{ material.categoria }}</p>
          <small>Stock: {{ material.stockActual }} {{ material.unidad }}</small>
        </div>

        <div class="check">
          <ion-icon
            [name]="estaSeleccionado(material.uid) ? 'checkmark-circle-outline' : 'ellipse-outline'"
          ></ion-icon>
        </div>

      </button>

      <div class="cantidad-box" *ngIf="estaSeleccionado(material.uid)">
        <label>Cantidad</label>

        <ion-input
          type="number"
          inputmode="decimal"
          min="1"
          [max]="material.stockActual"
          [value]="obtenerCantidad(material.uid)"
          [readonly]="readonly"
          (ionInput)="cambiarCantidad(material, $event)"
        ></ion-input>

        <span>{{ material.unidad }}</span>
      </div>

    </article>

  </div>

  <ng-template #sinMateriales>
    <div class="empty-mini">
      <ion-icon name="cube-outline"></ion-icon>
      <p>No hay materiales con stock disponible.</p>
    </div>
  </ng-template>

</section>`, styles: ["/* src/app/shared/componentes/trabajo-materiales-selector/trabajo-materiales-selector.component.css */\n:host {\n  display: block;\n  font-family: var(--font-main);\n}\n.selector-wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.selector-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 2px;\n}\n.selector-header h3 {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.selector-header p {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.selector-header span {\n  height: 24px;\n  padding: 0 8px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 10px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  white-space: nowrap;\n}\n.selector-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.material-option {\n  border: 1px solid var(--color-border);\n  border-radius: 14px;\n  background: #ffffff;\n  overflow: hidden;\n}\n.material-option.selected {\n  border-color: var(--color-primary);\n  background: var(--color-primary-soft);\n}\n.material-main {\n  width: 100%;\n  border: none;\n  background: transparent;\n  padding: 10px;\n  display: grid;\n  grid-template-columns: 44px 1fr 26px;\n  gap: 9px;\n  align-items: center;\n  text-align: left;\n}\n.material-image {\n  width: 44px;\n  height: 44px;\n  border-radius: 14px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  display: grid;\n  place-items: center;\n  font-size: 12px;\n  font-weight: 700;\n  overflow: hidden;\n}\n.material-image img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.info {\n  min-width: 0;\n}\n.info h4 {\n  margin: 0;\n  font-size: 12.5px;\n  font-weight: 700;\n  color: var(--color-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.info p {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.info small {\n  display: block;\n  margin-top: 2px;\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--color-primary);\n}\n.check {\n  display: grid;\n  place-items: center;\n  color: var(--color-primary);\n}\n.check ion-icon {\n  font-size: 22px;\n}\n.cantidad-box {\n  border-top: 1px solid #dbe8ff;\n  padding: 9px 10px;\n  display: grid;\n  grid-template-columns: 1fr 90px auto;\n  gap: 8px;\n  align-items: center;\n  background: #ffffff;\n}\n.cantidad-box label {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.cantidad-box ion-input {\n  height: 34px;\n  min-height: 34px;\n  border: 1px solid var(--color-border);\n  border-radius: 10px;\n  text-align: center;\n  font-size: 12px;\n  font-weight: 700;\n  --padding-start: 8px;\n  --padding-end: 8px;\n}\n.cantidad-box span {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--color-text-muted);\n}\n.empty-mini {\n  border: 1px dashed var(--color-border);\n  border-radius: 14px;\n  padding: 16px;\n  text-align: center;\n  color: var(--color-text-muted);\n}\n.empty-mini ion-icon {\n  font-size: 26px;\n  color: var(--color-primary);\n}\n.empty-mini p {\n  margin: 6px 0 0;\n  font-size: 11px;\n  font-weight: 500;\n}\n@media (max-width: 360px) {\n  .cantidad-box {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=trabajo-materiales-selector.component.css.map */\n"] }]
  }], null, { materiales: [{
    type: Input
  }], seleccionados: [{
    type: Input
  }], readonly: [{
    type: Input
  }], seleccionadosChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TrabajoMaterialesSelectorComponent, { className: "TrabajoMaterialesSelectorComponent", filePath: "src/app/shared/componentes/trabajo-materiales-selector/trabajo-materiales-selector.component.ts", lineNumber: 21 });
})();

// src/app/shared/componentes/osm-map-picker/osm-map-picker.component.ts
var L = __toESM(require_leaflet_src());
var _c0 = ["mapContainer"];
function OsmMapPickerComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275element(1, "ion-icon", 13);
    \u0275\u0275elementStart(2, "div")(3, "strong");
    \u0275\u0275text(4, "Ubicaci\xF3n seleccionada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2(" Lat: ", ctx_r1.latitudSeleccionada, " \xB7 Lng: ", ctx_r1.longitudSeleccionada, " ");
  }
}
function OsmMapPickerComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275element(1, "ion-icon", 15);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.mensaje);
  }
}
var _OsmMapPickerComponent = class _OsmMapPickerComponent {
  constructor() {
    this.textoInicial = "";
    this.latitudInicial = null;
    this.longitudInicial = null;
    this.ubicacionSeleccionada = new EventEmitter();
    this.mensaje = "";
    this.cargandoBusqueda = false;
    this.latitudSeleccionada = null;
    this.longitudSeleccionada = null;
    this.direccionMapaSeleccionada = "";
    this.ubicacionTextoOriginalSeleccionada = "";
    this.mapa = null;
    this.marcador = null;
    this.mapaListo = false;
  }
  ngAfterViewInit() {
    return __async(this, null, function* () {
      const latInicial = this.latitudInicial ?? -12.046374;
      const lngInicial = this.longitudInicial ?? -77.042793;
      this.inicializarMapa(latInicial, lngInicial);
      setTimeout(() => {
        this.mapa?.invalidateSize();
      }, 250);
      setTimeout(() => {
        this.mapa?.invalidateSize();
      }, 650);
      if (this.latitudInicial !== null && this.longitudInicial !== null) {
        this.colocarMarcador(this.latitudInicial, this.longitudInicial, this.textoInicial || "Ubicaci\xC3\xB3n seleccionada");
        this.moverMapa(this.latitudInicial, this.longitudInicial, 17);
        return;
      }
      const texto = String(this.textoInicial || "").trim();
      if (texto) {
        yield this.buscarTexto(texto);
      }
    });
  }
  ngOnChanges(changes) {
    return __async(this, null, function* () {
      if (!this.mapaListo) {
        return;
      }
      if (changes["textoInicial"] && !changes["textoInicial"].firstChange) {
        const texto = String(this.textoInicial || "").trim();
        if (texto) {
          this.mensaje = "Texto actualizado. Presione \xE2\u20AC\u0153Buscar ubicaci\xC3\xB3n\xE2\u20AC\x9D.";
        }
      }
    });
  }
  ngOnDestroy() {
    if (this.mapa) {
      this.mapa.remove();
      this.mapa = null;
    }
  }
  buscarAhora() {
    return __async(this, null, function* () {
      const texto = String(this.textoInicial || "").trim();
      if (!texto) {
        this.mensaje = "Ingrese una direcci\xC3\xB3n, coordenadas o enlace en el campo superior.";
        return;
      }
      yield this.buscarTexto(texto);
    });
  }
  usarCentroMapa() {
    if (!this.mapa) {
      return;
    }
    const centro = this.mapa.getCenter();
    this.colocarMarcador(centro.lat, centro.lng, this.textoInicial || "Ubicaci\xC3\xB3n seleccionada desde el mapa");
    this.mensaje = "Centro del mapa seleccionado. Presione \xE2\u20AC\u0153Guardar ubicaci\xC3\xB3n\xE2\u20AC\x9D.";
  }
  guardarUbicacion() {
    if (this.latitudSeleccionada === null || this.longitudSeleccionada === null) {
      this.mensaje = "Primero seleccione una ubicaci\xC3\xB3n en el mapa.";
      return;
    }
    const direccionMapa = this.direccionMapaSeleccionada || this.textoInicial || "Ubicaci\xC3\xB3n seleccionada";
    const ubicacionTextoOriginal = this.ubicacionTextoOriginalSeleccionada || this.textoInicial || direccionMapa;
    this.ubicacionSeleccionada.emit({
      latitud: this.latitudSeleccionada,
      longitud: this.longitudSeleccionada,
      direccionMapa,
      ubicacionTextoOriginal
    });
    this.mensaje = "Ubicaci\xC3\xB3n guardada correctamente.";
  }
  inicializarMapa(latitud, longitud) {
    this.mapa = L.map(this.mapContainer.nativeElement, {
      zoomControl: true,
      attributionControl: true
    }).setView([latitud, longitud], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "\xC2\xA9 OpenStreetMap contributors"
    }).addTo(this.mapa);
    this.marcador = L.marker([latitud, longitud], {
      draggable: true,
      icon: this.crearIconoMarcador()
    }).addTo(this.mapa);
    this.marcador.on("dragend", () => {
      const posicion = this.marcador?.getLatLng();
      if (!posicion) {
        return;
      }
      this.colocarMarcador(posicion.lat, posicion.lng, this.textoInicial || "Ubicaci\xC3\xB3n seleccionada");
      this.mensaje = "Marcador movido. Presione \xE2\u20AC\u0153Guardar ubicaci\xC3\xB3n\xE2\u20AC\x9D.";
    });
    this.mapa.on("click", (evento) => {
      this.colocarMarcador(evento.latlng.lat, evento.latlng.lng, this.textoInicial || "Ubicaci\xC3\xB3n seleccionada en el mapa");
      this.mensaje = "Punto seleccionado. Presione \xE2\u20AC\u0153Guardar ubicaci\xC3\xB3n\xE2\u20AC\x9D.";
    });
    this.mapaListo = true;
  }
  buscarTexto(texto) {
    return __async(this, null, function* () {
      const coordenadas = this.extraerCoordenadas(texto);
      if (coordenadas) {
        this.colocarMarcador(coordenadas.latitud, coordenadas.longitud, texto);
        this.moverMapa(coordenadas.latitud, coordenadas.longitud, 17);
        this.mensaje = "Coordenadas detectadas. Presione \xE2\u20AC\u0153Guardar ubicaci\xC3\xB3n\xE2\u20AC\x9D.";
        return;
      }
      yield this.buscarDireccionGratis(texto);
    });
  }
  buscarDireccionGratis(texto) {
    return __async(this, null, function* () {
      this.cargandoBusqueda = true;
      this.mensaje = "Buscando ubicaci\xC3\xB3n...";
      try {
        const consultas = this.generarConsultasBusqueda(texto);
        for (const consulta of consultas) {
          const resultado = yield this.consultarNominatim(consulta);
          if (!resultado) {
            continue;
          }
          const latitud = Number(resultado.lat);
          const longitud = Number(resultado.lon);
          const direccionMapa = String(resultado.display_name || consulta);
          if (!this.esCoordenadaValida(latitud, longitud)) {
            continue;
          }
          this.colocarMarcador(latitud, longitud, direccionMapa);
          this.moverMapa(latitud, longitud, 15);
          this.mensaje = "Ubicaci\xC3\xB3n encontrada. Verifique el punto y presione \xE2\u20AC\u0153Guardar ubicaci\xC3\xB3n\xE2\u20AC\x9D.";
          return;
        }
        this.mensaje = "No se encontr\xC3\xB3 la ubicaci\xC3\xB3n. Escriba una direcci\xC3\xB3n m\xC3\xA1s completa o toque el mapa manualmente.";
      } catch (error) {
        console.error(error);
        this.mensaje = "No se pudo buscar la ubicaci\xC3\xB3n. Puede pegar coordenadas o tocar el mapa.";
      } finally {
        this.cargandoBusqueda = false;
      }
    });
  }
  consultarNominatim(consulta) {
    return __async(this, null, function* () {
      const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=8&countrycodes=pe&accept-language=es&q=${encodeURIComponent(consulta)}`;
      const respuesta = yield fetch(url, {
        headers: {
          Accept: "application/json",
          "Accept-Language": "es"
        }
      });
      const resultados = yield respuesta.json();
      if (!Array.isArray(resultados) || resultados.length === 0) {
        return null;
      }
      const resultadosValidos = resultados.filter((resultado) => {
        const latitud = Number(resultado.lat);
        const longitud = Number(resultado.lon);
        return this.esCoordenadaValida(latitud, longitud);
      });
      if (resultadosValidos.length === 0) {
        return null;
      }
      return this.elegirResultadoMasSeguro(consulta, resultadosValidos);
    });
  }
  generarConsultasBusqueda(texto) {
    const limpio = String(texto || "").trim();
    if (!limpio) {
      return [];
    }
    const normalizado = this.normalizarTexto(limpio);
    const consultas = [];
    if (!normalizado.includes("peru")) {
      consultas.push(`${limpio}, Per\xC3\xBA`);
    }
    consultas.push(limpio);
    return Array.from(new Set(consultas));
  }
  elegirResultadoMasSeguro(consulta, resultados) {
    const consultaNormalizada = this.normalizarTexto(consulta);
    const palabrasClave = this.obtenerPalabrasClave(consultaNormalizada);
    if (palabrasClave.length === 0) {
      return resultados[0] || null;
    }
    const puntuados = resultados.map((resultado) => {
      const direccion = this.normalizarTexto(String(resultado.display_name || ""));
      const tipo = String(resultado.type || "").toLowerCase();
      const clase = String(resultado.class || "").toLowerCase();
      let puntaje = 0;
      let coincidencias = 0;
      for (const palabra of palabrasClave) {
        if (direccion.includes(palabra)) {
          coincidencias++;
          puntaje += 45;
        } else {
          puntaje -= 40;
        }
      }
      const cobertura = coincidencias / palabrasClave.length;
      if (direccion.includes("peru")) {
        puntaje += 20;
      }
      if (tipo.includes("city") || tipo.includes("town") || tipo.includes("village") || tipo.includes("administrative") || clase.includes("place") || clase.includes("boundary") || clase.includes("highway")) {
        puntaje += 10;
      }
      if (cobertura < 0.6) {
        puntaje -= 1e3;
      }
      return {
        resultado,
        puntaje,
        cobertura
      };
    });
    puntuados.sort((a, b) => b.puntaje - a.puntaje);
    const mejor = puntuados[0];
    if (!mejor || mejor.puntaje < -200) {
      return null;
    }
    return mejor.resultado;
  }
  obtenerPalabrasClave(textoNormalizado) {
    const palabrasIgnoradas = [
      "peru",
      "lima",
      "provincia",
      "departamento",
      "distrito",
      "region",
      "calle",
      "avenida",
      "av",
      "jr",
      "jiron",
      "pasaje",
      "urbanizacion",
      "urb",
      "mz",
      "lt",
      "numero",
      "nro",
      "sector",
      "etapa"
    ];
    return textoNormalizado.split(/\s+/).map((palabra) => palabra.trim()).filter((palabra) => palabra.length >= 3).filter((palabra) => !palabrasIgnoradas.includes(palabra));
  }
  normalizarTexto(texto) {
    return String(texto || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
  }
  colocarMarcador(latitud, longitud, direccionMapa) {
    if (!this.esCoordenadaValida(latitud, longitud)) {
      this.mensaje = "Coordenadas no v\xC3\xA1lidas.";
      return;
    }
    this.latitudSeleccionada = latitud;
    this.longitudSeleccionada = longitud;
    this.direccionMapaSeleccionada = direccionMapa;
    this.ubicacionTextoOriginalSeleccionada = this.textoInicial || direccionMapa;
    if (this.marcador) {
      this.marcador.setLatLng([latitud, longitud]);
    }
  }
  moverMapa(latitud, longitud, zoom) {
    if (!this.mapa) {
      return;
    }
    this.mapa.setView([latitud, longitud], zoom);
    setTimeout(() => {
      this.mapa?.invalidateSize();
    }, 200);
  }
  extraerCoordenadas(texto) {
    const limpio = decodeURIComponent(texto);
    const patrones = [
      /@(-?\d{1,2}\.\d+),\s*(-?\d{1,3}\.\d+)/,
      /q=(-?\d{1,2}\.\d+),\s*(-?\d{1,3}\.\d+)/,
      /ll=(-?\d{1,2}\.\d+),\s*(-?\d{1,3}\.\d+)/,
      /(-?\d{1,2}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)/
    ];
    for (const patron of patrones) {
      const coincidencia = limpio.match(patron);
      if (!coincidencia) {
        continue;
      }
      const latitud = Number(coincidencia[1]);
      const longitud = Number(coincidencia[2]);
      if (this.esCoordenadaValida(latitud, longitud)) {
        return {
          latitud,
          longitud
        };
      }
    }
    return null;
  }
  esCoordenadaValida(latitud, longitud) {
    return Number.isFinite(latitud) && Number.isFinite(longitud) && latitud >= -90 && latitud <= 90 && longitud >= -180 && longitud <= 180;
  }
  crearIconoMarcador() {
    return L.divIcon({
      className: "osm-custom-marker",
      html: '<div class="osm-pin"></div>',
      iconSize: [34, 34],
      iconAnchor: [17, 34]
    });
  }
};
_OsmMapPickerComponent.\u0275fac = function OsmMapPickerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _OsmMapPickerComponent)();
};
_OsmMapPickerComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OsmMapPickerComponent, selectors: [["app-osm-map-picker"]], viewQuery: function OsmMapPickerComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c0, 7);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.mapContainer = _t.first);
  }
}, inputs: { textoInicial: "textoInicial", latitudInicial: "latitudInicial", longitudInicial: "longitudInicial" }, outputs: { ubicacionSeleccionada: "ubicacionSeleccionada" }, features: [\u0275\u0275NgOnChangesFeature], decls: 17, vars: 4, consts: [["mapContainer", ""], [1, "osm-picker"], [1, "osm-toolbar"], ["type", "button", 1, "btn-search-location", 3, "click", "disabled"], ["name", "search-outline"], ["type", "button", 1, "btn-save-location", 3, "click"], ["name", "save-outline"], [1, "osm-map-box"], [1, "osm-map"], ["type", "button", 1, "btn-center-map", 3, "click"], ["class", "osm-selected", 4, "ngIf"], ["class", "osm-message", 4, "ngIf"], [1, "osm-selected"], ["name", "checkmark-circle-outline"], [1, "osm-message"], ["name", "information-circle-outline"]], template: function OsmMapPickerComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 1)(1, "div", 2)(2, "button", 3);
    \u0275\u0275listener("click", function OsmMapPickerComponent_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.buscarAhora());
    });
    \u0275\u0275element(3, "ion-icon", 4);
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 5);
    \u0275\u0275listener("click", function OsmMapPickerComponent_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.guardarUbicacion());
    });
    \u0275\u0275element(7, "ion-icon", 6);
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9, "Guardar ubicaci\xF3n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 7);
    \u0275\u0275element(11, "div", 8, 0);
    \u0275\u0275elementStart(13, "button", 9);
    \u0275\u0275listener("click", function OsmMapPickerComponent_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.usarCentroMapa());
    });
    \u0275\u0275text(14, " Usar centro ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(15, OsmMapPickerComponent_div_15_Template, 7, 2, "div", 10)(16, OsmMapPickerComponent_div_16_Template, 4, 1, "div", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx.cargandoBusqueda);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.cargandoBusqueda ? "Buscando..." : "Buscar ubicaci\xF3n");
    \u0275\u0275advance(10);
    \u0275\u0275property("ngIf", ctx.latitudSeleccionada !== null && ctx.longitudSeleccionada !== null);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.mensaje);
  }
}, dependencies: [CommonModule, NgIf, IonicModule, IonIcon], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  font-family: var(--font-main);\n}\n.osm-picker[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.osm-toolbar[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n}\n.btn-search-location[_ngcontent-%COMP%], \n.btn-save-location[_ngcontent-%COMP%] {\n  height: 40px;\n  border: none;\n  border-radius: 12px;\n  font-family: var(--font-main);\n  font-size: 11.5px;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.btn-search-location[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #ffffff;\n}\n.btn-save-location[_ngcontent-%COMP%] {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n  border: 1px solid #c7f0d5;\n}\n.btn-search-location[_ngcontent-%COMP%]:disabled {\n  opacity: 0.65;\n}\n.btn-search-location[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.btn-save-location[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.osm-map-box[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: 245px;\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--color-border);\n  background: #e2e8f0;\n}\n.osm-map[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n.btn-center-map[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 50%;\n  bottom: 10px;\n  transform: translateX(-50%);\n  height: 34px;\n  padding: 0 13px;\n  border: none;\n  border-radius: 999px;\n  background: #ffffff;\n  color: var(--color-primary);\n  font-family: var(--font-main);\n  font-size: 11px;\n  font-weight: 800;\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.18);\n  z-index: 500;\n}\n.osm-selected[_ngcontent-%COMP%], \n.osm-message[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: flex-start;\n  border-radius: 13px;\n  padding: 10px;\n}\n.osm-selected[_ngcontent-%COMP%] {\n  background: var(--color-success-bg);\n  border: 1px solid #c7f0d5;\n}\n.osm-message[_ngcontent-%COMP%] {\n  background: var(--color-primary-soft);\n  border: 1px solid #dbe8ff;\n}\n.osm-selected[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--color-success);\n  font-size: 18px;\n  flex-shrink: 0;\n}\n.osm-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-size: 18px;\n  flex-shrink: 0;\n}\n.osm-selected[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11.5px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.osm-selected[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.osm-message[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 2px;\n  font-size: 10.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  line-height: 1.35;\n}\n[_nghost-%COMP%]     .osm-custom-marker {\n  background: transparent;\n  border: none;\n}\n[_nghost-%COMP%]     .osm-pin {\n  width: 24px;\n  height: 24px;\n  background: var(--color-primary);\n  border: 3px solid #ffffff;\n  border-radius: 50% 50% 50% 0;\n  transform: rotate(-45deg);\n  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.35);\n}\n[_nghost-%COMP%]     .osm-pin::after {\n  content: "";\n  position: absolute;\n  width: 8px;\n  height: 8px;\n  background: #ffffff;\n  border-radius: 50%;\n  top: 5px;\n  left: 5px;\n}\n@media (max-width: 360px) {\n  .osm-toolbar[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=osm-map-picker.component.css.map */'] });
var OsmMapPickerComponent = _OsmMapPickerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OsmMapPickerComponent, [{
    type: Component,
    args: [{ selector: "app-osm-map-picker", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: `<!-- src/app/shared/componentes/osm-map-picker/osm-map-picker.component.html -->

<section class="osm-picker">

  <div class="osm-toolbar">

    <button
      type="button"
      class="btn-search-location"
      (click)="buscarAhora()"
      [disabled]="cargandoBusqueda"
    >
      <ion-icon name="search-outline"></ion-icon>
      <span>{{ cargandoBusqueda ? 'Buscando...' : 'Buscar ubicaci\xF3n' }}</span>
    </button>

    <button
      type="button"
      class="btn-save-location"
      (click)="guardarUbicacion()"
    >
      <ion-icon name="save-outline"></ion-icon>
      <span>Guardar ubicaci\xF3n</span>
    </button>

  </div>

  <div class="osm-map-box">

    <div #mapContainer class="osm-map"></div>

    <button
      type="button"
      class="btn-center-map"
      (click)="usarCentroMapa()"
    >
      Usar centro
    </button>

  </div>

  <div
    class="osm-selected"
    *ngIf="latitudSeleccionada !== null && longitudSeleccionada !== null"
  >
    <ion-icon name="checkmark-circle-outline"></ion-icon>

    <div>
      <strong>Ubicaci\xF3n seleccionada</strong>
      <span>
        Lat: {{ latitudSeleccionada }} \xB7 Lng: {{ longitudSeleccionada }}
      </span>
    </div>
  </div>

  <div class="osm-message" *ngIf="mensaje">
    <ion-icon name="information-circle-outline"></ion-icon>
    <span>{{ mensaje }}</span>
  </div>

</section>`, styles: ['/* src/app/shared/componentes/osm-map-picker/osm-map-picker.component.css */\n:host {\n  display: block;\n  font-family: var(--font-main);\n}\n.osm-picker {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.osm-toolbar {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n}\n.btn-search-location,\n.btn-save-location {\n  height: 40px;\n  border: none;\n  border-radius: 12px;\n  font-family: var(--font-main);\n  font-size: 11.5px;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.btn-search-location {\n  background: var(--color-primary);\n  color: #ffffff;\n}\n.btn-save-location {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n  border: 1px solid #c7f0d5;\n}\n.btn-search-location:disabled {\n  opacity: 0.65;\n}\n.btn-search-location ion-icon,\n.btn-save-location ion-icon {\n  font-size: 17px;\n}\n.osm-map-box {\n  position: relative;\n  width: 100%;\n  height: 245px;\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--color-border);\n  background: #e2e8f0;\n}\n.osm-map {\n  width: 100%;\n  height: 100%;\n}\n.btn-center-map {\n  position: absolute;\n  left: 50%;\n  bottom: 10px;\n  transform: translateX(-50%);\n  height: 34px;\n  padding: 0 13px;\n  border: none;\n  border-radius: 999px;\n  background: #ffffff;\n  color: var(--color-primary);\n  font-family: var(--font-main);\n  font-size: 11px;\n  font-weight: 800;\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.18);\n  z-index: 500;\n}\n.osm-selected,\n.osm-message {\n  display: flex;\n  gap: 8px;\n  align-items: flex-start;\n  border-radius: 13px;\n  padding: 10px;\n}\n.osm-selected {\n  background: var(--color-success-bg);\n  border: 1px solid #c7f0d5;\n}\n.osm-message {\n  background: var(--color-primary-soft);\n  border: 1px solid #dbe8ff;\n}\n.osm-selected ion-icon {\n  color: var(--color-success);\n  font-size: 18px;\n  flex-shrink: 0;\n}\n.osm-message ion-icon {\n  color: var(--color-primary);\n  font-size: 18px;\n  flex-shrink: 0;\n}\n.osm-selected strong {\n  display: block;\n  font-size: 11.5px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.osm-selected span,\n.osm-message span {\n  display: block;\n  margin-top: 2px;\n  font-size: 10.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  line-height: 1.35;\n}\n:host ::ng-deep .osm-custom-marker {\n  background: transparent;\n  border: none;\n}\n:host ::ng-deep .osm-pin {\n  width: 24px;\n  height: 24px;\n  background: var(--color-primary);\n  border: 3px solid #ffffff;\n  border-radius: 50% 50% 50% 0;\n  transform: rotate(-45deg);\n  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.35);\n}\n:host ::ng-deep .osm-pin::after {\n  content: "";\n  position: absolute;\n  width: 8px;\n  height: 8px;\n  background: #ffffff;\n  border-radius: 50%;\n  top: 5px;\n  left: 5px;\n}\n@media (max-width: 360px) {\n  .osm-toolbar {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=osm-map-picker.component.css.map */\n'] }]
  }], null, { mapContainer: [{
    type: ViewChild,
    args: ["mapContainer", { static: true }]
  }], textoInicial: [{
    type: Input
  }], latitudInicial: [{
    type: Input
  }], longitudInicial: [{
    type: Input
  }], ubicacionSeleccionada: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OsmMapPickerComponent, { className: "OsmMapPickerComponent", filePath: "src/app/shared/componentes/osm-map-picker/osm-map-picker.component.ts", lineNumber: 37 });
})();

// src/app/shared/componentes/trabajo-form-modal/trabajo-form-modal.component.ts
function TrabajoFormModalComponent_section_44_app_osm_map_picker_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-osm-map-picker", 39);
    \u0275\u0275listener("ubicacionSeleccionada", function TrabajoFormModalComponent_section_44_app_osm_map_picker_25_Template_app_osm_map_picker_ubicacionSeleccionada_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.actualizarUbicacionMapa($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("textoInicial", ctx_r1.formulario.value.direccion || "")("latitudInicial", ctx_r1.latitudSeleccionada)("longitudInicial", ctx_r1.longitudSeleccionada);
  }
}
function TrabajoFormModalComponent_section_44_ion_select_option_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-select-option", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tipo_r4 = ctx.$implicit;
    \u0275\u0275property("value", tipo_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tipo_r4, " ");
  }
}
function TrabajoFormModalComponent_section_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 18)(1, "div", 19);
    \u0275\u0275element(2, "ion-icon", 20);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Informaci\xF3n del trabajo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 21)(6, "label");
    \u0275\u0275text(7, "Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "ion-item", 22);
    \u0275\u0275element(9, "ion-input", 23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 21)(11, "label");
    \u0275\u0275text(12, "N\xFAmero de contacto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "ion-item", 22);
    \u0275\u0275element(14, "ion-input", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 21)(16, "label");
    \u0275\u0275text(17, "Direcci\xF3n, coordenadas o enlace");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "ion-item", 22);
    \u0275\u0275element(19, "ion-input", 25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 26)(21, "button", 27);
    \u0275\u0275listener("click", function TrabajoFormModalComponent_section_44_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.alternarMapa());
    });
    \u0275\u0275element(22, "ion-icon", 28);
    \u0275\u0275elementStart(23, "span");
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(25, TrabajoFormModalComponent_section_44_app_osm_map_picker_25_Template, 1, 3, "app-osm-map-picker", 29);
    \u0275\u0275elementStart(26, "div", 21)(27, "label");
    \u0275\u0275text(28, "Referencia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "ion-item", 22);
    \u0275\u0275element(30, "ion-input", 30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 31)(32, "div", 21)(33, "label");
    \u0275\u0275text(34, "Tipo de trabajo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "ion-item", 22)(36, "ion-select", 32);
    \u0275\u0275template(37, TrabajoFormModalComponent_section_44_ion_select_option_37_Template, 2, 2, "ion-select-option", 33);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "div", 21)(39, "label");
    \u0275\u0275text(40, "Subtotal (S/)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "ion-item", 22);
    \u0275\u0275element(42, "ion-input", 34);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(43, "div", 31)(44, "div", 21)(45, "label");
    \u0275\u0275text(46, "Fecha del trabajo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "ion-item", 22);
    \u0275\u0275element(48, "ion-input", 35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 21)(50, "label");
    \u0275\u0275text(51, "Hora programada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "ion-item", 22);
    \u0275\u0275element(53, "ion-input", 36);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(54, "div", 21)(55, "label");
    \u0275\u0275text(56, "Descripci\xF3n opcional");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "ion-item", 37);
    \u0275\u0275element(58, "ion-textarea", 38);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(24);
    \u0275\u0275textInterpolate(ctx_r1.mostrarMapa ? "Ocultar mapa" : "Verificar en mapa");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.mostrarMapa);
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx_r1.tiposTrabajo);
  }
}
function TrabajoFormModalComponent_section_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 18)(1, "div", 19);
    \u0275\u0275element(2, "ion-icon", 41);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Asignaci\xF3n de empleados");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "app-trabajo-empleados-selector", 42);
    \u0275\u0275listener("seleccionadosChange", function TrabajoFormModalComponent_section_45_Template_app_trabajo_empleados_selector_seleccionadosChange_5_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.actualizarEmpleados($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("empleados", ctx_r1.empleadosDisponibles)("seleccionados", ctx_r1.empleadosSeleccionados);
  }
}
function TrabajoFormModalComponent_section_46_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "app-trabajo-materiales-selector", 45);
    \u0275\u0275listener("seleccionadosChange", function TrabajoFormModalComponent_section_46_ng_container_5_Template_app_trabajo_materiales_selector_seleccionadosChange_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.actualizarMateriales($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("materiales", ctx_r1.materialesDisponibles)("seleccionados", ctx_r1.materialesSeleccionados);
  }
}
function TrabajoFormModalComponent_section_46_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275element(1, "ion-icon", 47);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, " Los materiales asignados no se modifican desde esta edici\xF3n para proteger el control del stock. ");
    \u0275\u0275elementEnd()();
  }
}
function TrabajoFormModalComponent_section_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 18)(1, "div", 19);
    \u0275\u0275element(2, "ion-icon", 43);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Asignaci\xF3n de materiales");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(5, TrabajoFormModalComponent_section_46_ng_container_5_Template, 2, 2, "ng-container", 44)(6, TrabajoFormModalComponent_section_46_ng_template_6_Template, 4, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const materialesBloqueados_r7 = \u0275\u0275reference(7);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.esCrear)("ngIfElse", materialesBloqueados_r7);
  }
}
function TrabajoFormModalComponent_section_47_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50)(1, "span");
    \u0275\u0275text(2, "Ubicaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" Lat: ", ctx_r1.latitudSeleccionada, " \xB7 Lng: ", ctx_r1.longitudSeleccionada, " ");
  }
}
function TrabajoFormModalComponent_section_47_div_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275element(1, "ion-icon", 55);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, " Al confirmar, el sistema descontar\xE1 autom\xE1ticamente el stock de los materiales asignados. ");
    \u0275\u0275elementEnd()();
  }
}
function TrabajoFormModalComponent_section_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 18)(1, "div", 19);
    \u0275\u0275element(2, "ion-icon", 48);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Confirmaci\xF3n del trabajo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 49)(6, "div", 50)(7, "span");
    \u0275\u0275text(8, "Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 50)(12, "span");
    \u0275\u0275text(13, "Contacto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 50)(17, "span");
    \u0275\u0275text(18, "Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "strong");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(21, TrabajoFormModalComponent_section_47_div_21_Template, 5, 2, "div", 51);
    \u0275\u0275elementStart(22, "div", 50)(23, "span");
    \u0275\u0275text(24, "Tipo de trabajo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "strong");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 50)(28, "span");
    \u0275\u0275text(29, "Fecha y hora");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "strong");
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 50)(33, "span");
    \u0275\u0275text(34, "Empleados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "strong");
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 50)(38, "span");
    \u0275\u0275text(39, "Materiales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "strong");
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 52)(43, "span");
    \u0275\u0275text(44, "Subtotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "strong");
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(47, TrabajoFormModalComponent_section_47_div_47_Template, 4, 0, "div", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.formulario.value.clienteNombre || "Sin cliente");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formulario.value.clienteTelefono || "Sin contacto");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formulario.value.direccion || "Sin direcci\xF3n");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.latitudSeleccionada !== null && ctx_r1.longitudSeleccionada !== null);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formulario.value.tipoTrabajo || "Sin tipo");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" ", ctx_r1.formulario.value.fechaProgramada || "Sin fecha", " \xB7 ", ctx_r1.formulario.value.horaProgramada || "Sin hora", " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.resumenEmpleados);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.esCrear ? ctx_r1.resumenMateriales : "Sin modificaci\xF3n de materiales");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("S/ ", ctx_r1.formulario.value.subtotal || 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.esCrear);
  }
}
function TrabajoFormModalComponent_button_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 56);
    \u0275\u0275listener("click", function TrabajoFormModalComponent_button_49_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.anterior());
    });
    \u0275\u0275element(1, "ion-icon", 57);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Anterior");
    \u0275\u0275elementEnd()();
  }
}
function TrabajoFormModalComponent_button_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 56);
    \u0275\u0275listener("click", function TrabajoFormModalComponent_button_50_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelar());
    });
    \u0275\u0275text(1, " Cancelar ");
    \u0275\u0275elementEnd();
  }
}
function TrabajoFormModalComponent_button_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 58);
    \u0275\u0275listener("click", function TrabajoFormModalComponent_button_51_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.siguiente());
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "Siguiente");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "ion-icon", 59);
    \u0275\u0275elementEnd();
  }
}
function TrabajoFormModalComponent_button_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 58);
    \u0275\u0275listener("click", function TrabajoFormModalComponent_button_52_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.guardar());
    });
    \u0275\u0275element(1, "ion-icon", 60);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.textoBotonFinal);
  }
}
var _TrabajoFormModalComponent = class _TrabajoFormModalComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.modalCtrl = inject(ModalController);
    this.toastCtrl = inject(ToastController);
    this.trabajoService = inject(TrabajoService);
    this.modo = "crear";
    this.trabajo = null;
    this.pasoActual = 1;
    this.totalPasos = 4;
    this.empleadosDisponibles = [];
    this.materialesDisponibles = [];
    this.empleadosSeleccionados = [];
    this.materialesSeleccionados = [];
    this.cargandoDatos = false;
    this.mostrarMapa = false;
    this.latitudSeleccionada = null;
    this.longitudSeleccionada = null;
    this.direccionMapaSeleccionada = "";
    this.ubicacionTextoOriginal = "";
    this.tiposTrabajo = [
      "Instalaci\xF3n el\xE9ctrica",
      "Mantenimiento el\xE9ctrico",
      "Reparaci\xF3n",
      "Inspecci\xF3n t\xE9cnica",
      "Construcci\xF3n",
      "Otro"
    ];
    this.formulario = this.fb.group({
      clienteNombre: ["", [Validators.required]],
      clienteTelefono: ["", [Validators.required]],
      direccion: ["", [Validators.required]],
      referencia: [""],
      tipoTrabajo: ["", [Validators.required]],
      descripcion: [""],
      fechaProgramada: ["", [Validators.required]],
      horaProgramada: ["", [Validators.required]],
      subtotal: [0, [Validators.required, Validators.min(0)]]
    });
  }
  alternarMapa() {
    this.mostrarMapa = !this.mostrarMapa;
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 250);
  }
  actualizarUbicacionMapa(ubicacion) {
    this.latitudSeleccionada = ubicacion.latitud;
    this.longitudSeleccionada = ubicacion.longitud;
    this.direccionMapaSeleccionada = ubicacion.direccionMapa;
    this.ubicacionTextoOriginal = ubicacion.ubicacionTextoOriginal;
    this.formulario.patchValue({
      direccion: ubicacion.direccionMapa || ubicacion.ubicacionTextoOriginal
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this.cargarDatos();
      if (this.esEditar && this.trabajo) {
        this.formulario.patchValue({
          clienteNombre: this.trabajo.clienteNombre || "",
          clienteTelefono: this.trabajo.clienteTelefono || "",
          direccion: this.trabajo.direccion || "",
          referencia: this.trabajo.referencia || "",
          tipoTrabajo: this.trabajo.tipoTrabajo || "",
          descripcion: this.trabajo.descripcion || "",
          fechaProgramada: this.trabajo.fechaProgramada || "",
          horaProgramada: this.trabajo.horaProgramada || "",
          subtotal: Number(this.trabajo.subtotal || 0)
        });
        this.empleadosSeleccionados = [...this.trabajo.empleadosAsignados || []];
        this.materialesSeleccionados = [...this.trabajo.materialesAsignados || []];
        this.latitudSeleccionada = this.trabajo.latitud ?? null;
        this.longitudSeleccionada = this.trabajo.longitud ?? null;
        this.direccionMapaSeleccionada = this.trabajo.direccionMapa || "";
        this.ubicacionTextoOriginal = this.trabajo.ubicacionTextoOriginal || "";
      }
    });
  }
  get esCrear() {
    return this.modo === "crear";
  }
  get esEditar() {
    return this.modo === "editar";
  }
  get titulo() {
    return this.esCrear ? "Nuevo trabajo" : "Editar trabajo";
  }
  get subtitulo() {
    if (this.pasoActual === 1) {
      return "Informaci\xF3n principal del trabajo.";
    }
    if (this.pasoActual === 2) {
      return "Seleccione los empleados responsables.";
    }
    if (this.pasoActual === 3) {
      return this.esCrear ? "Seleccione materiales y cantidades." : "Materiales bloqueados por trazabilidad.";
    }
    return "Revise la informaci\xF3n antes de guardar.";
  }
  get textoBotonFinal() {
    return this.esCrear ? "Asignar trabajo" : "Guardar cambios";
  }
  get tituloPaso() {
    if (this.pasoActual === 1) {
      return "Informaci\xF3n";
    }
    if (this.pasoActual === 2) {
      return "Empleados";
    }
    if (this.pasoActual === 3) {
      return "Materiales";
    }
    return "Confirmaci\xF3n";
  }
  get resumenMateriales() {
    if (this.materialesSeleccionados.length === 0) {
      return "Sin materiales seleccionados";
    }
    return `${this.materialesSeleccionados.length} material(es) seleccionado(s)`;
  }
  get resumenEmpleados() {
    if (this.empleadosSeleccionados.length === 0) {
      return "Sin empleados seleccionados";
    }
    return `${this.empleadosSeleccionados.length} empleado(s) seleccionado(s)`;
  }
  cargarDatos() {
    return __async(this, null, function* () {
      this.cargandoDatos = true;
      try {
        const [empleados, materiales] = yield Promise.all([
          this.trabajoService.obtenerEmpleadosDisponibles(),
          this.trabajoService.obtenerMaterialesDisponibles()
        ]);
        this.empleadosDisponibles = empleados;
        this.materialesDisponibles = materiales;
      } catch (error) {
        console.error(error);
        this.mostrarToast("No se pudieron cargar empleados o materiales");
      } finally {
        this.cargandoDatos = false;
      }
    });
  }
  actualizarEmpleados(empleados) {
    this.empleadosSeleccionados = empleados;
  }
  actualizarMateriales(materiales) {
    this.materialesSeleccionados = materiales;
  }
  irPaso(paso) {
    if (paso < 1 || paso > this.totalPasos) {
      return;
    }
    if (paso > this.pasoActual && !this.validarPasoActual()) {
      return;
    }
    this.pasoActual = paso;
  }
  siguiente() {
    if (!this.validarPasoActual()) {
      return;
    }
    if (this.pasoActual < this.totalPasos) {
      this.pasoActual++;
    }
  }
  anterior() {
    if (this.pasoActual > 1) {
      this.pasoActual--;
    }
  }
  validarPasoActual() {
    if (this.pasoActual === 1) {
      const campos = [
        "clienteNombre",
        "clienteTelefono",
        "direccion",
        "tipoTrabajo",
        "fechaProgramada",
        "horaProgramada",
        "subtotal"
      ];
      campos.forEach((campo) => {
        this.formulario.get(campo)?.markAsTouched();
      });
      if (this.formulario.get("clienteNombre")?.invalid || this.formulario.get("clienteTelefono")?.invalid || this.formulario.get("direccion")?.invalid || this.formulario.get("tipoTrabajo")?.invalid || this.formulario.get("fechaProgramada")?.invalid || this.formulario.get("horaProgramada")?.invalid || this.formulario.get("subtotal")?.invalid) {
        this.mostrarToast("Complete correctamente la informaci\xF3n del trabajo");
        return false;
      }
    }
    if (this.pasoActual === 2 && this.empleadosSeleccionados.length === 0) {
      this.mostrarToast("Seleccione al menos un empleado");
      return false;
    }
    if (this.pasoActual === 3 && this.esCrear && this.materialesSeleccionados.length === 0) {
      this.mostrarToast("Seleccione al menos un material");
      return false;
    }
    return true;
  }
  cancelar() {
    this.modalCtrl.dismiss(null, "cancel");
  }
  guardar() {
    return __async(this, null, function* () {
      this.formulario.markAllAsTouched();
      if (!this.validarPasoActual()) {
        return;
      }
      if (this.formulario.invalid) {
        this.mostrarToast("Complete correctamente los datos del trabajo");
        return;
      }
      if (this.empleadosSeleccionados.length === 0) {
        this.mostrarToast("Seleccione al menos un empleado");
        return;
      }
      if (this.esCrear && this.materialesSeleccionados.length === 0) {
        this.mostrarToast("Seleccione al menos un material");
        return;
      }
      const data = this.formulario.getRawValue();
      const payload = {
        clienteNombre: String(data.clienteNombre || "").trim(),
        clienteTelefono: String(data.clienteTelefono || "").trim(),
        direccion: String(data.direccion || "").trim(),
        referencia: String(data.referencia || "").trim(),
        latitud: this.latitudSeleccionada,
        longitud: this.longitudSeleccionada,
        direccionMapa: this.direccionMapaSeleccionada,
        ubicacionTextoOriginal: this.ubicacionTextoOriginal,
        tipoTrabajo: String(data.tipoTrabajo || "").trim(),
        descripcion: String(data.descripcion || "").trim(),
        fechaProgramada: String(data.fechaProgramada || "").trim(),
        horaProgramada: String(data.horaProgramada || "").trim(),
        subtotal: Number(data.subtotal || 0),
        empleadosAsignados: this.empleadosSeleccionados
      };
      if (this.esCrear) {
        payload.materialesAsignados = this.materialesSeleccionados;
      }
      if (this.esEditar && this.trabajo?.uid) {
        payload.uid = this.trabajo.uid;
      }
      yield this.modalCtrl.dismiss(payload, "confirm");
    });
  }
  mostrarToast(message) {
    return __async(this, null, function* () {
      const toast = yield this.toastCtrl.create({
        message,
        duration: 2200,
        color: "danger",
        position: "top"
      });
      yield toast.present();
    });
  }
};
_TrabajoFormModalComponent.\u0275fac = function TrabajoFormModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TrabajoFormModalComponent)();
};
_TrabajoFormModalComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TrabajoFormModalComponent, selectors: [["app-trabajo-form-modal"]], inputs: { modo: "modo", trabajo: "trabajo" }, decls: 53, vars: 29, consts: [["materialesBloqueados", ""], [1, "modal-header"], [1, "modal-title-box"], [1, "modal-avatar"], ["name", "briefcase-outline"], ["type", "button", "slot", "end", 1, "btn-close", 3, "click"], ["name", "close-outline"], [1, "modal-content"], [1, "form-wrapper", 3, "formGroup"], [1, "step-card"], [1, "step-header"], [1, "steps-line"], ["type", "button", 1, "step-item", 3, "click"], [1, "step-divider"], ["class", "form-card", 4, "ngIf"], [1, "modal-actions"], ["type", "button", "class", "btn-secondary", 3, "click", 4, "ngIf"], ["type", "button", "class", "btn-primary", 3, "click", 4, "ngIf"], [1, "form-card"], [1, "form-section-title"], ["name", "person-outline"], [1, "field-group"], ["lines", "none", 1, "input-card"], ["formControlName", "clienteNombre", "placeholder", "Nombre del cliente"], ["formControlName", "clienteTelefono", "type", "tel", "inputmode", "tel", "placeholder", "987 654 321"], ["formControlName", "direccion", "placeholder", "Direcci\xF3n, coordenadas o enlace de Google Maps"], [1, "map-action-row"], ["type", "button", 1, "btn-open-map", 3, "click"], ["name", "map-outline"], [3, "textoInicial", "latitudInicial", "longitudInicial", "ubicacionSeleccionada", 4, "ngIf"], ["formControlName", "referencia", "placeholder", "Referencia opcional"], [1, "form-grid"], ["formControlName", "tipoTrabajo", "interface", "popover", "placeholder", "Seleccione"], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "subtotal", "type", "number", "inputmode", "decimal", "placeholder", "0.00"], ["formControlName", "fechaProgramada", "type", "date"], ["formControlName", "horaProgramada", "type", "time"], ["lines", "none", 1, "input-card", "textarea-card"], ["formControlName", "descripcion", "placeholder", "Detalle u observaci\xF3n del trabajo", "autoGrow", "true"], [3, "ubicacionSeleccionada", "textoInicial", "latitudInicial", "longitudInicial"], [3, "value"], ["name", "people-outline"], [3, "seleccionadosChange", "empleados", "seleccionados"], ["name", "cube-outline"], [4, "ngIf", "ngIfElse"], [3, "seleccionadosChange", "materiales", "seleccionados"], [1, "info-box"], ["name", "information-circle-outline"], ["name", "checkmark-circle-outline"], [1, "resume-box"], [1, "resume-row"], ["class", "resume-row", 4, "ngIf"], [1, "resume-row", "total"], ["class", "warning-box", 4, "ngIf"], [1, "warning-box"], ["name", "alert-circle-outline"], ["type", "button", 1, "btn-secondary", 3, "click"], ["name", "chevron-back-outline"], ["type", "button", 1, "btn-primary", 3, "click"], ["name", "chevron-forward-outline"], ["name", "save-outline"]], template: function TrabajoFormModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-header", 1)(1, "ion-toolbar")(2, "div", 2)(3, "div", 3);
    \u0275\u0275element(4, "ion-icon", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "h2");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "button", 5);
    \u0275\u0275listener("click", function TrabajoFormModalComponent_Template_button_click_10_listener() {
      return ctx.cancelar();
    });
    \u0275\u0275element(11, "ion-icon", 6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "ion-content", 7)(13, "form", 8)(14, "section", 9)(15, "div", 10)(16, "h3");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "p");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 11)(21, "button", 12);
    \u0275\u0275listener("click", function TrabajoFormModalComponent_Template_button_click_21_listener() {
      return ctx.irPaso(1);
    });
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "small");
    \u0275\u0275text(25, "Informaci\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(26, "div", 13);
    \u0275\u0275elementStart(27, "button", 12);
    \u0275\u0275listener("click", function TrabajoFormModalComponent_Template_button_click_27_listener() {
      return ctx.irPaso(2);
    });
    \u0275\u0275elementStart(28, "span");
    \u0275\u0275text(29, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "small");
    \u0275\u0275text(31, "Empleados");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(32, "div", 13);
    \u0275\u0275elementStart(33, "button", 12);
    \u0275\u0275listener("click", function TrabajoFormModalComponent_Template_button_click_33_listener() {
      return ctx.irPaso(3);
    });
    \u0275\u0275elementStart(34, "span");
    \u0275\u0275text(35, "3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "small");
    \u0275\u0275text(37, "Materiales");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(38, "div", 13);
    \u0275\u0275elementStart(39, "button", 12);
    \u0275\u0275listener("click", function TrabajoFormModalComponent_Template_button_click_39_listener() {
      return ctx.irPaso(4);
    });
    \u0275\u0275elementStart(40, "span");
    \u0275\u0275text(41, "4");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "small");
    \u0275\u0275text(43, "Confirmaci\xF3n");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(44, TrabajoFormModalComponent_section_44_Template, 59, 3, "section", 14)(45, TrabajoFormModalComponent_section_45_Template, 6, 2, "section", 14)(46, TrabajoFormModalComponent_section_46_Template, 8, 2, "section", 14)(47, TrabajoFormModalComponent_section_47_Template, 48, 11, "section", 14);
    \u0275\u0275elementStart(48, "div", 15);
    \u0275\u0275template(49, TrabajoFormModalComponent_button_49_Template, 4, 0, "button", 16)(50, TrabajoFormModalComponent_button_50_Template, 2, 0, "button", 16)(51, TrabajoFormModalComponent_button_51_Template, 4, 0, "button", 17)(52, TrabajoFormModalComponent_button_52_Template, 4, 1, "button", 17);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("Paso ", ctx.pasoActual, " de ", ctx.totalPasos, " \xB7 ", ctx.tituloPaso);
    \u0275\u0275advance(4);
    \u0275\u0275property("formGroup", ctx.formulario);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.tituloPaso);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.subtitulo);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx.pasoActual === 1)("done", ctx.pasoActual > 1);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("active", ctx.pasoActual === 2)("done", ctx.pasoActual > 2);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("active", ctx.pasoActual === 3)("done", ctx.pasoActual > 3);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("active", ctx.pasoActual === 4);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx.pasoActual === 1);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.pasoActual === 2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.pasoActual === 3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.pasoActual === 4);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx.pasoActual > 1);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.pasoActual === 1);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.pasoActual < ctx.totalPasos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.pasoActual === ctx.totalPasos);
  }
}, dependencies: [
  CommonModule,
  NgForOf,
  NgIf,
  IonicModule,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonToolbar,
  NumericValueAccessorDirective,
  SelectValueAccessorDirective,
  TextValueAccessorDirective,
  ReactiveFormsModule,
  \u0275NgNoValidate,
  NgControlStatus,
  NgControlStatusGroup,
  FormGroupDirective,
  FormControlName,
  TrabajoEmpleadosSelectorComponent,
  TrabajoMaterialesSelectorComponent,
  OsmMapPickerComponent
], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: var(--color-background);\n  font-family: var(--font-main);\n}\n.modal-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      135deg,\n      var(--color-primary),\n      var(--color-primary-hover));\n  --color: #ffffff;\n  --min-height: 82px;\n  --padding-start: 14px;\n  --padding-end: 12px;\n}\n.modal-title-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.modal-avatar[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.16);\n  border: 1px solid rgba(255, 255, 255, 0.22);\n  display: grid;\n  place-items: center;\n  color: #ffffff;\n  flex-shrink: 0;\n}\n.modal-avatar[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.modal-title-box[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 17px;\n  font-weight: 800;\n  color: #ffffff;\n}\n.modal-title-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 700;\n  color: #ffd166;\n}\n.btn-close[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.13);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n}\n.btn-close[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.modal-content[_ngcontent-%COMP%] {\n  --background: var(--color-background);\n  flex: 1;\n}\n.form-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: var(--app-width);\n  margin: 0 auto;\n  padding: 12px 14px 18px;\n}\n.step-card[_ngcontent-%COMP%], \n.form-card[_ngcontent-%COMP%] {\n  background: var(--color-card);\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  padding: 14px;\n  margin-bottom: 12px;\n  box-shadow: var(--shadow-card);\n}\n.step-header[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.step-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.step-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.steps-line[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr auto 1fr auto 1fr auto;\n  align-items: start;\n  gap: 5px;\n}\n.step-item[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  padding: 0;\n  display: grid;\n  justify-items: center;\n  gap: 4px;\n  color: #94a3b8;\n}\n.step-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 999px;\n  background: #e2e8f0;\n  color: #64748b;\n  display: grid;\n  place-items: center;\n  font-size: 12px;\n  font-weight: 800;\n}\n.step-item[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 9.2px;\n  font-weight: 700;\n  color: #64748b;\n  white-space: nowrap;\n}\n.step-item.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.step-item.done[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #ffffff;\n}\n.step-item.active[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.step-item.done[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.step-divider[_ngcontent-%COMP%] {\n  height: 2px;\n  margin-top: 13px;\n  border-radius: 999px;\n  background: #dbe3ef;\n}\n.form-section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  margin-bottom: 12px;\n  color: var(--color-text);\n  font-size: 13px;\n  font-weight: 800;\n}\n.form-section-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n  color: var(--color-primary);\n}\n.field-group[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.field-group[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.field-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 11.5px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.input-card[_ngcontent-%COMP%] {\n  --background: #ffffff;\n  --border-radius: 10px;\n  --min-height: 43px;\n  --padding-start: 12px;\n  --inner-padding-end: 10px;\n  border: 1px solid var(--color-border);\n  border-radius: 10px;\n}\n.input-card[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px rgba(26, 62, 140, 0.12);\n}\n.input-card[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%], \n.input-card[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%], \n.input-card[_ngcontent-%COMP%]   ion-textarea[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text);\n}\n.textarea-card[_ngcontent-%COMP%] {\n  min-height: 78px;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.info-box[_ngcontent-%COMP%], \n.warning-box[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 9px;\n  align-items: flex-start;\n  border-radius: 14px;\n  padding: 12px;\n}\n.info-box[_ngcontent-%COMP%] {\n  background: var(--color-primary-soft);\n  border: 1px solid #dbe8ff;\n}\n.warning-box[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  background: var(--color-warning-bg);\n  border: 1px solid #fdecc8;\n}\n.info-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.warning-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 19px;\n  flex-shrink: 0;\n}\n.info-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.warning-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--color-warning);\n}\n.info-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.warning-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 11.5px;\n  font-weight: 600;\n  color: var(--color-text);\n  line-height: 1.4;\n}\n.resume-box[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 9px;\n}\n.resume-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  padding-bottom: 8px;\n  border-bottom: 1px solid #edf2f7;\n}\n.resume-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n.resume-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.resume-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 800;\n  color: var(--color-text);\n  text-align: right;\n  line-height: 1.3;\n}\n.resume-row.total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-size: 14px;\n}\n.modal-actions[_ngcontent-%COMP%] {\n  position: sticky;\n  bottom: 0;\n  z-index: 5;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(245, 247, 250, 0),\n      var(--color-background) 30%);\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n  padding-top: 10px;\n}\n.btn-secondary[_ngcontent-%COMP%], \n.btn-primary[_ngcontent-%COMP%] {\n  height: 45px;\n  border: none;\n  border-radius: 11px;\n  font-size: 13px;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  font-family: var(--font-main);\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #ffffff;\n  color: var(--color-text-muted);\n  border: 1px solid var(--color-border);\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #ffffff;\n  box-shadow: var(--shadow-button);\n}\n.btn-primary[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.btn-secondary[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.steps-line[_ngcontent-%COMP%] {\n  gap: 3px;\n}\n.step-item[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 8.5px;\n}\n.map-action-row[_ngcontent-%COMP%] {\n  margin: -2px 0 12px;\n  display: flex;\n  justify-content: flex-end;\n}\n.btn-open-map[_ngcontent-%COMP%] {\n  min-height: 38px;\n  border: none;\n  border-radius: 12px;\n  padding: 0 12px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 12px;\n  font-weight: 800;\n  font-family: var(--font-main);\n}\n.btn-open-map[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.btn-open-map[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n@media (max-width: 360px) {\n  .form-grid[_ngcontent-%COMP%], \n   .modal-actions[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=trabajo-form-modal.component.css.map */"] });
var TrabajoFormModalComponent = _TrabajoFormModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrabajoFormModalComponent, [{
    type: Component,
    args: [{ selector: "app-trabajo-form-modal", standalone: true, imports: [
      CommonModule,
      IonicModule,
      ReactiveFormsModule,
      TrabajoEmpleadosSelectorComponent,
      TrabajoMaterialesSelectorComponent,
      OsmMapPickerComponent
    ], template: `<!-- src/app/shared/componentes/trabajo-form-modal/trabajo-form-modal.component.html -->

<ion-header class="modal-header">
  <ion-toolbar>

    <div class="modal-title-box">
      <div class="modal-avatar">
        <ion-icon name="briefcase-outline"></ion-icon>
      </div>

      <div>
        <h2>{{ titulo }}</h2>
        <p>Paso {{ pasoActual }} de {{ totalPasos }} \xB7 {{ tituloPaso }}</p>
      </div>
    </div>

    <button type="button" class="btn-close" slot="end" (click)="cancelar()">
      <ion-icon name="close-outline"></ion-icon>
    </button>

  </ion-toolbar>
</ion-header>

<ion-content class="modal-content">

  <form [formGroup]="formulario" class="form-wrapper">

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
          (click)="irPaso(1)"
        >
          <span>1</span>
          <small>Informaci\xF3n</small>
        </button>

        <div class="step-divider"></div>

        <button
          type="button"
          class="step-item"
          [class.active]="pasoActual === 2"
          [class.done]="pasoActual > 2"
          (click)="irPaso(2)"
        >
          <span>2</span>
          <small>Empleados</small>
        </button>

        <div class="step-divider"></div>

        <button
          type="button"
          class="step-item"
          [class.active]="pasoActual === 3"
          [class.done]="pasoActual > 3"
          (click)="irPaso(3)"
        >
          <span>3</span>
          <small>Materiales</small>
        </button>

        <div class="step-divider"></div>

        <button
          type="button"
          class="step-item"
          [class.active]="pasoActual === 4"
          (click)="irPaso(4)"
        >
          <span>4</span>
          <small>Confirmaci\xF3n</small>
        </button>

      </div>

    </section>

    <!-- PASO 1 -->
    <section class="form-card" *ngIf="pasoActual === 1">

      <div class="form-section-title">
        <ion-icon name="person-outline"></ion-icon>
        <span>Informaci\xF3n del trabajo</span>
      </div>

      <div class="field-group">
        <label>Cliente</label>
        <ion-item lines="none" class="input-card">
          <ion-input
            formControlName="clienteNombre"
            placeholder="Nombre del cliente"
          ></ion-input>
        </ion-item>
      </div>

      <div class="field-group">
        <label>N\xFAmero de contacto</label>
        <ion-item lines="none" class="input-card">
          <ion-input
            formControlName="clienteTelefono"
            type="tel"
            inputmode="tel"
            placeholder="987 654 321"
          ></ion-input>
        </ion-item>
      </div>

      <div class="field-group">
        <label>Direcci\xF3n, coordenadas o enlace</label>
        <ion-item lines="none" class="input-card">
          <ion-input
            formControlName="direccion"
            placeholder="Direcci\xF3n, coordenadas o enlace de Google Maps"
          ></ion-input>
        </ion-item>
      </div>

      <div class="map-action-row">
        <button
          type="button"
          class="btn-open-map"
          (click)="alternarMapa()"
        >
          <ion-icon name="map-outline"></ion-icon>
          <span>{{ mostrarMapa ? 'Ocultar mapa' : 'Verificar en mapa' }}</span>
        </button>
      </div>

      <app-osm-map-picker
        *ngIf="mostrarMapa"
        [textoInicial]="formulario.value.direccion || ''"
        [latitudInicial]="latitudSeleccionada"
        [longitudInicial]="longitudSeleccionada"
        (ubicacionSeleccionada)="actualizarUbicacionMapa($event)"
      ></app-osm-map-picker>

      <div class="field-group">
        <label>Referencia</label>
        <ion-item lines="none" class="input-card">
          <ion-input
            formControlName="referencia"
            placeholder="Referencia opcional"
          ></ion-input>
        </ion-item>
      </div>

      <div class="form-grid">

        <div class="field-group">
          <label>Tipo de trabajo</label>
          <ion-item lines="none" class="input-card">
            <ion-select
              formControlName="tipoTrabajo"
              interface="popover"
              placeholder="Seleccione"
            >
              <ion-select-option
                *ngFor="let tipo of tiposTrabajo"
                [value]="tipo"
              >
                {{ tipo }}
              </ion-select-option>
            </ion-select>
          </ion-item>
        </div>

        <div class="field-group">
          <label>Subtotal (S/)</label>
          <ion-item lines="none" class="input-card">
            <ion-input
              formControlName="subtotal"
              type="number"
              inputmode="decimal"
              placeholder="0.00"
            ></ion-input>
          </ion-item>
        </div>

      </div>

      <div class="form-grid">

        <div class="field-group">
          <label>Fecha del trabajo</label>
          <ion-item lines="none" class="input-card">
            <ion-input
              formControlName="fechaProgramada"
              type="date"
            ></ion-input>
          </ion-item>
        </div>

        <div class="field-group">
          <label>Hora programada</label>
          <ion-item lines="none" class="input-card">
            <ion-input
              formControlName="horaProgramada"
              type="time"
            ></ion-input>
          </ion-item>
        </div>

      </div>

      <div class="field-group">
        <label>Descripci\xF3n opcional</label>
        <ion-item lines="none" class="input-card textarea-card">
          <ion-textarea
            formControlName="descripcion"
            placeholder="Detalle u observaci\xF3n del trabajo"
            autoGrow="true"
          ></ion-textarea>
        </ion-item>
      </div>

    </section>

    <!-- PASO 2 -->
    <section class="form-card" *ngIf="pasoActual === 2">

      <div class="form-section-title">
        <ion-icon name="people-outline"></ion-icon>
        <span>Asignaci\xF3n de empleados</span>
      </div>

      <app-trabajo-empleados-selector
        [empleados]="empleadosDisponibles"
        [seleccionados]="empleadosSeleccionados"
        (seleccionadosChange)="actualizarEmpleados($event)"
      ></app-trabajo-empleados-selector>

    </section>

    <!-- PASO 3 -->
    <section class="form-card" *ngIf="pasoActual === 3">

      <div class="form-section-title">
        <ion-icon name="cube-outline"></ion-icon>
        <span>Asignaci\xF3n de materiales</span>
      </div>

      <ng-container *ngIf="esCrear; else materialesBloqueados">
        <app-trabajo-materiales-selector
          [materiales]="materialesDisponibles"
          [seleccionados]="materialesSeleccionados"
          (seleccionadosChange)="actualizarMateriales($event)"
        ></app-trabajo-materiales-selector>
      </ng-container>

      <ng-template #materialesBloqueados>
        <div class="info-box">
          <ion-icon name="information-circle-outline"></ion-icon>
          <p>
            Los materiales asignados no se modifican desde esta edici\xF3n para proteger el control del stock.
          </p>
        </div>
      </ng-template>

    </section>

    <!-- PASO 4 -->
    <section class="form-card" *ngIf="pasoActual === 4">

      <div class="form-section-title">
        <ion-icon name="checkmark-circle-outline"></ion-icon>
        <span>Confirmaci\xF3n del trabajo</span>
      </div>

      <div class="resume-box">

        <div class="resume-row">
          <span>Cliente</span>
          <strong>{{ formulario.value.clienteNombre || 'Sin cliente' }}</strong>
        </div>

        <div class="resume-row">
          <span>Contacto</span>
          <strong>{{ formulario.value.clienteTelefono || 'Sin contacto' }}</strong>
        </div>

        <div class="resume-row">
          <span>Direcci\xF3n</span>
          <strong>{{ formulario.value.direccion || 'Sin direcci\xF3n' }}</strong>
        </div>

        <div
          class="resume-row"
          *ngIf="latitudSeleccionada !== null && longitudSeleccionada !== null"
        >
          <span>Ubicaci\xF3n</span>
          <strong>
            Lat: {{ latitudSeleccionada }} \xB7 Lng: {{ longitudSeleccionada }}
          </strong>
        </div>

        <div class="resume-row">
          <span>Tipo de trabajo</span>
          <strong>{{ formulario.value.tipoTrabajo || 'Sin tipo' }}</strong>
        </div>

        <div class="resume-row">
          <span>Fecha y hora</span>
          <strong>
            {{ formulario.value.fechaProgramada || 'Sin fecha' }}
            \xB7
            {{ formulario.value.horaProgramada || 'Sin hora' }}
          </strong>
        </div>

        <div class="resume-row">
          <span>Empleados</span>
          <strong>{{ resumenEmpleados }}</strong>
        </div>

        <div class="resume-row">
          <span>Materiales</span>
          <strong>{{ esCrear ? resumenMateriales : 'Sin modificaci\xF3n de materiales' }}</strong>
        </div>

        <div class="resume-row total">
          <span>Subtotal</span>
          <strong>S/ {{ formulario.value.subtotal || 0 }}</strong>
        </div>

      </div>

      <div class="warning-box" *ngIf="esCrear">
        <ion-icon name="alert-circle-outline"></ion-icon>
        <p>
          Al confirmar, el sistema descontar\xE1 autom\xE1ticamente el stock de los materiales asignados.
        </p>
      </div>

    </section>

    <div class="modal-actions">

      <button
        type="button"
        class="btn-secondary"
        *ngIf="pasoActual > 1"
        (click)="anterior()"
      >
        <ion-icon name="chevron-back-outline"></ion-icon>
        <span>Anterior</span>
      </button>

      <button
        type="button"
        class="btn-secondary"
        *ngIf="pasoActual === 1"
        (click)="cancelar()"
      >
        Cancelar
      </button>

      <button
        type="button"
        class="btn-primary"
        *ngIf="pasoActual < totalPasos"
        (click)="siguiente()"
      >
        <span>Siguiente</span>
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </button>

      <button
        type="button"
        class="btn-primary"
        *ngIf="pasoActual === totalPasos"
        (click)="guardar()"
      >
        <ion-icon name="save-outline"></ion-icon>
        <span>{{ textoBotonFinal }}</span>
      </button>

    </div>

  </form>

</ion-content>`, styles: ["/* src/app/shared/componentes/trabajo-form-modal/trabajo-form-modal.component.css */\n:host {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: var(--color-background);\n  font-family: var(--font-main);\n}\n.modal-header ion-toolbar {\n  --background:\n    linear-gradient(\n      135deg,\n      var(--color-primary),\n      var(--color-primary-hover));\n  --color: #ffffff;\n  --min-height: 82px;\n  --padding-start: 14px;\n  --padding-end: 12px;\n}\n.modal-title-box {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.modal-avatar {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.16);\n  border: 1px solid rgba(255, 255, 255, 0.22);\n  display: grid;\n  place-items: center;\n  color: #ffffff;\n  flex-shrink: 0;\n}\n.modal-avatar ion-icon {\n  font-size: 22px;\n}\n.modal-title-box h2 {\n  margin: 0;\n  font-size: 17px;\n  font-weight: 800;\n  color: #ffffff;\n}\n.modal-title-box p {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 700;\n  color: #ffd166;\n}\n.btn-close {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.13);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n}\n.btn-close ion-icon {\n  font-size: 22px;\n}\n.modal-content {\n  --background: var(--color-background);\n  flex: 1;\n}\n.form-wrapper {\n  width: 100%;\n  max-width: var(--app-width);\n  margin: 0 auto;\n  padding: 12px 14px 18px;\n}\n.step-card,\n.form-card {\n  background: var(--color-card);\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  padding: 14px;\n  margin-bottom: 12px;\n  box-shadow: var(--shadow-card);\n}\n.step-header {\n  margin-bottom: 12px;\n}\n.step-header h3 {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.step-header p {\n  margin: 4px 0 0;\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.steps-line {\n  display: grid;\n  grid-template-columns: auto 1fr auto 1fr auto 1fr auto;\n  align-items: start;\n  gap: 5px;\n}\n.step-item {\n  border: none;\n  background: transparent;\n  padding: 0;\n  display: grid;\n  justify-items: center;\n  gap: 4px;\n  color: #94a3b8;\n}\n.step-item span {\n  width: 28px;\n  height: 28px;\n  border-radius: 999px;\n  background: #e2e8f0;\n  color: #64748b;\n  display: grid;\n  place-items: center;\n  font-size: 12px;\n  font-weight: 800;\n}\n.step-item small {\n  font-size: 9.2px;\n  font-weight: 700;\n  color: #64748b;\n  white-space: nowrap;\n}\n.step-item.active span,\n.step-item.done span {\n  background: var(--color-primary);\n  color: #ffffff;\n}\n.step-item.active small,\n.step-item.done small {\n  color: var(--color-primary);\n}\n.step-divider {\n  height: 2px;\n  margin-top: 13px;\n  border-radius: 999px;\n  background: #dbe3ef;\n}\n.form-section-title {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  margin-bottom: 12px;\n  color: var(--color-text);\n  font-size: 13px;\n  font-weight: 800;\n}\n.form-section-title ion-icon {\n  font-size: 17px;\n  color: var(--color-primary);\n}\n.field-group {\n  margin-bottom: 12px;\n}\n.field-group:last-child {\n  margin-bottom: 0;\n}\n.field-group label {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 11.5px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.input-card {\n  --background: #ffffff;\n  --border-radius: 10px;\n  --min-height: 43px;\n  --padding-start: 12px;\n  --inner-padding-end: 10px;\n  border: 1px solid var(--color-border);\n  border-radius: 10px;\n}\n.input-card:focus-within {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px rgba(26, 62, 140, 0.12);\n}\n.input-card ion-input,\n.input-card ion-select,\n.input-card ion-textarea {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-text);\n}\n.textarea-card {\n  min-height: 78px;\n}\n.form-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.info-box,\n.warning-box {\n  display: flex;\n  gap: 9px;\n  align-items: flex-start;\n  border-radius: 14px;\n  padding: 12px;\n}\n.info-box {\n  background: var(--color-primary-soft);\n  border: 1px solid #dbe8ff;\n}\n.warning-box {\n  margin-top: 12px;\n  background: var(--color-warning-bg);\n  border: 1px solid #fdecc8;\n}\n.info-box ion-icon,\n.warning-box ion-icon {\n  font-size: 19px;\n  flex-shrink: 0;\n}\n.info-box ion-icon {\n  color: var(--color-primary);\n}\n.warning-box ion-icon {\n  color: var(--color-warning);\n}\n.info-box p,\n.warning-box p {\n  margin: 0;\n  font-size: 11.5px;\n  font-weight: 600;\n  color: var(--color-text);\n  line-height: 1.4;\n}\n.resume-box {\n  display: flex;\n  flex-direction: column;\n  gap: 9px;\n}\n.resume-row {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  padding-bottom: 8px;\n  border-bottom: 1px solid #edf2f7;\n}\n.resume-row:last-child {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n.resume-row span {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.resume-row strong {\n  font-size: 12px;\n  font-weight: 800;\n  color: var(--color-text);\n  text-align: right;\n  line-height: 1.3;\n}\n.resume-row.total strong {\n  color: var(--color-primary);\n  font-size: 14px;\n}\n.modal-actions {\n  position: sticky;\n  bottom: 0;\n  z-index: 5;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(245, 247, 250, 0),\n      var(--color-background) 30%);\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n  padding-top: 10px;\n}\n.btn-secondary,\n.btn-primary {\n  height: 45px;\n  border: none;\n  border-radius: 11px;\n  font-size: 13px;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  font-family: var(--font-main);\n}\n.btn-secondary {\n  background: #ffffff;\n  color: var(--color-text-muted);\n  border: 1px solid var(--color-border);\n}\n.btn-primary {\n  background: var(--color-primary);\n  color: #ffffff;\n  box-shadow: var(--shadow-button);\n}\n.btn-primary ion-icon,\n.btn-secondary ion-icon {\n  font-size: 17px;\n}\n.steps-line {\n  gap: 3px;\n}\n.step-item small {\n  font-size: 8.5px;\n}\n.map-action-row {\n  margin: -2px 0 12px;\n  display: flex;\n  justify-content: flex-end;\n}\n.btn-open-map {\n  min-height: 38px;\n  border: none;\n  border-radius: 12px;\n  padding: 0 12px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 12px;\n  font-weight: 800;\n  font-family: var(--font-main);\n}\n.btn-open-map ion-icon {\n  font-size: 17px;\n}\n.btn-open-map:active {\n  transform: scale(0.97);\n}\n@media (max-width: 360px) {\n  .form-grid,\n  .modal-actions {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=trabajo-form-modal.component.css.map */\n"] }]
  }], null, { modo: [{
    type: Input
  }], trabajo: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TrabajoFormModalComponent, { className: "TrabajoFormModalComponent", filePath: "src/app/shared/componentes/trabajo-form-modal/trabajo-form-modal.component.ts", lineNumber: 48 });
})();

// src/app/shared/componentes/trabajo-acciones-modal/trabajo-acciones-modal.component.ts
var _TrabajoAccionesModalComponent = class _TrabajoAccionesModalComponent {
  constructor() {
    this.modalCtrl = inject(ModalController);
  }
  get puedeCancelar() {
    return this.trabajo?.estado === "pendiente";
  }
  get puedeEliminar() {
    return this.trabajo?.estado === "pendiente" || this.trabajo?.estado === "cancelado";
  }
  cancelar() {
    this.modalCtrl.dismiss(null, "cancel");
  }
  seleccionar(accion) {
    this.modalCtrl.dismiss({ accion }, "confirm");
  }
};
_TrabajoAccionesModalComponent.\u0275fac = function TrabajoAccionesModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TrabajoAccionesModalComponent)();
};
_TrabajoAccionesModalComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TrabajoAccionesModalComponent, selectors: [["app-trabajo-acciones-modal"]], inputs: { trabajo: "trabajo" }, decls: 60, vars: 6, consts: [[1, "acciones-panel"], [1, "modal-bar"], [1, "acciones-header"], [1, "trabajo-avatar"], ["name", "briefcase-outline"], [1, "trabajo-info"], [3, "ngClass"], ["type", "button", 1, "btn-close", 3, "click"], ["name", "close-outline"], [1, "acciones-lista"], ["type", "button", 1, "accion-item", 3, "click"], [1, "accion-icon", "detalle"], ["name", "document-text-outline"], [1, "accion-text"], ["name", "chevron-forward-outline", 1, "arrow"], ["name", "shield-checkmark-outline"], [1, "accion-icon", "editar"], ["name", "create-outline"], ["type", "button", 1, "accion-item", "warning", 3, "click", "disabled"], [1, "accion-icon", "cancelar"], ["name", "ban-outline"], ["type", "button", 1, "accion-item", "danger", 3, "click", "disabled"], [1, "accion-icon", "eliminar"], ["name", "trash-outline"]], template: function TrabajoAccionesModalComponent_Template(rf, ctx) {
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
    \u0275\u0275listener("click", function TrabajoAccionesModalComponent_Template_button_click_12_listener() {
      return ctx.cancelar();
    });
    \u0275\u0275element(13, "ion-icon", 8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "section", 9)(15, "button", 10);
    \u0275\u0275listener("click", function TrabajoAccionesModalComponent_Template_button_click_15_listener() {
      return ctx.seleccionar("detalle");
    });
    \u0275\u0275elementStart(16, "div", 11);
    \u0275\u0275element(17, "ion-icon", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 13)(19, "h3");
    \u0275\u0275text(20, "Ver detalle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p");
    \u0275\u0275text(22, "Consultar datos, empleados y materiales asignados.");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(23, "ion-icon", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 10);
    \u0275\u0275listener("click", function TrabajoAccionesModalComponent_Template_button_click_24_listener() {
      return ctx.seleccionar("codigos");
    });
    \u0275\u0275elementStart(25, "div", 11);
    \u0275\u0275element(26, "ion-icon", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 13)(28, "h3");
    \u0275\u0275text(29, "Ver c\xF3digos de seguridad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p");
    \u0275\u0275text(31, "Gestionar c\xF3digo de cliente y c\xF3digo de devoluci\xF3n.");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(32, "ion-icon", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 10);
    \u0275\u0275listener("click", function TrabajoAccionesModalComponent_Template_button_click_33_listener() {
      return ctx.seleccionar("editar");
    });
    \u0275\u0275elementStart(34, "div", 16);
    \u0275\u0275element(35, "ion-icon", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 13)(37, "h3");
    \u0275\u0275text(38, "Editar trabajo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "p");
    \u0275\u0275text(40, "Actualizar datos generales y empleados asignados.");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(41, "ion-icon", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "button", 18);
    \u0275\u0275listener("click", function TrabajoAccionesModalComponent_Template_button_click_42_listener() {
      return ctx.seleccionar("cancelar");
    });
    \u0275\u0275elementStart(43, "div", 19);
    \u0275\u0275element(44, "ion-icon", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div", 13)(46, "h3");
    \u0275\u0275text(47, "Cancelar trabajo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "p");
    \u0275\u0275text(49, "Disponible solo para trabajos pendientes.");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(50, "ion-icon", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "button", 21);
    \u0275\u0275listener("click", function TrabajoAccionesModalComponent_Template_button_click_51_listener() {
      return ctx.seleccionar("eliminar");
    });
    \u0275\u0275elementStart(52, "div", 22);
    \u0275\u0275element(53, "ion-icon", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 13)(55, "h3");
    \u0275\u0275text(56, "Eliminar registro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "p");
    \u0275\u0275text(58, "Ocultar trabajo del m\xF3dulo administrativo.");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(59, "ion-icon", 14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx.trabajo.clienteNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.trabajo.tipoTrabajo);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx.trabajo.estadoClase);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.trabajo.estadoTexto, " ");
    \u0275\u0275advance(31);
    \u0275\u0275property("disabled", !ctx.puedeCancelar);
    \u0275\u0275advance(9);
    \u0275\u0275property("disabled", !ctx.puedeEliminar);
  }
}, dependencies: [CommonModule, NgClass, IonicModule, IonIcon], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  background: transparent;\n  font-family: var(--font-main);\n}\n.acciones-panel[_ngcontent-%COMP%] {\n  width: 100%;\n  background: var(--color-background);\n  border-top-left-radius: 24px;\n  border-top-right-radius: 24px;\n  padding: 10px 14px 18px;\n}\n.modal-bar[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 5px;\n  border-radius: 999px;\n  background: #cbd5e1;\n  margin: 0 auto 14px;\n}\n.acciones-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-primary),\n      var(--color-primary-hover));\n  border-radius: 18px;\n  padding: 14px;\n  display: grid;\n  grid-template-columns: 48px 1fr 36px;\n  gap: 12px;\n  align-items: center;\n  color: #ffffff;\n  margin-bottom: 14px;\n}\n.trabajo-avatar[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 16px;\n  background: rgba(255, 255, 255, 0.16);\n  display: grid;\n  place-items: center;\n}\n.trabajo-avatar[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: #ffffff;\n}\n.trabajo-info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.trabajo-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 700;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.trabajo-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 6px;\n  font-size: 11px;\n  font-weight: 500;\n  color: #ffd166;\n}\n.trabajo-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-flex;\n  height: 22px;\n  padding: 0 9px;\n  align-items: center;\n  border-radius: 999px;\n  font-size: 10px;\n  font-weight: 700;\n}\n.trabajo-info[_ngcontent-%COMP%]   span.pendiente[_ngcontent-%COMP%] {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.trabajo-info[_ngcontent-%COMP%]   span.proceso[_ngcontent-%COMP%] {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.trabajo-info[_ngcontent-%COMP%]   span.finalizado[_ngcontent-%COMP%] {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.trabajo-info[_ngcontent-%COMP%]   span.cancelado[_ngcontent-%COMP%] {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.btn-close[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.15);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n}\n.btn-close[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.acciones-lista[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.accion-item[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  background: #ffffff;\n  padding: 12px;\n  display: grid;\n  grid-template-columns: 42px 1fr 20px;\n  gap: 10px;\n  align-items: center;\n  text-align: left;\n  box-shadow: var(--shadow-card);\n}\n.accion-item[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n}\n.accion-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  display: grid;\n  place-items: center;\n}\n.accion-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 21px;\n}\n.accion-icon.detalle[_ngcontent-%COMP%] {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.accion-icon.editar[_ngcontent-%COMP%] {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.accion-icon.cancelar[_ngcontent-%COMP%] {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.accion-icon.eliminar[_ngcontent-%COMP%] {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.accion-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.accion-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  line-height: 1.25;\n}\n.arrow[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-size: 17px;\n}\n.accion-item[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: scale(0.985);\n}\n/*# sourceMappingURL=trabajo-acciones-modal.component.css.map */"] });
var TrabajoAccionesModalComponent = _TrabajoAccionesModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrabajoAccionesModalComponent, [{
    type: Component,
    args: [{ selector: "app-trabajo-acciones-modal", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: `<!-- src/app/shared/componentes/trabajo-acciones-modal/trabajo-acciones-modal.component.html -->

<div class="acciones-panel">

  <div class="modal-bar"></div>

  <header class="acciones-header">

    <div class="trabajo-avatar">
      <ion-icon name="briefcase-outline"></ion-icon>
    </div>

    <div class="trabajo-info">
      <h2>{{ trabajo.clienteNombre }}</h2>
      <p>{{ trabajo.tipoTrabajo }}</p>

      <span [ngClass]="trabajo.estadoClase">
        {{ trabajo.estadoTexto }}
      </span>
    </div>

    <button type="button" class="btn-close" (click)="cancelar()">
      <ion-icon name="close-outline"></ion-icon>
    </button>

  </header>

  <section class="acciones-lista">

    <button type="button" class="accion-item" (click)="seleccionar('detalle')">
      <div class="accion-icon detalle">
        <ion-icon name="document-text-outline"></ion-icon>
      </div>

      <div class="accion-text">
        <h3>Ver detalle</h3>
        <p>Consultar datos, empleados y materiales asignados.</p>
      </div>

      <ion-icon name="chevron-forward-outline" class="arrow"></ion-icon>
    </button>

    <button type="button" class="accion-item" (click)="seleccionar('codigos')">
      <div class="accion-icon detalle">
        <ion-icon name="shield-checkmark-outline"></ion-icon>
      </div>

      <div class="accion-text">
        <h3>Ver c\xF3digos de seguridad</h3>
        <p>Gestionar c\xF3digo de cliente y c\xF3digo de devoluci\xF3n.</p>
      </div>

      <ion-icon name="chevron-forward-outline" class="arrow"></ion-icon>
    </button>

    <button type="button" class="accion-item" (click)="seleccionar('editar')">
      <div class="accion-icon editar">
        <ion-icon name="create-outline"></ion-icon>
      </div>

      <div class="accion-text">
        <h3>Editar trabajo</h3>
        <p>Actualizar datos generales y empleados asignados.</p>
      </div>

      <ion-icon name="chevron-forward-outline" class="arrow"></ion-icon>
    </button>

    <button
      type="button"
      class="accion-item warning"
      [disabled]="!puedeCancelar"
      (click)="seleccionar('cancelar')"
    >
      <div class="accion-icon cancelar">
        <ion-icon name="ban-outline"></ion-icon>
      </div>

      <div class="accion-text">
        <h3>Cancelar trabajo</h3>
        <p>Disponible solo para trabajos pendientes.</p>
      </div>

      <ion-icon name="chevron-forward-outline" class="arrow"></ion-icon>
    </button>

    <button
      type="button"
      class="accion-item danger"
      [disabled]="!puedeEliminar"
      (click)="seleccionar('eliminar')"
    >
      <div class="accion-icon eliminar">
        <ion-icon name="trash-outline"></ion-icon>
      </div>

      <div class="accion-text">
        <h3>Eliminar registro</h3>
        <p>Ocultar trabajo del m\xF3dulo administrativo.</p>
      </div>

      <ion-icon name="chevron-forward-outline" class="arrow"></ion-icon>
    </button>

  </section>

</div>`, styles: ["/* src/app/shared/componentes/trabajo-acciones-modal/trabajo-acciones-modal.component.css */\n:host {\n  display: block;\n  background: transparent;\n  font-family: var(--font-main);\n}\n.acciones-panel {\n  width: 100%;\n  background: var(--color-background);\n  border-top-left-radius: 24px;\n  border-top-right-radius: 24px;\n  padding: 10px 14px 18px;\n}\n.modal-bar {\n  width: 44px;\n  height: 5px;\n  border-radius: 999px;\n  background: #cbd5e1;\n  margin: 0 auto 14px;\n}\n.acciones-header {\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-primary),\n      var(--color-primary-hover));\n  border-radius: 18px;\n  padding: 14px;\n  display: grid;\n  grid-template-columns: 48px 1fr 36px;\n  gap: 12px;\n  align-items: center;\n  color: #ffffff;\n  margin-bottom: 14px;\n}\n.trabajo-avatar {\n  width: 48px;\n  height: 48px;\n  border-radius: 16px;\n  background: rgba(255, 255, 255, 0.16);\n  display: grid;\n  place-items: center;\n}\n.trabajo-avatar ion-icon {\n  font-size: 24px;\n  color: #ffffff;\n}\n.trabajo-info {\n  min-width: 0;\n}\n.trabajo-info h2 {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 700;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.trabajo-info p {\n  margin: 3px 0 6px;\n  font-size: 11px;\n  font-weight: 500;\n  color: #ffd166;\n}\n.trabajo-info span {\n  display: inline-flex;\n  height: 22px;\n  padding: 0 9px;\n  align-items: center;\n  border-radius: 999px;\n  font-size: 10px;\n  font-weight: 700;\n}\n.trabajo-info span.pendiente {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.trabajo-info span.proceso {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.trabajo-info span.finalizado {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.trabajo-info span.cancelado {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.btn-close {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.15);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n}\n.btn-close ion-icon {\n  font-size: 22px;\n}\n.acciones-lista {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.accion-item {\n  width: 100%;\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  background: #ffffff;\n  padding: 12px;\n  display: grid;\n  grid-template-columns: 42px 1fr 20px;\n  gap: 10px;\n  align-items: center;\n  text-align: left;\n  box-shadow: var(--shadow-card);\n}\n.accion-item:disabled {\n  opacity: 0.45;\n}\n.accion-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  display: grid;\n  place-items: center;\n}\n.accion-icon ion-icon {\n  font-size: 21px;\n}\n.accion-icon.detalle {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.accion-icon.editar {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.accion-icon.cancelar {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.accion-icon.eliminar {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.accion-text h3 {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.accion-text p {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  line-height: 1.25;\n}\n.arrow {\n  color: #94a3b8;\n  font-size: 17px;\n}\n.accion-item:active:not(:disabled) {\n  transform: scale(0.985);\n}\n/*# sourceMappingURL=trabajo-acciones-modal.component.css.map */\n"] }]
  }], null, { trabajo: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TrabajoAccionesModalComponent, { className: "TrabajoAccionesModalComponent", filePath: "src/app/shared/componentes/trabajo-acciones-modal/trabajo-acciones-modal.component.ts", lineNumber: 25 });
})();

// src/app/paginas/trabajos/asignacion-trabajos/asignacion-trabajos.page.ts
function AsignacionTrabajosPage_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "app-admin-header", 4);
    \u0275\u0275listener("menuClick", function AsignacionTrabajosPage_ng_container_1_Template_app_admin_header_menuClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirMenu());
    })("notificacionesClick", function AsignacionTrabajosPage_ng_container_1_Template_app_admin_header_notificacionesClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirNotificaciones());
    })("perfilClick", function AsignacionTrabajosPage_ng_container_1_Template_app_admin_header_perfilClick_1_listener() {
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
function AsignacionTrabajosPage_ng_container_3_div_18_app_trabajo_card_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-trabajo-card", 20);
    \u0275\u0275listener("acciones", function AsignacionTrabajosPage_ng_container_3_div_18_app_trabajo_card_1_Template_app_trabajo_card_acciones_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.abrirAcciones($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trabajo_r6 = ctx.$implicit;
    \u0275\u0275property("trabajo", trabajo_r6);
  }
}
function AsignacionTrabajosPage_ng_container_3_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275template(1, AsignacionTrabajosPage_ng_container_3_div_18_app_trabajo_card_1_Template, 1, 1, "app-trabajo-card", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r7 = \u0275\u0275nextContext().ngIf;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", vm_r7.trabajosPagina)("ngForTrackBy", ctx_r1.trackByTrabajo);
  }
}
function AsignacionTrabajosPage_ng_container_3_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-admin-empty-state", 21);
    \u0275\u0275listener("botonClick", function AsignacionTrabajosPage_ng_container_3_ng_template_19_Template_app_admin_empty_state_botonClick_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.nuevoTrabajo());
    });
    \u0275\u0275elementEnd();
  }
}
function AsignacionTrabajosPage_ng_container_3_app_admin_pagination_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-admin-pagination", 22);
    \u0275\u0275listener("anterior", function AsignacionTrabajosPage_ng_container_3_app_admin_pagination_21_Template_app_admin_pagination_anterior_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.paginaAnterior());
    })("siguiente", function AsignacionTrabajosPage_ng_container_3_app_admin_pagination_21_Template_app_admin_pagination_siguiente_0_listener() {
      \u0275\u0275restoreView(_r9);
      const vm_r7 = \u0275\u0275nextContext().ngIf;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.paginaSiguiente(vm_r7.totalPaginas));
    })("irPagina", function AsignacionTrabajosPage_ng_container_3_app_admin_pagination_21_Template_app_admin_pagination_irPagina_0_listener($event) {
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
function AsignacionTrabajosPage_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 5)(2, "app-admin-module-hero", 6);
    \u0275\u0275listener("botonClick", function AsignacionTrabajosPage_ng_container_3_Template_app_admin_module_hero_botonClick_2_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nuevoTrabajo());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "section", 7);
    \u0275\u0275element(4, "app-admin-summary-card", 8)(5, "app-admin-summary-card", 9)(6, "app-admin-summary-card", 10)(7, "app-admin-summary-card", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "app-admin-search-filter", 12);
    \u0275\u0275listener("buscar", function AsignacionTrabajosPage_ng_container_3_Template_app_admin_search_filter_buscar_8_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.buscarTrabajo($event));
    })("filtrar", function AsignacionTrabajosPage_ng_container_3_Template_app_admin_search_filter_filtrar_8_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirFiltro());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "section", 13)(10, "div")(11, "h3");
    \u0275\u0275text(12, "Lista de trabajos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "span", 14);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "section", 15);
    \u0275\u0275template(18, AsignacionTrabajosPage_ng_container_3_div_18_Template, 2, 2, "div", 16)(19, AsignacionTrabajosPage_ng_container_3_ng_template_19_Template, 1, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, AsignacionTrabajosPage_ng_container_3_app_admin_pagination_21_Template, 1, 3, "app-admin-pagination", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const vm_r7 = ctx.ngIf;
    const sinResultados_r10 = \u0275\u0275reference(20);
    \u0275\u0275advance(4);
    \u0275\u0275property("valor", vm_r7.totalTrabajos);
    \u0275\u0275advance();
    \u0275\u0275property("valor", vm_r7.totalPendientes);
    \u0275\u0275advance();
    \u0275\u0275property("valor", vm_r7.totalEnProceso);
    \u0275\u0275advance();
    \u0275\u0275property("valor", vm_r7.totalFinalizados);
    \u0275\u0275advance();
    \u0275\u0275property("filtroActual", vm_r7.filtro);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", vm_r7.trabajosFiltrados.length, " registro(s) encontrado(s)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" P\xE1g. ", vm_r7.paginaActual, " / ", vm_r7.totalPaginas, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", vm_r7.trabajosPagina.length > 0)("ngIfElse", sinResultados_r10);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", vm_r7.totalPaginas > 1);
  }
}
var _AsignacionTrabajosPage = class _AsignacionTrabajosPage {
  constructor() {
    this.trabajoService = inject(TrabajoService);
    this.dashboardAdminService = inject(DashboardAdminService);
    this.modalCtrl = inject(ModalController);
    this.toastCtrl = inject(ToastController);
    this.alertCtrl = inject(AlertController);
    this.navCtrl = inject(NavController);
    this.cdr = inject(ChangeDetectorRef);
    this.vm$ = this.trabajoService.vm$;
    this.adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
  }
  ionViewWillEnter() {
    return __async(this, null, function* () {
      yield this.trabajoService.cargarTrabajos();
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 100);
    });
  }
  ionViewDidEnter() {
    return __async(this, null, function* () {
      yield this.trabajoService.cargarTrabajos();
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 150);
    });
  }
  trackByTrabajo(index, trabajo) {
    return trabajo.uid || trabajo.id || String(index);
  }
  buscarTrabajo(valor) {
    const termino = typeof valor === "string" ? valor : valor?.detail?.value ?? "";
    this.trabajoService.cambiarBusqueda(termino);
  }
  abrirFiltro() {
    return __async(this, null, function* () {
      const filtroActual = this.trabajoService.obtenerFiltroActual();
      const alert = yield this.alertCtrl.create({
        header: "Filtrar trabajos",
        inputs: [
          {
            type: "radio",
            label: "Todos",
            value: "todos",
            checked: filtroActual === "todos"
          },
          {
            type: "radio",
            label: "Pendientes",
            value: "pendientes",
            checked: filtroActual === "pendientes"
          },
          {
            type: "radio",
            label: "En proceso",
            value: "enProceso",
            checked: filtroActual === "enProceso"
          },
          {
            type: "radio",
            label: "Finalizados",
            value: "finalizados",
            checked: filtroActual === "finalizados"
          },
          {
            type: "radio",
            label: "Cancelados",
            value: "cancelados",
            checked: filtroActual === "cancelados"
          }
        ],
        buttons: [
          {
            text: "Cancelar",
            role: "cancel"
          },
          {
            text: "Aplicar",
            handler: (filtro) => {
              this.trabajoService.cambiarFiltro(filtro);
            }
          }
        ]
      });
      yield alert.present();
    });
  }
  nuevoTrabajo() {
    return __async(this, null, function* () {
      try {
        console.log("[Trabajos] Clic en Nuevo / Registrar trabajo");
        const modal = yield this.modalCtrl.create({
          component: TrabajoFormModalComponent,
          cssClass: "trabajo-modal",
          backdropDismiss: false,
          componentProps: {
            modo: "crear"
          }
        });
        console.log("[Trabajos] Modal creado correctamente");
        yield modal.present();
        console.log("[Trabajos] Modal presentado");
        const { data, role } = yield modal.onWillDismiss();
        console.log("[Trabajos] Modal cerrado:", { role, data });
        if (role === "confirm" && data) {
          yield this.guardarNuevoTrabajo(data);
        }
      } catch (error) {
        console.error("[Trabajos] Error real al abrir formulario:", error);
        this.mostrarToast("No se pudo abrir el formulario de trabajo.", "danger");
      }
    });
  }
  guardarNuevoTrabajo(data) {
    return __async(this, null, function* () {
      const payload = {
        clienteNombre: String(data.clienteNombre || "").trim(),
        clienteTelefono: String(data.clienteTelefono || "").trim(),
        direccion: String(data.direccion || "").trim(),
        referencia: String(data.referencia || "").trim(),
        latitud: data.latitud ?? null,
        longitud: data.longitud ?? null,
        direccionMapa: String(data.direccionMapa || "").trim(),
        ubicacionTextoOriginal: String(data.ubicacionTextoOriginal || "").trim(),
        tipoTrabajo: String(data.tipoTrabajo || "").trim(),
        descripcion: String(data.descripcion || "").trim(),
        fechaProgramada: String(data.fechaProgramada || "").trim(),
        horaProgramada: String(data.horaProgramada || "").trim(),
        subtotal: Number(data.subtotal || 0),
        empleadosAsignados: data.empleadosAsignados || [],
        materialesAsignados: data.materialesAsignados || []
      };
      if (!this.validarTrabajo(payload, true)) {
        return;
      }
      try {
        yield this.trabajoService.crearTrabajo(payload);
        yield this.trabajoService.cargarTrabajos();
        this.mostrarToast("Trabajo asignado correctamente", "success");
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 100);
      } catch (error) {
        console.error(error);
        this.mostrarToast(this.obtenerMensajeError(error), "danger");
      }
    });
  }
  abrirAcciones(trabajo) {
    return __async(this, null, function* () {
      const modal = yield this.modalCtrl.create({
        component: TrabajoAccionesModalComponent,
        cssClass: "trabajo-actions-modal",
        backdropDismiss: true,
        componentProps: {
          trabajo
        }
      });
      yield modal.present();
      const { data, role } = yield modal.onWillDismiss();
      if (role !== "confirm" || !data?.accion) {
        return;
      }
      if (data.accion === "detalle") {
        yield this.verDetalleTrabajo(trabajo);
        return;
      }
      if (data.accion === "editar") {
        yield this.editarTrabajo(trabajo);
        return;
      }
      if (data.accion === "cancelar") {
        yield this.confirmarCancelarTrabajo(trabajo);
        return;
      }
      if (data.accion === "eliminar") {
        yield this.confirmarEliminarTrabajo(trabajo);
      }
    });
  }
  verDetalleTrabajo(trabajo) {
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
    });
  }
  editarTrabajo(trabajo) {
    return __async(this, null, function* () {
      const modal = yield this.modalCtrl.create({
        component: TrabajoFormModalComponent,
        cssClass: "trabajo-modal",
        backdropDismiss: false,
        componentProps: {
          modo: "editar",
          trabajo
        }
      });
      yield modal.present();
      const { data, role } = yield modal.onWillDismiss();
      if (role === "confirm" && data) {
        yield this.guardarEdicionTrabajo(trabajo, data);
      }
    });
  }
  guardarEdicionTrabajo(trabajo, data) {
    return __async(this, null, function* () {
      if (!trabajo.uid) {
        this.mostrarToast("El trabajo no tiene UID v\xE1lido", "danger");
        return;
      }
      const payload = {
        uid: trabajo.uid,
        clienteNombre: String(data.clienteNombre || "").trim(),
        clienteTelefono: String(data.clienteTelefono || "").trim(),
        direccion: String(data.direccion || "").trim(),
        referencia: String(data.referencia || "").trim(),
        latitud: data.latitud ?? null,
        longitud: data.longitud ?? null,
        direccionMapa: String(data.direccionMapa || "").trim(),
        ubicacionTextoOriginal: String(data.ubicacionTextoOriginal || "").trim(),
        tipoTrabajo: String(data.tipoTrabajo || "").trim(),
        descripcion: String(data.descripcion || "").trim(),
        fechaProgramada: String(data.fechaProgramada || "").trim(),
        horaProgramada: String(data.horaProgramada || "").trim(),
        subtotal: Number(data.subtotal || 0),
        empleadosAsignados: data.empleadosAsignados || []
      };
      if (!this.validarTrabajo(payload, false)) {
        return;
      }
      try {
        yield this.trabajoService.editarTrabajo(payload);
        yield this.trabajoService.cargarTrabajos();
        this.mostrarToast("Trabajo actualizado correctamente", "success");
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 100);
      } catch (error) {
        console.error(error);
        this.mostrarToast(this.obtenerMensajeError(error), "danger");
      }
    });
  }
  validarTrabajo(data, esCrear) {
    if (!data.clienteNombre) {
      this.mostrarToast("Ingrese el nombre del cliente", "danger");
      return false;
    }
    if (!data.clienteTelefono) {
      this.mostrarToast("Ingrese el celular del cliente", "danger");
      return false;
    }
    if (!data.direccion) {
      this.mostrarToast("Ingrese la direcci\xF3n del trabajo", "danger");
      return false;
    }
    if (!data.tipoTrabajo) {
      this.mostrarToast("Seleccione el tipo de trabajo", "danger");
      return false;
    }
    if (!data.fechaProgramada) {
      this.mostrarToast("Seleccione la fecha programada", "danger");
      return false;
    }
    if (!data.horaProgramada) {
      this.mostrarToast("Seleccione la hora programada", "danger");
      return false;
    }
    if (Number(data.subtotal) < 0) {
      this.mostrarToast("El subtotal no puede ser negativo", "danger");
      return false;
    }
    if (!data.empleadosAsignados || data.empleadosAsignados.length === 0) {
      this.mostrarToast("Seleccione al menos un empleado", "danger");
      return false;
    }
    if (esCrear && (!data.materialesAsignados || data.materialesAsignados.length === 0)) {
      this.mostrarToast("Seleccione al menos un material", "danger");
      return false;
    }
    return true;
  }
  confirmarCancelarTrabajo(trabajo) {
    return __async(this, null, function* () {
      const confirmado = yield this.abrirConfirmacion({
        tipo: "warning",
        icono: "ban-outline",
        titulo: "Cancelar trabajo",
        mensaje: `\xBFDeseas cancelar el trabajo de ${trabajo.clienteNombre || "este cliente"}?`,
        detalle: "Solo se permite cancelar trabajos pendientes. Los materiales asignados retornar\xE1n al stock.",
        textoCancelar: "Volver",
        textoConfirmar: "Cancelar trabajo"
      });
      if (!confirmado) {
        return;
      }
      yield this.cancelarTrabajo(trabajo);
    });
  }
  cancelarTrabajo(trabajo) {
    return __async(this, null, function* () {
      if (!trabajo.uid) {
        this.mostrarToast("El trabajo no tiene UID v\xE1lido", "danger");
        return;
      }
      try {
        yield this.trabajoService.cancelarTrabajo(trabajo.uid);
        yield this.trabajoService.cargarTrabajos();
        this.mostrarToast("Trabajo cancelado correctamente", "success");
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 100);
      } catch (error) {
        console.error(error);
        this.mostrarToast(this.obtenerMensajeError(error), "danger");
      }
    });
  }
  confirmarEliminarTrabajo(trabajo) {
    return __async(this, null, function* () {
      const confirmado = yield this.abrirConfirmacion({
        tipo: "danger",
        icono: "trash-outline",
        titulo: "Eliminar trabajo",
        mensaje: `\xBFDeseas eliminar el registro del trabajo de ${trabajo.clienteNombre || "este cliente"}?`,
        detalle: "Esta acci\xF3n ocultar\xE1 el registro del m\xF3dulo administrativo.",
        textoCancelar: "Cancelar",
        textoConfirmar: "Eliminar"
      });
      if (!confirmado) {
        return;
      }
      yield this.eliminarTrabajo(trabajo);
    });
  }
  eliminarTrabajo(trabajo) {
    return __async(this, null, function* () {
      if (!trabajo.uid) {
        this.mostrarToast("El trabajo no tiene UID v\xE1lido", "danger");
        return;
      }
      try {
        yield this.trabajoService.eliminarTrabajo(trabajo.uid);
        yield this.trabajoService.cargarTrabajos();
        this.mostrarToast("Trabajo eliminado correctamente", "success");
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 100);
      } catch (error) {
        console.error(error);
        this.mostrarToast(this.obtenerMensajeError(error), "danger");
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
  paginaAnterior() {
    this.trabajoService.paginaAnterior();
  }
  paginaSiguiente(totalPaginas) {
    this.trabajoService.paginaSiguiente(totalPaginas);
  }
  irPagina(pagina) {
    this.trabajoService.irPagina(pagina);
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
  abrirMenu() {
    this.navCtrl.navigateRoot("/dashboard-admin");
  }
  irInicio() {
    this.navCtrl.navigateRoot("/dashboard-admin");
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
  obtenerMensajeError(error) {
    const code = error?.code || error?.message || "";
    if (code.includes("cliente-vacio")) {
      return "Ingrese el nombre del cliente";
    }
    if (code.includes("empleados-vacios")) {
      return "Seleccione al menos un empleado";
    }
    if (code.includes("materiales-vacios")) {
      return "Seleccione al menos un material";
    }
    if (code.includes("material-no-existe")) {
      return "Uno de los materiales seleccionados ya no existe";
    }
    if (code.includes("cantidad-material-invalida")) {
      return "La cantidad de material no es v\xE1lida";
    }
    if (code.includes("stock-insuficiente")) {
      const partes = code.split(":");
      return partes[1] ? `Stock insuficiente para ${partes[1]}` : "Stock insuficiente para uno de los materiales";
    }
    if (code.includes("trabajo-no-cancelable")) {
      return "Solo se puede cancelar un trabajo pendiente";
    }
    if (code.includes("trabajo-no-eliminable")) {
      return "Solo se puede eliminar un trabajo pendiente o cancelado";
    }
    if (code.includes("permission-denied")) {
      return "No tiene permisos para realizar esta acci\xF3n";
    }
    return "No se pudo completar la operaci\xF3n";
  }
  mostrarToast(message, color = "primary") {
    return __async(this, null, function* () {
      const toast = yield this.toastCtrl.create({
        message,
        duration: 2500,
        position: "top",
        color
      });
      yield toast.present();
    });
  }
};
_AsignacionTrabajosPage.\u0275fac = function AsignacionTrabajosPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AsignacionTrabajosPage)();
};
_AsignacionTrabajosPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AsignacionTrabajosPage, selectors: [["app-asignacion-trabajos"]], decls: 6, vars: 7, consts: [["sinResultados", ""], [1, "trabajos-root", 3, "fullscreen"], [4, "ngIf"], ["activo", "trabajos"], [3, "menuClick", "notificacionesClick", "perfilClick", "nombre", "rol", "fotoUrl", "notificaciones"], [1, "trabajos-container"], ["titulo", "Asignaci\xF3n de trabajos", "descripcion", "Programa trabajos, asigna empleados y descuenta materiales.", "icono", "briefcase-outline", "botonTexto", "Nuevo", "botonIcono", "add-outline", 3, "botonClick"], [1, "summary-grid"], ["titulo", "Total", "icono", "briefcase-outline", "tipo", "total", 3, "valor"], ["titulo", "Pendientes", "icono", "time-outline", "tipo", "warning", 3, "valor"], ["titulo", "En proceso", "icono", "refresh-outline", "tipo", "primary", 3, "valor"], ["titulo", "Finalizados", "icono", "checkmark-circle-outline", "tipo", "success", 3, "valor"], ["placeholder", "Buscar cliente, direcci\xF3n, empleado...", 3, "buscar", "filtrar", "filtroActual"], [1, "list-title-row"], [1, "page-indicator"], [1, "list-section"], ["class", "trabajos-list", 4, "ngIf", "ngIfElse"], [3, "paginaActual", "totalPaginas", "paginas", "anterior", "siguiente", "irPagina", 4, "ngIf"], [1, "trabajos-list"], [3, "trabajo", "acciones", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "acciones", "trabajo"], ["icono", "briefcase-outline", "titulo", "No hay trabajos para mostrar", "descripcion", "No se encontraron trabajos con el criterio actual.", "botonTexto", "Registrar trabajo", "botonIcono", "add-outline", 3, "botonClick"], [3, "anterior", "siguiente", "irPagina", "paginaActual", "totalPaginas", "paginas"]], template: function AsignacionTrabajosPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 1);
    \u0275\u0275template(1, AsignacionTrabajosPage_ng_container_1_Template, 2, 4, "ng-container", 2);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275template(3, AsignacionTrabajosPage_ng_container_3_Template, 22, 11, "ng-container", 2);
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
  AdminHeaderComponent,
  AdminBottomNavComponent,
  AdminModuleHeroComponent,
  AdminSummaryCardComponent,
  AdminSearchFilterComponent,
  AdminEmptyStateComponent,
  AdminPaginationComponent,
  TrabajoCardComponent,
  AsyncPipe
], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\nion-content.trabajos-root[_ngcontent-%COMP%] {\n  --background: var(--color-page-outside);\n}\n.trabajos-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: var(--app-width);\n  min-height: calc(100vh - 76px);\n  margin: 0 auto;\n  padding: 14px 14px 94px;\n  background: var(--color-background);\n}\n.summary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.list-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin: 4px 0 10px;\n}\n.list-title-row[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.list-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.page-indicator[_ngcontent-%COMP%] {\n  height: 26px;\n  padding: 0 9px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 10px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.list-section[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  padding: 0;\n  min-height: 330px;\n}\n.trabajos-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n@media (max-width: 390px) {\n  .summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 340px) {\n  .summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=asignacion-trabajos.page.css.map */"] });
var AsignacionTrabajosPage = _AsignacionTrabajosPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AsignacionTrabajosPage, [{
    type: Component,
    args: [{ selector: "app-asignacion-trabajos", standalone: true, imports: [
      CommonModule,
      IonicModule,
      AdminHeaderComponent,
      AdminBottomNavComponent,
      AdminModuleHeroComponent,
      AdminSummaryCardComponent,
      AdminSearchFilterComponent,
      AdminEmptyStateComponent,
      AdminPaginationComponent,
      TrabajoCardComponent
    ], template: `<!-- src/app/paginas/trabajos/asignacion-trabajos/asignacion-trabajos.page.html -->
<ion-content [fullscreen]="true" class="trabajos-root">

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

    <div class="trabajos-container">

      <app-admin-module-hero
        titulo="Asignaci\xF3n de trabajos"
        descripcion="Programa trabajos, asigna empleados y descuenta materiales."
        icono="briefcase-outline"
        botonTexto="Nuevo"
        botonIcono="add-outline"
        (botonClick)="nuevoTrabajo()"
      ></app-admin-module-hero>

      <section class="summary-grid">

        <app-admin-summary-card
          titulo="Total"
          [valor]="vm.totalTrabajos"
          icono="briefcase-outline"
          tipo="total"
        ></app-admin-summary-card>

        <app-admin-summary-card
          titulo="Pendientes"
          [valor]="vm.totalPendientes"
          icono="time-outline"
          tipo="warning"
        ></app-admin-summary-card>

        <app-admin-summary-card
          titulo="En proceso"
          [valor]="vm.totalEnProceso"
          icono="refresh-outline"
          tipo="primary"
        ></app-admin-summary-card>

        <app-admin-summary-card
          titulo="Finalizados"
          [valor]="vm.totalFinalizados"
          icono="checkmark-circle-outline"
          tipo="success"
        ></app-admin-summary-card>

      </section>

      <app-admin-search-filter
        placeholder="Buscar cliente, direcci\xF3n, empleado..."
        [filtroActual]="vm.filtro"
        (buscar)="buscarTrabajo($event)"
        (filtrar)="abrirFiltro()"
      ></app-admin-search-filter>

      <section class="list-title-row">
        <div>
          <h3>Lista de trabajos</h3>
          <p>{{ vm.trabajosFiltrados.length }} registro(s) encontrado(s)</p>
        </div>

        <span class="page-indicator">
          P\xE1g. {{ vm.paginaActual }} / {{ vm.totalPaginas }}
        </span>
      </section>

      <section class="list-section">

        <div
          class="trabajos-list"
          *ngIf="vm.trabajosPagina.length > 0; else sinResultados"
        >

          <app-trabajo-card
            *ngFor="let trabajo of vm.trabajosPagina; trackBy: trackByTrabajo"
            [trabajo]="trabajo"
            (acciones)="abrirAcciones($event)"
          ></app-trabajo-card>

        </div>

        <ng-template #sinResultados>
          <app-admin-empty-state
            icono="briefcase-outline"
            titulo="No hay trabajos para mostrar"
            descripcion="No se encontraron trabajos con el criterio actual."
            botonTexto="Registrar trabajo"
            botonIcono="add-outline"
            (botonClick)="nuevoTrabajo()"
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

  <app-admin-bottom-nav activo="trabajos"></app-admin-bottom-nav>

</ion-content>`, styles: ["/* src/app/paginas/trabajos/asignacion-trabajos/asignacion-trabajos.page.css */\n:host {\n  display: block;\n}\nion-content.trabajos-root {\n  --background: var(--color-page-outside);\n}\n.trabajos-container {\n  width: 100%;\n  max-width: var(--app-width);\n  min-height: calc(100vh - 76px);\n  margin: 0 auto;\n  padding: 14px 14px 94px;\n  background: var(--color-background);\n}\n.summary-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.list-title-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin: 4px 0 10px;\n}\n.list-title-row h3 {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.list-title-row p {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.page-indicator {\n  height: 26px;\n  padding: 0 9px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 10px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.list-section {\n  background: transparent;\n  border: none;\n  padding: 0;\n  min-height: 330px;\n}\n.trabajos-list {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n@media (max-width: 390px) {\n  .summary-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 340px) {\n  .summary-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=asignacion-trabajos.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AsignacionTrabajosPage, { className: "AsignacionTrabajosPage", filePath: "src/app/paginas/trabajos/asignacion-trabajos/asignacion-trabajos.page.ts", lineNumber: 52 });
})();
export {
  AsignacionTrabajosPage
};
//# sourceMappingURL=asignacion-trabajos.page-QJKX5FSD.js.map
