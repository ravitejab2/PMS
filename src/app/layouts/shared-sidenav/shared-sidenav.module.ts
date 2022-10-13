import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeRegisterComponent } from 'src/app/admin/employee-register/employee-register.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedSidenavComponent } from './shared-sidenav.component';
import { UserService } from 'src/app/services/user/user.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { EmployeeDetailsComponent } from 'src/app/admin/employee-details/employee-details.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PatientDetailsComponent } from 'src/app/admin/patient-details/patient-details.component';
import { UserProfileComponent } from 'src/app/user/user-profile/user-profile.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PatientVisitComponent } from 'src/app/user/patient/patient-visit/patient-visit.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PatientDetailslistComponent } from 'src/app/user/patient/patient-detailslist/patient-detailslist.component';
import { SendnotesComponent } from 'src/app/inbox/Notes/sendnotes/sendnotes.component';
import { ReceivedNotesComponent } from 'src/app/inbox/Notes/received-notes/received-notes.component';
import { ViewNotesComponent } from 'src/app/inbox/Notes/view-notes/view-notes.component';
import { ReplynoteComponent } from 'src/app/inbox/Notes/replynote/replynote.component';
import { HomeComponent } from 'src/app/user/home/home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { PatientDemoDataComponent } from 'src/app/user/providers/patient-demo-data/patient-demo-data.component';
import { PatientVistDataComponent } from 'src/app/user/providers/patient-vist-data/patient-vist-data.component';
import { AdminDashboardComponent } from 'src/app/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from 'src/app/user/inbox-dashboard/user-dashboard.component';
import { PatientListComponent } from 'src/app/user/providers/patient-list/patient-list.component';
import { PatientDemographicsComponent } from 'src/app/user/providers/patient-demographics/patient-demographics.component';
import { PatientVisitHistoryComponent } from 'src/app/user/patient/patient-visit-history/patient-visit-history.component';
import { EmployeeProfileComponent } from 'src/app/admin/employee-profile/employee-profile.component';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { AddAppointmentComponent } from 'src/app/inbox/scheduler/add-appointment/add-appointment.component';

import { CalenderComponent } from 'src/app/inbox/scheduler/calender/calender.component';
import { EditAppointmentComponent } from 'src/app/inbox/scheduler/edit-appointment/edit-appointment.component';
import { ViewCalenderComponent } from 'src/app/inbox/scheduler/view-calender/view-calender.component';
import { AppointmentService } from 'src/app/services/schedule/appointment.service';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AppointmentsComponent } from 'src/app/inbox/scheduler/appointments/appointments.component';






@NgModule({
  declarations: [
    EmployeeRegisterComponent,
    SharedSidenavComponent,
    EmployeeDetailsComponent,
    PatientDetailsComponent,
    UserProfileComponent,
    PatientDetailslistComponent,
    SendnotesComponent,
    ReplynoteComponent,
    ViewNotesComponent,
    ReceivedNotesComponent,
    PatientVisitComponent,
    HomeComponent, 
    PatientDemoDataComponent,
    PatientVistDataComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    PatientListComponent,
    PatientDemographicsComponent,
    PatientVisitHistoryComponent,
    EmployeeProfileComponent,
    AddAppointmentComponent,
    AppointmentsComponent,
    CalenderComponent,
    EditAppointmentComponent,
    ViewCalenderComponent
   
  
  ],


  imports: [
    CommonModule,
    RouterModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSelectModule,
    MatStepperModule,
    MatCheckboxModule,
    MatGridListModule,
    DayPilotModule,
    MatTableExporterModule


  ],
  providers: [UserService,AppointmentService]
})
export class SharedSidenavModule { }
