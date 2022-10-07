import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})


export class EmployeesService {
  baseUrl:string=environment.baseApiUrl;
  
  
 
  constructor(private http:HttpClient) { }

  getAllEmployee():Observable<any>
  {
    let token=localStorage.getItem("userToken");
       
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    })
    return this.http.get(this.baseUrl + '/GetEmployees', {headers:headers})

  }

  activateUser(id:number):Observable<any>
  {
    let token=localStorage.getItem("userToken");
       
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    })
    return this.http.post(this.baseUrl + '/activate-user',id,{headers:headers});
  }

  deactivateUser(id:number):Observable<any>
  {
    let token=localStorage.getItem("userToken");
       
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    })
    return this.http.post(this.baseUrl + '/deactivate-user',id,{headers:headers});
  }

 
}
