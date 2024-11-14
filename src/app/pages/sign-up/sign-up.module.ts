import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // le agregue esto igual el tema del custom_elements
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';

@NgModule({
  imports: [CommonModule, FormsModule,IonicModule,SignUpPageRoutingModule],
  declarations: [SignUpPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // le agregue esto
})
export class SignUpPageModule {}
