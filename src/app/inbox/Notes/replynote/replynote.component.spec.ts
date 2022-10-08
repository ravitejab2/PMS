import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplynoteComponent } from './replynote.component';

describe('ReplynoteComponent', () => {
  let component: ReplynoteComponent;
  let fixture: ComponentFixture<ReplynoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplynoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplynoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
