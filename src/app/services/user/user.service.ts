import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
 userId!:number;
  constructor(private http: HttpClient) {
    
   }
  readonly BaseURI = 'https://localhost:44362/api/account';
  readonly url='https://localhost:44362/api/account/change-password'
 

  login(data:any): Observable<any> {
    
    return this.http.post<ResponseModel>(this.BaseURI + '/login', data);
  }

  logout(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('userID');
    localStorage.removeItem('userName');
  
  }
  forgotpassword(body:any) {
    return this.http.post(this.BaseURI + '/forgot-password', body);
  }

  registerPatient(body:any) {   
    //console.log(body);
    return this.http.post(this.BaseURI + '/signup', body);
  }
  empregister(data:any): Observable<any>{

    return this.http.post<ResponseModel>(this.BaseURI + '/login', data);

  }
  // setUrl(url:string, id:number) { 
  //   url = `${url}${id}`;
  //   console.log(url);
  //   return url;
  // }

  changePassword(userId:number,body:any):Observable<any>{
    // const value = localStorage.getItem("userToken");
    // console.log(value);
  //   const header = new Headers({ 'Authorization': `Bearer ${value}` });
  //   console.log(header);
  //   const options = {
  //     headers: header,
  //  };
    return this.http.post<ResponseModel>(this.BaseURI+'/change-password/'+userId ,body)
  }
}
