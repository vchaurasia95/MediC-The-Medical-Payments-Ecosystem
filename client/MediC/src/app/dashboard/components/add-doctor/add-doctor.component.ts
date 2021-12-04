import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { OffChainService } from 'src/app/services/off-chain.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {
  transferForm: any;
  rawProcedures: any;
  procedures: any = [];

  constructor(private web3Service: Web3Service, private fb: FormBuilder, private snackBarService: SnackbarService, private offChainService: OffChainService) { }

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      address: ['', Validators.compose([Validators.required, Validators.pattern('^0x([A-Fa-f0-9]{40})$')])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
    this.getAllProcedures();
  }

  async addParticipant() {
    const form = this.transferForm.value;
    const isValidCost = await this.validateCosts();
    console.log(`Valid:--: ${isValidCost}`);
    if (isValidCost) {
      console.log('here-->')
      const agreement: any = {};
      for (let prc of this.rawProcedures) {
        agreement.prc["_id"] = form.prc_id;
      }
      console.log(agreement);
      // if (await this.web3Service.getUserType(form.address) == 0) {
      //   this.web3Service.addDoctor(form.address).then(async (reciept: any) => {
      //     console.log(`Transcation Reciept-->`, reciept);
      //     this.snackBarService.openSuccessSnackBar("Participent Successfully Added\nTx #: " + reciept.transactionHash);
      //     this.offChainService.addAgreement({})
      //   })
      //     .catch((error: any) => {
      //       console.log(`Transcation Error-->`, error);
      //       this.snackBarService.openErrorSnackBar("Error Encountered, Check Console!");
      //     });
      // } else {
      //   this.snackBarService.openWarnSnackBar("Invalid Address Provided/ Address already in Network");
      //   this.transferForm.reset();
      // }
    }
  }

  getAllProcedures() {
    this.offChainService.getAllProcedures().subscribe(async (data: any) => {
      console.log(data);
      this.rawProcedures = data.result;
      for (let proc of data.result) {
        this.transferForm.addControl(proc._id, new FormControl('', Validators.compose([Validators.required])));
        console.log(proc);
      }
      this.procedures = await this.divideIntoChunks(data.result, 3);
    })
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

  async validateCosts() {
    const values = this.transferForm.value;
    var map = await Promise.all(this.rawProcedures.map(async (prc: any) => {
      let result = await this.web3Service.getProcedureCost(prc._id).then((cost: any) => {
        const totalCost = (Math.round(parseInt(cost) / (Math.pow(10, 18))));
        console.log(totalCost);
        if (parseInt(values[parseInt(prc._id)]) > totalCost) {
          this.snackBarService.openErrorSnackBar(`Invalid Cost for ${prc.details.name}`);
          return true;
        } else {
          return false
        }
      });
      return result;
    }));
    console.log(map);
    return (!(map.includes(true)));
  }


}
