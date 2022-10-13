import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeModel } from 'src/app/models/employeeModel';
import { NotesModel } from 'src/app/models/nodesModel';

import { ResponseModel } from 'src/app/models/responseModel';
import { NotesService } from 'src/app/services/notes/notes.service';

import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sendnotes',
  templateUrl: './sendnotes.component.html',
  styleUrls: ['./sendnotes.component.css']
})
export class SendnotesComponent implements OnInit {
  response: any;
  receiverEmail!: string;
  senderEmail!: string;

  constructor(private service:UserService,private router:Router,private toaster:ToastrService,private formBuilder:FormBuilder,private noteservice:NotesService) { }
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
  
  ngOnInit(): void {
    
    this.gethospitaluser();
    
    this.sendNoteForm= this.formBuilder.group({
      ReceiverName: new FormControl(null,[Validators.required]),
      
      ReceiverDesignation: new FormControl(this.receiverDesignation,[Validators.required]),
      
      Message: new FormControl(null,[Validators.required]),
     
      IsUrgent: new FormControl(null,[Validators.required]),
      
      
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
    this.senderEmail = mail;
    console.log(this.senderEmail) // ok
  }
     
    
  }

  onDropdownChange(event:number){  
    
   this.receiver=this.employees.find(x=>x.id==event);
    this.receiverId=this.receiver.id;
    this.receiverName=this.receiver.name;
    this.receiverDesignation=this.receiver.role;
    this.receiverEmail=this.receiver.email;
    const control1 = this.sendNoteForm.get('ReceiverDesignation');
      if(control1 instanceof FormControl){
        control1.setValue(this.receiverDesignation);
      }

      
  }

  
  
  sendNote(){
    console.log(this.sendNoteForm);
    if(this.sendNoteForm.valid){
      this.noteobj=new NotesModel();
      this.noteobj.ReceiverId=this.receiverId;
      this.noteobj.ReceiverName=this.receiverName;
      this.noteobj.ReceiverEmail=this.receiverEmail;
      this.noteobj.ReceiverDesignation=this.receiverDesignation;
      this.noteobj.SenderId=this.senderId;
      this.noteobj.SenderDesignation=this.senderDesignation;
      this.noteobj.SenderName=this.senderName;
      this.noteobj.SenderEmail=this.senderEmail;
      this.noteobj.Message=this.sendNoteForm.get('Message')?.value;      
      this.noteobj.IsUrgent=this.sendNoteForm.get('IsUrgent')?.value;
      console.log(this.noteobj);
      this.noteservice.sendNotes(this.noteobj).subscribe((data:ResponseModel)=>{
        if(data.responseCode==1){
          this.toaster.success(data.responseMessage);
        }
        else{
          this.toaster.error(data.responseMessage)
        }
      })
    }

  }

  gethospitaluser(){
    this.service.gethospitalUsers().subscribe((data:ResponseModel)=>{
      
      if(data.responseCode==1){
        this.response=data;
        console.log(data);
        this.employees=this.response.dataSet;
        //console.log(this.employees);
      }
      else{
        console.log("error");
      }
    },
    (err =>{
      console.log(err);
    }));
  }
}
