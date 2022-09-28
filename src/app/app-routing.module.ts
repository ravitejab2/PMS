import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardService } from './authGuard/auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedFooterComponent } from './layouts/shared-footer/shared-footer.component';
import { SharedSidenavComponent } from './layouts/shared-sidenav/shared-sidenav.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedLandingToolbarComponent } from './shared-landing-toolbar/shared-landing-toolbar.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';

const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:SharedSidenavComponent,canActivate: [AuthGuardService]},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'change-password',component:ChangePasswordComponent,canActivate: [AuthGuardService]},
  {path:'routing',component:SharedFooterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
