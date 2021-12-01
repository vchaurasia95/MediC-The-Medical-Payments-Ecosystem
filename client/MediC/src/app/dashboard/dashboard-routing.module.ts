import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TransferTokenComponent } from './components/transfer-token/transfer-token.component';
import { AddNetworkParticipantComponent } from './components/add-network-participant/add-network-participant.component';
import { AddProcedureComponent } from './components/add-procedure/add-procedure.component';
import { AddEscrowBalComponent } from './components/add-escrow-bal/add-escrow-bal.component';
import { AddPolicyComponent } from './components/add-policy/add-policy.component';
import { EnrollPolicyComponent } from './components/enroll-policy/enroll-policy.component';
import { ViewPoliciesComponent } from './components/view-policies/view-policies.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'transfer-token', component: TransferTokenComponent },
      { path: 'add-participant', component: AddNetworkParticipantComponent },
      { path: 'add-procedure', component: AddProcedureComponent },
      { path: 'add-escrow-bal', component: AddEscrowBalComponent },
      { path: 'add-policy', component: AddPolicyComponent },
      { path: 'enroll-policy', component: EnrollPolicyComponent },
      { path: 'view-policies', component: ViewPoliciesComponent }
    ]
  },
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
