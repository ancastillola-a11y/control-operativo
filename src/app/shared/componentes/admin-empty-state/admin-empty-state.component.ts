// src/app/shared/componentes/admin-empty-state/admin-empty-state.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-admin-empty-state',
  templateUrl: './admin-empty-state.component.html',
  styleUrls: ['./admin-empty-state.component.css'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class AdminEmptyStateComponent {
  @Input() icono = 'information-circle-outline';
  @Input() titulo = 'Sin informaciÃ³n';
  @Input() descripcion = '';
  @Input() botonTexto = '';
  @Input() botonIcono = 'add-outline';

  @Output() botonClick = new EventEmitter<void>();

  get mostrarBoton(): boolean {
    return this.botonTexto.trim().length > 0;
  }

  emitirClick() {
    this.botonClick.emit();
  }
}

