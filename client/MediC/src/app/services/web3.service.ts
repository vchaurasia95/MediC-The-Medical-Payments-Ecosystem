import { Injectable } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3';
import { ADDRESSES } from '../../assets/contract/address';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private web3: any;
  private contract: any;
  private contract_abi: any;
  private account_addresses: any;
  private token_balance: any;
  constructor(private httpClient: HttpClient) {
    this.httpClient.get("assets/contract/contract_abi.json").subscribe((data) => {
      this.contract_abi = data;
    })

  }

  public async connectMetamask() {
    const provider: any = await detectEthereumProvider({ mustBeMetaMask: true });
    if (provider) {

      console.log('Ethereum successfully detected!')

      // From now on, this should always be true:
      // provider === window.ethereum

      // Access the decentralized web!
      console.log(provider)

      // Legacy providers may only have ethereum.sendAsync
      const chainId = await provider.request({
        method: 'eth_chainId'
      });
      await provider.request({ method: 'eth_requestAccounts' });
      this.web3 = new Web3(provider);
      this.account_addresses = await this.getAddress();

      if (this.account_addresses > 0) {
        await this.contractConnect();
        await this.setDefaultAccount(this.account_addresses[0]);
        await this.getTokenBalance() 
        return true;
      }
      else
        return false;
    } else {
      console.error('Please install MetaMask!')
      return false;
    }
  }

  public async getAddress() {
    try {
      return await this.web3.eth.getAccounts();
    } catch (err) {
      console.log("Error Getting Address--->", err);
    }

  }

  public async isMetamaskAvailable() {
    const provider: any = await detectEthereumProvider({ mustBeMetaMask: true });
    if (provider)
      return true;
    else
      return false;
  }

  public async contractConnect() {
    this.contract = new this.web3.eth.Contract(this.contract_abi, ADDRESSES.CONTRACT_ADDRESS);
  }

  public async setDefaultAccount(address: any) {
    this.web3.eth.defaultAccount = address;
    this.contract.defaultAccount = address;

  }

  public async getTokenBalance() {
    this.contract.methods.balanceOf(this.contract.defaultAccount).call((_error: any,_result: any)=>{
      this.token_balance = _result;
    });
  }
}
