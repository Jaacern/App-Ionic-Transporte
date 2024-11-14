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
    this.router.navigate(['/gestionusuarios']);  // Navegar a la página de gestión de usuarios
  }

  gestionarSolicitudes() {
    console.log('Revisar Solicitudes de Transporte');
    this.router.navigate(['/solicitudes']);
  }

  verReportes() {
    console.log('Ver Reportes');
    this.router.navigate(['/reportes']);
  }

  enviarNotificaciones() {
    console.log('Enviar Notificaciones');
    this.router.navigate(['/notificacionesadmin']);
  }

  logout() {
    console.log('Cerrar Sesión');
    this.router.navigate(['/home']);
  }
}
