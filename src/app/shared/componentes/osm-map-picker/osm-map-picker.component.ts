// src/app/shared/componentes/osm-map-picker/osm-map-picker.component.ts
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import * as L from 'leaflet';

export interface UbicacionOsmSeleccionada {
  latitud: number;
  longitud: number;
  direccionMapa: string;
  ubicacionTextoOriginal: string;
}

@Component({
  selector: 'app-osm-map-picker',
  templateUrl: './osm-map-picker.component.html',
  styleUrls: ['./osm-map-picker.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class OsmMapPickerComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('mapContainer', { static: true })
  mapContainer!: ElementRef<HTMLDivElement>;

  @Input() textoInicial = '';
  @Input() latitudInicial: number | null = null;
  @Input() longitudInicial: number | null = null;

  @Output() ubicacionSeleccionada =
    new EventEmitter<UbicacionOsmSeleccionada>();

  mensaje = '';
  cargandoBusqueda = false;

  latitudSeleccionada: number | null = null;
  longitudSeleccionada: number | null = null;

  direccionMapaSeleccionada = '';
  ubicacionTextoOriginalSeleccionada = '';

  private mapa: L.Map | null = null;
  private marcador: L.Marker | null = null;
  private mapaListo = false;

  async ngAfterViewInit() {
    const latInicial = this.latitudInicial ?? -12.046374;
    const lngInicial = this.longitudInicial ?? -77.042793;

    this.inicializarMapa(latInicial, lngInicial);

    setTimeout(() => {
      this.mapa?.invalidateSize();
    }, 250);

    setTimeout(() => {
      this.mapa?.invalidateSize();
    }, 650);

    if (this.latitudInicial !== null && this.longitudInicial !== null) {
      this.colocarMarcador(
        this.latitudInicial,
        this.longitudInicial,
        this.textoInicial || 'UbicaciÃ³n seleccionada'
      );

      this.moverMapa(this.latitudInicial, this.longitudInicial, 17);
      return;
    }

    const texto = String(this.textoInicial || '').trim();

    if (texto) {
      await this.buscarTexto(texto);
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (!this.mapaListo) {
      return;
    }

    if (changes['textoInicial'] && !changes['textoInicial'].firstChange) {
      const texto = String(this.textoInicial || '').trim();

      if (texto) {
        this.mensaje = 'Texto actualizado. Presione â€œBuscar ubicaciÃ³nâ€.';
      }
    }
  }

  ngOnDestroy() {
    if (this.mapa) {
      this.mapa.remove();
      this.mapa = null;
    }
  }

  async buscarAhora() {
    const texto = String(this.textoInicial || '').trim();

    if (!texto) {
      this.mensaje = 'Ingrese una direcciÃ³n, coordenadas o enlace en el campo superior.';
      return;
    }

    await this.buscarTexto(texto);
  }

  usarCentroMapa() {
    if (!this.mapa) {
      return;
    }

    const centro = this.mapa.getCenter();

    this.colocarMarcador(
      centro.lat,
      centro.lng,
      this.textoInicial || 'UbicaciÃ³n seleccionada desde el mapa'
    );

    this.mensaje = 'Centro del mapa seleccionado. Presione â€œGuardar ubicaciÃ³nâ€.';
  }

  guardarUbicacion() {
    if (
      this.latitudSeleccionada === null ||
      this.longitudSeleccionada === null
    ) {
      this.mensaje = 'Primero seleccione una ubicaciÃ³n en el mapa.';
      return;
    }

    const direccionMapa = this.direccionMapaSeleccionada ||
      this.textoInicial ||
      'UbicaciÃ³n seleccionada';

    const ubicacionTextoOriginal = this.ubicacionTextoOriginalSeleccionada ||
      this.textoInicial ||
      direccionMapa;

    this.ubicacionSeleccionada.emit({
      latitud: this.latitudSeleccionada,
      longitud: this.longitudSeleccionada,
      direccionMapa,
      ubicacionTextoOriginal
    });

    this.mensaje = 'UbicaciÃ³n guardada correctamente.';
  }

  private inicializarMapa(
    latitud: number,
    longitud: number
  ) {
    this.mapa = L.map(this.mapContainer.nativeElement, {
      zoomControl: true,
      attributionControl: true
    }).setView([latitud, longitud], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Â© OpenStreetMap contributors'
    }).addTo(this.mapa);

    this.marcador = L.marker([latitud, longitud], {
      draggable: true,
      icon: this.crearIconoMarcador()
    }).addTo(this.mapa);

    this.marcador.on('dragend', () => {
      const posicion = this.marcador?.getLatLng();

      if (!posicion) {
        return;
      }

      this.colocarMarcador(
        posicion.lat,
        posicion.lng,
        this.textoInicial || 'UbicaciÃ³n seleccionada'
      );

      this.mensaje = 'Marcador movido. Presione â€œGuardar ubicaciÃ³nâ€.';
    });

    this.mapa.on('click', (evento: L.LeafletMouseEvent) => {
      this.colocarMarcador(
        evento.latlng.lat,
        evento.latlng.lng,
        this.textoInicial || 'UbicaciÃ³n seleccionada en el mapa'
      );

      this.mensaje = 'Punto seleccionado. Presione â€œGuardar ubicaciÃ³nâ€.';
    });

    this.mapaListo = true;
  }

  private async buscarTexto(texto: string) {
    const coordenadas = this.extraerCoordenadas(texto);

    if (coordenadas) {
      this.colocarMarcador(
        coordenadas.latitud,
        coordenadas.longitud,
        texto
      );

      this.moverMapa(coordenadas.latitud, coordenadas.longitud, 17);
      this.mensaje = 'Coordenadas detectadas. Presione â€œGuardar ubicaciÃ³nâ€.';
      return;
    }

    await this.buscarDireccionGratis(texto);
  }

  private async buscarDireccionGratis(texto: string) {
    this.cargandoBusqueda = true;
    this.mensaje = 'Buscando ubicaciÃ³n...';

    try {
      const consultas = this.generarConsultasBusqueda(texto);

      for (const consulta of consultas) {
        const resultado = await this.consultarNominatim(consulta);

        if (!resultado) {
          continue;
        }

        const latitud = Number(resultado.lat);
        const longitud = Number(resultado.lon);
        const direccionMapa = String(resultado.display_name || consulta);

        if (!this.esCoordenadaValida(latitud, longitud)) {
          continue;
        }

        this.colocarMarcador(
          latitud,
          longitud,
          direccionMapa
        );

        this.moverMapa(latitud, longitud, 15);

        this.mensaje = 'UbicaciÃ³n encontrada. Verifique el punto y presione â€œGuardar ubicaciÃ³nâ€.';
        return;
      }

      this.mensaje = 'No se encontrÃ³ la ubicaciÃ³n. Escriba una direcciÃ³n mÃ¡s completa o toque el mapa manualmente.';
    } catch (error) {
      console.error(error);
      this.mensaje = 'No se pudo buscar la ubicaciÃ³n. Puede pegar coordenadas o tocar el mapa.';
    } finally {
      this.cargandoBusqueda = false;
    }
  }

  private async consultarNominatim(consulta: string): Promise<any | null> {
    const url =
      'https://nominatim.openstreetmap.org/search' +
      `?format=json` +
      `&addressdetails=1` +
      `&limit=8` +
      `&countrycodes=pe` +
      `&accept-language=es` +
      `&q=${encodeURIComponent(consulta)}`;

    const respuesta = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'es'
      }
    });

    const resultados = await respuesta.json();

    if (!Array.isArray(resultados) || resultados.length === 0) {
      return null;
    }

    const resultadosValidos = resultados.filter((resultado: any) => {
      const latitud = Number(resultado.lat);
      const longitud = Number(resultado.lon);

      return this.esCoordenadaValida(latitud, longitud);
    });

    if (resultadosValidos.length === 0) {
      return null;
    }

    return this.elegirResultadoMasSeguro(consulta, resultadosValidos);
  }

  private generarConsultasBusqueda(texto: string): string[] {
    const limpio = String(texto || '').trim();

    if (!limpio) {
      return [];
    }

    const normalizado = this.normalizarTexto(limpio);
    const consultas: string[] = [];

    if (!normalizado.includes('peru')) {
      consultas.push(`${limpio}, PerÃº`);
    }

    consultas.push(limpio);

    return Array.from(new Set(consultas));
  }

  private elegirResultadoMasSeguro(
    consulta: string,
    resultados: any[]
  ): any | null {
    const consultaNormalizada = this.normalizarTexto(consulta);
    const palabrasClave = this.obtenerPalabrasClave(consultaNormalizada);

    if (palabrasClave.length === 0) {
      return resultados[0] || null;
    }

    const puntuados = resultados.map((resultado: any) => {
      const direccion = this.normalizarTexto(
        String(resultado.display_name || '')
      );

      const tipo = String(resultado.type || '').toLowerCase();
      const clase = String(resultado.class || '').toLowerCase();

      let puntaje = 0;
      let coincidencias = 0;

      for (const palabra of palabrasClave) {
        if (direccion.includes(palabra)) {
          coincidencias++;
          puntaje += 45;
        } else {
          puntaje -= 40;
        }
      }

      const cobertura = coincidencias / palabrasClave.length;

      if (direccion.includes('peru')) {
        puntaje += 20;
      }

      if (
        tipo.includes('city') ||
        tipo.includes('town') ||
        tipo.includes('village') ||
        tipo.includes('administrative') ||
        clase.includes('place') ||
        clase.includes('boundary') ||
        clase.includes('highway')
      ) {
        puntaje += 10;
      }

      if (cobertura < 0.6) {
        puntaje -= 1000;
      }

      return {
        resultado,
        puntaje,
        cobertura
      };
    });

    puntuados.sort((a, b) => b.puntaje - a.puntaje);

    const mejor = puntuados[0];

    if (!mejor || mejor.puntaje < -200) {
      return null;
    }

    return mejor.resultado;
  }

  private obtenerPalabrasClave(textoNormalizado: string): string[] {
    const palabrasIgnoradas = [
      'peru',
      'lima',
      'provincia',
      'departamento',
      'distrito',
      'region',
      'calle',
      'avenida',
      'av',
      'jr',
      'jiron',
      'pasaje',
      'urbanizacion',
      'urb',
      'mz',
      'lt',
      'numero',
      'nro',
      'sector',
      'etapa'
    ];

    return textoNormalizado
      .split(/\s+/)
      .map((palabra) => palabra.trim())
      .filter((palabra) => palabra.length >= 3)
      .filter((palabra) => !palabrasIgnoradas.includes(palabra));
  }

  private normalizarTexto(texto: string): string {
    return String(texto || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private colocarMarcador(
    latitud: number,
    longitud: number,
    direccionMapa: string
  ) {
    if (!this.esCoordenadaValida(latitud, longitud)) {
      this.mensaje = 'Coordenadas no vÃ¡lidas.';
      return;
    }

    this.latitudSeleccionada = latitud;
    this.longitudSeleccionada = longitud;
    this.direccionMapaSeleccionada = direccionMapa;
    this.ubicacionTextoOriginalSeleccionada = this.textoInicial || direccionMapa;

    if (this.marcador) {
      this.marcador.setLatLng([latitud, longitud]);
    }
  }

  private moverMapa(
    latitud: number,
    longitud: number,
    zoom: number
  ) {
    if (!this.mapa) {
      return;
    }

    this.mapa.setView([latitud, longitud], zoom);

    setTimeout(() => {
      this.mapa?.invalidateSize();
    }, 200);
  }

  private extraerCoordenadas(texto: string): {
    latitud: number;
    longitud: number;
  } | null {
    const limpio = decodeURIComponent(texto);

    const patrones = [
      /@(-?\d{1,2}\.\d+),\s*(-?\d{1,3}\.\d+)/,
      /q=(-?\d{1,2}\.\d+),\s*(-?\d{1,3}\.\d+)/,
      /ll=(-?\d{1,2}\.\d+),\s*(-?\d{1,3}\.\d+)/,
      /(-?\d{1,2}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)/
    ];

    for (const patron of patrones) {
      const coincidencia = limpio.match(patron);

      if (!coincidencia) {
        continue;
      }

      const latitud = Number(coincidencia[1]);
      const longitud = Number(coincidencia[2]);

      if (this.esCoordenadaValida(latitud, longitud)) {
        return {
          latitud,
          longitud
        };
      }
    }

    return null;
  }

  private esCoordenadaValida(
    latitud: number,
    longitud: number
  ): boolean {
    return (
      Number.isFinite(latitud) &&
      Number.isFinite(longitud) &&
      latitud >= -90 &&
      latitud <= 90 &&
      longitud >= -180 &&
      longitud <= 180
    );
  }

  private crearIconoMarcador(): L.DivIcon {
    return L.divIcon({
      className: 'osm-custom-marker',
      html: '<div class="osm-pin"></div>',
      iconSize: [34, 34],
      iconAnchor: [17, 34]
    });
  }
}

