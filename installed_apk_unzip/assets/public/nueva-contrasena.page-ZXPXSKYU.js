import "./chunk-VG2ZDDDH.js";
import {
  AuthService
} from "./chunk-MMUBDVMD.js";
import {
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
import {
  animate,
  style,
  transition,
  trigger
} from "./chunk-N6ZASUBG.js";
import "./chunk-NMRAWXHA.js";
import {
  ActivatedRoute,
  CommonModule,
  Component,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NgIf,
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

// src/app/paginas/auth/nueva-contrasena/nueva-contrasena.page.ts
function NuevaContrasenaPage_p_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1, " Ingresa una nueva contrase\xF1a para la cuenta: ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.correoVerificado);
  }
}
function NuevaContrasenaPage_p_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1, " Verificando enlace de recuperaci\xF3n... ");
    \u0275\u0275elementEnd();
  }
}
function NuevaContrasenaPage_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "ion-icon", 14);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "El enlace de recuperaci\xF3n expir\xF3 o no es v\xE1lido. Solicita uno nuevo desde el inicio de sesi\xF3n.");
    \u0275\u0275elementEnd()();
  }
}
function NuevaContrasenaPage_form_12_p_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1, " Las contrase\xF1as no coinciden. ");
    \u0275\u0275elementEnd();
  }
}
function NuevaContrasenaPage_form_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 15);
    \u0275\u0275listener("ngSubmit", function NuevaContrasenaPage_form_12_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.guardarNuevaContrasena());
    });
    \u0275\u0275elementStart(1, "div", 16)(2, "label", 17);
    \u0275\u0275text(3, "Nueva contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 18);
    \u0275\u0275element(5, "ion-icon", 19)(6, "input", 20);
    \u0275\u0275elementStart(7, "button", 21);
    \u0275\u0275listener("click", function NuevaContrasenaPage_form_12_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.togglePassword());
    });
    \u0275\u0275element(8, "ion-icon", 22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 16)(10, "label", 17);
    \u0275\u0275text(11, "Confirmar contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 18);
    \u0275\u0275element(13, "ion-icon", 23)(14, "input", 24);
    \u0275\u0275elementStart(15, "button", 21);
    \u0275\u0275listener("click", function NuevaContrasenaPage_form_12_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleConfirmar());
    });
    \u0275\u0275element(16, "ion-icon", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(17, NuevaContrasenaPage_form_12_p_17_Template, 2, 0, "p", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 26);
    \u0275\u0275element(19, "ion-icon", 27);
    \u0275\u0275elementStart(20, "p", 28);
    \u0275\u0275text(21, " La contrase\xF1a debe tener como m\xEDnimo 6 caracteres. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "button", 29);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_5_0;
    let tmp_8_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r0.formulario);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("error", ((tmp_2_0 = ctx_r0.formulario.get("password")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx_r0.formulario.get("password")) == null ? null : tmp_2_0.touched));
    \u0275\u0275advance(2);
    \u0275\u0275property("type", ctx_r0.mostrarPassword ? "text" : "password");
    \u0275\u0275advance(2);
    \u0275\u0275property("name", ctx_r0.mostrarPassword ? "eye-off-outline" : "eye-outline");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("error", ((tmp_5_0 = ctx_r0.formulario.get("confirmarPassword")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r0.formulario.get("confirmarPassword")) == null ? null : tmp_5_0.touched) || (ctx_r0.formulario.errors == null ? null : ctx_r0.formulario.errors["passwordsNoCoinciden"]) && ((tmp_5_0 = ctx_r0.formulario.get("confirmarPassword")) == null ? null : tmp_5_0.touched));
    \u0275\u0275advance(2);
    \u0275\u0275property("type", ctx_r0.mostrarConfirmar ? "text" : "password");
    \u0275\u0275advance(2);
    \u0275\u0275property("name", ctx_r0.mostrarConfirmar ? "eye-off-outline" : "eye-outline");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r0.formulario.errors == null ? null : ctx_r0.formulario.errors["passwordsNoCoinciden"]) && ((tmp_8_0 = ctx_r0.formulario.get("confirmarPassword")) == null ? null : tmp_8_0.touched));
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r0.formulario.invalid || ctx_r0.procesando);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.procesando ? "Guardando..." : "Guardar nueva contrase\xF1a", " ");
  }
}
var _NuevaContrasenaPage = class _NuevaContrasenaPage {
  constructor() {
    this.fb = inject(FormBuilder);
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.authService = inject(AuthService);
    this.toastCtrl = inject(ToastController);
    this.mostrarPassword = false;
    this.mostrarConfirmar = false;
    this.cargando = true;
    this.procesando = false;
    this.codigoValido = false;
    this.oobCode = "";
    this.correoVerificado = "";
    this.formulario = this.fb.group({
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ["", [Validators.required]]
    }, {
      validators: this.validarPasswordsIguales
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this.oobCode = this.route.snapshot.queryParamMap.get("oobCode") ?? "";
      if (!this.oobCode) {
        this.cargando = false;
        this.codigoValido = false;
        this.showToast("El enlace de recuperaci\xC3\xB3n no es v\xC3\xA1lido");
        return;
      }
      try {
        this.correoVerificado = yield this.authService.verificarCodigoRecuperacion(this.oobCode);
        this.codigoValido = true;
      } catch (error) {
        console.error(error);
        this.codigoValido = false;
        this.showToast("El enlace expir\xC3\xB3 o no es v\xC3\xA1lido");
      } finally {
        this.cargando = false;
      }
    });
  }
  validarPasswordsIguales(control) {
    const password = control.get("password")?.value;
    const confirmarPassword = control.get("confirmarPassword")?.value;
    if (!password || !confirmarPassword)
      return null;
    return password === confirmarPassword ? null : { passwordsNoCoinciden: true };
  }
  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }
  toggleConfirmar() {
    this.mostrarConfirmar = !this.mostrarConfirmar;
  }
  guardarNuevaContrasena() {
    return __async(this, null, function* () {
      if (!this.codigoValido) {
        this.showToast("El enlace de recuperaci\xC3\xB3n no es v\xC3\xA1lido");
        return;
      }
      if (this.formulario.invalid) {
        this.formulario.markAllAsTouched();
        this.showToast("Complete correctamente las contrase\xC3\xB1as");
        return;
      }
      const nuevaContrasena = this.formulario.value.password;
      try {
        this.procesando = true;
        yield this.authService.confirmarNuevaContrasena(this.oobCode, nuevaContrasena);
        this.showToast("Contrase\xF1a actualizada correctamente", "success");
        setTimeout(() => {
          this.router.navigateByUrl("/seleccion-usuario");
        }, 1200);
      } catch (error) {
        console.error(error);
        this.showToast("No se pudo actualizar la contrase\xC3\xB1a");
      } finally {
        this.procesando = false;
      }
    });
  }
  volverLogin() {
    this.router.navigateByUrl("/seleccion-usuario");
  }
  showToast(message, color = "danger") {
    return __async(this, null, function* () {
      const toast = yield this.toastCtrl.create({
        message,
        duration: 3e3,
        color,
        position: "top"
      });
      yield toast.present();
    });
  }
};
_NuevaContrasenaPage.\u0275fac = function NuevaContrasenaPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NuevaContrasenaPage)();
};
_NuevaContrasenaPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NuevaContrasenaPage, selectors: [["app-nueva-contrasena"]], decls: 15, vars: 6, consts: [[1, "reset-root", 3, "fullscreen"], [1, "reset-wrapper"], [1, "header-back"], ["type", "button", 1, "btn-back", 3, "click"], ["name", "arrow-back-outline"], [1, "imagen-reset"], ["src", "assets/img/recuperar.png", "alt", "Nueva contrase\xF1a"], [1, "card-titulo"], ["class", "card-descripcion", 4, "ngIf"], ["class", "error-box", 4, "ngIf"], [3, "formGroup", "ngSubmit", 4, "ngIf"], ["type", "button", 1, "btn-volver", 3, "click"], [1, "card-descripcion"], [1, "error-box"], ["name", "alert-circle-outline"], [3, "ngSubmit", "formGroup"], [1, "campo-bloque"], [1, "campo-etiqueta"], [1, "campo-caja"], ["name", "lock-closed-outline", 1, "campo-icono-iz"], ["placeholder", "Ingrese su nueva contrase\xF1a", "formControlName", "password", "autocomplete", "new-password", 1, "campo-input", 3, "type"], ["type", "button", 1, "btn-ojo", 3, "click"], [3, "name"], ["name", "shield-checkmark-outline", 1, "campo-icono-iz"], ["placeholder", "Repita su nueva contrase\xF1a", "formControlName", "confirmarPassword", "autocomplete", "new-password", 1, "campo-input", 3, "type"], ["class", "mensaje-error", 4, "ngIf"], [1, "info-box"], ["name", "information-circle-outline", 1, "info-icono"], [1, "info-texto"], ["type", "submit", 1, "btn-ingresar", 3, "disabled"], [1, "mensaje-error"]], template: function NuevaContrasenaPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1)(2, "div", 2)(3, "button", 3);
    \u0275\u0275listener("click", function NuevaContrasenaPage_Template_button_click_3_listener() {
      return ctx.volverLogin();
    });
    \u0275\u0275element(4, "ion-icon", 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 5);
    \u0275\u0275element(6, "img", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h2", 7);
    \u0275\u0275text(8, "Crear nueva contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, NuevaContrasenaPage_p_9_Template, 4, 1, "p", 8)(10, NuevaContrasenaPage_p_10_Template, 2, 0, "p", 8)(11, NuevaContrasenaPage_div_11_Template, 4, 0, "div", 9)(12, NuevaContrasenaPage_form_12_Template, 24, 12, "form", 10);
    \u0275\u0275elementStart(13, "button", 11);
    \u0275\u0275listener("click", function NuevaContrasenaPage_Template_button_click_13_listener() {
      return ctx.volverLogin();
    });
    \u0275\u0275text(14, " Volver al inicio de sesi\xF3n ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance();
    \u0275\u0275property("@fadeIn", void 0);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", !ctx.cargando && ctx.codigoValido);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.cargando);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.cargando && !ctx.codigoValido);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.cargando && ctx.codigoValido);
  }
}, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, IonicModule, IonContent, IonIcon], styles: ["\n\n.reset-root[_ngcontent-%COMP%] {\n  --background: #F5F7FA;\n}\n.reset-wrapper[_ngcontent-%COMP%] {\n  min-height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 16px 24px 32px;\n  text-align: center;\n}\n.header-back[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 360px;\n  display: flex;\n  justify-content: flex-start;\n  margin-bottom: 12px;\n}\n.btn-back[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 4px;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n}\n.btn-back[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: #101828;\n}\n.imagen-reset[_ngcontent-%COMP%] {\n  width: 160px;\n  height: 140px;\n  margin-bottom: 24px;\n}\n.imagen-reset[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n.card-titulo[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 700;\n  color: #101828;\n  margin-bottom: 8px;\n  line-height: 1.3;\n}\n.card-descripcion[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #667085;\n  margin-bottom: 24px;\n  line-height: 1.5;\n  max-width: 310px;\n}\n.card-descripcion[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #1A3E8C;\n  font-weight: 600;\n}\nform[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 360px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.campo-bloque[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 12px;\n  width: 100%;\n}\n.campo-etiqueta[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n  color: #344054;\n  text-align: left;\n}\n.campo-caja[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  border: 1px solid #D0D5DD;\n  border-radius: 10px;\n  height: 46px;\n  padding: 0 14px;\n  background: #fff;\n}\n.campo-caja.error[_ngcontent-%COMP%] {\n  border-color: #D92D20;\n  box-shadow: 0 0 0 3px rgba(217, 45, 32, 0.12);\n}\n.campo-icono-iz[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #667085;\n  margin-right: 10px;\n  flex-shrink: 0;\n}\n.campo-input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  outline: none;\n  font-size: 14px;\n  background: transparent;\n  height: 100%;\n  min-width: 0;\n  color: #101828;\n}\n.campo-input[_ngcontent-%COMP%]::placeholder {\n  color: #B0B8C6;\n}\n.btn-ojo[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 0;\n  margin-left: 8px;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n}\n.btn-ojo[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #667085;\n}\n.mensaje-error[_ngcontent-%COMP%] {\n  width: 100%;\n  font-size: 12px;\n  color: #D92D20;\n  text-align: left;\n  margin: 0;\n}\n.info-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  background: #F0F4FF;\n  border: 1px solid #C7D7F7;\n  border-radius: 10px;\n  padding: 12px 14px;\n  margin-bottom: 24px;\n  width: 100%;\n  text-align: left;\n}\n.info-box[_ngcontent-%COMP%]   .info-icono[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #4A6FA5;\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n.info-box[_ngcontent-%COMP%]   .info-texto[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: #4A6FA5;\n  line-height: 1.5;\n  margin: 0;\n}\n.error-box[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 360px;\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  background: #FFF1F0;\n  border: 1px solid #FDA29B;\n  border-radius: 10px;\n  padding: 12px 14px;\n  margin-bottom: 20px;\n  text-align: left;\n}\n.error-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #D92D20;\n  flex-shrink: 0;\n}\n.error-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: #B42318;\n  line-height: 1.5;\n  margin: 0;\n}\n.btn-ingresar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 50px;\n  background: #1A2E6E;\n  color: #fff;\n  border: none;\n  border-radius: 12px;\n  font-weight: 600;\n  font-size: 15px;\n  margin-bottom: 14px;\n  cursor: pointer;\n  letter-spacing: 0.3px;\n}\n.btn-ingresar[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-volver[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 360px;\n  background: none;\n  border: none;\n  color: #1A3E8C;\n  font-weight: 500;\n  font-size: 14px;\n  cursor: pointer;\n  text-decoration: none;\n}\n.btn-volver[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=nueva-contrasena.page.css.map */"], data: { animation: [
  trigger("fadeIn", [
    transition(":enter", [
      style({ opacity: 0, transform: "translateY(10px)" }),
      animate("400ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))
    ])
  ])
] } });
var NuevaContrasenaPage = _NuevaContrasenaPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NuevaContrasenaPage, [{
    type: Component,
    args: [{ selector: "app-nueva-contrasena", standalone: true, imports: [CommonModule, ReactiveFormsModule, IonicModule], animations: [
      trigger("fadeIn", [
        transition(":enter", [
          style({ opacity: 0, transform: "translateY(10px)" }),
          animate("400ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))
        ])
      ])
    ], template: `<!-- control-operativo\\src\\app\\vista\\auth\\nueva-contrasena.page\\nueva-contrasena.page.html -->
<ion-content [fullscreen]="true" class="reset-root">
  <div class="reset-wrapper" @fadeIn>

    <div class="header-back">
      <button class="btn-back" type="button" (click)="volverLogin()">
        <ion-icon name="arrow-back-outline"></ion-icon>
      </button>
    </div>

    <div class="imagen-reset">
      <img src="assets/img/recuperar.png" alt="Nueva contrase\xF1a">
    </div>

    <h2 class="card-titulo">Crear nueva contrase\xF1a</h2>

    <p class="card-descripcion" *ngIf="!cargando && codigoValido">
      Ingresa una nueva contrase\xF1a para la cuenta:
      <strong>{{ correoVerificado }}</strong>
    </p>

    <p class="card-descripcion" *ngIf="cargando">
      Verificando enlace de recuperaci\xF3n...
    </p>

    <div class="error-box" *ngIf="!cargando && !codigoValido">
      <ion-icon name="alert-circle-outline"></ion-icon>
      <p>El enlace de recuperaci\xF3n expir\xF3 o no es v\xE1lido. Solicita uno nuevo desde el inicio de sesi\xF3n.</p>
    </div>

    <form
      *ngIf="!cargando && codigoValido"
      [formGroup]="formulario"
      (ngSubmit)="guardarNuevaContrasena()"
    >

      <div class="campo-bloque">
        <label class="campo-etiqueta">Nueva contrase\xF1a</label>

        <div
          class="campo-caja"
          [class.error]="formulario.get('password')?.invalid && formulario.get('password')?.touched"
        >
          <ion-icon name="lock-closed-outline" class="campo-icono-iz"></ion-icon>

          <input
            [type]="mostrarPassword ? 'text' : 'password'"
            class="campo-input"
            placeholder="Ingrese su nueva contrase\xF1a"
            formControlName="password"
            autocomplete="new-password"
          />

          <button type="button" class="btn-ojo" (click)="togglePassword()">
            <ion-icon [name]="mostrarPassword ? 'eye-off-outline' : 'eye-outline'"></ion-icon>
          </button>
        </div>
      </div>

      <div class="campo-bloque">
        <label class="campo-etiqueta">Confirmar contrase\xF1a</label>

        <div
          class="campo-caja"
          [class.error]="
            (formulario.get('confirmarPassword')?.invalid && formulario.get('confirmarPassword')?.touched)
            || (formulario.errors?.['passwordsNoCoinciden'] && formulario.get('confirmarPassword')?.touched)
          "
        >
          <ion-icon name="shield-checkmark-outline" class="campo-icono-iz"></ion-icon>

          <input
            [type]="mostrarConfirmar ? 'text' : 'password'"
            class="campo-input"
            placeholder="Repita su nueva contrase\xF1a"
            formControlName="confirmarPassword"
            autocomplete="new-password"
          />

          <button type="button" class="btn-ojo" (click)="toggleConfirmar()">
            <ion-icon [name]="mostrarConfirmar ? 'eye-off-outline' : 'eye-outline'"></ion-icon>
          </button>
        </div>

        <p
          class="mensaje-error"
          *ngIf="formulario.errors?.['passwordsNoCoinciden'] && formulario.get('confirmarPassword')?.touched"
        >
          Las contrase\xF1as no coinciden.
        </p>
      </div>

      <div class="info-box">
        <ion-icon name="information-circle-outline" class="info-icono"></ion-icon>
        <p class="info-texto">
          La contrase\xF1a debe tener como m\xEDnimo 6 caracteres.
        </p>
      </div>

      <button
        type="submit"
        class="btn-ingresar"
        [disabled]="formulario.invalid || procesando"
      >
        {{ procesando ? 'Guardando...' : 'Guardar nueva contrase\xF1a' }}
      </button>

    </form>

    <button type="button" class="btn-volver" (click)="volverLogin()">
      Volver al inicio de sesi\xF3n
    </button>

  </div>
</ion-content>`, styles: ["/* src/app/paginas/auth/nueva-contrasena/nueva-contrasena.page.scss */\n.reset-root {\n  --background: #F5F7FA;\n}\n.reset-wrapper {\n  min-height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 16px 24px 32px;\n  text-align: center;\n}\n.header-back {\n  width: 100%;\n  max-width: 360px;\n  display: flex;\n  justify-content: flex-start;\n  margin-bottom: 12px;\n}\n.btn-back {\n  background: none;\n  border: none;\n  padding: 4px;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n}\n.btn-back ion-icon {\n  font-size: 22px;\n  color: #101828;\n}\n.imagen-reset {\n  width: 160px;\n  height: 140px;\n  margin-bottom: 24px;\n}\n.imagen-reset img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n.card-titulo {\n  font-size: 20px;\n  font-weight: 700;\n  color: #101828;\n  margin-bottom: 8px;\n  line-height: 1.3;\n}\n.card-descripcion {\n  font-size: 13px;\n  color: #667085;\n  margin-bottom: 24px;\n  line-height: 1.5;\n  max-width: 310px;\n}\n.card-descripcion strong {\n  color: #1A3E8C;\n  font-weight: 600;\n}\nform {\n  width: 100%;\n  max-width: 360px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.campo-bloque {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 12px;\n  width: 100%;\n}\n.campo-etiqueta {\n  font-size: 13px;\n  font-weight: 500;\n  color: #344054;\n  text-align: left;\n}\n.campo-caja {\n  display: flex;\n  align-items: center;\n  border: 1px solid #D0D5DD;\n  border-radius: 10px;\n  height: 46px;\n  padding: 0 14px;\n  background: #fff;\n}\n.campo-caja.error {\n  border-color: #D92D20;\n  box-shadow: 0 0 0 3px rgba(217, 45, 32, 0.12);\n}\n.campo-icono-iz {\n  font-size: 18px;\n  color: #667085;\n  margin-right: 10px;\n  flex-shrink: 0;\n}\n.campo-input {\n  flex: 1;\n  border: none;\n  outline: none;\n  font-size: 14px;\n  background: transparent;\n  height: 100%;\n  min-width: 0;\n  color: #101828;\n}\n.campo-input::placeholder {\n  color: #B0B8C6;\n}\n.btn-ojo {\n  background: none;\n  border: none;\n  padding: 0;\n  margin-left: 8px;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n}\n.btn-ojo ion-icon {\n  font-size: 18px;\n  color: #667085;\n}\n.mensaje-error {\n  width: 100%;\n  font-size: 12px;\n  color: #D92D20;\n  text-align: left;\n  margin: 0;\n}\n.info-box {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  background: #F0F4FF;\n  border: 1px solid #C7D7F7;\n  border-radius: 10px;\n  padding: 12px 14px;\n  margin-bottom: 24px;\n  width: 100%;\n  text-align: left;\n}\n.info-box .info-icono {\n  font-size: 18px;\n  color: #4A6FA5;\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n.info-box .info-texto {\n  font-size: 12.5px;\n  color: #4A6FA5;\n  line-height: 1.5;\n  margin: 0;\n}\n.error-box {\n  width: 100%;\n  max-width: 360px;\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  background: #FFF1F0;\n  border: 1px solid #FDA29B;\n  border-radius: 10px;\n  padding: 12px 14px;\n  margin-bottom: 20px;\n  text-align: left;\n}\n.error-box ion-icon {\n  font-size: 20px;\n  color: #D92D20;\n  flex-shrink: 0;\n}\n.error-box p {\n  font-size: 12.5px;\n  color: #B42318;\n  line-height: 1.5;\n  margin: 0;\n}\n.btn-ingresar {\n  width: 100%;\n  height: 50px;\n  background: #1A2E6E;\n  color: #fff;\n  border: none;\n  border-radius: 12px;\n  font-weight: 600;\n  font-size: 15px;\n  margin-bottom: 14px;\n  cursor: pointer;\n  letter-spacing: 0.3px;\n}\n.btn-ingresar:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-volver {\n  width: 100%;\n  max-width: 360px;\n  background: none;\n  border: none;\n  color: #1A3E8C;\n  font-weight: 500;\n  font-size: 14px;\n  cursor: pointer;\n  text-decoration: none;\n}\n.btn-volver:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=nueva-contrasena.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NuevaContrasenaPage, { className: "NuevaContrasenaPage", filePath: "src/app/paginas/auth/nueva-contrasena/nueva-contrasena.page.ts", lineNumber: 32 });
})();
export {
  NuevaContrasenaPage
};
//# sourceMappingURL=nueva-contrasena.page-ZXPXSKYU.js.map
