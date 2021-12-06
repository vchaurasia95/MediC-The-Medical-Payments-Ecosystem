import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OffChainService } from 'src/app/services/off-chain.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-patient-procedure',
  templateUrl: './patient-procedure.component.html',
  styleUrls: ['./patient-procedure.component.scss']
})
export class PatientProcedureComponent implements OnInit {

  admittedPatients: any = [];
  procedures: any = [];
  users: any = [];
  transferForm: any;
  constructor(private web3Service: Web3Service, private fb: FormBuilder, private snackbarService: SnackbarService,
    private offchainService: OffChainService) { }

  async ngOnInit() {
    this.getAdmittedPatients().then((data) => { console.log(`Done ${data}`) });
    this.transferForm = this.fb.group({
      description: ['', Validators.compose([Validators.required])],
      patient: ['', Validators.required],
      procedure: ['', Validators.required]
    });

    this.users = await this.offchainService.getAllUserDetails().toPromise();
    this.users = this.users.result;
    console.log(this.users);
    this.getAllProcedures();
  }




  async addPatientProcedure() {
    const value = this.transferForm.value;
    console.log(value);
    this.offchainService.addProcedureDetails({ description: value.description })
      .subscribe((data: any) => {
        this.web3Service.addPatientProcedure(value.patient._id, value.procedure, data.result._id)
          .then(async (reciept: any) => {
            console.log(`Transcation Reciept-->`, reciept);
            this.snackbarService.openSuccessSnackBar("Procedure Successfully Added\nTx #: " + reciept.transactionHash);
          })
          .catch((error: any) => {
            console.log(`Transcation Error-->`, error);
            this.snackbarService.openErrorSnackBar("Error Encountered, Check Console!");
          });
      });
    this.transferForm.reset();
  }

  async getAdmittedPatients() {
    //get associated hospital
    const hospitalAddress = await this.web3Service.getAssociatedHospital();
    this.offchainService.getAllHospitalizationRecords()
      .subscribe(async (data: any) => {
        this.admittedPatients = data.result.filter((rec: any) => rec.details.hospital == hospitalAddress && (!rec.details.billId));
        this.admittedPatients = await Promise.all(this.admittedPatients.map(async (rec: any) => {
          let patientDetails = await this.getUserDetails(rec.details.patient);
          console.log(patientDetails);
          rec.details.name = patientDetails[0].details.name;
          rec.details.email = patientDetails[0].details.email;
          return rec;
        }));
      });
  }

  getAllProcedures() {
    this.offchainService.getAllProcedures().subscribe(async (data: any) => {
      this.procedures = data.result;
    });
  }

  async getUserDetails(userAddress: string) {
    let usr = this.users.filter((user: any) => user.details.address == userAddress);
    return usr;
  }

}
