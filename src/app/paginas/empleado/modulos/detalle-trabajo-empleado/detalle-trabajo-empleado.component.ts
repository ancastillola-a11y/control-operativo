//app/src/app/paginas/empleado/modulos/detalle-trabajo-empleado/detalle-trabajo-empleado.component.ts
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-detalle-trabajo-empleado',
  standalone: true,
  template: ''
})
export class DetalleTrabajoEmpleadoComponent {
  @Input() trabajo: any = null;

  @Output() volver =
    new EventEmitter<any>();

  @Output() llamar =
    new EventEmitter<any>();

  @Output() ruta =
    new EventEmitter<any>();

  @Output() codigo =
    new EventEmitter<any>();

  @Output() enCamino =
    new EventEmitter<any>();

  @Output() enProceso =
    new EventEmitter<any>();

  @Output() finalizar =
    new EventEmitter<any>();
}