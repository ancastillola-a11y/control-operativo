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
  DashboardAdminService,
  NotificacionDAO
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
import {
  Storage,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes
} from "./chunk-JNLTXSZR.js";
import "./chunk-GMY5SBXE.js";
import "./chunk-XEVVVGO7.js";
import {
  Auth,
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from "./chunk-NMRAWXHA.js";
import {
  AsyncPipe,
  BehaviorSubject,
  ChangeDetectorRef,
  CommonModule,
  Component,
  EventEmitter,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  Injectable,
  Input,
  NavController,
  NgClass,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgZone,
  Output,
  ReactiveFormsModule,
  Validators,
  combineLatest,
  inject,
  map,
  setClassMetadata,
  shareReplay,
  ɵNgNoValidate,
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
  ɵɵsanitizeUrl,
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

// src/app/dao/material.dao.ts
var _MaterialDAO = class _MaterialDAO {
  constructor() {
    this.firestore = inject(Firestore);
    this.storage = inject(Storage);
    this.auth = inject(Auth);
  }
  obtenerMaterialesUnaVez() {
    return __async(this, null, function* () {
      const refMateriales = collection(this.firestore, "materiales");
      const consulta = query(refMateriales, where("eliminado", "==", false));
      const snap = yield getDocs(consulta);
      return snap.docs.map((documento) => {
        const data = documento.data();
        return __spreadProps(__spreadValues({}, data), {
          id: documento.id,
          uid: data.uid || documento.id
        });
      });
    });
  }
  obtenerMaterialPorUid(uid) {
    return __async(this, null, function* () {
      if (!uid) {
        return null;
      }
      const refMaterial = doc(this.firestore, "materiales", uid);
      const snap = yield getDoc(refMaterial);
      if (!snap.exists()) {
        return null;
      }
      const data = snap.data();
      return __spreadProps(__spreadValues({}, data), {
        id: snap.id,
        uid: data.uid || snap.id
      });
    });
  }
  existeNombre(nombreNormalizado, uidIgnorado = "") {
    return __async(this, null, function* () {
      const refMateriales = collection(this.firestore, "materiales");
      const consulta = query(refMateriales, where("nombreNormalizado", "==", nombreNormalizado), where("eliminado", "==", false), limit(1));
      const snap = yield getDocs(consulta);
      if (snap.empty) {
        return false;
      }
      return snap.docs[0].id !== uidIgnorado;
    });
  }
  crearMaterial(material) {
    return __async(this, null, function* () {
      const refMaterial = doc(collection(this.firestore, "materiales"));
      const uid = refMaterial.id;
      const adminUid = this.auth.currentUser?.uid || "";
      const stockActual = Number(material.stockActual || 0);
      const stockMinimo = Number(material.stockMinimo || 0);
      yield setDoc(refMaterial, __spreadProps(__spreadValues({}, material), {
        uid,
        stockActual,
        stockMinimo,
        stockBajo: stockMinimo > 0 && stockActual <= stockMinimo,
        activo: true,
        eliminado: false,
        creadoPorUid: material.creadoPorUid || adminUid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }));
      return uid;
    });
  }
  editarMaterial(uid, data) {
    return __async(this, null, function* () {
      if (!uid) {
        throw new Error("material-uid-vacio");
      }
      const refMaterial = doc(this.firestore, "materiales", uid);
      const materialActual = yield this.obtenerMaterialPorUid(uid);
      const stockActual = data.stockActual !== void 0 ? Number(data.stockActual || 0) : Number(materialActual?.stockActual || 0);
      const stockMinimo = data.stockMinimo !== void 0 ? Number(data.stockMinimo || 0) : Number(materialActual?.stockMinimo || 0);
      const payload = __spreadProps(__spreadValues({}, data), {
        stockBajo: stockMinimo > 0 && stockActual <= stockMinimo,
        updatedAt: serverTimestamp()
      });
      yield updateDoc(refMaterial, payload);
    });
  }
  eliminarMaterial(uid) {
    return __async(this, null, function* () {
      if (!uid) {
        throw new Error("material-uid-vacio");
      }
      const refMaterial = doc(this.firestore, "materiales", uid);
      const adminUid = this.auth.currentUser?.uid || "";
      yield updateDoc(refMaterial, {
        eliminado: true,
        activo: false,
        eliminadoPorUid: adminUid,
        deletedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    });
  }
  subirImagenMaterial(materialUid, archivo) {
    return __async(this, null, function* () {
      if (!materialUid) {
        throw new Error("material-uid-vacio");
      }
      const extension = this.obtenerExtension(archivo.name);
      const nombreArchivo = `imagen_${Date.now()}.${extension}`;
      const imagenPath = `materiales/${materialUid}/${nombreArchivo}`;
      const storageRef = ref(this.storage, imagenPath);
      yield uploadBytes(storageRef, archivo, {
        contentType: archivo.type
      });
      const imagenUrl = yield getDownloadURL(storageRef);
      return {
        imagenUrl,
        imagenPath
      };
    });
  }
  eliminarImagenPorPath(imagenPath) {
    return __async(this, null, function* () {
      if (!imagenPath) {
        return;
      }
      const storageRef = ref(this.storage, imagenPath);
      try {
        yield deleteObject(storageRef);
      } catch (error) {
        console.warn("[MaterialDAO] No se pudo eliminar la imagen:", error);
      }
    });
  }
  registrarMovimiento(movimiento) {
    return __async(this, null, function* () {
      const refMovimiento = doc(collection(this.firestore, "movimientos_materiales"));
      const adminUid = this.auth.currentUser?.uid || "";
      yield setDoc(refMovimiento, __spreadProps(__spreadValues({}, movimiento), {
        realizadoPorUid: movimiento.realizadoPorUid || adminUid,
        createdAt: serverTimestamp()
      }));
    });
  }
  registrarHistorial(accion, descripcion, materialUid) {
    return __async(this, null, function* () {
      const adminUid = this.auth.currentUser?.uid || "";
      const refHistorial = doc(collection(this.firestore, "historial_actividades"));
      yield setDoc(refHistorial, {
        modulo: "SM-1.3 Gesti\xF3n de materiales",
        accion,
        descripcion,
        materialUid,
        realizadoPorUid: adminUid,
        createdAt: serverTimestamp()
      });
    });
  }
  obtenerExtension(nombreArchivo) {
    const partes = String(nombreArchivo || "").split(".");
    const extension = partes.length > 1 ? partes.pop() : "jpg";
    return String(extension || "jpg").toLowerCase();
  }
};
_MaterialDAO.\u0275fac = function MaterialDAO_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MaterialDAO)();
};
_MaterialDAO.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MaterialDAO, factory: _MaterialDAO.\u0275fac, providedIn: "root" });
var MaterialDAO = _MaterialDAO;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaterialDAO, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/procesos/material.service.ts
var _MaterialService = class _MaterialService {
  constructor() {
    this.dao = inject(MaterialDAO);
    this.notificacionDAO = inject(NotificacionDAO);
    this.auth = inject(Auth);
    this.zone = inject(NgZone);
    this.materialesSubject = new BehaviorSubject([]);
    this.busquedaSubject = new BehaviorSubject("");
    this.filtroSubject = new BehaviorSubject("todos");
    this.paginaSubject = new BehaviorSubject(1);
    this.tamanioPagina = 5;
    this.vm$ = combineLatest([
      this.materialesSubject.asObservable(),
      this.busquedaSubject.asObservable(),
      this.filtroSubject.asObservable(),
      this.paginaSubject.asObservable()
    ]).pipe(map(([materiales, busqueda, filtro, paginaActual]) => {
      const materialesFiltrados = this.aplicarFiltros(materiales, busqueda, filtro);
      const totalPaginas = Math.max(1, Math.ceil(materialesFiltrados.length / this.tamanioPagina));
      const paginaSegura = Math.min(Math.max(1, paginaActual), totalPaginas);
      const inicio = (paginaSegura - 1) * this.tamanioPagina;
      const fin = inicio + this.tamanioPagina;
      const materialesPagina = materialesFiltrados.slice(inicio, fin);
      const paginas = Array.from({ length: totalPaginas }, (_, index) => index + 1);
      return {
        materiales,
        materialesFiltrados,
        materialesPagina,
        busqueda,
        filtro,
        paginaActual: paginaSegura,
        totalPaginas,
        paginas,
        totalMateriales: materiales.length,
        totalDisponibles: materiales.filter((material) => material.estadoStock === "disponible").length,
        totalStockBajo: materiales.filter((material) => material.estadoStock === "bajo").length
      };
    }), shareReplay({
      bufferSize: 1,
      refCount: false
    }));
    void this.cargarMateriales();
  }
  cargarMateriales() {
    return __async(this, null, function* () {
      try {
        const materiales = yield this.dao.obtenerMaterialesUnaVez();
        const materialesVista = materiales.filter((material) => material.eliminado !== true).map((material) => this.mapearMaterialVista(material)).sort((a, b) => {
          const nombreA = a.nombre || "";
          const nombreB = b.nombre || "";
          return nombreA.localeCompare(nombreB);
        });
        this.zone.run(() => {
          this.materialesSubject.next(materialesVista);
        });
      } catch (error) {
        console.error("[MaterialService] Error al cargar materiales:", error);
        this.zone.run(() => {
          this.materialesSubject.next([]);
        });
      }
    });
  }
  refrescarVista() {
    return this.cargarMateriales();
  }
  cambiarBusqueda(valor) {
    this.busquedaSubject.next(String(valor || "").trim().toLowerCase());
    this.paginaSubject.next(1);
  }
  cambiarFiltro(filtro) {
    this.filtroSubject.next(filtro);
    this.paginaSubject.next(1);
  }
  obtenerFiltroActual() {
    return this.filtroSubject.value;
  }
  paginaAnterior() {
    const paginaActual = this.paginaSubject.value;
    if (paginaActual > 1) {
      this.paginaSubject.next(paginaActual - 1);
    }
  }
  paginaSiguiente(totalPaginas) {
    const paginaActual = this.paginaSubject.value;
    if (paginaActual < totalPaginas) {
      this.paginaSubject.next(paginaActual + 1);
    }
  }
  irPagina(pagina) {
    if (pagina >= 1) {
      this.paginaSubject.next(pagina);
    }
  }
  crearMaterial(data) {
    return __async(this, null, function* () {
      const nombre = String(data.nombre || "").trim();
      const nombreNormalizado = this.normalizarTexto(nombre);
      if (!nombre) {
        throw new Error("material-nombre-vacio");
      }
      if (yield this.dao.existeNombre(nombreNormalizado)) {
        throw new Error("material-duplicado");
      }
      const stockInicial = Number(data.stockInicial || 0);
      const stockMinimo = Number(data.stockMinimo || 0);
      const unidad = String(data.unidad || "").trim();
      const adminUid = this.auth.currentUser?.uid || "";
      const material = {
        nombre,
        nombreNormalizado,
        unidad,
        categoria: String(data.categoria || "").trim(),
        descripcion: String(data.descripcion || "").trim(),
        stockActual: stockInicial,
        stockMinimo,
        imagenUrl: "",
        imagenPath: "",
        activo: true,
        eliminado: false,
        creadoPorUid: adminUid
      };
      const materialUid = yield this.dao.crearMaterial(material);
      yield this.sincronizarAlertaStockBajo(materialUid, nombre, stockInicial, stockMinimo, unidad);
      if (data.imagenFile) {
        const imagen = yield this.dao.subirImagenMaterial(materialUid, data.imagenFile);
        yield this.dao.editarMaterial(materialUid, {
          imagenUrl: imagen.imagenUrl,
          imagenPath: imagen.imagenPath
        });
      }
      if (stockInicial > 0) {
        yield this.dao.registrarMovimiento({
          materialUid,
          materialNombre: nombre,
          tipoMovimiento: "entrada",
          cantidad: stockInicial,
          stockAntes: 0,
          stockDespues: stockInicial,
          moduloOrigen: "registro_material",
          descripcion: "Registro inicial de material"
        });
      }
      yield this.dao.registrarHistorial("crear_material", `Se registr\xF3 el material ${nombre}.`, materialUid);
      yield this.cargarMateriales();
    });
  }
  editarMaterial(data) {
    return __async(this, null, function* () {
      const nombre = String(data.nombre || "").trim();
      const nombreNormalizado = this.normalizarTexto(nombre);
      if (!data.uid) {
        throw new Error("material-uid-vacio");
      }
      if (!nombre) {
        throw new Error("material-nombre-vacio");
      }
      if (yield this.dao.existeNombre(nombreNormalizado, data.uid)) {
        throw new Error("material-duplicado");
      }
      const materialActual = yield this.dao.obtenerMaterialPorUid(data.uid);
      const stockActual = Number(materialActual?.stockActual || 0);
      const stockMinimoNuevo = Number(data.stockMinimo || 0);
      const unidad = String(data.unidad || materialActual?.unidad || "").trim();
      const payload = {
        nombre,
        nombreNormalizado,
        unidad,
        categoria: String(data.categoria || "").trim(),
        descripcion: String(data.descripcion || "").trim(),
        stockMinimo: stockMinimoNuevo,
        actualizadoPorUid: this.auth.currentUser?.uid || ""
      };
      if (data.quitarImagen) {
        if (data.imagenPathActual) {
          yield this.dao.eliminarImagenPorPath(data.imagenPathActual);
        }
        payload.imagenUrl = "";
        payload.imagenPath = "";
      }
      if (data.imagenFile) {
        if (data.imagenPathActual) {
          yield this.dao.eliminarImagenPorPath(data.imagenPathActual);
        }
        const imagen = yield this.dao.subirImagenMaterial(data.uid, data.imagenFile);
        payload.imagenUrl = imagen.imagenUrl;
        payload.imagenPath = imagen.imagenPath;
      }
      yield this.dao.editarMaterial(data.uid, payload);
      yield this.sincronizarAlertaStockBajo(data.uid, nombre, stockActual, stockMinimoNuevo, unidad);
      yield this.dao.registrarHistorial("editar_material", `Se actualiz\xF3 el material ${nombre}.`, data.uid);
      yield this.cargarMateriales();
    });
  }
  eliminarMaterial(uid, nombre) {
    return __async(this, null, function* () {
      if (!uid) {
        throw new Error("material-uid-vacio");
      }
      yield this.dao.eliminarMaterial(uid);
      yield this.notificacionDAO.resolverAlertaStockBajo(uid);
      yield this.dao.registrarHistorial("eliminar_material", `Se elimin\xF3 el material ${nombre}.`, uid);
      yield this.cargarMateriales();
    });
  }
  normalizarTexto(valor) {
    return String(valor || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ");
  }
  sincronizarAlertaStockBajo(materialUid, nombre, stockActual, stockMinimo, unidad) {
    return __async(this, null, function* () {
      try {
        const estaEnStockBajo = stockMinimo > 0 && stockActual <= stockMinimo;
        if (estaEnStockBajo) {
          yield this.notificacionDAO.crearOActualizarAlertaStockBajo({
            materialUid,
            materialNombre: nombre,
            stockActual,
            stockMinimo,
            unidad
          });
          return;
        }
        yield this.notificacionDAO.resolverAlertaStockBajo(materialUid);
      } catch (error) {
        console.warn("[MaterialService] No se pudo sincronizar la alerta de stock bajo:", error);
      }
    });
  }
  aplicarFiltros(materiales, busqueda, filtro) {
    let resultado = [...materiales];
    if (filtro === "disponibles") {
      resultado = resultado.filter((material) => material.estadoStock === "disponible");
    }
    if (filtro === "stockBajo") {
      resultado = resultado.filter((material) => material.estadoStock === "bajo");
    }
    const termino = String(busqueda || "").trim().toLowerCase();
    if (termino) {
      resultado = resultado.filter((material) => {
        const textoBusqueda = [
          material.nombre,
          material.unidad,
          material.categoria,
          material.descripcion,
          material.estadoTexto
        ].join(" ").toLowerCase();
        return textoBusqueda.includes(termino);
      });
    }
    return resultado;
  }
  mapearMaterialVista(material) {
    const stockActual = Number(material.stockActual || 0);
    const stockMinimo = Number(material.stockMinimo || 0);
    const estadoStock = stockMinimo > 0 && stockActual <= stockMinimo ? "bajo" : "disponible";
    const estadoTexto = estadoStock === "bajo" ? "Stock bajo" : "Disponible";
    return __spreadProps(__spreadValues({}, material), {
      uid: material.uid || material.id,
      iniciales: this.obtenerIniciales(material.nombre),
      estadoStock,
      estadoTexto,
      stockTexto: `${stockActual} ${material.unidad}`,
      stockMinimoTexto: `${stockMinimo} ${material.unidad}`
    });
  }
  obtenerIniciales(nombre) {
    const palabras = String(nombre || "").trim().split(/\s+/).filter(Boolean);
    const iniciales = palabras.slice(0, 2).map((palabra) => palabra.charAt(0)).join("").toUpperCase();
    return iniciales || "MT";
  }
};
_MaterialService.\u0275fac = function MaterialService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MaterialService)();
};
_MaterialService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MaterialService, factory: _MaterialService.\u0275fac, providedIn: "root" });
var MaterialService = _MaterialService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaterialService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/app/shared/componentes/material-card/material-card.component.ts
function MaterialCardComponent_img_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 14);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.material.imagenUrl, \u0275\u0275sanitizeUrl);
  }
}
function MaterialCardComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.material.iniciales);
  }
}
var _MaterialCardComponent = class _MaterialCardComponent {
  constructor() {
    this.acciones = new EventEmitter();
  }
  abrirAcciones() {
    this.acciones.emit(this.material);
  }
};
_MaterialCardComponent.\u0275fac = function MaterialCardComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MaterialCardComponent)();
};
_MaterialCardComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MaterialCardComponent, selectors: [["app-material-card"]], inputs: { material: "material" }, outputs: { acciones: "acciones" }, decls: 24, vars: 8, consts: [["imagenDefault", ""], [1, "material-card"], [1, "material-main"], [1, "material-image"], ["alt", "Imagen del material", 3, "src", 4, "ngIf", "ngIfElse"], [1, "material-info"], [1, "material-categoria"], [1, "material-meta"], ["name", "cube-outline"], ["name", "alert-circle-outline"], [1, "material-side"], [1, "estado-badge", 3, "ngClass"], ["type", "button", "aria-label", "Acciones del material", 1, "btn-more", 3, "click"], [1, "dots-text"], ["alt", "Imagen del material", 3, "src"]], template: function MaterialCardComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 1)(1, "div", 2)(2, "div", 3);
    \u0275\u0275template(3, MaterialCardComponent_img_3_Template, 1, 1, "img", 4)(4, MaterialCardComponent_ng_template_4_Template, 2, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 5)(7, "h3");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 6);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 7)(12, "span");
    \u0275\u0275element(13, "ion-icon", 8);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275element(16, "ion-icon", 9);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(18, "div", 10)(19, "span", 11);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 12);
    \u0275\u0275listener("click", function MaterialCardComponent_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.abrirAcciones());
    });
    \u0275\u0275elementStart(22, "span", 13);
    \u0275\u0275text(23, "\u22EE");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const imagenDefault_r3 = \u0275\u0275reference(5);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx.material.imagenUrl)("ngIfElse", imagenDefault_r3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.material.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.material.categoria, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.material.stockTexto, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" M\xEDn. ", ctx.material.stockMinimoTexto, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx.material.estadoStock === "bajo" ? "bajo" : "disponible");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.material.estadoTexto, " ");
  }
}, dependencies: [CommonModule, NgClass, NgIf, IonicModule, IonIcon], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  font-family: var(--font-main);\n}\n.material-card[_ngcontent-%COMP%] {\n  background: var(--color-card);\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  padding: 11px;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 78px;\n  align-items: center;\n  gap: 8px;\n  box-shadow: var(--shadow-card);\n}\n.material-main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n}\n.material-image[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  border-radius: 16px;\n  background: var(--color-primary-soft);\n  overflow: hidden;\n  display: grid;\n  place-items: center;\n  color: var(--color-primary);\n  font-size: 13px;\n  font-weight: 700;\n  flex-shrink: 0;\n  border: 1px solid #dbe8ff;\n}\n.material-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.material-info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.material-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--color-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.material-categoria[_ngcontent-%COMP%] {\n  margin: 3px 0 6px;\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.material-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n}\n.material-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  max-width: 145px;\n  height: 22px;\n  padding: 0 7px;\n  border-radius: 999px;\n  background: #f1f5f9;\n  color: #475569;\n  font-size: 9.8px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.material-meta[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #64748b;\n  flex-shrink: 0;\n}\n.material-side[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.estado-badge[_ngcontent-%COMP%] {\n  min-width: 74px;\n  height: 25px;\n  padding: 0 8px;\n  border-radius: 999px;\n  font-size: 9.8px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.estado-badge.disponible[_ngcontent-%COMP%] {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.estado-badge.bajo[_ngcontent-%COMP%] {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.btn-more[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 34px;\n  border: 1px solid #dbe3ef;\n  border-radius: 12px;\n  background: #f8fafc;\n  color: var(--color-primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  flex-shrink: 0;\n}\n.dots-text[_ngcontent-%COMP%] {\n  font-size: 28px;\n  line-height: 1;\n  font-weight: 700;\n  color: var(--color-primary);\n  transform: translateY(-2px);\n}\n.btn-more[_ngcontent-%COMP%]:active {\n  transform: scale(0.94);\n  background: var(--color-primary-soft);\n}\n@media (max-width: 360px) {\n  .material-card[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .material-side[_ngcontent-%COMP%] {\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n  }\n}\n/*# sourceMappingURL=material-card.component.css.map */"] });
var MaterialCardComponent = _MaterialCardComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaterialCardComponent, [{
    type: Component,
    args: [{ selector: "app-material-card", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: `<!-- src/app/shared/componentes/material-card/material-card.component.html -->

<article class="material-card">

  <div class="material-main">

    <div class="material-image">
      <img
        *ngIf="material.imagenUrl; else imagenDefault"
        [src]="material.imagenUrl"
        alt="Imagen del material"
      />

      <ng-template #imagenDefault>
        <span>{{ material.iniciales }}</span>
      </ng-template>
    </div>

    <div class="material-info">

      <h3>{{ material.nombre }}</h3>

      <p class="material-categoria">
        {{ material.categoria }}
      </p>

      <div class="material-meta">

        <span>
          <ion-icon name="cube-outline"></ion-icon>
          {{ material.stockTexto }}
        </span>

        <span>
          <ion-icon name="alert-circle-outline"></ion-icon>
          M\xEDn. {{ material.stockMinimoTexto }}
        </span>

      </div>

    </div>

  </div>

  <div class="material-side">

    <span
      class="estado-badge"
      [ngClass]="material.estadoStock === 'bajo' ? 'bajo' : 'disponible'"
    >
      {{ material.estadoTexto }}
    </span>

    <button
      type="button"
      class="btn-more"
      aria-label="Acciones del material"
      (click)="abrirAcciones()"
    >
      <span class="dots-text">\u22EE</span>
    </button>

  </div>

</article>`, styles: ["/* src/app/shared/componentes/material-card/material-card.component.css */\n:host {\n  display: block;\n  font-family: var(--font-main);\n}\n.material-card {\n  background: var(--color-card);\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  padding: 11px;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 78px;\n  align-items: center;\n  gap: 8px;\n  box-shadow: var(--shadow-card);\n}\n.material-main {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n}\n.material-image {\n  width: 50px;\n  height: 50px;\n  border-radius: 16px;\n  background: var(--color-primary-soft);\n  overflow: hidden;\n  display: grid;\n  place-items: center;\n  color: var(--color-primary);\n  font-size: 13px;\n  font-weight: 700;\n  flex-shrink: 0;\n  border: 1px solid #dbe8ff;\n}\n.material-image img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.material-info {\n  min-width: 0;\n}\n.material-info h3 {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--color-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.material-categoria {\n  margin: 3px 0 6px;\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.material-meta {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n}\n.material-meta span {\n  max-width: 145px;\n  height: 22px;\n  padding: 0 7px;\n  border-radius: 999px;\n  background: #f1f5f9;\n  color: #475569;\n  font-size: 9.8px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.material-meta ion-icon {\n  font-size: 12px;\n  color: #64748b;\n  flex-shrink: 0;\n}\n.material-side {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.estado-badge {\n  min-width: 74px;\n  height: 25px;\n  padding: 0 8px;\n  border-radius: 999px;\n  font-size: 9.8px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.estado-badge.disponible {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.estado-badge.bajo {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.btn-more {\n  width: 36px;\n  height: 34px;\n  border: 1px solid #dbe3ef;\n  border-radius: 12px;\n  background: #f8fafc;\n  color: var(--color-primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  flex-shrink: 0;\n}\n.dots-text {\n  font-size: 28px;\n  line-height: 1;\n  font-weight: 700;\n  color: var(--color-primary);\n  transform: translateY(-2px);\n}\n.btn-more:active {\n  transform: scale(0.94);\n  background: var(--color-primary-soft);\n}\n@media (max-width: 360px) {\n  .material-card {\n    grid-template-columns: 1fr;\n  }\n  .material-side {\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n  }\n}\n/*# sourceMappingURL=material-card.component.css.map */\n"] }]
  }], null, { material: [{
    type: Input
  }], acciones: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MaterialCardComponent, { className: "MaterialCardComponent", filePath: "src/app/shared/componentes/material-card/material-card.component.ts", lineNumber: 18 });
})();

