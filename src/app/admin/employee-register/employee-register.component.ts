import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { ResponseModel } from '../../models/responseModel';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent implements OnInit {
  maxDate!: Date;
  constructor(private router:Router,private formBuilder:FormBuilder, private userService:UserService,private toaster:ToastrService) {
    const currentYear = new Date();
    this.maxDate = new Date(currentYear);
    console.log(this.maxDate);
    console.log(currentYear);
   }

  "registeremp":FormGroup;
  isSubmitted = false;

  ngOnInit(): void {

    this.registeremp= this.formBuilder.group({
      Title: new FormControl('',[Validators.required]),
      FirstName: new FormControl(null,[Validators.required,Validators.minLength(2)]),
      LastName: new FormControl(null,[Validators.required,Validators.minLength(2)]),
      Email: new FormControl(null,[Validators.required,Validators.email]),
      DateOfBirth: new FormControl(null,[Validators.required]),
      Role: new FormControl(null,[Validators.required]),  
      ContactNumber: new FormControl(null,[Validators.required])
      // Password: new FormControl('Password123@'),      
      // ConfirmPassword:new FormControl('Password123@'),   
      
  })

}

empregister(){
  if(this.registeremp.valid){  
    console.log(this.registeremp.value);
      this.userService.registerUser(this.registeremp.value)
    .subscribe((data: ResponseModel) => {
      if (data.responseCode == 1) {
       // this.toasts.success('User registration successful');
       this.toaster.success(data.responseMessage)
       console.log('Register Succeeded')
       this.registeremp.reset();
      }
      else{
        this.toaster.error(data.responseMessage)
      }
    });
  
    
  }        
    else {
      this.validateAllFromFields(this.registeremp);       
      
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


