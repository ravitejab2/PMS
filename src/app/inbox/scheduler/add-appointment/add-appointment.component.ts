import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppointmentModel } from 'src/app/models/appoinmentModel';
import { EditAppointmentModel } from 'src/app/models/editAppointmentModel';
import { EmployeeModel } from 'src/app/models/employeeModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { AppointmentService } from 'src/app/services/schedule/appointment.service';
import { UserService } from 'src/app/services/user/user.service';
import { __values } from 'tslib';
import { EditAppointmentComponent } from '../edit-appointment/edit-appointment.component';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  physicians!: any[];
  patients!: any[];
  physicianname!:string;
  patientname!:string;
  userRole!: string;
  
  userName!: string;
  slots!:any;
  availableslots!:any[];
  physician!: string[];
  patient!: string[];
  user: any;
  userDetails!: EmployeeModel;
  appointment!: AppointmentModel;
  editAppointment!:EditAppointmentModel;
  name!: string;
  appointmentId: number=0;
  response: any;
  constructor(private userSerivice:UserService,private route:ActivatedRoute,private toaster:ToastrService,private appointmentSerive:AppointmentService,private fb:FormBuilder) { }
  appointmentForm=this.fb.group({
    physicianName:new FormControl(),
    patientName:new FormControl(),
    meetingTitle:new FormControl(),
    appointmentDate:new FormControl(),
    availableSlots:new FormControl(),
    description:new FormControl(),
    

  });


  ngOnInit(): void {

    this.getAllPhysicians();
    this.getAllPatients();
    const user = localStorage.getItem("userRole");
    if (typeof user === 'string') {
      this.userRole = JSON.parse(user) // ok
  }
  const name = localStorage.getItem("userName");
  if (typeof name === 'string') {
    this.userName = name; // ok
  }   

  // if(this.userRole=="physician"){
  //   this.physician.push(this.userName);
  // }
  // else if(this.userRole=="user"){
  //   this.patient.push(this.userName);
  // }
  // else{
  //   this.physician=this.physicians;
  //   this.patient=this.patients;
  // }

   
    //this.loadDetails();
  }


  
  

  getAvailableSlots(date:any,id:any){
    this.appointmentSerive.getSlots(date,id).subscribe((data:ResponseModel)=>{
      if(data.responseCode==1){
        this.slots=data.dataSet;
        console.log(this.slots);
      }
    })
  }
  dateChange(event:any){
    let id=this.appointmentForm.get('physicianName')?.value;
    this.getAvailableSlots(event,id);
  }


  onPhysicianChange(event:any){
    

  }
  onPatientChange(event:any){    
   // this.patient=this.patients.filter(x=>x.id==event);
       
    
  }

  getAllPhysicians(){
    this.userSerivice.getallPhysicians().subscribe((data:ResponseModel)=>{
      if(data.responseCode==1){
        this.physicians=data.dataSet;
        //console.log(this.physicians);
      }
    });
  }

  

  getAllPatients(){
    this.userSerivice.getAllPatients().subscribe((data:ResponseModel)=>{
      if(data.responseCode==1){
        this.patients=data.dataSet;
        //console.log(this.patients);
      }
    });
  }

  bookAppointment(){
    if(this.appointmentForm.valid){
      console.log(this.appointmentForm);
      this.appointment= new AppointmentModel();
      this.appointment.physicianId=Number(this.appointmentForm.get('physicianName')?.value);
      this.appointment.patientId=Number(this.appointmentForm.get('patientName')?.value);
      this.appointment.appointmentdate=this.appointmentForm.get('appointmentDate')?.value;
      this.appointment.meetingTitle=this.appointmentForm.get('meetingTitle')?.value;
      this.appointment.description=this.appointmentForm.get('description')?.value;
      this.appointment.slotId=Number(this.appointmentForm.get('availableSlots')?.value);
      console.log(this.appointment);
      this.appointmentSerive.addAppointment(this.appointment).subscribe((data:ResponseModel)=>{
        if(data.responseCode==1){
          this.toaster.success(data.responseMessage);
        //  this.appointmentForm.reset();
        }
        else{
          this.toaster.error(data.responseMessage);
        }
      })
    }
    
    else{
      alert("Please fill all details");
    }
  }
}
