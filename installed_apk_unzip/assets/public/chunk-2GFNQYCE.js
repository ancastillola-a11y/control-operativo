import {
  IonIcon,
  IonInput,
  IonicModule,
  TextValueAccessorDirective
} from "./chunk-NAACVANG.js";
import {
  CommonModule,
  Component,
  EventEmitter,
  Input,
  NgForOf,
  Output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
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
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-D2BFCRPD.js";

// src/app/shared/componentes/admin-search-filter/admin-search-filter.component.ts
var _AdminSearchFilterComponent = class _AdminSearchFilterComponent {
  constructor() {
    this.placeholder = "Buscar...";
    this.filtroActual = "todos";
    this.buscar = new EventEmitter();
    this.filtrar = new EventEmitter();
  }
  get textoFiltro() {
    if (this.filtroActual === "habilitados") {
      return "Activos";
    }
    if (this.filtroActual === "deshabilitados") {
      return "Inactivos";
    }
    if (this.filtroActual === "pendientes") {
      return "Pendientes";
    }
    if (this.filtroActual === "enProceso") {
      return "En proceso";
    }
    if (this.filtroActual === "finalizados") {
      return "Finalizados";
    }
    if (this.filtroActual === "cancelados") {
      return "Cancelados";
    }
    return "Todos";
  }
  emitirBusqueda(event) {
    const valor = event.detail?.value ?? "";
    this.buscar.emit(String(valor));
  }
  abrirFiltro() {
    this.filtrar.emit();
  }
};
_AdminSearchFilterComponent.\u0275fac = function AdminSearchFilterComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AdminSearchFilterComponent)();
};
_AdminSearchFilterComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminSearchFilterComponent, selectors: [["app-admin-search-filter"]], inputs: { placeholder: "placeholder", filtroActual: "filtroActual" }, outputs: { buscar: "buscar", filtrar: "filtrar" }, decls: 11, vars: 2, consts: [[1, "control-card"], [1, "search-box"], ["name", "search-outline"], [3, "ionInput", "placeholder"], ["type", "button", 1, "btn-filtro", 3, "click"], ["name", "filter-outline"]], template: function AdminSearchFilterComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 0)(1, "div", 1);
    \u0275\u0275element(2, "ion-icon", 2);
    \u0275\u0275elementStart(3, "ion-input", 3);
    \u0275\u0275listener("ionInput", function AdminSearchFilterComponent_Template_ion_input_ionInput_3_listener($event) {
      return ctx.emitirBusqueda($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 4);
    \u0275\u0275listener("click", function AdminSearchFilterComponent_Template_button_click_4_listener() {
      return ctx.abrirFiltro();
    });
    \u0275\u0275elementStart(5, "div")(6, "span");
    \u0275\u0275text(7, "Filtro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(10, "ion-icon", 5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275property("placeholder", ctx.placeholder);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx.textoFiltro);
  }
}, dependencies: [CommonModule, IonicModule, IonIcon, IonInput, TextValueAccessorDirective], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n.control-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e5eaf2;\n  border-radius: 16px;\n  padding: 10px;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 104px;\n  gap: 9px;\n  margin-bottom: 13px;\n  box-shadow: 0 5px 16px rgba(15, 23, 42, 0.04);\n}\n.search-box[_ngcontent-%COMP%] {\n  height: 42px;\n  background: #f8fafc;\n  border: 1px solid #dfe5ef;\n  border-radius: 12px;\n  display: grid;\n  grid-template-columns: 32px 1fr;\n  align-items: center;\n  padding: 0 9px;\n  min-width: 0;\n}\n.search-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n  color: #64748b;\n}\n.search-box[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: #111827;\n  --padding-start: 0;\n  --padding-end: 0;\n}\n.btn-filtro[_ngcontent-%COMP%] {\n  height: 42px;\n  border: 1px solid #dfe5ef;\n  background: #f8fafc;\n  border-radius: 12px;\n  color: #334155;\n  display: grid;\n  grid-template-columns: 1fr 20px;\n  align-items: center;\n  gap: 4px;\n  padding: 0 9px;\n  text-align: left;\n}\n.btn-filtro[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 9.5px;\n  font-weight: 800;\n  color: #64748b;\n  line-height: 1;\n}\n.btn-filtro[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 3px;\n  font-size: 11px;\n  font-weight: 900;\n  color: #111827;\n  line-height: 1;\n}\n.btn-filtro[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n  color: #1759e8;\n}\n@media (max-width: 360px) {\n  .control-card[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=admin-search-filter.component.css.map */"] });
var AdminSearchFilterComponent = _AdminSearchFilterComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminSearchFilterComponent, [{
    type: Component,
    args: [{ selector: "app-admin-search-filter", standalone: true, imports: [CommonModule, IonicModule], template: '<!-- src/app/shared/componentes/admin-search-filter/admin-search-filter.component.html -->\n\n<section class="control-card">\n\n  <div class="search-box">\n    <ion-icon name="search-outline"></ion-icon>\n\n    <ion-input\n      [placeholder]="placeholder"\n      (ionInput)="emitirBusqueda($event)"\n    ></ion-input>\n  </div>\n\n  <button type="button" class="btn-filtro" (click)="abrirFiltro()">\n    <div>\n      <span>Filtro</span>\n      <strong>{{ textoFiltro }}</strong>\n    </div>\n\n    <ion-icon name="filter-outline"></ion-icon>\n  </button>\n\n</section>', styles: ["/* src/app/shared/componentes/admin-search-filter/admin-search-filter.component.css */\n:host {\n  display: block;\n  width: 100%;\n}\n.control-card {\n  background: #ffffff;\n  border: 1px solid #e5eaf2;\n  border-radius: 16px;\n  padding: 10px;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 104px;\n  gap: 9px;\n  margin-bottom: 13px;\n  box-shadow: 0 5px 16px rgba(15, 23, 42, 0.04);\n}\n.search-box {\n  height: 42px;\n  background: #f8fafc;\n  border: 1px solid #dfe5ef;\n  border-radius: 12px;\n  display: grid;\n  grid-template-columns: 32px 1fr;\n  align-items: center;\n  padding: 0 9px;\n  min-width: 0;\n}\n.search-box ion-icon {\n  font-size: 17px;\n  color: #64748b;\n}\n.search-box ion-input {\n  font-size: 12px;\n  font-weight: 700;\n  color: #111827;\n  --padding-start: 0;\n  --padding-end: 0;\n}\n.btn-filtro {\n  height: 42px;\n  border: 1px solid #dfe5ef;\n  background: #f8fafc;\n  border-radius: 12px;\n  color: #334155;\n  display: grid;\n  grid-template-columns: 1fr 20px;\n  align-items: center;\n  gap: 4px;\n  padding: 0 9px;\n  text-align: left;\n}\n.btn-filtro span {\n  display: block;\n  font-size: 9.5px;\n  font-weight: 800;\n  color: #64748b;\n  line-height: 1;\n}\n.btn-filtro strong {\n  display: block;\n  margin-top: 3px;\n  font-size: 11px;\n  font-weight: 900;\n  color: #111827;\n  line-height: 1;\n}\n.btn-filtro ion-icon {\n  font-size: 17px;\n  color: #1759e8;\n}\n@media (max-width: 360px) {\n  .control-card {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=admin-search-filter.component.css.map */\n"] }]
  }], null, { placeholder: [{
    type: Input
  }], filtroActual: [{
    type: Input
  }], buscar: [{
    type: Output
  }], filtrar: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminSearchFilterComponent, { className: "AdminSearchFilterComponent", filePath: "src/app/shared/componentes/admin-search-filter/admin-search-filter.component.ts", lineNumber: 13 });
})();

