import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDemoDataComponent } from './patient-demo-data.component';

describe('PatientDemoDataComponent', () => {
  let component: PatientDemoDataComponent;
  let fixture: ComponentFixture<PatientDemoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDemoDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDemoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
