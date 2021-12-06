import { Component, OnInit } from '@angular/core';
import { OffChainService } from 'src/app/services/off-chain.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-pay-bill',
  templateUrl: './pay-bill.component.html',
  styleUrls: ['./pay-bill.component.scss']
})
export class PayBillComponent implements OnInit {
  bills: any = [];
  constructor(private offChainService: OffChainService, private web3Service: Web3Service, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    console.log(this.getAllBills());
  }

  getAllBills() {
    this.offChainService.getAllBills().subscribe(async (data: any) => {
      console.log(data);
      const address = await this.web3Service.getAddress();
      console.log(data.result[0]);
      console.log(address[0]);
      const filteredData = data.result.filter((obj: any) => ((obj.details.patient.address == address[0]) && !obj.details.paidTime));
      this.bills = await this.divideIntoChunks(filteredData, 3);
    })
  }


  private async divideIntoChunks(arr: any, chunkSize: number) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    console.log(arr);
    return res;
  }

  payBill(bill: any) {
    console.log(bill);
    this.web3Service.transferToken(bill.details.hospital.address, bill.details.payables.patientPayable)
      .then(async (reciept: any) => {
        console.log(`Transcation Reciept-->`, reciept);
        await this.web3Service.setTokenBalance();
        this.snackbarService.openSuccessSnackBar("Tokens Successfully Transferred\nTx #: " + reciept.transactionHash);
        bill.details.paidTime = Date.now();
        await this.offChainService.updateBill(bill).toPromise();
      })
      .catch((error: any) => {
        console.log(`Transcation Error-->`, error);
        this.snackbarService.openErrorSnackBar("Error Encountered, Check Console!");
      })
  }

}
