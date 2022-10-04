import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserService } from 'src/app/services/user/user.service';
import Validation from '../../validators/confirm-password-validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
 
  userId!:number;
 
  constructor(private router:Router,private formBuilder:FormBuilder,private userService:UserService,private toaster:ToastrService){
    const value = localStorage.getItem("userID");
    if (typeof value === 'string') {
      this.userId = JSON.parse(value) // ok
  }
  console.log(this.userId);
  }
   
  
 "newPassword":FormGroup;
  role:string='user';
    
  ngOnInit(): void {    
      this.newPassword= this.formBuilder.group({
        CurrentPassword:new FormControl(null,[Validators.required,Validators.minLength(8)]),
        NewPassword: new FormControl(null,[Validators.required,Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.{8,})/
        ),Validators.minLength(8)]),
        Role:new FormControl('user'),
        ConfirmPassword:new FormControl(null,[Validators.required,Validators.minLength(8)]),
          
      },
    {
      validators: [Validation.match('NewPassword', 'ConfirmPassword')]
    }
    );
    this.newPassword.reset();
   
  }
  changePassword(){
    if(this.newPassword.valid){
      
      //this.newPassword.controls['Role'].value='user';
      console.log(this.role);
      console.log(this.newPassword.value);
      this.userService.changePassword(this.userId,this.newPassword.controls['CurrentPassword'].value,this.newPassword.controls['NewPassword'].value)
      .subscribe((data: ResponseModel) => {
        if (data.responseCode == 1) {
         // this.toasts.success('User registration successful');
         this.toaster.success("Password Changed Successfully")
         console.log('Register Succeeded')
         this.newPassword.reset();
         this.router.navigate(['/login']);
        }
      });
     
    }        
      else {
        this.validateAllFromFields(this.newPassword);       
        
      }
  }

  backToLogin(){
    this.router.navigate(['/login']);
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
