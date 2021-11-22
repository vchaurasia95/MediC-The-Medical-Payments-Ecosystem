import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material.module';
import { TransferTokenComponent } from './components/transfer-token/transfer-token.component';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [
    DashboardComponent,
    TransferTokenComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
    // SharedModule
  ],
})
export class DashboardModule { }
