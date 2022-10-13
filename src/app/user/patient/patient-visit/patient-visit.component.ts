import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { diagnosisModel, medicationModel, procedureModel, Vitals } from 'src/app/models/patientModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { EmployeesService } from 'src/app/services/employees/employees.service';

@Component({
  selector: 'app-patient-visit',
  templateUrl: './patient-visit.component.html',
  styleUrls: ['./patient-visit.component.css']
})
export class PatientVisitComponent implements OnInit {
  step = 0;
  patientId!: number;
  vitals!: Vitals;
  response!: any;
  response1: any;

  output: any;
  alldiagnosiscode: any;
  result!: diagnosisModel[];
  res!: medicationModel[];
  diagnosis_Code: any;
  data!: any;
  descriptionData!: any;
  allmedicationcode: any
  durg_Id: any;
  output1!: medicationModel[];
  nameData!: any;
  drug_Name!: string;
  res1!: any;
  drug_GenericName!: string;
  drug_Strength: any;
  drug_Form: any;
  drug_GenVar: any
  allprocedurecode: any;
  proc_result!: procedureModel[];
  procedure_Code: any;
  procedure_output!: any;
  procedureData!: any;
  depricated!: boolean;
  proc_depricated: any;
  diagId!: number;
  
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(private router: Router, private toaster: ToastrService, private route: ActivatedRoute, private formBuilder: FormBuilder, private service: EmployeesService) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = Number(params.get('id'));

