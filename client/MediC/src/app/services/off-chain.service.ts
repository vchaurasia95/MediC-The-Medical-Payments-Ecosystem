import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL_BACKEND = `http://localhost:4041/api/`
var options = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  observe: 'response'
};

@Injectable({
  providedIn: 'root'
})
export class OffChainService {

  constructor(private httpClient: HttpClient) { }

  // ! POST METHODS

  public createUser(details:Object){
    return this.httpClient.post<any>(`${BASE_URL_BACKEND}user/register`, {
      details:details
    })
  }

  public async addAgreement(details:Object){
    return await this.httpClient.post(`${BASE_URL_BACKEND}agreement`, {
        details:details
    })
  }

  public addPolicy(details:Object){
    return this.httpClient.post(`${BASE_URL_BACKEND}policy`, {
        details:details,
    },
    {responseType: "json"})
  }

  public addHospitalizationRecord(details:Object){
    return this.httpClient.post(`${BASE_URL_BACKEND}hospitalization-record`, {
        details:details
    })
  }

  public addProcedure(details: Object){
    return this.httpClient.post(`${BASE_URL_BACKEND}procedure`, {
      details:details
    })
  }
  // ! GET METHODS 

  // USER
  public getUserDetails(id:Number){
    return this.httpClient.get(`${BASE_URL_BACKEND}user?_id=${id}`);
  }

  public getAllUserDetails(){
    return this.httpClient.get(`${BASE_URL_BACKEND}user/all`);
  }

  // AGREEMENTS
  public getAgreementDetails(id:Number){
    return this.httpClient.get(`${BASE_URL_BACKEND}agreement?_id=${id}`);
  }

  public getAllAgreementDetails(){
    return this.httpClient.get(`${BASE_URL_BACKEND}agreement/all`);
  }

  // POLICY
  public getPolicyDetails(id:Number){
    return this.httpClient.get(`${BASE_URL_BACKEND}policy?_id=${id}`);
  }

  public getAllPolicyDetails(){
    return this.httpClient.get(`${BASE_URL_BACKEND}policy/all`);
  }

  // HOSPITALIZATION RECORDS
  public getHospitalizationRecords(id:Number){
    return this.httpClient.get(`${BASE_URL_BACKEND}hospitalization-record?_id=${id}`);
  }

  public getAllHospitalizationRecords(){
    return this.httpClient.get(`${BASE_URL_BACKEND}hospitalization-record/all`);
  }

  public getProcedures(id:number){
    return this.httpClient.get(`${BASE_URL_BACKEND}procedure`);
  }

  public getAllProcedures(){
    return this.httpClient.get(`${BASE_URL_BACKEND}procedure/all`);
  }
  
}
