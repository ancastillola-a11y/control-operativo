import {
  require_leaflet_src
} from "./chunk-NF6GRHB5.js";
import {
  GpsService
} from "./chunk-2JYSEZGS.js";
import {
  AdminBottomNavComponent,
  AdminHeaderComponent,
  DashboardAdminService
} from "./chunk-CWBZAVOG.js";
import {
  IonContent,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonicModule,
  SelectValueAccessorDirective,
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
  locateOutline,
  locationOutline,
  mapOutline,
  navigateOutline,
  timeOutline
} from "./chunk-XEVVVGO7.js";
import "./chunk-NMRAWXHA.js";
import {
  AsyncPipe,
  ChangeDetectorRef,
  CommonModule,
  Component,
  Input,
  NavController,
  NgForOf,
  NgIf,
  ViewChild,
  inject,
  setClassMetadata,
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
  ɵɵviewQuery
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
  __async,
  __toESM
} from "./chunk-Q3N56TRI.js";

// src/app/shared/componentes/gps-live-map/gps-live-map.component.ts
var L = __toESM(require_leaflet_src());
var _c0 = ["mapContainer"];
var _GpsLiveMapComponent = class _GpsLiveMapComponent {
  constructor() {
    this.ubicaciones = [];
    this.mapa = null;
    this.capaMarcadores = null;
    this.capaRutas = null;
    this.mapaListo = false;
    addIcons({
      "locate-outline": locateOutline
    });
  }
  ngAfterViewInit() {
    this.inicializarMapa();
    setTimeout(() => {
      this.mapa?.invalidateSize();
      this.pintarMapa();
    }, 250);
    setTimeout(() => {
      this.mapa?.invalidateSize();
      this.ajustarVista();
    }, 700);
  }
  ngOnChanges(changes) {
    if (!this.mapaListo) {
      return;
    }
    if (changes["ubicaciones"]) {
      this.pintarMapa();
    }
  }
  ngOnDestroy() {
    if (this.mapa) {
      this.mapa.remove();
      this.mapa = null;
    }
  }
  centrarMapa() {
    this.ajustarVista();
  }
  inicializarMapa() {
    this.mapa = L.map(this.mapContainer.nativeElement, {
      zoomControl: true,
      attributionControl: false
    }).setView([-12.046374, -77.042793], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19
    }).addTo(this.mapa);
    this.capaRutas = L.layerGroup().addTo(this.mapa);
    this.capaMarcadores = L.layerGroup().addTo(this.mapa);
    this.mapaListo = true;
  }
  pintarMapa() {
    if (!this.mapa || !this.capaMarcadores || !this.capaRutas) {
      return;
    }
    this.capaMarcadores.clearLayers();
    this.capaRutas.clearLayers();
    for (const ubicacion of this.ubicaciones || []) {
      if (!this.esCoordenadaValida(ubicacion.latitud, ubicacion.longitud)) {
        continue;
      }
      this.pintarRuta(ubicacion);
      this.pintarMarcadorEmpleado(ubicacion);
      this.pintarMarcadorDestino(ubicacion);
    }
    this.ajustarVista();
  }
  pintarMarcadorEmpleado(ubicacion) {
    if (!this.capaMarcadores) {
      return;
    }
    const icono = L.divIcon({
      className: `gps-marker gps-marker-${ubicacion.estado}`,
      html: `
        <div class="gps-marker-pin gps-marker-worker">
          <span>E</span>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });
    const marker2 = L.marker([ubicacion.latitud, ubicacion.longitud], {
      icon: icono
    });
    const popup = `
      <strong>${this.escaparHtml(ubicacion.empleadoNombre)}</strong><br>
      ${this.escaparHtml(ubicacion.empleadoRol || "Empleado")}<br>
      Estado: ${this.escaparHtml(ubicacion.estado)}<br>
      Trabajo: ${this.escaparHtml(ubicacion.trabajoCodigo || "Sin trabajo")}
    `;
    marker2.bindPopup(popup);
    marker2.addTo(this.capaMarcadores);
  }
  pintarMarcadorDestino(ubicacion) {
    if (!this.capaMarcadores || !ubicacion.ruta || ubicacion.ruta.length < 2) {
      return;
    }
    const destino = ubicacion.ruta[ubicacion.ruta.length - 1];
    if (!this.esCoordenadaValida(destino.latitud, destino.longitud)) {
      return;
    }
    const icono = L.divIcon({
      className: "gps-marker gps-marker-destino",
      html: `
        <div class="gps-marker-pin gps-marker-destination">
          <span>D</span>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });
    const marker2 = L.marker([destino.latitud, destino.longitud], {
      icon: icono
    });
    const popup = `
      <strong>Destino del trabajo</strong><br>
      ${this.escaparHtml(ubicacion.trabajoCodigo || "")}<br>
      ${this.escaparHtml(ubicacion.trabajoTitulo || "")}
    `;
    marker2.bindPopup(popup);
    marker2.addTo(this.capaMarcadores);
  }
  pintarRuta(ubicacion) {
    if (!this.capaRutas || !ubicacion.ruta || ubicacion.ruta.length < 2) {
      return;
    }
    const puntos = ubicacion.ruta.filter((punto) => this.esCoordenadaValida(punto.latitud, punto.longitud)).map((punto) => L.latLng(punto.latitud, punto.longitud));
    if (puntos.length < 2) {
      return;
    }
    const ruta = L.polyline(puntos, {
      weight: 5,
      opacity: 0.92,
      color: "#087b2d"
    });
    ruta.addTo(this.capaRutas);
  }
  ajustarVista() {
    if (!this.mapa || !this.ubicaciones || this.ubicaciones.length === 0) {
      return;
    }
    const bounds = L.latLngBounds([]);
    for (const ubicacion of this.ubicaciones) {
      if (this.esCoordenadaValida(ubicacion.latitud, ubicacion.longitud)) {
        bounds.extend([ubicacion.latitud, ubicacion.longitud]);
      }
      if (ubicacion.ruta) {
        for (const punto of ubicacion.ruta) {
          if (this.esCoordenadaValida(punto.latitud, punto.longitud)) {
            bounds.extend([punto.latitud, punto.longitud]);
          }
        }
      }
    }
    if (bounds.isValid()) {
      this.mapa.fitBounds(bounds, {
        padding: [35, 35],
        maxZoom: 16
      });
    }
  }
  esCoordenadaValida(latitud, longitud) {
    return typeof latitud === "number" && typeof longitud === "number" && Number.isFinite(latitud) && Number.isFinite(longitud) && latitud >= -90 && latitud <= 90 && longitud >= -180 && longitud <= 180;
  }
  escaparHtml(valor) {
    return String(valor || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
};
_GpsLiveMapComponent.\u0275fac = function GpsLiveMapComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _GpsLiveMapComponent)();
};
_GpsLiveMapComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GpsLiveMapComponent, selectors: [["app-gps-live-map"]], viewQuery: function GpsLiveMapComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c0, 7);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.mapContainer = _t.first);
  }
}, inputs: { ubicaciones: "ubicaciones" }, features: [\u0275\u0275NgOnChangesFeature], decls: 5, vars: 0, consts: [["mapContainer", ""], [1, "gps-map-shell"], [1, "gps-map"], ["type", "button", 1, "btn-center-map", 3, "click"], ["name", "locate-outline"]], template: function GpsLiveMapComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "div", 2, 0);
    \u0275\u0275elementStart(3, "button", 3);
    \u0275\u0275listener("click", function GpsLiveMapComponent_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.centrarMapa());
    });
    \u0275\u0275element(4, "ion-icon", 4);
    \u0275\u0275elementEnd()();
  }
}, dependencies: [
  CommonModule,
  IonicModule,
  IonIcon
], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.gps-map-shell[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: clamp(280px, 44dvh, 390px);\n  min-height: 280px;\n  overflow: hidden;\n  border-radius: 18px;\n  background: #e5e7eb;\n}\n.gps-map[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n.btn-center-map[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  bottom: 14px;\n  z-index: 500;\n  width: 38px;\n  height: 38px;\n  border: none;\n  border-radius: 13px;\n  background: #ffffff;\n  color: #087b2d;\n  display: grid;\n  place-items: center;\n  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.2);\n}\n.btn-center-map[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n[_nghost-%COMP%]     .gps-marker {\n  background: transparent;\n  border: none;\n}\n[_nghost-%COMP%]     .gps-marker-pin {\n  width: 40px;\n  height: 40px;\n  border-radius: 999px;\n  background: #ffffff;\n  border: 4px solid #087b2d;\n  display: grid;\n  place-items: center;\n  box-shadow: 0 8px 16px rgba(15, 23, 42, 0.25);\n}\n[_nghost-%COMP%]     .gps-marker-pin span {\n  font-size: 14px;\n  font-weight: 1000;\n  color: #087b2d;\n}\n[_nghost-%COMP%]     .gps-marker-en_camino .gps-marker-worker {\n  border-color: #0b3d91;\n}\n[_nghost-%COMP%]     .gps-marker-en_camino .gps-marker-worker span {\n  color: #0b3d91;\n}\n[_nghost-%COMP%]     .gps-marker-sin_senal .gps-marker-worker {\n  border-color: #f59e0b;\n}\n[_nghost-%COMP%]     .gps-marker-sin_senal .gps-marker-worker span {\n  color: #f59e0b;\n}\n[_nghost-%COMP%]     .gps-marker-inactivo .gps-marker-worker {\n  border-color: #94a3b8;\n}\n[_nghost-%COMP%]     .gps-marker-inactivo .gps-marker-worker span {\n  color: #64748b;\n}\n[_nghost-%COMP%]     .gps-marker-destination {\n  background: #087b2d;\n  border-color: #ffffff;\n}\n[_nghost-%COMP%]     .gps-marker-destination span {\n  color: #ffffff;\n}\n/*# sourceMappingURL=gps-live-map.component.css.map */"] });
var GpsLiveMapComponent = _GpsLiveMapComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GpsLiveMapComponent, [{
    type: Component,
    args: [{ selector: "app-gps-live-map", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: '<!-- src/app/shared/componentes/gps-live-map/gps-live-map.component.html -->\n\n<div class="gps-map-shell">\n\n  <div\n    #mapContainer\n    class="gps-map"\n  ></div>\n\n  <button\n    type="button"\n    class="btn-center-map"\n    (click)="centrarMapa()"\n  >\n    <ion-icon name="locate-outline"></ion-icon>\n  </button>\n\n</div>', styles: ["/* src/app/shared/componentes/gps-live-map/gps-live-map.component.css */\n:host {\n  display: block;\n}\n.gps-map-shell {\n  position: relative;\n  width: 100%;\n  height: clamp(280px, 44dvh, 390px);\n  min-height: 280px;\n  overflow: hidden;\n  border-radius: 18px;\n  background: #e5e7eb;\n}\n.gps-map {\n  width: 100%;\n  height: 100%;\n}\n.btn-center-map {\n  position: absolute;\n  right: 12px;\n  bottom: 14px;\n  z-index: 500;\n  width: 38px;\n  height: 38px;\n  border: none;\n  border-radius: 13px;\n  background: #ffffff;\n  color: #087b2d;\n  display: grid;\n  place-items: center;\n  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.2);\n}\n.btn-center-map ion-icon {\n  font-size: 20px;\n}\n:host ::ng-deep .gps-marker {\n  background: transparent;\n  border: none;\n}\n:host ::ng-deep .gps-marker-pin {\n  width: 40px;\n  height: 40px;\n  border-radius: 999px;\n  background: #ffffff;\n  border: 4px solid #087b2d;\n  display: grid;\n  place-items: center;\n  box-shadow: 0 8px 16px rgba(15, 23, 42, 0.25);\n}\n:host ::ng-deep .gps-marker-pin span {\n  font-size: 14px;\n  font-weight: 1000;\n  color: #087b2d;\n}\n:host ::ng-deep .gps-marker-en_camino .gps-marker-worker {\n  border-color: #0b3d91;\n}\n:host ::ng-deep .gps-marker-en_camino .gps-marker-worker span {\n  color: #0b3d91;\n}\n:host ::ng-deep .gps-marker-sin_senal .gps-marker-worker {\n  border-color: #f59e0b;\n}\n:host ::ng-deep .gps-marker-sin_senal .gps-marker-worker span {\n  color: #f59e0b;\n}\n:host ::ng-deep .gps-marker-inactivo .gps-marker-worker {\n  border-color: #94a3b8;\n}\n:host ::ng-deep .gps-marker-inactivo .gps-marker-worker span {\n  color: #64748b;\n}\n:host ::ng-deep .gps-marker-destination {\n  background: #087b2d;\n  border-color: #ffffff;\n}\n:host ::ng-deep .gps-marker-destination span {\n  color: #ffffff;\n}\n/*# sourceMappingURL=gps-live-map.component.css.map */\n"] }]
  }], () => [], { mapContainer: [{
    type: ViewChild,
    args: ["mapContainer", { static: true }]
  }], ubicaciones: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GpsLiveMapComponent, { className: "GpsLiveMapComponent", filePath: "src/app/shared/componentes/gps-live-map/gps-live-map.component.ts", lineNumber: 33 });
})();

