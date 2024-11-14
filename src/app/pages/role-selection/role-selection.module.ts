import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoleSelectionPageRoutingModule } from './role-selection-routing.module';

import { RoleSelectionPage } from './role-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoleSelectionPageRoutingModule
  ],
  declarations: [RoleSelectionPage]
})
export class RoleSelectionPageModule {}
