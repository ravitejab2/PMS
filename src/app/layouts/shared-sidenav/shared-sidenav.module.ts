import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeRegisterComponent } from 'src/app/admin/employee-register/employee-register.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
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
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PatientDetailslistComponent } from 'src/app/user/patient/patient-detailslist/patient-detailslist.component';





@NgModule({
  declarations: [EmployeeRegisterComponent,SharedSidenavComponent,EmployeeDetailsComponent,PatientDetailsComponent,UserProfileComponent,PatientDetailslistComponent,PatientVisitComponent],
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
    
   
  ],
  providers:[UserService]
})
export class SharedSidenavModule { }
