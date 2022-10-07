import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailslistComponent } from './patient-detailslist.component';

describe('PatientDetailslistComponent', () => {
  let component: PatientDetailslistComponent;
  let fixture: ComponentFixture<PatientDetailslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDetailslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDetailslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
