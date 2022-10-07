import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-detailslist',
  templateUrl: './patient-detailslist.component.html',
  styleUrls: ['./patient-detailslist.component.css']
})
export class PatientDetailslistComponent implements OnInit {
  maxDate!: Date;
  constructor(private router:Router, private formBuilder:FormBuilder) { 
    const currentYear = new Date();
    this.maxDate = new Date(currentYear);
    console.log(this.maxDate);
    console.log(currentYear);
  }
  "patientdetails":FormGroup;
  "emergencydetails":FormGroup;
  "allergydetails":FormGroup;
  isSubmitted=false;
  isLinear = false;

  ngOnInit(): void {

    this.patientdetails=this.formBuilder.group({
      Title: new FormControl('',[Validators.required]),
      FirstName: new FormControl(null,[Validators.required,Validators.minLength(2)]),
      LastName: new FormControl(null,[Validators.required,Validators.minLength(2)]),
      DateOfBirth: new FormControl(null,[Validators.required]),
      ContactNumber: new FormControl(null,[Validators.required])  ,
      Age: new FormControl(null,[Validators.required]),
      Email: new FormControl(null,[Validators.required,Validators.email]),
      Gender:new FormControl('',[Validators.required]),
      Race: new FormControl(null,[Validators.required]),
      Ethnicity: new FormControl(null,[Validators.required]),
      Languages:new FormControl(null,[Validators.required]),
      Address:new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(30)])

    });

    this.emergencydetails=this.formBuilder.group({
      FirstName: new FormControl(null,[Validators.required,Validators.minLength(2)]),
      LastName: new FormControl(null,[Validators.required,Validators.minLength(2)]),
      ContactNumber: new FormControl(null,[Validators.required])  ,
      Email: new FormControl(null,[Validators.required,Validators.email]),
      Relationship: new FormControl(null,[Validators.required]),  
      Address:new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(30)])

    });

    this.allergydetails=this.formBuilder.group({
      Allergytype: new FormControl('',[Validators.required]),
      Allergyname: new FormControl('',[Validators.required]),
      Allergyid: new FormControl('',[Validators.required]),
      Allergydesc:new FormControl('',[Validators.required,Validators.maxLength(30)]),
      Allergyclinical:new FormControl('',[Validators.required,Validators.maxLength(20)])

    });


  }

  nextsecion(){
this.router.navigate(['emergency'])
  }

  backtohome(){
    this.router.navigate(['dashboard'])
  }

  patientdemodetails(){
    if(this.patientdetails.valid)
    console.log(this.patientdetails.value);
    else{
      this.validateAllFromFields(this.patientdetails);
      console.log(this.patientdetails.value);
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
