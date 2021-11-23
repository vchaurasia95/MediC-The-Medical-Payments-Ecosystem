import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Web3Service } from 'src/app/services/web3.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar.service';


@Component({
  selector: 'app-transfer-token',
  templateUrl: './transfer-token.component.html',
  styleUrls: ['./transfer-token.component.scss']
})
export class TransferTokenComponent implements OnInit {
  email: any
  amount: any
  transferForm: any;
  constructor(private web3Service: Web3Service, private fb: FormBuilder, private snackBarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      address: ['', Validators.compose([Validators.required, Validators.pattern('^0x([A-Fa-f0-9]{40})$')])],
      amount: [0, Validators.compose([Validators.required, Validators.min(1)])]
    });

  }

  async transferToken() {
    const value = this.transferForm.value;
    if (this.web3Service.isValidAddress(value.address) && await this.web3Service.getUserType(value.address) > 0) {
      this.web3Service.transferToken(value.address, value.amount)
        .then(async (reciept: any) => {
          console.log(`Transcation Reciept-->`, reciept);
          await this.web3Service.setTokenBalance();
          this.snackBarService.openSuccessSnackBar("Tokens Successfully Transferred\nTx #: " + reciept.transactionHash);
        })
        .catch((error: any) => {
          console.log(`Transcation Error-->`, error);
          this.snackBarService.openErrorSnackBar("Error Encountered, Check Console!");
        })
      this.transferForm.reset();
    } else {
      this.snackBarService.openWarnSnackBar("Invalid Address Provided/ Address not in Network");
      this.transferForm.reset();
    }
  }



}
