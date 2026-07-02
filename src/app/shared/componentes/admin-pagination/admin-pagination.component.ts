// src/app/shared/componentes/admin-pagination/admin-pagination.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-admin-pagination',
  templateUrl: './admin-pagination.component.html',
  styleUrls: ['./admin-pagination.component.css'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class AdminPaginationComponent {
  @Input() paginaActual = 1;
  @Input() totalPaginas = 1;
  @Input() paginas: number[] = [];

  @Output() anterior = new EventEmitter<void>();
  @Output() siguiente = new EventEmitter<void>();
  @Output() irPagina = new EventEmitter<number>();

  emitirAnterior() {
    this.anterior.emit();
  }

  emitirSiguiente() {
    this.siguiente.emit();
  }

  emitirPagina(pagina: number) {
    this.irPagina.emit(pagina);
  }
}

