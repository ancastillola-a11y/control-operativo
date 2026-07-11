//app/paginas/empleado/modulos/codigo-verificacion-empleado/codigo-verificacion-empleado.component.ts
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-codigo-verificacion-empleado',
  standalone: true,
  template: ''
})
export class CodigoVerificacionEmpleadoComponent {
  @Input() trabajo: any = null;

  @Output() volver =
    new EventEmitter<any>();

  @Output() copiarCodigo =
    new EventEmitter<any>();
}