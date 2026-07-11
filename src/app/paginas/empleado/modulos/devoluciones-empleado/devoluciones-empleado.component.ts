//app/paginas/empleado/modulos/devoluciones-empleado/devoluciones-empleado.component.ts
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-devoluciones-empleado',
  standalone: true,
  template: ''
})
export class DevolucionesEmpleadoComponent {
  @Input() vm: any = null;
  @Input() trabajoLocal: any = null;

  @Output() volver =
    new EventEmitter<void>();

  @Output() abrirTrabajo =
    new EventEmitter<any>();
}
