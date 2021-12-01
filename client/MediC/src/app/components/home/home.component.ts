import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Web3Service } from 'src/app/services/web3.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isMetamaskAvailable = false;

  constructor(private web3service: Web3Service, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private router: Router) {
    this.matIconRegistry.addSvgIcon(
      `metamask_icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/metamask.svg")
    );

  }


  async connectMetamask() {
    const connected = await this.web3service.connectMetamask();
    if (connected) {
      const conf = JSON.parse(localStorage.getItem('conf') || '{}')
      if (conf.userType && conf.userType > 0)
        this.router.navigate(['/dashboard']);
      else
        this.router.navigate(['/addPatient']);
    }
  }

  ngOnInit(): void {
    this.web3service.isMetamaskAvailable().then((value) => this.isMetamaskAvailable = value);
    console.log(this.isMetamaskAvailable);
  }

}
