import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppointmentModel } from 'src/app/models/appoinmentModel';
import { EditAppointmentModel } from 'src/app/models/editAppointmentModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { AppointmentService } from 'src/app/services/schedule/appointment.service';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css'],
})
export class EditAppointmentComponent implements OnInit {
  appointmentId!: number;
  response: any;
  editAppointment!: EditAppointmentModel;
  slots!: any;
  physicianName!: string;
  patientName!: string;
  patientId!: number;
  physicianId!: number;
  user: any;
  appointment!: AppointmentModel;
  meetingTitle!: string;
  description!: string;
  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private fb: FormBuilder,
    private userService: UserService,
    private toaster: ToastrService,private datepipe: DatePipe
  ) {}

  appointmentForm = this.fb.group({
    meetingTitle: new FormControl(),
    appointmentDate: new FormControl(),
    availableSlots: new FormControl(),
    description: new FormControl(),
  });
  ngOnInit(): void {
    
    this.getAppointmentDetails();
   
    
  }

  getAppointmentDetails() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = Number(params.get('id'));
      this.appointmentId = id;
     
      this.appointmentService
        .getAppointmentById(this.appointmentId)
        .subscribe((data: ResponseModel) => {
          
          if (data.responseCode == 1) {
            this.response = data;
            this.editAppointment = this.response.dataSet; 
            console.log(this.editAppointment)        
            this.updateFormData(this.editAppointment);
            this.patientId = this.editAppointment.patientId;
            this.physicianId = this.editAppointment.physicianId;
            this.meetingTitle = this.editAppointment.meetingtitle;
           
            this.description = this.editAppointment.description;
            this.userService
              .getUserDetails(this.physicianId)
              .subscribe((data: ResponseModel) => {
                if (data.responseCode == 1) {
                  this.user = data.dataSet;
                  this.physicianName = this.user.name;
                }
              });
            this.userService
              .getUserDetails(this.patientId)
              .subscribe((data: ResponseModel) => {
                if (data.responseCode == 1) {
                  this.user = data.dataSet;
                  this.patientName = this.user.name;
                }
              });
          }
        });
    });
  }
  getAvailableSlots(date: any, id: any) {
    this.appointmentService
      .getSlots(date, id)
      .subscribe((data: ResponseModel) => {
        if (data.responseCode == 1) {
          this.slots = data.dataSet;
         
        }
      });
  }

  updateFormData(details:EditAppointmentModel){
    this.appointmentForm.patchValue({
      meetingTitle: details.meetingtitle,
      appointmentDate: this.datepipe.transform(details.appointmentdate, 'yyyy-MM-dd'),
      
      description: details.description
    });
  }
  dateChange(event: any) {
    let id = this.editAppointment.physicianId;
    this.getAvailableSlots(event, id);
  }
  bookAppointment() {
    if (this.appointmentForm.valid) {
      
      this.appointment = new AppointmentModel();
      this.appointment.physicianId = this.editAppointment.physicianId;
      this.appointment.patientId = this.editAppointment.patientId;
      this.appointment.appointmentdate =
        this.appointmentForm.get('appointmentDate')?.value;
      this.appointment.meetingTitle =
        this.appointmentForm.get('meetingTitle')?.value;
      this.appointment.description =
        this.appointmentForm.get('description')?.value;
      this.appointment.slotId = Number(
        this.appointmentForm.get('availableSlots')?.value
      );
     
      this.appointmentService
        .updateappointment(this.appointmentId, this.appointment)
        .subscribe((data: ResponseModel) => {
          if (data.responseCode == 1) {
            this.toaster.success(data.responseMessage);
          } else {
            this.toaster.error(data.responseMessage);
          }
        });
    } else {
      alert('Please fill all details');
    }
  }
}
