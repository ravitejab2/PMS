import { Injectable } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

mediaSub!: Subscription;
devicesXs!: boolean;
constructor(public mediaObserver: MediaObserver,private router:Router) {

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
}
