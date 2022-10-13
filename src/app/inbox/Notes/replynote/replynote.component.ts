import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EmployeeModel } from 'src/app/models/employeeModel';
import { UserService } from 'src/app/services/user/user.service';

import { NotesService } from 'src/app/services/notes/notes.service';
import { NotesModel } from 'src/app/models/nodesModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-replynote',
  templateUrl: './replynote.component.html',
  styleUrls: ['./replynote.component.css']
})
export class ReplynoteComponent implements OnInit {

  response: any;
  receiverEmail!: string;
  senderEmail!: string;
  notedata: any;

  constructor(private service:UserService,private route:ActivatedRoute,private notesservice:NotesService,private router:Router,private toaster:ToastrService,private formBuilder:FormBuilder,private noteservice:NotesService) { 
    
    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id=Number(params.get('id'));
      
      this.noteId=id;
    });
  }
  "sendNoteForm":FormGroup;
  employees!:EmployeeModel[];
  receiverName:string='';
  receiverDesignation='';
  receiverId!:number;
  senderId!:number;
  receiver!:any;
  senderName:string='';
  senderDesignation!:string;
  sender!:any;
  noteobj!:NotesModel;
  noteId!:number;

  ngOnInit(): void {
    // let noteId=parseInt(this.route.snapshot.paramMap.get('id'));
    
    console.log(this.noteId);
    this.getNoteDetails(this.noteId);

    this.sendNoteForm= this.formBuilder.group({
      Message: new FormControl(null,[Validators.required]), 
  });
  const userId = localStorage.getItem("userID");    
    if (typeof userId === 'string') {
      this.senderId = JSON.parse(userId);     
    }
      
    const user = localStorage.getItem("userRole");
    if (typeof user === 'string') {
      this.senderDesignation = JSON.parse(user) // ok
  }
  const name = localStorage.getItem("userName");
  if (typeof name === 'string') {
    this.senderName = name; // ok
  }
  const mail = localStorage.getItem("email");
  if (typeof mail === 'string') {
    this.senderEmail = mail; // ok
  }
  }



  sendNote(){
    console.log(this.sendNoteForm);
    if(this.sendNoteForm.valid){
      this.noteobj=new NotesModel();
      this.noteobj.ReceiverId=this.notedata.senderId;
      this.noteobj.ReceiverName=this.notedata.senderName;
      this.noteobj.ReceiverEmail=this.notedata.senderEmail;
      this.noteobj.ReceiverDesignation=this.notedata.senderDesignation;
      this.noteobj.SenderId=this.senderId;
      this.noteobj.SenderDesignation=this.senderDesignation;
      this.noteobj.SenderName=this.senderName;
      this.noteobj.SenderEmail=this.senderEmail;
      this.noteobj.Message=this.sendNoteForm.get('Message')?.value;      
      this.noteobj.IsUrgent=this.notedata.isUrgent;
      this.noteobj.ReplyId=this.noteId;
      console.log(this.noteobj);
      this.noteservice.sendNotes(this.noteobj).subscribe((data:ResponseModel)=>{
        if(data.responseCode==1){
          this.toaster.success(data.responseMessage);
        }
        else{
          this.toaster.error(data.responseMessage)
        }
      });
    }

  }

  getNoteDetails(paramid:number){
    this.notesservice.getNotebyId(paramid).subscribe((data:ResponseModel)=>{
      if(data.responseCode==1){
        this.response=data;
        this.notedata=this.response.dataSet;
        this.receiverName=this.notedata.senderName;
        this.receiverDesignation=this.notedata.senderDesignation;
        console.log(this.notedata);
      }
    })
  }

}
