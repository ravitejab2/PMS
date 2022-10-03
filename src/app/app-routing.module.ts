import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeRegisterComponent } from './admin/employee-register/employee-register.component';

import { AuthGuardService } from './authGuard/auth.guard';
import { ForgotPasswordComponent } from './landing-screens/forgot-password/forgot-password.component';
import { SharedSidenavComponent } from './layouts/shared-sidenav/shared-sidenav.component';
import { LoginComponent } from './landing-screens/login/login.component';
import { RegisterComponent } from './landing-screens/register/register.component';
import { ChangePasswordComponent } from './landing-screens/change-password/change-password.component';
import { InboxComponent } from './admin/inbox/inbox.component';


const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'inbox',component:InboxComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'change-password',component:ChangePasswordComponent,canActivate:[AuthGuardService]},
  
  {path: 'dashboard',component: SharedSidenavComponent,
  children: [
    
  {
    path: 'emp-register',
    component: EmployeeRegisterComponent
  }, 

  {
    path: '',
    component: InboxComponent
  }]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
