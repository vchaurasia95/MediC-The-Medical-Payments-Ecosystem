import { Component, OnInit } from '@angular/core';
import { OffChainService } from 'src/app/services/off-chain.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-view-policies',
  templateUrl: './view-policies.component.html',
  styleUrls: ['./view-policies.component.scss']
})
export class ViewPoliciesComponent implements OnInit {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  policies: any = [];
  constructor(private offChainService: OffChainService, private web3Service: Web3Service) { }

  ngOnInit(): void {
    console.log(this.getAllPolicies());
  }

  getAllPolicies() {
    this.offChainService.getAllPolicyDetails().subscribe(async (data: any) => {
      console.log(data);
      let map = await Promise.all(data.result.map(async (policy: any) => {
        policy.pol = await this.getPolicyDetails(policy._id, policy.details.policyName);
        console.log(policy.pol);
        return policy;
      }));
      console.log(map);
      const address = await this.web3Service.getAddress();
      const filteredData = map.filter((obj: any) => obj.pol._provider == address[0]);
      this.policies = await this.divideIntoChunks(filteredData, 3);
    })
  }

  private async getPolicyDetails(policyId: string, policyName: string) {
    let data: any;
    try {
      data = await this.web3Service.viewPolicy(policyId)
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

  private async divideIntoChunks(arr: any, chunkSize: number) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    console.log(res);
    return res;
  }

}
