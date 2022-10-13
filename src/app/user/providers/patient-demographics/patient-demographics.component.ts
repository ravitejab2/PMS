import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { allergyModel, PatientAllergyModel } from 'src/app/models/patientModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { PatientService } from 'src/app/services/patient/patient.service';
import { UserService } from 'src/app/services/user/user.service';
import { Demographic, EmergencyDetails } from '../../patient/patient-detailslist/patient-detailslist.component';

@Component({
  selector: 'app-patient-demographics',
  templateUrl: './patient-demographics.component.html',
  styleUrls: ['./patient-demographics.component.css']
})
export class PatientDemographicsComponent implements OnInit {

  maxDate!: Date;
  userId!: any
  patientId!: number;
  public birthdate!: Date;
  public age!: number;
  response!: any;
  user!: Demographic;
  emergency!: EmergencyDetails;
  response2!: any;

  response3: any;
  result!: allergyModel[];
  res!: any;
  allallergytype!: string[];
  allallergyname!: string[];
  output!: allergyModel[];
  patientAllergyId!:number;
  allergyId!: string;
  allergy_Name!: string;
  allergy_Type!: string;
  allergy_Desc!: string;
  allergy_Clinical!: string;
  allergyobj!: PatientAllergyModel;
  createdOn!: Date;
  updatedOn!: Date;
  out: any;