// src/app/shared/componentes/material-form-modal/material-form-modal.component.ts
function MaterialFormModalComponent_img_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 35);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.imagenPreview, \u0275\u0275sanitizeUrl);
  }
}
function MaterialFormModalComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 11);
  }
}
function MaterialFormModalComponent_button_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function MaterialFormModalComponent_button_30_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.quitarImagenActual());
    });
    \u0275\u0275text(1, " Quitar imagen ");
    \u0275\u0275elementEnd();
  }
}
function MaterialFormModalComponent_ion_select_option_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-select-option", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const unidad_r4 = ctx.$implicit;
    \u0275\u0275property("value", unidad_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", unidad_r4, " ");
  }
}
function MaterialFormModalComponent_ion_select_option_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-select-option", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const categoria_r5 = ctx.$implicit;
    \u0275\u0275property("value", categoria_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", categoria_r5, " ");
  }
}
var _MaterialFormModalComponent = class _MaterialFormModalComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.modalCtrl = inject(ModalController);
    this.toastCtrl = inject(ToastController);
    this.modo = "crear";
    this.material = null;
    this.imagenPreview = "";
    this.imagenFile = null;
    this.quitarImagen = false;
    this.unidades = [
      "Unidad",
      "Metro",
      "Kilogramo",
      "Bolsa",
      "Caja",
      "Gal\xF3n",
      "Litro",
      "Rollo",
      "Paquete"
    ];
    this.categorias = [
      "Electrico",
      "Construcci\xF3n",
      "Ferreter\xEDa",
      "Pintura",
      "Herramientas",
      "Seguridad",
      "Otros"
    ];
    this.formulario = this.fb.group({
      nombre: ["", [Validators.required]],
      unidad: ["", [Validators.required]],
      categoria: ["", [Validators.required]],
      stockInicial: [0, [Validators.required, Validators.min(0)]],
      stockMinimo: [0, [Validators.required, Validators.min(0)]],
      descripcion: [""]
    });
  }
  ngOnInit() {
    if (this.esEditar && this.material) {
      this.formulario.patchValue({
        nombre: this.material.nombre || "",
        unidad: this.material.unidad || "",
        categoria: this.material.categoria || "",
        stockInicial: Number(this.material.stockActual || 0),
        stockMinimo: Number(this.material.stockMinimo || 0),
        descripcion: this.material.descripcion || ""
      });
      this.imagenPreview = this.material.imagenUrl || "";
    }
  }
  get esCrear() {
    return this.modo === "crear";
  }
  get esEditar() {
    return this.modo === "editar";
  }
  get titulo() {
    return this.esCrear ? "Nuevo material" : "Editar material";
  }
  get subtitulo() {
    return this.esCrear ? "Registra material, stock inicial e imagen." : "Actualiza datos generales del material.";
  }
  get textoBoton() {
    return this.esCrear ? "Registrar" : "Guardar";
  }
  seleccionarImagen(event) {
    const input = event.target;
    const archivo = input.files?.[0];
    if (!archivo) {
      return;
    }
    if (!archivo.type.startsWith("image/")) {
      this.mostrarToast("Seleccione una imagen v\xC3\xA1lida");
      return;
    }
    this.imagenFile = archivo;
    this.quitarImagen = false;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagenPreview = String(reader.result || "");
    };
    reader.readAsDataURL(archivo);
  }
  quitarImagenActual() {
    this.imagenFile = null;
    this.imagenPreview = "";
    this.quitarImagen = true;
  }
  cancelar() {
    this.modalCtrl.dismiss(null, "cancel");
  }
  guardar() {
    return __async(this, null, function* () {
      this.formulario.markAllAsTouched();
      if (this.formulario.invalid) {
        this.mostrarToast("Complete correctamente los campos obligatorios");
        return;
      }
      const data = this.formulario.getRawValue();
      const payload = {
        nombre: String(data.nombre || "").trim(),
        unidad: String(data.unidad || "").trim(),
        categoria: String(data.categoria || "").trim(),
        descripcion: String(data.descripcion || "").trim(),
        stockInicial: Number(data.stockInicial || 0),
        stockMinimo: Number(data.stockMinimo || 0),
        imagenFile: this.imagenFile,
        quitarImagen: this.quitarImagen
      };
      if (this.esEditar && this.material?.uid) {
        payload.uid = this.material.uid;
        payload.imagenPathActual = this.material.imagenPath || "";
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
_MaterialFormModalComponent.\u0275fac = function MaterialFormModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MaterialFormModalComponent)();
};
_MaterialFormModalComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MaterialFormModalComponent, selectors: [["app-material-form-modal"]], inputs: { modo: "modo", material: "material" }, decls: 77, vars: 12, consts: [["imagenVacia", ""], [1, "modal-header"], [1, "modal-title-box"], [1, "modal-avatar"], ["name", "cube-outline"], ["type", "button", "slot", "end", 1, "btn-close", 3, "click"], ["name", "close-outline"], [1, "modal-content"], [1, "form-wrapper", 3, "ngSubmit", "formGroup"], [1, "form-card"], [1, "form-section-title"], ["name", "image-outline"], [1, "image-uploader"], [1, "image-preview"], ["alt", "Imagen material", 3, "src", 4, "ngIf", "ngIfElse"], [1, "image-actions"], [1, "btn-image"], ["name", "camera-outline"], ["type", "file", "accept", "image/*", "hidden", "", 3, "change"], ["type", "button", "class", "btn-remove-image", 3, "click", 4, "ngIf"], [1, "field-group"], ["lines", "none", 1, "input-card"], ["formControlName", "nombre", "placeholder", "Ejemplo: Cemento Portland"], [1, "form-grid"], ["formControlName", "unidad", "interface", "popover", "placeholder", "Unidad"], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "categoria", "interface", "popover", "placeholder", "Categor\xEDa"], ["formControlName", "stockInicial", "type", "number", "inputmode", "decimal", "placeholder", "0", 3, "readonly"], ["formControlName", "stockMinimo", "type", "number", "inputmode", "decimal", "placeholder", "0"], ["lines", "none", 1, "input-card", "textarea-card"], ["formControlName", "descripcion", "placeholder", "Detalle opcional del material", "autoGrow", "true"], [1, "modal-actions"], ["type", "button", 1, "btn-cancelar", 3, "click"], ["type", "submit", 1, "btn-guardar"], ["name", "save-outline"], ["alt", "Imagen material", 3, "src"], ["type", "button", 1, "btn-remove-image", 3, "click"], [3, "value"]], template: function MaterialFormModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
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
    \u0275\u0275listener("click", function MaterialFormModalComponent_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.cancelar());
    });
    \u0275\u0275element(11, "ion-icon", 6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "ion-content", 7)(13, "form", 8);
    \u0275\u0275listener("ngSubmit", function MaterialFormModalComponent_Template_form_ngSubmit_13_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.guardar());
    });
    \u0275\u0275elementStart(14, "section", 9)(15, "div", 10);
    \u0275\u0275element(16, "ion-icon", 11);
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18, "Imagen del material");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 12)(20, "div", 13);
    \u0275\u0275template(21, MaterialFormModalComponent_img_21_Template, 1, 1, "img", 14)(22, MaterialFormModalComponent_ng_template_22_Template, 1, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 15)(25, "label", 16);
    \u0275\u0275element(26, "ion-icon", 17);
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 18);
    \u0275\u0275listener("change", function MaterialFormModalComponent_Template_input_change_29_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.seleccionarImagen($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(30, MaterialFormModalComponent_button_30_Template, 2, 0, "button", 19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "section", 9)(32, "div", 10);
    \u0275\u0275element(33, "ion-icon", 4);
    \u0275\u0275elementStart(34, "span");
    \u0275\u0275text(35, "Datos del material");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 20)(37, "label");
    \u0275\u0275text(38, "Nombre del material");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "ion-item", 21);
    \u0275\u0275element(40, "ion-input", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 23)(42, "div", 20)(43, "label");
    \u0275\u0275text(44, "Unidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "ion-item", 21)(46, "ion-select", 24);
    \u0275\u0275template(47, MaterialFormModalComponent_ion_select_option_47_Template, 2, 2, "ion-select-option", 25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(48, "div", 20)(49, "label");
    \u0275\u0275text(50, "Categor\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "ion-item", 21)(52, "ion-select", 26);
    \u0275\u0275template(53, MaterialFormModalComponent_ion_select_option_53_Template, 2, 2, "ion-select-option", 25);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(54, "div", 23)(55, "div", 20)(56, "label");
    \u0275\u0275text(57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "ion-item", 21);
    \u0275\u0275element(59, "ion-input", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "div", 20)(61, "label");
    \u0275\u0275text(62, "Stock m\xEDnimo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "ion-item", 21);
    \u0275\u0275element(64, "ion-input", 28);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(65, "div", 20)(66, "label");
    \u0275\u0275text(67, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "ion-item", 29);
    \u0275\u0275element(69, "ion-textarea", 30);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(70, "div", 31)(71, "button", 32);
    \u0275\u0275listener("click", function MaterialFormModalComponent_Template_button_click_71_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.cancelar());
    });
    \u0275\u0275text(72, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "button", 33);
    \u0275\u0275element(74, "ion-icon", 34);
    \u0275\u0275elementStart(75, "span");
    \u0275\u0275text(76);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const imagenVacia_r6 = \u0275\u0275reference(23);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.subtitulo);
    \u0275\u0275advance(4);
    \u0275\u0275property("formGroup", ctx.formulario);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ctx.imagenPreview)("ngIfElse", imagenVacia_r6);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx.imagenPreview ? "Cambiar imagen" : "Subir imagen");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx.imagenPreview);
    \u0275\u0275advance(17);
    \u0275\u0275property("ngForOf", ctx.unidades);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx.categorias);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.esCrear ? "Stock inicial" : "Stock actual");
    \u0275\u0275advance(2);
    \u0275\u0275property("readonly", ctx.esEditar);
    \u0275\u0275advance(17);
    \u0275\u0275textInterpolate(ctx.textoBoton);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, IonicModule, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonSelect, IonSelectOption, IonTextarea, IonToolbar, NumericValueAccessorDirective, SelectValueAccessorDirective, TextValueAccessorDirective, ReactiveFormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: var(--color-background);\n  font-family: var(--font-main);\n}\n.modal-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      135deg,\n      var(--color-primary),\n      var(--color-primary-hover));\n  --color: #ffffff;\n  --min-height: 86px;\n  --padding-start: 14px;\n  --padding-end: 12px;\n}\n.modal-title-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.modal-avatar[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.16);\n  border: 1px solid rgba(255, 255, 255, 0.22);\n  display: grid;\n  place-items: center;\n  color: #ffffff;\n  flex-shrink: 0;\n}\n.modal-avatar[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.modal-title-box[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 17px;\n  font-weight: 700;\n  color: #ffffff;\n}\n.modal-title-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: #ffd166;\n}\n.btn-close[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.13);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n}\n.btn-close[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.modal-content[_ngcontent-%COMP%] {\n  --background: var(--color-background);\n  flex: 1;\n}\n.form-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: var(--app-width);\n  margin: 0 auto;\n  padding: 14px 14px 18px;\n}\n.form-card[_ngcontent-%COMP%] {\n  background: var(--color-card);\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  padding: 14px;\n  margin-bottom: 12px;\n  box-shadow: var(--shadow-card);\n}\n.form-section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  margin-bottom: 12px;\n  color: var(--color-text);\n  font-size: 13px;\n  font-weight: 700;\n}\n.form-section-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n  color: var(--color-primary);\n}\n.image-uploader[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 78px 1fr;\n  gap: 12px;\n  align-items: center;\n}\n.image-preview[_ngcontent-%COMP%] {\n  width: 78px;\n  height: 78px;\n  border-radius: 18px;\n  background: var(--color-primary-soft);\n  border: 1px dashed var(--color-primary);\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n  color: var(--color-primary);\n}\n.image-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.image-preview[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 30px;\n}\n.image-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.btn-image[_ngcontent-%COMP%], \n.btn-remove-image[_ngcontent-%COMP%] {\n  height: 36px;\n  border-radius: 10px;\n  font-size: 12px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  font-family: var(--font-main);\n}\n.btn-image[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #ffffff;\n  border: none;\n}\n.btn-remove-image[_ngcontent-%COMP%] {\n  background: #ffffff;\n  color: var(--color-error);\n  border: 1px solid var(--color-error-bg);\n}\n.field-group[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.field-group[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.field-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-text);\n}\n.input-card[_ngcontent-%COMP%] {\n  --background: #ffffff;\n  --border-radius: 10px;\n  --min-height: 44px;\n  --padding-start: 12px;\n  --inner-padding-end: 10px;\n  border: 1px solid var(--color-border);\n  border-radius: 10px;\n}\n.input-card[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px rgba(26, 62, 140, 0.12);\n}\n.input-card[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%], \n.input-card[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%], \n.input-card[_ngcontent-%COMP%]   ion-textarea[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--color-text);\n}\n.textarea-card[_ngcontent-%COMP%] {\n  min-height: 78px;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.modal-actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n  padding-top: 2px;\n}\n.btn-cancelar[_ngcontent-%COMP%], \n.btn-guardar[_ngcontent-%COMP%] {\n  height: 44px;\n  border: none;\n  border-radius: 10px;\n  font-size: 13px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  font-family: var(--font-main);\n}\n.btn-cancelar[_ngcontent-%COMP%] {\n  background: #ffffff;\n  color: var(--color-text-muted);\n  border: 1px solid var(--color-border);\n}\n.btn-guardar[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #ffffff;\n  box-shadow: var(--shadow-button);\n}\n@media (max-width: 360px) {\n  .image-uploader[_ngcontent-%COMP%], \n   .form-grid[_ngcontent-%COMP%], \n   .modal-actions[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .image-preview[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 140px;\n  }\n}\n/*# sourceMappingURL=material-form-modal.component.css.map */"] });
