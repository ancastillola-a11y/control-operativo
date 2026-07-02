import {
  AdminBottomNavComponent,
  AdminHeaderComponent,
  DashboardAdminService
} from "./chunk-CWBZAVOG.js";
import {
  AlertController,
  IonContent,
  IonIcon,
  IonItem,
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
import "./chunk-XEVVVGO7.js";
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from "./chunk-NMRAWXHA.js";
import {
  ActivatedRoute,
  AsyncPipe,
  BehaviorSubject,
  ChangeDetectorRef,
  CommonModule,
  Component,
  EventEmitter,
  Injectable,
  Input,
  NavController,
  NgClass,
  NgForOf,
  NgIf,
  Output,
  inject,
  map,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
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
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
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
  __spreadValues
} from "./chunk-Q3N56TRI.js";

// src/app/dao/codigo-seguridad.dao.ts
var _CodigoSeguridadDao = class _CodigoSeguridadDao {
  constructor() {
    this.firestore = inject(Firestore);
  }
  escucharTrabajos() {
    const ref = collection(this.firestore, "trabajos");
    const q = query(ref, orderBy("createdAt", "desc"));
    return collectionData(q, { idField: "uid" }).pipe(map((items) => {
      return items.map((data) => {
        const uid = String(data.uid || "").trim();
        return this.mapearTrabajo(uid, data);
      }).filter((trabajo) => !trabajo.eliminado);
    }));
  }
  actualizarCodigo(trabajoUid, tipo, codigo) {
    return __async(this, null, function* () {
      const ref = doc(this.firestore, "trabajos", trabajoUid);
      if (tipo === "cliente") {
        yield updateDoc(ref, {
          codigoCliente: codigo,
          codigoClienteActualizadoAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        return;
      }
      yield updateDoc(ref, {
        codigoDevolucion: codigo,
        codigoDevolucionActualizadoAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    });
  }
  registrarHistorial(data) {
    return __async(this, null, function* () {
      const ref = collection(this.firestore, "historial_actividades");
      yield addDoc(ref, {
        modulo: "SM-1.5 Generaci\xC3\xB3n de c\xC3\xB3digos de seguridad",
        accion: data.tipo === "cliente" ? "regenerar_codigo_cliente" : "regenerar_codigo_devolucion",
        descripcion: data.descripcion,
        trabajoUid: data.trabajoUid,
        trabajoId: data.trabajoId,
        tipoCodigo: data.tipo,
        codigoNuevo: data.codigoNuevo,
        createdAt: serverTimestamp()
      });
    });
  }
  mapearTrabajo(uid, data) {
    const codigoCliente = String(data.codigoCliente || "").trim();
    const codigoDevolucion = String(data.codigoDevolucion || "").trim();
    const empleadosAsignados = Array.isArray(data.empleadosAsignados) ? data.empleadosAsignados : [];
    const empleadosTexto = empleadosAsignados.length > 0 ? `${empleadosAsignados.length} empleado(s)` : "Sin empleados";
    const fechaProgramada = String(data.fechaProgramada || "").trim();
    const horaProgramada = String(data.horaProgramada || "").trim();
    return {
      uid,
      id: String(data.id || data.codigo || uid).trim(),
      clienteNombre: String(data.clienteNombre || "Sin cliente").trim(),
      clienteTelefono: String(data.clienteTelefono || "").trim(),
      direccion: String(data.direccion || "").trim(),
      tipoTrabajo: String(data.tipoTrabajo || "Trabajo").trim(),
      fechaProgramada,
      horaProgramada,
      fechaHoraTexto: this.formatearFechaHora(fechaProgramada, horaProgramada),
      estado: data.estado || "pendiente",
      estadoTexto: this.obtenerEstadoTexto(data.estado || "pendiente"),
      estadoClase: this.obtenerEstadoClase(data.estado || "pendiente"),
      codigoCliente: codigoCliente || "------",
      codigoDevolucion: codigoDevolucion || "------",
      empleadosTexto,
      eliminado: Boolean(data.eliminado)
    };
  }
  formatearFechaHora(fecha, hora) {
    if (!fecha && !hora) {
      return "Sin programaci\xC3\xB3n";
    }
    if (fecha && hora) {
      return `${fecha} \xC2\xB7 ${hora}`;
    }
    return fecha || hora;
  }
  obtenerEstadoTexto(estado) {
    const normalizado = String(estado || "").trim();
    if (normalizado === "pendiente") {
      return "Pendiente";
    }
    if (normalizado === "enCamino") {
      return "En camino";
    }
    if (normalizado === "enProceso") {
      return "En proceso";
    }
    if (normalizado === "finalizado") {
      return "Finalizado";
    }
    if (normalizado === "cancelado") {
      return "Cancelado";
    }
    if (normalizado === "devolucionRealizada") {
      return "Devoluci\xC3\xB3n realizada";
    }
    return "Pendiente";
  }
  obtenerEstadoClase(estado) {
    const normalizado = String(estado || "").trim();
    if (normalizado === "pendiente") {
      return "pendiente";
    }
    if (normalizado === "enCamino") {
      return "camino";
    }
    if (normalizado === "enProceso") {
      return "proceso";
    }
    if (normalizado === "finalizado") {
      return "finalizado";
    }
    if (normalizado === "cancelado") {
      return "cancelado";
    }
    if (normalizado === "devolucionRealizada") {
      return "devolucion";
    }
    return "pendiente";
  }
};
_CodigoSeguridadDao.\u0275fac = function CodigoSeguridadDao_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CodigoSeguridadDao)();
};
_CodigoSeguridadDao.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CodigoSeguridadDao, factory: _CodigoSeguridadDao.\u0275fac, providedIn: "root" });
var CodigoSeguridadDao = _CodigoSeguridadDao;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CodigoSeguridadDao, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/procesos/codigo-seguridad.service.ts
var _CodigoSeguridadService = class _CodigoSeguridadService {
  constructor() {
    this.dao = inject(CodigoSeguridadDao);
    this.vmSubject = new BehaviorSubject({
      cargando: false,
      trabajos: [],
      trabajoSeleccionado: null,
      totalTrabajos: 0,
      totalConCodigoCliente: 0,
      totalConCodigoDevolucion: 0,
      tabActivo: "cliente",
      mensajeVacio: "No hay trabajos registrados para generar c\xC3\xB3digos."
    });
    this.vm$ = this.vmSubject.asObservable();
  }
  obtenerEstadoActual() {
    return this.vmSubject.value;
  }
  cargarTrabajos(trabajoUidInicial) {
    this.actualizarVM({
      cargando: true
    });
    if (this.trabajosSub) {
      this.trabajosSub.unsubscribe();
      this.trabajosSub = void 0;
    }
    this.trabajosSub = this.dao.escucharTrabajos().subscribe({
      next: (trabajos) => {
        const estadoActual = this.vmSubject.value;
        let seleccionado = null;
        if (trabajoUidInicial) {
          seleccionado = trabajos.find((trabajo) => trabajo.uid === trabajoUidInicial) || null;
        }
        if (!seleccionado && estadoActual.trabajoSeleccionado) {
          seleccionado = trabajos.find((trabajo) => trabajo.uid === estadoActual.trabajoSeleccionado?.uid) || null;
        }
        if (!seleccionado) {
          seleccionado = trabajos[0] || null;
        }
        this.actualizarVM({
          cargando: false,
          trabajos,
          trabajoSeleccionado: seleccionado,
          totalTrabajos: trabajos.length,
          totalConCodigoCliente: trabajos.filter((trabajo) => this.codigoValido(trabajo.codigoCliente)).length,
          totalConCodigoDevolucion: trabajos.filter((trabajo) => this.codigoValido(trabajo.codigoDevolucion)).length,
          mensajeVacio: trabajos.length === 0 ? "No hay trabajos registrados para generar c\xC3\xB3digos." : ""
        });
      },
      error: (error) => {
        console.error(error);
        this.actualizarVM({
          cargando: false,
          trabajos: [],
          trabajoSeleccionado: null,
          totalTrabajos: 0,
          totalConCodigoCliente: 0,
          totalConCodigoDevolucion: 0,
          mensajeVacio: "No se pudieron cargar los trabajos."
        });
      }
    });
  }
  detenerEscucha() {
    if (this.trabajosSub) {
      this.trabajosSub.unsubscribe();
      this.trabajosSub = void 0;
    }
  }
  seleccionarTrabajo(uid) {
    const estado = this.vmSubject.value;
    const seleccionado = estado.trabajos.find((trabajo) => trabajo.uid === uid) || null;
    this.actualizarVM({
      trabajoSeleccionado: seleccionado
    });
  }
  cambiarTab(tab) {
    this.actualizarVM({
      tabActivo: tab
    });
  }
  regenerarCodigoCliente() {
    return __async(this, null, function* () {
      return this.regenerarCodigo("cliente");
    });
  }
  regenerarCodigoDevolucion() {
    return __async(this, null, function* () {
      return this.regenerarCodigo("devolucion");
    });
  }
  regenerarCodigo(tipo) {
    return __async(this, null, function* () {
      const estado = this.vmSubject.value;
      const trabajo = estado.trabajoSeleccionado;
      if (!trabajo) {
        throw new Error("trabajo-no-seleccionado");
      }
      if (trabajo.eliminado) {
        throw new Error("trabajo-eliminado");
      }
      const codigoNuevo = this.generarCodigo();
      yield this.dao.actualizarCodigo(trabajo.uid, tipo, codigoNuevo);
      yield this.dao.registrarHistorial({
        trabajoUid: trabajo.uid,
        trabajoId: trabajo.id,
        tipo,
        codigoNuevo,
        descripcion: tipo === "cliente" ? `Se regener\xC3\xB3 el c\xC3\xB3digo de validaci\xC3\xB3n del cliente para el trabajo ${trabajo.id}.` : `Se regener\xC3\xB3 el c\xC3\xB3digo de devoluci\xC3\xB3n de materiales para el trabajo ${trabajo.id}.`
      });
      const trabajosActualizados = estado.trabajos.map((item) => {
        if (item.uid !== trabajo.uid) {
          return item;
        }
        if (tipo === "cliente") {
          return __spreadProps(__spreadValues({}, item), {
            codigoCliente: codigoNuevo
          });
        }
        return __spreadProps(__spreadValues({}, item), {
          codigoDevolucion: codigoNuevo
        });
      });
      const trabajoActualizado = trabajosActualizados.find((item) => item.uid === trabajo.uid) || null;
      this.actualizarVM({
        trabajos: trabajosActualizados,
        trabajoSeleccionado: trabajoActualizado,
        totalConCodigoCliente: trabajosActualizados.filter((item) => this.codigoValido(item.codigoCliente)).length,
        totalConCodigoDevolucion: trabajosActualizados.filter((item) => this.codigoValido(item.codigoDevolucion)).length
      });
      return codigoNuevo;
    });
  }
  generarCodigo() {
    return String(Math.floor(1e5 + Math.random() * 9e5));
  }
  codigoValido(codigo) {
    const limpio = String(codigo || "").trim();
    return /^\d{6}$/.test(limpio);
  }
  actualizarVM(cambios) {
    this.vmSubject.next(__spreadValues(__spreadValues({}, this.vmSubject.value), cambios));
  }
};
_CodigoSeguridadService.\u0275fac = function CodigoSeguridadService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CodigoSeguridadService)();
};
_CodigoSeguridadService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CodigoSeguridadService, factory: _CodigoSeguridadService.\u0275fac, providedIn: "root" });
var CodigoSeguridadService = _CodigoSeguridadService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CodigoSeguridadService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/shared/componentes/codigo-seguridad-card/codigo-seguridad-card.component.ts
function CodigoSeguridadCardComponent_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const digito_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", digito_r1, " ");
  }
}
var _CodigoSeguridadCardComponent = class _CodigoSeguridadCardComponent {
  constructor() {
    this.tipo = "cliente";
    this.titulo = "";
    this.descripcion = "";
    this.codigo = "------";
    this.icono = "shield-checkmark-outline";
    this.color = "primary";
    this.copiar = new EventEmitter();
    this.generarNuevo = new EventEmitter();
  }
  get codigoSeparado() {
    return String(this.codigo || "------").padEnd(6, "-").slice(0, 6).split("");
  }
  copiarCodigo() {
    this.copiar.emit();
  }
  generar() {
    this.generarNuevo.emit();
  }
};
_CodigoSeguridadCardComponent.\u0275fac = function CodigoSeguridadCardComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CodigoSeguridadCardComponent)();
};
_CodigoSeguridadCardComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CodigoSeguridadCardComponent, selectors: [["app-codigo-seguridad-card"]], inputs: { tipo: "tipo", titulo: "titulo", descripcion: "descripcion", codigo: "codigo", icono: "icono", color: "color" }, outputs: { copiar: "copiar", generarNuevo: "generarNuevo" }, decls: 20, vars: 5, consts: [[1, "codigo-card", 3, "ngClass"], [1, "codigo-header"], [1, "codigo-icon"], [3, "name"], [1, "codigo-info"], [1, "codigo-digits"], [4, "ngFor", "ngForOf"], [1, "codigo-actions"], ["type", "button", 1, "btn-copy", 3, "click"], ["name", "copy-outline"], ["type", "button", 1, "btn-generate", 3, "click"], ["name", "refresh-outline"]], template: function CodigoSeguridadCardComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2);
    \u0275\u0275element(3, "ion-icon", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 4)(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 5);
    \u0275\u0275template(10, CodigoSeguridadCardComponent_span_10_Template, 2, 1, "span", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 7)(12, "button", 8);
    \u0275\u0275listener("click", function CodigoSeguridadCardComponent_Template_button_click_12_listener() {
      return ctx.copiarCodigo();
    });
    \u0275\u0275element(13, "ion-icon", 9);
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "Copiar c\xF3digo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 10);
    \u0275\u0275listener("click", function CodigoSeguridadCardComponent_Template_button_click_16_listener() {
      return ctx.generar();
    });
    \u0275\u0275element(17, "ion-icon", 11);
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19, "Generar nuevo c\xF3digo");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275property("ngClass", ctx.color);
    \u0275\u0275advance(3);
    \u0275\u0275property("name", ctx.icono);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.descripcion);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx.codigoSeparado);
  }
}, dependencies: [CommonModule, NgClass, NgForOf, IonicModule, IonIcon], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  font-family: var(--font-main);\n}\n.codigo-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 18px;\n  padding: 15px;\n  box-shadow: var(--shadow-card);\n}\n.codigo-header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 52px 1fr;\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 18px;\n}\n.codigo-icon[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 16px;\n  display: grid;\n  place-items: center;\n}\n.codigo-card.primary[_ngcontent-%COMP%]   .codigo-icon[_ngcontent-%COMP%] {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.codigo-card.warning[_ngcontent-%COMP%]   .codigo-icon[_ngcontent-%COMP%] {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.codigo-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 27px;\n}\n.codigo-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13.5px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.codigo-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  line-height: 1.35;\n}\n.codigo-digits[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  gap: 7px;\n  margin-bottom: 16px;\n}\n.codigo-digits[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  height: 42px;\n  border-radius: 11px;\n  background: #f8fafc;\n  border: 1px solid #dbe3ef;\n  color: var(--color-primary);\n  font-size: 24px;\n  font-weight: 900;\n  display: grid;\n  place-items: center;\n  line-height: 1;\n}\n.codigo-card.warning[_ngcontent-%COMP%]   .codigo-digits[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--color-warning);\n}\n.codigo-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.codigo-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 40px;\n  border: none;\n  border-radius: 12px;\n  font-family: var(--font-main);\n  font-size: 12px;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n}\n.btn-copy[_ngcontent-%COMP%] {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.btn-generate[_ngcontent-%COMP%] {\n  background: #ffffff;\n  color: var(--color-primary);\n  border: 1px solid #dbe8ff !important;\n}\n.codigo-card.warning[_ngcontent-%COMP%]   .btn-copy[_ngcontent-%COMP%] {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.codigo-card.warning[_ngcontent-%COMP%]   .btn-generate[_ngcontent-%COMP%] {\n  color: var(--color-warning);\n  border-color: #fdecc8 !important;\n}\n.codigo-actions[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n/*# sourceMappingURL=codigo-seguridad-card.component.css.map */"] });
var CodigoSeguridadCardComponent = _CodigoSeguridadCardComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CodigoSeguridadCardComponent, [{
    type: Component,
    args: [{ selector: "app-codigo-seguridad-card", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: '<!-- src/app/shared/componentes/codigo-seguridad-card/codigo-seguridad-card.component.html -->\n\n<section\n  class="codigo-card"\n  [ngClass]="color"\n>\n\n  <div class="codigo-header">\n\n    <div class="codigo-icon">\n      <ion-icon [name]="icono"></ion-icon>\n    </div>\n\n    <div class="codigo-info">\n      <h3>{{ titulo }}</h3>\n      <p>{{ descripcion }}</p>\n    </div>\n\n  </div>\n\n  <div class="codigo-digits">\n    <span *ngFor="let digito of codigoSeparado">\n      {{ digito }}\n    </span>\n  </div>\n\n  <div class="codigo-actions">\n\n    <button\n      type="button"\n      class="btn-copy"\n      (click)="copiarCodigo()"\n    >\n      <ion-icon name="copy-outline"></ion-icon>\n      <span>Copiar c\xF3digo</span>\n    </button>\n\n    <button\n      type="button"\n      class="btn-generate"\n      (click)="generar()"\n    >\n      <ion-icon name="refresh-outline"></ion-icon>\n      <span>Generar nuevo c\xF3digo</span>\n    </button>\n\n  </div>\n\n</section>', styles: ["/* src/app/shared/componentes/codigo-seguridad-card/codigo-seguridad-card.component.css */\n:host {\n  display: block;\n  font-family: var(--font-main);\n}\n.codigo-card {\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 18px;\n  padding: 15px;\n  box-shadow: var(--shadow-card);\n}\n.codigo-header {\n  display: grid;\n  grid-template-columns: 52px 1fr;\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 18px;\n}\n.codigo-icon {\n  width: 52px;\n  height: 52px;\n  border-radius: 16px;\n  display: grid;\n  place-items: center;\n}\n.codigo-card.primary .codigo-icon {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.codigo-card.warning .codigo-icon {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.codigo-icon ion-icon {\n  font-size: 27px;\n}\n.codigo-info h3 {\n  margin: 0;\n  font-size: 13.5px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.codigo-info p {\n  margin: 4px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  line-height: 1.35;\n}\n.codigo-digits {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  gap: 7px;\n  margin-bottom: 16px;\n}\n.codigo-digits span {\n  height: 42px;\n  border-radius: 11px;\n  background: #f8fafc;\n  border: 1px solid #dbe3ef;\n  color: var(--color-primary);\n  font-size: 24px;\n  font-weight: 900;\n  display: grid;\n  place-items: center;\n  line-height: 1;\n}\n.codigo-card.warning .codigo-digits span {\n  color: var(--color-warning);\n}\n.codigo-actions {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.codigo-actions button {\n  width: 100%;\n  height: 40px;\n  border: none;\n  border-radius: 12px;\n  font-family: var(--font-main);\n  font-size: 12px;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n}\n.btn-copy {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.btn-generate {\n  background: #ffffff;\n  color: var(--color-primary);\n  border: 1px solid #dbe8ff !important;\n}\n.codigo-card.warning .btn-copy {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.codigo-card.warning .btn-generate {\n  color: var(--color-warning);\n  border-color: #fdecc8 !important;\n}\n.codigo-actions ion-icon {\n  font-size: 17px;\n}\n/*# sourceMappingURL=codigo-seguridad-card.component.css.map */\n"] }]
  }], null, { tipo: [{
    type: Input
  }], titulo: [{
    type: Input
  }], descripcion: [{
    type: Input
  }], codigo: [{
    type: Input
  }], icono: [{
    type: Input
  }], color: [{
    type: Input
  }], copiar: [{
    type: Output
  }], generarNuevo: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CodigoSeguridadCardComponent, { className: "CodigoSeguridadCardComponent", filePath: "src/app/shared/componentes/codigo-seguridad-card/codigo-seguridad-card.component.ts", lineNumber: 18 });
})();

