import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel';
import { User, UserService } from 'src/app/services/user/user.service';
import { __values } from 'tslib';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user!:User;
  users!: Observable<User>;
  userId!:any;
  "userProfile":FormGroup
  panelOpenState = false;
  response!:any;
 

  constructor(private router:Router,private service:UserService,private formBuilder:FormBuilder) { 
    const value=localStorage.getItem("userID");  
      this.userId =value;
         
         console.log('Profile',value)
      console.log(this.userId)// ok
    }
    

  

  

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadUser();
    this. loadApiValue();
    console.log('hEY'+this.users);
   
  }

  
  
  loadUserProfile(){
    this.service.getUserProfile(this.userId).subscribe((data:ResponseModel)=>{
      console.log(data);
      this.response=data;
      this.user=this.response.dataSet;
      console.log(this.user);
    });

    
    
     
    this.userProfile= this.formBuilder.group({
       title: new FormControl(null),
       name: new FormControl(null),
       email: new FormControl(),
       dateOfBirth: new FormControl(null),
       role:new FormControl('user'),
       contact: new FormControl(null),
       address:new FormControl('Mumbai')   
     })

  }
  userw$=  this.service.getUserProfile(this.userId).pipe(
    tap((post) => {

      this.userProfile.setValue({
         title: post?.title,
         name: post?.name,
         email: post?.email,
         contact:post?.contact,
         dateOfBirth: post?.dateOfBirth,
         age:post?.dateOfBirth

        
      });
    })
  );

  loadApiValue() {
    return of<User>(this.user).pipe();
  }
 
loadUser(){
  this.users = this.loadApiValue().pipe(
    tap(users => this.userProfile.patchValue(users))
  );
  console.log(this.users)
  
}


}