  //username: string=this.user.firstName



  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private service: PatientService, private toaster: ToastrService, private userService: UserService) {

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = Number(params.get('id'));

      this.patientId = id;
      console.log('ParameterId', this.patientId);

    });


    const currentYear = new Date();
    this.maxDate = new Date(currentYear);
    console.log(this.maxDate);
    console.log(currentYear);

    const value = localStorage.getItem("userID");
    this.userId = value;

    console.log('Profile', value)
    console.log(this.userId)// ok
    //console.log('Hello',this.username)


  }


  "patientdetails": FormGroup;
  "emergencydetails": FormGroup;
  "allergydetails": FormGroup;
  isSubmitted = false;
  isLinear = false;

  ngOnInit(): void {

    this.patientDemographicForm();
    this.patientEmergencyForm();
    this.patientAllergyForm();
    this.getMasterAllergy();

    this.loadUserProfile();
    this.loadEmergencyFormData();
    this.loadDemographicFormData();

  }



  patientDemographicForm() {
    this.patientdetails = this.formBuilder.group({

      Title: new FormControl('', [Validators.required]),
      PatientId: new FormControl(this.patientId),
      // CreatedOn: new FormControl(''),
      FirstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      LastName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      DateOfBirth: new FormControl(null, [Validators.required]),
      ContactNo: new FormControl(null, [Validators.required]),
      Age: new FormControl('', [Validators.required]),
      Email: new FormControl(null, [Validators.required, Validators.email]),
      Gender: new FormControl('', [Validators.required]),
      Race: new FormControl(null, [Validators.required]),
      Ethnicity: new FormControl(null, [Validators.required]),
      LanguagesKnow: new FormControl(null, [Validators.required]),
      Address: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(30)])

    });
  }



  patientEmergencyForm() {
    this.emergencydetails = this.formBuilder.group({
      FirstName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      PatientId: new FormControl(this.patientId),
      LastName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      ContactNo: new FormControl(null, [Validators.required]),
      Email: new FormControl(null, [Validators.required, Validators.email]),
      Relationship: new FormControl(null, [Validators.required]),
      IsAllowed: new FormControl(null, [Validators.required]),
      Address: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(30)])

    });
  }

  patientAllergyForm() {
    this.allergydetails=this.formBuilder.group({
      Allergy_Type: new FormControl('',[Validators.required]),
      Allergy_Name: new FormControl('',[Validators.required]),
      AllergyId: new FormControl('',[Validators.required]),
      Allergy_Desc: new FormControl('',[Validators.required]),
      Allergy_Clinical: new FormControl('',[Validators.required]),
      Is_Fatal: new FormControl(false,[Validators.required]),

    });
  }



  registerDemographicDetails() {
    if (this.patientdetails.valid) {
      console.log(this.patientdetails.value)

      // console.log('created',this.user.createdOn);

      if (this.user.id > 0) {
        this.service.updateDemographics(this.patientId, this.patientdetails.value).subscribe((data: ResponseModel) => {

          if (data.responseCode == 1) {
            this.toaster.success(data.responseMessage)
          }
          else {
            this.toaster.error(data.responseMessage)
          }



        })


      }

      else {

        this.service.postDemographics(this.patientdetails.value).subscribe((data: ResponseModel) => {
          console.log(data)
          if (data.responseCode == 1) {
            this.toaster.success(data.responseMessage)
          }
          else {
            this.toaster.error(data.responseMessage)
          }

        })


      }

    }



    else {
      this.validateAllFromFields(this.patientdetails);
      console.log(this.patientdetails.value);
    }
  }


  loadUserProfile() {

    this.service.getUserById(this.patientId).subscribe((data: ResponseModel) => {

      console.log(data);
      if (data.responseCode == 1) {
        this.response = data;
        console.log(this.response);
        this.user = this.response.dataSet;
        console.log(this.user)
        
        this.loadDemographicFormData();
        this.loadEmergencyFormData();

      }
      else {

        this.toaster.error('Please enter demographic details first!')
        this.user = new Demographic();
        this.user.id = 0;

      }
    });


    this.service.getEmergencyContact(this.patientId).subscribe((data: ResponseModel) => {
      console.log('Emergncy', data);
      if (data.responseCode == 1) {
        this.response2 = data;
        console.log(this.response2);
        this.emergency = this.response2.dataSet;
        console.log(this.emergency)
        this.loadEmergencyFormData();
       

      }
      else {
        this.toaster.error('Please fill Emergency Contact!')
        this.emergency = new EmergencyDetails();
        this.emergency.emergencyContactId = 0;

      }
    });

  }

  loadDemographicFormData() {

    console.log('Load From', this.user.firstName);
    const control12 = this.patientdetails.get('Title');
    const control1 = this.patientdetails.get('FirstName');
    const control2 = this.patientdetails.get('LastName');
    const control3 = this.patientdetails.get('DateOfBirth');
    const control4 = this.patientdetails.get('ContactNo');
    const control5 = this.patientdetails.get('Email');
    const control6 = this.patientdetails.get('Age');
    const control7 = this.patientdetails.get('Gender');
    const control8 = this.patientdetails.get('Race');
    const control9 = this.patientdetails.get('Ethnicity');
    const control10 = this.patientdetails.get('LanguagesKnow');
    const control11 = this.patientdetails.get('Address');
    //const control13 = this.patientdetails.get('CreatedOn')





    if (control1 instanceof FormControl) {
      control1.setValue(this.user.firstName);
      control2?.setValue(this.user.lastName);
      control3?.setValue(this.user.dob);
      control4?.setValue(this.user.contactNo);
      control5?.setValue(this.user.email);
      control6?.setValue(this.user.age);
      control7?.setValue(this.user.gender);
      control8?.setValue(this.user.race);
      control9?.setValue(this.user.ethnicity);
      control10?.setValue(this.user.languagesKnow);
      control11?.setValue(this.user.address);
      control12?.setValue(this.user.title);
      // control13?.setValue(this.user.createdOn);
    }


  }

  loadEmergencyFormData() {

    console.log('Load From', this.user.firstName);
    const control1 = this.emergencydetails.get('FirstName');
    const control2 = this.emergencydetails.get('LastName');
    const control3 = this.emergencydetails.get('ContactNo');
    const control4 = this.emergencydetails.get('Email');
    const control5 = this.emergencydetails.get('Relationship');
    const control6 = this.emergencydetails.get('IsAllowed');
    const control7 = this.emergencydetails.get('Address');
    const control8 = this.emergencydetails.get('CreatedOn')





    if (control1 instanceof FormControl) {
      control1.setValue(this.emergency.firstName);
      control2?.setValue(this.emergency.lastName);
      control3?.setValue(this.emergency.contactNo);
      control4?.setValue(this.emergency.email);
      control5?.setValue(this.emergency.relationship);
      control6?.setValue(this.emergency.isAllowed);
      control7?.setValue(this.emergency.address);
      control8?.setValue(this.emergency.createdOn);

    }


  }





  registerEmergencyContact() {
    if (this.emergencydetails.valid) {
      console.log(this.emergencydetails.value)

      if (this.emergency.emergencyContactId > 0) {
        this.service.updateEmergency(this.patientId, this.emergencydetails.value).subscribe((data: ResponseModel) => {
          if (data.responseCode == 1) {
            this.toaster.success(data.responseMessage)
          }
          else {
            this.toaster.error(data.responseMessage)
          }



        })


      }


      else {

        this.service.postEmergencyContact(this.emergencydetails.value).subscribe((data: ResponseModel) => {
          if (data.responseCode == 1) {
            this.toaster.success(data.responseMessage)
          }
          else {
            this.toaster.error(data.responseMessage)
          }

        })
      }




    }

    else {
      this.validateAllFromFields(this.emergencydetails);

    }
  }


  registersAllergyDetails() {
    if (this.allergydetails.valid) {
      console.log(this.allergydetails.value)
      this.service.postAllergyDetails(this.allergydetails.value).subscribe((data: ResponseModel) => {
        if (data.responseCode == 1) {
          this.toaster.success(data.responseMessage)
        }
        else {
          this.toaster.error(data.responseMessage)
        }

      })
    }

    else {
      this.validateAllFromFields(this.emergencydetails);

    }
  }

  getMasterAllergy(){
    this.service.allAllergies().subscribe((data:ResponseModel)=>
    { 
      if(data.responseCode==1)
      {
      this.response=data;
      this.result=this.response.dataSet
      console.log(this.allallergytype);
      console.log(this.result);
      }
      else{
        this.toaster.error(data.responseMessage);
      }
    })
    }
   
   
   
    registerAllergyDetails() {
      console.log(this.allergydetails);
      if (this.allergydetails.valid) {
        this.allergyobj=new PatientAllergyModel();
         this.allergyobj.AllergyId=this.allergyId;
         this.allergyobj.PatientId=this.patientId;
         this.allergyobj.Allergy_Name=this.allergy_Name;
         this.allergyobj.Allergy_Type=this.allergy_Type;
         this.allergyobj.Allergy_Desc=this.allergy_Desc;
         this.allergyobj.Allergy_Clinical=this.allergy_Clinical;
         this.allergyobj.Is_Allergy_Fatal=this.allergydetails.get('Is_Fatal')?.value;
         this.allergyobj.CreatedOn=this.createdOn;
         this.allergyobj.UpdatedOn=this.updatedOn;
         console.log(this.allergyobj);
        console.log(this.allergydetails.value)
        this.service.postAllergyDetails(this.allergyobj).subscribe((data: ResponseModel) => {
          if (data.responseCode == 1) {  
            this.toaster.success(data.responseMessage)
          }
          else {
            this.toaster.error(data.responseMessage)
          }
        })
      }
    }


    onChange(event:any) 
    {
      console.log(event);
      this.allergy_Name=event;
     this.res=this.output.find(x=>x.allergy_Name==event);
     this.allergyId=this.res.allergyId
     this.allergy_Desc=this.res.allergy_Description
     this.allergy_Clinical=this.res.allergy_Clinical_Information
     console.log(this.allergyId,this.allergy_Desc, this.allergy_Clinical)
      // this.persons =  this.personService.getPersons().find(x => x.id == this.personId);
    }
  onDropdownChange(event:any) 
    {
      console.log(event);
      this.allergy_Type=event;
      this.output=this.result.filter(x=>x.allergy_Type == event)
      console.log(this.output);
      // this.result.find
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
