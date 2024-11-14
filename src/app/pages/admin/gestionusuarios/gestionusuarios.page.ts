import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestionusuarios',
  templateUrl: './gestionusuarios.page.html',
  styleUrls: ['./gestionusuarios.page.scss'],
})
export class GestionusuariosPage implements OnInit {

  emails: string[] = [];  // Aquí almacenaremos los correos electrónicos

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getEmails();  // Llamar al método para obtener los correos
  }

  // Método para obtener los correos desde Realtime Database
  getEmails() {
    this.authService.getUsersEmails().subscribe((data: string[]) => {
      this.emails = data;  // Asumiendo que cada elemento es un correo electrónico
      console.log(this.emails);  // Puedes revisar la consola para ver si los correos se obtienen correctamente
    });
  }
}