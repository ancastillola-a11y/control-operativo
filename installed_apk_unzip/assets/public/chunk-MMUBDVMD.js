import {
  Auth,
  Firestore,
  collection,
  confirmPasswordReset,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  verifyPasswordResetCode,
  where
} from "./chunk-NMRAWXHA.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-D2BFCRPD.js";
import {
  __async
} from "./chunk-Q3N56TRI.js";

// src/app/dao/usuario.dao.ts
var _UsuarioDAO = class _UsuarioDAO {
  constructor() {
    this.firestore = inject(Firestore);
  }
  obtenerRol(uid) {
    return __async(this, null, function* () {
      return yield this.obtenerUsuarioPorUid(uid);
    });
  }
  obtenerUsuarioPorUid(uid) {
    return __async(this, null, function* () {
      const uidLimpio = String(uid || "").trim();
      if (!uidLimpio) {
        return null;
      }
      const ref = doc(this.firestore, "usuarios", uidLimpio);
      const snap = yield getDoc(ref);
      if (snap.exists()) {
        return this.mapearUsuario(snap.id, snap.data());
      }
      const usuariosRef = collection(this.firestore, "usuarios");
      const consultaPorUid = query(usuariosRef, where("uid", "==", uidLimpio), limit(1));
      const snapshot = yield getDocs(consultaPorUid);
      if (!snapshot.empty) {
        const documento = snapshot.docs[0];
        return this.mapearUsuario(documento.id, documento.data());
      }
      return null;
    });
  }
  obtenerUsuarioPorCorreoOUsuario(valor) {
    return __async(this, null, function* () {
      const termino = String(valor || "").trim().toLowerCase();
      if (!termino) {
        return null;
      }
      const usuariosRef = collection(this.firestore, "usuarios");
      const camposBusqueda = [
        "usuarioLower",
        "usuario",
        "correoAuth",
        "correo"
      ];
      for (const campo of camposBusqueda) {
        const consulta = query(usuariosRef, where(campo, "==", termino), limit(1));
        const snapshot = yield getDocs(consulta);
        if (!snapshot.empty) {
          const documento = snapshot.docs[0];
          return this.mapearUsuario(documento.id, documento.data());
        }
      }
      return null;
    });
  }
  mapearUsuario(id, data) {
    const correo = String(data.correo || "").trim().toLowerCase();
    const correoAuth = String(data.correoAuth || correo || "").trim().toLowerCase();
    const usuario = String(data.usuario || "").trim().toLowerCase();
    const usuarioLower = String(data.usuarioLower || usuario || "").trim().toLowerCase();
    return {
      id,
      uid: String(data.uid || id).trim(),
      correo,
      correoAuth,
      usuario,
      usuarioLower,
      nombres: String(data.nombres || "").trim(),
      apellidos: String(data.apellidos || "").trim(),
      rol: String(data.rol || "").trim().toLowerCase(),
      activo: data.activo,
      estado: data.estado,
      habilitado: data.habilitado,
      eliminado: data.eliminado,
      fotoUrl: String(data.fotoUrl || "").trim()
    };
  }
};
_UsuarioDAO.\u0275fac = function UsuarioDAO_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _UsuarioDAO)();
};
_UsuarioDAO.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UsuarioDAO, factory: _UsuarioDAO.\u0275fac, providedIn: "root" });
var UsuarioDAO = _UsuarioDAO;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsuarioDAO, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/procesos/auth.service.ts
var _AuthService = class _AuthService {
  constructor() {
    this.auth = inject(Auth);
    this.usuarioDAO = inject(UsuarioDAO);
  }
  login(correo, password) {
    return __async(this, null, function* () {
      const correoLimpio = String(correo || "").trim().toLowerCase();
      const passwordLimpio = String(password || "");
      if (!correoLimpio) {
        throw new Error("correo-auth-vacio");
      }
      if (!this.esCorreoValido(correoLimpio)) {
        throw new Error(`correo-auth-invalido:${correoLimpio}`);
      }
      if (!passwordLimpio) {
        throw new Error("password-vacio");
      }
      try {
        return yield signInWithEmailAndPassword(this.auth, correoLimpio, passwordLimpio);
      } catch (error) {
        console.error("[AuthService] Error Firebase Auth:", {
          code: error?.code,
          message: error?.message,
          name: error?.name,
          error
        });
        throw error;
      }
    });
  }
  resetPassword(correo) {
    return __async(this, null, function* () {
      const correoLimpio = String(correo || "").trim().toLowerCase();
      if (!correoLimpio) {
        throw new Error("correo-vacio");
      }
      return yield sendPasswordResetEmail(this.auth, correoLimpio);
    });
  }
  verificarCodigoRecuperacion(oobCode) {
    return __async(this, null, function* () {
      return yield verifyPasswordResetCode(this.auth, oobCode);
    });
  }
  confirmarNuevaContrasena(oobCode, nuevaContrasena) {
    return __async(this, null, function* () {
      return yield confirmPasswordReset(this.auth, oobCode, nuevaContrasena);
    });
  }
  obtenerRol(uid) {
    return __async(this, null, function* () {
      const usuario = yield this.usuarioDAO.obtenerRol(uid);
      const rol = String(usuario?.rol || "").trim().toLowerCase();
      if (rol === "admin" || rol === "administrador" || rol === "empleado") {
        return rol;
      }
      return null;
    });
  }
  obtenerUsuarioPorCorreoOUsuario(valor) {
    return __async(this, null, function* () {
      const termino = String(valor || "").trim().toLowerCase();
      if (!termino) {
        return null;
      }
      return yield this.usuarioDAO.obtenerUsuarioPorCorreoOUsuario(termino);
    });
  }
  esCorreoValido(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  }
};
_AuthService.\u0275fac = function AuthService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuthService)();
};
_AuthService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
var AuthService = _AuthService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-MMUBDVMD.js.map
