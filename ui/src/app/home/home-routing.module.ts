import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from '../components/product/product.component';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';
import { CartComponent } from '../components/cart/cart.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../guards/index';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
     canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/home/product',
        pathMatch: 'full',
      },
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'detail/:id',
        component: ProductDetailComponent
      },
      {
        path: 'cart',
        component: CartComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }