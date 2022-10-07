import { ResponseCode } from "../models/enum";

export class ResponseModel{

  public  responseCode :ResponseCode=ResponseCode.NotSet;

  public responseMessage:string ="";

  public  dateSet :any ;

}