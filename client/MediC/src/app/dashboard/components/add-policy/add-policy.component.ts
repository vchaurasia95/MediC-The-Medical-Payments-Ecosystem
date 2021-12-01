import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OffChainService } from 'src/app/services/off-chain.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.scss']
})
export class AddPolicyComponent implements OnInit {

  transferForm: any;

  constructor(private web3Service: Web3Service, private fb: FormBuilder, private snackBarService: SnackbarService, private offChainService: OffChainService) { }

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      criticalCoverage: ['', Validators.compose([Validators.required, Validators.min(10), Validators.max(100)])],
      modCoverage: ['', Validators.compose([Validators.required, Validators.min(10), Validators.max(100)])],
      mgmtCoverage: ['', Validators.compose([Validators.required, Validators.min(10), Validators.max(100)])],
      policyCoverageAmount: ['', Validators.required],
      policyCost: ['', Validators.compose([Validators.required])],
      policyName: ['', Validators.compose([Validators.required])]
    });

  }

  async addPolicy() {
    const value = this.transferForm.value;
    const detials = {
      policyName: value.policyName
    };
    this.offChainService.addPolicy(detials).subscribe((data: any) => {
      console.log(data);
      console.log(value);
      const coverage = [value.criticalCoverage, value.modCoverage, value.mgmtCoverage];
      this.web3Service.addPolicy(coverage, value.policyCoverageAmount, value.policyCost, data.result._id).then((reciept: any) => {
        console.log(`Transcation Reciept-->`, reciept);
        this.snackBarService.openSuccessSnackBar("Policy Successfully Added\nTx #: " + reciept.transactionHash);
      }).catch((error: any) => {
        console.log(`Transcation Error-->`, error);
        this.snackBarService.openErrorSnackBar("Error Encountered, Check Console!");
      });;
    });
    this.transferForm.reset();
  }


}
