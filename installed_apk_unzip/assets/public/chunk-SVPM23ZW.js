import {
  IonIcon,
  IonicModule
} from "./chunk-NAACVANG.js";
import {
  CommonModule,
  Component,
  EventEmitter,
  Input,
  NgIf,
  Output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-D2BFCRPD.js";

// src/app/shared/componentes/admin-empty-state/admin-empty-state.component.ts
function AdminEmptyStateComponent_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 4);
    \u0275\u0275listener("click", function AdminEmptyStateComponent_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.emitirClick());
    });
    \u0275\u0275element(1, "ion-icon", 2);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("name", ctx_r1.botonIcono);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.botonTexto);
  }
}
var _AdminEmptyStateComponent = class _AdminEmptyStateComponent {
  constructor() {
    this.icono = "information-circle-outline";
    this.titulo = "Sin informaci\xC3\xB3n";
    this.descripcion = "";
    this.botonTexto = "";
    this.botonIcono = "add-outline";
    this.botonClick = new EventEmitter();
  }
  get mostrarBoton() {
    return this.botonTexto.trim().length > 0;
  }
  emitirClick() {
    this.botonClick.emit();
  }
};
_AdminEmptyStateComponent.\u0275fac = function AdminEmptyStateComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AdminEmptyStateComponent)();
};
_AdminEmptyStateComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminEmptyStateComponent, selectors: [["app-admin-empty-state"]], inputs: { icono: "icono", titulo: "titulo", descripcion: "descripcion", botonTexto: "botonTexto", botonIcono: "botonIcono" }, outputs: { botonClick: "botonClick" }, decls: 8, vars: 4, consts: [[1, "empty-state"], [1, "empty-icon"], [3, "name"], ["type", "button", "class", "btn-empty", 3, "click", 4, "ngIf"], ["type", "button", 1, "btn-empty", 3, "click"]], template: function AdminEmptyStateComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
    \u0275\u0275element(2, "ion-icon", 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, AdminEmptyStateComponent_button_7_Template, 4, 2, "button", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275property("name", ctx.icono);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.descripcion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.mostrarBoton);
  }
}, dependencies: [CommonModule, NgIf, IonicModule, IonIcon], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.empty-state[_ngcontent-%COMP%] {\n  min-height: 310px;\n  background: #ffffff;\n  border: 1px dashed #cbd5e1;\n  border-radius: 18px;\n  padding: 22px 16px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 9px;\n  text-align: center;\n  color: #64748b;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  width: 58px;\n  height: 58px;\n  border-radius: 20px;\n  background: #eef4ff;\n  color: #1759e8;\n  display: grid;\n  place-items: center;\n}\n.empty-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 30px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 900;\n  color: #111827;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 12px;\n  font-weight: 600;\n  max-width: 260px;\n  line-height: 1.35;\n}\n.btn-empty[_ngcontent-%COMP%] {\n  height: 38px;\n  padding: 0 13px;\n  border: none;\n  border-radius: 12px;\n  background: #1759e8;\n  color: #ffffff;\n  font-size: 12px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  margin-top: 4px;\n}\n/*# sourceMappingURL=admin-empty-state.component.css.map */"] });
var AdminEmptyStateComponent = _AdminEmptyStateComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminEmptyStateComponent, [{
    type: Component,
    args: [{ selector: "app-admin-empty-state", standalone: true, imports: [CommonModule, IonicModule], template: '<!-- src/app/shared/componentes/admin-empty-state/admin-empty-state.component.html -->\n\n<div class="empty-state">\n\n  <div class="empty-icon">\n    <ion-icon [name]="icono"></ion-icon>\n  </div>\n\n  <h3>{{ titulo }}</h3>\n\n  <p>{{ descripcion }}</p>\n\n  <button\n    *ngIf="mostrarBoton"\n    type="button"\n    class="btn-empty"\n    (click)="emitirClick()"\n  >\n    <ion-icon [name]="botonIcono"></ion-icon>\n    <span>{{ botonTexto }}</span>\n  </button>\n\n</div>', styles: ["/* src/app/shared/componentes/admin-empty-state/admin-empty-state.component.css */\n:host {\n  display: block;\n}\n.empty-state {\n  min-height: 310px;\n  background: #ffffff;\n  border: 1px dashed #cbd5e1;\n  border-radius: 18px;\n  padding: 22px 16px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 9px;\n  text-align: center;\n  color: #64748b;\n}\n.empty-icon {\n  width: 58px;\n  height: 58px;\n  border-radius: 20px;\n  background: #eef4ff;\n  color: #1759e8;\n  display: grid;\n  place-items: center;\n}\n.empty-icon ion-icon {\n  font-size: 30px;\n}\n.empty-state h3 {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 900;\n  color: #111827;\n}\n.empty-state p {\n  margin: 0;\n  font-size: 12px;\n  font-weight: 600;\n  max-width: 260px;\n  line-height: 1.35;\n}\n.btn-empty {\n  height: 38px;\n  padding: 0 13px;\n  border: none;\n  border-radius: 12px;\n  background: #1759e8;\n  color: #ffffff;\n  font-size: 12px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  margin-top: 4px;\n}\n/*# sourceMappingURL=admin-empty-state.component.css.map */\n"] }]
  }], null, { icono: [{
    type: Input
  }], titulo: [{
    type: Input
  }], descripcion: [{
    type: Input
  }], botonTexto: [{
    type: Input
  }], botonIcono: [{
    type: Input
  }], botonClick: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminEmptyStateComponent, { className: "AdminEmptyStateComponent", filePath: "src/app/shared/componentes/admin-empty-state/admin-empty-state.component.ts", lineNumber: 13 });
})();

export {
  AdminEmptyStateComponent
};
//# sourceMappingURL=chunk-SVPM23ZW.js.map
