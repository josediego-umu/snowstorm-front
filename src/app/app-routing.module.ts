import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HandlerMessageComponent } from './handler/handler-message/handler-message.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { DataStructComponent } from './components/data-struct/data-struct.component';
import { MatDialogActions } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';
import { SearchComponent } from './components/search/search.component';


const routes: Routes = [
  { path: '', component : HomeComponent },
  { path: 'register', component : RegisterComponent },
  { path:'login', component: LoginComponent},
  { path: 'message', component : HandlerMessageComponent },
  { path: 'profile', component : ProfileComponent },
  { path: 'project/new', component : ProjectFormComponent },
  { path: 'project/:id', component : DataStructComponent },
  { path: 'modal', component : ModalComponent },
  { path: 'search', component : SearchComponent },
  //{ path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
