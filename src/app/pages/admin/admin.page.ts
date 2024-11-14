import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gestionarUsuarios() {
    console.log('Gestionar Usuarios');
  }

  gestionarSolicitudes() {
    console.log('Revisar Solicitudes de Transporte');
  }

  verReportes() {
    console.log('Ver Reportes');
  }

  enviarNotificaciones() {
    console.log('Enviar Notificaciones');
  }

  logout() {
    console.log('Cerrar Sesión');
    this.router.navigate(['/home']);
  }
}
