import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-add-escrow-bal',
  templateUrl: './add-escrow-bal.component.html',
  styleUrls: ['./add-escrow-bal.component.scss']
})
export class AddEscrowBalComponent implements OnInit {
  transferForm: any;
  balance: number = 0;
  escrowBalance: number = 0;

  constructor(private web3Service: Web3Service, private fb: FormBuilder, private snackBarService: SnackbarService) {
    
  }

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      amount: [0, Validators.compose([Validators.required, Validators.min(1)])]
    });
    this.balance = this.web3Service.tokentSubject.getValue() / (Math.pow(10, 18))
    this.escrowBalance = this.web3Service.escrowSubject.getValue() / (Math.pow(10, 18))
    this.web3Service.tokentSubject.subscribe((val: any) => {
      this.balance = parseInt(val) / (Math.pow(10, 18))
    });
    this.web3Service.escrowSubject.subscribe((val: any) => {
      this.escrowBalance = parseInt(val) / (Math.pow(10, 18))
    });
  }

  async transferToken() {
    const value = this.transferForm.value;
    if (value.amount < this.balance) {
      this.web3Service.addEscrowBal(value.amount)
        .then(async (reciept: any) => {
          console.log(`Transcation Reciept-->`, reciept);
          await this.web3Service.setTokenBalance();
          await this.web3Service.getEscrowBalance();
          this.snackBarService.openSuccessSnackBar("Tokens Successfully Transferred\nTx #: " + reciept.transactionHash);
        })
        .catch((error: any) => {
          console.log(`Transcation Error-->`, error);
          this.snackBarService.openErrorSnackBar("Error Encountered, Check Console!");
        })
      this.transferForm.reset();
    } else {
      this.snackBarService.openErrorSnackBar("Provided Amount Exceeds Your MediC Holdings!!");
      this.transferForm.reset();
    }
  }

}
