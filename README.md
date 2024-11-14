
# TeLlevoAPP

TeLlevoAPP es una aplicación móvil desarrollada en **Ionic Angular** que conecta a estudiantes con transporte propio con aquellos que necesitan un medio de transporte para regresar a casa después de clases. La aplicación facilita la creación y aceptación de viajes, promoviendo el compañerismo y ayudando a reducir la huella de carbono.

## 📱 Características

- **Registro e Inicio de Sesión**:  
  Autenticación mediante correo electrónico y contraseña utilizando **Firebase Authentication**.

- **Selección de Rol**:  
  Los usuarios pueden elegir entre ser **conductores** o **pasajeros**.

- **Creación de Viajes**:  
  Los conductores pueden crear viajes especificando el **destino**, **costo por persona** y el **número de asientos disponibles**.

- **Aceptación de Viajes**:  
  Los pasajeros pueden ver los viajes disponibles y aceptar uno. Al hacerlo, **reservan un asiento** y pueden ver la **ruta** y la **ubicación del conductor** en tiempo real.

- **Mapa en Tiempo Real**:  
  Utiliza **Mapbox** para mostrar las **rutas** y las **ubicaciones en tiempo real**.

- **Historial de Viajes**:  
  Los usuarios pueden consultar un historial de los **viajes** que han creado o aceptado.

## 🛠️ Tecnologías Utilizadas

- **Ionic Angular**: Framework para el desarrollo de aplicaciones móviles híbridas.
- **Firebase**: Utilizado para la **autenticación** y la **base de datos en tiempo real**.
- **Mapbox**: Integración de **mapas** y **visualización de rutas**.
- **Capacitor Geolocation**: Para obtener la **ubicación actual** del usuario.

## 📝 Instalación

Para ejecutar esta aplicación localmente, sigue estos pasos:

### 🔧 Prerrequisitos

Asegúrate de tener instalados los siguientes programas:

- **Node.js**
- **Ionic CLI**
- **Firebase CLI**
- **Capacitor CLI**

### 📥 Pasos de Instalación

1. **Clona este repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/TeLlevoAPP.git
   ```

2. **Navega al directorio del proyecto**:

   ```bash
   cd TeLlevoAPP
   ```

3. **Instala las dependencias del proyecto**:

   ```bash
   npm install
   ```

4. **Configura Firebase**:

   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
   - Agrega la configuración de Firebase en los archivos `environment.ts` y `environment.prod.ts`.

5. **Instala Capacitor Plugins**:

   ```bash
   npm install @capacitor/core @capacitor/cli
   npm install @capacitor/geolocation @capacitor/google-maps
   ```

6. **Sincroniza Capacitor**:

   ```bash
   npx cap sync
   ```

7. **Inicia la aplicación en tu navegador**:

   ```bash
   ionic serve
   ```

### 📦 Publicación del APK

Para compilar y generar la versión para Android, sigue estos pasos:

1. **Compila la aplicación**:

   ```bash
   ionic build
   ```

2. **Agrega la plataforma Android**:

   ```bash
   npx cap add android
   ```

3. **Abre el proyecto en Android Studio**:

   ```bash
   npx cap open android
   ```

## 💡 Contribución

Las contribuciones son bienvenidas. Si deseas mejorar esta aplicación o agregar nuevas funcionalidades, no dudes en hacer un fork y enviar un pull request.

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT.

---

### Explicación de los iconos:

- 📱 **Características**: Icono que representa las funcionalidades generales de la aplicación.
- 🛠️ **Tecnologías Utilizadas**: Icono de herramientas que destaca las tecnologías clave.
- 📝 **Instalación**: Icono de papel y lápiz, ideal para describir los pasos de instalación.
- 🔧 **Prerrequisitos**: Icono de herramienta para representar las dependencias necesarias.
- 📦 **Publicación del APK**: Caja o paquete, relacionado con la distribución del APK.
- 💡 **Contribución**: Bombilla, simboliza ideas y contribuciones abiertas.
- 📄 **Licencia**: Icono de documento, indicando la información sobre la licencia del proyecto.
