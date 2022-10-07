import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseModel } from 'src/app/models/responseModel';
import { SentNotesModel } from 'src/app/models/sentNotesModel';
import { NotesService } from 'src/app/services/notes/notes.service';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.css']
})
export class ViewNotesComponent implements OnInit {
  notes!: SentNotesModel[];
  response: any;
  replyMesssage!:string;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private service:NotesService) { }
  displayedColumns: string[] = ['noteId','sentDate', 'receiverName','receiverDesignation','message','response'];
  
  ngOnInit(): void {
    this.getSentNotes();
  }

  getSentNotes(){
    this.service.viewNotes().subscribe((data:ResponseModel)=>{
      if(data.responseCode==1){
        this.response=data;
        this.notes=this.response.dataSet;
        console.log(this.notes);
        this.notes.forEach((value)=>{
          if(value.response==false){
            this.replyMesssage='Not Received';
          }
          else{
            this.replyMesssage='Responce Received';
          }});
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

}
