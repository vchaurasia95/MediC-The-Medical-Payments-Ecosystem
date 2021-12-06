import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Web3Service } from 'src/app/services/web3.service';


@Component({
  selector: 'app-view-enrolled-policy-dialog',
  templateUrl: './view-enrolled-policy-dialog.component.html',
  styleUrls: ['./view-enrolled-policy-dialog.component.scss']
})
export class ViewEnrolledPolicyDialogComponent implements OnInit {
  policy_details:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private web3Service: Web3Service) { }

  async ngOnInit() {
    this.data = this.data.result;
    this.policy_details = {
      policy_id: await this.data._id,
      policy_Name: await this.data.details.policyName
    }

    this.policy_details = await this.getPolicyDetails(this.data._id, this.policy_details.policy_Name)
    this.data = this.policy_details;
  }

  private async getPolicyDetails(policyId: string, policyName: string) {
    let data: any;
    try {
      data = await this.web3Service.viewPolicy(policyId);
    } catch (err) {
      console.log("error occured -- fetching policies");
    }
    console.log(data);
    return ({
      name: policyName,
      cost: data ? (Math.round(parseInt(data["0"]) / (Math.pow(10, 18)))) : 0,
      _id: policyId,
      total_coverage: data ? (Math.round(parseInt(data["1"]) / (Math.pow(10, 18)))) : 0,
      _provider: data ? data["3"] : '',
      coverage: data ? data["4"] : 0
    });
  }

}
