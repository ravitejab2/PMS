import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeProfile } from 'src/app/models/employeeModel';
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

  user!:EmployeeProfile;


  userId!:any;
  "userProfile":FormGroup
  
  panelOpenState = false;
  response!:any;
  emegencyData!:any;
  today!:number;
 

  constructor(private router:Router,private datepipe:DatePipe,private service:UserService,private formBuilder:FormBuilder,private patientService:PatientService) { 
    
    const value=localStorage.getItem("userID");  
      this.userId =value;
      console.log('Profile',value)
      console.log(this.userId)
    }
    

  

  

  ngOnInit(): void {
    this.loadUserProfile();
    
   
  }

  
  loadUserProfile(){
    
   
    this.userProfile= this.formBuilder.group({
       title: new FormControl(null),
       name: new FormControl(null),
       email: new FormControl(),
       gender: new FormControl(null),
       age:new FormControl(null),
       contact: new FormControl(null),
      
     })

     this.service.getEmployeeProfile(this.userId).subscribe((data:ResponseModel)=>{
      console.log('Demo',data);
      this.response=data;
      this.user=this.response.dataSet;

      if(this.user.title=='Mr' || this.user.title=='Dr'){
        this.user.gender='Male'
      }
     
      else{
        this.user.gender='Female'
      }

      // let timeDiff = Math.abs(Date.now() - this.user.dateOfBirth.getTime());
      // let y = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
      // console.log(y) ;
      // this.user.age=y;

     
      
       this.user.age=  Number(this.datepipe.transform(new Date(), 'y'))- Number(this.datepipe.transform(this.user.dateOfBirth, 'y'));
     
      // console.log(this.today)
       console.log(this.user.age)


      if(this.user==null){
       this.user=new EmployeeProfile();
       this.user.name= 'No Data';
       this.user.age=0;
       this.user.contact=0;
       this.user.gender='No Data'
       
      }
      
      console.log('user',this.user);
    });


  }

  editprofile(event:number){
    this.router.navigate(['/dashboard/edit-employee/'+event]);
  }

}
