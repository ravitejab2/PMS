import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-shared-landing-toolbar',
  templateUrl: './shared-landing-toolbar.component.html',
  styleUrls: ['./shared-landing-toolbar.component.css']
})
export class SharedLandingToolbarComponent implements OnInit {

  Latitude!: number;

  Longitude!: number;



  constructor(private router:Router,private service:UserService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  backTologin(){
    this.router.navigate(['/login']);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.Latitude = position.coords.latitude;
           this.Longitude = position.coords.longitude;
          this.service.sendLocation(this.Latitude,this.Longitude).subscribe((data:ResponseModel)=>{
            if(data.responseCode==1){
              this.toastr.success(data.responseMessage);
            }
          });
        }
      },
        (error) => this.toastr.error("Geolocation is not supported by this browser"));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}
