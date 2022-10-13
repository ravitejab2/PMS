import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { User } from 'src/app/models/patientModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { PatientService } from 'src/app/services/patient/patient.service';
import { UserService } from 'src/app/services/user/user.service';
import { __values } from 'tslib';
import { EmergencyDetails } from '../patient/patient-detailslist/patient-detailslist.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
 
  user!:User;
  emergencyContact!:EmergencyDetails;

  userId!:any;
  "userProfile":FormGroup
  "emergencyProfile":FormGroup
  panelOpenState = false;
  response!:any;
  emegencyData!:any;
 

  constructor(private router:Router,private service:UserService,private formBuilder:FormBuilder,private patientService:PatientService) { 
    
    const value=localStorage.getItem("userID");  
      this.userId =value;
      console.log('Profile',value)
      console.log(this.userId)
    }
    

  

  

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadEmegencyContacts()
    // this.loadUser();
    // this. loadApiValue();
   
  }

  
  
  loadUserProfile(){
    this.service.getUserProfile(this.userId).subscribe((data:ResponseModel)=>{
      console.log('Demo',data);
      this.response=data;
      this.user=this.response.dataSet;

      if(this.user==null){
       this.user=new User();
       this.user.name= 'No Data';
       this.user.address='No Data';
       this.user.age=0;
       this.user.contact=0;
       this.user.gender='No Data'
       
      }
      
      console.log('user',this.user);
    });

    this.userProfile= this.formBuilder.group({
       title: new FormControl(null),
       name: new FormControl(null),
       email: new FormControl(),
       gender: new FormControl(null),
       age:new FormControl(null),
       contact: new FormControl(null),
       address:new FormControl(null)   
     })

  }

  
  loadEmegencyContacts(){
    this.patientService.getEmergencyContact(this.userId).subscribe ((data: ResponseModel) => {
      console.log('Emergency',data);
      if (data.responseCode == 1) {
       this.emegencyData=data;
       this.emergencyContact=this.emegencyData.dataSet;
       console.log(this.emergencyContact);
      }
      else {

        this.emergencyContact=new EmergencyDetails();
        this.emergencyContact.firstName= 'No Data';
        this.emergencyContact.lastName='No Data';
        this.emergencyContact.relationship='No Data';
        this.emergencyContact.contactNo=0;
        this.emergencyContact.email='No Data';
        this.emergencyContact.address='No Data';
       // this.toaster.error(data.responseMessage)


      }
      });
  }

  

}
