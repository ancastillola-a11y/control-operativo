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
  DashboardAdminService
} from "./chunk-CWBZAVOG.js";
import {
  AlertController,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonToolbar,
  IonicModule,
  ModalController,
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
  getDownloadURL,
  ref,
  uploadBytes
} from "./chunk-JNLTXSZR.js";
import "./chunk-GMY5SBXE.js";
import {
  callOutline,
  cameraOutline,
  checkmarkCircleOutline,
  chevronForwardOutline,
  closeCircleOutline,
  closeOutline,
  cloudUploadOutline,
  createOutline,
  ellipsisVerticalOutline,
  informationCircleOutline,
  keyOutline,
  personOutline,
  pricetagOutline,
  saveOutline,
  trashOutline
} from "./chunk-XEVVVGO7.js";
import {
  Auth,
  Firestore,
  collection,
  collectionData,
  createUserWithEmailAndPassword,
  deleteUser,
  doc,
  getApp,
  getApps,
  getAuth,
  getDocs,
  initializeApp,
  limit,
  query,
  serverTimestamp,
  setDoc,
  signOut,
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
  MaxLengthValidator,
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
  catchError,
  combineLatest,
  inject,
  map,
  of,
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
  __spreadProps,
  __spreadValues
} from "./chunk-Q3N56TRI.js";

