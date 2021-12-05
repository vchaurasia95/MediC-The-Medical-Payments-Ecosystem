import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OffChainService } from 'src/app/services/off-chain.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {

  transferForm: any;
  spinnerFlag = 0;

  constructor(private web3Service: Web3Service, private fb: FormBuilder, private snackBarService: SnackbarService, private offChainService: OffChainService, private router: Router) { }

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });

  }

  async addParticipant() {
    this.spinnerFlag = 1;
    const value = this.transferForm.value;
    const address: any = await this.web3Service.getAddress();
    console.log(address[0]);
    this.web3Service.addPatient()
      .then(async (reciept: any) => {
        console.log(`Transcation Reciept-->`, reciept);
        this.snackBarService.openSuccessSnackBar("Patient Successfully Added\nTx #: " + reciept.transactionHash);
        this.offChainService.createUser({
          name: value.name,
          email: value.email,
          address: address[0]
        }).subscribe(data => {
          console.log("data-->", data);
          const conf = {
            userType: '5'
          };
          localStorage.setItem("conf", JSON.stringify(conf));
          this.router.navigate(['/dashboard']);
          this.spinnerFlag = 0;
          this.transferForm.reset();
        });
      })
      .catch((error: any) => {
        console.log(`Transcation Error-->`, error);
        this.snackBarService.openErrorSnackBar("Error Encountered, Check Console!");
        this.spinnerFlag = 0;
        this.transferForm.reset();
      })

  }

}