var MaterialFormModalComponent = _MaterialFormModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaterialFormModalComponent, [{
    type: Component,
    args: [{ selector: "app-material-form-modal", standalone: true, imports: [
      CommonModule,
      IonicModule,
      ReactiveFormsModule
    ], template: `<!-- src/app/shared/componentes/material-form-modal/material-form-modal.component.html -->

<ion-header class="modal-header">
  <ion-toolbar>

    <div class="modal-title-box">
      <div class="modal-avatar">
        <ion-icon name="cube-outline"></ion-icon>
      </div>

      <div>
        <h2>{{ titulo }}</h2>
        <p>{{ subtitulo }}</p>
      </div>
    </div>

    <button type="button" class="btn-close" slot="end" (click)="cancelar()">
      <ion-icon name="close-outline"></ion-icon>
    </button>

  </ion-toolbar>
</ion-header>

<ion-content class="modal-content">

  <form [formGroup]="formulario" (ngSubmit)="guardar()" class="form-wrapper">

    <section class="form-card">

      <div class="form-section-title">
        <ion-icon name="image-outline"></ion-icon>
        <span>Imagen del material</span>
      </div>

      <div class="image-uploader">

        <div class="image-preview">
          <img
            *ngIf="imagenPreview; else imagenVacia"
            [src]="imagenPreview"
            alt="Imagen material"
          />

          <ng-template #imagenVacia>
            <ion-icon name="image-outline"></ion-icon>
          </ng-template>
        </div>

        <div class="image-actions">
          <label class="btn-image">
            <ion-icon name="camera-outline"></ion-icon>
            <span>{{ imagenPreview ? 'Cambiar imagen' : 'Subir imagen' }}</span>
            <input
              type="file"
              accept="image/*"
              hidden
              (change)="seleccionarImagen($event)"
            />
          </label>

          <button
            *ngIf="imagenPreview"
            type="button"
            class="btn-remove-image"
            (click)="quitarImagenActual()"
          >
            Quitar imagen
          </button>
        </div>

      </div>

    </section>

    <section class="form-card">

      <div class="form-section-title">
        <ion-icon name="cube-outline"></ion-icon>
        <span>Datos del material</span>
      </div>

      <div class="field-group">
        <label>Nombre del material</label>
        <ion-item lines="none" class="input-card">
          <ion-input
            formControlName="nombre"
            placeholder="Ejemplo: Cemento Portland"
          ></ion-input>
        </ion-item>
      </div>

      <div class="form-grid">

        <div class="field-group">
          <label>Unidad</label>
          <ion-item lines="none" class="input-card">
            <ion-select
              formControlName="unidad"
              interface="popover"
              placeholder="Unidad"
            >
              <ion-select-option
                *ngFor="let unidad of unidades"
                [value]="unidad"
              >
                {{ unidad }}
              </ion-select-option>
            </ion-select>
          </ion-item>
        </div>

        <div class="field-group">
          <label>Categor\xEDa</label>
          <ion-item lines="none" class="input-card">
            <ion-select
              formControlName="categoria"
              interface="popover"
              placeholder="Categor\xEDa"
            >
              <ion-select-option
                *ngFor="let categoria of categorias"
                [value]="categoria"
              >
                {{ categoria }}
              </ion-select-option>
            </ion-select>
          </ion-item>
        </div>

      </div>

      <div class="form-grid">

        <div class="field-group">
          <label>{{ esCrear ? 'Stock inicial' : 'Stock actual' }}</label>
          <ion-item lines="none" class="input-card">
            <ion-input
              formControlName="stockInicial"
              type="number"
              inputmode="decimal"
              [readonly]="esEditar"
              placeholder="0"
            ></ion-input>
          </ion-item>
        </div>

        <div class="field-group">
          <label>Stock m\xEDnimo</label>
          <ion-item lines="none" class="input-card">
            <ion-input
              formControlName="stockMinimo"
              type="number"
              inputmode="decimal"
              placeholder="0"
            ></ion-input>
          </ion-item>
        </div>

      </div>

      <div class="field-group">
        <label>Descripci\xF3n</label>
        <ion-item lines="none" class="input-card textarea-card">
          <ion-textarea
            formControlName="descripcion"
            placeholder="Detalle opcional del material"
            autoGrow="true"
          ></ion-textarea>
        </ion-item>
      </div>

    </section>

    <div class="modal-actions">
      <button type="button" class="btn-cancelar" (click)="cancelar()">
        Cancelar
      </button>

      <button type="submit" class="btn-guardar">
        <ion-icon name="save-outline"></ion-icon>
        <span>{{ textoBoton }}</span>
      </button>
    </div>

  </form>

</ion-content>`, styles: ["/* src/app/shared/componentes/material-form-modal/material-form-modal.component.css */\n:host {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: var(--color-background);\n  font-family: var(--font-main);\n}\n.modal-header ion-toolbar {\n  --background:\n    linear-gradient(\n      135deg,\n      var(--color-primary),\n      var(--color-primary-hover));\n  --color: #ffffff;\n  --min-height: 86px;\n  --padding-start: 14px;\n  --padding-end: 12px;\n}\n.modal-title-box {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.modal-avatar {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.16);\n  border: 1px solid rgba(255, 255, 255, 0.22);\n  display: grid;\n  place-items: center;\n  color: #ffffff;\n  flex-shrink: 0;\n}\n.modal-avatar ion-icon {\n  font-size: 22px;\n}\n.modal-title-box h2 {\n  margin: 0;\n  font-size: 17px;\n  font-weight: 700;\n  color: #ffffff;\n}\n.modal-title-box p {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: #ffd166;\n}\n.btn-close {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.13);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n}\n.btn-close ion-icon {\n  font-size: 22px;\n}\n.modal-content {\n  --background: var(--color-background);\n  flex: 1;\n}\n.form-wrapper {\n  width: 100%;\n  max-width: var(--app-width);\n  margin: 0 auto;\n  padding: 14px 14px 18px;\n}\n.form-card {\n  background: var(--color-card);\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  padding: 14px;\n  margin-bottom: 12px;\n  box-shadow: var(--shadow-card);\n}\n.form-section-title {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  margin-bottom: 12px;\n  color: var(--color-text);\n  font-size: 13px;\n  font-weight: 700;\n}\n.form-section-title ion-icon {\n  font-size: 17px;\n  color: var(--color-primary);\n}\n.image-uploader {\n  display: grid;\n  grid-template-columns: 78px 1fr;\n  gap: 12px;\n  align-items: center;\n}\n.image-preview {\n  width: 78px;\n  height: 78px;\n  border-radius: 18px;\n  background: var(--color-primary-soft);\n  border: 1px dashed var(--color-primary);\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n  color: var(--color-primary);\n}\n.image-preview img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.image-preview ion-icon {\n  font-size: 30px;\n}\n.image-actions {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.btn-image,\n.btn-remove-image {\n  height: 36px;\n  border-radius: 10px;\n  font-size: 12px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  font-family: var(--font-main);\n}\n.btn-image {\n  background: var(--color-primary);\n  color: #ffffff;\n  border: none;\n}\n.btn-remove-image {\n  background: #ffffff;\n  color: var(--color-error);\n  border: 1px solid var(--color-error-bg);\n}\n.field-group {\n  margin-bottom: 12px;\n}\n.field-group:last-child {\n  margin-bottom: 0;\n}\n.field-group label {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-text);\n}\n.input-card {\n  --background: #ffffff;\n  --border-radius: 10px;\n  --min-height: 44px;\n  --padding-start: 12px;\n  --inner-padding-end: 10px;\n  border: 1px solid var(--color-border);\n  border-radius: 10px;\n}\n.input-card:focus-within {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px rgba(26, 62, 140, 0.12);\n}\n.input-card ion-input,\n.input-card ion-select,\n.input-card ion-textarea {\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--color-text);\n}\n.textarea-card {\n  min-height: 78px;\n}\n.form-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.modal-actions {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n  padding-top: 2px;\n}\n.btn-cancelar,\n.btn-guardar {\n  height: 44px;\n  border: none;\n  border-radius: 10px;\n  font-size: 13px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  font-family: var(--font-main);\n}\n.btn-cancelar {\n  background: #ffffff;\n  color: var(--color-text-muted);\n  border: 1px solid var(--color-border);\n}\n.btn-guardar {\n  background: var(--color-primary);\n  color: #ffffff;\n  box-shadow: var(--shadow-button);\n}\n@media (max-width: 360px) {\n  .image-uploader,\n  .form-grid,\n  .modal-actions {\n    grid-template-columns: 1fr;\n  }\n  .image-preview {\n    width: 100%;\n    height: 140px;\n  }\n}\n/*# sourceMappingURL=material-form-modal.component.css.map */\n"] }]
  }], null, { modo: [{
    type: Input
  }], material: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MaterialFormModalComponent, { className: "MaterialFormModalComponent", filePath: "src/app/shared/componentes/material-form-modal/material-form-modal.component.ts", lineNumber: 31 });
})();

