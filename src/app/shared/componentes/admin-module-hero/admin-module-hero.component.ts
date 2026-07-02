// src/app/shared/componentes/admin-module-hero/admin-module-hero.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-admin-module-hero',
  templateUrl: './admin-module-hero.component.html',
  styleUrls: ['./admin-module-hero.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class AdminModuleHeroComponent {
  @Input() codigo = '';
  @Input() titulo = '';
  @Input() descripcion = '';
  @Input() icono = 'apps-outline';

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

