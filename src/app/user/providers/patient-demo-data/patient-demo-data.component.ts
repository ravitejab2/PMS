import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeColumns } from 'src/app/admin/employee-details/employee-details.component';
import { ResponseModel } from 'src/app/models/responseModel';
import { PatientService } from 'src/app/services/patient/patient.service';

export interface DemographicsModel{
  patientId: number;
  firstName: string;
  lastName:string
  name:string,
  email:string;
  age:number;
  address:string;
  gender:string;
  race:string;
  ethnicity:string;
 
}

@Component({
  selector: 'app-patient-demo-data',
  templateUrl: './patient-demo-data.component.html',
  styleUrls: ['./patient-demo-data.component.css']
})
export class PatientDemoDataComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name','email','role','dateOfJoining','status','edit status'];
  displayedDemoColumns: string[] = ['patientId', 'name','email','age','address','gender','race','ethnicity','edit status'];
  employees!:EmployeeColumns[];
  patients!:DemographicsModel[];
  dataSource: any;
  empStatus!:string;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private router:Router,private service:PatientService,private toasts:ToastrService) {
    
   }
  ngOnInit(): void {
   // this.fetchAllEmployees();
    this.fetchAllPatientDemo();    
    
   
    
    
  }

  fetchAllPatientDemo(){
    this.service.getPatientsDemographic().subscribe((data)=>{
      console.log(data)
      this.patients=data.dataSet;
      console.log(this.patients)
      

      this.patients.forEach((value)=>{
        value.name=value.firstName+' ' +value.lastName;
        console.log(value.name)
        console.log('geder',value.gender)
      })

      this.dataSource = new MatTableDataSource(this.patients); 
      console.log(this.dataSource)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
      

    })
  }

  // fetchAllEmployees(){
    
  //   this.service.getAllPatient().subscribe(data=>{
  //     console.log(data);
  //     this.employees=data;

  //     this.employees.forEach((value)=>{
  //       if(value.lockout==null){
  //         value.status='Active';
  //       }
  //       else{
  //         value.status='Blocked';
  //       }
  //       this.empStatus=value.status
  //       console.log('Hello',this.empStatus);

  //     });
  //   this.dataSource = new MatTableDataSource(this.employees); 
  //   console.log(this.dataSource)
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  //   // console.log(this.employees)

  //   })
  // }

  // activate(id:number){
  //   this.service.activateUser(id).subscribe((data: ResponseModel) => {
  //     if (data.responseCode == 1) {
  //      this.toasts.success(data.responseMessage);
  //      this.fetchAllEmployees();
  //     }
  //   });  

  // }
  // deactivate(id:number){
  //   this.service.deactivateUser(id).subscribe((data: ResponseModel) => {
  //     if (data.responseCode == 1) {
  //      this.toasts.error(data.responseMessage);
  //      this.fetchAllEmployees();
  //     }
  //   });  

  // }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
