import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedLandingToolbarComponent } from './shared-landing-toolbar.component';

describe('SharedLandingToolbarComponent', () => {
  let component: SharedLandingToolbarComponent;
  let fixture: ComponentFixture<SharedLandingToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedLandingToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedLandingToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
