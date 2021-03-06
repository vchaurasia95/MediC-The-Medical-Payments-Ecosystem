import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OffChainService } from 'src/app/services/off-chain.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-add-network-participant',
  templateUrl: './add-network-participant.component.html',
  styleUrls: ['./add-network-participant.component.scss']
})
export class AddNetworkParticipantComponent implements OnInit {
  transferForm: any;

  constructor(private web3Service: Web3Service, private fb: FormBuilder, private snackBarService: SnackbarService, private offChainService: OffChainService) { }

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      address: ['', Validators.compose([Validators.required, Validators.pattern('^0x([A-Fa-f0-9]{40})$')])],
      userType: ['', Validators.required],
      name: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });

  }

  async addParticipant() {
    const value = this.transferForm.value;
    if (await this.web3Service.getUserType(value.address) == 0) {
      this.web3Service.addNetworkParticipants(value.address, value.userType)
        .then(async (reciept: any) => {
          console.log(`Transcation Reciept-->`, reciept);
          this.snackBarService.openSuccessSnackBar("Participent Successfully Added\nTx #: " + reciept.transactionHash);
          let response = await this.offChainService.createUser({
            name: value.name,
            email: value.email,
            address: value.address
          }).subscribe(data => {
            console.log(data)
          });
        })
        .catch((error: any) => {
          console.log(`Transcation Error-->`, error);
          this.snackBarService.openErrorSnackBar("Error Encountered, Check Console!");
        });
      this.transferForm.reset();
    } else {
      this.snackBarService.openErrorSnackBar("Invalid Address Provided/ Address already in Network");
      this.transferForm.reset();
    }
  }

}
