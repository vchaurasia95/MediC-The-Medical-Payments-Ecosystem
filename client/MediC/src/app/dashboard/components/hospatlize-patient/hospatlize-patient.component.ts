import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OffChainService } from 'src/app/services/off-chain.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-hospatlize-patient',
  templateUrl: './hospatlize-patient.component.html',
  styleUrls: ['./hospatlize-patient.component.scss']
})
export class HospatlizePatientComponent implements OnInit {
  transferForm: any;
  constructor(private web3Service: Web3Service, private fb: FormBuilder, private snackBarService: SnackbarService,
    private offchainService: OffChainService) {
  }

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      address: ['', Validators.compose([Validators.required, Validators.pattern('^0x([A-Fa-f0-9]{40})$')])]
    });

  }

  async admitPatient() {
    const value = this.transferForm.value;
    const address = await this.web3Service.getAddress();
    if (this.web3Service.isValidAddress(value.address) && await this.web3Service.getUserType(value.address) == 5) {
      this.offchainService.addHospitalizationRecord({
        patient: value.address,
        hospital: address[0],
        timestamp: Date.now()
      }).subscribe((record: any) => {
        this.web3Service.addHospitalizationRecord(value.address, record.result._id)
          .then(async (reciept: any) => {
            console.log(`Transcation Reciept-->`, reciept);
            await this.web3Service.setTokenBalance();
            this.snackBarService.openSuccessSnackBar("Hospitalization Record Successfully Created\nTx #: " + reciept.transactionHash);
          })
          .catch((error: any) => {
            console.log(`Transcation Error-->`, error);
            this.snackBarService.openErrorSnackBar("Error Encountered, Check Console!");
          });
      });
      this.transferForm.reset();
    } else {
      this.snackBarService.openErrorSnackBar("Invalid Address Provided/ Address not in Network");
      this.transferForm.reset();
    }
  }

}
