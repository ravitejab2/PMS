import { Component, Input, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import {  MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter, map, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-shared-sidenav',
  templateUrl: './shared-sidenav.component.html',
  styleUrls: ['./shared-sidenav.component.css']
})
export class SharedSidenavComponent implements OnInit {
 
   ActiveUsers!:string;
   userRole!:string;
   personIs!:string;
  isActive:boolean=true;
// @Input() deviceXs!:boolean;
mediaSub!: Subscription;
devicesXs!: boolean;


constructor(public mediaObserver: MediaObserver,public router:Router,private service:UserService,private toaster:ToastrService) {
    const value = localStorage.getItem("userName");
    if (typeof value === 'string') {
      this.ActiveUsers = JSON.parse(value) // ok
    }
    console.log(value);
    const user = localStorage.getItem("userRole");
    if (typeof user === 'string') {
      this.userRole = JSON.parse(user) // ok
  }
  console.log(this.userRole);
  console.log('AboveId');
  if(this.userRole=='user'){
    this.personIs='Patient'
  }
  else if(this.userRole=='admin'){
    this.personIs='Admin'
  }
  
  
}



ngOnInit() {
     
  this.mediaSub = this.mediaObserver.asObservable() // New Way asObservable()
  .pipe(
    filter((changes: MediaChange[]) => changes.length > 0),
    map((changes: MediaChange[]) => changes[0])
  ).subscribe((change: MediaChange) => {
    console.log(change.mqAlias)
    this.devicesXs = change.mqAlias === "xs" ? true : false;
  }
  )
}

ngOnDestroy() {
  this.mediaSub.unsubscribe();
}
logout(){
  console.log('hit');
 this.service.logout();
 this.router.navigate(['login']);
 this.toaster.success('Logout Successful')

}

}



