import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GestionusuariosPageRoutingModule } from './gestionusuarios-routing.module';
import { GestionusuariosPage } from './gestionusuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionusuariosPageRoutingModule
  ],
  declarations: [GestionusuariosPage]
})
export class GestionusuariosPageModule {}