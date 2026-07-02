// src/app/shared/componentes/trabajo-materiales-selector/trabajo-materiales-selector.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import {
  TrabajoMaterialAsignado,
  TrabajoMaterialDisponible
} from '../../../modelos/trabajo';

@Component({
  selector: 'app-trabajo-materiales-selector',
  templateUrl: './trabajo-materiales-selector.component.html',
  styleUrls: ['./trabajo-materiales-selector.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class TrabajoMaterialesSelectorComponent {
  @Input() materiales: TrabajoMaterialDisponible[] = [];
  @Input() seleccionados: TrabajoMaterialAsignado[] = [];
  @Input() readonly = false;

  @Output() seleccionadosChange = new EventEmitter<TrabajoMaterialAsignado[]>();

  estaSeleccionado(uid: string): boolean {
    return this.seleccionados.some((material) => material.materialUid === uid);
  }

  obtenerCantidad(uid: string): number {
    const encontrado = this.seleccionados.find((material) => material.materialUid === uid);
    return Number(encontrado?.cantidadAsignada || 1);
  }

  alternarMaterial(material: TrabajoMaterialDisponible) {
    if (this.readonly) {
      return;
    }

    if (this.estaSeleccionado(material.uid)) {
      const nuevos = this.seleccionados.filter((item) => item.materialUid !== material.uid);
      this.seleccionadosChange.emit(nuevos);
      return;
    }

    const cantidad = material.stockActual > 0 ? 1 : 0;

    const asignado: TrabajoMaterialAsignado = {
      materialUid: material.uid,
      nombre: material.nombre,
      categoria: material.categoria,
      unidad: material.unidad,
      cantidadAsignada: cantidad,
      stockAntes: material.stockActual,
      stockDespues: material.stockActual - cantidad,
      imagenUrl: material.imagenUrl || ''
    };

    this.seleccionadosChange.emit([
      ...this.seleccionados,
      asignado
    ]);
  }

  cambiarCantidad(
    material: TrabajoMaterialDisponible,
    event: any
  ) {
    if (this.readonly) {
      return;
    }

    let cantidad = Number(event?.detail?.value || 0);

    if (cantidad < 1) {
      cantidad = 1;
    }

    if (cantidad > material.stockActual) {
      cantidad = material.stockActual;
    }

    const nuevos = this.seleccionados.map((item) => {
      if (item.materialUid !== material.uid) {
        return item;
      }

      return {
        ...item,
        cantidadAsignada: cantidad,
        stockAntes: material.stockActual,
        stockDespues: material.stockActual - cantidad
      };
    });

    this.seleccionadosChange.emit(nuevos);
  }
}