// src/app/dao/empleado.dao.ts
var _EmpleadoDAO = class _EmpleadoDAO {
  constructor() {
    this.firestore = inject(Firestore);
    this.auth = inject(Auth);
  }
  obtenerEmpleados$() {
    const ref2 = collection(this.firestore, "usuarios");
    const consulta = query(ref2, where("rol", "==", "empleado"));
    return collectionData(consulta, { idField: "id" }).pipe(map((data) => data.map((empleado) => __spreadProps(__spreadValues({}, empleado), {
      uid: empleado.uid || empleado.id
    })).filter((empleado) => empleado.eliminado !== true)), catchError((error) => {
      console.error("[EmpleadoDAO] Error obteniendo empleados:", error);
      return of([]);
    }));
  }
  obtenerEmpleadosUnaVez() {
    return __async(this, null, function* () {
      const ref2 = collection(this.firestore, "usuarios");
      const consulta = query(ref2, where("rol", "==", "empleado"));
      const snap = yield getDocs(consulta);
      return snap.docs.map((documento) => {
        const data = documento.data();
        return __spreadProps(__spreadValues({}, data), {
          id: documento.id,
          uid: data.uid || documento.id
        });
      }).filter((empleado) => empleado.eliminado !== true);
    });
  }
  existeUsuario(usuario, uidIgnorado = "") {
    return __async(this, null, function* () {
      const ref2 = collection(this.firestore, "usuarios");
      const consulta = query(ref2, where("usuario", "==", usuario), limit(1));
      const snap = yield getDocs(consulta);
      if (snap.empty) {
        return false;
      }
      return snap.docs[0].id !== uidIgnorado;
    });
  }
  existeDni(dni, uidIgnorado = "") {
    return __async(this, null, function* () {
      const ref2 = collection(this.firestore, "usuarios");
      const consulta = query(ref2, where("dni", "==", dni), limit(1));
      const snap = yield getDocs(consulta);
      if (snap.empty) {
        return false;
      }
      return snap.docs[0].id !== uidIgnorado;
    });
  }
  crearPerfilEmpleado(uid, empleado) {
    return __async(this, null, function* () {
      const ref2 = doc(this.firestore, "usuarios", uid);
      yield setDoc(ref2, __spreadProps(__spreadValues({}, empleado), {
        uid,
        eliminado: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }));
    });
  }
  editarEmpleado(uid, data) {
    return __async(this, null, function* () {
      const ref2 = doc(this.firestore, "usuarios", uid);
      yield updateDoc(ref2, __spreadProps(__spreadValues({}, data), {
        updatedAt: serverTimestamp()
      }));
    });
  }
  guardarCodigoEmpleado(uid, codigoEmpleado) {
    return __async(this, null, function* () {
      const ref2 = doc(this.firestore, "usuarios", uid);
      yield updateDoc(ref2, {
        codigoEmpleado,
        updatedAt: serverTimestamp()
      });
    });
  }
  actualizarFotoEmpleado(uid, fotoUrl) {
    return __async(this, null, function* () {
      const ref2 = doc(this.firestore, "usuarios", uid);
      const adminUid = this.auth.currentUser?.uid || "";
      yield updateDoc(ref2, {
        fotoUrl,
        actualizadoPorUid: adminUid,
        updatedAt: serverTimestamp()
      });
    });
  }
  cambiarEstadoEmpleado(uid, habilitado) {
    return __async(this, null, function* () {
      const ref2 = doc(this.firestore, "usuarios", uid);
      yield updateDoc(ref2, {
        habilitado,
        activo: habilitado,
        estado: habilitado,
        updatedAt: serverTimestamp()
      });
    });
  }
  eliminarEmpleado(uid) {
    return __async(this, null, function* () {
      const ref2 = doc(this.firestore, "usuarios", uid);
      const adminUid = this.auth.currentUser?.uid || "";
      yield updateDoc(ref2, {
        eliminado: true,
        habilitado: false,
        activo: false,
        estado: false,
        eliminadoPorUid: adminUid,
        deletedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    });
  }
  registrarHistorial(accion, descripcion, empleadoUid) {
    return __async(this, null, function* () {
      const adminUid = this.auth.currentUser?.uid || "";
      const ref2 = doc(collection(this.firestore, "historial_actividades"));
      yield setDoc(ref2, {
        modulo: "SM-1.2 Gesti\xF3n de usuarios empleados",
        accion,
        descripcion,
        empleadoUid,
        realizadoPorUid: adminUid,
        createdAt: serverTimestamp()
      });
    });
  }
};
_EmpleadoDAO.\u0275fac = function EmpleadoDAO_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EmpleadoDAO)();
};
_EmpleadoDAO.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EmpleadoDAO, factory: _EmpleadoDAO.\u0275fac, providedIn: "root" });
var EmpleadoDAO = _EmpleadoDAO;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmpleadoDAO, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/procesos/firebase-storage.service.ts
var _FirebaseStorageService = class _FirebaseStorageService {
  constructor() {
    this.storage = inject(Storage);
  }
  subirFotoUsuarioEmpleado(uidEmpleado, archivo) {
    return __async(this, null, function* () {
      if (!uidEmpleado) {
        throw new Error("uid-empleado-vacio");
      }
      if (!archivo) {
        throw new Error("archivo-vacio");
      }
      console.log("[FirebaseStorageService] Archivo recibido:", {
        uidEmpleado,
        nombre: archivo.name,
        tipo: archivo.type,
        peso: archivo.size
      });
      const extension = this.obtenerExtension(archivo);
      const nombreArchivo = `foto-perfil-${Date.now()}.${extension}`;
      const ruta = `usuarios/${uidEmpleado}/perfil/${nombreArchivo}`;
      const storageRef = ref(this.storage, ruta);
      yield uploadBytes(storageRef, archivo, {
        contentType: archivo.type || "image/jpeg"
      });
      const url = yield getDownloadURL(storageRef);
      console.log("[FirebaseStorageService] URL generada:", url);
      return url;
    });
  }
  subirFotoEmpleado(uidEmpleado, archivo) {
    return __async(this, null, function* () {
      return this.subirFotoUsuarioEmpleado(uidEmpleado, archivo);
    });
  }
  obtenerExtension(archivo) {
    const tipo = String(archivo.type || "").toLowerCase();
    const nombre = String(archivo.name || "").toLowerCase();
    if (tipo.includes("png") || nombre.endsWith(".png")) {
      return "png";
    }
    if (tipo.includes("webp") || nombre.endsWith(".webp")) {
      return "webp";
    }
    return "jpg";
  }
};
_FirebaseStorageService.\u0275fac = function FirebaseStorageService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FirebaseStorageService)();
};
_FirebaseStorageService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FirebaseStorageService, factory: _FirebaseStorageService.\u0275fac, providedIn: "root" });
var FirebaseStorageService = _FirebaseStorageService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FirebaseStorageService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/procesos/empleado.service.ts
var _EmpleadoService = class _EmpleadoService {
  constructor() {
    this.dao = inject(EmpleadoDAO);
    this.storageService = inject(FirebaseStorageService);
    this.authPrincipal = inject(Auth);
    this.zone = inject(NgZone);
    this.empleadosSubject = new BehaviorSubject([]);
    this.busquedaSubject = new BehaviorSubject("");
    this.filtroSubject = new BehaviorSubject("todos");
    this.paginaSubject = new BehaviorSubject(1);
    this.tamanioPagina = 5;
    this.dominioAuth = "comproy.local";
    this.vm$ = combineLatest([
      this.empleadosSubject.asObservable(),
      this.busquedaSubject.asObservable(),
      this.filtroSubject.asObservable(),
      this.paginaSubject.asObservable()
    ]).pipe(map(([empleados, busqueda, filtro, paginaActual]) => {
      const empleadosFiltrados = this.aplicarFiltros(empleados, busqueda, filtro);
      const totalPaginas = Math.max(1, Math.ceil(empleadosFiltrados.length / this.tamanioPagina));
      const paginaSegura = Math.min(Math.max(1, paginaActual), totalPaginas);
      const inicio = (paginaSegura - 1) * this.tamanioPagina;
      const fin = inicio + this.tamanioPagina;
      const empleadosPagina = empleadosFiltrados.slice(inicio, fin);
      const paginas = Array.from({ length: totalPaginas }, (_, index) => index + 1);
      return {
        empleados,
        empleadosFiltrados,
        empleadosPagina,
        busqueda,
        filtro,
        paginaActual: paginaSegura,
        totalPaginas,
        paginas,
        totalEmpleados: empleados.length,
        totalHabilitados: empleados.filter((item) => item.habilitado).length,
        totalDeshabilitados: empleados.filter((item) => !item.habilitado).length
      };
    }), shareReplay({
      bufferSize: 1,
      refCount: false
    }));
    void this.cargarEmpleados();
  }
  cargarEmpleados() {
    return __async(this, null, function* () {
      try {
        const empleados = yield this.dao.obtenerEmpleadosUnaVez();
        const empleadosConCodigo = yield this.normalizarCodigosEmpleados(empleados);
        const empleadosVista = empleadosConCodigo.filter((empleado) => empleado.eliminado !== true).map((empleado) => this.mapearEmpleadoVista(empleado)).sort((a, b) => {
          const nombreA = a.nombreCompleto || "";
          const nombreB = b.nombreCompleto || "";
          return nombreA.localeCompare(nombreB);
        });
        this.zone.run(() => {
          this.empleadosSubject.next(empleadosVista);
        });
      } catch (error) {
        console.error("[EmpleadoService] Error al cargar empleados:", error);
        this.zone.run(() => {
          this.empleadosSubject.next([]);
        });
      }
    });
  }
  refrescarVista() {
    return this.cargarEmpleados();
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
  crearEmpleado(data) {
    return __async(this, null, function* () {
      const usuario = this.normalizarUsuario(data.usuario);
      if (!usuario) {
        throw new Error("usuario-vacio");
      }
      if (yield this.dao.existeUsuario(usuario)) {
        throw new Error("usuario-duplicado");
      }
      if (yield this.dao.existeDni(data.dni)) {
        throw new Error("dni-duplicado");
      }
      const correoAuth = this.generarCorreoAuth(usuario);
      const nombreCompleto = `${data.nombres} ${data.apellidos}`.trim();
      const adminUid = this.authPrincipal.currentUser?.uid || "";
      const authSecundario = this.obtenerAuthSecundario();
      const credencial = yield createUserWithEmailAndPassword(authSecundario, correoAuth, data.password);
      const codigoEmpleado = this.generarCodigoEmpleado(credencial.user.uid, nombreCompleto);
      const empleado = {
        uid: credencial.user.uid,
        codigoEmpleado,
        nombres: data.nombres,
        apellidos: data.apellidos,
        nombreCompleto,
        usuario,
        correo: correoAuth,
        correoAuth,
        dni: data.dni,
        telefono: data.telefono,
        cargo: data.cargo || "Personal operativo",
        rol: "empleado",
        habilitado: true,
        activo: true,
        estado: true,
        eliminado: false,
        fotoUrl: String(data.fotoUrl || "").trim(),
        creadoPorUid: adminUid
      };
      let perfilCreado = false;
      try {
        yield this.dao.crearPerfilEmpleado(credencial.user.uid, empleado);
        perfilCreado = true;
        yield this.dao.registrarHistorial("crear_empleado", `Se cre\xF3 el usuario empleado ${nombreCompleto}.`, credencial.user.uid).catch((error) => {
          console.warn("[EmpleadoService] No se pudo registrar historial:", error);
        });
        yield this.cargarEmpleados();
        if (data.fotoArchivo) {
          void this.subirFotoEmpleadoSinBloquear(credencial.user.uid, data.fotoArchivo);
        }
      } catch (error) {
        console.error("[EmpleadoService] Error creando empleado:", error);
        if (!perfilCreado) {
          yield deleteUser(credencial.user).catch((deleteError) => {
            console.warn("[EmpleadoService] No se pudo eliminar usuario Auth hu\xE9rfano:", deleteError);
          });
        }
        throw error;
      } finally {
        yield signOut(authSecundario).catch(() => null);
      }
    });
  }
  editarEmpleado(data) {
    return __async(this, null, function* () {
      const usuario = this.normalizarUsuario(data.usuario);
      if (!usuario) {
        throw new Error("usuario-vacio");
      }
      if (yield this.dao.existeUsuario(usuario, data.uid)) {
        throw new Error("usuario-duplicado");
      }
      if (yield this.dao.existeDni(data.dni, data.uid)) {
        throw new Error("dni-duplicado");
      }
      const nombreCompleto = `${data.nombres} ${data.apellidos}`.trim();
      const fotoUrlActual = String(data.fotoUrl || "").trim();
      yield this.dao.editarEmpleado(data.uid, {
        nombres: data.nombres,
        apellidos: data.apellidos,
        nombreCompleto,
        usuario,
        dni: data.dni,
        telefono: data.telefono,
        cargo: data.cargo || "Personal operativo",
        fotoUrl: fotoUrlActual,
        actualizadoPorUid: this.authPrincipal.currentUser?.uid || ""
      });
      yield this.dao.registrarHistorial("editar_empleado", `Se actualiz\xF3 el registro del empleado ${nombreCompleto}.`, data.uid).catch((error) => {
        console.warn("[EmpleadoService] No se pudo registrar historial:", error);
      });
      yield this.cargarEmpleados();
      if (data.fotoArchivo) {
        void this.subirFotoEmpleadoSinBloquear(data.uid, data.fotoArchivo);
      }
    });
  }
  actualizarFotoEmpleado(uid, fotoUrl) {
    return __async(this, null, function* () {
      yield this.dao.actualizarFotoEmpleado(uid, fotoUrl);
      yield this.dao.registrarHistorial("actualizar_foto_empleado", "Se actualiz\xF3 la foto del empleado.", uid).catch(() => null);
      yield this.cargarEmpleados();
    });
  }
  subirFotoEmpleadoSinBloquear(uid, archivo) {
    return __async(this, null, function* () {
      try {
        console.log("[EmpleadoService] Subiendo foto en segundo plano:", {
          uid,
          archivo: archivo.name
        });
        const fotoUrl = yield this.storageService.subirFotoUsuarioEmpleado(uid, archivo);
        yield this.dao.actualizarFotoEmpleado(uid, fotoUrl);
        yield this.dao.registrarHistorial("actualizar_foto_empleado", "Se actualiz\xF3 la foto del empleado.", uid).catch(() => null);
        yield this.cargarEmpleados();
        console.log("[EmpleadoService] Foto guardada correctamente:", fotoUrl);
      } catch (error) {
        console.error("[EmpleadoService] No se pudo subir la foto. El empleado queda registrado sin foto:", error);
      }
    });
  }
  cambiarEstadoEmpleado(uid, habilitado) {
    return __async(this, null, function* () {
      yield this.dao.cambiarEstadoEmpleado(uid, habilitado);
      yield this.dao.registrarHistorial(habilitado ? "habilitar_empleado" : "deshabilitar_empleado", habilitado ? "Se habilit\xF3 el acceso del empleado." : "Se deshabilit\xF3 el acceso del empleado.", uid).catch((error) => {
        console.warn("[EmpleadoService] No se pudo registrar historial:", error);
      });
      yield this.cargarEmpleados();
    });
  }
  eliminarEmpleado(uid, nombreCompleto) {
    return __async(this, null, function* () {
      yield this.dao.eliminarEmpleado(uid);
      yield this.dao.registrarHistorial("eliminar_empleado", `Se elimin\xF3 el registro operativo del empleado ${nombreCompleto}.`, uid).catch((error) => {
        console.warn("[EmpleadoService] No se pudo registrar historial:", error);
      });
      yield this.cargarEmpleados();
    });
  }
  normalizarUsuario(valor) {
    return String(valor || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "").replace(/[^a-z0-9._-]/g, "");
  }
  generarCorreoAuth(usuario) {
    return `${usuario}@${this.dominioAuth}`;
  }
  obtenerAuthSecundario() {
    const nombreAppSecundaria = "empleado-creator-app";
    const appSecundaria = getApps().some((app) => app.name === nombreAppSecundaria) ? getApp(nombreAppSecundaria) : initializeApp(getApp().options, nombreAppSecundaria);
    return getAuth(appSecundaria);
  }
  normalizarCodigosEmpleados(empleados) {
    return __async(this, null, function* () {
      const salida = [];
      for (const empleado of empleados) {
        const uid = empleado.uid || empleado.id || "";
        const nombreCompleto = empleado.nombreCompleto || `${empleado.nombres || ""} ${empleado.apellidos || ""}`.trim() || empleado.usuario || "Empleado";
        const codigoEmpleado = this.obtenerCodigoEmpleado(empleado, uid, nombreCompleto);
        if (uid && !empleado.codigoEmpleado) {
          try {
            yield this.dao.guardarCodigoEmpleado(uid, codigoEmpleado);
          } catch (error) {
            console.warn("[EmpleadoService] No se pudo guardar codigoEmpleado:", error);
          }
        }
        salida.push(__spreadProps(__spreadValues({}, empleado), {
          codigoEmpleado
        }));
      }
      return salida;
    });
  }
  aplicarFiltros(empleados, busqueda, filtro) {
    let resultado = [...empleados];
    if (filtro === "habilitados") {
      resultado = resultado.filter((empleado) => empleado.habilitado);
    }
    if (filtro === "deshabilitados") {
      resultado = resultado.filter((empleado) => !empleado.habilitado);
    }
    const termino = String(busqueda || "").trim().toLowerCase();
    if (termino) {
      resultado = resultado.filter((empleado) => {
        const textoBusqueda = [
          empleado.codigoEmpleado,
          empleado.codigoEmpleadoTexto,
          empleado.nombreCompleto,
          empleado.usuario,
          empleado.dni,
          empleado.telefono,
          empleado.cargo,
          empleado.cargoTexto
        ].join(" ").toLowerCase();
        return textoBusqueda.includes(termino);
      });
    }
    return resultado;
  }
  mapearEmpleadoVista(empleado) {
    const nombres = empleado.nombres || "";
    const apellidos = empleado.apellidos || "";
    const nombreCompleto = empleado.nombreCompleto || `${nombres} ${apellidos}`.trim() || "Empleado sin nombre";
    const uid = empleado.uid || empleado.id || "";
    const codigoEmpleadoTexto = this.obtenerCodigoEmpleado(empleado, uid, nombreCompleto);
    const iniciales = this.obtenerIniciales(nombres, apellidos);
    return __spreadProps(__spreadValues({}, empleado), {
      uid,
      codigoEmpleado: empleado.codigoEmpleado || codigoEmpleadoTexto,
      codigoEmpleadoTexto,
      nombreCompleto,
      iniciales,
      cargoTexto: empleado.cargo || "Personal operativo",
      habilitado: empleado.habilitado !== false,
      activo: empleado.activo !== false,
      estado: empleado.estado !== false,
      eliminado: empleado.eliminado === true,
      fotoUrl: empleado.fotoUrl || "",
      tieneFoto: !!empleado.fotoUrl
    });
  }
  obtenerIniciales(nombres, apellidos) {
    const primeraLetraNombre = nombres.trim().charAt(0);
    const primeraLetraApellido = apellidos.trim().charAt(0);
    const iniciales = `${primeraLetraNombre}${primeraLetraApellido}`.toUpperCase();
    return iniciales || "EM";
  }
  obtenerCodigoEmpleado(empleado, uid, nombre) {
    const codigoDirecto = String(empleado.codigoEmpleado || "").trim();
    if (/^E-\d{3,6}$/i.test(codigoDirecto)) {
      return codigoDirecto.toUpperCase();
    }
    const textoBase = String(uid || empleado.usuario || empleado.correo || nombre || "empleado").trim();
    return this.generarCodigoEmpleado(textoBase, nombre);
  }
  generarCodigoEmpleado(textoBase, nombre) {
    const base = `${textoBase}-${nombre || ""}`.trim();
    let hash = 0;
    for (let i = 0; i < base.length; i++) {
      hash = (hash << 5) - hash + base.charCodeAt(i);
      hash |= 0;
    }
    const numero = Math.abs(hash) % 1e5;
    return "E-" + String(numero).padStart(5, "0");
  }
};
_EmpleadoService.\u0275fac = function EmpleadoService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EmpleadoService)();
};
_EmpleadoService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EmpleadoService, factory: _EmpleadoService.\u0275fac, providedIn: "root" });
var EmpleadoService = _EmpleadoService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmpleadoService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/app/shared/componentes/empleado-card/empleado-card.component.ts
function EmpleadoCardComponent_img_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 17);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.empleado.fotoUrl, \u0275\u0275sanitizeUrl);
  }
}
function EmpleadoCardComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.empleado.iniciales);
  }
}
var _EmpleadoCardComponent = class _EmpleadoCardComponent {
  constructor() {
    this.acciones = new EventEmitter();
    addIcons({
      "call-outline": callOutline,
      "ellipsis-vertical-outline": ellipsisVerticalOutline,
      "person-outline": personOutline,
      "pricetag-outline": pricetagOutline
    });
  }
  abrirAcciones() {
    this.acciones.emit(this.empleado);
  }
};
_EmpleadoCardComponent.\u0275fac = function EmpleadoCardComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EmpleadoCardComponent)();
};
_EmpleadoCardComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmpleadoCardComponent, selectors: [["app-empleado-card"]], inputs: { empleado: "empleado" }, outputs: { acciones: "acciones" }, decls: 27, vars: 9, consts: [["avatarIniciales", ""], [1, "empleado-card"], [1, "empleado-main"], [1, "empleado-avatar"], ["alt", "Foto empleado", 3, "src", 4, "ngIf", "ngIfElse"], [1, "empleado-info"], [1, "codigo-row"], [1, "codigo-chip"], ["name", "pricetag-outline"], [1, "empleado-cargo"], [1, "empleado-meta"], ["name", "person-outline"], ["name", "call-outline"], [1, "empleado-side"], [1, "estado-badge", 3, "ngClass"], ["type", "button", "aria-label", "Acciones del empleado", 1, "btn-more", 3, "click"], ["name", "ellipsis-vertical-outline"], ["alt", "Foto empleado", 3, "src"]], template: function EmpleadoCardComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 1)(1, "div", 2)(2, "div", 3);
    \u0275\u0275template(3, EmpleadoCardComponent_img_3_Template, 1, 1, "img", 4)(4, EmpleadoCardComponent_ng_template_4_Template, 2, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 5)(7, "div", 6)(8, "span", 7);
    \u0275\u0275element(9, "ion-icon", 8);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "h3");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 9);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 10)(16, "span");
    \u0275\u0275element(17, "ion-icon", 11);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275element(20, "ion-icon", 12);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(22, "div", 13)(23, "span", 14);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 15);
    \u0275\u0275listener("click", function EmpleadoCardComponent_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.abrirAcciones());
    });
    \u0275\u0275element(26, "ion-icon", 16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const avatarIniciales_r3 = \u0275\u0275reference(5);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx.empleado.fotoUrl)("ngIfElse", avatarIniciales_r3);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx.empleado.codigoEmpleadoTexto || ctx.empleado.codigoEmpleado || "E-00000", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.empleado.nombreCompleto);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.empleado.cargoTexto, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.empleado.usuario || "Sin usuario", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.empleado.telefono || "Sin n\xFAmero", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx.empleado.habilitado ? "activo" : "inactivo");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.empleado.habilitado ? "Activo" : "Inactivo", " ");
  }
}, dependencies: [CommonModule, NgClass, NgIf, IonicModule, IonIcon], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.empleado-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #edf0f5;\n  border-radius: 18px;\n  padding: 12px;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 76px;\n  align-items: center;\n  gap: 9px;\n  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05);\n}\n.empleado-main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n}\n.empleado-avatar[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  border-radius: 17px;\n  background: #eef4ff;\n  overflow: hidden;\n  display: grid;\n  place-items: center;\n  color: #1759e8;\n  font-size: 13px;\n  font-weight: 900;\n  flex-shrink: 0;\n  border: 1px solid #dbe8ff;\n}\n.empleado-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.empleado-info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.codigo-row[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n}\n.codigo-chip[_ngcontent-%COMP%] {\n  height: 21px;\n  padding: 0 8px;\n  border-radius: 999px;\n  background: #eef4ff;\n  color: #1759e8;\n  font-size: 10px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n}\n.codigo-chip[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #1759e8;\n}\n.empleado-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13.5px;\n  font-weight: 900;\n  color: #111827;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.empleado-cargo[_ngcontent-%COMP%] {\n  margin: 3px 0 6px;\n  font-size: 11px;\n  font-weight: 800;\n  color: #64748b;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.empleado-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n}\n.empleado-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  max-width: 150px;\n  height: 22px;\n  padding: 0 8px;\n  border-radius: 999px;\n  background: #f1f5f9;\n  color: #475569;\n  font-size: 10px;\n  font-weight: 800;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.empleado-meta[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #64748b;\n  flex-shrink: 0;\n}\n.empleado-side[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.estado-badge[_ngcontent-%COMP%] {\n  min-width: 64px;\n  height: 25px;\n  padding: 0 8px;\n  border-radius: 999px;\n  font-size: 10px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.estado-badge.activo[_ngcontent-%COMP%] {\n  background: #daf5e4;\n  color: #1f9d57;\n}\n.estado-badge.inactivo[_ngcontent-%COMP%] {\n  background: #fde2e2;\n  color: #d63a3a;\n}\n.btn-more[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 34px;\n  border: 1px solid #dbe3ef;\n  border-radius: 12px;\n  background: #f8fafc;\n  color: #062b6f;\n  display: grid;\n  place-items: center;\n  padding: 0;\n  flex-shrink: 0;\n}\n.btn-more[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 21px;\n  color: #062b6f;\n}\n.btn-more[_ngcontent-%COMP%]:active {\n  transform: scale(0.94);\n  background: #eef4ff;\n}\n@media (max-width: 360px) {\n  .empleado-card[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .empleado-side[_ngcontent-%COMP%] {\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n  }\n}\n/*# sourceMappingURL=empleado-card.component.css.map */"] });
var EmpleadoCardComponent = _EmpleadoCardComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmpleadoCardComponent, [{
    type: Component,
    args: [{ selector: "app-empleado-card", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: `<!-- src/app/shared/componentes/empleado-card/empleado-card.component.html -->

<article class="empleado-card">

  <div class="empleado-main">

    <div class="empleado-avatar">
      <img
        *ngIf="empleado.fotoUrl; else avatarIniciales"
        [src]="empleado.fotoUrl"
        alt="Foto empleado"
      />

      <ng-template #avatarIniciales>
        <span>{{ empleado.iniciales }}</span>
      </ng-template>
    </div>

    <div class="empleado-info">

      <div class="codigo-row">
        <span class="codigo-chip">
          <ion-icon name="pricetag-outline"></ion-icon>
          {{ empleado.codigoEmpleadoTexto || empleado.codigoEmpleado || 'E-00000' }}
        </span>
      </div>

      <h3>{{ empleado.nombreCompleto }}</h3>

      <p class="empleado-cargo">
        {{ empleado.cargoTexto }}
      </p>

      <div class="empleado-meta">

        <span>
          <ion-icon name="person-outline"></ion-icon>
          {{ empleado.usuario || 'Sin usuario' }}
        </span>

        <span>
          <ion-icon name="call-outline"></ion-icon>
          {{ empleado.telefono || 'Sin n\xFAmero' }}
        </span>

      </div>

    </div>

  </div>

  <div class="empleado-side">

    <span
      class="estado-badge"
      [ngClass]="empleado.habilitado ? 'activo' : 'inactivo'"
    >
      {{ empleado.habilitado ? 'Activo' : 'Inactivo' }}
    </span>

    <button
      type="button"
      class="btn-more"
      aria-label="Acciones del empleado"
      (click)="abrirAcciones()"
    >
      <ion-icon name="ellipsis-vertical-outline"></ion-icon>
    </button>

  </div>

</article>`, styles: ["/* src/app/shared/componentes/empleado-card/empleado-card.component.css */\n:host {\n  display: block;\n}\n.empleado-card {\n  background: #ffffff;\n  border: 1px solid #edf0f5;\n  border-radius: 18px;\n  padding: 12px;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 76px;\n  align-items: center;\n  gap: 9px;\n  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05);\n}\n.empleado-main {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n}\n.empleado-avatar {\n  width: 50px;\n  height: 50px;\n  border-radius: 17px;\n  background: #eef4ff;\n  overflow: hidden;\n  display: grid;\n  place-items: center;\n  color: #1759e8;\n  font-size: 13px;\n  font-weight: 900;\n  flex-shrink: 0;\n  border: 1px solid #dbe8ff;\n}\n.empleado-avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.empleado-info {\n  min-width: 0;\n}\n.codigo-row {\n  margin-bottom: 4px;\n}\n.codigo-chip {\n  height: 21px;\n  padding: 0 8px;\n  border-radius: 999px;\n  background: #eef4ff;\n  color: #1759e8;\n  font-size: 10px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n}\n.codigo-chip ion-icon {\n  font-size: 12px;\n  color: #1759e8;\n}\n.empleado-info h3 {\n  margin: 0;\n  font-size: 13.5px;\n  font-weight: 900;\n  color: #111827;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.empleado-cargo {\n  margin: 3px 0 6px;\n  font-size: 11px;\n  font-weight: 800;\n  color: #64748b;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.empleado-meta {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n}\n.empleado-meta span {\n  max-width: 150px;\n  height: 22px;\n  padding: 0 8px;\n  border-radius: 999px;\n  background: #f1f5f9;\n  color: #475569;\n  font-size: 10px;\n  font-weight: 800;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.empleado-meta ion-icon {\n  font-size: 12px;\n  color: #64748b;\n  flex-shrink: 0;\n}\n.empleado-side {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.estado-badge {\n  min-width: 64px;\n  height: 25px;\n  padding: 0 8px;\n  border-radius: 999px;\n  font-size: 10px;\n  font-weight: 900;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.estado-badge.activo {\n  background: #daf5e4;\n  color: #1f9d57;\n}\n.estado-badge.inactivo {\n  background: #fde2e2;\n  color: #d63a3a;\n}\n.btn-more {\n  width: 36px;\n  height: 34px;\n  border: 1px solid #dbe3ef;\n  border-radius: 12px;\n  background: #f8fafc;\n  color: #062b6f;\n  display: grid;\n  place-items: center;\n  padding: 0;\n  flex-shrink: 0;\n}\n.btn-more ion-icon {\n  font-size: 21px;\n  color: #062b6f;\n}\n.btn-more:active {\n  transform: scale(0.94);\n  background: #eef4ff;\n}\n@media (max-width: 360px) {\n  .empleado-card {\n    grid-template-columns: 1fr;\n  }\n  .empleado-side {\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n  }\n}\n/*# sourceMappingURL=empleado-card.component.css.map */\n"] }]
  }], () => [], { empleado: [{
    type: Input
  }], acciones: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmpleadoCardComponent, { className: "EmpleadoCardComponent", filePath: "src/app/shared/componentes/empleado-card/empleado-card.component.ts", lineNumber: 27 });
})();

