import { Component } from '@angular/core';
import { Web3Service } from './services/web3.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MediC';

  constructor(private web3service: Web3Service, private matIconRegistry: MatIconRegistry,  private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `metamask_icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/metamask.svg")
    );
  }


  connectMetamask() {
    this.web3service.connectMetamask();
  }
}