// src/app/paginas/trabajos/codigos-seguridad/codigos-seguridad.page.ts
function CodigosSeguridadPage_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "app-admin-header", 4);
    \u0275\u0275listener("menuClick", function CodigosSeguridadPage_ng_container_1_Template_app_admin_header_menuClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirMenu());
    })("notificacionesClick", function CodigosSeguridadPage_ng_container_1_Template_app_admin_header_notificacionesClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirNotificaciones());
    })("perfilClick", function CodigosSeguridadPage_ng_container_1_Template_app_admin_header_perfilClick_1_listener() {
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
function CodigosSeguridadPage_ng_container_3_ng_container_14_ion_select_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-select-option", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trabajo_r6 = ctx.$implicit;
    \u0275\u0275property("value", trabajo_r6.uid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", trabajo_r6.tipoTrabajo, " - ", trabajo_r6.clienteNombre, " ");
  }
}
function CodigosSeguridadPage_ng_container_3_ng_container_14_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div")(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "strong", 24);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const trabajo_r7 = ctx.ngIf;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(trabajo_r7.clienteNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", trabajo_r7.tipoTrabajo, " \xB7 ", trabajo_r7.fechaHoraTexto);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(trabajo_r7.empleadosTexto);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", trabajo_r7.estadoClase);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", trabajo_r7.estadoTexto, " ");
  }
}
function CodigosSeguridadPage_ng_container_3_ng_container_14_section_13_app_codigo_seguridad_card_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-codigo-seguridad-card", 28);
    \u0275\u0275listener("copiar", function CodigosSeguridadPage_ng_container_3_ng_container_14_section_13_app_codigo_seguridad_card_1_Template_app_codigo_seguridad_card_copiar_0_listener() {
      \u0275\u0275restoreView(_r8);
      const trabajo_r9 = \u0275\u0275nextContext().ngIf;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.copiarCodigo(trabajo_r9.codigoCliente));
    })("generarNuevo", function CodigosSeguridadPage_ng_container_3_ng_container_14_section_13_app_codigo_seguridad_card_1_Template_app_codigo_seguridad_card_generarNuevo_0_listener() {
      \u0275\u0275restoreView(_r8);
      const trabajo_r9 = \u0275\u0275nextContext().ngIf;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.confirmarRegenerar("cliente", trabajo_r9));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trabajo_r9 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275property("codigo", trabajo_r9.codigoCliente);
  }
}
function CodigosSeguridadPage_ng_container_3_ng_container_14_section_13_app_codigo_seguridad_card_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-codigo-seguridad-card", 29);
    \u0275\u0275listener("copiar", function CodigosSeguridadPage_ng_container_3_ng_container_14_section_13_app_codigo_seguridad_card_2_Template_app_codigo_seguridad_card_copiar_0_listener() {
      \u0275\u0275restoreView(_r10);
      const trabajo_r9 = \u0275\u0275nextContext().ngIf;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.copiarCodigo(trabajo_r9.codigoDevolucion));
    })("generarNuevo", function CodigosSeguridadPage_ng_container_3_ng_container_14_section_13_app_codigo_seguridad_card_2_Template_app_codigo_seguridad_card_generarNuevo_0_listener() {
      \u0275\u0275restoreView(_r10);
      const trabajo_r9 = \u0275\u0275nextContext().ngIf;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.confirmarRegenerar("devolucion", trabajo_r9));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trabajo_r9 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275property("codigo", trabajo_r9.codigoDevolucion);
  }
}
function CodigosSeguridadPage_ng_container_3_ng_container_14_section_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 25);
    \u0275\u0275template(1, CodigosSeguridadPage_ng_container_3_ng_container_14_section_13_app_codigo_seguridad_card_1_Template, 1, 1, "app-codigo-seguridad-card", 26)(2, CodigosSeguridadPage_ng_container_3_ng_container_14_section_13_app_codigo_seguridad_card_2_Template, 1, 1, "app-codigo-seguridad-card", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r11 = \u0275\u0275nextContext(2).ngIf;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", vm_r11.tabActivo === "cliente");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", vm_r11.tabActivo === "devolucion");
  }
}
function CodigosSeguridadPage_ng_container_3_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "section", 12)(2, "label");
    \u0275\u0275text(3, "Trabajo seleccionado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ion-item", 13)(5, "ion-select", 14);
    \u0275\u0275listener("ionChange", function CodigosSeguridadPage_ng_container_3_ng_container_14_Template_ion_select_ionChange_5_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cambiarTrabajo($event));
    });
    \u0275\u0275template(6, CodigosSeguridadPage_ng_container_3_ng_container_14_ion_select_option_6_Template, 2, 3, "ion-select-option", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, CodigosSeguridadPage_ng_container_3_ng_container_14_div_7_Template, 10, 6, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "section", 17)(9, "button", 18);
    \u0275\u0275listener("click", function CodigosSeguridadPage_ng_container_3_ng_container_14_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cambiarTab("cliente"));
    });
    \u0275\u0275text(10, " Cliente ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 18);
    \u0275\u0275listener("click", function CodigosSeguridadPage_ng_container_3_ng_container_14_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cambiarTab("devolucion"));
    });
    \u0275\u0275text(12, " Devoluci\xF3n ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(13, CodigosSeguridadPage_ng_container_3_ng_container_14_section_13_Template, 3, 2, "section", 19);
    \u0275\u0275elementStart(14, "section", 20);
    \u0275\u0275element(15, "ion-icon", 21);
    \u0275\u0275elementStart(16, "p");
    \u0275\u0275text(17, " Los c\xF3digos pertenecen al trabajo seleccionado. Si genera uno nuevo, el c\xF3digo anterior dejar\xE1 de ser v\xE1lido. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const vm_r11 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance(5);
    \u0275\u0275property("value", vm_r11.trabajoSeleccionado == null ? null : vm_r11.trabajoSeleccionado.uid);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", vm_r11.trabajos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", vm_r11.trabajoSeleccionado);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", vm_r11.tabActivo === "cliente");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", vm_r11.tabActivo === "devolucion");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", vm_r11.trabajoSeleccionado);
  }
}
function CodigosSeguridadPage_ng_container_3_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 30);
    \u0275\u0275element(1, "ion-icon", 10);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "No hay trabajos disponibles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Registre un trabajo para generar c\xF3digos de seguridad.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 18);
    \u0275\u0275listener("click", function CodigosSeguridadPage_ng_container_3_ng_template_15_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.irTrabajos());
    });
    \u0275\u0275text(7, " Ir a trabajos ");
    \u0275\u0275elementEnd()();
  }
}
function CodigosSeguridadPage_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 5)(2, "button", 6);
    \u0275\u0275listener("click", function CodigosSeguridadPage_ng_container_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.irAtras());
    });
    \u0275\u0275element(3, "ion-icon", 7);
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Volver");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "section", 8)(7, "div", 9);
    \u0275\u0275element(8, "ion-icon", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div")(10, "h2");
    \u0275\u0275text(11, "C\xF3digos de seguridad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p");
    \u0275\u0275text(13, "Gestiona los c\xF3digos del cliente y devoluci\xF3n de materiales.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(14, CodigosSeguridadPage_ng_container_3_ng_container_14_Template, 18, 8, "ng-container", 11)(15, CodigosSeguridadPage_ng_container_3_ng_template_15_Template, 8, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const vm_r11 = ctx.ngIf;
    const sinTrabajos_r13 = \u0275\u0275reference(16);
    \u0275\u0275advance(14);
    \u0275\u0275property("ngIf", vm_r11.trabajos.length > 0)("ngIfElse", sinTrabajos_r13);
  }
}
var _CodigosSeguridadPage = class _CodigosSeguridadPage {
  constructor() {
    this.codigoService = inject(CodigoSeguridadService);
    this.dashboardAdminService = inject(DashboardAdminService);
    this.route = inject(ActivatedRoute);
    this.navCtrl = inject(NavController);
    this.toastCtrl = inject(ToastController);
    this.alertCtrl = inject(AlertController);
    this.cdr = inject(ChangeDetectorRef);
    this.vm$ = this.codigoService.vm$;
    this.adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
  }
  ionViewWillEnter() {
    const trabajoUid = this.route.snapshot.queryParamMap.get("trabajoUid");
    this.codigoService.cargarTrabajos(trabajoUid);
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }
  ionViewWillLeave() {
    this.codigoService.detenerEscucha();
  }
  cambiarTrabajo(event) {
    const uid = String(event?.detail?.value || "").trim();
    if (!uid) {
      return;
    }
    this.codigoService.seleccionarTrabajo(uid);
  }
  cambiarTab(tab) {
    this.codigoService.cambiarTab(tab);
  }
  copiarCodigo(codigo) {
    return __async(this, null, function* () {
      const limpio = String(codigo || "").trim();
      if (!/^\d{6}$/.test(limpio)) {
        this.mostrarToast("No hay un c\xF3digo v\xE1lido para copiar.", "danger");
        return;
      }
      try {
        yield navigator.clipboard.writeText(limpio);
        this.mostrarToast("C\xF3digo copiado correctamente.", "success");
      } catch (error) {
        console.error(error);
        this.mostrarToast(`C\xF3digo: ${limpio}`, "primary");
      }
    });
  }
  confirmarRegenerar(tipo, trabajo) {
    return __async(this, null, function* () {
      if (!trabajo) {
        this.mostrarToast("Seleccione un trabajo.", "danger");
        return;
      }
      const titulo = tipo === "cliente" ? "Generar nuevo c\xF3digo de cliente" : "Generar nuevo c\xF3digo de devoluci\xF3n";
      const mensaje = tipo === "cliente" ? "El c\xF3digo anterior dejar\xE1 de ser v\xE1lido para la validaci\xF3n del cliente." : "El c\xF3digo anterior dejar\xE1 de ser v\xE1lido para la devoluci\xF3n de materiales.";
      const alert = yield this.alertCtrl.create({
        header: titulo,
        message: mensaje,
        buttons: [
          {
            text: "Cancelar",
            role: "cancel"
          },
          {
            text: "Generar",
            role: "confirm",
            handler: () => __async(this, null, function* () {
              yield this.regenerarCodigo(tipo);
            })
          }
        ]
      });
      yield alert.present();
    });
  }
  regenerarCodigo(tipo) {
    return __async(this, null, function* () {
      try {
        if (tipo === "cliente") {
          yield this.codigoService.regenerarCodigoCliente();
          this.mostrarToast("C\xF3digo de cliente actualizado.", "success");
          return;
        }
        yield this.codigoService.regenerarCodigoDevolucion();
        this.mostrarToast("C\xF3digo de devoluci\xF3n actualizado.", "success");
      } catch (error) {
        console.error(error);
        this.mostrarToast(this.obtenerMensajeError(error), "danger");
      }
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
    this.mostrarToast("Configuraci\xF3n de perfil pr\xF3ximamente.", "primary");
  }
  irAtras() {
    const trabajoUid = this.route.snapshot.queryParamMap.get("trabajoUid");
    if (trabajoUid) {
      this.navCtrl.navigateBack("/asignacion-trabajos", {
        animated: false,
        replaceUrl: true
      });
      return;
    }
    this.navCtrl.navigateBack("/mas-admin", {
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
  obtenerMensajeError(error) {
    const code = String(error?.message || error?.code || "");
    if (code.includes("trabajo-no-seleccionado")) {
      return "Seleccione un trabajo.";
    }
    if (code.includes("trabajo-eliminado")) {
      return "No se puede generar c\xF3digo para un trabajo eliminado.";
    }
    if (code.includes("permission-denied")) {
      return "No tiene permisos para realizar esta acci\xF3n.";
    }
    return "No se pudo completar la operaci\xF3n.";
  }
  mostrarToast(message, color) {
    return __async(this, null, function* () {
      const toast = yield this.toastCtrl.create({
        message,
        duration: 2300,
        position: "top",
        color
      });
      yield toast.present();
    });
  }
};
_CodigosSeguridadPage.\u0275fac = function CodigosSeguridadPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CodigosSeguridadPage)();
};
_CodigosSeguridadPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CodigosSeguridadPage, selectors: [["app-codigos-seguridad"]], decls: 6, vars: 7, consts: [["sinTrabajos", ""], [1, "codigos-root", 3, "fullscreen"], [4, "ngIf"], ["activo", "mas"], [3, "menuClick", "notificacionesClick", "perfilClick", "nombre", "rol", "fotoUrl", "notificaciones"], [1, "codigos-container"], ["type", "button", 1, "back-row", 3, "click"], ["name", "arrow-back-outline"], [1, "module-title-card"], [1, "module-icon"], ["name", "shield-checkmark-outline"], [4, "ngIf", "ngIfElse"], [1, "selector-card"], ["lines", "none", 1, "select-card"], ["interface", "popover", "placeholder", "Seleccione un trabajo", 3, "ionChange", "value"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "trabajo-resumen", 4, "ngIf"], [1, "tabs-card"], ["type", "button", 3, "click"], ["class", "codigo-section", 4, "ngIf"], [1, "info-card"], ["name", "information-circle-outline"], [3, "value"], [1, "trabajo-resumen"], [3, "ngClass"], [1, "codigo-section"], ["tipo", "cliente", "titulo", "C\xF3digo de verificaci\xF3n para cliente", "descripcion", "El empleado muestra este c\xF3digo para validar que pertenece a la empresa.", "icono", "shield-checkmark-outline", "color", "primary", 3, "codigo", "copiar", "generarNuevo", 4, "ngIf"], ["tipo", "devolucion", "titulo", "C\xF3digo para devoluci\xF3n de materiales", "descripcion", "Se utiliza para validar la devoluci\xF3n de materiales sobrantes al almac\xE9n.", "icono", "lock-closed-outline", "color", "warning", 3, "codigo", "copiar", "generarNuevo", 4, "ngIf"], ["tipo", "cliente", "titulo", "C\xF3digo de verificaci\xF3n para cliente", "descripcion", "El empleado muestra este c\xF3digo para validar que pertenece a la empresa.", "icono", "shield-checkmark-outline", "color", "primary", 3, "copiar", "generarNuevo", "codigo"], ["tipo", "devolucion", "titulo", "C\xF3digo para devoluci\xF3n de materiales", "descripcion", "Se utiliza para validar la devoluci\xF3n de materiales sobrantes al almac\xE9n.", "icono", "lock-closed-outline", "color", "warning", 3, "copiar", "generarNuevo", "codigo"], [1, "empty-card"]], template: function CodigosSeguridadPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 1);
    \u0275\u0275template(1, CodigosSeguridadPage_ng_container_1_Template, 2, 4, "ng-container", 2);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275template(3, CodigosSeguridadPage_ng_container_3_Template, 17, 2, "ng-container", 2);
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
  NgClass,
  NgForOf,
  NgIf,
  IonicModule,
  IonContent,
  IonIcon,
  IonItem,
  IonSelect,
  IonSelectOption,
  SelectValueAccessorDirective,
  AdminHeaderComponent,
  AdminBottomNavComponent,
  CodigoSeguridadCardComponent,
  AsyncPipe
], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\nion-content.codigos-root[_ngcontent-%COMP%] {\n  --background: var(--color-page-outside);\n}\n.codigos-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: var(--app-width);\n  min-height: calc(100vh - 76px);\n  margin: 0 auto;\n  padding: 12px 14px 94px;\n  background: var(--color-background);\n}\n.back-row[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  padding: 2px 0 10px;\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  color: var(--color-primary);\n  font-family: var(--font-main);\n}\n.back-row[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.back-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 800;\n}\n.module-title-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-primary),\n      var(--color-primary-hover));\n  border-radius: 18px;\n  padding: 15px;\n  color: #ffffff;\n  display: grid;\n  grid-template-columns: 48px 1fr;\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 12px;\n  box-shadow: var(--shadow-button);\n}\n.module-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 15px;\n  background: rgba(255, 255, 255, 0.16);\n  display: grid;\n  place-items: center;\n}\n.module-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 25px;\n}\n.module-title-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 900;\n  color: #ffd166;\n}\n.module-title-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 2px 0 0;\n  font-size: 17px;\n  font-weight: 900;\n}\n.module-title-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  line-height: 1.35;\n  color: rgba(255, 255, 255, 0.86);\n}\n.selector-card[_ngcontent-%COMP%], \n.tabs-card[_ngcontent-%COMP%], \n.info-card[_ngcontent-%COMP%], \n.empty-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  box-shadow: var(--shadow-card);\n  margin-bottom: 12px;\n}\n.selector-card[_ngcontent-%COMP%] {\n  padding: 13px;\n}\n.selector-card[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 7px;\n  font-size: 11.5px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.select-card[_ngcontent-%COMP%] {\n  --background: #ffffff;\n  --border-radius: 11px;\n  --min-height: 43px;\n  --padding-start: 12px;\n  --inner-padding-end: 10px;\n  border: 1px solid var(--color-border);\n  border-radius: 11px;\n}\n.select-card[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.trabajo-resumen[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  padding: 11px;\n  border-radius: 14px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 8px;\n  align-items: center;\n}\n.trabajo-resumen[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.trabajo-resumen[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.trabajo-resumen[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-flex;\n  margin-top: 6px;\n  font-size: 10px;\n  font-weight: 800;\n  color: var(--color-primary);\n}\n.trabajo-resumen[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  min-width: 76px;\n  height: 25px;\n  padding: 0 8px;\n  border-radius: 999px;\n  font-size: 9.5px;\n  font-weight: 800;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.trabajo-resumen[_ngcontent-%COMP%]   strong.pendiente[_ngcontent-%COMP%] {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.trabajo-resumen[_ngcontent-%COMP%]   strong.camino[_ngcontent-%COMP%], \n.trabajo-resumen[_ngcontent-%COMP%]   strong.proceso[_ngcontent-%COMP%] {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.trabajo-resumen[_ngcontent-%COMP%]   strong.finalizado[_ngcontent-%COMP%], \n.trabajo-resumen[_ngcontent-%COMP%]   strong.devolucion[_ngcontent-%COMP%] {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.trabajo-resumen[_ngcontent-%COMP%]   strong.cancelado[_ngcontent-%COMP%] {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.tabs-card[_ngcontent-%COMP%] {\n  padding: 5px;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 5px;\n}\n.tabs-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  height: 38px;\n  border: none;\n  border-radius: 12px;\n  background: transparent;\n  color: var(--color-text-muted);\n  font-family: var(--font-main);\n  font-size: 11.5px;\n  font-weight: 800;\n}\n.tabs-card[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #ffffff;\n  box-shadow: var(--shadow-button);\n}\n.codigo-section[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.info-card[_ngcontent-%COMP%] {\n  padding: 12px;\n  display: flex;\n  gap: 9px;\n  align-items: flex-start;\n  background: var(--color-primary-soft);\n  border-color: #dbe8ff;\n}\n.info-card[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 19px;\n  color: var(--color-primary);\n  flex-shrink: 0;\n}\n.info-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 11.5px;\n  font-weight: 600;\n  color: var(--color-text);\n  line-height: 1.4;\n}\n.empty-card[_ngcontent-%COMP%] {\n  padding: 24px 16px;\n  text-align: center;\n}\n.empty-card[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 42px;\n  color: var(--color-primary);\n}\n.empty-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 10px 0 0;\n  font-size: 15px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n.empty-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0 14px;\n  font-size: 11.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.empty-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  height: 40px;\n  padding: 0 16px;\n  border: none;\n  border-radius: 12px;\n  background: var(--color-primary);\n  color: #ffffff;\n  font-family: var(--font-main);\n  font-size: 12px;\n  font-weight: 800;\n}\n@media (max-width: 360px) {\n  .trabajo-resumen[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=codigos-seguridad.page.css.map */"] });
var CodigosSeguridadPage = _CodigosSeguridadPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CodigosSeguridadPage, [{
    type: Component,
    args: [{ selector: "app-codigos-seguridad", standalone: true, imports: [
      CommonModule,
      IonicModule,
      AdminHeaderComponent,
      AdminBottomNavComponent,
      CodigoSeguridadCardComponent
    ], template: `<!-- src/app/paginas/trabajos/codigos-seguridad/codigos-seguridad.page.html -->

<ion-content [fullscreen]="true" class="codigos-root">

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

    <div class="codigos-container">

      <button
        type="button"
        class="back-row"
        (click)="irAtras()"
      >
        <ion-icon name="arrow-back-outline"></ion-icon>
        <span>Volver</span>
      </button>

      <section class="module-title-card">
        <div class="module-icon">
          <ion-icon name="shield-checkmark-outline"></ion-icon>
        </div>

        <div>
        
          <h2>C\xF3digos de seguridad</h2>
          <p>Gestiona los c\xF3digos del cliente y devoluci\xF3n de materiales.</p>
        </div>
      </section>

      <ng-container *ngIf="vm.trabajos.length > 0; else sinTrabajos">

        <section class="selector-card">

          <label>Trabajo seleccionado</label>

          <ion-item lines="none" class="select-card">
            <ion-select
              interface="popover"
              [value]="vm.trabajoSeleccionado?.uid"
              placeholder="Seleccione un trabajo"
              (ionChange)="cambiarTrabajo($event)"
            >
              <ion-select-option
                *ngFor="let trabajo of vm.trabajos"
                [value]="trabajo.uid"
              >
                 {{ trabajo.tipoTrabajo }} - {{ trabajo.clienteNombre }}
              </ion-select-option>
            </ion-select>
          </ion-item>

          <div
            class="trabajo-resumen"
            *ngIf="vm.trabajoSeleccionado as trabajo"
          >
            <div>
              <h3>{{ trabajo.clienteNombre }}</h3>
              <p>{{ trabajo.tipoTrabajo }} \xB7 {{ trabajo.fechaHoraTexto }}</p>
              <span>{{ trabajo.empleadosTexto }}</span>
            </div>

            <strong [ngClass]="trabajo.estadoClase">
              {{ trabajo.estadoTexto }}
            </strong>
          </div>

        </section>

        <section class="tabs-card">

          <button
            type="button"
            [class.active]="vm.tabActivo === 'cliente'"
            (click)="cambiarTab('cliente')"
          >
            Cliente
          </button>

          <button
            type="button"
            [class.active]="vm.tabActivo === 'devolucion'"
            (click)="cambiarTab('devolucion')"
          >
            Devoluci\xF3n
          </button>

        </section>

        <section
          class="codigo-section"
          *ngIf="vm.trabajoSeleccionado as trabajo"
        >

          <app-codigo-seguridad-card
            *ngIf="vm.tabActivo === 'cliente'"
            tipo="cliente"
            titulo="C\xF3digo de verificaci\xF3n para cliente"
            descripcion="El empleado muestra este c\xF3digo para validar que pertenece a la empresa."
            [codigo]="trabajo.codigoCliente"
            icono="shield-checkmark-outline"
            color="primary"
            (copiar)="copiarCodigo(trabajo.codigoCliente)"
            (generarNuevo)="confirmarRegenerar('cliente', trabajo)"
          ></app-codigo-seguridad-card>

          <app-codigo-seguridad-card
            *ngIf="vm.tabActivo === 'devolucion'"
            tipo="devolucion"
            titulo="C\xF3digo para devoluci\xF3n de materiales"
            descripcion="Se utiliza para validar la devoluci\xF3n de materiales sobrantes al almac\xE9n."
            [codigo]="trabajo.codigoDevolucion"
            icono="lock-closed-outline"
            color="warning"
            (copiar)="copiarCodigo(trabajo.codigoDevolucion)"
            (generarNuevo)="confirmarRegenerar('devolucion', trabajo)"
          ></app-codigo-seguridad-card>

        </section>

        <section class="info-card">
          <ion-icon name="information-circle-outline"></ion-icon>
          <p>
            Los c\xF3digos pertenecen al trabajo seleccionado. Si genera uno nuevo, el c\xF3digo anterior dejar\xE1 de ser v\xE1lido.
          </p>
        </section>

      </ng-container>

      <ng-template #sinTrabajos>
        <section class="empty-card">
          <ion-icon name="shield-checkmark-outline"></ion-icon>
          <h3>No hay trabajos disponibles</h3>
          <p>Registre un trabajo para generar c\xF3digos de seguridad.</p>

          <button type="button" (click)="irTrabajos()">
            Ir a trabajos
          </button>
        </section>
      </ng-template>

    </div>

  </ng-container>

  <app-admin-bottom-nav activo="mas"></app-admin-bottom-nav>

</ion-content>`, styles: ["/* src/app/paginas/trabajos/codigos-seguridad/codigos-seguridad.page.css */\n:host {\n  display: block;\n}\nion-content.codigos-root {\n  --background: var(--color-page-outside);\n}\n.codigos-container {\n  width: 100%;\n  max-width: var(--app-width);\n  min-height: calc(100vh - 76px);\n  margin: 0 auto;\n  padding: 12px 14px 94px;\n  background: var(--color-background);\n}\n.back-row {\n  border: none;\n  background: transparent;\n  padding: 2px 0 10px;\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  color: var(--color-primary);\n  font-family: var(--font-main);\n}\n.back-row ion-icon {\n  font-size: 20px;\n}\n.back-row span {\n  font-size: 13px;\n  font-weight: 800;\n}\n.module-title-card {\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-primary),\n      var(--color-primary-hover));\n  border-radius: 18px;\n  padding: 15px;\n  color: #ffffff;\n  display: grid;\n  grid-template-columns: 48px 1fr;\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 12px;\n  box-shadow: var(--shadow-button);\n}\n.module-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 15px;\n  background: rgba(255, 255, 255, 0.16);\n  display: grid;\n  place-items: center;\n}\n.module-icon ion-icon {\n  font-size: 25px;\n}\n.module-title-card span {\n  font-size: 10px;\n  font-weight: 900;\n  color: #ffd166;\n}\n.module-title-card h2 {\n  margin: 2px 0 0;\n  font-size: 17px;\n  font-weight: 900;\n}\n.module-title-card p {\n  margin: 4px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  line-height: 1.35;\n  color: rgba(255, 255, 255, 0.86);\n}\n.selector-card,\n.tabs-card,\n.info-card,\n.empty-card {\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  box-shadow: var(--shadow-card);\n  margin-bottom: 12px;\n}\n.selector-card {\n  padding: 13px;\n}\n.selector-card label {\n  display: block;\n  margin-bottom: 7px;\n  font-size: 11.5px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.select-card {\n  --background: #ffffff;\n  --border-radius: 11px;\n  --min-height: 43px;\n  --padding-start: 12px;\n  --inner-padding-end: 10px;\n  border: 1px solid var(--color-border);\n  border-radius: 11px;\n}\n.select-card ion-select {\n  font-size: 12.5px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.trabajo-resumen {\n  margin-top: 10px;\n  padding: 11px;\n  border-radius: 14px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 8px;\n  align-items: center;\n}\n.trabajo-resumen h3 {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.trabajo-resumen p {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.trabajo-resumen span {\n  display: inline-flex;\n  margin-top: 6px;\n  font-size: 10px;\n  font-weight: 800;\n  color: var(--color-primary);\n}\n.trabajo-resumen strong {\n  min-width: 76px;\n  height: 25px;\n  padding: 0 8px;\n  border-radius: 999px;\n  font-size: 9.5px;\n  font-weight: 800;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.trabajo-resumen strong.pendiente {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.trabajo-resumen strong.camino,\n.trabajo-resumen strong.proceso {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.trabajo-resumen strong.finalizado,\n.trabajo-resumen strong.devolucion {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.trabajo-resumen strong.cancelado {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.tabs-card {\n  padding: 5px;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 5px;\n}\n.tabs-card button {\n  height: 38px;\n  border: none;\n  border-radius: 12px;\n  background: transparent;\n  color: var(--color-text-muted);\n  font-family: var(--font-main);\n  font-size: 11.5px;\n  font-weight: 800;\n}\n.tabs-card button.active {\n  background: var(--color-primary);\n  color: #ffffff;\n  box-shadow: var(--shadow-button);\n}\n.codigo-section {\n  margin-bottom: 12px;\n}\n.info-card {\n  padding: 12px;\n  display: flex;\n  gap: 9px;\n  align-items: flex-start;\n  background: var(--color-primary-soft);\n  border-color: #dbe8ff;\n}\n.info-card ion-icon {\n  font-size: 19px;\n  color: var(--color-primary);\n  flex-shrink: 0;\n}\n.info-card p {\n  margin: 0;\n  font-size: 11.5px;\n  font-weight: 600;\n  color: var(--color-text);\n  line-height: 1.4;\n}\n.empty-card {\n  padding: 24px 16px;\n  text-align: center;\n}\n.empty-card ion-icon {\n  font-size: 42px;\n  color: var(--color-primary);\n}\n.empty-card h3 {\n  margin: 10px 0 0;\n  font-size: 15px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n.empty-card p {\n  margin: 6px 0 14px;\n  font-size: 11.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.empty-card button {\n  height: 40px;\n  padding: 0 16px;\n  border: none;\n  border-radius: 12px;\n  background: var(--color-primary);\n  color: #ffffff;\n  font-family: var(--font-main);\n  font-size: 12px;\n  font-weight: 800;\n}\n@media (max-width: 360px) {\n  .trabajo-resumen {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=codigos-seguridad.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CodigosSeguridadPage, { className: "CodigosSeguridadPage", filePath: "src/app/paginas/trabajos/codigos-seguridad/codigos-seguridad.page.ts", lineNumber: 38 });
})();
export {
  CodigosSeguridadPage
};
//# sourceMappingURL=codigos-seguridad.page-IZC6Q2UO.js.map
