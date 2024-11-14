// En el componente reportes.page.ts
import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {
  totalUsuarios: number = 0;
  porcentajeViajes: { activos: number, cancelados: number, terminados: number, enCurso: number } = { 
    activos: 0, cancelados: 0, terminados: 0, enCurso: 0 
  };
  porcentajeSolicitudes: number = 0;

  constructor(private reportesService: ReportesService) {}

  ngOnInit() {
    this.getUsuarios();
    this.getViajes();
  }

  // Definir los tipos de las variables para evitar errores de 'any'
  getUsuarios() {
    this.reportesService.getTotalUsuarios().subscribe((usuarios: any[]) => {
      this.totalUsuarios = usuarios.length;
    });
  }

  getViajes() {
    this.reportesService.getViajes().subscribe((viajes: any[]) => {
      const totalViajes = viajes.length;
      if (totalViajes > 0) {
        const activos = viajes.filter((viaje: any) => viaje.estado === 'activo').length;
        const cancelados = viajes.filter((viaje: any) => viaje.estado === 'cancelado').length;
        const terminados = viajes.filter((viaje: any) => viaje.estado === 'terminado').length;
        const enCurso = viajes.filter((viaje: any) => viaje.estado === 'en curso').length;

        this.porcentajeViajes = {
          activos: (activos / totalViajes) * 100,
          cancelados: (cancelados / totalViajes) * 100,
          terminados: (terminados / totalViajes) * 100,
          enCurso: (enCurso / totalViajes) * 100
        };
      }
    });
  }
}