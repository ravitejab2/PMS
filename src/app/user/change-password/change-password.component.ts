import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from '../confirm-password-validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

 
  constructor(private router:Router,private formBuilder:FormBuilder){}
   
  
 "registerpatient":FormGroup;
  role:string='user';
    
  ngOnInit(): void {    
      this.registerpatient= this.formBuilder.group({
        OldPassword:new FormControl(null,[Validators.required,Validators.minLength(8)]),
        Password: new FormControl(null,[Validators.required,Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.{8,})/
        ),Validators.minLength(8)]),
        Role:new FormControl('user'),
        ConfirmPassword:new FormControl(null,[Validators.required,Validators.minLength(8)]),
          
      },
    {
      validators: [Validation.match('Password', 'ConfirmPassword')]
    }
    );
    this.registerpatient.reset();
   
  }
  changePassword(){
    this.validateAllFromFields(this.registerpatient);
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
