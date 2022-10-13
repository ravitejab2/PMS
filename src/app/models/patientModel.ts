export class User {
  id!: number;
  name!: string;
  email!: string;
  age!: number;
  address!: string;
  contact!: number;
  gender!: string;
}

export class Vitals {
  visitId: number = 0;
  patient_Id!: number;
  height!: string;
  weight!: string;
  blood_Pressure!: string;
  body_Temperature!: string;
  respiration_Rate!: string;
  visit_Date!: Date;
  createdOn!: Date;
  updatedOn!: Date;


}
export class diagnosisModel {



  diagnosis_Id!: string;

  diagnosis_Code!: string;

  diagnosis_Description!: string;

  diagnosis_Is_Depricated!: boolean;


}

export class medicationModel {
  drugID!: number;
  drug_Name!: string;
  drug_Generic_Name!: string;
  drug_Manufacturer!: string;
  drug_Form!: string;
  drug_Strength!: string;
}


export class procedureModel {
  procedure_Id!: string;
  procedure_Code!: string;
  procedure_Description!: string;
  procedure_Is_Depricated!: boolean
}


export class allergyModel{
 id!: number;
 allergyId!: string;
allergy_Type!: string;
allergy_Name!: string;
allergy_Description!: string;
}


export class PatientAllergyModel{
AllergyId!:string;
PatientId!:number;
Allergy_Name!:string;
Allergy_Type!:string;
Allergy_Desc!:string; 
Allergy_Clinical!:string;
Is_Allergy_Fatal!:boolean; 
CreatedOn!:Date;
UpdatedOn!:Date;

}


export class Diagnosis_Medication{
  visitId:number;
  createdOn:Date;
  diagnosis_Code:string;
  diagnosis_description:string;
  diagnosis_Is_Depricated:boolean;
  procedure_Code:string;
  procedure_description:string;
  procedure_Is_Depricated:boolean;
  drug_Name:string;
  drug_Form:string;
  description:string;


}