      this.patientId = id;
      console.log('ParameterId', this.patientId);

    });


  }

  "vitaldetails": FormGroup;
  "diagnosisdetails": FormGroup;
  isSubmitted = false;
  isLinear = false;

  ngOnInit(): void {

    this.patientVitalForm();
    this.loadUserProfile();
    this.patientDiagnosisForm();
    
    this.getMasterDiagnosis();
    this.getMasterMedications();
    this.getMasterProcedures();

  }

  patientVitalForm() {
    this.vitaldetails = this.formBuilder.group({
      height: new FormControl('', [Validators.required]),
      Patient_Id: new FormControl(this.patientId), //in cm
      Weight: new FormControl(null, [Validators.required]), //in kg
      blood_Pressure: new FormControl('', [Validators.required]), //(systolic / diastolic in mm Hg)
      Body_Temperature: new FormControl(null, [Validators.required]), //(in Fahrenheit)
      Respiration_Rate: new FormControl(null, [Validators.required]),//in BPM
      // Visit_Date:new FormControl()

    });
  }

  patientDiagnosisForm() {

      this.diagnosisdetails = this.formBuilder.group({
      PatientId: new FormControl(this.patientId),

      diagnosis_Code: new FormControl (null,[Validators.required]), //txtbox/dropdown list
      diagnosis_Description: new FormControl (null,[Validators.required]), //dropdown
      diagnosis_Is_Depricated: new FormControl ('',[Validators.required]), //bool
      visitId:new FormControl(this.diagId),



      procedure_Code: new FormControl (null,[Validators.required]), //txtbox/dropdown list
      procedure_Description: new FormControl (null,[Validators.required]), //dropdown
      procedure_Is_Depricated: new FormControl (null,[Validators.required]), //bool



      drugID: new FormControl (null,[Validators.required]), //dropdown
      drug_Name: new FormControl (null,[Validators.required]), //dropdown list
      drug_GenericName: new FormControl (null,[Validators.required]), //auto populate after selectn of drug nam
      drug_Strength: new FormControl (null,[Validators.required]),//dropdown/checkbox
      drug_Form: new FormControl (null,[Validators.required]),//dropdown
      description: new FormControl (null,[Validators.required])

    });
  }

  registerDiagnosis(){

    console.log(this.diagnosisdetails.value); 

  }
  getMasterDiagnosis(){
    this.service.allDiagnosis().subscribe((data:ResponseModel)=>
    {
      if(data.responseCode==1){
        this.response1=data;
        this.result=this.response1.dataSet
        //console.log(this.alldiagnosiscode);
        console.log(data);
        console.log(this.result);
      }
      else{
        this.toaster.error(data.responseMessage);
      }
    })
  }
  
  getMasterProcedures(){
    this.service.allProcedures().subscribe((data:ResponseModel)=>
    {
      if(data.responseCode==1){
        this.response1=data;
        this.proc_result=this.response1.dataSet
        //console.log(this.allprocedurecode);
        console.log(this.proc_result);
      }
      else{
        this.toaster.error(data.responseMessage);
      }
    })
  }
  getMasterMedications(){
    this.service.allMedications().subscribe((data:ResponseModel)=>
    {
      if(data.responseCode==1){
        this.response1=data;
        this.res=this.response1.dataSet
        //console.log(this.allmedicationcode);
        console.log(this.res);
      }
      else{
        this.toaster.error(data.responseMessage);
      }
    })
  }
  onDropdownChange(event:any) 
    {
      console.log(event.value);
      this.diagnosis_Code=event.value;
      this.output=this.result.filter(x=>x.diagnosis_Code == event.value);
      console.log(this.output);
      this.descriptionData=this.output;
      console.log(this.descriptionData[0].diagnosis_Description);
      const control1= this.diagnosisdetails.get('diagnosis_Description')
    if (control1 instanceof FormControl) {
      control1.setValue(this.descriptionData[0].diagnosis_Description);
    }
    console.log(this.descriptionData[0].diagnosis_Is_Depricated)
    this.depricated=this.descriptionData[0].diagnosis_Is_Depricated
    console.log(this.depricated);
    const control2= this.diagnosisdetails.get('diagnosis_Is_Depricated')
    if (control2 instanceof FormControl) {
      control2.setValue(this.depricated);
    }
  }
  onProcedureCodeChange(event:any) 
    {
      console.log(event.value);
      this.procedure_Code=event.value;
      this.procedure_output=this.proc_result.filter(x=>x.procedure_Code == event.value);
      console.log(this.procedure_output);
      this.procedureData=this.procedure_output;
      console.log(this.procedure_output[0].procedure_Description);
      this.proc_depricated=this.procedureData[0].procedure_Is_Depricated
    console.log(this.proc_depricated);
      const control1= this.diagnosisdetails.get('procedure_Description')
    if (control1 instanceof FormControl) {
      control1.setValue(this.procedure_output[0].procedure_Description);
    }
    console.log(this.procedureData[0].procedure_Is_Depricated)
    this.depricated=this.procedureData[0].procedure_Is_Depricated
    console.log(this.proc_depricated);
    const control2= this.diagnosisdetails.get('procedure_Is_Depricated')
    if (control2 instanceof FormControl) {
      control2.setValue(this.proc_depricated);
      //console.log(this.descriptionData[0].diagnosis_Is_Depricated)
    }
  }
  onChange(event:any) 
  {
    console.log(event.value);
    this.durg_Id=event.value;
    this.output1=this.res.filter(x=>x.drugID == event.value);
    console.log(this.output1);
    console.log(this.output1[0].drug_Generic_Name);
    this.drug_GenVar=this.output1[0].drug_Generic_Name;
    console.log(this.drug_GenVar);
}
onNameChange(event:any){
  console.log(event.value);
  this.drug_Name=event.value;
  this.res1=this.output1.find(x=>x.drug_Name==event.value);
  console.log(this.res1);
  //this.diagnosisdetails.controls['DrugName'].setValue(event.value);
  console.log(this.res1.drug_Generic_Name)
  // const control1= this.diagnosisdetails.get('DrugGenName')
  //   if (control1 instanceof FormControl) {
  //     control1.setValue(this.drug_GenVar);
  //   }
  // // this.drug_GenericName=this.res1.drug_Generic_Name
  // this.drug_Strength=this.res1.drug_Strength
  // this.drug_Form=this.res1.drug_Form
}

  postDiagnosis() {
    if (this.diagnosisdetails.valid) {

      console.log(this.diagnosisdetails.value);


      this.service.postDiagnosis(this.diagnosisdetails.value).subscribe((data: ResponseModel) => {
        console.log(data);

        if (data.responseCode == 1) {
          this.toaster.success(data.responseMessage)
        }
        else {
          this.toaster.error(data.responseMessage)
        }
      });
    }




    else {
      this.validateAllFromFields(this.vitaldetails);
      console.log(this.vitaldetails.value);
    }
  }



  postVitals() {
    if (this.vitaldetails.valid) {

      console.log(this.vitaldetails.value);

      //   if (this.vitals.visitId > 0) {

      //     this.service.putVitals(this.patientId,this.vitaldetails.value).subscribe((data: ResponseModel) => {
      //       console.log(data);
      //       if (data.responseCode == 1) {
      //         this.toaster.success(data.responseMessage)
      //       }
      //       else {
      //         this.toaster.error(data.responseMessage)
      //       }
      //     });


      // }
      // else{
      this.service.postVitals(this.vitaldetails.value).subscribe((data: ResponseModel) => {
        console.log(data);
        if (data.responseCode == 1) {
          this.toaster.success(data.responseMessage)
        }
        else {
          this.toaster.error(data.responseMessage)
        }
      });
      // }



    }



    else {
      this.validateAllFromFields(this.vitaldetails);
      console.log(this.vitaldetails.value);
    }
  }



  loadUserProfile() {

    this.service.getVitalsById(this.patientId).subscribe((data: ResponseModel) => {
      console.log(data);

      if (data.responseCode == 1) {

        this.response = data;
        this.vitals = this.response.dataSet;

        this.diagId=this.vitals.visitId;
        console.log(this.diagId);
        this.diagnosisdetails.patchValue({
       visitId:this.diagId

        })
        console.log(this.vitals);
        console.log(this.response.dataSet);

        this.loadVitalsFormData();
      }


      else {
        debugger
        this.vitals = new Vitals();
        this.vitals.visitId = 0;

      }
    });




  }



  loadVitalsFormData() {

    console.log(this.vitals)
    const control1 = this.vitaldetails.get('height');
    const control2 = this.vitaldetails.get('Weight');
    const control3 = this.vitaldetails.get('blood_Pressure');
    const control4 = this.vitaldetails.get('Body_Temperature');
    const control5 = this.vitaldetails.get('Respiration_Rate');
    const control6=this.diagnosisdetails.get('vistId')
    //  const control6 = this.vitaldetails.get('Visit_Date');





    if (control1 instanceof FormControl) {
      control1.setValue(this.vitals.height);
      control2?.setValue(this.vitals.weight);
      control3?.setValue(this.vitals.blood_Pressure);
      control4?.setValue(this.vitals.body_Temperature);
      control5?.setValue(this.vitals.respiration_Rate);
      control6?.setValue(this.vitals.visitId);
      //  control6?.setValue(this.vitals.visit_Date);

    }


  }












  private validateAllFromFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      }
      else if (control instanceof FormGroup) {
        this.validateAllFromFields(control)
      }
    })
  }

}
