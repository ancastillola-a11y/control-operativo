// src/app/procesos/reporte-empleados.service.ts
import { Injectable, inject } from '@angular/core';

import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of
} from 'rxjs';

import {
  catchError,
  map,
  shareReplay
} from 'rxjs/operators';

import { ReporteEmpleadosDAO } from '../dao/reporte-empleados.dao';

import {
  FiltroReporteEmpleados,
  ReporteEmpleadoRanking,
  ReporteEmpleadosResumen,
  ReporteEmpleadosVM,
  ReporteEmpleadoVista
} from '../modelos/reporte-empleados';

interface EmpleadoAgregado {
  key: string;
  empleado: any;
  nombre: string;
  cargo: string;
  correo: string;
  telefono: string;
  totalTrabajos: number;
  pendientes: number;
  enCamino: number;
  enProceso: number;
  finalizados: number;
  cancelados: number;
  ultimoTrabajo: Date | null;
}

interface EmpleadoAsignadoKey {
  key: string;
  nombre: string;
  correo: string;
  usuario: string;
  numero: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReporteEmpleadosService {
  private dao = inject(ReporteEmpleadosDAO);

  private filtroSubject = new BehaviorSubject<FiltroReporteEmpleados>('todos');
  private fechaInicioSubject = new BehaviorSubject<string>('');
  private fechaFinSubject = new BehaviorSubject<string>('');

  vm$: Observable<ReporteEmpleadosVM> = combineLatest([
    this.dao.escucharEmpleados().pipe(catchError(() => of([]))),
    this.dao.escucharUsuarios().pipe(catchError(() => of([]))),
    this.dao.escucharTrabajos().pipe(catchError(() => of([]))),
    this.filtroSubject.asObservable(),
    this.fechaInicioSubject.asObservable(),
    this.fechaFinSubject.asObservable()
  ]).pipe(
    map(([empleados, usuarios, trabajos, filtro, fechaInicio, fechaFin]) => {
      const empleadosBase = this.unificarEmpleadosConUsuarios(
        empleados,
        usuarios
      );

      const empleadosVista = this.mapearEmpleados(
        empleadosBase,
        trabajos,
        fechaInicio,
        fechaFin
      );

      const empleadosFiltrados = this.filtrarEmpleados(
        empleadosVista,
        filtro
      );

      const resumen = this.calcularResumen(empleadosFiltrados);

      return {
        filtro,
        fechaInicio,
        fechaFin,
        resumen,
        empleados: empleadosVista,
        empleadosFiltrados,
        rankingProductividad: this.calcularRankingProductividad(empleadosFiltrados),
        totalFiltrados: empleadosFiltrados.length
      };
    }),
    shareReplay({
      bufferSize: 1,
      refCount: true
    })
  );

  cambiarFiltro(filtro: FiltroReporteEmpleados) {
    this.filtroSubject.next(filtro);
  }

  cambiarFechaInicio(fecha: string) {
    this.fechaInicioSubject.next(fecha || '');
  }

  cambiarFechaFin(fecha: string) {
    this.fechaFinSubject.next(fecha || '');
  }

  limpiarRangoFechas() {
    this.fechaInicioSubject.next('');
    this.fechaFinSubject.next('');
  }

  private unificarEmpleadosConUsuarios(
    empleados: any[],
    usuarios: any[]
  ): any[] {
    const mapa = new Map<string, any>();

    (usuarios || [])
      .filter((usuario) => this.esUsuarioEmpleado(usuario))
      .forEach((usuario) => {
        const key = String(
          usuario?.uid ||
          usuario?.id ||
          usuario?.correo ||
          usuario?.email ||
          usuario?.usuario ||
          ''
        ).trim();

        if (!key) {
          return;
        }

        const nombreCompleto = String(
          usuario?.nombreCompleto ||
          [
            usuario?.nombres,
            usuario?.apellidos
          ].filter(Boolean).join(' ') ||
          usuario?.usuario ||
          usuario?.correo ||
          'Empleado'
        ).trim();

        mapa.set(key, {
          ...usuario,
          uid: usuario?.uid || usuario?.id || key,
          id: usuario?.id || usuario?.uid || key,
          nombreCompleto,
          telefono:
            usuario?.telefono ||
            usuario?.celular ||
            usuario?.numero ||
            '',
          celular:
            usuario?.celular ||
            usuario?.telefono ||
            '',
          correo:
            usuario?.correo ||
            usuario?.email ||
            usuario?.correoAuth ||
            '',
          cargo:
            usuario?.cargo ||
            usuario?.rol ||
            'Empleado',
          origenReporte: 'usuarios'
        });
      });

    (empleados || []).forEach((empleado) => {
      const key = String(
        empleado?.uid ||
        empleado?.id ||
        empleado?.usuarioUid ||
        empleado?.correo ||
        empleado?.email ||
        empleado?.usuario ||
        ''
      ).trim();

      if (!key) {
        return;
      }

      const usuarioBase = mapa.get(key) || {};

      const nombreCompleto = String(
        empleado?.nombreCompleto ||
        empleado?.nombresCompletos ||
        usuarioBase?.nombreCompleto ||
        [
          empleado?.nombres,
          empleado?.apellidos
        ].filter(Boolean).join(' ') ||
        empleado?.usuario ||
        usuarioBase?.usuario ||
        'Empleado'
      ).trim();

      mapa.set(key, {
        ...usuarioBase,
        ...empleado,
        uid: empleado?.uid || empleado?.id || usuarioBase?.uid || key,
        id: empleado?.id || empleado?.uid || usuarioBase?.id || key,
        usuarioUid: empleado?.usuarioUid || usuarioBase?.usuarioUid || key,
        nombreCompleto,
        telefono:
          empleado?.telefono ||
          empleado?.celular ||
          empleado?.numero ||
          usuarioBase?.telefono ||
          '',
        celular:
          empleado?.celular ||
          empleado?.telefono ||
          usuarioBase?.celular ||
          '',
        correo:
          empleado?.correo ||
          empleado?.email ||
          usuarioBase?.correo ||
          usuarioBase?.email ||
          '',
        cargo:
          empleado?.cargo ||
          empleado?.puesto ||
          usuarioBase?.cargo ||
          'Empleado',
        origenReporte: 'empleados'
      });
    });

    return Array.from(mapa.values());
  }

  private mapearEmpleados(
    empleados: any[],
    trabajos: any[],
    fechaInicio: string,
    fechaFin: string
  ): ReporteEmpleadoVista[] {
    const empleadosRegistrados = (empleados || []).filter((item) =>
      this.esRegistroNoEliminado(item)
    );

    const basePorKey = new Map<string, any>();
    const keyPorNombre = new Map<string, string>();
    const keyPorCorreo = new Map<string, string>();
    const keyPorUsuario = new Map<string, string>();
    const keyPorNumero = new Map<string, string>();
    const agregados = new Map<string, EmpleadoAgregado>();

    empleadosRegistrados.forEach((empleado) => {
      const key = this.obtenerKeyEmpleadoBase(empleado);

      if (!key) {
        return;
      }

      basePorKey.set(key, empleado);

      const nombreKey = this.normalizarTexto(this.obtenerNombreEmpleado(empleado));
      const correoKey = this.normalizarTexto(
        empleado?.correo ||
        empleado?.email ||
        empleado?.correoAuth
      );
      const usuarioKey = this.normalizarTexto(empleado?.usuario);
      const numeroKey = this.normalizarNumero(this.obtenerNumeroEmpleado(empleado));

      if (nombreKey) {
        keyPorNombre.set(nombreKey, key);
      }

      if (correoKey) {
        keyPorCorreo.set(correoKey, key);
      }

      if (usuarioKey) {
        keyPorUsuario.set(usuarioKey, key);
      }

      if (numeroKey) {
        keyPorNumero.set(numeroKey, key);
      }

      agregados.set(key, this.crearAgregadoEmpleado(key, empleado, ''));
    });

    const trabajosFiltrados = this.filtrarTrabajosPorFecha(
      (trabajos || []).filter((item) => this.esRegistroNoEliminado(item)),
      fechaInicio,
      fechaFin
    );

    trabajosFiltrados.forEach((trabajo) => {
      const asignados = this.obtenerKeysEmpleadosTrabajo(
        trabajo,
        basePorKey,
        keyPorNombre,
        keyPorCorreo,
        keyPorUsuario,
        keyPorNumero
      );

      const estado = this.normalizarEstadoTrabajo(
        trabajo?.estado || trabajo?.estadoTrabajo
      );

      const fechaTrabajo = this.obtenerFechaTrabajo(trabajo);

      asignados.forEach((asignado) => {
        if (!asignado.key) {
          return;
        }

        if (!agregados.has(asignado.key)) {
          const empleadoInferido = {
            uid: asignado.key,
            nombreCompleto:
              asignado.nombre ||
              asignado.usuario ||
              asignado.correo ||
              asignado.numero ||
              'Empleado',
            correo: asignado.correo || '',
            usuario: asignado.usuario || '',
            telefono: asignado.numero || '',
            cargo: 'Sin ficha',
            activo: true,
            habilitado: true,
            inferido: true
          };

          agregados.set(
            asignado.key,
            this.crearAgregadoEmpleado(
              asignado.key,
              empleadoInferido,
              asignado.nombre
            )
          );
        }

        const actual = agregados.get(asignado.key)!;

        actual.totalTrabajos += 1;

        if (estado === 'pendiente') {
          actual.pendientes += 1;
        } else if (estado === 'en_camino') {
          actual.enCamino += 1;
        } else if (estado === 'en_proceso') {
          actual.enProceso += 1;
        } else if (estado === 'finalizado') {
          actual.finalizados += 1;
        } else if (estado === 'cancelado') {
          actual.cancelados += 1;
        }

        if (fechaTrabajo) {
          if (
            !actual.ultimoTrabajo ||
            fechaTrabajo.getTime() > actual.ultimoTrabajo.getTime()
          ) {
            actual.ultimoTrabajo = fechaTrabajo;
          }
        }
      });
    });

    return Array.from(agregados.values())
      .map((item) => {
        const activo = this.esEmpleadoActivo(item.empleado);
        const estado = activo ? 'activo' : 'inactivo';

        const porcentajeFinalizacion = item.totalTrabajos > 0
          ? Math.round((item.finalizados / item.totalTrabajos) * 100)
          : 0;

        return {
          uid: String(item.empleado?.uid || item.empleado?.id || item.key),
          codigo: this.obtenerCodigoEmpleado(item.empleado, item.key, item.nombre),
          nombre: item.nombre,
          cargo: item.cargo,
          correo: item.correo,
          telefono: item.telefono,

          estado,
          estadoTexto: activo ? 'Activo' : 'Inactivo',
          estadoClase: activo ? 'success' : 'danger',

          totalTrabajos: item.totalTrabajos,
          pendientes: item.pendientes,
          enCamino: item.enCamino,
          enProceso: item.enProceso,
          finalizados: item.finalizados,
          cancelados: item.cancelados,

          porcentajeFinalizacion,

          fechaIngresoTexto: this.formatearFecha(
            this.convertirFecha(
              item.empleado?.fechaIngreso ||
              item.empleado?.createdAt ||
              item.empleado?.creadoEn ||
              item.empleado?.fechaCreacion
            )
          ),

          ultimoTrabajoTexto: this.formatearFecha(item.ultimoTrabajo)
        };
      })
      .sort((a, b) => b.totalTrabajos - a.totalTrabajos);
  }

  private crearAgregadoEmpleado(
    key: string,
    empleado: any,
    nombreAlternativo: string
  ): EmpleadoAgregado {
    const numero = this.obtenerNumeroEmpleado(empleado);

    return {
      key,
      empleado,
      nombre: this.obtenerNombreEmpleado(empleado) || nombreAlternativo || 'Empleado',
      cargo: String(
        empleado?.cargo ||
        empleado?.puesto ||
        empleado?.rolOperativo ||
        empleado?.rol ||
        empleado?.especialidad ||
        'Sin cargo'
      ).trim(),
      correo: String(
        empleado?.correo ||
        empleado?.email ||
        empleado?.correoAuth ||
        'Sin correo'
      ).trim(),
      telefono: numero || 'Sin número',
      totalTrabajos: 0,
      pendientes: 0,
      enCamino: 0,
      enProceso: 0,
      finalizados: 0,
      cancelados: 0,
      ultimoTrabajo: null
    };
  }

  private obtenerKeysEmpleadosTrabajo(
    trabajo: any,
    basePorKey: Map<string, any>,
    keyPorNombre: Map<string, string>,
    keyPorCorreo: Map<string, string>,
    keyPorUsuario: Map<string, string>,
    keyPorNumero: Map<string, string>
  ): EmpleadoAsignadoKey[] {
    const asignadosRaw = this.obtenerEmpleadosRawTrabajo(trabajo);
    const resultado = new Map<string, EmpleadoAsignadoKey>();

    asignadosRaw.forEach((asignado) => {
      const item = this.obtenerKeyEmpleadoAsignado(
        asignado,
        basePorKey,
        keyPorNombre,
        keyPorCorreo,
        keyPorUsuario,
        keyPorNumero
      );

      if (item?.key) {
        resultado.set(item.key, item);
      }
    });

    return Array.from(resultado.values());
  }

  private obtenerEmpleadosRawTrabajo(trabajo: any): any[] {
    if (!trabajo) {
      return [];
    }

    const resultado: any[] = [];

    const colecciones = [
      trabajo?.empleadosAsignados,
      trabajo?.empleados,
      trabajo?.trabajadores,
      trabajo?.personalAsignado,
      trabajo?.cuadrilla
    ];

    colecciones.forEach((raw) => {
      if (Array.isArray(raw)) {
        resultado.push(...raw);
      } else if (typeof raw === 'object' && raw !== null) {
        resultado.push(...Object.values(raw));
      }
    });

    const individuales = [
      trabajo?.empleado,
      trabajo?.trabajador,
      trabajo?.responsable,
      trabajo?.empleadoAsignado
    ];

    individuales.forEach((item) => {
      if (item) {
        resultado.push(item);
      }
    });

    const ids = [
      trabajo?.empleadoUid,
      trabajo?.empleadoId,
      trabajo?.trabajadorUid,
      trabajo?.trabajadorId,
      trabajo?.responsableUid,
      trabajo?.responsableId
    ];

    ids.forEach((id) => {
      if (id) {
        resultado.push({ uid: id });
      }
    });

    if (trabajo?.empleadoNombre || trabajo?.nombreEmpleado) {
      resultado.push({
        nombreCompleto: trabajo?.empleadoNombre || trabajo?.nombreEmpleado
      });
    }

    return resultado;
  }

  private obtenerKeyEmpleadoAsignado(
    asignado: any,
    basePorKey: Map<string, any>,
    keyPorNombre: Map<string, string>,
    keyPorCorreo: Map<string, string>,
    keyPorUsuario: Map<string, string>,
    keyPorNumero: Map<string, string>
  ): EmpleadoAsignadoKey | null {
    if (!asignado) {
      return null;
    }

    if (typeof asignado === 'string') {
      const texto = asignado.trim();

      if (!texto) {
        return null;
      }

      if (basePorKey.has(texto)) {
        const empleadoBase = basePorKey.get(texto);

        return {
          key: texto,
          nombre: this.obtenerNombreEmpleado(empleadoBase),
          correo: String(empleadoBase?.correo || empleadoBase?.email || ''),
          usuario: String(empleadoBase?.usuario || ''),
          numero: this.obtenerNumeroEmpleado(empleadoBase)
        };
      }

      const textoKey = this.normalizarTexto(texto);
      const numeroKey = this.normalizarNumero(texto);

      if (textoKey && keyPorUsuario.has(textoKey)) {
        const key = keyPorUsuario.get(textoKey)!;
        const empleadoBase = basePorKey.get(key);

        return {
          key,
          nombre: this.obtenerNombreEmpleado(empleadoBase),
          correo: String(empleadoBase?.correo || empleadoBase?.email || ''),
          usuario: texto,
          numero: this.obtenerNumeroEmpleado(empleadoBase)
        };
      }

      if (textoKey && keyPorCorreo.has(textoKey)) {
        const key = keyPorCorreo.get(textoKey)!;
        const empleadoBase = basePorKey.get(key);

        return {
          key,
          nombre: this.obtenerNombreEmpleado(empleadoBase),
          correo: texto,
          usuario: String(empleadoBase?.usuario || ''),
          numero: this.obtenerNumeroEmpleado(empleadoBase)
        };
      }

      if (textoKey && keyPorNombre.has(textoKey)) {
        const key = keyPorNombre.get(textoKey)!;
        const empleadoBase = basePorKey.get(key);

        return {
          key,
          nombre: this.obtenerNombreEmpleado(empleadoBase),
          correo: String(empleadoBase?.correo || empleadoBase?.email || ''),
          usuario: String(empleadoBase?.usuario || ''),
          numero: this.obtenerNumeroEmpleado(empleadoBase)
        };
      }

      if (numeroKey && keyPorNumero.has(numeroKey)) {
        const key = keyPorNumero.get(numeroKey)!;
        const empleadoBase = basePorKey.get(key);

        return {
          key,
          nombre: this.obtenerNombreEmpleado(empleadoBase),
          correo: String(empleadoBase?.correo || empleadoBase?.email || ''),
          usuario: String(empleadoBase?.usuario || ''),
          numero: this.obtenerNumeroEmpleado(empleadoBase)
        };
      }

      return {
        key: textoKey || texto,
        nombre: texto.includes('@') ? 'Empleado' : texto,
        correo: texto.includes('@') ? texto : '',
        usuario: texto.includes('@') ? '' : texto,
        numero: numeroKey || ''
      };
    }

    const uid = String(
      asignado?.uid ||
      asignado?.id ||
      asignado?.empleadoUid ||
      asignado?.empleadoId ||
      asignado?.trabajadorUid ||
      asignado?.trabajadorId ||
      asignado?.usuarioUid ||
      ''
    ).trim();

    if (uid && basePorKey.has(uid)) {
      const empleadoBase = basePorKey.get(uid);

      return {
        key: uid,
        nombre: this.obtenerNombreEmpleado(empleadoBase),
        correo: String(empleadoBase?.correo || empleadoBase?.email || ''),
        usuario: String(empleadoBase?.usuario || ''),
        numero: this.obtenerNumeroEmpleado(empleadoBase)
      };
    }

    const usuario = String(
      asignado?.usuario ||
      asignado?.username ||
      asignado?.user ||
      ''
    ).trim();

    const usuarioKey = this.normalizarTexto(usuario);

    if (usuarioKey && keyPorUsuario.has(usuarioKey)) {
      const key = keyPorUsuario.get(usuarioKey)!;
      const empleadoBase = basePorKey.get(key);

      return {
        key,
        nombre: this.obtenerNombreEmpleado(empleadoBase),
        correo: String(empleadoBase?.correo || empleadoBase?.email || ''),
        usuario,
        numero: this.obtenerNumeroEmpleado(empleadoBase)
      };
    }

    const correo = String(
      asignado?.correo ||
      asignado?.email ||
      asignado?.empleadoCorreo ||
      ''
    ).trim();

    const correoKey = this.normalizarTexto(correo);

    if (correoKey && keyPorCorreo.has(correoKey)) {
      const key = keyPorCorreo.get(correoKey)!;
      const empleadoBase = basePorKey.get(key);

      return {
        key,
        nombre: this.obtenerNombreEmpleado(empleadoBase),
        correo,
        usuario: String(empleadoBase?.usuario || ''),
        numero: this.obtenerNumeroEmpleado(empleadoBase)
      };
    }

    const numero = this.obtenerNumeroEmpleado(asignado);
    const numeroKey = this.normalizarNumero(numero);

    if (numeroKey && keyPorNumero.has(numeroKey)) {
      const key = keyPorNumero.get(numeroKey)!;
      const empleadoBase = basePorKey.get(key);

      return {
        key,
        nombre: this.obtenerNombreEmpleado(empleadoBase),
        correo: String(empleadoBase?.correo || empleadoBase?.email || ''),
        usuario: String(empleadoBase?.usuario || ''),
        numero: this.obtenerNumeroEmpleado(empleadoBase)
      };
    }

    const nombre = String(
      asignado?.nombreCompleto ||
      asignado?.nombresCompletos ||
      asignado?.nombre ||
      asignado?.nombres ||
      asignado?.empleadoNombre ||
      asignado?.trabajadorNombre ||
      ''
    ).trim();

    const nombreKey = this.normalizarTexto(nombre);

    if (nombreKey && keyPorNombre.has(nombreKey)) {
      const key = keyPorNombre.get(nombreKey)!;
      const empleadoBase = basePorKey.get(key);

      return {
        key,
        nombre: this.obtenerNombreEmpleado(empleadoBase),
        correo: String(empleadoBase?.correo || empleadoBase?.email || ''),
        usuario: String(empleadoBase?.usuario || ''),
        numero: this.obtenerNumeroEmpleado(empleadoBase)
      };
    }

    return {
      key: uid || usuarioKey || correoKey || numeroKey || nombreKey,
      nombre: nombre || usuario || correo || numero || uid || 'Empleado',
      correo,
      usuario,
      numero
    };
  }

  private filtrarEmpleados(
    empleados: ReporteEmpleadoVista[],
    filtro: FiltroReporteEmpleados
  ): ReporteEmpleadoVista[] {
    if (filtro === 'todos') {
      return empleados;
    }

    if (filtro === 'activos') {
      return empleados.filter((item) => item.estado === 'activo');
    }

    if (filtro === 'inactivos') {
      return empleados.filter((item) => item.estado === 'inactivo');
    }

    if (filtro === 'con_trabajos') {
      return empleados.filter((item) => item.totalTrabajos > 0);
    }

    if (filtro === 'sin_trabajos') {
      return empleados.filter((item) => item.totalTrabajos === 0);
    }

    if (filtro === 'pendientes') {
      return empleados.filter((item) => item.pendientes > 0);
    }

    if (filtro === 'en_proceso') {
      return empleados.filter((item) =>
        item.enCamino > 0 || item.enProceso > 0
      );
    }

    if (filtro === 'finalizados') {
      return empleados.filter((item) => item.finalizados > 0);
    }

    return empleados;
  }

  private calcularResumen(
    empleados: ReporteEmpleadoVista[]
  ): ReporteEmpleadosResumen {
    const empleadosConTrabajos = empleados.filter((item) =>
      item.totalTrabajos > 0
    );

    const promedioFinalizacion = empleadosConTrabajos.length > 0
      ? Math.round(
          empleadosConTrabajos.reduce(
            (total, item) => total + item.porcentajeFinalizacion,
            0
          ) / empleadosConTrabajos.length
        )
      : 0;

    return {
      totalEmpleados: empleados.length,
      empleadosActivos: empleados.filter((item) => item.estado === 'activo').length,
      empleadosInactivos: empleados.filter((item) => item.estado === 'inactivo').length,
      empleadosConTrabajos: empleadosConTrabajos.length,
      empleadosSinTrabajos: empleados.filter((item) => item.totalTrabajos === 0).length,

      totalTrabajosAsignados: empleados.reduce((total, item) => total + item.totalTrabajos, 0),
      trabajosPendientes: empleados.reduce((total, item) => total + item.pendientes, 0),
      trabajosEnProceso: empleados.reduce((total, item) => total + item.enCamino + item.enProceso, 0),
      trabajosFinalizados: empleados.reduce((total, item) => total + item.finalizados, 0),
      trabajosCancelados: empleados.reduce((total, item) => total + item.cancelados, 0),

      promedioFinalizacion
    };
  }

  private calcularRankingProductividad(
    empleados: ReporteEmpleadoVista[]
  ): ReporteEmpleadoRanking[] {
    return [...empleados]
      .filter((item) => item.totalTrabajos > 0)
      .sort((a, b) => {
        if (b.finalizados !== a.finalizados) {
          return b.finalizados - a.finalizados;
        }

        return b.totalTrabajos - a.totalTrabajos;
      })
      .slice(0, 5)
      .map((item) => ({
        uid: item.uid,
        nombre: item.nombre,
        cargo: item.cargo,
        totalTrabajos: item.totalTrabajos,
        finalizados: item.finalizados,
        porcentajeFinalizacion: item.porcentajeFinalizacion
      }));
  }

  private filtrarTrabajosPorFecha(
    trabajos: any[],
    fechaInicio: string,
    fechaFin: string
  ): any[] {
    const inicio = this.convertirFechaInput(fechaInicio, false);
    const fin = this.convertirFechaInput(fechaFin, true);

    if (!inicio && !fin) {
      return trabajos;
    }

    return trabajos.filter((trabajo) => {
      const fecha = this.obtenerFechaTrabajo(trabajo);

      if (!fecha) {
        return false;
      }

      if (inicio && fecha.getTime() < inicio.getTime()) {
        return false;
      }

      if (fin && fecha.getTime() > fin.getTime()) {
        return false;
      }

      return true;
    });
  }

  private normalizarEstadoTrabajo(estado: any): string {
    const valor = String(estado || 'pendiente')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (
      valor === 'pendiente' ||
      valor === 'asignado' ||
      valor === 'registrado'
    ) {
      return 'pendiente';
    }

    if (
      valor === 'en camino' ||
      valor === 'en_camino' ||
      valor === 'encamino'
    ) {
      return 'en_camino';
    }

    if (
      valor === 'en proceso' ||
      valor === 'en_proceso' ||
      valor === 'proceso' ||
      valor === 'iniciado'
    ) {
      return 'en_proceso';
    }

    if (
      valor === 'finalizado' ||
      valor === 'cerrado' ||
      valor === 'terminado' ||
      valor === 'devolucion_pendiente' ||
      valor === 'devolucion pendiente' ||
      valor === 'devolucion_realizada' ||
      valor === 'devolucion realizada'
    ) {
      return 'finalizado';
    }

    if (
      valor === 'cancelado' ||
      valor === 'anulado'
    ) {
      return 'cancelado';
    }

    return valor || 'pendiente';
  }

  private obtenerFechaTrabajo(trabajo: any): Date | null {
    return this.convertirFecha(
      trabajo?.fechaProgramada ||
      trabajo?.fechaTrabajo ||
      trabajo?.fechaInicio ||
      trabajo?.fechaFinalizacion ||
      trabajo?.createdAt ||
      trabajo?.creadoEn ||
      trabajo?.fechaCreacion ||
      trabajo?.fecha ||
      trabajo?.updatedAt ||
      trabajo?.actualizadoEn
    );
  }

  private obtenerKeyEmpleadoBase(empleado: any): string {
    const uid = String(empleado?.uid || empleado?.id || '').trim();

    if (uid) {
      return uid;
    }

    const correo = this.normalizarTexto(
      empleado?.correo ||
      empleado?.email ||
      empleado?.correoAuth
    );

    if (correo) {
      return correo;
    }

    const usuario = this.normalizarTexto(empleado?.usuario);

    if (usuario) {
      return usuario;
    }

    return this.normalizarTexto(this.obtenerNombreEmpleado(empleado));
  }

  private obtenerNombreEmpleado(empleado: any): string {
    const nombresApellidos = String(
      [
        empleado?.nombres,
        empleado?.apellidos
      ]
        .filter(Boolean)
        .join(' ')
    ).trim();

    return String(
      empleado?.nombreCompleto ||
      empleado?.nombresCompletos ||
      empleado?.nombre ||
      nombresApellidos ||
      empleado?.usuario ||
      empleado?.correo ||
      empleado?.email ||
      'Empleado'
    ).trim();
  }

  private obtenerNumeroEmpleado(empleado: any): string {
    const valores = [
      empleado?.telefono,
      empleado?.celular,
      empleado?.numero,
      empleado?.numeroTelefono,
      empleado?.numeroCelular,
      empleado?.telefonoEmpleado,
      empleado?.celularEmpleado,
      empleado?.whatsapp,
      empleado?.phone,
      empleado?.phoneNumber,
      empleado?.movil,
      empleado?.mobile,
      empleado?.contacto,
      empleado?.datosContacto?.telefono,
      empleado?.datosContacto?.celular,
      empleado?.perfil?.telefono,
      empleado?.perfil?.celular
    ];

    for (const valor of valores) {
      const texto = String(valor ?? '').trim();

      if (
        texto &&
        texto.toLowerCase() !== 'undefined' &&
        texto.toLowerCase() !== 'null'
      ) {
        return texto;
      }
    }

    return '';
  }

  private obtenerCodigoEmpleado(
    empleado: any,
    key: string,
    nombre: string
  ): string {
    const codigoDirecto = String(
      empleado?.codigoEmpleado ||
      empleado?.codigo ||
      empleado?.numeroEmpleado ||
      empleado?.numero ||
      ''
    ).trim();

    if (/^E-\d{3,6}$/i.test(codigoDirecto)) {
      return codigoDirecto.toUpperCase();
    }

    if (/^\d{1,6}$/.test(codigoDirecto)) {
      return 'E-' + codigoDirecto.padStart(5, '0');
    }

    const textoBase = String(
      empleado?.uid ||
      empleado?.id ||
      key ||
      codigoDirecto ||
      nombre ||
      'empleado'
    ).trim();

    const numero = this.generarNumeroDesdeTexto(textoBase);

    return 'E-' + String(numero).padStart(5, '0');
  }

  private generarNumeroDesdeTexto(texto: string): number {
    let hash = 0;

    for (let i = 0; i < texto.length; i++) {
      hash = ((hash << 5) - hash) + texto.charCodeAt(i);
      hash |= 0;
    }

    return Math.abs(hash) % 100000;
  }

  private esUsuarioEmpleado(usuario: any): boolean {
    const rol = String(usuario?.rol || '').trim().toLowerCase();

    return rol === 'empleado' ||
      rol === 'trabajador' ||
      rol === 'tecnico' ||
      rol === 'técnico';
  }

  private esRegistroNoEliminado(item: any): boolean {
    if (!item) {
      return false;
    }

    if (item?.eliminado === true || item?.eliminada === true) {
      return false;
    }

    const estado = String(item?.estado || '').trim().toLowerCase();

    if (estado === 'eliminado') {
      return false;
    }

    return true;
  }

  private esEmpleadoActivo(empleado: any): boolean {
    if (!this.esRegistroNoEliminado(empleado)) {
      return false;
    }

    if (
      empleado?.activo === false ||
      empleado?.habilitado === false ||
      empleado?.estado === false
    ) {
      return false;
    }

    const estado = String(empleado?.estado || '').trim().toLowerCase();

    if (
      estado === 'inactivo' ||
      estado === 'suspendido' ||
      estado === 'deshabilitado'
    ) {
      return false;
    }

    return true;
  }

  private convertirFechaInput(
    valor: string,
    finDelDia: boolean
  ): Date | null {
    if (!valor) {
      return null;
    }

    const partes = valor.split('-');

    if (partes.length !== 3) {
      return null;
    }

    const anio = Number(partes[0]);
    const mes = Number(partes[1]);
    const dia = Number(partes[2]);

    if (!anio || !mes || !dia) {
      return null;
    }

    const fecha = new Date(anio, mes - 1, dia);

    if (finDelDia) {
      fecha.setHours(23, 59, 59, 999);
    } else {
      fecha.setHours(0, 0, 0, 0);
    }

    return fecha;
  }

  private convertirFecha(valor: any): Date | null {
    if (!valor) {
      return null;
    }

    if (valor instanceof Date && !Number.isNaN(valor.getTime())) {
      return valor;
    }

    if (typeof valor?.toDate === 'function') {
      const fecha = valor.toDate();

      if (fecha instanceof Date && !Number.isNaN(fecha.getTime())) {
        return fecha;
      }
    }

    if (typeof valor?.seconds === 'number') {
      const fecha = new Date(valor.seconds * 1000);

      if (!Number.isNaN(fecha.getTime())) {
        return fecha;
      }
    }

    if (typeof valor === 'string') {
      if (/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
        const [anio, mes, dia] = valor.split('-').map(Number);
        return new Date(anio, mes - 1, dia);
      }

      const fecha = new Date(valor);

      if (!Number.isNaN(fecha.getTime())) {
        return fecha;
      }
    }

    return null;
  }

  private formatearFecha(fecha: Date | null): string {
    if (!fecha) {
      return 'Sin registro';
    }

    return fecha.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  private normalizarNumero(valor: any): string {
    return String(valor || '')
      .replace(/\D/g, '')
      .trim();
  }

  private normalizarTexto(valor: any): string {
    return String(valor || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}