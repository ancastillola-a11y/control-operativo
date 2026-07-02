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

// src/app/shared/componentes/admin-module-hero/admin-module-hero.component.ts
function AdminModuleHeroComponent_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.codigo);
  }
}
function AdminModuleHeroComponent_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275listener("click", function AdminModuleHeroComponent_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.emitirClick());
    });
    \u0275\u0275elementStart(1, "span", 8);
    \u0275\u0275text(2, "+");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.botonTexto);
  }
}
var _AdminModuleHeroComponent = class _AdminModuleHeroComponent {
  constructor() {
    this.codigo = "";
    this.titulo = "";
    this.descripcion = "";
    this.icono = "apps-outline";
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
_AdminModuleHeroComponent.\u0275fac = function AdminModuleHeroComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AdminModuleHeroComponent)();
};
_AdminModuleHeroComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminModuleHeroComponent, selectors: [["app-admin-module-hero"]], inputs: { codigo: "codigo", titulo: "titulo", descripcion: "descripcion", icono: "icono", botonTexto: "botonTexto", botonIcono: "botonIcono" }, outputs: { botonClick: "botonClick" }, decls: 11, vars: 5, consts: [[1, "module-hero"], [1, "hero-left"], [1, "hero-icon"], [3, "name"], [1, "hero-text"], [4, "ngIf"], ["type", "button", "class", "btn-hero", 3, "click", 4, "ngIf"], ["type", "button", 1, "btn-hero", 3, "click"], [1, "btn-plus"]], template: function AdminModuleHeroComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2);
    \u0275\u0275element(3, "ion-icon", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 4);
    \u0275\u0275template(5, AdminModuleHeroComponent_span_5_Template, 2, 1, "span", 5);
    \u0275\u0275elementStart(6, "h2");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(10, AdminModuleHeroComponent_button_10_Template, 5, 1, "button", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275property("name", ctx.icono);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx.codigo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.descripcion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.mostrarBoton);
  }
}, dependencies: [CommonModule, NgIf, IonicModule, IonIcon], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  font-family: var(--font-main);\n}\n.module-hero[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-primary),\n      var(--color-primary-hover));\n  border-radius: 16px;\n  padding: 14px;\n  color: #ffffff;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 12px;\n  box-shadow: var(--shadow-button);\n}\n.hero-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  min-width: 0;\n}\n.hero-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.16);\n  border: 1px solid rgba(255, 255, 255, 0.22);\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n}\n.hero-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 25px;\n  color: #ffffff;\n}\n.hero-text[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.hero-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-bottom: 2px;\n  font-size: 10px;\n  font-weight: 700;\n  color: #ffd166;\n  letter-spacing: 0.3px;\n}\n.hero-text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 700;\n  line-height: 1.1;\n  color: #ffffff;\n}\n.hero-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 11px;\n  font-weight: 400;\n  color: rgba(255, 255, 255, 0.85);\n  line-height: 1.25;\n}\n.btn-hero[_ngcontent-%COMP%] {\n  height: 38px;\n  min-width: 84px;\n  padding: 0 12px;\n  border: none;\n  border-radius: 10px;\n  background: #ffffff;\n  color: var(--color-primary);\n  font-size: 12px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);\n}\n.btn-plus[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  line-height: 1;\n}\n.btn-hero[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n@media (max-width: 360px) {\n  .module-hero[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .btn-hero[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=admin-module-hero.component.css.map */"] });
var AdminModuleHeroComponent = _AdminModuleHeroComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminModuleHeroComponent, [{
    type: Component,
    args: [{ selector: "app-admin-module-hero", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: '<!-- src/app/shared/componentes/admin-module-hero/admin-module-hero.component.html -->\n\n<section class="module-hero">\n\n  <div class="hero-left">\n\n    <div class="hero-icon">\n      <ion-icon [name]="icono"></ion-icon>\n    </div>\n\n    <div class="hero-text">\n      <span *ngIf="codigo">{{ codigo }}</span>\n      <h2>{{ titulo }}</h2>\n      <p>{{ descripcion }}</p>\n    </div>\n\n  </div>\n\n  <button\n    *ngIf="mostrarBoton"\n    type="button"\n    class="btn-hero"\n    (click)="emitirClick()"\n  >\n    <span class="btn-plus">+</span>\n    <span>{{ botonTexto }}</span>\n  </button>\n\n</section>', styles: ["/* src/app/shared/componentes/admin-module-hero/admin-module-hero.component.css */\n:host {\n  display: block;\n  width: 100%;\n  font-family: var(--font-main);\n}\n.module-hero {\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-primary),\n      var(--color-primary-hover));\n  border-radius: 16px;\n  padding: 14px;\n  color: #ffffff;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 12px;\n  box-shadow: var(--shadow-button);\n}\n.hero-left {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  min-width: 0;\n}\n.hero-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.16);\n  border: 1px solid rgba(255, 255, 255, 0.22);\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n}\n.hero-icon ion-icon {\n  font-size: 25px;\n  color: #ffffff;\n}\n.hero-text {\n  min-width: 0;\n}\n.hero-text span {\n  display: inline-block;\n  margin-bottom: 2px;\n  font-size: 10px;\n  font-weight: 700;\n  color: #ffd166;\n  letter-spacing: 0.3px;\n}\n.hero-text h2 {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 700;\n  line-height: 1.1;\n  color: #ffffff;\n}\n.hero-text p {\n  margin: 4px 0 0;\n  font-size: 11px;\n  font-weight: 400;\n  color: rgba(255, 255, 255, 0.85);\n  line-height: 1.25;\n}\n.btn-hero {\n  height: 38px;\n  min-width: 84px;\n  padding: 0 12px;\n  border: none;\n  border-radius: 10px;\n  background: #ffffff;\n  color: var(--color-primary);\n  font-size: 12px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);\n}\n.btn-plus {\n  font-size: 15px;\n  font-weight: 700;\n  line-height: 1;\n}\n.btn-hero:active {\n  transform: scale(0.97);\n}\n@media (max-width: 360px) {\n  .module-hero {\n    grid-template-columns: 1fr;\n  }\n  .btn-hero {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=admin-module-hero.component.css.map */\n"] }]
  }], null, { codigo: [{
    type: Input
  }], titulo: [{
    type: Input
  }], descripcion: [{
    type: Input
  }], icono: [{
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminModuleHeroComponent, { className: "AdminModuleHeroComponent", filePath: "src/app/shared/componentes/admin-module-hero/admin-module-hero.component.ts", lineNumber: 16 });
})();

export {
  AdminModuleHeroComponent
};
//# sourceMappingURL=chunk-DT73SCF2.js.map
