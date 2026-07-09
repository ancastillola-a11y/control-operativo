const fs = require('fs');

const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);

function backup(path) {
  if (fs.existsSync(path)) {
    fs.copyFileSync(path, `${path}.bak_fix_vm_bottom_${stamp}`);
  }
}

function patch(path, fn) {
  backup(path);
  const original = fs.readFileSync(path, 'utf8');
  const next = fn(original);

  if (next !== original) {
    fs.writeFileSync(path, next, 'utf8');
    console.log('PATCH OK:', path);
  } else {
    console.log('SIN CAMBIOS:', path);
  }
}

/* =====================================================
   1. MOVER BOTTOM NAV EMPLEADO DENTRO DEL BLOQUE vm
===================================================== */

patch('src/app/paginas/empleado/dashboard-empleado/dashboard-empleado.page.html', (txt) => {
  const bottomNav = `
      <app-empleado-bottom-nav
        activo="inicio"
        (inicioClick)="irPanelEmpleado()"
        (gpsClick)="irGpsPanel()"
        (trabajosClick)="irTrabajosPanel()"
        (rutaClick)="abrirRutaTrabajo(vm.trabajoActual)"
        (cuentaClick)="abrirPerfil()"
      ></app-empleado-bottom-nav>
`;

  // Quitar cualquier bottom nav empleado que haya quedado fuera
  txt = txt.replace(
    /\s*<app-empleado-bottom-nav[\s\S]*?<\/app-empleado-bottom-nav>\s*/g,
    '\n'
  );

  // Insertar el bottom nav antes de cerrar el main del bloque vm
  txt = txt.replace(
    /(\s*<\/main>\s*\n\s*<\/ng-container>)/,
    `\n${bottomNav}\n$1`
  );

  return txt;
});

/* =====================================================
   2. LIMPIAR IMPORTS ADMIN NO USADOS EN PANEL EMPLEADO
===================================================== */

patch('src/app/paginas/empleado/dashboard-empleado/dashboard-empleado.page.ts', (txt) => {
  txt = txt.replace(
    /^import \{ AdminHeaderComponent \} from .*admin-header\.component';\r?\n/gm,
    ''
  );

  txt = txt.replace(
    /^import \{ AdminBottomNavComponent \} from .*admin-bottom-nav\.component';\r?\n/gm,
    ''
  );

  txt = txt.replace(/\s*AdminHeaderComponent,\r?\n/g, '');
  txt = txt.replace(/\s*AdminBottomNavComponent,\r?\n/g, '');

  return txt;
});

console.log('FIX VM BOTTOM NAV EMPLEADO TERMINADO.');
