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
  private total_supply: any;
  private contract_balance: any;
  private no_of_doctors: any;
  private connected_user_type: any;
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
      console.log(`Connected Account Address : ${this.account_addresses}`)
      if (this.account_addresses > 0) {
        await this.contractConnect();
        await this.setDefaultAccount(this.account_addresses[0]);
        await this.getTokenBalance() 

        // =======================================================================
        // TODO: Remove below functions once testing is complete: Added by Digant
        await this.getTotalSupply()
        await this.getContractBalance()
        await this.getDocArrayLength()
        await this.getConnectedUserType()
        await this.getUserType("0x4D1352799C05456762Bfc88E95323eF1b2D7d8d4")
        await this.getEscrowBalance("0x4D1352799C05456762Bfc88E95323eF1b2D7d8d4")
        // TODO: Test with valid Patient ID
        // await this.getPatientHospitalizationRecords("0x4D1352799C05456762Bfc88E95323eF1b2D7d8d4")
        // TODO: Test with valid Patient ID
        // await this.getPatientPolicy("0x4D1352799C05456762Bfc88E95323eF1b2D7d8d4")

        // ! End
        // =======================================================================

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
      console.log(`Token balance: ${_result}`)
    });
  }

  public async getTotalSupply() {
    this.contract.methods._totalSupply().call((_error: any,_result: any)=>{
      this.total_supply = _result;
      console.log(`Total supply: ${_result}`)
    });
  }

  public async getContractBalance() {
    // TODO: Smart contract -> Spelling mistake : getContactBalance -> getContractBalance
    this.contract.methods.getContactBalance().call((_error: any,_result: any)=>{
      this.contract_balance = _result;
      console.log(`Contract balance: ${_result}`)
    });
  }

  public async getDocArrayLength() {
    this.contract.methods.getDocArrayLength().call((_error: any,_result: any)=>{
      this.no_of_doctors = _result;
      console.log(`No. of doctors: ${_result}`)
    });
  }

  public async getConnectedUserType() {
    this.contract.methods.getUserType().call((_error: any,_result: any)=>{
      this.connected_user_type = _result;
      console.log(`Connected User Type: ${_result}`)
    });
  }

  public async getUserType(account_address:string) {
    if(Web3.utils.isAddress(account_address) == false) {
      throw Error("Account address is invalid.")
    }

    return this.contract.methods.getUserType(account_address).call((_error: any,_result: any)=>{
      console.log(`User type for ${account_address}: ${_result}`)
      return _result;
    });
  }

  public async getDoctorAgreement(hospital_addr:string) {
    if(Web3.utils.isAddress(hospital_addr) == false) {
      throw Error("Hospital address is invalid.")
    }

    return this.contract.methods.getDoctorAgreement(hospital_addr).call((_error: any,_result: any)=>{
      // Output is uint
      console.log(`Doctor Agreement for ${hospital_addr}: ${_result}`)
      return _result;
    });
  }

  public async getEscrowBalance(account_address:string) {
    if(Web3.utils.isAddress(account_address) == false) {
      throw Error("Account address is invalid.")
    }

    return this.contract.methods.getEscrowBalance(account_address).call((_error: any,_result: any)=>{
      // Output is uint
      console.log(`Escrow balance for ${account_address}: ${_result}`)
      return _result;
    });
  }

  public async getPatientHospitalizationDetails(_hospitalization_meta_id:Number) {
    // TODO: Check the output format with onlyDoctor
    return this.contract.methods.getPatientHospitalizationDetails(_hospitalization_meta_id).call((_error: any,_result: any)=>{
      console.log(`PatientHospitalizationDetails for ${_hospitalization_meta_id}: ${_result}`)
      return _result;
    });
  }

  public async getPatientHospitalizationRecords(patient_address:string) {
    // TODO: Check output with valid patient id.
    if(Web3.utils.isAddress(patient_address) == false) {
      throw Error("Account address is invalid.")
    }

    return this.contract.methods.getPatientHospitalizationRecords(patient_address).call((_error: any,_result: any)=>{
      if(_error){
        throw Error(_error.message)
      }
      console.log(`Patient Hospitalization Records for ${patient_address}: ${_result}`)
      return _result;
    });
  }

  public async getPatientPolicy(patient_address:string) {
    // TODO: Check output with valid patient id.
    if(Web3.utils.isAddress(patient_address) == false) {
      throw Error("Account address is invalid.")
    }

    return this.contract.methods.getPatientPolicy(patient_address).call((_error: any,_result: any)=>{
      if(_error){
        throw Error(_error.message)
      }
      console.log(`Patient policy for ${patient_address}: ${_result}`)
      return _result;
    });
  }

  public async getProcedure(_hospitalization_id:Number) {
    // TODO: Check output with valid hospitalization id and output format.

    return this.contract.methods.getProcedure(_hospitalization_id).call((_error: any,_result: any)=>{
      if(_error){
        throw Error(_error.message)
      }
      console.log(`Procedure Details for ${_hospitalization_id}: ${_result}`)
      return _result;
    });
  }

  public async getProcedureCost(procedure_id:Number) {
    // TODO: Check output with valid procedure id and output format.

    return this.contract.methods.getProcedureCost(procedure_id).call((_error: any,_result: any)=>{
      if(_error){
        throw Error(_error.message)
      }
      console.log(`Procedure Cost for ${procedure_id}: ${_result}`)
      return _result;
    });
  }

  public async getProcedureDetails(_procedure_details_id:Number) {
    // TODO: Check output with valid procedure id and output format.

    return this.contract.methods.getProcedureDetails(_procedure_details_id).call((_error: any,_result: any)=>{
      if(_error){
        throw Error(_error.message)
      }
      console.log(`Procedure Details for ${_procedure_details_id}: ${_result}`)
      return _result;
    });
  }

  public async getProcedureType(procedure_id:Number) {
    // TODO: Check output with valid procedure id and output format.

    return this.contract.methods.getProcedureType(procedure_id).call((_error: any,_result: any)=>{
      if(_error){
        throw Error(_error.message)
      }
      console.log(`Procedure Type for ${procedure_id}: ${_result}`)
      return _result;
    });
  }

  public async viewPolicy(policy_id:Number) {
    // TODO: Check output with valid policy id and output format.

    return this.contract.methods.getProcedureType(policy_id).call((_error: any,_result: any)=>{
      if(_error){
        throw Error(_error.message)
      }
      console.log(`Policy for ${policy_id}: ${_result}`)
      return _result;
    });
  }
}