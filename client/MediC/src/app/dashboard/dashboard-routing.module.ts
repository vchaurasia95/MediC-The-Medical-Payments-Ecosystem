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
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { AddProcedureCostComponent } from './components/add-procedure-cost/add-procedure-cost.component';
import { HospatlizePatientComponent } from './components/hospatlize-patient/hospatlize-patient.component';
import { PatientProcedureComponent } from './components/patient-procedure/patient-procedure.component';
import { CheckInsuranceComponent } from './components/check-insurance/check-insurance.component';
import { GenerateBillComponent } from './components/generate-bill/generate-bill.component';
import { ViewBillComponent } from './components/view-bill/view-bill.component';
import { PayBillComponent } from './components/pay-bill/pay-bill.component';
import { ViewHospitalsComponent } from './components/view-hospitals/view-hospitals.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'transfer-token', component: TransferTokenComponent },
      { path: 'add-participant', component: AddNetworkParticipantComponent },
      { path: 'add-procedure', component: AddProcedureComponent },
      { path: 'add-escrow-bal', component: AddEscrowBalComponent },
      { path: 'add-policy', component: AddPolicyComponent },
      { path: 'enroll-policy', component: EnrollPolicyComponent },
      { path: 'view-policies', component: ViewPoliciesComponent },
      { path: 'add-doctor', component: AddDoctorComponent },
      { path: 'add-procedures-cost', component: AddProcedureCostComponent },
      { path: 'hospatlize', component: HospatlizePatientComponent },
      { path: 'add-patient-procedure', component: PatientProcedureComponent },
      { path: 'check-insurance', component: CheckInsuranceComponent },
      { path: 'generate-bill', component: GenerateBillComponent },
      { path: 'view-bills', component: ViewBillComponent },
      { path: 'pay-bill', component: PayBillComponent },
      {path: 'add-patient-procedure', component: PatientProcedureComponent},
      {path: 'check-insurance', component: CheckInsuranceComponent},
      {path: 'generate-bill', component: GenerateBillComponent},
      {path: 'view-hospitals', component: ViewHospitalsComponent}
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
