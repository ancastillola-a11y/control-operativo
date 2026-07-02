import {
  IonContent,
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
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc
} from "./chunk-NMRAWXHA.js";
import {
  CommonModule,
  Component,
  NavController,
  NgIf,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-D2BFCRPD.js";
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

// src/app/paginas/debug/firebase-debug/firebase-debug.page.ts
function FirebaseDebugPage_section_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 13)(1, "h2");
    \u0275\u0275text(2, "Resumen r\xE1pido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "pre");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.resumenTexto);
  }
}
function FirebaseDebugPage_pre_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "pre");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.resultadoTexto);
  }
}
function FirebaseDebugPage_ng_template_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275text(1, " No hay diagn\xF3stico generado. ");
    \u0275\u0275elementEnd();
  }
}
var _FirebaseDebugPage = class _FirebaseDebugPage {
  constructor() {
    this.firestore = inject(Firestore);
    this.navCtrl = inject(NavController);
    this.toastCtrl = inject(ToastController);
    this.cargando = false;
    this.resumenTexto = "";
    this.resultadoTexto = "";
  }
  sincronizarAlertasStockBajo() {
    return __async(this, null, function* () {
      this.cargando = true;
      try {
        const materialesSnap = yield getDocs(collection(this.firestore, "materiales"));
        const notificacionesSnap = yield getDocs(collection(this.firestore, "notificaciones_admin"));
        const notificaciones = notificacionesSnap.docs.map((documento) => {
          const data = documento.data();
          return {
            id: documento.id,
            uid: documento.id,
            tipo: data.tipo || "",
            referenciaUid: data.referenciaUid || "",
            eliminada: data.eliminada === true,
            activa: data.activa !== false,
            resuelta: data.resuelta === true
          };
        });
        let creadas = 0;
        let resueltas = 0;
        for (const documento of materialesSnap.docs) {
          const data = documento.data();
          const materialUid = data.uid || documento.id;
          const nombre = data.nombre || "Material";
          const unidad = data.unidad || "";
          const eliminado = data.eliminado === true;
          const stockActual = Number(data.stockActual ?? data.stock ?? data.cantidad ?? 0);
          const stockMinimo = Number(data.stockMinimo ?? data.minimo ?? 0);
          const estaBajo = eliminado !== true && stockMinimo > 0 && stockActual <= stockMinimo;
          const alertaActiva = notificaciones.find((notificacion) => notificacion.tipo === "stock_bajo" && notificacion.referenciaUid === materialUid && notificacion.eliminada !== true && notificacion.resuelta !== true && notificacion.activa !== false);
          if (estaBajo && !alertaActiva) {
            yield addDoc(collection(this.firestore, "notificaciones_admin"), {
              titulo: "Stock bajo",
              mensaje: `El material ${nombre} est\xE1 por debajo del stock m\xEDnimo.`,
              detalle: `Stock actual: ${stockActual} ${unidad}. Stock m\xEDnimo: ${stockMinimo} ${unidad}.`,
              tipo: "stock_bajo",
              leida: false,
              eliminada: false,
              activa: true,
              resuelta: false,
              ruta: "/materiales",
              referenciaUid: materialUid,
              materialNombre: nombre,
              stockActual,
              stockMinimo,
              unidad,
              creadoEn: serverTimestamp(),
              actualizadoEn: serverTimestamp()
            });
            creadas++;
          }
          if (!estaBajo && alertaActiva) {
            yield updateDoc(doc(this.firestore, "notificaciones_admin", alertaActiva.uid), {
              leida: true,
              activa: false,
              resuelta: true,
              resueltoEn: serverTimestamp(),
              actualizadoEn: serverTimestamp()
            });
            resueltas++;
          }
        }
        yield this.generarDiagnostico();
        yield this.mostrarToast(`Sincronizaci\xF3n lista. Creadas: ${creadas}. Resueltas: ${resueltas}.`, "success");
      } catch (error) {
        console.error("[FirebaseDebugPage] Error al sincronizar alertas:", error);
        yield this.mostrarToast("No se pudo sincronizar alertas de stock bajo.", "danger");
      } finally {
        this.cargando = false;
      }
    });
  }
  ionViewWillEnter() {
    return __async(this, null, function* () {
      yield this.generarDiagnostico();
    });
  }
  generarDiagnostico() {
    return __async(this, null, function* () {
      this.cargando = true;
      this.resumenTexto = "";
      this.resultadoTexto = "";
      try {
        const [materialesSnap, notificacionesAdminSnap, notificacionesAntiguasSnap, movimientosSnap, historialSnap] = yield Promise.all([
          getDocs(collection(this.firestore, "materiales")),
          getDocs(collection(this.firestore, "notificaciones_admin")),
          getDocs(collection(this.firestore, "notificaciones")),
          getDocs(collection(this.firestore, "movimientos_materiales")),
          getDocs(collection(this.firestore, "historial_actividades"))
        ]);
        const materiales = materialesSnap.docs.map((documento) => {
          const data = documento.data();
          const stockActual = Number(data.stockActual ?? data.stock ?? data.cantidad ?? 0);
          const stockMinimo = Number(data.stockMinimo ?? data.minimo ?? 0);
          const stockBajoCalculado = stockMinimo > 0 && stockActual <= stockMinimo;
          return {
            id: documento.id,
            uid: data.uid || documento.id,
            nombre: data.nombre || "",
            nombreNormalizado: data.nombreNormalizado || "",
            categoria: data.categoria || "",
            unidad: data.unidad || "",
            stockActual,
            stockMinimo,
            stockBajoFirebase: data.stockBajo === true,
            stockBajoCalculado,
            activo: data.activo === true,
            eliminado: data.eliminado === true,
            creadoPorUid: data.creadoPorUid || "",
            actualizadoPorUid: data.actualizadoPorUid || "",
            createdAt: this.formatearFecha(data.createdAt),
            updatedAt: this.formatearFecha(data.updatedAt),
            deletedAt: this.formatearFecha(data.deletedAt)
          };
        });
        const notificacionesAdmin = notificacionesAdminSnap.docs.map((documento) => {
          const data = documento.data();
          return {
            id: documento.id,
            uid: data.uid || documento.id,
            titulo: data.titulo || "",
            mensaje: data.mensaje || "",
            detalle: data.detalle || "",
            tipo: data.tipo || "",
            leida: data.leida === true,
            eliminada: data.eliminada === true,
            activa: data.activa !== false,
            resuelta: data.resuelta === true,
            ruta: data.ruta || "",
            referenciaUid: data.referenciaUid || "",
            materialNombre: data.materialNombre || "",
            stockActual: Number(data.stockActual || 0),
            stockMinimo: Number(data.stockMinimo || 0),
            unidad: data.unidad || "",
            creadoEn: this.formatearFecha(data.creadoEn),
            actualizadoEn: this.formatearFecha(data.actualizadoEn),
            eliminadoEn: this.formatearFecha(data.eliminadoEn),
            resueltoEn: this.formatearFecha(data.resueltoEn)
          };
        });
        const notificacionesAntiguas = notificacionesAntiguasSnap.docs.map((documento) => {
          const data = documento.data();
          return {
            id: documento.id,
            uid: data.uid || documento.id,
            titulo: data.titulo || "",
            mensaje: data.mensaje || "",
            tipo: data.tipo || "",
            leida: data.leida === true,
            eliminada: data.eliminada === true,
            ruta: data.ruta || "",
            referenciaUid: data.referenciaUid || "",
            creadoEn: this.formatearFecha(data.creadoEn || data.createdAt)
          };
        });
        const movimientos = movimientosSnap.docs.map((documento) => {
          const data = documento.data();
          return {
            id: documento.id,
            materialUid: data.materialUid || "",
            materialNombre: data.materialNombre || "",
            tipoMovimiento: data.tipoMovimiento || "",
            cantidad: Number(data.cantidad || 0),
            stockAntes: Number(data.stockAntes || 0),
            stockDespues: Number(data.stockDespues || 0),
            moduloOrigen: data.moduloOrigen || "",
            descripcion: data.descripcion || "",
            createdAt: this.formatearFecha(data.createdAt)
          };
        });
        const historial = historialSnap.docs.map((documento) => {
          const data = documento.data();
          return {
            id: documento.id,
            modulo: data.modulo || "",
            accion: data.accion || "",
            descripcion: data.descripcion || "",
            materialUid: data.materialUid || "",
            realizadoPorUid: data.realizadoPorUid || "",
            createdAt: this.formatearFecha(data.createdAt)
          };
        });
        const materialesActivos = materiales.filter((material) => material.eliminado !== true);
        const materialesStockBajo = materialesActivos.filter((material) => material.stockBajoCalculado);
        const materialesConStockBajoMalMarcado = materialesActivos.filter((material) => material.stockBajoFirebase !== material.stockBajoCalculado);
        const notificacionesAdminActivas = notificacionesAdmin.filter((notificacion) => notificacion.eliminada !== true);
        const notificacionesNoLeidas = notificacionesAdminActivas.filter((notificacion) => notificacion.leida !== true && notificacion.resuelta !== true);
        const alertasStockBajoActivas = notificacionesAdminActivas.filter((notificacion) => notificacion.tipo === "stock_bajo" && notificacion.resuelta !== true && notificacion.activa !== false);
        const alertasStockBajoNoLeidas = alertasStockBajoActivas.filter((notificacion) => notificacion.leida !== true);
        const referenciasAlertasStockBajoActivas = new Set(alertasStockBajoActivas.map((notificacion) => notificacion.referenciaUid).filter(Boolean));
        const materialesStockBajoSinAlertaActiva = materialesStockBajo.filter((material) => !referenciasAlertasStockBajoActivas.has(material.uid));
        const materialesPorUid = new Map(materialesActivos.map((material) => [material.uid, material]));
        const alertasActivasPeroMaterialYaNoEstaBajo = alertasStockBajoActivas.filter((alerta) => {
          const material = materialesPorUid.get(alerta.referenciaUid);
          if (!material) {
            return true;
          }
          return material.stockBajoCalculado !== true;
        });
        const notificacionesSinCreadoEn = notificacionesAdmin.filter((notificacion) => !notificacion.creadoEn);
        const notificacionesSinCamposClave = notificacionesAdmin.filter((notificacion) => notificacion.tipo === "" || notificacion.leida === void 0 || notificacion.eliminada === void 0);
        const alertasStockBajoDuplicadas = this.obtenerDuplicadosPorReferencia(alertasStockBajoActivas);
        const diagnostico = {
          generadoEn: (/* @__PURE__ */ new Date()).toISOString(),
          resumen: {
            totalMateriales: materiales.length,
            materialesActivos: materialesActivos.length,
            materialesStockBajo: materialesStockBajo.length,
            materialesConStockBajoMalMarcado: materialesConStockBajoMalMarcado.length,
            totalNotificacionesAdmin: notificacionesAdmin.length,
            notificacionesAdminActivas: notificacionesAdminActivas.length,
            notificacionesNoLeidas: notificacionesNoLeidas.length,
            alertasStockBajoActivas: alertasStockBajoActivas.length,
            alertasStockBajoNoLeidas: alertasStockBajoNoLeidas.length,
            materialesStockBajoSinAlertaActiva: materialesStockBajoSinAlertaActiva.length,
            alertasActivasPeroMaterialYaNoEstaBajo: alertasActivasPeroMaterialYaNoEstaBajo.length,
            alertasStockBajoDuplicadas: alertasStockBajoDuplicadas.length,
            notificacionesSinCreadoEn: notificacionesSinCreadoEn.length,
            notificacionesSinCamposClave: notificacionesSinCamposClave.length,
            coleccionAntiguaNotificaciones: notificacionesAntiguas.length,
            movimientosMateriales: movimientos.length,
            historialActividades: historial.length
          },
          materialesStockBajo,
          materialesStockBajoSinAlertaActiva,
          materialesConStockBajoMalMarcado,
          notificacionesNoLeidas,
          alertasStockBajoActivas,
          alertasStockBajoNoLeidas,
          alertasActivasPeroMaterialYaNoEstaBajo,
          alertasStockBajoDuplicadas,
          notificacionesSinCreadoEn,
          notificacionesSinCamposClave,
          muestraMateriales: materiales.slice(0, 50),
          muestraNotificacionesAdmin: notificacionesAdmin.slice(0, 80),
          muestraColeccionAntiguaNotificaciones: notificacionesAntiguas.slice(0, 30),
          muestraMovimientosMateriales: movimientos.slice(0, 30),
          muestraHistorialActividades: historial.slice(0, 30)
        };
        this.resumenTexto = JSON.stringify(diagnostico.resumen, null, 2);
        this.resultadoTexto = JSON.stringify(diagnostico, null, 2);
        console.log("DIAGNOSTICO_FIREBASE_CONTROL_OPERATIVO:", diagnostico);
        yield this.mostrarToast("Diagn\xF3stico generado correctamente.", "success");
      } catch (error) {
        console.error("[FirebaseDebugPage] Error al generar diagn\xF3stico:", error);
        this.resultadoTexto = JSON.stringify({
          error: true,
          mensaje: "No se pudo generar el diagn\xF3stico de Firebase.",
          detalle: String(error)
        }, null, 2);
        yield this.mostrarToast("No se pudo generar el diagn\xF3stico.", "danger");
      } finally {
        this.cargando = false;
      }
    });
  }
  copiarResultado() {
    return __async(this, null, function* () {
      if (!this.resultadoTexto) {
        yield this.mostrarToast("No hay resultado para copiar.", "primary");
        return;
      }
      try {
        yield navigator.clipboard.writeText(this.resultadoTexto);
        yield this.mostrarToast("Diagn\xF3stico copiado. P\xE9galo en el chat.", "success");
      } catch (error) {
        console.error("[FirebaseDebugPage] Error al copiar:", error);
        yield this.mostrarToast("No se pudo copiar. Selecciona el texto manualmente.", "danger");
      }
    });
  }
  volverDashboard() {
    this.navCtrl.navigateRoot("/dashboard-admin", {
      animated: false,
      replaceUrl: true
    });
  }
  obtenerDuplicadosPorReferencia(notificaciones) {
    const grupos = {};
    for (const notificacion of notificaciones) {
      const clave = String(notificacion.referenciaUid || "SIN_REFERENCIA");
      if (!grupos[clave]) {
        grupos[clave] = [];
      }
      grupos[clave].push(notificacion);
    }
    return Object.entries(grupos).filter(([, items]) => items.length > 1).map(([referenciaUid, items]) => ({
      referenciaUid,
      cantidad: items.length,
      items
    }));
  }
  formatearFecha(valor) {
    if (!valor) {
      return null;
    }
    if (typeof valor?.toDate === "function") {
      return valor.toDate().toISOString();
    }
    if (typeof valor?.seconds === "number") {
      return new Date(valor.seconds * 1e3).toISOString();
    }
    if (valor instanceof Date) {
      return valor.toISOString();
    }
    return String(valor);
  }
  mostrarToast(message, color) {
    return __async(this, null, function* () {
      const toast = yield this.toastCtrl.create({
        message,
        duration: 2200,
        position: "top",
        color
      });
      yield toast.present();
    });
  }
};
_FirebaseDebugPage.\u0275fac = function FirebaseDebugPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FirebaseDebugPage)();
};
_FirebaseDebugPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FirebaseDebugPage, selectors: [["app-firebase-debug"]], decls: 26, vars: 8, consts: [["sinResultado", ""], [1, "debug-root", 3, "fullscreen"], [1, "debug-container"], [1, "debug-header"], ["type", "button", 1, "btn-back", 3, "click"], [1, "actions-row"], ["type", "button", 1, "btn-warning", 3, "click", "disabled"], ["type", "button", 1, "btn-primary", 3, "click", "disabled"], ["type", "button", 1, "btn-secondary", 3, "click", "disabled"], ["class", "summary-card", 4, "ngIf"], [1, "result-card"], [1, "hint"], [4, "ngIf", "ngIfElse"], [1, "summary-card"], [1, "empty"]], template: function FirebaseDebugPage_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-content", 1)(1, "div", 2)(2, "section", 3)(3, "div")(4, "h1");
    \u0275\u0275text(5, "Diagn\xF3stico Firebase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Materiales, stock bajo, notificaciones, movimientos e historial.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 4);
    \u0275\u0275listener("click", function FirebaseDebugPage_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.volverDashboard());
    });
    \u0275\u0275text(9, " Volver ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "section", 5)(11, "button", 6);
    \u0275\u0275listener("click", function FirebaseDebugPage_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.sincronizarAlertasStockBajo());
    });
    \u0275\u0275text(12, " Sincronizar alertas stock bajo\n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 7);
    \u0275\u0275listener("click", function FirebaseDebugPage_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.generarDiagnostico());
    });
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 8);
    \u0275\u0275listener("click", function FirebaseDebugPage_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.copiarResultado());
    });
    \u0275\u0275text(16, " Copiar resultado ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(17, FirebaseDebugPage_section_17_Template, 5, 1, "section", 9);
    \u0275\u0275elementStart(18, "section", 10)(19, "h2");
    \u0275\u0275text(20, "Resultado completo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p", 11);
    \u0275\u0275text(22, " Copia este resultado completo y p\xE9galo en el chat. ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, FirebaseDebugPage_pre_23_Template, 2, 1, "pre", 12)(24, FirebaseDebugPage_ng_template_24_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const sinResultado_r3 = \u0275\u0275reference(25);
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance(11);
    \u0275\u0275property("disabled", ctx.cargando);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx.cargando);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.cargando ? "Revisando..." : "Actualizar diagn\xF3stico", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx.resultadoTexto);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx.resumenTexto);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.resultadoTexto)("ngIfElse", sinResultado_r3);
  }
}, dependencies: [CommonModule, NgIf, IonicModule, IonContent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\nion-content.debug-root[_ngcontent-%COMP%] {\n  --background: #eef2f7;\n}\n.debug-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 920px;\n  min-height: 100dvh;\n  margin: 0 auto;\n  padding: 18px;\n  background: #f8fafc;\n}\n.debug-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n  margin-bottom: 14px;\n}\n.debug-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 22px;\n  font-weight: 900;\n  color: #0f172a;\n}\n.debug-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 5px 0 0;\n  font-size: 13px;\n  font-weight: 600;\n  color: #64748b;\n}\n.actions-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-bottom: 14px;\n  flex-wrap: wrap;\n}\nbutton[_ngcontent-%COMP%] {\n  min-height: 40px;\n  border: none;\n  border-radius: 12px;\n  padding: 0 14px;\n  font-size: 13px;\n  font-weight: 900;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #2563eb;\n  color: #ffffff;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #ffffff;\n  color: #2563eb;\n  border: 1px solid #dbeafe;\n}\n.btn-back[_ngcontent-%COMP%] {\n  background: #ffffff;\n  color: #0f172a;\n  border: 1px solid #e2e8f0;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n}\n.summary-card[_ngcontent-%COMP%], \n.result-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 16px;\n  padding: 14px;\n  margin-bottom: 14px;\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);\n}\n.summary-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.result-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-size: 15px;\n  font-weight: 900;\n  color: #0f172a;\n}\n.hint[_ngcontent-%COMP%] {\n  margin: 0 0 10px;\n  font-size: 12px;\n  color: #64748b;\n}\npre[_ngcontent-%COMP%] {\n  max-height: 540px;\n  overflow: auto;\n  margin: 0;\n  padding: 12px;\n  border-radius: 12px;\n  background: #0f172a;\n  color: #e2e8f0;\n  font-size: 11px;\n  line-height: 1.45;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.empty[_ngcontent-%COMP%] {\n  padding: 18px;\n  border-radius: 12px;\n  background: #f1f5f9;\n  color: #64748b;\n  font-size: 13px;\n  font-weight: 700;\n}\n@media (max-width: 480px) {\n  .debug-container[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .debug-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .actions-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .btn-warning[_ngcontent-%COMP%] {\n    background: #f59e0b;\n    color: #ffffff;\n  }\n}\n/*# sourceMappingURL=firebase-debug.page.css.map */"] });
var FirebaseDebugPage = _FirebaseDebugPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FirebaseDebugPage, [{
    type: Component,
    args: [{ selector: "app-firebase-debug", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: `<!-- src/app/paginas/debug/firebase-debug/firebase-debug.page.html -->

<ion-content [fullscreen]="true" class="debug-root">

  <div class="debug-container">

    <section class="debug-header">
      <div>
        <h1>Diagn\xF3stico Firebase</h1>
        <p>Materiales, stock bajo, notificaciones, movimientos e historial.</p>
      </div>

      <button
        type="button"
        class="btn-back"
        (click)="volverDashboard()"
      >
        Volver
      </button>
    </section>

    <section class="actions-row">
<button
  type="button"
  class="btn-warning"
  (click)="sincronizarAlertasStockBajo()"
  [disabled]="cargando"
>
  Sincronizar alertas stock bajo
</button>
      <button
        type="button"
        class="btn-primary"
        (click)="generarDiagnostico()"
        [disabled]="cargando"
      >
        {{ cargando ? 'Revisando...' : 'Actualizar diagn\xF3stico' }}
      </button>

      <button
        type="button"
        class="btn-secondary"
        (click)="copiarResultado()"
        [disabled]="!resultadoTexto"
      >
        Copiar resultado
      </button>

    </section>

    <section class="summary-card" *ngIf="resumenTexto">
      <h2>Resumen r\xE1pido</h2>
      <pre>{{ resumenTexto }}</pre>
    </section>

    <section class="result-card">
      <h2>Resultado completo</h2>

      <p class="hint">
        Copia este resultado completo y p\xE9galo en el chat.
      </p>

      <pre *ngIf="resultadoTexto; else sinResultado">{{ resultadoTexto }}</pre>

      <ng-template #sinResultado>
        <div class="empty">
          No hay diagn\xF3stico generado.
        </div>
      </ng-template>
    </section>

  </div>

</ion-content>`, styles: ["/* src/app/paginas/debug/firebase-debug/firebase-debug.page.css */\n:host {\n  display: block;\n}\nion-content.debug-root {\n  --background: #eef2f7;\n}\n.debug-container {\n  width: 100%;\n  max-width: 920px;\n  min-height: 100dvh;\n  margin: 0 auto;\n  padding: 18px;\n  background: #f8fafc;\n}\n.debug-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n  margin-bottom: 14px;\n}\n.debug-header h1 {\n  margin: 0;\n  font-size: 22px;\n  font-weight: 900;\n  color: #0f172a;\n}\n.debug-header p {\n  margin: 5px 0 0;\n  font-size: 13px;\n  font-weight: 600;\n  color: #64748b;\n}\n.actions-row {\n  display: flex;\n  gap: 10px;\n  margin-bottom: 14px;\n  flex-wrap: wrap;\n}\nbutton {\n  min-height: 40px;\n  border: none;\n  border-radius: 12px;\n  padding: 0 14px;\n  font-size: 13px;\n  font-weight: 900;\n}\n.btn-primary {\n  background: #2563eb;\n  color: #ffffff;\n}\n.btn-secondary {\n  background: #ffffff;\n  color: #2563eb;\n  border: 1px solid #dbeafe;\n}\n.btn-back {\n  background: #ffffff;\n  color: #0f172a;\n  border: 1px solid #e2e8f0;\n}\nbutton:disabled {\n  opacity: 0.55;\n}\n.summary-card,\n.result-card {\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 16px;\n  padding: 14px;\n  margin-bottom: 14px;\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);\n}\n.summary-card h2,\n.result-card h2 {\n  margin: 0 0 8px;\n  font-size: 15px;\n  font-weight: 900;\n  color: #0f172a;\n}\n.hint {\n  margin: 0 0 10px;\n  font-size: 12px;\n  color: #64748b;\n}\npre {\n  max-height: 540px;\n  overflow: auto;\n  margin: 0;\n  padding: 12px;\n  border-radius: 12px;\n  background: #0f172a;\n  color: #e2e8f0;\n  font-size: 11px;\n  line-height: 1.45;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.empty {\n  padding: 18px;\n  border-radius: 12px;\n  background: #f1f5f9;\n  color: #64748b;\n  font-size: 13px;\n  font-weight: 700;\n}\n@media (max-width: 480px) {\n  .debug-container {\n    padding: 14px;\n  }\n  .debug-header {\n    flex-direction: column;\n  }\n  .actions-row {\n    flex-direction: column;\n  }\n  button {\n    width: 100%;\n  }\n  .btn-warning {\n    background: #f59e0b;\n    color: #ffffff;\n  }\n}\n/*# sourceMappingURL=firebase-debug.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FirebaseDebugPage, { className: "FirebaseDebugPage", filePath: "src/app/paginas/debug/firebase-debug/firebase-debug.page.ts", lineNumber: 34 });
})();
export {
  FirebaseDebugPage
};
//# sourceMappingURL=firebase-debug.page-VFZLDBRJ.js.map
