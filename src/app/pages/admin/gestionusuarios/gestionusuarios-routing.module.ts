import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionusuariosPage } from './gestionusuarios.page';

const routes: Routes = [
  {
    path: '',
    component: GestionusuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionusuariosPageRoutingModule {}
