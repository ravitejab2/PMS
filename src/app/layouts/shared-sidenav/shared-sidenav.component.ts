import { Component, Input, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import {  MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-shared-sidenav',
  templateUrl: './shared-sidenav.component.html',
  styleUrls: ['./shared-sidenav.component.css']
})
export class SharedSidenavComponent implements OnInit {
 
   ActiveUsers!:string;
  isActive:boolean=true;
// @Input() deviceXs!:boolean;
mediaSub!: Subscription;
devicesXs!: boolean;


constructor(public mediaObserver: MediaObserver,private router:Router,private service:UserService) {
    const value = localStorage.getItem("userName");
    if (typeof value === 'string') {
      this.ActiveUsers = JSON.parse(value) // ok
  }
    
    console.log(value);
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

}

}



