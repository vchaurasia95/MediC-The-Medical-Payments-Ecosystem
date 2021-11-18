import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OffChainService {

  constructor(private httpClient: HttpClient) { }


  public exampleGet(){
    return this.httpClient.get("");
  }

  
}
