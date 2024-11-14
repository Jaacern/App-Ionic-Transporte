import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Network } from '@capacitor/network';  // Importar el Network

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  password: string = '';
  canProceed: boolean = false;
  nombreError: string = '';
  apellidoError: string = '';
  emailError: string = '';
  passwordError: string = '';

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {
    this.listenNetworkChanges();  // Escuchar cambios de red
  }

  // Validar todos los campos
  Validar() {
    this.nombreError = this.nombre.length >= 5 ? '' : 'El nombre debe tener al menos 5 caracteres.';
    this.apellidoError = this.apellido.length >= 5 ? '' : 'El apellido debe tener al menos 5 caracteres.';
    this.emailError = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email) ? '' : 'Introduce un correo electrónico válido.';
    this.passwordError = this.password.length >= 8 ? '' : 'La contraseña debe tener al menos 8 caracteres.';

    this.canProceed = !this.nombreError && !this.apellidoError && !this.emailError && !this.passwordError;
  }

  // Mostrar Toast con el mensaje
  async presentToast(message: string) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = 5000;
    toast.cssClass = 'toast-success';  // Aplica la clase personalizada
    document.body.appendChild(toast);
    return toast.present();
  }

  // Registrar el usuario y manejar conexión
  async registrarUsuario() {
    if (this.canProceed) {
      const usuario = {
        nombre: this.nombre.trim(),
        apellido: this.apellido.trim(),
        email: this.email.trim(),
        password: this.password.trim(),
      };

      try {
        // Verificar conexión antes de continuar
        const status = await Network.getStatus();
        if (status.connected) {
          // Si hay conexión, registrar normalmente
          const credenciales = await this.authService.register(usuario.email, usuario.password);
          await this.authService.saveUserData({
            ...usuario,
            uid: credenciales.user?.uid,
            emailVerified: false
          });

          // Mensaje y redirección
          this.presentToast('Registro exitoso. Por favor revisa tu correo para verificar tu cuenta.');
          this.router.navigate(['/home']);
        } else {
          // Si no hay conexión, guardar los datos localmente
          await this.storageService.setPendingData(usuario);

          this.presentToast('Conexión perdida. Los datos se guardaron localmente para enviarlos cuando la conexión se restablezca.');
        }
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
        this.presentToast('Hubo un error, por favor intentalo más tarde.');
      }
    } else {
      this.presentToast('Por favor completa todos los campos correctamente.');
    }
  }

  // Escuchar los cambios de red
  listenNetworkChanges() {
    Network.addListener('networkStatusChange', async (status) => {
      if (status.connected) {
        this.presentToast('Conexión establecida. Enviando datos pendientes.');
        
        // Obtener los datos pendientes y enviarlos
        const pendingData = await this.storageService.getAllPendingData();
        for (const data of pendingData) {
          try {
            const credenciales = await this.authService.register(data.email, data.password);
            await this.authService.saveUserData({
              ...data,
              uid: credenciales.user?.uid,
              emailVerified: false
            });
          } catch (error) {
            console.error('Error al reintentar envío de datos:', error);
          }
        }

        // Limpiar datos pendientes después de enviarlos
        await this.storageService.clearPendingData();
      } else {
        this.presentToast('Conexión perdida. Los datos se guardaron localmente.');
      }
    });
  }
}
