//src/app/paginas/empleado/modulos/finalizar-trabajo-empleado/finalizar-trabajo-empleado.component.ts
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-finalizar-trabajo-empleado',
  standalone: true,
  template: ''
})
export class FinalizarTrabajoEmpleadoComponent {
  @Input() trabajo: any = null;
  @Input() empleado: any = null;
  @Input() procesando = false;

  @Output() volver =
    new EventEmitter<any>();

  @Output() finalizar =
    new EventEmitter<any>();
}