import { Component, OnInit } from '@angular/core';
import { OffChainService } from 'src/app/services/off-chain.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-view-hospitals',
  templateUrl: './view-hospitals.component.html',
  styleUrls: ['./view-hospitals.component.scss']
})
export class ViewHospitalsComponent implements OnInit {
  all_users:any;
  user:any;
  public hospitals:any;
  currentUserAddr:any;
  constructor(private offChainService: OffChainService, private web3Service: Web3Service) { }

  async ngOnInit(){
    this.all_users = await this.offChainService.getAllUserDetails().toPromise();
    this.all_users = this.all_users.result;
    // console.log(this.all_users)
    console.log(this.getHospitalsInNetwork())

  }

  async getHospitalsInNetwork(){
    this.hospitals = await Promise.all(this.all_users.map(async (rec: any) => {
      let userType = await this.web3Service.getUserType(rec.details.address);
      console.log(`User Type : ${userType}`)
      console.log(`User Type Type : ${typeof(userType)}`)
      if(userType == 2){
        return rec;
      }
    }));
    this.hospitals = this.hospitals.filter((data:any) => {
      return data != undefined;
    });
    console.log("getHospitalsInNetwork");
    console.log(this.hospitals);
    // console.log(typeof(this.hospitals));
    this.hospitals = await this.divideIntoChunks(this.hospitals, 2);

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

  async getUserDetails(userAddress: string) {
    return this.all_users.filter((user: any) => user.details.address == userAddress);
  }

}
