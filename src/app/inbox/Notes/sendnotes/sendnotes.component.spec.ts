import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendnotesComponent } from './sendnotes.component';

describe('SendnotesComponent', () => {
  let component: SendnotesComponent;
  let fixture: ComponentFixture<SendnotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendnotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
