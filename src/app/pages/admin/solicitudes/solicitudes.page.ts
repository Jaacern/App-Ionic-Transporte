import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; // Importa el AuthService
import { Observable } from 'rxjs';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage implements OnInit {
  usuariosConViajes: any[] = []; // Lista para almacenar los usuarios con viajes

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Cargar los usuarios y sus viajes
    this.authService.getViajesData().subscribe((data) => {
      this.usuariosConViajes = data;
    });
  }
}  