// src/app/paginas/administrador/reporte-trabajos/reporte-trabajos.page.ts
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
IonicModule,
NavController,
ToastController
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
arrowBackOutline,
barChartOutline,
briefcaseOutline,
calendarOutline,
checkmarkCircleOutline,
clipboardOutline,
documentTextOutline,
downloadOutline,
locationOutline,
peopleOutline,
refreshOutline,
timeOutline,
trashOutline,
warningOutline
} from 'ionicons/icons';

import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable';

import { DashboardAdminService } from '../../../procesos/dashboard-admin.service';
import { ReporteTrabajosService } from '../../../procesos/reporte-trabajos.service';

import {
FiltroReporteTrabajos,
ReporteTrabajoVista
} from '../../../modelos/reporte-trabajos';

import { AdminHeaderComponent } from '../../../shared/componentes/admin-header/admin-header.component';
import { AdminBottomNavComponent } from '../../../shared/componentes/admin-bottom-nav/admin-bottom-nav.component';
import { AdminEmptyStateComponent } from '../../../shared/componentes/admin-empty-state/admin-empty-state.component';

@Component({
selector: 'app-reporte-trabajos',
templateUrl: './reporte-trabajos.page.html',
styleUrls: ['./reporte-trabajos.page.css'],
standalone: true,
imports: [
CommonModule,
IonicModule,
AdminHeaderComponent,
AdminBottomNavComponent,
AdminEmptyStateComponent
]
})
export class ReporteTrabajosPage {
private navCtrl = inject(NavController);
private toastCtrl = inject(ToastController);
private cdr = inject(ChangeDetectorRef);

private dashboardAdminService = inject(DashboardAdminService);
private reporteTrabajosService = inject(ReporteTrabajosService);

private readonly logoReportePath = 'assets/img/logo.png';

adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
vm$ = this.reporteTrabajosService.vm$;

filtros: {
valor: FiltroReporteTrabajos;
texto: string;
}[] = [
{ valor: 'todos', texto: 'Todos' },
{ valor: 'pendientes', texto: 'Pendientes' },
{ valor: 'asignados', texto: 'Asignados' },
{ valor: 'en_camino', texto: 'En camino' },
{ valor: 'en_proceso', texto: 'En proceso' },
{ valor: 'finalizados', texto: 'Finalizados' },
{ valor: 'devoluciones', texto: 'Devoluciones' },
{ valor: 'cancelados', texto: 'Cancelados' }
];

constructor() {
addIcons({
'arrow-back-outline': arrowBackOutline,
'bar-chart-outline': barChartOutline,
'briefcase-outline': briefcaseOutline,
'calendar-outline': calendarOutline,
'checkmark-circle-outline': checkmarkCircleOutline,
'clipboard-outline': clipboardOutline,
'document-text-outline': documentTextOutline,
'download-outline': downloadOutline,
'location-outline': locationOutline,
'people-outline': peopleOutline,
'refresh-outline': refreshOutline,
'time-outline': timeOutline,
'trash-outline': trashOutline,
'warning-outline': warningOutline
});
}

ionViewWillEnter() {
setTimeout(() => {
this.cdr.detectChanges();
}, 100);
}

cambiarFiltro(filtro: FiltroReporteTrabajos) {
this.reporteTrabajosService.cambiarFiltro(filtro);
}

cambiarFechaInicio(valor: string) {
this.reporteTrabajosService.cambiarFechaInicio(
this.normalizarFechaInput(valor)
);
}

cambiarFechaFin(valor: string) {
this.reporteTrabajosService.cambiarFechaFin(
this.normalizarFechaInput(valor)
);
}

limpiarFechas() {
this.reporteTrabajosService.limpiarRangoFechas();
}

volverReportes() {
this.navCtrl.navigateRoot('/reportes', {
animated: false,
replaceUrl: true
});
}

abrirModuloTrabajos() {
this.navCtrl.navigateRoot('/asignacion-trabajos', {
animated: false,
replaceUrl: true
});
}

abrirMenu() {
this.navCtrl.navigateRoot('/dashboard-admin', {
animated: false,
replaceUrl: true
});
}

abrirNotificaciones() {
this.navCtrl.navigateRoot('/notificaciones-admin', {
animated: false,
replaceUrl: true
});
}

abrirPerfil() {
this.mostrarToast('Configuración de perfil próximamente.', 'primary');
}

exportarExcel(
trabajos: ReporteTrabajoVista[],
fechaInicio: string = '',
fechaFin: string = ''
) {
if (!trabajos || trabajos.length === 0) {
this.mostrarToast('No hay datos para exportar.', 'primary');
return;
}


const encabezados = [
  'Código',
  'Cliente',
  'Teléfono',
  'Tipo de trabajo',
  'Estado',
  'Empleados',
  'Materiales',
  'Fecha programada',
  'Hora',
  'Dirección',
  'Descripción'
];

const filas = trabajos.map((trabajo) => [
  trabajo.codigo,
  trabajo.clienteNombre,
  trabajo.clienteTelefono,
  trabajo.tipoTrabajo,
  trabajo.estadoTexto,
  trabajo.empleadosTexto,
  trabajo.materialesTexto,
  trabajo.fechaProgramadaTexto,
  trabajo.horaProgramadaTexto,
  trabajo.direccion,
  trabajo.descripcion
]);

const contenidoFilas: any[][] = [
  ['Reporte operativo de trabajos'],
  ['Periodo', this.obtenerPeriodoTexto(fechaInicio, fechaFin)],
  ['Fecha de emisión', new Date().toLocaleDateString('es-PE')],
  [],
  encabezados,
  ...filas
];

const contenido = contenidoFilas
  .map((fila) =>
    fila.map((valor) => this.formatearValorCsv(valor)).join(';')
  )
  .join('\n');

const blob = new Blob([`\uFEFF${contenido}`], {
  type: 'text/csv;charset=utf-8;'
});

const url = window.URL.createObjectURL(blob);
const enlace = document.createElement('a');

enlace.href = url;
enlace.download = `reporte-trabajos-${this.obtenerFechaArchivo()}.csv`;
enlace.click();

window.URL.revokeObjectURL(url);

this.mostrarToast('Reporte exportado para Excel.', 'success');


}

async exportarPDF(
trabajos: ReporteTrabajoVista[],
fechaInicio: string = '',
fechaFin: string = ''
) {
if (!trabajos || trabajos.length === 0) {
this.mostrarToast('No hay datos para exportar.', 'primary');
return;
}


try {
  const logoBase64 = await this.cargarImagenBase64(this.logoReportePath);

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const periodoTexto = this.obtenerPeriodoTexto(fechaInicio, fechaFin);
  const fechaEmision = new Date().toLocaleDateString('es-PE');

  const resumenOperativo = this.obtenerResumenOperativo(trabajos);

  this.dibujarEncabezadoPDF(
    doc,
    logoBase64,
    periodoTexto,
    fechaEmision
  );

  this.dibujarResumenPDF(doc, resumenOperativo);

  const cuerpoTabla = trabajos.map((trabajo, index) => [
    String(index + 1),
    trabajo.codigo,
    trabajo.clienteNombre,
    trabajo.tipoTrabajo,
    trabajo.estadoTexto,
    trabajo.fechaProgramadaTexto,
    trabajo.empleadosTexto,
    trabajo.direccion
  ]);

  autoTable(doc, {
    startY: 80,
    head: [[
      'N°',
      'Código',
      'Cliente',
      'Tipo',
      'Estado',
      'Fecha',
      'Empleado(s)',
      'Dirección'
    ]],
    body: cuerpoTabla,
    margin: {
      left: 14,
      right: 14,
      top: 14,
      bottom: 18
    },
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 8,
      cellPadding: 2.2,
      valign: 'top',
      textColor: [16, 24, 40],
      lineColor: [208, 213, 221],
      lineWidth: 0.15,
      overflow: 'linebreak'
    },
    headStyles: {
      fillColor: [23, 61, 143],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'left'
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 24 },
      2: { cellWidth: 42 },
      3: { cellWidth: 36 },
      4: { cellWidth: 30 },
      5: { cellWidth: 28 },
      6: { cellWidth: 56 },
      7: { cellWidth: 58 }
    }
  });

