import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material.module';
import { TransferTokenComponent } from './components/transfer-token/transfer-token.component';
import { SharedModule } from '../shared.module';
import { AddNetworkParticipantComponent } from './components/add-network-participant/add-network-participant.component';
import { AddProcedureComponent } from './components/add-procedure/add-procedure.component';
import { AddEscrowBalComponent } from './components/add-escrow-bal/add-escrow-bal.component';
import { AddPolicyComponent } from './components/add-policy/add-policy.component';
import { EnrollPolicyComponent } from './components/enroll-policy/enroll-policy.component';
import { ViewPoliciesComponent } from './components/view-policies/view-policies.component';



@NgModule({
  declarations: [
    DashboardComponent,
    TransferTokenComponent,
    AddNetworkParticipantComponent,
    AddProcedureComponent,
    AddEscrowBalComponent,
    AddPolicyComponent,
    EnrollPolicyComponent,
    ViewPoliciesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
    // SharedModule
  ],
})
export class DashboardModule { }
