import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Utilisateur } from '../../shared/models/Utilisateur.model';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AuthModule { }