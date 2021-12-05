import { Component, OnInit } from '@angular/core';
import { OffChainService } from 'src/app/services/off-chain.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-patient-procedure',
  templateUrl: './patient-procedure.component.html',
  styleUrls: ['./patient-procedure.component.scss']
})
export class PatientProcedureComponent implements OnInit {

  constructor(private web3Service: Web3Service, private snackbarService: SnackbarService,
    private offchainService: OffChainService) { }

  ngOnInit(): void {
    this.getAdmittedPatients().then((data)=>{console.log(`Done ${data}`)});
  }


  async addPatientProcedure() {

  }

  async getAdmittedPatients() {
    //get associated hospital
    const hospitalAddress = await this.web3Service.getAssociatedHospital();
    //get hospital records of that hospital
    this.offchainService.getAllHospitalizationRecords()
      .subscribe((data) => {
        console.log(data);
      })
    // filter where bill is settlled
    //get
  }


}
