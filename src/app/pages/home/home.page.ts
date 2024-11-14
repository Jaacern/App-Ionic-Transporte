import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';       // Servicio de Autenticación
import { StorageService } from '../../services/storage.service'; // Servicio de Storage
import { Network } from '@capacitor/network'; // Importar el Network

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  email: string = '';
  password: string = '';
  showPassword: boolean = false; // Variable para controlar la visibilidad de la contraseña

  constructor(
    private authService: AuthService, 
    private storageService: StorageService, 
    private router: Router
  ) {}

  // Estado de la conexión de red
  networkStatus: string = 'Sin conexión';  // Inicializado como 'Sin conexión'

  async ngOnInit() {
    // Verificar si hay un usuario guardado en el almacenamiento local
    const usuarioGuardado = await this.storageService.getItem('usuario_actual');
    if (usuarioGuardado) {
      // Si hay un usuario guardado, redirigir a la página de selección de rol
      this.router.navigate(['/role-selection']);
    }

    // Escuchar los cambios en el estado de la red
    Network.addListener('networkStatusChange', async (status) => {
      if (status.connected) {
        this.networkStatus = 'Conectado';
        // Verificar si hay datos pendientes de enviar
        const datosPendientes = await this.storageService.getAllPendingData();
        if (datosPendientes.length > 0) {
          // Si hay datos pendientes, enviarlos
          for (let data of datosPendientes) {
            try {
              await this.authService.saveUserData(data);  // Guardar datos en Firestore
              await this.storageService.removeItem('pendingData'); // Limpiar datos pendientes
              this.presentToast('Datos enviados correctamente.');
            } catch (error) {
              console.error('Error al enviar datos pendientes', error);
            }
          }
        }
      } else {
        this.networkStatus = 'Sin conexión';
        this.presentToast('Conexión perdida. Los datos se guardaron temporalmente.');
      }
    });
  }

  // Función para enviar el formulario de inicio de sesión
  async onSubmit() {
    try {
      const credenciales = await this.authService.login(this.email.trim(), this.password.trim());
      const usuarioInfo = {
        uid: credenciales.user?.uid,
        email: credenciales.user?.email
      };

      // Guardar los datos del usuario en el almacenamiento local
      await this.storageService.setItem('usuario_actual', usuarioInfo);

      // Redirigir a la página de selección de rol
      this.router.navigate(['/role-selection']);

      // Si estamos conectados, mostrar mensaje de éxito
      if (this.networkStatus === 'Conectado') {
        this.presentToast('Inicio de sesión exitoso.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Verificar si el error tiene la propiedad 'message'
      if (error instanceof Error) {
        this.presentToast(error.message);
      } else {
        this.presentToast('Ocurrió un error desconocido.');
      }
    }
  }

  // Alternar visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Alternar la visibilidad de la contraseña
  }

  // Función para mostrar mensajes toast
  async presentToast(message: string) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = 3000;
    toast.position = 'bottom'; // Mostrar en la parte inferior
    document.body.appendChild(toast);
    return toast.present();
  }
}
