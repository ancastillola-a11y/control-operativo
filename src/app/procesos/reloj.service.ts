// src/app/procesos/reloj.service.ts
import { Injectable } from '@angular/core';
import { interval, map, startWith } from 'rxjs';

export interface RelojPanel {
  fechaTexto: string;
  horaTexto: string;
}

@Injectable({
  providedIn: 'root'
})
export class RelojService {

  reloj$ = interval(1000).pipe(
    startWith(0),
    map(() => this.obtenerFechaHoraActual())
  );

  private obtenerFechaHoraActual(): RelojPanel {
    const ahora = new Date();

    const fechaTexto = new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(ahora);

    const horaTexto = new Intl.DateTimeFormat('es-PE', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(ahora);

    return {
      fechaTexto,
      horaTexto
    };
  }
}

