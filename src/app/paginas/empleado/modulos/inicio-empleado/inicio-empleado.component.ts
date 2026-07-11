//app/paginas/empleado/modulos/inicio-empleado/inicio-empleado.component.ts
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-inicio-empleado',
  standalone: true,
  template: ''
})
export class InicioEmpleadoComponent {
  @Input() vm: any = null;

  @Output() abrirTrabajo =
    new EventEmitter<any>();

  @Output() irDevoluciones =
    new EventEmitter<void>();
}