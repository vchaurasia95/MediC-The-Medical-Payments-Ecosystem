import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospatlizePatientComponent } from './hospatlize-patient.component';

describe('HospatlizePatientComponent', () => {
  let component: HospatlizePatientComponent;
  let fixture: ComponentFixture<HospatlizePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospatlizePatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospatlizePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
