import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  maxDate!: Date;
  employeeId!: number;
  response: any;
  constructor(private router:Router,private formBuilder:FormBuilder, private userService:UserService,private toaster:ToastrService,private route:ActivatedRoute) {
    const currentYear = new Date();
    this.maxDate = new Date(currentYear);
    console.log(this.maxDate);
    console.log(currentYear);
    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id=Number(params.get('id'));
      
      this.employeeId=id;
    });
    //console.log(this.employeeId);
   }

  registeremp= this.formBuilder.group({
    Title: new FormControl('',[Validators.required]),
    FirstName: new FormControl(null,[Validators.required,Validators.minLength(2)]),
    LastName: new FormControl(null,[Validators.required,Validators.minLength(2)]),
    Email: new FormControl(null,[Validators.required,Validators.email]),
    DateOfBirth: new FormControl(null,[Validators.required]),    
    ContactNumber: new FormControl(null,[Validators.required])
      
    
})
  isSubmitted = false;

  ngOnInit(): void {
   
    this.loadEmployeeDetails();

}

empregister(){
  if(this.registeremp.valid){  
    console.log(this.registeremp.value);
      this.userService.editEmployee(this.employeeId,this.registeremp.value)
    .subscribe((data: ResponseModel) => {
      if (data.responseCode == 1) {
      
       this.toaster.success(data.responseMessage)
       
      
       
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


loadEmployeeDetails(){
  
  this.userService.getEmployeedetails(this.employeeId).subscribe((data:ResponseModel)=>{
    if(data.responseCode==1){
      this.response=data.dataSet;
      console.log(this.response);
      this.registeremp.setValue({
        Title: this.response.title,
        FirstName: this.response.firstName,
        LastName: this.response.lastName,
        Email: this.response.email,
        DateOfBirth: this.response.dateOfBirth,
        ContactNumber: this.response.contactNumber
      });
    }
    else{
      this.toaster.error(data.responseMessage);
    }
  })
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
