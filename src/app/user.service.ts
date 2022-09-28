import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from './models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:44362/api/account';

  login(data:any): Observable<any> {
    
    return this.http.post<ResponseModel>(this.BaseURI + '/login', data);
  }

  logout(){
    localStorage.removeItem('userToken');
  
  }

  registerPatient(body:any) {   
    //console.log(body);
    return this.http.post(this.BaseURI + '/signup', body);
  }
}
