import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor(private web3Service: Web3Service, public router: Router) {
    this.web3Service.setTokenBalance().then(() => console.log('done'));
    this.web3Service.tokentSubject.subscribe((val: any) => {
      this.balance = parseInt(val) / (Math.pow(10, 15))
    });
    this.web3Service.escrowSubject.subscribe((val: any) => {
      this.escrowBalance = parseInt(val) / (Math.pow(10, 15))
    });
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
  

}
