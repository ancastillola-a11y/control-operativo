const fs = require('fs');
const path = require('path');

const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);

function backup(file) {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, `${file}.bak_empleado_ui_${stamp}`);
  }
}

function ensureDir(file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
}

function writeFile(file, content) {
  ensureDir(file);
  fs.writeFileSync(file, content, 'utf8');
  console.log('WRITE:', file);
}

function patch(file, fn) {
  backup(file);
  const original = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  const next = fn(original);

  if (next !== original) {
    fs.writeFileSync(file, next, 'utf8');
    console.log('PATCH OK:', file);
  } else {
    console.log('SIN CAMBIOS:', file);
  }
}

/* =====================================================
   1. COMPONENTE HEADER EMPLEADO
===================================================== */

writeFile(
  'src/app/shared/componentes/empleado-header/empleado-header.component.ts',
`import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';

import {
  logOutOutline,
  notificationsOutline,
  personCircleOutline,
  radioOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-empleado-header',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ],
  templateUrl: './empleado-header.component.html',
  styleUrls: ['./empleado-header.component.css']
})
export class EmpleadoHeaderComponent {
  @Input() nombre = 'Empleado';
  @Input() cargo = 'Personal operativo';
  @Input() fotoUrl = '';
  @Input() iniciales = 'EM';
  @Input() gpsActivo: boolean | null = false;
  @Input() gpsTexto = 'GPS inactivo';

  @Output() perfilClick = new EventEmitter<void>();
  @Output() notificacionesClick = new EventEmitter<void>();
  @Output() logoutClick = new EventEmitter<void>();

  constructor() {
    addIcons({
      'log-out-outline': logOutOutline,
      'notifications-outline': notificationsOutline,
      'person-circle-outline': personCircleOutline,
      'radio-outline': radioOutline
    });
  }
}
`
);

writeFile(
  'src/app/shared/componentes/empleado-header/empleado-header.component.html',
`<section class="empleado-header">
  <button
    type="button"
    class="avatar-btn"
    (click)="perfilClick.emit()"
  >
    <img
      *ngIf="fotoUrl; else inicialesTpl"
      [src]="fotoUrl"
      alt="Foto empleado"
    />

    <ng-template #inicialesTpl>
      <span>{{ iniciales || 'EM' }}</span>
    </ng-template>
  </button>

  <div class="header-info">
    <span class="label">Panel operativo</span>
    <h1>{{ nombre || 'Empleado' }}</h1>
    <p>{{ cargo || 'Personal operativo' }}</p>
  </div>

  <div class="header-actions">
    <button
      type="button"
      class="gps-chip"
      [class.active]="gpsActivo === true"
      (click)="notificacionesClick.emit()"
    >
      <ion-icon name="radio-outline"></ion-icon>
    </button>

    <button
      type="button"
      class="logout-btn"
      (click)="logoutClick.emit()"
    >
      <ion-icon name="log-out-outline"></ion-icon>
    </button>
  </div>
</section>
`
);

writeFile(
  'src/app/shared/componentes/empleado-header/empleado-header.component.css',
`:host {
  display: block;
  margin-bottom: 12px;
}

.empleado-header {
  width: 100%;
  min-height: 78px;
  background: linear-gradient(135deg, #0a7f35, #075f2a);
  border-radius: 20px;
  padding: 12px;
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
  box-shadow: 0 8px 20px rgba(8, 123, 45, 0.22);
}

.avatar-btn {
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 17px;
  overflow: hidden;
  background: #eaf8ef;
  color: #087b2d;
  display: grid;
  place-items: center;
  font-weight: 1000;
}

.avatar-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header-info {
  min-width: 0;
}

.header-info .label {
  display: block;
  font-size: 10.5px;
  font-weight: 900;
  color: #d9ffe4;
  margin-bottom: 3px;
}

.header-info h1 {
  margin: 0;
  font-size: 16px;
  font-weight: 1000;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-info p {
  margin: 4px 0 0;
  font-size: 11.5px;
  font-weight: 700;
  color: #c9f7d6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-actions {
  display: flex;
  gap: 7px;
}

.gps-chip,
.logout-btn {
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 13px;
  display: grid;
  place-items: center;
}

.gps-chip {
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

.gps-chip.active {
  background: #ffffff;
  color: #087b2d;
}

.logout-btn {
  background: #ffffff;
  color: #087b2d;
}

.gps-chip ion-icon,
.logout-btn ion-icon {
  font-size: 20px;
}
`
);

/* =====================================================
   2. COMPONENTE BOTTOM NAV EMPLEADO
===================================================== */

