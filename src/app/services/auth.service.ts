import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interfaces para la estructura de datos
interface Viaje {
  asientos: number;
  asientosDisponibles: number;
  conductorId: string;
  costo: number;
  descripcion: string;
  destino: string;
  destinoCoords: any;
  estado: string;
  ruta: string;
}

interface Usuario {
  email: string;
  viajes: { [key: string]: Viaje };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private realtimedb: AngularFireDatabase
  ) {}

  // Registro de usuario
  async register(email: string, password: string) {
    try {
      const credenciales = await this.afAuth.createUserWithEmailAndPassword(email, password);

      if (credenciales.user) {
        await credenciales.user.sendEmailVerification();

        const userData = {
          uid: credenciales.user.uid,
          email: email,
          role: 'user'  // Rol predeterminado
        };
        await this.saveUserData(userData);
      }

      return credenciales;
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  }

  // Guardar datos del usuario en Firestore y Realtime Database
  async saveUserData(user: any) {
    try {
      // Guardar en Firestore
      await this.firestore.collection('users').doc(user.uid).set(user);

      // Guardar en Realtime Database
      await this.realtimedb.object(`/usuarios/${user.uid}`).set({
        email: user.email,
        viajes: {}  // Inicializar objeto de viajes vacío
      });
    } catch (error) {
      console.error('Error al guardar datos del usuario:', error);
      throw error;
    }
  }

  // Iniciar sesión
  async login(email: string, password: string) {
    try {
      const credenciales = await this.afAuth.signInWithEmailAndPassword(email, password);

      if (credenciales.user?.emailVerified) {
        return credenciales;
      } else {
        throw new Error('Correo no verificado. Por favor, verifica tu correo antes de iniciar sesión.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  // Obtener lista de correos electrónicos
  getUsersEmails(): Observable<any> {
    return this.realtimedb.list('/usuarios').snapshotChanges().pipe(
      map(users => {
        return users.map(user => {
          const userData = user.payload.val() as { email: string };

          if (!userData || !userData.email) {
            console.error('Datos del usuario no válidos:', userData);
            return null;
          }

          return userData.email;
        }).filter(email => email !== null);
      })
    );
  }

  // Obtener datos de viajes de todos los usuarios
  getViajesData(): Observable<any[]> {
    return this.realtimedb.list('/usuarios').snapshotChanges().pipe(
      map(users => {
        return users.map(user => {
          const userData = user.payload.val() as { email: string, viajes: any };

          if (!userData || !userData.email) {
            console.error('Datos del usuario no válidos:', userData);
            return null;
          }

          const viajes = userData.viajes || {};
          const viajesDetails = Object.keys(viajes).map(vi => ({
            ...viajes[vi],
            id: vi,
          }));

          return {
            email: userData.email,
            viajes: viajesDetails,
          };
        }).filter(user => user !== null);
      })
    );
  }

  // Obtener total de usuarios
  getTotalUsuarios(): Observable<number> {
    return this.realtimedb.list('/usuarios').valueChanges().pipe(
      map(users => users.length)
    );
  }

  // Obtener porcentaje de viajes activos y realizados
  getPorcentajeViajes(): Observable<{ activos: number, realizados: number }> {
    return this.realtimedb.list('/usuarios').valueChanges().pipe(
      map((users: any[]) => {
        let totalViajes = 0;
        let viajesActivos = 0;

        users.forEach(user => {
          const viajes = user.viajes || {};
          Object.values(viajes).forEach((viaje: any) => {
            totalViajes++;
            if (viaje.estado === 'activo') {
              viajesActivos++;
            }
          });
        });

        const viajesRealizados = totalViajes - viajesActivos;
        return {
          activos: totalViajes > 0 ? (viajesActivos / totalViajes) * 100 : 0,
          realizados: totalViajes > 0 ? (viajesRealizados / totalViajes) * 100 : 0
        };
      })
    );
  }

  // Obtener porcentaje de usuarios con solicitudes
  getPorcentajeSolicitudes(): Observable<number> {
    return this.realtimedb.list('/usuarios').valueChanges().pipe(
      map((users: any[]) => {
        let totalUsuarios = users.length;
        let usuariosConSolicitudes = 0;

        users.forEach(user => {
          if (user.viajes && Object.keys(user.viajes).length > 0) {
            usuariosConSolicitudes++;
          }
        });

        return totalUsuarios > 0 ? (usuariosConSolicitudes / totalUsuarios) * 100 : 0;
      })
    );
  }

  // Cerrar sesión
  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }
}