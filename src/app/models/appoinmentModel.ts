export class AppointmentModel{
    appointmentdate!:Date;
    physicianId:Number=0;
    patientId:Number=0;
    meetingTitle!:string;
    description!:string;
    createdBy!:string;
    slotId!:Number;
}