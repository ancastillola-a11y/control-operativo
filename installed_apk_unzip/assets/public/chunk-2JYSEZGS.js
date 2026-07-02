import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where
} from "./chunk-NMRAWXHA.js";
import {
  BehaviorSubject,
  Injectable,
  combineLatest,
  inject,
  map,
  setClassMetadata,
  shareReplay,
  ɵɵdefineInjectable
} from "./chunk-D2BFCRPD.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-Q3N56TRI.js";

// src/app/dao/gps.dao.ts
var _GpsDAO = class _GpsDAO {
  constructor() {
    this.firestore = inject(Firestore);
  }
  escucharUbicacionesActuales() {
    const ref = collection(this.firestore, "gps_ubicaciones_actuales");
    const q = query(ref, orderBy("actualizadoEn", "desc"));
    return collectionData(q, {
      idField: "uid"
    });
  }
  escucharEmpleadosGps() {
    const refUsuarios = collection(this.firestore, "usuarios");
    const q = query(refUsuarios, where("rol", "==", "empleado"));
    return collectionData(q, {
      idField: "id"
    }).pipe(map((items) => {
      return items.map((data) => {
        const nombres = String(data.nombres || "").trim();
        const apellidos = String(data.apellidos || "").trim();
        const nombreCompleto = String(data.nombreCompleto || `${nombres} ${apellidos}`.trim() || data.usuario || "Empleado").trim();
        const cargo = String(data.cargo || data.rolNombre || "Personal operativo").trim();
        return {
          uid: String(data.uid || data.id || "").trim(),
          etiqueta: `${nombreCompleto} - ${cargo}`,
          nombreCompleto,
          cargo,
          fotoUrl: String(data.fotoUrl || data.photoURL || "").trim(),
          iniciales: this.obtenerIniciales(nombreCompleto),
          habilitado: data.habilitado === true,
          eliminado: data.eliminado === true
        };
      }).filter((empleado) => empleado.uid && empleado.habilitado === true && empleado.eliminado !== true).map((empleado) => ({
        uid: empleado.uid,
        etiqueta: empleado.etiqueta,
        nombreCompleto: empleado.nombreCompleto,
        cargo: empleado.cargo,
        fotoUrl: empleado.fotoUrl,
        iniciales: empleado.iniciales
      }));
    }));
  }
  guardarUbicacionActual(data) {
    return __async(this, null, function* () {
      if (!data.empleadoUid) {
        throw new Error("gps-empleado-uid-vacio");
      }
      const ref = doc(this.firestore, "gps_ubicaciones_actuales", data.empleadoUid);
      yield setDoc(ref, __spreadProps(__spreadValues({}, data), {
        actualizadoEn: serverTimestamp(),
        creadoEn: data.creadoEn || serverTimestamp()
      }), {
        merge: true
      });
    });
  }
  registrarHistorial(data) {
    return __async(this, null, function* () {
      const ref = collection(this.firestore, "gps_historial");
      yield addDoc(ref, __spreadProps(__spreadValues({}, data), {
        registradoEn: serverTimestamp()
      }));
    });
  }
  obtenerIniciales(nombre) {
    const palabras = String(nombre || "").trim().split(/\s+/).filter(Boolean);
    return palabras.slice(0, 2).map((palabra) => palabra.charAt(0)).join("").toUpperCase() || "EM";
  }
};
_GpsDAO.\u0275fac = function GpsDAO_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _GpsDAO)();
};
_GpsDAO.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GpsDAO, factory: _GpsDAO.\u0275fac, providedIn: "root" });
var GpsDAO = _GpsDAO;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GpsDAO, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/procesos/gps.service.ts
var _GpsService = class _GpsService {
  constructor() {
    this.dao = inject(GpsDAO);
    this.empleadoSeleccionadoSubject = new BehaviorSubject("todos");
    this.ubicaciones$ = this.dao.escucharUbicacionesActuales().pipe(map((ubicaciones) => ubicaciones.filter((item) => this.esCoordenadaValida(item.latitud, item.longitud)).map((item) => this.normalizarEstadoGps(item))), shareReplay({
      bufferSize: 1,
      refCount: true
    }));
    this.empleados$ = this.dao.escucharEmpleadosGps().pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
    this.vmAdmin$ = combineLatest([
      this.ubicaciones$,
      this.empleados$,
      this.empleadoSeleccionadoSubject.asObservable()
    ]).pipe(map(([ubicaciones, empleados, empleadoSeleccionadoUid]) => {
      const empleadosFiltro = [
        {
          uid: "todos",
          etiqueta: "Todos los trabajadores",
          nombreCompleto: "Todos los trabajadores",
          cargo: "General"
        },
        ...empleados
      ];
      const empleadoSeleccionado = empleadoSeleccionadoUid === "todos" ? null : empleados.find((item) => item.uid === empleadoSeleccionadoUid) || null;
      const ubicacionesFiltradas = empleadoSeleccionadoUid === "todos" ? ubicaciones : ubicaciones.filter((item) => item.empleadoUid === empleadoSeleccionadoUid);
      return {
        ubicaciones,
        ubicacionesFiltradas,
        empleadosFiltro,
        empleadoSeleccionadoUid,
        empleadoSeleccionado,
        empleadoPrincipal: ubicacionesFiltradas[0] || null,
        totalActivos: ubicaciones.filter((item) => item.estado === "activo" || item.estado === "en_camino").length,
        totalSinSenal: ubicaciones.filter((item) => item.estado === "sin_senal").length,
        totalInactivos: ubicaciones.filter((item) => item.estado === "inactivo").length
      };
    }), shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }
  cambiarEmpleadoSeleccionado(empleadoUid) {
    this.empleadoSeleccionadoSubject.next(String(empleadoUid || "todos").trim() || "todos");
  }
  enviarUbicacionEmpleado(data) {
    return __async(this, null, function* () {
      if (!data.empleadoUid) {
        throw new Error("gps-empleado-uid-vacio");
      }
      if (!this.esCoordenadaValida(data.latitud, data.longitud)) {
        throw new Error("gps-coordenada-invalida");
      }
      const payload = __spreadProps(__spreadValues({}, data), {
        estado: data.estado || "activo"
      });
      yield this.dao.guardarUbicacionActual(payload);
      const historial = {
        empleadoUid: payload.empleadoUid,
        empleadoNombre: payload.empleadoNombre,
        trabajoUid: payload.trabajoUid,
        trabajoCodigo: payload.trabajoCodigo,
        latitud: payload.latitud,
        longitud: payload.longitud,
        precision: payload.precision ?? null
      };
      yield this.dao.registrarHistorial(historial);
    });
  }
  normalizarEstadoGps(item) {
    const minutos = this.obtenerMinutosDesdeActualizacion(item.actualizadoEn);
    let estado = item.estado || "activo";
    if (minutos > 5) {
      estado = "sin_senal";
    }
    if (minutos > 30) {
      estado = "inactivo";
    }
    return __spreadProps(__spreadValues({}, item), {
      estado
    });
  }
  obtenerMinutosDesdeActualizacion(fecha) {
    const fechaMs = this.obtenerTiempoMs(fecha);
    if (!fechaMs) {
      return 999;
    }
    return Math.floor((Date.now() - fechaMs) / 6e4);
  }
  obtenerTiempoMs(fecha) {
    if (!fecha) {
      return 0;
    }
    if (typeof fecha?.toMillis === "function") {
      return fecha.toMillis();
    }
    if (fecha instanceof Date) {
      return fecha.getTime();
    }
    if (typeof fecha === "number") {
      return fecha;
    }
    return 0;
  }
  esCoordenadaValida(latitud, longitud) {
    return typeof latitud === "number" && typeof longitud === "number" && !Number.isNaN(latitud) && !Number.isNaN(longitud) && latitud >= -90 && latitud <= 90 && longitud >= -180 && longitud <= 180;
  }
};
_GpsService.\u0275fac = function GpsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _GpsService)();
};
_GpsService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GpsService, factory: _GpsService.\u0275fac, providedIn: "root" });
var GpsService = _GpsService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GpsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  GpsService
};
//# sourceMappingURL=chunk-2JYSEZGS.js.map
