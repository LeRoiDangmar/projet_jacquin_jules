import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './users-page/users-page.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule

const routes: Routes = [
  { path: '', component: UsersPageComponent }
];

@NgModule({
  declarations: [
    UsersPageComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class UsersModule { }