  this.dibujarPiePaginasPDF(doc);

  doc.save(`reporte-trabajos-${this.obtenerFechaArchivo()}.pdf`);

  this.mostrarToast('Reporte PDF descargado correctamente.', 'success');
} catch (error) {
  console.error('[ReporteTrabajosPage] Error al exportar PDF:', error);
  this.mostrarToast('No se pudo generar el PDF.', 'danger');
}


}

trackByTrabajo(
index: number,
trabajo: ReporteTrabajoVista
): string {
return trabajo.uid || String(index);
}

private obtenerResumenOperativo(
trabajos: ReporteTrabajoVista[]
) {
const total = trabajos.length;


const activos = trabajos.filter((item) =>
  item.estado === 'pendiente' ||
  item.estado === 'asignado' ||
  item.estado === 'en_camino' ||
  item.estado === 'en_proceso' ||
  item.estado === 'devolucion_pendiente'
).length;

const finalizados = trabajos.filter((item) =>
  item.estado === 'finalizado' ||
  item.estado === 'cerrado'
).length;

const devoluciones = trabajos.filter((item) =>
  item.estado === 'devolucion_pendiente' ||
  item.estado === 'devolucion_realizada'
).length;

const cancelados = trabajos.filter((item) =>
  item.estado === 'cancelado'
).length;

return {
  total,
  activos,
  finalizados,
  devoluciones,
  cancelados
};


}

