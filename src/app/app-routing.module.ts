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
import { HomeComponent } from './user/home/home/home.component';
import { PatientDemoDataComponent } from './user/providers/patient-demo-data/patient-demo-data.component';
import { PatientVistDataComponent } from './user/providers/patient-vist-data/patient-vist-data.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user/inbox-dashboard/user-dashboard.component';
import { PatientListComponent } from './user/providers/patient-list/patient-list.component';
import { PatientDemographicsComponent } from './user/providers/patient-demographics/patient-demographics.component';
import { PatientVisitHistoryComponent } from './user/patient/patient-visit-history/patient-visit-history.component';
import { EmployeeProfileComponent } from './admin/employee-profile/employee-profile.component';
import { CalenderComponent } from './inbox/scheduler/calender/calender.component';
import { AddAppointmentComponent } from './inbox/scheduler/add-appointment/add-appointment.component';
import { EditAppointmentComponent } from './inbox/scheduler/edit-appointment/edit-appointment.component';
import { AppointmentsComponent } from './inbox/scheduler/appointments/appointments.component';


const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'change-password',component:ChangePasswordComponent,canActivate:[AuthGuardService]},
  
  {path: 'dashboard',component: SharedSidenavComponent,
  children: [
   
    {
      path: '',
      component:HomeComponent
    },

    {
      path: 'admin',
      component:AdminDashboardComponent
    },

    
  {
    path: 'admin/emp-register',
    component: EmployeeRegisterComponent
  }, 
  {
    path: 'admin/profile',
    component:EmployeeProfileComponent
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
  path: 'inbox',
  component:UserDashboardComponent
},


{
  path: 'user-profile',
  component: UserProfileComponent,canActivate:[AuthGuardService]
},
{
  path:'patient-demographic',
  component:PatientDetailslistComponent
},
{
  path:'employee/patient-visit/:id',
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
},
{
  path: 'employees/patient',
  component:PatientListComponent
},
{
  path: 'employees/patient-visits',
  component:PatientVistDataComponent
},
{
  path: 'employees/patient/patient-demographics/:id',
  component:PatientDemographicsComponent
},
{
  path: 'patient/visit-history',
  component:PatientVisitHistoryComponent
},

{

  path: 'calender',
  component: CalenderComponent

},

{

  path: 'add-appointment',
  component: AddAppointmentComponent

},

{

  path: 'edit-appointment/:id',
  component: EditAppointmentComponent

},

{

  path: 'appointments',
  component: AppointmentsComponent

},

]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
