import {
  AuthService
} from "./chunk-MMUBDVMD.js";
import {
  BooleanValueAccessorDirective,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonicModule,
  LoadingController,
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
  briefcaseOutline,
  eyeOffOutline,
  eyeOutline,
  lockClosedOutline,
  personOutline
} from "./chunk-XEVVVGO7.js";
import "./chunk-NMRAWXHA.js";
import {
  CommonModule,
  Component,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NavController,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Router,
  Validators,
  inject,
  setClassMetadata,
  ɵNgNoValidate,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate1
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
  __async
} from "./chunk-Q3N56TRI.js";

// src/app/paginas/auth/login-empleado/login-empleado.page.ts
var _LoginEmpleadoPage = class _LoginEmpleadoPage {
  constructor() {
    this.fb = inject(FormBuilder);
    this.authService = inject(AuthService);
    this.navCtrl = inject(NavController);
    this.router = inject(Router);
    this.toastCtrl = inject(ToastController);
    this.loadingCtrl = inject(LoadingController);
    this.mostrarPassword = false;
    this.cargando = false;
    this.arrowBackIcon = arrowBackOutline;
    this.briefcaseIcon = briefcaseOutline;
    this.personIcon = personOutline;
    this.lockIcon = lockClosedOutline;
    this.eyeIcon = eyeOutline;
    this.eyeOffIcon = eyeOffOutline;
    this.formulario = this.fb.group({
      usuario: ["", Validators.required],
      password: ["", Validators.required],
      recordarme: [false]
    });
    addIcons({
      "arrow-back-outline": arrowBackOutline,
      "briefcase-outline": briefcaseOutline,
      "eye-outline": eyeOutline,
      "eye-off-outline": eyeOffOutline,
      "lock-closed-outline": lockClosedOutline,
      "person-outline": personOutline
    });
  }
  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }
  ingresar() {
    return __async(this, null, function* () {
      if (this.formulario.invalid) {
        this.formulario.markAllAsTouched();
        yield this.mostrarToast("Complete usuario y contrase\xF1a.", "danger");
        return;
      }
      const usuarioIngresado = String(this.formulario.value.usuario || "").trim().toLowerCase();
      const password = String(this.formulario.value.password || "");
      const loading = yield this.loadingCtrl.create({
        message: "Validando empleado...",
        spinner: "crescent"
      });
      try {
        this.cargando = true;
        yield loading.present();
        const credencial = yield this.loginEmpleadoSeguro(usuarioIngresado, password);
        const uid = credencial?.user?.uid || "";
        if (!uid) {
          throw new Error("uid-auth-vacio");
        }
        const rol = yield this.authService.obtenerRol(uid);
        if (rol !== "empleado") {
          throw new Error("usuario-no-empleado");
        }
        yield loading.dismiss().catch(() => {
        });
        this.cargando = false;
        yield this.irPanelEmpleado();
      } catch (error) {
        console.error("[LoginEmpleadoPage] Error real:", error);
        yield loading.dismiss().catch(() => {
        });
        this.cargando = false;
        yield this.mostrarToast(this.obtenerMensajeError(error), "danger");
      }
    });
  }
  volver() {
    this.navCtrl.navigateRoot("/seleccion-usuario", {
      animated: false,
      replaceUrl: true
    });
  }
  recuperarContrasena() {
    this.navCtrl.navigateForward("/recuperar", {
      animated: false
    });
  }
  loginEmpleadoSeguro(usuarioIngresado, password) {
    return __async(this, null, function* () {
      const correoDirecto = this.resolverCorreoAuth(usuarioIngresado);
      try {
        return yield this.authService.login(correoDirecto, password);
      } catch (errorDirecto) {
        console.warn("[LoginEmpleadoPage] Fall\xF3 login directo. Intentando Firestore como respaldo:", errorDirecto);
      }
      const usuarioData = yield this.buscarUsuarioSinRomper(usuarioIngresado);
      if (!usuarioData) {
        throw new Error("auth/invalid-credential");
      }
      const correos = [
        usuarioData.correoAuth,
        usuarioData.correo,
        usuarioData.usuario ? `${usuarioData.usuario}@comproy.local` : ""
      ].map((correo) => String(correo || "").trim().toLowerCase()).filter((correo) => correo.length > 0).filter((correo, index, lista) => lista.indexOf(correo) === index);
      let ultimoError = null;
      for (const correo of correos) {
        try {
          return yield this.authService.login(correo, password);
        } catch (error) {
          ultimoError = error;
        }
      }
      throw ultimoError || new Error("login-fallido");
    });
  }
  resolverCorreoAuth(usuarioIngresado) {
    const valor = String(usuarioIngresado || "").trim().toLowerCase();
    if (valor.includes("@")) {
      return valor;
    }
    return `${valor}@comproy.local`;
  }
  buscarUsuarioSinRomper(usuarioIngresado) {
    return __async(this, null, function* () {
      try {
        return yield this.authService.obtenerUsuarioPorCorreoOUsuario(usuarioIngresado);
      } catch (error) {
        console.warn("[LoginEmpleadoPage] Firestore no permiti\xF3 buscar usuario antes del login:", error);
        return null;
      }
    });
  }
  loginConCorreosDisponibles(usuarioData, password) {
    return __async(this, null, function* () {
      const usuario = String(usuarioData.usuario || "").trim().toLowerCase();
      const correos = [
        usuarioData.correoAuth,
        usuarioData.correo,
        usuario ? `${usuario}@comproy.local` : ""
      ].map((correo) => String(correo || "").trim().toLowerCase()).filter((correo) => correo.length > 0).filter((correo, index, lista) => lista.indexOf(correo) === index);
      if (correos.length === 0) {
        throw new Error("correo-auth-vacio");
      }
      let ultimoError = null;
      for (const correo of correos) {
        if (!this.esCorreoValido(correo)) {
          ultimoError = new Error(`correo-auth-invalido:${correo}`);
          continue;
        }
        try {
          console.log("[LoginEmpleadoPage] Intentando login con:", correo);
          yield this.authService.login(correo, password);
          console.log("[LoginEmpleadoPage] Login correcto con:", correo);
          return;
        } catch (error) {
          console.error("[LoginEmpleadoPage] Fall\xF3 login con:", correo, error);
          ultimoError = error;
        }
      }
      throw ultimoError || new Error("login-fallido");
    });
  }
  irPanelEmpleado() {
    return __async(this, null, function* () {
      try {
        console.log("[LoginEmpleadoPage] Redirigiendo a dashboard-empleado...");
        yield this.navCtrl.navigateRoot("/dashboard-empleado", {
          animated: false,
          replaceUrl: true
        });
      } catch (error) {
        console.error("[LoginEmpleadoPage] Fall\xF3 NavController. Usando Router:", error);
        try {
          yield this.router.navigateByUrl("/dashboard-empleado", {
            replaceUrl: true
          });
        } catch (routerError) {
          console.error("[LoginEmpleadoPage] Fall\xF3 Router. Forzando ubicaci\xF3n:", routerError);
          window.location.href = "/dashboard-empleado";
        }
      }
    });
  }
  usuarioBloqueado(usuario) {
    return usuario.habilitado === false || usuario.activo === false || usuario.estado === false || usuario.eliminado === true;
  }
  esCorreoValido(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  }
  obtenerMensajeError(error) {
    const code = String(error?.code || error?.message || error || "");
    console.error("[ERROR LOGIN EMPLEADO DETALLE]", {
      code: error?.code,
      message: error?.message,
      error
    });
    if (code.includes("auth/wrong-password") || code.includes("auth/invalid-credential") || code.includes("auth/invalid-login-credentials")) {
      return "Usuario o contrase\xF1a incorrectos.";
    }
    if (code.includes("auth/user-not-found")) {
      return "Usuario no registrado en Firebase Authentication.";
    }
    if (code.includes("auth/invalid-email")) {
      return "El correo de autenticaci\xF3n registrado no es v\xE1lido.";
    }
    if (code.includes("auth/too-many-requests")) {
      return "Demasiados intentos. Intente nuevamente m\xE1s tarde.";
    }
    if (code.includes("auth/network-request-failed")) {
      return "Revise su conexi\xF3n a internet.";
    }
    if (code.includes("permission-denied")) {
      return "No tiene permisos para consultar usuarios en Firestore.";
    }
    if (code.includes("correo-auth-vacio")) {
      return "El usuario no tiene correo de autenticaci\xF3n configurado.";
    }
    if (code.includes("correo-auth-invalido")) {
      return "El correo de autenticaci\xF3n del usuario no es v\xE1lido.";
    }
    if (code.includes("password-vacio")) {
      return "Ingrese su contrase\xF1a.";
    }
    if (code.includes("login-fallido")) {
      return "No se pudo validar el acceso con los correos registrados.";
    }
    return `No se pudo iniciar sesi\xF3n. Detalle: ${code || "error desconocido"}`;
  }
  mostrarToast(message, color) {
    return __async(this, null, function* () {
      try {
        const toast = yield this.toastCtrl.create({
          message,
          duration: 3e3,
          color,
          position: "top"
        });
        yield toast.present();
      } catch (error) {
        alert(message);
      }
    });
  }
};
_LoginEmpleadoPage.\u0275fac = function LoginEmpleadoPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LoginEmpleadoPage)();
};
_LoginEmpleadoPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginEmpleadoPage, selectors: [["app-login-empleado"]], decls: 44, vars: 19, consts: [[1, "login-rol-root", 3, "fullscreen"], [1, "login-wrapper"], ["type", "button", 1, "btn-volver", 3, "click", "disabled"], [3, "icon"], [1, "login-header"], ["src", "assets/img/logo.png", "alt", "Logo Comproy", 1, "logo-img"], [1, "empresa-nombre"], [1, "empresa-subtitulo"], [1, "login-card"], [1, "rol-icon", "empleado"], [3, "ngSubmit", "formGroup"], [1, "campo-bloque"], [1, "campo-caja"], ["type", "text", "formControlName", "usuario", "placeholder", "Ingrese su usuario", "autocomplete", "username", "autocapitalize", "none", "spellcheck", "false", 3, "disabled"], ["formControlName", "password", "placeholder", "Ingrese su contrase\xF1a", "autocomplete", "current-password", 3, "type", "disabled"], ["type", "button", 1, "btn-ojo", 3, "click", "disabled"], [1, "login-opciones"], [1, "recordarme-label"], ["formControlName", "recordarme"], ["type", "button", 1, "btn-link", 3, "click", "disabled"], ["type", "button", 1, "btn-ingresar", "empleado", 3, "click", "disabled"]], template: function LoginEmpleadoPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "main", 1)(2, "button", 2);
    \u0275\u0275listener("click", function LoginEmpleadoPage_Template_button_click_2_listener() {
      return ctx.volver();
    });
    \u0275\u0275element(3, "ion-icon", 3);
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Volver");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "section", 4);
    \u0275\u0275element(7, "img", 5);
    \u0275\u0275elementStart(8, "div")(9, "span", 6);
    \u0275\u0275text(10, "COMPROY S.A.C.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 7);
    \u0275\u0275text(12, " Acceso operativo ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "section", 8)(14, "div", 9);
    \u0275\u0275element(15, "ion-icon", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "h2");
    \u0275\u0275text(17, "Empleado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "p");
    \u0275\u0275text(19, "Ingrese su usuario operativo para acceder a sus trabajos asignados.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "form", 10);
    \u0275\u0275listener("ngSubmit", function LoginEmpleadoPage_Template_form_ngSubmit_20_listener() {
      return ctx.ingresar();
    });
    \u0275\u0275elementStart(21, "div", 11)(22, "label");
    \u0275\u0275text(23, "Usuario empleado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 12);
    \u0275\u0275element(25, "ion-icon", 3)(26, "input", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 11)(28, "label");
    \u0275\u0275text(29, "Contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 12);
    \u0275\u0275element(31, "ion-icon", 3)(32, "input", 14);
    \u0275\u0275elementStart(33, "button", 15);
    \u0275\u0275listener("click", function LoginEmpleadoPage_Template_button_click_33_listener() {
      return ctx.togglePassword();
    });
    \u0275\u0275element(34, "ion-icon", 3);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "div", 16)(36, "label", 17);
    \u0275\u0275element(37, "ion-checkbox", 18);
    \u0275\u0275elementStart(38, "span");
    \u0275\u0275text(39, "Recordarme");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "button", 19);
    \u0275\u0275listener("click", function LoginEmpleadoPage_Template_button_click_40_listener() {
      return ctx.recuperarContrasena();
    });
    \u0275\u0275text(41, " \xBFOlvidaste tu contrase\xF1a? ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "button", 20);
    \u0275\u0275listener("click", function LoginEmpleadoPage_Template_button_click_42_listener() {
      return ctx.ingresar();
    });
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_8_0;
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx.cargando);
    \u0275\u0275advance();
    \u0275\u0275property("icon", ctx.arrowBackIcon);
    \u0275\u0275advance(12);
    \u0275\u0275property("icon", ctx.briefcaseIcon);
    \u0275\u0275advance(5);
    \u0275\u0275property("formGroup", ctx.formulario);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("error", ((tmp_5_0 = ctx.formulario.get("usuario")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.formulario.get("usuario")) == null ? null : tmp_5_0.touched));
    \u0275\u0275advance();
    \u0275\u0275property("icon", ctx.personIcon);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.cargando);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("error", ((tmp_8_0 = ctx.formulario.get("password")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx.formulario.get("password")) == null ? null : tmp_8_0.touched));
    \u0275\u0275advance();
    \u0275\u0275property("icon", ctx.lockIcon);
    \u0275\u0275advance();
    \u0275\u0275property("type", ctx.mostrarPassword ? "text" : "password")("disabled", ctx.cargando);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.cargando);
    \u0275\u0275advance();
    \u0275\u0275property("icon", ctx.mostrarPassword ? ctx.eyeOffIcon : ctx.eyeIcon);
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx.cargando);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx.formulario.invalid || ctx.cargando);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.cargando ? "Ingresando..." : "Ingresar como empleado", " ");
  }
}, dependencies: [
  CommonModule,
  ReactiveFormsModule,
  \u0275NgNoValidate,
  DefaultValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  FormGroupDirective,
  FormControlName,
  IonicModule,
  IonCheckbox,
  IonContent,
  IonIcon,
  BooleanValueAccessorDirective
], styles: ["\n\nion-content.login-root[_ngcontent-%COMP%], \nion-content.login-rol-root[_ngcontent-%COMP%] {\n  --background: #f5f7fa;\n}\n.login-wrapper[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  max-width: 430px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 32px 20px 40px;\n  background: #f5f7fa;\n  box-sizing: border-box;\n  position: relative;\n}\n.btn-volver[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 18px;\n  left: 18px;\n  border: none;\n  background: transparent;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: #087b2d;\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n}\n.btn-volver[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.login-header[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 380px;\n  margin-bottom: 20px;\n  display: flex;\n  justify-content: center;\n}\n.header-logo-area[_ngcontent-%COMP%], \n.login-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.logo-img[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  object-fit: contain;\n}\n.header-texto[_ngcontent-%COMP%], \n.login-header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.empresa-nombre[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: #101828;\n}\n.empresa-subtitulo[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #667085;\n}\n.login-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 380px;\n  background: #ffffff;\n  border-radius: 16px;\n  padding: 28px 24px;\n  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.08), 0 4px 16px rgba(16, 24, 40, 0.06);\n  box-sizing: border-box;\n}\n.rol-icon[_ngcontent-%COMP%] {\n  display: none;\n}\n.card-titulo[_ngcontent-%COMP%], \n.login-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  text-align: center;\n  color: #101828;\n  margin: 0;\n}\n.card-descripcion[_ngcontent-%COMP%], \n.login-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #667085;\n  text-align: center;\n  margin: 8px 0 24px;\n  line-height: 1.45;\n}\n.campo-bloque[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 16px;\n}\n.campo-etiqueta[_ngcontent-%COMP%], \n.campo-bloque[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n  color: #101828;\n}\n.campo-caja[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  border: 1px solid #d0d5dd;\n  border-radius: 10px;\n  height: 44px;\n  padding: 0 12px;\n  background: #ffffff;\n  box-sizing: border-box;\n}\n.campo-caja[_ngcontent-%COMP%]:focus-within {\n  border-color: #087b2d;\n  box-shadow: 0 0 0 3px rgba(8, 123, 45, 0.12);\n}\n.campo-caja.error[_ngcontent-%COMP%] {\n  border-color: #d92d20;\n}\n.campo-caja.error[_ngcontent-%COMP%]:focus-within {\n  box-shadow: 0 0 0 3px rgba(217, 45, 32, 0.12);\n}\n.campo-icono-iz[_ngcontent-%COMP%], \n.campo-caja[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #667085;\n  margin-right: 10px;\n  flex-shrink: 0;\n}\n.campo-input[_ngcontent-%COMP%], \n.campo-caja[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  width: 100%;\n  border: none;\n  outline: none;\n  font-size: 14px;\n  color: #101828;\n  background: transparent;\n  height: 100%;\n}\n.btn-ojo[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding-left: 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n}\n.btn-ojo[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #667085;\n  margin: 0;\n}\n.login-opciones[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 24px;\n}\n.recordarme-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  color: #101828;\n  cursor: pointer;\n}\n.recordarme-label[_ngcontent-%COMP%]   ion-checkbox[_ngcontent-%COMP%], \n.recordarme-label[_ngcontent-%COMP%]   ion-checkbox.checkbox-custom[_ngcontent-%COMP%] {\n  --size: 16px;\n  --checkbox-background-checked: #087b2d;\n  --border-color: #d0d5dd;\n  --border-radius: 4px;\n}\n.btn-olvide[_ngcontent-%COMP%], \n.btn-link[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 0;\n  font-size: 13px;\n  color: #087b2d;\n  font-weight: 500;\n  cursor: pointer;\n}\n.btn-ingresar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 48px;\n  background: #087b2d;\n  color: #ffffff;\n  border: none;\n  border-radius: 10px;\n  font-size: 15px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-ingresar[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #066a27;\n}\n.btn-ingresar[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: scale(0.98);\n}\n.btn-ingresar[_ngcontent-%COMP%]:disabled, \nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.card-pie[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 13px;\n  color: #667085;\n  margin-top: 18px;\n}\n.link-contacto[_ngcontent-%COMP%] {\n  color: #087b2d;\n  font-weight: 500;\n  cursor: pointer;\n}\nion-content.login-rol-root[_ngcontent-%COMP%] {\n  --background: #f5f7fa;\n  --overflow: auto;\n}\n.login-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 430px;\n  min-height: 100dvh;\n  height: auto;\n  padding-top: calc(54px + env(safe-area-inset-top));\n  padding-bottom: calc(32px + env(safe-area-inset-bottom));\n  overflow-y: auto;\n}\n.btn-volver[_ngcontent-%COMP%] {\n  top: calc(16px + env(safe-area-inset-top));\n  z-index: 50;\n}\n.btn-volver[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.campo-caja[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.btn-ojo[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  display: inline-block !important;\n  visibility: visible !important;\n  opacity: 1 !important;\n}\n.campo-caja[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n@media (max-height: 720px) {\n  .login-wrapper[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n    padding-top: calc(58px + env(safe-area-inset-top));\n  }\n  .login-header[_ngcontent-%COMP%] {\n    margin-bottom: 14px;\n  }\n  .login-card[_ngcontent-%COMP%] {\n    padding-top: 22px;\n    padding-bottom: 22px;\n  }\n}\n@media (max-width: 360px) {\n  .login-wrapper[_ngcontent-%COMP%] {\n    padding-left: 14px;\n    padding-right: 14px;\n  }\n  .login-opciones[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .btn-link[_ngcontent-%COMP%], \n   .recordarme-label[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n/*# sourceMappingURL=login-empleado.page.css.map */"] });
var LoginEmpleadoPage = _LoginEmpleadoPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginEmpleadoPage, [{
    type: Component,
    args: [{ selector: "app-login-empleado", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      IonicModule
    ], template: `<!-- src/app/paginas/auth/login-empleado/login-empleado.page.html -->

<ion-content [fullscreen]="true" class="login-rol-root">

  <main class="login-wrapper">

    <button
      type="button"
      class="btn-volver"
      (click)="volver()"
      [disabled]="cargando"
    >
      <ion-icon [icon]="arrowBackIcon"></ion-icon>
      <span>Volver</span>
    </button>

    <section class="login-header">
      <img
        src="assets/img/logo.png"
        alt="Logo Comproy"
        class="logo-img"
      />

      <div>
        <span class="empresa-nombre">COMPROY S.A.C.</span>
        <span class="empresa-subtitulo">
          Acceso operativo
        </span>
      </div>
    </section>

    <section class="login-card">

      <div class="rol-icon empleado">
        <ion-icon [icon]="briefcaseIcon"></ion-icon>
      </div>

      <h2>Empleado</h2>
      <p>Ingrese su usuario operativo para acceder a sus trabajos asignados.</p>

      <form
        [formGroup]="formulario"
        (ngSubmit)="ingresar()"
      >

        <div class="campo-bloque">
          <label>Usuario empleado</label>

          <div
            class="campo-caja"
            [class.error]="formulario.get('usuario')?.invalid && formulario.get('usuario')?.touched"
          >
            <ion-icon [icon]="personIcon"></ion-icon>

          <input
  type="text"
  formControlName="usuario"
  placeholder="Ingrese su usuario"
  autocomplete="username"
  autocapitalize="none"
  spellcheck="false"
  [disabled]="cargando"
/>
          </div>
        </div>

        <div class="campo-bloque">
          <label>Contrase\xF1a</label>

          <div
            class="campo-caja"
            [class.error]="formulario.get('password')?.invalid && formulario.get('password')?.touched"
          >
            <ion-icon [icon]="lockIcon"></ion-icon>

            <input
              [type]="mostrarPassword ? 'text' : 'password'"
              formControlName="password"
              placeholder="Ingrese su contrase\xF1a"
              autocomplete="current-password"
              [disabled]="cargando"
            />

            <button
              type="button"
              class="btn-ojo"
              (click)="togglePassword()"
              [disabled]="cargando"
            >
              <ion-icon [icon]="mostrarPassword ? eyeOffIcon : eyeIcon"></ion-icon>
            </button>
          </div>
        </div>

        <div class="login-opciones">
          <label class="recordarme-label">
            <ion-checkbox formControlName="recordarme"></ion-checkbox>
            <span>Recordarme</span>
          </label>

          <button
            type="button"
            class="btn-link"
            (click)="recuperarContrasena()"
            [disabled]="cargando"
          >
            \xBFOlvidaste tu contrase\xF1a?
          </button>
        </div>

       <button
  type="button"
  class="btn-ingresar empleado"
  (click)="ingresar()"
  [disabled]="formulario.invalid || cargando"
>
          {{ cargando ? 'Ingresando...' : 'Ingresar como empleado' }}
        </button>

      </form>

    </section>

  </main>

</ion-content>`, styles: ["/* src/app/paginas/auth/login-empleado/login-empleado.page.css */\nion-content.login-root,\nion-content.login-rol-root {\n  --background: #f5f7fa;\n}\n.login-wrapper {\n  min-height: 100vh;\n  max-width: 430px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 32px 20px 40px;\n  background: #f5f7fa;\n  box-sizing: border-box;\n  position: relative;\n}\n.btn-volver {\n  position: absolute;\n  top: 18px;\n  left: 18px;\n  border: none;\n  background: transparent;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: #087b2d;\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n}\n.btn-volver ion-icon {\n  font-size: 20px;\n}\n.login-header {\n  width: 100%;\n  max-width: 380px;\n  margin-bottom: 20px;\n  display: flex;\n  justify-content: center;\n}\n.header-logo-area,\n.login-header {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.logo-img {\n  width: 56px;\n  height: 56px;\n  object-fit: contain;\n}\n.header-texto,\n.login-header div {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.empresa-nombre {\n  font-size: 16px;\n  font-weight: 700;\n  color: #101828;\n}\n.empresa-subtitulo {\n  font-size: 11px;\n  color: #667085;\n}\n.login-card {\n  width: 100%;\n  max-width: 380px;\n  background: #ffffff;\n  border-radius: 16px;\n  padding: 28px 24px;\n  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.08), 0 4px 16px rgba(16, 24, 40, 0.06);\n  box-sizing: border-box;\n}\n.rol-icon {\n  display: none;\n}\n.card-titulo,\n.login-card h2 {\n  font-size: 22px;\n  font-weight: 700;\n  text-align: center;\n  color: #101828;\n  margin: 0;\n}\n.card-descripcion,\n.login-card p {\n  font-size: 13px;\n  color: #667085;\n  text-align: center;\n  margin: 8px 0 24px;\n  line-height: 1.45;\n}\n.campo-bloque {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 16px;\n}\n.campo-etiqueta,\n.campo-bloque label {\n  font-size: 13px;\n  font-weight: 500;\n  color: #101828;\n}\n.campo-caja {\n  display: flex;\n  align-items: center;\n  border: 1px solid #d0d5dd;\n  border-radius: 10px;\n  height: 44px;\n  padding: 0 12px;\n  background: #ffffff;\n  box-sizing: border-box;\n}\n.campo-caja:focus-within {\n  border-color: #087b2d;\n  box-shadow: 0 0 0 3px rgba(8, 123, 45, 0.12);\n}\n.campo-caja.error {\n  border-color: #d92d20;\n}\n.campo-caja.error:focus-within {\n  box-shadow: 0 0 0 3px rgba(217, 45, 32, 0.12);\n}\n.campo-icono-iz,\n.campo-caja ion-icon {\n  font-size: 18px;\n  color: #667085;\n  margin-right: 10px;\n  flex-shrink: 0;\n}\n.campo-input,\n.campo-caja input {\n  flex: 1;\n  width: 100%;\n  border: none;\n  outline: none;\n  font-size: 14px;\n  color: #101828;\n  background: transparent;\n  height: 100%;\n}\n.btn-ojo {\n  background: none;\n  border: none;\n  padding-left: 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n}\n.btn-ojo ion-icon {\n  font-size: 18px;\n  color: #667085;\n  margin: 0;\n}\n.login-opciones {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 24px;\n}\n.recordarme-label {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  color: #101828;\n  cursor: pointer;\n}\n.recordarme-label ion-checkbox,\n.recordarme-label ion-checkbox.checkbox-custom {\n  --size: 16px;\n  --checkbox-background-checked: #087b2d;\n  --border-color: #d0d5dd;\n  --border-radius: 4px;\n}\n.btn-olvide,\n.btn-link {\n  background: none;\n  border: none;\n  padding: 0;\n  font-size: 13px;\n  color: #087b2d;\n  font-weight: 500;\n  cursor: pointer;\n}\n.btn-ingresar {\n  width: 100%;\n  height: 48px;\n  background: #087b2d;\n  color: #ffffff;\n  border: none;\n  border-radius: 10px;\n  font-size: 15px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-ingresar:hover:not(:disabled) {\n  background: #066a27;\n}\n.btn-ingresar:active:not(:disabled) {\n  transform: scale(0.98);\n}\n.btn-ingresar:disabled,\nbutton:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.card-pie {\n  text-align: center;\n  font-size: 13px;\n  color: #667085;\n  margin-top: 18px;\n}\n.link-contacto {\n  color: #087b2d;\n  font-weight: 500;\n  cursor: pointer;\n}\nion-content.login-rol-root {\n  --background: #f5f7fa;\n  --overflow: auto;\n}\n.login-wrapper {\n  width: 100%;\n  max-width: 430px;\n  min-height: 100dvh;\n  height: auto;\n  padding-top: calc(54px + env(safe-area-inset-top));\n  padding-bottom: calc(32px + env(safe-area-inset-bottom));\n  overflow-y: auto;\n}\n.btn-volver {\n  top: calc(16px + env(safe-area-inset-top));\n  z-index: 50;\n}\n.btn-volver ion-icon,\n.campo-caja ion-icon,\n.btn-ojo ion-icon {\n  display: inline-block !important;\n  visibility: visible !important;\n  opacity: 1 !important;\n}\n.campo-caja input {\n  min-width: 0;\n}\n@media (max-height: 720px) {\n  .login-wrapper {\n    justify-content: flex-start;\n    padding-top: calc(58px + env(safe-area-inset-top));\n  }\n  .login-header {\n    margin-bottom: 14px;\n  }\n  .login-card {\n    padding-top: 22px;\n    padding-bottom: 22px;\n  }\n}\n@media (max-width: 360px) {\n  .login-wrapper {\n    padding-left: 14px;\n    padding-right: 14px;\n  }\n  .login-opciones {\n    gap: 8px;\n  }\n  .btn-link,\n  .recordarme-label {\n    font-size: 12px;\n  }\n}\n/*# sourceMappingURL=login-empleado.page.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginEmpleadoPage, { className: "LoginEmpleadoPage", filePath: "src/app/paginas/auth/login-empleado/login-empleado.page.ts", lineNumber: 43 });
})();
export {
  LoginEmpleadoPage
};
//# sourceMappingURL=login-empleado.page-J5SUC5OP.js.map
