import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProcedureCostComponent } from './add-procedure-cost.component';

describe('AddProcedureCostComponent', () => {
  let component: AddProcedureCostComponent;
  let fixture: ComponentFixture<AddProcedureCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProcedureCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProcedureCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
