import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Diagnosis_Medication, Vitals } from 'src/app/models/patientModel';
import { EmployeesService } from 'src/app/services/employees/employees.service';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-patient-visits',
  templateUrl: './patient-visits.component.html',
  styleUrls: ['./patient-visits.component.css']
})
export class PatientVisitsComponent implements OnInit {

  
  displayedDemoColumns: string[] = ['visitId','patient_Id', 'visit_Date','height','weight','blood_Pressure','body_Temperature','respiration_Rate'];
  displayDiagnosisColumns: string[] = ['visitId','patientId', 'createdOn','diagnosis_Code','diagnosis_Description','drug_Name','drug_Form','drug_Strength','procedure_Code','procedure_Description'];

  vitals!:Vitals[];
  diagnosis_M:Diagnosis_Medication[];

  dataSource: any;
  dataSourceDiagnosis!:any
  empStatus!:string;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginator2!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSort) sort2!: MatSort;
  userId!: any;
  patientId: number;

  
  
  constructor(private router:Router,private services:PatientService,private route:ActivatedRoute,private toasts:ToastrService,private service:EmployeesService) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = Number(params.get('id'));

      this.patientId = id;
      console.log('ParameterId', this.patientId);

    });
  }


  ngOnInit(): void {
   
    this.fetchAllPatientDemo();    
    this.fetchAllDiagnosisMedication();
    
   
    
    
  }

  fetchAllPatientDemo(){
    this.service.getIndividualVitals(this.patientId).subscribe((data)=>{
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
    this.services.getDemographicDiagnosis(this.patientId).subscribe(data=>{
      this. diagnosis_M=data.dataSet;
      console.log(this.diagnosis_M);
       
    this.dataSourceDiagnosis = new MatTableDataSource(this.diagnosis_M); 
    console.log(this.dataSourceDiagnosis)
    
    this.dataSourceDiagnosis.paginator2 = this.paginator2;
    this.dataSourceDiagnosis.sort2 = this.sort2;
    });


   
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDiagnosis.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceDiagnosis.paginator) {
      this.dataSourceDiagnosis.paginator.firstPage();
    }
  }

}