// src/app/shared/componentes/material-acciones-modal/material-acciones-modal.component.ts
function MaterialAccionesModalComponent_img_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 20);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.material.imagenUrl, \u0275\u0275sanitizeUrl);
  }
}
function MaterialAccionesModalComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.material.iniciales);
  }
}
var _MaterialAccionesModalComponent = class _MaterialAccionesModalComponent {
  constructor() {
    this.modalCtrl = inject(ModalController);
  }
  cancelar() {
    this.modalCtrl.dismiss(null, "cancel");
  }
  seleccionar(accion) {
    this.modalCtrl.dismiss({ accion }, "confirm");
  }
};
_MaterialAccionesModalComponent.\u0275fac = function MaterialAccionesModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MaterialAccionesModalComponent)();
};
_MaterialAccionesModalComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MaterialAccionesModalComponent, selectors: [["app-material-acciones-modal"]], inputs: { material: "material" }, decls: 44, vars: 9, consts: [["avatarIniciales", ""], [1, "acciones-panel"], [1, "modal-bar"], [1, "acciones-header"], [1, "material-avatar"], ["alt", "Material", 3, "src", 4, "ngIf", "ngIfElse"], [1, "material-info"], ["type", "button", 1, "btn-close", 3, "click"], ["name", "close-outline"], [1, "acciones-lista"], ["type", "button", 1, "accion-item", 3, "click"], [1, "accion-icon", "editar"], ["name", "create-outline"], [1, "accion-text"], ["name", "chevron-forward-outline", 1, "arrow"], [1, "accion-icon", "movimientos"], ["name", "document-text-outline"], ["type", "button", 1, "accion-item", "danger", 3, "click"], [1, "accion-icon", "eliminar"], ["name", "trash-outline"], ["alt", "Material", 3, "src"]], template: function MaterialAccionesModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "div", 2);
    \u0275\u0275elementStart(2, "header", 3)(3, "div", 4);
    \u0275\u0275template(4, MaterialAccionesModalComponent_img_4_Template, 1, 1, "img", 5)(5, MaterialAccionesModalComponent_ng_template_5_Template, 2, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 6)(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 7);
    \u0275\u0275listener("click", function MaterialAccionesModalComponent_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.cancelar());
    });
    \u0275\u0275element(15, "ion-icon", 8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "section", 9)(17, "button", 10);
    \u0275\u0275listener("click", function MaterialAccionesModalComponent_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.seleccionar("editar"));
    });
    \u0275\u0275elementStart(18, "div", 11);
    \u0275\u0275element(19, "ion-icon", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 13)(21, "h3");
    \u0275\u0275text(22, "Editar material");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p");
    \u0275\u0275text(24, "Actualizar datos generales e imagen.");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(25, "ion-icon", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 10);
    \u0275\u0275listener("click", function MaterialAccionesModalComponent_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.seleccionar("movimientos"));
    });
    \u0275\u0275elementStart(27, "div", 15);
    \u0275\u0275element(28, "ion-icon", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 13)(30, "h3");
    \u0275\u0275text(31, "Ver movimientos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p");
    \u0275\u0275text(33, "Consultar entradas, salidas y devoluciones.");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(34, "ion-icon", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "button", 17);
    \u0275\u0275listener("click", function MaterialAccionesModalComponent_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.seleccionar("eliminar"));
    });
    \u0275\u0275elementStart(36, "div", 18);
    \u0275\u0275element(37, "ion-icon", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 13)(39, "h3");
    \u0275\u0275text(40, "Eliminar material");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "p");
    \u0275\u0275text(42, "Ocultar material del almac\xE9n.");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(43, "ion-icon", 14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const avatarIniciales_r3 = \u0275\u0275reference(6);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx.material.imagenUrl)("ngIfElse", avatarIniciales_r3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.material.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.material.categoria);
    \u0275\u0275advance();
    \u0275\u0275classProp("disponible", ctx.material.estadoStock === "disponible")("bajo", ctx.material.estadoStock === "bajo");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.material.estadoTexto, " ");
  }
}, dependencies: [CommonModule, NgIf, IonicModule, IonIcon], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  background: transparent;\n  font-family: var(--font-main);\n}\n.acciones-panel[_ngcontent-%COMP%] {\n  width: 100%;\n  background: var(--color-background);\n  border-top-left-radius: 24px;\n  border-top-right-radius: 24px;\n  padding: 10px 14px 18px;\n}\n.modal-bar[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 5px;\n  border-radius: 999px;\n  background: #cbd5e1;\n  margin: 0 auto 14px;\n}\n.acciones-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-primary),\n      var(--color-primary-hover));\n  border-radius: 18px;\n  padding: 14px;\n  display: grid;\n  grid-template-columns: 48px 1fr 36px;\n  gap: 12px;\n  align-items: center;\n  color: #ffffff;\n  margin-bottom: 14px;\n}\n.material-avatar[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 16px;\n  overflow: hidden;\n  background: rgba(255, 255, 255, 0.16);\n  display: grid;\n  place-items: center;\n  font-size: 14px;\n  font-weight: 700;\n}\n.material-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.material-info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.material-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 700;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.material-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 6px;\n  font-size: 11px;\n  font-weight: 500;\n  color: #ffd166;\n}\n.material-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-flex;\n  height: 22px;\n  padding: 0 9px;\n  align-items: center;\n  border-radius: 999px;\n  font-size: 10px;\n  font-weight: 700;\n}\n.material-info[_ngcontent-%COMP%]   span.disponible[_ngcontent-%COMP%] {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.material-info[_ngcontent-%COMP%]   span.bajo[_ngcontent-%COMP%] {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.btn-close[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.15);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n}\n.btn-close[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.acciones-lista[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.accion-item[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  background: #ffffff;\n  padding: 12px;\n  display: grid;\n  grid-template-columns: 42px 1fr 20px;\n  gap: 10px;\n  align-items: center;\n  text-align: left;\n  box-shadow: var(--shadow-card);\n}\n.accion-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  display: grid;\n  place-items: center;\n}\n.accion-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 21px;\n}\n.accion-icon.editar[_ngcontent-%COMP%] {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.accion-icon.movimientos[_ngcontent-%COMP%] {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.accion-icon.eliminar[_ngcontent-%COMP%] {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.accion-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.accion-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  line-height: 1.25;\n}\n.arrow[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-size: 17px;\n}\n.accion-item[_ngcontent-%COMP%]:active {\n  transform: scale(0.985);\n}\n/*# sourceMappingURL=material-acciones-modal.component.css.map */"] });
var MaterialAccionesModalComponent = _MaterialAccionesModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaterialAccionesModalComponent, [{
    type: Component,
    args: [{ selector: "app-material-acciones-modal", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: `<!-- src/app/shared/componentes/material-acciones-modal/material-acciones-modal.component.html -->

<div class="acciones-panel">

  <div class="modal-bar"></div>

  <header class="acciones-header">

    <div class="material-avatar">
      <img
        *ngIf="material.imagenUrl; else avatarIniciales"
        [src]="material.imagenUrl"
        alt="Material"
      />

      <ng-template #avatarIniciales>
        <span>{{ material.iniciales }}</span>
      </ng-template>
    </div>

    <div class="material-info">
      <h2>{{ material.nombre }}</h2>
      <p>{{ material.categoria }}</p>

      <span
        [class.disponible]="material.estadoStock === 'disponible'"
        [class.bajo]="material.estadoStock === 'bajo'"
      >
        {{ material.estadoTexto }}
      </span>
    </div>

    <button type="button" class="btn-close" (click)="cancelar()">
      <ion-icon name="close-outline"></ion-icon>
    </button>

  </header>

  <section class="acciones-lista">

    <button type="button" class="accion-item" (click)="seleccionar('editar')">
      <div class="accion-icon editar">
        <ion-icon name="create-outline"></ion-icon>
      </div>

      <div class="accion-text">
        <h3>Editar material</h3>
        <p>Actualizar datos generales e imagen.</p>
      </div>

      <ion-icon name="chevron-forward-outline" class="arrow"></ion-icon>
    </button>

    <button type="button" class="accion-item" (click)="seleccionar('movimientos')">
      <div class="accion-icon movimientos">
        <ion-icon name="document-text-outline"></ion-icon>
      </div>

      <div class="accion-text">
        <h3>Ver movimientos</h3>
        <p>Consultar entradas, salidas y devoluciones.</p>
      </div>

      <ion-icon name="chevron-forward-outline" class="arrow"></ion-icon>
    </button>

    <button type="button" class="accion-item danger" (click)="seleccionar('eliminar')">
      <div class="accion-icon eliminar">
        <ion-icon name="trash-outline"></ion-icon>
      </div>

      <div class="accion-text">
        <h3>Eliminar material</h3>
        <p>Ocultar material del almac\xE9n.</p>
      </div>

      <ion-icon name="chevron-forward-outline" class="arrow"></ion-icon>
    </button>

  </section>

</div>`, styles: ["/* src/app/shared/componentes/material-acciones-modal/material-acciones-modal.component.css */\n:host {\n  display: block;\n  background: transparent;\n  font-family: var(--font-main);\n}\n.acciones-panel {\n  width: 100%;\n  background: var(--color-background);\n  border-top-left-radius: 24px;\n  border-top-right-radius: 24px;\n  padding: 10px 14px 18px;\n}\n.modal-bar {\n  width: 44px;\n  height: 5px;\n  border-radius: 999px;\n  background: #cbd5e1;\n  margin: 0 auto 14px;\n}\n.acciones-header {\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-primary),\n      var(--color-primary-hover));\n  border-radius: 18px;\n  padding: 14px;\n  display: grid;\n  grid-template-columns: 48px 1fr 36px;\n  gap: 12px;\n  align-items: center;\n  color: #ffffff;\n  margin-bottom: 14px;\n}\n.material-avatar {\n  width: 48px;\n  height: 48px;\n  border-radius: 16px;\n  overflow: hidden;\n  background: rgba(255, 255, 255, 0.16);\n  display: grid;\n  place-items: center;\n  font-size: 14px;\n  font-weight: 700;\n}\n.material-avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.material-info {\n  min-width: 0;\n}\n.material-info h2 {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 700;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.material-info p {\n  margin: 3px 0 6px;\n  font-size: 11px;\n  font-weight: 500;\n  color: #ffd166;\n}\n.material-info span {\n  display: inline-flex;\n  height: 22px;\n  padding: 0 9px;\n  align-items: center;\n  border-radius: 999px;\n  font-size: 10px;\n  font-weight: 700;\n}\n.material-info span.disponible {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.material-info span.bajo {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.btn-close {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.15);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n}\n.btn-close ion-icon {\n  font-size: 22px;\n}\n.acciones-lista {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.accion-item {\n  width: 100%;\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  background: #ffffff;\n  padding: 12px;\n  display: grid;\n  grid-template-columns: 42px 1fr 20px;\n  gap: 10px;\n  align-items: center;\n  text-align: left;\n  box-shadow: var(--shadow-card);\n}\n.accion-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  display: grid;\n  place-items: center;\n}\n.accion-icon ion-icon {\n  font-size: 21px;\n}\n.accion-icon.editar {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.accion-icon.movimientos {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.accion-icon.eliminar {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.accion-text h3 {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.accion-text p {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  line-height: 1.25;\n}\n.arrow {\n  color: #94a3b8;\n  font-size: 17px;\n}\n.accion-item:active {\n  transform: scale(0.985);\n}\n/*# sourceMappingURL=material-acciones-modal.component.css.map */\n"] }]
  }], null, { material: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MaterialAccionesModalComponent, { className: "MaterialAccionesModalComponent", filePath: "src/app/shared/componentes/material-acciones-modal/material-acciones-modal.component.ts", lineNumber: 23 });
})();

