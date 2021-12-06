import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEnrolledPolicyDialogComponent } from './view-enrolled-policy-dialog.component';

describe('ViewEnrolledPolicyDialogComponent', () => {
  let component: ViewEnrolledPolicyDialogComponent;
  let fixture: ComponentFixture<ViewEnrolledPolicyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEnrolledPolicyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEnrolledPolicyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
