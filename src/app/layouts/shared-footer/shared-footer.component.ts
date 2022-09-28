import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-footer',
  templateUrl: './shared-footer.component.html',
  styleUrls: ['./shared-footer.component.css']
})
export class SharedFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  scrollTop()

  {

    window.scroll({

      top: 0,

      left: 0,

      behavior: 'smooth'

    });
  }

}
