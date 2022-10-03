import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private router:Router, private formBuilder:FormBuilder,private userService:UserService,private toaster:ToastrService) { }

  "forgotpassword":FormGroup;
  isSubmitted = false;

  ngOnInit(): void {
    this.forgotpassword=this.formBuilder.group({
      email:new FormControl(null,[Validators.required,Validators.email])
    })
  }

  backToLogin(){
    this.router.navigate(['/login']);
  }


  passwordforgot(){
    console.log(this.forgotpassword.value);
    if(this.forgotpassword.valid){
    
      //this.registerpatient.controls['Role'].value='user';
      // console.log(this.role);
      console.log(this.forgotpassword.value);
        this.userService.forgotpassword(this.forgotpassword.value)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
         // this.toasts.success('User registration successful');
         
        }
      });
      this.toaster.success("Email sent successfully")
      console.log('Email sent')
      this.forgotpassword.reset();
      this.router.navigate(['/login']);
    }        
      else {
        this.validateAllFromFields(this.forgotpassword);       
        
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
