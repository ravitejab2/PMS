export class EditAppointmentModel{
    appointmentId!:number;
    appointmentdate!:Date;
    physicianId:number=0;
    patientId:number=0;
    meetingtitle!:string;
    description!:string;
    createdBy!:string;
    slotId!:Number;
    status!:string;
}