// src/app/paginas/administrador/gps-admin/gps-admin.page.ts
function GpsAdminPage_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "app-admin-header", 6);
    \u0275\u0275listener("menuClick", function GpsAdminPage_ng_container_1_Template_app_admin_header_menuClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirMenu());
    })("notificacionesClick", function GpsAdminPage_ng_container_1_Template_app_admin_header_notificacionesClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirNotificaciones());
    })("perfilClick", function GpsAdminPage_ng_container_1_Template_app_admin_header_perfilClick_1_listener() {
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
function GpsAdminPage_ng_container_3_ion_select_option_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-select-option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const empleado_r5 = ctx.$implicit;
    \u0275\u0275property("value", empleado_r5.uid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", empleado_r5.etiqueta, " ");
  }
}
function GpsAdminPage_ng_container_3_section_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 21)(1, "div", 22)(2, "div")(3, "span");
    \u0275\u0275text(4, "Ruta del empleado al trabajo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(9, "ion-icon", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 24)(11, "article");
    \u0275\u0275element(12, "ion-icon", 25);
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14, "Distancia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "strong");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "article");
    \u0275\u0275element(18, "ion-icon", 26);
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "Tiempo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "strong");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "article");
    \u0275\u0275element(24, "ion-icon", 25);
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26, "Velocidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "strong");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "button", 27);
    \u0275\u0275listener("click", function GpsAdminPage_ng_container_3_section_15_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r6);
      const vm_r7 = \u0275\u0275nextContext().ngIf;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirRutaGoogleMaps(vm_r7.empleadoPrincipal));
    });
    \u0275\u0275element(30, "ion-icon", 23);
    \u0275\u0275elementStart(31, "span");
    \u0275\u0275text(32, "Abrir ruta en Google Maps");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const vm_r7 = \u0275\u0275nextContext().ngIf;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", vm_r7.empleadoPrincipal.trabajoCodigo || "Sin trabajo vinculado", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", vm_r7.empleadoPrincipal.trabajoTitulo || vm_r7.empleadoPrincipal.direccionTexto || "Destino no registrado", " ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.obtenerDistanciaTexto(vm_r7.empleadoPrincipal));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.obtenerTiempoTexto(vm_r7.empleadoPrincipal));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.obtenerVelocidadTexto(vm_r7.empleadoPrincipal));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.tieneRuta(vm_r7.empleadoPrincipal));
  }
}
function GpsAdminPage_ng_container_3_section_16_img_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 33);
  }
  if (rf & 2) {
    const vm_r7 = \u0275\u0275nextContext(2).ngIf;
    \u0275\u0275property("src", vm_r7.empleadoPrincipal.empleadoFotoUrl, \u0275\u0275sanitizeUrl);
  }
}
function GpsAdminPage_ng_container_3_section_16_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "E");
    \u0275\u0275elementEnd();
  }
}
function GpsAdminPage_ng_container_3_section_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 28)(1, "div", 29);
    \u0275\u0275template(2, GpsAdminPage_ng_container_3_section_16_img_2_Template, 1, 1, "img", 30)(3, GpsAdminPage_ng_container_3_section_16_ng_template_3_Template, 2, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 31)(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 32);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "small");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const avatarDefault_r8 = \u0275\u0275reference(4);
    const vm_r7 = \u0275\u0275nextContext().ngIf;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", vm_r7.empleadoPrincipal.empleadoFotoUrl)("ngIfElse", avatarDefault_r8);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(vm_r7.empleadoPrincipal.empleadoNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(vm_r7.empleadoPrincipal.empleadoRol || "T\xE9cnico operativo");
    \u0275\u0275advance();
    \u0275\u0275classProp("warning", vm_r7.empleadoPrincipal.estado === "sin_senal")("inactive", vm_r7.empleadoPrincipal.estado === "inactivo");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.obtenerEstadoTexto(vm_r7.empleadoPrincipal), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \xDAltima actualizaci\xF3n: ", ctx_r1.obtenerHoraTexto(vm_r7.empleadoPrincipal), " ");
  }
}
function GpsAdminPage_ng_container_3_ng_template_17_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r7 = \u0275\u0275nextContext(2).ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", vm_r7.empleadoSeleccionado.nombreCompleto, " todav\xED\xADa no tiene ubicaci\xF3n GPS activa. ");
  }
}
function GpsAdminPage_ng_container_3_ng_template_17_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, " Los trabajadores aparecer\xE1n en el mapa cuando activen su ubicaci\xF3n desde el aplicativo. ");
    \u0275\u0275elementEnd();
  }
}
function GpsAdminPage_ng_container_3_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 34);
    \u0275\u0275element(1, "ion-icon", 35);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "Sin ubicaciones GPS");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, GpsAdminPage_ng_container_3_ng_template_17_p_4_Template, 2, 1, "p", 36)(5, GpsAdminPage_ng_container_3_ng_template_17_ng_template_5_Template, 2, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const textoGeneral_r9 = \u0275\u0275reference(6);
    const vm_r7 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", vm_r7.empleadoSeleccionado)("ngIfElse", textoGeneral_r9);
  }
}
function GpsAdminPage_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 7)(2, "section", 8)(3, "button", 9);
    \u0275\u0275listener("click", function GpsAdminPage_ng_container_3_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.volver());
    });
    \u0275\u0275element(4, "ion-icon", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "h2");
    \u0275\u0275text(7, "Monitoreo GPS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, "Seguimiento operativo del personal en campo.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "section", 11)(11, "ion-select", 12);
    \u0275\u0275listener("ionChange", function GpsAdminPage_ng_container_3_Template_ion_select_ionChange_11_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarEmpleado($event.detail.value));
    });
    \u0275\u0275template(12, GpsAdminPage_ng_container_3_ion_select_option_12_Template, 2, 2, "ion-select-option", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "section", 14);
    \u0275\u0275element(14, "app-gps-live-map", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, GpsAdminPage_ng_container_3_section_15_Template, 33, 6, "section", 16)(16, GpsAdminPage_ng_container_3_section_16_Template, 14, 10, "section", 17)(17, GpsAdminPage_ng_container_3_ng_template_17_Template, 7, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(19, "section", 18)(20, "div", 19)(21, "span");
    \u0275\u0275text(22, "Trabajadores");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "strong");
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 19)(26, "span");
    \u0275\u0275text(27, "Con GPS activo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "strong");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 19)(31, "span");
    \u0275\u0275text(32, "Sin se\xF1al");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "strong");
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const vm_r7 = ctx.ngIf;
    const sinGps_r10 = \u0275\u0275reference(18);
    \u0275\u0275advance(11);
    \u0275\u0275property("value", vm_r7.empleadoSeleccionadoUid);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", vm_r7.empleadosFiltro);
    \u0275\u0275advance(2);
    \u0275\u0275property("ubicaciones", vm_r7.ubicacionesFiltradas);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", vm_r7.empleadoPrincipal);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", vm_r7.empleadoPrincipal)("ngIfElse", sinGps_r10);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(vm_r7.empleadosFiltro.length - 1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(vm_r7.totalActivos);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(vm_r7.totalSinSenal);
  }
}
var _GpsAdminPage = class _GpsAdminPage {
  constructor() {
    this.navCtrl = inject(NavController);
    this.toastCtrl = inject(ToastController);
    this.cdr = inject(ChangeDetectorRef);
    this.dashboardAdminService = inject(DashboardAdminService);
    this.gpsService = inject(GpsService);
    this.adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
    this.vm$ = this.gpsService.vmAdmin$;
    addIcons({
      "arrow-back-outline": arrowBackOutline,
      "location-outline": locationOutline,
      "map-outline": mapOutline,
      "navigate-outline": navigateOutline,
      "time-outline": timeOutline
    });
  }
  ionViewWillEnter() {
    setTimeout(() => {
      this.cdr.detectChanges();
      window.dispatchEvent(new Event("resize"));
    }, 150);
  }
  cambiarEmpleado(empleadoUid) {
    this.gpsService.cambiarEmpleadoSeleccionado(empleadoUid);
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 200);
  }
  volver() {
    this.navCtrl.navigateRoot("/mas-admin", {
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
    this.navCtrl.navigateRoot("/notificaciones-admin", {
      animated: false,
      replaceUrl: true
    });
  }
  abrirPerfil() {
    this.mostrarToast("Configuraci\xF3n de perfil pr\xF3ximamente.");
  }
  obtenerHoraTexto(ubicacion) {
    if (!ubicacion?.actualizadoEn) {
      return "Sin actualizaci\xF3n";
    }
    let fecha = null;
    if (typeof ubicacion.actualizadoEn?.toDate === "function") {
      fecha = ubicacion.actualizadoEn.toDate();
    } else if (ubicacion.actualizadoEn instanceof Date) {
      fecha = ubicacion.actualizadoEn;
    }
    if (!fecha) {
      return "Actualizado recientemente";
    }
    return fecha.toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  }
  obtenerEstadoTexto(ubicacion) {
    const estado = ubicacion?.estado || "sin_senal";
    if (estado === "activo") {
      return "Activo";
    }
    if (estado === "en_camino") {
      return "En camino";
    }
    if (estado === "sin_senal") {
      return "Sin se\xF1al";
    }
    return "Inactivo";
  }
  tieneRuta(ubicacion) {
    return Array.isArray(ubicacion?.ruta) && ubicacion.ruta.length > 1;
  }
  obtenerDistanciaTexto(ubicacion) {
    const distancia = Number(ubicacion?.distanciaRestanteKm || 0);
    if (!distancia) {
      return "Sin distancia";
    }
    return `${distancia.toFixed(2)} km`;
  }
  obtenerTiempoTexto(ubicacion) {
    const minutos = Number(ubicacion?.tiempoEstimadoMin || 0);
    if (!minutos) {
      return "Sin ETA";
    }
    return `${minutos} min aprox.`;
  }
  obtenerVelocidadTexto(ubicacion) {
    const velocidad = Number(ubicacion?.velocidadKmh || 0);
    if (!velocidad) {
      return "Sin velocidad";
    }
    return `${velocidad.toFixed(1)} km/h`;
  }
  abrirRutaGoogleMaps(ubicacion) {
    if (!ubicacion) {
      this.mostrarToast("No hay ubicaci\xF3n GPS activa.");
      return;
    }
    const origenLatitud = Number(ubicacion.latitud || 0);
    const origenLongitud = Number(ubicacion.longitud || 0);
    const destino = this.obtenerDestinoRuta(ubicacion);
    if (!origenLatitud || !origenLongitud || !destino) {
      this.mostrarToast("No hay ruta disponible para abrir.");
      return;
    }
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origenLatitud},${origenLongitud}&destination=${destino.latitud},${destino.longitud}&travelmode=driving`;
    window.open(url, "_blank");
  }
  obtenerDestinoRuta(ubicacion) {
    if (!ubicacion.ruta || ubicacion.ruta.length < 2) {
      return null;
    }
    const destino = ubicacion.ruta[ubicacion.ruta.length - 1];
    const latitud = Number(destino.latitud || 0);
    const longitud = Number(destino.longitud || 0);
    if (!latitud || !longitud) {
      return null;
    }
    return {
      latitud,
      longitud
    };
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
_GpsAdminPage.\u0275fac = function GpsAdminPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _GpsAdminPage)();
};
_GpsAdminPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GpsAdminPage, selectors: [["app-gps-admin"]], decls: 6, vars: 7, consts: [["sinGps", ""], ["avatarDefault", ""], ["textoGeneral", ""], [1, "gps-root", 3, "fullscreen"], [4, "ngIf"], ["activo", "mas"], [3, "menuClick", "notificacionesClick", "perfilClick", "nombre", "rol", "fotoUrl", "notificaciones"], [1, "gps-container"], [1, "gps-title-row"], ["type", "button", 1, "btn-back", 3, "click"], ["name", "arrow-back-outline"], [1, "employee-select-card"], ["interface", "popover", 3, "ionChange", "value"], [3, "value", 4, "ngFor", "ngForOf"], [1, "map-card"], [3, "ubicaciones"], ["class", "route-card", 4, "ngIf"], ["class", "employee-card", 4, "ngIf", "ngIfElse"], [1, "gps-metrics"], [1, "metric-card"], [3, "value"], [1, "route-card"], [1, "route-header"], ["name", "map-outline"], [1, "route-metrics"], ["name", "navigate-outline"], ["name", "time-outline"], ["type", "button", 1, "btn-route", 3, "click", "disabled"], [1, "employee-card"], [1, "employee-avatar"], ["alt", "Empleado", 3, "src", 4, "ngIf", "ngIfElse"], [1, "employee-info"], [1, "status-pill"], ["alt", "Empleado", 3, "src"], [1, "empty-gps-card"], ["name", "location-outline"], [4, "ngIf", "ngIfElse"]], template: function GpsAdminPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 3);
    \u0275\u0275template(1, GpsAdminPage_ng_container_1_Template, 2, 4, "ng-container", 4);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275template(3, GpsAdminPage_ng_container_3_Template, 35, 9, "ng-container", 4);
    \u0275\u0275pipe(4, "async");
    \u0275\u0275element(5, "app-admin-bottom-nav", 5);
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
  IonSelect,
  IonSelectOption,
  SelectValueAccessorDirective,
  AdminHeaderComponent,
  AdminBottomNavComponent,
  GpsLiveMapComponent,
  AsyncPipe
], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\nion-content.gps-root[_ngcontent-%COMP%] {\n  --background: var(--color-page-outside);\n}\n.gps-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: var(--app-width);\n  min-height: 100dvh;\n  margin: 0 auto;\n  padding: 10px 12px calc(92px + env(safe-area-inset-bottom));\n  background: var(--color-background);\n}\n.gps-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n.btn-back[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: #ffffff;\n  color: var(--color-primary);\n  display: grid;\n  place-items: center;\n  box-shadow: var(--shadow-card);\n  flex-shrink: 0;\n}\n.btn-back[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.gps-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n.gps-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 2px 0 0;\n  font-size: 10.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.employee-select-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 13px;\n  box-shadow: var(--shadow-card);\n  padding: 2px 10px;\n  margin-bottom: 10px;\n}\n.employee-select-card[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 42px;\n  font-size: 12px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.map-card[_ngcontent-%COMP%] {\n  overflow: hidden;\n  border-radius: 18px;\n  background: #e5e7eb;\n  border: 1px solid var(--color-border);\n  box-shadow: var(--shadow-card);\n}\n.employee-card[_ngcontent-%COMP%] {\n  margin: 10px 0 12px;\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  box-shadow: var(--shadow-card);\n  padding: 12px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.employee-avatar[_ngcontent-%COMP%] {\n  width: 58px;\n  height: 58px;\n  border-radius: 18px;\n  background: var(--color-primary-soft);\n  border: 1px solid #d7e4ff;\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.employee-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.employee-avatar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 32px;\n}\n.employee-info[_ngcontent-%COMP%] {\n  min-width: 0;\n  flex: 1;\n}\n.employee-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n.employee-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 2px 0 6px;\n  font-size: 10.5px;\n  font-weight: 700;\n  color: var(--color-text-muted);\n}\n.employee-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 5px;\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.status-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  min-height: 22px;\n  padding: 0 10px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 10px;\n  font-weight: 900;\n  text-transform: capitalize;\n}\n.status-pill.warning[_ngcontent-%COMP%] {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.status-pill.inactive[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  color: #64748b;\n}\n.empty-gps-card[_ngcontent-%COMP%] {\n  margin: 10px 0 12px;\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  box-shadow: var(--shadow-card);\n  padding: 18px;\n  text-align: center;\n}\n.empty-gps-card[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: var(--color-primary);\n}\n.empty-gps-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 8px 0 4px;\n  font-size: 13px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n.empty-gps-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  line-height: 1.45;\n}\n.gps-metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 9px;\n}\n.metric-card[_ngcontent-%COMP%] {\n  min-height: 70px;\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 14px;\n  box-shadow: var(--shadow-card);\n  padding: 10px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.metric-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 9.5px;\n  font-weight: 800;\n  color: var(--color-primary);\n}\n.metric-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  font-size: 15px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n@media (max-width: 360px) {\n  .gps-metrics[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.route-card[_ngcontent-%COMP%] {\n  margin: 10px 0 12px;\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  box-shadow: var(--shadow-card);\n  padding: 12px;\n}\n.route-header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 42px;\n  gap: 10px;\n  align-items: center;\n}\n.route-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  font-weight: 900;\n  color: var(--color-primary);\n  margin-bottom: 4px;\n}\n.route-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13.5px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n.route-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 10.5px;\n  font-weight: 700;\n  color: var(--color-text-muted);\n  line-height: 1.35;\n}\n.route-header[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  padding: 9px;\n  box-sizing: border-box;\n}\n.route-metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin-top: 12px;\n}\n.route-metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  min-height: 68px;\n  border-radius: 14px;\n  background: #f8fafc;\n  border: 1px solid #eef2f7;\n  padding: 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.route-metrics[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n  color: var(--color-primary);\n}\n.route-metrics[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-weight: 800;\n  color: var(--color-text-muted);\n}\n.route-metrics[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n.btn-route[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 40px;\n  margin-top: 12px;\n  border: none;\n  border-radius: 13px;\n  background: var(--color-primary);\n  color: #ffffff;\n  font-size: 12px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n}\n.btn-route[_ngcontent-%COMP%]:disabled {\n  background: #cbd5e1;\n  color: #64748b;\n}\n/*# sourceMappingURL=gps-admin.page.css.map */"] });
var GpsAdminPage = _GpsAdminPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GpsAdminPage, [{
    type: Component,
    args: [{ selector: "app-gps-admin", standalone: true, imports: [
      CommonModule,
      IonicModule,
      AdminHeaderComponent,
      AdminBottomNavComponent,
      GpsLiveMapComponent
    ], template: `<!-- src/app/paginas/administrador/gps-admin/gps-admin.page.html -->

<ion-content [fullscreen]="true" class="gps-root">

  <ng-container *ngIf="adminVm$ | async as adminVm">
    <app-admin-header
      [nombre]="adminVm.administrador.nombres || adminVm.administrador.usuario || adminVm.administrador.correo || 'Administrador'"
      [rol]="'Administrador'"
      [fotoUrl]="adminVm.administrador.fotoUrl || ''"
      [notificaciones]="adminVm.resumen.notificacionesNoLeidas || 0"
      (menuClick)="abrirMenu()"
      (notificacionesClick)="abrirNotificaciones()"
      (perfilClick)="abrirPerfil()"
    ></app-admin-header>
  </ng-container>

  <ng-container *ngIf="vm$ | async as vm">

    <div class="gps-container">

      <section class="gps-title-row">
        <button
          type="button"
          class="btn-back"
          (click)="volver()"
        >
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>

        <div>
          <h2>Monitoreo GPS</h2>
          <p>Seguimiento operativo del personal en campo.</p>
        </div>
      </section>

      <section class="employee-select-card">
        <ion-select
          interface="popover"
          [value]="vm.empleadoSeleccionadoUid"
          (ionChange)="cambiarEmpleado($event.detail.value)"
        >
          <ion-select-option
            *ngFor="let empleado of vm.empleadosFiltro"
            [value]="empleado.uid"
          >
            {{ empleado.etiqueta }}
          </ion-select-option>
        </ion-select>
      </section>

      <section class="map-card">
        <app-gps-live-map
          [ubicaciones]="vm.ubicacionesFiltradas"
        ></app-gps-live-map>
      </section>

      <section
        class="route-card"
        *ngIf="vm.empleadoPrincipal"
      >
        <div class="route-header">
          <div>
            <span>Ruta del empleado al trabajo</span>
            <h3>
              {{ vm.empleadoPrincipal.trabajoCodigo || 'Sin trabajo vinculado' }}
            </h3>
            <p>
              {{ vm.empleadoPrincipal.trabajoTitulo || vm.empleadoPrincipal.direccionTexto || 'Destino no registrado' }}
            </p>
          </div>

          <ion-icon name="map-outline"></ion-icon>
        </div>

        <div class="route-metrics">

          <article>
            <ion-icon name="navigate-outline"></ion-icon>
            <span>Distancia</span>
            <strong>{{ obtenerDistanciaTexto(vm.empleadoPrincipal) }}</strong>
          </article>

          <article>
            <ion-icon name="time-outline"></ion-icon>
            <span>Tiempo</span>
            <strong>{{ obtenerTiempoTexto(vm.empleadoPrincipal) }}</strong>
          </article>

          <article>
            <ion-icon name="navigate-outline"></ion-icon>
            <span>Velocidad</span>
            <strong>{{ obtenerVelocidadTexto(vm.empleadoPrincipal) }}</strong>
          </article>

        </div>

        <button
          type="button"
          class="btn-route"
          [disabled]="!tieneRuta(vm.empleadoPrincipal)"
          (click)="abrirRutaGoogleMaps(vm.empleadoPrincipal)"
        >
          <ion-icon name="map-outline"></ion-icon>
          <span>Abrir ruta en Google Maps</span>
        </button>

      </section>

      <section
        class="employee-card"
        *ngIf="vm.empleadoPrincipal; else sinGps"
      >
        <div class="employee-avatar">
          <img
            *ngIf="vm.empleadoPrincipal.empleadoFotoUrl; else avatarDefault"
            [src]="vm.empleadoPrincipal.empleadoFotoUrl"
            alt="Empleado"
          />

          <ng-template #avatarDefault>
            <span>E</span>
          </ng-template>
        </div>

        <div class="employee-info">
          <h3>{{ vm.empleadoPrincipal.empleadoNombre }}</h3>
          <p>{{ vm.empleadoPrincipal.empleadoRol || 'T\xE9cnico operativo' }}</p>

          <span
            class="status-pill"
            [class.warning]="vm.empleadoPrincipal.estado === 'sin_senal'"
            [class.inactive]="vm.empleadoPrincipal.estado === 'inactivo'"
          >
            {{ obtenerEstadoTexto(vm.empleadoPrincipal) }}
          </span>

          <small>
            \xDAltima actualizaci\xF3n:
            {{ obtenerHoraTexto(vm.empleadoPrincipal) }}
          </small>
        </div>
      </section>

      <ng-template #sinGps>
        <section class="empty-gps-card">
          <ion-icon name="location-outline"></ion-icon>

          <h3>Sin ubicaciones GPS</h3>

          <p *ngIf="vm.empleadoSeleccionado; else textoGeneral">
            {{ vm.empleadoSeleccionado.nombreCompleto }} todav\xED\xADa no tiene ubicaci\xF3n GPS activa.
          </p>

          <ng-template #textoGeneral>
            <p>
              Los trabajadores aparecer\xE1n en el mapa cuando activen su ubicaci\xF3n desde el aplicativo.
            </p>
          </ng-template>
        </section>
      </ng-template>

      <section class="gps-metrics">

        <div class="metric-card">
          <span>Trabajadores</span>
          <strong>{{ vm.empleadosFiltro.length - 1 }}</strong>
        </div>

        <div class="metric-card">
          <span>Con GPS activo</span>
          <strong>{{ vm.totalActivos }}</strong>
        </div>

        <div class="metric-card">
          <span>Sin se\xF1al</span>
          <strong>{{ vm.totalSinSenal }}</strong>
        </div>

      </section>

    </div>

  </ng-container>

  <app-admin-bottom-nav activo="mas"></app-admin-bottom-nav>

</ion-content>


`, styles: ["/* src/app/paginas/administrador/gps-admin/gps-admin.page.css */\n:host {\n  display: block;\n}\nion-content.gps-root {\n  --background: var(--color-page-outside);\n}\n.gps-container {\n  width: 100%;\n  max-width: var(--app-width);\n  min-height: 100dvh;\n  margin: 0 auto;\n  padding: 10px 12px calc(92px + env(safe-area-inset-bottom));\n  background: var(--color-background);\n}\n.gps-title-row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n.btn-back {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: #ffffff;\n  color: var(--color-primary);\n  display: grid;\n  place-items: center;\n  box-shadow: var(--shadow-card);\n  flex-shrink: 0;\n}\n.btn-back ion-icon {\n  font-size: 20px;\n}\n.gps-title-row h2 {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n.gps-title-row p {\n  margin: 2px 0 0;\n  font-size: 10.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.employee-select-card {\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 13px;\n  box-shadow: var(--shadow-card);\n  padding: 2px 10px;\n  margin-bottom: 10px;\n}\n.employee-select-card ion-select {\n  width: 100%;\n  min-height: 42px;\n  font-size: 12px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.map-card {\n  overflow: hidden;\n  border-radius: 18px;\n  background: #e5e7eb;\n  border: 1px solid var(--color-border);\n  box-shadow: var(--shadow-card);\n}\n.employee-card {\n  margin: 10px 0 12px;\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  box-shadow: var(--shadow-card);\n  padding: 12px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.employee-avatar {\n  width: 58px;\n  height: 58px;\n  border-radius: 18px;\n  background: var(--color-primary-soft);\n  border: 1px solid #d7e4ff;\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.employee-avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.employee-avatar span {\n  font-size: 32px;\n}\n.employee-info {\n  min-width: 0;\n  flex: 1;\n}\n.employee-info h3 {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n.employee-info p {\n  margin: 2px 0 6px;\n  font-size: 10.5px;\n  font-weight: 700;\n  color: var(--color-text-muted);\n}\n.employee-info small {\n  display: block;\n  margin-top: 5px;\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.status-pill {\n  display: inline-flex;\n  align-items: center;\n  min-height: 22px;\n  padding: 0 10px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 10px;\n  font-weight: 900;\n  text-transform: capitalize;\n}\n.status-pill.warning {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.status-pill.inactive {\n  background: #f1f5f9;\n  color: #64748b;\n}\n.empty-gps-card {\n  margin: 10px 0 12px;\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  box-shadow: var(--shadow-card);\n  padding: 18px;\n  text-align: center;\n}\n.empty-gps-card ion-icon {\n  font-size: 28px;\n  color: var(--color-primary);\n}\n.empty-gps-card h3 {\n  margin: 8px 0 4px;\n  font-size: 13px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n.empty-gps-card p {\n  margin: 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  line-height: 1.45;\n}\n.gps-metrics {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 9px;\n}\n.metric-card {\n  min-height: 70px;\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 14px;\n  box-shadow: var(--shadow-card);\n  padding: 10px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.metric-card span {\n  font-size: 9.5px;\n  font-weight: 800;\n  color: var(--color-primary);\n}\n.metric-card strong {\n  margin-top: 6px;\n  font-size: 15px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n@media (max-width: 360px) {\n  .gps-metrics {\n    grid-template-columns: 1fr;\n  }\n}\n.route-card {\n  margin: 10px 0 12px;\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  box-shadow: var(--shadow-card);\n  padding: 12px;\n}\n.route-header {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 42px;\n  gap: 10px;\n  align-items: center;\n}\n.route-header span {\n  display: block;\n  font-size: 10px;\n  font-weight: 900;\n  color: var(--color-primary);\n  margin-bottom: 4px;\n}\n.route-header h3 {\n  margin: 0;\n  font-size: 13.5px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n.route-header p {\n  margin: 4px 0 0;\n  font-size: 10.5px;\n  font-weight: 700;\n  color: var(--color-text-muted);\n  line-height: 1.35;\n}\n.route-header ion-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  padding: 9px;\n  box-sizing: border-box;\n}\n.route-metrics {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin-top: 12px;\n}\n.route-metrics article {\n  min-height: 68px;\n  border-radius: 14px;\n  background: #f8fafc;\n  border: 1px solid #eef2f7;\n  padding: 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.route-metrics ion-icon {\n  font-size: 17px;\n  color: var(--color-primary);\n}\n.route-metrics span {\n  font-size: 9px;\n  font-weight: 800;\n  color: var(--color-text-muted);\n}\n.route-metrics strong {\n  font-size: 11px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n.btn-route {\n  width: 100%;\n  min-height: 40px;\n  margin-top: 12px;\n  border: none;\n  border-radius: 13px;\n  background: var(--color-primary);\n  color: #ffffff;\n  font-size: 12px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n}\n.btn-route:disabled {\n  background: #cbd5e1;\n  color: #64748b;\n}\n/*# sourceMappingURL=gps-admin.page.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GpsAdminPage, { className: "GpsAdminPage", filePath: "src/app/paginas/administrador/gps-admin/gps-admin.page.ts", lineNumber: 43 });
})();
export {
  GpsAdminPage
};
//# sourceMappingURL=gps-admin.page-GOF32YGX.js.map
