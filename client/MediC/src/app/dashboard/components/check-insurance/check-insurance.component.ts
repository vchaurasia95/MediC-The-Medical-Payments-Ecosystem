import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OffChainService } from 'src/app/services/off-chain.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Web3Service } from 'src/app/services/web3.service';
import { PolicyDialogComponent } from '../policy-dialog/policy-dialog.component';

@Component({
  selector: 'app-check-insurance',
  templateUrl: './check-insurance.component.html',
  styleUrls: ['./check-insurance.component.scss']
})
export class CheckInsuranceComponent implements OnInit {
  email: any
  amount: any
  transferForm: any;
  policy_details:any;
  offChainPolicyDetails:any;

  constructor(private web3Service: Web3Service, public dialog: MatDialog, private fb: FormBuilder, private snackBarService: SnackbarService, private offChainService: OffChainService) {
  }

  async ngOnInit() {
    this.transferForm = this.fb.group({
      address: ['', Validators.compose([Validators.required, Validators.pattern('^0x([A-Fa-f0-9]{40})$')])]
    });

  }

  async checkInsurance() {
    const value = this.transferForm.value;
    console.log(value);
    if (this.web3Service.isValidAddress(value.address) && await this.web3Service.getUserType(value.address) == 5) {
      let policy_Id = await this.web3Service.getPatientPolicy(value.address);
      
      this.offChainPolicyDetails = await this.offChainService.getPolicyDetails(policy_Id["0"]).toPromise();
      this.offChainPolicyDetails = this.offChainPolicyDetails.result;

      console.log('here')
      this.openDialog(this.offChainPolicyDetails);
    } else {
      this.snackBarService.openWarnSnackBar("Invalid Address Provided/ Address not Patient");
      this.transferForm.reset();
    }
  }

  openDialog(data:any) {
    this.dialog.open(PolicyDialogComponent, {
      data: data,
    });
  }

}
