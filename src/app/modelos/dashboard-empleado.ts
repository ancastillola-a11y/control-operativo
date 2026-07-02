// src/app/modelos/dashboard-empleado.ts
import { Empleado } from './empleado';

import {
  EstadoTrabajo,
  Trabajo
} from './trabajo';

export interface DashboardEmpleadoUsuario extends Empleado {
  uid: string;
  nombreCompleto: string;
  iniciales: string;
  cargoTexto: string;
  fotoUrl: string;
  accesoValido: boolean;
}

export interface DashboardTrabajoEmpleado extends Trabajo {
  uid: string;
  id?: string;

  codigoTrabajo: string;

  estado: EstadoTrabajo;
  estadoTexto: string;
  estadoClase: string;

  fechaHoraTexto: string;
  subtotalTexto: string;
  direccionTexto: string;
  materialesTexto: string;

  puedeMarcarEnCamino: boolean;
  puedeIniciar: boolean;
  puedeFinalizar: boolean;

  tieneTelefono: boolean;
  tieneMapa: boolean;
}

export interface DashboardEmpleadoViewModel {
  empleado: DashboardEmpleadoUsuario;

  trabajos: DashboardTrabajoEmpleado[];
  trabajosPendientes: DashboardTrabajoEmpleado[];
  trabajosEnCamino: DashboardTrabajoEmpleado[];
  trabajosEnProceso: DashboardTrabajoEmpleado[];
  trabajosFinalizados: DashboardTrabajoEmpleado[];

  trabajoActual: DashboardTrabajoEmpleado | null;

  totalTrabajos: number;
  totalPendientes: number;
  totalEnCamino: number;
  totalEnProceso: number;
  totalFinalizados: number;
}