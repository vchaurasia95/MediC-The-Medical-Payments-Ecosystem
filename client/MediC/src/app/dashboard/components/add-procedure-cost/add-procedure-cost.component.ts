import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { OffChainService } from 'src/app/services/off-chain.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-add-procedure-cost',
  templateUrl: './add-procedure-cost.component.html',
  styleUrls: ['./add-procedure-cost.component.scss']
})
export class AddProcedureCostComponent implements OnInit {
  transferForm: any;
  procedures: any = [];

  constructor(private web3Service: Web3Service, private fb: FormBuilder, private snackBarService: SnackbarService, private offChainService: OffChainService) { }

  ngOnInit(): void {
    this.transferForm = this.fb.group({});
    this.getAllProcedures();
  }

  getAllProcedures() {
    this.offChainService.getAllProcedures().subscribe(async (data: any) => {
      console.log(data);
      for (let proc of data.result) {
        this.transferForm.addControl(proc._id, new FormControl('', Validators.compose([Validators.required])));
        console.log(proc);
      }
      this.procedures = await this.divideIntoChunks(data.result, 3);
    })
  }

  async addParticipant() {
    const value = this.transferForm.value;
    console.log(value);
    console.log(Object.keys(value))
    console.log(Object.values(value));
    this.web3Service.addProceduresCost(Object.keys(value), Object.values(value))
      .then(async (reciept: any) => {
        console.log(`Transcation Reciept-->`, reciept);
        this.snackBarService.openSuccessSnackBar("Participent Successfully Added\nTx #: " + reciept.transactionHash);
      })
      .catch((error: any) => {
        console.log(`Transcation Error-->`, error);
        this.snackBarService.openErrorSnackBar("Error Encountered, Check Console!");
      });
    this.transferForm.reset();
  }

  private async divideIntoChunks(arr: any, chunkSize: number) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    console.log(res);
    return res;
  }

}
