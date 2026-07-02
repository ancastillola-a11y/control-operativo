import {
  IonIcon,
  IonicModule
} from "./chunk-NAACVANG.js";
import {
  CommonModule,
  Component,
  Input,
  NgClass,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-D2BFCRPD.js";

// src/app/shared/componentes/admin-summary-card/admin-summary-card.component.ts
var _AdminSummaryCardComponent = class _AdminSummaryCardComponent {
  constructor() {
    this.titulo = "";
    this.valor = 0;
    this.icono = "analytics-outline";
    this.tipo = "primary";
  }
};
_AdminSummaryCardComponent.\u0275fac = function AdminSummaryCardComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AdminSummaryCardComponent)();
};
_AdminSummaryCardComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminSummaryCardComponent, selectors: [["app-admin-summary-card"]], inputs: { titulo: "titulo", valor: "valor", icono: "icono", tipo: "tipo" }, decls: 8, vars: 4, consts: [[1, "summary-card", 3, "ngClass"], [1, "summary-icon"], [3, "name"], [1, "summary-info"]], template: function AdminSummaryCardComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 0)(1, "div", 1);
    \u0275\u0275element(2, "ion-icon", 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 3)(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275property("ngClass", ctx.tipo);
    \u0275\u0275advance(2);
    \u0275\u0275property("name", ctx.icono);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.valor);
  }
}, dependencies: [CommonModule, NgClass, IonicModule, IonIcon], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n.summary-card[_ngcontent-%COMP%] {\n  background: var(--color-card);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  padding: 10px 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  min-height: 86px;\n  box-shadow: var(--shadow-card);\n}\n.summary-icon[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: var(--radius-md);\n  display: grid;\n  place-items: center;\n}\n.summary-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.summary-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 2px;\n  font-size: 10px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.summary-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 19px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.summary-card.total[_ngcontent-%COMP%]   .summary-icon[_ngcontent-%COMP%], \n.summary-card.primary[_ngcontent-%COMP%]   .summary-icon[_ngcontent-%COMP%] {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.summary-card.success[_ngcontent-%COMP%]   .summary-icon[_ngcontent-%COMP%] {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.summary-card.danger[_ngcontent-%COMP%]   .summary-icon[_ngcontent-%COMP%] {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.summary-card.warning[_ngcontent-%COMP%]   .summary-icon[_ngcontent-%COMP%] {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n/*# sourceMappingURL=admin-summary-card.component.css.map */"] });
var AdminSummaryCardComponent = _AdminSummaryCardComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminSummaryCardComponent, [{
    type: Component,
    args: [{ selector: "app-admin-summary-card", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: '<!-- src/app/shared/componentes/admin-summary-card/admin-summary-card.component.html -->\n\n<article class="summary-card" [ngClass]="tipo">\n\n  <div class="summary-icon">\n    <ion-icon [name]="icono"></ion-icon>\n  </div>\n\n  <div class="summary-info">\n    <span>{{ titulo }}</span>\n    <strong>{{ valor }}</strong>\n  </div>\n\n</article>', styles: ["/* src/app/shared/componentes/admin-summary-card/admin-summary-card.component.css */\n:host {\n  display: block;\n  min-width: 0;\n}\n.summary-card {\n  background: var(--color-card);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  padding: 10px 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  min-height: 86px;\n  box-shadow: var(--shadow-card);\n}\n.summary-icon {\n  width: 30px;\n  height: 30px;\n  border-radius: var(--radius-md);\n  display: grid;\n  place-items: center;\n}\n.summary-icon ion-icon {\n  font-size: 18px;\n}\n.summary-info span {\n  display: block;\n  margin-bottom: 2px;\n  font-size: 10px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.summary-info strong {\n  display: block;\n  font-size: 19px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.summary-card.total .summary-icon,\n.summary-card.primary .summary-icon {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.summary-card.success .summary-icon {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.summary-card.danger .summary-icon {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.summary-card.warning .summary-icon {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n/*# sourceMappingURL=admin-summary-card.component.css.map */\n"] }]
  }], null, { titulo: [{
    type: Input
  }], valor: [{
    type: Input
  }], icono: [{
    type: Input
  }], tipo: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminSummaryCardComponent, { className: "AdminSummaryCardComponent", filePath: "src/app/shared/componentes/admin-summary-card/admin-summary-card.component.ts", lineNumber: 23 });
})();

export {
  AdminSummaryCardComponent
};
//# sourceMappingURL=chunk-XIEUEHEY.js.map
