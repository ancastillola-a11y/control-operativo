// src/app/paginas/administrador/reporte-empleados/reporte-empleados.page.ts
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


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
  closeCircleOutline,
  documentTextOutline,
  downloadOutline,
  peopleOutline,
  personOutline,
  timeOutline,
  trashOutline,
  warningOutline
} from 'ionicons/icons';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { DashboardAdminService } from '../../../procesos/dashboard-admin.service';
import { ReporteEmpleadosService } from '../../../procesos/reporte-empleados.service';

import {
  FiltroReporteEmpleados,
  ReporteEmpleadoVista,
  ReporteEmpleadosVM
} from '../../../modelos/reporte-empleados';

import { AdminHeaderComponent } from '../../../shared/componentes/admin-header/admin-header.component';
import { AdminBottomNavComponent } from '../../../shared/componentes/admin-bottom-nav/admin-bottom-nav.component';
import { AdminEmptyStateComponent } from '../../../shared/componentes/admin-empty-state/admin-empty-state.component';

@Component({
  selector: 'app-reporte-empleados',
  templateUrl: './reporte-empleados.page.html',
  styleUrls: ['./reporte-empleados.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    AdminHeaderComponent,
    AdminBottomNavComponent,
    AdminEmptyStateComponent
  ]
})
export class ReporteEmpleadosPage {
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private cdr = inject(ChangeDetectorRef);

  private dashboardAdminService = inject(DashboardAdminService);
  private reporteEmpleadosService = inject(ReporteEmpleadosService);




  private readonly logoReportePath = 'assets/img/logo.png';

  adminVm$ = this.dashboardAdminService.obtenerPanelAdmin$();
  vm$: Observable<ReporteEmpleadosVM> = this.reporteEmpleadosService.vm$;

  filtros: {
    valor: FiltroReporteEmpleados;
    texto: string;
  }[] = [
    { valor: 'todos', texto: 'Todos' },
    { valor: 'activos', texto: 'Activos' },
    { valor: 'inactivos', texto: 'Inactivos' },
    { valor: 'con_trabajos', texto: 'Con trabajos' },
    { valor: 'sin_trabajos', texto: 'Sin trabajos' },
    { valor: 'pendientes', texto: 'Pendientes' },
    { valor: 'en_proceso', texto: 'En proceso' },
    { valor: 'finalizados', texto: 'Finalizados' }
  ];

