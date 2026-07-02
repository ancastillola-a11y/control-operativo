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
  CommonModule,
  Component,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
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
  ɵɵtext
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

// src/app/paginas/auth/recuperar/recuperar.page.ts
var _RecuperarPage = class _RecuperarPage {
  constructor() {
    this.fb = inject(FormBuilder);
    this.authService = inject(AuthService);
    this.router = inject(Router);
    this.toastCtrl = inject(ToastController);
    this.formulario = this.fb.group({
      correo: ["", [Validators.required, Validators.email]]
    });
  }
  enviarEnlace() {
    return __async(this, null, function* () {
      if (this.formulario.invalid) {
        this.showToast("Ingrese un correo v\xC3\xA1lido");
        return;
      }
      const { correo } = this.formulario.value;
      try {
        const usuarioData = yield this.authService.obtenerUsuarioPorCorreoOUsuario(correo);
        if (!usuarioData) {
          this.showToast("Usuario no registrado");
          return;
        }
        yield this.authService.resetPassword(usuarioData.correo);
        this.showToast("Correo de recuperaci\xC3\xB3n enviado", "success");
      } catch (err) {
        console.error(err);
        this.showToast("Error al enviar el correo");
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
_RecuperarPage.\u0275fac = function RecuperarPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RecuperarPage)();
};
_RecuperarPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RecuperarPage, selectors: [["app-recuperar"]], decls: 26, vars: 6, consts: [[1, "login-root", 3, "fullscreen"], [1, "login-wrapper"], [1, "header-back"], ["type", "button", 1, "btn-back", 3, "click"], ["name", "arrow-back-outline"], [1, "card-titulo"], [1, "card-descripcion"], [1, "imagen-recuperar"], ["src", "assets/img/recuperar.png", "alt", "Recuperar contrase\xF1a"], [3, "ngSubmit", "formGroup"], [1, "campo-bloque"], [1, "campo-etiqueta"], [1, "campo-caja"], ["name", "mail-outline", 1, "campo-icono-iz"], ["type", "email", "placeholder", "correo@ejemplo.com", "formControlName", "correo", 1, "campo-input"], [1, "info-box"], ["name", "information-circle-outline", 1, "info-icono"], [1, "info-texto"], ["type", "submit", 1, "btn-ingresar", 3, "disabled"], ["type", "button", 1, "btn-volver", 3, "click"]], template: function RecuperarPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1)(2, "div", 2)(3, "button", 3);
    \u0275\u0275listener("click", function RecuperarPage_Template_button_click_3_listener() {
      return ctx.volverLogin();
    });
    \u0275\u0275element(4, "ion-icon", 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "h2", 5);
    \u0275\u0275text(6, "Recuperaci\xF3n de contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 6);
    \u0275\u0275text(8, " Ingrese su correo electr\xF3nico para recuperar su contrase\xF1a ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 7);
    \u0275\u0275element(10, "img", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "form", 9);
    \u0275\u0275listener("ngSubmit", function RecuperarPage_Template_form_ngSubmit_11_listener() {
      return ctx.enviarEnlace();
    });
    \u0275\u0275elementStart(12, "div", 10)(13, "label", 11);
    \u0275\u0275text(14, "Correo electr\xF3nico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 12);
    \u0275\u0275element(16, "ion-icon", 13)(17, "input", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 15);
    \u0275\u0275element(19, "ion-icon", 16);
    \u0275\u0275elementStart(20, "p", 17);
    \u0275\u0275text(21, " Le enviaremos un enlace para restablecer su contrase\xF1a. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "button", 18);
    \u0275\u0275text(23, "Enviar enlace");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 19);
    \u0275\u0275listener("click", function RecuperarPage_Template_button_click_24_listener() {
      return ctx.volverLogin();
    });
    \u0275\u0275text(25, "Volver al inicio de sesi\xF3n");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance();
    \u0275\u0275property("@fadeIn", void 0);
    \u0275\u0275advance(10);
    \u0275\u0275property("formGroup", ctx.formulario);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("error", ((tmp_3_0 = ctx.formulario.get("correo")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.formulario.get("correo")) == null ? null : tmp_3_0.touched));
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx.formulario.invalid);
  }
}, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, IonicModule, IonContent, IonIcon], styles: ['@charset "UTF-8";\n\n\n\n.login-root[_ngcontent-%COMP%] {\n  --background: #F5F7FA;\n}\n.login-wrapper[_ngcontent-%COMP%] {\n  min-height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 16px 24px 32px;\n  text-align: center;\n}\n.header-back[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  justify-content: flex-start;\n  margin-bottom: 16px;\n}\n.btn-back[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 4px;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n}\n.btn-back[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: #101828;\n}\n.card-titulo[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 700;\n  color: #101828;\n  margin-bottom: 8px;\n  line-height: 1.3;\n}\n.card-descripcion[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #667085;\n  margin-bottom: 24px;\n  line-height: 1.5;\n  max-width: 280px;\n}\n.imagen-recuperar[_ngcontent-%COMP%] {\n  width: 160px;\n  height: 140px;\n  margin-bottom: 28px;\n}\n.imagen-recuperar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\nform[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 360px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.campo-bloque[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 12px;\n  width: 100%;\n}\n.campo-etiqueta[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n  color: #344054;\n  text-align: left;\n}\n.campo-caja[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  border: 1px solid #D0D5DD;\n  border-radius: 10px;\n  height: 46px;\n  padding: 0 14px;\n  background: #fff;\n}\n.campo-caja.error[_ngcontent-%COMP%] {\n  border-color: #D92D20;\n  box-shadow: 0 0 0 3px rgba(217, 45, 32, 0.12);\n}\n.campo-icono-iz[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #667085;\n  margin-right: 10px;\n  flex-shrink: 0;\n}\n.campo-input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  outline: none;\n  font-size: 14px;\n  background: transparent;\n  height: 100%;\n  min-width: 0;\n  color: #101828;\n}\n.campo-input[_ngcontent-%COMP%]::placeholder {\n  color: #B0B8C6;\n}\n.info-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  background: #F0F4FF;\n  border: 1px solid #C7D7F7;\n  border-radius: 10px;\n  padding: 12px 14px;\n  margin-bottom: 24px;\n  width: 100%;\n  text-align: left;\n}\n.info-box[_ngcontent-%COMP%]   .info-icono[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #4A6FA5;\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n.info-box[_ngcontent-%COMP%]   .info-texto[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: #4A6FA5;\n  line-height: 1.5;\n  margin: 0;\n}\n.btn-ingresar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 50px;\n  background: #1A2E6E;\n  color: #fff;\n  border: none;\n  border-radius: 12px;\n  font-weight: 600;\n  font-size: 15px;\n  margin-bottom: 14px;\n  cursor: pointer;\n  letter-spacing: 0.3px;\n}\n.btn-ingresar[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-volver[_ngcontent-%COMP%] {\n  width: 100%;\n  background: none;\n  border: none;\n  color: #1A3E8C;\n  font-weight: 500;\n  font-size: 14px;\n  cursor: pointer;\n  text-decoration: none;\n}\n.btn-volver[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=recuperar.page.css.map */'], data: { animation: [
  trigger("fadeIn", [
    transition(":enter", [
      style({ opacity: 0, transform: "translateY(10px)" }),
      animate("400ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))
    ])
  ])
] } });
var RecuperarPage = _RecuperarPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RecuperarPage, [{
    type: Component,
    args: [{ selector: "app-recuperar", standalone: true, imports: [CommonModule, ReactiveFormsModule, IonicModule], animations: [
      trigger("fadeIn", [
        transition(":enter", [
          style({ opacity: 0, transform: "translateY(10px)" }),
          animate("400ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))
        ])
      ])
    ], template: `<!--control-operativo\\src\\app\\vista\\auth\\recuperar\\recuperar.page.html-->
<ion-content [fullscreen]="true" class="login-root">
  <div class="login-wrapper" @fadeIn>

    <!-- Bot\xF3n volver atr\xE1s -->
    <div class="header-back">
      <button class="btn-back" type="button" (click)="volverLogin()">
        <ion-icon name="arrow-back-outline"></ion-icon>
      </button>
    </div>

    <!-- T\xEDtulo y descripci\xF3n -->
    <h2 class="card-titulo">Recuperaci\xF3n de contrase\xF1a</h2>
    <p class="card-descripcion">
      Ingrese su correo electr\xF3nico para recuperar su contrase\xF1a
    </p>

    <!-- Imagen / ilustraci\xF3n -->
    <div class="imagen-recuperar">
      <img src="assets/img/recuperar.png" alt="Recuperar contrase\xF1a">
    </div>

    <!-- Formulario -->
    <form [formGroup]="formulario" (ngSubmit)="enviarEnlace()">

      <div class="campo-bloque">
        <label class="campo-etiqueta">Correo electr\xF3nico</label>
        <div class="campo-caja" [class.error]="formulario.get('correo')?.invalid && formulario.get('correo')?.touched">
          <ion-icon name="mail-outline" class="campo-icono-iz"></ion-icon>
          <input
            type="email"
            class="campo-input"
            placeholder="correo@ejemplo.com"
            formControlName="correo"
          />
        </div>
      </div>

      <!-- Info box -->
      <div class="info-box">
        <ion-icon name="information-circle-outline" class="info-icono"></ion-icon>
        <p class="info-texto">
          Le enviaremos un enlace para restablecer su contrase\xF1a.
        </p>
      </div>

      <!-- Botones -->
      <button type="submit" class="btn-ingresar" [disabled]="formulario.invalid">Enviar enlace</button>
      <button type="button" class="btn-volver" (click)="volverLogin()">Volver al inicio de sesi\xF3n</button>

    </form>

  </div>
</ion-content>`, styles: ['@charset "UTF-8";\n\n/* src/app/paginas/auth/recuperar/recuperar.page.scss */\n.login-root {\n  --background: #F5F7FA;\n}\n.login-wrapper {\n  min-height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 16px 24px 32px;\n  text-align: center;\n}\n.header-back {\n  width: 100%;\n  display: flex;\n  justify-content: flex-start;\n  margin-bottom: 16px;\n}\n.btn-back {\n  background: none;\n  border: none;\n  padding: 4px;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n}\n.btn-back ion-icon {\n  font-size: 22px;\n  color: #101828;\n}\n.card-titulo {\n  font-size: 20px;\n  font-weight: 700;\n  color: #101828;\n  margin-bottom: 8px;\n  line-height: 1.3;\n}\n.card-descripcion {\n  font-size: 13px;\n  color: #667085;\n  margin-bottom: 24px;\n  line-height: 1.5;\n  max-width: 280px;\n}\n.imagen-recuperar {\n  width: 160px;\n  height: 140px;\n  margin-bottom: 28px;\n}\n.imagen-recuperar img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\nform {\n  width: 100%;\n  max-width: 360px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.campo-bloque {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 12px;\n  width: 100%;\n}\n.campo-etiqueta {\n  font-size: 13px;\n  font-weight: 500;\n  color: #344054;\n  text-align: left;\n}\n.campo-caja {\n  display: flex;\n  align-items: center;\n  border: 1px solid #D0D5DD;\n  border-radius: 10px;\n  height: 46px;\n  padding: 0 14px;\n  background: #fff;\n}\n.campo-caja.error {\n  border-color: #D92D20;\n  box-shadow: 0 0 0 3px rgba(217, 45, 32, 0.12);\n}\n.campo-icono-iz {\n  font-size: 18px;\n  color: #667085;\n  margin-right: 10px;\n  flex-shrink: 0;\n}\n.campo-input {\n  flex: 1;\n  border: none;\n  outline: none;\n  font-size: 14px;\n  background: transparent;\n  height: 100%;\n  min-width: 0;\n  color: #101828;\n}\n.campo-input::placeholder {\n  color: #B0B8C6;\n}\n.info-box {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  background: #F0F4FF;\n  border: 1px solid #C7D7F7;\n  border-radius: 10px;\n  padding: 12px 14px;\n  margin-bottom: 24px;\n  width: 100%;\n  text-align: left;\n}\n.info-box .info-icono {\n  font-size: 18px;\n  color: #4A6FA5;\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n.info-box .info-texto {\n  font-size: 12.5px;\n  color: #4A6FA5;\n  line-height: 1.5;\n  margin: 0;\n}\n.btn-ingresar {\n  width: 100%;\n  height: 50px;\n  background: #1A2E6E;\n  color: #fff;\n  border: none;\n  border-radius: 12px;\n  font-weight: 600;\n  font-size: 15px;\n  margin-bottom: 14px;\n  cursor: pointer;\n  letter-spacing: 0.3px;\n}\n.btn-ingresar:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-volver {\n  width: 100%;\n  background: none;\n  border: none;\n  color: #1A3E8C;\n  font-weight: 500;\n  font-size: 14px;\n  cursor: pointer;\n  text-decoration: none;\n}\n.btn-volver:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=recuperar.page.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RecuperarPage, { className: "RecuperarPage", filePath: "src/app/paginas/auth/recuperar/recuperar.page.ts", lineNumber: 25 });
})();
export {
  RecuperarPage
};
//# sourceMappingURL=recuperar.page-6ARFA2MZ.js.map
