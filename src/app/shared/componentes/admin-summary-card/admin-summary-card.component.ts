// src/app/shared/componentes/admin-summary-card/admin-summary-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

export type AdminSummaryCardTipo =
  | 'total'
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning';

@Component({
  selector: 'app-admin-summary-card',
  templateUrl: './admin-summary-card.component.html',
  styleUrls: ['./admin-summary-card.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class AdminSummaryCardComponent {
  @Input() titulo = '';
  @Input() valor: number | string = 0;
  @Input() icono = 'analytics-outline';
  @Input() tipo: AdminSummaryCardTipo = 'primary';
}

