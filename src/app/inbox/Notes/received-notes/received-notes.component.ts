import { Component, OnInit, ViewChild } from '@angular/core';
import { ResponseModel } from 'src/app/models/responseModel';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ReceivedNoteModel } from 'src/app/models/receivedNotesModel';
import { NotesService } from 'src/app/services/notes/notes.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-received-notes',
  templateUrl: './received-notes.component.html',
  styleUrls: ['./received-notes.component.css']
})
export class ReceivedNotesComponent implements OnInit {
  response: any;
  
  notes!:ReceivedNoteModel[];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private service:NotesService,private toaster:ToastrService,private router:Router) { }
  displayedColumns: string[] = ['noteId','receivedDate', 'senderName','senderDesignation','messageReceived','isUrgent','action'];
  ngOnInit(): void {
    this.getReceivedNotes();
  }
  getReceivedNotes(){
    this.service.receivedNotes().subscribe((data:ResponseModel)=>{
      if(data.responseCode==1){
        this.response=data;
        this.notes=this.response.dataSet;
        console.log(this.notes);
        this.dataSource = new MatTableDataSource(this.notes); 
    console.log(this.dataSource)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
      }
      else{
        console.log(data.responseMessage);
      }
    });
  }

  replyNote(id:number){
   
    this.router.navigate(['/dashboard/replynotes/'+id]);
  }

  deleteNote(id:number){
    this.service.deleteNotebyId(id).subscribe((data:ResponseModel)=>{
      if(data.responseCode==1){
        this.toaster.success(data.responseMessage);
        this.ngOnInit();
      }
      else{
        this.toaster.error(data.responseMessage);
      }
    });
  }

}
