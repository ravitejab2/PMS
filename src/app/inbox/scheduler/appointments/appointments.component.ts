import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppointmentViewModel } from 'src/app/models/appointmentViewModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { AppointmentService } from 'src/app/services/schedule/appointment.service';
import { UserService } from 'src/app/services/user/user.service';

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
  userInfo: any;
  //patientName!: string;
  constructor(private service:AppointmentService,private toastr:ToastrService,private userService:UserService) { }

  displayedColumns: string[] = ['appointmentId','appointmentdate','patientId','physicianId' ,'appointmentStartdate','appointmentEnddate','meetingtitle','status','action'];
  
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
   
    this.service.getAllAppointments(this.userId,this.userRole).subscribe((data:ResponseModel)=>{
      if(data.responseCode==1){
        this.response=data;
       
        this.events=this.response.dataSet;
        debugger
        this.events.forEach(item=>{
          this.userService.getUserinfo(item.patientId).subscribe((data:ResponseModel)=>{
            if(data.responseCode==1){
             
              this.userInfo=data.dataSet;
              console.log('name',this.userInfo)
              item.patientId=this.userInfo.name;
              console.log('name',item.patientId)
            }
          });
        });

        this.events.forEach(item=>{
          this.userService.getUserinfo(item.physicianId).subscribe((data:ResponseModel)=>{
            if(data.responseCode==1){
              this.userInfo=data.dataSet;
              item.physicianId=this.userInfo.name;
            }
          });
        });


        this.dataSource = new MatTableDataSource(this.events); 
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
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
