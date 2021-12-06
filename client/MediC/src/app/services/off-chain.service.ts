import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL_BACKEND = `http://localhost:4041/api/`
// const BASE_URL_BACKEND = `http://3.145.3.165:4041/api/`
var options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  observe: 'response'
};

@Injectable({
  providedIn: 'root'
})
export class OffChainService {

  constructor(private httpClient: HttpClient) { }

  // ! POST METHODS

  public createUser(details: Object) {
    return this.httpClient.post<any>(`${BASE_URL_BACKEND}user/register`, {
      details: details
    })
  }

  public addAgreement(details: Object) {
    return this.httpClient.post(`${BASE_URL_BACKEND}agreement`, {
      details: details
    })
  }

  public addPolicy(details: Object) {
    return this.httpClient.post(`${BASE_URL_BACKEND}policy`, {
      details: details,
    },
      { responseType: "json" });
  }

  public addHospitalizationRecord(details: Object) {
    return this.httpClient.post(`${BASE_URL_BACKEND}hospitalization-record`, {
      details: details
    });
  }

  public addProcedure(details: Object) {
    return this.httpClient.post(`${BASE_URL_BACKEND}procedure`, {
      details: details
    });
  }

  public addProcedureDetails(details: Object) {
    return this.httpClient.post(`${BASE_URL_BACKEND}procedureDetails`, {
      details: details
    });
  }

  public addBill(details: Object) {
    return this.httpClient.post(`${BASE_URL_BACKEND}bill`, {
      details: details
    });
  }
  // ! GET METHODS 

  // USER
  public getUserDetails(id: Number) {
    return this.httpClient.get(`${BASE_URL_BACKEND}user?_id=${id}`);
  }

  public getAllUserDetails() {
    return this.httpClient.get(`${BASE_URL_BACKEND}user/all`);
  }

  // AGREEMENTS
  public getAgreementDetails(id: Number) {
    return this.httpClient.get(`${BASE_URL_BACKEND}agreement?_id=${id}`);
  }

  public getAllAgreementDetails() {
    return this.httpClient.get(`${BASE_URL_BACKEND}agreement/all`);
  }

  // POLICY
  public getPolicyDetails(id: Number) {
    return this.httpClient.get(`${BASE_URL_BACKEND}policy?_id=${id}`);
  }

  public getAllPolicyDetails() {
    return this.httpClient.get(`${BASE_URL_BACKEND}policy/all`);
  }

  // HOSPITALIZATION RECORDS
  public getHospitalizationRecords(id: Number) {
    return this.httpClient.get(`${BASE_URL_BACKEND}hospitalization-record?_id=${id}`);
  }

  public getAllHospitalizationRecords() {
    return this.httpClient.get(`${BASE_URL_BACKEND}hospitalization-record/all`);
  }

  public getProcedures(id: number) {
    return this.httpClient.get(`${BASE_URL_BACKEND}procedure?_id=${id}`);
  }

  public getProcedureDetail(id: number) {
    return this.httpClient.get(`${BASE_URL_BACKEND}procedureDetails?_id=${id}`);
  }

  public getAllProcedures() {
    return this.httpClient.get(`${BASE_URL_BACKEND}procedure/all`);
  }

  public getAllProcedureDetails() {
    return this.httpClient.get(`${BASE_URL_BACKEND}procedureDetails/all`);
  }

  public getAllBills() {
    return this.httpClient.get(`${BASE_URL_BACKEND}bill/all`);
  }

  public getBill(id: number) {
    return this.httpClient.get(`${BASE_URL_BACKEND}bill`);
  }

  public updateHospitalizationRecord(body: any) {
    return this.httpClient.patch(`${BASE_URL_BACKEND}hospitalization-record`, body);
  }

  public updateBill(body: any) {
    return this.httpClient.patch(`${BASE_URL_BACKEND}bill`, body);
  }


}
