import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/landing-screens/login/login.component';
import { ResponseModel } from '../../models/responseModel';

export interface User {
  id: number;
  name: string;
  email: string;
  role:number;
  title: string;
  contact:number;
 dateOfBirth:Date;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
 userId!:number;
  constructor(private http: HttpClient) {
    
   }
  readonly BaseURI = 'https://localhost:44362/api/account';

 

  login(data:any): Observable<any> {
    
    return this.http.post<ResponseModel>(this.BaseURI + '/login', data);
  }

  logout(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('userID');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
  
  }
  forgotpassword(body:any) {
    return this.http.post(this.BaseURI + '/forgot-password', body);
  }

  registerUser(body:any):Observable<any> {   
    //console.log(body);
    return this.http.post<ResponseModel>(this.BaseURI + '/signup', body);
  }
  
  empregister(data:any): Observable<any>{

    return this.http.post<ResponseModel>(this.BaseURI + '/login', data);

  }

  getUserProfile(id:number):Observable<any>{
    let token=localStorage.getItem("userToken");
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    })
    return this.http.get<ResponseModel>(this.BaseURI +'/profile-user/'+id,{headers:headers});
  }


  changePassword(id:number,old:string,pwd:string):Observable<any>{
    let token=localStorage.getItem("userToken");
       
    let body={
      CurrentPassword:old,
      NewPassword:pwd
    };
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    })
    
    
    return this.http.post<ResponseModel>(this.BaseURI+'/change-password/'+id ,body,{headers:headers})
  }
}
