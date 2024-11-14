import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacionesadminPage } from './notificacionesadmin.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacionesadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacionesadminPageRoutingModule {}
