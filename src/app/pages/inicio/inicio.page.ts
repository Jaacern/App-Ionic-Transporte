import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  role: string = '';  // Para almacenar el rol del usuario

  constructor(private router: Router) { }

  ngOnInit() {
    // Obtener el rol desde localStorage
    this.role = localStorage.getItem('role') || '';
  }

  logout() {
    // Limpiar localStorage y redirigir al login
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
