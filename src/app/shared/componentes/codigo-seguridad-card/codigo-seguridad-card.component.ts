// src/app/shared/componentes/codigo-seguridad-card/codigo-seguridad-card.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TipoCodigoSeguridad } from '../../../modelos/codigo-seguridad';

@Component({
  selector: 'app-codigo-seguridad-card',
  templateUrl: './codigo-seguridad-card.component.html',
  styleUrls: ['./codigo-seguridad-card.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class CodigoSeguridadCardComponent {
  @Input() tipo: TipoCodigoSeguridad = 'cliente';
  @Input() titulo = '';
  @Input() descripcion = '';
  @Input() codigo = '------';
  @Input() icono = 'shield-checkmark-outline';
  @Input() color: 'primary' | 'warning' = 'primary';

  @Output() copiar = new EventEmitter<void>();
  @Output() generarNuevo = new EventEmitter<void>();

  get codigoSeparado(): string[] {
    return String(this.codigo || '------')
      .padEnd(6, '-')
      .slice(0, 6)
      .split('');
  }

  copiarCodigo() {
    this.copiar.emit();
  }

  generar() {
    this.generarNuevo.emit();
  }
}

