import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { Web3Service } from '../services/web3.service';
import { ViewEnrolledPolicyDialogComponent } from './components/view-enrolled-policy-dialog/view-enrolled-policy-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OffChainService } from '../services/off-chain.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selected: any;
  options: any;
  balance = 0;
  escrowBalance = 0;
  userType: number = 0;
  userAccountAddress: any;
  patientPolicy: number = 0;
  policy_details: any;
  offChainPolicyDetails: any;

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor(private web3Service: Web3Service, public router: Router, private snackBarService: SnackbarService, public dialog: MatDialog, private offChainService: OffChainService) {
    this.web3Service.tokentSubject.subscribe((val: any) => {
      this.balance = Math.round(parseInt(val) / (Math.pow(10, 18)));
    });
    this.web3Service.escrowSubject.subscribe((val: any) => {
      this.escrowBalance = Math.round(parseInt(val) / (Math.pow(10, 18)))
    });

  }

  ngOnInit(): void {
    const conf = JSON.parse(localStorage.getItem("conf") || '{}');
    if (conf.userType)
      this.userType = conf.userType;
    this.web3Service.getAddress().then((addresses) => this.options = addresses);
    this.selected = this.web3Service.getdefaultAccount();
    if (conf.userType == 5)
      this.getPatientPolicy();
    this.escrowBalance = this.web3Service.escrowSubject.getValue();
    this.web3Service.getEscrowBalance().then(() => console.log('done'));
    this.web3Service.setTokenBalance().then(() => console.log('done'));
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  public async getPatientPolicy() {
    let addrs = await this.web3Service.getAddress();
    this.userAccountAddress = addrs[0];
    this.web3Service.getPatientPolicy(this.userAccountAddress)
      .then(async (data: any) => {
        console.log(`getPatientPolicy ::`, data);

        this.patientPolicy = data["0"];

      }).catch((error: any) => {
        console.log(`Transcation Error-->`, error);
        this.patientPolicy = 0;
        // this.snackBarService.openErrorSnackBar("Error Encountered, Check Console!");
      })
  }

  async viewEnrolledPolicy() {
    this.offChainPolicyDetails = await this.offChainService.getPolicyDetails(this.patientPolicy).toPromise();
    // .subscribe((data:any)=>{
    //   this.offChainPolicyDetails = data.result;
    // })


    // this.openDialog(this.policy_details);
    this.openDialog(this.offChainPolicyDetails);
  }



  openDialog(data: any) {

    this.dialog.open(ViewEnrolledPolicyDialogComponent, {
      data: data,
    });
  }
}
