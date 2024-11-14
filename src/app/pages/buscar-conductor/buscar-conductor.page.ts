import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Conductor {
  nombre: string;
  destino: string;
  asientos: number;
  costo: number;
}

@Component({
  selector: 'app-buscar-conductor',
  templateUrl: './buscar-conductor.page.html',
  styleUrls: ['./buscar-conductor.page.scss'],
})
export class BuscarConductorPage implements OnInit {
  destino: string = '';
  conductores: Conductor[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.destino = params['destino'];
      this.buscarConductores();
    });
  }

  buscarConductores() {
    // Simulación de conductores disponibles para el destino especificado
    if (this.destino.toLowerCase() === 'centro') {
      this.conductores = [
        { nombre: 'Juan Pérez', destino: 'Centro', asientos: 3, costo: 1500 },
        { nombre: 'Ana López', destino: 'Centro', asientos: 2, costo: 1200 },
      ];
    } else {
      this.conductores = [];
    }
  }

  solicitarViaje(conductor: Conductor) {
    console.log(`Solicitando viaje con el conductor: ${conductor.nombre}`);
    // Aquí podrías implementar la lógica para confirmar la solicitud del viaje
  }
}
