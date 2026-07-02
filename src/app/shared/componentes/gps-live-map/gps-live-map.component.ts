// src/app/shared/componentes/gps-live-map/gps-live-map.component.ts
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { addIcons } from 'ionicons';
import { locateOutline } from 'ionicons/icons';

import * as L from 'leaflet';

import { GpsUbicacionActual } from '../../../modelos/gps';

@Component({
  selector: 'app-gps-live-map',
  templateUrl: './gps-live-map.component.html',
  styleUrls: ['./gps-live-map.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class GpsLiveMapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('mapContainer', { static: true })
  mapContainer!: ElementRef<HTMLDivElement>;

  @Input() ubicaciones: GpsUbicacionActual[] = [];

  private mapa: L.Map | null = null;
  private capaMarcadores: L.LayerGroup | null = null;
  private capaRutas: L.LayerGroup | null = null;
  private mapaListo = false;

  constructor() {
    addIcons({
      'locate-outline': locateOutline
    });
  }

  ngAfterViewInit() {
    this.inicializarMapa();

    setTimeout(() => {
      this.mapa?.invalidateSize();
      this.pintarMapa();
    }, 250);

    setTimeout(() => {
      this.mapa?.invalidateSize();
      this.ajustarVista();
    }, 700);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.mapaListo) {
      return;
    }

    if (changes['ubicaciones']) {
      this.pintarMapa();
    }
  }

  ngOnDestroy() {
    if (this.mapa) {
      this.mapa.remove();
      this.mapa = null;
    }
  }

  centrarMapa() {
    this.ajustarVista();
  }

  private inicializarMapa() {
    this.mapa = L.map(this.mapContainer.nativeElement, {
      zoomControl: true,
      attributionControl: false
    }).setView([-12.046374, -77.042793], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.mapa);

    this.capaRutas = L.layerGroup().addTo(this.mapa);
    this.capaMarcadores = L.layerGroup().addTo(this.mapa);

    this.mapaListo = true;
  }

  private pintarMapa() {
    if (!this.mapa || !this.capaMarcadores || !this.capaRutas) {
      return;
    }

    this.capaMarcadores.clearLayers();
    this.capaRutas.clearLayers();

    for (const ubicacion of this.ubicaciones || []) {
      if (!this.esCoordenadaValida(ubicacion.latitud, ubicacion.longitud)) {
        continue;
      }

      this.pintarRuta(ubicacion);
      this.pintarMarcadorEmpleado(ubicacion);
      this.pintarMarcadorDestino(ubicacion);
    }

    this.ajustarVista();
  }

  private pintarMarcadorEmpleado(ubicacion: GpsUbicacionActual) {
    if (!this.capaMarcadores) {
      return;
    }

    const icono = L.divIcon({
      className: `gps-marker gps-marker-${ubicacion.estado}`,
      html: `
        <div class="gps-marker-pin gps-marker-worker">
          <span>E</span>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    const marker = L.marker(
      [ubicacion.latitud, ubicacion.longitud],
      {
        icon: icono
      }
    );

    const popup = `
      <strong>${this.escaparHtml(ubicacion.empleadoNombre)}</strong><br>
      ${this.escaparHtml(ubicacion.empleadoRol || 'Empleado')}<br>
      Estado: ${this.escaparHtml(ubicacion.estado)}<br>
      Trabajo: ${this.escaparHtml(ubicacion.trabajoCodigo || 'Sin trabajo')}
    `;

    marker.bindPopup(popup);
    marker.addTo(this.capaMarcadores);
  }

  private pintarMarcadorDestino(ubicacion: GpsUbicacionActual) {
    if (!this.capaMarcadores || !ubicacion.ruta || ubicacion.ruta.length < 2) {
      return;
    }

    const destino = ubicacion.ruta[ubicacion.ruta.length - 1];

    if (!this.esCoordenadaValida(destino.latitud, destino.longitud)) {
      return;
    }

    const icono = L.divIcon({
      className: 'gps-marker gps-marker-destino',
      html: `
        <div class="gps-marker-pin gps-marker-destination">
          <span>D</span>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    const marker = L.marker(
      [destino.latitud, destino.longitud],
      {
        icon: icono
      }
    );

    const popup = `
      <strong>Destino del trabajo</strong><br>
      ${this.escaparHtml(ubicacion.trabajoCodigo || '')}<br>
      ${this.escaparHtml(ubicacion.trabajoTitulo || '')}
    `;

    marker.bindPopup(popup);
    marker.addTo(this.capaMarcadores);
  }

  private pintarRuta(ubicacion: GpsUbicacionActual) {
    if (!this.capaRutas || !ubicacion.ruta || ubicacion.ruta.length < 2) {
      return;
    }

    const puntos = ubicacion.ruta
      .filter((punto) => this.esCoordenadaValida(punto.latitud, punto.longitud))
      .map((punto) =>
        L.latLng(punto.latitud, punto.longitud)
      );

    if (puntos.length < 2) {
      return;
    }

    const ruta = L.polyline(puntos, {
      weight: 5,
      opacity: 0.92,
      color: '#087b2d'
    });

    ruta.addTo(this.capaRutas);
  }

  private ajustarVista() {
    if (!this.mapa || !this.ubicaciones || this.ubicaciones.length === 0) {
      return;
    }

    const bounds = L.latLngBounds([]);

    for (const ubicacion of this.ubicaciones) {
      if (this.esCoordenadaValida(ubicacion.latitud, ubicacion.longitud)) {
        bounds.extend([ubicacion.latitud, ubicacion.longitud]);
      }

      if (ubicacion.ruta) {
        for (const punto of ubicacion.ruta) {
          if (this.esCoordenadaValida(punto.latitud, punto.longitud)) {
            bounds.extend([punto.latitud, punto.longitud]);
          }
        }
      }
    }

    if (bounds.isValid()) {
      this.mapa.fitBounds(bounds, {
        padding: [35, 35],
        maxZoom: 16
      });
    }
  }

  private esCoordenadaValida(
    latitud: number,
    longitud: number
  ): boolean {
    return (
      typeof latitud === 'number' &&
      typeof longitud === 'number' &&
      Number.isFinite(latitud) &&
      Number.isFinite(longitud) &&
      latitud >= -90 &&
      latitud <= 90 &&
      longitud >= -180 &&
      longitud <= 180
    );
  }

  private escaparHtml(valor: string): string {
    return String(valor || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}