writeFile(
  'src/app/shared/componentes/empleado-bottom-nav/empleado-bottom-nav.component.ts',
`import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';

import {
  briefcaseOutline,
  homeOutline,
  mapOutline,
  personCircleOutline,
  radioOutline
} from 'ionicons/icons';

export type EmpleadoNavItem =
  | 'inicio'
  | 'gps'
  | 'trabajos'
  | 'ruta'
  | 'cuenta';

@Component({
  selector: 'app-empleado-bottom-nav',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ],
  templateUrl: './empleado-bottom-nav.component.html',
  styleUrls: ['./empleado-bottom-nav.component.css']
})
export class EmpleadoBottomNavComponent {
  @Input() activo: EmpleadoNavItem = 'inicio';

  @Output() inicioClick = new EventEmitter<void>();
  @Output() gpsClick = new EventEmitter<void>();
  @Output() trabajosClick = new EventEmitter<void>();
  @Output() rutaClick = new EventEmitter<void>();
  @Output() cuentaClick = new EventEmitter<void>();

  constructor() {
    addIcons({
      'briefcase-outline': briefcaseOutline,
      'home-outline': homeOutline,
      'map-outline': mapOutline,
      'person-circle-outline': personCircleOutline,
      'radio-outline': radioOutline
    });
  }
}
`
);

writeFile(
  'src/app/shared/componentes/empleado-bottom-nav/empleado-bottom-nav.component.html',
`<nav class="empleado-bottom-nav">
  <button
    type="button"
    [class.active]="activo === 'inicio'"
    (click)="inicioClick.emit()"
  >
    <ion-icon name="home-outline"></ion-icon>
    <span>Inicio</span>
  </button>

  <button
    type="button"
    [class.active]="activo === 'gps'"
    (click)="gpsClick.emit()"
  >
    <ion-icon name="radio-outline"></ion-icon>
    <span>GPS</span>
  </button>

  <button
    type="button"
    [class.active]="activo === 'trabajos'"
    (click)="trabajosClick.emit()"
  >
    <ion-icon name="briefcase-outline"></ion-icon>
    <span>Trabajos</span>
  </button>

  <button
    type="button"
    [class.active]="activo === 'ruta'"
    (click)="rutaClick.emit()"
  >
    <ion-icon name="map-outline"></ion-icon>
    <span>Ruta</span>
  </button>

  <button
    type="button"
    [class.active]="activo === 'cuenta'"
    (click)="cuentaClick.emit()"
  >
    <ion-icon name="person-circle-outline"></ion-icon>
    <span>Cuenta</span>
  </button>
</nav>
`
);

writeFile(
  'src/app/shared/componentes/empleado-bottom-nav/empleado-bottom-nav.component.css',
`:host {
  display: block;
}

.empleado-bottom-nav {
  position: fixed;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  width: calc(100% - 22px);
  max-width: 430px;
  height: 64px;
  background: #ffffff;
  border: 1px solid #dfeee4;
  border-radius: 22px;
  box-shadow: 0 8px 24px rgba(16, 24, 40, 0.12);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
  padding: 6px;
  z-index: 20;
}

.empleado-bottom-nav button {
  border: none;
  background: transparent;
  color: #667085;
  border-radius: 16px;
  display: grid;
  place-items: center;
  gap: 2px;
  font-size: 9.5px;
  font-weight: 900;
}

.empleado-bottom-nav ion-icon {
  font-size: 20px;
}

.empleado-bottom-nav button.active {
  background: #eaf8ef;
  color: #087b2d;
}
`
);

/* =====================================================
   3. COMPONENTE HORARIO EMPLEADO
===================================================== */

writeFile(
  'src/app/shared/componentes/empleado-trabajo-horario/empleado-trabajo-horario.component.ts',
`import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';

import {
  calendarOutline,
  timeOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-empleado-trabajo-horario',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ],
  templateUrl: './empleado-trabajo-horario.component.html',
  styleUrls: ['./empleado-trabajo-horario.component.css']
})
export class EmpleadoTrabajoHorarioComponent {
  @Input() fecha = '';
  @Input() hora = '';
  @Input() texto = '';

  constructor() {
    addIcons({
      'calendar-outline': calendarOutline,
      'time-outline': timeOutline
    });
  }

  get fechaTexto(): string {
    const fecha = String(this.fecha || '').trim();

    if (!fecha) {
      return 'Sin fecha';
    }

    return fecha;
  }

  get horaTexto(): string {
    const hora = String(this.hora || '').trim();

    if (!hora) {
      return 'Sin hora';
    }

    return hora;
  }

  get tieneHora(): boolean {
    return !!String(this.hora || '').trim();
  }
}
`
);

