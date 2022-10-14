import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeColumns } from 'src/app/admin/employee-details/employee-details.component';
import { ResponseModel } from 'src/app/models/responseModel';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name','email','role','dateOfJoining','status','edit status','vitals'];
  employees!:EmployeeColumns[];
  dataSource: any;
  empStatus!:string;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private router:Router,private service:PatientService,private toasts:ToastrService) {
    
   }
  ngOnInit(): void {
    this.fetchAllEmployees();
   
    
    
  }

  fetchAllEmployees(){
    
    this.service.getAllPatient().subscribe(data=>{
      console.log(data);
      this.employees=data;

      this.employees.forEach((value)=>{
        if(value.lockout==null){
          value.status='Active';
        }
        else{
          value.status='Blocked';
        }
        this.empStatus=value.status
        console.log('Hello',this.empStatus);

      });
    this.dataSource = new MatTableDataSource(this.employees); 
    console.log(this.dataSource)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // console.log(this.employees)

    })
  }



  addDemographic(patientId:number){
    this.router.navigate(['/dashboard/employees/patient/patient-demographics/'+patientId]);

  }
  
  addVitals(patientId:number){
    this.router.navigate(['/dashboard/employee/patient-visit/'+patientId]);
    
  }

  viewVitals(patientId:number){
    this.router.navigate(['/dashboard/patients/visit-history/'+patientId]);

  }


  activate(id:number){
    this.service.activateUser(id).subscribe((data: ResponseModel) => {
      if (data.responseCode == 1) {
       this.toasts.success(data.responseMessage);
       this.fetchAllEmployees();
      }
    });  

  }
  deactivate(id:number){
    this.service.deactivateUser(id).subscribe((data: ResponseModel) => {
      if (data.responseCode == 1) {
       this.toasts.error(data.responseMessage);
       this.fetchAllEmployees();
      }
    });  

  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
