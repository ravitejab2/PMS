import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/patientModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { PatientService } from 'src/app/services/patient/patient.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  user!:User;


  userId!:any;
  "userProfile":FormGroup
  
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

}
