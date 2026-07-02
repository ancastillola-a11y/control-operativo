import {
  IonContent,
  IonHeader,
  IonIcon,
  IonToolbar,
  IonicModule,
  ModalController
} from "./chunk-NAACVANG.js";
import {
  Auth,
  Firestore,
  collection,
  collectionData,
  doc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from "./chunk-NMRAWXHA.js";
import {
  BehaviorSubject,
  CommonModule,
  Component,
  Injectable,
  Input,
  NgClass,
  NgForOf,
  NgIf,
  NgZone,
  combineLatest,
  inject,
  map,
  setClassMetadata,
  shareReplay,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-D2BFCRPD.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-Q3N56TRI.js";

// src/app/dao/trabajo.dao.ts
var _TrabajoDAO = class _TrabajoDAO {
  constructor() {
    this.firestore = inject(Firestore);
    this.auth = inject(Auth);
  }
  escucharTrabajos() {
    const refTrabajos = collection(this.firestore, "trabajos");
    return collectionData(refTrabajos, { idField: "id" }).pipe(map((items) => {
      return items.map((data) => {
        const id = String(data.id || "").trim();
        const uid = String(data.uid || id).trim();
        return __spreadProps(__spreadValues({}, data), {
          id,
          uid
        });
      });
    }));
  }
  obtenerTrabajosUnaVez() {
    return __async(this, null, function* () {
      const refTrabajos = collection(this.firestore, "trabajos");
      const snap = yield getDocs(refTrabajos);
      return snap.docs.map((documento) => {
        const data = documento.data();
        return __spreadProps(__spreadValues({}, data), {
          id: documento.id,
          uid: data.uid || documento.id
        });
      });
    });
  }
  obtenerEmpleadosDisponibles() {
    return __async(this, null, function* () {
      const refUsuarios = collection(this.firestore, "usuarios");
      const consulta = query(refUsuarios, where("rol", "==", "empleado"));
      const snap = yield getDocs(consulta);
      return snap.docs.map((documento) => {
        const data = documento.data();
        const nombres = String(data.nombres || "").trim();
        const apellidos = String(data.apellidos || "").trim();
        const nombreCompleto = String(data.nombreCompleto || `${nombres} ${apellidos}`.trim() || data.usuario || "Empleado").trim();
        return {
          uid: data.uid || documento.id,
          nombreCompleto,
          usuario: String(data.usuario || "").trim(),
          cargo: String(data.cargo || "Personal operativo").trim(),
          iniciales: this.obtenerIniciales(nombreCompleto),
          habilitado: data.habilitado === true,
          eliminado: data.eliminado === true
        };
      }).filter((empleado) => empleado.habilitado === true && empleado.eliminado !== true).map((empleado) => ({
        uid: empleado.uid,
        nombreCompleto: empleado.nombreCompleto,
        usuario: empleado.usuario,
        cargo: empleado.cargo,
        iniciales: empleado.iniciales
      }));
    });
  }
  obtenerMaterialesDisponibles() {
    return __async(this, null, function* () {
      const refMateriales = collection(this.firestore, "materiales");
      const consulta = query(refMateriales, where("eliminado", "==", false));
      const snap = yield getDocs(consulta);
      return snap.docs.map((documento) => {
        const data = documento.data();
        const nombre = String(data.nombre || "Material").trim();
        return {
          uid: data.uid || documento.id,
          nombre,
          categoria: String(data.categoria || "Sin categor\xC3\xADa").trim(),
          unidad: String(data.unidad || "Unidad").trim(),
          stockActual: Number(data.stockActual || 0),
          stockMinimo: Number(data.stockMinimo || 0),
          imagenUrl: String(data.imagenUrl || ""),
          iniciales: this.obtenerIniciales(nombre),
          activo: data.activo !== false,
          eliminado: data.eliminado === true
        };
      }).filter((material) => material.activo === true && material.eliminado !== true && Number(material.stockActual || 0) > 0).map((material) => ({
        uid: material.uid,
        nombre: material.nombre,
        categoria: material.categoria,
        unidad: material.unidad,
        stockActual: material.stockActual,
        stockMinimo: material.stockMinimo,
        imagenUrl: material.imagenUrl,
        iniciales: material.iniciales
      }));
    });
  }
  crearTrabajoConAsignacion(trabajo) {
    return __async(this, null, function* () {
      const trabajoRef = doc(collection(this.firestore, "trabajos"));
      const trabajoUid = trabajoRef.id;
      const adminUid = this.auth.currentUser?.uid || "";
      yield runTransaction(this.firestore, (transaction) => __async(this, null, function* () {
        const materialesLeidos = [];
        for (const asignacion of trabajo.materialesAsignados) {
          const materialRef = doc(this.firestore, "materiales", asignacion.materialUid);
          const materialSnap = yield transaction.get(materialRef);
          if (!materialSnap.exists()) {
            throw new Error("material-no-existe");
          }
          materialesLeidos.push({
            materialRef,
            materialSnap,
            asignacion
          });
        }
        const materialesFinales = [];
        for (const item of materialesLeidos) {
          const materialData = item.materialSnap.data();
          const stockAntes = Number(materialData.stockActual || 0);
          const cantidadAsignada = Number(item.asignacion.cantidadAsignada || 0);
          if (cantidadAsignada <= 0) {
            throw new Error("cantidad-material-invalida");
          }
          if (cantidadAsignada > stockAntes) {
            throw new Error(`stock-insuficiente:${item.asignacion.nombre}`);
          }
          const stockDespues = stockAntes - cantidadAsignada;
          const materialFinal = {
            materialUid: item.asignacion.materialUid,
            nombre: item.asignacion.nombre || String(materialData.nombre || ""),
            categoria: item.asignacion.categoria || String(materialData.categoria || ""),
            unidad: item.asignacion.unidad || String(materialData.unidad || ""),
            cantidadAsignada,
            stockAntes,
            stockDespues,
            imagenUrl: item.asignacion.imagenUrl || String(materialData.imagenUrl || "")
          };
          materialesFinales.push(materialFinal);
          transaction.update(item.materialRef, {
            stockActual: stockDespues,
            updatedAt: serverTimestamp()
          });
          const movimientoRef = doc(collection(this.firestore, "movimientos_materiales"));
          transaction.set(movimientoRef, {
            materialUid: materialFinal.materialUid,
            materialNombre: materialFinal.nombre,
            tipoMovimiento: "salida",
            cantidad: cantidadAsignada,
            stockAntes,
            stockDespues,
            moduloOrigen: "asignacion_trabajo",
            trabajoUid,
            descripcion: `Salida por asignaci\xC3\xB3n al trabajo de ${trabajo.clienteNombre}.`,
            realizadoPorUid: adminUid,
            createdAt: serverTimestamp()
          });
        }
        transaction.set(trabajoRef, __spreadProps(__spreadValues({}, trabajo), {
          uid: trabajoUid,
          materialesAsignados: materialesFinales,
          estado: "pendiente",
          activo: true,
          eliminado: false,
          creadoPorUid: adminUid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }));
        const historialRef = doc(collection(this.firestore, "historial_actividades"));
        transaction.set(historialRef, {
          modulo: "SM-1.4 Asignaci\xC3\xB3n de trabajos",
          accion: "crear_trabajo",
          descripcion: `Se cre\xC3\xB3 el trabajo para el cliente ${trabajo.clienteNombre}.`,
          trabajoUid,
          realizadoPorUid: adminUid,
          createdAt: serverTimestamp()
        });
        for (const empleado of trabajo.empleadosAsignados) {
          const notificacionRef = doc(collection(this.firestore, "notificaciones"));
          transaction.set(notificacionRef, {
            titulo: "Nuevo trabajo asignado",
            mensaje: `Tienes un nuevo trabajo programado para el ${trabajo.fechaProgramada} a las ${trabajo.horaProgramada}.`,
            tipo: "trabajo_asignado",
            usuarioUid: empleado.uid,
            trabajoUid,
            leido: false,
            createdAt: serverTimestamp()
          });
        }
      }));
      return trabajoUid;
    });
  }
  editarTrabajo(uid, data) {
    return __async(this, null, function* () {
      const trabajoRef = doc(this.firestore, "trabajos", uid);
      yield updateDoc(trabajoRef, __spreadProps(__spreadValues({}, data), {
        actualizadoPorUid: this.auth.currentUser?.uid || "",
        updatedAt: serverTimestamp()
      }));
      yield this.registrarHistorial("editar_trabajo", `Se actualiz\xC3\xB3 el trabajo ${uid}.`, uid);
    });
  }
  cancelarTrabajoPendiente(trabajoUid) {
    return __async(this, null, function* () {
      const trabajoRef = doc(this.firestore, "trabajos", trabajoUid);
      const adminUid = this.auth.currentUser?.uid || "";
      yield runTransaction(this.firestore, (transaction) => __async(this, null, function* () {
        const trabajoSnap = yield transaction.get(trabajoRef);
        if (!trabajoSnap.exists()) {
          throw new Error("trabajo-no-existe");
        }
        const trabajo = trabajoSnap.data();
        if (trabajo.estado !== "pendiente") {
          throw new Error("trabajo-no-cancelable");
        }
        const materialesAsignados = trabajo.materialesAsignados || [];
        const materialesLeidos = [];
        for (const asignacion of materialesAsignados) {
          const materialRef = doc(this.firestore, "materiales", asignacion.materialUid);
          const materialSnap = yield transaction.get(materialRef);
          if (materialSnap.exists()) {
            materialesLeidos.push({
              materialRef,
              materialSnap,
              asignacion
            });
          }
        }
        for (const item of materialesLeidos) {
          const materialData = item.materialSnap.data();
          const stockAntes = Number(materialData.stockActual || 0);
          const cantidad = Number(item.asignacion.cantidadAsignada || 0);
          const stockDespues = stockAntes + cantidad;
          transaction.update(item.materialRef, {
            stockActual: stockDespues,
            updatedAt: serverTimestamp()
          });
          const movimientoRef = doc(collection(this.firestore, "movimientos_materiales"));
          transaction.set(movimientoRef, {
            materialUid: item.asignacion.materialUid,
            materialNombre: item.asignacion.nombre,
            tipoMovimiento: "ajuste",
            cantidad,
            stockAntes,
            stockDespues,
            moduloOrigen: "cancelacion_trabajo",
            trabajoUid,
            descripcion: `Retorno de stock por cancelaci\xC3\xB3n del trabajo de ${trabajo.clienteNombre}.`,
            realizadoPorUid: adminUid,
            createdAt: serverTimestamp()
          });
        }
        transaction.update(trabajoRef, {
          estado: "cancelado",
          activo: false,
          actualizadoPorUid: adminUid,
          canceledAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        const historialRef = doc(collection(this.firestore, "historial_actividades"));
        transaction.set(historialRef, {
          modulo: "SM-1.4 Asignaci\xC3\xB3n de trabajos",
          accion: "cancelar_trabajo",
          descripcion: `Se cancel\xC3\xB3 el trabajo del cliente ${trabajo.clienteNombre}.`,
          trabajoUid,
          realizadoPorUid: adminUid,
          createdAt: serverTimestamp()
        });
      }));
    });
  }
  eliminarTrabajoLogico(trabajoUid) {
    return __async(this, null, function* () {
      const trabajoRef = doc(this.firestore, "trabajos", trabajoUid);
      const adminUid = this.auth.currentUser?.uid || "";
      yield runTransaction(this.firestore, (transaction) => __async(this, null, function* () {
        const trabajoSnap = yield transaction.get(trabajoRef);
        if (!trabajoSnap.exists()) {
          throw new Error("trabajo-no-existe");
        }
        const trabajo = trabajoSnap.data();
        if (trabajo.estado !== "pendiente" && trabajo.estado !== "cancelado") {
          throw new Error("trabajo-no-eliminable");
        }
        transaction.update(trabajoRef, {
          eliminado: true,
          activo: false,
          eliminadoPorUid: adminUid,
          deletedAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        const historialRef = doc(collection(this.firestore, "historial_actividades"));
        transaction.set(historialRef, {
          modulo: "SM-1.4 Asignaci\xC3\xB3n de trabajos",
          accion: "eliminar_trabajo",
          descripcion: `Se elimin\xC3\xB3 el registro del trabajo del cliente ${trabajo.clienteNombre}.`,
          trabajoUid,
          realizadoPorUid: adminUid,
          createdAt: serverTimestamp()
        });
      }));
    });
  }
  registrarHistorial(accion, descripcion, trabajoUid) {
    return __async(this, null, function* () {
      const historialRef = doc(collection(this.firestore, "historial_actividades"));
      yield setDoc(historialRef, {
        modulo: "SM-1.4 Asignaci\xC3\xB3n de trabajos",
        accion,
        descripcion,
        trabajoUid,
        realizadoPorUid: this.auth.currentUser?.uid || "",
        createdAt: serverTimestamp()
      });
    });
  }
  obtenerIniciales(nombre) {
    const palabras = String(nombre || "").trim().split(/\s+/).filter(Boolean);
    const iniciales = palabras.slice(0, 2).map((palabra) => palabra.charAt(0)).join("").toUpperCase();
    return iniciales || "TR";
  }
};
_TrabajoDAO.\u0275fac = function TrabajoDAO_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TrabajoDAO)();
};
_TrabajoDAO.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TrabajoDAO, factory: _TrabajoDAO.\u0275fac, providedIn: "root" });
var TrabajoDAO = _TrabajoDAO;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrabajoDAO, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/procesos/trabajo.service.ts
var _TrabajoService = class _TrabajoService {
  constructor() {
    this.dao = inject(TrabajoDAO);
    this.auth = inject(Auth);
    this.zone = inject(NgZone);
    this.trabajosSubject = new BehaviorSubject([]);
    this.busquedaSubject = new BehaviorSubject("");
    this.filtroSubject = new BehaviorSubject("todos");
    this.paginaSubject = new BehaviorSubject(1);
    this.tamanioPagina = 5;
    this.vm$ = combineLatest([
      this.trabajosSubject.asObservable(),
      this.busquedaSubject.asObservable(),
      this.filtroSubject.asObservable(),
      this.paginaSubject.asObservable()
    ]).pipe(map(([trabajos, busqueda, filtro, paginaActual]) => {
      const trabajosFiltrados = this.aplicarFiltros(trabajos, busqueda, filtro);
      const totalPaginas = Math.max(1, Math.ceil(trabajosFiltrados.length / this.tamanioPagina));
      const paginaSegura = Math.min(Math.max(1, paginaActual), totalPaginas);
      const inicio = (paginaSegura - 1) * this.tamanioPagina;
      const fin = inicio + this.tamanioPagina;
      const trabajosPagina = trabajosFiltrados.slice(inicio, fin);
      const paginas = Array.from({ length: totalPaginas }, (_, index) => index + 1);
      return {
        trabajos,
        trabajosFiltrados,
        trabajosPagina,
        busqueda,
        filtro,
        paginaActual: paginaSegura,
        totalPaginas,
        paginas,
        totalTrabajos: trabajos.length,
        totalPendientes: trabajos.filter((item) => item.estado === "pendiente").length,
        totalEnProceso: trabajos.filter((item) => item.estado === "en_proceso" || item.estado === "en_camino").length,
        totalFinalizados: trabajos.filter((item) => item.estado === "finalizado").length,
        totalCancelados: trabajos.filter((item) => item.estado === "cancelado").length
      };
    }), shareReplay({
      bufferSize: 1,
      refCount: false
    }));
    void this.cargarTrabajos();
  }
  cargarTrabajos() {
    return __async(this, null, function* () {
      try {
        const trabajos = yield this.dao.obtenerTrabajosUnaVez();
        const trabajosVista = trabajos.filter((trabajo) => trabajo.eliminado !== true).map((trabajo) => this.mapearTrabajoVista(trabajo)).sort((a, b) => {
          const fechaA = `${a.fechaProgramada || ""} ${a.horaProgramada || ""}`;
          const fechaB = `${b.fechaProgramada || ""} ${b.horaProgramada || ""}`;
          return fechaB.localeCompare(fechaA);
        });
        this.zone.run(() => {
          this.trabajosSubject.next(trabajosVista);
        });
      } catch (error) {
        console.error("[TrabajoService] Error al cargar trabajos:", error);
        this.zone.run(() => {
          this.trabajosSubject.next([]);
        });
      }
    });
  }
  refrescarVista() {
    return this.cargarTrabajos();
  }
  obtenerEmpleadosDisponibles() {
    return __async(this, null, function* () {
      return this.dao.obtenerEmpleadosDisponibles();
    });
  }
  obtenerMaterialesDisponibles() {
    return __async(this, null, function* () {
      return this.dao.obtenerMaterialesDisponibles();
    });
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
  crearTrabajo(data) {
    return __async(this, null, function* () {
      const clienteNombre = String(data.clienteNombre || "").trim();
      if (!clienteNombre) {
        throw new Error("cliente-vacio");
      }
      if (!data.empleadosAsignados || data.empleadosAsignados.length === 0) {
        throw new Error("empleados-vacios");
      }
      if (!data.materialesAsignados || data.materialesAsignados.length === 0) {
        throw new Error("materiales-vacios");
      }
      const trabajo = {
        clienteNombre,
        clienteTelefono: String(data.clienteTelefono || "").trim(),
        direccion: String(data.direccion || "").trim(),
        referencia: String(data.referencia || "").trim(),
        latitud: data.latitud ?? null,
        longitud: data.longitud ?? null,
        direccionMapa: String(data.direccionMapa || "").trim(),
        ubicacionTextoOriginal: String(data.ubicacionTextoOriginal || "").trim(),
        tipoTrabajo: String(data.tipoTrabajo || "").trim(),
        descripcion: String(data.descripcion || "").trim(),
        fechaProgramada: String(data.fechaProgramada || "").trim(),
        horaProgramada: String(data.horaProgramada || "").trim(),
        subtotal: Number(data.subtotal || 0),
        empleadosAsignados: data.empleadosAsignados,
        materialesAsignados: data.materialesAsignados,
        codigoCliente: this.generarCodigo(),
        codigoDevolucion: this.generarCodigo(),
        estado: "pendiente",
        activo: true,
        eliminado: false,
        creadoPorUid: this.auth.currentUser?.uid || ""
      };
      yield this.dao.crearTrabajoConAsignacion(trabajo);
      yield this.cargarTrabajos();
    });
  }
  editarTrabajo(data) {
    return __async(this, null, function* () {
      if (!data.uid) {
        throw new Error("trabajo-uid-vacio");
      }
      if (!data.empleadosAsignados || data.empleadosAsignados.length === 0) {
        throw new Error("empleados-vacios");
      }
      yield this.dao.editarTrabajo(data.uid, {
        clienteNombre: String(data.clienteNombre || "").trim(),
        clienteTelefono: String(data.clienteTelefono || "").trim(),
        direccion: String(data.direccion || "").trim(),
        referencia: String(data.referencia || "").trim(),
        latitud: data.latitud ?? null,
        longitud: data.longitud ?? null,
        direccionMapa: String(data.direccionMapa || "").trim(),
        ubicacionTextoOriginal: String(data.ubicacionTextoOriginal || "").trim(),
        tipoTrabajo: String(data.tipoTrabajo || "").trim(),
        descripcion: String(data.descripcion || "").trim(),
        fechaProgramada: String(data.fechaProgramada || "").trim(),
        horaProgramada: String(data.horaProgramada || "").trim(),
        subtotal: Number(data.subtotal || 0),
        empleadosAsignados: data.empleadosAsignados
      });
      yield this.cargarTrabajos();
    });
  }
  cancelarTrabajo(uid) {
    return __async(this, null, function* () {
      if (!uid) {
        throw new Error("trabajo-uid-vacio");
      }
      yield this.dao.cancelarTrabajoPendiente(uid);
      yield this.cargarTrabajos();
    });
  }
  eliminarTrabajo(uid) {
    return __async(this, null, function* () {
      if (!uid) {
        throw new Error("trabajo-uid-vacio");
      }
      yield this.dao.eliminarTrabajoLogico(uid);
      yield this.cargarTrabajos();
    });
  }
  aplicarFiltros(trabajos, busqueda, filtro) {
    let resultado = [...trabajos];
    if (filtro === "pendientes") {
      resultado = resultado.filter((trabajo) => trabajo.estado === "pendiente");
    }
    if (filtro === "enProceso") {
      resultado = resultado.filter((trabajo) => trabajo.estado === "en_camino" || trabajo.estado === "en_proceso");
    }
    if (filtro === "finalizados") {
      resultado = resultado.filter((trabajo) => trabajo.estado === "finalizado");
    }
    if (filtro === "cancelados") {
      resultado = resultado.filter((trabajo) => trabajo.estado === "cancelado");
    }
    const termino = String(busqueda || "").trim().toLowerCase();
    if (termino) {
      resultado = resultado.filter((trabajo) => {
        const textoBusqueda = [
          trabajo.clienteNombre,
          trabajo.clienteTelefono,
          trabajo.direccion,
          trabajo.tipoTrabajo,
          trabajo.estadoTexto,
          trabajo.empleadosTexto,
          trabajo.materialesTexto
        ].join(" ").toLowerCase();
        return textoBusqueda.includes(termino);
      });
    }
    return resultado;
  }
  mapearTrabajoVista(trabajo) {
    const estadoTexto = this.obtenerEstadoTexto(trabajo.estado);
    const estadoClase = this.obtenerEstadoClase(trabajo.estado);
    const empleadosTexto = (trabajo.empleadosAsignados || []).map((empleado) => empleado.nombreCompleto).join(", ") || "Sin empleados";
    const materialesTexto = (trabajo.materialesAsignados || []).map((material) => `${material.nombre} (${material.cantidadAsignada} ${material.unidad})`).join(", ") || "Sin materiales";
    return __spreadProps(__spreadValues({}, trabajo), {
      uid: trabajo.uid || trabajo.id,
      estadoTexto,
      estadoClase,
      fechaHoraTexto: `${trabajo.fechaProgramada || "Sin fecha"} - ${trabajo.horaProgramada || "Sin hora"}`,
      subtotalTexto: `S/ ${Number(trabajo.subtotal || 0).toFixed(2)}`,
      empleadosTexto,
      materialesTexto
    });
  }
  obtenerEstadoTexto(estado) {
    const mapa = {
      pendiente: "Pendiente",
      en_camino: "En camino",
      en_proceso: "En proceso",
      finalizado: "Finalizado",
      devolucion_pendiente: "Devoluci\xF3n pendiente",
      devolucion_realizada: "Devoluci\xF3n realizada",
      cancelado: "Cancelado"
    };
    return mapa[estado] || "Pendiente";
  }
  obtenerEstadoClase(estado) {
    if (estado === "pendiente") {
      return "pendiente";
    }
    if (estado === "en_camino" || estado === "en_proceso") {
      return "proceso";
    }
    if (estado === "finalizado" || estado === "devolucion_realizada") {
      return "finalizado";
    }
    if (estado === "cancelado") {
      return "cancelado";
    }
    return "pendiente";
  }
  generarCodigo() {
    return String(Math.floor(1e5 + Math.random() * 9e5));
  }
};
_TrabajoService.\u0275fac = function TrabajoService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TrabajoService)();
};
_TrabajoService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TrabajoService, factory: _TrabajoService.\u0275fac, providedIn: "root" });
var TrabajoService = _TrabajoService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrabajoService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/app/shared/componentes/trabajo-detalle-modal/trabajo-detalle-modal.component.ts
function TrabajoDetalleModalComponent_div_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span");
    \u0275\u0275text(2, "Referencia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.trabajo.referencia);
  }
}
function TrabajoDetalleModalComponent_div_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span");
    \u0275\u0275text(2, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.trabajo.descripcion);
  }
}
function TrabajoDetalleModalComponent_span_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const empleado_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", empleado_r2.nombreCompleto, " ");
  }
}
function TrabajoDetalleModalComponent_div_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "div")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const material_r3 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(material_r3.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(material_r3.categoria);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", material_r3.cantidadAsignada, " ", material_r3.unidad, " ");
  }
}
var _TrabajoDetalleModalComponent = class _TrabajoDetalleModalComponent {
  constructor() {
    this.modalCtrl = inject(ModalController);
  }
  cerrar() {
    this.modalCtrl.dismiss(null, "cancel");
  }
  verCodigosSeguridad() {
    this.modalCtrl.dismiss({
      accion: "codigos",
      trabajoUid: this.trabajo?.uid || ""
    }, "codigos");
  }
};
_TrabajoDetalleModalComponent.\u0275fac = function TrabajoDetalleModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TrabajoDetalleModalComponent)();
};
_TrabajoDetalleModalComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TrabajoDetalleModalComponent, selectors: [["app-trabajo-detalle-modal"]], inputs: { trabajo: "trabajo" }, decls: 95, vars: 14, consts: [[1, "detalle-header"], [1, "detalle-title-box"], [1, "detalle-avatar"], ["name", "briefcase-outline"], ["type", "button", "slot", "end", 1, "btn-close", 3, "click"], ["name", "close-outline"], [1, "detalle-content"], [1, "detalle-wrapper"], [1, "detalle-card", "estado-card"], [1, "label"], [1, "estado-badge", 3, "ngClass"], [1, "detalle-card"], [1, "section-title"], ["name", "person-outline"], [1, "info-list"], [4, "ngIf"], ["name", "clipboard-outline"], ["name", "people-outline"], [1, "chip-list"], ["class", "chip", 4, "ngFor", "ngForOf"], ["name", "cube-outline"], [1, "material-list"], ["class", "material-row", 4, "ngFor", "ngForOf"], [1, "detalle-card", "codigos-card"], ["name", "shield-checkmark-outline"], ["type", "button", 1, "btn-ver-codigos", 3, "click"], [1, "chip"], [1, "material-row"]], template: function TrabajoDetalleModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-header", 0)(1, "ion-toolbar")(2, "div", 1)(3, "div", 2);
    \u0275\u0275element(4, "ion-icon", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "h2");
    \u0275\u0275text(7, "Detalle del trabajo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "button", 4);
    \u0275\u0275listener("click", function TrabajoDetalleModalComponent_Template_button_click_10_listener() {
      return ctx.cerrar();
    });
    \u0275\u0275element(11, "ion-icon", 5);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "ion-content", 6)(13, "div", 7)(14, "section", 8)(15, "div")(16, "span", 9);
    \u0275\u0275text(17, "Estado actual");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "h3");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span", 10);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "section", 11)(23, "div", 12);
    \u0275\u0275element(24, "ion-icon", 13);
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26, "Datos del cliente");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 14)(28, "div")(29, "span");
    \u0275\u0275text(30, "Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "strong");
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div")(34, "span");
    \u0275\u0275text(35, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "strong");
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div")(39, "span");
    \u0275\u0275text(40, "Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "strong");
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(43, TrabajoDetalleModalComponent_div_43_Template, 5, 1, "div", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "section", 11)(45, "div", 12);
    \u0275\u0275element(46, "ion-icon", 16);
    \u0275\u0275elementStart(47, "span");
    \u0275\u0275text(48, "Datos del trabajo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 14)(50, "div")(51, "span");
    \u0275\u0275text(52, "Tipo de trabajo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "strong");
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div")(56, "span");
    \u0275\u0275text(57, "Fecha y hora");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "strong");
    \u0275\u0275text(59);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "div")(61, "span");
    \u0275\u0275text(62, "Subtotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "strong");
    \u0275\u0275text(64);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(65, TrabajoDetalleModalComponent_div_65_Template, 5, 1, "div", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "section", 11)(67, "div", 12);
    \u0275\u0275element(68, "ion-icon", 17);
    \u0275\u0275elementStart(69, "span");
    \u0275\u0275text(70, "Empleados asignados");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(71, "div", 18);
    \u0275\u0275template(72, TrabajoDetalleModalComponent_span_72_Template, 2, 1, "span", 19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(73, "section", 11)(74, "div", 12);
    \u0275\u0275element(75, "ion-icon", 20);
    \u0275\u0275elementStart(76, "span");
    \u0275\u0275text(77, "Materiales asignados");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(78, "div", 21);
    \u0275\u0275template(79, TrabajoDetalleModalComponent_div_79_Template, 8, 4, "div", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(80, "section", 23)(81, "div", 12);
    \u0275\u0275element(82, "ion-icon", 24);
    \u0275\u0275elementStart(83, "span");
    \u0275\u0275text(84, "C\xF3digos de seguridad");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(85, "div", 14)(86, "div")(87, "span");
    \u0275\u0275text(88, "Gesti\xF3n de c\xF3digos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "strong");
    \u0275\u0275text(90, "Los c\xF3digos de cliente y devoluci\xF3n se administran desde");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(91, "button", 25);
    \u0275\u0275listener("click", function TrabajoDetalleModalComponent_Template_button_click_91_listener() {
      return ctx.verCodigosSeguridad();
    });
    \u0275\u0275element(92, "ion-icon", 24);
    \u0275\u0275elementStart(93, "span");
    \u0275\u0275text(94, "Ver c\xF3digos de seguridad");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx.trabajo.clienteNombre);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx.trabajo.estadoTexto);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx.trabajo.estadoClase);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.trabajo.estadoTexto, " ");
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx.trabajo.clienteNombre);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.trabajo.clienteTelefono || "Sin tel\xE9fono");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.trabajo.direccion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.trabajo.referencia);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx.trabajo.tipoTrabajo);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.trabajo.fechaHoraTexto);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.trabajo.subtotalTexto);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.trabajo.descripcion);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx.trabajo.empleadosAsignados);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx.trabajo.materialesAsignados);
  }
}, dependencies: [CommonModule, NgClass, NgForOf, NgIf, IonicModule, IonContent, IonHeader, IonIcon, IonToolbar], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: var(--color-background);\n  font-family: var(--font-main);\n}\n.detalle-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      135deg,\n      var(--color-primary),\n      var(--color-primary-hover));\n  --color: #ffffff;\n  --min-height: 86px;\n  --padding-start: 14px;\n  --padding-end: 12px;\n}\n.detalle-title-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.detalle-avatar[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.16);\n  border: 1px solid rgba(255, 255, 255, 0.22);\n  display: grid;\n  place-items: center;\n  color: #ffffff;\n  flex-shrink: 0;\n}\n.detalle-avatar[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.detalle-title-box[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 17px;\n  font-weight: 700;\n  color: #ffffff;\n}\n.detalle-title-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: #ffd166;\n}\n.btn-close[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.13);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n}\n.btn-close[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.detalle-content[_ngcontent-%COMP%] {\n  --background: var(--color-background);\n  flex: 1;\n}\n.detalle-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: var(--app-width);\n  margin: 0 auto;\n  padding: 14px;\n}\n.detalle-card[_ngcontent-%COMP%] {\n  background: var(--color-card);\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  padding: 14px;\n  margin-bottom: 12px;\n  box-shadow: var(--shadow-card);\n}\n.estado-card[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n}\n.label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.estado-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.estado-badge[_ngcontent-%COMP%] {\n  min-width: 82px;\n  height: 26px;\n  padding: 0 9px;\n  border-radius: 999px;\n  font-size: 10px;\n  font-weight: 700;\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n}\n.estado-badge.pendiente[_ngcontent-%COMP%] {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.estado-badge.proceso[_ngcontent-%COMP%] {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.estado-badge.finalizado[_ngcontent-%COMP%] {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.estado-badge.cancelado[_ngcontent-%COMP%] {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  margin-bottom: 12px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.section-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n  color: var(--color-primary);\n}\n.info-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 9px;\n}\n.info-list[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.info-list[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.info-list[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  font-weight: 700;\n  color: var(--color-text);\n  line-height: 1.35;\n}\n.chip-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n}\n.chip[_ngcontent-%COMP%] {\n  min-height: 26px;\n  padding: 5px 9px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 11px;\n  font-weight: 700;\n}\n.material-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.material-row[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 10px;\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 8px;\n  align-items: center;\n}\n.material-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.material-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 2px;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.material-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--color-primary);\n}\n.codigo-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.codigo-grid[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  background: var(--color-primary-soft);\n  border-radius: 14px;\n  padding: 12px;\n  text-align: center;\n}\n.codigo-grid[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.codigo-grid[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 5px;\n  font-size: 18px;\n  letter-spacing: 1px;\n  font-weight: 700;\n  color: var(--color-primary);\n}\n.btn-ver-codigos[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 42px;\n  margin-top: 12px;\n  border: none;\n  border-radius: 12px;\n  background: var(--color-primary);\n  color: #ffffff;\n  font-family: var(--font-main);\n  font-size: 12.5px;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n}\n.btn-ver-codigos[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n@media (max-width: 360px) {\n  .codigo-grid[_ngcontent-%COMP%], \n   .material-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=trabajo-detalle-modal.component.css.map */"] });
var TrabajoDetalleModalComponent = _TrabajoDetalleModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrabajoDetalleModalComponent, [{
    type: Component,
    args: [{ selector: "app-trabajo-detalle-modal", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: `<!-- src/app/shared/componentes/trabajo-detalle-modal/trabajo-detalle-modal.component.html -->

<ion-header class="detalle-header">
  <ion-toolbar>

    <div class="detalle-title-box">
      <div class="detalle-avatar">
        <ion-icon name="briefcase-outline"></ion-icon>
      </div>

      <div>
        <h2>Detalle del trabajo</h2>
        <p>{{ trabajo.clienteNombre }}</p>
      </div>
    </div>

    <button type="button" class="btn-close" slot="end" (click)="cerrar()">
      <ion-icon name="close-outline"></ion-icon>
    </button>

  </ion-toolbar>
</ion-header>

<ion-content class="detalle-content">

  <div class="detalle-wrapper">

    <section class="detalle-card estado-card">

      <div>
        <span class="label">Estado actual</span>
        <h3>{{ trabajo.estadoTexto }}</h3>
      </div>

      <span class="estado-badge" [ngClass]="trabajo.estadoClase">
        {{ trabajo.estadoTexto }}
      </span>

    </section>

    <section class="detalle-card">

      <div class="section-title">
        <ion-icon name="person-outline"></ion-icon>
        <span>Datos del cliente</span>
      </div>

      <div class="info-list">
        <div>
          <span>Cliente</span>
          <strong>{{ trabajo.clienteNombre }}</strong>
        </div>

        <div>
          <span>Tel\xE9fono</span>
          <strong>{{ trabajo.clienteTelefono || 'Sin tel\xE9fono' }}</strong>
        </div>

        <div>
          <span>Direcci\xF3n</span>
          <strong>{{ trabajo.direccion }}</strong>
        </div>

        <div *ngIf="trabajo.referencia">
          <span>Referencia</span>
          <strong>{{ trabajo.referencia }}</strong>
        </div>
      </div>

    </section>

    <section class="detalle-card">

      <div class="section-title">
        <ion-icon name="clipboard-outline"></ion-icon>
        <span>Datos del trabajo</span>
      </div>

      <div class="info-list">
        <div>
          <span>Tipo de trabajo</span>
          <strong>{{ trabajo.tipoTrabajo }}</strong>
        </div>

        <div>
          <span>Fecha y hora</span>
          <strong>{{ trabajo.fechaHoraTexto }}</strong>
        </div>

        <div>
          <span>Subtotal</span>
          <strong>{{ trabajo.subtotalTexto }}</strong>
        </div>

        <div *ngIf="trabajo.descripcion">
          <span>Descripci\xF3n</span>
          <strong>{{ trabajo.descripcion }}</strong>
        </div>
      </div>

    </section>

    <section class="detalle-card">

      <div class="section-title">
        <ion-icon name="people-outline"></ion-icon>
        <span>Empleados asignados</span>
      </div>

      <div class="chip-list">
        <span
          class="chip"
          *ngFor="let empleado of trabajo.empleadosAsignados"
        >
          {{ empleado.nombreCompleto }}
        </span>
      </div>

    </section>

    <section class="detalle-card">

      <div class="section-title">
        <ion-icon name="cube-outline"></ion-icon>
        <span>Materiales asignados</span>
      </div>

      <div class="material-list">
        <div
          class="material-row"
          *ngFor="let material of trabajo.materialesAsignados"
        >
          <div>
            <strong>{{ material.nombre }}</strong>
            <span>{{ material.categoria }}</span>
          </div>

          <p>
            {{ material.cantidadAsignada }} {{ material.unidad }}
          </p>
        </div>
      </div>

    </section>

 <section class="detalle-card codigos-card">

  <div class="section-title">
    <ion-icon name="shield-checkmark-outline"></ion-icon>
    <span>C\xF3digos de seguridad</span>
  </div>

  <div class="info-list">
    <div>
      <span>Gesti\xF3n de c\xF3digos</span>
      <strong>Los c\xF3digos de cliente y devoluci\xF3n se administran desde</strong>
    </div>
  </div>

  <button
    type="button"
    class="btn-ver-codigos"
    (click)="verCodigosSeguridad()"
  >
    <ion-icon name="shield-checkmark-outline"></ion-icon>
    <span>Ver c\xF3digos de seguridad</span>
  </button>

</section>

  </div>

</ion-content>`, styles: ["/* src/app/shared/componentes/trabajo-detalle-modal/trabajo-detalle-modal.component.css */\n:host {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: var(--color-background);\n  font-family: var(--font-main);\n}\n.detalle-header ion-toolbar {\n  --background:\n    linear-gradient(\n      135deg,\n      var(--color-primary),\n      var(--color-primary-hover));\n  --color: #ffffff;\n  --min-height: 86px;\n  --padding-start: 14px;\n  --padding-end: 12px;\n}\n.detalle-title-box {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.detalle-avatar {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.16);\n  border: 1px solid rgba(255, 255, 255, 0.22);\n  display: grid;\n  place-items: center;\n  color: #ffffff;\n  flex-shrink: 0;\n}\n.detalle-avatar ion-icon {\n  font-size: 22px;\n}\n.detalle-title-box h2 {\n  margin: 0;\n  font-size: 17px;\n  font-weight: 700;\n  color: #ffffff;\n}\n.detalle-title-box p {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: #ffd166;\n}\n.btn-close {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.13);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n}\n.btn-close ion-icon {\n  font-size: 22px;\n}\n.detalle-content {\n  --background: var(--color-background);\n  flex: 1;\n}\n.detalle-wrapper {\n  width: 100%;\n  max-width: var(--app-width);\n  margin: 0 auto;\n  padding: 14px;\n}\n.detalle-card {\n  background: var(--color-card);\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  padding: 14px;\n  margin-bottom: 12px;\n  box-shadow: var(--shadow-card);\n}\n.estado-card {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n}\n.label {\n  display: block;\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.estado-card h3 {\n  margin: 4px 0 0;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.estado-badge {\n  min-width: 82px;\n  height: 26px;\n  padding: 0 9px;\n  border-radius: 999px;\n  font-size: 10px;\n  font-weight: 700;\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n}\n.estado-badge.pendiente {\n  background: var(--color-warning-bg);\n  color: var(--color-warning);\n}\n.estado-badge.proceso {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.estado-badge.finalizado {\n  background: var(--color-success-bg);\n  color: var(--color-success);\n}\n.estado-badge.cancelado {\n  background: var(--color-error-bg);\n  color: var(--color-error);\n}\n.section-title {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  margin-bottom: 12px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.section-title ion-icon {\n  font-size: 17px;\n  color: var(--color-primary);\n}\n.info-list {\n  display: flex;\n  flex-direction: column;\n  gap: 9px;\n}\n.info-list div {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.info-list span {\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.info-list strong {\n  font-size: 12.5px;\n  font-weight: 700;\n  color: var(--color-text);\n  line-height: 1.35;\n}\n.chip-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n}\n.chip {\n  min-height: 26px;\n  padding: 5px 9px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 11px;\n  font-weight: 700;\n}\n.material-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.material-row {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 10px;\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 8px;\n  align-items: center;\n}\n.material-row strong {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.material-row span {\n  display: block;\n  margin-top: 2px;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.material-row p {\n  margin: 0;\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--color-primary);\n}\n.codigo-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.codigo-grid div {\n  background: var(--color-primary-soft);\n  border-radius: 14px;\n  padding: 12px;\n  text-align: center;\n}\n.codigo-grid span {\n  display: block;\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n.codigo-grid strong {\n  display: block;\n  margin-top: 5px;\n  font-size: 18px;\n  letter-spacing: 1px;\n  font-weight: 700;\n  color: var(--color-primary);\n}\n.btn-ver-codigos {\n  width: 100%;\n  height: 42px;\n  margin-top: 12px;\n  border: none;\n  border-radius: 12px;\n  background: var(--color-primary);\n  color: #ffffff;\n  font-family: var(--font-main);\n  font-size: 12.5px;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n}\n.btn-ver-codigos ion-icon {\n  font-size: 18px;\n}\n@media (max-width: 360px) {\n  .codigo-grid,\n  .material-row {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=trabajo-detalle-modal.component.css.map */\n"] }]
  }], null, { trabajo: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TrabajoDetalleModalComponent, { className: "TrabajoDetalleModalComponent", filePath: "src/app/shared/componentes/trabajo-detalle-modal/trabajo-detalle-modal.component.ts", lineNumber: 18 });
})();

export {
  TrabajoService,
  TrabajoDetalleModalComponent
};
//# sourceMappingURL=chunk-NBQHUH52.js.map
