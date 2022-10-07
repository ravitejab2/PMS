import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-visit',
  templateUrl: './patient-visit.component.html',
  styleUrls: ['./patient-visit.component.css']
})
export class PatientVisitComponent implements OnInit {
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(private router:Router,private formBuilder:FormBuilder) { }

  "vitaldetails":FormGroup;
  "diagnosisdetails":FormGroup;
  isSubmitted=false;
  isLinear = false;

  ngOnInit(): void {

    this.vitaldetails=this.formBuilder.group({
      Height: new FormControl (null,[Validators.required]), //in cm
      Weight: new FormControl (null,[Validators.required]), //in kg
      BloodPressure:  new FormControl (null,[Validators.required]), //(systolic / diastolic in mm Hg)
      BloodTemp: new FormControl (null,[Validators.required]), //(in Fahrenheit)
      RespirationRate: new FormControl (null,[Validators.required]) //in BPM

    });

    this.diagnosisdetails=this.formBuilder.group({
      DiagnosisCode: new FormControl (null,[Validators.required]), //txtbox/dropdown list
      DiagnosisDesc: new FormControl (null,[Validators.required]), //dropdown
      IsDeprDiag: new FormControl (null,[Validators.required]), //bool

      ProcedureCode: new FormControl (null,[Validators.required]), //txtbox/dropdown list
      ProcedureDesc: new FormControl (null,[Validators.required]), //dropdown
      IsDeprProc: new FormControl (null,[Validators.required]), //bool

      DrugId: new FormControl (null,[Validators.required]), //dropdown
      DrugName: new FormControl (null,[Validators.required]), //dropdown list
      DrugGenName: new FormControl (null,[Validators.required]), //auto populate after selectn of drug name
      DrugBrandName: new FormControl (null,[Validators.required]),//dropdown/checkbox
      DrugForm: new FormControl (null,[Validators.required]),//dropdown
      DrugDesc: new FormControl (null,[Validators.required])

    });

    
  }

  patientvisit(){
    if(this.vitaldetails.valid)
    console.log(this.vitaldetails.value);
    else{
      this.validateAllFromFields(this.vitaldetails);
      console.log(this.vitaldetails.value);
    }
  }

  patientdiagnosis(){
    if(this.diagnosisdetails.valid)
    console.log(this.diagnosisdetails.value);
    else{
      this.validateAllFromFields(this.diagnosisdetails);
      console.log(this.diagnosisdetails.value);
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
