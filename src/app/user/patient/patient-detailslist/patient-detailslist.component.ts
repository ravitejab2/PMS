import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { allergyModel, PatientAllergyModel } from 'src/app/models/patientModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { PatientService } from 'src/app/services/patient/patient.service';
import { UserService } from 'src/app/services/user/user.service';

export class Demographic {
  id:number=0;
  title!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  age!: number;
  dob!: Date;
  address!: string;
  contactNo!: number;
  gender!: string;
  ethnicity!: string;
  race!: string;
  languagesKnow!: string;
  createdOn!:Date;

}
export class EmergencyDetails {
  emergencyContactId:number=0;
  patientId!: number;
  title!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  contactNo!: number;
  isAllowed!:boolean;
  address!: string;
  relationship!: string;
  createdOn!:Date;
}




@Component({
  selector: 'app-patient-detailslist',
  templateUrl: './patient-detailslist.component.html',
  styleUrls: ['./patient-detailslist.component.css']
})
export class PatientDetailslistComponent implements OnInit {
  maxDate!: Date;
  userId!: any
  public birthdate!: Date;
  public age!: number;
  response!: any;
  user!: Demographic;
  emergency!:EmergencyDetails;
  response2!:any;


  response3: any;
  result!: allergyModel[];
  res!: any;
  allallergytype!: string[];
  allallergyname!: string[];
  output!: allergyModel[];
  getAllergy!:allergyModel;
  patientAllergyId!:number;
  allergyId!: string;
  allergy_Name!: string;
  allergy_Type!: string;
  allergy_Desc!: string;
  allergy_Clinical!: string;
  allergyobj!: PatientAllergyModel;
  patientId!: number;
  createdOn!: Date;
  updatedOn!: Date;
  out: any;


  //username: string=this.user.firstName





    constructor(private router: Router, private formBuilder: FormBuilder, private service: PatientService, private toaster: ToastrService, private userService: UserService) {
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

    this.loadUserProfile();
    this.getMasterAllergy();
    this.loadEmergencyFormData();
    this.loadDemographicFormData();

  }



  // CalculateAge(): void {
  //   if (this.birthdate) {
  //     var timeDiff = Math.abs(Date.now() - this.birthdate.getTime());
  //     //Used Math.floor instead of Math.ceil
  //     //so 26 years and 140 days would be considered as 26, not 27.
  //     this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);

  //     console.log(this.patientdetails.get('DateOfBirth')?.value);
  //   }
  // }



  nextsecion() {
    this.router.navigate(['emergency'])
  }



  backtohome() {
    this.router.navigate(['dashboard'])
  }


  patientDemographicForm() {
    this.patientdetails = this.formBuilder.group({

      Title: new FormControl('', [Validators.required]),
      PatientId: new FormControl(parseInt(this.userId)),
    //  CreatedOn:new FormControl(''),
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
      PatientId: new FormControl(parseInt(this.userId)),
     // CreatedOn:new FormControl(''),
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
    if (this.patientdetails.valid)
    {
      console.log(this.patientdetails.value)
            console.log(this.user.createdOn);

            if(this.user.createdOn!=null)
              {
                this.service.updateDemographics(this.userId,this.patientdetails.value).subscribe((data: ResponseModel)=>{
                  if (data.responseCode == 1)
                  {
                    this.toaster.success(data.responseMessage)
                  }
                  else
                  {
                    this.toaster.error(data.responseMessage)
                  }



                })


              }

      else{

         this.service.postDemographics(this.patientdetails.value).subscribe((data: ResponseModel) => {
        if (data.responseCode == 1)
        {
          this.toaster.success(data.responseMessage)
        }
        else
        {
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

    this.service.getUserById(this.userId).subscribe((data: ResponseModel) => {

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
       // this.toaster.error(data.responseMessage)
       this.toaster.error('Please enter demographic details first!')
       this.user = new Demographic();
       this.user.id = 0;

      }
      });


    this.service.getEmergencyContact(this.userId).subscribe ((data: ResponseModel) => {
      console.log('Emergncy',data);
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

      this.service.getAllergyById(this.userId).subscribe((data:ResponseModel)=>{
        console.log('Allergy',data);
        if (data.responseCode == 1) {
             this.getAllergy=data.dataSet;
             this.output=data.dataSet;
             console.log(this.getAllergy)

            //   this.allergydetails.patchValue({
            //  Allergy_Type:this.getAllergy.allergy_Type,
            //   Allergy_Name: this.getAllergy.allergy_Name,
              // AllergyId: this.getAllergy.allergyId,
              // Allergy_Desc: this.getAllergy.allergy_Description,
            //  Allergy_Clinical: this.getAllergy[0].,
            //  Is_Fatal: this.getAllergy[0].

           //})
        //   this.onDropdownChange(this.getAllergy.allergy_Type);
          //  this.allergydetails.patchValue({
          //   //Allergy_Type:this.getAllergy.allergy_Type,
          //   Allergy_Name: this.getAllergy.allergy_Name,
          // })
             //this.onChange(this.getAllergy.allergy_Name);

        }

      })

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
    const control13=this.patientdetails.get('CreatedOn')





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
      control13?.setValue(this.user.createdOn);
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
    const control8= this.emergencydetails.get('CreatedOn')





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
    if (this.emergencydetails.valid)
    {
      console.log(this.emergencydetails.value)

      if (this.emergency.emergencyContactId > 0)
        {
                this.service.updateEmergency(this.userId,this.emergencydetails.value).subscribe((data: ResponseModel)=>{
                  if (data.responseCode == 1)
                  {
                    this.toaster.success(data.responseMessage)
                  }
                  else
                  {
                    this.toaster.error(data.responseMessage)
                  }



                })


              }


       else{

      this.service.postEmergencyContact(this.emergencydetails.value).subscribe((data: ResponseModel) => {
        if (data.responseCode == 1) {
          this.toaster.success(data.responseMessage)
        }
        else {
          this.toaster.error(data.responseMessage)
        }

      })}




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
         this.allergyobj.PatientId=Number(this.userId);
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
