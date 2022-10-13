import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppointmentViewModel } from 'src/app/models/appointmentViewModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { AppointmentService } from 'src/app/services/schedule/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userRole!: string;
  userId!: number;
  response: any;
  dataSource: any;
  events: AppointmentViewModel[]=[];
  constructor(private service:AppointmentService,private toastr:ToastrService) { }

  displayedColumns: string[] = ['appointmentId','appointmentdate', 'appointmentStartdate','appointmentEnddate','meetingtitle','status','action'];
  
  ngOnInit(): void {
    const user = localStorage.getItem("userRole");
    if (typeof user === 'string') {
      this.userRole = JSON.parse(user) // ok
  }
  const Id = localStorage.getItem("userID");
    if (typeof Id === 'string') {
      this.userId = Number(JSON.parse(Id)) // ok
  }

 console.log(this.userId,this.userRole);
    this.loadAppointments();

  }

  loadAppointments(){
   
    this.service.getAllAppointments(this.userId).subscribe((data:ResponseModel)=>{
      if(data.responseCode==1){
        this.response=data;
       console.log(this.response);
        this.events=this.response.dataSet;
        this.dataSource = new MatTableDataSource(this.events); 
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.events);
      }
      else{
        console.log("error");
      }
    });
    
  
  }
  acceptAppointment(id:number){
    this.service.acceptAppointment(id).subscribe((data:ResponseModel)=>{
      if(data.responseCode==1){
        this.toastr.success("Accepted Appointment");
        this.ngOnInit();
      }
      else{
        this.toastr.error("error while Accepting Appointment");
      }
    });
  }
  declineAppointment(id:number){
    this.service.declineAppointment(id).subscribe((data:ResponseModel)=>{
      if(data.responseCode==1){
        this.toastr.success("Declined Appointment");
        this.ngOnInit();
      }
      else{
        this.toastr.error("error while declining Appointment");
      }
    })
  }
}
