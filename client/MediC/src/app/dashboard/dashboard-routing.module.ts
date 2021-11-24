import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TransferTokenComponent } from './components/transfer-token/transfer-token.component';
import { AddNetworkParticipantComponent } from './components/add-network-participant/add-network-participant.component';
import { AddProcedureComponent } from './components/add-procedure/add-procedure.component';
import { AddEscrowBalComponent } from './components/add-escrow-bal/add-escrow-bal.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'transfer-token', component: TransferTokenComponent },
      { path: 'add-participant', component: AddNetworkParticipantComponent },
      { path: 'add-procedure', component: AddProcedureComponent },
      { path: 'add-escrow-bal', component: AddEscrowBalComponent },
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
