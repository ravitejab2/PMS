import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmployeesService } from 'src/app/services/employees/employees.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { EmployeeColumns } from '../employee-details/employee-details.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalPatientCount!: any;
  totalEmployeeCount!: any;
  employees!:EmployeeColumns[];
  patients!:EmployeeColumns[];



  constructor(private patientService:PatientService,private employeeService:EmployeesService) { }

  ngOnInit(): void {
    this.countEmployee();
    this.countPatient();
 
 }

 countEmployee(){
   this.employeeService.getAllEmployee().subscribe(data=>{
    this.employees=data;
    this.totalEmployeeCount=this.employees.length
    console.log(this.totalEmployeeCount);
 
  });
}

countPatient(){
  this.patientService.getAllPatient().subscribe(data=>{
   this.patients=data;
   this.totalPatientCount=this.patients.length
   console.log(this.totalPatientCount);

 });
}

}