writeFile(
  'src/app/shared/componentes/empleado-trabajo-horario/empleado-trabajo-horario.component.html',
`<div class="horario-empleado">
  <div class="horario-icon">
    <ion-icon name="calendar-outline"></ion-icon>
  </div>

  <div class="horario-info">
    <span>Programado</span>
    <strong>{{ fechaTexto }}</strong>
  </div>

  <div class="hora-chip" [class.empty]="!tieneHora">
    <ion-icon name="time-outline"></ion-icon>
    <span>{{ horaTexto }}</span>
  </div>
</div>
`
);

writeFile(
  'src/app/shared/componentes/empleado-trabajo-horario/empleado-trabajo-horario.component.css',
`:host {
  display: block;
}

.horario-empleado {
  width: 100%;
  min-height: 48px;
  border: 1px solid #dfeee4;
  border-radius: 15px;
  background: #f3fbf6;
  padding: 8px;
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr) auto;
  gap: 8px;
  align-items: center;
}

.horario-icon {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  background: #eaf8ef;
  color: #087b2d;
  display: grid;
  place-items: center;
}

.horario-icon ion-icon {
  font-size: 18px;
}

.horario-info {
  min-width: 0;
}

.horario-info span {
  display: block;
  font-size: 10px;
  font-weight: 900;
  color: #087b2d;
  margin-bottom: 2px;
}

.horario-info strong {
  display: block;
  font-size: 12px;
  font-weight: 1000;
  color: #101828;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hora-chip {
  min-height: 30px;
  border-radius: 999px;
  padding: 0 9px;
  background: #087b2d;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 1000;
  white-space: nowrap;
}

.hora-chip.empty {
  background: #e5e7eb;
  color: #667085;
}

.hora-chip ion-icon {
  font-size: 15px;
}
`
);

/* =====================================================
   4. DASHBOARD EMPLEADO TS: importar componentes nuevos
===================================================== */

patch('src/app/paginas/empleado/dashboard-empleado/dashboard-empleado.page.ts', (txt) => {
  const importMarker = "import { AdminModuleHeroComponent } from '../../../shared/componentes/admin-module-hero/admin-module-hero.component';";

  if (!txt.includes("empleado-header/empleado-header.component")) {
    txt = txt.replace(
      importMarker,
`import { EmpleadoHeaderComponent } from '../../../shared/componentes/empleado-header/empleado-header.component';
import { EmpleadoBottomNavComponent } from '../../../shared/componentes/empleado-bottom-nav/empleado-bottom-nav.component';
import { EmpleadoTrabajoHorarioComponent } from '../../../shared/componentes/empleado-trabajo-horario/empleado-trabajo-horario.component';
${importMarker}`
    );
  }

  if (!txt.includes('EmpleadoHeaderComponent,')) {
    txt = txt.replace(
      /imports:\s*\[/,
      `imports: [
    EmpleadoHeaderComponent,
    EmpleadoBottomNavComponent,
    EmpleadoTrabajoHorarioComponent,`
    );
  }

  if (!txt.includes('irGpsPanel()')) {
    const methods = `
  irGpsPanel() {
    document.getElementById('empleado-gps')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  irTrabajosPanel() {
    document.getElementById('empleado-trabajos')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

`;

    txt = txt.replace(
      /\n\s*async activarGps\(/,
      '\\n' + methods + '\\n async activarGps('
    );
  }

  return txt;
});

/* =====================================================
   5. DASHBOARD EMPLEADO HTML: usar componentes empleado
===================================================== */

patch('src/app/paginas/empleado/dashboard-empleado/dashboard-empleado.page.html', (txt) => {
  const empleadoHeader = `
      <app-empleado-header
        [nombre]="vm.empleado.nombreCompleto || 'Empleado'"
        [cargo]="vm.empleado.cargoTexto || 'Personal operativo'"
        [fotoUrl]="vm.empleado.fotoUrl || ''"
        [iniciales]="vm.empleado.iniciales || 'EM'"
        [gpsActivo]="gpsActivo$ | async"
        [gpsTexto]="(gpsEstadoTexto$ | async) || 'GPS inactivo'"
        (perfilClick)="abrirPerfil()"
        (notificacionesClick)="abrirNotificaciones()"
        (logoutClick)="cerrarSesion()"
      ></app-empleado-header>

`;

  if (txt.includes('<app-admin-header')) {
    txt = txt.replace(
      /      <app-admin-header[\s\S]*?<\/app-admin-header>\s*/,
      empleadoHeader
    );
  } else if (txt.includes('class="empleado-topbar"')) {
    txt = txt.replace(
      /      <section class="empleado-topbar">[\s\S]*?      <\/section>\s*/,
      empleadoHeader
    );
  } else if (!txt.includes('<app-empleado-header')) {
    txt = txt.replace(
      /<main class="empleado-container">\s*/,
      '<main class="empleado-container">\\n' + empleadoHeader
    );
  }

  txt = txt.replace(
    '<section class="gps-card">',
    '<section class="gps-card" id="empleado-gps">'
  );

  txt = txt.replace(
    '<section class="list-title-row">',
    '<section class="list-title-row" id="empleado-trabajos">'
  );

  if (!txt.includes('class="horario-actual"')) {
    txt = txt.replace(
      /          <p \*ngIf="vm\.trabajoActual">\s*{{ vm\.trabajoActual\.clienteNombre }}[\s\S]*?<\/p>/,
`          <p *ngIf="vm.trabajoActual">
            {{ vm.trabajoActual.clienteNombre }} · {{ vm.trabajoActual.estadoTexto }}
          </p>

          <app-empleado-trabajo-horario
            class="horario-actual"
            *ngIf="vm.trabajoActual"
            [fecha]="vm.trabajoActual.fechaProgramada"
            [hora]="vm.trabajoActual.horaProgramada"
            [texto]="vm.trabajoActual.fechaHoraTexto"
          ></app-empleado-trabajo-horario>`
    );
  }

  if (!txt.includes('class="horario-card"')) {
    txt = txt.replace(
      /              <p>\s*<ion-icon name="calendar-outline"><\/ion-icon>\s*<span>{{ trabajo\.fechaHoraTexto }}<\/span>\s*<\/p>/,
`              <app-empleado-trabajo-horario
                class="horario-card"
                [fecha]="trabajo.fechaProgramada"
                [hora]="trabajo.horaProgramada"
                [texto]="trabajo.fechaHoraTexto"
              ></app-empleado-trabajo-horario>`
    );
  }

  const bottom = `
  <app-empleado-bottom-nav
    activo="inicio"
    (inicioClick)="irPanelEmpleado()"
    (gpsClick)="irGpsPanel()"
    (trabajosClick)="irTrabajosPanel()"
    (rutaClick)="abrirRutaTrabajo(vm.trabajoActual)"
    (cuentaClick)="abrirPerfil()"
  ></app-empleado-bottom-nav>
`;

  if (txt.includes('<app-admin-bottom-nav')) {
    txt = txt.replace(
      /  <app-admin-bottom-nav[\s\S]*?<\/app-admin-bottom-nav>/,
      bottom
    );
  } else if (!txt.includes('<app-empleado-bottom-nav')) {
    txt = txt.replace(
      /\n<\/ion-content>\s*$/,
      '\\n' + bottom + '\\n</ion-content>\\n'
    );
  }

  return txt;
});

/* =====================================================
   6. CSS PANEL EMPLEADO
===================================================== */

patch('src/app/paginas/empleado/dashboard-empleado/dashboard-empleado.page.css', (txt) => {
  txt = txt.replace(
    'padding: 12px 12px 34px;',
    'padding: 12px 12px 104px;'
  );

  txt = txt.replace(
    'padding: 12px 12px 104px;',
    'padding: 12px 12px 104px;'
  );

  if (!txt.includes('FIX EMPLEADO COMPONENTES PROPIOS')) {
    txt += `

/* FIX EMPLEADO COMPONENTES PROPIOS */
:host ::ng-deep app-empleado-header,
:host ::ng-deep app-empleado-bottom-nav,
:host ::ng-deep app-empleado-trabajo-horario {
  font-family: inherit;
}

:host ::ng-deep app-empleado-trabajo-horario.horario-actual {
  margin-top: 9px;
}

:host ::ng-deep app-empleado-trabajo-horario.horario-card {
  grid-column: 1 / -1;
  margin-bottom: 2px;
}

.trabajo-info-grid {
  align-items: stretch;
}

@media (min-width: 431px) {
  .empleado-container {
    max-width: 430px;
  }
}
`;
  }

  return txt;
});

/* =====================================================
   7. DAO EMPLEADO: leer hora de forma más robusta
===================================================== */

patch('src/app/dao/dashboard-empleado.dao.ts', (txt) => {
  txt = txt.replace(
    `    const estado = this.normalizarEstado(data.estado);
    const fechaProgramada = String(data.fechaProgramada || '').trim();
    const horaProgramada = String(data.horaProgramada || '').trim();`,
    `    const estado = this.normalizarEstado(data.estado);

    const fechaProgramada = String(
      data.fechaProgramada ||
      data.fecha ||
      data.fechaTrabajo ||
      ''
    ).trim();

    const horaProgramada = String(
      data.horaProgramada ||
      data.hora ||
      data.horaTrabajo ||
      data.horaAsignada ||
      ''
    ).trim();`
  );

  return txt;
});

console.log('PARCHE EMPLEADO UI + HORARIO TERMINADO.');