  constructor() {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'bar-chart-outline': barChartOutline,
      'briefcase-outline': briefcaseOutline,
      'calendar-outline': calendarOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'close-circle-outline': closeCircleOutline,
      'document-text-outline': documentTextOutline,
      'download-outline': downloadOutline,
      'people-outline': peopleOutline,
      'person-outline': personOutline,
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


  cambiarFiltro(filtro: FiltroReporteEmpleados) {
    this.reporteEmpleadosService.cambiarFiltro(filtro);
  }

  cambiarFechaInicio(valor: string) {
    this.reporteEmpleadosService.cambiarFechaInicio(
      this.normalizarFechaInput(valor)
    );
  }

  cambiarFechaFin(valor: string) {
    this.reporteEmpleadosService.cambiarFechaFin(
      this.normalizarFechaInput(valor)
    );
  }

  limpiarFechas() {
    this.reporteEmpleadosService.limpiarRangoFechas();
  }

  volverReportes() {
    this.navCtrl.navigateRoot('/reportes', {
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

  abrirModuloEmpleados() {
    this.navCtrl.navigateRoot('/empleados', {
      animated: false,
      replaceUrl: true
    });
  }

  exportarExcel(
    empleados: ReporteEmpleadoVista[],
    fechaInicio: string = '',
    fechaFin: string = ''
  ) {
    if (!empleados || empleados.length === 0) {
      this.mostrarToast('No hay datos para exportar.', 'primary');
      return;
    }

    const encabezados = [
      'Código',
      'Empleado',
      'Cargo',
      'Estado',
      'Número',
      'Trabajos',
      'Pendientes',
      'En camino',
      'En proceso',
      'Finalizados',
      'Cancelados',
      '% Finalización',
      'Fecha ingreso',
      'Último trabajo'
    ];

    const filas = empleados.map((empleado) => [
      empleado.codigo,
      empleado.nombre,
      empleado.cargo,
      empleado.estadoTexto,
     empleado.telefono,
      empleado.totalTrabajos,
      empleado.pendientes,
      empleado.enCamino,
      empleado.enProceso,
      empleado.finalizados,
      empleado.cancelados,
      empleado.porcentajeFinalizacion + '%',
      empleado.fechaIngresoTexto,
      empleado.ultimoTrabajoTexto
    ]);

    const contenidoFilas: any[][] = [
      ['Reporte de empleados'],
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
    enlace.download = `reporte-empleados-${this.obtenerFechaArchivo()}.csv`;
    enlace.click();

    window.URL.revokeObjectURL(url);

    this.mostrarToast('Reporte exportado para Excel.', 'success');
  }

  async exportarPDF(
    empleados: ReporteEmpleadoVista[],
    fechaInicio: string = '',
    fechaFin: string = ''
  ) {
    if (!empleados || empleados.length === 0) {
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
      const resumen = this.obtenerResumenPDF(empleados);

      this.dibujarEncabezadoPDF(
        doc,
        logoBase64,
        periodoTexto,
        fechaEmision
      );

      this.dibujarResumenPDF(doc, resumen);

      const cuerpoTabla = empleados.map((empleado, index) => [
        String(index + 1),
        empleado.codigo,
        empleado.nombre,
        empleado.cargo,
        empleado.estadoTexto,
        String(empleado.totalTrabajos),
        String(empleado.pendientes),
        String(empleado.enCamino + empleado.enProceso),
        String(empleado.finalizados),
        String(empleado.cancelados),
        empleado.porcentajeFinalizacion + '%'
      ]);

      autoTable(doc, {
        startY: 80,
        head: [[
          'N°',
          'Código',
          'Empleado',
          'Cargo',
          'Estado',
          'Trab.',
          'Pend.',
          'Proceso',
          'Fin.',
          'Canc.',
          '% Fin.'
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
          cellPadding: 2,
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
        }
      });

      this.dibujarPiePaginasPDF(doc);

      doc.save(`reporte-empleados-${this.obtenerFechaArchivo()}.pdf`);

      this.mostrarToast('Reporte PDF descargado correctamente.', 'success');
    } catch (error) {
      console.error('[ReporteEmpleadosPage] Error al exportar PDF:', error);
      this.mostrarToast('No se pudo generar el PDF.', 'danger');
    }
  }

  trackByEmpleado(
    index: number,
    empleado: ReporteEmpleadoVista
  ): string {
    return empleado.uid || String(index);
  }

  private obtenerResumenPDF(empleados: ReporteEmpleadoVista[]) {
    return {
      total: empleados.length,
      activos: empleados.filter((item) => item.estado === 'activo').length,
      conTrabajos: empleados.filter((item) => item.totalTrabajos > 0).length,
      finalizados: empleados.reduce((total, item) => total + item.finalizados, 0),
      pendientes: empleados.reduce((total, item) => total + item.pendientes, 0)
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
    }

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('REPORTE DE EMPLEADOS', 55, 18);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Control operativo administrativo', 55, 25);

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
      conTrabajos: number;
      finalizados: number;
      pendientes: number;
    }
  ) {
    const y = 50;
    const alto = 18;
    const ancho = 48;
    const espacio = 5;
    const inicioX = 14;

    this.dibujarTarjetaResumenPDF(doc, inicioX, y, ancho, alto, 'Total', String(resumen.total), [23, 61, 143]);
    this.dibujarTarjetaResumenPDF(doc, inicioX + (ancho + espacio), y, ancho, alto, 'Activos', String(resumen.activos), [22, 163, 74]);
    this.dibujarTarjetaResumenPDF(doc, inicioX + ((ancho + espacio) * 2), y, ancho, alto, 'Con trabajos', String(resumen.conTrabajos), [37, 99, 235]);
    this.dibujarTarjetaResumenPDF(doc, inicioX + ((ancho + espacio) * 3), y, ancho, alto, 'Finalizados', String(resumen.finalizados), [22, 163, 74]);
    this.dibujarTarjetaResumenPDF(doc, inicioX + ((ancho + espacio) * 4), y, ancho, alto, 'Pendientes', String(resumen.pendientes), [245, 158, 11]);
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
        'Control operativo | Reporte de empleados',
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
        } catch {
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