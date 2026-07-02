// src/app/shared/componentes/admin-search-filter/admin-search-filter.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-admin-search-filter',
  templateUrl: './admin-search-filter.component.html',
  styleUrls: ['./admin-search-filter.component.css'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class AdminSearchFilterComponent {
  @Input() placeholder = 'Buscar...';
  @Input() filtroActual = 'todos';

  @Output() buscar = new EventEmitter<string>();
  @Output() filtrar = new EventEmitter<void>();

  get textoFiltro(): string {
    if (this.filtroActual === 'habilitados') {
      return 'Activos';
    }

    if (this.filtroActual === 'deshabilitados') {
      return 'Inactivos';
    }
if (this.filtroActual === 'pendientes') {
  return 'Pendientes';
}

if (this.filtroActual === 'enProceso') {
  return 'En proceso';
}

if (this.filtroActual === 'finalizados') {
  return 'Finalizados';
}

if (this.filtroActual === 'cancelados') {
  return 'Cancelados';
}
    return 'Todos';
  }

  emitirBusqueda(event: any) {
    const valor = event.detail?.value ?? '';
    this.buscar.emit(String(valor));
  }

  abrirFiltro() {
    this.filtrar.emit();
  }
}

