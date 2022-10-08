export class NotesModel{
    SenderId!:number;
    SenderEmail!:string;
    SenderName!:string;
    SenderDesignation!:string;
    Message!:string;
    ReceiverName!:string;
    ReceiverId!:number;
    ReceiverDesignation!:string;
    ReceiverEmail!:string;
    ReplyId!:number;
    IsRepsonded:boolean=false;
    IsUrgent!:string;

}