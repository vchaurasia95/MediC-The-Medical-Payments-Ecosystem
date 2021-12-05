import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { Web3Service } from '../services/web3.service';

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
  userAccountAddress:any;
  patientPolicyFlag:Boolean = false;

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor(private web3Service: Web3Service, public router: Router, private snackBarService:SnackbarService) {
    this.web3Service.setTokenBalance().then(() => console.log('done'));
    this.web3Service.tokentSubject.subscribe((val: any) => {
      this.balance = Math.round(parseInt(val) / (Math.pow(10, 18)));
    });
    this.web3Service.escrowSubject.subscribe((val: any) => {
      this.escrowBalance = Math.round(parseInt(val) / (Math.pow(10, 18)))
    });
    this.balance = this.web3Service.escrowSubject.getValue();
  }

  ngOnInit(): void {
    const conf = JSON.parse(localStorage.getItem("conf") || '{}');
    if (conf.userType)
      this.userType = conf.userType;
    this.web3Service.getAddress().then((addresses) => this.options = addresses);
    this.selected = this.web3Service.getdefaultAccount();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }
  
  public async getPatientPolicy(){
    let addrs = await this.web3Service.getAddress();
    this.userAccountAddress = addrs[0];
    this.web3Service.getPatientPolicy(this.userAccountAddress)
    .then(async(reciept:any) => {
      console.log(`Transcation Reciept-->`, reciept);
      // this.snackBarService.openSuccessSnackBar("Policy successfully enrolled\nTx #: " + reciept.transactionHash);

      

    }).catch((error:any) => {
      console.log(`Transcation Error-->`, error);
      this.snackBarService.openErrorSnackBar("Error Encountered, Check Console!");
    })
  }

}
