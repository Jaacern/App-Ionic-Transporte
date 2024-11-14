import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarConductorPage } from './buscar-conductor.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarConductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarConductorPageRoutingModule {}
