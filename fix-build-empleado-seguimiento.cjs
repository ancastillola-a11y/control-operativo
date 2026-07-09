const fs = require('fs');

const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);

function backup(path) {
  if (fs.existsSync(path)) {
    fs.copyFileSync(path, `${path}.bak_fix_build_${stamp}`);
  }
}

function read(path) {
  return fs.readFileSync(path, 'utf8');
}

function write(path, content) {
  fs.writeFileSync(path, content, 'utf8');
}

function patch(path, fn) {
  backup(path);
  const original = read(path);
  const next = fn(original);

  if (next !== original) {
    write(path, next);
    console.log('PATCH OK:', path);
  } else {
    console.log('SIN CAMBIOS:', path);
  }
}

/* =====================================================
   1. DASHBOARD EMPLEADO: importar header y bottom nav
===================================================== */

patch('src/app/paginas/empleado/dashboard-empleado/dashboard-empleado.page.ts', (txt) => {
  if (!txt.includes("admin-header/admin-header.component")) {
    txt = txt.replace(
      "import { AdminModuleHeroComponent } from '../../../shared/componentes/admin-module-hero/admin-module-hero.component';",
      "import { AdminHeaderComponent } from '../../../shared/componentes/admin-header/admin-header.component';\nimport { AdminBottomNavComponent } from '../../../shared/componentes/admin-bottom-nav/admin-bottom-nav.component';\nimport { AdminModuleHeroComponent } from '../../../shared/componentes/admin-module-hero/admin-module-hero.component';"
    );
  }

  if (!/imports:\s*\[[\s\S]*AdminHeaderComponent/.test(txt)) {
    txt = txt.replace(
      /imports:\s*\[\s*CommonModule,\s*IonicModule,/,
      "imports: [\n    CommonModule,\n    IonicModule,\n    AdminHeaderComponent,\n    AdminBottomNavComponent,"
    );
  }

  return txt;
});

/* =====================================================
   2. BOTTOM NAV: aceptar modo empleado
===================================================== */

patch('src/app/shared/componentes/admin-bottom-nav/admin-bottom-nav.component.ts', (txt) => {
  if (!txt.includes("@Input() modo: 'admin' | 'empleado'")) {
    txt = txt.replace(
      "@Input() activo: AdminNavItem = 'inicio';",
      "@Input() activo: AdminNavItem = 'inicio';\n  @Input() modo: 'admin' | 'empleado' = 'admin';"
    );
  }

  function insertGuard(methodName, code) {
    const marker = methodName + '() {';
    const index = txt.indexOf(marker);

    if (index === -1) {
      return;
    }

    const fragment = txt.slice(index, index + 400);

    if (fragment.includes("this.modo === 'empleado'")) {
      return;
    }

    txt = txt.replace(marker, marker + code);
  }

  const irPanelEmpleado = `
    if (this.modo === 'empleado') {
      this.navCtrl.navigateRoot('/dashboard-empleado', {
        animated: false,
        replaceUrl: true
      });
      return;
    }

`;

  const irGpsEmpleado = `
    if (this.modo === 'empleado') {
      void this.mostrarToast('El GPS está dentro de tu panel operativo.');
      this.navCtrl.navigateRoot('/dashboard-empleado', {
        animated: false,
        replaceUrl: true
      });
      return;
    }

`;

  const irRutaEmpleado = `
    if (this.modo === 'empleado') {
      void this.mostrarToast('La ruta está dentro de tu trabajo actual.');
      this.navCtrl.navigateRoot('/dashboard-empleado', {
        animated: false,
        replaceUrl: true
      });
      return;
    }

`;

  const irCuentaEmpleado = `
    if (this.modo === 'empleado') {
      void this.mostrarToast('Tu cuenta se gestiona desde el panel operativo.');
      this.navCtrl.navigateRoot('/dashboard-empleado', {
        animated: false,
        replaceUrl: true
      });
      return;
    }

`;

  insertGuard('irInicio', irPanelEmpleado);
  insertGuard('irAlmacen', irGpsEmpleado);
  insertGuard('irTrabajos', irPanelEmpleado);
  insertGuard('irReportes', irRutaEmpleado);
  insertGuard('irMas', irCuentaEmpleado);

  return txt;
});

patch('src/app/shared/componentes/admin-bottom-nav/admin-bottom-nav.component.html', (txt) => {
  txt = txt.replace(
    /<span>Almac(?:én|Ã©n)<\/span>/,
    "<span>{{ modo === 'empleado' ? 'GPS' : 'Almacén' }}</span>"
  );

  txt = txt.replace(
    /<span>Reportes<\/span>/,
    "<span>{{ modo === 'empleado' ? 'Ruta' : 'Reportes' }}</span>"
  );

  txt = txt.replace(
    /<span>M(?:ás|Ã¡s)<\/span>/,
    "<span>{{ modo === 'empleado' ? 'Cuenta' : 'Más' }}</span>"
  );

  return txt;
});

/* =====================================================
   3. HEADER: que notificaciones emita evento y no mande directo a admin
===================================================== */

patch('src/app/shared/componentes/admin-header/admin-header.component.ts', (txt) => {
  txt = txt.replace(
    /  abrirNotificaciones\(event\?: Event\) \{[\s\S]*?\n  \}\n\n  abrirPerfil/,
    `  abrirNotificaciones(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();

    this.notificacionesClick.emit();
  }

  abrirPerfil`
  );

  return txt;
});

/* =====================================================
   4. SEGUIMIENTO: corregir AlertController, codigoTrabajo y any
===================================================== */

patch('src/app/paginas/trabajos/seguimiento-trabajos/seguimiento-trabajos.page.ts', (txt) => {
  const match = txt.match(/import\s*{[\s\S]*?}\s*from '@ionic\/angular';/);

  if (match && !match[0].includes('AlertController')) {
    const nuevoImport = match[0].replace(
      'IonicModule,',
      'IonicModule,\n  AlertController,'
    );

    txt = txt.replace(match[0], nuevoImport);
  }

  txt = txt.replace(
    /subHeader:\s*trabajo\.codigoTrabajo\s*\|\|\s*trabajo\.clienteNombre,/g,
    "subHeader: this.obtenerCodigoTrabajo(trabajo) || trabajo.clienteNombre,"
  );

  txt = txt.replace(
    /handler:\s*\(data\)\s*=>/g,
    "handler: (data: any) =>"
  );

  return txt;
});

console.log('FIX BUILD TERMINADO.');
