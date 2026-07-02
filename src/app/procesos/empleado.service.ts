// src/app/procesos/empleado.service.ts
import { Injectable, inject, NgZone } from '@angular/core';
import { Auth } from '@angular/fire/auth';

import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  signOut
} from 'firebase/auth';

import {
  getApp,
  getApps,
  initializeApp
} from 'firebase/app';

import {
  BehaviorSubject,
  combineLatest,
  Observable
} from 'rxjs';

import {
  map,
  shareReplay
} from 'rxjs/operators';

import { EmpleadoDAO } from '../dao/empleado.dao';
import { FirebaseStorageService } from './firebase-storage.service';

import {
  CrearEmpleadoData,
  EditarEmpleadoData,
  Empleado,
  EmpleadoVista,
  EmpleadosViewModel,
  EstadoFiltroEmpleado
} from '../modelos/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private dao = inject(EmpleadoDAO);
  private storageService = inject(FirebaseStorageService);
  private authPrincipal = inject(Auth);
  private zone = inject(NgZone);

  private empleadosSubject = new BehaviorSubject<EmpleadoVista[]>([]);
  private busquedaSubject = new BehaviorSubject<string>('');
  private filtroSubject = new BehaviorSubject<EstadoFiltroEmpleado>('todos');
  private paginaSubject = new BehaviorSubject<number>(1);

  private readonly tamanioPagina = 5;
  private readonly dominioAuth = 'comproy.local';

  vm$: Observable<EmpleadosViewModel> = combineLatest([
    this.empleadosSubject.asObservable(),
    this.busquedaSubject.asObservable(),
    this.filtroSubject.asObservable(),
    this.paginaSubject.asObservable()
  ]).pipe(
    map(([empleados, busqueda, filtro, paginaActual]) => {
      const empleadosFiltrados = this.aplicarFiltros(
        empleados,
        busqueda,
        filtro
      );

      const totalPaginas = Math.max(
        1,
        Math.ceil(empleadosFiltrados.length / this.tamanioPagina)
      );

      const paginaSegura = Math.min(
        Math.max(1, paginaActual),
        totalPaginas
      );

      const inicio = (paginaSegura - 1) * this.tamanioPagina;
      const fin = inicio + this.tamanioPagina;

      const empleadosPagina = empleadosFiltrados.slice(inicio, fin);

      const paginas = Array.from(
        { length: totalPaginas },
        (_, index) => index + 1
      );

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
    }),
    shareReplay({
      bufferSize: 1,
      refCount: false
    })
  );

  constructor() {
    void this.cargarEmpleados();
  }

  async cargarEmpleados(): Promise<void> {
    try {
      const empleados = await this.dao.obtenerEmpleadosUnaVez();
      const empleadosConCodigo = await this.normalizarCodigosEmpleados(empleados);

      const empleadosVista = empleadosConCodigo
        .filter((empleado) => empleado.eliminado !== true)
        .map((empleado) => this.mapearEmpleadoVista(empleado))
        .sort((a, b) => {
          const nombreA = a.nombreCompleto || '';
          const nombreB = b.nombreCompleto || '';

          return nombreA.localeCompare(nombreB);
        });

      this.zone.run(() => {
        this.empleadosSubject.next(empleadosVista);
      });
    } catch (error) {
      console.error('[EmpleadoService] Error al cargar empleados:', error);

      this.zone.run(() => {
        this.empleadosSubject.next([]);
      });
    }
  }

  refrescarVista(): Promise<void> {
    return this.cargarEmpleados();
  }

  cambiarBusqueda(valor: string) {
    this.busquedaSubject.next(String(valor || '').trim().toLowerCase());
    this.paginaSubject.next(1);
  }

  cambiarFiltro(filtro: EstadoFiltroEmpleado) {
    this.filtroSubject.next(filtro);
    this.paginaSubject.next(1);
  }

  obtenerFiltroActual(): EstadoFiltroEmpleado {
    return this.filtroSubject.value;
  }

  paginaAnterior() {
    const paginaActual = this.paginaSubject.value;

    if (paginaActual > 1) {
      this.paginaSubject.next(paginaActual - 1);
    }
  }

  paginaSiguiente(totalPaginas: number) {
    const paginaActual = this.paginaSubject.value;

    if (paginaActual < totalPaginas) {
      this.paginaSubject.next(paginaActual + 1);
    }
  }

  irPagina(pagina: number) {
    if (pagina >= 1) {
      this.paginaSubject.next(pagina);
    }
  }

  async crearEmpleado(data: CrearEmpleadoData): Promise<void> {
    const usuario = this.normalizarUsuario(data.usuario);

    if (!usuario) {
      throw new Error('usuario-vacio');
    }

    if (await this.dao.existeUsuario(usuario)) {
      throw new Error('usuario-duplicado');
    }

    if (await this.dao.existeDni(data.dni)) {
      throw new Error('dni-duplicado');
    }

    const correoAuth = this.generarCorreoAuth(usuario);
    const nombreCompleto = `${data.nombres} ${data.apellidos}`.trim();
    const adminUid = this.authPrincipal.currentUser?.uid || '';

    const authSecundario = this.obtenerAuthSecundario();

    const credencial = await createUserWithEmailAndPassword(
      authSecundario,
      correoAuth,
      data.password
    );

    const codigoEmpleado = this.generarCodigoEmpleado(
      credencial.user.uid,
      nombreCompleto
    );

    const empleado: Empleado = {
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
      cargo: data.cargo || 'Personal operativo',

      rol: 'empleado',

      habilitado: true,
      activo: true,
      estado: true,
      eliminado: false,

      fotoUrl: String(data.fotoUrl || '').trim(),

      creadoPorUid: adminUid
    };

    let perfilCreado = false;

    try {
      await this.dao.crearPerfilEmpleado(
        credencial.user.uid,
        empleado
      );

      perfilCreado = true;

      await this.dao.registrarHistorial(
        'crear_empleado',
        `Se creó el usuario empleado ${nombreCompleto}.`,
        credencial.user.uid
      ).catch((error) => {
        console.warn('[EmpleadoService] No se pudo registrar historial:', error);
      });

      await this.cargarEmpleados();

      if (data.fotoArchivo) {
        void this.subirFotoEmpleadoSinBloquear(
          credencial.user.uid,
          data.fotoArchivo
        );
      }
    } catch (error) {
      console.error('[EmpleadoService] Error creando empleado:', error);

      if (!perfilCreado) {
        await deleteUser(credencial.user).catch((deleteError) => {
          console.warn(
            '[EmpleadoService] No se pudo eliminar usuario Auth huérfano:',
            deleteError
          );
        });
      }

      throw error;
    } finally {
      await signOut(authSecundario).catch(() => null);
    }
  }

  async editarEmpleado(data: EditarEmpleadoData): Promise<void> {
    const usuario = this.normalizarUsuario(data.usuario);

    if (!usuario) {
      throw new Error('usuario-vacio');
    }

    if (await this.dao.existeUsuario(usuario, data.uid)) {
      throw new Error('usuario-duplicado');
    }

    if (await this.dao.existeDni(data.dni, data.uid)) {
      throw new Error('dni-duplicado');
    }

    const nombreCompleto = `${data.nombres} ${data.apellidos}`.trim();

    const fotoUrlActual = String(data.fotoUrl || '').trim();

    await this.dao.editarEmpleado(data.uid, {
      nombres: data.nombres,
      apellidos: data.apellidos,
      nombreCompleto,
      usuario,
      dni: data.dni,
      telefono: data.telefono,
      cargo: data.cargo || 'Personal operativo',
      fotoUrl: fotoUrlActual,
      actualizadoPorUid: this.authPrincipal.currentUser?.uid || ''
    });

    await this.dao.registrarHistorial(
      'editar_empleado',
      `Se actualizó el registro del empleado ${nombreCompleto}.`,
      data.uid
    ).catch((error) => {
      console.warn('[EmpleadoService] No se pudo registrar historial:', error);
    });

    await this.cargarEmpleados();

    if (data.fotoArchivo) {
      void this.subirFotoEmpleadoSinBloquear(
        data.uid,
        data.fotoArchivo
      );
    }
  }

  async actualizarFotoEmpleado(
    uid: string,
    fotoUrl: string
  ): Promise<void> {
    await this.dao.actualizarFotoEmpleado(uid, fotoUrl);

    await this.dao.registrarHistorial(
      'actualizar_foto_empleado',
      'Se actualizó la foto del empleado.',
      uid
    ).catch(() => null);

    await this.cargarEmpleados();
  }

  private async subirFotoEmpleadoSinBloquear(
    uid: string,
    archivo: File
  ): Promise<void> {
    try {
      console.log('[EmpleadoService] Subiendo foto en segundo plano:', {
        uid,
        archivo: archivo.name
      });

      const fotoUrl = await this.storageService.subirFotoUsuarioEmpleado(
        uid,
        archivo
      );

      await this.dao.actualizarFotoEmpleado(
        uid,
        fotoUrl
      );

      await this.dao.registrarHistorial(
        'actualizar_foto_empleado',
        'Se actualizó la foto del empleado.',
        uid
      ).catch(() => null);

      await this.cargarEmpleados();

      console.log('[EmpleadoService] Foto guardada correctamente:', fotoUrl);
    } catch (error) {
      console.error(
        '[EmpleadoService] No se pudo subir la foto. El empleado queda registrado sin foto:',
        error
      );
    }
  }

  async cambiarEstadoEmpleado(
    uid: string,
    habilitado: boolean
  ): Promise<void> {
    await this.dao.cambiarEstadoEmpleado(uid, habilitado);

    await this.dao.registrarHistorial(
      habilitado ? 'habilitar_empleado' : 'deshabilitar_empleado',
      habilitado
        ? 'Se habilitó el acceso del empleado.'
        : 'Se deshabilitó el acceso del empleado.',
      uid
    ).catch((error) => {
      console.warn('[EmpleadoService] No se pudo registrar historial:', error);
    });

    await this.cargarEmpleados();
  }

  async eliminarEmpleado(
    uid: string,
    nombreCompleto: string
  ): Promise<void> {
    await this.dao.eliminarEmpleado(uid);

    await this.dao.registrarHistorial(
      'eliminar_empleado',
      `Se eliminó el registro operativo del empleado ${nombreCompleto}.`,
      uid
    ).catch((error) => {
      console.warn('[EmpleadoService] No se pudo registrar historial:', error);
    });

    await this.cargarEmpleados();
  }

  normalizarUsuario(valor: string): string {
    return String(valor || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9._-]/g, '');
  }

  private generarCorreoAuth(usuario: string): string {
    return `${usuario}@${this.dominioAuth}`;
  }

  private obtenerAuthSecundario() {
    const nombreAppSecundaria = 'empleado-creator-app';

    const appSecundaria = getApps().some(
      (app) => app.name === nombreAppSecundaria
    )
      ? getApp(nombreAppSecundaria)
      : initializeApp(getApp().options, nombreAppSecundaria);

    return getAuth(appSecundaria);
  }

  private async normalizarCodigosEmpleados(
    empleados: Empleado[]
  ): Promise<Empleado[]> {
    const salida: Empleado[] = [];

    for (const empleado of empleados) {
      const uid = empleado.uid || empleado.id || '';

      const nombreCompleto =
        empleado.nombreCompleto ||
        `${empleado.nombres || ''} ${empleado.apellidos || ''}`.trim() ||
        empleado.usuario ||
        'Empleado';

      const codigoEmpleado = this.obtenerCodigoEmpleado(
        empleado,
        uid,
        nombreCompleto
      );

      if (uid && !empleado.codigoEmpleado) {
        try {
          await this.dao.guardarCodigoEmpleado(uid, codigoEmpleado);
        } catch (error) {
          console.warn('[EmpleadoService] No se pudo guardar codigoEmpleado:', error);
        }
      }

      salida.push({
        ...empleado,
        codigoEmpleado
      });
    }

    return salida;
  }

  private aplicarFiltros(
    empleados: EmpleadoVista[],
    busqueda: string,
    filtro: EstadoFiltroEmpleado
  ): EmpleadoVista[] {
    let resultado = [...empleados];

    if (filtro === 'habilitados') {
      resultado = resultado.filter((empleado) => empleado.habilitado);
    }

    if (filtro === 'deshabilitados') {
      resultado = resultado.filter((empleado) => !empleado.habilitado);
    }

    const termino = String(busqueda || '').trim().toLowerCase();

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
        ]
          .join(' ')
          .toLowerCase();

        return textoBusqueda.includes(termino);
      });
    }

    return resultado;
  }

  private mapearEmpleadoVista(empleado: Empleado): EmpleadoVista {
    const nombres = empleado.nombres || '';
    const apellidos = empleado.apellidos || '';

    const nombreCompleto =
      empleado.nombreCompleto ||
      `${nombres} ${apellidos}`.trim() ||
      'Empleado sin nombre';

    const uid = empleado.uid || empleado.id || '';

    const codigoEmpleadoTexto = this.obtenerCodigoEmpleado(
      empleado,
      uid,
      nombreCompleto
    );

    const iniciales = this.obtenerIniciales(nombres, apellidos);

    return {
      ...empleado,
      uid,
      codigoEmpleado: empleado.codigoEmpleado || codigoEmpleadoTexto,
      codigoEmpleadoTexto,
      nombreCompleto,
      iniciales,
      cargoTexto: empleado.cargo || 'Personal operativo',
      habilitado: empleado.habilitado !== false,
      activo: empleado.activo !== false,
      estado: empleado.estado !== false,
      eliminado: empleado.eliminado === true,
      fotoUrl: empleado.fotoUrl || '',
      tieneFoto: !!empleado.fotoUrl
    };
  }

  private obtenerIniciales(
    nombres: string,
    apellidos: string
  ): string {
    const primeraLetraNombre = nombres.trim().charAt(0);
    const primeraLetraApellido = apellidos.trim().charAt(0);

    const iniciales = `${primeraLetraNombre}${primeraLetraApellido}`
      .toUpperCase();

    return iniciales || 'EM';
  }

  private obtenerCodigoEmpleado(
    empleado: Empleado,
    uid: string,
    nombre: string
  ): string {
    const codigoDirecto = String(
      empleado.codigoEmpleado ||
      ''
    ).trim();

    if (/^E-\d{3,6}$/i.test(codigoDirecto)) {
      return codigoDirecto.toUpperCase();
    }

    const textoBase = String(
      uid ||
      empleado.usuario ||
      empleado.correo ||
      nombre ||
      'empleado'
    ).trim();

    return this.generarCodigoEmpleado(textoBase, nombre);
  }

  private generarCodigoEmpleado(
    textoBase: string,
    nombre: string
  ): string {
    const base = `${textoBase}-${nombre || ''}`.trim();

    let hash = 0;

    for (let i = 0; i < base.length; i++) {
      hash = ((hash << 5) - hash) + base.charCodeAt(i);
      hash |= 0;
    }

    const numero = Math.abs(hash) % 100000;

    return 'E-' + String(numero).padStart(5, '0');
  }
}