// src/app/shared/componentes/empleado-form-modal/empleado-form-modal.component.ts
function EmpleadoFormModalComponent_img_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 43);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.fotoPreview, \u0275\u0275sanitizeUrl);
  }
}
function EmpleadoFormModalComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.iniciales);
  }
}
function EmpleadoFormModalComponent_img_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 44);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.fotoPreview, \u0275\u0275sanitizeUrl);
  }
}
function EmpleadoFormModalComponent_ng_template_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275element(1, "ion-icon", 15);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.iniciales);
  }
}
function EmpleadoFormModalComponent_button_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function EmpleadoFormModalComponent_button_34_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.quitarFoto());
    });
    \u0275\u0275element(1, "ion-icon", 47);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Quitar");
    \u0275\u0275elementEnd()();
  }
}
function EmpleadoFormModalComponent_small_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.fotoNombre, " ");
  }
}
function EmpleadoFormModalComponent_div_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "label");
    \u0275\u0275text(2, "Contrase\xF1a temporal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ion-item", 28);
    \u0275\u0275element(4, "ion-input", 48);
    \u0275\u0275elementEnd()();
  }
}
function EmpleadoFormModalComponent_div_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275element(1, "ion-icon", 50);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, " La contrase\xF1a no se modifica desde esta ventana. Aqu\xED solo se actualizan los datos del empleado. ");
    \u0275\u0275elementEnd()();
  }
}
var _EmpleadoFormModalComponent = class _EmpleadoFormModalComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.modalCtrl = inject(ModalController);
    this.toastCtrl = inject(ToastController);
    this.modo = "crear";
    this.empleado = null;
    this.fotoPreview = "";
    this.fotoArchivo = null;
    this.fotoNombre = "";
    this.subiendoFoto = false;
    this.fotoUrlActual = "";
    this.formulario = this.fb.group({
      nombres: ["", [Validators.required]],
      apellidos: ["", [Validators.required]],
      dni: ["", [Validators.required, Validators.minLength(8)]],
      telefono: ["", [Validators.required, Validators.minLength(9)]],
      cargo: ["Personal operativo", [Validators.required]],
      usuario: ["", [Validators.required, Validators.minLength(4)]],
      password: [""]
    });
    addIcons({
      "camera-outline": cameraOutline,
      "close-outline": closeOutline,
      "cloud-upload-outline": cloudUploadOutline,
      "information-circle-outline": informationCircleOutline,
      "key-outline": keyOutline,
      "person-outline": personOutline,
      "save-outline": saveOutline,
      "trash-outline": trashOutline
    });
  }
  ngOnInit() {
    if (this.esCrear) {
      this.formulario.get("password")?.setValidators([
        Validators.required,
        Validators.minLength(6)
      ]);
    }
    if (this.esEditar && this.empleado) {
      this.formulario.patchValue({
        nombres: this.empleado.nombres || "",
        apellidos: this.empleado.apellidos || "",
        dni: this.empleado.dni || "",
        telefono: this.empleado.telefono || "",
        cargo: this.empleado.cargo || "Personal operativo",
        usuario: this.empleado.usuario || "",
        password: ""
      });
      this.formulario.get("password")?.clearValidators();
      this.fotoUrlActual = String(this.empleado.fotoUrl || "").trim();
      this.fotoPreview = this.fotoUrlActual;
    }
    this.formulario.get("password")?.updateValueAndValidity();
  }
  get esCrear() {
    return this.modo === "crear";
  }
  get esEditar() {
    return this.modo === "editar";
  }
  get titulo() {
    return this.esCrear ? "Nuevo usuario empleado" : "Editar empleado";
  }
  get subtitulo() {
    return this.esCrear ? "Registra los datos del empleado y su acceso." : "Actualiza los datos operativos del empleado.";
  }
  get textoBoton() {
    if (this.subiendoFoto) {
      return "Guardando...";
    }
    return this.esCrear ? "Crear usuario" : "Guardar cambios";
  }
  get iniciales() {
    const nombres = this.formulario.value.nombres || this.empleado?.nombres || "";
    const apellidos = this.formulario.value.apellidos || this.empleado?.apellidos || "";
    const inicial = `${nombres.charAt(0)}${apellidos.charAt(0)}`.toUpperCase();
    return inicial || "EM";
  }
  seleccionarFoto(event) {
    return __async(this, null, function* () {
      const input = event.target;
      const archivo = input.files?.[0] || null;
      if (!archivo) {
        return;
      }
      const errorArchivo = this.validarArchivoImagen(archivo);
      if (errorArchivo) {
        input.value = "";
        yield this.mostrarToast(errorArchivo);
        return;
      }
      this.fotoArchivo = archivo;
      this.fotoNombre = archivo.name;
      console.log("[EmpleadoFormModal] Foto seleccionada:", {
        nombre: archivo.name,
        tipo: archivo.type,
        peso: archivo.size
      });
      const lector = new FileReader();
      lector.onload = () => {
        this.fotoPreview = String(lector.result || "");
      };
      lector.readAsDataURL(archivo);
    });
  }
  quitarFoto() {
    this.fotoArchivo = null;
    this.fotoNombre = "";
    this.fotoPreview = "";
    this.fotoUrlActual = "";
  }
  cancelar() {
    if (this.subiendoFoto) {
      return;
    }
    this.modalCtrl.dismiss(null, "cancel");
  }
  guardar() {
    return __async(this, null, function* () {
      this.formulario.markAllAsTouched();
      if (this.formulario.invalid) {
        yield this.mostrarToast("Complete correctamente los campos obligatorios");
        return;
      }
      const data = this.formulario.getRawValue();
      const payload = {
        nombres: String(data.nombres || "").trim(),
        apellidos: String(data.apellidos || "").trim(),
        dni: String(data.dni || "").trim(),
        telefono: String(data.telefono || "").trim(),
        cargo: String(data.cargo || "").trim() || "Personal operativo",
        usuario: String(data.usuario || "").trim(),
        fotoUrl: this.fotoUrlActual,
        fotoArchivo: this.fotoArchivo || null
      };
      if (this.esCrear) {
        payload.password = String(data.password || "").trim();
      }
      if (this.esEditar && this.empleado?.uid) {
        payload.uid = this.empleado.uid;
      }
      yield this.modalCtrl.dismiss(payload, "confirm");
    });
  }
  validarArchivoImagen(archivo) {
    const tiposPermitidos = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp"
    ];
    if (!tiposPermitidos.includes(archivo.type)) {
      return "Seleccione una imagen v\xE1lida: JPG, PNG o WEBP";
    }
    const pesoMb = archivo.size / (1024 * 1024);
    if (pesoMb > 3) {
      return "La imagen no debe superar los 3 MB";
    }
    return "";
  }
  obtenerMensajeError(error) {
    const code = String(error?.code || error?.message || "");
    if (code.includes("storage/unauthorized")) {
      return "No tiene permisos para subir im\xE1genes";
    }
    if (code.includes("storage/canceled")) {
      return "La subida de imagen fue cancelada";
    }
    if (code.includes("uid-empleado-vacio")) {
      return "No se encontr\xF3 el UID del empleado";
    }
    if (code.includes("archivo-vacio")) {
      return "No se seleccion\xF3 ninguna imagen";
    }
    return "No se pudo guardar la imagen";
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
_EmpleadoFormModalComponent.\u0275fac = function EmpleadoFormModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EmpleadoFormModalComponent)();
};
_EmpleadoFormModalComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmpleadoFormModalComponent, selectors: [["app-empleado-form-modal"]], inputs: { modo: "modo", empleado: "empleado" }, decls: 90, vars: 13, consts: [["inicialesHeader", ""], ["sinFoto", ""], ["fotoInput", ""], [1, "modal-header"], [1, "modal-toolbar-content"], [1, "modal-title-box"], [1, "modal-avatar"], ["alt", "Foto empleado", 3, "src", 4, "ngIf", "ngIfElse"], [1, "modal-title-text"], ["type", "button", 1, "btn-close", 3, "click"], ["name", "close-outline"], [1, "modal-content"], [1, "form-wrapper", 3, "ngSubmit", "formGroup"], [1, "form-card", "foto-card"], [1, "form-section-title"], ["name", "camera-outline"], [1, "foto-box"], [1, "foto-preview"], ["alt", "Vista previa", 3, "src", 4, "ngIf", "ngIfElse"], [1, "foto-actions"], ["type", "file", "accept", "image/png,image/jpeg,image/jpg,image/webp", 1, "foto-input", 3, "change"], ["type", "button", 1, "btn-foto", 3, "click"], ["name", "cloud-upload-outline"], ["type", "button", "class", "btn-quitar-foto", 3, "click", 4, "ngIf"], [4, "ngIf"], [1, "form-card"], ["name", "person-outline"], [1, "field-group"], ["lines", "none", 1, "input-card"], ["formControlName", "nombres", "placeholder", "Ejemplo: Juan"], ["formControlName", "apellidos", "placeholder", "Ejemplo: P\xE9rez Ramos"], [1, "form-grid"], ["formControlName", "dni", "inputmode", "numeric", "maxlength", "8", "placeholder", "DNI"], ["formControlName", "telefono", "inputmode", "tel", "maxlength", "9", "placeholder", "Celular"], ["formControlName", "cargo", "placeholder", "Ejemplo: T\xE9cnico electricista"], ["name", "key-outline"], ["formControlName", "usuario", "placeholder", "Ejemplo: jperez"], ["class", "field-group", 4, "ngIf"], ["class", "info-box", 4, "ngIf"], [1, "modal-actions"], ["type", "button", 1, "btn-cancelar", 3, "click"], ["type", "submit", 1, "btn-guardar"], ["name", "save-outline"], ["alt", "Foto empleado", 3, "src"], ["alt", "Vista previa", 3, "src"], [1, "foto-empty"], ["type", "button", 1, "btn-quitar-foto", 3, "click"], ["name", "trash-outline"], ["formControlName", "password", "type", "password", "placeholder", "M\xEDnimo 6 caracteres"], [1, "info-box"], ["name", "information-circle-outline"]], template: function EmpleadoFormModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-header", 3)(1, "ion-toolbar")(2, "div", 4)(3, "div", 5)(4, "div", 6);
    \u0275\u0275template(5, EmpleadoFormModalComponent_img_5_Template, 1, 1, "img", 7)(6, EmpleadoFormModalComponent_ng_template_6_Template, 2, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 8)(9, "h2");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "button", 9);
    \u0275\u0275listener("click", function EmpleadoFormModalComponent_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.cancelar());
    });
    \u0275\u0275element(14, "ion-icon", 10);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(15, "ion-content", 11)(16, "form", 12);
    \u0275\u0275listener("ngSubmit", function EmpleadoFormModalComponent_Template_form_ngSubmit_16_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.guardar());
    });
    \u0275\u0275elementStart(17, "section", 13)(18, "div", 14);
    \u0275\u0275element(19, "ion-icon", 15);
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21, "Foto del empleado");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 16)(23, "div", 17);
    \u0275\u0275template(24, EmpleadoFormModalComponent_img_24_Template, 1, 1, "img", 18)(25, EmpleadoFormModalComponent_ng_template_25_Template, 4, 1, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 19)(28, "input", 20, 2);
    \u0275\u0275listener("change", function EmpleadoFormModalComponent_Template_input_change_28_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.seleccionarFoto($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 21);
    \u0275\u0275listener("click", function EmpleadoFormModalComponent_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r1);
      const fotoInput_r3 = \u0275\u0275reference(29);
      return \u0275\u0275resetView(fotoInput_r3.click());
    });
    \u0275\u0275element(31, "ion-icon", 22);
    \u0275\u0275elementStart(32, "span");
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(34, EmpleadoFormModalComponent_button_34_Template, 4, 0, "button", 23);
    \u0275\u0275elementStart(35, "small");
    \u0275\u0275text(36, " Opcional. JPG, PNG o WEBP. M\xE1ximo 3 MB. ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(37, EmpleadoFormModalComponent_small_37_Template, 2, 1, "small", 24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "section", 25)(39, "div", 14);
    \u0275\u0275element(40, "ion-icon", 26);
    \u0275\u0275elementStart(41, "span");
    \u0275\u0275text(42, "Datos personales");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 27)(44, "label");
    \u0275\u0275text(45, "Nombres");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "ion-item", 28);
    \u0275\u0275element(47, "ion-input", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 27)(49, "label");
    \u0275\u0275text(50, "Apellidos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "ion-item", 28);
    \u0275\u0275element(52, "ion-input", 30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 31)(54, "div", 27)(55, "label");
    \u0275\u0275text(56, "DNI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "ion-item", 28);
    \u0275\u0275element(58, "ion-input", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "div", 27)(60, "label");
    \u0275\u0275text(61, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "ion-item", 28);
    \u0275\u0275element(63, "ion-input", 33);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(64, "div", 27)(65, "label");
    \u0275\u0275text(66, "Cargo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "ion-item", 28);
    \u0275\u0275element(68, "ion-input", 34);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(69, "section", 25)(70, "div", 14);
    \u0275\u0275element(71, "ion-icon", 35);
    \u0275\u0275elementStart(72, "span");
    \u0275\u0275text(73, "Acceso al sistema");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(74, "div", 27)(75, "label");
    \u0275\u0275text(76, "Usuario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "ion-item", 28);
    \u0275\u0275element(78, "ion-input", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "small");
    \u0275\u0275text(80, " El usuario se usar\xE1 para iniciar sesi\xF3n en la aplicaci\xF3n. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(81, EmpleadoFormModalComponent_div_81_Template, 5, 0, "div", 37)(82, EmpleadoFormModalComponent_div_82_Template, 4, 0, "div", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "div", 39)(84, "button", 40);
    \u0275\u0275listener("click", function EmpleadoFormModalComponent_Template_button_click_84_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.cancelar());
    });
    \u0275\u0275text(85, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "button", 41);
    \u0275\u0275element(87, "ion-icon", 42);
    \u0275\u0275elementStart(88, "span");
    \u0275\u0275text(89);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const inicialesHeader_r5 = \u0275\u0275reference(7);
    const sinFoto_r6 = \u0275\u0275reference(26);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx.fotoPreview)("ngIfElse", inicialesHeader_r5);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.subtitulo);
    \u0275\u0275advance(4);
    \u0275\u0275property("formGroup", ctx.formulario);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ctx.fotoPreview)("ngIfElse", sinFoto_r6);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx.fotoPreview ? "Cambiar foto" : "Subir foto");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.fotoPreview);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx.fotoNombre);
    \u0275\u0275advance(44);
    \u0275\u0275property("ngIf", ctx.esCrear);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.esEditar);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx.textoBoton);
  }
}, dependencies: [CommonModule, NgIf, IonicModule, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonToolbar, TextValueAccessorDirective, ReactiveFormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: var(--color-background);\n  font-family: var(--font-main);\n}\n.modal-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      \n      135deg,\n      var(--color-primary),\n      var(--color-primary-hover) );\n  --color: #ffffff;\n  --min-height: 86px;\n  --padding-start: 0;\n  --padding-end: 0;\n}\n.modal-toolbar-content[_ngcontent-%COMP%] {\n  min-height: 86px;\n  padding: 0 14px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n.modal-title-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  min-width: 0;\n}\n.modal-avatar[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.16);\n  border: 1px solid rgba(255, 255, 255, 0.22);\n  display: grid;\n  place-items: center;\n  color: #ffffff;\n  font-size: 14px;\n  font-weight: 900;\n  flex-shrink: 0;\n  overflow: hidden;\n}\n.modal-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.modal-title-text[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.modal-title-text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 17px;\n  font-weight: 800;\n  color: #ffffff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.modal-title-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: #ffd166;\n  line-height: 1.25;\n}\n.btn-close[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.13);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n}\n.btn-close[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.modal-content[_ngcontent-%COMP%] {\n  --background: var(--color-background);\n  flex: 1;\n}\n.form-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 430px;\n  margin: 0 auto;\n  padding: 14px 14px 18px;\n}\n.form-card[_ngcontent-%COMP%] {\n  background: var(--color-card);\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  padding: 14px;\n  margin-bottom: 12px;\n  box-shadow: var(--shadow-card);\n}\n.form-section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  margin-bottom: 12px;\n  color: var(--color-text);\n  font-size: 13px;\n  font-weight: 800;\n}\n.form-section-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n  color: var(--color-primary);\n}\n.foto-card[_ngcontent-%COMP%] {\n  border-color: #d9e6ff;\n  background: #f8fbff;\n}\n.foto-box[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 78px 1fr;\n  gap: 12px;\n  align-items: center;\n}\n.foto-preview[_ngcontent-%COMP%] {\n  width: 78px;\n  height: 78px;\n  border-radius: 20px;\n  overflow: hidden;\n  background: #eef4ff;\n  border: 1px solid #dbe8ff;\n  display: grid;\n  place-items: center;\n}\n.foto-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.foto-empty[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  gap: 3px;\n  color: var(--color-primary);\n  font-weight: 900;\n}\n.foto-empty[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 23px;\n}\n.foto-empty[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.foto-actions[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n}\n.foto-input[_ngcontent-%COMP%] {\n  display: none;\n}\n.btn-foto[_ngcontent-%COMP%], \n.btn-quitar-foto[_ngcontent-%COMP%] {\n  height: 36px;\n  border: none;\n  border-radius: 10px;\n  font-size: 12px;\n  font-weight: 800;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  font-family: var(--font-main);\n}\n.btn-foto[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #ffffff;\n  box-shadow: var(--shadow-button);\n}\n.btn-quitar-foto[_ngcontent-%COMP%] {\n  background: #ffecec;\n  color: #d63a3a;\n}\n.btn-foto[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.btn-quitar-foto[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.foto-actions[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  line-height: 1.25;\n}\n.field-group[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.field-group[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.field-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.field-group[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 5px;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  line-height: 1.25;\n}\nion-item.input-card[_ngcontent-%COMP%] {\n  --background: #ffffff;\n  --border-radius: 10px;\n  --min-height: 44px;\n  --padding-start: 12px;\n  --inner-padding-end: 10px;\n  --highlight-height: 0;\n  border: 1px solid var(--color-border);\n  border-radius: 10px;\n  overflow: hidden;\n}\nion-item.input-card[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px rgba(26, 62, 140, 0.12);\n}\nion-item.input-card[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--color-text);\n  --padding-top: 8px;\n  --padding-bottom: 8px;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.info-box[_ngcontent-%COMP%] {\n  background: var(--color-primary-soft);\n  border: 1px solid #d9e6ff;\n  border-radius: 12px;\n  padding: 10px;\n  display: flex;\n  gap: 8px;\n  align-items: flex-start;\n}\n.info-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--color-primary);\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n.info-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 11px;\n  line-height: 1.35;\n  font-weight: 600;\n  color: var(--color-text);\n}\n.modal-actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n  padding-top: 2px;\n  padding-bottom: 4px;\n}\n.btn-cancelar[_ngcontent-%COMP%], \n.btn-guardar[_ngcontent-%COMP%] {\n  height: 44px;\n  border: none;\n  border-radius: 10px;\n  font-size: 13px;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  font-family: var(--font-main);\n}\n.btn-cancelar[_ngcontent-%COMP%] {\n  background: #ffffff;\n  color: var(--color-text-muted);\n  border: 1px solid var(--color-border);\n}\n.btn-guardar[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: #ffffff;\n  box-shadow: var(--shadow-button);\n}\n.btn-guardar[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n@media (max-width: 380px) {\n  .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .modal-actions[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .foto-box[_ngcontent-%COMP%] {\n    grid-template-columns: 70px 1fr;\n    gap: 10px;\n  }\n  .foto-preview[_ngcontent-%COMP%] {\n    width: 70px;\n    height: 70px;\n    border-radius: 18px;\n  }\n  .modal-title-text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .modal-title-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 10.5px;\n  }\n}\n/*# sourceMappingURL=empleado-form-modal.component.css.map */"] });
var EmpleadoFormModalComponent = _EmpleadoFormModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmpleadoFormModalComponent, [{
    type: Component,
    args: [{ selector: "app-empleado-form-modal", standalone: true, imports: [
      CommonModule,
      IonicModule,
      ReactiveFormsModule
    ], template: `<!-- src/app/shared/componentes/empleado-form-modal/empleado-form-modal.component.html -->

<ion-header class="modal-header">
  <ion-toolbar>

    <div class="modal-toolbar-content">

      <div class="modal-title-box">
        <div class="modal-avatar">
          <img
            *ngIf="fotoPreview; else inicialesHeader"
            [src]="fotoPreview"
            alt="Foto empleado"
          />

          <ng-template #inicialesHeader>
            <span>{{ iniciales }}</span>
          </ng-template>
        </div>

        <div class="modal-title-text">
          <h2>{{ titulo }}</h2>
          <p>{{ subtitulo }}</p>
        </div>
      </div>

      <button
        type="button"
        class="btn-close"
        (click)="cancelar()"
      >
        <ion-icon name="close-outline"></ion-icon>
      </button>

    </div>

  </ion-toolbar>
</ion-header>

<ion-content class="modal-content">

  <form [formGroup]="formulario" (ngSubmit)="guardar()" class="form-wrapper">

    <section class="form-card foto-card">

      <div class="form-section-title">
        <ion-icon name="camera-outline"></ion-icon>
        <span>Foto del empleado</span>
      </div>

      <div class="foto-box">

        <div class="foto-preview">
          <img
            *ngIf="fotoPreview; else sinFoto"
            [src]="fotoPreview"
            alt="Vista previa"
          />

          <ng-template #sinFoto>
            <div class="foto-empty">
              <ion-icon name="camera-outline"></ion-icon>
              <span>{{ iniciales }}</span>
            </div>
          </ng-template>
        </div>

        <div class="foto-actions">
          <input
            #fotoInput
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            class="foto-input"
            (change)="seleccionarFoto($event)"
          />

          <button
            type="button"
            class="btn-foto"
            (click)="fotoInput.click()"
          >
            <ion-icon name="cloud-upload-outline"></ion-icon>
            <span>{{ fotoPreview ? 'Cambiar foto' : 'Subir foto' }}</span>
          </button>

          <button
            *ngIf="fotoPreview"
            type="button"
            class="btn-quitar-foto"
            (click)="quitarFoto()"
          >
            <ion-icon name="trash-outline"></ion-icon>
            <span>Quitar</span>
          </button>

          <small>
            Opcional. JPG, PNG o WEBP. M\xE1ximo 3 MB.
          </small>

          <small *ngIf="fotoNombre">
            {{ fotoNombre }}
          </small>
        </div>

      </div>

    </section>

    <section class="form-card">

      <div class="form-section-title">
        <ion-icon name="person-outline"></ion-icon>
        <span>Datos personales</span>
      </div>

      <div class="field-group">
        <label>Nombres</label>
        <ion-item lines="none" class="input-card">
          <ion-input
            formControlName="nombres"
            placeholder="Ejemplo: Juan"
          ></ion-input>
        </ion-item>
      </div>

      <div class="field-group">
        <label>Apellidos</label>
        <ion-item lines="none" class="input-card">
          <ion-input
            formControlName="apellidos"
            placeholder="Ejemplo: P\xE9rez Ramos"
          ></ion-input>
        </ion-item>
      </div>

      <div class="form-grid">
        <div class="field-group">
          <label>DNI</label>
          <ion-item lines="none" class="input-card">
            <ion-input
              formControlName="dni"
              inputmode="numeric"
              maxlength="8"
              placeholder="DNI"
            ></ion-input>
          </ion-item>
        </div>

        <div class="field-group">
          <label>Tel\xE9fono</label>
          <ion-item lines="none" class="input-card">
            <ion-input
              formControlName="telefono"
              inputmode="tel"
              maxlength="9"
              placeholder="Celular"
            ></ion-input>
          </ion-item>
        </div>
      </div>

      <div class="field-group">
        <label>Cargo</label>
        <ion-item lines="none" class="input-card">
          <ion-input
            formControlName="cargo"
            placeholder="Ejemplo: T\xE9cnico electricista"
          ></ion-input>
        </ion-item>
      </div>

    </section>

    <section class="form-card">

      <div class="form-section-title">
        <ion-icon name="key-outline"></ion-icon>
        <span>Acceso al sistema</span>
      </div>

      <div class="field-group">
        <label>Usuario</label>
        <ion-item lines="none" class="input-card">
          <ion-input
            formControlName="usuario"
            placeholder="Ejemplo: jperez"
          ></ion-input>
        </ion-item>

        <small>
          El usuario se usar\xE1 para iniciar sesi\xF3n en la aplicaci\xF3n.
        </small>
      </div>

      <div class="field-group" *ngIf="esCrear">
        <label>Contrase\xF1a temporal</label>
        <ion-item lines="none" class="input-card">
          <ion-input
            formControlName="password"
            type="password"
            placeholder="M\xEDnimo 6 caracteres"
          ></ion-input>
        </ion-item>
      </div>

      <div class="info-box" *ngIf="esEditar">
        <ion-icon name="information-circle-outline"></ion-icon>
        <p>
          La contrase\xF1a no se modifica desde esta ventana.
          Aqu\xED solo se actualizan los datos del empleado.
        </p>
      </div>

    </section>

    <div class="modal-actions">
      <button
        type="button"
        class="btn-cancelar"
        (click)="cancelar()"
      >
        Cancelar
      </button>

      <button
        type="submit"
        class="btn-guardar"
      >
        <ion-icon name="save-outline"></ion-icon>
        <span>{{ textoBoton }}</span>
      </button>
    </div>

  </form>

</ion-content>`, styles: ["/* src/app/shared/componentes/empleado-form-modal/empleado-form-modal.component.css */\n:host {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: var(--color-background);\n  font-family: var(--font-main);\n}\n.modal-header ion-toolbar {\n  --background:\n    linear-gradient(\n      \n      135deg,\n      var(--color-primary),\n      var(--color-primary-hover) );\n  --color: #ffffff;\n  --min-height: 86px;\n  --padding-start: 0;\n  --padding-end: 0;\n}\n.modal-toolbar-content {\n  min-height: 86px;\n  padding: 0 14px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n.modal-title-box {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  min-width: 0;\n}\n.modal-avatar {\n  width: 44px;\n  height: 44px;\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.16);\n  border: 1px solid rgba(255, 255, 255, 0.22);\n  display: grid;\n  place-items: center;\n  color: #ffffff;\n  font-size: 14px;\n  font-weight: 900;\n  flex-shrink: 0;\n  overflow: hidden;\n}\n.modal-avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.modal-title-text {\n  min-width: 0;\n}\n.modal-title-text h2 {\n  margin: 0;\n  font-size: 17px;\n  font-weight: 800;\n  color: #ffffff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.modal-title-text p {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: #ffd166;\n  line-height: 1.25;\n}\n.btn-close {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.13);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n}\n.btn-close ion-icon {\n  font-size: 22px;\n}\n.modal-content {\n  --background: var(--color-background);\n  flex: 1;\n}\n.form-wrapper {\n  width: 100%;\n  max-width: 430px;\n  margin: 0 auto;\n  padding: 14px 14px 18px;\n}\n.form-card {\n  background: var(--color-card);\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  padding: 14px;\n  margin-bottom: 12px;\n  box-shadow: var(--shadow-card);\n}\n.form-section-title {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  margin-bottom: 12px;\n  color: var(--color-text);\n  font-size: 13px;\n  font-weight: 800;\n}\n.form-section-title ion-icon {\n  font-size: 17px;\n  color: var(--color-primary);\n}\n.foto-card {\n  border-color: #d9e6ff;\n  background: #f8fbff;\n}\n.foto-box {\n  display: grid;\n  grid-template-columns: 78px 1fr;\n  gap: 12px;\n  align-items: center;\n}\n.foto-preview {\n  width: 78px;\n  height: 78px;\n  border-radius: 20px;\n  overflow: hidden;\n  background: #eef4ff;\n  border: 1px solid #dbe8ff;\n  display: grid;\n  place-items: center;\n}\n.foto-preview img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.foto-empty {\n  display: grid;\n  place-items: center;\n  gap: 3px;\n  color: var(--color-primary);\n  font-weight: 900;\n}\n.foto-empty ion-icon {\n  font-size: 23px;\n}\n.foto-empty span {\n  font-size: 13px;\n}\n.foto-actions {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n}\n.foto-input {\n  display: none;\n}\n.btn-foto,\n.btn-quitar-foto {\n  height: 36px;\n  border: none;\n  border-radius: 10px;\n  font-size: 12px;\n  font-weight: 800;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  font-family: var(--font-main);\n}\n.btn-foto {\n  background: var(--color-primary);\n  color: #ffffff;\n  box-shadow: var(--shadow-button);\n}\n.btn-quitar-foto {\n  background: #ffecec;\n  color: #d63a3a;\n}\n.btn-foto ion-icon,\n.btn-quitar-foto ion-icon {\n  font-size: 16px;\n}\n.foto-actions small {\n  display: block;\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--color-text-muted);\n  line-height: 1.25;\n}\n.field-group {\n  margin-bottom: 12px;\n}\n.field-group:last-child {\n  margin-bottom: 0;\n}\n.field-group label {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.field-group small {\n  display: block;\n  margin-top: 5px;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n  line-height: 1.25;\n}\nion-item.input-card {\n  --background: #ffffff;\n  --border-radius: 10px;\n  --min-height: 44px;\n  --padding-start: 12px;\n  --inner-padding-end: 10px;\n  --highlight-height: 0;\n  border: 1px solid var(--color-border);\n  border-radius: 10px;\n  overflow: hidden;\n}\nion-item.input-card:focus-within {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px rgba(26, 62, 140, 0.12);\n}\nion-item.input-card ion-input {\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--color-text);\n  --padding-top: 8px;\n  --padding-bottom: 8px;\n}\n.form-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.info-box {\n  background: var(--color-primary-soft);\n  border: 1px solid #d9e6ff;\n  border-radius: 12px;\n  padding: 10px;\n  display: flex;\n  gap: 8px;\n  align-items: flex-start;\n}\n.info-box ion-icon {\n  font-size: 18px;\n  color: var(--color-primary);\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n.info-box p {\n  margin: 0;\n  font-size: 11px;\n  line-height: 1.35;\n  font-weight: 600;\n  color: var(--color-text);\n}\n.modal-actions {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n  padding-top: 2px;\n  padding-bottom: 4px;\n}\n.btn-cancelar,\n.btn-guardar {\n  height: 44px;\n  border: none;\n  border-radius: 10px;\n  font-size: 13px;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  font-family: var(--font-main);\n}\n.btn-cancelar {\n  background: #ffffff;\n  color: var(--color-text-muted);\n  border: 1px solid var(--color-border);\n}\n.btn-guardar {\n  background: var(--color-primary);\n  color: #ffffff;\n  box-shadow: var(--shadow-button);\n}\n.btn-guardar ion-icon {\n  font-size: 17px;\n}\n@media (max-width: 380px) {\n  .form-grid {\n    grid-template-columns: 1fr;\n  }\n  .modal-actions {\n    grid-template-columns: 1fr;\n  }\n  .foto-box {\n    grid-template-columns: 70px 1fr;\n    gap: 10px;\n  }\n  .foto-preview {\n    width: 70px;\n    height: 70px;\n    border-radius: 18px;\n  }\n  .modal-title-text h2 {\n    font-size: 16px;\n  }\n  .modal-title-text p {\n    font-size: 10.5px;\n  }\n}\n/*# sourceMappingURL=empleado-form-modal.component.css.map */\n"] }]
  }], () => [], { modo: [{
    type: Input
  }], empleado: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmpleadoFormModalComponent, { className: "EmpleadoFormModalComponent", filePath: "src/app/shared/componentes/empleado-form-modal/empleado-form-modal.component.ts", lineNumber: 45 });
})();

