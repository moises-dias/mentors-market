import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


import { IonicModule } from '@ionic/angular';

import { NewProductPageRoutingModule } from './new-product-routing.module';

import { NewProductPage } from './new-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewProductPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [NewProductPage]
})
export class NewProductPageModule {}
