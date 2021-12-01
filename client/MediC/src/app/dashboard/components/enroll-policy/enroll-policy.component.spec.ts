import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollPolicyComponent } from './enroll-policy.component';

describe('EnrollPolicyComponent', () => {
  let component: EnrollPolicyComponent;
  let fixture: ComponentFixture<EnrollPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
