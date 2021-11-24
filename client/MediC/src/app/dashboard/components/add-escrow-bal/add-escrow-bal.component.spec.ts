import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEscrowBalComponent } from './add-escrow-bal.component';

describe('AddEscrowBalComponent', () => {
  let component: AddEscrowBalComponent;
  let fixture: ComponentFixture<AddEscrowBalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEscrowBalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEscrowBalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
