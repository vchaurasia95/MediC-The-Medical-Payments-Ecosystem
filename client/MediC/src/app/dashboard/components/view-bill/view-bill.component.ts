import { Component, OnInit } from '@angular/core';
import { OffChainService } from 'src/app/services/off-chain.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {
  bills: any = [];
  constructor(private offChainService: OffChainService, private web3Service: Web3Service, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    console.log(this.getAllBills());
  }

  getAllBills() {
    this.offChainService.getAllBills().subscribe(async (data: any) => {
      console.log(data);
      const address = await this.web3Service.getAddress();
      console.log(data.result[0].details.hospital);
      const filteredData = data.result.filter((obj: any) => obj.details.hospital.address == address[0]);
      this.bills = await this.divideIntoChunks(filteredData, 3);
    })
  }

  async settleOutstandings(bill: any) {
    // bill = bill.details;
    this.web3Service.getInsuranceClaim(bill.details.payables.insurancePayable,
       bill.details.insuranceDetails.address, bill.details.hospital.address,
       bill.details.policyId, bill.details.patient.address)
      .then(async (reciept: any) => {
        console.log(`Transcation Reciept-->`, reciept);
        await this.web3Service.setTokenBalance();
        this.snackbarService.openSuccessSnackBar("Got Insurance Claim Successfully Transferred\nTx #: " + reciept.transactionHash);
        await this.settleDoctor(bill.details);
        bill.details.settled = true;
        await this.offChainService.updateBill(bill).toPromise();
        await this.web3Service.getEscrowBalance();
      })
      .catch((error: any) => {
        console.log(`Transcation Error-->`, error);
        this.snackbarService.openErrorSnackBar("Error Encountered, Check Console!");
      });
  }

  private async settleDoctor(bill: any) {
    for (let doctor in bill.payables.doctorPayable) {
      // console.log(doctor);
      // console.log(bill.payables.doctorPayable[doctor]);
      await this.web3Service.settleDoctorPayments(doctor, bill.payables.doctorPayable[doctor])
      this.snackbarService.openSuccessSnackBar("Settled Doctor:" + doctor);
    }
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

}
