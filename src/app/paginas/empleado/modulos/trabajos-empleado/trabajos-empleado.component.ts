// src/app/paginas/empleado/modulos/trabajos-empleado/trabajos-empleado.component.ts

import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  DashboardEmpleadoViewModel,
  DashboardTrabajoEmpleado
} from '../../../../modelos/dashboard-empleado';

@Component({
  selector: 'app-trabajos-empleado',
  standalone: true,
  template: ''
})
export class TrabajosEmpleadoComponent {
  @Input() vm: DashboardEmpleadoViewModel | null = null;

  @Input() filtro:
    | 'pendientes'
    | 'proceso'
    | 'finalizadas'
    | 'todos' = 'pendientes';

  @Output() cambiarFiltro = new EventEmitter<
    'pendientes' |
    'proceso' |
    'finalizadas' |
    'todos'
  >();

  @Output() abrirTrabajo =
    new EventEmitter<DashboardTrabajoEmpleado>();
}