private dibujarEncabezadoPDF(
doc: jsPDF,
logoBase64: string | null,
periodoTexto: string,
fechaEmision: string
) {
const pageWidth = doc.internal.pageSize.getWidth();


doc.setFillColor(23, 61, 143);
doc.rect(0, 0, pageWidth, 42, 'F');

doc.setFillColor(15, 35, 86);
doc.rect(0, 34, pageWidth, 8, 'F');

doc.setFillColor(255, 255, 255);
doc.roundedRect(14, 8, 34, 26, 4, 4, 'F');

if (logoBase64) {
  doc.addImage(logoBase64, 'PNG', 19, 12, 24, 18);
} else {
  doc.setFillColor(23, 61, 143);
  doc.circle(31, 21, 9, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text('CO', 31, 24, {
    align: 'center'
  });
}

doc.setTextColor(255, 255, 255);
doc.setFont('helvetica', 'bold');
doc.setFontSize(20);
doc.text('REPORTE OPERATIVO DE TRABAJOS', 55, 18);

doc.setFont('helvetica', 'normal');
doc.setFontSize(10);
doc.text('COMPROY S.A.C.', 55, 25);

doc.setFontSize(8);
doc.text(`Periodo: ${periodoTexto}`, 55, 32);
doc.text(`Fecha de emisión: ${fechaEmision}`, pageWidth - 14, 32, {
  align: 'right'
});


}

private dibujarResumenPDF(
doc: jsPDF,
resumen: {
total: number;
activos: number;
finalizados: number;
devoluciones: number;
cancelados: number;
}
) {
const y = 50;
const alto = 18;
const ancho = 48;
const espacio = 5;
const inicioX = 14;


this.dibujarTarjetaResumenPDF(
  doc,
  inicioX,
  y,
  ancho,
  alto,
  'Total',
  String(resumen.total),
  [23, 61, 143]
);

this.dibujarTarjetaResumenPDF(
  doc,
  inicioX + (ancho + espacio),
  y,
  ancho,
  alto,
  'Activos',
  String(resumen.activos),
  [37, 99, 235]
);

this.dibujarTarjetaResumenPDF(
  doc,
  inicioX + ((ancho + espacio) * 2),
  y,
  ancho,
  alto,
  'Finalizados',
  String(resumen.finalizados),
  [22, 163, 74]
);

this.dibujarTarjetaResumenPDF(
  doc,
  inicioX + ((ancho + espacio) * 3),
  y,
  ancho,
  alto,
  'Devoluciones',
  String(resumen.devoluciones),
  [124, 58, 237]
);

this.dibujarTarjetaResumenPDF(
  doc,
  inicioX + ((ancho + espacio) * 4),
  y,
  ancho,
  alto,
  'Cancelados',
  String(resumen.cancelados),
  [220, 38, 38]
);


}

private dibujarTarjetaResumenPDF(
doc: jsPDF,
x: number,
y: number,
ancho: number,
alto: number,
titulo: string,
valor: string,
color: [number, number, number]
) {
doc.setFillColor(248, 250, 252);
doc.roundedRect(x, y, ancho, alto, 3, 3, 'F');


doc.setDrawColor(226, 232, 240);
doc.roundedRect(x, y, ancho, alto, 3, 3, 'S');

doc.setFillColor(color[0], color[1], color[2]);
doc.roundedRect(x, y, 4, alto, 2, 2, 'F');

doc.setTextColor(102, 112, 133);
doc.setFont('helvetica', 'bold');
doc.setFontSize(8);
doc.text(titulo, x + 8, y + 7);

doc.setTextColor(16, 24, 40);
doc.setFontSize(14);
doc.text(valor, x + 8, y + 15);


}

private dibujarPiePaginasPDF(doc: jsPDF) {
const totalPaginas = doc.getNumberOfPages();
const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();


for (let pagina = 1; pagina <= totalPaginas; pagina++) {
  doc.setPage(pagina);

  doc.setDrawColor(226, 232, 240);
  doc.line(14, pageHeight - 13, pageWidth - 14, pageHeight - 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(102, 112, 133);

  doc.text(
    'Control operativo | Reporte operativo de trabajos',
    14,
    pageHeight - 8
  );

  doc.text(
    `Página ${pagina} de ${totalPaginas}`,
    pageWidth - 14,
    pageHeight - 8,
    {
      align: 'right'
    }
  );
}


}

private cargarImagenBase64(ruta: string): Promise<string | null> {
return new Promise((resolve) => {
const imagen = new Image();


  imagen.crossOrigin = 'anonymous';

  imagen.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = imagen.naturalWidth || imagen.width;
    canvas.height = imagen.naturalHeight || imagen.height;

    const contexto = canvas.getContext('2d');

    if (!contexto) {
      resolve(null);
      return;
    }

    contexto.drawImage(imagen, 0, 0);

    try {
      resolve(canvas.toDataURL('image/png'));
    } catch (error) {
      console.error('[ReporteTrabajosPage] Error al convertir logo:', error);
      resolve(null);
    }
  };

  imagen.onerror = () => {
    resolve(null);
  };

  imagen.src = ruta;
});


}

private normalizarFechaInput(valor: string): string {
return String(valor || '').slice(0, 10);
}

private formatearValorCsv(valor: any): string {
const texto = String(valor ?? '').replace(/"/g, '""');
return `"${texto}"`;
}

private obtenerPeriodoTexto(
fechaInicio: string,
fechaFin: string
): string {
if (fechaInicio && fechaFin) {
return `${fechaInicio} al ${fechaFin}`;
}


if (fechaInicio) {
  return `Desde ${fechaInicio}`;
}

if (fechaFin) {
  return `Hasta ${fechaFin}`;
}

return 'Todos los registros';


}

private obtenerFechaArchivo(): string {
const fecha = new Date();
const anio = fecha.getFullYear();
const mes = String(fecha.getMonth() + 1).padStart(2, '0');
const dia = String(fecha.getDate()).padStart(2, '0');


return `${anio}-${mes}-${dia}`;


}

private async mostrarToast(
message: string,
color: 'primary' | 'success' | 'danger' = 'primary'
) {
const toast = await this.toastCtrl.create({
message,
duration: 2300,
position: 'top',
color
});


await toast.present();

}
}
