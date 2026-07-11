//app/paginas/empleado/modulos/cambio-estado-empleado/cambio-estado-empleado.component.ts
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-cambio-estado-empleado',
  standalone: true,
  template: ''
})
export class CambioEstadoEmpleadoComponent {
  @Input() trabajo: any = null;
  @Input() empleado: any = null;
  @Input() estadoDestino: any = 'en_camino';
  @Input() procesando = false;

  @Output() volver =
    new EventEmitter<any>();

  @Output() confirmar =
    new EventEmitter<any>();

  @Output() abrirMapa =
    new EventEmitter<any>();
}