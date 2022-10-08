import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeRegisterComponent } from './admin/employee-register/employee-register.component';

import { AuthGuardService } from './authGuard/auth.guard';
import { ForgotPasswordComponent } from './landing-screens/forgot-password/forgot-password.component';
import { SharedSidenavComponent } from './layouts/shared-sidenav/shared-sidenav.component';
import { LoginComponent } from './landing-screens/login/login.component';
import { RegisterComponent } from './landing-screens/register/register.component';
import { ChangePasswordComponent } from './landing-screens/change-password/change-password.component';

import { EmployeeDetailsComponent } from './admin/employee-details/employee-details.component';
import { PatientDetailsComponent } from './admin/patient-details/patient-details.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { PatientDetailslistComponent } from './user/patient/patient-detailslist/patient-detailslist.component';
import { PatientVisitComponent } from './user/patient/patient-visit/patient-visit.component';
import { ViewNotesComponent } from './inbox/Notes/view-notes/view-notes.component';
import { SendnotesComponent } from './inbox/Notes/sendnotes/sendnotes.component';
import { ReceivedNotesComponent } from './inbox/Notes/received-notes/received-notes.component';
import { ReplynoteComponent } from './inbox/Notes/replynote/replynote.component';


const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'change-password',component:ChangePasswordComponent,canActivate:[AuthGuardService]},
  
  {path: 'dashboard',component: SharedSidenavComponent,
  children: [
    
  {
    path: 'admin/emp-register',
    component: EmployeeRegisterComponent
  }, 
  {
    path: 'admin/emp-details',
    component: EmployeeDetailsComponent
  }
,{
  path: 'admin/patient-details',
  component: PatientDetailsComponent
},
{
  path: 'user-profile',
  component: UserProfileComponent,canActivate:[AuthGuardService]
},
{
  path:'admin/allpatient',
  component:PatientDetailslistComponent
},
{
  path:'admin/patient-visit',
  component:PatientVisitComponent
},
{
  path: 'sendnotes',
  component: SendnotesComponent
},
{
  path: 'viewnotes',
  component: ViewNotesComponent
},
{
  path: 'receivednotes',
  component: ReceivedNotesComponent
},
{
  path: 'replynotes/:id',
  component: ReplynoteComponent
}
]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
