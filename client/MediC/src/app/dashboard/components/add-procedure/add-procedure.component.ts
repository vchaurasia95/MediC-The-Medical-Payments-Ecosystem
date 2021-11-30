import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OffChainService } from 'src/app/services/off-chain.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-add-procedure',
  templateUrl: './add-procedure.component.html',
  styleUrls: ['./add-procedure.component.scss']
})
export class AddProcedureComponent implements OnInit {
  transferForm: any;

  constructor(private web3Service: Web3Service, private fb: FormBuilder, private snackBarService: SnackbarService,
    private offChainService: OffChainService) { }

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      description: ['', Validators.compose([Validators.required])],
      procedureType: ['', Validators.required],
      name: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])]
    });
  }

  async addParticipant() {
    const value = this.transferForm.value;
    console.log('here', value);

    this.offChainService.addProcedure({
      name: value.name, 
      description: value.description
    }).
      then((procedure:any) => {
        // let proc = {
        //   "_id": 1234
        // }
        this.web3Service.addProcedureTypes(procedure._id+"", value.procedureType)
          .then(async (reciept: any) => {
            console.log(`Transcation Reciept-->`, reciept);
            this.snackBarService.openSuccessSnackBar("Participent Successfully Added\nTx #: " + reciept.transactionHash);
          })
          .catch((error: any) => {
            console.log(`Transcation Error-->`, error);
            this.snackBarService.openErrorSnackBar("Error Encountered, Check Console!");
          })
        this.transferForm.reset();
      })
  }

}
