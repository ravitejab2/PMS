import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotesModel } from 'src/app/models/nodesModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) {
    
  }
 readonly BaseURI = 'https://localhost:44340/api/notes';
 
 sendNotes(body:NotesModel):Observable<any>{
  let token=localStorage.getItem("userToken");      
    
     
  const headers = new HttpHeaders({
    'Authorization': 'Bearer '+token
  })
  
  return this.http.post<ResponseModel>(this.BaseURI + '/AddNote',body,{headers:headers});
  
 }

 viewNotes():Observable<any>{
  let token=localStorage.getItem("userToken"); 
  var userId = localStorage.getItem("userID");    
    if (typeof userId === 'string') {
      userId = JSON.parse(userId);     
    }
  const headers = new HttpHeaders({
    'Authorization': 'Bearer '+token
  })
  
  return this.http.get<ResponseModel>(this.BaseURI + '/AllSentNotes/'+userId,{headers:headers});
  
 }

 receivedNotes():Observable<any>{
  let token=localStorage.getItem("userToken"); 
  var userId = localStorage.getItem("userID");    
    if (typeof userId === 'string') {
      userId = JSON.parse(userId);     
    }
  const headers = new HttpHeaders({
    'Authorization': 'Bearer '+token
  })
  
  return this.http.get<ResponseModel>(this.BaseURI + '/AllReceivedNotes/'+userId,{headers:headers});
  
 }
 getNotebyId(id:number):Observable<any>{
  let token=localStorage.getItem("userToken"); 
 
  const headers = new HttpHeaders({
    'Authorization': 'Bearer '+token
  })
  
  return this.http.get<ResponseModel>(this.BaseURI + '/GetNoteById/'+id,{headers:headers});
  
 }

 deleteNotebyId(id:number):Observable<any>{
  let token=localStorage.getItem("userToken"); 
 
  const headers = new HttpHeaders({
    'Authorization': 'Bearer '+token
  })
  
  return this.http.delete<ResponseModel>(this.BaseURI + '/DeleteNote/'+id,{headers:headers});
  
 }


}
