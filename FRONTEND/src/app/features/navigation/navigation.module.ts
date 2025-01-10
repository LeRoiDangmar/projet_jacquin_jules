import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { SearchbarComponent } from './menu/searchbar/searchbar.component';
import { CategoriesComponent } from './menu/categories/categories.component';
import { CardsComponent } from './menu/cards/cards.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './menu/cart/cart.component';
import { AuthModule } from '../auth/auth.module';
import { AuthComponent } from './menu/auth/auth.component';
import { UsersComponent } from './menu/users/users.component';

const routes: Routes = [
  { path: '', component: MenuComponent }
];

@NgModule({
  declarations: [
    MenuComponent,
    SearchbarComponent,
    CategoriesComponent,
    CardsComponent,
    CartComponent,
    AuthComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterOutlet,
    FormsModule,
    AuthModule
  ],
  exports: [
    MenuComponent,
    RouterModule,
    SearchbarComponent,
    CategoriesComponent,
    CardsComponent,
    RouterOutlet,
    FormsModule,
    AuthModule,
    UsersComponent
  ]
})
export class NavigationModule { }
