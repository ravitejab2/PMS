import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/landing-screens/login/login.component';
import { environment } from 'src/environments/environment.prod';
import { ResponseModel } from '../../models/responseModel';



@Injectable({
  providedIn: 'root'
})
export class UserService {
 
 userId!:number;
  constructor(private http: HttpClient) {
    
   }
  readonly BaseURI = 'https://localhost:44362/api/account';
  patientControllerApi=environment.patientApiUrl;

 

  login(data:any): Observable<any> {
    
    return this.http.post<ResponseModel>(this.BaseURI + '/login', data);
  }

  logout(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('userID');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('email');
    localStorage.removeItem('EmployeeCount');
  
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
    return this.http.get<ResponseModel>(this.patientControllerApi +'/profile-user/'+id,{headers:headers});
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
  
  gethospitalUsers():Observable<any>{
    
    let token=localStorage.getItem("userToken");      
    
     
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    })
    
    return this.http.get<ResponseModel>(this.BaseURI + '/GetEmployees',{headers:headers});
  }


//Scheduler change

  getallPhysicians():Observable<any>{

    let token=localStorage.getItem("userToken");      

   

     

    const headers = new HttpHeaders({

      'Authorization': 'Bearer '+token

    })

   

    return this.http.get<ResponseModel>(this.BaseURI + '/GetAllPhysicians',{headers:headers});

  }

  sendLocation(latitude:number,longitude:number){
    const body={
      Latitude:latitude,
      Longitude:longitude
    }
    return this.http.post<ResponseModel>(this.BaseURI +'/sendLocation/',body);
  }



  getAllPatients():Observable<any>{

    let token=localStorage.getItem("userToken");      

   

     

    const headers = new HttpHeaders({

      'Authorization': 'Bearer '+token

    })

   

    return this.http.get<ResponseModel>(this.BaseURI + '/GetPatient',{headers:headers});

  }

  getUserDetails(id:number):Observable<any>{

    let token=localStorage.getItem("userToken");

    const headers = new HttpHeaders({

      'Authorization': 'Bearer '+token

    })

    return this.http.get<ResponseModel>(this.BaseURI +'/users/'+id,{headers:headers});

  }
  getEmployeeProfile(id:number):Observable<any>{
    let token=localStorage.getItem("userToken");
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    })
    return this.http.get<ResponseModel>(this.BaseURI +'/employee-profile/'+id,{headers:headers});
  }

  getUserinfo(id:number):Observable<any>{
    let token=localStorage.getItem("userToken");
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    })
    return this.http.get<ResponseModel>(this.BaseURI +'/users/'+id,{headers:headers});
  }

  editEmployee(id:number,body:any):Observable<any>{
    let token=localStorage.getItem("userToken");
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    })
    return this.http.put<ResponseModel>(this.BaseURI + '/editEmployee/'+id, body,{headers:headers});
  }
  
  getEmployeedetails(id:number):Observable<any>{
    let token=localStorage.getItem("userToken");
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    })
    return this.http.get<ResponseModel>(this.BaseURI +'/user/'+id,{headers:headers});
  }


}
