import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TransferTokenComponent } from './components/transfer-token/transfer-token.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'transfer-token', component: TransferTokenComponent }
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
