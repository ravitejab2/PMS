import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseModel } from 'src/app/models/responseModel';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-patient-detailslist',
  templateUrl: './patient-detailslist.component.html',
  styleUrls: ['./patient-detailslist.component.css']
})
export class PatientDetailslistComponent implements OnInit {
  maxDate!: Date;
  userId!:any
  
  
  constructor(private router:Router, private formBuilder:FormBuilder,private service:PatientService,private toaster:ToastrService) { 
    const currentYear = new Date();
    this.maxDate = new Date(currentYear);
    console.log(this.maxDate);
    console.log(currentYear);
   
    const value=localStorage.getItem("userID");  
    this.userId =value;
       
       console.log('Profile',value)
    console.log(this.userId)// ok

  }
  
  
  "patientdetails":FormGroup;
  "emergencydetails":FormGroup;
  "allergydetails":FormGroup;
  isSubmitted=false;
  isLinear = false;

  ngOnInit(): void {
 this.patientDemographicForm();
 this.patientEmergencyForm();
 this.patientAllergyForm();
    
  }

 
 
  nextsecion(){
this.router.navigate(['emergency'])
  }

 
 
  backtohome(){
    this.router.navigate(['dashboard'])
  }
 
 
  patientDemographicForm(){
    this.patientdetails=this.formBuilder.group({
      Title: new FormControl('',[Validators.required]),
      PatientId: new FormControl(parseInt(this.userId)),
      FirstName: new FormControl(null,[Validators.required,Validators.minLength(2)]),
      LastName: new FormControl(null,[Validators.required,Validators.minLength(2)]),
      DateOfBirth: new FormControl(null,[Validators.required]),
      ContactNo: new FormControl(null,[Validators.required])  ,
      Age: new FormControl(null,[Validators.required]),
      Email: new FormControl(null,[Validators.required,Validators.email]),
      Gender:new FormControl('',[Validators.required]),
      Race: new FormControl(null,[Validators.required]),
      Ethnicity: new FormControl(null,[Validators.required]),
      LanguagesKnow:new FormControl(null,[Validators.required]),
      Address:new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(30)])

    });
  }

  patientEmergencyForm(){
      this.emergencydetails=this.formBuilder.group({
      FirstName: new FormControl(null,[Validators.required,Validators.minLength(2)]),
      PatientId: new FormControl(parseInt(this.userId)),
      LastName: new FormControl(null,[Validators.required,Validators.minLength(2)]),
      ContactNo: new FormControl(null,[Validators.required])  ,
      Email: new FormControl(null,[Validators.required,Validators.email]),
      Relationship: new FormControl(null,[Validators.required]),  
      IsAllowed: new FormControl(null,[Validators.required]), 
      Address:new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(30)])

    });
  }

  patientAllergyForm(){
    this.allergydetails=this.formBuilder.group({
      Allergy_Type: new FormControl('',[Validators.required]),
      PatientId: new FormControl(parseInt(this.userId)),
      Allergy_Name: new FormControl('',[Validators.required]),
      AllergyId: new FormControl('',[Validators.required]),
      Is_Allergy_Fatal: new FormControl(null),
      Allergy_Desc:new FormControl('',[Validators.required,Validators.maxLength(30)]),
      Allergy_Clinical:new FormControl('',[Validators.required,Validators.maxLength(20)])

    });
  }



  registerDemographicDetails(){
     if(this.patientdetails.valid){
      console.log(this.patientdetails.value)
     this.service.postDemographics(this.patientdetails.value).subscribe((data:ResponseModel)=>{
       if(data.responseCode==1){
       this.toaster.success(data.responseMessage)
       }
       else{
         this.toaster.error(data.responseMessage)
       }
       
     })
    }
    
    else{
      this.validateAllFromFields(this.patientdetails);
      console.log(this.patientdetails.value);
    }
  }

  registerEmergencyContact(){
    if(this.emergencydetails.valid){
      console.log(this.emergencydetails.value)
     this.service.postEmergencyContact(this.emergencydetails.value).subscribe((data:ResponseModel)=>{
       if(data.responseCode==1){
       this.toaster.success(data.responseMessage)
       }
       else{
         this.toaster.error(data.responseMessage)
       }
       
    })
    }
    
    else{
      this.validateAllFromFields(this.emergencydetails);
    
    }
  }
  registerAllergyDetails(){
    if(this.allergydetails.valid){
      console.log(this.allergydetails.value)
     this.service.postAllergyDetails(this.allergydetails.value).subscribe((data:ResponseModel)=>{
       if(data.responseCode==1){
       this.toaster.success(data.responseMessage)
       }
       else{
         this.toaster.error(data.responseMessage)
       }
       
    })
    }
    
    else{
      this.validateAllFromFields(this.emergencydetails);
    
    }
  }

  
  
  
  private validateAllFromFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
     
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }
      else if(control instanceof FormGroup){
        this.validateAllFromFields(control)
      }
    })
  }
}
