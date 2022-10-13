import { Component, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import {DayPilot, DayPilotCalendarComponent,DayPilotNavigatorComponent,DayPilotMonthComponent} from "@daypilot/daypilot-lite-angular";
import { AppointmentModel } from 'src/app/models/appoinmentModel';

import { ResponseModel } from 'src/app/models/responseModel';
import { AppointmentService } from 'src/app/services/schedule/appointment.service';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  @ViewChild("calendar") calendar!: DayPilotCalendarComponent;
  
  @ViewChild("navigator") navigator!: DayPilotNavigatorComponent;
  
  @ViewChild("month") month!: DayPilotMonthComponent;
  response: any;
  appointments!: AppointmentModel[];
  userRole!: string;
  userId!: number;
  enableMonth: boolean=false;
  enableWeek: boolean=true;
  enableDay: boolean=false;
  

  constructor(private service:AppointmentService,private router:Router,private appointmentService:AppointmentService) { }

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
  
  
  


events:DayPilot.EventData[]=[];

  calendarConfig: DayPilot.CalendarConfig = {
    startDate: DayPilot.Date.today(),
    viewType: "WorkWeek",
    eventDeleteHandling: "Update",
    
    onEventDeleted: args => {
      alert("appointment is declined"+args.e.id());
      this.appointmentService.declineAppointment(Number(args.e.id()));
      
       console.log(args.e.id());
    },   
    onEventClick:args=>{
      let id = Number(args.e.id());
      this.router.navigate(['/dashboard/edit-appointment/'+id]);
    },
    onEventRightClick:args=>{
      let id = Number(args.e.id());
      alert("appointment accepted"+id);
    },
    
  };
 
 

  configMonth: DayPilot.MonthConfig = {
    eventDeleteHandling: "Update",
    
    onEventDeleted: args => {
      
      this.appointmentService.declineAppointment(Number(args.e.id()));
      
       console.log(args.e.id());
    },   
    onEventClick:args=>{
      let id = Number(args.e.id());
      this.router.navigate(['/dashboard/edit-appointment/'+id]);
    },
    onEventRightClick:args=>{
      let id = Number(args.e.id());
      alert("appointment accepted"+id);
    },
  };
  displayMonth(){
    this.enableMonth=true;
    this.enableWeek=false;
    this.enableDay=false;
    this.calendarConfig.visible = false;
    this.configMonth.visible=true;
    
  }  
  displayWorkWeek(){
    this.enableMonth=false;
    this.enableDay=false;
    this.enableWeek=true;
    this.configMonth.visible=false;
    this.calendarConfig.visible = true;
    this.calendarConfig.viewType="WorkWeek";
  }
  
  displayDay(){
    this.enableMonth=false;
    this.enableWeek=false;
    this.enableDay=true;
    
    this.configMonth.visible=false;
    this.calendarConfig.visible = true;    
    this.calendarConfig.viewType="Day"
  }
  navigatorConfig: DayPilot.NavigatorConfig = {
    
    selectMode: "Day",
    cellWidth: 30,
    cellHeight: 30,
    dayHeaderHeight: 30,
    titleHeight: 30
  };
  clickedEvent(){
    alert("Clicked");
  }
  
  
  get date(): DayPilot.Date {
    return this.calendarConfig.startDate as DayPilot.Date;
  }
  navigatePrevious(event:any): void {
    event.preventDefault();
    if(this.enableMonth){
      
      this.configMonth.startDate = (this.calendarConfig.startDate as DayPilot.Date).addMonths(-1);
    }
    else if(this.enableWeek)
    this.calendarConfig.startDate = (this.calendarConfig.startDate as DayPilot.Date).addDays(-7);
    else if(this.enableDay)
    this.calendarConfig.startDate = (this.calendarConfig.startDate as DayPilot.Date).addDays(-1);
    
  }

  navigateNext(event:any): void {
    event.preventDefault();
    if(this.enableMonth){
      
      this.configMonth.startDate = (this.calendarConfig.startDate as DayPilot.Date).addMonths(1);
    }
    else if(this.enableWeek)
    this.calendarConfig.startDate = (this.calendarConfig.startDate as DayPilot.Date).addDays(7);
    else if(this.enableDay)
    this.calendarConfig.startDate = (this.calendarConfig.startDate as DayPilot.Date).addDays(1);
    
    
  }

  navigateToday(event:any): void {
    event.preventDefault();
    if(this.enableMonth){
      
      this.configMonth.startDate = (this.calendarConfig.startDate as DayPilot.Date);
    }
    else if(this.enableWeek)
    this.calendarConfig.startDate = (this.calendarConfig.startDate as DayPilot.Date);
    else if(this.enableDay)
    this.calendarConfig.startDate = (this.calendarConfig.startDate as DayPilot.Date);
    
    
  }

  set date(value: DayPilot.Date) {
    this.calendarConfig.startDate = value;
  }
 
  
  loadAppointments(){
   
    this.service.getAppointmentsUserLoad(this.userId,this.userRole).subscribe((data:ResponseModel)=>{
      if(data.responseCode==1){
        this.response=data;
        console.log(this.response.dataSet);
        this.events=this.response.dataSet;
        
        console.log(this.events);
      }
      else{
        console.log("error");
      }
    });
    
  
  }

  
}