// src/app/paginas/almacen/materiales/materiales.page.ts
function MaterialesPage_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "app-admin-header", 4);
    \u0275\u0275listener("menuClick", function MaterialesPage_ng_container_1_Template_app_admin_header_menuClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirMenu());
    })("notificacionesClick", function MaterialesPage_ng_container_1_Template_app_admin_header_notificacionesClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirNotificaciones());
    })("perfilClick", function MaterialesPage_ng_container_1_Template_app_admin_header_perfilClick_1_listener() {
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
function MaterialesPage_ng_container_3_div_17_app_material_card_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-material-card", 19);
    \u0275\u0275listener("acciones", function MaterialesPage_ng_container_3_div_17_app_material_card_1_Template_app_material_card_acciones_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.abrirAcciones($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const material_r6 = ctx.$implicit;
    \u0275\u0275property("material", material_r6);
  }
}
function MaterialesPage_ng_container_3_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275template(1, MaterialesPage_ng_container_3_div_17_app_material_card_1_Template, 1, 1, "app-material-card", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r7 = \u0275\u0275nextContext().ngIf;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", vm_r7.materialesPagina)("ngForTrackBy", ctx_r1.trackByMaterial);
  }
}
function MaterialesPage_ng_container_3_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-admin-empty-state", 20);
    \u0275\u0275listener("botonClick", function MaterialesPage_ng_container_3_ng_template_18_Template_app_admin_empty_state_botonClick_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.nuevoMaterial());
    });
    \u0275\u0275elementEnd();
  }
}
function MaterialesPage_ng_container_3_app_admin_pagination_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-admin-pagination", 21);
    \u0275\u0275listener("anterior", function MaterialesPage_ng_container_3_app_admin_pagination_20_Template_app_admin_pagination_anterior_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.paginaAnterior());
    })("siguiente", function MaterialesPage_ng_container_3_app_admin_pagination_20_Template_app_admin_pagination_siguiente_0_listener() {
      \u0275\u0275restoreView(_r9);
      const vm_r7 = \u0275\u0275nextContext().ngIf;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.paginaSiguiente(vm_r7.totalPaginas));
    })("irPagina", function MaterialesPage_ng_container_3_app_admin_pagination_20_Template_app_admin_pagination_irPagina_0_listener($event) {
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
function MaterialesPage_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 5)(2, "app-admin-module-hero", 6);
    \u0275\u0275listener("botonClick", function MaterialesPage_ng_container_3_Template_app_admin_module_hero_botonClick_2_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nuevoMaterial());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "section", 7);
    \u0275\u0275element(4, "app-admin-summary-card", 8)(5, "app-admin-summary-card", 9)(6, "app-admin-summary-card", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "app-admin-search-filter", 11);
    \u0275\u0275listener("buscar", function MaterialesPage_ng_container_3_Template_app_admin_search_filter_buscar_7_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.buscarMaterial($event));
    })("filtrar", function MaterialesPage_ng_container_3_Template_app_admin_search_filter_filtrar_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirFiltro());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "section", 12)(9, "div")(10, "h3");
    \u0275\u0275text(11, "Lista de materiales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "span", 13);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "section", 14);
    \u0275\u0275template(17, MaterialesPage_ng_container_3_div_17_Template, 2, 2, "div", 15)(18, MaterialesPage_ng_container_3_ng_template_18_Template, 1, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, MaterialesPage_ng_container_3_app_admin_pagination_20_Template, 1, 3, "app-admin-pagination", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const vm_r7 = ctx.ngIf;
    const sinResultados_r10 = \u0275\u0275reference(19);
    \u0275\u0275advance(4);
    \u0275\u0275property("valor", vm_r7.totalMateriales);
    \u0275\u0275advance();
    \u0275\u0275property("valor", vm_r7.totalDisponibles);
    \u0275\u0275advance();
    \u0275\u0275property("valor", vm_r7.totalStockBajo);
    \u0275\u0275advance();
    \u0275\u0275property("filtroActual", vm_r7.filtro);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", vm_r7.materialesFiltrados.length, " registro(s) encontrado(s)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" P\xE1g. ", vm_r7.paginaActual, " / ", vm_r7.totalPaginas, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", vm_r7.materialesPagina.length > 0)("ngIfElse", sinResultados_r10);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", vm_r7.totalPaginas > 1);
  }
}
var _MaterialesPage = class _MaterialesPage {
  constructor() {
    this.materialService = inject(MaterialService);
    this.dashboardAdminService = inject(DashboardAdminService);
    this.modalCtrl = inject(ModalController);
    this.toastCtrl = inject(ToastController);
    this.alertCtrl = inject(AlertController);
    this.navCtrl = inject(NavController);
    this.cdr = inject(ChangeDetectorRef);
    this.vm$ = this.materialService.vm$;
    this.adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
  }
  ionViewWillEnter() {
    return __async(this, null, function* () {
      yield this.materialService.cargarMateriales();
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 100);
    });
  }
  ionViewDidEnter() {
    return __async(this, null, function* () {
      yield this.materialService.cargarMateriales();
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 150);
    });
  }
  trackByMaterial(index, material) {
    return material.uid || material.id || String(index);
  }
  buscarMaterial(valor) {
    const termino = typeof valor === "string" ? valor : valor?.detail?.value ?? "";
    this.materialService.cambiarBusqueda(termino);
  }
  abrirFiltro() {
    return __async(this, null, function* () {
      const filtroActual = this.materialService.obtenerFiltroActual();
      const alert = yield this.alertCtrl.create({
        header: "Filtrar materiales",
        inputs: [
          {
            type: "radio",
            label: "Todos",
            value: "todos",
            checked: filtroActual === "todos"
          },
          {
            type: "radio",
            label: "Disponibles",
            value: "disponibles",
            checked: filtroActual === "disponibles"
          },
          {
            type: "radio",
            label: "Stock bajo",
            value: "stockBajo",
            checked: filtroActual === "stockBajo"
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
              this.materialService.cambiarFiltro(filtro);
            }
          }
        ]
      });
      yield alert.present();
    });
  }
  nuevoMaterial() {
    return __async(this, null, function* () {
      const modal = yield this.modalCtrl.create({
        component: MaterialFormModalComponent,
        cssClass: "material-modal",
        backdropDismiss: false,
        componentProps: {
          modo: "crear"
        }
      });
      yield modal.present();
      const { data, role } = yield modal.onWillDismiss();
      if (role === "confirm" && data) {
        yield this.guardarNuevoMaterial(data);
      }
    });
  }
  guardarNuevoMaterial(data) {
    return __async(this, null, function* () {
      const payload = {
        nombre: String(data.nombre || "").trim(),
        unidad: String(data.unidad || "").trim(),
        categoria: String(data.categoria || "").trim(),
        descripcion: String(data.descripcion || "").trim(),
        stockInicial: Number(data.stockInicial || 0),
        stockMinimo: Number(data.stockMinimo || 0),
        imagenFile: data.imagenFile || null
      };
      if (!this.validarMaterial(payload, true)) {
        return;
      }
      try {
        yield this.materialService.crearMaterial(payload);
        yield this.materialService.cargarMateriales();
        this.mostrarToast("Material registrado correctamente", "success");
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 100);
      } catch (error) {
        console.error(error);
        this.mostrarToast(this.obtenerMensajeError(error), "danger");
      }
    });
  }
  abrirAcciones(material) {
    return __async(this, null, function* () {
      const modal = yield this.modalCtrl.create({
        component: MaterialAccionesModalComponent,
        cssClass: "material-actions-modal",
        backdropDismiss: true,
        componentProps: {
          material
        }
      });
      yield modal.present();
      const { data, role } = yield modal.onWillDismiss();
      if (role !== "confirm" || !data?.accion) {
        return;
      }
      if (data.accion === "editar") {
        yield this.editarMaterial(material);
        return;
      }
      if (data.accion === "movimientos") {
        this.mostrarToast("Historial de movimientos en desarrollo", "primary");
        return;
      }
      if (data.accion === "eliminar") {
        yield this.confirmarEliminarMaterial(material);
      }
    });
  }
  editarMaterial(material) {
    return __async(this, null, function* () {
      const modal = yield this.modalCtrl.create({
        component: MaterialFormModalComponent,
        cssClass: "material-modal",
        backdropDismiss: false,
        componentProps: {
          modo: "editar",
          material
        }
      });
      yield modal.present();
      const { data, role } = yield modal.onWillDismiss();
      if (role === "confirm" && data) {
        yield this.guardarEdicionMaterial(material, data);
      }
    });
  }
  guardarEdicionMaterial(material, data) {
    return __async(this, null, function* () {
      if (!material.uid) {
        this.mostrarToast("El material no tiene UID v\xE1lido", "danger");
        return;
      }
      const payload = {
        uid: material.uid,
        nombre: String(data.nombre || "").trim(),
        unidad: String(data.unidad || "").trim(),
        categoria: String(data.categoria || "").trim(),
        descripcion: String(data.descripcion || "").trim(),
        stockMinimo: Number(data.stockMinimo || 0),
        imagenFile: data.imagenFile || null,
        quitarImagen: data.quitarImagen === true,
        imagenPathActual: material.imagenPath || ""
      };
      if (!this.validarMaterial(payload, false)) {
        return;
      }
      try {
        yield this.materialService.editarMaterial(payload);
        yield this.materialService.cargarMateriales();
        this.mostrarToast("Material actualizado correctamente", "success");
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 100);
      } catch (error) {
        console.error(error);
        this.mostrarToast(this.obtenerMensajeError(error), "danger");
      }
    });
  }
  validarMaterial(data, esCrear) {
    if (!data.nombre) {
      this.mostrarToast("Ingrese el nombre del material", "danger");
      return false;
    }
    if (!data.unidad) {
      this.mostrarToast("Seleccione la unidad de medida", "danger");
      return false;
    }
    if (!data.categoria) {
      this.mostrarToast("Seleccione la categor\xEDa", "danger");
      return false;
    }
    if (esCrear && Number(data.stockInicial) < 0) {
      this.mostrarToast("El stock inicial no puede ser negativo", "danger");
      return false;
    }
    if (Number(data.stockMinimo) < 0) {
      this.mostrarToast("El stock m\xEDnimo no puede ser negativo", "danger");
      return false;
    }
    return true;
  }
  confirmarEliminarMaterial(material) {
    return __async(this, null, function* () {
      const confirmado = yield this.abrirConfirmacion({
        tipo: "danger",
        icono: "trash-outline",
        titulo: "Eliminar material",
        mensaje: `\xBFDeseas eliminar el material ${material.nombre || "seleccionado"}?`,
        detalle: "Esta acci\xF3n ocultar\xE1 el material del almac\xE9n y no estar\xE1 disponible para futuras asignaciones.",
        textoCancelar: "Cancelar",
        textoConfirmar: "Eliminar"
      });
      if (!confirmado) {
        return;
      }
      yield this.eliminarMaterial(material);
    });
  }
  eliminarMaterial(material) {
    return __async(this, null, function* () {
      if (!material.uid) {
        this.mostrarToast("El material no tiene UID v\xE1lido", "danger");
        return;
      }
      try {
        yield this.materialService.eliminarMaterial(material.uid, material.nombre || "Material");
        yield this.materialService.cargarMateriales();
        this.mostrarToast("Material eliminado correctamente", "success");
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
    this.materialService.paginaAnterior();
  }
  paginaSiguiente(totalPaginas) {
    this.materialService.paginaSiguiente(totalPaginas);
  }
  irPagina(pagina) {
    this.materialService.irPagina(pagina);
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
    if (code.includes("material-duplicado")) {
      return "Ese material ya est\xE1 registrado";
    }
    if (code.includes("material-nombre-vacio")) {
      return "Ingrese el nombre del material";
    }
    if (code.includes("permission-denied")) {
      return "No tiene permisos para realizar esta acci\xF3n";
    }
    if (code.includes("storage")) {
      return "No se pudo subir la imagen del material";
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
_MaterialesPage.\u0275fac = function MaterialesPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MaterialesPage)();
};
_MaterialesPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MaterialesPage, selectors: [["app-materiales"]], decls: 6, vars: 7, consts: [["sinResultados", ""], [1, "materiales-root", 3, "fullscreen"], [4, "ngIf"], ["activo", "almacen"], [3, "menuClick", "notificacionesClick", "perfilClick", "nombre", "rol", "fotoUrl", "notificaciones"], [1, "materiales-container"], ["titulo", "Gesti\xF3n de materiales", "descripcion", "Administra stock, im\xE1genes y materiales del almac\xE9n.", "icono", "cube-outline", "botonTexto", "Nuevo", "botonIcono", "add-outline", 3, "botonClick"], [1, "summary-grid"], ["titulo", "Total", "icono", "cube-outline", "tipo", "total", 3, "valor"], ["titulo", "Disponibles", "icono", "checkmark-circle-outline", "tipo", "success", 3, "valor"], ["titulo", "Stock bajo", "icono", "alert-circle-outline", "tipo", "danger", 3, "valor"], ["placeholder", "Buscar material, categor\xEDa...", 3, "buscar", "filtrar", "filtroActual"], [1, "list-title-row"], [1, "page-indicator"], [1, "list-section"], ["class", "materiales-list", 4, "ngIf", "ngIfElse"], [3, "paginaActual", "totalPaginas", "paginas", "anterior", "siguiente", "irPagina", 4, "ngIf"], [1, "materiales-list"], [3, "material", "acciones", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "acciones", "material"], ["icono", "cube-outline", "titulo", "No hay materiales para mostrar", "descripcion", "No se encontraron materiales con el criterio actual.", "botonTexto", "Registrar material", "botonIcono", "add-outline", 3, "botonClick"], [3, "anterior", "siguiente", "irPagina", "paginaActual", "totalPaginas", "paginas"]], template: function MaterialesPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 1);
    \u0275\u0275template(1, MaterialesPage_ng_container_1_Template, 2, 4, "ng-container", 2);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275template(3, MaterialesPage_ng_container_3_Template, 21, 10, "ng-container", 2);
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
  MaterialCardComponent,
  AsyncPipe
], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\nion-content.materiales-root[_ngcontent-%COMP%] {\n  --background: var(--color-page-outside);\n}\n.materiales-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: var(--app-width);\n  min-height: calc(100vh - 76px);\n  margin: 0 auto;\n  padding: 14px 14px 94px;\n  background: var(--color-background);\n}\n.summary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 9px;\n  margin-bottom: 12px;\n}\n.list-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin: 4px 0 10px;\n}\n.list-title-row[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.list-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.page-indicator[_ngcontent-%COMP%] {\n  height: 26px;\n  padding: 0 9px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 10px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.list-section[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  padding: 0;\n  min-height: 330px;\n}\n.materiales-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.admin-container[_ngcontent-%COMP%], \n.page-container[_ngcontent-%COMP%], \n.materiales-container[_ngcontent-%COMP%], \n.trabajos-container[_ngcontent-%COMP%], \n.empleados-container[_ngcontent-%COMP%], \n.mas-container[_ngcontent-%COMP%] {\n  padding-bottom: 95px;\n}\n@media (max-width: 360px) {\n  .summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=materiales.page.css.map */"] });
var MaterialesPage = _MaterialesPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaterialesPage, [{
    type: Component,
    args: [{ selector: "app-materiales", standalone: true, imports: [
      CommonModule,
      IonicModule,
      AdminHeaderComponent,
      AdminBottomNavComponent,
      AdminModuleHeroComponent,
      AdminSummaryCardComponent,
      AdminSearchFilterComponent,
      AdminEmptyStateComponent,
      AdminPaginationComponent,
      MaterialCardComponent
    ], template: `<!-- src/app/paginas/almacen/materiales/materiales.page.html -->
<ion-content [fullscreen]="true" class="materiales-root">

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

    <div class="materiales-container">

      <app-admin-module-hero
        titulo="Gesti\xF3n de materiales"
        descripcion="Administra stock, im\xE1genes y materiales del almac\xE9n."
        icono="cube-outline"
        botonTexto="Nuevo"
        botonIcono="add-outline"
        (botonClick)="nuevoMaterial()"
      ></app-admin-module-hero>

      <section class="summary-grid">

        <app-admin-summary-card
          titulo="Total"
          [valor]="vm.totalMateriales"
          icono="cube-outline"
          tipo="total"
        ></app-admin-summary-card>

        <app-admin-summary-card
          titulo="Disponibles"
          [valor]="vm.totalDisponibles"
          icono="checkmark-circle-outline"
          tipo="success"
        ></app-admin-summary-card>

        <app-admin-summary-card
          titulo="Stock bajo"
          [valor]="vm.totalStockBajo"
          icono="alert-circle-outline"
          tipo="danger"
        ></app-admin-summary-card>

      </section>

      <app-admin-search-filter
        placeholder="Buscar material, categor\xEDa..."
        [filtroActual]="vm.filtro"
        (buscar)="buscarMaterial($event)"
        (filtrar)="abrirFiltro()"
      ></app-admin-search-filter>

      <section class="list-title-row">
        <div>
          <h3>Lista de materiales</h3>
          <p>{{ vm.materialesFiltrados.length }} registro(s) encontrado(s)</p>
        </div>

        <span class="page-indicator">
          P\xE1g. {{ vm.paginaActual }} / {{ vm.totalPaginas }}
        </span>
      </section>

      <section class="list-section">

        <div
          class="materiales-list"
          *ngIf="vm.materialesPagina.length > 0; else sinResultados"
        >

          <app-material-card
            *ngFor="let material of vm.materialesPagina; trackBy: trackByMaterial"
            [material]="material"
            (acciones)="abrirAcciones($event)"
          ></app-material-card>

        </div>

        <ng-template #sinResultados>
          <app-admin-empty-state
            icono="cube-outline"
            titulo="No hay materiales para mostrar"
            descripcion="No se encontraron materiales con el criterio actual."
            botonTexto="Registrar material"
            botonIcono="add-outline"
            (botonClick)="nuevoMaterial()"
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

  <app-admin-bottom-nav activo="almacen"></app-admin-bottom-nav>

</ion-content>`, styles: ["/* src/app/paginas/almacen/materiales/materiales.page.css */\n:host {\n  display: block;\n}\nion-content.materiales-root {\n  --background: var(--color-page-outside);\n}\n.materiales-container {\n  width: 100%;\n  max-width: var(--app-width);\n  min-height: calc(100vh - 76px);\n  margin: 0 auto;\n  padding: 14px 14px 94px;\n  background: var(--color-background);\n}\n.summary-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 9px;\n  margin-bottom: 12px;\n}\n.list-title-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin: 4px 0 10px;\n}\n.list-title-row h3 {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.list-title-row p {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.page-indicator {\n  height: 26px;\n  padding: 0 9px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 10px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.list-section {\n  background: transparent;\n  border: none;\n  padding: 0;\n  min-height: 330px;\n}\n.materiales-list {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.admin-container,\n.page-container,\n.materiales-container,\n.trabajos-container,\n.empleados-container,\n.mas-container {\n  padding-bottom: 95px;\n}\n@media (max-width: 360px) {\n  .summary-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=materiales.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MaterialesPage, { className: "MaterialesPage", filePath: "src/app/paginas/almacen/materiales/materiales.page.ts", lineNumber: 51 });
})();
export {
  MaterialesPage
};
//# sourceMappingURL=materiales.page-V25ZYLEA.js.map
