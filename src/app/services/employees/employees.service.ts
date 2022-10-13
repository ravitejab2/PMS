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
  diagnosisUrl:string=environment.dignosisApiUrl;
  vitalUrl:string=environment.visitVitalUrl
  Patient_Diagnosis:string=environment.patient_diagnosisUrl


  totalEmployees!:number;

  
  
 
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

  postDiagnosis(body: any): Observable<any> {
    return this.http.post<ResponseModel>(this.Patient_Diagnosis + '/PostDiagnosis', body)
  }
  putVitals(id:number,body: any): Observable<any> {
    return this.http.put<ResponseModel>(this.vitalUrl + '/updateVitals/'+id, body)
  }

  postVitals(body: any): Observable<any> {
    return this.http.post<ResponseModel>(this.vitalUrl + '/addVitals', body)
  }

  getVitalsById(id: number): Observable<any> {
    let token = localStorage.getItem("userToken");
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    return this.http.get<ResponseModel>(this.vitalUrl + '/Vitals/' + id, { headers: headers });
  }

  getIndividualVitals(id: number): Observable<any> {
    let token = localStorage.getItem("userToken");
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    return this.http.get<ResponseModel>(this.vitalUrl + '/allVitals/' + id, { headers: headers });
  }
  
  allDiagnosis():Observable<any>{

    let token=localStorage.getItem("userToken");

       

    const headers = new HttpHeaders({

      'Authorization': 'Bearer '+token

    })

    return this.http.get<ResponseModel>(this.Patient_Diagnosis + '/allDiagnosis',{headers:headers})

  }



  allMedications():Observable<any>{

    let token=localStorage.getItem("userToken");

       

    const headers = new HttpHeaders({

      'Authorization': 'Bearer '+token

    })

    return this.http.get<ResponseModel>(this.Patient_Diagnosis + '/allMedications',{headers:headers})

  }



  allProcedures():Observable<any>{

    let token=localStorage.getItem("userToken");

       

    const headers = new HttpHeaders({

      'Authorization': 'Bearer '+token

    })

    return this.http.get<ResponseModel>(this.Patient_Diagnosis + '/allProcedures',{headers:headers})

  }

  

 
}
