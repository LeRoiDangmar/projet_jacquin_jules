import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './users-page/users-page.component';

const routes: Routes = [
  { path: '', component: UsersPageComponent }
];

@NgModule({
  declarations: [
    UsersPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ]
})
export class UsersModule { }
