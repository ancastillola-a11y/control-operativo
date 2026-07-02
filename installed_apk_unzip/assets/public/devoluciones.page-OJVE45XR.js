import {
  AdminBottomNavComponent,
  AdminHeaderComponent,
  DashboardAdminService
} from "./chunk-CWBZAVOG.js";
import {
  AlertController,
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
  Firestore,
  collection,
  collectionData,
  doc,
  runTransaction,
  serverTimestamp
} from "./chunk-NMRAWXHA.js";
import {
  AsyncPipe,
  BehaviorSubject,
  ChangeDetectorRef,
  CommonModule,
  Component,
  Injectable,
  NavController,
  NgForOf,
  NgIf,
  combineLatest,
  inject,
  map,
  setClassMetadata,
  shareReplay,
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
  __async
} from "./chunk-Q3N56TRI.js";

// src/app/dao/devolucion.dao.ts
var _DevolucionDAO = class _DevolucionDAO {
  constructor() {
    this.firestore = inject(Firestore);
  }
  escucharTrabajos() {
    const ref = collection(this.firestore, "trabajos");
    return collectionData(ref, {
      idField: "uid"
    });
  }
  validarDevolucion(trabajoUid, codigoIngresado) {
    return __async(this, null, function* () {
      const uid = String(trabajoUid || "").trim();
      if (!uid) {
        throw new Error("trabajo-uid-vacio");
      }
      yield runTransaction(this.firestore, (transaction) => __async(this, null, function* () {
        const trabajoRef = doc(this.firestore, "trabajos", uid);
        const trabajoSnap = yield transaction.get(trabajoRef);
        if (!trabajoSnap.exists()) {
          throw new Error("trabajo-no-existe");
        }
        const trabajo = trabajoSnap.data();
        if (trabajo.estado === "devolucion_realizada" || trabajo.devolucionValidada === true) {
          throw new Error("devolucion-ya-validada");
        }
        const codigoReal = String(trabajo.codigoDevolucion || "").trim();
        const codigo = String(codigoIngresado || "").trim();
        if (!codigoReal) {
          throw new Error("codigo-devolucion-no-configurado");
        }
        if (codigo !== codigoReal) {
          throw new Error("codigo-devolucion-incorrecto");
        }
        const materiales = Array.isArray(trabajo.materialesAsignados) ? trabajo.materialesAsignados : [];
        if (materiales.length === 0) {
          throw new Error("sin-materiales-devolver");
        }
        for (const item of materiales) {
          const materialUid = String(item.materialUid || item.uid || item.id || "").trim();
          const cantidad = Number(item.cantidadDevuelta ?? item.cantidadAsignada ?? item.cantidad ?? 0);
          if (!materialUid || cantidad <= 0) {
            continue;
          }
          const materialRef = doc(this.firestore, "materiales", materialUid);
          const materialSnap = yield transaction.get(materialRef);
          if (!materialSnap.exists()) {
            continue;
          }
          const material = materialSnap.data();
          const stockActual = Number(material.stockActual ?? material.stock ?? material.cantidadDisponible ?? material.cantidad ?? 0);
          const nuevoStock = stockActual + cantidad;
          const updateStock = {
            actualizadoEn: serverTimestamp()
          };
          if ("stockActual" in material) {
            updateStock.stockActual = nuevoStock;
          } else if ("stock" in material) {
            updateStock.stock = nuevoStock;
          } else if ("cantidadDisponible" in material) {
            updateStock.cantidadDisponible = nuevoStock;
          } else if ("cantidad" in material) {
            updateStock.cantidad = nuevoStock;
          } else {
            updateStock.stockActual = nuevoStock;
          }
          transaction.update(materialRef, updateStock);
        }
        transaction.update(trabajoRef, {
          estado: "devolucion_realizada",
          devolucionValidada: true,
          fechaDevolucionValidada: serverTimestamp(),
          actualizadoEn: serverTimestamp()
        });
      }));
    });
  }
};
_DevolucionDAO.\u0275fac = function DevolucionDAO_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DevolucionDAO)();
};
_DevolucionDAO.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DevolucionDAO, factory: _DevolucionDAO.\u0275fac, providedIn: "root" });
var DevolucionDAO = _DevolucionDAO;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DevolucionDAO, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/procesos/devolucion.service.ts
var _DevolucionService = class _DevolucionService {
  constructor() {
    this.dao = inject(DevolucionDAO);
    this.filtroSubject = new BehaviorSubject("pendientes");
    this.vm$ = combineLatest([
      this.dao.escucharTrabajos(),
      this.filtroSubject.asObservable()
    ]).pipe(map(([trabajos, filtro]) => {
      const devoluciones = trabajos.filter((trabajo) => trabajo.eliminado !== true).filter((trabajo) => Array.isArray(trabajo.materialesAsignados) && trabajo.materialesAsignados.length > 0).filter((trabajo) => trabajo.estado !== "pendiente" && trabajo.estado !== "cancelado").map((trabajo) => this.mapearDevolucion(trabajo)).sort((a, b) => b.uid.localeCompare(a.uid));
      const devolucionesFiltradas = this.aplicarFiltro(devoluciones, filtro);
      return {
        filtro,
        devoluciones,
        devolucionesFiltradas,
        totalPendientes: devoluciones.filter((item) => item.estadoDevolucion === "pendiente").length,
        totalValidadas: devoluciones.filter((item) => item.estadoDevolucion === "validada").length,
        totalHistorial: devoluciones.length
      };
    }), shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }
  cambiarFiltro(filtro) {
    this.filtroSubject.next(filtro);
  }
  validarDevolucion(trabajoUid, codigo) {
    return __async(this, null, function* () {
      yield this.dao.validarDevolucion(trabajoUid, codigo);
    });
  }
  aplicarFiltro(devoluciones, filtro) {
    if (filtro === "pendientes") {
      return devoluciones.filter((item) => item.estadoDevolucion === "pendiente");
    }
    if (filtro === "validadas") {
      return devoluciones.filter((item) => item.estadoDevolucion === "validada");
    }
    return devoluciones;
  }
  mapearDevolucion(trabajo) {
    const materiales = (trabajo.materialesAsignados || []).map((item) => ({
      materialUid: String(item.materialUid || item.uid || item.id || ""),
      nombre: String(item.nombre || item.materialNombre || "Material"),
      unidad: String(item.unidad || "und"),
      cantidadAsignada: Number(item.cantidadAsignada ?? item.cantidad ?? 0)
    }));
    const estadoDevolucion = trabajo.estado === "devolucion_realizada" || trabajo.devolucionValidada === true ? "validada" : "pendiente";
    const empleados = Array.isArray(trabajo.empleadosAsignados) ? trabajo.empleadosAsignados : [];
    const empleadoTexto = empleados.length > 0 ? empleados.map((empleado) => empleado.nombreCompleto || empleado.nombres || empleado.usuario || "Empleado").join(", ") : "Sin empleado";
    return {
      uid: String(trabajo.uid || trabajo.id || ""),
      codigoTrabajo: String(trabajo.codigoTrabajo || trabajo.codigo || `T-${String(trabajo.uid || "").slice(0, 5).toUpperCase()}`),
      clienteNombre: String(trabajo.clienteNombre || "Sin cliente"),
      tipoTrabajo: String(trabajo.tipoTrabajo || "Trabajo operativo"),
      empleadoTexto,
      fechaTexto: this.obtenerFechaTexto(trabajo),
      codigoDevolucion: String(trabajo.codigoDevolucion || ""),
      estadoTrabajo: String(trabajo.estado || ""),
      estadoDevolucion,
      estadoTexto: estadoDevolucion === "validada" ? "Validada" : "Pendiente",
      totalMateriales: materiales.length,
      materiales,
      fechaValidacionTexto: this.obtenerFechaValidacionTexto(trabajo)
    };
  }
  obtenerFechaTexto(trabajo) {
    const fecha = String(trabajo.fechaProgramada || "").trim();
    const hora = String(trabajo.horaProgramada || "").trim();
    if (fecha && hora) {
      return `${fecha} \xB7 ${hora}`;
    }
    if (fecha) {
      return fecha;
    }
    return "Sin fecha";
  }
  obtenerFechaValidacionTexto(trabajo) {
    const fecha = trabajo.fechaDevolucionValidada;
    if (!fecha) {
      return "";
    }
    if (typeof fecha?.toDate === "function") {
      return fecha.toDate().toLocaleString("es-PE");
    }
    return "";
  }
};
_DevolucionService.\u0275fac = function DevolucionService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DevolucionService)();
};
_DevolucionService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DevolucionService, factory: _DevolucionService.\u0275fac, providedIn: "root" });
var DevolucionService = _DevolucionService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DevolucionService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/paginas/administrador/devoluciones/devoluciones.page.ts
function DevolucionesPage_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "app-admin-header", 4);
    \u0275\u0275listener("menuClick", function DevolucionesPage_ng_container_1_Template_app_admin_header_menuClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirMenu());
    })("notificacionesClick", function DevolucionesPage_ng_container_1_Template_app_admin_header_notificacionesClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirNotificaciones());
    })("perfilClick", function DevolucionesPage_ng_container_1_Template_app_admin_header_perfilClick_1_listener() {
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
function DevolucionesPage_ng_container_3_section_23_article_1_button_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function DevolucionesPage_ng_container_3_section_23_article_1_button_24_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const item_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.validar(item_r6));
    });
    \u0275\u0275text(1, " Validar ");
    \u0275\u0275elementEnd();
  }
}
function DevolucionesPage_ng_container_3_section_23_article_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 16)(1, "div", 17)(2, "div")(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 18);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 19)(10, "p")(11, "strong");
    \u0275\u0275text(12, "Empleado:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p")(15, "strong");
    \u0275\u0275text(16, "Fecha:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 20)(19, "span");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 21)(22, "button", 22);
    \u0275\u0275listener("click", function DevolucionesPage_ng_container_3_section_23_article_1_Template_button_click_22_listener() {
      const item_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.verDetalle(item_r6));
    });
    \u0275\u0275element(23, "ion-icon", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275template(24, DevolucionesPage_ng_container_3_section_23_article_1_button_24_Template, 2, 0, "button", 24);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r6.codigoTrabajo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r6.tipoTrabajo);
    \u0275\u0275advance();
    \u0275\u0275classProp("validada", item_r6.estadoDevolucion === "validada");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r6.estadoTexto, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", item_r6.empleadoTexto, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", item_r6.fechaTexto, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", item_r6.totalMateriales, " ", item_r6.totalMateriales === 1 ? "material" : "materiales", " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", item_r6.estadoDevolucion === "pendiente");
  }
}
function DevolucionesPage_ng_container_3_section_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 14);
    \u0275\u0275template(1, DevolucionesPage_ng_container_3_section_23_article_1_Template, 25, 10, "article", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r8 = \u0275\u0275nextContext().ngIf;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", vm_r8.devolucionesFiltradas)("ngForTrackBy", ctx_r1.trackByDevolucion);
  }
}
function DevolucionesPage_ng_container_3_ng_template_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 26);
    \u0275\u0275element(1, "ion-icon", 27);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "Sin devoluciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "No se encontraron registros para este filtro.");
    \u0275\u0275elementEnd()();
  }
}
function DevolucionesPage_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 5)(2, "section", 6)(3, "button", 7);
    \u0275\u0275listener("click", function DevolucionesPage_ng_container_3_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.volver());
    });
    \u0275\u0275element(4, "ion-icon", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "h2");
    \u0275\u0275text(7, "Devoluciones de materiales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, "Valida retornos y actualiza el stock del almac\xE9n.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "section", 9)(11, "button", 10);
    \u0275\u0275listener("click", function DevolucionesPage_ng_container_3_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarFiltro("pendientes"));
    });
    \u0275\u0275text(12, " Pendientes ");
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "button", 10);
    \u0275\u0275listener("click", function DevolucionesPage_ng_container_3_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarFiltro("validadas"));
    });
    \u0275\u0275text(16, " Validadas ");
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "button", 10);
    \u0275\u0275listener("click", function DevolucionesPage_ng_container_3_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarFiltro("historial"));
    });
    \u0275\u0275text(20, " Historial ");
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(23, DevolucionesPage_ng_container_3_section_23_Template, 2, 2, "section", 11)(24, DevolucionesPage_ng_container_3_ng_template_24_Template, 6, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(26, "section", 12);
    \u0275\u0275element(27, "ion-icon", 13);
    \u0275\u0275elementStart(28, "p");
    \u0275\u0275text(29, " Las devoluciones validadas se suman autom\xE1ticamente al stock del almac\xE9n. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const vm_r8 = ctx.ngIf;
    const sinDevoluciones_r9 = \u0275\u0275reference(25);
    \u0275\u0275advance(11);
    \u0275\u0275classProp("active", vm_r8.filtro === "pendientes");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(vm_r8.totalPendientes);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", vm_r8.filtro === "validadas");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(vm_r8.totalValidadas);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", vm_r8.filtro === "historial");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(vm_r8.totalHistorial);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", vm_r8.devolucionesFiltradas.length > 0)("ngIfElse", sinDevoluciones_r9);
  }
}
var _DevolucionesPage = class _DevolucionesPage {
  constructor() {
    this.navCtrl = inject(NavController);
    this.toastCtrl = inject(ToastController);
    this.alertCtrl = inject(AlertController);
    this.cdr = inject(ChangeDetectorRef);
    this.dashboardAdminService = inject(DashboardAdminService);
    this.devolucionService = inject(DevolucionService);
    this.adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
    this.vm$ = this.devolucionService.vm$;
  }
  ionViewWillEnter() {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }
  cambiarFiltro(filtro) {
    this.devolucionService.cambiarFiltro(filtro);
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
    this.mostrarToast("Configuraci\xF3n de perfil pr\xF3ximamente.", "primary");
  }
  verDetalle(item) {
    return __async(this, null, function* () {
      const materialesTexto = item.materiales.map((material) => `${material.nombre}: ${material.cantidadAsignada} ${material.unidad}`).join("\n");
      const alert = yield this.alertCtrl.create({
        header: item.codigoTrabajo,
        subHeader: item.tipoTrabajo,
        message: `
        Cliente: ${item.clienteNombre}
        <br>
        Empleado: ${item.empleadoTexto}
        <br><br>
        Materiales:
        <br>
        ${materialesTexto.replace(/\n/g, "<br>")}
      `,
        buttons: ["Cerrar"]
      });
      yield alert.present();
    });
  }
  validar(item) {
    return __async(this, null, function* () {
      if (item.estadoDevolucion === "validada") {
        this.mostrarToast("Esta devoluci\xF3n ya fue validada.", "primary");
        return;
      }
      const alert = yield this.alertCtrl.create({
        header: "Validar devoluci\xF3n",
        subHeader: item.codigoTrabajo,
        message: "Ingrese el c\xF3digo de devoluci\xF3n para sumar los materiales al stock.",
        inputs: [
          {
            name: "codigo",
            type: "text",
            placeholder: "C\xF3digo de devoluci\xF3n"
          }
        ],
        buttons: [
          {
            text: "Cancelar",
            role: "cancel"
          },
          {
            text: "Validar",
            handler: (data) => __async(this, null, function* () {
              yield this.confirmarValidacion(item, data.codigo);
            })
          }
        ]
      });
      yield alert.present();
    });
  }
  confirmarValidacion(item, codigo) {
    return __async(this, null, function* () {
      try {
        yield this.devolucionService.validarDevolucion(item.uid, codigo);
        this.mostrarToast("Devoluci\xF3n validada. El stock fue actualizado.", "success");
      } catch (error) {
        console.error(error);
        this.mostrarToast(this.obtenerMensajeError(error), "danger");
      }
    });
  }
  trackByDevolucion(index, item) {
    return item.uid || String(index);
  }
  obtenerMensajeError(error) {
    const code = String(error?.message || error?.code || "");
    if (code.includes("codigo-devolucion-incorrecto")) {
      return "El c\xF3digo de devoluci\xF3n es incorrecto.";
    }
    if (code.includes("codigo-devolucion-no-configurado")) {
      return "Este trabajo no tiene c\xF3digo de devoluci\xF3n configurado.";
    }
    if (code.includes("devolucion-ya-validada")) {
      return "Esta devoluci\xF3n ya fue validada.";
    }
    if (code.includes("sin-materiales-devolver")) {
      return "Este trabajo no tiene materiales para devolver.";
    }
    if (code.includes("permission-denied")) {
      return "No tiene permisos para validar la devoluci\xF3n.";
    }
    return "No se pudo validar la devoluci\xF3n.";
  }
  mostrarToast(message, color) {
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
_DevolucionesPage.\u0275fac = function DevolucionesPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DevolucionesPage)();
};
_DevolucionesPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DevolucionesPage, selectors: [["app-devoluciones"]], decls: 6, vars: 7, consts: [["sinDevoluciones", ""], [1, "devoluciones-root", 3, "fullscreen"], [4, "ngIf"], ["activo", "mas"], [3, "menuClick", "notificacionesClick", "perfilClick", "nombre", "rol", "fotoUrl", "notificaciones"], [1, "devoluciones-container"], [1, "page-title-row"], ["type", "button", 1, "btn-back", 3, "click"], ["name", "arrow-back-outline"], [1, "tabs-row"], ["type", "button", 1, "tab-btn", 3, "click"], ["class", "devoluciones-list", 4, "ngIf", "ngIfElse"], [1, "info-box"], ["name", "information-circle-outline"], [1, "devoluciones-list"], ["class", "devolucion-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "devolucion-card"], [1, "card-top"], [1, "estado-badge"], [1, "card-info"], [1, "card-bottom"], [1, "card-actions"], ["type", "button", 1, "btn-detail", 3, "click"], ["name", "eye-outline"], ["type", "button", "class", "btn-validate", 3, "click", 4, "ngIf"], ["type", "button", 1, "btn-validate", 3, "click"], [1, "empty-card"], ["name", "cube-outline"]], template: function DevolucionesPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 1);
    \u0275\u0275template(1, DevolucionesPage_ng_container_1_Template, 2, 4, "ng-container", 2);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275template(3, DevolucionesPage_ng_container_3_Template, 30, 11, "ng-container", 2);
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
  IonIcon,
  AdminHeaderComponent,
  AdminBottomNavComponent,
  AsyncPipe
], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\nion-content.devoluciones-root[_ngcontent-%COMP%] {\n  --background: var(--color-page-outside);\n}\n.devoluciones-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: var(--app-width);\n  min-height: 100dvh;\n  margin: 0 auto;\n  padding: 10px 12px calc(96px + env(safe-area-inset-bottom));\n  background: var(--color-background);\n}\n.page-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n.btn-back[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: #ffffff;\n  color: var(--color-primary);\n  display: grid;\n  place-items: center;\n  box-shadow: var(--shadow-card);\n  flex-shrink: 0;\n}\n.btn-back[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.page-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n.page-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 2px 0 0;\n  font-size: 10.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.tabs-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.tab-btn[_ngcontent-%COMP%] {\n  height: 42px;\n  border-radius: 10px;\n  border: 1px solid var(--color-border);\n  background: #ffffff;\n  color: var(--color-text);\n  font-size: 11px;\n  font-weight: 900;\n  font-family: var(--font-main);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n}\n.tab-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  min-width: 18px;\n  height: 18px;\n  border-radius: 999px;\n  background: #eef2f7;\n  color: var(--color-text-muted);\n  display: grid;\n  place-items: center;\n  font-size: 9px;\n  font-weight: 900;\n}\n.tab-btn.active[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: #ffffff;\n}\n.tab-btn.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  color: #ffffff;\n}\n.devoluciones-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.devolucion-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 14px;\n  box-shadow: var(--shadow-card);\n  padding: 12px;\n}\n.card-top[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 10px;\n}\n.card-top[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 900;\n  color: var(--color-primary);\n}\n.card-top[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.estado-badge[_ngcontent-%COMP%] {\n  min-height: 23px;\n  padding: 0 10px;\n  border-radius: 999px;\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n  font-size: 10px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n}\n.estado-badge.validada[_ngcontent-%COMP%] {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.card-info[_ngcontent-%COMP%] {\n  margin-top: 9px;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.card-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.card-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-text);\n}\n.card-bottom[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  padding-top: 9px;\n  border-top: 1px solid #edf2f7;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.card-bottom[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 900;\n  color: var(--color-primary);\n}\n.card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n}\n.btn-detail[_ngcontent-%COMP%], \n.btn-validate[_ngcontent-%COMP%] {\n  border: none;\n  font-family: var(--font-main);\n}\n.btn-detail[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 12px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  display: grid;\n  place-items: center;\n}\n.btn-detail[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.btn-validate[_ngcontent-%COMP%] {\n  min-height: 34px;\n  padding: 0 12px;\n  border-radius: 12px;\n  background: var(--color-primary);\n  color: #ffffff;\n  font-size: 11px;\n  font-weight: 900;\n}\n.info-box[_ngcontent-%COMP%], \n.empty-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 15px;\n  box-shadow: var(--shadow-card);\n}\n.empty-card[_ngcontent-%COMP%] {\n  padding: 22px 14px;\n  text-align: center;\n}\n.empty-card[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 30px;\n  color: var(--color-primary);\n}\n.empty-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 8px 0 4px;\n  font-size: 14px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n.empty-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.info-box[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  padding: 14px;\n  display: flex;\n  gap: 10px;\n  align-items: flex-start;\n  background: var(--color-primary-soft);\n}\n.info-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: var(--color-primary);\n  flex-shrink: 0;\n}\n.info-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--color-text);\n  line-height: 1.45;\n}\n/*# sourceMappingURL=devoluciones.page.css.map */"] });
var DevolucionesPage = _DevolucionesPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DevolucionesPage, [{
    type: Component,
    args: [{ selector: "app-devoluciones", standalone: true, imports: [
      CommonModule,
      IonicModule,
      AdminHeaderComponent,
      AdminBottomNavComponent
    ], template: `<!-- src/app/paginas/administrador/devoluciones/devoluciones.page.html -->

<ion-content [fullscreen]="true" class="devoluciones-root">

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

    <div class="devoluciones-container">

      <section class="page-title-row">
        <button
          type="button"
          class="btn-back"
          (click)="volver()"
        >
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>

        <div>
          <h2>Devoluciones de materiales</h2>
          <p>Valida retornos y actualiza el stock del almac\xE9n.</p>
        </div>
      </section>

      <section class="tabs-row">

        <button
          type="button"
          class="tab-btn"
          [class.active]="vm.filtro === 'pendientes'"
          (click)="cambiarFiltro('pendientes')"
        >
          Pendientes
          <span>{{ vm.totalPendientes }}</span>
        </button>

        <button
          type="button"
          class="tab-btn"
          [class.active]="vm.filtro === 'validadas'"
          (click)="cambiarFiltro('validadas')"
        >
          Validadas
          <span>{{ vm.totalValidadas }}</span>
        </button>

        <button
          type="button"
          class="tab-btn"
          [class.active]="vm.filtro === 'historial'"
          (click)="cambiarFiltro('historial')"
        >
          Historial
          <span>{{ vm.totalHistorial }}</span>
        </button>

      </section>

      <section
        class="devoluciones-list"
        *ngIf="vm.devolucionesFiltradas.length > 0; else sinDevoluciones"
      >

        <article
          class="devolucion-card"
          *ngFor="let item of vm.devolucionesFiltradas; trackBy: trackByDevolucion"
        >

          <div class="card-top">
            <div>
              <h3>{{ item.codigoTrabajo }}</h3>
              <p>{{ item.tipoTrabajo }}</p>
            </div>

            <span
              class="estado-badge"
              [class.validada]="item.estadoDevolucion === 'validada'"
            >
              {{ item.estadoTexto }}
            </span>
          </div>

          <div class="card-info">
            <p>
              <strong>Empleado:</strong>
              {{ item.empleadoTexto }}
            </p>

            <p>
              <strong>Fecha:</strong>
              {{ item.fechaTexto }}
            </p>
          </div>

          <div class="card-bottom">
            <span>
              {{ item.totalMateriales }}
              {{ item.totalMateriales === 1 ? 'material' : 'materiales' }}
            </span>

            <div class="card-actions">
              <button
                type="button"
                class="btn-detail"
                (click)="verDetalle(item)"
              >
                <ion-icon name="eye-outline"></ion-icon>
              </button>

              <button
                type="button"
                class="btn-validate"
                *ngIf="item.estadoDevolucion === 'pendiente'"
                (click)="validar(item)"
              >
                Validar
              </button>
            </div>
          </div>

        </article>

      </section>

      <ng-template #sinDevoluciones>
        <section class="empty-card">
          <ion-icon name="cube-outline"></ion-icon>
          <h3>Sin devoluciones</h3>
          <p>No se encontraron registros para este filtro.</p>
        </section>
      </ng-template>

      <section class="info-box">
        <ion-icon name="information-circle-outline"></ion-icon>
        <p>
          Las devoluciones validadas se suman autom\xE1ticamente al stock del almac\xE9n.
        </p>
      </section>

    </div>

  </ng-container>

  <app-admin-bottom-nav activo="mas"></app-admin-bottom-nav>

</ion-content>`, styles: ["/* src/app/paginas/administrador/devoluciones/devoluciones.page.css */\n:host {\n  display: block;\n}\nion-content.devoluciones-root {\n  --background: var(--color-page-outside);\n}\n.devoluciones-container {\n  width: 100%;\n  max-width: var(--app-width);\n  min-height: 100dvh;\n  margin: 0 auto;\n  padding: 10px 12px calc(96px + env(safe-area-inset-bottom));\n  background: var(--color-background);\n}\n.page-title-row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n.btn-back {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: #ffffff;\n  color: var(--color-primary);\n  display: grid;\n  place-items: center;\n  box-shadow: var(--shadow-card);\n  flex-shrink: 0;\n}\n.btn-back ion-icon {\n  font-size: 20px;\n}\n.page-title-row h2 {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n.page-title-row p {\n  margin: 2px 0 0;\n  font-size: 10.5px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.tabs-row {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.tab-btn {\n  height: 42px;\n  border-radius: 10px;\n  border: 1px solid var(--color-border);\n  background: #ffffff;\n  color: var(--color-text);\n  font-size: 11px;\n  font-weight: 900;\n  font-family: var(--font-main);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n}\n.tab-btn span {\n  min-width: 18px;\n  height: 18px;\n  border-radius: 999px;\n  background: #eef2f7;\n  color: var(--color-text-muted);\n  display: grid;\n  place-items: center;\n  font-size: 9px;\n  font-weight: 900;\n}\n.tab-btn.active {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: #ffffff;\n}\n.tab-btn.active span {\n  background: rgba(255, 255, 255, 0.2);\n  color: #ffffff;\n}\n.devoluciones-list {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.devolucion-card {\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 14px;\n  box-shadow: var(--shadow-card);\n  padding: 12px;\n}\n.card-top {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 10px;\n}\n.card-top h3 {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 900;\n  color: var(--color-primary);\n}\n.card-top p {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 800;\n  color: var(--color-text);\n}\n.estado-badge {\n  min-height: 23px;\n  padding: 0 10px;\n  border-radius: 999px;\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n  font-size: 10px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n}\n.estado-badge.validada {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.card-info {\n  margin-top: 9px;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.card-info p {\n  margin: 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.card-info strong {\n  color: var(--color-text);\n}\n.card-bottom {\n  margin-top: 10px;\n  padding-top: 9px;\n  border-top: 1px solid #edf2f7;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.card-bottom > span {\n  font-size: 11px;\n  font-weight: 900;\n  color: var(--color-primary);\n}\n.card-actions {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n}\n.btn-detail,\n.btn-validate {\n  border: none;\n  font-family: var(--font-main);\n}\n.btn-detail {\n  width: 34px;\n  height: 34px;\n  border-radius: 12px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  display: grid;\n  place-items: center;\n}\n.btn-detail ion-icon {\n  font-size: 18px;\n}\n.btn-validate {\n  min-height: 34px;\n  padding: 0 12px;\n  border-radius: 12px;\n  background: var(--color-primary);\n  color: #ffffff;\n  font-size: 11px;\n  font-weight: 900;\n}\n.info-box,\n.empty-card {\n  background: #ffffff;\n  border: 1px solid var(--color-border);\n  border-radius: 15px;\n  box-shadow: var(--shadow-card);\n}\n.empty-card {\n  padding: 22px 14px;\n  text-align: center;\n}\n.empty-card ion-icon {\n  font-size: 30px;\n  color: var(--color-primary);\n}\n.empty-card h3 {\n  margin: 8px 0 4px;\n  font-size: 14px;\n  font-weight: 900;\n  color: var(--color-text);\n}\n.empty-card p {\n  margin: 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.info-box {\n  margin-top: 14px;\n  padding: 14px;\n  display: flex;\n  gap: 10px;\n  align-items: flex-start;\n  background: var(--color-primary-soft);\n}\n.info-box ion-icon {\n  font-size: 22px;\n  color: var(--color-primary);\n  flex-shrink: 0;\n}\n.info-box p {\n  margin: 0;\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--color-text);\n  line-height: 1.45;\n}\n/*# sourceMappingURL=devoluciones.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DevolucionesPage, { className: "DevolucionesPage", filePath: "src/app/paginas/administrador/devoluciones/devoluciones.page.ts", lineNumber: 35 });
})();
export {
  DevolucionesPage
};
//# sourceMappingURL=devoluciones.page-OJVE45XR.js.map