// src/app/shared/componentes/empleado-acciones-modal/empleado-acciones-modal.component.ts
function EmpleadoAccionesModalComponent_img_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 24);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.empleado.fotoUrl, \u0275\u0275sanitizeUrl);
  }
}
function EmpleadoAccionesModalComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.iniciales);
  }
}
var _EmpleadoAccionesModalComponent = class _EmpleadoAccionesModalComponent {
  constructor() {
    this.modalCtrl = inject(ModalController);
    addIcons({
      "camera-outline": cameraOutline,
      "checkmark-circle-outline": checkmarkCircleOutline,
      "chevron-forward-outline": chevronForwardOutline,
      "close-circle-outline": closeCircleOutline,
      "close-outline": closeOutline,
      "create-outline": createOutline,
      "key-outline": keyOutline,
      "trash-outline": trashOutline
    });
  }
  get iniciales() {
    return this.empleado?.iniciales || "EM";
  }
  get nombre() {
    return this.empleado?.nombreCompleto || "Empleado";
  }
  get cargo() {
    return this.empleado?.cargoTexto || this.empleado?.cargo || "Personal operativo";
  }
  get codigo() {
    return this.empleado?.codigoEmpleadoTexto || this.empleado?.codigoEmpleado || "E-00000";
  }
  get estadoTexto() {
    return this.empleado?.habilitado ? "Activo" : "Inactivo";
  }
  get accionEstadoTexto() {
    return this.empleado?.habilitado ? "Deshabilitar usuario" : "Habilitar usuario";
  }
  get accionEstadoIcono() {
    return this.empleado?.habilitado ? "close-circle-outline" : "checkmark-circle-outline";
  }
  cancelar() {
    this.modalCtrl.dismiss(null, "cancel");
  }
  seleccionar(accion) {
    this.modalCtrl.dismiss({ accion }, "confirm");
  }
};
_EmpleadoAccionesModalComponent.\u0275fac = function EmpleadoAccionesModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EmpleadoAccionesModalComponent)();
};
_EmpleadoAccionesModalComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmpleadoAccionesModalComponent, selectors: [["app-empleado-acciones-modal"]], inputs: { empleado: "empleado" }, decls: 64, vars: 12, consts: [["avatarIniciales", ""], [1, "acciones-panel"], [1, "modal-bar"], [1, "acciones-header"], [1, "empleado-avatar"], ["alt", "Empleado", 3, "src", 4, "ngIf", "ngIfElse"], [1, "empleado-info"], ["type", "button", 1, "btn-close", 3, "click"], ["name", "close-outline"], [1, "acciones-lista"], ["type", "button", 1, "accion-item", 3, "click"], [1, "accion-icon", "editar"], ["name", "create-outline"], [1, "accion-text"], ["name", "chevron-forward-outline", 1, "arrow"], [1, "accion-icon", "foto"], ["name", "camera-outline"], [1, "accion-icon", "password"], ["name", "key-outline"], [1, "accion-icon", "estado"], [3, "name"], ["type", "button", 1, "accion-item", "danger", 3, "click"], [1, "accion-icon", "eliminar"], ["name", "trash-outline"], ["alt", "Empleado", 3, "src"]], template: function EmpleadoAccionesModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "div", 2);
    \u0275\u0275elementStart(2, "header", 3)(3, "div", 4);
    \u0275\u0275template(4, EmpleadoAccionesModalComponent_img_4_Template, 1, 1, "img", 5)(5, EmpleadoAccionesModalComponent_ng_template_5_Template, 2, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 6)(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "h2");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 7);
    \u0275\u0275listener("click", function EmpleadoAccionesModalComponent_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.cancelar());
    });
    \u0275\u0275element(17, "ion-icon", 8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "section", 9)(19, "button", 10);
    \u0275\u0275listener("click", function EmpleadoAccionesModalComponent_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.seleccionar("editar"));
    });
    \u0275\u0275elementStart(20, "div", 11);
    \u0275\u0275element(21, "ion-icon", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 13)(23, "h3");
    \u0275\u0275text(24, "Editar registro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "p");
    \u0275\u0275text(26, "Actualizar datos personales y operativos.");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(27, "ion-icon", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 10);
    \u0275\u0275listener("click", function EmpleadoAccionesModalComponent_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.seleccionar("foto"));
    });
    \u0275\u0275elementStart(29, "div", 15);
    \u0275\u0275element(30, "ion-icon", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 13)(32, "h3");
    \u0275\u0275text(33, "Cambiar foto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "p");
    \u0275\u0275text(35, "Subir o reemplazar la imagen del empleado.");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(36, "ion-icon", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "button", 10);
    \u0275\u0275listener("click", function EmpleadoAccionesModalComponent_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.seleccionar("password"));
    });
    \u0275\u0275elementStart(38, "div", 17);
    \u0275\u0275element(39, "ion-icon", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 13)(41, "h3");
    \u0275\u0275text(42, "Cambiar contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "p");
    \u0275\u0275text(44, "Asignar nueva contrase\xF1a temporal.");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(45, "ion-icon", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "button", 10);
    \u0275\u0275listener("click", function EmpleadoAccionesModalComponent_Template_button_click_46_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.seleccionar("estado"));
    });
    \u0275\u0275elementStart(47, "div", 19);
    \u0275\u0275element(48, "ion-icon", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 13)(50, "h3");
    \u0275\u0275text(51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "p");
    \u0275\u0275text(53, "Controlar acceso del empleado a la aplicaci\xF3n.");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(54, "ion-icon", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "button", 21);
    \u0275\u0275listener("click", function EmpleadoAccionesModalComponent_Template_button_click_55_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.seleccionar("eliminar"));
    });
    \u0275\u0275elementStart(56, "div", 22);
    \u0275\u0275element(57, "ion-icon", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "div", 13)(59, "h3");
    \u0275\u0275text(60, "Eliminar registro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "p");
    \u0275\u0275text(62, "Ocultar empleado y bloquear su acceso operativo.");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(63, "ion-icon", 14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const avatarIniciales_r3 = \u0275\u0275reference(6);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx.empleado.fotoUrl)("ngIfElse", avatarIniciales_r3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.codigo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.cargo);
    \u0275\u0275advance();
    \u0275\u0275classProp("activo", ctx.empleado.habilitado)("inactivo", !ctx.empleado.habilitado);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.estadoTexto, " ");
    \u0275\u0275advance(33);
    \u0275\u0275property("name", ctx.accionEstadoIcono);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.accionEstadoTexto);
  }
}, dependencies: [CommonModule, NgIf, IonicModule, IonIcon], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  background: transparent;\n}\n.acciones-panel[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #f5f7fb;\n  border-top-left-radius: 24px;\n  border-top-right-radius: 24px;\n  padding: 10px 14px 18px;\n}\n.modal-bar[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 5px;\n  border-radius: 999px;\n  background: #cbd5e1;\n  margin: 0 auto 14px;\n}\n.acciones-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #062b6f,\n      #0b3d91);\n  border-radius: 18px;\n  padding: 14px;\n  display: grid;\n  grid-template-columns: 48px 1fr 36px;\n  gap: 12px;\n  align-items: center;\n  color: #ffffff;\n  margin-bottom: 14px;\n}\n.empleado-avatar[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 16px;\n  overflow: hidden;\n  background: rgba(255, 255, 255, 0.16);\n  display: grid;\n  place-items: center;\n  font-size: 14px;\n  font-weight: 900;\n}\n.empleado-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.empleado-info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.empleado-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 900;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.empleado-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 6px;\n  font-size: 11px;\n  font-weight: 700;\n  color: #ffd166;\n}\n.empleado-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-flex;\n  height: 22px;\n  padding: 0 9px;\n  align-items: center;\n  border-radius: 999px;\n  font-size: 10px;\n  font-weight: 900;\n}\n.empleado-info[_ngcontent-%COMP%]   span.activo[_ngcontent-%COMP%] {\n  background: #daf5e4;\n  color: #1f9d57;\n}\n.empleado-info[_ngcontent-%COMP%]   span.inactivo[_ngcontent-%COMP%] {\n  background: #fde2e2;\n  color: #d63a3a;\n}\n.btn-close[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.15);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n}\n.btn-close[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.acciones-lista[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.accion-item[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #e6ebf3;\n  border-radius: 16px;\n  background: #ffffff;\n  padding: 12px;\n  display: grid;\n  grid-template-columns: 42px 1fr 20px;\n  gap: 10px;\n  align-items: center;\n  text-align: left;\n  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);\n}\n.accion-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  display: grid;\n  place-items: center;\n}\n.accion-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 21px;\n}\n.accion-icon.editar[_ngcontent-%COMP%] {\n  background: #eef4ff;\n  color: #1759e8;\n}\n.accion-icon.password[_ngcontent-%COMP%] {\n  background: #fff7df;\n  color: #c88600;\n}\n.accion-icon.estado[_ngcontent-%COMP%] {\n  background: #eafaf0;\n  color: #1f9d57;\n}\n.accion-icon.eliminar[_ngcontent-%COMP%] {\n  background: #ffecec;\n  color: #d63a3a;\n}\n.accion-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 900;\n  color: #111827;\n}\n.accion-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: #64748b;\n  line-height: 1.25;\n}\n.arrow[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-size: 17px;\n}\n.accion-item[_ngcontent-%COMP%]:active {\n  transform: scale(0.985);\n}\n.accion-item.danger[_ngcontent-%COMP%]   .accion-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #b42318;\n}\n.empleado-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: inline-flex;\n  height: 20px;\n  padding: 0 8px;\n  align-items: center;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.16);\n  color: #ffffff;\n  font-size: 9.5px;\n  font-weight: 900;\n  margin-bottom: 4px;\n}\n.accion-icon.foto[_ngcontent-%COMP%] {\n  background: #eef4ff;\n  color: #1759e8;\n}\n/*# sourceMappingURL=empleado-acciones-modal.component.css.map */"] });
var EmpleadoAccionesModalComponent = _EmpleadoAccionesModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmpleadoAccionesModalComponent, [{
    type: Component,
    args: [{ selector: "app-empleado-acciones-modal", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: `<!-- src/app/shared/componentes/empleado-acciones-modal/empleado-acciones-modal.component.html -->

<div class="acciones-panel">

  <div class="modal-bar"></div>

  <header class="acciones-header">

    <div class="empleado-avatar">
      <img
        *ngIf="empleado.fotoUrl; else avatarIniciales"
        [src]="empleado.fotoUrl"
        alt="Empleado"
      />

      <ng-template #avatarIniciales>
        <span>{{ iniciales }}</span>
      </ng-template>
    </div>

    <div class="empleado-info">
      <small>{{ codigo }}</small>
      <h2>{{ nombre }}</h2>
      <p>{{ cargo }}</p>

      <span
        [class.activo]="empleado.habilitado"
        [class.inactivo]="!empleado.habilitado"
      >
        {{ estadoTexto }}
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
        <h3>Editar registro</h3>
        <p>Actualizar datos personales y operativos.</p>
      </div>

      <ion-icon name="chevron-forward-outline" class="arrow"></ion-icon>
    </button>

    <button type="button" class="accion-item" (click)="seleccionar('foto')">
      <div class="accion-icon foto">
        <ion-icon name="camera-outline"></ion-icon>
      </div>

      <div class="accion-text">
        <h3>Cambiar foto</h3>
        <p>Subir o reemplazar la imagen del empleado.</p>
      </div>

      <ion-icon name="chevron-forward-outline" class="arrow"></ion-icon>
    </button>

    <button type="button" class="accion-item" (click)="seleccionar('password')">
      <div class="accion-icon password">
        <ion-icon name="key-outline"></ion-icon>
      </div>

      <div class="accion-text">
        <h3>Cambiar contrase\xF1a</h3>
        <p>Asignar nueva contrase\xF1a temporal.</p>
      </div>

      <ion-icon name="chevron-forward-outline" class="arrow"></ion-icon>
    </button>

    <button type="button" class="accion-item" (click)="seleccionar('estado')">
      <div class="accion-icon estado">
        <ion-icon [name]="accionEstadoIcono"></ion-icon>
      </div>

      <div class="accion-text">
        <h3>{{ accionEstadoTexto }}</h3>
        <p>Controlar acceso del empleado a la aplicaci\xF3n.</p>
      </div>

      <ion-icon name="chevron-forward-outline" class="arrow"></ion-icon>
    </button>

    <button type="button" class="accion-item danger" (click)="seleccionar('eliminar')">
      <div class="accion-icon eliminar">
        <ion-icon name="trash-outline"></ion-icon>
      </div>

      <div class="accion-text">
        <h3>Eliminar registro</h3>
        <p>Ocultar empleado y bloquear su acceso operativo.</p>
      </div>

      <ion-icon name="chevron-forward-outline" class="arrow"></ion-icon>
    </button>

  </section>

</div>`, styles: ["/* src/app/shared/componentes/empleado-acciones-modal/empleado-acciones-modal.component.css */\n:host {\n  display: block;\n  background: transparent;\n}\n.acciones-panel {\n  width: 100%;\n  background: #f5f7fb;\n  border-top-left-radius: 24px;\n  border-top-right-radius: 24px;\n  padding: 10px 14px 18px;\n}\n.modal-bar {\n  width: 44px;\n  height: 5px;\n  border-radius: 999px;\n  background: #cbd5e1;\n  margin: 0 auto 14px;\n}\n.acciones-header {\n  background:\n    linear-gradient(\n      135deg,\n      #062b6f,\n      #0b3d91);\n  border-radius: 18px;\n  padding: 14px;\n  display: grid;\n  grid-template-columns: 48px 1fr 36px;\n  gap: 12px;\n  align-items: center;\n  color: #ffffff;\n  margin-bottom: 14px;\n}\n.empleado-avatar {\n  width: 48px;\n  height: 48px;\n  border-radius: 16px;\n  overflow: hidden;\n  background: rgba(255, 255, 255, 0.16);\n  display: grid;\n  place-items: center;\n  font-size: 14px;\n  font-weight: 900;\n}\n.empleado-avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.empleado-info {\n  min-width: 0;\n}\n.empleado-info h2 {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 900;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.empleado-info p {\n  margin: 3px 0 6px;\n  font-size: 11px;\n  font-weight: 700;\n  color: #ffd166;\n}\n.empleado-info span {\n  display: inline-flex;\n  height: 22px;\n  padding: 0 9px;\n  align-items: center;\n  border-radius: 999px;\n  font-size: 10px;\n  font-weight: 900;\n}\n.empleado-info span.activo {\n  background: #daf5e4;\n  color: #1f9d57;\n}\n.empleado-info span.inactivo {\n  background: #fde2e2;\n  color: #d63a3a;\n}\n.btn-close {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.15);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n}\n.btn-close ion-icon {\n  font-size: 22px;\n}\n.acciones-lista {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.accion-item {\n  width: 100%;\n  border: 1px solid #e6ebf3;\n  border-radius: 16px;\n  background: #ffffff;\n  padding: 12px;\n  display: grid;\n  grid-template-columns: 42px 1fr 20px;\n  gap: 10px;\n  align-items: center;\n  text-align: left;\n  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);\n}\n.accion-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  display: grid;\n  place-items: center;\n}\n.accion-icon ion-icon {\n  font-size: 21px;\n}\n.accion-icon.editar {\n  background: #eef4ff;\n  color: #1759e8;\n}\n.accion-icon.password {\n  background: #fff7df;\n  color: #c88600;\n}\n.accion-icon.estado {\n  background: #eafaf0;\n  color: #1f9d57;\n}\n.accion-icon.eliminar {\n  background: #ffecec;\n  color: #d63a3a;\n}\n.accion-text h3 {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 900;\n  color: #111827;\n}\n.accion-text p {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  color: #64748b;\n  line-height: 1.25;\n}\n.arrow {\n  color: #94a3b8;\n  font-size: 17px;\n}\n.accion-item:active {\n  transform: scale(0.985);\n}\n.accion-item.danger .accion-text h3 {\n  color: #b42318;\n}\n.empleado-info small {\n  display: inline-flex;\n  height: 20px;\n  padding: 0 8px;\n  align-items: center;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.16);\n  color: #ffffff;\n  font-size: 9.5px;\n  font-weight: 900;\n  margin-bottom: 4px;\n}\n.accion-icon.foto {\n  background: #eef4ff;\n  color: #1759e8;\n}\n/*# sourceMappingURL=empleado-acciones-modal.component.css.map */\n"] }]
  }], () => [], { empleado: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmpleadoAccionesModalComponent, { className: "EmpleadoAccionesModalComponent", filePath: "src/app/shared/componentes/empleado-acciones-modal/empleado-acciones-modal.component.ts", lineNumber: 38 });
})();

