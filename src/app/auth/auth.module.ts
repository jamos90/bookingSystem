import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';


const routes: Routes = [
   
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
] 

@NgModule({
  declarations: [
      LoginComponent,
      RegisterComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: []
})
export class AuthModule { }