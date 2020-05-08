import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductInfoPage } from './product-info.page';

const routes: Routes = [
  {
    path: '',
    component: ProductInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductInfoPageRoutingModule {}
