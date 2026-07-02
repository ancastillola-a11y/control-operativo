import {
  IonContent,
  IonicModule
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
  CommonModule,
  Component,
  NavController,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
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
import "./chunk-Q3N56TRI.js";

// src/app/paginas/auth/seleccion-usuario/seleccion-usuario.page.ts
var _SeleccionUsuarioPage = class _SeleccionUsuarioPage {
  constructor() {
    this.navCtrl = inject(NavController);
  }
  seleccionarRol(rol) {
    localStorage.setItem("rolSeleccionado", rol);
    if (rol === "admin") {
      this.navCtrl.navigateForward("/login-admin", {
        animated: false
      });
      return;
    }
    this.navCtrl.navigateForward("/login-empleado", {
      animated: false
    });
  }
  seleccionarAdministrador() {
    this.seleccionarRol("admin");
  }
  seleccionarEmpleado() {
    this.seleccionarRol("empleado");
  }
};
_SeleccionUsuarioPage.\u0275fac = function SeleccionUsuarioPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SeleccionUsuarioPage)();
};
_SeleccionUsuarioPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SeleccionUsuarioPage, selectors: [["app-seleccion-usuario"]], decls: 37, vars: 1, consts: [[1, "seleccion-root", 3, "fullscreen"], [1, "pantalla-login"], [1, "hero"], [1, "hero-overlay"], ["src", "assets/img/logo.png", "alt", "Logo Comproy SAC", 1, "logo"], [1, "panel"], [1, "descripcion"], ["type", "button", 1, "opcion", 3, "click"], ["src", "assets/img/admin.png", "alt", "Administrador", 1, "opcion-img"], [1, "texto"], [1, "flecha"], ["src", "assets/img/empleado.png", "alt", "Empleado", 1, "opcion-img"], [1, "nota"], [1, "nota-icono"]], template: function SeleccionUsuarioPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "main", 1)(2, "section", 2);
    \u0275\u0275element(3, "div", 3)(4, "img", 4);
    \u0275\u0275elementStart(5, "h1");
    \u0275\u0275text(6, "COMPROY S.A.C.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "Consultor\xEDa Obras y Mantenimiento de Proyectos S.A.C.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "section", 5)(10, "h2");
    \u0275\u0275text(11, "Bienvenido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 6);
    \u0275\u0275text(13, " Seleccione el tipo de usuario con el que desea ingresar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 7);
    \u0275\u0275listener("click", function SeleccionUsuarioPage_Template_button_click_14_listener() {
      return ctx.seleccionarRol("admin");
    });
    \u0275\u0275element(15, "img", 8);
    \u0275\u0275elementStart(16, "div", 9)(17, "h3");
    \u0275\u0275text(18, "Administrador");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "p");
    \u0275\u0275text(20, "Acceso completo al sistema para gesti\xF3n y administraci\xF3n.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 10);
    \u0275\u0275text(22, "\u203A");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "button", 7);
    \u0275\u0275listener("click", function SeleccionUsuarioPage_Template_button_click_23_listener() {
      return ctx.seleccionarRol("empleado");
    });
    \u0275\u0275element(24, "img", 11);
    \u0275\u0275elementStart(25, "div", 9)(26, "h3");
    \u0275\u0275text(27, "Empleado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "p");
    \u0275\u0275text(29, "Acceso a funciones operativas asignadas en campo.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 10);
    \u0275\u0275text(31, "\u203A");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 12)(33, "div", 13);
    \u0275\u0275text(34, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "p");
    \u0275\u0275text(36, " Cada usuario tiene permisos y funciones seg\xFAn su rol dentro de la empresa. ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    \u0275\u0275property("fullscreen", true);
  }
}, dependencies: [
  CommonModule,
  IonicModule,
  IonContent
], styles: ["\n\nion-content.seleccion-root[_ngcontent-%COMP%], \nion-content[_ngcontent-%COMP%] {\n  --background: #f3f5f9;\n  width: 100%;\n  height: 100vh;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  padding: 0;\n  box-sizing: border-box;\n}\n.pantalla-login[_ngcontent-%COMP%], \n.pantalla-seleccion[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 430px;\n  min-height: 100vh;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background: #f3f5f9;\n}\n.hero[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 430px;\n  height: 10vh;\n  min-height: 240px;\n  border-radius: 14px 14px 30px 30px;\n  background-image: url(/assets/img/fondo-obras.jpg);\n  background-size: cover;\n  background-position: top center;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n  padding-top: 40px;\n  overflow: hidden;\n}\n.hero-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: rgba(3, 20, 50, 0.72);\n  z-index: 1;\n}\n.logo[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  width: 64px;\n  height: 64px;\n  margin-bottom: 12px;\n  object-fit: contain;\n}\n.hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  color: #ffffff;\n  font-size: 18px;\n  font-weight: 800;\n  margin: 6px 0 0;\n  text-align: center;\n}\n.hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  color: #ffffff;\n  font-size: 12px;\n  font-weight: 600;\n  line-height: 1.45;\n  text-align: center;\n  margin: 4px 22px 0;\n}\n.panel[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 430px;\n  background: #ffffff;\n  border-radius: 20px;\n  padding: 36px 20px 24px;\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.16);\n  margin-top: -10px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n  z-index: 3;\n  box-sizing: border-box;\n}\n.panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: #071b3b;\n  margin: 0 0 12px;\n  text-align: center;\n}\n.descripcion[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #273955;\n  line-height: 1.45;\n  margin: 0 0 20px;\n  text-align: center;\n}\n.opcion[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 90px;\n  display: flex;\n  align-items: center;\n  border: none;\n  border-radius: 16px;\n  padding: 12px;\n  margin-bottom: 16px;\n  box-shadow: 0 5px 13px rgba(15, 23, 42, 0.08);\n  background: #ffffff;\n  cursor: pointer;\n  transition: transform 0.1s;\n  text-align: left;\n  box-sizing: border-box;\n}\n.opcion[_ngcontent-%COMP%]:active {\n  transform: scale(0.985);\n}\n.opcion-img[_ngcontent-%COMP%], \n.icono[_ngcontent-%COMP%] {\n  width: 54px;\n  height: 54px;\n  border-radius: 12px;\n  margin-right: 14px;\n  flex-shrink: 0;\n  object-fit: cover;\n}\n.icono[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.icono.admin[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      #0b6ff5,\n      #0057df);\n}\n.icono.empleado[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      #078b2f,\n      #007725);\n}\n.texto[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.texto[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 800;\n  margin: 0 0 5px;\n  color: #071b3b;\n}\n.texto[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n  line-height: 1.45;\n  margin: 0;\n  color: #253b59;\n}\n.flecha[_ngcontent-%COMP%] {\n  font-size: 34px;\n  color: #071b3b;\n  padding-left: 8px;\n  line-height: 1;\n}\n.nota[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 430px;\n  background: #f7fbff;\n  border: 1px solid #d7e3f5;\n  border-radius: 20px;\n  padding: 14px;\n  display: flex;\n  gap: 10px;\n  align-items: flex-start;\n  margin-top: 16px;\n  box-sizing: border-box;\n}\n.nota-icono[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  border: 1.8px solid #5b6f91;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 12px;\n  font-weight: 800;\n  color: #5b6f91;\n  flex-shrink: 0;\n}\n.nota[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #344767;\n  line-height: 1.45;\n  margin: 0;\n}\nion-content.seleccion-root[_ngcontent-%COMP%] {\n  --overflow: auto;\n}\n.pantalla-login[_ngcontent-%COMP%], \n.pantalla-seleccion[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 430px;\n  min-height: 100dvh;\n  height: auto;\n}\n.hero[_ngcontent-%COMP%] {\n  padding-top: calc(40px + env(safe-area-inset-top));\n}\n.panel[_ngcontent-%COMP%] {\n  margin-bottom: calc(18px + env(safe-area-inset-bottom));\n}\n@media (max-height: 720px) {\n  .hero[_ngcontent-%COMP%] {\n    min-height: 210px;\n    padding-top: calc(28px + env(safe-area-inset-top));\n  }\n  .panel[_ngcontent-%COMP%] {\n    padding-top: 26px;\n    padding-bottom: 20px;\n  }\n  .opcion[_ngcontent-%COMP%] {\n    min-height: 82px;\n    margin-bottom: 12px;\n  }\n  .nota[_ngcontent-%COMP%] {\n    margin-top: 10px;\n  }\n}\n@media (max-width: 360px) {\n  .panel[_ngcontent-%COMP%] {\n    padding-left: 16px;\n    padding-right: 16px;\n  }\n  .texto[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .texto[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 10.5px;\n  }\n}\n/*# sourceMappingURL=seleccion-usuario.page.css.map */"] });
var SeleccionUsuarioPage = _SeleccionUsuarioPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SeleccionUsuarioPage, [{
    type: Component,
    args: [{ selector: "app-seleccion-usuario", standalone: true, imports: [
      CommonModule,
      IonicModule
    ], template: `<!-- src/app/paginas/auth/seleccion-usuario/seleccion-usuario.page.html -->

<ion-content [fullscreen]="true" class="seleccion-root">

  <main class="pantalla-login">

    <!-- HERO SUPERIOR -->
    <section class="hero">
      <div class="hero-overlay"></div>

      <img
        src="assets/img/logo.png"
        alt="Logo Comproy SAC"
        class="logo"
      />

      <h1>COMPROY S.A.C.</h1>
      <p>Consultor\xEDa Obras y Mantenimiento de Proyectos S.A.C.</p>
    </section>

    <!-- PANEL PRINCIPAL -->
    <section class="panel">

      <h2>Bienvenido</h2>

      <p class="descripcion">
        Seleccione el tipo de usuario con el que desea ingresar
      </p>

      <!-- OPCI\xD3N ADMINISTRADOR -->
      <button
        type="button"
        class="opcion"
        (click)="seleccionarRol('admin')"
      >
        <img
          src="assets/img/admin.png"
          alt="Administrador"
          class="opcion-img"
        />

        <div class="texto">
          <h3>Administrador</h3>
          <p>Acceso completo al sistema para gesti\xF3n y administraci\xF3n.</p>
        </div>

        <div class="flecha">\u203A</div>
      </button>

      <!-- OPCI\xD3N EMPLEADO -->
      <button
        type="button"
        class="opcion"
        (click)="seleccionarRol('empleado')"
      >
        <img
          src="assets/img/empleado.png"
          alt="Empleado"
          class="opcion-img"
        />

        <div class="texto">
          <h3>Empleado</h3>
          <p>Acceso a funciones operativas asignadas en campo.</p>
        </div>

        <div class="flecha">\u203A</div>
      </button>

      <!-- NOTA INFERIOR -->
      <div class="nota">
        <div class="nota-icono">i</div>

        <p>
          Cada usuario tiene permisos y funciones seg\xFAn su rol dentro de la empresa.
        </p>
      </div>

    </section>

  </main>

</ion-content>`, styles: ["/* src/app/paginas/auth/seleccion-usuario/seleccion-usuario.page.css */\nion-content.seleccion-root,\nion-content {\n  --background: #f3f5f9;\n  width: 100%;\n  height: 100vh;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  padding: 0;\n  box-sizing: border-box;\n}\n.pantalla-login,\n.pantalla-seleccion {\n  width: 100%;\n  max-width: 430px;\n  min-height: 100vh;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background: #f3f5f9;\n}\n.hero {\n  width: 100%;\n  max-width: 430px;\n  height: 10vh;\n  min-height: 240px;\n  border-radius: 14px 14px 30px 30px;\n  background-image: url(/assets/img/fondo-obras.jpg);\n  background-size: cover;\n  background-position: top center;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n  padding-top: 40px;\n  overflow: hidden;\n}\n.hero-overlay {\n  position: absolute;\n  inset: 0;\n  background: rgba(3, 20, 50, 0.72);\n  z-index: 1;\n}\n.logo {\n  position: relative;\n  z-index: 2;\n  width: 64px;\n  height: 64px;\n  margin-bottom: 12px;\n  object-fit: contain;\n}\n.hero h1 {\n  position: relative;\n  z-index: 2;\n  color: #ffffff;\n  font-size: 18px;\n  font-weight: 800;\n  margin: 6px 0 0;\n  text-align: center;\n}\n.hero p {\n  position: relative;\n  z-index: 2;\n  color: #ffffff;\n  font-size: 12px;\n  font-weight: 600;\n  line-height: 1.45;\n  text-align: center;\n  margin: 4px 22px 0;\n}\n.panel {\n  width: 100%;\n  max-width: 430px;\n  background: #ffffff;\n  border-radius: 20px;\n  padding: 36px 20px 24px;\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.16);\n  margin-top: -10px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n  z-index: 3;\n  box-sizing: border-box;\n}\n.panel h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: #071b3b;\n  margin: 0 0 12px;\n  text-align: center;\n}\n.descripcion {\n  font-size: 12px;\n  color: #273955;\n  line-height: 1.45;\n  margin: 0 0 20px;\n  text-align: center;\n}\n.opcion {\n  width: 100%;\n  min-height: 90px;\n  display: flex;\n  align-items: center;\n  border: none;\n  border-radius: 16px;\n  padding: 12px;\n  margin-bottom: 16px;\n  box-shadow: 0 5px 13px rgba(15, 23, 42, 0.08);\n  background: #ffffff;\n  cursor: pointer;\n  transition: transform 0.1s;\n  text-align: left;\n  box-sizing: border-box;\n}\n.opcion:active {\n  transform: scale(0.985);\n}\n.opcion-img,\n.icono {\n  width: 54px;\n  height: 54px;\n  border-radius: 12px;\n  margin-right: 14px;\n  flex-shrink: 0;\n  object-fit: cover;\n}\n.icono {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.icono.admin {\n  background:\n    linear-gradient(\n      180deg,\n      #0b6ff5,\n      #0057df);\n}\n.icono.empleado {\n  background:\n    linear-gradient(\n      180deg,\n      #078b2f,\n      #007725);\n}\n.texto {\n  flex: 1;\n  min-width: 0;\n}\n.texto h3 {\n  font-size: 14px;\n  font-weight: 800;\n  margin: 0 0 5px;\n  color: #071b3b;\n}\n.texto p {\n  font-size: 11px;\n  line-height: 1.45;\n  margin: 0;\n  color: #253b59;\n}\n.flecha {\n  font-size: 34px;\n  color: #071b3b;\n  padding-left: 8px;\n  line-height: 1;\n}\n.nota {\n  width: 100%;\n  max-width: 430px;\n  background: #f7fbff;\n  border: 1px solid #d7e3f5;\n  border-radius: 20px;\n  padding: 14px;\n  display: flex;\n  gap: 10px;\n  align-items: flex-start;\n  margin-top: 16px;\n  box-sizing: border-box;\n}\n.nota-icono {\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  border: 1.8px solid #5b6f91;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 12px;\n  font-weight: 800;\n  color: #5b6f91;\n  flex-shrink: 0;\n}\n.nota p {\n  font-size: 11px;\n  color: #344767;\n  line-height: 1.45;\n  margin: 0;\n}\nion-content.seleccion-root {\n  --overflow: auto;\n}\n.pantalla-login,\n.pantalla-seleccion {\n  width: 100%;\n  max-width: 430px;\n  min-height: 100dvh;\n  height: auto;\n}\n.hero {\n  padding-top: calc(40px + env(safe-area-inset-top));\n}\n.panel {\n  margin-bottom: calc(18px + env(safe-area-inset-bottom));\n}\n@media (max-height: 720px) {\n  .hero {\n    min-height: 210px;\n    padding-top: calc(28px + env(safe-area-inset-top));\n  }\n  .panel {\n    padding-top: 26px;\n    padding-bottom: 20px;\n  }\n  .opcion {\n    min-height: 82px;\n    margin-bottom: 12px;\n  }\n  .nota {\n    margin-top: 10px;\n  }\n}\n@media (max-width: 360px) {\n  .panel {\n    padding-left: 16px;\n    padding-right: 16px;\n  }\n  .texto h3 {\n    font-size: 13px;\n  }\n  .texto p {\n    font-size: 10.5px;\n  }\n}\n/*# sourceMappingURL=seleccion-usuario.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SeleccionUsuarioPage, { className: "SeleccionUsuarioPage", filePath: "src/app/paginas/auth/seleccion-usuario/seleccion-usuario.page.ts", lineNumber: 16 });
})();
export {
  SeleccionUsuarioPage
};
//# sourceMappingURL=seleccion-usuario.page-YBUFQJ4T.js.map
