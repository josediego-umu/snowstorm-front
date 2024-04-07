import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HandlerMessageComponent } from './handler-message/handler-message.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { DataStructComponent } from './data-struct/data-struct.component';


const routes: Routes = [
  { path: '', component : HomeComponent },
  { path: 'register', component : RegisterComponent },
  { path:'login', component: LoginComponent},
  { path: 'message', component : HandlerMessageComponent },
  { path: 'profile', component : ProfileComponent },
  { path: 'project/new', component : ProjectFormComponent },
  { path: 'project/:id', component : DataStructComponent },
  //{ path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
