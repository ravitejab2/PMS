import {AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseModel } from 'src/app/models/responseModel';
import { EmployeesService } from 'src/app/services/employees/employees.service';


export interface EmployeeColumns{
  id: number;
  name: string;
  email:string;
  role:string;
  dateOfJoining:Date;
  status:any;
  lockout:any;
 
}

// const ELEMENT_DATA:EmployeeColumns[]=[
//   { id: 1, name: 'Zara Rodriguez',role:'Admin', status:'Active'},
//   { id: 2, name: 'Zara',role:'Admin', status:'Active'},
//   { id: 3, name: 'Jhon',role:'Physician', status:'Blocked'},
//   { id: 4, name: 'Sara Novelty',role:'Nurse', status:'Blocked'},
//   { id: 5, name: 'Harry Robin',role:'Physician', status:'Blocked'},
//   { id: 6, name: 'Zara',role:'Admin', status:'Blocked'},
//   { id: 7, name: 'Susain Lockwood',role:'Nurse', status:'Blocked'},
 
// ];

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','email','role','dateOfJoining','status','edit status'];
  employees!:EmployeeColumns[];
  dataSource: any;
  empStatus!:string;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private router:Router,private service:EmployeesService,private toasts:ToastrService) {
    
   }
  ngOnInit(): void {
    this.fetchAllEmployees();
   
    
  }

  fetchAllEmployees(){
    
    this.service.getAllEmployee().subscribe(data=>{
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

  goToRegister(){
    this.router.navigate(['/dashboard/admin/emp-register']);
  }



}