// src/app/shared/componentes/empleado-password-modal/empleado-password-modal.component.ts
var _EmpleadoPasswordModalComponent = class _EmpleadoPasswordModalComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.modalCtrl = inject(ModalController);
    this.toastCtrl = inject(ToastController);
    this.formulario = this.fb.group({
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  get nombreEmpleado() {
    return this.empleado?.nombreCompleto || "Empleado";
  }
  cancelar() {
    this.modalCtrl.dismiss(null, "cancel");
  }
  guardar() {
    return __async(this, null, function* () {
      this.formulario.markAllAsTouched();
      if (this.formulario.invalid) {
        this.mostrarToast("Ingrese una contrase\xC3\xB1a v\xC3\xA1lida");
        return;
      }
      const password = String(this.formulario.value.password || "").trim();
      const confirmarPassword = String(this.formulario.value.confirmarPassword || "").trim();
      if (password !== confirmarPassword) {
        this.mostrarToast("Las contrase\xC3\xB1as no coinciden");
        return;
      }
      yield this.modalCtrl.dismiss({
        password
      }, "confirm");
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
_EmpleadoPasswordModalComponent.\u0275fac = function EmpleadoPasswordModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EmpleadoPasswordModalComponent)();
};
_EmpleadoPasswordModalComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmpleadoPasswordModalComponent, selectors: [["app-empleado-password-modal"]], inputs: { empleado: "empleado" }, decls: 36, vars: 2, consts: [[1, "password-header"], [1, "title-box"], [1, "icon-box"], ["name", "key-outline"], ["type", "button", "slot", "end", 1, "btn-close", 3, "click"], ["name", "close-outline"], [1, "password-content"], [1, "password-form", 3, "ngSubmit", "formGroup"], [1, "password-card"], [1, "field-group"], ["lines", "none", 1, "input-card"], ["type", "password", "formControlName", "password", "placeholder", "M\xEDnimo 6 caracteres"], ["type", "password", "formControlName", "confirmarPassword", "placeholder", "Repita la contrase\xF1a"], [1, "warning-box"], ["name", "alert-circle-outline"], [1, "modal-actions"], ["type", "button", 1, "btn-cancelar", 3, "click"], ["type", "submit", 1, "btn-guardar"], ["name", "save-outline"]], template: function EmpleadoPasswordModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-header", 0)(1, "ion-toolbar")(2, "div", 1)(3, "div", 2);
    \u0275\u0275element(4, "ion-icon", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "h2");
    \u0275\u0275text(7, "Cambiar contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "button", 4);
    \u0275\u0275listener("click", function EmpleadoPasswordModalComponent_Template_button_click_10_listener() {
      return ctx.cancelar();
    });
    \u0275\u0275element(11, "ion-icon", 5);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "ion-content", 6)(13, "form", 7);
    \u0275\u0275listener("ngSubmit", function EmpleadoPasswordModalComponent_Template_form_ngSubmit_13_listener() {
      return ctx.guardar();
    });
    \u0275\u0275elementStart(14, "section", 8)(15, "div", 9)(16, "label");
    \u0275\u0275text(17, "Nueva contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "ion-item", 10);
    \u0275\u0275element(19, "ion-input", 11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 9)(21, "label");
    \u0275\u0275text(22, "Confirmar contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "ion-item", 10);
    \u0275\u0275element(24, "ion-input", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 13);
    \u0275\u0275element(26, "ion-icon", 14);
    \u0275\u0275elementStart(27, "p");
    \u0275\u0275text(28, " Asigna una contrase\xF1a temporal para que el empleado pueda ingresar nuevamente. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "div", 15)(30, "button", 16);
    \u0275\u0275listener("click", function EmpleadoPasswordModalComponent_Template_button_click_30_listener() {
      return ctx.cancelar();
    });
    \u0275\u0275text(31, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "button", 17);
    \u0275\u0275element(33, "ion-icon", 18);
    \u0275\u0275elementStart(34, "span");
    \u0275\u0275text(35, "Guardar contrase\xF1a");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx.nombreEmpleado);
    \u0275\u0275advance(4);
    \u0275\u0275property("formGroup", ctx.formulario);
  }
}, dependencies: [
  CommonModule,
  IonicModule,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonToolbar,
  TextValueAccessorDirective,
  ReactiveFormsModule,
  \u0275NgNoValidate,
  NgControlStatus,
  NgControlStatusGroup,
  FormGroupDirective,
  FormControlName
], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  background: #f5f7fb;\n}\n.password-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      135deg,\n      #062b6f,\n      #0b3d91);\n  --color: #ffffff;\n  --min-height: 86px;\n  --padding-start: 14px;\n  --padding-end: 12px;\n}\n.title-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.icon-box[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.16);\n  display: grid;\n  place-items: center;\n}\n.icon-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: #ffffff;\n}\n.title-box[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 900;\n  color: #ffffff;\n}\n.title-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 700;\n  color: #ffd166;\n}\n.btn-close[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.13);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n}\n.btn-close[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.password-content[_ngcontent-%COMP%] {\n  --background: #f5f7fb;\n}\n.password-form[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 430px;\n  margin: 0 auto;\n  padding: 14px;\n}\n.password-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e8edf5;\n  border-radius: 16px;\n  padding: 14px;\n  margin-bottom: 12px;\n  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.04);\n}\n.info-box[_ngcontent-%COMP%], \n.warning-box[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  padding: 10px;\n  display: flex;\n  gap: 8px;\n  align-items: flex-start;\n  margin-bottom: 12px;\n}\n.info-box[_ngcontent-%COMP%] {\n  background: #eef4ff;\n  border: 1px solid #d9e6ff;\n}\n.warning-box[_ngcontent-%COMP%] {\n  background: #fff7df;\n  border: 1px solid #fde7a6;\n  margin-bottom: 0;\n}\n.info-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #1759e8;\n  flex-shrink: 0;\n}\n.warning-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #c88600;\n  flex-shrink: 0;\n}\n.info-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.warning-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 11px;\n  line-height: 1.35;\n  font-weight: 700;\n  color: #334155;\n}\n.field-group[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.field-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 11px;\n  font-weight: 900;\n  color: #334155;\n}\n.input-card[_ngcontent-%COMP%] {\n  --background: #f8fafc;\n  --border-radius: 10px;\n  --min-height: 42px;\n  --padding-start: 12px;\n  --inner-padding-end: 10px;\n  border: 1px solid #dfe5ef;\n  border-radius: 10px;\n}\n.input-card[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: #0f172a;\n  --padding-top: 8px;\n  --padding-bottom: 8px;\n}\n.modal-actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.btn-cancelar[_ngcontent-%COMP%], \n.btn-guardar[_ngcontent-%COMP%] {\n  height: 44px;\n  border: none;\n  border-radius: 12px;\n  font-size: 13px;\n  font-weight: 900;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.btn-cancelar[_ngcontent-%COMP%] {\n  background: #ffffff;\n  color: #475569;\n  border: 1px solid #dfe5ef;\n}\n.btn-guardar[_ngcontent-%COMP%] {\n  background: #1759e8;\n  color: #ffffff;\n  box-shadow: 0 8px 18px rgba(23, 89, 232, 0.25);\n}\n.btn-guardar[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n/*# sourceMappingURL=empleado-password-modal.component.css.map */"] });
var EmpleadoPasswordModalComponent = _EmpleadoPasswordModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmpleadoPasswordModalComponent, [{
    type: Component,
    args: [{ selector: "app-empleado-password-modal", standalone: true, imports: [
      CommonModule,
      IonicModule,
      ReactiveFormsModule
    ], template: '<!-- src/app/shared/componentes/empleado-password-modal/empleado-password-modal.component.html -->\n\n<ion-header class="password-header">\n  <ion-toolbar>\n    <div class="title-box">\n      <div class="icon-box">\n        <ion-icon name="key-outline"></ion-icon>\n      </div>\n\n      <div>\n        <h2>Cambiar contrase\xF1a</h2>\n        <p>{{ nombreEmpleado }}</p>\n      </div>\n    </div>\n\n    <button type="button" class="btn-close" slot="end" (click)="cancelar()">\n      <ion-icon name="close-outline"></ion-icon>\n    </button>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="password-content">\n\n  <form [formGroup]="formulario" (ngSubmit)="guardar()" class="password-form">\n\n    <section class="password-card">\n\n    \n\n      <div class="field-group">\n        <label>Nueva contrase\xF1a</label>\n        <ion-item lines="none" class="input-card">\n          <ion-input\n            type="password"\n            formControlName="password"\n            placeholder="M\xEDnimo 6 caracteres"\n          ></ion-input>\n        </ion-item>\n      </div>\n\n      <div class="field-group">\n        <label>Confirmar contrase\xF1a</label>\n        <ion-item lines="none" class="input-card">\n          <ion-input\n            type="password"\n            formControlName="confirmarPassword"\n            placeholder="Repita la contrase\xF1a"\n          ></ion-input>\n        </ion-item>\n      </div>\n\n      <div class="warning-box">\n        <ion-icon name="alert-circle-outline"></ion-icon>\n        <p>\n  Asigna una contrase\xF1a temporal para que el empleado pueda ingresar nuevamente.        </p>\n      </div>\n\n    </section>\n\n    <div class="modal-actions">\n      <button type="button" class="btn-cancelar" (click)="cancelar()">\n        Cancelar\n      </button>\n\n      <button type="submit" class="btn-guardar">\n        <ion-icon name="save-outline"></ion-icon>\n        <span>Guardar contrase\xF1a</span>\n      </button>\n    </div>\n\n  </form>\n\n</ion-content>', styles: ["/* src/app/shared/componentes/empleado-password-modal/empleado-password-modal.component.css */\n:host {\n  display: block;\n  background: #f5f7fb;\n}\n.password-header ion-toolbar {\n  --background:\n    linear-gradient(\n      135deg,\n      #062b6f,\n      #0b3d91);\n  --color: #ffffff;\n  --min-height: 86px;\n  --padding-start: 14px;\n  --padding-end: 12px;\n}\n.title-box {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.icon-box {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.16);\n  display: grid;\n  place-items: center;\n}\n.icon-box ion-icon {\n  font-size: 22px;\n  color: #ffffff;\n}\n.title-box h2 {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 900;\n  color: #ffffff;\n}\n.title-box p {\n  margin: 3px 0 0;\n  font-size: 11px;\n  font-weight: 700;\n  color: #ffd166;\n}\n.btn-close {\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.13);\n  color: #ffffff;\n  display: grid;\n  place-items: center;\n}\n.btn-close ion-icon {\n  font-size: 22px;\n}\n.password-content {\n  --background: #f5f7fb;\n}\n.password-form {\n  width: 100%;\n  max-width: 430px;\n  margin: 0 auto;\n  padding: 14px;\n}\n.password-card {\n  background: #ffffff;\n  border: 1px solid #e8edf5;\n  border-radius: 16px;\n  padding: 14px;\n  margin-bottom: 12px;\n  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.04);\n}\n.info-box,\n.warning-box {\n  border-radius: 12px;\n  padding: 10px;\n  display: flex;\n  gap: 8px;\n  align-items: flex-start;\n  margin-bottom: 12px;\n}\n.info-box {\n  background: #eef4ff;\n  border: 1px solid #d9e6ff;\n}\n.warning-box {\n  background: #fff7df;\n  border: 1px solid #fde7a6;\n  margin-bottom: 0;\n}\n.info-box ion-icon {\n  font-size: 18px;\n  color: #1759e8;\n  flex-shrink: 0;\n}\n.warning-box ion-icon {\n  font-size: 18px;\n  color: #c88600;\n  flex-shrink: 0;\n}\n.info-box p,\n.warning-box p {\n  margin: 0;\n  font-size: 11px;\n  line-height: 1.35;\n  font-weight: 700;\n  color: #334155;\n}\n.field-group {\n  margin-bottom: 12px;\n}\n.field-group label {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 11px;\n  font-weight: 900;\n  color: #334155;\n}\n.input-card {\n  --background: #f8fafc;\n  --border-radius: 10px;\n  --min-height: 42px;\n  --padding-start: 12px;\n  --inner-padding-end: 10px;\n  border: 1px solid #dfe5ef;\n  border-radius: 10px;\n}\n.input-card ion-input {\n  font-size: 13px;\n  font-weight: 700;\n  color: #0f172a;\n  --padding-top: 8px;\n  --padding-bottom: 8px;\n}\n.modal-actions {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.btn-cancelar,\n.btn-guardar {\n  height: 44px;\n  border: none;\n  border-radius: 12px;\n  font-size: 13px;\n  font-weight: 900;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.btn-cancelar {\n  background: #ffffff;\n  color: #475569;\n  border: 1px solid #dfe5ef;\n}\n.btn-guardar {\n  background: #1759e8;\n  color: #ffffff;\n  box-shadow: 0 8px 18px rgba(23, 89, 232, 0.25);\n}\n.btn-guardar ion-icon {\n  font-size: 17px;\n}\n/*# sourceMappingURL=empleado-password-modal.component.css.map */\n"] }]
  }], null, { empleado: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmpleadoPasswordModalComponent, { className: "EmpleadoPasswordModalComponent", filePath: "src/app/shared/componentes/empleado-password-modal/empleado-password-modal.component.ts", lineNumber: 29 });
})();

// src/app/paginas/administrador/empleados/empleados.page.ts
function EmpleadosPage_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "app-admin-header", 4);
    \u0275\u0275listener("menuClick", function EmpleadosPage_ng_container_1_Template_app_admin_header_menuClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirMenu());
    })("notificacionesClick", function EmpleadosPage_ng_container_1_Template_app_admin_header_notificacionesClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirNotificaciones());
    })("perfilClick", function EmpleadosPage_ng_container_1_Template_app_admin_header_perfilClick_1_listener() {
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
function EmpleadosPage_ng_container_3_div_17_app_empleado_card_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-empleado-card", 19);
    \u0275\u0275listener("acciones", function EmpleadosPage_ng_container_3_div_17_app_empleado_card_1_Template_app_empleado_card_acciones_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.abrirAcciones($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const empleado_r6 = ctx.$implicit;
    \u0275\u0275property("empleado", empleado_r6);
  }
}
function EmpleadosPage_ng_container_3_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275template(1, EmpleadosPage_ng_container_3_div_17_app_empleado_card_1_Template, 1, 1, "app-empleado-card", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vm_r7 = \u0275\u0275nextContext().ngIf;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", vm_r7.empleadosPagina)("ngForTrackBy", ctx_r1.trackByEmpleado);
  }
}
function EmpleadosPage_ng_container_3_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-admin-empty-state", 20);
    \u0275\u0275listener("botonClick", function EmpleadosPage_ng_container_3_ng_template_18_Template_app_admin_empty_state_botonClick_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.nuevoUsuario());
    });
    \u0275\u0275elementEnd();
  }
}
function EmpleadosPage_ng_container_3_app_admin_pagination_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-admin-pagination", 21);
    \u0275\u0275listener("anterior", function EmpleadosPage_ng_container_3_app_admin_pagination_20_Template_app_admin_pagination_anterior_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.paginaAnterior());
    })("siguiente", function EmpleadosPage_ng_container_3_app_admin_pagination_20_Template_app_admin_pagination_siguiente_0_listener() {
      \u0275\u0275restoreView(_r9);
      const vm_r7 = \u0275\u0275nextContext().ngIf;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.paginaSiguiente(vm_r7.totalPaginas));
    })("irPagina", function EmpleadosPage_ng_container_3_app_admin_pagination_20_Template_app_admin_pagination_irPagina_0_listener($event) {
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
function EmpleadosPage_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 5)(2, "app-admin-module-hero", 6);
    \u0275\u0275listener("botonClick", function EmpleadosPage_ng_container_3_Template_app_admin_module_hero_botonClick_2_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nuevoUsuario());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "section", 7);
    \u0275\u0275element(4, "app-admin-summary-card", 8)(5, "app-admin-summary-card", 9)(6, "app-admin-summary-card", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "app-admin-search-filter", 11);
    \u0275\u0275listener("buscar", function EmpleadosPage_ng_container_3_Template_app_admin_search_filter_buscar_7_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.buscarEmpleado($event));
    })("filtrar", function EmpleadosPage_ng_container_3_Template_app_admin_search_filter_filtrar_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirFiltro());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "section", 12)(9, "div")(10, "h3");
    \u0275\u0275text(11, "Lista de empleados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "span", 13);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "section", 14);
    \u0275\u0275template(17, EmpleadosPage_ng_container_3_div_17_Template, 2, 2, "div", 15)(18, EmpleadosPage_ng_container_3_ng_template_18_Template, 1, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, EmpleadosPage_ng_container_3_app_admin_pagination_20_Template, 1, 3, "app-admin-pagination", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const vm_r7 = ctx.ngIf;
    const sinResultados_r10 = \u0275\u0275reference(19);
    \u0275\u0275advance(4);
    \u0275\u0275property("valor", vm_r7.totalEmpleados);
    \u0275\u0275advance();
    \u0275\u0275property("valor", vm_r7.totalHabilitados);
    \u0275\u0275advance();
    \u0275\u0275property("valor", vm_r7.totalDeshabilitados);
    \u0275\u0275advance();
    \u0275\u0275property("filtroActual", vm_r7.filtro);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", vm_r7.empleadosFiltrados.length, " registro(s) encontrado(s)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" P\xE1g. ", vm_r7.paginaActual, " / ", vm_r7.totalPaginas, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", vm_r7.empleadosPagina.length > 0)("ngIfElse", sinResultados_r10);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", vm_r7.totalPaginas > 1);
  }
}
var _EmpleadosPage = class _EmpleadosPage {
  constructor() {
    this.empleadoService = inject(EmpleadoService);
    this.dashboardAdminService = inject(DashboardAdminService);
    this.modalCtrl = inject(ModalController);
    this.toastCtrl = inject(ToastController);
    this.alertCtrl = inject(AlertController);
    this.navCtrl = inject(NavController);
    this.cdr = inject(ChangeDetectorRef);
    this.vm$ = this.empleadoService.vm$;
    this.adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
  }
  ionViewWillEnter() {
    return __async(this, null, function* () {
      yield this.empleadoService.cargarEmpleados();
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 100);
    });
  }
  ionViewDidEnter() {
    return __async(this, null, function* () {
      yield this.empleadoService.cargarEmpleados();
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 150);
    });
  }
  trackByEmpleado(index, empleado) {
    return empleado.uid || empleado.id || String(index);
  }
  buscarEmpleado(valor) {
    const termino = typeof valor === "string" ? valor : valor?.detail?.value ?? "";
    this.empleadoService.cambiarBusqueda(termino);
  }
  abrirFiltro() {
    return __async(this, null, function* () {
      const filtroActual = this.empleadoService.obtenerFiltroActual();
      const alert = yield this.alertCtrl.create({
        header: "Filtrar empleados",
        inputs: [
          {
            type: "radio",
            label: "Todos",
            value: "todos",
            checked: filtroActual === "todos"
          },
          {
            type: "radio",
            label: "Activos",
            value: "habilitados",
            checked: filtroActual === "habilitados"
          },
          {
            type: "radio",
            label: "Inactivos",
            value: "deshabilitados",
            checked: filtroActual === "deshabilitados"
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
              this.empleadoService.cambiarFiltro(filtro);
            }
          }
        ]
      });
      yield alert.present();
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
  nuevoUsuario() {
    return __async(this, null, function* () {
      const modal = yield this.modalCtrl.create({
        component: EmpleadoFormModalComponent,
        cssClass: "empleado-modal",
        backdropDismiss: false,
        componentProps: {
          modo: "crear"
        }
      });
      yield modal.present();
      const { data, role } = yield modal.onWillDismiss();
      if (role === "confirm" && data) {
        yield this.guardarNuevoUsuario(data);
      }
    });
  }
  guardarNuevoUsuario(data) {
    return __async(this, null, function* () {
      const payload = {
        nombres: String(data.nombres || "").trim(),
        apellidos: String(data.apellidos || "").trim(),
        dni: String(data.dni || "").trim(),
        telefono: String(data.telefono || "").trim(),
        cargo: String(data.cargo || "").trim() || "Personal operativo",
        usuario: this.empleadoService.normalizarUsuario(data.usuario || ""),
        password: String(data.password || "").trim(),
        fotoUrl: String(data.fotoUrl || "").trim(),
        fotoArchivo: data.fotoArchivo || null
      };
      if (!this.validarNuevoEmpleado(payload)) {
        return;
      }
      try {
        yield this.empleadoService.crearEmpleado(payload);
        yield this.empleadoService.cargarEmpleados();
        yield this.mostrarToast("Empleado creado correctamente", "success");
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 100);
      } catch (error) {
        console.error("[EmpleadosPage] Error creando empleado:", error);
        yield this.mostrarToast(this.obtenerMensajeError(error), "danger");
      }
    });
  }
  validarNuevoEmpleado(data) {
    if (!data.nombres) {
      this.mostrarToast("Ingrese los nombres", "danger");
      return false;
    }
    if (!data.apellidos) {
      this.mostrarToast("Ingrese los apellidos", "danger");
      return false;
    }
    if (!data.dni || data.dni.length < 8) {
      this.mostrarToast("Ingrese un DNI v\xE1lido", "danger");
      return false;
    }
    if (!data.telefono || data.telefono.length < 9) {
      this.mostrarToast("Ingrese un tel\xE9fono v\xE1lido", "danger");
      return false;
    }
    if (!data.usuario) {
      this.mostrarToast("Ingrese un usuario", "danger");
      return false;
    }
    if (data.usuario.length < 4) {
      this.mostrarToast("El usuario debe tener m\xEDnimo 4 caracteres", "danger");
      return false;
    }
    if (!data.password || data.password.length < 6) {
      this.mostrarToast("La contrase\xF1a debe tener m\xEDnimo 6 caracteres", "danger");
      return false;
    }
    return true;
  }
  abrirAcciones(empleado) {
    return __async(this, null, function* () {
      const modal = yield this.modalCtrl.create({
        component: EmpleadoAccionesModalComponent,
        cssClass: "empleado-actions-modal",
        backdropDismiss: true,
        componentProps: {
          empleado
        }
      });
      yield modal.present();
      const { data, role } = yield modal.onWillDismiss();
      if (role !== "confirm" || !data?.accion) {
        return;
      }
      if (data.accion === "editar" || data.accion === "foto") {
        yield this.editarEmpleado(empleado);
        return;
      }
      if (data.accion === "password") {
        yield this.abrirCambioPassword(empleado);
        return;
      }
      if (data.accion === "estado") {
        yield this.confirmarCambioEstado(empleado);
        return;
      }
      if (data.accion === "eliminar") {
        yield this.confirmarEliminarEmpleado(empleado);
      }
    });
  }
  editarEmpleado(empleado) {
    return __async(this, null, function* () {
      const modal = yield this.modalCtrl.create({
        component: EmpleadoFormModalComponent,
        cssClass: "empleado-modal",
        backdropDismiss: false,
        componentProps: {
          modo: "editar",
          empleado
        }
      });
      yield modal.present();
      const { data, role } = yield modal.onWillDismiss();
      if (role === "confirm" && data) {
        yield this.guardarEdicionEmpleado(empleado, data);
      }
    });
  }
  abrirCambioPassword(empleado) {
    return __async(this, null, function* () {
      const modal = yield this.modalCtrl.create({
        component: EmpleadoPasswordModalComponent,
        cssClass: "empleado-password-modal",
        backdropDismiss: false,
        componentProps: {
          empleado
        }
      });
      yield modal.present();
      const { data, role } = yield modal.onWillDismiss();
      if (role !== "confirm" || !data?.password) {
        return;
      }
      yield this.mostrarToast("Contrase\xF1a registrada correctamente", "success");
    });
  }
  guardarEdicionEmpleado(empleado, data) {
    return __async(this, null, function* () {
      if (!empleado.uid) {
        yield this.mostrarToast("El empleado no tiene UID v\xE1lido", "danger");
        return;
      }
      const payload = {
        uid: empleado.uid,
        nombres: String(data.nombres || "").trim(),
        apellidos: String(data.apellidos || "").trim(),
        usuario: this.empleadoService.normalizarUsuario(data.usuario || ""),
        dni: String(data.dni || "").trim(),
        telefono: String(data.telefono || "").trim(),
        cargo: String(data.cargo || "").trim() || "Personal operativo",
        fotoUrl: String(data.fotoUrl ?? empleado.fotoUrl ?? "").trim(),
        fotoArchivo: data.fotoArchivo || null
      };
      if (!this.validarEdicionEmpleado(payload)) {
        return;
      }
      try {
        yield this.empleadoService.editarEmpleado(payload);
        yield this.empleadoService.cargarEmpleados();
        yield this.mostrarToast("Registro actualizado correctamente", "success");
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 100);
      } catch (error) {
        console.error("[EmpleadosPage] Error editando empleado:", error);
        yield this.mostrarToast(this.obtenerMensajeError(error), "danger");
      }
    });
  }
  validarEdicionEmpleado(data) {
    if (!data.nombres) {
      this.mostrarToast("Ingrese los nombres", "danger");
      return false;
    }
    if (!data.apellidos) {
      this.mostrarToast("Ingrese los apellidos", "danger");
      return false;
    }
    if (!data.usuario) {
      this.mostrarToast("Ingrese el usuario", "danger");
      return false;
    }
    if (data.usuario.length < 4) {
      this.mostrarToast("El usuario debe tener m\xEDnimo 4 caracteres", "danger");
      return false;
    }
    if (!data.dni || data.dni.length < 8) {
      this.mostrarToast("Ingrese un DNI v\xE1lido", "danger");
      return false;
    }
    if (!data.telefono || data.telefono.length < 9) {
      this.mostrarToast("Ingrese un tel\xE9fono v\xE1lido", "danger");
      return false;
    }
    return true;
  }
  confirmarCambioEstado(empleado) {
    return __async(this, null, function* () {
      const nuevoEstado = !empleado.habilitado;
      const confirmado = yield this.abrirConfirmacion({
        tipo: nuevoEstado ? "success" : "warning",
        icono: nuevoEstado ? "checkmark-circle-outline" : "close-circle-outline",
        titulo: nuevoEstado ? "Habilitar usuario" : "Deshabilitar usuario",
        mensaje: nuevoEstado ? `\xBFDeseas habilitar el acceso de ${empleado.nombreCompleto || "este empleado"}?` : `\xBFDeseas deshabilitar el acceso de ${empleado.nombreCompleto || "este empleado"}?`,
        detalle: nuevoEstado ? "El empleado podr\xE1 ingresar nuevamente a la aplicaci\xF3n." : "El empleado no podr\xE1 ingresar ni operar dentro de la aplicaci\xF3n.",
        textoCancelar: "Cancelar",
        textoConfirmar: nuevoEstado ? "Habilitar" : "Deshabilitar"
      });
      if (!confirmado) {
        return;
      }
      yield this.cambiarEstado(empleado, nuevoEstado);
    });
  }
  cambiarEstado(empleado, habilitado) {
    return __async(this, null, function* () {
      if (!empleado.uid) {
        yield this.mostrarToast("El empleado no tiene UID v\xE1lido", "danger");
        return;
      }
      try {
        yield this.empleadoService.cambiarEstadoEmpleado(empleado.uid, habilitado);
        yield this.empleadoService.cargarEmpleados();
        yield this.mostrarToast(habilitado ? "Usuario habilitado correctamente" : "Usuario deshabilitado correctamente", "success");
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 100);
      } catch (error) {
        console.error("[EmpleadosPage] Error cambiando estado:", error);
        yield this.mostrarToast(this.obtenerMensajeError(error), "danger");
      }
    });
  }
  confirmarEliminarEmpleado(empleado) {
    return __async(this, null, function* () {
      const confirmado = yield this.abrirConfirmacion({
        tipo: "danger",
        icono: "trash-outline",
        titulo: "Eliminar empleado",
        mensaje: `\xBFDeseas eliminar el registro de ${empleado.nombreCompleto || "este empleado"}?`,
        detalle: "Esta acci\xF3n ocultar\xE1 al empleado del m\xF3dulo y bloquear\xE1 su acceso operativo.",
        textoCancelar: "Cancelar",
        textoConfirmar: "Eliminar"
      });
      if (!confirmado) {
        return;
      }
      yield this.eliminarEmpleado(empleado);
    });
  }
  eliminarEmpleado(empleado) {
    return __async(this, null, function* () {
      if (!empleado.uid) {
        yield this.mostrarToast("El empleado no tiene UID v\xE1lido", "danger");
        return;
      }
      try {
        yield this.empleadoService.eliminarEmpleado(empleado.uid, empleado.nombreCompleto || "Empleado");
        yield this.empleadoService.cargarEmpleados();
        yield this.mostrarToast("Registro eliminado correctamente", "success");
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 100);
      } catch (error) {
        console.error("[EmpleadosPage] Error eliminando empleado:", error);
        yield this.mostrarToast(this.obtenerMensajeError(error), "danger");
      }
    });
  }
  paginaAnterior() {
    this.empleadoService.paginaAnterior();
  }
  paginaSiguiente(totalPaginas) {
    this.empleadoService.paginaSiguiente(totalPaginas);
  }
  irPagina(pagina) {
    this.empleadoService.irPagina(pagina);
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
    const code = String(error?.code || error?.message || "");
    if (code.includes("uid-empleado-vacio")) {
      return "No se encontr\xF3 el UID del empleado";
    }
    if (code.includes("archivo-vacio")) {
      return "No se seleccion\xF3 ninguna imagen";
    }
    if (code.includes("storage/unauthorized")) {
      return "No tiene permisos para subir im\xE1genes";
    }
    if (code.includes("storage/canceled")) {
      return "La subida de imagen fue cancelada";
    }
    if (code.includes("usuario-vacio")) {
      return "Ingrese un usuario v\xE1lido";
    }
    if (code.includes("usuario-duplicado")) {
      return "Ese usuario ya est\xE1 registrado";
    }
    if (code.includes("dni-duplicado")) {
      return "Ese DNI ya est\xE1 registrado";
    }
    if (code.includes("auth/email-already-in-use")) {
      return "Ese usuario ya tiene una cuenta de acceso";
    }
    if (code.includes("auth/weak-password")) {
      return "La contrase\xF1a es muy d\xE9bil";
    }
    if (code.includes("auth/invalid-email")) {
      return "El usuario generado no es v\xE1lido";
    }
    if (code.includes("permission-denied")) {
      return "No tiene permisos para realizar esta acci\xF3n";
    }
    if (code.includes("firebase-config-no-encontrado")) {
      return "No se encontr\xF3 la configuraci\xF3n de Firebase";
    }
    if (code.includes("missing-or-insufficient-permissions")) {
      return "Permisos insuficientes en Firebase";
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
_EmpleadosPage.\u0275fac = function EmpleadosPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EmpleadosPage)();
};
_EmpleadosPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmpleadosPage, selectors: [["app-empleados"]], decls: 6, vars: 7, consts: [["sinResultados", ""], [1, "empleados-root", 3, "fullscreen"], [4, "ngIf"], ["activo", "mas"], [3, "menuClick", "notificacionesClick", "perfilClick", "nombre", "rol", "fotoUrl", "notificaciones"], [1, "empleados-container"], ["titulo", "Registro de empleados", "descripcion", "Gestiona accesos, estados y datos del personal operativo.", "icono", "people-outline", "botonTexto", "Nuevo", "botonIcono", "add-outline", 3, "botonClick"], [1, "summary-grid"], ["titulo", "Total", "icono", "people-outline", "tipo", "total", 3, "valor"], ["titulo", "Activos", "icono", "checkmark-circle-outline", "tipo", "success", 3, "valor"], ["titulo", "Inactivos", "icono", "close-circle-outline", "tipo", "danger", 3, "valor"], ["placeholder", "Buscar empleados...", 3, "buscar", "filtrar", "filtroActual"], [1, "list-title-row"], [1, "page-indicator"], [1, "list-section"], ["class", "empleados-list", 4, "ngIf", "ngIfElse"], [3, "paginaActual", "totalPaginas", "paginas", "anterior", "siguiente", "irPagina", 4, "ngIf"], [1, "empleados-list"], [3, "empleado", "acciones", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "acciones", "empleado"], ["icono", "people-outline", "titulo", "No hay empleados para mostrar", "descripcion", "No se encontraron registros con el criterio actual.", "botonTexto", "Registrar empleado", "botonIcono", "add-outline", 3, "botonClick"], [3, "anterior", "siguiente", "irPagina", "paginaActual", "totalPaginas", "paginas"]], template: function EmpleadosPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 1);
    \u0275\u0275template(1, EmpleadosPage_ng_container_1_Template, 2, 4, "ng-container", 2);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275template(3, EmpleadosPage_ng_container_3_Template, 21, 10, "ng-container", 2);
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
  EmpleadoCardComponent,
  AdminEmptyStateComponent,
  AdminPaginationComponent,
  AsyncPipe
], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\nion-content.empleados-root[_ngcontent-%COMP%] {\n  --background: var(--color-page-outside);\n}\n.empleados-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: var(--app-width);\n  min-height: calc(100vh - 76px);\n  margin: 0 auto;\n  padding: 14px 14px 94px;\n  background: var(--color-background);\n}\n.summary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 9px;\n  margin-bottom: 12px;\n}\n.list-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin: 4px 0 10px;\n}\n.list-title-row[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.list-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.page-indicator[_ngcontent-%COMP%] {\n  height: 26px;\n  padding: 0 9px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 10px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.list-section[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  padding: 0;\n  min-height: 330px;\n}\n.empleados-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n@media (max-width: 360px) {\n  .summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=empleados.page.css.map */"] });
var EmpleadosPage = _EmpleadosPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmpleadosPage, [{
    type: Component,
    args: [{ selector: "app-empleados", standalone: true, imports: [
      CommonModule,
      IonicModule,
      AdminHeaderComponent,
      AdminBottomNavComponent,
      AdminModuleHeroComponent,
      AdminSummaryCardComponent,
      AdminSearchFilterComponent,
      EmpleadoCardComponent,
      AdminEmptyStateComponent,
      AdminPaginationComponent
    ], template: `<!-- src/app/paginas/administrador/empleados/empleados.page.html -->
<ion-content [fullscreen]="true" class="empleados-root">

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

    <div class="empleados-container">

      <app-admin-module-hero
        titulo="Registro de empleados"
        descripcion="Gestiona accesos, estados y datos del personal operativo."
        icono="people-outline"
        botonTexto="Nuevo"
        botonIcono="add-outline"
        (botonClick)="nuevoUsuario()"
      ></app-admin-module-hero>

      <section class="summary-grid">
        <app-admin-summary-card
          titulo="Total"
          [valor]="vm.totalEmpleados"
          icono="people-outline"
          tipo="total"
        ></app-admin-summary-card>

        <app-admin-summary-card
          titulo="Activos"
          [valor]="vm.totalHabilitados"
          icono="checkmark-circle-outline"
          tipo="success"
        ></app-admin-summary-card>

        <app-admin-summary-card
          titulo="Inactivos"
          [valor]="vm.totalDeshabilitados"
          icono="close-circle-outline"
          tipo="danger"
        ></app-admin-summary-card>
      </section>

      <app-admin-search-filter
        placeholder="Buscar empleados..."
        [filtroActual]="vm.filtro"
        (buscar)="buscarEmpleado($event)"
        (filtrar)="abrirFiltro()"
      ></app-admin-search-filter>

      <section class="list-title-row">
        <div>
          <h3>Lista de empleados</h3>
          <p>{{ vm.empleadosFiltrados.length }} registro(s) encontrado(s)</p>
        </div>

        <span class="page-indicator">
          P\xE1g. {{ vm.paginaActual }} / {{ vm.totalPaginas }}
        </span>
      </section>

      <section class="list-section">

        <div
          class="empleados-list"
          *ngIf="vm.empleadosPagina.length > 0; else sinResultados"
        >
          <app-empleado-card
            *ngFor="let empleado of vm.empleadosPagina; trackBy: trackByEmpleado"
            [empleado]="empleado"
            (acciones)="abrirAcciones($event)"
          ></app-empleado-card>
        </div>

        <ng-template #sinResultados>
          <app-admin-empty-state
            icono="people-outline"
            titulo="No hay empleados para mostrar"
            descripcion="No se encontraron registros con el criterio actual."
            botonTexto="Registrar empleado"
            botonIcono="add-outline"
            (botonClick)="nuevoUsuario()"
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

  <app-admin-bottom-nav activo="mas"></app-admin-bottom-nav>

</ion-content>`, styles: ["/* src/app/paginas/administrador/empleados/empleados.page.css */\n:host {\n  display: block;\n}\nion-content.empleados-root {\n  --background: var(--color-page-outside);\n}\n.empleados-container {\n  width: 100%;\n  max-width: var(--app-width);\n  min-height: calc(100vh - 76px);\n  margin: 0 auto;\n  padding: 14px 14px 94px;\n  background: var(--color-background);\n}\n.summary-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 9px;\n  margin-bottom: 12px;\n}\n.list-title-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin: 4px 0 10px;\n}\n.list-title-row h3 {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--color-text);\n}\n.list-title-row p {\n  margin: 3px 0 0;\n  font-size: 10.5px;\n  font-weight: 500;\n  color: var(--color-text-muted);\n}\n.page-indicator {\n  height: 26px;\n  padding: 0 9px;\n  border-radius: 999px;\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 10px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.list-section {\n  background: transparent;\n  border: none;\n  padding: 0;\n  min-height: 330px;\n}\n.empleados-list {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n@media (max-width: 360px) {\n  .summary-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=empleados.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmpleadosPage, { className: "EmpleadosPage", filePath: "src/app/paginas/administrador/empleados/empleados.page.ts", lineNumber: 54 });
})();
export {
  EmpleadosPage
};
//# sourceMappingURL=empleados.page-5MZ2URJ4.js.map
