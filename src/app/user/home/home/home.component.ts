import { Component, OnInit } from '@angular/core';
import { AppointmentViewModel } from 'src/app/models/appointmentViewModel';
import { ReceivedNoteModel } from 'src/app/models/receivedNotesModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { NotesService } from 'src/app/services/notes/notes.service';
import { AppointmentService } from 'src/app/services/schedule/appointment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userRole!: any;
  response!: any;
  response2!:any;
  notes!:ReceivedNoteModel[];
  appointmentCount:number=0;
  notesCount:number=0;
  userId: number;
  events: AppointmentViewModel[]=[];
  constructor(private service:NotesService,private appointmentService:AppointmentService) {

    const user = localStorage.getItem("userRole");
    if (typeof user === 'string') {
      this.userRole = JSON.parse(user) // ok
  }

  const Id = localStorage.getItem("userID");
  if (typeof Id === 'string') {
    this.userId = Number(JSON.parse(Id)) // ok
}
   }

  ngOnInit(): void {
    this. getReceivedNotes();
    this.loadAppointments();
  }

  loadAppointments(){
   
    this.appointmentService.getAllAppointments(this.userId,this.userRole).subscribe((data:ResponseModel)=>{
      if(data.responseCode==1){
        this.response2=data;
       console.log(this.response2);
       this.events=this.response2.dataSet;
       console.log(this.events);

       this.appointmentCount=this.events.length;
       console.log('appoint',this.events.length);
     
      
      }
      else{
        console.log("error");
      }
    });
    
  
  }


  getReceivedNotes(){
    this.service.receivedNotes().subscribe((data:ResponseModel)=>{
      if(data.responseCode==1){
        this.response=data;
        this.notes=this.response.dataSet;
        this.notesCount=this.notes.length;
        console.log('NotesCount',this.notes.length);
        console.log(this.notes);
       
      }
      else{
        console.log(data.responseMessage);
      }
    });
  }

}
