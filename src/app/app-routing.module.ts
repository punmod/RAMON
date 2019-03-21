import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ProductAddComponent } from './product-add/product-add.component';


const routes: Routes = [
  
  
  {
    path: 'product-add',
    component: ProductAddComponent,
    data: { title: 'Add Product' }
  },
 
  { path: '',
    redirectTo: '/product-add',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
