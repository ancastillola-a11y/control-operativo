import {
  IonIcon,
  IonicModule,
  ModalController
} from "./chunk-NAACVANG.js";
import {
  CommonModule,
  Component,
  Input,
  NgClass,
  NgIf,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-D2BFCRPD.js";

// src/app/shared/componentes/admin-confirm-modal/admin-confirm-modal.component.ts
function AdminConfirmModalComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "ion-icon", 10);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.detalle);
  }
}
var _AdminConfirmModalComponent = class _AdminConfirmModalComponent {
  constructor() {
    this.modalCtrl = inject(ModalController);
    this.tipo = "primary";
    this.icono = "information-circle-outline";
    this.titulo = "Confirmar acci\xC3\xB3n";
    this.mensaje = "";
    this.detalle = "";
    this.textoCancelar = "Cancelar";
    this.textoConfirmar = "Confirmar";
  }
  cancelar() {
    this.modalCtrl.dismiss(false, "cancel");
  }
  confirmar() {
    this.modalCtrl.dismiss(true, "confirm");
  }
};
_AdminConfirmModalComponent.\u0275fac = function AdminConfirmModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AdminConfirmModalComponent)();
};
_AdminConfirmModalComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminConfirmModalComponent, selectors: [["app-admin-confirm-modal"]], inputs: { tipo: "tipo", icono: "icono", titulo: "titulo", mensaje: "mensaje", detalle: "detalle", textoCancelar: "textoCancelar", textoConfirmar: "textoConfirmar" }, decls: 14, vars: 7, consts: [[1, "confirm-panel", 3, "ngClass"], [1, "confirm-icon"], [3, "name"], [1, "confirm-body"], [1, "confirm-message"], ["class", "confirm-detail", 4, "ngIf"], [1, "confirm-actions"], ["type", "button", 1, "btn-cancelar", 3, "click"], ["type", "button", 1, "btn-confirmar", 3, "click"], [1, "confirm-detail"], ["name", "alert-circle-outline"]], template: function AdminConfirmModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
    \u0275\u0275element(2, "ion-icon", 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 3)(4, "h2");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 4);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, AdminConfirmModalComponent_div_8_Template, 4, 1, "div", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 6)(10, "button", 7);
    \u0275\u0275listener("click", function AdminConfirmModalComponent_Template_button_click_10_listener() {
      return ctx.cancelar();
    });
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 8);
    \u0275\u0275listener("click", function AdminConfirmModalComponent_Template_button_click_12_listener() {
      return ctx.confirmar();
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275property("ngClass", ctx.tipo);
    \u0275\u0275advance(2);
    \u0275\u0275property("name", ctx.icono);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.mensaje, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.detalle);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.textoCancelar, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.textoConfirmar, " ");
  }
}, dependencies: [CommonModule, NgClass, NgIf, IonicModule, IonIcon], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  font-family: var(--font-main);\n}\n.confirm-panel[_ngcontent-%COMP%] {\n  width: 100%;\n  background: var(--color-card);\n  border-radius: 22px;\n  padding: 20px 16px 16px;\n  text-align: center;\n  animation: _ngcontent-%COMP%_confirmPop 180ms ease-out;\n}\n.confirm-icon[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  border-radius: 22px;\n  margin: 0 auto 14px;\n  display: grid;\n  place-items: center;\n}\n.confirm-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 34px;\n}\n.confirm-panel.danger[_ngcontent-%COMP%]   .confirm-icon[_ngcontent-%COMP%] {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.confirm-panel.warning[_ngcontent-%COMP%]   .confirm-icon[_ngcontent-%COMP%] {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.confirm-panel.success[_ngcontent-%COMP%]   .confirm-icon[_ngcontent-%COMP%] {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.confirm-panel.primary[_ngcontent-%COMP%]   .confirm-icon[_ngcontent-%COMP%] {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.confirm-body[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.confirm-message[_ngcontent-%COMP%] {\n  margin: 8px 0 0;\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  line-height: 1.45;\n}\n.confirm-detail[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  background: #f8fafc;\n  border: 1px solid var(--color-border);\n  border-radius: 14px;\n  padding: 10px;\n  display: flex;\n  gap: 8px;\n  align-items: flex-start;\n  text-align: left;\n}\n.confirm-detail[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--color-primary);\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n.confirm-detail[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text);\n  line-height: 1.35;\n}\n.confirm-actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n  margin-top: 18px;\n}\n.btn-cancelar[_ngcontent-%COMP%], \n.btn-confirmar[_ngcontent-%COMP%] {\n  height: 44px;\n  border: none;\n  border-radius: 12px;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: var(--font-main);\n}\n.btn-cancelar[_ngcontent-%COMP%] {\n  background: #ffffff;\n  color: var(--color-text-muted);\n  border: 1px solid var(--color-border);\n}\n.btn-confirmar[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.confirm-panel.danger[_ngcontent-%COMP%]   .btn-confirmar[_ngcontent-%COMP%] {\n  background: var(--color-error);\n}\n.confirm-panel.warning[_ngcontent-%COMP%]   .btn-confirmar[_ngcontent-%COMP%] {\n  background: var(--color-warning);\n}\n.confirm-panel.success[_ngcontent-%COMP%]   .btn-confirmar[_ngcontent-%COMP%] {\n  background: var(--color-success);\n}\n.confirm-panel.primary[_ngcontent-%COMP%]   .btn-confirmar[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n}\n.btn-cancelar[_ngcontent-%COMP%]:active, \n.btn-confirmar[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n@keyframes _ngcontent-%COMP%_confirmPop {\n  from {\n    opacity: 0;\n    transform: translateY(12px) scale(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n@media (max-width: 360px) {\n  .confirm-actions[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=admin-confirm-modal.component.css.map */"] });
var AdminConfirmModalComponent = _AdminConfirmModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminConfirmModalComponent, [{
    type: Component,
    args: [{ selector: "app-admin-confirm-modal", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: '<!-- src/app/shared/componentes/admin-confirm-modal/admin-confirm-modal.component.html -->\n\n<div class="confirm-panel" [ngClass]="tipo">\n\n  <div class="confirm-icon">\n    <ion-icon [name]="icono"></ion-icon>\n  </div>\n\n  <div class="confirm-body">\n    <h2>{{ titulo }}</h2>\n\n    <p class="confirm-message">\n      {{ mensaje }}\n    </p>\n\n    <div class="confirm-detail" *ngIf="detalle">\n      <ion-icon name="alert-circle-outline"></ion-icon>\n      <span>{{ detalle }}</span>\n    </div>\n  </div>\n\n  <div class="confirm-actions">\n    <button\n      type="button"\n      class="btn-cancelar"\n      (click)="cancelar()"\n    >\n      {{ textoCancelar }}\n    </button>\n\n    <button\n      type="button"\n      class="btn-confirmar"\n      (click)="confirmar()"\n    >\n      {{ textoConfirmar }}\n    </button>\n  </div>\n\n</div>', styles: ["/* src/app/shared/componentes/admin-confirm-modal/admin-confirm-modal.component.css */\n:host {\n  display: block;\n  font-family: var(--font-main);\n}\n.confirm-panel {\n  width: 100%;\n  background: var(--color-card);\n  border-radius: 22px;\n  padding: 20px 16px 16px;\n  text-align: center;\n  animation: confirmPop 180ms ease-out;\n}\n.confirm-icon {\n  width: 64px;\n  height: 64px;\n  border-radius: 22px;\n  margin: 0 auto 14px;\n  display: grid;\n  place-items: center;\n}\n.confirm-icon ion-icon {\n  font-size: 34px;\n}\n.confirm-panel.danger .confirm-icon {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.confirm-panel.warning .confirm-icon {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.confirm-panel.success .confirm-icon {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.confirm-panel.primary .confirm-icon {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.confirm-body h2 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.confirm-message {\n  margin: 8px 0 0;\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  line-height: 1.45;\n}\n.confirm-detail {\n  margin-top: 14px;\n  background: #f8fafc;\n  border: 1px solid var(--color-border);\n  border-radius: 14px;\n  padding: 10px;\n  display: flex;\n  gap: 8px;\n  align-items: flex-start;\n  text-align: left;\n}\n.confirm-detail ion-icon {\n  font-size: 18px;\n  color: var(--color-primary);\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n.confirm-detail span {\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text);\n  line-height: 1.35;\n}\n.confirm-actions {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n  margin-top: 18px;\n}\n.btn-cancelar,\n.btn-confirmar {\n  height: 44px;\n  border: none;\n  border-radius: 12px;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: var(--font-main);\n}\n.btn-cancelar {\n  background: #ffffff;\n  color: var(--color-text-muted);\n  border: 1px solid var(--color-border);\n}\n.btn-confirmar {\n  color: #ffffff;\n}\n.confirm-panel.danger .btn-confirmar {\n  background: var(--color-error);\n}\n.confirm-panel.warning .btn-confirmar {\n  background: var(--color-warning);\n}\n.confirm-panel.success .btn-confirmar {\n  background: var(--color-success);\n}\n.confirm-panel.primary .btn-confirmar {\n  background: var(--color-primary);\n}\n.btn-cancelar:active,\n.btn-confirmar:active {\n  transform: scale(0.97);\n}\n@keyframes confirmPop {\n  from {\n    opacity: 0;\n    transform: translateY(12px) scale(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n@media (max-width: 360px) {\n  .confirm-actions {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=admin-confirm-modal.component.css.map */\n"] }]
  }], null, { tipo: [{
    type: Input
  }], icono: [{
    type: Input
  }], titulo: [{
    type: Input
  }], mensaje: [{
    type: Input
  }], detalle: [{
    type: Input
  }], textoCancelar: [{
    type: Input
  }], textoConfirmar: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminConfirmModalComponent, { className: "AdminConfirmModalComponent", filePath: "src/app/shared/componentes/admin-confirm-modal/admin-confirm-modal.component.ts", lineNumber: 22 });
})();

export {
  AdminConfirmModalComponent
};
//# sourceMappingURL=chunk-BZYK3K3H.js.map
