//app/paginas/empleado/modulos/materiales-posesion-empleado/materiales-posesion-empleado.component.ts
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-materiales-posesion-empleado',
  standalone: true,
  template: ''
})
export class MaterialesPosesionEmpleadoComponent {
  @Input() trabajo: any = null;
  @Input() empleado: any = null;
  @Input() materialesUsados: number[] = [];
  @Input() procesando = false;

  @Output() volver =
    new EventEmitter<any>();

  @Output() registrarDevolucion =
    new EventEmitter<any>();
}