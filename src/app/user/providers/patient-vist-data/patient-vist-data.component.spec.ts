import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientVistDataComponent } from './patient-vist-data.component';

describe('PatientVistDataComponent', () => {
  let component: PatientVistDataComponent;
  let fixture: ComponentFixture<PatientVistDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientVistDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientVistDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
