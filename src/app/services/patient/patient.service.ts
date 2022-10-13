import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientAllergyModel } from 'src/app/models/patientModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseUrl: string = environment.baseApiUrl;
  patientApi: string = environment.patientApiUrl;
  emergencyApi: string = environment.emergencyContactApiUrl;
  allergyApi: string = environment.allergyApiUrl;
  patient_meidcationAPI=environment.patient_diagnosisUrl;
  totalPatient!: number;

  constructor(private http: HttpClient) { }

  getAllPatient(): Observable<any> {
    let token = localStorage.getItem("userToken");

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    return this.http.get(this.baseUrl + '/GetPatient', { headers: headers })

  }

  getPatientsDemographic(): Observable<any> {
    let token = localStorage.getItem("userToken");

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })

    return this.http.get(this.patientApi + '/allDetails', { headers: headers })
  }


  activateUser(id: number): Observable<any> {
    let token = localStorage.getItem("userToken");

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    return this.http.post(this.baseUrl + '/activate-user', id, { headers: headers });
  }

  deactivateUser(id: number): Observable<any> {
    let token = localStorage.getItem("userToken");

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    return this.http.post(this.baseUrl + '/deactivate-user', id, { headers: headers });
  }

  postDemographics(body: any): Observable<any> {
    return this.http.post<ResponseModel>(this.patientApi + '/addDetails', body)
  }
  updateDemographics(id: number, body: any): Observable<any> {
    return this.http.put<ResponseModel>(this.patientApi + '/updateDetails/' + id, body)
  }
  updateEmergency(id: number, body: any): Observable<any> {
    return this.http.put<ResponseModel>(this.emergencyApi + '/updateContacts/' + id, body)
  }

  postEmergencyContact(body: any): Observable<any> {
    return this.http.post<ResponseModel>(this.emergencyApi + '/addContacts', body)
  }

  // postAllergyDetails(body: any): Observable<any> {
  //   return this.http.post<ResponseModel>(this.allergyApi + '/addAllergies', body)

  // }

  getUserById(id: number): Observable<any> {
    let token = localStorage.getItem("userToken");
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    return this.http.get<ResponseModel>(this.patientApi + '/Get-Details/' + id, { headers: headers });
  }

  getEmergencyContact(id: number): Observable<any> {

    let token = localStorage.getItem("userToken");
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    return this.http.get<ResponseModel>(this.emergencyApi + '/Contacts/' + id, { headers: headers });
  }

  
  allAllergies(): Observable<any> {

    let token = localStorage.getItem("userToken");



    const headers = new HttpHeaders({

      'Authorization': 'Bearer ' + token

    })

    return this.http.get<ResponseModel>(this.allergyApi + '/allAllergies', { headers: headers })

  }



  postAllergyDetails(body: PatientAllergyModel): Observable<any> {
    let token = localStorage.getItem("userToken");

    const headers = new HttpHeaders({

      'Authorization': 'Bearer ' + token

    })



    return this.http.post<ResponseModel>(this.allergyApi + '/addAllergies', body, { headers: headers });



  }

  getDemographicDiagnosis(id:number):Observable<any> {

      let token = localStorage.getItem("userToken"); 
      const headers = new HttpHeaders({
  
        'Authorization': 'Bearer ' + token
  
      })
   
      return this.http.get<ResponseModel>(this.patient_meidcationAPI + '/GetDiagnosis/'+id, { headers: headers });
  
  }




}
