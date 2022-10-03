import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-landing-toolbar',
  templateUrl: './shared-landing-toolbar.component.html',
  styleUrls: ['./shared-landing-toolbar.component.css']
})
export class SharedLandingToolbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  backTologin(){
    this.router.navigate(['/login']);
  }

}
