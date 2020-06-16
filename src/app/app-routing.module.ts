import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { 
    path: 'home', 
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule),
    // canLoad: [AuthGuard]
  },
  // {
  //   path: 'product-info',
  //   loadChildren: () => import('./product-info/product-info.module').then( m => m.ProductInfoPageModule)
  // },
  {
    path: 'new-product',
    loadChildren: () => import('./new-product/new-product.module').then( m => m.NewProductPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'chats-list',
    loadChildren: () => import('./chats-list/chats-list.module').then( m => m.ChatsListPageModule)
  },
  // { 
  //   path: '404', 
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) 
  // },
  // { 
  //   path: '**', 
  //   redirectTo: '404' 
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
