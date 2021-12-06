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
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { AddProcedureCostComponent } from './components/add-procedure-cost/add-procedure-cost.component';
import { HospatlizePatientComponent } from './components/hospatlize-patient/hospatlize-patient.component';
import { PatientProcedureComponent } from './components/patient-procedure/patient-procedure.component';
import { CheckInsuranceComponent } from './components/check-insurance/check-insurance.component';
import { GenerateBillComponent } from './components/generate-bill/generate-bill.component';
import { PolicyDialogComponent } from './components/policy-dialog/policy-dialog.component';
import { ViewBillComponent } from './components/view-bill/view-bill.component';
import { PayBillComponent } from './components/pay-bill/pay-bill.component';



@NgModule({
  declarations: [
    DashboardComponent,
    TransferTokenComponent,
    AddNetworkParticipantComponent,
    AddProcedureComponent,
    AddEscrowBalComponent,
    AddPolicyComponent,
    EnrollPolicyComponent,
    ViewPoliciesComponent,
    AddDoctorComponent,
    AddProcedureCostComponent,
    HospatlizePatientComponent,
    PatientProcedureComponent,
    CheckInsuranceComponent,
    GenerateBillComponent,
    PolicyDialogComponent,
    ViewBillComponent,
    PayBillComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
    // SharedModule
  ],
})
export class DashboardModule { }
