import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient) { }
  readonly BaseURI = 'https://localhost:44352/api/appointments';

  // getAllAppointments(id:number):Observable<any>{
  //   let token=localStorage.getItem("userToken");
  //   const headers = new HttpHeaders({
  //     'Authorization': 'Bearer '+token
  //   })
  //   return this.http.get<ResponseModel>(this.BaseURI + '/appointmentsByUserId/'+id,{headers:headers});
  // }

  getAllAppointments(id:number,role:string):Observable<any>{

    let token=localStorage.getItem("userToken");

    const headers = new HttpHeaders({

      'Authorization': 'Bearer '+token

    })

    return this.http.get<ResponseModel>(this.BaseURI + '/appointmentsByUserId/'+id+'/'+role,{headers:headers});

  }

  getAppointmentsUserLoad(id:number,userRole:string){
    let token=localStorage.getItem("userToken");
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    })
    return this.http.get<ResponseModel>(this.BaseURI + '/userAppointments/'+id+'/'+userRole,{headers:headers});
  }

  acceptAppointment(id:number):Observable<any>{
    let token=localStorage.getItem("userToken");
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    })
    return this.http.put<ResponseModel>(this.BaseURI + '/accept/',id,{headers:headers});
  }
  declineAppointment(id:number):Observable<any>{
    let token=localStorage.getItem("userToken");
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    })
    return this.http.put<ResponseModel>(this.BaseURI + '/decline/',id,{headers:headers});
  }

  getAppointmentById(id:number):Observable<any>{
    let token=localStorage.getItem("userToken");
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    })
    return this.http.get<ResponseModel>(this.BaseURI + '/appointmentDetails/'+id,{headers:headers});
  }
addAppointment(body:any):Observable<any>{
  let token=localStorage.getItem("userToken");
  const headers = new HttpHeaders({
    'Authorization': 'Bearer '+token
  })
  return this.http.post<ResponseModel>(this.BaseURI + '/addAppointment/',body,{headers:headers});
}

  updateappointment(id:number,body:any):Observable<any>{
    let token=localStorage.getItem("userToken");
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    })
    return this.http.post<ResponseModel>(this.BaseURI + '/updateAppointment/'+id,body,{headers:headers});

  }

  getSlots(date:Date,id:number):Observable<any>
  {
    let token=localStorage.getItem("userToken");
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token
    })
    return this.http.get<ResponseModel>(this.BaseURI + '/getAvailableslots/'+date+'/'+id,{headers:headers});
  }
}
