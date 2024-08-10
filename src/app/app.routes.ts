import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { AboutComponent } from './layout/pages/about/about.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { authguardGuard } from './shared/guards/authguard.guard';

export const routes: Routes = [
    {path:"" , component: HomeComponent},
    {path:"home" , component: HomeComponent},
    {path:"about" , component: AboutComponent , canActivate : [authguardGuard]},
    {path:"products" , component: ProductsComponent ,canActivate : [authguardGuard]},
    {path:"register" , component: RegisterComponent},
    {path:"login" , component: LoginComponent},
    {path:"cart" , component: CartComponent, canActivate : [authguardGuard]},
    {path:"**" , component: HomeComponent},
];
