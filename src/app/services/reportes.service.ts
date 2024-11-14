// services/reportes.service.ts
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private db: AngularFireDatabase) { }

  // Obtener el número total de usuarios registrados
  getTotalUsuarios(): Observable<any> {
    return this.db.list('usuarios').valueChanges();
  }

  // Obtener el número de viajes
  getViajes(): Observable<any> {
    return this.db.list('viajes').valueChanges();
  }
}