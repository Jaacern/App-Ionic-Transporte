import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializar el almacenamiento
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Establecer un valor en el almacenamiento
  async setItem(key: string, value: any): Promise<void> {
    if (this._storage) {
      await this._storage['set'](key, value);  // Usar la sintaxis de corchetes
    }
  }

  // Obtener un valor del almacenamiento
  async getItem(key: string): Promise<any> {
    if (this._storage) {
      return await this._storage['get'](key);  // Usar la sintaxis de corchetes
    }
    return null;
  }

  // Eliminar un valor del almacenamiento
  async removeItem(key: string): Promise<void> {
    if (this._storage) {
      await this._storage['remove'](key);  // Usar la sintaxis de corchetes
    }
  }

  // Obtener todos los datos pendientes almacenados en 'pendingData'
  async getAllPendingData(): Promise<any[]> {
    if (this._storage) {
      return await this._storage['get']('pendingData') || [];  // Usar la sintaxis de corchetes
    }
    return [];
  }

  // Establecer datos pendientes
  async setPendingData(data: any): Promise<void> {
    let pendingData = await this.getAllPendingData();
    pendingData.push(data);
    await this.setItem('pendingData', pendingData);
  }

  // Limpiar los datos pendientes
  async clearPendingData(): Promise<void> {
    await this.removeItem('pendingData');
  }
}
