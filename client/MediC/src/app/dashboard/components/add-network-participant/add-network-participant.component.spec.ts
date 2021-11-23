import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNetworkParticipantComponent } from './add-network-participant.component';

describe('AddNetworkParticipantComponent', () => {
  let component: AddNetworkParticipantComponent;
  let fixture: ComponentFixture<AddNetworkParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNetworkParticipantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNetworkParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