// src/app/shared/componentes/admin-pagination/admin-pagination.component.ts
function AdminPaginationComponent_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 5);
    \u0275\u0275listener("click", function AdminPaginationComponent_button_3_Template_button_click_0_listener() {
      const pagina_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.emitirPagina(pagina_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pagina_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", pagina_r2 === ctx_r2.paginaActual);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", pagina_r2, " ");
  }
}
var _AdminPaginationComponent = class _AdminPaginationComponent {
  constructor() {
    this.paginaActual = 1;
    this.totalPaginas = 1;
    this.paginas = [];
    this.anterior = new EventEmitter();
    this.siguiente = new EventEmitter();
    this.irPagina = new EventEmitter();
  }
  emitirAnterior() {
    this.anterior.emit();
  }
  emitirSiguiente() {
    this.siguiente.emit();
  }
  emitirPagina(pagina) {
    this.irPagina.emit(pagina);
  }
};
_AdminPaginationComponent.\u0275fac = function AdminPaginationComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AdminPaginationComponent)();
};
_AdminPaginationComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminPaginationComponent, selectors: [["app-admin-pagination"]], inputs: { paginaActual: "paginaActual", totalPaginas: "totalPaginas", paginas: "paginas" }, outputs: { anterior: "anterior", siguiente: "siguiente", irPagina: "irPagina" }, decls: 6, vars: 3, consts: [[1, "pagination-section"], ["type", "button", 1, "page-btn", 3, "click", "disabled"], ["name", "chevron-back-outline"], ["type", "button", "class", "page-number", 3, "active", "click", 4, "ngFor", "ngForOf"], ["name", "chevron-forward-outline"], ["type", "button", 1, "page-number", 3, "click"]], template: function AdminPaginationComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 0)(1, "button", 1);
    \u0275\u0275listener("click", function AdminPaginationComponent_Template_button_click_1_listener() {
      return ctx.emitirAnterior();
    });
    \u0275\u0275element(2, "ion-icon", 2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, AdminPaginationComponent_button_3_Template, 2, 3, "button", 3);
    \u0275\u0275elementStart(4, "button", 1);
    \u0275\u0275listener("click", function AdminPaginationComponent_Template_button_click_4_listener() {
      return ctx.emitirSiguiente();
    });
    \u0275\u0275element(5, "ion-icon", 4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.paginaActual === 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx.paginas);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.paginaActual === ctx.totalPaginas);
  }
}, dependencies: [CommonModule, NgForOf, IonicModule, IonIcon], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.pagination-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 9px;\n  margin-top: 20px;\n}\n.page-btn[_ngcontent-%COMP%], \n.page-number[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: 1px solid #dfe5ef;\n  background: #ffffff;\n  border-radius: 10px;\n  color: #64748b;\n  font-size: 13px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.page-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n}\n.page-number.active[_ngcontent-%COMP%] {\n  background: #1759e8;\n  border-color: #1759e8;\n  color: #ffffff;\n  box-shadow: 0 6px 14px rgba(23, 89, 232, 0.22);\n}\n/*# sourceMappingURL=admin-pagination.component.css.map */"] });
var AdminPaginationComponent = _AdminPaginationComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminPaginationComponent, [{
    type: Component,
    args: [{ selector: "app-admin-pagination", standalone: true, imports: [CommonModule, IonicModule], template: '<!-- src/app/shared/componentes/admin-pagination/admin-pagination.component.html -->\n\n<section class="pagination-section">\n\n  <button\n    type="button"\n    class="page-btn"\n    (click)="emitirAnterior()"\n    [disabled]="paginaActual === 1"\n  >\n    <ion-icon name="chevron-back-outline"></ion-icon>\n  </button>\n\n  <button\n    type="button"\n    class="page-number"\n    *ngFor="let pagina of paginas"\n    [class.active]="pagina === paginaActual"\n    (click)="emitirPagina(pagina)"\n  >\n    {{ pagina }}\n  </button>\n\n  <button\n    type="button"\n    class="page-btn"\n    (click)="emitirSiguiente()"\n    [disabled]="paginaActual === totalPaginas"\n  >\n    <ion-icon name="chevron-forward-outline"></ion-icon>\n  </button>\n\n</section>', styles: ["/* src/app/shared/componentes/admin-pagination/admin-pagination.component.css */\n:host {\n  display: block;\n}\n.pagination-section {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 9px;\n  margin-top: 20px;\n}\n.page-btn,\n.page-number {\n  width: 34px;\n  height: 34px;\n  border: 1px solid #dfe5ef;\n  background: #ffffff;\n  border-radius: 10px;\n  color: #64748b;\n  font-size: 13px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.page-btn:disabled {\n  opacity: 0.45;\n}\n.page-number.active {\n  background: #1759e8;\n  border-color: #1759e8;\n  color: #ffffff;\n  box-shadow: 0 6px 14px rgba(23, 89, 232, 0.22);\n}\n/*# sourceMappingURL=admin-pagination.component.css.map */\n"] }]
  }], null, { paginaActual: [{
    type: Input
  }], totalPaginas: [{
    type: Input
  }], paginas: [{
    type: Input
  }], anterior: [{
    type: Output
  }], siguiente: [{
    type: Output
  }], irPagina: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminPaginationComponent, { className: "AdminPaginationComponent", filePath: "src/app/shared/componentes/admin-pagination/admin-pagination.component.ts", lineNumber: 13 });
})();

export {
  AdminSearchFilterComponent,
  AdminPaginationComponent
};
//# sourceMappingURL=chunk-2GFNQYCE.js.map
