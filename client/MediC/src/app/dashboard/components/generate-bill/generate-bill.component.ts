import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Console } from 'console';
import { OffChainService } from 'src/app/services/off-chain.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-generate-bill',
  templateUrl: './generate-bill.component.html',
  styleUrls: ['./generate-bill.component.scss']
})
export class GenerateBillComponent implements OnInit {
  admittedPatients: any = [];
  procedures: any = [];
  users: any = [];
  transferForm: any;
  unbilledRecords: any = [];
  constructor(private web3Service: Web3Service, private fb: FormBuilder, private snackbarService: SnackbarService,
    private offchainService: OffChainService) { }


  async ngOnInit() {
    this.getAdmittedPatients().then((data) => { console.log(`Done ${data}`) });
    this.transferForm = this.fb.group({
      description: ['', Validators.compose([Validators.required])],
      hospitalizationRec: ['', Validators.required]
    });

    this.users = await this.offchainService.getAllUserDetails().toPromise();
    this.users = this.users.result;
    console.log(this.users);
    // this.getAllProcedures();
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
    const hospitalAddress = await this.web3Service.getAddress();
    this.offchainService.getAllHospitalizationRecords()
      .subscribe(async (data: any) => {
        this.unbilledRecords = data.result.filter((rec: any) => rec.details.hospital == hospitalAddress[0] && (!rec.details.billId));
        this.unbilledRecords = await Promise.all(this.unbilledRecords.map(async (rec: any) => {
          let patientDetails = await this.getUserDetails(rec.details.patient);
          rec.details.name = patientDetails[0].details.name;
          rec.details.email = patientDetails[0].details.email;
          return rec;
        }));
      });
  }

  async generateBill() {
    const value = this.transferForm.value;
    let bill: any = {};
    try {
      const hospitalizationId = value.hospitalizationRec._id;
      const hospitalizationDetails = await this.web3Service.getPatientHospitalizationDetails(hospitalizationId);
      let hospitalizationMeta: any = await this.offchainService.getHospitalizationRecords(hospitalizationId).toPromise();
      hospitalizationMeta = hospitalizationMeta.result
      const procDetails = await this.getPerformedProcedures(hospitalizationDetails["0"]);
      const patientDetails = await this.getUserDetails(value.hospitalizationRec.details.patient);
      const hospitalDetails = await this.getUserDetails(value.hospitalizationRec.details.hospital)
      console.log('patient details-->', patientDetails);
      const policyId = await this.web3Service.getPatientPolicy(value.hospitalizationRec.details.patient);
      const policyDetails = await this.web3Service.viewPolicy(policyId["0"]);
      const policyProviderDetails = await this.getUserDetails(policyDetails["3"]);
      const tmppolicyName: any = await this.offchainService.getPolicyDetails(policyId["0"]).toPromise();
      const policyName = tmppolicyName.result.details;
      const policyBalance = Math.round(parseInt(policyId["1"]) / (Math.pow(10, 18)));
      const payables = await this.calculatePayables(policyDetails[4], procDetails, policyBalance);
      bill.patient = patientDetails[0].details;
      bill.hospital = hospitalDetails[0].details;
      bill.procedures = procDetails;
      bill.payables = payables;
      bill.insuranceDetails = policyProviderDetails[0].details;
      bill.policyId = policyId["0"]
      bill.description = value.description;
      console.log(bill);
      const billDetails: any = await this.offchainService.addBill(bill).toPromise();
      let tmpBody = hospitalizationMeta;
      tmpBody.details.billId = billDetails.result._id;
      console.log(await this.offchainService.updateHospitalizationRecord(tmpBody).toPromise());
      this.snackbarService
        .openSuccessSnackBar("Bill Generated Successfully! Amount:" + bill.payables.total + " Open vie bills to see details");
      this.transferForm.reset();
    } catch (ex) {
      this.snackbarService
        .openWarnSnackBar("Something went wrong please try again later!!");
    }
  }

  async getPerformedProcedures(procedureIds: any) {
    let procedureDetails: any = {};
    for (let id of procedureIds) {
      const proc = await this.web3Service.getProcedureDetails(id);
      const procedureId = proc["2"];
      let procOffChain: any = await this.offchainService.getProcedureDetail(proc["2"]).toPromise();
      procOffChain = procOffChain.result;
      let cost = await this.getHospitalProcedureCost(proc["2"]);
      let doctor = await this.getUserDetails(proc["0"]);
      const procedureType = await this.web3Service.getProcedureType(proc["2"]);
      const procedureOverview: any = await this.offchainService.getProcedures(proc["2"]).toPromise();
      const docAgreement: any = await this.getDoctorAgreement(proc["0"], procedureId);
      console.log("procedure cost-->" + docAgreement);
      procedureDetails[procedureId] = {
        id: procedureId,
        overview: procedureOverview.result.details,
        cost: cost,
        doctor: doctor[0].details,
        type: procedureType,
        doctor_cost: docAgreement
      };
    }
    return procedureDetails;
  }

  async getHospitalProcedureCost(procedureId: string) {
    const cost = await this.web3Service.getProcedureCost(procedureId);
    return Math.round(parseInt(cost) / (Math.pow(10, 18)));
  }

  async getAllProcedures(billId: number) {
    return await this.offchainService.getBill(billId).toPromise();
  }

  async getUserDetails(userAddress: string) {
    let usr = this.users.filter((user: any) => user.details.address == userAddress);
    return usr;
  }

  async getDoctorAgreement(address: string, procedureId: string) {
    const agreementId = await this.web3Service.getHospitalAgreement(address);
    let res: any = await this.offchainService.getAgreementDetails(agreementId).toPromise();
    return res['result']['details'][procedureId];
  }

  async calculatePayables(covrage: any, procedures: any, insuranceBalance: number) {
    let payables: any = { doctorPayable: {} };
    let totalProcedureCost = 0;
    let insurancePayable = 0;
    for (let prc in procedures) {
      var procedureType = parseInt(procedures[prc].type);
      var coverage = parseInt(covrage[procedureType - 1]);
      var procedureCost = parseInt(procedures[prc].cost);
      insurancePayable += Math.round((coverage / 100) * procedureCost);
      totalProcedureCost += procedures[prc].cost;
      const docaddress = procedures[prc].doctor.address;
      if (!payables.doctorPayable[docaddress])
        payables.doctorPayable[docaddress] = procedures[prc].doctor_cost;
      else
        payables.doctorPayable[docaddress] += procedures[prc].doctor_cost;
      insurancePayable = insuranceBalance > insurancePayable ? insurancePayable : insuranceBalance;
      insuranceBalance -= insurancePayable;
    }
    payables.insurancePayable = insurancePayable;
    payables.patientPayable = totalProcedureCost - insurancePayable;
    payables.total = totalProcedureCost;
    console.log(payables);
    return payables;
  }

}
