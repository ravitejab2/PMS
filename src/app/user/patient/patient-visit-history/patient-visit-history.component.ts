import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Diagnosis_Medication, Vitals } from 'src/app/models/patientModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { EmployeesService } from 'src/app/services/employees/employees.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { DemographicsModel } from '../../providers/patient-demo-data/patient-demo-data.component';

@Component({
  selector: 'app-patient-visit-history',
  templateUrl: './patient-visit-history.component.html',
  styleUrls: ['./patient-visit-history.component.css']
})
export class PatientVisitHistoryComponent implements OnInit {

  
  displayedDemoColumns: string[] = ['visitId','patient_Id', 'visit_Date','height','weight','blood_Pressure','body_Temperature','respiration_Rate'];
  displayDiagnosisColumns: string[] = ['visitId','patientId', 'createdOn','diagnosis_Code','diagnosis_Description','drug_Name','drug_Form','drug_Strength','procedure_Code','procedure_Description'];

  vitals!:Vitals[];
  diagnosis_M:Diagnosis_Medication[];

  dataSource: any;
  dataSourceDiagnosis!:any
  empStatus!:string;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userId!: any;

  
  
  constructor(private router:Router,private services:PatientService,private toasts:ToastrService,private service:EmployeesService) {
    const value = localStorage.getItem("userID");
    this.userId = value;

    console.log('Profile', value)
    console.log(this.userId)

   }
  ngOnInit(): void {
   
    this.fetchAllPatientDemo();    
    this.fetchAllDiagnosisMedication();
    
   
    
    
  }

  fetchAllPatientDemo(){
    this.service.getIndividualVitals(this.userId).subscribe((data)=>{
      console.log(data)
      this.vitals=data.dataSet;
      console.log(this.vitals)
      

  

      this.dataSource = new MatTableDataSource(this.vitals); 
      console.log(this.dataSource)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
      

    })
  }



  fetchAllDiagnosisMedication(){
    this.services.getDemographicDiagnosis(this.userId).subscribe(data=>{
      this. diagnosis_M=data.dataSet;
      console.log(this.diagnosis_M);
       
    this.dataSourceDiagnosis = new MatTableDataSource(this.diagnosis_M); 
    console.log(this.dataSourceDiagnosis)
    
    this.dataSourceDiagnosis.paginator = this.paginator;
    this.dataSourceDiagnosis.sort = this.sort;
    });


   
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
